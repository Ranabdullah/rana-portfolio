import re, sys
sys.stdout.reconfigure(encoding='utf-8')

f = r'F:\AntiGravity\Apps Data\Website Portfolio Work\rana_galaxy_portfolio_v3.html'
content = open(f, encoding='utf-8').read()

# We need to replace the 4 fictional books in the Home "Latest Stories" bgr block
# They appear between line ~244 and ~249, inside <div class="bgr"> right after "Latest Stories" heading
# Strategy: find the specific bgr block using a regex that matches from the first Midnight Algorithm book
# to the end of Letters from Nowhere book, then replace it

# Use a simpler landmark: find 'The Midnight Algorithm' in home section only (before Stories section)
# Split at the Stories section marker to scope the replacement
home_end = content.find('<!-- STORIES -->')
home_section = content[:home_end]

# Pattern: match the bgr block with all 4 fictional books
pattern = r"(<div class=\"bgr\">)(.*?)(</div>\n  </div>\n  <div class=\"sh\"><span class=\"st\">Gallery Preview)"

real_books = """
    <div class="book" onclick="openBook('The Record Survives','Literary Novel','#1a0c08','#2d1a0f','A perceptive boy named Adil navigates a childhood defined by careful observation.\\n\\nHe was nine, and the attic was the safest room in the house &mdash; forgotten, inert, holding its breath.\\n\\n&quot;Witnessing matters. Because if you look at something and record that you looked, you have done something to it.&quot;')"><div class="bcov" style="background-image:url('Novels/The Record Survives/The Record Survives.png');background-size:cover;background-position:center;background-color:#1a0c08"><div class="bsp"></div><div class="bif"><div class="bgt">Literary</div><div class="btt">The Record Survives</div></div></div></div>
    <div class="book" onclick="openBook('The Veil of Shadows','Fantasy','#0d1020','#1a1535','Cael is trained in silence and iron, preparing for the Trial of Frost.\\n\\nHis mentor Taren teaches through weight. Each lesson is heavier than the last.\\n\\n&quot;Wood teaches the dance. Iron remembers the cost.&quot;')"><div class="bcov" style="background-image:url('Novels/The Veil of Shadows/ChatGPT Image May 4, 2026, 11_41_39 PM.png');background-size:cover;background-position:center;background-color:#0d1020"><div class="bsp"></div><div class="bif"><div class="bgt">Fantasy</div><div class="btt">The Veil of Shadows</div></div></div></div>
    <div class="book" onclick="openBook('What the Buffalo Carry','Novella','#0d1508','#253520','Beneath a burning sky of stars, a seven-year-old listens as her great-grandmother tells the stories that built their world.\\n\\n&quot;The first stories we are told become the rooms we live in for the rest of our lives.&quot;')"><div class="bcov" style="background:linear-gradient(155deg,#0d1508,#253520)"><div class="bsp"></div><div class="bif"><div class="bgt">Novella</div><div class="btt">What the Buffalo Carry</div></div></div></div>
    <div class="book" onclick="openBook('The Last Beacon','Adventure','#080e1a','#0f1c2e','When the last signal goes dark, one person must decide what is worth saving.\\n\\nSome beacons are buildings. Some beacons are people.')"><div class="bcov" style="background-image:url('Novels/The Last Beacon/The Last Beacon.png');background-size:cover;background-position:center;background-color:#080e1a"><div class="bsp"></div><div class="bif"><div class="bgt">Adventure</div><div class="btt">The Last Beacon</div></div></div></div>"""

new_content = re.sub(pattern, r'\1' + real_books + r'\n  \3', content, count=1, flags=re.DOTALL)

if new_content != content:
    open(f, 'w', encoding='utf-8').write(new_content)
    print("SUCCESS: Home stories updated")
else:
    print("FAILED: Pattern not matched")
    # Debug: show first occurrence of bgr after Latest Stories
    idx = content.find('Latest Stories')
    print("Around Latest Stories:", repr(content[idx:idx+200]))
