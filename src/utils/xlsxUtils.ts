
// copied https://github.com/SheetJS/sheetjs/blob/HEAD/bits/05_buf.js
const has_buf = (typeof Buffer !== 'undefined' && typeof process !== 'undefined' && typeof process.versions !== 'undefined' && !!process.versions.node);
// eslint-disable-next-line @typescript-eslint/no-empty-function
let Buffer_from:any = ()=>{};
if(typeof Buffer !== 'undefined') {
  let nbfs = !Buffer.from;
  if(!nbfs) try { Buffer.from('foo', 'utf8'); } catch(e) { nbfs = true; }
  Buffer_from = nbfs ? function(buf: string, enc: any) { return (enc) ? new Buffer(buf, enc) : new Buffer(buf); }
    : Buffer.from.bind(Buffer);
  // $FlowIgnore
  if(!Buffer.alloc) Buffer.alloc = function(n) { return new Buffer(n); };
  // $FlowIgnore
  if(!Buffer.allocUnsafe) Buffer.allocUnsafe = function(n) { return new Buffer(n); };
}
const s2a = function s2a(s:string) {
  if(has_buf) return Buffer_from(s, 'binary');
  return s.split('').map((x:string) => x.charCodeAt(0) & 0xff);
};
const a2u = (data:number[])=> {
  if(typeof Uint8Array === 'undefined') throw new Error('Unsupported');
  return new Uint8Array(data);
};
export const s2ab = (s:string) => {
  if(typeof ArrayBuffer === 'undefined') return s2a(s);
  const buf = new ArrayBuffer(s.length), view = new Uint8Array(buf);
  for (let i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
  return buf;
};
export const blobify = (data: string | number[]) => {
  if(typeof data === 'string') return s2ab(data);
  if(Array.isArray(data)) return a2u(data);
  return data;
};
