export async function api(path,options={}) {
  const headers={'X-Requested-With':'AirMesuPrototype',...options.headers};
  if(options.body && !(options.body instanceof FormData)) {
    headers['Content-Type']='application/json';
    options={...options,body:JSON.stringify(options.body)};
  }
  let response;
  try {response=await fetch('/api'+path,{...options,headers,credentials:'same-origin'});}
  catch {throw new Error('Layanan lokal belum dapat dijangkau. Periksa server dan MySQL Laragon, lalu coba lagi.');}
  if(!response.ok) {
    const result=await response.json().catch(()=>({}));
    throw new Error(result.error||'Permintaan belum berhasil. Coba lagi.');
  }
  return response.status===204?null:response.json();
}
export const dateLabel = value => value ? new Date(value.includes('T')?value:value.replace(' ','T')+'Z').toLocaleString('id-ID',{dateStyle:'medium',timeStyle:'short',timeZone:'Asia/Jakarta'}) : '-';
