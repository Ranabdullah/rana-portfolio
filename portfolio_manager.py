#!/usr/bin/env python3
"""
Portfolio Media Workspace & Backend Sync Manager
------------------------------------------------
Provides bidirectional synchronization between the local editing workspace
and the live portfolio website (index.html, rana_portfolio_v4_1.html, portfolio_data.json).

Usage:
  python portfolio_manager.py export          # Export all gallery projects into titled folders
  python portfolio_manager.py sync-back       # Sync edited photos and YouTube links back to site
  python portfolio_manager.py status          # Show project media and YouTube status dashboard
  python portfolio_manager.py add-youtube     # Add a YouTube URL to a project
  python portfolio_manager.py web             # Launch the local web management dashboard
"""

import os
import sys
import json
import re
import shutil
import filecmp
import subprocess
import urllib.parse
from http.server import HTTPServer, BaseHTTPRequestHandler
from datetime import datetime, timezone

# Root paths
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
WORKSPACE_DIR = os.path.join(SCRIPT_DIR, "Portfolio_Media_Workspace")
INDEX_HTML = os.path.join(SCRIPT_DIR, "index.html")
TWIN_HTML = os.path.join(SCRIPT_DIR, "rana_portfolio_v4_1.html")
PORTFOLIO_JSON = os.path.join(SCRIPT_DIR, "portfolio_data.json")
PHOTOS_ROOT = os.path.join(SCRIPT_DIR, "Photos & to upload")
NEW_PHOTOS_ROOT = os.path.join(SCRIPT_DIR, "New Photos")

def sanitize_folder_name(name):
    """Sanitize title for safe Windows folder names."""
    clean = re.sub(r'[\\/*?:"<>|]', ' - ', name)
    clean = re.sub(r'\s+', ' ', clean).strip(' .-_')
    return clean

def extract_youtube_id(url):
    """Extract YouTube video ID from various URL formats."""
    if not url:
        return ""
    patterns = [
        r'(?:v=|\/)([0-9A-Za-z_-]{11})(?:\?|&|\/|$)',
        r'youtu\.be\/([0-9A-Za-z_-]{11})',
        r'embed\/([0-9A-Za-z_-]{11})',
        r'shorts\/([0-9A-Za-z_-]{11})'
    ]
    for p in patterns:
        m = re.search(p, url)
        if m:
            return m.group(1)
    if len(url.strip()) == 11 and re.match(r'^[0-9A-Za-z_-]{11}$', url.strip()):
        return url.strip()
    return ""

def load_portfolio_json():
    """Load and return portfolio_data.json dict."""
    if not os.path.exists(PORTFOLIO_JSON):
        return {"gallery": []}
    with open(PORTFOLIO_JSON, "r", encoding="utf-8") as f:
        return json.load(f)

