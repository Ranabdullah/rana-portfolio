import re, sys
sys.stdout.reconfigure(encoding='utf-8')

f = r'F:\AntiGravity\Apps Data\Website Portfolio Work\rana_galaxy_portfolio_v3.html'
content = open(f, encoding='utf-8').read()

# URL-encode paths for use inside CSS url()
def up(s):
    return s.replace(' ', '%20').replace('(', '%28').replace(')','%29').replace("'","%27")

# Real novel data
novels = [
    {
        'title': 'The Record Survives',
        'genre': 'Literary Novel',
        'c1': '#1a0c08', 'c2': '#2d1a0f',
        'cover': up("Novels/The Record Survives/The Record Survives.png"),
        'bg': '#1a0c08',
        'summary': 'A perceptive boy named Adil navigates a childhood defined by careful observation and quiet survival.\\n\\nHe was nine, and the attic was the safest room in the house — forgotten, inert, holding its breath.\\n\\n&quot;Witnessing matters. Because if you look at something and record that you looked, you have done something to it.&quot;',
    },
    {
        'title': 'The Veil of Shadows',
        'genre': 'Fantasy',
        'c1': '#0d1020', 'c2': '#1a1535',
        'cover': up("Novels/The Veil of Shadows/ChatGPT Image May 4, 2026, 11_41_39 PM.png"),
        'bg': '#0d1020',
        'summary': 'Cael is trained in silence and iron, preparing for the Trial of Frost that will decide whether he remains a boy forever.\\n\\n&quot;Wood teaches the dance. Iron remembers the cost.&quot;\\n\\nA story forged from pain, carved in silence.',
    },
    {
        'title': 'What the Buffalo Carry',
        'genre': 'Novella',
        'c1': '#0d1508', 'c2': '#253520',
        'cover': up("Novels/What the Buffalo Carry/What the Buffalo Carry.png"),
        'bg': '#0d1508',
        'summary': 'Beneath a burning sky of stars, a seven-year-old listens as her great-grandmother tells the stories that built their world.\\n\\n&quot;The first stories we are told become the rooms we live in for the rest of our lives.&quot;',
    },
    {
        'title': 'The Quiet Reset',
        'genre': 'Self-Help',
        'c1': '#0a0f1a', 'c2': '#151f30',
        'cover': up("Novels/The Quiet Reset/The Quiet Reset.jpg"),
        'bg': '#0a0f1a',
        'summary': 'A science-backed guide to reclaiming focus, two days at a time.\\n\\nFrom neuroscience to lived experience, each chapter challenges you to stop overthinking and master your energy — not just your hours.\\n\\nThis is not a productivity book. It is a book about becoming someone who no longer needs one.',
    },
    {
        'title': 'The Last Beacon',
        'genre': 'Adventure',
        'c1': '#080e1a', 'c2': '#0f1c2e',
        'cover': up("Novels/The Last Beacon/The Last Beacon.png"),
        'bg': '#080e1a',
        'summary': 'When the last signal goes dark, one person must decide what is worth saving — and what must be left behind.\\n\\nSome beacons are buildings. Some beacons are people.',
    },
    {
        'title': 'Ten Days in Heaven',
        'genre': 'Spiritual Fiction',
        'c1': '#1a0d20', 'c2': '#2d1535',
        'cover': up("Novels/Ten Days in Heaven/20260407_1159_Image Generation_simple_compose_01knksggnzfyg8t6t48wxdscn5.png"),
        'bg': '#1a0d20',
        'summary': 'Ten days. Ten decisions. A story that asks what heaven might look like if we had a hand in building it.\\n\\nA meditation on grace, choice, and the sacred ordinary — written for those who have stood at the edge of something they could not name.',
    },
    {
        'title': 'Children of Pain',
        'genre': 'Literary',
        'c1': '#1a0808', 'c2': '#2d1010',
        'cover': up("Novels/Children of Pain/Children of Pain.jpg"),
        'bg': '#1a0808',
        'summary': 'Some childhoods are not remembered. They are survived.\\n\\nA raw, unflinching novel about the children who grow up carrying what adults refuse to acknowledge — and what they do with that weight when they finally stop running from it.',
    },
    {
        'title': 'Shavings',
        'genre': 'Novella',
        'c1': '#100f0a', 'c2': '#2a2515',
        'cover': None,
        'bg': '#100f0a',
        'summary': 'A novella in fragments — small, sharp pieces of story that accumulate into something larger than any single piece suggests.\\n\\nLike wood shavings on a workshop floor, each chapter is a by-product of making something. Together, they reveal what was being built all along.',
    },
]

def make_book(n):
    title = n['title']
    genre = n['genre']
    c1 = n['c1']
    c2 = n['c2']
    summary = n['summary']
    bg = n['bg']
    
    # onclick - escape single quotes in summary for JS string
    summary_js = summary.replace("'", "\\'")
    
    if n['cover']:
        bcov_style = f"background-image:url('{n['cover']}');background-size:cover;background-position:center;background-color:{bg}"
    else:
        bcov_style = f"background:linear-gradient(155deg,{c1},{c2})"
    
    return (
        f'    <div class="book" onclick="openBook(\'{title}\',\'{genre}\',\'{c1}\',\'{c2}\',\'{summary_js}\')">'
        f'<div class="bcov" style="{bcov_style}">'
        f'<div class="bsp"></div>'
        f'<div class="bif"><div class="bgt">{genre}</div><div class="btt">{title}</div></div>'
        f'</div></div>'
    )

books_html = '\n'.join(make_book(n) for n in novels)

new_stories = f'''<!-- STORIES -->
<div class="sec" id="s-stories">
  <div class="sh"><span class="st">Stories</span><span class="ss">Click any book to read</span></div>
  <div class="bgr" style="grid-template-columns:repeat(4,1fr)">
{books_html}
  </div>
</div>

<!-- SOFTWARE -->'''

old = re.search(r'<!-- STORIES -->.*?<!-- SOFTWARE -->', content, re.DOTALL)
if old:
    content = content[:old.start()] + new_stories + '\n' + content[old.end():]
    print("SUCCESS: Stories section replaced with 8 real novels")
else:
    print("ERROR: Could not find Stories section")
    
# Also update Home "Latest Stories" preview with first 4 real novels
home_books_html = '\n'.join(make_book(n) for n in novels[:4])

new_home_bgr = f'<div class="bgr">\n{home_books_html}\n  </div>'

# Replace the bgr block in home section (between Latest Stories and Gallery Preview)
home_pattern = re.compile(
    r'(<div class="sh"><span class="st">Latest Stories</span>.*?</button></div>\s*)'
    r'<div class="bgr">.*?</div>'
    r'(\s*<div class="sh"><span class="st">Gallery Preview)',
    re.DOTALL
)
content, n_subs = home_pattern.subn(r'\g<1>' + new_home_bgr + r'\2', content, count=1)
if n_subs:
    print("SUCCESS: Home Latest Stories updated")
else:
    print("WARNING: Home Latest Stories not replaced")

open(f, 'w', encoding='utf-8').write(content)
print("Done.")
