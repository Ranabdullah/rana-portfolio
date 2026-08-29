import re, sys, json
sys.stdout.reconfigure(encoding='utf-8')

f = r'F:\AntiGravity\Apps Data\Website Portfolio Work\rana_galaxy_portfolio_v3.html'
content = open(f, encoding='utf-8').read()

# 1. Update Social & Profile Links
social_links = {
    'linkedin': 'https://ie.linkedin.com/in/rana-abdullah-52246a87',
    'facebook': 'https://www.facebook.com/ranabdullah',
    'instagram': 'https://www.instagram.com/abdullahinayatart'
}

# Update Profile section name and tagline
content = content.replace('<div class="p-name">Rana Abdullah</div>', '<div class="p-name">Rana Abdullah</div>', 1)
content = content.replace('<div class="p-role">Senior 3D Artist & Creative Developer</div>', '<div class="p-role">Full Stack Developer & 3D Artist</div>', 1)

# 2. Update Software Section
software_products = [
    {
        "name": "Pro Camera Tools For Blender",
        "price": "$23.99",
        "desc": "Realistic cinematic camera system for Blender designed to simplify professional camera setups.",
        "link": "https://superhivemarket.com/creator/products/pro-camera-tools-for-blender--realistic-cinematic-camera-system"
    },
    {
        "name": "1-Click Product Render Pro",
        "price": "$23.49",
        "desc": "Rapid setup tool for professional-grade product rendering, including high-quality lighting and environments.",
        "link": "https://superhivemarket.com/creator/products/1-click-product-render-setup"
    },
    {
        "name": "1-Click LOD Generator",
        "price": "$14.49",
        "desc": "Instantly generates multiple Level of Detail (LOD) models for game engines with a single click.",
        "link": "https://superhivemarket.com/creator/products/1-click-lod-generator"
    },
    {
        "name": "Unity Bridge Exporter",
        "price": "$13.99",
        "desc": "One-click pipeline to export Blender rigs to Unity. Flattens constraints and drivers into raw keyframes.",
        "link": "https://superhivemarket.com/creator/products/unity-bridge-exporter--one-click-blender-to-unity-fbx-pipeline"
    },
    {
        "name": "Stable Dropper",
        "price": "$13.99",
        "desc": "Physics-based tool for scattering and dropping objects realistically within a Blender scene.",
        "link": "https://superhivemarket.com/creator/products/stable-dropper"
    },
    {
        "name": "Smart Scene Optimizer",
        "price": "$13.99",
        "desc": "Automatically cleans and optimizes scenes by merging vertices and materials to boost performance.",
        "link": "https://superhivemarket.com/creator/products/smart-scene-optimizer-for-blender"
    },
    {
        "name": "Quick Decimator & Optimizer",
        "price": "$11.49",
        "desc": "Batch processing tool to reduce polygon counts across multiple objects using quality presets.",
        "link": "https://superhivemarket.com/creator/products/quick-decimator--optimizer"
    }
]

sw_html = ""
for sw in software_products:
    sw_html += f'''    <div class="swc" onclick="window.open('{sw['link']}', '_blank')">
      <div class="sw-i">🛠️</div>
      <div class="sw-n">{sw['name']}</div>
      <div class="sw-d">{sw['desc']}</div>
      <div class="sw-p">{sw['price']}</div>
    </div>\n'''

# Find Software section and replace content
sw_pattern = re.compile(r'<!-- SOFTWARE -->.*?<div class="swg">.*?</div>', re.DOTALL)
new_sw_section = f'<!-- SOFTWARE -->\n<div class="sec" id="s-software">\n  <div class="sh"><span class="st">Software & Tools</span><span class="ss">Advanced Blender Add-ons & Pipelines</span></div>\n  <div class="swg">\n{sw_html}  </div>\n</div>'
content = sw_pattern.sub(new_sw_section, content)

