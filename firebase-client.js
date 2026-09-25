import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js';
import { getFirestore, doc, getDoc, runTransaction } from 'https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/12.19.0/firebase-storage.js';

import { siteConfig } from './site-config.js';
const app = initializeApp(siteConfig.firebase);
const auth = getAuth(app), db = getFirestore(app), storage = getStorage(app);
const siteId = siteConfig.siteId;
const contentRef = doc(db, 'sites', siteId, 'content', 'published');
let revision = null;
let admin = false;
const sections = ['novels', 'tech', 'gallery', 'software', 'experience', 'clients', 'articles'];
function validate(data) {
  if (!data || sections.some(key => !Array.isArray(data[key]))) throw new Error('The portfolio file must contain every content collection.');
  if (new TextEncoder().encode(JSON.stringify(data)).length > 900000) throw new Error('Portfolio exceeds the document size limit.');
  return data;
}
export const cloud = {
  get isAdmin() { return admin; },
  async load() {
    const snap = await Promise.race([getDoc(contentRef),new Promise((_,reject)=>setTimeout(()=>reject(new Error('Connection timed out. Please retry.')),15000))]);
    if (!snap.exists()) throw new Error('Portfolio has not been published to Firebase yet.');
    const data = validate(snap.data()); revision = data.revision || 0; return data;
  },
  async save(data) {
    if (!admin) throw new Error('Sign in with an authorized administrator account.');
    validate(data);
    const next = await runTransaction(db, async tx => {
      const snap = await tx.get(contentRef);
      const current = snap.exists() ? snap.data().revision || 0 : 0;
      if (snap.exists() && revision !== current) throw new Error('Another session published changes. Download your backup, then reload before publishing.');
      const nextRevision = current + 1;
      tx.set(contentRef, { ...data, revision: nextRevision, updatedAt: new Date().toISOString() });
      return nextRevision;
    });
    revision = next;
  },
  async upload(file) {
    if (!admin) throw new Error('Administrator access required.');
    if (!siteConfig.uploadsEnabled) throw new Error('Photo uploads require Firebase Storage and the Blaze plan. Existing photos are available on Firebase Hosting; you can also add an image URL.');
    if (!['image/webp','image/png','image/jpeg','video/mp4'].includes(file.type) || file.size > 25 * 1024 * 1024) throw new Error('Use a PNG, JPEG, WebP or MP4 under 25 MB.');
    const path = `sites/${siteId}/media/${crypto.randomUUID()}-${(file.name || 'image.webp').replace(/[^a-zA-Z0-9._-]/g, '_')}`;
    const target = ref(storage, path);
    await uploadBytes(target, file, { contentType: file.type });
    return getDownloadURL(target);
  },
  google: () => signInWithPopup(auth, new GoogleAuthProvider()),
  login: (email, password) => signInWithEmailAndPassword(auth, email, password),
  logout: () => signOut(auth),
  validate
};
onAuthStateChanged(auth, async user => {
  admin = false;
  try {
    if (user) { const member = await getDoc(doc(db, 'sites', siteId, 'admins', user.uid)); admin = member.exists() && member.data().enabled === true; }
  } catch (error) { console.warn('Unable to verify administrator access', error.code); }
  window.dispatchEvent(new CustomEvent('portfolio-auth', { detail: { signedIn: !!user, admin } }));
});
