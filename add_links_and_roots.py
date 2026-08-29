import os, re, sys, json
sys.stdout.reconfigure(encoding='utf-8')

BASE = r'F:\AntiGravity\Apps Data\Website Portfolio Work'
PHOTOS = os.path.join(BASE, 'Photos & to upload')
HTML = os.path.join(BASE, 'rana_galaxy_portfolio_v3.html')
IMG_EXT = {'.jpg','.jpeg','.png','.webp','.JPG','.PNG','.JPEG','.WEBP'}
VID_EXT = {'.mp4','.mov','.MOV','.MP4'}

def enc(s):
    return (s.replace('%','%25').replace(' ','%20')
             .replace('&','%26').replace('(','%28')
             .replace(')','%29').replace('#','%23')
             .replace("'",'%27'))

content = open(HTML, encoding='utf-8').read()

# ── TASK 1: Fix gallery - add root-level files as extra categories ────────────
# Scan root-level files (not in subdirs)
root_images = []
root_videos = []
for fname in sorted(os.listdir(PHOTOS)):
    fp = os.path.join(PHOTOS, fname)
    if os.path.isdir(fp): continue
    ext = os.path.splitext(fname)[1]
    sz = os.path.getsize(fp)
    if ext in VID_EXT:
        root_videos.append({'n': fname, 'e': enc(fname), 't': 'video', 's': sz})
    elif ext in IMG_EXT:
        root_images.append({'n': fname, 'e': enc(fname), 't': 'image', 's': sz})

root_images.sort(key=lambda x: -x['s'])
root_videos.sort(key=lambda x: -x['s'])

print(f"Root images: {len(root_images)}, Root videos: {len(root_videos)}")

# Build extra categories from root files
extra_cats = []
if root_videos:
    extra_cats.append({
        'name': 'Video Showreels',
        'fe': 'Photos%20%26%20to%20upload',
        'files': root_videos,
        'root': True
    })
if root_images:
    # Split into chunks of ~30 for manageable viewing
    extra_cats.append({
        'name': 'Featured Works',
        'fe': 'Photos%20%26%20to%20upload',
        'files': root_images[:40],
        'root': True
    })
    if len(root_images) > 40:
        extra_cats.append({
            'name': 'More Works',
            'fe': 'Photos%20%26%20to%20upload',
            'files': root_images[40:],
            'root': True
        })

# Rebuild CATS with extra categories
# Parse existing CATS from JS
cats_match = re.search(r'const CATS=(\[.*?\]);', content, re.DOTALL)
if cats_match:
    existing_cats = json.loads(cats_match.group(1))
    # Add root files - fix their paths (they're in root, not subfolder)
    # For root files, the path is Photos%20%26%20to%20upload/filename directly
    # Update the fe to empty string and handle in JS
    for cat in extra_cats:
        if cat.get('root'):
            cat['fe'] = ''  # signal to use base path only
    
    all_cats = existing_cats + extra_cats
    new_cats_js = 'const CATS=' + json.dumps(all_cats, ensure_ascii=False) + ';'
    content = content.replace(cats_match.group(0), new_cats_js, 1)
    print(f"CATS updated: {len(existing_cats)} subdir cats + {len(extra_cats)} root cats = {len(all_cats)} total")
else:
    print("WARNING: Could not find CATS in JS")

# Fix the JS path builder to handle root files (fe='')
old_path = "const PBASE='Photos%20%26%20to%20upload/';"
new_path = "const PBASE='Photos%20%26%20to%20upload/';"
# Update glbOpen to handle root files
old_glbopen = "if(f.t==='image') t.style.backgroundImage=`url('${PBASE}${cat.fe}/${f.e}')`;"
new_glbopen = "if(f.t==='image') t.style.backgroundImage=`url('${PBASE}${cat.fe?cat.fe+'/':''}${f.e}')`;"
content = content.replace(old_glbopen, new_glbopen, 1)