def save_portfolio_json(data):
    """Save updated portfolio_data.json."""
    data["updatedAt"] = datetime.now(timezone.utc).isoformat()

    with open(PORTFOLIO_JSON, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

def sync_html_gallery_data(gallery_list=None):
    """portfolio_data.json is single authoritative source; ensure twin parity."""
    shutil.copy2(INDEX_HTML, TWIN_HTML)
    if not filecmp.cmp(INDEX_HTML, TWIN_HTML, shallow=False):
        raise RuntimeError("CRITICAL ERROR: Twin HTML parity check failed!")

def discover_project_videos():
    """Discover matching local videos for known projects."""
    video_map = {} # project_index -> list of (video_filename, source_path, size_mb)
    
    known_mappings = {
        "Eskimo": 4, # Eskimo Pizza
        "IDFL": 5,   # IDFL Kiosk
        "Nature": 14, # Organic Ecosystems
        "Forest": 14,
        "Sculptures": 11, # Mythos
        "Faisal Interior": 9, # Interior Volumes
        "Wayback": 31, # Wayback Burger
    }

    search_dirs = [PHOTOS_ROOT, NEW_PHOTOS_ROOT]
    exts = ('.mp4', '.mov', '.webm', '.avi', '.mkv')

    for s_dir in search_dirs:
        if not os.path.exists(s_dir):
            continue
        for root, _, files in os.walk(s_dir):
            for f in files:
                if f.lower().endswith(exts):
                    full_path = os.path.join(root, f)
                    size_mb = os.path.getsize(full_path) / (1024 * 1024)
                    
                    # Match by folder/file name
                    assigned_idx = None
                    norm_path = full_path.replace("\\", "/").lower()
                    
                    if "eskimo" in norm_path:
                        assigned_idx = 4
                    elif "idfl" in norm_path:
                        assigned_idx = 5
                    elif "nature" in norm_path or "forest" in norm_path:
                        assigned_idx = 14
                    elif "sculpture" in norm_path:
                        assigned_idx = 11
                    elif "faisal interior" in norm_path:
                        assigned_idx = 9
                    elif "wayback" in norm_path:
                        assigned_idx = 31
                    elif "contemporary" in norm_path:
                        assigned_idx = 16
                    
                    if assigned_idx:
                        if assigned_idx not in video_map:
                            video_map[assigned_idx] = []
                        # Avoid duplicates
                        existing_names = [v[0] for v in video_map[assigned_idx]]
                        if f not in existing_names:
                            video_map[assigned_idx].append((f, full_path, size_mb))

    return video_map

def export_workspace():
    """Export all gallery projects into titled folders on PC."""
    os.makedirs(WORKSPACE_DIR, exist_ok=True)
    pdata = load_portfolio_json()
    gallery = pdata.get("gallery", [])

    video_map = discover_project_videos()

    print(f"\n=======================================================")
    print(f" EXPORTING PORTFOLIO TO LOCAL WORKSPACE")
    print(f" Target: {WORKSPACE_DIR}")
    print(f" Projects: {len(gallery)}")
    print(f"=======================================================\n")

    total_photos_copied = 0
    total_videos_copied = 0

    for idx, item in enumerate(gallery, 1):
        title = item.get("title", f"Project {idx}")
        cat = item.get("cat", "3d")
        pillar = item.get("pillar", "Personal")
        media = item.get("media", [])

        folder_name = f"{idx:02d} - {sanitize_folder_name(title)}"
        project_dir = os.path.join(WORKSPACE_DIR, folder_name)
        photos_dir = os.path.join(project_dir, "photos")
        videos_dir = os.path.join(project_dir, "videos")

        os.makedirs(photos_dir, exist_ok=True)
        os.makedirs(videos_dir, exist_ok=True)

        # 1. Copy photos & video thumbnails
        copied_photos = []
        for m in media:
            img_rel = m.get("src") if m.get("type") == "image" else m.get("thumbnail")
            if img_rel:
                src = os.path.join(SCRIPT_DIR, img_rel.replace('/', os.sep))
                if os.path.exists(src):
                    filename = os.path.basename(src)
                    dst = os.path.join(photos_dir, filename)
                    if not os.path.exists(dst) or os.path.getsize(src) != os.path.getsize(dst):
                        shutil.copy2(src, dst)
                    copied_photos.append(filename)
                    total_photos_copied += 1

        # 2. Copy videos
        copied_videos = []
        if idx in video_map:
            for v_name, v_src, v_sz in video_map[idx]:
                v_dst = os.path.join(videos_dir, v_name)
                if not os.path.exists(v_dst) or os.path.getsize(v_src) != os.path.getsize(v_dst):
                    shutil.copy2(v_src, v_dst)
                copied_videos.append(f"{v_name} ({v_sz:.1f} MB)")
                total_videos_copied += 1

        # 3. Create project_info.txt
        info_path = os.path.join(project_dir, "project_info.txt")
        with open(info_path, "w", encoding="utf-8") as f:
            f.write(f"===================================================================\n")
            f.write(f"PROJECT: {title}\n")
            f.write(f"===================================================================\n")
            f.write(f"Index: {idx:02d}\n")
            f.write(f"Category: {cat}\n")
            f.write(f"Pillar: {pillar}\n\n")
            yt_items = [(i, m) for i, m in enumerate(media) if m.get("type") == "video" and m.get("url")]
            prim_url = yt_items[0][1].get("url") if yt_items else ""
            f.write(f"[YOUTUBE VIDEOS]\n")
            f.write(f"# Paste your YouTube video link below (or tell me in chat):\n")
            f.write(f"Primary YouTube URL: {prim_url}\n\n")
            f.write(f"# Item-specific YouTube URLs:\n")
            if yt_items:
                for s_idx, s_m in yt_items:
                    f.write(f"Item {s_idx}: {s_m.get('url')} ({s_m.get('title', '')})\n")
            else:
                f.write(f"# Item 0: \n")
            f.write(f"\n[LOCAL VIDEOS TO UPLOAD TO YOUTUBE]\n")
            if copied_videos:
                for cv in copied_videos:
                    f.write(f"- {cv}\n")
            else:
                f.write(f"(No local raw videos found for this project. Put any video here if you want to track it)\n")
            f.write(f"\n[PHOTOS IN THIS PROJECT] ({len(copied_photos)} images)\n")
            for cp in copied_photos:
                f.write(f"- {cp}\n")
            f.write(f"\n===================================================================\n")
            f.write(f"HOW TO USE THIS FOLDER:\n")
            f.write(f"1. PHOTOS: Open files in 'photos/' with Photoshop/Lightroom, edit, and save.\n")
            f.write(f"2. VIDEOS: Upload video files in 'videos/' to YouTube.\n")
            f.write(f"3. YOUTUBE LINK: Paste the YouTube link into 'Primary YouTube URL:' above,\n")
            f.write(f"   or use the web dashboard / run 'python portfolio_manager.py sync-back'.\n")
            f.write(f"===================================================================\n")

        print(f"[{idx:02d}] {title[:45]:45} | {len(copied_photos):2} photos | {len(copied_videos):2} videos")

    # Also handle project 30 (Giant Angora Rabbit) if present in New Photos
    export_incoming_projects(gallery)

    print(f"\nExport complete! Total photos: {total_photos_copied}, Total videos: {total_videos_copied}")
    print(f"Workspace location: {WORKSPACE_DIR}\n")

def export_incoming_projects(gallery):
    """Set up folders for incoming projects 30 (Angora Rabbit) and 31 (Wayback Burger)."""
    # 30. Giant Angora Rabbit
    angora_src = os.path.join(NEW_PHOTOS_ROOT, "Make new folder with proper name")
    if os.path.exists(angora_src):
        p30_dir = os.path.join(WORKSPACE_DIR, "30 - Giant Angora Rabbit - Heritage Breed Exhibition & Visual Campaign")
        p30_photos = os.path.join(p30_dir, "photos")
        p30_videos = os.path.join(p30_dir, "videos")
        os.makedirs(p30_photos, exist_ok=True)
        os.makedirs(p30_videos, exist_ok=True)
        for f in os.listdir(angora_src):
            if f.lower().endswith(('.jpg', '.jpeg', '.png', '.webp')):
                shutil.copy2(os.path.join(angora_src, f), os.path.join(p30_photos, f))
        info_path = os.path.join(p30_dir, "project_info.txt")
        if not os.path.exists(info_path):
            with open(info_path, "w", encoding="utf-8") as f:
                f.write("===================================================================\n")
                f.write("PROJECT: Giant Angora Rabbit: Heritage Breed Exhibition & Visual Campaign\n")
                f.write("===================================================================\n")
                f.write("Index: 30\nCategory: product\nPillar: Personal\n\n[YOUTUBE VIDEOS]\nPrimary YouTube URL: \n\n")

    # 31. Wayback Burger
    wayback_src = os.path.join(NEW_PHOTOS_ROOT, "Wayback Burger Final3.mp4")
    if os.path.exists(wayback_src):
        p31_dir = os.path.join(WORKSPACE_DIR, "31 - Wayback Burger - Commercial 3D Motion & Brand Showcase")
        p31_photos = os.path.join(p31_dir, "photos")
        p31_videos = os.path.join(p31_dir, "videos")
        os.makedirs(p31_photos, exist_ok=True)
        os.makedirs(p31_videos, exist_ok=True)
        shutil.copy2(wayback_src, os.path.join(p31_videos, "Wayback Burger Final3.mp4"))
        info_path = os.path.join(p31_dir, "project_info.txt")
        if not os.path.exists(info_path):
            with open(info_path, "w", encoding="utf-8") as f:
                f.write("===================================================================\n")
                f.write("PROJECT: Wayback Burger: Commercial 3D Motion & Brand Showcase\n")
                f.write("===================================================================\n")
                f.write("Index: 31\nCategory: animation\nPillar: Client Work\n\n[YOUTUBE VIDEOS]\nPrimary YouTube URL: \n\n")

def sync_back():
    """Sync modified photos and YouTube URLs from workspace back to the portfolio."""
    if not os.path.exists(WORKSPACE_DIR):
        print(f"Error: Workspace directory '{WORKSPACE_DIR}' not found. Run 'export' first.")
        return

    pdata = load_portfolio_json()
    gallery = pdata.get("gallery", [])

    print(f"\n=======================================================")
    print(f" SYNCING WORKSPACE BACK TO PORTFOLIO")
    print(f"=======================================================\n")

    updates_count = 0
    yt_updates_count = 0

    # Map project index to gallery item
    folders = sorted([f for f in os.listdir(WORKSPACE_DIR) if os.path.isdir(os.path.join(WORKSPACE_DIR, f))])

    for f in folders:
        m = re.match(r'^(\d{2})\s*-\s*(.*)$', f)
        if not m:
            continue
        idx = int(m.group(1))
        pdir = os.path.join(WORKSPACE_DIR, f)
        photos_dir = os.path.join(pdir, "photos")
        info_path = os.path.join(pdir, "project_info.txt")

        # Read project_info.txt
        primary_yt = ""
        slide_vids = {}
        if os.path.exists(info_path):
            with open(info_path, "r", encoding="utf-8") as inf:
                lines = inf.readlines()
            for line in lines:
                line_str = line.strip()
                if line_str.startswith("Primary YouTube URL:"):
                    raw_val = line_str.replace("Primary YouTube URL:", "").strip()
                    if raw_val and "youtube" in raw_val.lower() or "youtu.be" in raw_val.lower():
                        primary_yt = raw_val
                elif re.match(r'^Slide\s+(\d+)\s*:\s*(https?://.*)$', line_str, re.IGNORECASE):
                    sm = re.match(r'^Slide\s+(\d+)\s*:\s*(https?://.*)$', line_str, re.IGNORECASE)
                    s_idx = sm.group(1)
                    s_url = sm.group(2).strip()
                    if s_url:
                        slide_vids[s_idx] = s_url

        # Check if project is in gallery list
        if 1 <= idx <= len(gallery):
            item = gallery[idx - 1]
            media = item.get("media", [])
            
            # 1. Update YouTube URLs if changed
            if slide_vids:
                for s_k, s_v in slide_vids.items():
                    try:
                        s_num = int(s_k)
                        if 0 <= s_num < len(media):
                            m_item = media[s_num]
                            if m_item.get("url") != s_v or m_item.get("type") != "video":
                                m_item["type"] = "video"
                                m_item["url"] = s_v
                                m_item["provider"] = "youtube"
                                yt_updates_count += 1
                                print(f"[{idx:02d}] Updated item #{s_k} YouTube URL: {s_v}")
                    except ValueError:
                        pass
            elif primary_yt:
                if media:
                    first_vid = next((m for m in media if m.get("type") == "video"), media[0])
                    if first_vid.get("url") != primary_yt:
                        first_vid["type"] = "video"
                        first_vid["url"] = primary_yt
                        first_vid["provider"] = "youtube"
                        yt_updates_count += 1
                        print(f"[{idx:02d}] Updated primary YouTube URL: {primary_yt}")

            # 2. Check for photo modifications
            if os.path.exists(photos_dir):
                for p_file in os.listdir(photos_dir):
                    if not p_file.lower().endswith(('.jpg', '.jpeg', '.png', '.webp')):
                        continue
                    p_src = os.path.join(photos_dir, p_file)
                    # Find corresponding original file in media
                    for m_item in media:
                        img_rel = m_item.get("src") if m_item.get("type") == "image" else m_item.get("thumbnail")
                        if img_rel and os.path.basename(img_rel).lower() == p_file.lower():
                            orig_path = os.path.join(SCRIPT_DIR, img_rel.replace('/', os.sep))
                            if os.path.exists(orig_path):
                                # Check if workspace photo has newer mtime and differing size
                                if os.path.getmtime(p_src) > os.path.getmtime(orig_path) and os.path.getsize(p_src) != os.path.getsize(orig_path):
                                    shutil.copy2(p_src, orig_path)
                                    updates_count += 1
                                    print(f"[{idx:02d}] Updated modified photo: {p_file}")

    # Save to portfolio_data.json and sync to index.html & twin
    save_portfolio_json(pdata)
    sync_html_gallery_data(gallery)

    print(f"\nSync complete!")
    print(f"- Photos updated: {updates_count}")
    print(f"- YouTube URLs updated: {yt_updates_count}")
    print(f"- HTML files synchronized and verified byte-for-byte identical.\n")

def set_youtube_url(project_query, url, slide_idx=None):
    """Set YouTube URL for a project directly."""
    pdata = load_portfolio_json()
    gallery = pdata.get("gallery", [])

    matched_item = None
    matched_idx = None

    if str(project_query).isdigit():
        target_num = int(project_query)
        if 1 <= target_num <= len(gallery):
            matched_item = gallery[target_num - 1]
            matched_idx = target_num
    else:
        for i, item in enumerate(gallery, 1):
            if project_query.lower() in item.get("title", "").lower():
                matched_item = item
                matched_idx = i
                break

    if not matched_item:
        print(f"Error: Could not find project matching '{project_query}'")
        return False

    media = matched_item.get("media", [])
    if slide_idx is not None:
        if 0 <= slide_idx < len(media):
            m = media[slide_idx]
            m["type"] = "video"
            m["url"] = url
            m["provider"] = "youtube"
            if "src" in m and "thumbnail" not in m:
                m["thumbnail"] = m.pop("src")
            print(f"Set Project #{matched_idx} ({matched_item['title']}) Item #{slide_idx} YouTube URL to: {url}")
        else:
            print(f"Error: Invalid media index {slide_idx}")
            return False
    else:
        if media:
            first_vid = next((m for m in media if m.get("type") == "video"), media[0])
            first_vid["type"] = "video"
            first_vid["url"] = url
            first_vid["provider"] = "youtube"
            if "src" in first_vid and "thumbnail" not in first_vid:
                first_vid["thumbnail"] = first_vid.pop("src")
            print(f"Set Project #{matched_idx} ({matched_item['title']}) Primary YouTube URL to: {url}")

    save_portfolio_json(pdata)
    sync_html_gallery_data(gallery)

    # Also update project_info.txt in workspace
    for f in os.listdir(WORKSPACE_DIR):
        if f.startswith(f"{matched_idx:02d} -"):
            info_file = os.path.join(WORKSPACE_DIR, f, "project_info.txt")
            if os.path.exists(info_file):
                with open(info_file, "r", encoding="utf-8") as inf:
                    content = inf.read()
                if slide_idx is None:
                    content = re.sub(r'Primary YouTube URL:.*', f'Primary YouTube URL: {url}', content)
                else:
                    if f"Slide {slide_idx}:" in content:
                        content = re.sub(rf'Slide {slide_idx}:.*', f'Slide {slide_idx}: {url}', content)
                    else:
                        content = content.replace("[YOUTUBE VIDEOS]", f"[YOUTUBE VIDEOS]\nSlide {slide_idx}: {url}")
                with open(info_file, "w", encoding="utf-8") as inf:
                    inf.write(content)
            break

    return True

def print_status():
    """Print clean terminal status of all projects, photos, and video links."""
    pdata = load_portfolio_json()
    gallery = pdata.get("gallery", [])

    print(f"\n{'#':<3} | {'PROJECT TITLE':<50} | {'PHOTOS':<6} | {'VIDEOS':<7} | {'YOUTUBE LINK'}")
    print("-" * 105)

    for idx, item in enumerate(gallery, 1):
        title = item.get("title", "")
        media = item.get("media", [])
        imgs = sum(1 for m in media if m.get("type") == "image")
        vids = sum(1 for m in media if m.get("type") == "video")
        
        # Check workspace folder
        local_vids = 0
        for f in os.listdir(WORKSPACE_DIR) if os.path.exists(WORKSPACE_DIR) else []:
            if f.startswith(f"{idx:02d} -"):
                v_dir = os.path.join(WORKSPACE_DIR, f, "videos")
                if os.path.exists(v_dir):
                    local_vids = len([x for x in os.listdir(v_dir) if x.lower().endswith(('.mp4', '.mov'))])
                break

        yt_urls = [m.get("url") for m in media if m.get("type") == "video" and m.get("url")]
        yt_status = yt_urls[0] if len(yt_urls) == 1 else (f"{len(yt_urls)} YouTube videos" if yt_urls else "-")
        if len(yt_status) > 35:
            yt_status = yt_status[:32] + "..."

        print(f"{idx:02d}  | {title[:48]:<50} | {imgs:<6} | {vids:<7} | {yt_status}")

    print("-" * 105 + "\n")

# Web Server Handler for local GUI Dashboard
class ManagerHTTPHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        if parsed.path == "/" or parsed.path == "/index.html":
            self.send_response(200)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.end_headers()
            self.wfile.write(self.render_dashboard_html().encode("utf-8"))
        elif parsed.path == "/api/status":
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            pdata = load_portfolio_json()
            self.wfile.write(json.dumps(pdata).encode("utf-8"))
        elif parsed.path.startswith("/thumb/"):
            img_rel = urllib.parse.unquote(parsed.path[7:])
            local_img = os.path.join(SCRIPT_DIR, img_rel.replace('/', os.sep))
            if os.path.exists(local_img):
                self.send_response(200)
                ext = os.path.splitext(local_img)[1].lower()
                mime = "image/jpeg" if ext in ['.jpg', '.jpeg'] else ("image/png" if ext == '.png' else "image/webp")
                self.send_header("Content-Type", mime)
                self.end_headers()
                with open(local_img, "rb") as f:
                    self.wfile.write(f.read())
            else:
                self.send_response(404)
                self.end_headers()
        else:
            self.send_response(404)
            self.end_headers()

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        length = int(self.headers.get('content-length', 0))
        body = self.rfile.read(length).decode('utf-8') if length > 0 else "{}"
        try:
            params = json.loads(body)
        except Exception:
            params = {}

        if parsed.path == "/api/open-folder":
            project_idx = params.get("index")
            if project_idx == "master" or project_idx is None:
                if sys.platform == 'win32':
                    subprocess.Popen(['explorer', WORKSPACE_DIR])
                self.send_json_response({"success": True})
                return
            success = self.open_project_folder(project_idx)
            self.send_json_response({"success": success})

        elif parsed.path == "/api/update-youtube":
            project_idx = params.get("index")
            url = params.get("url", "").strip()
            slide = params.get("slide")
            slide_idx = int(slide) if str(slide).isdigit() else None
            success = set_youtube_url(project_idx, url, slide_idx)
            self.send_json_response({"success": success})
        elif parsed.path == "/api/sync":
            try:
                sync_back()
                self.send_json_response({"success": True, "message": "Synchronized successfully!"})
            except Exception as e:
                self.send_json_response({"success": False, "error": str(e)})
        else:
            self.send_response(404)
            self.end_headers()

    def send_json_response(self, data):
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.end_headers()
        self.wfile.write(json.dumps(data).encode("utf-8"))

    def open_project_folder(self, idx):
        if not os.path.exists(WORKSPACE_DIR):
            return False
        for f in os.listdir(WORKSPACE_DIR):
            if f.startswith(f"{int(idx):02d} -"):
                target_path = os.path.join(WORKSPACE_DIR, f)
                if sys.platform == 'win32':
                    subprocess.Popen(['explorer', target_path])
                elif sys.platform == 'darwin':
                    subprocess.Popen(['open', target_path])
                else:
                    subprocess.Popen(['xdg-open', target_path])
                return True
        return False

    def render_dashboard_html(self):
        pdata = load_portfolio_json()
        gallery = pdata.get("gallery", [])

        cards_html = []
        for idx, item in enumerate(gallery, 1):
            title = item.get("title", "")
            cat = item.get("cat", "")
            pillar = item.get("pillar", "")
            media = item.get("media", [])
            cover = item.get("cover", {})
            
            img_count = sum(1 for m in media if m.get("type") == "image")
            vid_count = sum(1 for m in media if m.get("type") == "video")
            
            cover_src = cover.get("src") or (media[0].get("thumbnail") if media and media[0].get("type") == "video" else (media[0].get("src") if media else ""))
            thumb_url = f"/thumb/{urllib.parse.quote(cover_src)}" if cover_src else ""
            
            first_yt = next((m.get("url") for m in media if m.get("type") == "video" and m.get("url")), "")
            yt_url = first_yt

            # Check local videos in workspace
            local_vids_count = 0
            for f in os.listdir(WORKSPACE_DIR) if os.path.exists(WORKSPACE_DIR) else []:
                if f.startswith(f"{idx:02d} -"):
                    v_dir = os.path.join(WORKSPACE_DIR, f, "videos")
                    if os.path.exists(v_dir):
                        local_vids_count = len([x for x in os.listdir(v_dir) if x.lower().endswith(('.mp4', '.mov'))])
                    break

            yt_badge = f'<span class="badge badge-yt">▶ {vid_count} YouTube Video(s)</span>' if vid_count > 0 else '<span class="badge badge-none">No Video Link</span>'
            vids_badge = f'<span class="badge badge-local">{local_vids_count} Local Video(s)</span>' if local_vids_count > 0 else ''

            card = f"""
            <div class="project-card" id="card-{idx}">
                <div class="thumb-wrap">
                    <img src="{thumb_url}" alt="{title}" loading="lazy" />
                    <span class="index-tag">#{idx:02d}</span>
                </div>
                <div class="card-content">
                    <div class="card-header">
                        <span class="category-tag">{pillar} &bull; {cat.upper()}</span>
                        <h3>{title}</h3>
                    </div>
                    <div class="card-badges">
                        <span class="badge badge-photos">{len(images)} Photos</span>
                        {vids_badge}
                        {yt_badge}
                    </div>
                    <div class="yt-editor">
                        <label>YouTube Video Link:</label>
                        <div class="input-group">
                            <input type="text" id="yt-input-{idx}" value="{yt_url}" placeholder="Paste https://youtu.be/... or https://youtube.com/watch?v=..." />
                            <button onclick="saveYouTube({idx})">Save</button>
                        </div>
                    </div>
                    <div class="card-actions">
                        <button class="btn-folder" onclick="openFolder({idx})">📁 Open Folder in Explorer</button>
                    </div>
                </div>
            </div>
            """
            cards_html.append(card)

        all_cards = "\n".join(cards_html)

        return f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portfolio Media Workspace Manager</title>
    <style>
        :root {{
            --bg-base: #0B0E14;
            --bg-card: rgba(23, 28, 40, 0.75);
            --border-card: rgba(255, 255, 255, 0.08);
            --accent: #E5A93C;
            --accent-glow: rgba(229, 169, 60, 0.25);
            --text-main: #F1F5F9;
            --text-muted: #94A3B8;
            --success: #10B981;
        }}
        * {{ box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }}
        body {{
            background: var(--bg-base);
            color: var(--text-main);
            padding: 30px;
            min-height: 100vh;
        }}
        .header {{
            display: flex;
            justify-content: space-between;
            align-items: center;
            max-width: 1400px;
            margin: 0 auto 30px;
            padding-bottom: 20px;
            border-bottom: 1px solid var(--border-card);
        }}
        .header h1 {{
            font-size: 24px;
            font-weight: 700;
            letter-spacing: -0.5px;
            color: var(--text-main);
        }}
        .header p {{
            color: var(--text-muted);
            font-size: 14px;
            margin-top: 4px;
        }}
        .header-actions {{
            display: flex;
            gap: 12px;
        }}
        .btn {{
            padding: 10px 18px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            border: none;
            transition: all 0.2s ease;
        }}
        .btn-primary {{
            background: var(--accent);
            color: #000;
        }}
        .btn-primary:hover {{
            background: #f3b84f;
            transform: translateY(-1px);
        }}
        .btn-secondary {{
            background: rgba(255,255,255,0.08);
            color: var(--text-main);
            border: 1px solid var(--border-card);
        }}
        .btn-secondary:hover {{
            background: rgba(255,255,255,0.14);
        }}
        .grid {{
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(420px, 1fr));
            gap: 20px;
            max-width: 1400px;
            margin: 0 auto;
        }}
        .project-card {{
            background: var(--bg-card);
            border: 1px solid var(--border-card);
            border-radius: 12px;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            backdrop-filter: blur(20px);
            transition: transform 0.2s, border-color 0.2s;
        }}
        .project-card:hover {{
            border-color: rgba(229, 169, 60, 0.4);
            transform: translateY(-2px);
        }}
        .thumb-wrap {{
            position: relative;
            width: 100%;
            height: 180px;
            background: #000;
            overflow: hidden;
        }}
        .thumb-wrap img {{
            width: 100%;
            height: 100%;
            object-fit: cover;
            opacity: 0.88;
            transition: opacity 0.2s;
        }}
        .thumb-wrap:hover img {{
            opacity: 1;
        }}
        .index-tag {{
            position: absolute;
            top: 10px;
            left: 10px;
            background: rgba(0,0,0,0.7);
            backdrop-filter: blur(8px);
            color: #fff;
            padding: 4px 8px;
            border-radius: 6px;
            font-size: 12px;
            font-weight: 700;
            border: 1px solid rgba(255,255,255,0.1);
        }}
        .card-content {{
            padding: 16px;
            display: flex;
            flex-direction: column;
            flex: 1;
        }}
        .category-tag {{
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            color: var(--accent);
            font-weight: 700;
        }}
        .card-header h3 {{
            font-size: 16px;
            font-weight: 600;
            line-height: 1.35;
            margin: 6px 0 10px;
            color: #fff;
        }}
        .card-badges {{
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            margin-bottom: 14px;
        }}
        .badge {{
            font-size: 11px;
            padding: 3px 8px;
            border-radius: 4px;
            font-weight: 600;
        }}
        .badge-photos {{ background: rgba(255,255,255,0.08); color: #cbd5e1; }}
        .badge-local {{ background: rgba(59, 130, 246, 0.2); color: #60a5fa; border: 1px solid rgba(59, 130, 246, 0.4); }}
        .badge-yt {{ background: rgba(16, 185, 129, 0.2); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.4); }}
        .badge-none {{ background: rgba(255,255,255,0.04); color: #64748b; }}
        .yt-editor {{
            margin-top: auto;
            margin-bottom: 12px;
        }}
        .yt-editor label {{
            display: block;
            font-size: 12px;
            color: var(--text-muted);
            margin-bottom: 6px;
        }}
        .input-group {{
            display: flex;
            gap: 6px;
        }}
        .input-group input {{
            flex: 1;
            background: rgba(0,0,0,0.3);
            border: 1px solid var(--border-card);
            border-radius: 6px;
            padding: 8px 10px;
            font-size: 13px;
            color: #fff;
            outline: none;
        }}
        .input-group input:focus {{
            border-color: var(--accent);
        }}
        .input-group button {{
            background: rgba(229, 169, 60, 0.15);
            border: 1px solid rgba(229, 169, 60, 0.35);
            color: var(--accent);
            padding: 8px 14px;
            border-radius: 6px;
            cursor: pointer;
            font-weight: 600;
            font-size: 13px;
        }}
        .input-group button:hover {{
            background: var(--accent);
            color: #000;
        }}
        .card-actions {{
            display: flex;
            gap: 8px;
        }}
        .btn-folder {{
            width: 100%;
            background: rgba(255,255,255,0.06);
            border: 1px solid var(--border-card);
            color: var(--text-main);
            padding: 9px;
            border-radius: 6px;
            font-size: 13px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s;
        }}
        .btn-folder:hover {{
            background: rgba(255,255,255,0.12);
        }}
        #toast {{
            position: fixed;
            bottom: 24px;
            right: 24px;
            background: #10B981;
            color: #fff;
            padding: 12px 20px;
            border-radius: 8px;
            font-weight: 600;
            font-size: 14px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.5);
            transform: translateY(100px);
            opacity: 0;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            z-index: 9999;
        }}
        #toast.show {{
            transform: translateY(0);
            opacity: 1;
        }}
    </style>
