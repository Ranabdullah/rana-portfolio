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

# Scan root files for "Daily Art Flow"
root_files = []
for f in os.listdir(base_dir):
    if os.path.isfile(os.path.join(base_dir, f)):
        ext = f.split('.')[-1].lower()
        if ext in ['jpg', 'jpeg', 'png', 'webp', 'mp4', 'mov']:
            t = 'video' if ext in ['mp4', 'mov'] else 'image'
            root_files.append({"n": f.split('.')[0], "e": f, "t": t})

if root_files:
    cats.append({
        "name": "Daily Art Flow",
        "pillar": "personal",
        "fe": "",
        "files": root_files
    })

# Scan subdirectories
for root, dirs, files in os.walk(base_dir):
    if root == base_dir:
        continue
    
    rel_path = os.path.relpath(root, base_dir).replace('\\', '/')
    name = os.path.basename(root)
    
    # Skip deep subdirs for now or handle them as part of parent
    # Let's just treat each leaf or direct child as a category
    
    category_files = []
    for f in files:
        ext = f.split('.')[-1].lower()
        if ext in ['jpg', 'jpeg', 'png', 'webp', 'mp4', 'mov']:
            t = 'video' if ext in ['mp4', 'mov'] else 'image'
            category_files.append({"n": f.split('.')[0], "e": f, "t": t})
    
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

print(json.dumps(cats, indent=2))
