import re, sys
sys.stdout.reconfigure(encoding='utf-8')

f = r'F:\AntiGravity\Apps Data\Website Portfolio Work\rana_galaxy_portfolio_v3.html'
content = open(f, encoding='utf-8').read()

# Define Real Software Data (again for the script)
software_products = [
    {
        "name": "Pro Camera Tools For Blender",
        "price": "$23.99",
        "desc": "Realistic cinematic camera system for Blender designed to simplify professional camera setups.",
        "link": "https://superhivemarket.com/creator/products/pro-camera-tools-for-blender--realistic-cinematic-camera-system",
        "icon": "🎥"
    },
    {
        "name": "1-Click Product Render Pro",
        "price": "$23.49",
        "desc": "Rapid setup tool for professional-grade product rendering, including high-quality lighting and environments.",
        "link": "https://superhivemarket.com/creator/products/1-click-product-render-setup",
        "icon": "📦"
    },
    {
        "name": "1-Click LOD Generator",
        "price": "$14.49",
        "desc": "Instantly generates multiple Level of Detail (LOD) models for game engines with a single click.",
        "link": "https://superhivemarket.com/creator/products/1-click-lod-generator",
        "icon": "💎"
    },
    {
        "name": "Unity Bridge Exporter",
        "price": "$13.99",
        "desc": "One-click pipeline to export Blender rigs to Unity. Flattens constraints and drivers into raw keyframes.",
        "link": "https://superhivemarket.com/creator/products/unity-bridge-exporter--one-click-blender-to-unity-fbx-pipeline",
        "icon": "🔗"
    },
    {
        "name": "Stable Dropper",
        "price": "$13.99",
        "desc": "Physics-based tool for scattering and dropping objects realistically within a Blender scene.",
        "link": "https://superhivemarket.com/creator/products/stable-dropper",
        "icon": "💧"
    },
    {
        "name": "Smart Scene Optimizer",
        "price": "$13.99",
        "desc": "Automatically cleans and optimizes scenes by merging vertices and materials to boost performance.",
        "link": "https://superhivemarket.com/creator/products/smart-scene-optimizer-for-blender",
        "icon": "⚡"
    },
    {
        "name": "Quick Decimator & Optimizer",
        "price": "$11.49",
        "desc": "Batch processing tool to reduce polygon counts across multiple objects using quality presets.",
        "link": "https://superhivemarket.com/creator/products/quick-decimator--optimizer",
        "icon": "✂️"
    }
]

# Create the beautiful grid HTML
sw_grid_html = '<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; padding: 0 22px 22px;">\n'
for i, sw in enumerate(software_products):
    style = 'grid-column: span 2; height: 180px;' if i==0 else 'height: 160px;'
    sw_grid_html += f'''
    <div class="gc sw-card" onclick="window.open('{sw['link']}', '_blank')" style="{style} padding: 24px; display: flex; flex-direction: column; justify-content: space-between; position: relative; overflow: hidden; cursor: pointer;">
      <div style="display: flex; gap: 16px; align-items: flex-start;">
        <div style="width: 50px; height: 50px; border-radius: 12px; background: rgba(167,139,250,.15); display: flex; align-items: center; justify-content: center; font-size: 24px;">{sw['icon']}</div>
        <div>
          <div style="font-size: 16px; font-weight: 700; color: #fff; margin-bottom: 4px;">{sw['name']}</div>
          <div style="font-size: 11px; color: var(--pu2); font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 8px;">Blender Add-on</div>
          <div style="font-size: 13px; color: rgba(255,255,255,.6); line-height: 1.5; max-width: 400px;">{sw['desc']}</div>
        </div>
      </div>
      <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 15px;">
        <div style="font-size: 18px; font-weight: 700; color: #fff;">{sw['price']}</div>
        <button class="sa" style="background: var(--pu); color: #fff; border: none; padding: 8px 16px; border-radius: 20px; font-size: 11px; font-weight: 600;">Get on SuperHive →</button>
      </div>
    </div>\n'''
sw_grid_html += '</div>'

# Locate the section containing FluidSim+ and replace it
# I will search for the entire sw-grid or sw-list container
pattern = re.compile(r'<div class="sw-grid">.*?</div>\s*</div>', re.DOTALL)
if not pattern.search(content):
    # Fallback search for the specific swc cards if grid container not found
    pattern = re.compile(r'<div class="gc swc tilt">.*?</div>\s*</div>\s*</div>', re.DOTALL)

# Let's try a more robust approach: find the "Software & Tools" header and replace everything after it until the next section
header_pattern = re.compile(r'(<div class="sec" id="s-software">.*?<div class="sh">.*?</div>).*?(<div class="sec")', re.DOTALL)
if header_pattern.search(content):
    content = header_pattern.sub(r'\1' + sw_grid_html + r'\2', content)
else:
    # If no ID, just replace the grid area
    grid_pattern = re.compile(r'<div class="sw-grid">.*?</div>', re.DOTALL)
    content = grid_pattern.sub(sw_grid_html, content)

# One more check for the home page preview if any
content = content.replace('FluidSim+', 'Unity Bridge Exporter')
content = content.replace('LightKit Pro', 'Pro Camera Tools')
content = content.replace('ScatterVeg', 'Stable Dropper')

open(f, 'w', encoding='utf-8').write(content)
print("SUCCESS: Final placeholder sweep complete. All software items are now real.")