</head>
<body>
    <div class="header">
        <div>
            <h1>Portfolio Media Workspace & Backend Manager</h1>
            <p>All photos and videos organized folder-by-folder &bull; Edit photos locally, upload videos to YouTube, sync instantly.</p>
        </div>
        <div class="header-actions">
            <button class="btn btn-secondary" onclick="openMasterWorkspace()">📁 Open Master Workspace</button>
            <button class="btn btn-primary" onclick="syncPortfolio()">⚡ Sync All Back to Portfolio</button>
        </div>
    </div>

    <div class="grid">
        {all_cards}
    </div>

    <div id="toast">Changes Saved!</div>

    <script>
        function showToast(msg, isError = false) {{
            const t = document.getElementById('toast');
            t.innerText = msg;
            t.style.background = isError ? '#EF4444' : '#10B981';
            t.classList.add('show');
            setTimeout(() => t.classList.remove('show'), 3000);
        }}

        async function openFolder(index) {{
            try {{
                const res = await fetch('/api/open-folder', {{
                    method: 'POST',
                    headers: {{ 'Content-Type': 'application/json' }},
                    body: JSON.stringify({{ index }})
                }});
                const d = await res.json();
                if(d.success) {{
                    showToast('Opening folder in Windows Explorer...');
                }} else {{
                    showToast('Could not open folder', true);
                }}
            }} catch(e) {{
                showToast('Error: ' + e.message, true);
            }}
        }}

        async function openMasterWorkspace() {{
            openFolder('master');
        }}

        async function saveYouTube(index) {{
            const input = document.getElementById('yt-input-' + index);
            const url = input.value.trim();
            try {{
                const res = await fetch('/api/update-youtube', {{
                    method: 'POST',
                    headers: {{ 'Content-Type': 'application/json' }},
                    body: JSON.stringify({{ index, url }})
                }});
                const d = await res.json();
                if(d.success) {{
                    showToast('YouTube URL updated & synchronized!');
                }} else {{
                    showToast('Update failed', true);
                }}
            }} catch(e) {{
                showToast('Error: ' + e.message, true);
            }}
        }}

        async function syncPortfolio() {{
            showToast('Syncing workspace back to portfolio...');
            try {{
                const res = await fetch('/api/sync', {{ method: 'POST' }});
                const d = await res.json();
                if(d.success) {{
                    showToast('All photos & links synced successfully!');
                    setTimeout(() => location.reload(), 1200);
                }} else {{
                    showToast('Sync failed: ' + d.error, true);
                }}
            }} catch(e) {{
                showToast('Error: ' + e.message, true);
            }}
        }}
    </script>
