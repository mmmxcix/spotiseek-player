import{u as et,r as W,c as tt,j as H}from"./index-FszLrHsd.js";const te=32,ot=.07;function nt(e){let o=!1,a=null;return(async()=>{for(;!o;){try{a=new AbortController;const r=await fetch(et("/api/player/viz",!0),{signal:a.signal,cache:"no-store"});if(!r.ok||!r.body)throw new Error(`Fehler ${r.status}`);const n=r.body.getReader(),s=new TextDecoder;let i="";for(;;){const{value:u,done:c}=await n.read();if(c||o)break;i+=s.decode(u,{stream:!0});let l;for(;(l=i.indexOf(`

`))>=0;){const d=i.slice(0,l);if(i=i.slice(l+2),d.startsWith("data: "))try{e(JSON.parse(d.slice(6)))}catch{}}}}catch{}o||await new Promise(r=>setTimeout(r,800))}})(),()=>{o=!0,a&&a.abort()}}function at(){const e=[];let o=null,a=new Float32Array(512),t={bpm:0,conf:0,beat0:0,int:0,playing:!1},r=0;const n={t:0,dt:0,playing:!1,bands:new Float32Array(te),db:new Float32Array(te),wave:new Float32Array(512),waveRaw:new Float32Array(512),beats:0,bass:1,mid:1,treb:1,bassAtt:1,midAtt:1,trebAtt:1,kick:0,onset:0,pulse:0,flash:0,phase:0,beatIndex:0,conf:0,bpm:0,intensity:0,rms:0,centroid:0,lowClock:0,midClock:0,highClock:0,events:{kick:0,onset:0}},s=[0,0,0],i=[0,0,0],u=[0,0,0];let c=0;const l=new Float32Array(te).fill(-90);let d=-90,m=-9,v=-9,y=-9,R=0,k=0,P=0,z=.05;const L=f=>{const B=performance.now()/1e3-f.now;o=o==null?B:Math.min(B,o+.002);for(const E of f.frames||[])(!e.length||E.at>e[e.length-1].at)&&e.push(E);for(;e.length>600;)e.shift();f.wave&&(a=Float32Array.from(f.wave)),t={bpm:f.bpm||0,conf:f.conf||0,beat0:f.beat0||0,int:f.int||0,playing:!!f.playing}},F=(f,_)=>Math.pow(f,_*30);return{push:L,update:f=>{const _=performance.now()/1e3;n.dt=f,n.t+=f,n.playing=t.playing&&e.length>0;const B=o==null?0:_-o-ot;let E=e.findIndex(x=>x.at>B),h=null;if(e.length){if(E===-1)h={f0:e[e.length-1],f1:e[e.length-1],k:0};else if(E===0)h={f0:e[0],f1:e[0],k:0};else{const x=e[E-1],D=e[E];h={f0:x,f1:D,k:Math.min(1,Math.max(0,(B-x.at)/Math.max(.001,D.at-x.at)))}}B-e[e.length-1].at>.5&&(h=null)}if(h){for(const x of e)if(!(x.at<=r)){if(x.at>B)break;x.k&&(n.events.kick++,m=n.t),x.on&&(n.events.onset++,v=n.t)}}const M=[];if(h)for(const x of e)x.at>r&&x.at<=B&&M.push(x);r=B;const A=(x,D,G)=>x+(D-x)*G;let C=-90;for(let x=0;x<te;x++){let D=-100;if(h){D=A(h.f0.b[x],h.f1.b[x],h.k);for(const G of M)D=Math.max(D,G.b[x])}n.db[x]=D,l[x]=D>l[x]?D:Math.max(-90,l[x]-5*f),C=Math.max(C,l[x])}d=C>d?C:Math.max(-90,d-5*f);for(let x=0;x<te;x++){const D=n.db[x],G=.6*l[x]+.4*d,J=Math.min(1,Math.max(0,(D+82)/12)),U=Math.min(1.15,Math.max(0,1+(D-G)/28))*J,ee=U>n.bands[x]?1-Math.exp(-f*30):1-Math.exp(-f*8);n.bands[x]+=(U-n.bands[x])*ee}for(let x=0;x<3;x++){let D=h?A(h.f0.bmt[x],h.f1.bmt[x],h.k):0;for(const ee of M)D=Math.max(D,ee.bmt[x]);s[x]=D;const G=s[x]>i[x],J=F(G?.2:.5,f);i[x]=i[x]*J+s[x]*(1-J);const U=F(c<50?.9:.992,f);u[x]=u[x]*U+s[x]*(1-U)}h&&(c+=f*30);const b=(x,D)=>u[D]>1e-5?Math.min(3,x/u[D]):0;if(n.bass=b(s[0],0),n.mid=b(s[1],1),n.treb=b(s[2],2),n.bassAtt=b(i[0],0),n.midAtt=b(i[1],1),n.trebAtt=b(i[2],2),n.bpm=t.bpm,n.conf=t.conf,n.playing&&(n.beats+=f*(t.conf>.4&&t.bpm>40?t.bpm:120)/60),t.bpm>0&&t.conf>.3&&o!=null){const x=60/t.bpm,D=(B-t.beat0)/x;n.phase=(D%1+1)%1,n.beatIndex=Math.floor(D)}else n.phase=(n.phase+f*2)%1;n.kick=Math.exp(-(n.t-m)/.14),n.onset=Math.exp(-(n.t-v)/.09),n.pulse=n.conf>.45?Math.exp(-(n.phase*60)/Math.max(40,n.bpm)/.12)*(n.playing?1:0):n.kick,m===n.t&&n.t-y>.34&&(y=n.t),n.flash=Math.exp(-(n.t-y)/.12);const T=1-Math.exp(-f*1.2);R+=((n.playing?t.int:0)-R)*(1-Math.exp(-f*.5)),k+=((h?A(h.f0.rms,h.f1.rms,h.k):0)-k)*T,P+=((h?A(h.f0.c,h.f1.c,h.k):P)-P)*T,n.intensity=R,n.rms=k,n.centroid=P,n.lowClock+=f*(.25+.9*Math.min(2,n.bassAtt)),n.midClock+=f*(.25+.9*Math.min(2,n.midAtt)),n.highClock+=f*(.25+.9*Math.min(2,n.trebAtt));let S=0;for(let x=0;x<512;x++)S=Math.max(S,Math.abs(a[x]));z=Math.max(S,z*Math.exp(-f*.4),.02);const w=1-Math.exp(-f*30);for(let x=0;x<512;x++){const D=n.playing?a[x]/z:0;n.wave[x]+=(D-n.wave[x])*w,n.waveRaw[x]=D}return n},A:n}}const rt=`#version 300 es
in vec2 p; out vec2 uv;
void main(){ uv = p * 0.5 + 0.5; gl_Position = vec4(p, 0.0, 1.0); }`,pe=`
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
`;function K(e,o,a=rt){const t=e.createProgram();for(const[s,i]of[[e.VERTEX_SHADER,a],[e.FRAGMENT_SHADER,o]]){const u=e.createShader(s);if(e.shaderSource(u,i),e.compileShader(u),!e.getShaderParameter(u,e.COMPILE_STATUS)){const c=e.getShaderInfoLog(u);throw new Error("Shader: "+c+`
`+i.split(`
`).map((l,d)=>`${d+1}: ${l}`).join(`
`).slice(0,4e3))}e.attachShader(t,u)}if(e.bindAttribLocation(t,0,"p"),e.linkProgram(t),!e.getProgramParameter(t,e.LINK_STATUS))throw new Error(e.getProgramInfoLog(t));const r={},n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;s++){const i=e.getActiveUniform(t,s).name.replace(/\[0\]$/,"");r[i]=e.getUniformLocation(t,e.getActiveUniform(t,s).name)}return{p:t,u:r}}const $=e=>`#version 300 es
${pe}
in vec2 uv; out vec4 o;
${e}`;function Z(e,o,a,t,r=!0,n=!1){const s=e.createTexture();e.bindTexture(e.TEXTURE_2D,s),n?e.texImage2D(e.TEXTURE_2D,0,e.RGBA32F,o,a,0,e.RGBA,e.FLOAT,null):t?e.texImage2D(e.TEXTURE_2D,0,e.RGBA16F,o,a,0,e.RGBA,e.HALF_FLOAT,null):e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,o,a,0,e.RGBA,e.UNSIGNED_BYTE,null);const i=r?e.LINEAR:e.NEAREST;e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,i),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,i),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE);const u=e.createFramebuffer();return e.bindFramebuffer(e.FRAMEBUFFER,u),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,s,0),e.clearColor(0,0,0,1),e.clear(e.COLOR_BUFFER_BIT),{tex:s,fb:u,w:o,h:a,dispose:()=>(e.deleteTexture(s),e.deleteFramebuffer(u))}}function Ce(e,o,a,t){let r=Z(e,o,a,t),n=Z(e,o,a,t);return{get src(){return r},get dst(){return n},swap(){const s=r;r=n,n=s},dispose(){r.dispose(),n.dispose()}}}function ie(e,o,a,t){const r=o.u,n=(s,i)=>r[s]!=null&&e.uniform1f(r[s],i);n("uT",a.t),n("uDt",a.dt),n("uBass",a.bass),n("uMid",a.mid),n("uTreb",a.treb),n("uBassAtt",a.bassAtt),n("uMidAtt",a.midAtt),n("uTrebAtt",a.trebAtt),n("uPulse",a.pulse),n("uKick",a.kick),n("uOnset",a.onset),n("uFlash",a.flash),n("uPhase",a.phase),n("uConf",a.conf),n("uInt",a.intensity),n("uRms",a.rms),n("uCen",a.centroid),n("uLowClk",a.lowClock),n("uMidClk",a.midClock),n("uHighClk",a.highClock),n("uSeed",t.seed),n("uAspect",t.aspect),n("uHistRow",t.histRow),r.uRes!=null&&e.uniform2f(r.uRes,t.w,t.h),r.uPal!=null&&e.uniform3fv(r.uPal,t.palette),r.uAudio!=null&&(e.activeTexture(e.TEXTURE6),e.bindTexture(e.TEXTURE_2D,t.audioTex),e.uniform1i(r.uAudio,6)),r.uHist!=null&&(e.activeTexture(e.TEXTURE7),e.bindTexture(e.TEXTURE_2D,t.histTex),e.uniform1i(r.uHist,7)),e.activeTexture(e.TEXTURE0)}function I(e,o,a,t,r){o.u[a]!=null&&(e.activeTexture(e.TEXTURE0+r),e.bindTexture(e.TEXTURE_2D,t),e.uniform1i(o.u[a],r),e.activeTexture(e.TEXTURE0))}function De(e,o,a,t){const r=1/Math.tan(e/2),n=1/(a-t);return new Float32Array([r/o,0,0,0,0,r,0,0,0,0,(t+a)*n,-1,0,0,2*t*a*n,0])}function _e(e,o,a=[0,1,0]){let t=e[0]-o[0],r=e[1]-o[1],n=e[2]-o[2],s=Math.hypot(t,r,n)||1;t/=s,r/=s,n/=s;let i=a[1]*n-a[2]*r,u=a[2]*t-a[0]*n,c=a[0]*r-a[1]*t;s=Math.hypot(i,u,c)||1,i/=s,u/=s,c/=s;const l=r*c-n*u,d=n*i-t*c,m=t*u-r*i;return new Float32Array([i,l,t,0,u,d,r,0,c,m,n,0,-(i*e[0]+u*e[1]+c*e[2]),-(l*e[0]+d*e[1]+m*e[2]),-(t*e[0]+r*e[1]+n*e[2]),1])}function Le(e,o){const a=new Float32Array(16);for(let t=0;t<4;t++)for(let r=0;r<4;r++){let n=0;for(let s=0;s<4;s++)n+=e[s*4+r]*o[t*4+s];a[t*4+r]=n}return a}const ze=`
vec3 hash33(vec3 p){ p = fract(p * vec3(.1031, .1030, .0973)); p += dot(p, p.yxz + 33.33); return fract((p.xxy + p.yxx) * p.zyx) * 2. - 1.; }
float noise3d(vec3 p){
  vec3 i = floor(p), f = fract(p); vec3 u = f * f * (3. - 2. * f);
  return mix(mix(mix(dot(hash33(i), f), dot(hash33(i + vec3(1,0,0)), f - vec3(1,0,0)), u.x),
                 mix(dot(hash33(i + vec3(0,1,0)), f - vec3(0,1,0)), dot(hash33(i + vec3(1,1,0)), f - vec3(1,1,0)), u.x), u.y),
             mix(mix(dot(hash33(i + vec3(0,0,1)), f - vec3(0,0,1)), dot(hash33(i + vec3(1,0,1)), f - vec3(1,0,1)), u.x),
                 mix(dot(hash33(i + vec3(0,1,1)), f - vec3(0,1,1)), dot(hash33(i + vec3(1,1,1)), f - vec3(1,1,1)), u.x), u.y), u.z); }
float fbm3d(vec3 p){ float s = 0., a = .5; for (int i = 0; i < 4; i++) { s += a * noise3d(p); p = p * 2.02 + 17.1; a *= .5; } return s; }
`;function ve(e,o=Math.random){let a=[],t=-1;return{next(){if(!a.length){a=Array.from({length:e},(r,n)=>n);for(let r=e-1;r>0;r--){const n=Math.floor(o()*(r+1));[a[r],a[n]]=[a[n],a[r]]}e>1&&a[0]===t&&a.push(a.shift())}return t=a.shift(),t}}}function We({beats:e=64,minSec:o=45,maxSec:a=100}={}){let t=0,r=null;return{tick(n,s){if(!n.playing)return!1;t+=s;const i=Math.floor(n.beats/e),u=r!==null&&i!==r;return r=i,u&&t>=o||t>=a?(t=0,!0):!1},reset(){t=0}}}const ye=11,st=$(`
uniform sampler2D uPrev;
uniform int uFa, uFb; uniform float uFm, uDecay, uAmt, uTa, uTb;
vec2 rot(vec2 p, float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c) * p; }
// Quelle eines Bildpunkts p (y -1..1, x -aspect..aspect); Bewegung je Bild bei 60 fps
vec2 flow(int k, vec2 p, float t){
  float r = length(p), a = atan(p.y, p.x);
  if (k == 0) return rot(p, .008) * .986;                                    // Sog nach aussen, Drehung
  if (k == 1) return rot(p, .045 * (1.15 - min(r, 1.15))) * .993;            // Wirbel
  if (k == 2) return rot(p, .02 + .01 * sin(r * 6. - t)) * (.985 + .006 * sin(a * 3. + t * .7));  // Korkenzieher
  if (k == 3) return p * (.99 + .008 * sin(r * 18. - t * 2.));               // Wellenringe
  if (k == 4) return p + .006 * vec2(sin(p.y * 9. + t), sin(p.x * 9. + t * .8));  // Kreuzwellen
  if (k == 5) return p * (.982 + .014 * pow(abs(sin(a * 4. + t * .3)), 2.));      // Sternstrahlen
  if (k == 6) { vec2 c1 = vec2(-.6, 0.), c2 = vec2(.6, 0.);                   // zwei Wirbel
    vec2 q = p - c1; float w1 = exp(-dot(q, q) * 2.); q = p - c2; float w2 = exp(-dot(q, q) * 2.);
    vec2 s = c1 + rot(p - c1, .06 * w1); s = c2 + rot(s - c2, -.06 * w2); return s * .995; }
  if (k == 7) { float seg = 1.5707963; float b = mod(a + t * .03, seg); b = abs(b - seg * .5);   // Kaleidoskop
    return vec2(cos(b), sin(b)) * r * .988; }
  if (k == 8) return vec2(p.x * .985, p.y * .997 + .002 * sin(p.x * 7. + t));   // seitlich auseinander
  if (k == 9) return rot(p, -.03) * 1.012;                                     // Spirale nach innen
  return p * .99 + .004 * vec2(sin(p.y * 23. + t * 1.7), sin(p.x * 21. - t * 1.3));   // Fell
}
void main(){
  vec2 asp = vec2(uAspect, 1.);
  vec2 p = (uv * 2. - 1.) * asp;
  vec2 s = mix(flow(uFa, p, uTa), flow(uFb, p, uTb), uFm);
  // feste, feine Unregelmässigkeit: zieht Fasern entlang der Strömung
  s += vec2(gnoise(p * 26. + 3.1), gnoise(p * 26. + 9.7)) * .0022;
  s = p + (s - p) * uAmt;
  vec2 q = s / asp * .5 + .5;
  float v = (q.x < 0. || q.y < 0. || q.x > 1. || q.y > 1.) ? 0. : texture(uPrev, q).r;
  v = max(v * uDecay - .0016, 0.);
  o = vec4(v, 0., 0., 1.);
}`),it=`#version 300 es
in vec2 p; in vec2 a;
uniform float uAspect;
out vec2 va;
void main(){ va = a; gl_Position = vec4(p.x / uAspect, p.y, 0., 1.); }`,ut=`#version 300 es
precision mediump float;
in vec2 va; out vec4 o;
void main(){ float e = 1. - va.x * va.x; o = vec4(va.y * sqrt(max(e, 0.)), 0., 0., 1.); }`,ct=$(`
uniform sampler2D uText; uniform float uAmt;
void main(){ float v = texture(uText, vec2(uv.x, 1. - uv.y)).r; o = vec4(v * uAmt, 0., 0., 1.); }`),ft=$(`
uniform sampler2D uI, uMap;
void main(){
  float v = clamp(texture(uI, uv).r, 0., 1.);
  o = vec4(pow(texture(uMap, vec2(v * (255. / 256.) + .5 / 256., .5)).rgb, vec3(2.2)), 1.);   // linear, Ausgabe macht sRGB
}`),Ye=(e,o,a)=>[e[0]+(o[0]-e[0])*a,e[1]+(o[1]-e[1])*a,e[2]+(o[2]-e[2])*a],ue=e=>o=>{for(let a=1;a<e.length;a++)if(o<=e[a][0]){const[t,r]=e[a-1],[n,s]=e[a];return Ye(r,s,(o-t)/Math.max(1e-6,n-t))}return e[e.length-1][1]},Ke=(e,o,a)=>{e=(e%1+1)%1;const t=Math.floor(e*6),r=e*6-t,n=a*(1-o),s=a*(1-r*o),i=a*(1-(1-r)*o);return[[a,s,n,n,i,a][t%6],[i,a,a,s,n,n][t%6],[n,n,i,a,a,s][t%6]]},ne=[{name:"Eisblau",f:ue([[0,[0,0,0]],[.12,[0,.03,.18]],[.35,[.02,.25,.85]],[.6,[.2,.75,1]],[.85,[.8,.95,1]],[1,[1,1,1]]])},{name:"Lagune",f:ue([[0,[0,0,0]],[.15,[0,.1,.18]],[.4,[.05,.6,.85]],[.65,[.45,.88,1]],[.85,[.78,.72,1]],[1,[1,1,1]]])},{name:"Violett",f:ue([[0,[0,0,0]],[.15,[.12,0,.25]],[.4,[.45,.12,.85]],[.65,[.72,.5,1]],[.85,[.9,.82,1]],[1,[1,1,1]]])},{name:"Glut",f:ue([[0,[0,0,0]],[.15,[.25,0,0]],[.4,[.85,.2,0]],[.65,[1,.6,.1]],[.85,[1,.92,.55]],[1,[1,1,1]]])},{name:"Pink",f:ue([[0,[0,0,0]],[.15,[.22,0,.08]],[.4,[.85,.08,.4]],[.65,[1,.45,.6]],[.85,[1,.82,.88]],[1,[1,1,1]]])},{name:"Mitternacht",f:ue([[0,[.01,.01,.06]],[.2,[.05,.05,.3]],[.45,[.25,.3,.85]],[.7,[.65,.75,1]],[1,[1,1,1]]])},{name:"Smaragd",f:ue([[0,[0,0,0]],[.15,[0,.12,.06]],[.4,[0,.6,.35]],[.65,[.35,.95,.55]],[.85,[.85,1,.7]],[1,[1,1,1]]])},{name:"Gold",f:ue([[0,[0,0,0]],[.18,[.15,.07,0]],[.45,[.6,.38,.05]],[.7,[1,.8,.3]],[1,[1,1,.85]]])},{name:"Bänder",f:(e,o)=>e<.03?[0,0,0]:Ke(Math.floor(e*10)/10*.55+o*.015,.7,Math.min(1,.25+e*.9))},{name:"Regenbogen",f:(e,o)=>e<.03?[0,0,0]:Ke(e*1.6+o*.02,.8-e*.5,Math.min(1,e*1.8))}],he=(e,o,a)=>[e*Math.cos(a)-o*Math.sin(a),e*Math.sin(a)+o*Math.cos(a)],ce=[(e,o,a)=>{const t=[];for(let r=0;r<4;r++){const n=[],s=o*.18+r*Math.PI/2;for(let i=0;i<=120;i++){const u=i/120;n.push(...he(.04+u*1.15,a((u*.5+r*.25)%1)*.13*Math.sin(u*Math.PI),s))}t.push({pts:n,pen:1,width:.0032})}return{lines:t}},(e,o,a)=>{const t=[];for(let r=-1;r<=1;r++){const n=[];for(let s=0;s<=200;s++){const i=s/200;n.push(...he(i*2.6-1.3,r*.32+a((i+r*.33+1)%1)*.16,Math.sin(o*.11)*.25))}t.push({pts:n,pen:1,width:.003})}return{lines:t}},(e,o,a,t)=>{const r=[];for(let n=0;n<3;n++){const s=[],i=o*(.2+n*.07)*(n%2?-1:1)+n,u=.75+t(.1+n*.3)*.15,c=.3+n*.08;for(let l=0;l<=220;l++){const d=l/220,m=d*Math.PI*2,v=1+a(d)*.07;s.push(...he(Math.cos(m)*u*v,Math.sin(m)*c*v,i))}r.push({pts:s,pen:.95,width:.0028,closed:!0})}return{lines:r}},(e,o,a)=>{const t=[];for(let n=0;n<10;n++){const s=[],i=o*.3+n/10*Math.PI*2;for(let u=0;u<=60;u++){const c=u/60;s.push(...he(.1+c*1.05,a((c+n/10)%1)*.07*c,i))}t.push({pts:s,pen:.95,width:.0028})}return{lines:t}},(e,o,a)=>{const t=[],r=.38+.08*Math.min(1.5,e.bassAtt);for(let n=0;n<=300;n++){const s=n/300,i=s*Math.PI*2+o*.2,u=r+a(s)*.12;t.push(Math.cos(i)*u,Math.sin(i)*u)}return{lines:[{pts:t,pen:1,width:.0032,closed:!0}]}},(e,o,a,t)=>{const r=[],n=.6+.2*t(.1);for(let s=0;s<=420;s++){const i=s/420,u=i*Math.PI*2,c=n*Math.cos(3*u)+a(i)*.04;r.push(...he(c*Math.cos(u),c*Math.sin(u),o*.15))}return{lines:[{pts:r,pen:1,width:.003,closed:!0}]}},(e,o,a,t)=>{const r=[];for(let s=0;s<64;s++){const i=s/64,u=t(Math.abs(i*2-1)),c=i*Math.PI*2+o*.12,l=.1,d=l+.08+u*.85;r.push({pts:[l*Math.cos(c),l*Math.sin(c),d*Math.cos(c),d*Math.sin(c)],pen:.6+.4*u,width:.0035})}return{lines:r}},(e,o,a,t)=>{const r=[];for(let n=0;n<3;n++)for(let s=0;s<28;s++){const i=s/27,u=o*(.35+n*.12)+i*Math.PI*1.25+n*2.1,c=.32+n*.22+a(i)*.03;r.push({x:c*Math.cos(u)*1.3,y:c*Math.sin(u)*.85,r:.006+t(i)*.014,pen:.95})}return{dots:r}},(e,o,a)=>{const t=[];for(let r=0;r<7;r++)for(const n of[1,-1]){const s=[],i=(r-3)*.12+Math.sin(o*.3)*.1;for(let u=0;u<=50;u++){const c=u/50;s.push(...he(n*(.05+c*1.2),a((c+r*.13)%1)*.05*c,i*n))}t.push({pts:s,pen:.9,width:.0026})}return{lines:t}},(e,o,a)=>{const t=[];for(let r=0;r<=360;r++){const n=r/360,s=n*Math.PI*7+o*.5,i=.04+n*1+a(n)*.045;t.push(Math.cos(s)*i,Math.sin(s)*i)}return{lines:[{pts:t,pen:1,width:.003}]}}],$e=[(e,o)=>{const a=[];for(let t=0;t<6;t++){const r=o*3+t/6*Math.PI*2;a.push({pts:[e.x,e.y,e.x+Math.cos(r)*.08,e.y+Math.sin(r)*.08],pen:.95,width:.0028})}return a},(e,o)=>{const a=[];for(let t=0;t<=40;t++){const r=t/40*Math.PI*2;a.push(e.x+Math.cos(r)*.06*(1+.3*Math.sin(o*5)),e.y+Math.sin(r)*.06)}return[{pts:a,pen:.95,width:.0028,closed:!0}]}];function lt(e,o){const a=K(e,st),t=K(e,ut,it),r=K(e,ct),n=K(e,ft);let s=null,i=null;const u=8e4,c=new Float32Array(u*4),l=e.createBuffer(),d=e.createVertexArray();e.bindVertexArray(d),e.bindBuffer(e.ARRAY_BUFFER,l),e.bufferData(e.ARRAY_BUFFER,c.byteLength,e.DYNAMIC_DRAW);const m=e.getAttribLocation(t.p,"p"),v=e.getAttribLocation(t.p,"a");e.enableVertexAttribArray(m),e.vertexAttribPointer(m,2,e.FLOAT,!1,16,0),e.enableVertexAttribArray(v),e.vertexAttribPointer(v,2,e.FLOAT,!1,16,8),e.bindVertexArray(null);const y=e.createTexture(),R=new Uint8Array(256*4);e.bindTexture(e.TEXTURE_2D,y),e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,256,1,0,e.RGBA,e.UNSIGNED_BYTE,R),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE);const k=e.createTexture(),P=document.createElement("canvas");P.width=1024,P.height=256;let z=null,L=-99,F=Math.random,p=null;const f={shape:[0,0,1,0],flow:[0,0,1,0],map:[0,0,1,0],ta:0,tb:0};let _=null;const B=[];let E=12,h=0;const M={shape:[25,45],flow:[30,55],map:[22,40]},A=(T,S,w)=>{const x=f[T];x[0]=x[1],x[1]=w,x[2]=0,x[3]=h+M[T][0]+F()*(M[T][1]-M[T][0])},C=(T,S)=>{let w=p[T].next();return w===f[T][1]&&(w=p[T].next()),w%S},b=(T,S)=>{const w=P.getContext("2d");w.fillStyle="#000",w.fillRect(0,0,1024,256),w.fillStyle="#fff",w.textAlign="center",w.textBaseline="middle",w.font="700 64px system-ui, -apple-system, Segoe UI, sans-serif",w.fillText(String(T||"").slice(0,40),512,100),w.font="400 40px system-ui, -apple-system, Segoe UI, sans-serif",w.fillText(String(S||"").slice(0,50),512,172),e.bindTexture(e.TEXTURE_2D,k),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,P),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)};return{look:{linear:!1,bloom:.12,scale:1,expo:1,vignette:0},keys:{m:()=>(A("shape",ce.length,C("shape",ce.length)),"Figur gewechselt"),p:()=>(A("map",ne.length,C("map",ne.length)),`Farben: ${ne[f.map[1]].name}`)},resize(T,S){s&&s.dispose(),i&&i.dispose(),s=Ce(e,T,S,o),i=Z(e,T,S,o)},render(T,S){const w=T.dt;if(h+=w,_!==S.seed){_=S.seed;let N=Math.floor(S.seed*1e6)||1;F=()=>(N=N*16807%2147483647)/2147483647,p={shape:ve(ce.length,F),flow:ve(ye,F),map:ve(ne.length,F)};for(const[q,V]of[["shape",ce.length],["flow",ye],["map",ne.length]]){const O=C(q,V);f[q]=[O,O,1,h+M[q][0]+F()*(M[q][1]-M[q][0])]}}T.playing&&(h>f.shape[3]&&f.shape[2]>=1&&A("shape",ce.length,C("shape",ce.length)),h>f.flow[3]&&f.flow[2]>=1&&A("flow",ye,C("flow",ye)),h>f.map[3]&&f.map[2]>=1&&A("map",ne.length,C("map",ne.length))),f.shape[2]=Math.min(1,f.shape[2]+w/2),f.flow[2]=Math.min(1,f.flow[2]+w/5),f.map[2]=Math.min(1,f.map[2]+w/4),f.ta+=w,f.tb+=w,e.bindFramebuffer(e.FRAMEBUFFER,s.dst.fb),e.viewport(0,0,s.dst.w,s.dst.h),e.useProgram(a.p),ie(e,a,T,S),I(e,a,"uPrev",s.src.tex,0),e.uniform1i(a.u.uFa,f.flow[0]),e.uniform1i(a.u.uFb,f.flow[1]),e.uniform1f(a.u.uFm,f.flow[2]*f.flow[2]*(3-2*f.flow[2])),e.uniform1f(a.u.uTa,f.ta),e.uniform1f(a.u.uTb,f.tb);const x=Math.min(3,w*60);e.uniform1f(a.u.uAmt,x*(.8+.45*Math.min(2,T.bassAtt))),e.uniform1f(a.u.uDecay,Math.pow(.988,x)),e.bindVertexArray(S.quadVao),e.drawArrays(e.TRIANGLES,0,3);let D=0;const G=(N,q,V,O)=>{if(D>=u)return;const g=D*4;c[g]=N,c[g+1]=q,c[g+2]=V,c[g+3]=O,D++},J=2/s.dst.h,U=(N,q,V,O)=>{const g=Math.max(q,1.3*J),oe=N.length/2,de=O?oe:oe-1;for(let Ee=0;Ee<de;Ee++){const Ge=(Ee+1)%oe,ke=N[Ee*2],Re=N[Ee*2+1],Ae=N[Ge*2],Pe=N[Ge*2+1];let ae=-(Pe-Re),re=Ae-ke;const Oe=Math.hypot(ae,re)||1;ae=ae/Oe*g,re=re/Oe*g,G(ke+ae,Re+re,1,V),G(ke-ae,Re-re,-1,V),G(Ae+ae,Pe+re,1,V),G(ke-ae,Re-re,-1,V),G(Ae-ae,Pe-re,-1,V),G(Ae+ae,Pe+re,1,V)}},ee=(N,q,V,O)=>{const g=[];for(let oe=0;oe<12;oe++)g.push(N+Math.cos(oe/12*6.283)*V,q+Math.sin(oe/12*6.283)*V);U(g,V*.35,O,!0)},Te=N=>Math.max(-1.3,Math.min(1.3,T.waveRaw[Math.min(511,Math.max(0,Math.round(N*511)))])),j=N=>{const q=Math.min(31,Math.max(0,N*31)),V=Math.floor(q),O=q-V;return Math.min(1,T.bands[V]*(1-O)+T.bands[Math.min(31,V+1)]*O)},Q=T.playing?Math.min(1,.75+.25*Math.min(1.5,T.bassAtt)):.1,X=f.shape[2],Y=(N,q)=>{if(q<=.01)return;const V=ce[N](T,h,Te,j);for(const O of V.lines||[])U(O.pts,O.width,O.pen*Q*q,O.closed);for(const O of V.dots||[])ee(O.x,O.y,O.r,O.pen*Q*q)};Y(f.shape[0],1-X),Y(f.shape[1],X),T.playing&&h>E&&(E=h+14+F()*24,B.push({k:Math.floor(F()*$e.length),t0:h,life:5+F()*4,a:F()*6.28,sp:(F()<.5?-1:1)*(.25+F()*.3)}));for(let N=B.length-1;N>=0;N--){const q=B[N],V=h-q.t0;if(V>q.life){B.splice(N,1);continue}const O=q.a+V*q.sp,g={x:Math.cos(O)*(.5+.2*Math.sin(V))*S.aspect*.8,y:Math.sin(O*1.3)*.6},oe=Math.min(1,V,q.life-V);for(const de of $e[q.k](g,h))U(de.pts,de.width,de.pen*oe*Q,de.closed)}D&&(e.useProgram(t.p),e.uniform1f(t.u.uAspect,S.aspect),e.bindBuffer(e.ARRAY_BUFFER,l),e.bufferSubData(e.ARRAY_BUFFER,0,c.subarray(0,D*4)),e.bindVertexArray(d),e.enable(e.BLEND),e.blendEquation(e.MAX),e.drawArrays(e.TRIANGLES,0,D));const Be=S.title?`${S.title}|${S.artist}`:null;Be&&Be!==z&&(z=Be,b(S.title,S.artist),L=h);const Ve=h-L;if(Ve<3.2){const N=Math.min(1,Ve/.4)*Math.min(1,(3.2-Ve)/.8)*.95;e.useProgram(r.p),I(e,r,"uText",k,0),e.uniform1f(r.u.uAmt,N),e.enable(e.BLEND),e.blendEquation(e.MAX);const q=Math.round(s.dst.w*.6),V=Math.round(q/4);e.viewport(Math.round((s.dst.w-q)/2),Math.round(s.dst.h*.5-V/2),q,V),e.bindVertexArray(S.quadVao),e.drawArrays(e.TRIANGLES,0,3),e.viewport(0,0,s.dst.w,s.dst.h)}e.blendEquation(e.FUNC_ADD),e.disable(e.BLEND);const Je=f.map[2]*f.map[2]*(3-2*f.map[2]),Qe=ne[f.map[0]].f,ge=ne[f.map[1]].f;for(let N=0;N<256;N++){const q=N/255,V=Ye(Qe(q,h),ge(q,h),Je);R[N*4]=Math.round(Math.min(1,V[0])*255),R[N*4+1]=Math.round(Math.min(1,V[1])*255),R[N*4+2]=Math.round(Math.min(1,V[2])*255),R[N*4+3]=255}return e.bindTexture(e.TEXTURE_2D,y),e.texSubImage2D(e.TEXTURE_2D,0,0,0,256,1,e.RGBA,e.UNSIGNED_BYTE,R),e.bindFramebuffer(e.FRAMEBUFFER,i.fb),e.viewport(0,0,i.w,i.h),e.useProgram(n.p),I(e,n,"uI",s.dst.tex,0),I(e,n,"uMap",y,1),e.bindVertexArray(S.quadVao),e.drawArrays(e.TRIANGLES,0,3),s.swap(),i.tex},info(){return`Figur ${f.shape[1]+1}/${ce.length} (M) · Strömung ${f.flow[1]+1}/${ye} · Farben ${ne[f.map[1]].name} (P)`},dispose(){s&&s.dispose(),i&&i.dispose(),e.deleteBuffer(l),e.deleteVertexArray(d),e.deleteTexture(y),e.deleteTexture(k);for(const T of[a,t,r,n])e.deleteProgram(T.p)}}}const fe=256,qe=128,Me=fe*qe,mt=`#version 300 es
${pe}
${ze}
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
  float id = float(ij.y * ${fe} + ij.x);
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
}`,pt=`#version 300 es
${pe}
uniform sampler2D uPos, uVel;
uniform mat4 uVP;
uniform float uPx;
out vec3 vc;
void main(){
  int id = gl_VertexID;
  ivec2 ij = ivec2(id % ${fe}, id / ${fe});
  vec4 P = texelFetch(uPos, ij, 0), V = texelFetch(uVel, ij, 0);
  float b = V.w;
  float e = band(b / 31.);
  vec4 clip = uVP * vec4(P.xyz, 1.);
  gl_Position = clip;
  float life = clamp(P.w * 2., 0., 1.);
  gl_PointSize = clamp((1.1 + 2.4 * e * e) * uPx / max(clip.w, .3), 1., 9.);
  vc = pal(b / 31. * .85) * (.018 + .2 * e * e + .025 * length(V.xyz)) * life;
}`,dt=`#version 300 es
precision mediump float;
in vec3 vc; out vec4 o;
void main(){ float d = length(gl_PointCoord - .5) * 2.; o = vec4(vc * exp(-d * d * 3.), 1.); }`,ht=`#version 300 es
${pe}
uniform sampler2D uPos, uVel;
uniform mat4 uVP;
out vec3 vc;
void main(){
  int id = gl_VertexID / 2, end = gl_VertexID % 2;
  ivec2 ij = ivec2(id % ${fe}, id / ${fe});
  vec4 P = texelFetch(uPos, ij, 0), V = texelFetch(uVel, ij, 0);
  float e = band(V.w / 31.);
  vec3 p = P.xyz - V.xyz * .07 * float(end);
  gl_Position = uVP * vec4(p, 1.);
  vc = pal(V.w / 31. * .85) * (.01 + .12 * e * e) * (1. - float(end)) * clamp(P.w * 2., 0., 1.);
}`,xt=`#version 300 es
precision mediump float;
in vec3 vc; out vec4 o;
void main(){ o = vec4(vc, 1.); }`,vt=$(`
uniform sampler2D uPrev; uniform float uDecay;
void main(){ o = vec4(max(texture(uPrev, uv).rgb * uDecay - .001, 0.), 1.); }`),bt=$(`
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
}`),Se=[{name:"Nordlicht",c:[.05,.35,1,.25,.75,1,.55,.25,1,.95,.2,.75,.2,.9,.85]},{name:"Glut",c:[1,.35,.05,1,.15,.3,1,.65,.2,.8,.1,.6,1,.85,.5]},{name:"Cover",c:null}];function Tt(e,o){const a=!!e.getExtension("EXT_color_buffer_float"),t=K(e,mt),r=K(e,dt,pt),n=K(e,xt,ht),s=K(e,vt),i=K(e,bt),c=a?(()=>{const p=new Float32Array(Me*4),f=new Float32Array(Me*4);for(let E=0;E<Me;E++){const h=E%32%4,M=Math.random()*Math.PI*2,A=Math.random()*2-1,C=.3+Math.random()*1.2,b=Math.sqrt(1-A*A);p[E*4]=Math.cos(M)*b*C+(h-1.5)*.4,p[E*4+1]=A*C,p[E*4+2]=Math.sin(M)*b*C,p[E*4+3]=Math.random()*8,f[E*4+3]=E%32}const _=E=>{const h=e.createTexture();return e.bindTexture(e.TEXTURE_2D,h),e.texImage2D(e.TEXTURE_2D,0,e.RGBA32F,fe,qe,0,e.RGBA,e.FLOAT,E),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),h};return[0,1].map(()=>{const E=_(p),h=_(f),M=e.createFramebuffer();return e.bindFramebuffer(e.FRAMEBUFFER,M),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,E,0),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT1,e.TEXTURE_2D,h,0),{p:E,v:h,fb:M}})})():null;let l=0;const d=e.createVertexArray();let m=null,v=null,y=0,R=0,k=0,P=0,z=0;const L=[0,1,2,3].map(()=>({p:[0,0,0],ax:[0,1,0],e:0})),F=(p,f)=>[1.05*Math.sin(f*(.11+p*.023)+p*1.7),.55*Math.sin(f*(.07+p*.019)+p*.9),1.05*Math.cos(f*(.09+p*.021)+p*2.3)];return{look:{linear:!0,bloom:.55,scale:.75,expo:.95},needs:a?null:"Diese Grafikkarte kann keine Float-Texturen rendern (für Magnetfeld nötig).",keys:{p:()=>(z=(z+1)%Se.length,`Farben: ${Se[z].name}`)},resize(p,f){m&&m.dispose(),v&&v.dispose(),m=Ce(e,p,f,o),v=Z(e,p,f,o)},render(p,f){const _=p.dt;y+=_;const B=Se[z].c||Array.from(f.palette),E=[[0,6],[6,14],[14,22],[22,32]];for(let b=0;b<4;b++){const T=L[b];T.p=F(b,y);const S=y*(.05+b*.013)+b,w=[Math.sin(S)*.4,1,Math.cos(S*1.3)*.4],x=Math.hypot(...w);T.ax=w.map(G=>G/x*(b%2?-1:1));let D=0;for(let G=E[b][0];G<E[b][1];G++)D+=p.bands[G];D/=E[b][1]-E[b][0],T.e+=(D-T.e)*(1-Math.exp(-_*10))}p.events.kick!==k&&(k=p.events.kick,P=1),P*=Math.exp(-_*9);const h=y*.06,M=[Math.sin(h)*4.4,.9*Math.sin(y*.035)+.4,Math.cos(h)*4.4],A=Le(De(48*Math.PI/180,f.aspect,.1,40),_e(M,[0,0,0]));if(c){R=Math.min(R+_,.06);const b=1/60;for(e.disable(e.BLEND);R>=b;){R-=b;const T=c[l],S=c[1-l];e.bindFramebuffer(e.FRAMEBUFFER,S.fb),e.drawBuffers([e.COLOR_ATTACHMENT0,e.COLOR_ATTACHMENT1]),e.viewport(0,0,fe,qe),e.useProgram(t.p),ie(e,t,p,f),I(e,t,"uPos",T.p,0),I(e,t,"uVel",T.v,1),e.uniform3fv(t.u.uCore,L.flatMap(w=>w.p)),e.uniform3fv(t.u.uAxis,L.flatMap(w=>w.ax)),e.uniform1fv(t.u.uCoreE,L.map(w=>w.e)),e.uniform1f(t.u.uStep,b),e.uniform1f(t.u.uTime,y),e.uniform1f(t.u.uBurst,P),e.bindVertexArray(f.quadVao),e.drawArrays(e.TRIANGLES,0,3),l=1-l}}if(e.bindFramebuffer(e.FRAMEBUFFER,m.dst.fb),e.viewport(0,0,m.dst.w,m.dst.h),e.useProgram(s.p),I(e,s,"uPrev",m.src.tex,0),e.uniform1f(s.u.uDecay,Math.pow(.62,_*60)),e.bindVertexArray(f.quadVao),e.drawArrays(e.TRIANGLES,0,3),c){const b=c[l];e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE),e.bindVertexArray(d),e.useProgram(n.p),ie(e,n,p,f),e.uniform3fv(n.u.uPal,B),I(e,n,"uPos",b.p,0),I(e,n,"uVel",b.v,1),e.uniformMatrix4fv(n.u.uVP,!1,A),e.drawArrays(e.LINES,0,Me*2),e.useProgram(r.p),ie(e,r,p,f),e.uniform3fv(r.u.uPal,B),I(e,r,"uPos",b.p,0),I(e,r,"uVel",b.v,1),e.uniformMatrix4fv(r.u.uVP,!1,A),e.uniform1f(r.u.uPx,m.dst.h/300),e.drawArrays(e.POINTS,0,Me),e.disable(e.BLEND)}m.swap();const C=[];for(const b of L){const T=[b.p[0],b.p[1],b.p[2],1],S=A[0]*T[0]+A[4]*T[1]+A[8]*T[2]+A[12],w=A[1]*T[0]+A[5]*T[1]+A[9]*T[2]+A[13],x=A[3]*T[0]+A[7]*T[1]+A[11]*T[2]+A[15],D=(.035+.035*b.e+.02*P)*(4.4/Math.max(.5,x));C.push(S/x*.5+.5,w/x*.5+.5,x>.1?D:0)}return e.bindFramebuffer(e.FRAMEBUFFER,v.fb),e.viewport(0,0,v.w,v.h),e.useProgram(i.p),ie(e,i,p,f),e.uniform3fv(i.u.uPal,B),I(e,i,"uTrail",m.src.tex,0),e.uniform3fv(i.u.uCoreS,C),e.uniform1fv(i.u.uCoreE,L.map(b=>b.e)),e.uniform1f(i.u.uYaw,h),e.bindVertexArray(f.quadVao),e.drawArrays(e.TRIANGLES,0,3),v.tex},info(){return`Farben: ${Se[z].name} (P)`},dispose(){if(m&&m.dispose(),v&&v.dispose(),c)for(const p of c)e.deleteTexture(p.p),e.deleteTexture(p.v),e.deleteFramebuffer(p.fb);e.deleteVertexArray(d);for(const p of[t,r,n,s,i])e.deleteProgram(p.p)}}}const Et=$(`
uniform vec3 uNeon;
uniform int uShapeA, uShapeB; uniform float uShapeM;
uniform float uBeam[4], uBeamX[4];
uniform float uPx;                     // ein Bildpunkt in Bild-Einheiten (Höhe = 1)
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
  // weiche Bewegung entlang der Linie: Spektrum (gespiegelt) + langsame Welle - keine Zacken
  p /= 1. + .025 * uKick;
  float a = atan(p.y, p.x) / 6.2831853 + .5;
  float wob = (band(abs(fract(a * 2.) * 2. - 1.)) - .45) * .016 * (.5 + .5 * min(uBassAtt, 2.))
            + .004 * sin(a * 18.849 + uT * 1.3) * min(uMidAtt, 2.);
  vec2 sa = shape(uShapeA, p), sb = shape(uShapeB, p);
  vec2 s = mix(sa, sb, uShapeM);
  float d = max(abs(s.x + wob), 0.);
  float pulse = .75 + .45 * uPulse + .25 * min(uBass, 2.) * .5;
  float core = 1. - smoothstep(max(1.2 * uPx, .0012), max(2.6 * uPx, .0028), d);   // scharfe, geglättete Röhre
  vec3 c = mix(uNeon, vec3(1.), .6) * core * 1.1;
  c += uNeon * (exp(-d / .006) * .55 + exp(-d / .035) * .14) * pulse;           // Leuchten
  c += uNeon * s.y * .025 * pulse;                                               // Licht innen
  return c;
}

// Felsen: Oberkante (gezackt, mehrere Grössen) über der Wasserlinie
float island(float x){
  float w = smoothstep(.47, .18, abs(x));
  float n = .016 * gnoise(vec2(x * 8., 1.3)) + .008 * gnoise(vec2(x * 23., 4.1)) + .004 * gnoise(vec2(x * 61., 7.7)) + .002 * gnoise(vec2(x * 150., 2.));
  return HZ + .006 + w * (.048 + n) + (1. - w) * n * .3;
}

vec3 world(vec2 q){
  vec2 p = q - C;
  // Nebel: dünn, zieht seitlich; Licht hinter der Form
  float f = fbm(vec3(q * vec2(1.1, 2.4) + vec2(uT * .02, 0.), uT * .035));
  float near = exp(-length(p * vec2(.8, 1.)) * 2.);
  vec3 col = uNeon * (.004 + (.018 + .035 * min(uBassAtt, 2.) * .5) * smoothstep(-.2, .6, f) * (.25 + near));
  col += uNeon * exp(-length(p) * 3.2) * .05 * (.6 + .4 * uPulse);
  // Lichtstrahlen (schmal und scharf)
  for (int k = 0; k < 4; k++) {
    float dx = abs(q.x - uBeamX[k]);
    col += uNeon * uBeam[k] * ((1. - smoothstep(uPx, 3. * uPx, dx)) * .8 + exp(-dx * 60.) * .04) * smoothstep(HZ, HZ + .45, q.y);
  }
  col += neon(p);
  // Felsen: fast schwarz mit Gesteinsstruktur, Oberkante vom Neon angeleuchtet
  float top = island(q.x);
  float edge = smoothstep(top + uPx, top - uPx, q.y) * step(HZ - .001, q.y);
  if (edge > 0.) {
    float tex = .5 + .5 * gnoise(q * vec2(90., 160.)) * gnoise(q * vec2(31., 50.) + 3.);
    float lit = exp(-(top - q.y) / .006) * .5 + exp(-(top - q.y) / .03) * .08;
    vec3 rock = vec3(.006 + .006 * tex) + uNeon * lit * (.6 + .5 * uPulse) * smoothstep(.5, .05, abs(q.x));
    col = mix(col, rock, edge);
  }
  return col;
}

void main(){
  vec2 q = (uv - .5) * vec2(uAspect, 1.);
  vec3 col;
  if (q.y >= HZ) col = world(q);
  else {
    float depth = HZ - q.y;
    // Wellen: nahe am Horizont ruhig, weiter vorne stärker
    float rip = (gnoise(vec2(q.x * 14., q.y * 60. - uT * 1.2)) * .6 + .4 * sin(q.y * 120. + uT * 1.8)) * (.0008 + depth * .022);
    vec2 rq = vec2(q.x + rip, HZ + depth + rip * .3);
    col = world(rq) * (.5 - depth * .55) + vec3(.003, .004, .006);
  }
  // Neon-Linie unten: weich, wölbt sich mit dem Spektrum (von der Mitte nach aussen)
  float yl = -.4;
  float xw = q.x / (uAspect * .3);
  if (abs(xw) < 1.) {
    float taper = smoothstep(1., .55, abs(xw));
    float y = yl + (band(abs(xw) * .9) * .03 * (.5 + .5 * min(uBass, 2.)) + .003 * sin(xw * 9. + uT * 2.)) * taper;
    float d = abs(q.y - y);
    float core = 1. - smoothstep(uPx, 2.4 * uPx, d);
    col += mix(uNeon, vec3(1.), .6) * core * .9 * (.4 + .6 * smoothstep(1., .85, abs(xw))) + uNeon * exp(-d / .006) * .35 * taper;
  }
  o = vec4(col, 1.);
}`),le=[[1,.32,.03],[.08,.35,1],[.55,.12,1],[1,.05,.22],[.12,1,.2],[.05,.85,1],[1,.1,.8],[1,.78,.05]];function yt(e,o){const a=K(e,Et);let t=null,r=0,n=[...le[0]],s=[...le[0]],i=[...le[0]],u=1,c=0,l=0,d=0,m=1,v=null,y=0;const R=[0,0,0,0],k=[0,0,0,0];let P=0;const z=ve(le.length),L=We({beats:64,minSec:40,maxSec:90}),F=()=>{let f=z.next();f===c&&(f=z.next()),c=f,s=[...n],i=[...le[c]],u=0},p=()=>{l=d,d=(d+1+Math.floor(Math.random()*4))%5,m=0};return{look:{linear:!0,bloom:.42,scale:1,expo:.95,full:!0},label:"center",keys:{m:()=>(p(),"Form gewechselt"),p:()=>(F(),"Farbe gewechselt")},resize(f,_){t&&t.dispose(),t=Z(e,f,_,o)},render(f,_){const B=f.dt;if(r+=B,v!==_.seed){const h=v===null;v=_.seed;const M=Math.floor(_.seed*97)%5;h?(l=d=M,c=Math.floor(_.seed*le.length),n=[...le[c]],i=[...n],u=1):M!==d&&(l=d,d=M,m=0)}L.tick(f,B)&&F(),u=Math.min(1,u+B/1.5),m=Math.min(1,m+B/1.2);const E=u*u*(3-2*u);if(n=s.map((h,M)=>h+(i[M]-h)*E),f.events.kick!==y&&(y=f.events.kick,r>P)){const h=R.indexOf(Math.min(...R));R[h]=1,k[h]=(Math.random()-.5)*1.6,P=r+.25}for(let h=0;h<4;h++)R[h]*=Math.exp(-B*3);return e.bindFramebuffer(e.FRAMEBUFFER,t.fb),e.viewport(0,0,t.w,t.h),e.useProgram(a.p),ie(e,a,f,_),e.uniform3fv(a.u.uNeon,n),e.uniform1i(a.u.uShapeA,l),e.uniform1i(a.u.uShapeB,d),e.uniform1f(a.u.uShapeM,m*m*(3-2*m)),e.uniform1fv(a.u.uBeam,R),e.uniform1fv(a.u.uBeamX,k),e.uniform1f(a.u.uPx,1/t.h),e.bindVertexArray(_.quadVao),e.drawArrays(e.TRIANGLES,0,3),t.tex},dispose(){t&&t.dispose(),e.deleteProgram(a.p)}}}const Mt=`#version 300 es
precision mediump float;
in vec3 vc; out vec4 o;
void main(){ float d = length(gl_PointCoord - .5) * 2.; o = vec4(vc * smoothstep(1., .2, d), 1.); }`,wt=$(`
uniform sampler2D uPrev; uniform float uDecay;
void main(){ o = vec4(max(texture(uPrev, uv).rgb * uDecay - .002, 0.), 1.); }`),Fe=26e3,kt=`#version 300 es
${pe}
${ze}
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
  int id = gl_VertexID, shell = id / ${Fe}, i = id % ${Fe};
  float fi = float(i) + .5;
  float y = 1. - 2. * fi / ${Fe}.;
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
}`,we=240,Ue=150,Rt=`#version 300 es
${pe}
${ze}
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
  int id = gl_VertexID, ix = id % ${we}, iz = id / ${we};
  float u = float(ix) / ${we-1}., v = float(iz) / ${Ue-1}.;
  vec4 P = pos(u, v);
  vec3 px = pos(u + 1. / ${we}., v).xyz, pz = pos(u, v + 1. / ${Ue}.).xyz;
  vec3 nrm = normalize(cross(pz - P.xyz, px - P.xyz));
  if (nrm.y < 0.) nrm = -nrm;
  vec4 clip = uVP * vec4(P.xyz, 1.);
  gl_Position = clip;
  gl_PointSize = clamp((2. + 2.5 * P.w) * uPx / clip.w, 1., 6.);
  float light = .18 + .82 * pow(max(0., dot(nrm, normalize(vec3(-.55, .75, -.4)))), 1.5);
  float dist = length(P.xyz - vec3(0., 0., 2.));
  float fade = exp(-max(0., P.z) * .2) * smoothstep(0., .06, v) * smoothstep(1., .9, v);
  vc = mix(vec3(1.), pal(u * .5 + v * .3 + P.w * .3), uTint) * (light * .55 + P.w * 1.4) * fade * .6;
}`;function Xe(e,o,a,t,r){const n=K(e,Mt,a),s=K(e,wt),i=e.createVertexArray();let u=null,c=null,l=0;return{resize(d,m){u&&u.dispose(),c&&c.dispose(),u=Ce(e,d,m,o),c=Z(e,d,m,o)},tint(d){l=d},render(d,m,v){return e.bindFramebuffer(e.FRAMEBUFFER,u.dst.fb),e.viewport(0,0,u.dst.w,u.dst.h),e.useProgram(s.p),I(e,s,"uPrev",u.src.tex,0),e.uniform1f(s.u.uDecay,Math.pow(v,d.dt*60)),e.bindVertexArray(m.quadVao),e.drawArrays(e.TRIANGLES,0,3),e.useProgram(n.p),ie(e,n,d,m),e.uniform1f(n.u.uPx,u.dst.h/240),e.uniform1f(n.u.uTint,l),r(n),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE),e.bindVertexArray(i),e.drawArrays(e.POINTS,0,t),e.disable(e.BLEND),u.swap(),u.src.tex},dispose(){u&&u.dispose(),c&&c.dispose(),e.deleteVertexArray(i),e.deleteProgram(n.p),e.deleteProgram(s.p)}}}const se=[{name:"Weiss",v:0},{name:"Hauch Farbe",v:.35},{name:"Cover-Farben",v:.85}];function Ze(e,o){let a=0,t=0,r=1,n=-1e9,s=0,i=ve(e);const u=We({beats:64,minSec:45,maxSec:100}),c=l=>{a=t,t=l,r=0,u.reset()};return{tick(l,d){if(s+=d,u.tick(l,d)&&r>=1&&s-n>120){let m=i.next();m===t&&(m=i.next()),c(m)}return r=Math.min(1,r+d/4),{a,b:t,m:r*r*(3-2*r)}},next(){return n=s,c((t+1)%e),`Muster: ${o[t]}`},name:()=>o[t],seed(l){t=Math.floor(l*e)%e,a=t,r=1;let d=Math.floor(l*1e6)||1;i=ve(e,()=>(d=d*16807%2147483647)/2147483647),u.reset()}}}function At(e,o){let a=0,t=9,r=0,n=0,s=null,i=[0,0,3.4],u=0,c=null,l={a:0,b:0,m:1};const d=Ze(4,["gefaltet","Stacheln","Ringe","Blüte"]),m=Xe(e,o,kt,Fe*3,v=>{e.uniformMatrix4fv(v.u.uVP,!1,s),e.uniform1f(v.u.uRip,t),e.uniform1f(v.u.uRipAmp,r),e.uniform3fv(v.u.uEye,i),e.uniform1i(v.u.uVa,l.a),e.uniform1i(v.u.uVb,l.b),e.uniform1f(v.u.uMorph,l.m)});return{look:{linear:!0,bloom:.45,scale:1},keys:{p:()=>(u=(u+1)%se.length,m.tint(se[u].v),`Farbe: ${se[u].name}`),m:()=>d.next()},resize:(v,y)=>m.resize(v,y),render(v,y){return a+=v.dt,c!==y.seed&&(c=y.seed,d.seed(y.seed)),l=d.tick(v,v.dt),v.events.kick!==n&&(n=v.events.kick,t=0,r=1),t+=v.dt*2.6,r*=Math.exp(-v.dt*1.6),i=[0,.15*Math.sin(a*.07),3.6],s=Le(De(40*Math.PI/180,y.aspect,.1,20),_e(i,[0,0,0])),m.render(v,y,.55)},info:()=>`${d.name()} (M) · ${se[u].name} (P)`,dispose:()=>m.dispose()}}const He=[[1.25,-1.5,-.2,2.8],[2.7,-.25,-.35,2.3],[2,-.7,-.25,2.4],[.95,-1.25,0,3]];function Pt(e,o){let a=0,t=9,r=0,n=0,s=null,i=2,u=null,c={a:0,b:0,m:1};const l=Ze(4,["Stoff","Spirale","Ringe","Landschaft"]),d=Xe(e,o,Rt,we*Ue,m=>{e.uniformMatrix4fv(m.u.uVP,!1,s),e.uniform1f(m.u.uKickR,t),e.uniform1f(m.u.uKickAmp,r),e.uniform1i(m.u.uVa,c.a),e.uniform1i(m.u.uVb,c.b),e.uniform1f(m.u.uMorph,c.m)});return d.tint(se[i].v),{look:{linear:!0,bloom:.5,scale:1},keys:{p:()=>(i=(i+1)%se.length,d.tint(se[i].v),`Farbe: ${se[i].name}`),m:()=>l.next()},resize:(m,v)=>d.resize(m,v),render(m,v){a+=m.dt,u!==v.seed&&(u=v.seed,l.seed(v.seed)),c=l.tick(m,m.dt),m.events.kick!==n&&(n=m.events.kick,t=0,r=1),t+=m.dt*2.2,r*=Math.exp(-m.dt*1.4);const y=He[c.a],R=He[c.b],k=y.map((L,F)=>L+(R[F]-L)*c.m),P=Math.sin(a*.05)*.3,z=[P,k[0]+.08*Math.sin(a*.04),k[1]];return s=Le(De(50*Math.PI/180,v.aspect,.05,30),_e(z,[P*.3,k[2],k[3]])),d.render(m,v,.45)},info:()=>`${l.name()} (M) · ${se[i].name} (P)`,dispose:()=>d.dispose()}}const St=9e4,Ft=`#version 300 es
${pe}
${ze}
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
}`;function Dt(e,o){let a=0,t=0,r=9,n=0,s=0,i=null;const u=Xe(e,o,Ft,St,c=>{e.uniformMatrix4fv(c.u.uVP,!1,i),e.uniform1f(c.u.uRipR,r),e.uniform1f(c.u.uRipA,n),e.uniform1f(c.u.uSpin,t)});return u.tint(.85),{look:{linear:!0,bloom:.8,scale:1},resize:(c,l)=>u.resize(c,l),render(c,l){a+=c.dt,t+=c.dt*(.25+.5*Math.min(2,c.midAtt)),c.events.kick!==s&&(s=c.events.kick,r=0,n=1),r+=c.dt*2.4,n*=Math.exp(-c.dt*1.2);const d=a*.04,m=[Math.sin(d)*3.4,1.9+.3*Math.sin(a*.05),Math.cos(d)*3.4];return i=Le(De(45*Math.PI/180,l.aspect,.05,30),_e(m,[0,0,0])),u.render(c,l,.55)},dispose:()=>u.dispose()}}function be(e,o,a,{look:t,label:r,keys:n,info:s,before:i,setup:u}){const c=K(e,a);let l=null;return{look:t,label:r,keys:n,info:s,resize(d,m){l&&l.dispose(),l=Z(e,d,m,o)},render(d,m){return i&&i(d,m),e.bindFramebuffer(e.FRAMEBUFFER,l.fb),e.viewport(0,0,l.w,l.h),e.useProgram(c.p),ie(e,c,d,m),u&&u(c,d,m),e.bindVertexArray(m.quadVao),e.drawArrays(e.TRIANGLES,0,3),l.tex},dispose(){l&&l.dispose(),e.deleteProgram(c.p)}}}const _t=$(`
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
}`);function Lt(e,o){let a=0,t=0,r=0,n=0,s=0;return be(e,o,_t,{look:{linear:!0,bloom:.75,scale:1},before(i){const u=i.conf>.4?i.bpm/60*.72:.6+.8*Math.min(2,i.bassAtt);a+=i.dt*u*(i.playing?1:.15),t+=i.dt*.02*(i.midAtt-.9),i.events.kick!==s&&(s=i.events.kick,r=1,n=a+7),r*=Math.exp(-i.dt*1.8)},setup(i){e.uniform1f(i.u.uSpeed,a),e.uniform1f(i.u.uTwist,t),e.uniform1f(i.u.uRing,r),e.uniform1f(i.u.uRingDepth,n)}})}const zt=$(`
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
}`);function Bt(e,o){let a=0,t=0,r=0,n=0;return be(e,o,zt,{look:{linear:!0,bloom:.6,scale:.7},before(s){a+=s.dt,t+=s.dt*.05*(.4+s.midAtt),s.events.kick!==n&&(n=s.events.kick,r=1),r*=Math.exp(-s.dt*4)},setup(s,i){const u=Math.min(2,i.bassAtt);e.uniform3f(s.u.uFold,1+.08*Math.sin(a*.11)+.05*u,.85+.06*i.bands[8],.6+.08*i.bands[20]),e.uniform1f(s.u.uScale,1.85+.05*u),e.uniform1f(s.u.uSpin,t),e.uniform1f(s.u.uGlow,r);const c=a*.06,l=[Math.sin(c)*5.2,1.2*Math.sin(a*.045),Math.cos(c)*5.2],d=Math.hypot(...l),m=l.map(k=>-k/d);let v=[-m[2],0,m[0]];const y=Math.hypot(...v)||1;v=v.map(k=>k/y);const R=[v[1]*m[2]-v[2]*m[1],v[2]*m[0]-v[0]*m[2],v[0]*m[1]-v[1]*m[0]];e.uniform3fv(s.u.uEye,l),e.uniformMatrix3fv(s.u.uView,!1,new Float32Array([...v,...R,...m]))}})}const Vt=$(`
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
}`);function Nt(e,o){let a=0;return be(e,o,Vt,{look:{linear:!0,bloom:.55,scale:.85},before(t){a+=t.dt*(.5+.8*Math.min(2,t.bassAtt))},setup(t){e.uniform1f(t.u.uFlow,a)}})}const It=$(`
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
}`);function qt(e,o){let a=0;return be(e,o,It,{look:{linear:!0,bloom:.8,scale:1},before(t){const r=t.conf>.4?t.bpm/60:1.2;a+=t.dt*r*.5*(t.playing?1:.2)},setup(t,r){e.uniform1f(t.u.uMove,a),e.uniform1f(t.u.uSun,r.pulse)}})}const Ut=$(`
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
}`);function Ct(e,o){const a=[];for(let r=0;r<32;r++){const n=1-2*(r+.5)/32,s=Math.sqrt(1-n*n),i=r*2.39996323;a.push(Math.cos(i)*s,n,Math.sin(i)*s)}let t=0;return be(e,o,Ut,{look:{linear:!0,bloom:.5,scale:.8},before(r){t+=r.dt*(.15+.15*Math.min(2,r.midAtt))},setup(r,n){const s=t,i=t*.7,u=Math.cos(s),c=Math.sin(s),l=Math.cos(i),d=Math.sin(i);e.uniformMatrix3fv(r.u.uRotM,!1,new Float32Array([u,c*d,-c*l,0,l,d,c,-u*d,u*l])),e.uniform3fv(r.u.uDir,a),e.uniform1f(r.u.uR,.9+.08*Math.min(2,n.bassAtt))}})}const Xt=$(`
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
}`);function Gt(e,o){const a=e.createTexture();let t=null,r=0,n=0,s=8;return be(e,o,Xt,{look:{linear:!0,bloom:.35,scale:1,vignette:.6},keys:{m:()=>(s=s>=12?4:s+2,`Spiegel: ${s}-fach`)},info:()=>`${s}-fach (M)`,before(i,u){u.coverCanvas!==t&&(t=u.coverCanvas,r=t?1:0,t&&(e.bindTexture(e.TEXTURE_2D,a),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,t),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE))),n+=i.dt*(i.conf>.4?.12:.08)*(.5+i.midAtt)},setup(i,u){e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,a),e.uniform1i(i.u.uCover,0),e.uniform1f(i.u.uHas,r),e.uniform1f(i.u.uN,s),e.uniform1f(i.u.uRot,n),e.uniform1f(i.u.uZoom,1.25-.12*Math.min(1,u.bass*.5)-.08*u.pulse),e.uniform1f(i.u.uAb,u.kick)}})}const Ot=$(`
uniform sampler2D uVel, uSrc; uniform vec2 uTexel; uniform float uStep, uDiss;
void main(){
  vec2 p = uv - uStep * texture(uVel, uv).xy * uTexel;
  o = vec4(texture(uSrc, p).rgb / (1. + uDiss * uStep), 1.);
}`),Kt=$(`
uniform sampler2D uSrc; uniform vec2 uPoint; uniform vec3 uVal; uniform float uRad;
void main(){
  vec2 d = uv - uPoint; d.x *= uAspect;
  o = vec4(texture(uSrc, uv).rgb + uVal * exp(-dot(d, d) / uRad), 1.);
}`),$t=$(`
uniform sampler2D uVel; uniform vec2 uTexel;
void main(){
  float L = texture(uVel, uv - vec2(uTexel.x, 0.)).y, R = texture(uVel, uv + vec2(uTexel.x, 0.)).y;
  float B = texture(uVel, uv - vec2(0., uTexel.y)).x, T = texture(uVel, uv + vec2(0., uTexel.y)).x;
  o = vec4(.5 * (R - L - T + B), 0., 0., 1.);
}`),Ht=$(`
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
}`),jt=$(`
uniform sampler2D uVel; uniform vec2 uTexel;
void main(){
  vec2 c = texture(uVel, uv).xy;
  float L = texture(uVel, uv - vec2(uTexel.x, 0.)).x, R = texture(uVel, uv + vec2(uTexel.x, 0.)).x;
  float B = texture(uVel, uv - vec2(0., uTexel.y)).y, T = texture(uVel, uv + vec2(0., uTexel.y)).y;
  if (uv.x - uTexel.x < 0.) L = -c.x; if (uv.x + uTexel.x > 1.) R = -c.x;
  if (uv.y - uTexel.y < 0.) B = -c.y; if (uv.y + uTexel.y > 1.) T = -c.y;
  o = vec4(.5 * (R - L + T - B), 0., 0., 1.);
}`),Wt=$(`
uniform sampler2D uSrc; uniform float uK;
void main(){ o = vec4(texture(uSrc, uv).rgb * uK, 1.); }`),Yt=$(`
uniform sampler2D uP, uDiv; uniform vec2 uTexel;
void main(){
  float L = texture(uP, uv - vec2(uTexel.x, 0.)).x, R = texture(uP, uv + vec2(uTexel.x, 0.)).x;
  float B = texture(uP, uv - vec2(0., uTexel.y)).x, T = texture(uP, uv + vec2(0., uTexel.y)).x;
  o = vec4((L + R + B + T - texture(uDiv, uv).x) * .25, 0., 0., 1.);
}`),Zt=$(`
uniform sampler2D uP, uVel; uniform vec2 uTexel;
void main(){
  float L = texture(uP, uv - vec2(uTexel.x, 0.)).x, R = texture(uP, uv + vec2(uTexel.x, 0.)).x;
  float B = texture(uP, uv - vec2(0., uTexel.y)).x, T = texture(uP, uv + vec2(0., uTexel.y)).x;
  o = vec4(texture(uVel, uv).xy - vec2(R - L, T - B), 0., 1.);
}`),Jt=$(`
uniform sampler2D uDye;
void main(){
  vec3 c = texture(uDye, uv).rgb;
  // leichte Tiefe: Kanten etwas heller (Licht von oben links)
  vec2 e = vec2(1.5) / uRes;
  float hx = length(texture(uDye, uv + vec2(e.x, 0.)).rgb) - length(texture(uDye, uv - vec2(e.x, 0.)).rgb);
  float hy = length(texture(uDye, uv + vec2(0., e.y)).rgb) - length(texture(uDye, uv - vec2(0., e.y)).rgb);
  float shade = clamp(1. + (hy - hx) * 1.5, .6, 1.5);
  o = vec4(c * shade, 1.);
}`);function Qt(e,o){const a={advect:K(e,Ot),splat:K(e,Kt),curl:K(e,$t),vort:K(e,Ht),div:K(e,jt),scale:K(e,Wt),pres:K(e,Yt),grad:K(e,Zt),show:K(e,Jt)};let t=null,r=null,n=null,s=1,i=0,u=0;const c=(y,R)=>[Z(e,y,R,o),Z(e,y,R,o)],l=y=>y.reverse();let d=null;const m=(y,R,k)=>{e.bindFramebuffer(e.FRAMEBUFFER,R.fb),e.viewport(0,0,R.w,R.h),e.useProgram(y.p),k(y),e.bindVertexArray(d),e.drawArrays(e.TRIANGLES,0,3)},v=(y,R,k,P,z,L)=>{m(a.splat,t.vel[1],F=>{I(e,F,"uSrc",t.vel[0].tex,0),e.uniform2f(F.u.uPoint,y,R),e.uniform3f(F.u.uVal,k,P,0),e.uniform1f(F.u.uRad,L),e.uniform1f(F.u.uAspect,s)}),l(t.vel),m(a.splat,r[1],F=>{I(e,F,"uSrc",r[0].tex,0),e.uniform2f(F.u.uPoint,y,R),e.uniform3fv(F.u.uVal,z),e.uniform1f(F.u.uRad,L),e.uniform1f(F.u.uAspect,s)}),l(r)};return{look:{linear:!0,bloom:.35,scale:1},resize(y,R){for(const z of[...t?[...t.vel,...t.prs,t.div,t.curl]:[],...r||[],...n?[n]:[]])z.dispose();s=y/R;const k=160,P=Math.round(k*s);t={vel:c(P,k),prs:c(P,k),div:Z(e,P,k,o),curl:Z(e,P,k,o),w:P,h:k},r=c(y,R),n=Z(e,y,R,o)},render(y,R){d=R.quadVao;const k=Math.min(1/30,y.dt);i+=k,e.disable(e.BLEND);const P=[1/t.w,1/t.h],z=R.palette,L=(p,f)=>[z[p*3]*f,z[p*3+1]*f,z[p*3+2]*f],F=[[0,6],[6,14],[14,22],[22,32]];for(let p=0;p<4;p++){let f=0;for(let A=F[p][0];A<F[p][1];A++)f+=y.bands[A];if(f/=F[p][1]-F[p][0],!y.playing||f<.25)continue;const _=i*(.15+p*.04)+p*Math.PI/2,B=.5+Math.cos(_)*.3,E=.5+Math.sin(_*1.3)*.28,h=_+Math.PI/2,M=400*f*f;v(B,E,Math.cos(h)*M,Math.sin(h)*M,L(p,.05+.25*f*f),.0012+.002*f)}if(y.events.kick!==u){u=y.events.kick;const p=Math.random()*Math.PI*2,f=.5+Math.cos(p)*.35,_=.5+Math.sin(p)*.35;v(f,_,-Math.cos(p)*2200,-Math.sin(p)*2200,L(Math.floor(Math.random()*5),.9),.004)}m(a.curl,t.curl,p=>{I(e,p,"uVel",t.vel[0].tex,0),e.uniform2fv(p.u.uTexel,P)}),m(a.vort,t.vel[1],p=>{I(e,p,"uVel",t.vel[0].tex,0),I(e,p,"uCurl",t.curl.tex,1),e.uniform2fv(p.u.uTexel,P),e.uniform1f(p.u.uStep,k),e.uniform1f(p.u.uStr,18+14*Math.min(2,y.midAtt))}),l(t.vel),m(a.div,t.div,p=>{I(e,p,"uVel",t.vel[0].tex,0),e.uniform2fv(p.u.uTexel,P)}),m(a.scale,t.prs[1],p=>{I(e,p,"uSrc",t.prs[0].tex,0),e.uniform1f(p.u.uK,.8)}),l(t.prs);for(let p=0;p<20;p++)m(a.pres,t.prs[1],f=>{I(e,f,"uP",t.prs[0].tex,0),I(e,f,"uDiv",t.div.tex,1),e.uniform2fv(f.u.uTexel,P)}),l(t.prs);return m(a.grad,t.vel[1],p=>{I(e,p,"uP",t.prs[0].tex,0),I(e,p,"uVel",t.vel[0].tex,1),e.uniform2fv(p.u.uTexel,P)}),l(t.vel),m(a.advect,t.vel[1],p=>{I(e,p,"uVel",t.vel[0].tex,0),I(e,p,"uSrc",t.vel[0].tex,1),e.uniform2fv(p.u.uTexel,P),e.uniform1f(p.u.uStep,k),e.uniform1f(p.u.uDiss,.25)}),l(t.vel),m(a.advect,r[1],p=>{I(e,p,"uVel",t.vel[0].tex,0),I(e,p,"uSrc",r[0].tex,1),e.uniform2fv(p.u.uTexel,P),e.uniform1f(p.u.uStep,k),e.uniform1f(p.u.uDiss,.55)}),l(r),m(a.show,n,p=>{I(e,p,"uDye",r[0].tex,0),e.uniform2f(p.u.uRes,n.w,n.h)}),n.tex},dispose(){for(const y of[...t.vel,...t.prs,t.div,t.curl,...r,n])y.dispose();for(const y of Object.values(a))e.deleteProgram(y.p)}}}const me=[{id:"klassik",name:"Klassik",make:lt},{id:"magnet",name:"Magnetfeld",make:Tt},{id:"neon",name:"Neon",make:yt},{id:"sphaere",name:"Punktsphäre",make:At},{id:"welle",name:"Punktwelle",make:Pt},{id:"tunnel",name:"Tunnelflug",make:Lt},{id:"fraktal",name:"Fraktal",make:Bt},{id:"tinte",name:"Tinte",make:Qt},{id:"polarlicht",name:"Polarlicht",make:Nt},{id:"synthwave",name:"Synthwave",make:qt},{id:"ferrofluid",name:"Ferrofluid",make:Ct},{id:"galaxie",name:"Galaxie",make:Dt},{id:"kaleidoskop",name:"Kaleidoskop",make:Gt}],gt=$(`
uniform sampler2D uSrc; uniform vec2 uPx; uniform float uThresh;
void main(){
  vec3 c = (texture(uSrc, uv + uPx * vec2(-1, -1)).rgb + texture(uSrc, uv + uPx * vec2(1, -1)).rgb +
            texture(uSrc, uv + uPx * vec2(-1, 1)).rgb + texture(uSrc, uv + uPx * vec2(1, 1)).rgb) * .25;
  if (uThresh > 0.) { float l = max(c.r, max(c.g, c.b)); c *= smoothstep(uThresh * .5, uThresh * 1.5, l); }
  o = vec4(c, 1.);
}`),eo=$(`
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
}`);function to(e){const o=e.getContext("webgl2",{antialias:!1,alpha:!1,preserveDrawingBuffer:!1,powerPreference:"high-performance"});if(!o)throw new Error("WebGL 2 fehlt");const a=!!o.getExtension("EXT_color_buffer_float")||!!o.getExtension("EXT_color_buffer_half_float"),t=o.createBuffer(),r=o.createVertexArray();o.bindVertexArray(r),o.bindBuffer(o.ARRAY_BUFFER,t),o.bufferData(o.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),o.STATIC_DRAW),o.enableVertexAttribArray(0),o.vertexAttribPointer(0,2,o.FLOAT,!1,0,0);const n=K(o,gt),s=K(o,eo),i=o.createTexture(),u=new Float32Array(512*2);o.bindTexture(o.TEXTURE_2D,i),o.texImage2D(o.TEXTURE_2D,0,o.R32F,512,2,0,o.RED,o.FLOAT,u),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,o.NEAREST),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MAG_FILTER,o.NEAREST);const c=o.createTexture();o.bindTexture(o.TEXTURE_2D,c),o.texImage2D(o.TEXTURE_2D,0,o.R32F,te,128,0,o.RED,o.FLOAT,new Float32Array(te*128)),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,o.NEAREST),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MAG_FILTER,o.NEAREST);let l=0,d=0;const m=new Float32Array(te),v=me.map(b=>b.make(o,a));let y=0,R=0,k=.75,P=[];const z={seed:.3,aspect:1,histRow:0,w:1,h:1,palette:new Float32Array(15),audioTex:i,histTex:c,quadVao:r,cover:null,coverPixels:null,coverCanvas:null,title:"",artist:""},L=b=>b.look.full?[e.width,e.height]:[Math.max(32,Math.round(y*(b.look.scale||1))),Math.max(32,Math.round(R*(b.look.scale||1)))],F=()=>{const b=Math.min(window.devicePixelRatio||1,2);e.width=Math.round(e.clientWidth*b)||1,e.height=Math.round(e.clientHeight*b)||1,y=Math.max(64,Math.round(e.width*k)),R=Math.max(64,Math.round(e.height*k)),z.aspect=y/R;for(const w of v)w.resize(...L(w));for(const w of P)w.dispose();P=[];let T=y,S=R;for(let w=0;w<4;w++)T=Math.max(8,T>>1),S=Math.max(8,S>>1),P.push(Z(o,T,S,a))};F();let p=0,f=-1,_=0,B=16,E=performance.now(),h=60;const M=b=>{b!==p&&(f=p,p=b,_=1e-4)},A=(b,T)=>{const S=v[b],[w,x]=L(S);return z.w=w,z.h=x,o.bindVertexArray(r),o.disable(o.BLEND),S.render(T,z)};return{gl:o,frame:(b,T)=>{o.bindVertexArray(r),o.disable(o.BLEND);for(let X=0;X<te;X++)u[X]=b.bands[X];if(u.set(b.wave,512),o.bindTexture(o.TEXTURE_2D,i),o.texSubImage2D(o.TEXTURE_2D,0,0,0,512,2,o.RED,o.FLOAT,u),d+=b.dt,d>=1/32){d%=1/32,l=(l+1)%128;for(let X=0;X<te;X++)m[X]=b.bands[X]*(b.playing?1:0);o.bindTexture(o.TEXTURE_2D,c),o.texSubImage2D(o.TEXTURE_2D,0,0,l,te,1,o.RED,o.FLOAT,m)}z.histRow=l;const S=A(p,b);let w=null;const x=f;x>=0&&(w=A(x,b),_=Math.min(1,_+b.dt/2.5)),o.bindVertexArray(r),o.disable(o.BLEND);let D=S,[G,J]=L(v[p]);for(let X=0;X<P.length;X++){const Y=P[X];o.bindFramebuffer(o.FRAMEBUFFER,Y.fb),o.viewport(0,0,Y.w,Y.h),o.useProgram(n.p),I(o,n,"uSrc",D,0),o.uniform2f(n.u.uPx,.5/G,.5/J),o.uniform1f(n.u.uThresh,X===0?.3:0),o.drawArrays(o.TRIANGLES,0,3),D=Y.tex,G=Y.w,J=Y.h}const U=v[p].look,ee=w?v[x].look:U,Te=w?_:1,j=(X,Y)=>(ee[X]??Y)+((U[X]??Y)-(ee[X]??Y))*Te;o.bindFramebuffer(o.FRAMEBUFFER,null),o.viewport(0,0,e.width,e.height),o.useProgram(s.p),ie(o,s,b,z),I(o,s,"uA",w||S,0),I(o,s,"uB",S,1);for(let X=0;X<4;X++)I(o,s,"uB"+(X+1),P[X].tex,2+X);o.uniform1f(s.u.uMix,w?_:0),o.uniform1f(s.u.uExpo,j("expo",1.1)),o.uniform1f(s.u.uBloomAmt,j("bloom",.5)),o.uniform1f(s.u.uTone,j("linear",1)),o.uniform1f(s.u.uVig,j("vignette",.45)),o.uniform1f(s.u.uFlashAmt,Math.min(.12,b.flash*.1)),o.drawArrays(o.TRIANGLES,0,3),w&&_>=1&&(f=-1,_=0),B+=(T-B)*.05,h=1e3/Math.max(1,B);const Q=performance.now();Q-E>5e3&&(B>24&&k>.45?(k=Math.max(.45,k-.1),E=Q,F()):B<11&&k<.75&&(k=Math.min(.75,k+.1),E=Q,F()))},resize:F,setScene:M,get scene(){return p},get fps(){return h},get scale(){return k},current:()=>v[p],setLook(b){for(const T of["palette","seed","title","artist"])b[T]!=null&&(z[T]=b[T]);b.cover!==void 0&&(z.cover=b.cover,z.coverPixels=b.coverPixels||null,z.coverCanvas=b.coverCanvas||null)},dispose(){const b=o.getExtension("WEBGL_lose_context");for(const T of v)T.dispose();for(const T of P)T.dispose();b&&b.loseContext()}}}const Ne=e=>e<=.04045?e/12.92:Math.pow((e+.055)/1.055,2.4);function oo([e,o,a]){const t=Math.cbrt(.4122214708*e+.5363325363*o+.0514459929*a),r=Math.cbrt(.2119034982*e+.6806995451*o+.1073969566*a),n=Math.cbrt(.0883024619*e+.2817188376*o+.6299787005*a);return[.2104542553*t+.793617785*r-.0040720468*n,1.9779984951*t-2.428592205*r+.4505937099*n,.0259040371*t+.7827717662*r-.808675766*n]}function no([e,o,a]){const t=(e+.3963377774*o+.2158037573*a)**3,r=(e-.1055613458*o-.0638541728*a)**3,n=(e-.0894841775*o-1.291485548*a)**3;return[4.0767416621*t-3.3077115913*r+.2309699292*n,-1.2684380046*t+2.6097574011*r-.3413193965*n,-.0041960863*t-.7034186147*r+1.707614701*n].map(s=>Math.max(0,Math.min(1,s)))}const Ie=new Float32Array([.25,.12,.9,.55,.15,.85,.1,.5,.95,.15,.85,.6,.95,.35,.45]);function je(e){let o=2166136261;for(const a of String(e||"x"))o=Math.imul(o^a.charCodeAt(0),16777619);return(o>>>0)%1e5/1e5}function ao(e){return new Promise(o=>{if(!e)return o(null);const a=new Image;a.crossOrigin="anonymous",a.onload=()=>{try{const t=document.createElement("canvas");t.width=t.height=120;const r=t.getContext("2d",{willReadFrequently:!0});r.drawImage(a,0,0,120,120);const n=r.getImageData(0,0,120,120).data,s=document.createElement("canvas");s.width=s.height=512,s.getContext("2d").drawImage(a,0,0,512,512),o({pixels:n,palette:ro(n),canvas:s})}catch{o(null)}},a.onerror=()=>o(null),a.src=e})}function ro(e){const o=[];for(let s=0;s<e.length;s+=16)o.push(oo([Ne(e[s]/255),Ne(e[s+1]/255),Ne(e[s+2]/255)]));const a=5,t=[o[Math.floor(o.length/2)]];for(;t.length<a;){let s=null,i=-1;for(const u of o){let c=1/0;for(const l of t)c=Math.min(c,(u[0]-l[0])**2+(u[1]-l[1])**2+(u[2]-l[2])**2);c>i&&(i=c,s=u)}t.push(s)}const r=new Array(a).fill(0);for(let s=0;s<8;s++){const i=t.map(()=>[0,0,0]);r.fill(0);for(const u of o){let c=0,l=1/0;for(let d=0;d<a;d++){const m=t[d],v=(u[0]-m[0])**2+(u[1]-m[1])**2+(u[2]-m[2])**2;v<l&&(l=v,c=d)}r[c]++,i[c][0]+=u[0],i[c][1]+=u[1],i[c][2]+=u[2]}for(let u=0;u<a;u++)r[u]&&(t[u]=i[u].map(c=>c/r[u]))}const n=t.map(([s,i,u],c)=>{let l=Math.hypot(i,u),d=Math.atan2(u,i);l<.03&&(d=4.2+c*.5),l=Math.max(.09,Math.min(.2,l*1.25));const m=Math.max(.62,Math.min(.85,s*.6+.4));return{h:d,rgb:no([m,l*Math.cos(d),l*Math.sin(d)])}});return n.sort((s,i)=>s.h-i.h),new Float32Array(n.flatMap(s=>s.rgb))}const xe={get(e,o){try{const a=localStorage.getItem("viz."+e);return a==null?o:JSON.parse(a)}catch{return o}},set(e,o){try{localStorage.setItem("viz."+e,JSON.stringify(o))}catch{}}};function io({track:e,onClose:o}){const a=W.useRef(null),t=W.useRef(null),r=W.useRef(null),[n,s]=W.useState(!0),[i,u]=W.useState(()=>Math.min(me.length-1,Math.max(0,xe.get("scene",0)))),[c,l]=W.useState(()=>!!xe.get("calm",!1)),[d,m]=W.useState(()=>!!xe.get("auto",!1)),[v,y]=W.useState(!1),[R,k]=W.useState(""),[P,z]=W.useState(""),[L,F]=W.useState(null),p=W.useRef(c),f=W.useRef(d);p.current=c,f.current=d;const _=E=>{const h=t.current;if(!h)return;const M=(E%me.length+me.length)%me.length;h.setScene(M),u(M),xe.set("scene",M),s(!0);const A=h.current().needs;k(A||"")};W.useEffect(()=>{const E=t.current;if(!E)return;E.setLook({seed:je(e&&e.id),palette:Ie,cover:null,title:e&&e.title||"",artist:e&&e.artist||""});let h=!1;return ao(e&&e.albumId?tt(e.albumId,640):null).then(M=>{h||!t.current||t.current.setLook({palette:M?M.palette:Ie,cover:e&&e.albumId||null,coverPixels:M?M.pixels:null,coverCanvas:M?M.canvas:null})}),()=>{h=!0}},[e&&e.id,e&&e.albumId,!!t.current]),W.useEffect(()=>{s(!0);let E=setTimeout(()=>s(!1),5e3);const h=()=>{s(!0),clearTimeout(E),E=setTimeout(()=>s(!1),2500)};return window.addEventListener("pointermove",h),()=>{clearTimeout(E),window.removeEventListener("pointermove",h)}},[e&&e.id,i,c,d,R]),W.useEffect(()=>{const E=h=>{const M=h.key.toLowerCase(),A=t.current;if(M==="escape"||M==="v"&&!h.ctrlKey&&!h.metaKey||M==="t"&&(h.ctrlKey||h.metaKey))o();else if(M==="arrowright"||M==="n")_((A?A.scene:0)+1);else if(M==="arrowleft")_((A?A.scene:0)-1);else if(/^[0-9]$/.test(M)&&(Number(M)||10)<=me.length)_((Number(M)||10)-1);else if(M==="r")l(C=>(xe.set("calm",!C),!C));else if(M==="a")m(C=>(xe.set("auto",!C),!C));else if(M==="d")y(C=>!C);else if(A&&A.current().keys&&A.current().keys[M])k(A.current().keys[M]()||"");else return;h.preventDefault(),h.stopPropagation()};return window.addEventListener("keydown",E,!0),()=>window.removeEventListener("keydown",E,!0)},[o]),W.useEffect(()=>{let E;try{E=to(a.current)}catch(U){console.error(U),z(String(U&&U.message||U).split(`
`)[0]);return}t.current=E;const h=at();r.current=h;let M=0,A=0;const C=nt(U=>{M++,A+=(U.frames||[]).length,h.push(U)});E.setLook({seed:je(e&&e.id),palette:Ie,title:e&&e.title||"",artist:e&&e.artist||""}),E.setScene(i),k(E.current().needs||"");let b=0,T=performance.now(),S=performance.now(),w=performance.now();const x=U=>{const ee=U-T,Te=Math.min(.1,ee/1e3);T=U;const j=h.update(Te);p.current&&(j.flash=0,j.kick*=.35,j.pulse*=.35),f.current&&j.playing&&(U-S)/1e3>180&&(j.conf<.4||j.phase<.08)&&(S=U,_(E.scene+1));try{E.frame(j,ee)}catch(Q){console.error(Q)}if(U-w>500){const Q=(U-w)/1e3;F({fps:E.fps,scale:E.scale,msg:M/Q,frames:A/Q,bpm:j.bpm,conf:j.conf,playing:j.playing,kicks:j.events.kick,int:j.intensity,bands:Array.from(j.bands),info:E.current().info?E.current().info():""}),M=0,A=0,w=U}b=requestAnimationFrame(x)};b=requestAnimationFrame(x);const D=()=>E.resize();window.addEventListener("resize",D);const G=U=>{U.preventDefault(),z("Die Grafikkarte hat den Visualizer beendet – bitte nochmals öffnen.")},J=a.current;return J.addEventListener("webglcontextlost",G),()=>{cancelAnimationFrame(b),window.removeEventListener("resize",D),J.removeEventListener("webglcontextlost",G),C(),E.dispose(),t.current=null}},[]);const B=t.current&&t.current.current().label==="center";return H.jsxs("div",{className:"fixed inset-0 z-[70] bg-black",onClick:o,style:{cursor:n?"default":"none"},children:[H.jsx("canvas",{ref:a,className:"absolute inset-0 h-full w-full"}),P&&H.jsxs("div",{className:"absolute inset-0 grid place-items-center p-8 text-center text-sm text-zinc-400",children:["Visualizer geht hier nicht: ",P]}),B&&e&&H.jsxs("div",{className:"pointer-events-none absolute inset-x-0 top-[66%] text-center",style:{textShadow:"0 0 18px rgba(0,0,0,.8)"},children:[H.jsx("div",{className:"truncate px-8 text-2xl font-bold text-white sm:text-3xl",children:e.artist}),H.jsx("div",{className:"mt-1 truncate px-8 text-base text-zinc-200 sm:text-lg",children:e.title})]}),H.jsxs("div",{className:"pointer-events-none absolute bottom-8 left-8 max-w-[80vw] transition-opacity duration-700 "+(n?"opacity-100":"opacity-0"),children:[e&&!B&&H.jsxs(H.Fragment,{children:[H.jsx("div",{className:"truncate text-2xl font-bold text-white drop-shadow-lg",children:e.title}),H.jsx("div",{className:"truncate text-lg text-zinc-300 drop-shadow",children:e.artist})]}),H.jsxs("div",{className:"mt-2 text-xs text-zinc-400 drop-shadow",children:[H.jsxs("span",{className:"text-zinc-100",children:[i+1," ",me[i].name]}),L&&L.info?` · ${L.info}`:"",d?" · wechselt automatisch (A)":"",c?" · ruhig (R)":""]}),H.jsx("div",{className:"mt-0.5 text-[11px] text-zinc-500 drop-shadow",children:"1–9, 0 / ← → Stil · M Muster · P Farben · A automatisch · R ruhig · D Diagnose · Esc schliessen"}),R&&H.jsx("div",{className:"mt-1 text-xs text-amber-300 drop-shadow",children:R})]}),v&&L&&H.jsxs("div",{className:"pointer-events-none absolute right-4 top-4 w-72 rounded-xl bg-black/70 p-3 font-mono text-[11px] leading-5 text-zinc-300",children:[H.jsxs("div",{children:["Bild: ",L.fps.toFixed(0)," fps · Auflösung ",Math.round(L.scale*100)," %"]}),H.jsxs("div",{children:["Daten: ",L.msg.toFixed(0)," Pakete/s · ",L.frames.toFixed(0)," Frames/s ",L.playing?"":"· (keine Musik)"]}),H.jsxs("div",{children:["Tempo: ",L.bpm?`${L.bpm.toFixed(1)} BPM`:"–"," · sicher ",Math.round(L.conf*100)," % · Kicks ",L.kicks]}),H.jsxs("div",{children:["Spannung: ",Math.round(L.int*100)," %"]}),H.jsx("div",{className:"mt-1 flex h-10 items-end gap-px",children:L.bands.map((E,h)=>H.jsx("span",{className:"flex-1 bg-accent/80",style:{height:`${Math.min(100,E*80)}%`}},h))})]})]})}export{io as default};
