import{u as je,r as W,c as We,j as $}from"./index-CzLd9MT8.js";const te=32,Ye=.07;function Ze(e){let o=!1,a=null;return(async()=>{for(;!o;){try{a=new AbortController;const s=await fetch(je("/api/player/viz",!0),{signal:a.signal,cache:"no-store"});if(!s.ok||!s.body)throw new Error(`Fehler ${s.status}`);const n=s.body.getReader(),r=new TextDecoder;let i="";for(;;){const{value:u,done:c}=await n.read();if(c||o)break;i+=r.decode(u,{stream:!0});let l;for(;(l=i.indexOf(`

`))>=0;){const v=i.slice(0,l);if(i=i.slice(l+2),v.startsWith("data: "))try{e(JSON.parse(v.slice(6)))}catch{}}}}catch{}o||await new Promise(s=>setTimeout(s,800))}})(),()=>{o=!0,a&&a.abort()}}function Je(){const e=[];let o=null,a=new Float32Array(512),t={bpm:0,conf:0,beat0:0,int:0,playing:!1},s=0;const n={t:0,dt:0,playing:!1,bands:new Float32Array(te),db:new Float32Array(te),wave:new Float32Array(512),bass:1,mid:1,treb:1,bassAtt:1,midAtt:1,trebAtt:1,kick:0,onset:0,pulse:0,flash:0,phase:0,beatIndex:0,conf:0,bpm:0,intensity:0,rms:0,centroid:0,lowClock:0,midClock:0,highClock:0,events:{kick:0,onset:0}},r=[0,0,0],i=[0,0,0],u=[0,0,0];let c=0;const l=new Float32Array(te).fill(-90);let v=-90,p=-9,b=-9,E=-9,P=0,R=0,A=0,z=.05;const D=f=>{const B=performance.now()/1e3-f.now;o=o==null?B:Math.min(B,o+.002);for(const T of f.frames||[])(!e.length||T.at>e[e.length-1].at)&&e.push(T);for(;e.length>600;)e.shift();f.wave&&(a=Float32Array.from(f.wave)),t={bpm:f.bpm||0,conf:f.conf||0,beat0:f.beat0||0,int:f.int||0,playing:!!f.playing}},S=(f,F)=>Math.pow(f,F*30);return{push:D,update:f=>{const F=performance.now()/1e3;n.dt=f,n.t+=f,n.playing=t.playing&&e.length>0;const B=o==null?0:F-o-Ye;let T=e.findIndex(x=>x.at>B),h=null;if(e.length){if(T===-1)h={f0:e[e.length-1],f1:e[e.length-1],k:0};else if(T===0)h={f0:e[0],f1:e[0],k:0};else{const x=e[T-1],L=e[T];h={f0:x,f1:L,k:Math.min(1,Math.max(0,(B-x.at)/Math.max(.001,L.at-x.at)))}}B-e[e.length-1].at>.5&&(h=null)}if(h){for(const x of e)if(!(x.at<=s)){if(x.at>B)break;x.k&&(n.events.kick++,p=n.t),x.on&&(n.events.onset++,b=n.t)}}const k=[];if(h)for(const x of e)x.at>s&&x.at<=B&&k.push(x);s=B;const M=(x,L,H)=>x+(L-x)*H;let w=-90;for(let x=0;x<te;x++){let L=-100;if(h){L=M(h.f0.b[x],h.f1.b[x],h.k);for(const H of k)L=Math.max(L,H.b[x])}n.db[x]=L,l[x]=L>l[x]?L:Math.max(-90,l[x]-5*f),w=Math.max(w,l[x])}v=w>v?w:Math.max(-90,v-5*f);for(let x=0;x<te;x++){const L=n.db[x],H=.6*l[x]+.4*v,Q=Math.min(1,Math.max(0,(L+82)/12)),C=Math.min(1.15,Math.max(0,1+(L-H)/28))*Q,Y=C>n.bands[x]?1-Math.exp(-f*30):1-Math.exp(-f*8);n.bands[x]+=(C-n.bands[x])*Y}for(let x=0;x<3;x++){let L=h?M(h.f0.bmt[x],h.f1.bmt[x],h.k):0;for(const Y of k)L=Math.max(L,Y.bmt[x]);r[x]=L;const H=r[x]>i[x],Q=S(H?.2:.5,f);i[x]=i[x]*Q+r[x]*(1-Q);const C=S(c<50?.9:.992,f);u[x]=u[x]*C+r[x]*(1-C)}h&&(c+=f*30);const d=(x,L)=>u[L]>1e-5?Math.min(3,x/u[L]):0;if(n.bass=d(r[0],0),n.mid=d(r[1],1),n.treb=d(r[2],2),n.bassAtt=d(i[0],0),n.midAtt=d(i[1],1),n.trebAtt=d(i[2],2),n.bpm=t.bpm,n.conf=t.conf,t.bpm>0&&t.conf>.3&&o!=null){const x=60/t.bpm,L=(B-t.beat0)/x;n.phase=(L%1+1)%1,n.beatIndex=Math.floor(L)}else n.phase=(n.phase+f*2)%1;n.kick=Math.exp(-(n.t-p)/.14),n.onset=Math.exp(-(n.t-b)/.09),n.pulse=n.conf>.45?Math.exp(-(n.phase*60)/Math.max(40,n.bpm)/.12)*(n.playing?1:0):n.kick,p===n.t&&n.t-E>.34&&(E=n.t),n.flash=Math.exp(-(n.t-E)/.12);const y=1-Math.exp(-f*1.2);P+=((n.playing?t.int:0)-P)*(1-Math.exp(-f*.5)),R+=((h?M(h.f0.rms,h.f1.rms,h.k):0)-R)*y,A+=((h?M(h.f0.c,h.f1.c,h.k):A)-A)*y,n.intensity=P,n.rms=R,n.centroid=A,n.lowClock+=f*(.25+.9*Math.min(2,n.bassAtt)),n.midClock+=f*(.25+.9*Math.min(2,n.midAtt)),n.highClock+=f*(.25+.9*Math.min(2,n.trebAtt));let U=0;for(let x=0;x<512;x++)U=Math.max(U,Math.abs(a[x]));z=Math.max(U,z*Math.exp(-f*.4),.02);const _=1-Math.exp(-f*30);for(let x=0;x<512;x++)n.wave[x]+=((n.playing?a[x]/z:0)-n.wave[x])*_;return n},A:n}}const Qe=`#version 300 es
in vec2 p; out vec2 uv;
void main(){ uv = p * 0.5 + 0.5; gl_Position = vec4(p, 0.0, 1.0); }`,me=`
precision highp float;
precision highp sampler2D;
uniform float uT, uDt, uBass, uMid, uTreb, uBassAtt, uMidAtt, uTrebAtt;
uniform float uPulse, uKick, uOnset, uFlash, uPhase, uConf, uInt, uRms, uCen;
uniform float uLowClk, uMidClk, uHighClk, uSeed, uAspect;
uniform vec2 uRes;
uniform vec3 uPal[5];
uniform sampler2D uAudio;   // Zeile 0: 32 Bänder, Zeile 1: 512 Wellenform
uniform sampler2D uHist;    // 32 x 128: Bänder der letzten ~4 s
uniform float uHistRow;

float hash12(vec2 p){ vec3 p3 = fract(vec3(p.xyx) * .1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
vec2 grad2(vec2 p){ float a = hash12(p) * 6.2831853; return vec2(cos(a), sin(a)); }
float gnoise(vec2 p){
  vec2 i = floor(p), f = fract(p); vec2 u = f * f * (3. - 2. * f);
  return mix(mix(dot(grad2(i), f), dot(grad2(i + vec2(1, 0)), f - vec2(1, 0)), u.x),
             mix(dot(grad2(i + vec2(0, 1)), f - vec2(0, 1)), dot(grad2(i + vec2(1, 1)), f - vec2(1, 1)), u.x), u.y);
}
float noise3(vec3 p){ float z = floor(p.z), k = fract(p.z); k = k * k * (3. - 2. * k);
  return mix(gnoise(p.xy + z * 17.13), gnoise(p.xy + (z + 1.) * 17.13), k); }
float fbm(vec3 p){ float s = 0., a = .5; for (int i = 0; i < 4; i++) { s += a * noise3(p); p = p * 2.03 + vec3(1.7, 9.2, .31); a *= .5; } return s; }
// divergenzfreie Strömung (Curl-Noise): Rauch statt Tunnel
vec2 curl(vec3 p){ float e = .02;
  float a = fbm(p + vec3(0, e, 0)), b = fbm(p - vec3(0, e, 0)), c = fbm(p + vec3(e, 0, 0)), d = fbm(p - vec3(e, 0, 0));
  return vec2(a - b, -(c - d)) / (2. * e); }

vec3 toLab(vec3 c){
  float l = .4122214708 * c.r + .5363325363 * c.g + .0514459929 * c.b;
  float m = .2119034982 * c.r + .6806995451 * c.g + .1073969566 * c.b;
  float s = .0883024619 * c.r + .2817188376 * c.g + .6299787005 * c.b;
  l = pow(max(l, 0.), 1. / 3.); m = pow(max(m, 0.), 1. / 3.); s = pow(max(s, 0.), 1. / 3.);
  return vec3(.2104542553 * l + .7936177850 * m - .0040720468 * s,
              1.9779984951 * l - 2.4285922050 * m + .4505937099 * s,
              .0259040371 * l + .7827717662 * m - .8086757660 * s); }
vec3 fromLab(vec3 c){
  float l = c.x + .3963377774 * c.y + .2158037573 * c.z;
  float m = c.x - .1055613458 * c.y - .0638541728 * c.z;
  float s = c.x - .0894841775 * c.y - 1.2914855480 * c.z;
  l = l * l * l; m = m * m * m; s = s * s * s;
  return max(vec3(4.0767416621 * l - 3.3077115913 * m + .2309699292 * s,
                  -1.2684380046 * l + 2.6097574011 * m - .3413193965 * s,
                  -.0041960863 * l - .7034186147 * m + 1.7076147010 * s), 0.); }
// Farbe aus der Cover-Palette (linear), weich in OKLab gemischt; x läuft im Kreis
vec3 pal(float x){
  x = fract(x) * 5.; int i = int(floor(x)); float k = fract(x); k = k * k * (3. - 2. * k);
  return fromLab(mix(toLab(uPal[i]), toLab(uPal[(i + 1) % 5]), k)); }

float band(float x){ float f = clamp(x, 0., 1.) * 31.; int i = int(floor(f));
  return mix(texelFetch(uAudio, ivec2(i, 0), 0).r, texelFetch(uAudio, ivec2(min(i + 1, 31), 0), 0).r, fract(f)); }
float wave(float x){ float f = clamp(x, 0., 1.) * 511.; int i = int(floor(f));
  return mix(texelFetch(uAudio, ivec2(i, 1), 0).r, texelFetch(uAudio, ivec2(min(i + 1, 511), 1), 0).r, fract(f)); }
// Verlauf: x quer (0..1 über die Bänder), age 0 = jetzt .. 1 = vor ~4 s
float hist(float x, float age){
  float fx = clamp(x, 0., 1.) * 31.; float fy = clamp(age, 0., 1.) * 126.;
  int ix = int(floor(fx)), iy = int(floor(fy));
  int r0 = int(mod(uHistRow - float(iy) + 256., 128.)), r1 = int(mod(uHistRow - float(iy + 1) + 256., 128.));
  float a = mix(texelFetch(uHist, ivec2(ix, r0), 0).r, texelFetch(uHist, ivec2(min(ix + 1, 31), r0), 0).r, fract(fx));
  float b = mix(texelFetch(uHist, ivec2(ix, r1), 0).r, texelFetch(uHist, ivec2(min(ix + 1, 31), r1), 0).r, fract(fx));
  return mix(a, b, fract(fy)); }
`;function O(e,o,a=Qe){const t=e.createProgram();for(const[r,i]of[[e.VERTEX_SHADER,a],[e.FRAGMENT_SHADER,o]]){const u=e.createShader(r);if(e.shaderSource(u,i),e.compileShader(u),!e.getShaderParameter(u,e.COMPILE_STATUS)){const c=e.getShaderInfoLog(u);throw new Error("Shader: "+c+`
`+i.split(`
`).map((l,v)=>`${v+1}: ${l}`).join(`
`).slice(0,4e3))}e.attachShader(t,u)}if(e.bindAttribLocation(t,0,"p"),e.linkProgram(t),!e.getProgramParameter(t,e.LINK_STATUS))throw new Error(e.getProgramInfoLog(t));const s={},n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;r++){const i=e.getActiveUniform(t,r).name.replace(/\[0\]$/,"");s[i]=e.getUniformLocation(t,e.getActiveUniform(t,r).name)}return{p:t,u:s}}const K=e=>`#version 300 es
${me}
in vec2 uv; out vec4 o;
${e}`;function J(e,o,a,t,s=!0,n=!1){const r=e.createTexture();e.bindTexture(e.TEXTURE_2D,r),n?e.texImage2D(e.TEXTURE_2D,0,e.RGBA32F,o,a,0,e.RGBA,e.FLOAT,null):t?e.texImage2D(e.TEXTURE_2D,0,e.RGBA16F,o,a,0,e.RGBA,e.HALF_FLOAT,null):e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,o,a,0,e.RGBA,e.UNSIGNED_BYTE,null);const i=s?e.LINEAR:e.NEAREST;e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,i),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,i),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE);const u=e.createFramebuffer();return e.bindFramebuffer(e.FRAMEBUFFER,u),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,r,0),e.clearColor(0,0,0,1),e.clear(e.COLOR_BUFFER_BIT),{tex:r,fb:u,w:o,h:a,dispose:()=>(e.deleteTexture(r),e.deleteFramebuffer(u))}}function Ve(e,o,a,t){let s=J(e,o,a,t),n=J(e,o,a,t);return{get src(){return s},get dst(){return n},swap(){const r=s;s=n,n=r},dispose(){s.dispose(),n.dispose()}}}function se(e,o,a,t){const s=o.u,n=(r,i)=>s[r]!=null&&e.uniform1f(s[r],i);n("uT",a.t),n("uDt",a.dt),n("uBass",a.bass),n("uMid",a.mid),n("uTreb",a.treb),n("uBassAtt",a.bassAtt),n("uMidAtt",a.midAtt),n("uTrebAtt",a.trebAtt),n("uPulse",a.pulse),n("uKick",a.kick),n("uOnset",a.onset),n("uFlash",a.flash),n("uPhase",a.phase),n("uConf",a.conf),n("uInt",a.intensity),n("uRms",a.rms),n("uCen",a.centroid),n("uLowClk",a.lowClock),n("uMidClk",a.midClock),n("uHighClk",a.highClock),n("uSeed",t.seed),n("uAspect",t.aspect),n("uHistRow",t.histRow),s.uRes!=null&&e.uniform2f(s.uRes,t.w,t.h),s.uPal!=null&&e.uniform3fv(s.uPal,t.palette),s.uAudio!=null&&(e.activeTexture(e.TEXTURE6),e.bindTexture(e.TEXTURE_2D,t.audioTex),e.uniform1i(s.uAudio,6)),s.uHist!=null&&(e.activeTexture(e.TEXTURE7),e.bindTexture(e.TEXTURE_2D,t.histTex),e.uniform1i(s.uHist,7)),e.activeTexture(e.TEXTURE0)}function I(e,o,a,t,s){o.u[a]!=null&&(e.activeTexture(e.TEXTURE0+s),e.bindTexture(e.TEXTURE_2D,t),e.uniform1i(o.u[a],s),e.activeTexture(e.TEXTURE0))}function Pe(e,o,a,t){const s=1/Math.tan(e/2),n=1/(a-t);return new Float32Array([s/o,0,0,0,0,s,0,0,0,0,(t+a)*n,-1,0,0,2*t*a*n,0])}function Se(e,o,a=[0,1,0]){let t=e[0]-o[0],s=e[1]-o[1],n=e[2]-o[2],r=Math.hypot(t,s,n)||1;t/=r,s/=r,n/=r;let i=a[1]*n-a[2]*s,u=a[2]*t-a[0]*n,c=a[0]*s-a[1]*t;r=Math.hypot(i,u,c)||1,i/=r,u/=r,c/=r;const l=s*c-n*u,v=n*i-t*c,p=t*u-s*i;return new Float32Array([i,l,t,0,u,v,s,0,c,p,n,0,-(i*e[0]+u*e[1]+c*e[2]),-(l*e[0]+v*e[1]+p*e[2]),-(t*e[0]+s*e[1]+n*e[2]),1])}function Fe(e,o){const a=new Float32Array(16);for(let t=0;t<4;t++)for(let s=0;s<4;s++){let n=0;for(let r=0;r<4;r++)n+=e[r*4+s]*o[t*4+r];a[t*4+s]=n}return a}const De=`
vec3 hash33(vec3 p){ p = fract(p * vec3(.1031, .1030, .0973)); p += dot(p, p.yxz + 33.33); return fract((p.xxy + p.yxx) * p.zyx) * 2. - 1.; }
float noise3d(vec3 p){
  vec3 i = floor(p), f = fract(p); vec3 u = f * f * (3. - 2. * f);
  return mix(mix(mix(dot(hash33(i), f), dot(hash33(i + vec3(1,0,0)), f - vec3(1,0,0)), u.x),
                 mix(dot(hash33(i + vec3(0,1,0)), f - vec3(0,1,0)), dot(hash33(i + vec3(1,1,0)), f - vec3(1,1,0)), u.x), u.y),
             mix(mix(dot(hash33(i + vec3(0,0,1)), f - vec3(0,0,1)), dot(hash33(i + vec3(1,0,1)), f - vec3(1,0,1)), u.x),
                 mix(dot(hash33(i + vec3(0,1,1)), f - vec3(0,1,1)), dot(hash33(i + vec3(1,1,1)), f - vec3(1,1,1)), u.x), u.y), u.z); }
float fbm3d(vec3 p){ float s = 0., a = .5; for (int i = 0; i < 4; i++) { s += a * noise3d(p); p = p * 2.02 + 17.1; a *= .5; } return s; }
`,ge=K(`
uniform sampler2D uPrev;
uniform int uFa, uFb; uniform float uFm, uDecay, uZoomBoost, uTa, uTb;
vec2 rot(vec2 p, float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c) * p; }
// Quelle eines Bildpunkts p (Koordinaten: y -1..1, x -aspect..aspect)
vec2 flow(int k, vec2 p, float t){
  float r = length(p), a = atan(p.y, p.x);
  if (k == 0) return rot(p, .012) * .972;                                   // Sog nach aussen, leichte Drehung
  if (k == 1) return rot(p, -.008) * 1.022;                                 // nach innen, Tunnel
  if (k == 2) return rot(p, .07 * (1.1 - min(r, 1.1))) * .985;              // Wirbel
  if (k == 3) return p * (.985 + .01 * sin(r * 16. - t * 2.2));             // Wellenringe
  if (k == 4) return vec2(p.x * .975 + .004 * sin(p.y * 6. + t), p.y * .995);  // seitlich auseinander
  if (k == 5) { vec2 c1 = vec2(-.55, 0.), c2 = vec2(.55, 0.);               // zwei Wirbel
    vec2 q = p - c1; float w1 = exp(-dot(q, q) * 2.5); q = p - c2; float w2 = exp(-dot(q, q) * 2.5);
    vec2 s = p; s = c1 + rot(s - c1, .09 * w1); s = c2 + rot(s - c2, -.09 * w2); return s * .992; }
  if (k == 6) { float seg = 6.2831853 / 6.; float b = mod(a + t * .05, seg); b = abs(b - seg * .5);  // Fächer
    return vec2(cos(b), sin(b)) * r * .978; }
  if (k == 7) return p * .99 + .012 * vec2(sin(p.y * 7. + t * 1.3), sin(p.x * 7. + t * .9));        // Wabern
  if (k == 8) return p * (.965 + .03 * sin(a * 6. + t * .7));                // Blütenblätter
  if (k == 9) return vec2(p.x, p.y * .97 - .008) + vec2(.006 * sin(p.y * 9. + t * 2.), 0.);       // aufsteigen
  return p * .98;
}
void main(){
  vec2 asp = vec2(uAspect, 1.);
  vec2 p = (uv * 2. - 1.) * asp;
  vec2 sa = flow(uFa, p, uTa), sb = flow(uFb, p, uTb);
  vec2 s = mix(sa, sb, uFm);
  s = mix(p, s, uZoomBoost);
  vec2 q = s / asp * .5 + .5;
  float v = (q.x < 0. || q.y < 0. || q.x > 1. || q.y > 1.) ? 0. : texture(uPrev, q).r;
  v = max(v * uDecay - .0012, 0.);
  o = vec4(v, 0., 0., 1.);
}`),et=`#version 300 es
in vec2 p; in vec2 a;
uniform float uAspect;
out vec2 va;
void main(){ va = a; gl_Position = vec4(p.x / uAspect, p.y, 0., 1.); }`,tt=`#version 300 es
precision mediump float;
in vec2 va; out vec4 o;
void main(){ float e = 1. - va.x * va.x; o = vec4(va.y * e * e, 0., 0., 1.); }`,ot=K(`
uniform sampler2D uText; uniform float uAmt;
void main(){ vec2 q = (uv - .5) * vec2(1., 1.) + .5; float v = texture(uText, vec2(q.x, 1. - q.y)).r; o = vec4(v * uAmt, 0., 0., 1.); }`),nt=K(`
uniform sampler2D uI, uMap;
void main(){
  float v = clamp(texture(uI, uv).r, 0., 1.);
  o = vec4(pow(texture(uMap, vec2(v * (255. / 256.) + .5 / 256., .5)).rgb, vec3(2.2)), 1.);   // linear, Ausgabe macht sRGB
}`),Oe=(e,o,a)=>[e[0]+(o[0]-e[0])*a,e[1]+(o[1]-e[1])*a,e[2]+(o[2]-e[2])*a],ce=e=>o=>{for(let a=1;a<e.length;a++)if(o<=e[a][0]){const[t,s]=e[a-1],[n,r]=e[a];return Oe(s,r,(o-t)/Math.max(1e-6,n-t))}return e[e.length-1][1]},Ue=(e,o,a)=>{e=(e%1+1)%1;const t=Math.floor(e*6),s=e*6-t,n=a*(1-o),r=a*(1-s*o),i=a*(1-(1-s)*o);return[[a,r,n,n,i,a][t%6],[i,a,a,r,n,n][t%6],[n,n,i,a,a,r][t%6]]},de=[{name:"Lagune",f:ce([[0,[0,0,0]],[.18,[.02,.08,.3]],[.45,[.1,.55,.95]],[.7,[.45,.85,1]],[.88,[.75,.7,.95]],[1,[1,1,1]]])},{name:"Violett",f:ce([[0,[0,0,0]],[.2,[.15,.02,.3]],[.5,[.55,.25,.85]],[.75,[.7,.6,1]],[1,[.95,.95,1]]])},{name:"Rosé",f:ce([[0,[0,0,0]],[.25,[.22,.1,.2]],[.55,[.6,.38,.5]],[.8,[.9,.62,.72]],[1,[1,.92,.95]]])},{name:"Glut",f:ce([[0,[0,0,0]],[.25,[.4,.02,.02]],[.5,[.9,.3,.02]],[.75,[1,.75,.15]],[1,[1,1,.85]]])},{name:"Eis",f:ce([[0,[0,0,0]],[.3,[0,.12,.25]],[.6,[.1,.6,.7]],[.85,[.7,.95,.95]],[1,[1,1,1]]])},{name:"Smaragd",f:ce([[0,[0,0,0]],[.3,[0,.2,.12]],[.6,[.1,.7,.4]],[.85,[.7,1,.5]],[1,[1,1,.9]]])},{name:"Regenbogen",f:(e,o)=>e<.04?[0,0,0]:Ue(e*2.2+o*.03,.75,Math.min(1,e*2.2))},{name:"Konturen",f:(e,o)=>{const a=Math.floor(e*9)/9;return e<.05?[0,0,0]:Ue(a*.7+.55+o*.02,.6,Math.min(1,.25+e))}},{name:"Dämmerung",f:ce([[0,[0,0,0]],[.2,[.1,.03,.25]],[.45,[.6,.1,.5]],[.7,[1,.45,.3]],[1,[1,.95,.7]]])}],xe=(e,o,a)=>[e*Math.cos(a)-o*Math.sin(a),e*Math.sin(a)+o*Math.cos(a)],Re=[(e,o,a)=>{const t=[];for(const s of[1,-1]){const n=[];for(let r=0;r<=160;r++){const i=r/160,[u,c]=xe(i*2.4-1.2,s*.28+a(i)*.22*s,Math.sin(o*.13)*.4);n.push(u,c)}t.push({pts:n,pen:1,width:.006})}return{lines:t}},(e,o,a)=>{const s=[];for(let n=0;n<6;n++){const r=o*.35+n/6*Math.PI*2,i=[];for(let u=0;u<=70;u++){const c=u/70,l=.08+c*1.05,v=a((c+n/6)%1)*.12*c,[p,b]=xe(l,v,r);i.push(p,b)}s.push({pts:i,pen:.95,width:.005})}return{lines:s}},(e,o,a,t)=>{const n=[],r=.55+.25*t(.1);for(let i=0;i<=360;i++){const u=i/360,c=u*Math.PI*2,l=r*Math.cos(5*c)+a(u)*.05,[v,p]=xe(l*Math.cos(c),l*Math.sin(c),o*.2);n.push(v,p)}return{lines:[{pts:n,pen:1,width:.0045,closed:!0}]}},(e,o,a,t)=>{const s=[];for(let n=0;n<3;n++){const r=.25+n*.22+t(.1+n*.3)*.08,i=[];for(let u=0;u<=200;u++){const c=u/200,l=c*Math.PI*2+o*(n%2?-.3:.3),v=r+a((c+n*.33)%1)*.06;i.push(v*Math.cos(l),v*Math.sin(l))}s.push({pts:i,pen:.9,width:.005,closed:!0})}return{lines:s}},(e,o,a)=>{const t=[];for(let s=0;s<=300;s++){const n=s/300,r=n*Math.PI*7+o*.6,i=.04+n*.95+a(n)*.05;t.push(i*Math.cos(r),i*Math.sin(r))}return{lines:[{pts:t,pen:1,width:.005}]}},(e,o,a,t)=>{const s=[];for(let r=0;r<48;r++){const i=r/48,u=t(Math.abs(i*2-1)),c=i*Math.PI*2+o*.15,l=.12,v=l+.1+u*.75;s.push({pts:[l*Math.cos(c),l*Math.sin(c),v*Math.cos(c),v*Math.sin(c)],pen:.55+.45*u,width:.006})}return{lines:s}},(e,o,a,t)=>{const s=[];for(let n=0;n<3;n++)for(let r=0;r<26;r++){const i=r/25,u=o*(.4+n*.15)+i*Math.PI*1.3+n*2.1,c=.35+n*.22+a(i)*.04;s.push({x:c*Math.cos(u)*1.25,y:c*Math.sin(u)*.85,r:.006+t(i)*.016,pen:.85})}return{dots:s}},(e,o,a)=>{const t=[];for(let s=0;s<=260;s++){const n=s/260,r=n*Math.PI*2,i=1+a(n)*.12,[u,c]=xe(Math.sin(r)*.85*i,Math.sin(r)*Math.cos(r)*.65*i,o*.25);t.push(u,c)}return{lines:[{pts:t,pen:1,width:.005,closed:!0}]}},(e,o,a,t)=>{const s=[];for(let n=0;n<=128;n++){const r=n/128,i=t(Math.abs(r*2-1));s.push(r*2.2-1.1,(i*.35+a(r)*.05)*(n%2?1:-.4))}return{lines:[{pts:s,pen:1,width:.004}]}},(e,o,a,t)=>{const s=[];for(let n=0;n<3;n++){const r=.25+n*.2+t(n/3+.1)*.12,i=o*(n%2?.3:-.25),u=[];for(const[c,l]of[[-1,-1],[1,-1],[1,1],[-1,1],[-1,-1]])u.push(...xe(c*r,l*r,i));s.push({pts:u,pen:.9,width:.005})}return{lines:s}}],Ce=[(e,o)=>{const a=[];for(let t=0;t<5;t++){const s=o*3+t/5*Math.PI*2;a.push({pts:[e.x,e.y,e.x+Math.cos(s)*.09,e.y+Math.sin(s)*.09],pen:.9,width:.004})}return a},(e,o)=>{const a=[];for(let t=0;t<=40;t++){const s=t/40*Math.PI*2;a.push(e.x+Math.cos(s)*.07*(1+.3*Math.sin(o*5)),e.y+Math.sin(s)*.07)}return[{pts:a,pen:.9,width:.004,closed:!0}]}];function at(e,o){const a=O(e,ge),t=O(e,tt,et),s=O(e,ot),n=O(e,nt);let r=null,i=null;const u=6e4,c=new Float32Array(u*4),l=e.createBuffer(),v=e.createVertexArray();e.bindVertexArray(v),e.bindBuffer(e.ARRAY_BUFFER,l),e.bufferData(e.ARRAY_BUFFER,c.byteLength,e.DYNAMIC_DRAW);const p=e.getAttribLocation(t.p,"p"),b=e.getAttribLocation(t.p,"a");e.enableVertexAttribArray(p),e.vertexAttribPointer(p,2,e.FLOAT,!1,16,0),e.enableVertexAttribArray(b),e.vertexAttribPointer(b,2,e.FLOAT,!1,16,8),e.bindVertexArray(null);const E=e.createTexture(),P=new Uint8Array(256*4);e.bindTexture(e.TEXTURE_2D,E),e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,256,1,0,e.RGBA,e.UNSIGNED_BYTE,P),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE);const R=e.createTexture(),A=document.createElement("canvas");A.width=1024,A.height=256;let z=null,D=-99,S=Math.random;const m=(w,d)=>{let y=Math.floor(S()*w);return y===d&&(y=(y+1)%w),y},f={shape:[0,0,1,0],flow:[0,0,1,0],map:[0,0,1,0],ta:0,tb:0};let F=null;const B=[];let T=8,h=0;const k=(w,d,y,U)=>{w[2]<1||(w[0]=w[1],w[1]=m(d,w[0]),w[2]=0,w[3]=U+y)},M=(w,d)=>{const y=A.getContext("2d");y.fillStyle="#000",y.fillRect(0,0,1024,256),y.fillStyle="#fff",y.textAlign="center",y.textBaseline="middle",y.font="700 64px system-ui, -apple-system, Segoe UI, sans-serif",y.fillText(String(w||"").slice(0,40),512,100),y.font="400 40px system-ui, -apple-system, Segoe UI, sans-serif",y.fillText(String(d||"").slice(0,50),512,172),e.bindTexture(e.TEXTURE_2D,R),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,A),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)};return{look:{linear:!1,bloom:.1,scale:.6,expo:1,vignette:0},resize(w,d){r&&r.dispose(),i&&i.dispose(),r=Ve(e,w,d,o),i=J(e,w,d,o)},render(w,d){const y=w.dt;if(h+=y,F!==d.seed){F=d.seed;let N=Math.floor(d.seed*1e6)||1;S=()=>(N=N*16807%2147483647)/2147483647,f.shape=[m(Re.length),m(Re.length),1,h+14+S()*8],f.flow=[m(10),m(10),1,h+18+S()*10],f.map=[m(de.length),m(de.length),1,h+12+S()*8],f.shape[0]=f.shape[1],f.flow[0]=f.flow[1],f.map[0]=f.map[1]}h>f.shape[3]&&k(f.shape,Re.length,15+S()*10,h),h>f.flow[3]&&k(f.flow,10,18+S()*12,h),h>f.map[3]&&k(f.map,de.length,12+S()*8,h),f.shape[2]=Math.min(1,f.shape[2]+y/2.5),f.flow[2]=Math.min(1,f.flow[2]+y/4),f.map[2]=Math.min(1,f.map[2]+y/3),f.ta+=y,f.tb+=y,e.bindFramebuffer(e.FRAMEBUFFER,r.dst.fb),e.viewport(0,0,r.dst.w,r.dst.h),e.useProgram(a.p),se(e,a,w,d),I(e,a,"uPrev",r.src.tex,0),e.uniform1i(a.u.uFa,f.flow[0]),e.uniform1i(a.u.uFb,f.flow[1]),e.uniform1f(a.u.uFm,f.flow[2]*f.flow[2]*(3-2*f.flow[2])),e.uniform1f(a.u.uTa,f.ta),e.uniform1f(a.u.uTb,f.tb);const U=Math.min(3,y*60);e.uniform1f(a.u.uZoomBoost,U*(.85+.35*Math.min(2,w.bassAtt))),e.uniform1f(a.u.uDecay,Math.pow(.965,U)),e.bindVertexArray(d.quadVao),e.drawArrays(e.TRIANGLES,0,3);let _=0;const x=(N,q,V,G)=>{if(_>=u)return;const Z=_*4;c[Z]=N,c[Z+1]=q,c[Z+2]=V,c[Z+3]=G,_++},L=(N,q,V,G)=>{const Z=N.length/2,ie=G?Z:Z-1;for(let oe=0;oe<ie;oe++){const Ie=(oe+1)%Z,Ee=N[oe*2],ye=N[oe*2+1],Me=N[Ie*2],we=N[Ie*2+1];let ne=-(we-ye),ae=Me-Ee;const qe=Math.hypot(ne,ae)||1;ne=ne/qe*q,ae=ae/qe*q,x(Ee+ne,ye+ae,1,V),x(Ee-ne,ye-ae,-1,V),x(Me+ne,we+ae,1,V),x(Ee-ne,ye-ae,-1,V),x(Me-ne,we-ae,-1,V),x(Me+ne,we+ae,1,V)}},H=(N,q,V,G)=>{const Z=[];for(let ie=0;ie<10;ie++)Z.push(N+Math.cos(ie/10*6.283)*V,q+Math.sin(ie/10*6.283)*V);L(Z,V*.6,G,!0)},Q=N=>{const q=Math.min(511,Math.max(0,N*511)),V=Math.floor(q),G=q-V;return Math.max(-1.2,Math.min(1.2,w.wave[V]*(1-G)+w.wave[Math.min(511,V+1)]*G))},C=N=>{const q=Math.min(31,Math.max(0,N*31)),V=Math.floor(q),G=q-V;return Math.min(1,w.bands[V]*(1-G)+w.bands[Math.min(31,V+1)]*G)},Y=w.playing?Math.min(1,.55+.45*Math.min(1.5,w.bassAtt)*.7+.25*w.onset):.12,pe=f.shape[2],j=(N,q)=>{if(q<=.01)return;const V=Re[N](w,h,Q,C);for(const G of V.lines||[])L(G.pts,G.width,G.pen*Y*q,G.closed);for(const G of V.dots||[])H(G.x,G.y,G.r,G.pen*Y*q)};j(f.shape[0],1-pe),j(f.shape[1],pe),w.playing&&h>T&&(T=h+10+S()*18,B.push({k:Math.floor(S()*Ce.length),t0:h,life:5+S()*4,a:S()*6.28,sp:(S()<.5?-1:1)*(.25+S()*.3)}));for(let N=B.length-1;N>=0;N--){const q=B[N],V=h-q.t0;if(V>q.life){B.splice(N,1);continue}const G=q.a+V*q.sp,Z={x:Math.cos(G)*(.5+.2*Math.sin(V))*d.aspect*.8,y:Math.sin(G*1.3)*.6},ie=Math.min(1,V,q.life-V);for(const oe of Ce[q.k](Z,h))L(oe.pts,oe.width,oe.pen*ie*Y,oe.closed)}_&&(e.useProgram(t.p),e.uniform1f(t.u.uAspect,d.aspect),e.bindBuffer(e.ARRAY_BUFFER,l),e.bufferSubData(e.ARRAY_BUFFER,0,c.subarray(0,_*4)),e.bindVertexArray(v),e.enable(e.BLEND),e.blendEquation(e.MAX),e.drawArrays(e.TRIANGLES,0,_));const g=d.title?`${d.title}|${d.artist}`:null;g&&g!==z&&(z=g,M(d.title,d.artist),D=h);const X=h-D;if(X<3.2){const N=Math.min(1,X/.4)*Math.min(1,(3.2-X)/.8)*.95;e.useProgram(s.p),I(e,s,"uText",R,0),e.uniform1f(s.u.uAmt,N),e.enable(e.BLEND),e.blendEquation(e.MAX);const q=Math.round(r.dst.w*.6),V=Math.round(q/4);e.viewport(Math.round((r.dst.w-q)/2),Math.round(r.dst.h*.5-V/2),q,V),e.bindVertexArray(d.quadVao),e.drawArrays(e.TRIANGLES,0,3),e.viewport(0,0,r.dst.w,r.dst.h)}e.blendEquation(e.FUNC_ADD),e.disable(e.BLEND);const ee=f.map[2]*f.map[2]*(3-2*f.map[2]),$e=de[f.map[0]].f,He=de[f.map[1]].f;for(let N=0;N<256;N++){const q=N/255,V=Oe($e(q,h),He(q,h),ee);P[N*4]=Math.round(Math.min(1,V[0])*255),P[N*4+1]=Math.round(Math.min(1,V[1])*255),P[N*4+2]=Math.round(Math.min(1,V[2])*255),P[N*4+3]=255}return e.bindTexture(e.TEXTURE_2D,E),e.texSubImage2D(e.TEXTURE_2D,0,0,0,256,1,e.RGBA,e.UNSIGNED_BYTE,P),e.bindFramebuffer(e.FRAMEBUFFER,i.fb),e.viewport(0,0,i.w,i.h),e.useProgram(n.p),I(e,n,"uI",r.dst.tex,0),I(e,n,"uMap",E,1),e.bindVertexArray(d.quadVao),e.drawArrays(e.TRIANGLES,0,3),r.swap(),i.tex},info(){return`Figur ${f.shape[1]+1} · Strömung ${f.flow[1]+1} · Farben ${de[f.map[1]].name}`},dispose(){r&&r.dispose(),i&&i.dispose(),e.deleteBuffer(l),e.deleteVertexArray(v),e.deleteTexture(E),e.deleteTexture(R);for(const w of[a,t,s,n])e.deleteProgram(w.p)}}}const ue=256,ze=128,be=ue*ze,rt=`#version 300 es
${me}
${De}
in vec2 uv;
layout(location = 0) out vec4 oPos;
layout(location = 1) out vec4 oVel;
uniform sampler2D uPos, uVel;
uniform vec3 uCore[4], uAxis[4];
uniform float uCoreE[4];
uniform float uStep, uTime, uBurst;
void main(){
  ivec2 ij = ivec2(gl_FragCoord.xy);
  vec4 P = texelFetch(uPos, ij, 0), V = texelFetch(uVel, ij, 0);
  float id = float(ij.y * ${ue} + ij.x);
  int b = int(V.w + .5);
  int home = b % 4;
  vec3 c = uCore[home];
  vec3 d = c - P.xyz;
  float r2 = dot(d, d) + .008, r = sqrt(r2);
  vec3 n = d / r;
  float e = band(float(b) / 31.);
  // Ladung: leise -> Anziehung, laut -> Abstossung (Ausbruch)
  float charge = 1. - 2.1 * smoothstep(.62, 1.08, e);
  vec3 acc = n * charge * .62 / (r2 + .05);
  // Kreisbahn um die Achse des Kerns
  vec3 ax = uAxis[home];
  acc += cross(ax, n) * (1.05 + .9 * e) / (r + .3);
  // die anderen Kerne ziehen Fäden
  for (int k = 0; k < 4; k++) {
    if (k == home) continue;
    vec3 dk = uCore[k] - P.xyz; float rk2 = dot(dk, dk) + .06;
    acc += dk * inversesqrt(rk2) * (.14 / rk2) * uCoreE[k];
  }
  // feines Strömen
  vec3 q = P.xyz * 1.4 + uTime * .08;
  acc += vec3(noise3d(q), noise3d(q + 19.1), noise3d(q + 37.7)) * .5;
  // Schlag: Stoss vom Kern weg (stärker bei lauten Bändern)
  acc -= n * uBurst * (2.5 + 5. * smoothstep(.45, 1., e));
  V.xyz = V.xyz * exp(-uStep * 1.5) + acc * uStep;
  float sp = length(V.xyz); if (sp > 4.) V.xyz *= 4. / sp;
  P.xyz += V.xyz * uStep;
  P.w -= uStep;
  if (P.w < 0. || r > 3.4) {
    vec3 h = hash33(vec3(id * .013, uTime * 1.37, 2.3));
    vec3 dir = normalize(h + vec3(1e-3));
    P.xyz = c + dir * (.1 + .14 * fract(h.x * 7.31));
    V.xyz = cross(ax, dir) * 1.1 + dir * .15;
    P.w = 3. + 7. * fract(h.y * 13.7);
  }
  oPos = P; oVel = V;
}`,st=`#version 300 es
${me}
uniform sampler2D uPos, uVel;
uniform mat4 uVP;
uniform float uPx;
out vec3 vc;
void main(){
  int id = gl_VertexID;
  ivec2 ij = ivec2(id % ${ue}, id / ${ue});
  vec4 P = texelFetch(uPos, ij, 0), V = texelFetch(uVel, ij, 0);
  float b = V.w;
  float e = band(b / 31.);
  vec4 clip = uVP * vec4(P.xyz, 1.);
  gl_Position = clip;
  float life = clamp(P.w * 2., 0., 1.);
  gl_PointSize = clamp((1.1 + 2.4 * e * e) * uPx / max(clip.w, .3), 1., 9.);
  vc = pal(b / 31. * .85) * (.018 + .2 * e * e + .025 * length(V.xyz)) * life;
}`,it=`#version 300 es
precision mediump float;
in vec3 vc; out vec4 o;
void main(){ float d = length(gl_PointCoord - .5) * 2.; o = vec4(vc * exp(-d * d * 3.), 1.); }`,ut=`#version 300 es
${me}
uniform sampler2D uPos, uVel;
uniform mat4 uVP;
out vec3 vc;
void main(){
  int id = gl_VertexID / 2, end = gl_VertexID % 2;
  ivec2 ij = ivec2(id % ${ue}, id / ${ue});
  vec4 P = texelFetch(uPos, ij, 0), V = texelFetch(uVel, ij, 0);
  float e = band(V.w / 31.);
  vec3 p = P.xyz - V.xyz * .07 * float(end);
  gl_Position = uVP * vec4(p, 1.);
  vc = pal(V.w / 31. * .85) * (.01 + .12 * e * e) * (1. - float(end)) * clamp(P.w * 2., 0., 1.);
}`,ct=`#version 300 es
precision mediump float;
in vec3 vc; out vec4 o;
void main(){ o = vec4(vc, 1.); }`,ft=K(`
uniform sampler2D uPrev; uniform float uDecay;
void main(){ o = vec4(max(texture(uPrev, uv).rgb * uDecay - .001, 0.), 1.); }`),lt=K(`
uniform sampler2D uTrail;
uniform vec3 uCoreS[4];      // Bildschirm: x, y (0..1), Grösse
uniform float uCoreE[4], uYaw;
void main(){
  vec2 q = (uv - .5) * vec2(uAspect, 1.);
  // Nebel: weich, dunkel, dreht sich ein wenig mit der Kamera
  vec2 nq = q * 1.3 + vec2(uYaw * .35, 0.);
  float f = fbm(vec3(nq + vec2(fbm(vec3(nq * 1.4, uT * .03)), 0.), uT * .02));
  vec3 neb = pal(f * .6 + .15 + uT * .004) * smoothstep(-.15, .55, f) * (.035 + .05 * min(uBassAtt, 2.));
  vec3 col = neb + texture(uTrail, uv).rgb;
  // Kerne: heller Kern, farbiger Hof
  for (int k = 0; k < 4; k++) {
    vec2 d = (uv - uCoreS[k].xy) * vec2(uAspect, 1.);
    float s = uCoreS[k].z;
    float r = length(d) / max(s, 1e-3);
    float e = uCoreE[k];
    col += pal(float(k) * .22 + .1) * (exp(-r * r * 2.2) * (.12 + .45 * e) + .012 / (r + .2) * (.4 + e));
    col += vec3(1.) * exp(-r * r * 18.) * (.35 + .6 * e);
  }
  o = vec4(col, 1.);
}`),ke=[{name:"Nordlicht",c:[.05,.35,1,.25,.75,1,.55,.25,1,.95,.2,.75,.2,.9,.85]},{name:"Glut",c:[1,.35,.05,1,.15,.3,1,.65,.2,.8,.1,.6,1,.85,.5]},{name:"Cover",c:null}];function mt(e,o){const a=!!e.getExtension("EXT_color_buffer_float"),t=O(e,rt),s=O(e,it,st),n=O(e,ct,ut),r=O(e,ft),i=O(e,lt),c=a?(()=>{const m=new Float32Array(be*4),f=new Float32Array(be*4);for(let T=0;T<be;T++){const h=T%32%4,k=Math.random()*Math.PI*2,M=Math.random()*2-1,w=.3+Math.random()*1.2,d=Math.sqrt(1-M*M);m[T*4]=Math.cos(k)*d*w+(h-1.5)*.4,m[T*4+1]=M*w,m[T*4+2]=Math.sin(k)*d*w,m[T*4+3]=Math.random()*8,f[T*4+3]=T%32}const F=T=>{const h=e.createTexture();return e.bindTexture(e.TEXTURE_2D,h),e.texImage2D(e.TEXTURE_2D,0,e.RGBA32F,ue,ze,0,e.RGBA,e.FLOAT,T),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),h};return[0,1].map(()=>{const T=F(m),h=F(f),k=e.createFramebuffer();return e.bindFramebuffer(e.FRAMEBUFFER,k),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,T,0),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT1,e.TEXTURE_2D,h,0),{p:T,v:h,fb:k}})})():null;let l=0;const v=e.createVertexArray();let p=null,b=null,E=0,P=0,R=0,A=0,z=0;const D=[0,1,2,3].map(()=>({p:[0,0,0],ax:[0,1,0],e:0})),S=(m,f)=>[1.05*Math.sin(f*(.11+m*.023)+m*1.7),.55*Math.sin(f*(.07+m*.019)+m*.9),1.05*Math.cos(f*(.09+m*.021)+m*2.3)];return{look:{linear:!0,bloom:.55,scale:.75,expo:.95},needs:a?null:"Diese Grafikkarte kann keine Float-Texturen rendern (für Magnetfeld nötig).",keys:{p:()=>(z=(z+1)%ke.length,`Farben: ${ke[z].name}`)},resize(m,f){p&&p.dispose(),b&&b.dispose(),p=Ve(e,m,f,o),b=J(e,m,f,o)},render(m,f){const F=m.dt;E+=F;const B=ke[z].c||Array.from(f.palette),T=[[0,6],[6,14],[14,22],[22,32]];for(let d=0;d<4;d++){const y=D[d];y.p=S(d,E);const U=E*(.05+d*.013)+d,_=[Math.sin(U)*.4,1,Math.cos(U*1.3)*.4],x=Math.hypot(..._);y.ax=_.map(H=>H/x*(d%2?-1:1));let L=0;for(let H=T[d][0];H<T[d][1];H++)L+=m.bands[H];L/=T[d][1]-T[d][0],y.e+=(L-y.e)*(1-Math.exp(-F*10))}m.events.kick!==R&&(R=m.events.kick,A=1),A*=Math.exp(-F*9);const h=E*.06,k=[Math.sin(h)*4.4,.9*Math.sin(E*.035)+.4,Math.cos(h)*4.4],M=Fe(Pe(48*Math.PI/180,f.aspect,.1,40),Se(k,[0,0,0]));if(c){P=Math.min(P+F,.06);const d=1/60;for(e.disable(e.BLEND);P>=d;){P-=d;const y=c[l],U=c[1-l];e.bindFramebuffer(e.FRAMEBUFFER,U.fb),e.drawBuffers([e.COLOR_ATTACHMENT0,e.COLOR_ATTACHMENT1]),e.viewport(0,0,ue,ze),e.useProgram(t.p),se(e,t,m,f),I(e,t,"uPos",y.p,0),I(e,t,"uVel",y.v,1),e.uniform3fv(t.u.uCore,D.flatMap(_=>_.p)),e.uniform3fv(t.u.uAxis,D.flatMap(_=>_.ax)),e.uniform1fv(t.u.uCoreE,D.map(_=>_.e)),e.uniform1f(t.u.uStep,d),e.uniform1f(t.u.uTime,E),e.uniform1f(t.u.uBurst,A),e.bindVertexArray(f.quadVao),e.drawArrays(e.TRIANGLES,0,3),l=1-l}}if(e.bindFramebuffer(e.FRAMEBUFFER,p.dst.fb),e.viewport(0,0,p.dst.w,p.dst.h),e.useProgram(r.p),I(e,r,"uPrev",p.src.tex,0),e.uniform1f(r.u.uDecay,Math.pow(.62,F*60)),e.bindVertexArray(f.quadVao),e.drawArrays(e.TRIANGLES,0,3),c){const d=c[l];e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE),e.bindVertexArray(v),e.useProgram(n.p),se(e,n,m,f),e.uniform3fv(n.u.uPal,B),I(e,n,"uPos",d.p,0),I(e,n,"uVel",d.v,1),e.uniformMatrix4fv(n.u.uVP,!1,M),e.drawArrays(e.LINES,0,be*2),e.useProgram(s.p),se(e,s,m,f),e.uniform3fv(s.u.uPal,B),I(e,s,"uPos",d.p,0),I(e,s,"uVel",d.v,1),e.uniformMatrix4fv(s.u.uVP,!1,M),e.uniform1f(s.u.uPx,p.dst.h/300),e.drawArrays(e.POINTS,0,be),e.disable(e.BLEND)}p.swap();const w=[];for(const d of D){const y=[d.p[0],d.p[1],d.p[2],1],U=M[0]*y[0]+M[4]*y[1]+M[8]*y[2]+M[12],_=M[1]*y[0]+M[5]*y[1]+M[9]*y[2]+M[13],x=M[3]*y[0]+M[7]*y[1]+M[11]*y[2]+M[15],L=(.035+.035*d.e+.02*A)*(4.4/Math.max(.5,x));w.push(U/x*.5+.5,_/x*.5+.5,x>.1?L:0)}return e.bindFramebuffer(e.FRAMEBUFFER,b.fb),e.viewport(0,0,b.w,b.h),e.useProgram(i.p),se(e,i,m,f),e.uniform3fv(i.u.uPal,B),I(e,i,"uTrail",p.src.tex,0),e.uniform3fv(i.u.uCoreS,w),e.uniform1fv(i.u.uCoreE,D.map(d=>d.e)),e.uniform1f(i.u.uYaw,h),e.bindVertexArray(f.quadVao),e.drawArrays(e.TRIANGLES,0,3),b.tex},info(){return`Farben: ${ke[z].name} (P)`},dispose(){if(p&&p.dispose(),b&&b.dispose(),c)for(const m of c)e.deleteTexture(m.p),e.deleteTexture(m.v),e.deleteFramebuffer(m.fb);e.deleteVertexArray(v);for(const m of[t,s,n,r,i])e.deleteProgram(m.p)}}}const pt=K(`
uniform vec3 uNeon;
uniform int uShapeA, uShapeB; uniform float uShapeM;
uniform float uBeam[4], uBeamX[4];
const float HZ = -.17;                 // Wasserlinie
const vec2 C = vec2(0., .1);           // Mitte der Form

float sdSeg(vec2 p, vec2 a, vec2 b){ vec2 pa = p - a, ba = b - a; float h = clamp(dot(pa, ba) / dot(ba, ba), 0., 1.); return length(pa - ba * h); }
float sdBox(vec2 p, vec2 b){ vec2 d = abs(p) - b; return length(max(d, 0.)) + min(max(d.x, d.y), 0.); }
float sdHex(vec2 p, float r){ const vec3 k = vec3(-.866025404, .5, .577350269); p = abs(p); p -= 2. * min(dot(k.xy, p), 0.) * k.xy; p -= vec2(clamp(p.x, -k.z * r, k.z * r), r); return length(p) * sign(p.y); }

// Abstand zur Neon-Linie (und ob innen)
vec2 shape(int k, vec2 p){
  float d = 1e3, inside = 0.;
  if (k == 0) {                         // Dreiecke ohne Boden, ineinander
    for (int i = 0; i < 3; i++) { float s = 1. - float(i) * .2;
      vec2 a = vec2(-.36, -.27) * s, t = vec2(0., .36) * s, b = vec2(.36, -.27) * s;
      d = min(d, min(sdSeg(p, a, t), sdSeg(p, t, b))); }
    inside = step(p.y, .36 - abs(p.x) * 1.75) * step(-.27, p.y);
  } else if (k == 1) {                  // Quadrat
    float b = sdBox(p, vec2(.32)); d = abs(b); inside = step(b, 0.);
  } else if (k == 2) {                  // Ringe
    float r = length(p);
    d = min(abs(r - .2), min(abs(r - .29), abs(r - .38))); inside = step(r, .38);
  } else if (k == 3) {                  // Raute, doppelt
    vec2 q = vec2(p.x + p.y, p.y - p.x) * .7071;
    float b = sdBox(q, vec2(.27)); d = min(abs(b), abs(sdBox(q, vec2(.19)))); inside = step(b, 0.);
  } else {                              // Sechseck, doppelt
    float h = sdHex(p, .34); d = min(abs(h), abs(sdHex(p, .25))); inside = step(h, 0.);
  }
  return vec2(d, inside);
}

vec3 neon(vec2 p){
  // Zittern entlang der Linie: Winkel als Laufparameter
  float a = atan(p.y, p.x) / 6.2831853 + .5;
  float amp = .006 + .022 * min(uBassAtt, 2.) * .5;
  vec2 sa = shape(uShapeA, p), sb = shape(uShapeB, p);
  vec2 s = mix(sa, sb, uShapeM);
  float d = max(s.x + wave(a) * amp * .6, 0.);
  float pulse = .75 + .5 * uPulse + .3 * min(uBass, 2.) * .5;
  vec3 c = mix(uNeon, vec3(1.), .55) * exp(-pow(d / .0038, 2.)) * .8;  // heisser Kern
  c += uNeon * (exp(-d * 40.) * .55 + exp(-d * 10.) * .1) * pulse;      // Leuchten
  c += uNeon * s.y * .03 * pulse;                                        // Licht innen
  return c;
}

float island(float x){ // Oberkante des Felsens (über der Wasserlinie)
  float w = smoothstep(.46, .2, abs(x));
  return HZ + .012 + w * (.05 + .02 * gnoise(vec2(x * 9., 1.3)) + .01 * gnoise(vec2(x * 31., 4.)));
}

vec3 world(vec2 q){
  vec2 p = q - C;
  // Nebel: Schichten, die seitlich ziehen; heller um die Form
  float f = fbm(vec3(q * vec2(1.1, 2.) + vec2(uT * .025, 0.), uT * .04));
  float near = exp(-length(p) * 1.5);
  vec3 col = uNeon * (.006 + (.025 + .05 * min(uBassAtt, 2.) * .5) * smoothstep(-.25, .6, f) * (.3 + near));
  // Lichtstrahlen
  for (int k = 0; k < 4; k++) col += uNeon * uBeam[k] * (exp(-abs(q.x - uBeamX[k]) * 420.) * .7 + exp(-abs(q.x - uBeamX[k]) * 40.) * .05) * smoothstep(HZ, HZ + .5, q.y);
  col += neon(p);
  // Felsen davor: fast schwarz, Oberkante vom Neon angeleuchtet
  float top = island(q.x);
  if (q.y < top && q.y > HZ - .002) {
    col = vec3(.008) + uNeon * (exp(-(top - q.y) * 70.) * .35 * (.6 + .5 * uPulse)) * smoothstep(.5, .1, abs(q.x));
  }
  return col;
}

void main(){
  vec2 q = (uv - .5) * vec2(uAspect, 1.);
  vec3 col;
  if (q.y >= HZ) col = world(q);
  else {
    float depth = HZ - q.y;
    // Wellen: je tiefer im Bild (näher), desto stärker
    float rip = (gnoise(vec2(q.x * 18., q.y * 70. - uT * 1.5)) * .5 + .5 * sin(q.y * 140. + uT * 2.)) * (.003 + depth * .035);
    vec2 rq = vec2(q.x + rip, HZ + depth + rip * .5);
    col = world(rq) * (.55 - depth * .6) + vec3(.004, .005, .008);
  }
  // Neon-Wellenlinie unten
  float yl = -.4;
  float xw = q.x / (uAspect * .32);
  if (abs(xw) < 1.) {
    float y = yl + wave(xw * .5 + .5) * .025 * (.6 + .6 * min(uBass, 2.)) * smoothstep(1., .6, abs(xw));
    float d = abs(q.y - y);
    col += vec3(1.) * exp(-pow(d / .0018, 2.)) * .6 + uNeon * exp(-d * 120.) * .6;
  }
  o = vec4(col, 1.);
}`),fe=[[1,.32,.03],[.08,.35,1],[.55,.12,1],[1,.05,.22],[.12,1,.2],[.05,.85,1],[1,.1,.8],[1,.78,.05]];function dt(e,o){const a=O(e,pt);let t=null,s=0,n=[...fe[0]],r=[...fe[0]],i=[...fe[0]],u=1,c=0,l=0,v=0,p=1,b=-1,E=-1,P=null,R=0;const A=[0,0,0,0],z=[0,0,0,0];let D=0;const S=()=>{c=(c+1)%fe.length,r=[...n],i=[...fe[c]],u=0},m=()=>{l=v,v=(v+1+Math.floor(Math.random()*4))%5,p=0};return{look:{linear:!0,bloom:.7,scale:1,expo:.9},label:"center",keys:{m:()=>(m(),"Form gewechselt"),p:()=>(S(),"Farbe gewechselt")},resize(f,F){t&&t.dispose(),t=J(e,f,F,o)},render(f,F){const B=f.dt;s+=B,P!==F.seed&&(P=F.seed,c=Math.floor(F.seed*fe.length),v=Math.floor(F.seed*97)%5,l=v,n=[...fe[c]],i=[...n],u=1);const T=f.conf>.4?Math.floor(f.beatIndex/32):Math.floor(s/16);T!==b&&(b!==-1&&S(),b=T);const h=f.conf>.4?Math.floor(f.beatIndex/64):Math.floor(s/32);h!==E&&(E!==-1&&m(),E=h),u=Math.min(1,u+B/1.5),p=Math.min(1,p+B/1.2);const k=u*u*(3-2*u);if(n=r.map((M,w)=>M+(i[w]-M)*k),f.events.kick!==R&&(R=f.events.kick,s>D)){const M=A.indexOf(Math.min(...A));A[M]=1,z[M]=(Math.random()-.5)*1.6,D=s+.25}for(let M=0;M<4;M++)A[M]*=Math.exp(-B*3);return e.bindFramebuffer(e.FRAMEBUFFER,t.fb),e.viewport(0,0,t.w,t.h),e.useProgram(a.p),se(e,a,f,F),e.uniform3fv(a.u.uNeon,n),e.uniform1i(a.u.uShapeA,l),e.uniform1i(a.u.uShapeB,v),e.uniform1f(a.u.uShapeM,p*p*(3-2*p)),e.uniform1fv(a.u.uBeam,A),e.uniform1fv(a.u.uBeamX,z),e.bindVertexArray(F.quadVao),e.drawArrays(e.TRIANGLES,0,3),t.tex},dispose(){t&&t.dispose(),e.deleteProgram(a.p)}}}const vt=`#version 300 es
precision mediump float;
in vec3 vc; out vec4 o;
void main(){ float d = length(gl_PointCoord - .5) * 2.; o = vec4(vc * smoothstep(1., .2, d), 1.); }`,ht=K(`
uniform sampler2D uPrev; uniform float uDecay;
void main(){ o = vec4(max(texture(uPrev, uv).rgb * uDecay - .002, 0.), 1.); }`),Ae=26e3,xt=`#version 300 es
${me}
${De}
uniform mat4 uVP; uniform float uPx, uRip, uRipAmp, uTint, uMorph; uniform vec3 uEye;
uniform int uVa, uVb;
out vec3 vc;
mat3 rotY(float a){ float c = cos(a), s = sin(a); return mat3(c, 0, -s, 0, 1, 0, s, 0, c); }
mat3 rotX(float a){ float c = cos(a), s = sin(a); return mat3(1, 0, 0, 0, c, s, 0, -s, c); }
vec3 variant(int k, vec3 dir, float sh, float e, float rip){
  if (k == 1) {                                     // Stacheln: Haare, länger wo das Band laut ist
    float n = noise3d(dir * 5.5 + sh * 5. + vec3(0., uLowClk * .05, 0.)) * .5 + .5;
    float spike = pow(n, 5.) * 3.2 * (.25 + .9 * e) * (.6 + .5 * min(uBassAtt, 2.));
    return dir * (.85 + sh * .03 + spike + rip * .1);
  }
  if (k == 2) {                                     // Ringe: Breiten werden zu Bändern, die sich drehen
    float lat = asin(clamp(dir.y, -1., 1.));
    float q = floor(lat * 7. + .5) / 7.;
    float ring = 1. + .35 * sin(q * 9. + uLowClk * .3) + .25 * e;
    vec3 d = rotY(q * 3. + uMidClk * .2 * (mod(q * 7., 2.) < 1. ? 1. : -1.)) * vec3(dir.x, 0., dir.z);
    return normalize(d + vec3(0., 1e-4, 0.)) * ring * (.9 + sh * .05) + vec3(0., q * .55, 0.) + dir * rip * .08;
  }
  if (k == 3) {                                     // Blüte: Lappen, die mit dem Bass aufgehen
    float a = atan(dir.z, dir.x);
    float petal = pow(abs(sin(a * 2.5 + uLowClk * .15)), 2.) * (.15 + .35 * min(uBassAtt, 2.) * .5 + .25 * e);
    float n = fbm3d(dir * 2. + uT * .05) * .25;
    return dir * (.9 + petal * (1. - abs(dir.y)) + n + sh * .04 + rip * .12);
  }
  // 0: gefaltet
  vec3 w = vec3(noise3d(dir * 1.5 + uLowClk * .06 + sh * 3.1), noise3d(dir * 1.5 + 7.3 + uMidClk * .05), noise3d(dir * 1.5 + 13.1 - uLowClk * .05));
  float n = fbm3d(dir * 2.2 + w * 1.2 + vec3(0., 0., sh * 1.7 + uT * .03));
  float amp = .2 + .22 * min(uBassAtt, 2.) + .25 * e;
  return dir * (1. + sh * .05 + n * amp * 2.3 + rip * .14);
}
void main(){
  int id = gl_VertexID, shell = id / ${Ae}, i = id % ${Ae};
  float fi = float(i) + .5;
  float y = 1. - 2. * fi / ${Ae}.;
  float rr = sqrt(max(0., 1. - y * y)), phi = fi * 2.39996323;
  vec3 dir = vec3(cos(phi) * rr, y, sin(phi) * rr);
  dir = normalize(dir + hash33(vec3(fi, float(shell), 3.)) * .006);     // gegen Moiré
  float sh = float(shell);
  float lat = y * .5 + .5;
  float e = band(.04 + lat * .86);
  float ang = acos(clamp(dir.y, -1., 1.));
  float rip = exp(-pow((ang - uRip) * 4., 2.)) * uRipAmp;
  vec3 P = mix(variant(uVa, dir, sh, e, rip), variant(uVb, dir, sh, e, rip), uMorph);
  P = rotY(uT * .05) * rotX(.35 + .1 * sin(uT * .05)) * P;
  vec4 clip = uVP * vec4(P, 1.);
  gl_Position = clip;
  gl_PointSize = clamp(1.7 * uPx / clip.w, 1., 4.);
  float facing = dot(normalize(P), normalize(uEye - P));
  float b = (.08 + .92 * smoothstep(-.35, .85, facing)) * (.4 + .5 * e + .3 * rip) * (shell == 0 ? 1. : .6);
  vc = mix(vec3(1.), pal(lat * .7 + sh * .1), uTint) * b * .4;
}`,Te=240,Be=150,bt=`#version 300 es
${me}
${De}
uniform mat4 uVP; uniform float uPx, uKickR, uKickAmp, uTint, uMorph;
uniform int uVa, uVb;
out vec3 vc;
vec4 variant(int k, float u, float v){     // xyz + Zacken (für Helligkeit)
  if (k == 1) {                              // Spirale: Gitter in Polarkoordinaten, Kämme laufen spiralig
    float th = u * 6.2831853, r = .12 + v * 3.2;
    float arm = sin(th * 2. - r * 3.2 + uLowClk * .9);
    float crest = pow(max(0., arm), 6.);
    float e = band(clamp(r / 3.2, 0., 1.) * .9);
    float h = crest * (.08 + .5 * e) + .04 * noise3d(vec3(r * 2., th * 2., uT * .3));
    return vec4(cos(th) * r, h - .1, sin(th) * r + 2.2, crest * e);
  }
  if (k == 2) {                              // Ringe: Wellen laufen von der Mitte nach aussen
    float x = (u - .5) * 6., z = (v - .5) * 6.;
    float r = length(vec2(x, z));
    float e = hist(clamp(r / 4.2, 0., 1.) * .8, clamp(r / 4.2, 0., 1.));
    float h = sin(r * 4. - uLowClk * 2.) * .05 + e * e * .45;
    return vec4(x, h - .15, z + 2.4, e);
  }
  if (k == 3) {                              // Landschaft: Spektrum als Berge, ziehen nach hinten
    float x = (u - .5) * 5., z = v * 5.4;
    float s = hist(abs(u - .5) * 2., v);
    float n = fbm3d(vec3(x * .6, z * .6 - uLowClk * .1, 1.)) * .3;
    return vec4(x, s * s * .7 + n - .25, z, s);
  }
  // 0: Stoff
  float x = (u - .5) * 4.6, z = v * 5.2;
  float n = fbm3d(vec3(x * .42 + uT * .035, z * .42 - uLowClk * .06, uT * .045));
  float s = hist(abs(u - .5) * 2., v);
  float rip = uKickAmp * exp(-pow(length(vec2(x, z - 1.7)) - uKickR, 2.) * 5.);
  return vec4(x, n * (.32 + .14 * min(uBassAtt, 2.)) + s * s * .25 + rip * .18 - .25, z, s * .5);
}
vec4 pos(float u, float v){ return mix(variant(uVa, u, v), variant(uVb, u, v), uMorph); }
void main(){
  int id = gl_VertexID, ix = id % ${Te}, iz = id / ${Te};
  float u = float(ix) / ${Te-1}., v = float(iz) / ${Be-1}.;
  vec4 P = pos(u, v);
  vec3 px = pos(u + 1. / ${Te}., v).xyz, pz = pos(u, v + 1. / ${Be}.).xyz;
  vec3 nrm = normalize(cross(pz - P.xyz, px - P.xyz));
  if (nrm.y < 0.) nrm = -nrm;
  vec4 clip = uVP * vec4(P.xyz, 1.);
  gl_Position = clip;
  gl_PointSize = clamp((2. + 2.5 * P.w) * uPx / clip.w, 1., 6.);
  float light = .18 + .82 * pow(max(0., dot(nrm, normalize(vec3(-.55, .75, -.4)))), 1.5);
  float dist = length(P.xyz - vec3(0., 0., 2.));
  float fade = exp(-max(0., P.z) * .2) * smoothstep(0., .06, v) * smoothstep(1., .9, v);
  vc = mix(vec3(1.), pal(u * .5 + v * .3 + P.w * .3), uTint) * (light * .55 + P.w * 1.4) * fade * .6;
}`;function Ne(e,o,a,t,s){const n=O(e,vt,a),r=O(e,ht),i=e.createVertexArray();let u=null,c=null,l=0;return{resize(v,p){u&&u.dispose(),c&&c.dispose(),u=Ve(e,v,p,o),c=J(e,v,p,o)},tint(v){l=v},render(v,p,b){return e.bindFramebuffer(e.FRAMEBUFFER,u.dst.fb),e.viewport(0,0,u.dst.w,u.dst.h),e.useProgram(r.p),I(e,r,"uPrev",u.src.tex,0),e.uniform1f(r.u.uDecay,Math.pow(b,v.dt*60)),e.bindVertexArray(p.quadVao),e.drawArrays(e.TRIANGLES,0,3),e.useProgram(n.p),se(e,n,v,p),e.uniform1f(n.u.uPx,u.dst.h/240),e.uniform1f(n.u.uTint,l),s(n),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE),e.bindVertexArray(i),e.drawArrays(e.POINTS,0,t),e.disable(e.BLEND),u.swap(),u.src.tex},dispose(){u&&u.dispose(),c&&c.dispose(),e.deleteVertexArray(i),e.deleteProgram(n.p),e.deleteProgram(r.p)}}}const re=[{name:"Weiss",v:0},{name:"Hauch Farbe",v:.35},{name:"Cover-Farben",v:.85}];function Ke(e,o){let a=0,t=0,s=1,n=-1,r=0,i=-1e9;const u=c=>{a=t,t=c%e,s=0};return{tick(c,l){r+=l;const v=c.conf>.4?Math.floor(c.beatIndex/32):Math.floor(r/40);return v!==n&&(n!==-1&&s>=1&&r-i>60&&c.playing&&u(t+1),n=v),s=Math.min(1,s+l/3),{a,b:t,m:s*s*(3-2*s)}},next(){return i=r,u(t+1),`Muster: ${o[t]}`},name:()=>o[t],seed(c){t=Math.floor(c*e)%e,a=t,s=1}}}function Tt(e,o){let a=0,t=9,s=0,n=0,r=null,i=[0,0,3.4],u=0,c=null,l={a:0,b:0,m:1};const v=Ke(4,["gefaltet","Stacheln","Ringe","Blüte"]),p=Ne(e,o,xt,Ae*3,b=>{e.uniformMatrix4fv(b.u.uVP,!1,r),e.uniform1f(b.u.uRip,t),e.uniform1f(b.u.uRipAmp,s),e.uniform3fv(b.u.uEye,i),e.uniform1i(b.u.uVa,l.a),e.uniform1i(b.u.uVb,l.b),e.uniform1f(b.u.uMorph,l.m)});return{look:{linear:!0,bloom:.45,scale:1},keys:{p:()=>(u=(u+1)%re.length,p.tint(re[u].v),`Farbe: ${re[u].name}`),m:()=>v.next()},resize:(b,E)=>p.resize(b,E),render(b,E){return a+=b.dt,c!==E.seed&&(c=E.seed,v.seed(E.seed)),l=v.tick(b,b.dt),b.events.kick!==n&&(n=b.events.kick,t=0,s=1),t+=b.dt*2.6,s*=Math.exp(-b.dt*1.6),i=[0,.15*Math.sin(a*.07),3.6],r=Fe(Pe(40*Math.PI/180,E.aspect,.1,20),Se(i,[0,0,0])),p.render(b,E,.55)},info:()=>`${v.name()} (M) · ${re[u].name} (P)`,dispose:()=>p.dispose()}}const Xe=[[1.25,-1.5,-.2,2.8],[2.7,-.25,-.35,2.3],[2,-.7,-.25,2.4],[.95,-1.25,0,3]];function Et(e,o){let a=0,t=9,s=0,n=0,r=null,i=2,u=null,c={a:0,b:0,m:1};const l=Ke(4,["Stoff","Spirale","Ringe","Landschaft"]),v=Ne(e,o,bt,Te*Be,p=>{e.uniformMatrix4fv(p.u.uVP,!1,r),e.uniform1f(p.u.uKickR,t),e.uniform1f(p.u.uKickAmp,s),e.uniform1i(p.u.uVa,c.a),e.uniform1i(p.u.uVb,c.b),e.uniform1f(p.u.uMorph,c.m)});return v.tint(re[i].v),{look:{linear:!0,bloom:.5,scale:1},keys:{p:()=>(i=(i+1)%re.length,v.tint(re[i].v),`Farbe: ${re[i].name}`),m:()=>l.next()},resize:(p,b)=>v.resize(p,b),render(p,b){a+=p.dt,u!==b.seed&&(u=b.seed,l.seed(b.seed)),c=l.tick(p,p.dt),p.events.kick!==n&&(n=p.events.kick,t=0,s=1),t+=p.dt*2.2,s*=Math.exp(-p.dt*1.4);const E=Xe[c.a],P=Xe[c.b],R=E.map((D,S)=>D+(P[S]-D)*c.m),A=Math.sin(a*.05)*.3,z=[A,R[0]+.08*Math.sin(a*.04),R[1]];return r=Fe(Pe(50*Math.PI/180,b.aspect,.05,30),Se(z,[A*.3,R[2],R[3]])),v.render(p,b,.45)},info:()=>`${l.name()} (M) · ${re[i].name} (P)`,dispose:()=>v.dispose()}}const yt=9e4,Mt=`#version 300 es
${me}
${De}
uniform mat4 uVP; uniform float uPx, uRipR, uRipA, uTint, uSpin;
out vec3 vc;
void main(){
  int id = gl_VertexID;
  vec3 h = hash33(vec3(float(id) * .0137, float(id) * .00731, 4.7)) * .5 + .5;
  float arm = float(id % 3);
  float r = .08 + pow(h.x, .7) * 2.3;
  float th = arm * 2.0943951 + r * 1.9 + (h.y - .5) * (.9 / (r + .4)) + uSpin * (.55 / (r + .35));
  float e = band(clamp(r / 2.4, 0., 1.));
  float rip = exp(-pow((r - uRipR) * 3.5, 2.)) * uRipA;
  float y = (h.z - .5) * .14 * exp(-r * .6) + rip * .12 + noise3d(vec3(r * 3., th, uT * .2)) * .02 * e;
  vec3 P = vec3(cos(th) * r, y, sin(th) * r);
  vec4 clip = uVP * vec4(P, 1.);
  gl_Position = clip;
  gl_PointSize = clamp((1.2 + 2. * e * e) * uPx / clip.w, 1., 5.);
  float core = exp(-r * 2.2);
  vec3 c = mix(pal(r * .35 + .1), vec3(1., .85, .6), core * .7);
  vc = mix(vec3(1.), c, max(uTint, .55)) * (.05 + .35 * e * e + .6 * core + .5 * rip) * .55;
}`;function wt(e,o){let a=0,t=0,s=9,n=0,r=0,i=null;const u=Ne(e,o,Mt,yt,c=>{e.uniformMatrix4fv(c.u.uVP,!1,i),e.uniform1f(c.u.uRipR,s),e.uniform1f(c.u.uRipA,n),e.uniform1f(c.u.uSpin,t)});return u.tint(.85),{look:{linear:!0,bloom:.8,scale:1},resize:(c,l)=>u.resize(c,l),render(c,l){a+=c.dt,t+=c.dt*(.25+.5*Math.min(2,c.midAtt)),c.events.kick!==r&&(r=c.events.kick,s=0,n=1),s+=c.dt*2.4,n*=Math.exp(-c.dt*1.2);const v=a*.04,p=[Math.sin(v)*3.4,1.9+.3*Math.sin(a*.05),Math.cos(v)*3.4];return i=Fe(Pe(45*Math.PI/180,l.aspect,.05,30),Se(p,[0,0,0])),u.render(c,l,.55)},dispose:()=>u.dispose()}}function he(e,o,a,{look:t,label:s,keys:n,info:r,before:i,setup:u}){const c=O(e,a);let l=null;return{look:t,label:s,keys:n,info:r,resize(v,p){l&&l.dispose(),l=J(e,v,p,o)},render(v,p){return i&&i(v,p),e.bindFramebuffer(e.FRAMEBUFFER,l.fb),e.viewport(0,0,l.w,l.h),e.useProgram(c.p),se(e,c,v,p),u&&u(c,v,p),e.bindVertexArray(p.quadVao),e.drawArrays(e.TRIANGLES,0,3),l.tex},dispose(){l&&l.dispose(),e.deleteProgram(c.p)}}}const Rt=K(`
uniform float uSpeed, uTwist, uRing, uRingDepth;
float near(float x){ return abs(fract(x + .5) - .5); }
void main(){
  vec2 p = (uv - .5) * vec2(uAspect, 1.);
  p += vec2(sin(uT * .13), cos(uT * .11)) * .05;
  float r = max(length(p), 1e-3), a = atan(p.y, p.x);
  float z = .3 / r + uSpeed;                                    // Tiefe
  float u = a / 6.2831853 + .5 + uTwist + .05 * sin(z * .3);
  float zr = z * 1.4, ur = u * 20.;
  float fz = max(fwidth(zr), 1e-3), fu = max(fwidth(ur), 1e-3);
  float ring = smoothstep(fz * 2., 0., near(zr)) + .25 * exp(-near(zr) * 10.);
  float rail = smoothstep(fu * 2., 0., near(ur)) + .2 * exp(-near(ur) * 10.);
  vec2 cell = floor(vec2(ur, zr));
  float ce = band(fract(hash12(cell) + .13));
  float panel = pow(ce, 3.) * .5;
  float e = band(fract(z * .04));
  vec3 base = pal(z * .02 + u * .3);
  vec3 col = base * (ring * (.35 + 1.1 * e) + rail * (.25 + .6 * ce)) + pal(hash12(cell) * .5 + .2) * panel;
  // Kick-Ring: kommt aus der Tiefe auf einen zu
  col += vec3(1.) * exp(-abs(z - uRingDepth) * 7.) * uRing * 1.2;
  float fog = smoothstep(.0, .35, r);
  col *= fog;
  col += pal(.1) * exp(-r * 16.) * (.25 + .8 * min(uBassAtt, 2.) * .5);  // Licht am Ende
  o = vec4(col, 1.);
}`);function kt(e,o){let a=0,t=0,s=0,n=0,r=0;return he(e,o,Rt,{look:{linear:!0,bloom:.75,scale:1},before(i){const u=i.conf>.4?i.bpm/60*.72:.6+.8*Math.min(2,i.bassAtt);a+=i.dt*u*(i.playing?1:.15),t+=i.dt*.02*(i.midAtt-.9),i.events.kick!==r&&(r=i.events.kick,s=1,n=a+7),s*=Math.exp(-i.dt*1.8)},setup(i){e.uniform1f(i.u.uSpeed,a),e.uniform1f(i.u.uTwist,t),e.uniform1f(i.u.uRing,s),e.uniform1f(i.u.uRingDepth,n)}})}const At=K(`
uniform vec3 uFold, uEye;
uniform float uScale, uSpin, uGlow;
uniform mat3 uView;
mat2 r2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float de(vec3 p, out float trap){
  float s = 1.; trap = 1e3;
  for (int i = 0; i < 8; i++) {
    p = abs(p);
    if (p.x < p.y) p.xy = p.yx;
    if (p.x < p.z) p.xz = p.zx;
    if (p.y < p.z) p.yz = p.zy;
    p = p * uScale - uFold * (uScale - 1.);
    p.xz *= r2(uSpin);
    trap = min(trap, dot(p, p));
    s *= uScale;
  }
  return (length(p) - 1.5) / s;
}
void main(){
  vec2 q = (uv - .5) * vec2(uAspect, 1.);
  vec3 rd = normalize(uView * vec3(q, 1.6));
  vec3 ro = uEye;
  float t = 0., trap = 0., glow = 0.;
  bool hit = false;
  for (int i = 0; i < 100; i++) {
    float d = de(ro + rd * t, trap);
    glow += exp(-d * 40.) * .012;
    if (d < .0012 * t) { hit = true; break; }
    t += d * .9;
    if (t > 14.) break;
  }
  vec3 col = pal(.75 + uT * .01) * glow * (.6 + uGlow);
  if (hit) {
    vec3 p = ro + rd * t;
    float tr;
    vec2 e = vec2(.0015 * t, 0.);
    vec3 n = normalize(vec3(de(p + e.xyy, tr) - de(p - e.xyy, tr), de(p + e.yxy, tr) - de(p - e.yxy, tr), de(p + e.yyx, tr) - de(p - e.yyx, tr)));
    vec3 l = normalize(vec3(.6, .8, -.4));
    float dif = max(dot(n, l), 0.), rim = pow(1. - max(dot(n, -rd), 0.), 3.);
    vec3 base = pal(sqrt(trap) * .12 + uT * .01);
    col = base * (.08 + .9 * dif) + pal(.5) * rim * (.4 + uGlow) + col;
    col *= exp(-t * .12);
  }
  o = vec4(col, 1.);
}`);function Pt(e,o){let a=0,t=0,s=0,n=0;return he(e,o,At,{look:{linear:!0,bloom:.6,scale:.7},before(r){a+=r.dt,t+=r.dt*.05*(.4+r.midAtt),r.events.kick!==n&&(n=r.events.kick,s=1),s*=Math.exp(-r.dt*4)},setup(r,i){const u=Math.min(2,i.bassAtt);e.uniform3f(r.u.uFold,1+.08*Math.sin(a*.11)+.05*u,.85+.06*i.bands[8],.6+.08*i.bands[20]),e.uniform1f(r.u.uScale,1.85+.05*u),e.uniform1f(r.u.uSpin,t),e.uniform1f(r.u.uGlow,s);const c=a*.06,l=[Math.sin(c)*5.2,1.2*Math.sin(a*.045),Math.cos(c)*5.2],v=Math.hypot(...l),p=l.map(R=>-R/v);let b=[-p[2],0,p[0]];const E=Math.hypot(...b)||1;b=b.map(R=>R/E);const P=[b[1]*p[2]-b[2]*p[1],b[2]*p[0]-b[0]*p[2],b[0]*p[1]-b[1]*p[0]];e.uniform3fv(r.u.uEye,l),e.uniformMatrix3fv(r.u.uView,!1,new Float32Array([...b,...P,...p]))}})}const St=K(`
uniform float uFlow;
const float LAKE = -.27;
// Bergkamm: gezackt (umgekehrtes Rauschen), mehrere Grössen übereinander
float ridge(float x, float s, float seed){
  float h = 0., a = .55, f = s;
  for (int i = 0; i < 5; i++) {
    float n = clamp(1. - abs(gnoise(vec2(x * f, seed + float(i) * 7.3)) * 2.2), 0., 1.);
    h += n * n * a; a *= .5; f *= 2.05;
  }
  return h;
}
float backTop(float x){ return LAKE + .05 + .26 * ridge(x + 4.1, .9, 1.7); }
float frontTop(float x){ return LAKE + .015 + .13 * ridge(x - 2.3, 1.6, 5.1); }
vec3 aurora(vec2 q){
  vec3 col = vec3(0.);
  for (int k = 0; k < 3; k++) {
    float fk = float(k);
    float x = q.x * (1. - fk * .18) + fk * 1.7;
    float c = .03 + fk * .07 + .14 * fbm(vec3(x * .85 + uFlow * (.04 + fk * .012), fk * 2., uT * .03));
    float d = q.y - c;
    float above = exp(-max(d, 0.) * (4.5 - fk)) * smoothstep(-.014, .0, d);
    float rays = .4 + .6 * fbm(vec3(x * 24. + uFlow * .35, fk, uT * .22));
    float e = band(.25 + fk * .2);
    vec3 cc = mix(vec3(.05, 1., .45), vec3(.8, .2, 1.), clamp(d * 3. + uCen * .8 - .1, 0., 1.));
    col += cc * above * rays * (.1 + .6 * e * e) * (1. - fk * .25);
  }
  return col;
}
vec3 sky(vec2 q, float stars){
  vec3 col = mix(vec3(.006, .01, .025), vec3(.0, .012, .03), smoothstep(-.1, .5, q.y));
  vec2 g = floor(q * 260.); float h = hash12(g);
  col += vec3(.9) * step(.9968, h) * (.5 + .5 * sin(uT * (2. + h * 5.) + h * 40.)) * .45 * stars;
  return col + aurora(q);
}
vec3 land(vec2 q, vec3 glow){
  float bt = backTop(q.x), ft = frontTop(q.x);
  if (q.y < ft) return vec3(.003, .004, .006) + glow * .04 * smoothstep(ft - .03, ft, q.y);
  if (q.y < bt) {
    float snow = smoothstep(bt - .05, bt - .005, q.y) * smoothstep(LAKE + .12, LAKE + .2, bt);
    return mix(vec3(.01, .012, .02), vec3(.35, .4, .5), snow * .35) + glow * (.06 + .5 * snow);
  }
  return vec3(-1.);
}
void main(){
  vec2 q = (uv - .5) * vec2(uAspect, 1.);
  vec3 glow = aurora(vec2(q.x, .12)) * .8;          // Licht des Polarlichts auf Schnee und Kämmen
  vec3 col;
  if (q.y > LAKE) {
    vec3 l = land(q, glow);
    col = l.x >= 0. ? l : sky(q, 1.);
  } else {
    float d = LAKE - q.y;
    float rip = gnoise(vec2(q.x * 30., q.y * 140. - uT)) * (.0015 + d * .02);
    vec2 r = vec2(q.x + rip, LAKE + d * 1.05);
    vec3 l = land(r, glow);
    col = (l.x >= 0. ? l : sky(r, .35)) * .55 * (1. - d * 1.2);
  }
  o = vec4(col, 1.);
}`);function Ft(e,o){let a=0;return he(e,o,St,{look:{linear:!0,bloom:.55,scale:.85},before(t){a+=t.dt*(.5+.8*Math.min(2,t.bassAtt))},setup(t){e.uniform1f(t.u.uFlow,a)}})}const Dt=K(`
uniform float uMove, uSun;
float mtn(float x){
  float b = band(clamp(abs(x) * .55, 0., 1.));
  float saw = abs(fract(x * 3.1) - .5) * 2.;
  return .015 + (.04 + .17 * b) * (1. - saw * .8) * smoothstep(.12, .55, abs(x));
}
void main(){
  vec2 q = (uv - .5) * vec2(uAspect, 1.);
  float hz = -.06;
  vec3 col;
  if (q.y > hz) {
    float y = q.y - hz;
    col = mix(vec3(.5, .05, .35), vec3(.02, .01, .08), smoothstep(0., .5, y)) * .35;
    vec2 g = floor(q * 200.); col += vec3(.8) * step(.997, hash12(g)) * smoothstep(.15, .4, y);
    // Sonne mit Streifen
    vec2 sp = q - vec2(0., hz + .2);
    float R = .2 * (1. + .04 * uSun);
    float sd = length(sp);
    if (sd < R) {
      float k = (sp.y + R) / (2. * R);
      float stripe = step(.5, fract(sp.y * 26. + uT * .4)) + step(.55, k);
      vec3 sc = mix(vec3(1., .15, .45), vec3(1., .85, .2), k);
      col = mix(col, sc * 1.4, min(1., stripe));
    }
    col += vec3(1., .3, .5) * exp(-sd * 6.) * .15 * (1. + uSun);
    // Berge aus dem Spektrum
    float m = hz + mtn(q.x);
    if (q.y < m) col = vec3(.03, .01, .06) + vec3(.1, .9, 1.) * exp(-(m - q.y) * 120.) * .8;
  } else {
    // Boden: Raster in Perspektive, läuft im Takt nach vorne
    float d = hz - q.y;
    float z = .32 / d;
    float x = q.x * z;
    float gx = abs(fract(x * 1.2) - .5), gz = abs(fract(z * .9 - uMove) - .5);
    float fx = fwidth(x * 1.2), fz = fwidth(z * .9);
    float line = max(smoothstep(fx * 2., 0., gx), smoothstep(fz * 2., 0., gz));
    float fade = smoothstep(.0, .05, d);
    col = vec3(.01, .0, .03) + vec3(1., .1, .8) * line * fade * (.6 + .6 * uPulse) + vec3(1., .1, .8) * exp(-d * 25.) * .25;
  }
  o = vec4(col, 1.);
}`);function _t(e,o){let a=0;return he(e,o,Dt,{look:{linear:!0,bloom:.8,scale:1},before(t){const s=t.conf>.4?t.bpm/60:1.2;a+=t.dt*s*.5*(t.playing?1:.2)},setup(t,s){e.uniform1f(t.u.uMove,a),e.uniform1f(t.u.uSun,s.pulse)}})}const Lt=K(`
uniform vec3 uDir[32];
uniform mat3 uRotM;
uniform float uR;
float B[32];
float spikes(vec3 n){
  float s = 0.;
  for (int k = 0; k < 32; k++) {
    float d = max(dot(n, uDir[k]), 0.);
    s = max(s, pow(d, 90.) * B[k]);
  }
  return s;
}
float sdf(vec3 p){
  p = uRotM * p;
  float l = length(p);
  vec3 n = p / max(l, 1e-4);
  return (l - uR - spikes(n) * .85 - .03 * noise3(p * 3. + uT * .3)) * .45;
}
vec3 env(vec3 d){
  // dunkles Studio: Leiste oben, zwei senkrechte hinten, weiche Fläche oben
  float top = smoothstep(.02, 0., abs(d.y - .55)) * smoothstep(.9, .3, abs(d.x));
  float side = smoothstep(.04, 0., abs(abs(atan(d.x, d.z)) - 2.3)) * smoothstep(-.2, .2, d.y);
  float soft = smoothstep(.75, .98, d.y);
  return vec3(1.) * (top * 2.5 + side * 1.8 + soft * .6) + pal(.6) * .03;
}
void main(){
  for (int k = 0; k < 32; k++) B[k] = texelFetch(uAudio, ivec2(k, 0), 0).r;
  vec2 q = (uv - .5) * vec2(uAspect, 1.);
  vec3 ro = vec3(0., 0., -4.2), rd = normalize(vec3(q, 1.7));
  float t = 0.;
  bool hit = false;
  for (int i = 0; i < 90; i++) {
    float d = sdf(ro + rd * t);
    if (d < .001) { hit = true; break; }
    t += d;
    if (t > 9.) break;
  }
  vec3 col = vec3(.006, .006, .01) + pal(.7) * .02 * (1. - length(q));
  if (hit) {
    vec3 p = ro + rd * t;
    vec2 e = vec2(.002, 0.);
    vec3 n = normalize(vec3(sdf(p + e.xyy) - sdf(p - e.xyy), sdf(p + e.yxy) - sdf(p - e.yxy), sdf(p + e.yyx) - sdf(p - e.yyx)));
    vec3 r = reflect(rd, n);
    float fr = .04 + .96 * pow(1. - max(dot(n, -rd), 0.), 5.);
    col = env(r) * (.05 + .95 * fr) * vec3(.9, .92, 1.) + pal(.15 + uCen) * pow(max(dot(r, normalize(vec3(-.6, .4, -1.))), 0.), 40.) * (.3 + uPulse);
  }
  o = vec4(col, 1.);
}`);function zt(e,o){const a=[];for(let s=0;s<32;s++){const n=1-2*(s+.5)/32,r=Math.sqrt(1-n*n),i=s*2.39996323;a.push(Math.cos(i)*r,n,Math.sin(i)*r)}let t=0;return he(e,o,Lt,{look:{linear:!0,bloom:.5,scale:.8},before(s){t+=s.dt*(.15+.15*Math.min(2,s.midAtt))},setup(s,n){const r=t,i=t*.7,u=Math.cos(r),c=Math.sin(r),l=Math.cos(i),v=Math.sin(i);e.uniformMatrix3fv(s.u.uRotM,!1,new Float32Array([u,c*v,-c*l,0,l,v,c,-u*v,u*l])),e.uniform3fv(s.u.uDir,a),e.uniform1f(s.u.uR,.9+.08*Math.min(2,n.bassAtt))}})}const Bt=K(`
uniform sampler2D uCover;
uniform float uN, uRot, uZoom, uHas, uAb;
vec2 mirror(vec2 p){ return abs(fract(p * .5 + .5) * 2. - 1.); }
vec3 cover(vec2 p){
  if (uHas < .5) return pal(p.x * .7 + p.y * .4);
  return pow(texture(uCover, mirror(p)).rgb, vec3(2.2));
}
void main(){
  vec2 p = (uv - .5) * vec2(uAspect, 1.);
  float r = length(p), a = atan(p.y, p.x) + uRot;
  float seg = 6.2831853 / uN;
  a = mod(a, seg); a = abs(a - seg * .5);
  vec2 q = vec2(cos(a), sin(a)) * r * uZoom + vec2(uT * .02, uT * .013);
  float ab = uAb * .012;
  vec3 col = vec3(cover(q + vec2(ab, 0.)).r, cover(q).g, cover(q - vec2(ab, 0.)).b);
  col *= .55 + .6 * smoothstep(1.1, .1, r) + .25 * uPulse;
  o = vec4(col, 1.);
}`);function Vt(e,o){const a=e.createTexture();let t=null,s=0,n=0,r=8;return he(e,o,Bt,{look:{linear:!0,bloom:.35,scale:1,vignette:.6},keys:{m:()=>(r=r>=12?4:r+2,`Spiegel: ${r}-fach`)},info:()=>`${r}-fach (M)`,before(i,u){u.coverCanvas!==t&&(t=u.coverCanvas,s=t?1:0,t&&(e.bindTexture(e.TEXTURE_2D,a),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,t),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE))),n+=i.dt*(i.conf>.4?.12:.08)*(.5+i.midAtt)},setup(i,u){e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,a),e.uniform1i(i.u.uCover,0),e.uniform1f(i.u.uHas,s),e.uniform1f(i.u.uN,r),e.uniform1f(i.u.uRot,n),e.uniform1f(i.u.uZoom,1.25-.12*Math.min(1,u.bass*.5)-.08*u.pulse),e.uniform1f(i.u.uAb,u.kick)}})}const Nt=K(`
uniform sampler2D uVel, uSrc; uniform vec2 uTexel; uniform float uStep, uDiss;
void main(){
  vec2 p = uv - uStep * texture(uVel, uv).xy * uTexel;
  o = vec4(texture(uSrc, p).rgb / (1. + uDiss * uStep), 1.);
}`),It=K(`
uniform sampler2D uSrc; uniform vec2 uPoint; uniform vec3 uVal; uniform float uRad;
void main(){
  vec2 d = uv - uPoint; d.x *= uAspect;
  o = vec4(texture(uSrc, uv).rgb + uVal * exp(-dot(d, d) / uRad), 1.);
}`),qt=K(`
uniform sampler2D uVel; uniform vec2 uTexel;
void main(){
  float L = texture(uVel, uv - vec2(uTexel.x, 0.)).y, R = texture(uVel, uv + vec2(uTexel.x, 0.)).y;
  float B = texture(uVel, uv - vec2(0., uTexel.y)).x, T = texture(uVel, uv + vec2(0., uTexel.y)).x;
  o = vec4(.5 * (R - L - T + B), 0., 0., 1.);
}`),Ut=K(`
uniform sampler2D uVel, uCurl; uniform vec2 uTexel; uniform float uStep, uStr;
void main(){
  float L = texture(uCurl, uv - vec2(uTexel.x, 0.)).x, R = texture(uCurl, uv + vec2(uTexel.x, 0.)).x;
  float B = texture(uCurl, uv - vec2(0., uTexel.y)).x, T = texture(uCurl, uv + vec2(0., uTexel.y)).x;
  float C = texture(uCurl, uv).x;
  vec2 f = .5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
  f /= length(f) + 1e-4;
  f *= uStr * C; f.y *= -1.;
  vec2 v = texture(uVel, uv).xy + f * uStep;
  o = vec4(clamp(v, -1000., 1000.), 0., 1.);
}`),Ct=K(`
uniform sampler2D uVel; uniform vec2 uTexel;
void main(){
  vec2 c = texture(uVel, uv).xy;
  float L = texture(uVel, uv - vec2(uTexel.x, 0.)).x, R = texture(uVel, uv + vec2(uTexel.x, 0.)).x;
  float B = texture(uVel, uv - vec2(0., uTexel.y)).y, T = texture(uVel, uv + vec2(0., uTexel.y)).y;
  if (uv.x - uTexel.x < 0.) L = -c.x; if (uv.x + uTexel.x > 1.) R = -c.x;
  if (uv.y - uTexel.y < 0.) B = -c.y; if (uv.y + uTexel.y > 1.) T = -c.y;
  o = vec4(.5 * (R - L + T - B), 0., 0., 1.);
}`),Xt=K(`
uniform sampler2D uSrc; uniform float uK;
void main(){ o = vec4(texture(uSrc, uv).rgb * uK, 1.); }`),Gt=K(`
uniform sampler2D uP, uDiv; uniform vec2 uTexel;
void main(){
  float L = texture(uP, uv - vec2(uTexel.x, 0.)).x, R = texture(uP, uv + vec2(uTexel.x, 0.)).x;
  float B = texture(uP, uv - vec2(0., uTexel.y)).x, T = texture(uP, uv + vec2(0., uTexel.y)).x;
  o = vec4((L + R + B + T - texture(uDiv, uv).x) * .25, 0., 0., 1.);
}`),Ot=K(`
uniform sampler2D uP, uVel; uniform vec2 uTexel;
void main(){
  float L = texture(uP, uv - vec2(uTexel.x, 0.)).x, R = texture(uP, uv + vec2(uTexel.x, 0.)).x;
  float B = texture(uP, uv - vec2(0., uTexel.y)).x, T = texture(uP, uv + vec2(0., uTexel.y)).x;
  o = vec4(texture(uVel, uv).xy - vec2(R - L, T - B), 0., 1.);
}`),Kt=K(`
uniform sampler2D uDye;
void main(){
  vec3 c = texture(uDye, uv).rgb;
  // leichte Tiefe: Kanten etwas heller (Licht von oben links)
  vec2 e = vec2(1.5) / uRes;
  float hx = length(texture(uDye, uv + vec2(e.x, 0.)).rgb) - length(texture(uDye, uv - vec2(e.x, 0.)).rgb);
  float hy = length(texture(uDye, uv + vec2(0., e.y)).rgb) - length(texture(uDye, uv - vec2(0., e.y)).rgb);
  float shade = clamp(1. + (hy - hx) * 1.5, .6, 1.5);
  o = vec4(c * shade, 1.);
}`);function $t(e,o){const a={advect:O(e,Nt),splat:O(e,It),curl:O(e,qt),vort:O(e,Ut),div:O(e,Ct),scale:O(e,Xt),pres:O(e,Gt),grad:O(e,Ot),show:O(e,Kt)};let t=null,s=null,n=null,r=1,i=0,u=0;const c=(E,P)=>[J(e,E,P,o),J(e,E,P,o)],l=E=>E.reverse();let v=null;const p=(E,P,R)=>{e.bindFramebuffer(e.FRAMEBUFFER,P.fb),e.viewport(0,0,P.w,P.h),e.useProgram(E.p),R(E),e.bindVertexArray(v),e.drawArrays(e.TRIANGLES,0,3)},b=(E,P,R,A,z,D)=>{p(a.splat,t.vel[1],S=>{I(e,S,"uSrc",t.vel[0].tex,0),e.uniform2f(S.u.uPoint,E,P),e.uniform3f(S.u.uVal,R,A,0),e.uniform1f(S.u.uRad,D),e.uniform1f(S.u.uAspect,r)}),l(t.vel),p(a.splat,s[1],S=>{I(e,S,"uSrc",s[0].tex,0),e.uniform2f(S.u.uPoint,E,P),e.uniform3fv(S.u.uVal,z),e.uniform1f(S.u.uRad,D),e.uniform1f(S.u.uAspect,r)}),l(s)};return{look:{linear:!0,bloom:.35,scale:1},resize(E,P){for(const z of[...t?[...t.vel,...t.prs,t.div,t.curl]:[],...s||[],...n?[n]:[]])z.dispose();r=E/P;const R=160,A=Math.round(R*r);t={vel:c(A,R),prs:c(A,R),div:J(e,A,R,o),curl:J(e,A,R,o),w:A,h:R},s=c(E,P),n=J(e,E,P,o)},render(E,P){v=P.quadVao;const R=Math.min(1/30,E.dt);i+=R,e.disable(e.BLEND);const A=[1/t.w,1/t.h],z=P.palette,D=(m,f)=>[z[m*3]*f,z[m*3+1]*f,z[m*3+2]*f],S=[[0,6],[6,14],[14,22],[22,32]];for(let m=0;m<4;m++){let f=0;for(let M=S[m][0];M<S[m][1];M++)f+=E.bands[M];if(f/=S[m][1]-S[m][0],!E.playing||f<.25)continue;const F=i*(.15+m*.04)+m*Math.PI/2,B=.5+Math.cos(F)*.3,T=.5+Math.sin(F*1.3)*.28,h=F+Math.PI/2,k=400*f*f;b(B,T,Math.cos(h)*k,Math.sin(h)*k,D(m,.05+.25*f*f),.0012+.002*f)}if(E.events.kick!==u){u=E.events.kick;const m=Math.random()*Math.PI*2,f=.5+Math.cos(m)*.35,F=.5+Math.sin(m)*.35;b(f,F,-Math.cos(m)*2200,-Math.sin(m)*2200,D(Math.floor(Math.random()*5),.9),.004)}p(a.curl,t.curl,m=>{I(e,m,"uVel",t.vel[0].tex,0),e.uniform2fv(m.u.uTexel,A)}),p(a.vort,t.vel[1],m=>{I(e,m,"uVel",t.vel[0].tex,0),I(e,m,"uCurl",t.curl.tex,1),e.uniform2fv(m.u.uTexel,A),e.uniform1f(m.u.uStep,R),e.uniform1f(m.u.uStr,18+14*Math.min(2,E.midAtt))}),l(t.vel),p(a.div,t.div,m=>{I(e,m,"uVel",t.vel[0].tex,0),e.uniform2fv(m.u.uTexel,A)}),p(a.scale,t.prs[1],m=>{I(e,m,"uSrc",t.prs[0].tex,0),e.uniform1f(m.u.uK,.8)}),l(t.prs);for(let m=0;m<20;m++)p(a.pres,t.prs[1],f=>{I(e,f,"uP",t.prs[0].tex,0),I(e,f,"uDiv",t.div.tex,1),e.uniform2fv(f.u.uTexel,A)}),l(t.prs);return p(a.grad,t.vel[1],m=>{I(e,m,"uP",t.prs[0].tex,0),I(e,m,"uVel",t.vel[0].tex,1),e.uniform2fv(m.u.uTexel,A)}),l(t.vel),p(a.advect,t.vel[1],m=>{I(e,m,"uVel",t.vel[0].tex,0),I(e,m,"uSrc",t.vel[0].tex,1),e.uniform2fv(m.u.uTexel,A),e.uniform1f(m.u.uStep,R),e.uniform1f(m.u.uDiss,.25)}),l(t.vel),p(a.advect,s[1],m=>{I(e,m,"uVel",t.vel[0].tex,0),I(e,m,"uSrc",s[0].tex,1),e.uniform2fv(m.u.uTexel,A),e.uniform1f(m.u.uStep,R),e.uniform1f(m.u.uDiss,.55)}),l(s),p(a.show,n,m=>{I(e,m,"uDye",s[0].tex,0),e.uniform2f(m.u.uRes,n.w,n.h)}),n.tex},dispose(){for(const E of[...t.vel,...t.prs,t.div,t.curl,...s,n])E.dispose();for(const E of Object.values(a))e.deleteProgram(E.p)}}}const le=[{id:"klassik",name:"Klassik",make:at},{id:"magnet",name:"Magnetfeld",make:mt},{id:"neon",name:"Neon",make:dt},{id:"sphaere",name:"Punktsphäre",make:Tt},{id:"welle",name:"Punktwelle",make:Et},{id:"tunnel",name:"Tunnelflug",make:kt},{id:"fraktal",name:"Fraktal",make:Pt},{id:"tinte",name:"Tinte",make:$t},{id:"polarlicht",name:"Polarlicht",make:Ft},{id:"synthwave",name:"Synthwave",make:_t},{id:"ferrofluid",name:"Ferrofluid",make:zt},{id:"galaxie",name:"Galaxie",make:wt},{id:"kaleidoskop",name:"Kaleidoskop",make:Vt}],Ht=K(`
uniform sampler2D uSrc; uniform vec2 uPx; uniform float uThresh;
void main(){
  vec3 c = (texture(uSrc, uv + uPx * vec2(-1, -1)).rgb + texture(uSrc, uv + uPx * vec2(1, -1)).rgb +
            texture(uSrc, uv + uPx * vec2(-1, 1)).rgb + texture(uSrc, uv + uPx * vec2(1, 1)).rgb) * .25;
  if (uThresh > 0.) { float l = max(c.r, max(c.g, c.b)); c *= smoothstep(uThresh * .5, uThresh * 1.5, l); }
  o = vec4(c, 1.);
}`),jt=K(`
uniform sampler2D uA, uB, uB1, uB2, uB3, uB4;
uniform float uMix, uExpo, uFlashAmt, uBloomAmt, uTone, uVig;
vec3 aces(vec3 c){ return clamp((c * (2.51 * c + .03)) / (c * (2.43 * c + .59) + .14), 0., 1.); }
void main(){
  vec3 c = texture(uA, uv).rgb;
  if (uMix > 0.) {
    float n = fbm(vec3(uv * vec2(uAspect, 1.) * 2.2, 7.3)) * .9 + .5;
    float m = smoothstep(n - .12, n + .12, uMix * 1.3 - .15);
    c = mix(c, texture(uB, uv).rgb, m);
  }
  vec3 bloom = texture(uB1, uv).rgb * .5 + texture(uB2, uv).rgb * .6 + texture(uB3, uv).rgb * .7 + texture(uB4, uv).rgb * .8;
  c += bloom * uBloomAmt;
  c *= uExpo * (1. + uFlashAmt);
  c = mix(clamp(c, 0., 1.), aces(c), uTone);
  float v = smoothstep(1.35, .45, length((uv - .5) * vec2(uAspect, 1.)) * 1.25);
  c *= mix(1. - uVig, 1., v);
  c = pow(c, vec3(1. / 2.2));
  c += (hash12(gl_FragCoord.xy + fract(uT) * 91.) - .5) / 255.;   // gegen Farbstufen
  o = vec4(c, 1.);
}`);function Wt(e){const o=e.getContext("webgl2",{antialias:!1,alpha:!1,preserveDrawingBuffer:!1,powerPreference:"high-performance"});if(!o)throw new Error("WebGL 2 fehlt");const a=!!o.getExtension("EXT_color_buffer_float")||!!o.getExtension("EXT_color_buffer_half_float"),t=o.createBuffer(),s=o.createVertexArray();o.bindVertexArray(s),o.bindBuffer(o.ARRAY_BUFFER,t),o.bufferData(o.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),o.STATIC_DRAW),o.enableVertexAttribArray(0),o.vertexAttribPointer(0,2,o.FLOAT,!1,0,0);const n=O(o,Ht),r=O(o,jt),i=o.createTexture(),u=new Float32Array(512*2);o.bindTexture(o.TEXTURE_2D,i),o.texImage2D(o.TEXTURE_2D,0,o.R32F,512,2,0,o.RED,o.FLOAT,u),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,o.NEAREST),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MAG_FILTER,o.NEAREST);const c=o.createTexture();o.bindTexture(o.TEXTURE_2D,c),o.texImage2D(o.TEXTURE_2D,0,o.R32F,te,128,0,o.RED,o.FLOAT,new Float32Array(te*128)),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,o.NEAREST),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MAG_FILTER,o.NEAREST);let l=0,v=0;const p=new Float32Array(te),b=le.map(d=>d.make(o,a));let E=0,P=0,R=.75,A=[];const z={seed:.3,aspect:1,histRow:0,w:1,h:1,palette:new Float32Array(15),audioTex:i,histTex:c,quadVao:s,cover:null,coverPixels:null,coverCanvas:null,title:"",artist:""},D=d=>[Math.max(32,Math.round(E*(d.look.scale||1))),Math.max(32,Math.round(P*(d.look.scale||1)))],S=()=>{const d=Math.min(window.devicePixelRatio||1,2);e.width=Math.round(e.clientWidth*d)||1,e.height=Math.round(e.clientHeight*d)||1,E=Math.max(64,Math.round(e.width*R)),P=Math.max(64,Math.round(e.height*R)),z.aspect=E/P;for(const _ of b)_.resize(...D(_));for(const _ of A)_.dispose();A=[];let y=E,U=P;for(let _=0;_<4;_++)y=Math.max(8,y>>1),U=Math.max(8,U>>1),A.push(J(o,y,U,a))};S();let m=0,f=-1,F=0,B=16,T=performance.now(),h=60;const k=d=>{d!==m&&(f=m,m=d,F=1e-4)},M=(d,y)=>{const U=b[d],[_,x]=D(U);return z.w=_,z.h=x,o.bindVertexArray(s),o.disable(o.BLEND),U.render(y,z)};return{gl:o,frame:(d,y)=>{o.bindVertexArray(s),o.disable(o.BLEND);for(let X=0;X<te;X++)u[X]=d.bands[X];if(u.set(d.wave,512),o.bindTexture(o.TEXTURE_2D,i),o.texSubImage2D(o.TEXTURE_2D,0,0,0,512,2,o.RED,o.FLOAT,u),v+=d.dt,v>=1/32){v%=1/32,l=(l+1)%128;for(let X=0;X<te;X++)p[X]=d.bands[X]*(d.playing?1:0);o.bindTexture(o.TEXTURE_2D,c),o.texSubImage2D(o.TEXTURE_2D,0,0,l,te,1,o.RED,o.FLOAT,p)}z.histRow=l;const U=M(m,d);let _=null;const x=f;x>=0&&(_=M(x,d),F=Math.min(1,F+d.dt/2.5)),o.bindVertexArray(s),o.disable(o.BLEND);let L=U,[H,Q]=D(b[m]);for(let X=0;X<A.length;X++){const ee=A[X];o.bindFramebuffer(o.FRAMEBUFFER,ee.fb),o.viewport(0,0,ee.w,ee.h),o.useProgram(n.p),I(o,n,"uSrc",L,0),o.uniform2f(n.u.uPx,.5/H,.5/Q),o.uniform1f(n.u.uThresh,X===0?.3:0),o.drawArrays(o.TRIANGLES,0,3),L=ee.tex,H=ee.w,Q=ee.h}const C=b[m].look,Y=_?b[x].look:C,pe=_?F:1,j=(X,ee)=>(Y[X]??ee)+((C[X]??ee)-(Y[X]??ee))*pe;o.bindFramebuffer(o.FRAMEBUFFER,null),o.viewport(0,0,e.width,e.height),o.useProgram(r.p),se(o,r,d,z),I(o,r,"uA",_||U,0),I(o,r,"uB",U,1);for(let X=0;X<4;X++)I(o,r,"uB"+(X+1),A[X].tex,2+X);o.uniform1f(r.u.uMix,_?F:0),o.uniform1f(r.u.uExpo,j("expo",1.1)),o.uniform1f(r.u.uBloomAmt,j("bloom",.5)),o.uniform1f(r.u.uTone,j("linear",1)),o.uniform1f(r.u.uVig,j("vignette",.45)),o.uniform1f(r.u.uFlashAmt,Math.min(.12,d.flash*.1)),o.drawArrays(o.TRIANGLES,0,3),_&&F>=1&&(f=-1,F=0),B+=(y-B)*.05,h=1e3/Math.max(1,B);const g=performance.now();g-T>5e3&&(B>24&&R>.45?(R=Math.max(.45,R-.1),T=g,S()):B<11&&R<.75&&(R=Math.min(.75,R+.1),T=g,S()))},resize:S,setScene:k,get scene(){return m},get fps(){return h},get scale(){return R},current:()=>b[m],setLook(d){for(const y of["palette","seed","title","artist"])d[y]!=null&&(z[y]=d[y]);d.cover!==void 0&&(z.cover=d.cover,z.coverPixels=d.coverPixels||null,z.coverCanvas=d.coverCanvas||null)},dispose(){const d=o.getExtension("WEBGL_lose_context");for(const y of b)y.dispose();for(const y of A)y.dispose();d&&d.loseContext()}}}const _e=e=>e<=.04045?e/12.92:Math.pow((e+.055)/1.055,2.4);function Yt([e,o,a]){const t=Math.cbrt(.4122214708*e+.5363325363*o+.0514459929*a),s=Math.cbrt(.2119034982*e+.6806995451*o+.1073969566*a),n=Math.cbrt(.0883024619*e+.2817188376*o+.6299787005*a);return[.2104542553*t+.793617785*s-.0040720468*n,1.9779984951*t-2.428592205*s+.4505937099*n,.0259040371*t+.7827717662*s-.808675766*n]}function Zt([e,o,a]){const t=(e+.3963377774*o+.2158037573*a)**3,s=(e-.1055613458*o-.0638541728*a)**3,n=(e-.0894841775*o-1.291485548*a)**3;return[4.0767416621*t-3.3077115913*s+.2309699292*n,-1.2684380046*t+2.6097574011*s-.3413193965*n,-.0041960863*t-.7034186147*s+1.707614701*n].map(r=>Math.max(0,Math.min(1,r)))}const Le=new Float32Array([.25,.12,.9,.55,.15,.85,.1,.5,.95,.15,.85,.6,.95,.35,.45]);function Ge(e){let o=2166136261;for(const a of String(e||"x"))o=Math.imul(o^a.charCodeAt(0),16777619);return(o>>>0)%1e5/1e5}function Jt(e){return new Promise(o=>{if(!e)return o(null);const a=new Image;a.crossOrigin="anonymous",a.onload=()=>{try{const t=document.createElement("canvas");t.width=t.height=120;const s=t.getContext("2d",{willReadFrequently:!0});s.drawImage(a,0,0,120,120);const n=s.getImageData(0,0,120,120).data,r=document.createElement("canvas");r.width=r.height=512,r.getContext("2d").drawImage(a,0,0,512,512),o({pixels:n,palette:Qt(n),canvas:r})}catch{o(null)}},a.onerror=()=>o(null),a.src=e})}function Qt(e){const o=[];for(let r=0;r<e.length;r+=16)o.push(Yt([_e(e[r]/255),_e(e[r+1]/255),_e(e[r+2]/255)]));const a=5,t=[o[Math.floor(o.length/2)]];for(;t.length<a;){let r=null,i=-1;for(const u of o){let c=1/0;for(const l of t)c=Math.min(c,(u[0]-l[0])**2+(u[1]-l[1])**2+(u[2]-l[2])**2);c>i&&(i=c,r=u)}t.push(r)}const s=new Array(a).fill(0);for(let r=0;r<8;r++){const i=t.map(()=>[0,0,0]);s.fill(0);for(const u of o){let c=0,l=1/0;for(let v=0;v<a;v++){const p=t[v],b=(u[0]-p[0])**2+(u[1]-p[1])**2+(u[2]-p[2])**2;b<l&&(l=b,c=v)}s[c]++,i[c][0]+=u[0],i[c][1]+=u[1],i[c][2]+=u[2]}for(let u=0;u<a;u++)s[u]&&(t[u]=i[u].map(c=>c/s[u]))}const n=t.map(([r,i,u],c)=>{let l=Math.hypot(i,u),v=Math.atan2(u,i);l<.03&&(v=4.2+c*.5),l=Math.max(.09,Math.min(.2,l*1.25));const p=Math.max(.62,Math.min(.85,r*.6+.4));return{h:v,rgb:Zt([p,l*Math.cos(v),l*Math.sin(v)])}});return n.sort((r,i)=>r.h-i.h),new Float32Array(n.flatMap(r=>r.rgb))}const ve={get(e,o){try{const a=localStorage.getItem("viz."+e);return a==null?o:JSON.parse(a)}catch{return o}},set(e,o){try{localStorage.setItem("viz."+e,JSON.stringify(o))}catch{}}};function eo({track:e,onClose:o}){const a=W.useRef(null),t=W.useRef(null),s=W.useRef(null),[n,r]=W.useState(!0),[i,u]=W.useState(()=>Math.min(le.length-1,Math.max(0,ve.get("scene",0)))),[c,l]=W.useState(()=>!!ve.get("calm",!1)),[v,p]=W.useState(()=>!!ve.get("auto",!1)),[b,E]=W.useState(!1),[P,R]=W.useState(""),[A,z]=W.useState(""),[D,S]=W.useState(null),m=W.useRef(c),f=W.useRef(v);m.current=c,f.current=v;const F=T=>{const h=t.current;if(!h)return;const k=(T%le.length+le.length)%le.length;h.setScene(k),u(k),ve.set("scene",k),r(!0);const M=h.current().needs;R(M||"")};W.useEffect(()=>{const T=t.current;if(!T)return;T.setLook({seed:Ge(e&&e.id),palette:Le,cover:null,title:e&&e.title||"",artist:e&&e.artist||""});let h=!1;return Jt(e&&e.albumId?We(e.albumId,640):null).then(k=>{h||!t.current||t.current.setLook({palette:k?k.palette:Le,cover:e&&e.albumId||null,coverPixels:k?k.pixels:null,coverCanvas:k?k.canvas:null})}),()=>{h=!0}},[e&&e.id,e&&e.albumId,!!t.current]),W.useEffect(()=>{r(!0);let T=setTimeout(()=>r(!1),5e3);const h=()=>{r(!0),clearTimeout(T),T=setTimeout(()=>r(!1),2500)};return window.addEventListener("pointermove",h),()=>{clearTimeout(T),window.removeEventListener("pointermove",h)}},[e&&e.id,i,c,v,P]),W.useEffect(()=>{const T=h=>{const k=h.key.toLowerCase(),M=t.current;if(k==="escape"||k==="v"&&!h.ctrlKey&&!h.metaKey||k==="t"&&(h.ctrlKey||h.metaKey))o();else if(k==="arrowright"||k==="n")F((M?M.scene:0)+1);else if(k==="arrowleft")F((M?M.scene:0)-1);else if(/^[0-9]$/.test(k)&&(Number(k)||10)<=le.length)F((Number(k)||10)-1);else if(k==="r")l(w=>(ve.set("calm",!w),!w));else if(k==="a")p(w=>(ve.set("auto",!w),!w));else if(k==="d")E(w=>!w);else if(M&&M.current().keys&&M.current().keys[k])R(M.current().keys[k]()||"");else return;h.preventDefault(),h.stopPropagation()};return window.addEventListener("keydown",T,!0),()=>window.removeEventListener("keydown",T,!0)},[o]),W.useEffect(()=>{let T;try{T=Wt(a.current)}catch(C){console.error(C),z(String(C&&C.message||C).split(`
`)[0]);return}t.current=T;const h=Je();s.current=h;let k=0,M=0;const w=Ze(C=>{k++,M+=(C.frames||[]).length,h.push(C)});T.setLook({seed:Ge(e&&e.id),palette:Le,title:e&&e.title||"",artist:e&&e.artist||""}),T.setScene(i),R(T.current().needs||"");let d=0,y=performance.now(),U=performance.now(),_=performance.now();const x=C=>{const Y=C-y,pe=Math.min(.1,Y/1e3);y=C;const j=h.update(pe);m.current&&(j.flash=0,j.kick*=.35,j.pulse*=.35),f.current&&j.playing&&(C-U)/1e3>180&&(j.conf<.4||j.phase<.08)&&(U=C,F(T.scene+1));try{T.frame(j,Y)}catch(g){console.error(g)}if(C-_>500){const g=(C-_)/1e3;S({fps:T.fps,scale:T.scale,msg:k/g,frames:M/g,bpm:j.bpm,conf:j.conf,playing:j.playing,kicks:j.events.kick,int:j.intensity,bands:Array.from(j.bands),info:T.current().info?T.current().info():""}),k=0,M=0,_=C}d=requestAnimationFrame(x)};d=requestAnimationFrame(x);const L=()=>T.resize();window.addEventListener("resize",L);const H=C=>{C.preventDefault(),z("Die Grafikkarte hat den Visualizer beendet – bitte nochmals öffnen.")},Q=a.current;return Q.addEventListener("webglcontextlost",H),()=>{cancelAnimationFrame(d),window.removeEventListener("resize",L),Q.removeEventListener("webglcontextlost",H),w(),T.dispose(),t.current=null}},[]);const B=t.current&&t.current.current().label==="center";return $.jsxs("div",{className:"fixed inset-0 z-[70] bg-black",onClick:o,style:{cursor:n?"default":"none"},children:[$.jsx("canvas",{ref:a,className:"absolute inset-0 h-full w-full"}),A&&$.jsxs("div",{className:"absolute inset-0 grid place-items-center p-8 text-center text-sm text-zinc-400",children:["Visualizer geht hier nicht: ",A]}),B&&e&&$.jsxs("div",{className:"pointer-events-none absolute inset-x-0 top-[66%] text-center",style:{textShadow:"0 0 18px rgba(0,0,0,.8)"},children:[$.jsx("div",{className:"truncate px-8 text-2xl font-bold text-white sm:text-3xl",children:e.artist}),$.jsx("div",{className:"mt-1 truncate px-8 text-base text-zinc-200 sm:text-lg",children:e.title})]}),$.jsxs("div",{className:"pointer-events-none absolute bottom-8 left-8 max-w-[80vw] transition-opacity duration-700 "+(n?"opacity-100":"opacity-0"),children:[e&&!B&&$.jsxs($.Fragment,{children:[$.jsx("div",{className:"truncate text-2xl font-bold text-white drop-shadow-lg",children:e.title}),$.jsx("div",{className:"truncate text-lg text-zinc-300 drop-shadow",children:e.artist})]}),$.jsxs("div",{className:"mt-2 text-xs text-zinc-400 drop-shadow",children:[$.jsxs("span",{className:"text-zinc-100",children:[i+1," ",le[i].name]}),D&&D.info?` · ${D.info}`:"",v?" · wechselt automatisch (A)":"",c?" · ruhig (R)":""]}),$.jsx("div",{className:"mt-0.5 text-[11px] text-zinc-500 drop-shadow",children:"1–9, 0 / ← → Stil · M Muster · P Farben · A automatisch · R ruhig · D Diagnose · Esc schliessen"}),P&&$.jsx("div",{className:"mt-1 text-xs text-amber-300 drop-shadow",children:P})]}),b&&D&&$.jsxs("div",{className:"pointer-events-none absolute right-4 top-4 w-72 rounded-xl bg-black/70 p-3 font-mono text-[11px] leading-5 text-zinc-300",children:[$.jsxs("div",{children:["Bild: ",D.fps.toFixed(0)," fps · Auflösung ",Math.round(D.scale*100)," %"]}),$.jsxs("div",{children:["Daten: ",D.msg.toFixed(0)," Pakete/s · ",D.frames.toFixed(0)," Frames/s ",D.playing?"":"· (keine Musik)"]}),$.jsxs("div",{children:["Tempo: ",D.bpm?`${D.bpm.toFixed(1)} BPM`:"–"," · sicher ",Math.round(D.conf*100)," % · Kicks ",D.kicks]}),$.jsxs("div",{children:["Spannung: ",Math.round(D.int*100)," %"]}),$.jsx("div",{className:"mt-1 flex h-10 items-end gap-px",children:D.bands.map((T,h)=>$.jsx("span",{className:"flex-1 bg-accent/80",style:{height:`${Math.min(100,T*80)}%`}},h))})]})]})}export{eo as default};