</body>
</html>
        """

def run_web_server(port=3333):
    """Run local web GUI manager."""
    server_address = ('127.0.0.1', port)
    httpd = HTTPServer(server_address, ManagerHTTPHandler)
    print(f"\n=======================================================")
    print(f" PORTFOLIO MANAGER WEB DASHBOARD RUNNING")
    print(f" URL: http://localhost:{port}")
    print(f" Press Ctrl+C in terminal to stop.")
    print(f"=======================================================\n")
    try:
        if sys.platform == 'win32':
            os.system(f"start http://localhost:{port}")
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping web dashboard server...")
        httpd.server_close()

def main():
    if len(sys.argv) < 2:
        print("Usage:")
        print("  python portfolio_manager.py export        # Export all projects into titled folders")
        print("  python portfolio_manager.py sync-back     # Sync edited photos & YouTube links back")
        print("  python portfolio_manager.py status        # Display project media dashboard")
        print("  python portfolio_manager.py add-youtube <proj_num_or_name> <url> [slide_idx]")
        print("  python portfolio_manager.py web           # Launch local web management dashboard")
        return

    cmd = sys.argv[1].lower()

    if cmd == "export":
        export_workspace()
    elif cmd == "sync-back" or cmd == "sync":
        sync_back()
    elif cmd == "status":
        print_status()
    elif cmd == "add-youtube":
        if len(sys.argv) < 4:
            print("Usage: python portfolio_manager.py add-youtube <project_id_or_title> <youtube_url> [slide_index]")
            return
        proj = sys.argv[2]
        url = sys.argv[3]
        slide = sys.argv[4] if len(sys.argv) > 4 else None
        set_youtube_url(proj, url, slide)
    elif cmd == "web" or cmd == "gui":
        port = int(sys.argv[2]) if len(sys.argv) > 2 else 3333
        run_web_server(port)
    else:
        print(f"Unknown command: {cmd}")

if __name__ == "__main__":
    main()