old_buildcat = "if(th&&th.t==='image') card.style.backgroundImage=`url('${PBASE}${cat.fe}/${th.e}')`;"
new_buildcat = "if(th&&th.t==='image') card.style.backgroundImage=`url('${PBASE}${cat.fe?cat.fe+'/':''}${th.e}')`;"
content = content.replace(old_buildcat, new_buildcat, 1)

old_glbshow_img = "img.src=`${PBASE}${cat.fe}/${f.e}`;"
new_glbshow_img = "img.src=`${PBASE}${cat.fe?cat.fe+'/':''}${f.e}`;"
content = content.replace(old_glbshow_img, new_glbshow_img, 1)

old_glbshow_vid = "v.src=`${PBASE}${cat.fe}/${f.e}`;"
new_glbshow_vid = "v.src=`${PBASE}${cat.fe?cat.fe+'/':''}${f.e}`;"
content = content.replace(old_glbshow_vid, new_glbshow_vid, 1)

print("Path builder updated for root files")

# ── TASK 2: Add Google Doc links to novels ────────────────────────────────────
novel_links = {
    'Children of Pain':     'https://docs.google.com/document/d/1ykCFTL430Gxn3IiQDUIVh-6bxdF-2WcEz8hC1-9eJR8/edit?usp=sharing',
    'Shavings':             'https://drive.google.com/file/d/1QSF-nl5vBgRO0GTFnYDVOtiD_nm5xeES/view?usp=sharing',
    'The Last Beacon':      'https://docs.google.com/document/d/1Vay40nA5vp0C1XGL0FQb7M1SrslvJOTD/edit?usp=sharing',
    'The Record Survives':  'https://docs.google.com/document/d/1y2j4iKLtMu2j9i9GjW476ObwiSYSbC6Z/edit?usp=sharing',
    'The Veil of Shadows':  'https://docs.google.com/document/d/10ZAEuxvSZFqViBpQUDcmWPKdDuoHQZsz/edit?usp=sharing',
    'What the Buffalo Carry':'https://docs.google.com/document/d/1zFb6Ul0jzMpeyWC3jaSv6pGRnyY4GIrBh0_A0YDbe6s/edit?usp=sharing',
    'Ten Days in Heaven':   'https://docs.google.com/document/d/1-HYEEwrUe0ZnU1JTJ4ewyqi9TI7qGaei/edit?usp=sharing',
}

# Store links as a JS object and update openBook + modal footer
links_js = 'const NOVEL_LINKS=' + json.dumps(novel_links) + ';'

# Update openBook to store current link and update button
old_openbook = "function openBook(title,genre,c1,c2,content){"
new_openbook = (links_js + "\nlet _curBookLink='';\nfunction openBook(title,genre,c1,c2,content){")
content = content.replace(old_openbook, new_openbook, 1)

# Update openBook body to set link
old_addclass = "  document.getElementById('bmod').classList.add('on');\n}"
new_addclass = (
    "  _curBookLink=NOVEL_LINKS[title]||'';\n"
    "  const rb=document.getElementById('bmod-read');\n"
    "  if(rb){if(_curBookLink){rb.style.display='';rb.onclick=()=>window.open(_curBookLink,'_blank');}else{rb.style.display='none';}}\n"
    "  document.getElementById('bmod').classList.add('on');\n}"
)
content = content.replace(old_addclass, new_addclass, 1)

# Update modal footer to add Read Online button
old_bfoot = '<div class="bfoot"><button class="bb">← Prev</button><button class="bb pp">Continue reading</button><button class="bb">Next →</button></div>'
new_bfoot = '<div class="bfoot"><button class="bb" onclick="closeBook()">← Back</button><button id="bmod-read" class="bb pp" target="_blank">📖 Read Online</button><button class="bb" onclick="go(\'stories\')">All Stories →</button></div>'
content = content.replace(old_bfoot, new_bfoot, 1)
print("Novel links + Read Online button added")

open(HTML, 'w', encoding='utf-8').write(content)
print("SUCCESS: Gallery + novel links updated")
