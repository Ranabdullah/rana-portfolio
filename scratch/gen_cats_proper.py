import os
import json

base_dir = r"f:\AntiGravity\Apps Data\Website Portfolio Work\Photos & to upload"

pillars = {
    "Client": "client",
    "Get Connected Interior": "client",
    "Logo": "client",
    "Product Render": "client",
    "Interior": "client",
    "Exterior": "client"
}

cats = []

# Manual Fix for Rizpros (from user script)
rizpros = {
    "name": "Rizpros Project",
    "pillar": "client",
    "fe": "Client/Rizpros",
    "files": [
        {"n": "Product Showcase", "e": "321956115_861542094963804_3490055982672361241_n.jpg", "t": "image", "s": 1027182},
        {"n": "Packaging Design", "e": "4.png", "t": "image", "s": 2026768},
        {"n": "Retail Setup", "e": "IMG20220429115610.jpg", "t": "image", "s": 749796},
        {"n": "Digital Render", "e": "Image_0010008.png", "t": "image", "s": 12580907}
    ]
}

# Scan subdirectories
for root, dirs, files in os.walk(base_dir):
    if root == base_dir:
        continue
    
    rel_path = os.path.relpath(root, base_dir).replace('\\', '/')
    name = os.path.basename(root)
    
    # Skip Rizpros since we handle it manually
    if "Rizpros" in rel_path:
        continue
        
    category_files = []
    for f in files:
        f_path = os.path.join(root, f)
        size = os.path.getsize(f_path)
        ext = f.split('.')[-1].lower()
        if ext in ['jpg', 'jpeg', 'png', 'webp', 'mp4', 'mov', 'png', 'PNG']:
            t = 'video' if ext in ['mp4', 'mov'] else 'image'
            
            # Special logic for Nature videos
            if "Nature" in rel_path and t == 'video':
                # Skip the video file if it's a video in Nature, but the user script says replace it.
                # Actually, I'll just include the screenshot and skip the video to keep it clean.
                continue
            
            category_files.append({"n": f.split('.')[0], "e": f, "t": t, "s": size})
    
    if category_files:
        pillar = "personal"
        for k, v in pillars.items():
            if k in rel_path:
                pillar = v
                break
        
        cats.append({
            "name": name.replace('_', ' ').title(),
            "pillar": pillar,
            "fe": rel_path,
            "files": category_files
        })

# Insert Rizpros at index 1
cats.insert(1, rizpros)

# Final Daily Art Flow
root_files = []
for f in os.listdir(base_dir):
    if os.path.isfile(os.path.join(base_dir, f)):
        ext = f.split('.')[-1].lower()
        if ext in ['jpg', 'jpeg', 'png', 'webp', 'mp4', 'mov']:
            t = 'video' if ext in ['mp4', 'mov'] else 'image'
            root_files.append({"n": f.split('.')[0], "e": f, "t": t, "s": os.path.getsize(os.path.join(base_dir, f))})

if root_files:
    cats.append({
        "name": "Daily Art Flow",
        "pillar": "personal",
        "fe": "",
        "files": root_files
    })

print(json.dumps(cats))
