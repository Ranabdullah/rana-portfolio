import re, sys
sys.stdout.reconfigure(encoding='utf-8')

f = r'F:\AntiGravity\Apps Data\Website Portfolio Work\rana_galaxy_portfolio_v3.html'
content = open(f, encoding='utf-8').read()

# Fix "What the Buffalo Carry" - update to use generated cover
content = content.replace(
    "background:linear-gradient(155deg,#0d1508,#253520)\"><div class=\"bsp\"></div><div class=\"bif\"><div class=\"bgt\">Novella</div><div class=\"btt\">What the Buffalo Carry</div>",
    "background-image:url('Novels/What the Buffalo Carry/What the Buffalo Carry.png');background-size:cover;background-position:center;background-color:#0d1508\"><div class=\"bsp\"></div><div class=\"bif\"><div class=\"bgt\">Novella</div><div class=\"btt\">What the Buffalo Carry</div>"
)

# Shavings - use a styled gradient that looks like aged wood (quota exhausted for image gen)
content = content.replace(
    "background:linear-gradient(155deg,#100f0a,#2a2515)\"><div class=\"bsp\"></div><div class=\"bif\"><div class=\"bgt\">Novella</div><div class=\"btt\">Shavings</div>",
    "background:linear-gradient(155deg,#2a1f0a,#4a3518,#1a1208);background-image:repeating-linear-gradient(12deg,transparent,transparent 18px,rgba(255,200,80,.04) 18px,rgba(255,200,80,.04) 19px),repeating-linear-gradient(-8deg,transparent,transparent 22px,rgba(255,180,60,.03) 22px,rgba(255,180,60,.03) 24px)\"><div class=\"bsp\"></div><div class=\"bif\"><div class=\"bgt\">Novella</div><div class=\"btt\">Shavings</div>"
)

# Also fix home preview - update What the Buffalo Carry there too
content = content.replace(
    "background:linear-gradient(155deg,#0d1508,#253520)\"><div class=\"bsp\"></div><div class=\"bif\"><div class=\"bgt\">Novella</div><div class=\"btt\">What the Buffalo Carry</div>",
    "background-image:url('Novels/What the Buffalo Carry/What the Buffalo Carry.png');background-size:cover;background-position:center;background-color:#0d1508\"><div class=\"bsp\"></div><div class=\"bif\"><div class=\"bgt\">Novella</div><div class=\"btt\">What the Buffalo Carry</div>"
)

open(f, 'w', encoding='utf-8').write(content)

replacements = content.count("What the Buffalo Carry.png")
print(f"SUCCESS: Buffalo cover applied ({replacements} instances), Shavings styled with wood grain gradient")