# 3. Update Work Section
work_history = [
    {
        "role": "Full Stack Developer / Software Engineer",
        "comp": "IDFL International Ltd",
        "date": "2023 — Present",
        "icon": "💻",
        "color": "rgba(96,165,250,.12)"
    },
    {
        "role": "Head Designer",
        "comp": "Digiworld Ireland (Dublin)",
        "date": "2020 — 2023",
        "icon": "🎨",
        "color": "rgba(167,139,250,.12)"
    },
    {
        "role": "Graphic Designer",
        "comp": "Various Institutions",
        "date": "2018 — 2020",
        "icon": "🖋️",
        "color": "rgba(251,191,36,.12)"
    }
]

work_html = ""
for w in work_history:
    work_html += f'''    <div class="gc" style="padding:14px;display:flex;gap:12px;align-items:flex-start">
      <div style="width:34px;height:34px;border-radius:8px;background:{w['color']};display:flex;align-items:center;justify-content:center;font-size:15px;flex-shrink:0">{w['icon']}</div>
      <div>
        <div style="font-size:12.5px;font-weight:600;color:var(--t);margin-bottom:2px">{w['role']}</div>
        <div style="font-size:11px;color:var(--pu2);font-weight:500;margin-bottom:3px">{w['comp']}</div>
        <div style="font-size:10px;color:var(--t3)">{w['date']}</div>
      </div>
    </div>\n'''

work_pattern = re.compile(r'<!-- WORK -->.*?<div style="display:grid;grid-template-columns:1fr 1fr;gap:9px;padding:0 22px 22px">.*?</div>', re.DOTALL)
new_work_section = f'<!-- WORK -->\n<div class="sec" id="s-work">\n  <div class="sh"><span class="st">Experience</span><span class="ss">Professional Journey</span></div>\n  <div style="display:grid;grid-template-columns:1fr 1fr;gap:9px;padding:0 22px 22px">\n{work_html}  </div>\n</div>'
content = work_pattern.sub(new_work_section, content)

# 4. Update Social Section
social_html = f'''
  <div class="sh"><span class="st">Social Profiles</span><span class="ss">Connect with me</span></div>
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:9px;padding:0 22px 22px">
    <div class="gc" onclick="window.open('{social_links['linkedin']}', '_blank')" style="padding:14px;cursor:pointer;display:flex;align-items:center;gap:10px">
      <div style="font-size:18px">🔗</div><div style="font-size:12px;font-weight:600">LinkedIn</div>
    </div>
    <div class="gc" onclick="window.open('{social_links['instagram']}', '_blank')" style="padding:14px;cursor:pointer;display:flex;align-items:center;gap:10px">
      <div style="font-size:18px">📸</div><div style="font-size:12px;font-weight:600">Instagram</div>
    </div>
    <div class="gc" onclick="window.open('{social_links['facebook']}', '_blank')" style="padding:14px;cursor:pointer;display:flex;align-items:center;gap:10px">
      <div style="font-size:18px">👥</div><div style="font-size:12px;font-weight:600">Facebook</div>
    </div>
  </div>
'''

social_pattern = re.compile(r'<!-- SOCIAL -->.*?<div style="display:grid;grid-template-columns:repeat\(3,1fr\);gap:9px;padding:0 22px 22px">.*?</div>', re.DOTALL)
new_social_section = f'<!-- SOCIAL -->\n<div class="sec" id="s-social">\n{social_html}\n</div>'
content = social_pattern.sub(new_social_section, content)

# 5. Make Focus Gallery Section "Bigger" as requested
# Update .fgal height in CSS (from 420px to 600px)
content = content.replace('.fgal{display:grid;grid-template-columns:1fr 220px;gap:0;height:420px;', '.fgal{display:grid;grid-template-columns:1fr 250px;gap:0;height:600px;', 1)

open(f, 'w', encoding='utf-8').write(content)
print("SUCCESS: Professional data, software, and social links updated. Gallery height increased.")
