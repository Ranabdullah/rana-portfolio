import re, sys
sys.stdout.reconfigure(encoding='utf-8')

f = r'F:\AntiGravity\Apps Data\Website Portfolio Work\rana_galaxy_portfolio_v3.html'
content = open(f, encoding='utf-8').read()

# 1. Update Page Title and Header
content = content.replace('<title>Rana Abdullah - Interactive Portfolio</title>', '<title>Rana Abdullah | Creative Portfolio</title>')
content = content.replace('Rana Abdullah <span style="font-size:12px;opacity:.5;font-weight:400;margin-left:10px">— Interactive galaxy portfolio prototype with backend CMS</span>', 'Rana Abdullah <span style="font-size:12px;opacity:.6;font-weight:400;margin-left:10px">— Creative Developer & 3D Artist</span>')

# 2. Define Real Software Data
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

# 3. Create NEW Software HTML (Bigger & Better)
def make_sw_card(sw, highlight=False):
    style = 'grid-column: span 2; height: 180px;' if highlight else 'height: 160px;'
    return f'''
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
    </div>
    '''

sw_grid_html = '<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; padding: 0 22px 22px;">\n'
for i, sw in enumerate(software_products):
    sw_grid_html += make_sw_card(sw, highlight=(i==0))
sw_grid_html += '</div>'

# 4. Replace the old software section entirely
# The old section was identified by the s-software ID or the surrounding comments
# I will find the div with id="s-software" and replace its inner content
pattern = re.compile(r'<div class="sec" id="s-software">.*?<div class="sh">.*?</div>.*?<div class="swg">.*?</div>.*?</div>', re.DOTALL)
new_section = f'''<div class="sec" id="s-software">
  <div class="sh"><span class="st">Software & Tools</span><span class="ss">Advanced Blender Pipelines</span></div>
  {sw_grid_html}
</div>'''

content = pattern.sub(new_section, content)

# 5. Add some hover effects for the new cards in CSS
content = content.replace('</style>', '.sw-card:hover { transform: translateY(-4px); border-color: rgba(167,139,250,0.4); box-shadow: 0 10px 30px rgba(0,0,0,0.5); }\n</style>')

open(f, 'w', encoding='utf-8').write(content)
print("SUCCESS: Header professionalized. Software section redesigned with real products and 'bigger' layout.")
