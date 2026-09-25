"""Provision/migrate using the local Firebase CLI session; never writes credentials."""
import json,os,urllib.request,urllib.error,sys,time
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
session=json.loads((Path.home()/'.config/configstore/firebase-tools.json').read_text())
token=session['tokens']['access_token']
project='portfolio-d83ff'
def request(url,method='GET',data=None):
 body=None if data is None else json.dumps(data).encode()
 req=urllib.request.Request(url,data=body,method=method,headers={'Authorization':'Bearer '+token,'Content-Type':'application/json','x-goog-user-project':project})
 try:
  with urllib.request.urlopen(req,timeout=90) as r:return json.load(r)
 except urllib.error.HTTPError as e:
  raise RuntimeError(str(e.code)+' '+e.read().decode()[:1600])
if sys.argv[1]=='inspect':
 for name,url in [('auth','https://identitytoolkit.googleapis.com/admin/v2/projects/'+project+'/config'),('buckets','https://storage.googleapis.com/storage/v1/b?project='+project)]:
  try:
   d=request(url)
   print(name,json.dumps(d if name=='buckets' else {'authorizedDomains':d.get('authorizedDomains'),'emailEnabled':d.get('signIn',{}).get('email',{}).get('enabled')},indent=2))
  except Exception as e:print(name,str(e))
elif sys.argv[1]=='enable':
 for api in ['firestore.googleapis.com','identitytoolkit.googleapis.com','firebaserules.googleapis.com']:
  print(api,request(f'https://serviceusage.googleapis.com/v1/projects/{project}/services/{api}:enable','POST',{}))
elif sys.argv[1]=='database':
 print(request(f'https://firestore.googleapis.com/v1/projects/{project}/databases?databaseId=(default)','POST',{'type':'FIRESTORE_NATIVE','locationId':'eur3'}))
elif sys.argv[1]=='auth':
 url=f'https://identitytoolkit.googleapis.com/admin/v2/projects/{project}/config'
 d=request(url);domains=d.get('authorizedDomains',[])
 for host in ['ranova.vercel.app',project+'.web.app',project+'.firebaseapp.com','localhost']:
  if host not in domains:domains.append(host)
 request(url+'?updateMask=authorizedDomains,signIn.email','PATCH',{'authorizedDomains':domains,'signIn':{'email':{'enabled':True,'passwordRequired':True}}})
 print('Email sign-in and authorized domains configured')
 google=f'https://identitytoolkit.googleapis.com/admin/v2/projects/{project}/defaultSupportedIdpConfigs/google.com'
 try:print('Google enabled:',request(google).get('enabled'))
 except Exception as e: print('google',e)
elif sys.argv[1] in ['seed','refresh']:
 def value(x):
  if x is None:return {'nullValue':None}
  if isinstance(x,bool):return {'booleanValue':x}
  if isinstance(x,int):return {'integerValue':str(x)}
  if isinstance(x,float):return {'doubleValue':x}
  if isinstance(x,str):return {'stringValue':x}
  if isinstance(x,list):return {'arrayValue':{'values':[value(v) for v in x]}}
  return {'mapValue':{'fields':{k:value(v) for k,v in x.items()}}}
 data=json.loads((ROOT/'portfolio_data.json').read_text(encoding='utf-8'));data['revision']=1
 base=f'https://firestore.googleapis.com/v1/projects/{project}/databases/(default)/documents/sites/ranova'
 condition='currentDocument.exists=false'
 if sys.argv[1]=='refresh':
  old=request(base+'/content/published')
  data['revision']=int(old['fields']['revision']['integerValue'])+1
  condition='currentDocument.updateTime='+urllib.parse.quote(old['updateTime'])
 print('published',request(base+'/content/published?'+condition,'PATCH',{'fields':{k:value(v) for k,v in data.items()}})['name'])
elif sys.argv[1]=='owner':
 base=f'https://identitytoolkit.googleapis.com/v1/projects/{project}'
 found=request(base+'/accounts:lookup','POST',{'email':['r.abdullah.artist@gmail.com']}).get('users',[])
 if found:uid=found[0]['localId']
 else:uid=request(base+'/accounts','POST',{'email':'r.abdullah.artist@gmail.com','displayName':'Rana Abdullah'})['localId']
 doc=f'https://firestore.googleapis.com/v1/projects/{project}/databases/(default)/documents/sites/ranova/admins/{uid}'
 print('administrator',request(doc,'PATCH',{'fields':{'enabled':{'booleanValue':True}}})['name'])
