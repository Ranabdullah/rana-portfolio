
# Part 1 - write CSS/head to a temp file
css = '''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Rana Abdullah | Creative Portfolio</title>
<meta name="description" content="3D Artist, Writer, Developer and Filmmaker. Blender add-ons, novels, and cinematic 3D work.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{
  --bg:#04020e;--bg2:#080515;--bg3:#0d0820;
  --pu:#7c3aed;--pu2:#a78bfa;--pu3:#ddd6fe;
  --bl:#3b82f6;--gn:#10b981;
  --t:#f8f7ff;--t2:#c4b5fd;--t3:rgba(248,247,255,.45);
  --br:rgba(167,139,250,.12);--br2:rgba(167,139,250,.25);
  --r:14px;--r2:10px;
}
html,body{height:100%;overflow:hidden;background:var(--bg);color:var(--t);font-family:'Inter',sans-serif}
/* CANVAS */
#cv{position:fixed;inset:0;z-index:0;pointer-events:none}
/* CURSOR GLOW */
#cg{position:fixed;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(124,58,237,.08) 0%,transparent 70%);pointer-events:none;z-index:1;transform:translate(-50%,-50%);transition:transform .08s linear}
/* LAYOUT */
.wrap{position:relative;z-index:2;height:100vh;display:flex;flex-direction:column;overflow:hidden}
/* NAV */
nav{display:flex;align-items:center;justify-content:space-between;padding:14px 28px;flex-shrink:0;border-bottom:.5px solid var(--br);backdrop-filter:blur(20px);background:rgba(4,2,14,.7)}
.logo{font-family:'Space Grotesk',sans-serif;font-size:18px;font-weight:700;color:var(--t);letter-spacing:-.02em}
.logo span{color:var(--pu2)}
.tabs{display:flex;gap:4px;background:rgba(255,255,255,.04);border:.5px solid var(--br);border-radius:50px;padding:4px}
.tab{padding:7px 16px;border-radius:40px;font-size:12px;font-weight:500;color:var(--t3);cursor:pointer;border:none;background:transparent;transition:all .25s;font-family:'Inter',sans-serif;letter-spacing:.01em}
.tab:hover{color:var(--t);background:rgba(255,255,255,.06)}
.tab.on{background:rgba(124,58,237,.2);color:var(--pu3);border:.5px solid rgba(124,58,237,.35)}
.nav-r{display:flex;gap:8px;align-items:center}
.bkbtn{font-size:11px;padding:7px 14px;border-radius:8px;background:rgba(124,58,237,.15);border:.5px solid var(--br2);color:var(--pu2);cursor:pointer;font-family:'Inter',sans-serif;transition:all .2s}
.bkbtn:hover{background:rgba(124,58,237,.3)}
/* MAIN SCROLL */
#main{flex:1;overflow-y:auto;scroll-behavior:smooth;scrollbar-width:thin;scrollbar-color:var(--br) transparent}
/* SECTIONS */
.sec{display:none;min-height:calc(100vh - 60px);padding:0 0 80px}
.sec.on{display:block;animation:fadeIn .4s ease}
@keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
/* HERO */
.hero{padding:80px 52px 60px;position:relative}
.hero-badge{display:inline-flex;align-items:center;gap:8px;font-size:11px;color:var(--pu2);letter-spacing:.15em;text-transform:uppercase;font-weight:600;margin-bottom:28px;padding:6px 14px;border:.5px solid var(--br2);border-radius:20px;background:rgba(124,58,237,.06)}
.hero-badge::before{content:'';width:6px;height:6px;border-radius:50%;background:var(--pu2);animation:pulse 2s infinite}
@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(.8)}}
.hero-name{font-family:'Space Grotesk',sans-serif;font-size:clamp(52px,7vw,96px);font-weight:800;color:var(--t);line-height:.95;letter-spacing:-.04em;margin-bottom:24px}
.hero-name span{background:linear-gradient(135deg,var(--pu2),#60a5fa,var(--pu3));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.hero-sub{font-size:16px;color:var(--t3);line-height:1.7;max-width:520px;margin-bottom:40px;font-weight:400}
.hero-pills{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:44px}
.hpill{padding:8px 18px;border-radius:50px;font-size:12px;font-weight:500;border:.5px solid var(--br);color:var(--t2);background:rgba(255,255,255,.03);cursor:pointer;transition:all .25s}
.hpill:hover{background:rgba(124,58,237,.15);border-color:var(--br2);transform:translateY(-2px)}
.hero-ctas{display:flex;gap:12px}
.cta-p{padding:14px 32px;border-radius:50px;font-size:14px;font-weight:600;background:linear-gradient(135deg,var(--pu),#4f46e5);color:#fff;border:none;cursor:pointer;font-family:'Inter',sans-serif;transition:all .3s;letter-spacing:.01em}
.cta-p:hover{transform:translateY(-2px);box-shadow:0 12px 30px rgba(124,58,237,.4)}
.cta-s{padding:14px 28px;border-radius:50px;font-size:14px;font-weight:500;background:rgba(255,255,255,.05);color:var(--t);border:.5px solid var(--br);cursor:pointer;font-family:'Inter',sans-serif;transition:all .3s}
.cta-s:hover{background:rgba(255,255,255,.09);transform:translateY(-2px)}
/* SECTION HEADER */
.sh{display:flex;align-items:baseline;justify-content:space-between;padding:40px 52px 20px;gap:12px}
.st{font-family:'Space Grotesk',sans-serif;font-size:28px;font-weight:700;color:var(--t);letter-spacing:-.02em}
.ss{font-size:11px;color:var(--t3);letter-spacing:.08em;text-transform:uppercase;font-weight:500}
.sa{font-size:12px;color:var(--pu2);background:none;border:none;cursor:pointer;font-family:'Inter',sans-serif;font-weight:500;transition:color .2s}
.sa:hover{color:var(--pu3)}
/* GLASS CARD */
.gc{background:rgba(255,255,255,.03);border:.5px solid var(--br);border-radius:var(--r);transition:all .3s cubic-bezier(.23,1,.32,1)}
.gc:hover{background:rgba(255,255,255,.055);border-color:var(--br2);transform:translateY(-2px);box-shadow:0 10px 30px rgba(0,0,0,.4)}
/* BOOKS */
.bgr{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;padding:0 52px 20px}
.book{border-radius:var(--r);overflow:hidden;cursor:pointer;aspect-ratio:2/3;position:relative;transition:all .35s cubic-bezier(.23,1,.32,1)}
.book:hover{transform:translateY(-8px) scale(1.02);box-shadow:0 20px 50px rgba(0,0,0,.6),0 0 30px rgba(124,58,237,.15)}
.bcov{width:100%;height:100%;position:relative;background-size:cover;background-position:center}
.bcov::after{content:'';position:absolute;inset:0;background:linear-gradient(to top,rgba(4,2,14,.98) 0%,rgba(4,2,14,.2) 60%,transparent 100%)}
.bsp{position:absolute;inset:0;z-index:1}
.bif{position:absolute;bottom:0;left:0;right:0;padding:18px 16px;z-index:2}
.bgt{font-size:9px;color:var(--pu2);letter-spacing:.15em;text-transform:uppercase;font-weight:700;margin-bottom:6px}
.btt{font-family:'Space Grotesk',sans-serif;font-size:15px;font-weight:700;color:var(--t);line-height:1.2;letter-spacing:-.01em}
/* GALLERY GRID */
.gcat-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;padding:0 52px 20px}
.gcat-card{border-radius:var(--r);overflow:hidden;cursor:pointer;position:relative;height:160px;background-size:cover;background-position:center;border:.5px solid var(--br);transition:all .35s cubic-bezier(.23,1,.32,1)}
.gcat-card:hover{transform:scale(1.03) translateY(-3px);border-color:var(--br2);box-shadow:0 14px 40px rgba(0,0,0,.6),0 0 20px rgba(124,58,237,.12)}
.gcat-ovl{position:absolute;inset:0;background:linear-gradient(to top,rgba(4,2,14,.92) 0%,rgba(4,2,14,.08) 55%,transparent 100%)}
.gcat-info{position:absolute;bottom:0;left:0;right:0;padding:14px 16px}
.gcat-name{font-family:'Space Grotesk',sans-serif;font-size:14px;font-weight:700;color:#fff;margin-bottom:2px}
.gcat-meta{font-size:10px;color:rgba(240,235,255,.5)}
.gcat-badges{position:absolute;top:8px;right:8px;display:flex;gap:4px}
.gcat-bdg{font-size:8.5px;padding:2px 7px;border-radius:4px;background:rgba(0,0,0,.55);border:.5px solid rgba(255,255,255,.12);color:rgba(255,255,255,.7);backdrop-filter:blur(6px)}
.gcat-bdg.vid{background:rgba(124,58,237,.35);border-color:rgba(167,139,250,.45);color:#c4b5fd}
/* GALLERY LIGHTBOX */
.glb{display:none;position:fixed;inset:0;z-index:9999;background:rgba(2,0,10,.97);backdrop-filter:blur(30px);flex-direction:column}
.glb.on{display:flex;animation:fadeIn .28s ease}
.glb-inner{display:flex;flex-direction:column;height:100vh;padding:20px 24px}
.glb-hdr{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:16px;flex-shrink:0}
.glb-title{font-family:'Space Grotesk',sans-serif;font-size:22px;font-weight:700;color:#fff;letter-spacing:-.02em}
.glb-sub{font-size:11px;color:var(--pu2);text-transform:uppercase;letter-spacing:.1em;margin-top:4px}
.glb-body{flex:1;display:grid;grid-template-columns:1fr 200px;gap:16px;min-height:0}
.glb-main{position:relative;background:#06030f;border-radius:12px;overflow:hidden;display:flex;align-items:center;justify-content:center}
.glb-main img{max-width:100%;max-height:100%;object-fit:contain;border-radius:8px}
.glb-main video{width:100%;height:100%;object-fit:contain}
.glb-arrow{position:absolute;top:50%;transform:translateY(-50%);width:40px;height:40px;border-radius:50%;background:rgba(0,0,0,.65);border:.5px solid rgba(167,139,250,.3);color:#fff;cursor:pointer;font-size:22px;display:flex;align-items:center;justify-content:center;z-index:2;transition:all .2s;line-height:1}
.glb-arrow:hover{background:rgba(124,58,237,.4)}
.glb-prev{left:12px}.glb-next{right:12px}
.glb-sidebar{display:flex;flex-direction:column;gap:8px;overflow-y:auto;scrollbar-width:thin;scrollbar-color:var(--br) transparent}
.glb-th{aspect-ratio:16/9;border-radius:8px;background-size:cover;background-position:center;cursor:pointer;border:1.5px solid transparent;flex-shrink:0;transition:all .22s;background-color:#0a0a1a;position:relative;overflow:hidden}
.glb-th:hover{border-color:rgba(167,139,250,.4);transform:scale(1.04)}
.glb-th.on{border-color:var(--pu);box-shadow:0 0 14px rgba(124,58,237,.45)}
.glb-ctr{font-size:10px;color:var(--t3);margin-top:8px;flex-shrink:0;text-align:right}
/* SOFTWARE */
.sw-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;padding:0 52px 20px}
.sw-card{padding:24px;display:flex;flex-direction:column;justify-content:space-between;cursor:pointer;border-radius:var(--r);min-height:160px}
.sw-card:hover{transform:translateY(-4px);border-color:var(--br2);box-shadow:0 10px 30px rgba(0,0,0,.5)}
.sw-icon{width:48px;height:48px;border-radius:12px;background:rgba(124,58,237,.12);display:flex;align-items:center;justify-content:center;font-size:22px;margin-bottom:14px;flex-shrink:0}
.sw-name{font-family:'Space Grotesk',sans-serif;font-size:16px;font-weight:700;color:var(--t);margin-bottom:6px;letter-spacing:-.01em}
.sw-type{font-size:10px;color:var(--pu2);text-transform:uppercase;letter-spacing:.12em;font-weight:600;margin-bottom:8px}
.sw-desc{font-size:12.5px;color:var(--t3);line-height:1.65;flex:1}
.sw-foot{display:flex;align-items:center;justify-content:space-between;margin-top:16px}
.sw-price{font-family:'Space Grotesk',sans-serif;font-size:20px;font-weight:700;color:var(--t)}
.sw-btn{font-size:11px;padding:7px 16px;border-radius:20px;background:rgba(124,58,237,.2);border:.5px solid var(--br2);color:var(--pu2);cursor:pointer;font-family:'Inter',sans-serif;font-weight:600;transition:all .2s}
.sw-btn:hover{background:rgba(124,58,237,.4);color:var(--pu3)}
/* WORK TIMELINE */
.tline{padding:0 52px 20px;display:flex;flex-direction:column;gap:0}
.tj{display:flex;gap:24px;position:relative;padding-bottom:32px}
.tj::before{content:'';position:absolute;left:19px;top:40px;bottom:0;width:1px;background:var(--br)}
.tj:last-child::before{display:none}
.tj-dot{width:40px;height:40px;border-radius:50%;border:.5px solid var(--br2);display:flex;align-items:center;justify-content:center;font-size:17px;flex-shrink:0;background:var(--bg2);z-index:1}
.tj-body{flex:1;padding:12px 20px;border-radius:var(--r2)}
.tj-role{font-family:'Space Grotesk',sans-serif;font-size:15px;font-weight:700;color:var(--t);margin-bottom:3px;letter-spacing:-.01em}
.tj-comp{font-size:12px;color:var(--pu2);font-weight:600;margin-bottom:3px}
.tj-date{font-size:11px;color:var(--t3)}
.tj-desc{font-size:12px;color:var(--t3);margin-top:8px;line-height:1.6}
/* SOCIAL */
.sog{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;padding:0 52px 20px}
.soc{padding:28px 24px;border-radius:var(--r);cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:12px;text-align:center}
.soc:hover{transform:translateY(-4px)}
.soc-icon{font-size:32px}
.soc-name{font-family:'Space Grotesk',sans-serif;font-size:16px;font-weight:700;color:var(--t)}
.soc-handle{font-size:12px;color:var(--t3)}
/* BOOK MODAL */
.bmod{display:none;position:fixed;inset:0;z-index:9999;background:rgba(2,0,10,.97);backdrop-filter:blur(30px);align-items:center;justify-content:center}
.bmod.on{display:flex;animation:fadeIn .28s ease}
.bmi{background:var(--bg2);border:.5px solid var(--br);border-radius:20px;max-width:600px;width:90%;padding:40px;position:relative;max-height:90vh;overflow-y:auto}
.bmod-close{position:absolute;top:16px;right:16px;background:rgba(255,255,255,.06);border:.5px solid var(--br);color:var(--t3);width:32px;height:32px;border-radius:50%;cursor:pointer;font-size:16px;display:flex;align-items:center;justify-content:center}
.bmod-genre{font-size:10px;color:var(--pu2);letter-spacing:.15em;text-transform:uppercase;font-weight:700;margin-bottom:12px}
.bmod-title{font-family:'Space Grotesk',sans-serif;font-size:32px;font-weight:800;color:var(--t);letter-spacing:-.03em;margin-bottom:20px;line-height:1.05}
.bmod-content{font-size:14px;color:rgba(248,247,255,.72);line-height:1.85;white-space:pre-line}
.bmod-foot{display:flex;gap:10px;margin-top:28px;padding-top:20px;border-top:.5px solid var(--br)}
.bb{padding:10px 20px;border-radius:50px;font-size:12px;font-weight:600;cursor:pointer;font-family:'Inter',sans-serif;transition:all .2s}
.bb-read{background:linear-gradient(135deg,var(--pu),#4f46e5);color:#fff;border:none}
.bb-read:hover{transform:translateY(-1px);box-shadow:0 8px 20px rgba(124,58,237,.4)}
.bb-back{background:rgba(255,255,255,.05);border:.5px solid var(--br);color:var(--t2)}
.bb-back:hover{background:rgba(255,255,255,.09)}
/* HOME PREVIEW GALLERY STRIP */
.gstrip{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;padding:0 52px 20px}
.gsi{border-radius:var(--r2);overflow:hidden;cursor:pointer;position:relative;height:130px;background-size:cover;background-position:center;border:.5px solid var(--br);transition:all .3s}
.gsi:hover{transform:scale(1.04);border-color:var(--br2)}
.gsi-ovl{position:absolute;inset:0;background:linear-gradient(to top,rgba(4,2,14,.85),transparent 60%)}
.gsi-lbl{position:absolute;bottom:8px;left:10px;font-size:11px;font-weight:600;color:#fff}
.gsi-bdg{position:absolute;top:6px;right:6px;font-size:8px;padding:2px 6px;border-radius:3px;background:rgba(0,0,0,.55);color:rgba(255,255,255,.7);backdrop-filter:blur(6px)}
/* HOME STATS */
.stats{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;padding:0 52px 40px}
.stat{padding:20px;border-radius:var(--r);text-align:center}
.stat-n{font-family:'Space Grotesk',sans-serif;font-size:36px;font-weight:800;color:var(--t);letter-spacing:-.04em;margin-bottom:4px}
.stat-l{font-size:11px;color:var(--t3);text-transform:uppercase;letter-spacing:.1em;font-weight:500}
/* CLIENTS */
.ctabs{display:flex;gap:6px;padding:0 52px 16px}
.ctb{padding:8px 18px;border-radius:50px;font-size:12px;font-weight:500;cursor:pointer;border:.5px solid var(--br);background:transparent;color:var(--t3);transition:all .2s;font-family:'Inter',sans-serif}
.ctb.on{background:rgba(124,58,237,.2);border-color:var(--br2);color:var(--pu3)}
.cpan{display:none;padding:0 52px 20px}.cpan.on{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
.cc{padding:18px;border-radius:var(--r2);cursor:pointer}
</style>
</head>
<body>'''

with open(r'F:\AntiGravity\Apps Data\Website Portfolio Work\_head.html', 'w', encoding='utf-8') as fh:
    fh.write(css)
print("Part 1 done")
