import os
import json
import re

html_path = r'f:\AntiGravity\Apps Data\Website Portfolio Work\rana_galaxy_portfolio_v3.html'
with open(html_path, 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Update Software Section
software_section = r"""<!-- SOFTWARE -->
<div class="sec" id="s-software">
  <div class="sh"><span class="st">Software & Add-ons</span><span class="ss">Advanced Blender Pipelines</span></div>
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 16px; padding: 0 22px 32px;">

    <div class="gc sw-card" onclick="window.open('#', '_blank')" style="padding: 28px; display: flex; flex-direction: column; justify-content: space-between; min-height: 220px">
      <div style="display: flex; gap: 20px; align-items: flex-start;">
        <div style="width: 54px; height: 54px; border-radius: 14px; background: rgba(167,139,250,.15); display: flex; align-items: center; justify-content: center; font-size: 28px; border: 1px solid rgba(167,139,250,0.2)">🎥</div>
        <div>
          <div style="font-size: 17px; font-weight: 700; color: #fff; margin-bottom: 4px; font-family:'Outfit'">Pro Camera Tools</div>
          <div style="font-size: 10px; color: var(--pu2); font-weight: 700; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 8px;">Cinematic System</div>
          <div style="font-size: 13px; color: var(--t2); line-height: 1.5;">Realistic camera simulation for Blender. Replicates pro focal dynamics and motion.</div>
        </div>
      </div>
      <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 20px;">
        <div style="font-size: 20px; font-weight: 800; color: #fff;">$23.99</div>
        <button class="hcta" style="padding:8px 20px; font-size:11px; border-radius:10px; transform:none">Acquire Addon</button>
      </div>
    </div>

    <div class="gc sw-card" onclick="window.open('#', '_blank')" style="padding: 28px; display: flex; flex-direction: column; justify-content: space-between; min-height: 220px">
      <div style="display: flex; gap: 20px; align-items: flex-start;">
        <div style="width: 54px; height: 54px; border-radius: 14px; background: rgba(96,165,250,.15); display: flex; align-items: center; justify-content: center; font-size: 28px; border: 1px solid rgba(96,165,250,0.2)">📦</div>
        <div>
          <div style="font-size: 17px; font-weight: 700; color: #fff; margin-bottom: 4px; font-family:'Outfit'">1-Click Product Render</div>
          <div style="font-size: 10px; color: var(--tl); font-weight: 700; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 8px;">Production Grade</div>
          <div style="font-size: 13px; color: var(--t2); line-height: 1.5;">Rapid setup for pro product rendering, with cinematic lighting and HDRI environments.</div>
        </div>
      </div>
      <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 20px;">
        <div style="font-size: 20px; font-weight: 800; color: #fff;">$23.49</div>
        <button class="hcta" style="padding:8px 20px; font-size:11px; border-radius:10px; transform:none">Acquire Addon</button>
      </div>
    </div>

    <div class="gc sw-card" onclick="window.open('#', '_blank')" style="padding: 28px; display: flex; flex-direction: column; justify-content: space-between; min-height: 220px">
      <div style="display: flex; gap: 20px; align-items: flex-start;">
        <div style="width: 54px; height: 54px; border-radius: 14px; background: rgba(244,114,182,.15); display: flex; align-items: center; justify-content: center; font-size: 28px; border: 1px solid rgba(244,114,182,0.2)">💎</div>
        <div>
          <div style="font-size: 17px; font-weight: 700; color: #fff; margin-bottom: 4px; font-family:'Outfit'">1-Click LOD Generator</div>
          <div style="font-size: 10px; color: var(--pi); font-weight: 700; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 8px;">Optimization</div>
          <div style="font-size: 13px; color: var(--t2); line-height: 1.5;">Automated LOD generation for high-performance real-time environments and assets.</div>
        </div>
      </div>
      <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 20px;">
        <div style="font-size: 20px; font-weight: 800; color: #fff;">$14.49</div>
        <button class="hcta" style="padding:8px 20px; font-size:11px; border-radius:10px; transform:none">Explore Tool</button>
      </div>
    </div>

    <div class="gc sw-card" onclick="window.open('#', '_blank')" style="padding: 28px; display: flex; flex-direction: column; justify-content: space-between; min-height: 220px">
      <div style="display: flex; gap: 20px; align-items: flex-start;">
        <div style="width: 54px; height: 54px; border-radius: 14px; background: rgba(52,211,153,.15); display: flex; align-items: center; justify-content: center; font-size: 28px; border: 1px solid rgba(52,211,153,0.2)">🌉</div>
        <div>
          <div style="font-size: 17px; font-weight: 700; color: #fff; margin-bottom: 4px; font-family:'Outfit'">Unity Bridge Exporter</div>
          <div style="font-size: 10px; color: var(--pu2); font-weight: 700; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 8px;">Workflow</div>
          <div style="font-size: 13px; color: var(--t2); line-height: 1.5;">One-Click Blender To Unity FBX pipeline for seamless asset integration.</div>
        </div>
      </div>
      <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 20px;">
        <div style="font-size: 20px; font-weight: 800; color: #fff;">$13.99</div>
        <button class="hcta" style="padding:8px 20px; font-size:11px; border-radius:10px; transform:none">View Pipeline</button>
      </div>
    </div>

    <div class="gc sw-card" onclick="window.open('#', '_blank')" style="padding: 28px; display: flex; flex-direction: column; justify-content: space-between; min-height: 220px">
      <div style="display: flex; gap: 20px; align-items: flex-start;">
        <div style="width: 54px; height: 54px; border-radius: 14px; background: rgba(251,191,36,.15); display: flex; align-items: center; justify-content: center; font-size: 28px; border: 1px solid rgba(251,191,36,0.2)">💧</div>
        <div>
          <div style="font-size: 17px; font-weight: 700; color: #fff; margin-bottom: 4px; font-family:'Outfit'">Stable Dropper</div>
          <div style="font-size: 10px; color: var(--tl); font-weight: 700; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 8px;">Physics Tool</div>
          <div style="font-size: 13px; color: var(--t2); line-height: 1.5;">Physics-based asset scattering and placement for natural environment layout.</div>
        </div>
      </div>
      <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 20px;">
        <div style="font-size: 20px; font-weight: 800; color: #fff;">$13.99</div>
        <button class="hcta" style="padding:8px 20px; font-size:11px; border-radius:10px; transform:none">Scatter Assets</button>
      </div>
    </div>

    <div class="gc sw-card" onclick="window.open('#', '_blank')" style="padding: 28px; display: flex; flex-direction: column; justify-content: space-between; min-height: 220px">
      <div style="display: flex; gap: 20px; align-items: flex-start;">
        <div style="width: 54px; height: 54px; border-radius: 14px; background: rgba(167,139,250,.15); display: flex; align-items: center; justify-content: center; font-size: 28px; border: 1px solid rgba(167,139,250,0.2)">⚡</div>
        <div>
          <div style="font-size: 17px; font-weight: 700; color: #fff; margin-bottom: 4px; font-family:'Outfit'">Smart Scene Optimizer</div>
          <div style="font-size: 10px; color: var(--pu2); font-weight: 700; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 8px;">Performance</div>
          <div style="font-size: 13px; color: var(--t2); line-height: 1.5;">Advanced scene analysis and optimization for faster viewport and render times.</div>
        </div>
      </div>
      <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 20px;">
        <div style="font-size: 20px; font-weight: 800; color: #fff;">$13.99</div>
        <button class="hcta" style="padding:8px 20px; font-size:11px; border-radius:10px; transform:none">Optimize Now</button>
      </div>
    </div>

    <div class="gc sw-card" onclick="window.open('#', '_blank')" style="padding: 28px; display: flex; flex-direction: column; justify-content: space-between; min-height: 220px">
      <div style="display: flex; gap: 20px; align-items: flex-start;">
        <div style="width: 54px; height: 54px; border-radius: 14px; background: rgba(244,114,182,.15); display: flex; align-items: center; justify-content: center; font-size: 28px; border: 1px solid rgba(244,114,182,0.2)">✂️</div>
        <div>
          <div style="font-size: 17px; font-weight: 700; color: #fff; margin-bottom: 4px; font-family:'Outfit'">Quick Decimator</div>
          <div style="font-size: 10px; color: var(--pi); font-weight: 700; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 8px;">Mesh Polish</div>
          <div style="font-size: 13px; color: var(--t2); line-height: 1.5;">Rapid mesh simplification with high silhouette retention for game assets.</div>
        </div>
      </div>
      <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 20px;">
        <div style="font-size: 20px; font-weight: 800; color: #fff;">$11.49</div>
        <button class="hcta" style="padding:8px 20px; font-size:11px; border-radius:10px; transform:none">Simplify Mesh</button>
      </div>
    </div>

  </div>
</div>"""

# Replace the software section
html = re.sub(r'<!-- SOFTWARE -->.*?</div>\s*</div>', software_section, html, flags=re.DOTALL)

# 2. Update CATS array
root = r'f:\AntiGravity\Apps Data\Website Portfolio Work\Photos & to upload'
cats_dict = {}
pillar_map = {
    'Interior': 'personal',  # User feedback: Interior should be personal
    'Exterior': 'client',
    'Get Connected Interior': 'client',
    'Product Render': 'client',
    'Logo': 'client',
    'Rizpros': 'client',
    'Eskimo': 'client',
    'IDFL': 'client',
    'Bathroom': 'personal',
    'Bedroom': 'personal',
    'Kitchen': 'personal',
    'Living Room': 'personal'
}

for item in os.listdir(root):
    if item == 'Canva 2023': continue  # User feedback: Remove Canva 2023
    item_path = os.path.join(root, item)
    if os.path.isdir(item_path):
        cat_name = item
        pillar = pillar_map.get(cat_name, 'personal')
        if 'Client/' in cat_name: pillar = 'client'
        
        files = []
        for f in os.listdir(item_path):
            if f.lower().endswith(('.png', '.jpg', '.jpeg', '.mp4', '.mov', '.gif', '.exr')):
                f_path = os.path.join(item_path, f)
                f_type = 'video' if f.lower().endswith(('.mp4', '.mov')) else 'image'
                size = os.path.getsize(f_path)
                files.append({"n": os.path.splitext(f)[0], "e": f, "t": f_type, "s": size})
        
        if files:
            cats_dict[cat_name] = {
                "name": cat_name,
                "pillar": pillar,
                "fe": cat_name,
                "files": files
            }

# Top level files (Daily Art Flow)
top_files = []
for f in os.listdir(root):
    f_path = os.path.join(root, f)
    if os.path.isfile(f_path) and f.lower().endswith(('.png', '.jpg', '.jpeg', '.mp4', '.mov', '.gif', '.exr')):
        f_type = 'video' if f.lower().endswith(('.mp4', '.mov')) else 'image'
        size = os.path.getsize(f_path)
        top_files.append({"n": os.path.splitext(f)[0], "e": f, "t": f_type, "s": size})

if top_files:
    cats_dict['Daily Art Flow'] = {
        "name": "Daily Art Flow",
        "pillar": "personal",
        "fe": "",
        "files": top_files
    }

cats_json = json.dumps(list(cats_dict.values()), indent=2)
html = re.sub(r'const CATS = \[.*?\];', f'const CATS = {cats_json};', html, flags=re.DOTALL)

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(html)

print("HTML file updated with personal Interior and exhaustive gallery.")
