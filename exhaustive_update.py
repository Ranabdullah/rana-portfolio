import os
import json
import re

html_path = r'f:\AntiGravity\Apps Data\Website Portfolio Work\rana_galaxy_portfolio_v3.html'
with open(html_path, 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Update Software Section based on Dashboard Screenshot
software_section = r"""<!-- SOFTWARE -->
<div class="sec" id="s-software">
  <div class="sh"><span class="st">Software & Add-ons</span><span class="ss">Advanced Blender Pipelines</span></div>
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 16px; padding: 0 22px 32px;">

    <div class="gc sw-card" onclick="window.open('#', '_blank')" style="padding: 28px; display: flex; flex-direction: column; justify-content: space-between; min-height: 220px">
      <div style="display: flex; gap: 20px; align-items: flex-start;">
        <div style="width: 54px; height: 54px; border-radius: 14px; background: rgba(167,139,250,.15); display: flex; align-items: center; justify-content: center; font-size: 28px; border: 1px solid rgba(167,139,250,0.2)">🎥</div>
        <div>
          <div style="font-size: 17px; font-weight: 700; color: #fff; margin-bottom: 4px; font-family:'Outfit'">Pro Camera Tools For Blender</div>
          <div style="font-size: 10px; color: var(--pu2); font-weight: 700; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 8px;">Cinematic System</div>
          <div style="font-size: 13px; color: var(--t2); line-height: 1.5;">Realistic cinematic camera system for Blender. Replicates professional focal dynamics.</div>
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
          <div style="font-size: 17px; font-weight: 700; color: #fff; margin-bottom: 4px; font-family:'Outfit'">1-Click Product Render Pro</div>
          <div style="font-size: 10px; color: var(--tl); font-weight: 700; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 8px;">Production Grade</div>
          <div style="font-size: 13px; color: var(--t2); line-height: 1.5;">High-end product visualization setup for Blender Cycles and Eevee.</div>
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
          <div style="font-size: 17px; font-weight: 700; color: #fff; margin-bottom: 4px; font-family:'Outfit'">1-Click Lod Generator</div>
          <div style="font-size: 10px; color: var(--pi); font-weight: 700; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 8px;">Optimization</div>
          <div style="font-size: 13px; color: var(--t2); line-height: 1.5;">Automated Level of Detail (LOD) creation for game-ready assets.</div>
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
          <div style="font-size: 13px; color: var(--t2); line-height: 1.5;">One-Click Blender To Unity Fbx Pipeline for seamless export.</div>
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
          <div style="font-size: 13px; color: var(--t2); line-height: 1.5;">Physics-based asset scattering and natural placement system.</div>
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
          <div style="font-size: 17px; font-weight: 700; color: #fff; margin-bottom: 4px; font-family:'Outfit'">Smart Scene Optimizer For Blender</div>
          <div style="font-size: 10px; color: var(--pu2); font-weight: 700; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 8px;">Performance</div>
          <div style="font-size: 13px; color: var(--t2); line-height: 1.5;">Optimize scene weights and textures for ultra-fast viewport response.</div>
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
          <div style="font-size: 17px; font-weight: 700; color: #fff; margin-bottom: 4px; font-family:'Outfit'">Quick Decimator & Optimizer</div>
          <div style="font-size: 10px; color: var(--pi); font-weight: 700; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 8px;">Mesh Polish</div>
          <div style="font-size: 13px; color: var(--t2); line-height: 1.5;">Rapidly decimate high-poly meshes while preserving detail.</div>
        </div>
      </div>
      <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 20px;">
        <div style="font-size: 20px; font-weight: 800; color: #fff;">$11.49</div>
        <button class="hcta" style="padding:8px 20px; font-size:11px; border-radius:10px; transform:none">Simplify Mesh</button>
      </div>
    </div>

  </div>
</div>"""

html = re.sub(r'<!-- SOFTWARE -->.*?</div>\s*</div>', software_section, html, flags=re.DOTALL)

# 2. Exhaustive CATS scan
root = r'f:\AntiGravity\Apps Data\Website Portfolio Work\Photos & to upload'
cats_dict = {}

# Pillar map (user feedback: Interior is personal)
pillar_map = {
    'Interior': 'personal',
    'Exterior': 'client',
    'Product Render': 'client',
    'Logo': 'client',
    'Rizpros': 'client',
    'Eskimo': 'client',
    'IDFL': 'client',
    'Get Connected Interior': 'client',
    'Clients': 'client',
    'Sketch': 'personal',
    'Nature': 'personal',
    'Scifi': 'personal',
    'Viking': 'personal',
    'Underground': 'personal',
    'Underwater': 'personal',
    'Train': 'personal',
    'Surrealism': 'personal',
    'Streets': 'personal',
    'Stairs': 'personal',
    'Sculptures': 'personal',
    'Plane': 'personal',
    'Miniature': 'personal',
    'Living Room': 'personal',
    'Kitchen': 'personal',
    'Japanese Building': 'personal',
    'Isometric': 'personal',
    'Egyptian Mythology': 'personal',
    'Doors': 'personal',
    'Corridor': 'personal',
    'Car': 'personal',
    'Bedroom': 'personal',
    'Bathroom': 'personal'
}

def scan_dir(dir_path, base_fe=""):
    files = []
    for f in os.listdir(dir_path):
        f_path = os.path.join(dir_path, f)
        if os.path.isfile(f_path) and f.lower().endswith(('.png', '.jpg', '.jpeg', '.mp4', '.mov', '.gif', '.exr')):
            f_type = 'video' if f.lower().endswith(('.mp4', '.mov')) else 'image'
            size = os.path.getsize(f_path)
            files.append({"n": os.path.splitext(f)[0], "e": f, "t": f_type, "s": size})
    return files

# Recursive scan for Client folder specifically to keep hierarchy or flatten
for item in os.listdir(root):
    if item == 'Canva 2023': continue
    item_path = os.path.join(root, item)
    if os.path.isdir(item_path):
        # Check if it has subfolders (like Client/)
        subfolders = [f for f in os.listdir(item_path) if os.path.isdir(os.path.join(item_path, f))]
        if subfolders:
            for sub in subfolders:
                sub_path = os.path.join(item_path, sub)
                cat_name = f"{item}/{sub}"
                pillar = 'client' if 'Client' in item else 'personal'
                # Check for even deeper subfolders
                subsub = [f for f in os.listdir(sub_path) if os.path.isdir(os.path.join(sub_path, f))]
                if subsub:
                    for ss in subsub:
                        ss_path = os.path.join(sub_path, ss)
                        cat_name_ss = f"{item}/{sub}/{ss}"
                        files = scan_dir(ss_path)
                        if files:
                            cats_dict[cat_name_ss] = {"name": ss, "pillar": pillar, "fe": cat_name_ss, "files": files}
                else:
                    files = scan_dir(sub_path)
                    if files:
                        cats_dict[cat_name] = {"name": sub, "pillar": pillar, "fe": cat_name, "files": files}
        else:
            files = scan_dir(item_path)
            if files:
                pillar = pillar_map.get(item, 'personal')
                cats_dict[item] = {"name": item, "pillar": pillar, "fe": item, "files": files}

# Daily Art Flow
top_files = scan_dir(root)
if top_files:
    cats_dict['Daily Art Flow'] = {"name": "Daily Art Flow", "pillar": "personal", "fe": "", "files": top_files}

cats_json = json.dumps(list(cats_dict.values()), indent=2)
html = re.sub(r'const CATS = \[.*?\];', f'const CATS = {cats_json};', html, flags=re.DOTALL)

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(html)

print("Exhaustive update complete.")
