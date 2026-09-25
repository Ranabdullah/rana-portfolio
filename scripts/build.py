"""Build a hosting directory; source files, backups and credentials never ship."""
from pathlib import Path
import shutil,json,re,urllib.parse
ROOT=Path(__file__).resolve().parents[1];OUT=ROOT/'dist';OUT.mkdir(exist_ok=True)
files={'index.html','admin.html','shavings.html','firebase-client.js','site-config.js','site-profile.js','ranova-loader.js','ranova-loader.css','rana_logo.png'}
for folder in ['Photos & to upload','Hero Image','Novels','HTML','assets']:
 if not (ROOT/folder).is_dir():raise SystemExit('Missing local media/content folder: '+folder+'. Restore the local backup before deploying.')
for p in (ROOT/'assets').glob('*'):files.add(p.relative_to(ROOT).as_posix())
# Existing media stays local and on Firebase Hosting, outside the code repository.
for folder in ['Photos & to upload','Hero Image','Novels','HTML']:
 for p in (ROOT/folder).rglob('*'):
  if p.is_file() and p.suffix.lower() in {'.webp','.png','.jpg','.jpeg','.gif','.svg','.html'}: files.add(p.relative_to(ROOT).as_posix())
for name in files:
 src=ROOT/name
 if not src.exists():continue
 dest=OUT/name;dest.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(src,dest)
print(f'Hosting build: {len(files)} files, {sum(p.stat().st_size for p in OUT.rglob("*") if p.is_file())/1e6:.1f} MB')
