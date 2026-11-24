import{u as zt,r as ie,c as Wt,j as ne}from"./index-B1LRlggq.js";const ve=32,Ot=.07;function Gt(e){let t=!1,a=null;return(async()=>{for(;!t;){try{a=new AbortController;const s=await fetch(zt("/api/player/viz",!0),{signal:a.signal,cache:"no-store"});if(!s.ok||!s.body)throw new Error(`Fehler ${s.status}`);const n=s.body.getReader(),i=new TextDecoder;let r="";for(;;){const{value:c,done:u}=await n.read();if(u||t)break;r+=i.decode(c,{stream:!0});let f;for(;(f=r.indexOf(`

`))>=0;){const l=r.slice(0,f);if(r=r.slice(f+2),l.startsWith("data: "))try{e(JSON.parse(l.slice(6)))}catch{}}}}catch{}t||await new Promise(s=>setTimeout(s,800))}})(),()=>{t=!0,a&&a.abort()}}function Xt(){const e=[];let t=null,a=new Float32Array(512),o={bpm:0,conf:0,beat0:0,int:0,playing:!1},s=0;const n={t:0,dt:0,playing:!1,bands:new Float32Array(ve),db:new Float32Array(ve),wave:new Float32Array(512),waveRaw:new Float32Array(512),beats:0,bass:1,mid:1,treb:1,bassAtt:1,midAtt:1,trebAtt:1,kick:0,onset:0,pulse:0,flash:0,phase:0,beatIndex:0,conf:0,bpm:0,intensity:0,rms:0,centroid:0,lowClock:0,midClock:0,highClock:0,events:{kick:0,onset:0}},i=[0,0,0],r=[0,0,0],c=[0,0,0];let u=0;const f=new Float32Array(ve).fill(-90);let l=-90,h=-9,d=-9,b=-9,S=0,P=0,A=0,q=.05;const _=x=>{const y=performance.now()/1e3-x.now;t=t==null?y:Math.min(y,t+.002);for(const m of x.frames||[])(!e.length||m.at>e[e.length-1].at)&&e.push(m);for(;e.length>600;)e.shift();x.wave&&(a=Float32Array.from(x.wave)),o={bpm:x.bpm||0,conf:x.conf||0,beat0:x.beat0||0,int:x.int||0,playing:!!x.playing}},Q=(x,I)=>Math.pow(x,I*30);return{push:_,update:x=>{const I=performance.now()/1e3;n.dt=x,n.t+=x,n.playing=o.playing&&e.length>0;const y=t==null?0:I-t-Ot;let m=e.findIndex(p=>p.at>y),v=null;if(e.length){if(m===-1)v={f0:e[e.length-1],f1:e[e.length-1],k:0};else if(m===0)v={f0:e[0],f1:e[0],k:0};else{const p=e[m-1],z=e[m];v={f0:p,f1:z,k:Math.min(1,Math.max(0,(y-p.at)/Math.max(.001,z.at-p.at)))}}y-e[e.length-1].at>.5&&(v=null)}if(v){for(const p of e)if(!(p.at<=s)){if(p.at>y)break;p.k&&(n.events.kick++,h=n.t),p.on&&(n.events.onset++,d=n.t)}}const F=[];if(v)for(const p of e)p.at>s&&p.at<=y&&F.push(p);s=y;const O=(p,z,X)=>p+(z-p)*X;let K=-90;for(let p=0;p<ve;p++){let z=-100;if(v){z=O(v.f0.b[p],v.f1.b[p],v.k);for(const X of F)z=Math.max(z,X.b[p])}n.db[p]=z,f[p]=z>f[p]?z:Math.max(-90,f[p]-5*x),K=Math.max(K,f[p])}l=K>l?K:Math.max(-90,l-5*x);for(let p=0;p<ve;p++){const z=n.db[p],X=.6*f[p]+.4*l,g=Math.min(1,Math.max(0,(z+82)/12)),T=Math.min(1.15,Math.max(0,1+(z-X)/28))*g,Y=T>n.bands[p]?1-Math.exp(-x*30):1-Math.exp(-x*8);n.bands[p]+=(T-n.bands[p])*Y}for(let p=0;p<3;p++){let z=v?O(v.f0.bmt[p],v.f1.bmt[p],v.k):0;for(const Y of F)z=Math.max(z,Y.bmt[p]);i[p]=z;const X=i[p]>r[p],g=Q(X?.2:.5,x);r[p]=r[p]*g+i[p]*(1-g);const T=Q(u<50?.9:.992,x);c[p]=c[p]*T+i[p]*(1-T)}v&&(u+=x*30);const w=(p,z)=>c[z]>1e-5?Math.min(3,p/c[z]):0;if(n.bass=w(i[0],0),n.mid=w(i[1],1),n.treb=w(i[2],2),n.bassAtt=w(r[0],0),n.midAtt=w(r[1],1),n.trebAtt=w(r[2],2),n.bpm=o.bpm,n.conf=o.conf,n.playing&&(n.beats+=x*(o.conf>.4&&o.bpm>40?o.bpm:120)/60),o.bpm>0&&o.conf>.3&&t!=null){const p=60/o.bpm,z=(y-o.beat0)/p;n.phase=(z%1+1)%1,n.beatIndex=Math.floor(z)}else n.phase=(n.phase+x*2)%1;n.kick=Math.exp(-(n.t-h)/.14),n.onset=Math.exp(-(n.t-d)/.09),n.pulse=n.conf>.45?Math.exp(-(n.phase*60)/Math.max(40,n.bpm)/.12)*(n.playing?1:0):n.kick,h===n.t&&n.t-b>.34&&(b=n.t),n.flash=Math.exp(-(n.t-b)/.12);const k=1-Math.exp(-x*1.2);S+=((n.playing?o.int:0)-S)*(1-Math.exp(-x*.5)),P+=((v?O(v.f0.rms,v.f1.rms,v.k):0)-P)*k,A+=((v?O(v.f0.c,v.f1.c,v.k):A)-A)*k,n.intensity=S,n.rms=P,n.centroid=A,n.lowClock+=x*(.25+.9*Math.min(2,n.bassAtt)),n.midClock+=x*(.25+.9*Math.min(2,n.midAtt)),n.highClock+=x*(.25+.9*Math.min(2,n.trebAtt));let R=0;for(let p=0;p<512;p++)R=Math.max(R,Math.abs(a[p]));q=Math.max(R,q*Math.exp(-x*.4),.02);const H=1-Math.exp(-x*30);for(let p=0;p<512;p++){const z=n.playing?a[p]/q:0;n.wave[p]+=(z-n.wave[p])*H,n.waveRaw[p]=z}return n},A:n}}const jt=`#version 300 es
in vec2 p; out vec2 uv;
void main(){ uv = p * 0.5 + 0.5; gl_Position = vec4(p, 0.0, 1.0); }`,Xe=`
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
`;function ce(e,t,a=jt){const o=e.createProgram();for(const[i,r]of[[e.VERTEX_SHADER,a],[e.FRAGMENT_SHADER,t]]){const c=e.createShader(i);if(e.shaderSource(c,r),e.compileShader(c),!e.getShaderParameter(c,e.COMPILE_STATUS)){const u=e.getShaderInfoLog(c);throw new Error("Shader: "+u+`
`+r.split(`
`).map((f,l)=>`${l+1}: ${f}`).join(`
`).slice(0,4e3))}e.attachShader(o,c)}if(e.bindAttribLocation(o,0,"p"),e.linkProgram(o),!e.getProgramParameter(o,e.LINK_STATUS))throw new Error(e.getProgramInfoLog(o));const s={},n=e.getProgramParameter(o,e.ACTIVE_UNIFORMS);for(let i=0;i<n;i++){const r=e.getActiveUniform(o,i).name.replace(/\[0\]$/,"");s[r]=e.getUniformLocation(o,e.getActiveUniform(o,i).name)}return{p:o,u:s}}const me=e=>`#version 300 es
${Xe}
in vec2 uv; out vec4 o;
${e}`;function ge(e,t,a,o,s=!0,n=!1){const i=e.createTexture();e.bindTexture(e.TEXTURE_2D,i),n?e.texImage2D(e.TEXTURE_2D,0,e.RGBA32F,t,a,0,e.RGBA,e.FLOAT,null):o?e.texImage2D(e.TEXTURE_2D,0,e.RGBA16F,t,a,0,e.RGBA,e.HALF_FLOAT,null):e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,t,a,0,e.RGBA,e.UNSIGNED_BYTE,null);const r=s?e.LINEAR:e.NEAREST;e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,r),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,r),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE);const c=e.createFramebuffer();return e.bindFramebuffer(e.FRAMEBUFFER,c),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,i,0),e.clearColor(0,0,0,1),e.clear(e.COLOR_BUFFER_BIT),{tex:i,fb:c,w:t,h:a,dispose:()=>(e.deleteTexture(i),e.deleteFramebuffer(c))}}function Bt(e,t,a,o){let s=ge(e,t,a,o),n=ge(e,t,a,o);return{get src(){return s},get dst(){return n},swap(){const i=s;s=n,n=i},dispose(){s.dispose(),n.dispose()}}}function Re(e,t,a,o){const s=t.u,n=(i,r)=>s[i]!=null&&e.uniform1f(s[i],r);n("uT",a.t),n("uDt",a.dt),n("uBass",a.bass),n("uMid",a.mid),n("uTreb",a.treb),n("uBassAtt",a.bassAtt),n("uMidAtt",a.midAtt),n("uTrebAtt",a.trebAtt),n("uPulse",a.pulse),n("uKick",a.kick),n("uOnset",a.onset),n("uFlash",a.flash),n("uPhase",a.phase),n("uConf",a.conf),n("uInt",a.intensity),n("uRms",a.rms),n("uCen",a.centroid),n("uLowClk",a.lowClock),n("uMidClk",a.midClock),n("uHighClk",a.highClock),n("uSeed",o.seed),n("uAspect",o.aspect),n("uHistRow",o.histRow),s.uRes!=null&&e.uniform2f(s.uRes,o.w,o.h),s.uPal!=null&&e.uniform3fv(s.uPal,o.palette),s.uAudio!=null&&(e.activeTexture(e.TEXTURE6),e.bindTexture(e.TEXTURE_2D,o.audioTex),e.uniform1i(s.uAudio,6)),s.uHist!=null&&(e.activeTexture(e.TEXTURE7),e.bindTexture(e.TEXTURE_2D,o.histTex),e.uniform1i(s.uHist,7)),e.activeTexture(e.TEXTURE0)}function xe(e,t,a,o,s){t.u[a]!=null&&(e.activeTexture(e.TEXTURE0+s),e.bindTexture(e.TEXTURE_2D,o),e.uniform1i(t.u[a],s),e.activeTexture(e.TEXTURE0))}function Mt(e,t,a,o){const s=1/Math.tan(e/2),n=1/(a-o);return new Float32Array([s/t,0,0,0,0,s,0,0,0,0,(o+a)*n,-1,0,0,2*o*a*n,0])}function kt(e,t,a=[0,1,0]){let o=e[0]-t[0],s=e[1]-t[1],n=e[2]-t[2],i=Math.hypot(o,s,n)||1;o/=i,s/=i,n/=i;let r=a[1]*n-a[2]*s,c=a[2]*o-a[0]*n,u=a[0]*s-a[1]*o;i=Math.hypot(r,c,u)||1,r/=i,c/=i,u/=i;const f=s*u-n*c,l=n*r-o*u,h=o*c-s*r;return new Float32Array([r,f,o,0,c,l,s,0,u,h,n,0,-(r*e[0]+c*e[1]+u*e[2]),-(f*e[0]+l*e[1]+h*e[2]),-(o*e[0]+s*e[1]+n*e[2]),1])}function yt(e,t){const a=new Float32Array(16);for(let o=0;o<4;o++)for(let s=0;s<4;s++){let n=0;for(let i=0;i<4;i++)n+=e[i*4+s]*t[o*4+i];a[o*4+s]=n}return a}const Lt=`
vec3 hash33(vec3 p){ p = fract(p * vec3(.1031, .1030, .0973)); p += dot(p, p.yxz + 33.33); return fract((p.xxy + p.yxx) * p.zyx) * 2. - 1.; }
float noise3d(vec3 p){
  vec3 i = floor(p), f = fract(p); vec3 u = f * f * (3. - 2. * f);
  return mix(mix(mix(dot(hash33(i), f), dot(hash33(i + vec3(1,0,0)), f - vec3(1,0,0)), u.x),
                 mix(dot(hash33(i + vec3(0,1,0)), f - vec3(0,1,0)), dot(hash33(i + vec3(1,1,0)), f - vec3(1,1,0)), u.x), u.y),
             mix(mix(dot(hash33(i + vec3(0,0,1)), f - vec3(0,0,1)), dot(hash33(i + vec3(1,0,1)), f - vec3(1,0,1)), u.x),
                 mix(dot(hash33(i + vec3(0,1,1)), f - vec3(0,1,1)), dot(hash33(i + vec3(1,1,1)), f - vec3(1,1,1)), u.x), u.y), u.z); }
float fbm3d(vec3 p){ float s = 0., a = .5; for (int i = 0; i < 4; i++) { s += a * noise3d(p); p = p * 2.02 + 17.1; a *= .5; } return s; }
`;function De(e,t=Math.random){let a=[],o=-1;return{next(){if(!a.length){a=Array.from({length:e},(s,n)=>n);for(let s=e-1;s>0;s--){const n=Math.floor(t()*(s+1));[a[s],a[n]]=[a[n],a[s]]}e>1&&a[0]===o&&a.push(a.shift())}return o=a.shift(),o}}}function Ne({beats:e=64,minSec:t=45,maxSec:a=100}={}){let o=0,s=null;return{tick(n,i){if(!n.playing)return!1;o+=i;const r=Math.floor(n.beats/e),c=s!==null&&r!==s;return s=r,c&&o>=t||o>=a?(o=0,!0):!1},reset(){o=0}}}const Le=[{name:"Sog",grain:.5,keep:.989},{name:"Wirbel",grain:.3,keep:.991},{name:"Spiralarme",grain:.4,keep:.99},{name:"Wellenringe",grain:.2,keep:.99},{name:"Kaleidoskop",grain:.3,keep:.992},{name:"Spiegelkreuz",grain:.4,keep:.991},{name:"Kacheln",grain:.2,keep:.993},{name:"Marmor",grain:.1,keep:.994},{name:"Strahlen",grain:1.6,keep:.988},{name:"Horizont",grain:.6,keep:.989},{name:"Vorhang",grain:.7,keep:.989},{name:"Breitzug",grain:.7,keep:.989},{name:"Raute",grain:.5,keep:.991},{name:"Kachelspiegel",grain:.2,keep:.993},{name:"Scherwellen",grain:.2,keep:.991},{name:"Linse",grain:.4,keep:.99},{name:"Doppelwirbel",grain:.3,keep:.992},{name:"Achsenkreuz",grain:.8,keep:.989},{name:"Wellenstrahlen",grain:.4,keep:.99},{name:"Kreisel",grain:.3,keep:.991},{name:"Aufwind",grain:.3,keep:.991},{name:"Fasern",grain:1.4,keep:.988},{name:"Seitenspiegel",grain:.4,keep:.991},{name:"Wabe",grain:.3,keep:.991},{name:"Strahlenkranz",grain:1.2,keep:.99},{name:"Drift",grain:.3,keep:.993},{name:"Zoom",grain:.6,keep:.991}],Zt=`
uniform float uAmt;   // Bewegung je Bild (1 = ein Bild bei 60 fps, mal Bass)
uniform float uZmax;  // höchster Zoom je Bild (sonst rasen starke Strömungen bei hohem Tempo davon)
uniform float uZAmt;  // Zoom-Tempo eigens (gemessen: im Original zoomt es weniger, als es dreht und zieht)
vec2 rot(vec2 p, float a){ float c = cos(a), s = sin(a); return vec2(c * p.x - s * p.y, s * p.x + c * p.y); }
// Bewegungsschritte, nach Bildzeit skaliert: Drehung, Zoom, Verschiebung. Spiegelungen und Faltungen
// werden NICHT skaliert (sonst springt die Quelle bei wenig fps aus dem Bild).
vec2 R(vec2 p, float a){ return rot(p, a * uAmt); }
float Z(float z){ return 1. - clamp((1. - z) * uZAmt, -uZmax, uZmax); }
vec2 D(vec2 d){ return d * uAmt; }
// günstige Wirbelströmung (2 Oktaven), für Marmor und Aufwind
float psi(vec2 x){ return gnoise(x) + .5 * gnoise(x * 2.13 + 7.7); }
vec2 swirl(vec2 q){
  float e = .03;
  return vec2(psi(q + vec2(0., e)) - psi(q - vec2(0., e)), -(psi(q + vec2(e, 0.)) - psi(q - vec2(e, 0.)))) / (2. * e);
}
// N-fache Spiegelung um die Mitte (Winkel in einen Keil falten)
vec2 fold(vec2 p, float n, float turn){
  float r = length(p), a = atan(p.y, p.x) + turn;
  float seg = 6.2831853 / n;
  float b = mod(a, seg);
  b = abs(b - seg * .5);
  return vec2(cos(b), sin(b)) * r;
}
vec2 flow(int k, vec2 p, vec4 P, float t){
  float r = length(p), a = atan(p.y, p.x);
  float dir = P.w < .5 ? -1. : 1.;
  if (k == 0) return R(p, dir * (.002 + .012 * P.x)) * Z(.99 - .009 * P.y);                                      // Sog
  if (k == 1) return R(p, dir * (.025 + .04 * P.x) * exp(-r * (.8 + 1.6 * P.y))) * Z(.997);                       // Wirbel
  if (k == 2) {                                                                                                   // Spiralarme
    float arms = 2. + floor(P.x * 4.);
    float w = .5 + .5 * sin(a * arms + log(r + .05) * (3. + 6. * P.y) * dir - t * .6);
    return R(p, dir * .005) * Z(.996 - .013 * w);
  }
  if (k == 3) return p * Z(.995 - .008 * (.5 + .5 * sin(r * (10. + 22. * P.x) - t * (1.2 + 2.5 * P.y))));        // Wellenringe
  if (k == 4) return fold(R(p, dir * .003), 4. + 2. * floor(P.x * 3.), t * .04 * dir) * Z(.99 - .008 * P.y);   // Kaleidoskop
  if (k == 5) {                                                                                                   // Spiegelkreuz
    vec2 q = abs(p);
    float f = 5. + 10. * P.y;
    return q * Z(.988 - .008 * P.x) + D(.004 * vec2(sin(q.y * f + t), sin(q.x * f - t * .8)));
  }
  if (k == 6) {                                                                                                   // Kacheln
    float K = 1.4 + P.x * 2.2;
    vec2 g = p * K;
    vec2 c = floor(g) + .5;
    vec2 q = g - c;
    // Drehung zum Kachelrand hin auf null: keine sichtbaren Kanten zwischen den Kacheln
    float e = max(abs(q.x), abs(q.y));
    q = R(q, dir * (.035 + .05 * P.y) * (1. - smoothstep(.12, .5, e))) * Z(.996);
    return (c + q) / K;
  }
  if (k == 7) return p * Z(.998) + D(swirl(p * (1. + 1.8 * P.x) + vec2(t * .05, P.y * 9.)) * (.0022 + .0018 * P.z));  // Marmor
  if (k == 8) {                                                                                                   // Strahlen
    float n = abs(gnoise(vec2(a * (5. + 9. * P.x) / 1.5708, P.y * 20.)));
    return R(p, dir * .002) * Z(.992 - .02 * n);
  }
  if (k == 9) {                                                                                                   // Horizont
    float kk = .011 * (.25 + abs(p.y) * 2.2);
    return vec2(p.x * Z(1. - kk * .35) + uAmt * .002 * sin(t * .3 + P.x * 6.), p.y * Z(1. - kk));
  }
  if (k == 10) return vec2(p.x * Z(.999 - .002 * P.x) + uAmt * .0025 * sin(p.y * (4. + 8. * P.y) + t), p.y * Z(.987 - .008 * P.z));  // Vorhang
  if (k == 11) return vec2(p.x * Z(.986 - .008 * P.x), p.y * Z(.998) + uAmt * .0025 * sin(p.x * (5. + 8. * P.y) - t));               // Breitzug
  if (k == 12) {                                                                                                  // Raute
    float d = abs(p.x) + abs(p.y);
    if (d > 1.15 + .35 * P.y) return vec2(9.);
    return R(p, dir * .004 * P.x) * Z(.99 - .006 * P.x);
  }
  if (k == 13) {                                                                                                  // Kachelspiegel
    // jede Kachel holt ihr Bild aus der mittleren, sechsfach gespiegelt -> Muster wie Fliesen
    float K = .8 * (1. + floor(P.x * 2.5));
    vec2 g = p * K;
    vec2 q = g - floor(g + .5);
    return fold(q, 6., t * .02 * dir) * Z(.992) / K;
  }
  if (k == 14) return p * Z(.997) + D((.004 + .004 * P.x) * vec2(sin(p.y * (4. + 10. * P.y) + t * 1.3), sin(p.x * (4. + 10. * P.z) - t * 1.1)));  // Scherwellen
  if (k == 15) return p * Z(1. - (.011 + .01 * P.x) * (r * r * (.8 + .8 * P.y) - .22));                            // Linse
  if (k == 16) {                                                                                                  // Doppelwirbel
    float d = .35 + .45 * P.x;
    vec2 c1 = vec2(-d, 0.), c2 = vec2(d, 0.);
    vec2 q1 = p - c1, q2 = p - c2;
    vec2 s = c1 + R(q1, dir * .05 * exp(-dot(q1, q1) * 2.5));
    s = c2 + R(s - c2, -dir * .05 * exp(-dot(q2, q2) * 2.5));
    return s * Z(.996);
  }
  if (k == 17) {                                                                                                  // Achsenkreuz
    float f = 4. + 6. * P.x;
    return vec2(p.x * Z(1. - .017 * exp(-abs(p.y) * f)), p.y * Z(1. - .017 * exp(-abs(p.x) * f))) * Z(.998);
  }
  if (k == 18) return R(p, dir * .012 * sin(r * (6. + 10. * P.x) - t * 1.5)) * Z(.991 - .006 * P.y);              // Wellenstrahlen
  if (k == 19) {                                                                                                  // Kreisel
    vec2 c = (.2 + .25 * P.x) * vec2(cos(t * .27 + P.y * 6.) * uAspect * .7, sin(t * .31));
    return c + R(p - c, dir * (.012 + .02 * P.y)) * Z(.99);
  }
  if (k == 20) return p + D(vec2(.003 * sin(p.y * (7. + 9. * P.x) + t * 2.), -.0055 - .004 * P.y) + swirl(p * 2. + t * .1) * .0012);  // Aufwind
  if (k == 21) return R(p, dir * .003 * P.y) * Z(.993 - .006 * P.x);                                              // Fasern
  if (k == 22) return R(vec2(abs(p.x), p.y), dir * (.004 + .008 * P.x)) * Z(.99 - .006 * P.y);                    // Seitenspiegel
  if (k == 24) {                                                                                                  // Strahlenkranz
    // gerade Strahlen aus der Mitte (Winkel zoomen verschieden schnell), oben/unten und links/rechts gespiegelt
    vec2 q = abs(p);
    float n = abs(gnoise(vec2(atan(q.y, q.x) * (6. + 10. * P.x), P.y * 30.)));
    return q * Z(.991 - .022 * n);
  }
  if (k == 25) return p * Z(.9985) + D(vec2(dir * (.0035 + .003 * P.x), -.0025 - .002 * P.y));                   // Drift
  if (k == 26) return p * Z(.993 - .004 * P.x);                                                                   // Zoom
  // Wabe: Lagen eines Sechsecks drehen gegeneinander
  float seg = 1.0471976;
  float b = mod(a + 3.1415927, seg) - seg * .5;
  float Rr = r * cos(b) / cos(seg * .5);
  return R(p, dir * .014 * sin(Rr * (7. + 8. * P.x) - t * 1.6)) * Z(.991 - .006 * P.y);
}
`,Me=e=>[parseInt(e.slice(1,3),16)/255,parseInt(e.slice(3,5),16)/255,parseInt(e.slice(5,7),16)/255],xt=(e,t,a)=>[e[0]+(t[0]-e[0])*a,e[1]+(t[1]-e[1])*a,e[2]+(t[2]-e[2])*a],ee=e=>{const t=e.map(([a,o])=>[a,Me(o)]);return a=>{if(a<=t[0][0])return t[0][1];for(let o=1;o<t.length;o++)if(a<=t[o][0]){const s=(a-t[o-1][0])/Math.max(1e-6,t[o][0]-t[o-1][0]);return xt(t[o-1][1],t[o][1],s)}return t[t.length-1][1]}},$t=(e,t,a)=>{e=(e%1+1)%1;const o=Math.floor(e*6),s=e*6-o,n=a*(1-t),i=a*(1-s*t),r=a*(1-(1-s)*t);return[[a,i,n,n,r,a][o%6],[r,a,a,i,n,n][o%6],[n,n,r,a,a,i][o%6]]},ot=(e,t,a,o=8)=>(s,n)=>{const i=e(s,n),r=1-a*Math.pow(.5+.5*Math.cos(s*Math.PI*2*t),o);return[i[0]*r,i[1]*r,i[2]*r]},Ge=[{name:"Tiefsee",f:ee([[0,"#000000"],[.12,"#000a3a"],[.35,"#0029c8"],[.6,"#1f9cff"],[.82,"#a8e6ff"],[1,"#ffffff"]])},{name:"Nachtblau",f:ee([[0,"#02020a"],[.2,"#0b0b3c"],[.45,"#3a3a9a"],[.7,"#9f9fe6"],[.9,"#e6e6ff"],[1,"#ffffff"]])},{name:"Kupfer",f:ot(ee([[0,"#000000"],[.2,"#2a1205"],[.45,"#b5571a"],[.7,"#ff9a3c"],[.86,"#ffe0b8"],[1,"#ffffff"]]),3,.75)},{name:"Himmel",f:ee([[0,"#2f7be8"],[.18,"#4f95f4"],[.36,"#8a1048"],[.55,"#4a0020"],[.78,"#8fd0ff"],[1,"#ffffff"]])},{name:"Eis",f:ee([[0,"#4fd3ff"],[.3,"#1f86e0"],[.55,"#0a3fa0"],[.8,"#08164a"],[1,"#000000"]])},{name:"Ultramarin",f:ee([[0,"#050540"],[.3,"#1a1a9a"],[.6,"#5555ff"],[.85,"#c8c8ff"],[1,"#ffffff"]])},{name:"Amethyst",f:ee([[0,"#0a000f"],[.25,"#3a0a55"],[.5,"#8a2ad0"],[.75,"#d79bff"],[1,"#ffffff"]])},{name:"Feuerpink",f:ee([[0,"#000000"],[.2,"#3a0010"],[.4,"#c0103a"],[.6,"#ff4f7a"],[.75,"#ff9a3a"],[.9,"#ffe3c4"],[1,"#ffffff"]])},{name:"Lagune",f:ot(ee([[0,"#062a33"],[.5,"#2fa6bf"],[1,"#d8faff"]]),5,.9)},{name:"Pflaume",f:ee([[0,"#120412"],[.3,"#4a1e4a"],[.6,"#a06aa0"],[.85,"#ecd2ec"],[1,"#ffffff"]])},{name:"Fahne",f:e=>{const t=[Me("#3a00a8"),Me("#c8102e"),Me("#ffffff"),Me("#2050ff")],a=e*6,o=Math.floor(a);return xt(t[o%4],t[(o+1)%4],a-o)}},{name:"Schiefer",f:ee([[0,"#000000"],[.3,"#1a2440"],[.6,"#4a5e9a"],[.85,"#9fb2e6"],[1,"#e8eeff"]])},{name:"Flamme",f:ee([[0,"#000000"],[.15,"#300000"],[.35,"#a01000"],[.55,"#ff5a00"],[.75,"#ffb000"],[.9,"#fff0a0"],[1,"#ffffff"]])},{name:"Indigo",f:ee([[0,"#000000"],[.2,"#10083a"],[.45,"#3a1ea0"],[.65,"#6a50e0"],[.85,"#b8a8ff"],[1,"#ffffff"]])},{name:"Gletscher",f:ee([[0,"#ffffff"],[.2,"#c0f4ff"],[.45,"#30c0e8"],[.7,"#1060c0"],[.85,"#0a3a6a"],[1,"#04262a"]])},{name:"Rosa & Mint",f:ee([[0,"#000000"],[.25,"#1e5a4a"],[.45,"#5ab49a"],[.6,"#c0507a"],[.8,"#ff9ac0"],[1,"#ffffff"]])},{name:"Neonblau",f:ee([[0,"#000000"],[.3,"#0010ff"],[.55,"#0080ff"],[.8,"#80e8ff"],[1,"#ffffff"]])},{name:"Magenta",f:ee([[0,"#2a2aff"],[.3,"#6a20ff"],[.55,"#ff2ad0"],[.8,"#ffa0f0"],[1,"#ffffff"]])},{name:"Creme",f:ot(ee([[0,"#0a0c08"],[.4,"#3a3a2a"],[.7,"#c8c09a"],[.9,"#fff8e0"],[1,"#ffffff"]]),7,.35,4)},{name:"Chrom",f:ee([[0,"#000000"],[.15,"#10123a"],[.3,"#e8e8ff"],[.45,"#20224a"],[.6,"#ffffff"],[.75,"#2a2c5a"],[.9,"#f0f0ff"],[1,"#ffffff"]])},{name:"Wolken",f:ee([[0,"#f4f6ff"],[.3,"#f0d0d8"],[.55,"#c08a9a"],[.75,"#6a3a4a"],[.9,"#2a1418"],[1,"#000000"]])},{name:"Terrakotta",f:ot(ee([[0,"#0e3a40"],[.25,"#2a6a70"],[.4,"#7a2a10"],[.6,"#c85a2a"],[.8,"#ffc890"],[1,"#ffffff"]]),4,.5)},{name:"Ultraviolett",f:ee([[0,"#000000"],[.25,"#0a0aa0"],[.45,"#8a10ff"],[.65,"#ff40e0"],[.85,"#ffc0f8"],[1,"#ffffff"]])},{name:"Regenbogen",f:(e,t)=>e<.015?[0,0,0]:$t(e*1.5+t*.03,.9,Math.min(1,.35+e*2))},{name:"Sand",f:ee([[0,"#ead2b0"],[.4,"#c49a6a"],[.7,"#6a4422"],[1,"#1a0e04"]])},{name:"Smaragd",f:ee([[0,"#000000"],[.25,"#003a1a"],[.5,"#00a050"],[.75,"#8cff8c"],[1,"#ffffff"]])},{name:"Gold",f:ee([[0,"#000000"],[.25,"#2a1a00"],[.5,"#a06a10"],[.75,"#ffd070"],[1,"#ffffff"]])},{name:"Lila Grund",f:ee([[0,"#2a1478"],[.25,"#3c22a8"],[.5,"#7a5cf0"],[.75,"#c8b8ff"],[1,"#ffffff"]])},{name:"Zitrone",f:ee([[0,"#f4b000"],[.25,"#f2c800"],[.5,"#c8d820"],[.75,"#4aa040"],[1,"#0a3a14"]])},{name:"Wiese",f:ee([[0,"#3cc050"],[.3,"#2a9a3a"],[.6,"#0e5a1e"],[.85,"#06300e"],[1,"#d8ffd0"]])},{name:"Streifen",f:e=>{if(e<.02)return[0,0,0];const t=[Me("#0a0402"),Me("#b02a14"),Me("#f08a5a"),Me("#f6e2c0"),Me("#8a8478")],a=e*10,o=Math.floor(a),s=a-o;return xt(t[o%5],t[(o+1)%5],s*s*(3-2*s))}}],le=Math.PI*2,pe=(e,t,a)=>[e*Math.cos(a)-t*Math.sin(a),e*Math.sin(a)+t*Math.cos(a)],Se=e=>Math.min(1.6,Math.max(.4,e)),Ke=(e,t,a,o,s=0)=>{const n=[];for(let i=0;i<=e;i++){const r=i/e,[c,u,f,l]=t(r),h=a((r+s)%1)*o;n.push(c+f*h,u+l*h)}return n},He=(e,t,a,o=0)=>s=>{const n=s*le+o;return[e+Math.cos(n)*a,t+Math.sin(n)*a,Math.cos(n),Math.sin(n)]},Ee=(e,t,a,o,s,n,i,r=0,c=1,u=null)=>{const f=a-e,l=o-t,h=Math.hypot(f,l)||1,d=-l/h,b=f/h,S=[];for(let P=0;P<=s;P++){const A=P/s,q=n((r+A*c)%1)*i*(u?u(A):1);S.push(e+f*A+d*q,t+l*A+b*q)}return S},ht=(e,t,a,o,s,n=.003,i=3)=>{const r=[];for(let c=0;c<i;c++){const u=o+c/i*Math.PI;r.push({pts:[e-Math.cos(u)*a,t-Math.sin(u)*a,e+Math.cos(u)*a,t+Math.sin(u)*a],pen:s,width:n})}return r},_e=[{name:"Ring",f:({t:e,w:t,bass:a})=>{const o=.34+.09*Se(a);return{lines:[{pts:Ke(320,He(0,0,o,e*.25),t,.16),pen:1,width:.003,closed:!0}]}}},{name:"Doppelring",f:({t:e,w:t,bass:a,asp:o})=>{const s=.24+.06*Se(a),n=Math.min(.75,o*.42);return{lines:[{pts:Ke(220,He(-n,0,s,e*.4),i=>t(i*.5),.12),pen:1,width:.003,closed:!0},{pts:Ke(220,He(n,0,s,-e*.4),i=>t(.5+i*.5),.12),pen:1,width:.003,closed:!0}]}}},{name:"Welle",f:({t:e,w:t,asp:a})=>{const o=.12*Math.sin(e*.37);return{lines:[{pts:Ee(-a*1.05,o,a*1.05,o,300,t,.3),pen:1,width:.007}]}}},{name:"Drei Wellen",f:({t:e,w:t,asp:a})=>{const o=[];for(let s=-1;s<=1;s++){const n=s*a*.55+.06*Math.sin(e*.5+s);o.push({pts:Ee(n,-1.05,n,1.05,220,t,.12,(s+1)/3,1/3),pen:1,width:.0026})}return{lines:o}}},{name:"Ellipsen",f:({t:e,w:t,f:a})=>{const o=[];for(let s=0;s<3;s++){const n=e*(.18+s*.06)*(s%2?-1:1)+s*1.1,i=.72+a(.1+s*.3)*.14,r=.28+s*.08,c=[];for(let u=0;u<=240;u++){const f=u/240,l=f*le,h=1+t(f)*.06;c.push(...pe(Math.cos(l)*i*h,Math.sin(l)*r*h,n))}o.push({pts:c,pen:1,width:.0026,closed:!0})}return o.push(...ht(0,0,.05+.03*a(.05),e*1.5,1,.003)),{lines:o}}},{name:"Blüte",f:({t:e,w:t,f:a})=>{const o=[],s=.62+.18*a(.08);for(const[n,i]of[[1,1],[.9,.7]]){const r=[];for(let c=0;c<=480;c++){const u=c/480,f=u*le,l=(s*Math.cos(3*f)+t(u)*.035)*n;r.push(...pe(l*Math.cos(f),l*Math.sin(f),e*.14))}o.push({pts:r,pen:i,width:.0024,closed:!0})}return{lines:o}}},{name:"Kleeblatt",f:({t:e,w:t,bass:a})=>{const o=[],s=.26+.05*Se(a);for(let n=0;n<3;n++){const i=e*.2+n/3*le+Math.PI/2;o.push({pts:Ke(200,He(Math.cos(i)*.22,Math.sin(i)*.22,s,-e*.5),r=>t((r+n/3)%1),.07),pen:1,width:.004,closed:!0})}return{lines:o}}},{name:"Strahlen",f:({t:e,f:t})=>{const a=[];for(let s=0;s<36;s++){const n=s/36,i=t(Math.abs(n*2-1)),r=n*le+e*.1,c=.07,u=c+.06+i*.95;a.push({pts:[c*Math.cos(r),c*Math.sin(r),u*Math.cos(r),u*Math.sin(r)],pen:.55+.45*i,width:.0035+.004*i})}return{lines:a}}},{name:"X-Strahlen",f:({t:e,w:t,f:a,asp:o})=>{const s=[],n=Math.hypot(o,1)*1.05;for(const i of[1,-1]){const r=i*(.55+.12*Math.sin(e*.21)),c=18;for(let f=0;f<c;f++){const l=f/c,h=(f+.8)/c,d=a(Math.abs(l*2-1)),b=pe((l*2-1)*n,0,r),S=pe((h*2-1)*n,0,r);s.push({pts:[...b,...S],pen:.45+.55*d,width:.012+.014*d})}const u=Ee(...pe(-n,0,r),...pe(n,0,r),200,t,.05,i>0?0:.5,.5);s.push({pts:u,pen:1,width:.0022})}return{lines:s}}},{name:"Blitzkreuz",f:({t:e,w:t})=>{const a=[];for(let o=0;o<4;o++){const s=e*.16+o*Math.PI/2,[n,i]=pe(1.2,0,s);a.push({pts:Ee(0,0,n,i,140,t,.14,o*.25,.5,r=>Math.sin(r*Math.PI)),pen:1,width:.003})}return{lines:a}}},{name:"Stern",f:({t:e,w:t,bass:a})=>{const o=.5+.08*Se(a),s=o*.42,n=[];for(let r=0;r<10;r++){const c=e*.2+r/10*le-Math.PI/2,u=r%2?s:o;n.push([Math.cos(c)*u,Math.sin(c)*u])}const i=[];for(let r=0;r<10;r++){const[c,u]=n[r],[f,l]=n[(r+1)%10],h=Ee(c,u,f,l,30,t,.05,r/10,.1,d=>Math.sin(d*Math.PI));i.push(...r?h.slice(2):h)}return{lines:[{pts:i,pen:1,width:.0032,closed:!0}]}}},{name:"Spirale",f:({t:e,w:t})=>{const a=[];for(let o=0;o<=420;o++){const s=o/420,n=s*le*3.5+e*.45,i=.03+s*.98+t(s)*.04;a.push(Math.cos(n)*i,Math.sin(n)*i)}return{lines:[{pts:a,pen:1,width:.003}]}}},{name:"Kreischen",f:({t:e,w:t,f:a,asp:o})=>{const s=[];for(let n=0;n<3;n++)for(let i=0;i<22;i++){const r=i/21,c=e*(.3+n*.1)*(n%2?-1:1)+r*Math.PI*1.2+n*2.1,u=.3+n*.22+t(r)*.025;s.push({x:u*Math.cos(c)*Math.min(1.35,o*.75),y:u*Math.sin(c)*.85,r:.008+a(r)*.02,pen:1})}return{dots:s}}},{name:"Perlenband",f:({t:e,f:t,asp:a})=>{const o=[],n=e*.17,i=Math.min(1.25,a*.7),r=Math.cos(n),c=Math.sin(n);for(let u=0;u<96;u++){const f=u/95,l=(f*2-1)*i,h=t(Math.abs(f*2-1))*.26+.04*Math.sin(f*9+e*1.3);o.push({x:r*l-c*h,y:c*l+r*h,r:.0042,pen:1})}return{dots:o}}},{name:"Perlenring",f:({t:e,f:t,bass:a})=>{const o=[],n=.34+.08*Se(a);for(let i=0;i<84;i++){const r=i/84,c=r*le+e*.3,u=n+t(Math.abs(r*2-1))*.14+.02*Math.sin(r*le*3-e);o.push({x:Math.cos(c)*u,y:Math.sin(c)*u,r:.0042,pen:1})}return{dots:o}}},{name:"Schwinge",f:({t:e,f:t,asp:a})=>{const o=[],s=[[-.22*a,.3],[.25*a,-.34]];for(let n=0;n<2;n++){const i=[],r=(n?.35:-.25)+.55*Math.sin(e*(.42+n*.11)+n*2),c=Math.cos(r),u=Math.sin(r),f=a*1.4;for(let l=0;l<=120;l++){const h=l/120,d=(h*2-1)*f,b=Math.sin(h*Math.PI*2+e*.7+n)*.05*(.4+t(h));i.push(s[n][0]+c*d-u*b,s[n][1]+u*d+c*b)}o.push({pts:i,pen:1,width:.0018})}return{lines:o}}},{name:"Lissajous",f:({t:e,w:t,bass:a,asp:o})=>{const s=[],n=.45+.12*Se(a);for(let i=0;i<=400;i++){const r=i/400;s.push(...pe(t(r)*n*Math.min(1.4,o*.8),t((r+.23)%1)*n,e*.12))}return{lines:[{pts:s,pen:1,width:.0022}]}}},{name:"Helix",f:({t:e,w:t,asp:a})=>{const o=[];for(const s of[1,-1]){const n=[];for(let i=0;i<=260;i++){const r=i/260,c=(r*2-1)*a*1.05;n.push(c,s*.3*Math.sin(r*le*1.5+e*.9)+t((r*.5+(s>0?0:.5))%1)*.06)}o.push({pts:n,pen:1,width:.003})}return{lines:o}}},{name:"Raute",f:({t:e,w:t,bass:a})=>{const o=[];for(const[s,n]of[[.62+.08*Se(a),0],[.34,.5]]){const i=[[s,0],[0,s],[-s,0],[0,-s]].map(([c,u])=>pe(c,u,e*.1*(n?-1:1))),r=[];for(let c=0;c<4;c++){const u=Ee(...i[c],...i[(c+1)%4],50,t,.05,n+c*.125,.125);r.push(...c?u.slice(2):u)}o.push({pts:r,pen:n?.8:1,width:.003,closed:!0})}return{lines:o}}},{name:"Schmetterling",f:({t:e,w:t,bass:a})=>{const o=[],s=.13+.025*Se(a);for(let n=0;n<=600;n++){const i=n/600,r=i*le*2,c=(Math.exp(Math.cos(r))-2*Math.cos(4*r)+Math.pow(Math.sin(r/12),5))*s+t(i)*.02;o.push(...pe(Math.sin(r)*c,Math.cos(r)*c-.1,Math.sin(e*.3)*.3))}return{lines:[{pts:o,pen:1,width:.0024}]}}},{name:"Fächer",f:({t:e,f:t})=>{const a=[];for(let s=0;s<28;s++){const n=s/27,i=t(n),r=Math.PI*(.08+n*.84)+Math.sin(e*.2)*.05,c=.25+i*1.4;a.push({pts:[0,-1.05,Math.cos(r)*c,-1.05+Math.sin(r)*c],pen:.5+.5*i,width:.004+.004*i})}return{lines:a}}},{name:"Sechseck",f:({t:e,w:t})=>{const a=[];return[.28,.52,.78].forEach((o,s)=>{const n=[];for(let r=0;r<6;r++)n.push(pe(o*Math.cos(r/6*le),o*Math.sin(r/6*le),e*.15*(s%2?-1:1)));const i=[];for(let r=0;r<6;r++){const c=Ee(...n[r],...n[(r+1)%6],30,t,.035,s/3+r/18,.05555555555555555);i.push(...r?c.slice(2):c)}a.push({pts:i,pen:1-s*.15,width:.003,closed:!0})}),{lines:a}}},{name:"Fliege",f:({t:e,w:t})=>{const a=[];for(let o=0;o<7;o++)for(const s of[1,-1]){const n=(o-3)*.12+Math.sin(e*.3)*.1,[i,r]=pe(s*1.25,0,n*s);a.push({pts:Ee(s*.04,0,i,r,60,t,.06,o*.13,.25,c=>c),pen:.9,width:.0026})}return{lines:a}}},{name:"Vier Kreise",f:({t:e,w:t,f:a})=>{const o=[],s=.045+.02*a(.05),n=.13;for(const[i,r]of[[1,1],[-1,1],[1,-1],[-1,-1]])o.push({pts:Ke(40,He(i*n,r*n*1.2,s),()=>0,0),pen:1,width:.004,closed:!0});return o.push({pts:Ke(300,He(0,0,.62,e*.2),t,.12),pen:.75,width:.0028,closed:!0}),{lines:o}}},{name:"Kamm",f:({t:e,w:t,f:a,asp:o})=>{const s=[],n=.25*Math.sin(e*.33),i=Ee(-o*1.05,n,o*1.05,n,240,t,.16);s.push({pts:i,pen:1,width:.003});const r=26;for(let c=0;c<=r;c++){const u=Math.round(c/r*240),f=i[u*2],l=i[u*2+1],h=.12+a(c/r)*.35;s.push({pts:[f,l,f+.04*Math.sin(e+c),l-h],pen:.85,width:.0024})}return{lines:s}}},{name:"Bögen",f:({t:e,w:t})=>{const a=[];for(const o of[1,-1]){const s=o*(.6+.15*Math.sin(e*.17));for(let n=0;n<5;n++){const i=.62+n*.1,r=[];for(let c=0;c<=200;c++){const u=c/200,f=u*le,l=1+t((u+n*.1)%1)*.02;r.push(...pe(Math.cos(f)*1.1*i*l,Math.sin(f)*.32*i*l,s))}a.push({pts:r,pen:1-n*.1,width:.0022,closed:!0})}}return{lines:a}}},{name:"Sternchen",f:({t:e,f:t,bass:a})=>{const o=[],n=.48+.06*Se(a);for(let i=0;i<8;i++){const r=e*.3+i/8*le;o.push(...ht(Math.cos(r)*n,Math.sin(r)*n,.035+.05*t(i/8),-e*2+i,1,.0028))}return o.push(...ht(0,0,.08+.05*t(.05),e,1,.0035,4)),{lines:o}}}],Yt=me(`
uniform sampler2D uPrev;
uniform int uFa, uFb;
uniform float uFm, uTa, uTb, uKeep, uSub, uGrain, uFlood, uSpin;
uniform vec4 uPa, uPb;
${Zt}
void main(){
  vec2 asp = vec2(uAspect, 1.);
  vec2 p = (uv * 2. - 1.) * asp;
  vec2 s = mix(flow(uFa, p, uPa, uTa), flow(uFb, p, uPb, uTb), uFm);
  s = rot(s, uSpin * uAmt);          // eigene Drehung je Auftritt (das Original dreht sich fast immer)
  // feste Körnung (hängt nur vom Bildpunkt ab): zieht feine Fasern entlang der Strömung
  vec2 h = vec2(hash12(gl_FragCoord.xy * 1.37 + 11.), hash12(gl_FragCoord.xy * .73 + 3.)) - .5;
  s += h * uGrain * 2. / uRes.y;
  vec2 q = s / asp * .5 + .5;
  float v = (q.x < 0. || q.y < 0. || q.x > 1. || q.y > 1.) ? 0. : texture(uPrev, q).r;
  // Flut: das ganze Bild läuft voll und klingt dann durch die Farbtabelle wieder ab
  o = vec4(min(max(v * uKeep - uSub, 0.) + uFlood, 1.3), 0., 0., 1.);
}`),Jt=`#version 300 es
in vec2 p; in vec2 a;
uniform float uAspect;
out vec2 va;
void main(){ va = a; gl_Position = vec4(p.x / uAspect, p.y, 0., 1.); }`,Qt=`#version 300 es
precision mediump float;
in vec2 va; out vec4 o;
void main(){ o = vec4(va.y * (1. - smoothstep(.5, 1., abs(va.x))), 0., 0., 1.); }`,en=me(`
uniform sampler2D uText; uniform float uAmt;
void main(){ float v = texture(uText, vec2(uv.x, 1. - uv.y)).r; o = vec4(v * uAmt, 0., 0., 1.); }`),tn=me(`
uniform sampler2D uSrc;
void main(){ o = vec4(texture(uSrc, uv).r, 0., 0., 1.); }`),nn=me(`
uniform sampler2D uI, uMap;
void main(){
  float v = clamp(texture(uI, uv).r, 0., 1.);
  o = vec4(pow(texture(uMap, vec2(v * (255. / 256.) + .5 / 256., .5)).rgb, vec3(2.2)), 1.);   // linear, Ausgabe macht sRGB
}`),Fe=Math.PI*2,dt=e=>e*e*(3-2*e);function Tt(e,t,a){const o=t?[...e,e[0],e[1]]:e,s=o.length/2,n=new Float32Array(a*2);if(s<2){for(let u=0;u<a;u++)n[u*2]=o[0]||0,n[u*2+1]=o[1]||0;return n}const i=new Float32Array(s);for(let u=1;u<s;u++)i[u]=i[u-1]+Math.hypot(o[u*2]-o[u*2-2],o[u*2+1]-o[u*2-1]);const r=i[s-1]||1e-6;let c=0;for(let u=0;u<a;u++){const f=u/(a-1)*r;for(;c<s-2&&i[c+1]<f;)c++;const l=i[c+1]-i[c]||1e-6,h=Math.min(1,Math.max(0,(f-i[c])/l));n[u*2]=o[c*2]+(o[c*2+2]-o[c*2])*h,n[u*2+1]=o[c*2+1]+(o[c*2+3]-o[c*2+1])*h}return n}function bt(e){const t=(e.lines||[]).slice();for(const a of e.dots||[]){const o=[];for(let s=0;s<12;s++)o.push(a.x+Math.cos(s/12*Fe)*a.r,a.y+Math.sin(s/12*Fe)*a.r);t.push({pts:o,pen:a.pen,width:a.r*.35,closed:!0})}return t}function Rt(e,t,a){const o=e.length;if(o>=t)return e.slice(0,t).map(f=>({pts:Tt(f.pts,f.closed,a),pen:f.pen,width:f.width}));const s=e.map(f=>{let l=0;for(let h=2;h<f.pts.length;h+=2)l+=Math.hypot(f.pts[h]-f.pts[h-2],f.pts[h+1]-f.pts[h-1]);return l+1e-4}),n=s.reduce((f,l)=>f+l,0),i=t-o,r=s.map(f=>1+Math.floor(i*f/n));let c=t-r.reduce((f,l)=>f+l,0);for(let f=0;c>0;f=(f+1)%o,c--)r[f]++;const u=[];return e.forEach((f,l)=>{const h=r[l],d=Tt(f.pts,f.closed,h*(a-1)+1);for(let b=0;b<h;b++)u.push({pts:d.subarray(b*(a-1)*2,((b+1)*(a-1)+1)*2),pen:f.pen,width:f.width})}),u}function an(e,t,a){const o=bt(e),s=bt(t);if(!o.length)return s.map(f=>({...f,pen:f.pen*a}));if(!s.length)return o.map(f=>({...f,pen:f.pen*(1-a)}));const n=Math.max(o.length,s.length);if(n>120)return[...o.map(f=>({...f,pen:f.pen*(1-a)})),...s.map(f=>({...f,pen:f.pen*a}))];const i=Math.max(10,Math.min(220,Math.round(4e3/n))),r=Rt(o,n,i),c=Rt(s,n,i),u=[];for(let f=0;f<n;f++){const l=r[f],h=c[f],d=new Float32Array(i*2);for(let b=0;b<i*2;b++)d[b]=l.pts[b]+(h.pts[b]-l.pts[b])*a;u.push({pts:d,pen:l.pen+(h.pen-l.pen)*a,width:l.width+(h.width-l.width)*a})}return u}const gt=["Sternchen","Kreischen","Funken","ohne"],on=new Set(["Kaleidoskop","Spiegelkreuz","Kacheln","Kachelspiegel","Seitenspiegel","Raute","Wabe","Strahlenkranz"].map(e=>Le.findIndex(t=>t.name===e)).filter(e=>e>=0)),sn=new Set(["Strahlen","X-Strahlen","Kamm","Fächer","Sternchen","Vier Kreise"].map(e=>_e.findIndex(t=>t.name===e)).filter(e=>e>=0)),rn=new Set(Ge.map((e,t)=>[t,e.f(0,0)]).filter(([,e])=>.2126*e[0]+.7152*e[1]+.0722*e[2]>.1).map(([e])=>e));function cn(e,t){const a=[],{x:o,y:s,size:n,rot:i}=e;if(e.form===0)for(let r=0;r<3;r++){const c=i+r/3*Math.PI;a.push({pts:[o-Math.cos(c)*n,s-Math.sin(c)*n,o+Math.cos(c)*n,s+Math.sin(c)*n],pen:t,width:.0028})}else if(e.form===1){const r=[];for(let c=0;c<10;c++){const u=c%2?n*.42:n,f=i+c/10*Fe-Math.PI/2;r.push(o+Math.cos(f)*u,s+Math.sin(f)*u)}a.push({pts:r,pen:t,width:.0024,closed:!0})}else a.push({pts:[o-Math.cos(i)*n*1.3,s-Math.sin(i)*n*1.3,o+Math.cos(i)*n*1.3,s+Math.sin(i)*n*1.3],pen:t,width:.0026}),a.push({pts:[o+Math.sin(i)*n*.6,s-Math.cos(i)*n*.6,o-Math.sin(i)*n*.6,s+Math.cos(i)*n*.6],pen:t,width:.0026});return a}function un(e,t){const a=ce(e,Yt),o=ce(e,Qt,Jt),s=ce(e,en),n=ce(e,nn),i=ce(e,tn);let r=null,c=null;const u=12e4,f=new Float32Array(u*4),l=e.createBuffer(),h=e.createVertexArray();e.bindVertexArray(h),e.bindBuffer(e.ARRAY_BUFFER,l),e.bufferData(e.ARRAY_BUFFER,f.byteLength,e.DYNAMIC_DRAW);const d=e.getAttribLocation(o.p,"p"),b=e.getAttribLocation(o.p,"a");e.enableVertexAttribArray(d),e.vertexAttribPointer(d,2,e.FLOAT,!1,16,0),e.enableVertexAttribArray(b),e.vertexAttribPointer(b,2,e.FLOAT,!1,16,8),e.bindVertexArray(null);const S=e.createTexture(),P=new Uint8Array(256*4);e.bindTexture(e.TEXTURE_2D,S),e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,256,1,0,e.RGBA,e.UNSIGNED_BYTE,P),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE);const A=e.createTexture(),q=document.createElement("canvas");q.width=1024,q.height=256;let _=null,Q=-99,M=Math.random,x=null,I=null,y=0;const m={shape:{from:0,to:0,m:1,next:0},flow:{from:0,to:0,m:1,next:0,pa:[.5,.5,.5,.5],pb:[.5,.5,.5,.5],ta:0,tb:0,ka:.96,kb:.96,sa:0,sb:0},map:{from:0,to:0,m:1,next:0},part:{from:3,to:3,m:1,next:0}},v={shape:_e.length,flow:Le.length,map:Ge.length,part:gt.length},F={shape:[7,15],flow:[6,13],map:[7,15],part:[10,20]},O={shape:2,flow:2.5,map:2,part:1},K={...O},w=[];let k=0,R=0,H=0,p=!1,z=0,X=0,g=0,T=0,Y=0;const se=E=>{const[L,U]=F[E];let te=y+L+M()*(U-L);for(let fe=0;fe<6&&Object.keys(m).some(Z=>Z!==E&&Math.abs(m[Z].next-te)<4);fe++)te+=5;m[E].next=te},$=E=>{let L=x[E].next();return L===m[E].to&&(L=x[E].next()),E==="flow"&&on.has(L)&&M()<.6&&(L=x.flow.next()),E==="map"&&rn.has(L)&&M()<.65&&(L=x.map.next()),E==="shape"&&sn.has(L)&&M()<.25&&(L=x.shape.next()),L%v[E]},C=E=>{const L=M();return L<.35?.9+M()*.05:L<.8?.95+M()*.025:Le[E].keep},W=E=>{k=E?.45:.22,R=E?3+M()*7:0,H=y},V=(E,L)=>{const U=m[E];if(U.from=U.to,U.to=L,U.m=0,K[E]=O[E],E==="flow"){U.pa=U.pb,U.ta=U.tb,U.pb=[M(),M(),M(),M()],U.tb=0,U.ka=U.kb,U.kb=C(L),U.sa=U.sb,U.sb=M()<.3?0:(M()<.5?-1:1)*(.0015+M()*.004);const te=M();te<.4&&(K.flow=.25),te<.15?p=!0:te<.35&&y-H>8&&W(M()<.35)}E==="map"&&M()<.5&&(K.map=.4),se(E)},J=(E,L)=>{const U=q.getContext("2d");U.fillStyle="#000",U.fillRect(0,0,1024,256),U.fillStyle="#fff",U.textAlign="center",U.textBaseline="middle",U.font="700 64px system-ui, -apple-system, Segoe UI, sans-serif",U.fillText(String(E||"").slice(0,40),512,100),U.font="400 40px system-ui, -apple-system, Segoe UI, sans-serif",U.fillText(String(L||"").slice(0,50),512,172),e.bindTexture(e.TEXTURE_2D,A),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,q),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)},he=(E,L,U)=>{const te=gt[m.part.to],fe=E.events.kick!==X,D=E.events.onset!==g;if(X=E.events.kick,g=E.events.onset,E.playing&&m.part.m>=1){if(te==="Sternchen"){Y+=L;const Z=fe?2+Math.floor(M()*3):Y>.9&&E.conf<.4?1:0;Z&&(Y=0);for(let N=0;N<Z;N++){const G=M()*Fe,ae=.25+M()*.5;w.push({type:"star",form:Math.floor(M()*3),x:Math.cos(G)*.12,y:Math.sin(G)*.12,vx:Math.cos(G)*ae,vy:Math.sin(G)*ae,rot:M()*Fe,vr:(M()-.5)*5,size:.03+M()*.035,age:0,life:2.2+M()*1.6})}}else if(te==="Kreischen"){if(y>T){T=y+1.6+M()*1.8;const Z=.25+M()*.55,N=M()*Fe,G=(M()<.5?-1:1)*(.5+M()*.6),ae=6+Math.floor(M()*4);for(let de=0;de<ae;de++)w.push({type:"ring",R:Z,th:N,w:G,lag:de*.11,r:.012+.01*(de*7%3),age:0,life:3.2})}}else if(te==="Funken"){const Z=D?10+Math.floor(M()*16):M()<L*6?1:0;for(let N=0;N<Z;N++)w.push({type:"spark",x:(M()*2-1)*U,y:M()*2-1,r:.003+M()*.004,age:0,life:.3+M()*.6})}}for(let Z=w.length-1;Z>=0;Z--){const N=w[Z];if(N.age+=L,N.age>N.life){w.splice(Z,1);continue}N.type==="star"&&(N.x+=N.vx*L,N.y+=N.vy*L,N.rot+=N.vr*L)}w.length>400&&w.splice(0,w.length-400)};return{look:{linear:!1,bloom:.06,scale:1,expo:1,vignette:0},keys:{m:()=>(V("shape",$("shape")),`Figur: ${_e[m.shape.to].name}`),s:()=>(V("flow",$("flow")),`Strömung: ${Le[m.flow.to].name}`),p:()=>(V("map",$("map")),`Farben: ${Ge[m.map.to].name}`)},help:"M Figur · S Strömung · P Farben",resize(E,L){c&&c.dispose();const U=Math.min(1,1440/L),te=r;r=Bt(e,Math.max(32,Math.round(E*U)),Math.max(32,Math.round(L*U)),t),c=ge(e,E,L,t),te&&(e.bindFramebuffer(e.FRAMEBUFFER,r.src.fb),e.viewport(0,0,r.src.w,r.src.h),e.useProgram(i.p),xe(e,i,"uSrc",te.src.tex,0),e.drawArrays(e.TRIANGLES,0,3),te.dispose())},render(E,L){const U=E.dt;if(y+=U,I!==L.seed){const B=I===null;I=L.seed;let oe=Math.floor(L.seed*1e6)||1;M=()=>(oe=oe*16807%2147483647)/2147483647,x={shape:De(v.shape,M),flow:De(v.flow,M),map:De(v.map,M),part:De(v.part,M)};for(const j of["shape","flow","map","part"]){const ue=$(j);B?(Object.assign(m[j],{from:ue,to:ue,m:1}),j==="flow"&&(m.flow.pb=[M(),M(),M(),M()],m.flow.ka=m.flow.kb=C(ue),m.flow.sa=m.flow.sb=(M()<.5?-1:1)*(.0015+M()*.004)),se(j)):j!=="part"&&V(j,ue)}}if(E.playing)for(const B of["shape","flow","map","part"])y>m[B].next&&m[B].m>=1&&V(B,$(B));for(const B of["shape","flow","map","part"])m[B].m=Math.min(1,m[B].m+U/K[B]);E.events.kick!==z&&(z=E.events.kick,E.playing&&y-H>12&&E.bassAtt>1.2&&M()<.3&&W(M()<.3)),m.flow.ta+=U,m.flow.tb+=U;const te=r.dst.w,fe=r.dst.h;e.bindFramebuffer(e.FRAMEBUFFER,r.dst.fb),e.viewport(0,0,te,fe),e.useProgram(a.p),Re(e,a,E,L),e.uniform2f(a.u.uRes,te,fe),xe(e,a,"uPrev",r.src.tex,0);const D=dt(m.flow.m),Z=Le[m.flow.from],N=Le[m.flow.to];e.uniform1i(a.u.uFa,m.flow.from),e.uniform1i(a.u.uFb,m.flow.to),e.uniform1f(a.u.uFm,D),e.uniform4fv(a.u.uPa,m.flow.pa),e.uniform4fv(a.u.uPb,m.flow.pb),e.uniform1f(a.u.uTa,m.flow.ta),e.uniform1f(a.u.uTb,m.flow.tb);const G=Math.min(3,U*60);e.uniform1f(a.u.uAmt,G*(1.15+.6*Math.min(2,E.bassAtt))*2.9),e.uniform1f(a.u.uSpin,m.flow.sa+(m.flow.sb-m.flow.sa)*D),e.uniform1f(a.u.uZmax,.03*G),e.uniform1f(a.u.uZAmt,G*(1.15+.6*Math.min(2,E.bassAtt))*1.8);let ae=m.flow.ka+(m.flow.kb-m.flow.ka)*D,de=0;k>0?(de=.09*G,k-=U,ae=Math.max(ae,.97)):R>0&&(ae=.9975,R-=U),p&&(ae=0,p=!1),e.uniform1f(a.u.uKeep,Math.pow(ae,G)),e.uniform1f(a.u.uFlood,de),e.uniform1f(a.u.uSub,.0012*G),e.uniform1f(a.u.uGrain,(Z.grain+(N.grain-Z.grain)*D)*.35*(fe/720)),e.bindVertexArray(L.quadVao),e.drawArrays(e.TRIANGLES,0,3);let Ie=0;const Ue=(B,oe,j,ue)=>{if(Ie>=u)return;const re=Ie*4;f[re]=B,f[re+1]=oe,f[re+2]=j,f[re+3]=ue,Ie++},It=2/fe,at=(B,oe,j,ue)=>{if(j<=.003)return;const re=Math.max(oe*.7,.9*It),je=B.length/2,mt=ue?je:je-1;for(let Pe=0;Pe<mt;Pe++){const ze=(Pe+1)%je,Ze=B[Pe*2],$e=B[Pe*2+1],Ye=B[ze*2],Je=B[ze*2+1];let ke=-(Je-$e),ye=Ye-Ze;const Qe=Math.hypot(ke,ye);if(Qe<1e-7)continue;ke=ke/Qe*re,ye=ye/Qe*re;const Ce=(Ye-Ze)/Qe*re*.5,Ve=(Je-$e)/Qe*re*.5;Ue(Ze-Ce+ke,$e-Ve+ye,1,j),Ue(Ze-Ce-ke,$e-Ve-ye,-1,j),Ue(Ye+Ce+ke,Je+Ve+ye,1,j),Ue(Ze-Ce-ke,$e-Ve-ye,-1,j),Ue(Ye+Ce-ke,Je+Ve-ye,-1,j),Ue(Ye+Ce+ke,Je+Ve+ye,1,j)}},Ut=B=>Math.max(-1.3,Math.min(1.3,E.waveRaw[Math.min(511,Math.max(0,Math.round(B*511)))])),Ct=B=>{const oe=Math.min(31,Math.max(0,B*31)),j=Math.floor(oe),ue=oe-j;return Math.min(1,E.bands[j]*(1-ue)+E.bands[Math.min(31,j+1)]*ue)},ct={t:y*1.7,w:Ut,f:Ct,bass:E.bassAtt,asp:L.aspect},Vt=E.playing?.85+.15*Math.min(1,E.bassAtt):.25,St=dt(m.shape.m);let ut;St>=1||m.shape.from===m.shape.to?ut=bt(_e[m.shape.to].f(ct)):ut=an(_e[m.shape.from].f(ct),_e[m.shape.to].f(ct),St);for(const B of ut)at(B.pts,B.width,B.pen*Vt,B.closed);he(E,U,L.aspect);for(const B of w){const oe=Math.min(1,B.age/.15,(B.life-B.age)/.6);if(B.type==="star")for(const j of cn(B,oe))at(j.pts,j.width,j.pen,j.closed);else if(B.type==="ring"){const j=B.age-B.lag;if(j<0)continue;const ue=B.th+B.w*j,re=B.R*(1+.15*j),je=Math.cos(ue)*re*Math.min(1.4,L.aspect*.8),mt=Math.sin(ue)*re*.85,Pe=[];for(let ze=0;ze<14;ze++)Pe.push(je+Math.cos(ze/14*Fe)*B.r,mt+Math.sin(ze/14*Fe)*B.r);at(Pe,.0028,oe,!0)}else{const j=.6+.4*Math.sin(B.age*40+B.x*10);at([B.x-B.r,B.y,B.x+B.r,B.y],B.r*.8,oe*j,!1)}}Ie&&(e.useProgram(o.p),e.uniform1f(o.u.uAspect,L.aspect),e.bindBuffer(e.ARRAY_BUFFER,l),e.bufferSubData(e.ARRAY_BUFFER,0,f.subarray(0,Ie*4)),e.bindVertexArray(h),e.enable(e.BLEND),e.blendEquation(e.MAX),e.drawArrays(e.TRIANGLES,0,Ie));const ft=L.title?`${L.title}|${L.artist}`:null;ft&&ft!==_&&(_=ft,J(L.title,L.artist),Q=y);const lt=y-Q;if(lt<3.2){const B=Math.min(1,lt/.4)*Math.min(1,(3.2-lt)/.8)*.95;e.useProgram(s.p),xe(e,s,"uText",A,0),e.uniform1f(s.u.uAmt,B),e.enable(e.BLEND),e.blendEquation(e.MAX);const oe=Math.round(te*.6),j=Math.round(oe/4);e.viewport(Math.round((te-oe)/2),Math.round(fe*.5-j/2),oe,j),e.bindVertexArray(L.quadVao),e.drawArrays(e.TRIANGLES,0,3),e.viewport(0,0,te,fe)}e.blendEquation(e.FUNC_ADD),e.disable(e.BLEND);const Et=dt(m.map.m),Kt=Ge[m.map.from].f,Ht=Ge[m.map.to].f;for(let B=0;B<256;B++){const oe=B/255,j=Kt(oe,y),ue=Et>0?Ht(oe,y):j;for(let re=0;re<3;re++)P[B*4+re]=Math.round(Math.min(1,Math.max(0,j[re]+(ue[re]-j[re])*Et))*255);P[B*4+3]=255}return e.bindTexture(e.TEXTURE_2D,S),e.texSubImage2D(e.TEXTURE_2D,0,0,0,256,1,e.RGBA,e.UNSIGNED_BYTE,P),e.bindFramebuffer(e.FRAMEBUFFER,c.fb),e.viewport(0,0,c.w,c.h),e.useProgram(n.p),xe(e,n,"uI",r.dst.tex,0),xe(e,n,"uMap",S,1),e.bindVertexArray(L.quadVao),e.drawArrays(e.TRIANGLES,0,3),r.swap(),c.tex},debug(E){for(const L of["shape","flow","map","part"])E[L]!=null&&(Object.assign(m[L],{from:E[L],to:E[L],m:1,next:y+1e6}),L==="flow"&&E.params&&(m.flow.pb=E.params));E.keep!=null&&(m.flow.ka=m.flow.kb=E.keep),E.flood&&W(E.flood==="long"),E.cut&&(p=!0)},info(){return`${_e[m.shape.to].name} (M) · ${Le[m.flow.to].name} (S) · ${Ge[m.map.to].name} (P)`},dispose(){r&&r.dispose(),c&&c.dispose(),e.deleteBuffer(l),e.deleteVertexArray(h),e.deleteTexture(S),e.deleteTexture(A);for(const E of[a,o,s,n,i])e.deleteProgram(E.p)}}}const fn=1400,ln=28,mn=1800,_t=`
uniform mat4 uVP;
uniform vec3 uEye;
uniform vec4 uMag[5];       // Magnete: 0-1 Lichter, 2-4 dunkle Kugeln (xyz, Radius)
uniform float uClock, uLife, uSpiral, uSpin, uPrec, uChaos, uTwist, uTail, uMode, uSrc;
uniform float uKicks[8];    // Teilchen-Uhr der letzten Schläge
uniform vec3 uCol[5];
float hs(float n){ return fract(sin(n * 12.9898) * 43758.5453); }
vec3 hs3(float n){ return vec3(hs(n), hs(n + 7.13), hs(n + 19.71)); }
vec3 rnd3(float n){ return normalize(hs3(n) - .5 + vec3(1e-3, 2e-3, 3e-3)); }
vec3 rotAxis(vec3 v, vec3 k, float a){ float c = cos(a), s = sin(a); return v * c + cross(k, v) * s + k * dot(k, v) * (1. - c); }
struct Pt { vec3 p; float age; float life; float band; float birth; float burst; float id; };
// Alter, Lebensdauer, Pulk und Band - ohne Ort (billig; für Helligkeit und Farbe genügt das)
Pt info(float id, float back){
  Pt q;
  q.id = id;
  q.p = vec3(0.);
  vec3 h = hs3(id * .731 + 1.3 + uMode * 3.1);
  q.life = uLife * (.6 + .8 * h.x);
  float cl = uClock - back;
  q.age = mod(cl + h.y * q.life, q.life);
  q.birth = cl - q.age;
  float kb = 0.;
  for (int i = 0; i < 8; i++) kb += exp(-abs(q.birth - uKicks[i]) * 10.);
  q.burst = min(kb, 1.);
  q.band = floor(hs(id * 5.71) * 31.99);
  return q;
}
// Teilchen id, back Sekunden (Teilchen-Uhr) früher
Pt particle(float id, float back){
  Pt q = info(id, back);
  vec3 h = hs3(id * .731 + 1.3 + uMode * 3.1);
  vec3 g = hs3(id * 1.917 + 4.1);
  vec3 k = hs3(id * 3.37 + 8.8);
  int m = uSrc > 1.5 ? 2 + int(mod(id, 3.)) : uSrc > .5 ? 0 : int(mod(id, 5.));
  // Bahn: Kreis in einer Ebene, die langsam kippt; der Radius wächst (Spirale nach aussen)
  vec3 n0 = rnd3(id * 5.1 + 2.);
  vec3 e0 = normalize(cross(n0, rnd3(id * 8.3 + 5.)));
  vec3 ax = rnd3(id * 6.3 + 1.);
  float pa = uPrec * q.age * (.4 + k.x);
  vec3 n = rotAxis(n0, ax, pa);
  vec3 e1 = rotAxis(e0, ax, pa);
  vec3 e2 = cross(n, e1);
  float r0 = uMag[m].w * (1.08 + .35 * g.x);
  float r = r0 + uSpiral * q.age * (.35 + .9 * g.y) * (1. + q.burst * 1.6);
  float th = h.z * 6.2831853 + uSpin * q.age * (.6 + .8 * g.z) * (k.y < .5 ? -1. : 1.) / max(r, .35);
  vec3 p = (cos(th) * e1 + sin(th) * e2) * r;
  p += uChaos * q.age * .12 * vec3(sin(q.age * 1.7 + id), sin(q.age * 1.3 + id * 1.7), sin(q.age * 1.1 + id * 2.3));
  q.p = uMag[m].xyz + p;
  return q;
}
// Helligkeit: eigenes Band, Pulk bei Schlägen (Geburt nahe einem Schlag), ein- und ausblenden
float glow(Pt q){
  float e = band(q.band / 31.);
  float fade = smoothstep(0., .25, q.age) * (1. - smoothstep(q.life * .55, q.life, q.age));
  return (.04 + .45 * e * e + .9 * q.burst) * fade;
}
vec3 colorOf(Pt q){
  float x = hs(q.id * 2.37);
  vec3 c = x < .45 ? uCol[4] : x < .8 ? uCol[2] : mix(uCol[2], uCol[4], .5);
  return c * (.7 + .6 * hs(q.id * 9.1));
}
`,hn=`#version 300 es
${Xe}
${_t}
uniform float uSegN, uAmt, uW, uMinPx, uV;
uniform vec2 uHalf;         // halbe Bildgrösse in Bildpunkten
out vec3 vc;
out float vW;
void main(){
  int V = int(uV);
  int vid = gl_VertexID;
  int pid = vid / V;
  int jj = clamp(vid % V - 1, 0, V - 3);
  float side = (jj % 2 == 0) ? -1. : 1.;
  float id = float(pid);
  Pt h = info(id, 0.);
  float s = float(jj / 2);
  float back = min(s * uTail, h.age);
  Pt q = particle(id, back);
  Pt q2 = particle(id, back + .03);
  vec3 T = normalize(q.p - q2.p + vec3(1e-5, 0., 0.));
  vec3 B = normalize(cross(T, rnd3(id * 7.7 + 3.)));
  B = rotAxis(B, T, uTwist * q.age * (.5 + hs(id * 3.1)) + hs(id * 4.4) * 6.28);
  float k = 1. - s / (uSegN + 1.);
  float w = uW * (.35 + .65 * k) * (.7 + .6 * hs(id * 6.6));
  vec4 c0 = uVP * vec4(q.p, 1.);
  vec4 cB = uVP * vec4(q.p + B * w, 1.);
  vec4 cT = uVP * vec4(q2.p, 1.);
  float ok = step(.35, c0.w) * step(.35, cT.w) * step(.35, cB.w);
  vec2 s0 = c0.xy / max(c0.w, .35) * uHalf;
  vec2 sB = cB.xy / max(cB.w, .35) * uHalf;
  vec2 sT = cT.xy / max(cT.w, .35) * uHalf;
  vec2 dir = s0 - sT;
  dir = length(dir) > 1e-4 ? normalize(dir) : vec2(1., 0.);
  vec2 nrm = vec2(-dir.y, dir.x);
  float wpx = abs(dot(sB - s0, nrm));
  float aw = max(wpx, uMinPx);
  vec2 so = s0 + nrm * aw * side;
  gl_Position = vec4(so / uHalf * c0.w, c0.z, c0.w) * ok;
  // Licht: Fläche zur Kamera = hell, mit Glanz; von der Kante gesehen schwächer
  vec3 nb = normalize(cross(T, B));
  float face = abs(dot(nb, normalize(uEye - q.p)));
  float lit = .3 + .7 * face + pow(face, 24.) * 1.6;
  float thin = mix(.4, 1., wpx / aw);
  // ganz nahe an der Kamera ausblenden (sonst riesige Flächen quer durchs Bild)
  float nearF = smoothstep(.5, 1.6, c0.w);
  vc = colorOf(h) * glow(h) * k * k * lit * thin * nearF * uAmt;
  vW = c0.w;
}`,dn=`#version 300 es
${Xe}
${_t}
uniform float uAmt, uPx, uFocus;
out vec3 vc;
out float vb;
out float vW;
void main(){
  Pt q = particle(float(gl_VertexID), 0.);
  vec4 clip = uVP * vec4(q.p, 1.);
  gl_Position = clip;
  float blur = clamp(abs(clip.w - uFocus) * .35 - .2, 0., 3.);
  float e = band(q.band / 31.);
  float size = (1.4 + 2.4 * e + 2. * q.burst) * uPx / max(clip.w, .3) * (1. + blur * 4.);
  gl_PointSize = clip.w < .4 ? 0. : clamp(size, 1., 110.);
  float spread = 1. / (1. + blur * 4.);
  vc = colorOf(q) * glow(q) * (.35 + 1.3 * spread * spread) * smoothstep(.4, 1.2, clip.w) * uAmt;
  vb = clamp(blur, 0., 1.);
  vW = clip.w;
}`,pn=`#version 300 es
${Xe}
uniform mat4 uVP;
uniform float uPx, uFocus, uAmt, uDrift;
uniform vec3 uCol[5];
out vec3 vc;
out float vb;
out float vW;
float hs(float n){ return fract(sin(n * 12.9898) * 43758.5453); }
void main(){
  float id = float(gl_VertexID);
  vec3 r = vec3(hs(id * .37 + 1.), hs(id * .91 + 2.), hs(id * 1.73 + 3.));
  float z = r.x * 2. - 1., a = r.y * 6.2831853;
  vec3 p = vec3(sqrt(1. - z * z) * cos(a), z, sqrt(1. - z * z) * sin(a)) * (2.2 + 11. * pow(r.z, .6));
  p += vec3(sin(uDrift * .11 + id), cos(uDrift * .07 + id * 1.3), sin(uDrift * .09 + id * .7)) * .25;
  vec4 clip = uVP * vec4(p, 1.);
  gl_Position = clip;
  float blur = clamp(abs(clip.w - uFocus) * .22 - .3, 0., 3.);
  float size = (1. + 1.4 * hs(id * 5.3)) * uPx / max(clip.w, .3) * (1. + blur * 4.);
  gl_PointSize = clip.w < .3 ? 0. : clamp(size, 1., 120.);
  float spread = 1. / (1. + blur * 4.);
  float tw = .65 + .35 * sin(uT * (1. + 2. * hs(id * 8.1)) + id);
  vec3 c = mix(uCol[4], uCol[2], hs(id * 2.9));
  vc = c * (.05 + .12 * hs(id * 4.7)) * tw * (.3 + 1.4 * spread * spread) * smoothstep(.3, 1., clip.w) * uAmt * (.8 + .4 * min(uBassAtt, 2.));
  vb = clamp(blur, 0., 1.);
  vW = clip.w;
}`,Pt=`#version 300 es
precision highp float;
uniform vec4 uSphS[3];
uniform float uAspect, uRing;
uniform vec2 uRes;
in vec3 vc; in float vb; in float vW;
out vec4 o;
void main(){
  float d = length(gl_PointCoord - .5) * 2.;
  if (d > 1.) discard;
  float sharp = exp(-d * d * 5.) + .25 * exp(-d * d * 1.2);
  float bokeh = smoothstep(1., .82, d) * (.55 + .45 * d);
  float a = mix(sharp, bokeh * .5, vb);
  if (uRing > .5) a = smoothstep(.6, .75, d) * smoothstep(1., .88, d) * 1.6 + exp(-d * d * 30.) * .8;
  vec2 ndc = gl_FragCoord.xy / uRes * 2. - 1.;
  float f = 1.;
  for (int i = 0; i < 3; i++) {
    vec4 s = uSphS[i];
    if (s.z <= 0. || vW < s.z) continue;
    float l = length((ndc - s.xy) * vec2(uAspect, 1.)) / s.w;
    f *= mix(.04, 1., smoothstep(.985, 1.015, l));
  }
  o = vec4(vc * a * f, 1.);
}`,vn=`#version 300 es
precision highp float;
uniform vec4 uSphS[3];
uniform float uAspect;
uniform vec2 uRes;
in vec3 vc; in float vW;
out vec4 o;
void main(){
  // hinter einer dunklen Kugel: verdeckt (je Bildpunkt, scharfe Kante)
  vec2 ndc = gl_FragCoord.xy / uRes * 2. - 1.;
  float f = 1.;
  for (int i = 0; i < 3; i++) {
    vec4 s = uSphS[i];
    if (s.z <= 0. || vW < s.z) continue;
    float l = length((ndc - s.xy) * vec2(uAspect, 1.)) / s.w;
    f *= mix(.04, 1., smoothstep(.985, 1.015, l));
  }
  o = vec4(vc * f, 1.);
}`,xn=me(`
uniform vec4 uLightS[2];    // Lichter im Bild: x, y, Tiefe, Grösse
uniform float uLightE[2];
uniform vec4 uSphS[3];
uniform float uSphE[3], uNeb, uBurst;
uniform vec4 uCloud;        // Mitte der Wolke im Bild: x, y, Tiefe, Grösse
uniform vec3 uCol[5];
void main(){
  vec2 q = (uv * 2. - 1.) * vec2(uAspect, 1.);
  vec2 nq = q * .7 + vec2(uT * .01, -uT * .005);
  float f = fbm(vec3(nq + vec2(fbm(vec3(nq * 1.3, uT * .02)), 0.) * .8, uT * .015));
  vec3 col = mix(uCol[3], uCol[1], smoothstep(-.3, .7, f)) * smoothstep(-.5, .8, f) * uNeb * (.7 + .3 * min(uBassAtt, 2.));
  // Dunst um die Wolke: dagegen heben sich die dunklen Kugeln ab
  if (uCloud.z > 0.) {
    float r = length(q - uCloud.xy * vec2(uAspect, 1.)) / max(uCloud.w, 1e-3);
    col += mix(uCol[1], uCol[2], .25) * exp(-r * r * 1.2) * (.16 + .2 * min(uBassAtt, 2.)) * (.6 + .4 * f);
  }
  // Kugeln: Farbe und Deckung je Kugel (Lichter dahinter werden verdeckt)
  vec3 sc[3];
  float sa[3];
  for (int i = 0; i < 3; i++) {
    sc[i] = vec3(0.);
    sa[i] = 0.;
    vec4 s = uSphS[i];
    if (s.z <= 0.) continue;
    vec2 d = (q - s.xy * vec2(uAspect, 1.)) / max(s.w, 1e-3);
    float l = length(d);
    float e = uSphE[i];
    float px = 2. / (uRes.y * max(s.w, 1e-3));
    sa[i] = smoothstep(1. + px, 1. - px, l);
    if (l < 1. + px) {
      float lc = min(l, .999);
      vec3 n = vec3(d / max(l, 1e-4) * lc, sqrt(1. - lc * lc));
      float fr = pow(1. - n.z, 4.);
      vec3 L = normalize(vec3(-.45, .6, .65));
      float spec = pow(max(dot(reflect(vec3(0., 0., -1.), n), L), 0.), 80.);
      float spec2 = pow(max(dot(reflect(vec3(0., 0., -1.), n), normalize(vec3(.6, -.3, .7))), 0.), 20.) * .12;
      // Funkeln im Glas (Spiegelungen der Teilchen, dreht mit)
      float a = uT * .15 + float(i);
      vec2 g = mat2(cos(a), -sin(a), sin(a), cos(a)) * d * 7.;
      vec2 ci = floor(g);
      float hh = hash12(ci + float(i) * 17.);
      float sp = step(.8, hh) * smoothstep(.35, 0., length(fract(g) - .5)) * (.4 + .6 * sin(uT * 2.5 + hh * 40.)) * (1. - lc * .6);
      vec3 cp = mix(uCol[2], uCol[4], hash12(ci + 3.));
      sc[i] = col * .06 + uCol[0] * .03 + uCol[2] * fr * (.3 + .6 * e) + uCol[4] * pow(1. - n.z, 10.) * .25 + vec3(1.) * (spec * 1.1 + spec2) + cp * sp * (.2 + .8 * e);
    } else {
      col += uCol[2] * exp(-(l - 1.) * 14.) * .03 * (.4 + e);
    }
  }
  // Lichter: heller Kern, weiter weicher Hof, schwacher Ring; hinter einer Kugel verdeckt
  vec3 lights = vec3(0.);
  for (int j = 0; j < 2; j++) {
    vec4 L = uLightS[j];
    if (L.z <= 0.) continue;
    float r = length(q - L.xy * vec2(uAspect, 1.)) / max(L.w, 1e-3);
    vec3 c = uCol[4] * (exp(-r * r * .8) * .8 + .045 / (r * r * .15 + .02)) * (.4 + .9 * uLightE[j] + uBurst);
    c += vec3(1.) * exp(-r * r * 7.) * (1.5 + uBurst * 2.);
    c += uCol[2] * smoothstep(.15, 0., abs(r - 2.6)) * .04;
    for (int i = 0; i < 3; i++) if (uSphS[i].z > 0. && L.z > uSphS[i].z) c *= 1. - sa[i];
    lights += c;
  }
  for (int i = 0; i < 3; i++) col = mix(col, sc[i], sa[i]);
  col += lights;
  o = vec4(col, 1.);
}`),bn=e=>[1,3,5].map(t=>Math.pow(parseInt(e.slice(t,t+2),16)/255,2.2)),et=[{name:"Rosé",c:["#0a0408","#2a0e22","#ff4fd8","#0e0510","#ffe6d2"]},{name:"Nordlicht",c:["#02060c","#082036","#3fa0ff","#020812","#d8f4ff"]},{name:"Glut",c:["#0a0402","#2a1004","#ff7a1a","#100502","#fff0c8"]},{name:"Smaragd",c:["#020a04","#0a2410","#5cff88","#030c06","#eaffd8"]},{name:"Violett",c:["#06020c","#160932","#8a5aff","#060314","#ece2ff"]},{name:"Cover",c:null}],Ae=[{name:"Bänder",count:520,seg:28,tail:.065,width:.045,twist:1.8,spin:1.2,spiral:.35,prec:.4,chaos:.3,life:4.6,head:0,ring:0,src:0},{name:"Fäden",count:900,seg:28,tail:.06,width:.004,twist:0,spin:1.8,spiral:.14,prec:1.2,chaos:.8,life:4.2,head:.45,ring:0,src:0},{name:"Kometen",count:440,seg:14,tail:.045,width:.018,twist:1.5,spin:.9,spiral:.6,prec:.3,chaos:.2,life:4.4,head:1.2,ring:0,src:0},{name:"Strahlen",count:760,seg:20,tail:.03,width:.012,twist:2,spin:.12,spiral:1.5,prec:.1,chaos:.1,life:3.4,head:1,ring:0,src:1},{name:"Wirbel",count:420,seg:28,tail:.05,width:.05,twist:2,spin:2.4,spiral:.2,prec:2,chaos:.2,life:5,head:0,ring:0,src:2,gain:.45}],be=[{name:"Überblick",dist:8.2,fov:50,look:0,w:3},{name:"Nah",dist:3.6,fov:55,look:1,w:3},{name:"Mittendrin",dist:1.7,fov:68,look:0,w:2},{name:"Fern",dist:15,fov:42,look:0,w:1}];function wn(e,t){const a=ce(e,vn,hn),o=ce(e,Pt,dn),s=ce(e,Pt,pn),n=ce(e,xn),i=e.createVertexArray();let r=null,c=0,u=0,f=0,l=0;const h=new Float32Array(8).fill(-99);let d=0,b=0,S=-1,P=1,A=0,q=null;const _=Ne({beats:64,minSec:45,maxSec:100}),Q=Ne({beats:32,minSec:14,maxSec:32}),M=[0,1,2,3,4].map(w=>({p:[0,0,0],e:0,r:w<2?.12:.5})),x=[.6,.48,.38];let I=0;const y={dist:8.2,fov:50,look:[0,0,0],yaw:0,pitch:.15},m={dist:0,fov:0};let v=0;const F=(w,k)=>{if(w===0)return[.35*Math.sin(k*.07),.2*Math.sin(k*.05+1),.35*Math.cos(k*.06)];if(w===1){const z=k*.05+2;return[Math.cos(z)*2.9,1.1*Math.sin(k*.04),Math.sin(z)*2.6]}const R=w-2,H=k*(.08+R*.017)+R*2.1,p=1.8+.45*Math.sin(k*.05+R);return[Math.cos(H)*p,.8*Math.sin(k*(.06+R*.011)+R*1.3),Math.sin(H)*p*.85]},O=()=>{const w=be.reduce((R,H)=>R+H.w,0);let k=I;for(;k===I;){let R=Math.random()*w;for(k=0;R>be[k].w;)R-=be[k++].w}I=k,v=be[k].look?[0,2,3,4][Math.floor(Math.random()*4)]:0},K=(w,k,R,H,p,z,X,g,T)=>{Re(e,w,k,R),e.uniformMatrix4fv(w.u.uVP,!1,H),w.u.uEye!=null&&e.uniform3fv(w.u.uEye,p),e.uniform4fv(w.u.uMag,M.flatMap(Y=>[...Y.p,Y.r])),e.uniform4fv(w.u.uSphS,z),e.uniform1f(w.u.uClock,u),e.uniform1f(w.u.uLife,X.life),e.uniform1f(w.u.uSpiral,X.spiral),e.uniform1f(w.u.uSpin,X.spin),e.uniform1f(w.u.uPrec,X.prec),e.uniform1f(w.u.uChaos,X.chaos),w.u.uTwist!=null&&e.uniform1f(w.u.uTwist,X.twist),w.u.uTail!=null&&e.uniform1f(w.u.uTail,X.tail),e.uniform1f(w.u.uMode,Ae.indexOf(X)),e.uniform1f(w.u.uSrc,X.src),e.uniform1fv(w.u.uKicks,h),e.uniform3fv(w.u.uCol,T),e.uniform1f(w.u.uAmt,g)};return{look:{linear:!0,bloom:.55,scale:1,expo:1},keys:{m:()=>(S=b,b=(b+1)%Ae.length,P=0,_.reset(),`Modus: ${Ae[b].name}`),p:()=>(A=(A+1)%et.length,`Farben: ${et[A].name}`),k:()=>(O(),Q.reset(),`Kamera: ${be[I].name}`)},help:"M Modus · P Farben · K Kamera",resize(w,k){r&&r.dispose(),r=ge(e,w,k,t)},render(w,k){const R=w.dt;if(c+=R,q!==k.seed){q=k.seed,A=Math.floor(k.seed*997)%(et.length-1);const D=Math.floor(k.seed*131)%Ae.length;D!==b&&(S=b,b=D,P=0)}_.tick(w,R)&&(S=b,b=(b+1+Math.floor(Math.random()*(Ae.length-1)))%Ae.length,P=0),P=Math.min(1,P+R/1.6),Q.tick(w,R)&&O(),u+=R*(.55+.45*Math.min(2,w.bassAtt))*(w.playing?1:.25),w.events.kick!==l&&(l=w.events.kick,h[d]=u,d=(d+1)%8,f=1),f*=Math.exp(-R*7);const H=[[0,5],[21,32],[5,12],[12,21],[3,9]];for(let D=0;D<5;D++){const Z=M[D];Z.p=F(D,c);let N=0;for(let G=H[D][0];G<H[D][1];G++)N+=w.bands[G];N/=H[D][1]-H[D][0],Z.e+=(N-Z.e)*(1-Math.exp(-R*8)),Z.r=(D<2?.12:x[D-2])*(1+.1*Z.e)}const p=et[A].c;let z;if(p)z=p.flatMap(bn);else{const D=Array.from({length:5},(G,ae)=>Array.from(k.palette.slice(ae*3,ae*3+3))),Z=G=>.2126*G[0]+.7152*G[1]+.0722*G[2],N=D.slice().sort((G,ae)=>Z(G)-Z(ae));z=[N[0].map(G=>G*.1),N[1].map(G=>G*.25),N[3],N[0].map(G=>G*.1),N[4].map(G=>Math.min(1,G*1.2+.1))].flat()}const X=be[I],g=(D,Z,N)=>{const G=-2*N*m[D]-N*N*(y[D]-Z);m[D]+=G*R,y[D]+=m[D]*R};g("dist",X.dist,.9),g("fov",X.fov,.9);const T=v?M[v].p:[0,0,0],Y=1-Math.exp(-R*.8);y.look=y.look.map((D,Z)=>D+(T[Z]-D)*Y),y.yaw+=R*(.05+.03*Math.min(2,w.midAtt))*(y.dist<3?1.6:1),y.pitch=.18*Math.sin(c*.027)+.06;const se=Math.cos(y.pitch),$=[y.look[0]+Math.sin(y.yaw)*se*y.dist,y.look[1]+Math.sin(y.pitch)*y.dist,y.look[2]+Math.cos(y.yaw)*se*y.dist],C=y.fov*Math.PI/180,W=yt(Mt(C,k.aspect,.1,80),kt($,y.look)),V=1/Math.tan(C/2),J=(D,Z,N)=>{const G=W[0]*D[0]+W[4]*D[1]+W[8]*D[2]+W[12],ae=W[1]*D[0]+W[5]*D[1]+W[9]*D[2]+W[13],de=W[3]*D[0]+W[7]*D[1]+W[11]*D[2]+W[15];return de<N?[0,0,-1,0]:[G/de,ae/de,de,Z*V/de]},he=[2,3,4].flatMap(D=>J(M[D].p,M[D].r,M[D].r*2.2)),E=[0,1].flatMap(D=>J(M[D].p,.22+.12*M[D].e,.3)),L=Math.hypot($[0]-y.look[0],$[1]-y.look[1],$[2]-y.look[2]),U=r.h/2*V*.012;e.bindFramebuffer(e.FRAMEBUFFER,r.fb),e.viewport(0,0,r.w,r.h),e.useProgram(n.p),Re(e,n,w,k),e.uniform4fv(n.u.uSphS,he),e.uniform1fv(n.u.uSphE,[M[2].e,M[3].e,M[4].e]),e.uniform4fv(n.u.uLightS,E),e.uniform1fv(n.u.uLightE,[M[0].e,M[1].e*.7]),e.uniform1f(n.u.uNeb,.6),e.uniform4fv(n.u.uCloud,J([0,0,0],2.6,.3)),e.uniform1f(n.u.uBurst,f*.6),e.uniform3fv(n.u.uCol,z),e.bindVertexArray(k.quadVao),e.drawArrays(e.TRIANGLES,0,3),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE),e.bindVertexArray(i),e.useProgram(s.p),Re(e,s,w,k),e.uniformMatrix4fv(s.u.uVP,!1,W),e.uniform1f(s.u.uPx,U),e.uniform1f(s.u.uFocus,L),e.uniform1f(s.u.uAmt,1),e.uniform1f(s.u.uDrift,c),e.uniform1f(s.u.uRing,0),e.uniform3fv(s.u.uCol,z),e.uniform4fv(s.u.uSphS,he),e.drawArrays(e.POINTS,0,mn);const te=(D,Z)=>{if(Z<=.01)return;const N=Ae[D],G=Math.min(fn,N.count);e.useProgram(a.p),K(a,w,k,W,$,he,N,Z*(N.gain||1),z),e.uniform1f(a.u.uSegN,N.seg),e.uniform1f(a.u.uW,N.width),e.uniform1f(a.u.uMinPx,Math.max(.6,r.h/1200)),e.uniform2f(a.u.uHalf,r.w/2,r.h/2);const ae=2*(Math.min(ln,N.seg)+1)+2;e.uniform1f(a.u.uV,ae),e.drawArrays(e.TRIANGLE_STRIP,0,G*ae),N.head>0&&(e.useProgram(o.p),K(o,w,k,W,$,he,N,Z*N.head,z),e.uniform1f(o.u.uPx,U),e.uniform1f(o.u.uFocus,L),e.uniform1f(o.u.uRing,N.ring),e.drawArrays(e.POINTS,0,G))},fe=P*P*(3-2*P);return S>=0&&fe<1&&te(S,1-fe),te(b,fe),e.disable(e.BLEND),e.blendFunc(e.ONE,e.ZERO),r.tex},debug(w){w.mode!=null&&(b=w.mode,S=-1,P=1),w.pal!=null&&(A=w.pal),w.shot!=null&&(I=w.shot,v=be[I].look?2:0,y.dist=be[I].dist,y.fov=be[I].fov)},info(){return`${Ae[b].name} (M) · ${et[A].name} (P) · ${be[I].name} (K)`},dispose(){r&&r.dispose(),e.deleteVertexArray(i);for(const w of[a,o,s,n])e.deleteProgram(w.p)}}}const st=new Map;function Mn(e){if(!st.has(e)){const t=new Promise((a,o)=>{const s=new Image;s.decoding="async",s.onload=()=>(s.decode?s.decode().catch(()=>{}):Promise.resolve()).then(()=>a(s)),s.onerror=()=>o(new Error("Bild fehlt: "+e)),s.src=zt("/viz/"+e)});t.catch(()=>st.delete(e)),st.set(e,t)}return st.get(e)}function kn(e,t,{srgb:a=!0,mip:o=!0,repeat:s=!1,nearest:n=!1}={}){const i=e.createTexture();return e.bindTexture(e.TEXTURE_2D,i),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.NONE),e.texImage2D(e.TEXTURE_2D,0,a?e.SRGB8_ALPHA8:e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,t),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),o&&!n&&e.generateMipmap(e.TEXTURE_2D),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,n?e.NEAREST:o?e.LINEAR_MIPMAP_LINEAR:e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,n?e.NEAREST:e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,s?e.REPEAT:e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),i}function rt(e,t){let a="idle",o=null;return{get(){return a==="idle"&&(a="loading",Promise.all(t.map(s=>Mn(s.name))).then(s=>{a==="loading"&&(o=s.map((n,i)=>kn(e,n,t[i])),a="ready")}).catch(s=>{console.warn("Visualizer-Bilder:",s&&s.message),a="failed"})),a==="ready"?o:null},get failed(){return a==="failed"},release(){if(o)for(const s of o)e.deleteTexture(s);o=null,a="idle"}}}const yn=me(`
uniform vec3 uNeon;
uniform int uShapeA, uShapeB; uniform float uShapeM;
uniform float uPx;                     // ein Bildpunkt in Bild-Einheiten (Höhe = 1)
uniform float uHZ;                     // Wasserlinie (Bühnen an Land: ganz unten, ohne Wasser)
uniform vec2 uC;                       // Mitte der Form
uniform float uSc;                     // Grösse der Form
uniform int uStage;                    // 0 gerechneter Felsen, 1 Felsinsel (Bild), 2 Bühne (Vollbild)
uniform sampler2D uImg, uImgL, uDep, uSmoke;
uniform vec4 uRect;                    // Bild im Bildraum: links, unten, Breite, Höhe
uniform vec4 uSmk[5];                  // Rauchschwaden: x, y, Grösse, Deckkraft
uniform float uSmkI[5];                // welches der 8 Rauchbilder
uniform float uHasSmoke, uFade;
vec2 rectUV(vec2 q){ return vec2((q.x - uRect.x) / uRect.z, 1. - (q.y - uRect.y) / uRect.w); }

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
  // weiche Bewegung entlang der Linie: Spektrum (gespiegelt) + langsame Welle - keine Zacken
  p /= uSc * (1. + .025 * uKick);
  float a = atan(p.y, p.x) / 6.2831853 + .5;
  float wob = (band(abs(fract(a * 2.) * 2. - 1.)) - .45) * .016 * (.5 + .5 * min(uBassAtt, 2.))
            + .004 * sin(a * 18.849 + uT * 1.3) * min(uMidAtt, 2.);
  vec2 sa = shape(uShapeA, p), sb = shape(uShapeB, p);
  vec2 s = mix(sa, sb, uShapeM);
  float d = max(abs(s.x + wob), 0.) * uSc;
  float pulse = .75 + .45 * uPulse + .25 * min(uBass, 2.) * .5;
  float core = 1. - smoothstep(max(1.2 * uPx, .0012), max(2.6 * uPx, .0028), d);   // scharfe, geglättete Röhre
  vec3 c = mix(uNeon, vec3(1.), .6) * core * 1.1;
  c += uNeon * (exp(-d / .006) * .55 + exp(-d / .035) * .14 + exp(-d / .12) * .035) * pulse;   // Leuchten, weich auslaufend
  c += uNeon * s.y * .025 * pulse;                                               // Licht innen
  return c;
}

// Felsen: Grundform mit steilen Flanken, darauf Grate in mehreren Grössen (scharf, nicht weich)
float island(float x){
  float ax = abs(x);
  float mass = pow(max(0., 1. - pow(ax / .44, 2.)), .7);
  float r1 = 1. - abs(gnoise(vec2(x * 7., 1.3)));
  float r2 = 1. - abs(gnoise(vec2(x * 19., 4.1)));
  float n = .026 * r1 * r1 + .012 * r2 * r2 + .005 * gnoise(vec2(x * 55., 7.7)) + .0025 * gnoise(vec2(x * 140., 2.));
  return uHZ + .004 + mass * (.066 + n * 1.4) + (1. - mass) * n * .15;
}

// funkelnde Sterne (fein, wenige)
float stars(vec2 q){
  vec2 g = q * 180.;
  vec2 id = floor(g);
  float h = hash12(id);
  if (h < .986) return 0.;
  vec2 f = fract(g) - .5 - (vec2(hash12(id + 3.1), hash12(id + 7.7)) - .5) * .6;
  float tw = .55 + .45 * sin(uT * (1.5 + h * 3.) + h * 50.);
  return smoothstep(.14, 0., length(f)) * tw * (h - .986) * 70.;
}
// Rauchschwaden (Renders), vom Neon angeleuchtet: Licht im Dunst
vec3 smoke(vec2 q){
  if (uHasSmoke < .5) return vec3(0.);
  float a = 0.;
  for (int i = 0; i < 5; i++) {
    vec4 s = uSmk[i];
    if (s.w <= 0.) continue;
    vec2 r = (q - s.xy) / vec2(s.z, s.z * .5) + .5;
    if (r.x < 0. || r.y < 0. || r.x > 1. || r.y > 1.) continue;
    vec2 at = (vec2(mod(uSmkI[i], 4.), floor(uSmkI[i] / 4.)) + vec2(r.x, 1. - r.y)) / vec2(4., 2.);
    a += texture(uSmoke, at).a * s.w;
  }
  float near = exp(-length(q - uC) * 1.6);
  return a * (uNeon * (.03 + .09 * near) * (.8 + .4 * uPulse) + vec3(.006, .007, .01));
}

vec3 world(vec2 q){
  vec2 p = q - uC;
  vec3 col;
  if (uStage == 2) {
    // Bühne (Bild): das Neon ist das Hauptlicht. Das Mondlicht im Bild wirft Schatten in eine andere
    // Richtung - die werden aufgefüllt (dunkle Stellen bis fast zum Umfeld angehoben), dazu nur ein
    // weiches Grundlicht. So bleiben nur die Schatten vom Neon.
    vec2 tuv = rectUV(q);
    float dep = texture(uDep, tuv).r;
    vec3 bm = texture(uImg, tuv).rgb, bl = textureLod(uImg, tuv, 4.5).rgb;
    col = max(bm, bl * .92) * .26 + textureLod(uImg, tuv, 5.5).rgb * .16;
    col += texture(uImgL, tuv).rgb * uNeon * (.6 + .5 * uPulse + .2 * min(uBass, 2.));
    float sky = smoothstep(.97, .995, dep);
    col += vec3(.75, .8, 1.) * stars(q) * sky * .5;
    col += uNeon * exp(-length(p) * 2.6) * .025 * (.6 + .4 * uPulse);
  } else {
    // Nebel: dünn, zieht seitlich; Licht hinter der Form; Sterne oben
    float f = fbm(vec3(q * vec2(1.1, 2.4) + vec2(uT * .02, 0.), uT * .035));
    float near = exp(-length(p * vec2(.8, 1.)) * 2.);
    col = uNeon * (.004 + (.018 + .035 * min(uBassAtt, 2.) * .5) * smoothstep(-.2, .6, f) * (.25 + near));
    col += uNeon * exp(-length(p) * 3.2) * .05 * (.6 + .4 * uPulse);
    col += vec3(.7, .75, 1.) * stars(q) * smoothstep(0., .35, q.y) * .45;
  }
  col += neon(p);
  if (uStage == 1) {
    // Felsinsel (Bild): schwebt knapp über dem Wasser, Oberseite vom Neon angeleuchtet
    vec2 tuv = rectUV(q);
    if (tuv.x > 0. && tuv.y > 0. && tuv.x < 1. && tuv.y < 1.) {
      vec4 b = texture(uImg, tuv);
      vec3 l = texture(uImgL, tuv).rgb;
      vec3 isl = max(b.rgb, textureLod(uImg, tuv, 4.).rgb * .92) * .5 + textureLod(uImg, tuv, 5.).rgb * .3 + l * uNeon * (.7 + .55 * uPulse + .2 * min(uBass, 2.));
      col = mix(col, isl, b.a);
    }
  } else if (uStage == 0) {
    // gerechneter Felsen (solange keine Bilder da sind)
    float top = island(q.x);
    float edge = smoothstep(top + uPx, top - uPx, q.y) * step(uHZ - .001, q.y);
    if (edge > 0.) {
      float din = top - q.y;
      vec2 rq = q * vec2(26., 44.);
      float c1 = 1. - abs(gnoise(rq)); c1 *= c1;
      float c2 = 1. - abs(gnoise(rq * 2.3 + 5.)); c2 *= c2;
      float c3 = .5 + .5 * gnoise(rq * 6.1 + 9.);
      float tex = c1 * .55 + c2 * .3 + c3 * .15;
      float under = smoothstep(.52, .0, abs(q.x));
      float lit = exp(-din / .0025) * .85 + exp(-din / .015) * tex * tex * .12;
      vec3 rock = vec3(.0025, .0025, .003) * (.4 + 1.6 * tex) + uNeon * lit * under * (.55 + .5 * uPulse);
      col = mix(col, rock, edge);
    }
  }
  col += smoke(q);
  return col;
}

void main(){
  vec2 q = (uv - .5) * vec2(uAspect, 1.);
  vec3 col;
  if (uStage == 2 || q.y >= uHZ) col = world(q);
  else {
    float depth = uHZ - q.y;
    // Wellen: nahe am Horizont ruhig, weiter vorne stärker
    float rip = (gnoise(vec2(q.x * 14., q.y * 60. - uT * 1.2)) * .6 + .4 * sin(q.y * 120. + uT * 1.8)) * (.0008 + depth * .022);
    vec2 rq = vec2(q.x + rip, uHZ + depth + rip * .3);
    col = world(rq) * (.5 - depth * .55) + vec3(.003, .004, .006);
  }
  o = vec4(col * uFade, 1.);
}`),Be=[[1,.32,.03],[.08,.35,1],[.55,.12,1],[1,.05,.22],[.12,1,.2],[.05,.85,1],[1,.1,.8],[1,.78,.05]],We=[{name:"Felsinsel",kind:1,files:["felsinsel_basis.webp","felsinsel_neonlicht.webp"]},{name:"Wüste",kind:2,files:["wueste_basis.webp","wueste_neonlicht.webp","wueste_tiefe.webp"],free:[.5,.59],size:.74,ground:.3},{name:"Ruinen",kind:2,files:["ruinen_basis.webp","ruinen_neonlicht.webp","ruinen_tiefe.webp"],free:[.505,.585],size:.68,ground:.3}],Sn="rauch_atlas.webp";function En(e,t){const a=ce(e,yn);let o=null,s=[...Be[0]],n=[...Be[0]],i=[...Be[0]],r=1,c=0,u=0,f=0,l=1,h=null;const d=We.map(m=>rt(e,m.files.map(v=>({name:v,srgb:!v.includes("tiefe")})))),b=rt(e,[{name:Sn}]);let S=0,P=-1,A=1,q=0;const _=Array.from({length:5},(m,v)=>({x:v/5*2-1,y:0,size:.7,a:0,img:v,v:.01})),Q=(m,v,F,O)=>{m.img=3+Math.floor(Math.random()*5),m.size=.55+Math.random()*.45,m.v=(Math.random()<.5?-1:1)*(.008+Math.random()*.012),m.a=.16+Math.random()*.2,m.x=O?(Math.random()*2-1)*F*.5:m.v>0?-F*.5-m.size*.5:F*.5+m.size*.5,m.yr=Math.random()};_.forEach(m=>Q(m,null,1.78,!0));const M=De(Be.length),x=Ne({beats:64,minSec:40,maxSec:90}),I=()=>{let m=M.next();m===c&&(m=M.next()),c=m,n=[...s],i=[...Be[c]],r=0},y=()=>{u=f,f=(f+1+Math.floor(Math.random()*4))%5,l=0};return{look:{linear:!0,bloom:.42,scale:1,expo:.95,full:!0},label:"center",keys:{m:()=>(y(),"Form gewechselt"),p:()=>(I(),"Farbe gewechselt"),b:()=>(S=(S+1)%We.length,`Bühne: ${We[S].name}`)},help:"M Form · P Farbe · B Bühne",resize(m,v){o&&o.dispose(),o=ge(e,m,v,t)},render(m,v){const F=m.dt;if(h!==v.seed){const C=h===null;h=v.seed;const W=Math.floor(v.seed*97)%5;S=Math.floor(v.seed*61)%We.length,C?(u=f=W,c=Math.floor(v.seed*Be.length),s=[...Be[c]],i=[...s],r=1):W!==f&&(u=f,f=W,l=0)}x.tick(m,F)&&I(),r=Math.min(1,r+F/1.5),l=Math.min(1,l+F/1.2);const O=r*r*(3-2*r);s=n.map((C,W)=>C+(i[W]-C)*O);const K=d[S].get();S!==P&&K&&q===0&&(q=-1),q<0?(A=Math.max(0,A-F/.35),A===0&&(P>=0&&P!==S&&d[P].release(),P=d[S].get()?S:P,q=1)):q>0&&(A=Math.min(1,A+F/.6),A===1&&(q=0));const w=v.aspect,k=P>=0?We[P]:null,R=P>=0?d[P].get():null,H=b.get();let p=R?k.kind:0,z=-.17,X=[0,.1],g=1,T=[0,0,1,1];if(p===1)T=[-.75,-.38,1.5,.5],z=-.34,X=[0,.17],g=.7;else if(p===2){const C=1.7777777777777777,W=Math.max(w,C),V=W/C;T=[-W/2,-V/2,W,V],z=-9,X=[T[0]+k.free[0]*W,T[1]+k.free[1]*V],g=k.size*V}for(const C of _)C.x+=C.v*F,Math.abs(C.x)>w*.5+C.size*.6&&Q(C,k,w,!1);const Y=[],se=[];for(const C of _){const W=p===2?T[1]+T[3]*(k.ground-.12+C.yr*.16):p===1?-.34+C.yr*.26:-.2+C.yr*.15;Y.push(C.x,W,C.size,H?C.a*(p===0?.6:1):0),se.push(C.img)}e.bindFramebuffer(e.FRAMEBUFFER,o.fb),e.viewport(0,0,o.w,o.h),e.useProgram(a.p),Re(e,a,m,v),e.uniform3fv(a.u.uNeon,s),e.uniform1i(a.u.uShapeA,u),e.uniform1i(a.u.uShapeB,f),e.uniform1f(a.u.uShapeM,l*l*(3-2*l)),e.uniform1f(a.u.uPx,1/o.h),e.uniform1i(a.u.uStage,p),e.uniform1f(a.u.uHZ,z),e.uniform2fv(a.u.uC,X),e.uniform1f(a.u.uSc,g),e.uniform4fv(a.u.uRect,T),e.uniform4fv(a.u.uSmk,Y),e.uniform1fv(a.u.uSmkI,se),e.uniform1f(a.u.uHasSmoke,H?1:0),e.uniform1f(a.u.uFade,A);const $=(C,W,V)=>{a.u[C]!=null&&(e.activeTexture(e.TEXTURE0+V),e.bindTexture(e.TEXTURE_2D,W),e.uniform1i(a.u[C],V))};return $("uImg",R?R[0]:null,0),$("uImgL",R?R[1]:null,1),$("uDep",R&&R[2]?R[2]:null,2),$("uSmoke",H?H[0]:null,3),e.activeTexture(e.TEXTURE0),e.bindVertexArray(v.quadVao),e.drawArrays(e.TRIANGLES,0,3),o.tex},info:()=>`${P>=0?We[P].name:"Felsen"} (B)`,debug(m){m.stage!=null&&(S=m.stage)},dispose(){o&&o.dispose();for(const m of d)m.release();b.release(),e.deleteProgram(a.p)}}}const Tn=`#version 300 es
precision mediump float;
in vec3 vc; out vec4 o;
void main(){ float d = length(gl_PointCoord - .5) * 2.; o = vec4(vc * smoothstep(1., .2, d), 1.); }`,Rn=me(`
uniform sampler2D uPrev; uniform float uDecay;
void main(){ o = vec4(max(texture(uPrev, uv).rgb * uDecay - .002, 0.), 1.); }`),qt=64e3,gn=`#version 300 es
${Xe}
${Lt}
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
  int i = gl_VertexID;
  float fi = float(i) + .5;
  float y = 1. - 2. * fi / ${qt}.;
  float rr = sqrt(max(0., 1. - y * y)), phi = fi * 2.39996323;
  vec3 dir = vec3(cos(phi) * rr, y, sin(phi) * rr);
  vec3 jit = hash33(vec3(fi, 1., 3.));
  dir = normalize(dir + jit * .004);     // gegen Moiré
  float sh = 0.;
  float lat = y * .5 + .5;
  float e = band(.04 + lat * .86);
  float ang = acos(clamp(dir.y, -1., 1.));
  float rip = exp(-pow((ang - uRip) * 4., 2.)) * uRipAmp;
  // Übergang als Welle von oben nach unten; die Punkte schwingen dabei kurz nach aussen
  float mm = clamp(uMorph * 1.7 - ((1. - lat) * .6 + (jit.x * .5 + .5) * .1), 0., 1.);
  mm = mm * mm * (3. - 2. * mm);
  vec3 P = mix(variant(uVa, dir, sh, e, rip), variant(uVb, dir, sh, e, rip), mm);
  P += dir * sin(mm * 3.1415927) * .22;
  P = rotY(uT * .05) * rotX(.35 + .1 * sin(uT * .05)) * P;
  vec4 clip = uVP * vec4(P, 1.);
  gl_Position = clip;
  gl_PointSize = clamp(1.5 * uPx / clip.w, 1., 3.5);
  // Rückseite fast ganz aus: sonst sieht man zwei Schichten übereinander
  float facing = dot(normalize(P), normalize(uEye - P));
  float b = (.015 + .985 * smoothstep(-.1, .8, facing)) * (.4 + .5 * e + .3 * rip);
  vc = mix(vec3(1.), pal(lat * .7), uTint) * b * .3;
}`,nt=240,wt=150,Pn=`#version 300 es
${Xe}
${Lt}
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
float mm;
vec4 pos(float u, float v){ vec4 p = mix(variant(uVa, u, v), variant(uVb, u, v), mm); p.y += sin(mm * 3.1415927) * .3; return p; }
void main(){
  int id = gl_VertexID, ix = id % ${nt}, iz = id / ${nt};
  float u = float(ix) / ${nt-1}., v = float(iz) / ${wt-1}.;
  // Übergang läuft als Welle von vorne nach hinten über die Fläche
  mm = clamp(uMorph * 1.6 - (v * .5 + hash12(vec2(u, v) * 91.) * .1), 0., 1.);
  mm = mm * mm * (3. - 2. * mm);
  vec4 P = pos(u, v);
  vec3 px = pos(u + 1. / ${nt}., v).xyz, pz = pos(u, v + 1. / ${wt}.).xyz;
  vec3 nrm = normalize(cross(pz - P.xyz, px - P.xyz));
  if (nrm.y < 0.) nrm = -nrm;
  vec4 clip = uVP * vec4(P.xyz, 1.);
  gl_Position = clip;
  gl_PointSize = clamp((2. + 2.5 * P.w) * uPx / clip.w, 1., 6.);
  float light = .18 + .82 * pow(max(0., dot(nrm, normalize(vec3(-.55, .75, -.4)))), 1.5);
  float dist = length(P.xyz - vec3(0., 0., 2.));
  float fade = exp(-max(0., P.z) * .2) * smoothstep(0., .06, v) * smoothstep(1., .9, v);
  vc = mix(vec3(1.), pal(u * .5 + v * .3 + P.w * .3), uTint) * (light * .55 + P.w * 1.4) * fade * .6;
}`;function Dt(e,t,a,o,s){const n=ce(e,Tn,a),i=ce(e,Rn),r=e.createVertexArray();let c=null,u=null,f=0;return{resize(l,h){c&&c.dispose(),u&&u.dispose(),c=Bt(e,l,h,t),u=ge(e,l,h,t)},tint(l){f=l},render(l,h,d){return e.bindFramebuffer(e.FRAMEBUFFER,c.dst.fb),e.viewport(0,0,c.dst.w,c.dst.h),e.useProgram(i.p),xe(e,i,"uPrev",c.src.tex,0),e.uniform1f(i.u.uDecay,Math.pow(d,l.dt*60)),e.bindVertexArray(h.quadVao),e.drawArrays(e.TRIANGLES,0,3),e.useProgram(n.p),Re(e,n,l,h),e.uniform1f(n.u.uPx,c.dst.h/240),e.uniform1f(n.u.uTint,f),s(n),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE),e.bindVertexArray(r),e.drawArrays(e.POINTS,0,o),e.disable(e.BLEND),c.swap(),c.src.tex},dispose(){c&&c.dispose(),u&&u.dispose(),e.deleteVertexArray(r),e.deleteProgram(n.p),e.deleteProgram(i.p)}}}const Te=[{name:"Weiss",v:0},{name:"Hauch Farbe",v:.35},{name:"Cover-Farben",v:.85}];function Nt(e,t,a=6){let o=0,s=0,n=1,i=-1e9,r=0,c=De(e);const u=Ne({beats:64,minSec:45,maxSec:100}),f=l=>{o=s,s=l,n=0,u.reset()};return{tick(l,h){if(r+=h,u.tick(l,h)&&n>=1&&r-i>120){let d=c.next();d===s&&(d=c.next()),f(d)}return n=Math.min(1,n+h/a),{a:o,b:s,m:n}},next(){return i=r,f((s+1)%e),`Muster: ${t[s]}`},name:()=>t[s],seed(l){s=Math.floor(l*e)%e,o=s,n=1;let h=Math.floor(l*1e6)||1;c=De(e,()=>(h=h*16807%2147483647)/2147483647),u.reset()}}}function An(e,t){let a=0,o=9,s=0,n=0,i=null,r=[0,0,3.4],c=0,u=null,f={a:0,b:0,m:1};const l=Nt(4,["gefaltet","Stacheln","Ringe","Blüte"]),h=Dt(e,t,gn,qt,d=>{e.uniformMatrix4fv(d.u.uVP,!1,i),e.uniform1f(d.u.uRip,o),e.uniform1f(d.u.uRipAmp,s),e.uniform3fv(d.u.uEye,r),e.uniform1i(d.u.uVa,f.a),e.uniform1i(d.u.uVb,f.b),e.uniform1f(d.u.uMorph,f.m)});return{look:{linear:!0,bloom:.45,scale:1},keys:{p:()=>(c=(c+1)%Te.length,h.tint(Te[c].v),`Farbe: ${Te[c].name}`),m:()=>l.next()},resize:(d,b)=>h.resize(d,b),render(d,b){return a+=d.dt,u!==b.seed&&(u=b.seed,l.seed(b.seed)),f=l.tick(d,d.dt),d.events.kick!==n&&(n=d.events.kick,o=0,s=1),o+=d.dt*2.6,s*=Math.exp(-d.dt*1.6),r=[0,.15*Math.sin(a*.07),3.6],i=yt(Mt(40*Math.PI/180,b.aspect,.1,20),kt(r,[0,0,0])),h.render(d,b,0)},info:()=>`${l.name()} (M) · ${Te[c].name} (P)`,dispose:()=>h.dispose()}}const At=[[1.25,-1.5,-.2,2.8],[2.7,-.25,-.35,2.3],[2,-.7,-.25,2.4],[.95,-1.25,0,3]];function Fn(e,t){let a=0,o=9,s=0,n=0,i=null,r=2,c=null,u={a:0,b:0,m:1};const f=Nt(4,["Stoff","Spirale","Ringe","Landschaft"]),l=Dt(e,t,Pn,nt*wt,h=>{e.uniformMatrix4fv(h.u.uVP,!1,i),e.uniform1f(h.u.uKickR,o),e.uniform1f(h.u.uKickAmp,s),e.uniform1i(h.u.uVa,u.a),e.uniform1i(h.u.uVb,u.b),e.uniform1f(h.u.uMorph,u.m)});return l.tint(Te[r].v),{look:{linear:!0,bloom:.5,scale:1},keys:{p:()=>(r=(r+1)%Te.length,l.tint(Te[r].v),`Farbe: ${Te[r].name}`),m:()=>f.next()},resize:(h,d)=>l.resize(h,d),render(h,d){a+=h.dt,c!==d.seed&&(c=d.seed,f.seed(d.seed)),u=f.tick(h,h.dt),h.events.kick!==n&&(n=h.events.kick,o=0,s=1),o+=h.dt*2.2,s*=Math.exp(-h.dt*1.4);const b=At[u.a],S=At[u.b],P=u.m*u.m*(3-2*u.m),A=b.map((Q,M)=>Q+(S[M]-Q)*P),q=Math.sin(a*.05)*.3,_=[q,A[0]+.08*Math.sin(a*.04),A[1]];return i=yt(Mt(50*Math.PI/180,d.aspect,.05,30),kt(_,[q*.3,A[2],A[3]])),l.render(h,d,.45)},info:()=>`${f.name()} (M) · ${Te[r].name} (P)`,dispose:()=>l.dispose()}}function it(e,t,a,{look:o,label:s,keys:n,help:i,info:r,before:c,setup:u,debug:f}){const l=ce(e,a);let h=null;return{look:o,label:s,keys:n,help:i,info:r,debug:f,resize(d,b){h&&h.dispose(),h=ge(e,d,b,t)},render(d,b){return c&&c(d,b),e.bindFramebuffer(e.FRAMEBUFFER,h.fb),e.viewport(0,0,h.w,h.h),e.useProgram(l.p),Re(e,l,d,b),u&&u(l,d,b),e.bindVertexArray(b.quadVao),e.drawArrays(e.TRIANGLES,0,3),h.tex},dispose(){h&&h.dispose(),e.deleteProgram(l.p)}}}const zn=me(`
uniform float uSpeed, uTwist, uRing, uRingDepth, uRoll, uSides, uPoly, uRails, uSpiral, uSecFlash, uWarp, uHue, uBreath, uBend;
uniform vec4 uSpark[8];                // Funken: Schiene (0..Schienen), Tiefe z, Helligkeit, Farbton
float near(float x){ return abs(fract(x + .5) - .5); }
// Mittellinie des Tunnels: weite Kurven nach links/rechts und oben/unten (uBend: wie kurvig)
vec2 path(float s){ return uBend * vec2(sin(s * .21) * 2.4 + sin(s * .083) * 1.9, sin(s * .16 + 1.) * 1.6 + cos(s * .059) * 1.2); }
// Querschnitt: Kreis, mit uPoly zu einem Vieleck (uSides Ecken) überblendet
float shapeR(float a){
  float seg = 6.2831853 / uSides;
  float b = mod(a + 3.1415927, seg) - seg * .5;
  return mix(1., cos(seg * .5) / cos(b), uPoly);
}
void main(){
  vec2 p = (uv - .5) * vec2(uAspect, 1.);
  float cr = cos(uRoll), sr = sin(uRoll);
  p = mat2(cr, -sr, sr, cr) * p;
  // Tiefe d zu jedem Bildpunkt: Wand des gebogenen Tunnels (Kamera schaut entlang der Kurve)
  float rad = .3 * (1. + uBreath);
  vec2 c0 = path(uSpeed), t0 = (path(uSpeed + .01) - path(uSpeed - .01)) / .02;
  vec2 q = p;
  float d = rad / max(length(p), 1e-3);
  float dPrev = d;
  // gedämpft nähern: in starken Kurven springt die Tiefe sonst hin und her (Gewirr in der Ferne)
  for (int i = 0; i < 7; i++) {
    vec2 off = (path(uSpeed + d) - c0 - t0 * d) * .3 / d;
    q = p - off;
    dPrev = d;
    d = mix(d, min(rad * shapeR(atan(q.y, q.x)) / max(length(q), 1e-3), 40.), .7);
  }
  float conv = abs(d - dPrev) / max(d, 1e-3);   // nicht eingependelt: dort nur Nebel zeigen
  float a = atan(q.y, q.x);
  float z = d + uSpeed;
  // rundum-Koordinate u (0..1); alles, was davon abhängt, ist periodisch - keine Naht links
  float u = a / 6.2831853 + .5 + uTwist + uSpiral * z * .05 + .04 * sin(z * .3);
  float zr = z * 1.4, ur = u * uRails;
  // Ableitungen ohne Sprung an der Naht (Winkel springt von +pi auf -pi)
  float fz = max(fwidth(zr), 1e-3);
  float fu = max(min(fwidth(ur), fwidth(fract(u + .5) * uRails)), 1e-3);
  // Warp: Ringe ziehen Schlieren, Schienen werden zu Lichtstreifen
  float fzw = fz * (1. + uWarp * 10.);
  float ring = (smoothstep(fzw * 2., 0., near(zr)) + .25 * exp(-near(zr) * 10.)) / (1. + uWarp * 3.);
  float rail = (smoothstep(fu * 2., 0., near(ur)) + .2 * exp(-near(ur) * 10.)) * (1. + uWarp * .8);
  // in der Tiefe (Linien enger als ein paar Bildpunkte): Muster zum Mittelwert ausblenden statt flimmern
  float tiny = smoothstep(.15, .45, max(fz, fu));
  ring = mix(ring, .3, smoothstep(.15, .45, fz));
  rail = mix(rail, .3, smoothstep(.15, .45, fu));
  vec2 cell = vec2(mod(floor(ur), uRails), floor(zr));
  float h = hash12(cell + floor(uHue * 7.));
  float ce = band(fract(h + .13));
  float panel = pow(ce, 3.) * .5 * (1. - tiny);
  float e = band(fract(z * .04));
  float hu = uHue + z * .02 + .12 * sin(6.2831853 * u);
  vec3 base = pal(hu);
  vec3 col = base * (ring * (.35 + 1.1 * e) + rail * (.25 + .6 * ce)) + pal(h * .5 + .2 + uHue) * panel;
  // Funken: rasen auf einer Schiene auf einen zu, mit Schweif in die Tiefe
  for (int k = 0; k < 8; k++) {
    vec4 s = uSpark[k];
    if (s.z <= 0.) continue;
    float du = abs(mod(ur - s.x + uRails * .5, uRails) - uRails * .5);
    float dz = z - s.y;
    float g = exp(-du * 9.) * (dz > 0. ? exp(-dz * 1.1) : exp(dz * 9.));
    col += mix(pal(s.w), vec3(1.), .3) * g * s.z * 1.3;
  }
  // Kick-Ring: kommt aus der Tiefe auf einen zu
  col += mix(vec3(1.), base, .35) * exp(-abs(z - uRingDepth) * 7.) * uRing * 1.3;
  // Abschnittswechsel: kurzes Aufleuchten
  col += base * uSecFlash * .35;
  // Nebel in der Tiefe: dunkel, mit weichem, rundem Licht am Ende des Tunnels (um dessen Mitte,
  // nicht entlang der Wände - sonst zeichnete der Nebel die Form als flache Fläche nach)
  float far = max(smoothstep(4., 12., d), smoothstep(.01, .08, conv));
  vec3 endc = pal(.1 + uHue) * (.03 + .45 * exp(-length(q) * 9.)) * (.6 + .4 * min(uBassAtt, 2.) + uWarp * .5);
  col = mix(col, endc, far);
  o = vec4(col, 1.);
}`);function Bn(e,t){let a=0,o=0,s=0,n=0,i=0,r=0,c=0,u=0,f=0,l=0,h=1;const d=[6,4,8,3],b=[20,16,24,12];let S=6,P=0,A=0,q=20,_=0,Q=0,M=0,x=0,I=1,y=1,m=0,v=0,F=-99,O=1,K=1,w=0,k=0;const R=Array.from({length:8},()=>({rail:0,z:0,b:0,hue:0})),H=new Float32Array(32),p=Ne({beats:32,minSec:12,maxSec:28}),z=g=>[I*(Math.sin(g*.21)*2.4+Math.sin(g*.083)*1.9),I*(Math.sin(g*.16+1)*1.6+Math.cos(g*.059)*1.2)],X=g=>{m=1;const T=g?[0,1,2,3]:[[0],[1],[2],[3],[4]][Math.floor(Math.random()*5)];for(const Y of T)if(Y===0)A>.5&&Math.random()<.4?A=0:(S=d[Math.floor(Math.random()*d.length)],A=1);else if(Y===1){let se=q;for(;se===q;)se=b[Math.floor(Math.random()*b.length)];q=se}else Y===2?Q=Math.random()<.4?0:(Math.random()<.5?-1:1)*(.5+Math.random()*.7):Y===3?x+=.2+Math.random()*.35:Y===4&&(f=u,l=u+(Math.random()<.5?-1:1)*Math.PI*2,h=0);y=.7+Math.random()*.8};return it(e,t,zn,{look:{linear:!0,bloom:.7,scale:1},before(g){const T=g.dt;k+=T;const Y=(Math.min(3,g.bassAtt)+Math.min(3,g.midAtt))/2;O+=(Y-O)*(1-Math.exp(-T/.25)),K+=(Y-K)*(1-Math.exp(-T/6)),g.playing&&O>K*1.45&&O>1.15&&k-F>10&&(F=k,v=1,X(!0)),v*=Math.exp(-T/1.3);const se=g.conf>.4?g.bpm/60*.72:.6+.8*Math.min(2,g.bassAtt);if(a+=T*se*(1+2.2*v)*(g.playing?1:.15),o+=T*.02*(g.midAtt-.9),g.events.kick!==i&&(i=g.events.kick,s=1,n=a+7),s*=Math.exp(-T*1.8),g.events.onset!==r){r=g.events.onset;const J=R.reduce((he,E)=>E.b<he.b?E:he,R[0]);J.rail=Math.floor(Math.random()*q),J.z=a+10+Math.random()*4,J.b=.6+.4*Math.min(1,g.onset),J.hue=M+Math.random()*.4}for(const J of R)J.z-=T*(5+6*v),J.z<a+.3&&(J.b=0),J.b*=Math.exp(-T*.35);w+=(.07*Math.min(2,g.bass)-.04-w)*(1-Math.exp(-T*10));const $=z(a-.05),C=z(a+.05),V=(z(a+1.5)[0]-C[0])/1.45-(C[0]-$[0])/.1;if(c+=(Math.max(-.85,Math.min(.85,-V*.5))-c)*(1-Math.exp(-T*2)),h<1){h=Math.min(1,h+T/2.6);const J=h*h*(3-2*h);u=f+(l-f)*J}p.tick(g,T)&&X(!1),m*=Math.exp(-T/.25),P+=(A-P)*(1-Math.exp(-T*.8)),_+=(Q-_)*(1-Math.exp(-T*.5)),M+=(x-M)*(1-Math.exp(-T*.8)),I+=(y-I)*(1-Math.exp(-T*.25))},setup(g){e.uniform1f(g.u.uSpeed,a),e.uniform1f(g.u.uTwist,o),e.uniform1f(g.u.uRing,s),e.uniform1f(g.u.uRingDepth,n),e.uniform1f(g.u.uRoll,c+u),e.uniform1f(g.u.uSides,S),e.uniform1f(g.u.uPoly,P),e.uniform1f(g.u.uRails,q),e.uniform1f(g.u.uSpiral,_),e.uniform1f(g.u.uSecFlash,m),e.uniform1f(g.u.uWarp,v),e.uniform1f(g.u.uHue,M),e.uniform1f(g.u.uBreath,w),e.uniform1f(g.u.uBend,I),R.forEach((T,Y)=>H.set([T.rail,T.z,T.b>.02?T.b:0,T.hue],Y*4)),e.uniform4fv(g.u.uSpark,H)},debug(g){g.warp&&(v=1,X(!0)),g.section&&X(!1),g.spin&&(f=u,l=u+Math.PI*2,h=0)}})}const Ln=me(`
uniform float uMove, uSun, uWave, uShoot, uShootY;
uniform vec3 uGrid, uRim, uSunA, uSunB, uSky;
float near(float x){ return abs(fract(x + .5) - .5); }
const float HMAX = 1.9;     // höchster Berg
const float ROAD = 1.15;    // halbe Breite der flachen Mitte (dort keine Berge)
// Landschaft: flache Strasse in der Mitte, Berge an den Seiten; Höhe atmet mit dem Spektrum
float hgt(vec2 p){
  // Das Tal wird mit der Entfernung breiter (im Bild gleich breit): die Mitte unter der Sonne bleibt
  // frei, die Berge laufen zu beiden Seiten sauber bis zum Horizont. Feine Zacken nur in der Nähe.
  float dz = max(p.y - uMove, 0.);
  float W = max(ROAD, .17 * dz);
  float side = smoothstep(W, W * 1.6 + 1.6, abs(p.x));
  if (side <= 0.) return 0.;
  float n = gnoise(p * vec2(.26, .19)) * .5 + .5;
  float n2 = (gnoise(p * vec2(.8, .6) + 7.) * .5 + .5) * (1. - smoothstep(12., 30., dz));
  float b = band(clamp(abs(p.x) / (11. + .2 * dz), 0., 1.));
  float raw = side * (n * 1.15 + n2 * .3) * (.3 + 1.1 * b);
  return HMAX * (1. - exp(-raw / HMAX));          // weich begrenzt: keine flachen Plateaus
}
void main(){
  // Horizont genau in der Bildmitte, Kamera schaut geradeaus (Strasse und Sonne mittig)
  vec2 q = (uv - .5) * vec2(uAspect, 1.);
  vec3 ro = vec3(0., .5, uMove);
  vec3 rd = normalize(vec3(q.x, q.y, 1.2));
  float px = 1. / uRes.y;
  // --- Himmel: Verlauf (am Horizont = Dunst der Ferne), Sterne, Sonne mit Streifen, Sternschnuppe
  vec3 hor = uSky * 1.1;
  vec3 col = mix(hor, uSky * .08, smoothstep(0., .42, q.y));
  vec2 g = floor(q * 260.);
  float st = step(.9965, hash12(g)) * smoothstep(.1, .3, q.y);
  col += vec3(.9) * st * (.55 + .45 * sin(uT * 3. + hash12(g + 3.) * 40.));
  vec2 sp = q - vec2(0., .085);
  float R = .155 * (1. + .03 * uSun);
  float sd = length(sp);
  float k = clamp((sp.y + R) / (2. * R), 0., 1.);
  // Streifen in der unteren Hälfte: scharf, werden nach unten breiter, wandern langsam abwärts
  float sy = sp.y / R * 5.5 + uT * .3;
  float gap = smoothstep(.72, .05, k) * .62;
  float aa = fwidth(sy) * .75;
  float stripe = smoothstep(gap - aa, gap + aa, fract(sy));
  float disc = smoothstep(R + px, R - px, sd) * stripe;
  col = mix(col, mix(uSunA, uSunB, k * k) * 1.05, disc);
  col += uSunA * exp(-max(sd - R, 0.) * 9.) * .09 * (1. + uSun) * step(0., q.y);
  if (uShoot > 0. && uShoot < 1.) {
    vec2 a0 = vec2(mix(-1.1, 1.1, uShoot) * uAspect * .5, uShootY - uShoot * .12);
    vec2 dir = normalize(vec2(1., -.11));
    vec2 rel = q - a0;
    float along = dot(rel, -dir), across = abs(dot(rel, vec2(-dir.y, dir.x)));
    col += vec3(1.) * smoothstep(px * 2., 0., across) * smoothstep(.25, 0., along) * step(0., along) * sin(uShoot * 3.1416);
  }
  // --- Boden: Ebene genau ausrechnen; Berge nur dort abtasten, wo es welche gibt (seitlich)
  const float FAR = 70.;
  float tP = rd.y < -1e-5 ? ro.y / -rd.y : 1e9;         // Ebene y = 0
  float tEnd = min(tP, FAR);
  if (rd.y > 1e-5) tEnd = min(tEnd, (HMAX - ro.y) / rd.y); // darüber gibt es nichts mehr
  float tS = abs(rd.x) > 1e-5 ? ROAD / abs(rd.x) : 1e9;   // ab hier seitlich Berge möglich (Tal mind. ROAD breit)
  bool hit = false;
  float t = tP;
  if (tS < tEnd) {
    float t0 = tS, t1 = tS;
    for (int i = 0; i < 110; i++) {
      vec3 p = ro + rd * t1;
      float dh = p.y - hgt(p.xz);
      if (dh < 0.) { hit = true; break; }
      t0 = t1;
      if (t1 >= tEnd) break;
      t1 = min(t1 + max(dh * .4, .015 + t1 * .007), tEnd);
    }
    if (hit) {
      // Kante genau suchen (scharfe Bergkämme)
      for (int i = 0; i < 8; i++) {
        float tm = (t0 + t1) * .5;
        vec3 p = ro + rd * tm;
        if (p.y - hgt(p.xz) < 0.) t1 = tm; else t0 = tm;
      }
      t = t1;
    }
  }
  if (!hit && tP < 1e8) { hit = true; t = tP; }
  if (hit) {
    vec3 p = ro + rd * t;
    vec2 w = p.xz;
    vec2 fw = max(fwidth(w), vec2(1e-4));
    // Linien: scharf, in der Ferne (feiner als ein Bildpunkt) ausgeblendet statt flimmernd
    float lx = smoothstep(fw.x * 1.5, fw.x * .3, near(w.x)) * (1. - smoothstep(.12, .45, fw.x));
    float lz = smoothstep(fw.y * 1.5, fw.y * .3, near(w.y)) * (1. - smoothstep(.12, .45, fw.y));
    float line = max(lx, lz);
    float wave = exp(-abs(w.y - uWave) * 1.2) * 1.2;
    float h = hgt(w);
    // ferne Berghänge: Rasterlinien ausblenden (sonst Zickzack an den Kämmen am Horizont)
    line *= 1. - smoothstep(22., 40., t) * smoothstep(.02, .2, h);
    vec3 ground = uSky * .035 + uGrid * line * (.5 + .45 * uPulse + wave);
    ground += uRim * smoothstep(.5, 1.6, h) * line * .5;               // Bergkämme heller
    ground += uGrid * exp(-t * .5) * .02;
    ground += uSunA * exp(-abs(q.x) * 16.) * smoothstep(-.25, 0., q.y) * .25;  // Sonne spiegelt sich
    // Dunst: die Ferne wird dunkel (die Sonne geht hinter einem dunklen Horizont unter, kein Farbband davor)
    col = mix(ground, uSky * .3 + uSunA * .015, smoothstep(14., FAR, t));
  }
  o = vec4(col, 1.);
}`),tt=[{grid:[1,.08,.75],rim:[.1,.85,1],sunA:[1,.12,.45],sunB:[1,.85,.2],sky:[.35,.03,.28]},{grid:[.05,.85,1],rim:[.9,.3,1],sunA:[1,.35,.1],sunB:[1,.9,.35],sky:[.12,.03,.35]},{grid:[1,.35,.05],rim:[1,.85,.3],sunA:[.9,.08,.2],sunB:[1,.75,.3],sky:[.05,.05,.3]},{grid:[.2,1,.45],rim:[.2,.8,1],sunA:[.1,.6,1],sunB:[.75,1,.9],sky:[.02,.12,.2]}];function _n(e,t){let a=0,o=-99,s=0,n=0,i=0,r=.35,c=0,u=0,f=1;const l=Ne({beats:64,minSec:45,maxSec:100}),h=(d,b,S)=>d.map((P,A)=>P+(b[A]-P)*S);return it(e,t,Ln,{look:{linear:!0,bloom:.45,scale:1},keys:{p:()=>(u=c,c=(c+1)%tt.length,f=0,l.reset(),"Farben gewechselt")},help:"P Farben",before(d){const b=d.conf>.4?d.bpm/60:1.2;a+=d.dt*b*1.1*(d.playing?1:.2),d.events.kick!==s&&(s=d.events.kick,o=a+1.5),o+=d.dt*9,d.events.onset!==n&&(n=d.events.onset,i<=0&&Math.random()<.06&&(i=.001,r=.24+Math.random()*.16)),i>0&&(i=i+d.dt*.9>1?0:i+d.dt*.9),l.tick(d,d.dt)&&(u=c,c=(c+1+Math.floor(Math.random()*(tt.length-1)))%tt.length,f=0),f=Math.min(1,f+d.dt/4)},setup(d,b){e.uniform1f(d.u.uMove,a),e.uniform1f(d.u.uSun,b.pulse),e.uniform1f(d.u.uWave,o),e.uniform1f(d.u.uShoot,i),e.uniform1f(d.u.uShootY,r);const S=tt[u],P=tt[c],A=f*f*(3-2*f);for(const[q,_]of[["uGrid","grid"],["uRim","rim"],["uSunA","sunA"],["uSunB","sunB"],["uSky","sky"]])e.uniform3fv(d.u[q],h(S[_],P[_],A))}})}const qn=me(`
uniform vec3 uDir[32];
uniform float uB[32];
const float W = .13, EPS = .022;     // Breite der Flanke, Rundung der Spitze (Bogenmass)
void main(){
  float lon = (uv.x * 2. - 1.) * 3.1415927, lat = (uv.y - .5) * 3.1415927;
  vec3 n = vec3(cos(lat) * cos(lon), sin(lat), cos(lat) * sin(lon));
  float h = 0.;
  vec3 g = vec3(0.);
  for (int k = 0; k < 32; k++) {
    float c = clamp(dot(n, uDir[k]), -1., 1.);
    float th = acos(c);
    if (th > 1.3) continue;
    float r = sqrt(th * th + EPS * EPS);
    float pr = uB[k] * exp(-(r - EPS) / W);
    h += pr;
    // bergauf zeigt zur Spitze: Ableitung nach dem Winkel mal Richtung zur Spitze auf der Kugel
    g += pr * th / (W * r) * (uDir[k] - c * n) / max(sin(th), 1e-4);
  }
  o = vec4(h * .5, g / 32. + .5);
}`),Dn=me(`
uniform sampler2D uSpk, uEnv;
uniform mat3 uRotM;
uniform float uR, uHasEnv, uEnvRot, uHS;
// Studio-Umgebung (Render, HDR als RGBE): vier Nachbarn lesen, entpacken, mischen
vec3 rgbe(ivec2 p){ vec4 t = texelFetch(uEnv, p, 0); return t.rgb * exp2(t.a * 255. - 128.); }
vec3 envTex(vec3 d){
  ivec2 sz = textureSize(uEnv, 0);
  vec2 f = vec2(fract(atan(d.z, d.x) / 6.2831853 + .5 + uEnvRot), acos(clamp(d.y, -1., 1.)) / 3.1415927) * vec2(sz) - .5;
  ivec2 i0 = ivec2(floor(f));
  vec2 k = fract(f);
  int x0 = (i0.x + sz.x) % sz.x, x1 = (i0.x + 1 + sz.x) % sz.x;
  int y0 = clamp(i0.y, 0, sz.y - 1), y1 = clamp(i0.y + 1, 0, sz.y - 1);
  return mix(mix(rgbe(ivec2(x0, y0)), rgbe(ivec2(x1, y0)), k.x), mix(rgbe(ivec2(x0, y1)), rgbe(ivec2(x1, y1)), k.x), k.y);
}
vec3 env(vec3 d){
  // dunkles Studio: Leiste oben, zwei senkrechte hinten, weiche Fläche oben
  float top = smoothstep(.02, 0., abs(d.y - .55)) * smoothstep(.9, .3, abs(d.x));
  float side = smoothstep(.04, 0., abs(abs(atan(d.x, d.z)) - 2.3)) * smoothstep(-.2, .2, d.y);
  float soft = smoothstep(.75, .98, d.y);
  return vec3(1.) * (top * 2.5 + side * 1.8 + soft * .6) + pal(.6) * .03;
}
float wob(vec3 po){ return .022 * noise3(po * 3. + uT * .3); }
// Abstand zur Oberfläche (Näherung) und Gefälle in Weltkoordinaten - ohne Nachbar-Abfragen
float field(vec3 p, out vec3 gw){
  vec3 po = uRotM * p;
  float l = max(length(po), 1e-3);
  vec3 n = po / l;
  vec4 s = texture(uSpk, vec2(atan(n.z, n.x) / 6.2831853 + .5, asin(clamp(n.y, -1., 1.)) / 3.1415927 + .5));
  vec3 g = (s.gba - .5) * 32.;
  gw = (n - uHS * g / l) * uRotM;    // zurück in die Welt (Drehung: transponiert)
  return l - uR - s.r * 2. * uHS - wob(po);
}
void main(){
  vec2 q = (uv - .5) * vec2(uAspect, 1.);
  vec3 ro = vec3(0., 0., -5.4), rd = normalize(vec3(q, 1.75));
  vec3 bg = vec3(.006, .006, .01) + pal(.7) * .02 * (1. - length(q));
  vec3 col = bg;
  float pxA = 1. / (uRes.y * 1.75);            // Winkel eines Bildpunkts
  // nur innerhalb der Hüllkugel suchen
  float Rb = uR + uHS * 1.4 + .06;
  float bb = dot(ro, rd), cc = dot(ro, ro) - Rb * Rb, hh = bb * bb - cc;
  if (hh > 0.) {
    float t = -bb - sqrt(hh), t1 = -bb + sqrt(hh);
    float tLast = t, best = 1e9, tBest = t;
    bool hit = false;
    vec3 gw;
    for (int i = 0; i < 170; i++) {
      float f = field(ro + rd * t, gw);
      if (f < 0.) {
        // durchgestossen: zwischen letztem Punkt draussen und jetzt genau suchen
        float a = tLast, b = t;
        for (int j = 0; j < 7; j++) { float m = (a + b) * .5; if (field(ro + rd * m, gw) < 0.) b = m; else a = m; }
        t = b;
        hit = true;
        break;
      }
      float de = f / max(length(gw), 1.);      // Abstand, mit dem Gefälle geschätzt
      float cov = de / (t * pxA);              // in Bildpunkten: für weiche Kanten
      if (cov < best) { best = cov; tBest = t; }
      if (de < t * pxA * .25) { hit = true; break; }
      tLast = t;
      t += min(de * .85, .12);
      if (t > t1) break;
    }
    // weiche Kante: knapp vorbei zählt anteilig (statt Treppen und flimmernden Spitzen)
    float alpha = hit ? 1. : clamp(1. - best, 0., 1.);
    if (!hit) t = tBest;
    if (alpha > 0.) {
      vec3 p = ro + rd * t;
      field(p, gw);
      // feines Wogen der Oberfläche: dessen Gefälle nur hier (Nachbarn)
      vec3 po = uRotM * p;
      float e = .01;
      vec3 gn = vec3(wob(po + vec3(e, 0, 0)) - wob(po - vec3(e, 0, 0)), wob(po + vec3(0, e, 0)) - wob(po - vec3(0, e, 0)), wob(po + vec3(0, 0, e)) - wob(po - vec3(0, 0, e))) / (2. * e);
      vec3 n = normalize(gw - gn * uRotM);
      vec3 r = reflect(rd, n);
      float fr = .04 + .96 * pow(1. - max(dot(n, -rd), 0.), 5.);
      vec3 c = (uHasEnv > .5 ? envTex(r) * .4 : env(r)) * (.05 + .95 * fr) * vec3(.9, .92, 1.) + pal(.15 + uCen) * pow(max(dot(r, normalize(vec3(-.6, .4, -1.))), 0.), 40.) * (.3 + uPulse);
      col = mix(bg, c, alpha);
    }
  }
  o = vec4(col, 1.);
}`);function Nn(e,t){const a=[];for(let l=0;l<32;l++){const h=1-2*(l+.5)/32,d=Math.sqrt(1-h*h),b=l*2.39996323;a.push(Math.cos(b)*d,h,Math.sin(b)*d)}const o=ce(e,qn),s=rt(e,[{name:"studio_rgbe.png",srgb:!1,mip:!1,nearest:!0}]),n=ge(e,1024,512,t);e.bindTexture(e.TEXTURE_2D,n.tex),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.REPEAT);const i=new Float32Array(32),r=new Float32Array(32);let c=0;const u=it(e,t,Dn,{look:{linear:!0,bloom:.3,scale:1},before(l,h){c+=l.dt*(.15+.15*Math.min(2,l.midAtt));const d=1-Math.exp(-l.dt/.06),b=1-Math.exp(-l.dt/.3);for(let S=0;S<32;S++){const P=l.bands[S]||0;i[S]+=(P-i[S])*(P>i[S]?d:b),r[S]=Math.pow(Math.max(0,i[S]),1.2)}e.bindFramebuffer(e.FRAMEBUFFER,n.fb),e.viewport(0,0,n.w,n.h),e.useProgram(o.p),Re(e,o,l,h),e.uniform3fv(o.u.uDir,a),e.uniform1fv(o.u.uB,r),e.bindVertexArray(h.quadVao),e.drawArrays(e.TRIANGLES,0,3)},setup(l,h){const d=c,b=c*.7,S=Math.cos(d),P=Math.sin(d),A=Math.cos(b),q=Math.sin(b);e.uniformMatrix3fv(l.u.uRotM,!1,new Float32Array([S,P*q,-P*A,0,A,q,P,-S*q,S*A])),e.uniform1f(l.u.uR,.9+.08*Math.min(2,h.bassAtt)),e.uniform1f(l.u.uHS,.62),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,n.tex),e.uniform1i(l.u.uSpk,0);const _=s.get();e.uniform1f(l.u.uHasEnv,_?1:0),e.uniform1f(l.u.uEnvRot,.5),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,_?_[0]:null),e.uniform1i(l.u.uEnv,1),e.activeTexture(e.TEXTURE0)}}),f=u.dispose;return u.dispose=()=>{f(),n.dispose(),s.release(),e.deleteProgram(o.p)},u}const In=me(`
uniform sampler2D uBase, uLight, uWater;
uniform float uHas, uFlow, uGlow, uAct, uFlare, uMet;
uniform vec4 uWaves[4];          // Lichtwellen: Start-x, Zeit seit Start, Richtung, Stärke
uniform vec4 uMetP;              // Sternschnuppe: Start (x, y), Richtung (x, y)
uniform vec4 uRect;              // Bild im Bildraum: links, unten, Breite, Höhe
uniform vec3 uAurA, uAurB;       // Farbe unten / oben im Vorhang (linear)
uniform float uPx;
vec2 rectUV(vec2 q){ return vec2((q.x - uRect.x) / uRect.z, 1. - (q.y - uRect.y) / uRect.w); }
float yAt(float f){ return uRect.y + uRect.w * f; }      // Höhe im Bild (0 unten .. 1 oben)
float stars(vec2 q){
  vec2 g = q * 210.;
  vec2 id = floor(g);
  float h = hash12(id);
  if (h < .982) return 0.;
  vec2 f = fract(g) - .5 - (vec2(hash12(id + 3.1), hash12(id + 7.7)) - .5) * .6;
  float tw = .6 + .4 * sin(uT * (1.2 + h * 3.) + h * 60.);
  return smoothstep(.16, 0., length(f)) * tw * (h - .982) * 55.;
}
// Vorhänge: Unterkante wellt sich (hell), feine Strahlen – helle reichen höher –, nur abschnittsweise
// (dazwischen dunkler Himmel); unten grün, oben violett
vec3 aurora(vec2 q){
  vec3 col = vec3(0.);
  for (int i = 0; i < 4; i++) {
    float fi = float(i);
    float x = q.x * (.75 + fi * .17) + fi * 3.7;
    float base = yAt(.66 + fi * .07) + .07 * gnoise(vec2(x * .8 + uFlow * .06 * (1. + fi * .3), fi * 5.)) + .025 * sin(x * 2.6 + uFlow * .15 + fi)
               + .012 * uAct * sin(x * 9. - uFlow * .9 + fi * 2.);       // Falten, die seitlich wandern
    float h = q.y - base;
    if (h < -.03) continue;
    float seg = smoothstep(-.12 - .25 * uAct, .45 - .2 * uAct, gnoise(vec2(x * .55 + uFlow * .025, fi * 7.3)));
    float r1 = .5 + .5 * gnoise(vec2(x * 26. + uFlow * .45, fi * 3.));
    float r2 = .5 + .5 * gnoise(vec2(x * 75. - uFlow * .3, fi * 9.));
    float rays = r1 * (.6 + .4 * r2);
    float edge = smoothstep(-.02, .006, h);
    float fall = exp(-max(h, 0.) * max(15. - 10. * rays - 7. * uFlare * rays, 2.5));
    float rim = exp(-abs(h) * 90.) * .5;
    float e = band(.08 + fi * .22);
    // Lichtwellen: helle Stelle läuft den Vorhang entlang
    float wv = 0.;
    for (int j = 0; j < 4; j++) {
      vec4 w = uWaves[j];
      if (w.w <= 0.) continue;
      float cx = w.x + w.z * w.y * .55;
      wv += w.w * exp(-pow((q.x - cx) / (.1 + w.y * .05), 2.)) * exp(-w.y * .7);
    }
    float k = (edge * fall * (.3 + .7 * rays) + rim) * seg * (.16 + .8 * e * e) * (1. + uGlow + wv * 1.6);
    vec3 c = mix(uAurA, uAurB, smoothstep(0., .22, h));
    c = mix(c, vec3(1., .25, .45), exp(-max(h + .01, 0.) * 60.) * uAct * .5);   // rosa Saum (unruhig)
    col += c * k * (.65 - fi * .1);
  }
  return col;
}
vec3 sky(vec2 q){
  float y = (q.y - yAt(.38)) / (uRect.w * .62);
  vec3 c = mix(vec3(.012, .02, .05), vec3(.002, .003, .01), smoothstep(0., 1., y));
  c += vec3(.75, .8, 1.) * stars(q) * .55;
  c += aurora(q);
  // Sternschnuppe: kurzer heller Strich mit Schweif
  if (uMet > 0. && uMet < 1.) {
    vec2 head = uMetP.xy + uMetP.zw * uMet * .5;
    vec2 rel = q - head;
    float along = -dot(rel, uMetP.zw), across = abs(dot(rel, vec2(-uMetP.w, uMetP.z)));
    float m = smoothstep(uPx * 1.6, 0., across) * smoothstep(.16, 0., along) * step(0., along) * sin(uMet * 3.1416);
    c += vec3(.9, .95, 1.) * m * 1.4;
  }
  return c;
}
void main(){
  vec2 q = (uv - .5) * vec2(uAspect, 1.);
  vec2 t = rectUV(q);
  vec3 col = sky(q);
  if (uHas > .5) {
    vec4 b = texture(uBase, t);
    float water = texture(uWater, t).r;
    vec3 land = b.rgb;
    // See: Himmel und Polarlicht gespiegelt (an der Uferlinie), leicht gewellt und dunkler
    if (water > .02) {
      // See in Perspektive: Wellen laufen auf den Betrachter zu, nahe gross, ferne fein;
      // die Spiegelung schwankt mit, auf den Kämmen glitzert das Polarlicht
      float ys = yAt(.38);
      float d = max(ys - q.y, 1e-4);
      float z = .05 / (d + .01);
      vec2 wp = vec2(q.x * z * 9., z * 2.2);
      float w1 = sin(wp.x * .9 + wp.y * 5. + uT * 1.4);
      float w2 = sin(-wp.x * 1.7 + wp.y * 7.3 + uT * 2.1 + 1.3);
      float w3 = gnoise(wp * vec2(1.1, 3.) + vec2(uT * .2, uT * .9));
      vec2 n = vec2(w1 * .45 + w3 * .7, w2 * .5 + w3 * .5);
      float amp = .0018 + d * .03;
      vec2 rq = vec2(q.x + n.x * amp, ys + d + n.y * amp * 2.2);
      vec3 refl = sky(rq) * (.55 - .3 * clamp(d / (uRect.w * .38), 0., 1.));
      // Glitzern: kleine, waagrecht gezogene Funken, wo sich das Licht spiegelt
      float sp = gnoise(vec2(wp.x * 3.1, wp.y * 11.) + vec2(uT * .4, uT * 1.8));
      refl *= 1. + smoothstep(.42, .62, sp) * smoothstep(0., .04, d) * (.8 + .6 * (uGlow + uAct));
      land += refl * water;
    }
    // Bergkämme im Gegenlicht, in der Farbe des Polarlichts
    land += texture(uLight, t).rgb * mix(uAurA, uAurB, .35) * (.25 + .9 * uGlow + .5 * band(.2));
    col = mix(col, land, b.a);
  } else {
    col = mix(col, vec3(.004, .005, .008), step(q.y, yAt(.4)));
  }
  o = vec4(col, 1.);
}`),we=[{name:"Grün",a:[.12,1,.45],b:[.45,.2,1]},{name:"Violett",a:[.55,.25,1],b:[1,.25,.6]},{name:"Rot-Grün",a:[.2,1,.4],b:[1,.15,.15]},{name:"Eisblau",a:[.2,.85,1],b:[.35,.3,1]}];function Un(e,t){const a=rt(e,[{name:"bergsee_basis.webp"},{name:"bergsee_licht.webp"},{name:"bergsee_wasser.webp",srgb:!1}]);let o=0,s=0,n=0,i=0,r=0,c=0,u=0;const f=[0,0,1,0],l=Array.from({length:4},()=>({x:0,age:9,dir:1,s:0})),h=new Float32Array(16);let d=0,b=0,S=1,P=null,A=null;const q=Ne({beats:64,minSec:45,maxSec:110}),_=(x,I,y)=>x.map((m,v)=>m+(I[v]-m)*y),Q=it(e,t,In,{look:{linear:!0,bloom:.55,scale:1},keys:{p:()=>(b=d,d=(d+1)%we.length,S=0,q.reset(),`Farben: ${we[d].name}`)},help:"P Farben",info:()=>`${we[d].name} (P)`,before(x,I){if(A=a.get(),P!==I.seed){P=I.seed;const m=Math.floor(I.seed*37)%we.length;m!==d&&(b=d,d=m,S=0)}const y=Math.min(1,Math.max(0,(Math.min(2.2,(x.bassAtt+x.midAtt)/2)-.75)/.9));if(r+=(y-r)*(1-Math.exp(-x.dt/2.5)),o+=x.dt*(.35+.9*Math.min(2,x.midAtt)+.6*r)*(x.playing?1:.2),x.events.kick!==n){n=x.events.kick,s=Math.min(1.2,s+.45);const m=l.reduce((v,F)=>F.age>v.age?F:v,l[0]);m.dir=Math.random()<.5?-1:1,m.x=-m.dir*(.3+Math.random()*.5)*I.aspect*.5,m.age=0,m.s=.6+.4*Math.min(1,x.kick)}for(const m of l)m.age+=x.dt;if(s*=Math.exp(-x.dt*2.2),x.events.onset!==i&&(i=x.events.onset,c=Math.min(1,c+.5),u<=0&&Math.random()<.05)){u=.001;const m=Math.random()<.5?-1:1,v=-.25-Math.random()*.35;f[0]=-m*(.1+Math.random()*.5)*I.aspect*.5,f[1]=.28+Math.random()*.16,f[2]=m*Math.cos(v),f[3]=Math.sin(v)}c*=Math.exp(-x.dt*1.6),u>0&&(u=u+x.dt*1.1>1?0:u+x.dt*1.1),q.tick(x,x.dt)&&(b=d,d=(d+1+Math.floor(Math.random()*(we.length-1)))%we.length,S=0),S=Math.min(1,S+x.dt/5)},setup(x,I,y){const m=1.7777777777777777,v=Math.max(y.aspect,m),F=v/m;e.uniform4f(x.u.uRect,-v/2,-F/2,v,F),e.uniform1f(x.u.uFlow,o),e.uniform1f(x.u.uGlow,s),e.uniform1f(x.u.uAct,r),e.uniform1f(x.u.uFlare,c),e.uniform1f(x.u.uMet,u),e.uniform4fv(x.u.uMetP,f),l.forEach((K,w)=>h.set([K.x,K.age,K.dir,K.age<6?K.s:0],w*4)),e.uniform4fv(x.u.uWaves,h),e.uniform1f(x.u.uPx,1/y.h);const O=S*S*(3-2*S);e.uniform3fv(x.u.uAurA,_(we[b].a,we[d].a,O)),e.uniform3fv(x.u.uAurB,_(we[b].b,we[d].b,O)),e.uniform1f(x.u.uHas,A?1:0),["uBase","uLight","uWater"].forEach((K,w)=>{x.u[K]!=null&&(e.activeTexture(e.TEXTURE0+w),e.bindTexture(e.TEXTURE_2D,A?A[w]:null),e.uniform1i(x.u[K],w))}),e.activeTexture(e.TEXTURE0)}});Q.debug=x=>{x.act!=null&&(r=x.act),x.met&&(u=.001,f.splice(0,4,-.4,.38,Math.cos(-.35),Math.sin(-.35)))};const M=Q.dispose;return Q.dispose=()=>{M(),a.release()},Q}const qe=[{id:"klassik",name:"Klassik",make:un},{id:"magnet",name:"Magnetfeld",make:wn},{id:"neon",name:"Neon",make:En},{id:"sphaere",name:"Punktsphäre",make:An},{id:"welle",name:"Punktwelle",make:Fn},{id:"tunnel",name:"Tunnelflug",make:Bn},{id:"polarlicht",name:"Polarlicht",make:Un},{id:"synthwave",name:"Synthwave",make:_n},{id:"ferrofluid",name:"Ferrofluid",make:Nn}],Cn=me(`
uniform sampler2D uSrc; uniform vec2 uPx; uniform float uThresh;
vec3 s(vec2 d){ return texture(uSrc, uv + d * uPx).rgb; }
void main(){
  vec3 a = s(vec2(-2, -2)), b = s(vec2(0, -2)), c = s(vec2(2, -2));
  vec3 d = s(vec2(-1, -1)), e = s(vec2(1, -1));
  vec3 f = s(vec2(-2, 0)), g = s(vec2(0, 0)), h = s(vec2(2, 0));
  vec3 i = s(vec2(-1, 1)), j = s(vec2(1, 1));
  vec3 k = s(vec2(-2, 2)), l = s(vec2(0, 2)), m = s(vec2(2, 2));
  vec3 col = (d + e + i + j) * .125 + (a + b + f + g) * .03125 + (b + c + g + h) * .03125 + (f + g + k + l) * .03125 + (g + h + l + m) * .03125;
  if (uThresh > 0.) { float lum = max(col.r, max(col.g, col.b)); col *= smoothstep(uThresh * .5, uThresh * 1.5, lum); }
  o = vec4(col, 1.);
}`),Vn=me(`
uniform sampler2D uSrc; uniform vec2 uPx;
vec3 s(vec2 d){ return texture(uSrc, uv + d * uPx).rgb; }
void main(){
  vec3 c = s(vec2(-1, -1)) + 2. * s(vec2(0, -1)) + s(vec2(1, -1))
         + 2. * s(vec2(-1, 0)) + 4. * s(vec2(0, 0)) + 2. * s(vec2(1, 0))
         + s(vec2(-1, 1)) + 2. * s(vec2(0, 1)) + s(vec2(1, 1));
  o = vec4(c / 16., 1.);
}`),Kn=me(`
uniform sampler2D uA, uB, uBloom;
uniform float uMix, uExpo, uFlashAmt, uBloomAmt, uTone, uVig;
vec3 aces(vec3 c){ return clamp((c * (2.51 * c + .03)) / (c * (2.43 * c + .59) + .14), 0., 1.); }
void main(){
  vec3 c = texture(uA, uv).rgb;
  if (uMix > 0.) {
    float n = fbm(vec3(uv * vec2(uAspect, 1.) * 2.2, 7.3)) * .9 + .5;
    float m = smoothstep(n - .12, n + .12, uMix * 1.3 - .15);
    c = mix(c, texture(uB, uv).rgb, m);
  }
  c += texture(uBloom, uv).rgb * .5 * uBloomAmt;
  c *= uExpo * (1. + uFlashAmt);
  c = mix(clamp(c, 0., 1.), aces(c), uTone);
  float v = smoothstep(1.35, .45, length((uv - .5) * vec2(uAspect, 1.)) * 1.25);
  c *= mix(1. - uVig, 1., v);
  c = pow(c, vec3(1. / 2.2));
  c += (hash12(gl_FragCoord.xy + fract(uT) * 91.) - .5) / 255.;   // gegen Farbstufen
  o = vec4(c, 1.);
}`);function Hn(e){const t=e.getContext("webgl2",{antialias:!1,alpha:!1,preserveDrawingBuffer:!1,powerPreference:"high-performance"});if(!t)throw new Error("WebGL 2 fehlt");const a=!!t.getExtension("EXT_color_buffer_float")||!!t.getExtension("EXT_color_buffer_half_float"),o=t.createBuffer(),s=t.createVertexArray();t.bindVertexArray(s),t.bindBuffer(t.ARRAY_BUFFER,o),t.bufferData(t.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),t.STATIC_DRAW),t.enableVertexAttribArray(0),t.vertexAttribPointer(0,2,t.FLOAT,!1,0,0);const n=ce(t,Cn),i=ce(t,Vn),r=ce(t,Kn),c=t.createTexture(),u=new Float32Array(512*2);t.bindTexture(t.TEXTURE_2D,c),t.texImage2D(t.TEXTURE_2D,0,t.R32F,512,2,0,t.RED,t.FLOAT,u),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.NEAREST);const f=t.createTexture();t.bindTexture(t.TEXTURE_2D,f),t.texImage2D(t.TEXTURE_2D,0,t.R32F,ve,128,0,t.RED,t.FLOAT,new Float32Array(ve*128)),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.NEAREST);let l=0,h=0;const d=new Float32Array(ve),b=qe.map(k=>k.make(t,a));let S=0,P=0,A=1,q=[];const _={seed:.3,aspect:1,histRow:0,w:1,h:1,palette:new Float32Array(15),audioTex:c,histTex:f,quadVao:s,cover:null,coverPixels:null,coverCanvas:null,title:"",artist:""},Q=k=>[Math.max(32,Math.round(S*(k.look.scale||1))),Math.max(32,Math.round(P*(k.look.scale||1)))],M=()=>{const k=Math.min(window.devicePixelRatio||1,2);e.width=Math.round(e.clientWidth*k)||1,e.height=Math.round(e.clientHeight*k)||1,S=Math.max(64,Math.round(e.width*A)),P=Math.max(64,Math.round(e.height*A)),_.aspect=S/P,t.bindVertexArray(s),t.disable(t.BLEND);for(const p of b)p.resize(...Q(p));for(const p of q)p.dispose();q=[];let R=S,H=P;for(let p=0;p<6;p++)R=Math.max(4,R>>1),H=Math.max(4,H>>1),q.push(ge(t,R,H,a))};M();let x=0,I=-1,y=0,m=16,v=performance.now(),F=60;const O=k=>{k!==x&&(I=x,x=k,y=1e-4)},K=(k,R)=>{const H=b[k],[p,z]=Q(H);return _.w=p,_.h=z,t.bindVertexArray(s),t.disable(t.BLEND),H.render(R,_)};return{gl:t,frame:(k,R)=>{t.bindVertexArray(s),t.disable(t.BLEND);for(let V=0;V<ve;V++)u[V]=k.bands[V];if(u.set(k.wave,512),t.bindTexture(t.TEXTURE_2D,c),t.texSubImage2D(t.TEXTURE_2D,0,0,0,512,2,t.RED,t.FLOAT,u),h+=k.dt,h>=1/32){h%=1/32,l=(l+1)%128;for(let V=0;V<ve;V++)d[V]=k.bands[V]*(k.playing?1:0);t.bindTexture(t.TEXTURE_2D,f),t.texSubImage2D(t.TEXTURE_2D,0,0,l,ve,1,t.RED,t.FLOAT,d)}_.histRow=l;const H=K(x,k);let p=null;const z=I;z>=0&&(p=K(z,k),y=Math.min(1,y+k.dt/2.5)),t.bindVertexArray(s),t.disable(t.BLEND);let X=H,[g,T]=Q(b[x]);t.useProgram(n.p);for(let V=0;V<q.length;V++){const J=q[V];t.bindFramebuffer(t.FRAMEBUFFER,J.fb),t.viewport(0,0,J.w,J.h),xe(t,n,"uSrc",X,0),t.uniform2f(n.u.uPx,1/g,1/T),t.uniform1f(n.u.uThresh,V===0?.3:0),t.drawArrays(t.TRIANGLES,0,3),X=J.tex,g=J.w,T=J.h}t.useProgram(i.p),t.enable(t.BLEND),t.blendFunc(t.ONE,t.ONE);for(let V=q.length-2;V>=0;V--){const J=q[V],he=q[V+1];t.bindFramebuffer(t.FRAMEBUFFER,J.fb),t.viewport(0,0,J.w,J.h),xe(t,i,"uSrc",he.tex,0),t.uniform2f(i.u.uPx,1/he.w,1/he.h),t.drawArrays(t.TRIANGLES,0,3)}t.disable(t.BLEND),t.blendFunc(t.ONE,t.ZERO);const Y=b[x].look,se=p?b[z].look:Y,$=p?y:1,C=(V,J)=>(se[V]??J)+((Y[V]??J)-(se[V]??J))*$;t.bindFramebuffer(t.FRAMEBUFFER,null),t.viewport(0,0,e.width,e.height),t.useProgram(r.p),Re(t,r,k,_),xe(t,r,"uA",p||H,0),xe(t,r,"uB",H,1),xe(t,r,"uBloom",q[0].tex,2),t.uniform1f(r.u.uMix,p?y:0),t.uniform1f(r.u.uExpo,C("expo",1.1)),t.uniform1f(r.u.uBloomAmt,C("bloom",.5)),t.uniform1f(r.u.uTone,C("linear",1)),t.uniform1f(r.u.uVig,C("vignette",.45)),t.uniform1f(r.u.uFlashAmt,Math.min(.12,k.flash*.1)),t.drawArrays(t.TRIANGLES,0,3),p&&y>=1&&(I=-1,y=0),m+=(R-m)*.05,F=1e3/Math.max(1,m);const W=performance.now();m>22&&A>.5&&W-v>5e3?(A=Math.max(.5,Math.round((A-.1)*10)/10),v=W,M()):m<18&&A<1&&W-v>2e4&&(A=Math.min(1,Math.round((A+.1)*10)/10),v=W,M())},resize:M,setScene:O,get scene(){return x},get fps(){return F},get scale(){return A},current:()=>b[x],setLook(k){for(const R of["palette","seed","title","artist"])k[R]!=null&&(_[R]=k[R]);k.cover!==void 0&&(_.cover=k.cover,_.coverPixels=k.coverPixels||null,_.coverCanvas=k.coverCanvas||null)},dispose(){const k=t.getExtension("WEBGL_lose_context");for(const R of b)R.dispose();for(const R of q)R.dispose();for(const R of[n,i,r])t.deleteProgram(R.p);k&&k.loseContext()}}}const pt=e=>e<=.04045?e/12.92:Math.pow((e+.055)/1.055,2.4);function Wn([e,t,a]){const o=Math.cbrt(.4122214708*e+.5363325363*t+.0514459929*a),s=Math.cbrt(.2119034982*e+.6806995451*t+.1073969566*a),n=Math.cbrt(.0883024619*e+.2817188376*t+.6299787005*a);return[.2104542553*o+.793617785*s-.0040720468*n,1.9779984951*o-2.428592205*s+.4505937099*n,.0259040371*o+.7827717662*s-.808675766*n]}function On([e,t,a]){const o=(e+.3963377774*t+.2158037573*a)**3,s=(e-.1055613458*t-.0638541728*a)**3,n=(e-.0894841775*t-1.291485548*a)**3;return[4.0767416621*o-3.3077115913*s+.2309699292*n,-1.2684380046*o+2.6097574011*s-.3413193965*n,-.0041960863*o-.7034186147*s+1.707614701*n].map(i=>Math.max(0,Math.min(1,i)))}const vt=new Float32Array([.25,.12,.9,.55,.15,.85,.1,.5,.95,.15,.85,.6,.95,.35,.45]);function Ft(e){let t=2166136261;for(const a of String(e||"x"))t=Math.imul(t^a.charCodeAt(0),16777619);return(t>>>0)%1e5/1e5}function Gn(e){return new Promise(t=>{if(!e)return t(null);const a=new Image;a.crossOrigin="anonymous",a.onload=()=>{try{const o=document.createElement("canvas");o.width=o.height=120;const s=o.getContext("2d",{willReadFrequently:!0});s.drawImage(a,0,0,120,120);const n=s.getImageData(0,0,120,120).data,i=document.createElement("canvas");i.width=i.height=512,i.getContext("2d").drawImage(a,0,0,512,512),t({pixels:n,palette:Xn(n),canvas:i})}catch{t(null)}},a.onerror=()=>t(null),a.src=e})}function Xn(e){const t=[];for(let i=0;i<e.length;i+=16)t.push(Wn([pt(e[i]/255),pt(e[i+1]/255),pt(e[i+2]/255)]));const a=5,o=[t[Math.floor(t.length/2)]];for(;o.length<a;){let i=null,r=-1;for(const c of t){let u=1/0;for(const f of o)u=Math.min(u,(c[0]-f[0])**2+(c[1]-f[1])**2+(c[2]-f[2])**2);u>r&&(r=u,i=c)}o.push(i)}const s=new Array(a).fill(0);for(let i=0;i<8;i++){const r=o.map(()=>[0,0,0]);s.fill(0);for(const c of t){let u=0,f=1/0;for(let l=0;l<a;l++){const h=o[l],d=(c[0]-h[0])**2+(c[1]-h[1])**2+(c[2]-h[2])**2;d<f&&(f=d,u=l)}s[u]++,r[u][0]+=c[0],r[u][1]+=c[1],r[u][2]+=c[2]}for(let c=0;c<a;c++)s[c]&&(o[c]=r[c].map(u=>u/s[c]))}const n=o.map(([i,r,c],u)=>{let f=Math.hypot(r,c),l=Math.atan2(c,r);f<.03&&(l=4.2+u*.5),f=Math.max(.09,Math.min(.2,f*1.25));const h=Math.max(.62,Math.min(.85,i*.6+.4));return{h:l,rgb:On([h,f*Math.cos(l),f*Math.sin(l)])}});return n.sort((i,r)=>i.h-r.h),new Float32Array(n.flatMap(i=>i.rgb))}const Oe={get(e,t){try{const a=localStorage.getItem("viz."+e);return a==null?t:JSON.parse(a)}catch{return t}},set(e,t){try{localStorage.setItem("viz."+e,JSON.stringify(t))}catch{}}};function Zn({track:e,onClose:t}){const a=ie.useRef(null),o=ie.useRef(null),s=ie.useRef(null),[n,i]=ie.useState(!0),[r,c]=ie.useState(()=>Math.min(qe.length-1,Math.max(0,Oe.get("scene",0)))),[u,f]=ie.useState(()=>!!Oe.get("calm",!1)),[l,h]=ie.useState(()=>!!Oe.get("auto",!1)),[d,b]=ie.useState(!1),[S,P]=ie.useState(""),[A,q]=ie.useState(""),[_,Q]=ie.useState(null),M=ie.useRef(u),x=ie.useRef(l);M.current=u,x.current=l;const I=m=>{const v=o.current;if(!v)return;const F=(m%qe.length+qe.length)%qe.length;v.setScene(F),c(F),Oe.set("scene",F),i(!0);const O=v.current().needs;P(O||"")};ie.useEffect(()=>{const m=o.current;if(!m)return;m.setLook({seed:Ft(e&&e.id),palette:vt,cover:null,title:e&&e.title||"",artist:e&&e.artist||""});let v=!1;return Gn(e&&e.albumId?Wt(e.albumId,640):null).then(F=>{v||!o.current||o.current.setLook({palette:F?F.palette:vt,cover:e&&e.albumId||null,coverPixels:F?F.pixels:null,coverCanvas:F?F.canvas:null})}),()=>{v=!0}},[e&&e.id,e&&e.albumId,!!o.current]),ie.useEffect(()=>{i(!0);let m=setTimeout(()=>i(!1),5e3);const v=()=>{i(!0),clearTimeout(m),m=setTimeout(()=>i(!1),2500)};return window.addEventListener("pointermove",v),()=>{clearTimeout(m),window.removeEventListener("pointermove",v)}},[e&&e.id,r,u,l,S]),ie.useEffect(()=>{const m=v=>{const F=v.key.toLowerCase(),O=o.current;if(F==="escape"||F==="v"&&!v.ctrlKey&&!v.metaKey||F==="t"&&(v.ctrlKey||v.metaKey))t();else if(F==="arrowright"||F==="n")I((O?O.scene:0)+1);else if(F==="arrowleft")I((O?O.scene:0)-1);else if(/^[0-9]$/.test(F)&&(Number(F)||10)<=qe.length)I((Number(F)||10)-1);else if(F==="r")f(K=>(Oe.set("calm",!K),!K));else if(F==="a")h(K=>(Oe.set("auto",!K),!K));else if(F==="d")b(K=>!K);else if(O&&O.current().keys&&O.current().keys[F])P(O.current().keys[F]()||"");else return;v.preventDefault(),v.stopPropagation()};return window.addEventListener("keydown",m,!0),()=>window.removeEventListener("keydown",m,!0)},[t]),ie.useEffect(()=>{let m;try{m=Hn(a.current)}catch(T){console.error(T),q(String(T&&T.message||T).split(`
`)[0]);return}o.current=m;const v=Xt();s.current=v;let F=0,O=0;const K=Gt(T=>{F++,O+=(T.frames||[]).length,v.push(T)});m.setLook({seed:Ft(e&&e.id),palette:vt,title:e&&e.title||"",artist:e&&e.artist||""}),m.setScene(r),P(m.current().needs||"");let w=0,k=performance.now(),R=performance.now(),H=performance.now();const p=T=>{const Y=T-k,se=Math.min(.1,Y/1e3);k=T;const $=v.update(se);M.current&&($.flash=0,$.kick*=.35,$.pulse*=.35),x.current&&$.playing&&(T-R)/1e3>180&&($.conf<.4||$.phase<.08)&&(R=T,I(m.scene+1));try{m.frame($,Y)}catch(C){console.error(C)}if(T-H>500){const C=(T-H)/1e3;Q({fps:m.fps,scale:m.scale,msg:F/C,frames:O/C,bpm:$.bpm,conf:$.conf,playing:$.playing,kicks:$.events.kick,int:$.intensity,bands:Array.from($.bands),info:m.current().info?m.current().info():""}),F=0,O=0,H=T}w=requestAnimationFrame(p)};w=requestAnimationFrame(p);const z=()=>m.resize();window.addEventListener("resize",z);const X=T=>{T.preventDefault(),q("Die Grafikkarte hat den Visualizer beendet – bitte nochmals öffnen.")},g=a.current;return g.addEventListener("webglcontextlost",X),()=>{cancelAnimationFrame(w),window.removeEventListener("resize",z),g.removeEventListener("webglcontextlost",X),K(),m.dispose(),o.current=null}},[]);const y=o.current&&o.current.current().label==="center";return ne.jsxs("div",{className:"fixed inset-0 z-[70] bg-black",onClick:t,style:{cursor:n?"default":"none"},children:[ne.jsx("canvas",{ref:a,className:"absolute inset-0 h-full w-full"}),A&&ne.jsxs("div",{className:"absolute inset-0 grid place-items-center p-8 text-center text-sm text-zinc-400",children:["Visualizer geht hier nicht: ",A]}),y&&e&&ne.jsxs("div",{className:"pointer-events-none absolute inset-x-0 top-[66%] text-center",style:{textShadow:"0 0 18px rgba(0,0,0,.8)"},children:[ne.jsx("div",{className:"truncate px-8 text-2xl font-bold text-white sm:text-3xl",children:e.artist}),ne.jsx("div",{className:"mt-1 truncate px-8 text-base text-zinc-200 sm:text-lg",children:e.title})]}),ne.jsxs("div",{className:"pointer-events-none absolute bottom-8 left-8 max-w-[80vw] transition-opacity duration-700 "+(n?"opacity-100":"opacity-0"),children:[e&&!y&&ne.jsxs(ne.Fragment,{children:[ne.jsx("div",{className:"truncate text-2xl font-bold text-white drop-shadow-lg",children:e.title}),ne.jsx("div",{className:"truncate text-lg text-zinc-300 drop-shadow",children:e.artist})]}),ne.jsxs("div",{className:"mt-2 text-xs text-zinc-400 drop-shadow",children:[ne.jsxs("span",{className:"text-zinc-100",children:[r+1," ",qe[r].name]}),_&&_.info?` · ${_.info}`:"",l?" · wechselt automatisch (A)":"",u?" · ruhig (R)":""]}),ne.jsxs("div",{className:"mt-0.5 text-[11px] text-zinc-500 drop-shadow",children:["1–9 / ← → Stil · ",o.current&&o.current.current().help||"M Muster · P Farben"," · A automatisch · R ruhig · D Diagnose · Esc schliessen"]}),S&&ne.jsx("div",{className:"mt-1 text-xs text-amber-300 drop-shadow",children:S})]}),d&&_&&ne.jsxs("div",{className:"pointer-events-none absolute right-4 top-4 w-72 rounded-xl bg-black/70 p-3 font-mono text-[11px] leading-5 text-zinc-300",children:[ne.jsxs("div",{children:["Bild: ",_.fps.toFixed(0)," fps · Auflösung ",Math.round(_.scale*100)," %"]}),ne.jsxs("div",{children:["Daten: ",_.msg.toFixed(0)," Pakete/s · ",_.frames.toFixed(0)," Frames/s ",_.playing?"":"· (keine Musik)"]}),ne.jsxs("div",{children:["Tempo: ",_.bpm?`${_.bpm.toFixed(1)} BPM`:"–"," · sicher ",Math.round(_.conf*100)," % · Kicks ",_.kicks]}),ne.jsxs("div",{children:["Spannung: ",Math.round(_.int*100)," %"]}),ne.jsx("div",{className:"mt-1 flex h-10 items-end gap-px",children:_.bands.map((m,v)=>ne.jsx("span",{className:"flex-1 bg-accent/80",style:{height:`${Math.min(100,m*80)}%`}},v))})]})]})}export{Zn as default};
