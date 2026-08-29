import json
import re

file_path = "f:/AntiGravity/Apps Data/Website Portfolio Work/rana_galaxy_portfolio_v3.html"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Extract the CATS array
match = re.search(r'const CATS=(\[.*?\]);\s*let glbCi=0', content, flags=re.DOTALL)
if match:
    cats_json_str = match.group(1)
    cats = json.loads(cats_json_str)

    # 1. Add Rizpros
    rizpros_exists = any(cat['name'] == 'Rizpros' for cat in cats)
    if not rizpros_exists:
        cats.insert(1, {
            "name": "Rizpros Project",
            "fe": "Client/Rizpros",
            "files": [
                {"n": "Image 1", "e": "321956115_861542094963804_3490055982672361241_n.jpg", "t": "image", "s": 1027182},
                {"n": "Image 2", "e": "4.png", "t": "image", "s": 2026768},
                {"n": "Image 3", "e": "IMG20220429115610.jpg", "t": "image", "s": 749796},
                {"n": "Image 4", "e": "Image_0010008.png", "t": "image", "s": 12580907}
            ]
        })

    # 2. Fix Nature videos
    for cat in cats:
        if cat['name'] == 'Nature':
            for f in cat['files']:
                if f['t'] == 'video':
                    f['t'] = 'image'
                    f['n'] = f['n'].replace('.mp4', ' Screenshot')
                    f['e'] = f['e'].replace('.mp4', '_screenshot.jpg')

    new_cats_str = json.dumps(cats)
    # Put it back
    new_content = content.replace(f"const CATS={cats_json_str};", f"const CATS={new_cats_str};")
    
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(new_content)
    print("Successfully updated CATS array!")
else:
    print("Could not find CATS array")
