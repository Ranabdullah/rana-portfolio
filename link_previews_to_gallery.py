import re, sys
sys.stdout.reconfigure(encoding='utf-8')

f = r'F:\AntiGravity\Apps Data\Website Portfolio Work\rana_galaxy_portfolio_v3.html'
content = open(f, encoding='utf-8').read()

# I want to find the home preview items and map them to their categories in the CATS array
# The CATS array indices are:
# 0: Bathroom, 1: Bedroom, ..., 6: Egyptian Mythology, 7: Exterior, ... 19: Scifi, etc.

# Let's just update the openLB function to automatically open the category if it recognizes the path
# This is cleaner than updating 4-8 different HTML items.

new_openlb_js = """
function openLB(src,title,catName,desc){
  // Check if this matches a category path in CATS
  const foundIdx = CATS.findIndex(c => src.includes(c.fe) || (c.fe === '' && src.includes('Photos')));
  if(foundIdx !== -1) {
    glbOpen(foundIdx);
    // Find the specific file index within that category
    const fIdx = CATS[foundIdx].files.findIndex(f => src.includes(f.e));
    if(fIdx !== -1) glbShow(fIdx);
  } else {
    // Fallback to basic lightbox if no category match
    const main = document.getElementById('glb-main');
    const prev = main.querySelector('.glb-prev');
    const next = main.querySelector('.glb-next');
    main.innerHTML = '';
    main.appendChild(prev); main.appendChild(next);
    const img = document.createElement('img');
    img.src = src;
    img.style.cssText = 'max-width:100%;max-height:100%;object-fit:contain;border-radius:8px';
    main.appendChild(img);
    document.getElementById('glb-title').textContent = title;
    document.getElementById('glb-sub').textContent = catName;
    document.getElementById('glb').classList.add('on');
  }
}
"""

# Replace the current openLB function
content = re.sub(r'function openLB\(src,title,cat,desc\)\{.*?\}', new_openlb_js, content, flags=re.DOTALL)

# Ensure the Home Previews use valid thumbnail images from the actual folders
# I'll update the hardcoded home previews to use guaranteed files
previews = [
    {"name": "Exterior", "src": "Photos%20%26%20to%20upload/Exterior/All%20Work%20%28165%29.jpg", "cat": "Exterior Architecture"},
    {"name": "Egyptian Mythology", "src": "Photos%20%26%20to%20upload/Egyptian%20Mythology/All%20Work%20%28102%29.jpg", "cat": "Egyptian Mythology"},
    {"name": "Product Renders", "src": "Photos%20%26%20to%20upload/Product%20Render/Perfume%20%283%29.png", "cat": "Product Renders"},
    {"name": "Sci-Fi", "src": "Photos%20%26%20to%20upload/Scifi/27504008_1712440705473402_575554148592729872_o.jpg", "cat": "Sci-Fi Worlds"}
]

for p in previews:
    content = re.sub(
        f'<div class="gi" onclick="openLB\(\'[^\']*?\',\'{p["name"]}\'',
        f'<div class="gi" onclick="openLB(\'{p["src"]}\',\'{p["name"]}\'',
        content
    )

open(f, 'w', encoding='utf-8').write(content)
print("SUCCESS: Home previews linked to immersive category viewer.")
