import{u as Tt,r as se,c as zt,j as te}from"./index-ngzbvkPB.js";const fe=32,qt=.07;function gt(e){let t=!1,a=null;return(async()=>{for(;!t;){try{a=new AbortController;const s=await fetch(Tt("/api/player/viz",!0),{signal:a.signal,cache:"no-store"});if(!s.ok||!s.body)throw new Error(`Fehler ${s.status}`);const o=s.body.getReader(),r=new TextDecoder;let i="";for(;;){const{value:c,done:u}=await o.read();if(u||t)break;i+=r.decode(c,{stream:!0});let f;for(;(f=i.indexOf(`

`))>=0;){const l=i.slice(0,f);if(i=i.slice(f+2),l.startsWith("data: "))try{e(JSON.parse(l.slice(6)))}catch{}}}}catch{}t||await new Promise(s=>setTimeout(s,800))}})(),()=>{t=!0,a&&a.abort()}}function Nt(){const e=[];let t=null,a=new Float32Array(512),n={bpm:0,conf:0,beat0:0,int:0,playing:!1},s=0;const o={t:0,dt:0,playing:!1,bands:new Float32Array(fe),db:new Float32Array(fe),wave:new Float32Array(512),waveRaw:new Float32Array(512),beats:0,bass:1,mid:1,treb:1,bassAtt:1,midAtt:1,trebAtt:1,kick:0,onset:0,pulse:0,flash:0,phase:0,beatIndex:0,conf:0,bpm:0,intensity:0,rms:0,centroid:0,lowClock:0,midClock:0,highClock:0,events:{kick:0,onset:0}},r=[0,0,0],i=[0,0,0],c=[0,0,0];let u=0;const f=new Float32Array(fe).fill(-90);let l=-90,m=-9,p=-9,v=-9,w=0,E=0,T=0,P=.05;const A=d=>{const z=performance.now()/1e3-d.now;t=t==null?z:Math.min(z,t+.002);for(const x of d.frames||[])(!e.length||x.at>e[e.length-1].at)&&e.push(x);for(;e.length>600;)e.shift();d.wave&&(a=Float32Array.from(d.wave)),n={bpm:d.bpm||0,conf:d.conf||0,beat0:d.beat0||0,int:d.int||0,playing:!!d.playing}},q=(d,F)=>Math.pow(d,F*30);return{push:A,update:d=>{const F=performance.now()/1e3;o.dt=d,o.t+=d,o.playing=n.playing&&e.length>0;const z=t==null?0:F-t-qt;let x=e.findIndex(b=>b.at>z),k=null;if(e.length){if(x===-1)k={f0:e[e.length-1],f1:e[e.length-1],k:0};else if(x===0)k={f0:e[0],f1:e[0],k:0};else{const b=e[x-1],g=e[x];k={f0:b,f1:g,k:Math.min(1,Math.max(0,(z-b.at)/Math.max(.001,g.at-b.at)))}}z-e[e.length-1].at>.5&&(k=null)}if(k){for(const b of e)if(!(b.at<=s)){if(b.at>z)break;b.k&&(o.events.kick++,m=o.t),b.on&&(o.events.onset++,p=o.t)}}const D=[];if(k)for(const b of e)b.at>s&&b.at<=z&&D.push(b);s=z;const O=(b,g,N)=>b+(g-b)*N;let G=-90;for(let b=0;b<fe;b++){let g=-100;if(k){g=O(k.f0.b[b],k.f1.b[b],k.k);for(const N of D)g=Math.max(g,N.b[b])}o.db[b]=g,f[b]=g>f[b]?g:Math.max(-90,f[b]-5*d),G=Math.max(G,f[b])}l=G>l?G:Math.max(-90,l-5*d);for(let b=0;b<fe;b++){const g=o.db[b],N=.6*f[b]+.4*l,I=Math.min(1,Math.max(0,(g+82)/12)),B=Math.min(1.15,Math.max(0,1+(g-N)/28))*I,M=B>o.bands[b]?1-Math.exp(-d*30):1-Math.exp(-d*8);o.bands[b]+=(B-o.bands[b])*M}for(let b=0;b<3;b++){let g=k?O(k.f0.bmt[b],k.f1.bmt[b],k.k):0;for(const M of D)g=Math.max(g,M.bmt[b]);r[b]=g;const N=r[b]>i[b],I=q(N?.2:.5,d);i[b]=i[b]*I+r[b]*(1-I);const B=q(u<50?.9:.992,d);c[b]=c[b]*B+r[b]*(1-B)}k&&(u+=d*30);const _=(b,g)=>c[g]>1e-5?Math.min(3,b/c[g]):0;if(o.bass=_(r[0],0),o.mid=_(r[1],1),o.treb=_(r[2],2),o.bassAtt=_(i[0],0),o.midAtt=_(i[1],1),o.trebAtt=_(i[2],2),o.bpm=n.bpm,o.conf=n.conf,o.playing&&(o.beats+=d*(n.conf>.4&&n.bpm>40?n.bpm:120)/60),n.bpm>0&&n.conf>.3&&t!=null){const b=60/n.bpm,g=(z-n.beat0)/b;o.phase=(g%1+1)%1,o.beatIndex=Math.floor(g)}else o.phase=(o.phase+d*2)%1;o.kick=Math.exp(-(o.t-m)/.14),o.onset=Math.exp(-(o.t-p)/.09),o.pulse=o.conf>.45?Math.exp(-(o.phase*60)/Math.max(40,o.bpm)/.12)*(o.playing?1:0):o.kick,m===o.t&&o.t-v>.34&&(v=o.t),o.flash=Math.exp(-(o.t-v)/.12);const y=1-Math.exp(-d*1.2);w+=((o.playing?n.int:0)-w)*(1-Math.exp(-d*.5)),E+=((k?O(k.f0.rms,k.f1.rms,k.k):0)-E)*y,T+=((k?O(k.f0.c,k.f1.c,k.k):T)-T)*y,o.intensity=w,o.rms=E,o.centroid=T,o.lowClock+=d*(.25+.9*Math.min(2,o.bassAtt)),o.midClock+=d*(.25+.9*Math.min(2,o.midAtt)),o.highClock+=d*(.25+.9*Math.min(2,o.trebAtt));let C=0;for(let b=0;b<512;b++)C=Math.max(C,Math.abs(a[b]));P=Math.max(C,P*Math.exp(-d*.4),.02);const W=1-Math.exp(-d*30);for(let b=0;b<512;b++){const g=o.playing?a[b]/P:0;o.wave[b]+=(g-o.wave[b])*W,o.waveRaw[b]=g}return o},A:o}}const It=`#version 300 es
in vec2 p; out vec2 uv;
void main(){ uv = p * 0.5 + 0.5; gl_Position = vec4(p, 0.0, 1.0); }`,Ke=`
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
`;function J(e,t,a=It){const n=e.createProgram();for(const[r,i]of[[e.VERTEX_SHADER,a],[e.FRAGMENT_SHADER,t]]){const c=e.createShader(r);if(e.shaderSource(c,i),e.compileShader(c),!e.getShaderParameter(c,e.COMPILE_STATUS)){const u=e.getShaderInfoLog(c);throw new Error("Shader: "+u+`
`+i.split(`
`).map((f,l)=>`${l+1}: ${f}`).join(`
`).slice(0,4e3))}e.attachShader(n,c)}if(e.bindAttribLocation(n,0,"p"),e.linkProgram(n),!e.getProgramParameter(n,e.LINK_STATUS))throw new Error(e.getProgramInfoLog(n));const s={},o=e.getProgramParameter(n,e.ACTIVE_UNIFORMS);for(let r=0;r<o;r++){const i=e.getActiveUniform(n,r).name.replace(/\[0\]$/,"");s[i]=e.getUniformLocation(n,e.getActiveUniform(n,r).name)}return{p:n,u:s}}const ee=e=>`#version 300 es
${Ke}
in vec2 uv; out vec4 o;
${e}`;function ie(e,t,a,n,s=!0,o=!1){const r=e.createTexture();e.bindTexture(e.TEXTURE_2D,r),o?e.texImage2D(e.TEXTURE_2D,0,e.RGBA32F,t,a,0,e.RGBA,e.FLOAT,null):n?e.texImage2D(e.TEXTURE_2D,0,e.RGBA16F,t,a,0,e.RGBA,e.HALF_FLOAT,null):e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,t,a,0,e.RGBA,e.UNSIGNED_BYTE,null);const i=s?e.LINEAR:e.NEAREST;e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,i),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,i),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE);const c=e.createFramebuffer();return e.bindFramebuffer(e.FRAMEBUFFER,c),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,r,0),e.clearColor(0,0,0,1),e.clear(e.COLOR_BUFFER_BIT),{tex:r,fb:c,w:t,h:a,dispose:()=>(e.deleteTexture(r),e.deleteFramebuffer(c))}}function kt(e,t,a,n){let s=ie(e,t,a,n),o=ie(e,t,a,n);return{get src(){return s},get dst(){return o},swap(){const r=s;s=o,o=r},dispose(){s.dispose(),o.dispose()}}}function Me(e,t,a,n){const s=t.u,o=(r,i)=>s[r]!=null&&e.uniform1f(s[r],i);o("uT",a.t),o("uDt",a.dt),o("uBass",a.bass),o("uMid",a.mid),o("uTreb",a.treb),o("uBassAtt",a.bassAtt),o("uMidAtt",a.midAtt),o("uTrebAtt",a.trebAtt),o("uPulse",a.pulse),o("uKick",a.kick),o("uOnset",a.onset),o("uFlash",a.flash),o("uPhase",a.phase),o("uConf",a.conf),o("uInt",a.intensity),o("uRms",a.rms),o("uCen",a.centroid),o("uLowClk",a.lowClock),o("uMidClk",a.midClock),o("uHighClk",a.highClock),o("uSeed",n.seed),o("uAspect",n.aspect),o("uHistRow",n.histRow),s.uRes!=null&&e.uniform2f(s.uRes,n.w,n.h),s.uPal!=null&&e.uniform3fv(s.uPal,n.palette),s.uAudio!=null&&(e.activeTexture(e.TEXTURE6),e.bindTexture(e.TEXTURE_2D,n.audioTex),e.uniform1i(s.uAudio,6)),s.uHist!=null&&(e.activeTexture(e.TEXTURE7),e.bindTexture(e.TEXTURE_2D,n.histTex),e.uniform1i(s.uHist,7)),e.activeTexture(e.TEXTURE0)}function Z(e,t,a,n,s){t.u[a]!=null&&(e.activeTexture(e.TEXTURE0+s),e.bindTexture(e.TEXTURE_2D,n),e.uniform1i(t.u[a],s),e.activeTexture(e.TEXTURE0))}function lt(e,t,a,n){const s=1/Math.tan(e/2),o=1/(a-n);return new Float32Array([s/t,0,0,0,0,s,0,0,0,0,(n+a)*o,-1,0,0,2*n*a*o,0])}function mt(e,t,a=[0,1,0]){let n=e[0]-t[0],s=e[1]-t[1],o=e[2]-t[2],r=Math.hypot(n,s,o)||1;n/=r,s/=r,o/=r;let i=a[1]*o-a[2]*s,c=a[2]*n-a[0]*o,u=a[0]*s-a[1]*n;r=Math.hypot(i,c,u)||1,i/=r,c/=r,u/=r;const f=s*u-o*c,l=o*i-n*u,m=n*c-s*i;return new Float32Array([i,f,n,0,c,l,s,0,u,m,o,0,-(i*e[0]+c*e[1]+u*e[2]),-(f*e[0]+l*e[1]+m*e[2]),-(n*e[0]+s*e[1]+o*e[2]),1])}function ht(e,t){const a=new Float32Array(16);for(let n=0;n<4;n++)for(let s=0;s<4;s++){let o=0;for(let r=0;r<4;r++)o+=e[r*4+s]*t[n*4+r];a[n*4+s]=o}return a}const Et=`
vec3 hash33(vec3 p){ p = fract(p * vec3(.1031, .1030, .0973)); p += dot(p, p.yxz + 33.33); return fract((p.xxy + p.yxx) * p.zyx) * 2. - 1.; }
float noise3d(vec3 p){
  vec3 i = floor(p), f = fract(p); vec3 u = f * f * (3. - 2. * f);
  return mix(mix(mix(dot(hash33(i), f), dot(hash33(i + vec3(1,0,0)), f - vec3(1,0,0)), u.x),
                 mix(dot(hash33(i + vec3(0,1,0)), f - vec3(0,1,0)), dot(hash33(i + vec3(1,1,0)), f - vec3(1,1,0)), u.x), u.y),
             mix(mix(dot(hash33(i + vec3(0,0,1)), f - vec3(0,0,1)), dot(hash33(i + vec3(1,0,1)), f - vec3(1,0,1)), u.x),
                 mix(dot(hash33(i + vec3(0,1,1)), f - vec3(0,1,1)), dot(hash33(i + vec3(1,1,1)), f - vec3(1,1,1)), u.x), u.y), u.z); }
float fbm3d(vec3 p){ float s = 0., a = .5; for (int i = 0; i < 4; i++) { s += a * noise3d(p); p = p * 2.02 + 17.1; a *= .5; } return s; }
`;function Ee(e,t=Math.random){let a=[],n=-1;return{next(){if(!a.length){a=Array.from({length:e},(s,o)=>o);for(let s=e-1;s>0;s--){const o=Math.floor(t()*(s+1));[a[s],a[o]]=[a[o],a[s]]}e>1&&a[0]===n&&a.push(a.shift())}return n=a.shift(),n}}}function Le({beats:e=64,minSec:t=45,maxSec:a=100}={}){let n=0,s=null;return{tick(o,r){if(!o.playing)return!1;n+=r;const i=Math.floor(o.beats/e),c=s!==null&&i!==s;return s=i,c&&n>=t||n>=a?(n=0,!0):!1},reset(){n=0}}}const Ce=[{name:"Sog",grain:.5,keep:.989},{name:"Wirbel",grain:.3,keep:.991},{name:"Spiralarme",grain:.4,keep:.99},{name:"Wellenringe",grain:.2,keep:.99},{name:"Kaleidoskop",grain:.3,keep:.992},{name:"Spiegelkreuz",grain:.4,keep:.991},{name:"Kacheln",grain:.2,keep:.993},{name:"Marmor",grain:.1,keep:.994},{name:"Strahlen",grain:1.6,keep:.988},{name:"Horizont",grain:.6,keep:.989},{name:"Vorhang",grain:.7,keep:.989},{name:"Breitzug",grain:.7,keep:.989},{name:"Raute",grain:.5,keep:.991},{name:"Kachelspiegel",grain:.2,keep:.993},{name:"Scherwellen",grain:.2,keep:.991},{name:"Linse",grain:.4,keep:.99},{name:"Doppelwirbel",grain:.3,keep:.992},{name:"Achsenkreuz",grain:.8,keep:.989},{name:"Wellenstrahlen",grain:.4,keep:.99},{name:"Kreisel",grain:.3,keep:.991},{name:"Aufwind",grain:.3,keep:.991},{name:"Fasern",grain:1.4,keep:.988},{name:"Seitenspiegel",grain:.4,keep:.991},{name:"Wabe",grain:.3,keep:.991}],Ct=`
uniform float uAmt;   // Bewegung je Bild (1 = ein Bild bei 60 fps, mal Bass)
vec2 rot(vec2 p, float a){ float c = cos(a), s = sin(a); return vec2(c * p.x - s * p.y, s * p.x + c * p.y); }
// Bewegungsschritte, nach Bildzeit skaliert: Drehung, Zoom, Verschiebung. Spiegelungen und Faltungen
// werden NICHT skaliert (sonst springt die Quelle bei wenig fps aus dem Bild).
vec2 R(vec2 p, float a){ return rot(p, a * uAmt); }
float Z(float z){ return 1. - (1. - z) * uAmt; }
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
  // Wabe: Lagen eines Sechsecks drehen gegeneinander
  float seg = 1.0471976;
  float b = mod(a + 3.1415927, seg) - seg * .5;
  float Rr = r * cos(b) / cos(seg * .5);
  return R(p, dir * .014 * sin(Rr * (7. + 8. * P.x) - t * 1.6)) * Z(.991 - .006 * P.y);
}
`,Oe=e=>[parseInt(e.slice(1,3),16)/255,parseInt(e.slice(3,5),16)/255,parseInt(e.slice(5,7),16)/255],Rt=(e,t,a)=>[e[0]+(t[0]-e[0])*a,e[1]+(t[1]-e[1])*a,e[2]+(t[2]-e[2])*a],Y=e=>{const t=e.map(([a,n])=>[a,Oe(n)]);return a=>{if(a<=t[0][0])return t[0][1];for(let n=1;n<t.length;n++)if(a<=t[n][0]){const s=(a-t[n-1][0])/Math.max(1e-6,t[n][0]-t[n-1][0]);return Rt(t[n-1][1],t[n][1],s)}return t[t.length-1][1]}},Ut=(e,t,a)=>{e=(e%1+1)%1;const n=Math.floor(e*6),s=e*6-n,o=a*(1-t),r=a*(1-s*t),i=a*(1-(1-s)*t);return[[a,r,o,o,i,a][n%6],[i,a,a,r,o,o][n%6],[o,o,i,a,a,r][n%6]]},We=(e,t,a,n=8)=>(s,o)=>{const r=e(s,o),i=1-a*Math.pow(.5+.5*Math.cos(s*Math.PI*2*t),n);return[r[0]*i,r[1]*i,r[2]*i]},Ue=[{name:"Tiefsee",f:Y([[0,"#000000"],[.12,"#000a3a"],[.35,"#0029c8"],[.6,"#1f9cff"],[.82,"#a8e6ff"],[1,"#ffffff"]])},{name:"Nachtblau",f:Y([[0,"#02020a"],[.2,"#0b0b3c"],[.45,"#3a3a9a"],[.7,"#9f9fe6"],[.9,"#e6e6ff"],[1,"#ffffff"]])},{name:"Kupfer",f:We(Y([[0,"#000000"],[.2,"#2a1205"],[.45,"#b5571a"],[.7,"#ff9a3c"],[.86,"#ffe0b8"],[1,"#ffffff"]]),3,.75)},{name:"Himmel",f:Y([[0,"#2f7be8"],[.18,"#4f95f4"],[.36,"#8a1048"],[.55,"#4a0020"],[.78,"#8fd0ff"],[1,"#ffffff"]])},{name:"Eis",f:Y([[0,"#4fd3ff"],[.3,"#1f86e0"],[.55,"#0a3fa0"],[.8,"#08164a"],[1,"#000000"]])},{name:"Ultramarin",f:Y([[0,"#050540"],[.3,"#1a1a9a"],[.6,"#5555ff"],[.85,"#c8c8ff"],[1,"#ffffff"]])},{name:"Amethyst",f:Y([[0,"#0a000f"],[.25,"#3a0a55"],[.5,"#8a2ad0"],[.75,"#d79bff"],[1,"#ffffff"]])},{name:"Feuerpink",f:Y([[0,"#000000"],[.2,"#3a0010"],[.4,"#c0103a"],[.6,"#ff4f7a"],[.75,"#ff9a3a"],[.9,"#ffe3c4"],[1,"#ffffff"]])},{name:"Lagune",f:We(Y([[0,"#062a33"],[.5,"#2fa6bf"],[1,"#d8faff"]]),5,.9)},{name:"Pflaume",f:Y([[0,"#120412"],[.3,"#4a1e4a"],[.6,"#a06aa0"],[.85,"#ecd2ec"],[1,"#ffffff"]])},{name:"Fahne",f:e=>{const t=[Oe("#3a00a8"),Oe("#c8102e"),Oe("#ffffff"),Oe("#2050ff")],a=e*6,n=Math.floor(a);return Rt(t[n%4],t[(n+1)%4],a-n)}},{name:"Schiefer",f:Y([[0,"#000000"],[.3,"#1a2440"],[.6,"#4a5e9a"],[.85,"#9fb2e6"],[1,"#e8eeff"]])},{name:"Flamme",f:Y([[0,"#000000"],[.15,"#300000"],[.35,"#a01000"],[.55,"#ff5a00"],[.75,"#ffb000"],[.9,"#fff0a0"],[1,"#ffffff"]])},{name:"Indigo",f:Y([[0,"#000000"],[.2,"#10083a"],[.45,"#3a1ea0"],[.65,"#6a50e0"],[.85,"#b8a8ff"],[1,"#ffffff"]])},{name:"Gletscher",f:Y([[0,"#ffffff"],[.2,"#c0f4ff"],[.45,"#30c0e8"],[.7,"#1060c0"],[.85,"#0a3a6a"],[1,"#04262a"]])},{name:"Rosa & Mint",f:Y([[0,"#000000"],[.25,"#1e5a4a"],[.45,"#5ab49a"],[.6,"#c0507a"],[.8,"#ff9ac0"],[1,"#ffffff"]])},{name:"Neonblau",f:Y([[0,"#000000"],[.3,"#0010ff"],[.55,"#0080ff"],[.8,"#80e8ff"],[1,"#ffffff"]])},{name:"Magenta",f:Y([[0,"#2a2aff"],[.3,"#6a20ff"],[.55,"#ff2ad0"],[.8,"#ffa0f0"],[1,"#ffffff"]])},{name:"Creme",f:We(Y([[0,"#0a0c08"],[.4,"#3a3a2a"],[.7,"#c8c09a"],[.9,"#fff8e0"],[1,"#ffffff"]]),7,.35,4)},{name:"Chrom",f:Y([[0,"#000000"],[.15,"#10123a"],[.3,"#e8e8ff"],[.45,"#20224a"],[.6,"#ffffff"],[.75,"#2a2c5a"],[.9,"#f0f0ff"],[1,"#ffffff"]])},{name:"Wolken",f:Y([[0,"#f4f6ff"],[.3,"#f0d0d8"],[.55,"#c08a9a"],[.75,"#6a3a4a"],[.9,"#2a1418"],[1,"#000000"]])},{name:"Terrakotta",f:We(Y([[0,"#0e3a40"],[.25,"#2a6a70"],[.4,"#7a2a10"],[.6,"#c85a2a"],[.8,"#ffc890"],[1,"#ffffff"]]),4,.5)},{name:"Ultraviolett",f:Y([[0,"#000000"],[.25,"#0a0aa0"],[.45,"#8a10ff"],[.65,"#ff40e0"],[.85,"#ffc0f8"],[1,"#ffffff"]])},{name:"Regenbogen",f:(e,t)=>e<.015?[0,0,0]:Ut(e*1.5+t*.03,.9,Math.min(1,.35+e*2))},{name:"Sand",f:Y([[0,"#ead2b0"],[.4,"#c49a6a"],[.7,"#6a4422"],[1,"#1a0e04"]])},{name:"Smaragd",f:Y([[0,"#000000"],[.25,"#003a1a"],[.5,"#00a050"],[.75,"#8cff8c"],[1,"#ffffff"]])},{name:"Gold",f:Y([[0,"#000000"],[.25,"#2a1a00"],[.5,"#a06a10"],[.75,"#ffd070"],[1,"#ffffff"]])}],ue=Math.PI*2,ce=(e,t,a)=>[e*Math.cos(a)-t*Math.sin(a),e*Math.sin(a)+t*Math.cos(a)],xe=e=>Math.min(1.6,Math.max(.4,e)),Pe=(e,t,a,n,s=0)=>{const o=[];for(let r=0;r<=e;r++){const i=r/e,[c,u,f,l]=t(i),m=a((i+s)%1)*n;o.push(c+f*m,u+l*m)}return o},Ae=(e,t,a,n=0)=>s=>{const o=s*ue+n;return[e+Math.cos(o)*a,t+Math.sin(o)*a,Math.cos(o),Math.sin(o)]},de=(e,t,a,n,s,o,r,i=0,c=1,u=null)=>{const f=a-e,l=n-t,m=Math.hypot(f,l)||1,p=-l/m,v=f/m,w=[];for(let E=0;E<=s;E++){const T=E/s,P=o((i+T*c)%1)*r*(u?u(T):1);w.push(e+f*T+p*P,t+l*T+v*P)}return w},nt=(e,t,a,n,s,o=.003,r=3)=>{const i=[];for(let c=0;c<r;c++){const u=n+c/r*Math.PI;i.push({pts:[e-Math.cos(u)*a,t-Math.sin(u)*a,e+Math.cos(u)*a,t+Math.sin(u)*a],pen:s,width:o})}return i},Fe=[{name:"Ring",f:({t:e,w:t,bass:a})=>{const n=.34+.09*xe(a);return{lines:[{pts:Pe(320,Ae(0,0,n,e*.25),t,.16),pen:1,width:.003,closed:!0}]}}},{name:"Doppelring",f:({t:e,w:t,bass:a,asp:n})=>{const s=.24+.06*xe(a),o=Math.min(.75,n*.42);return{lines:[{pts:Pe(220,Ae(-o,0,s,e*.4),r=>t(r*.5),.12),pen:1,width:.003,closed:!0},{pts:Pe(220,Ae(o,0,s,-e*.4),r=>t(.5+r*.5),.12),pen:1,width:.003,closed:!0}]}}},{name:"Welle",f:({t:e,w:t,asp:a})=>{const n=.12*Math.sin(e*.37);return{lines:[{pts:de(-a*1.05,n,a*1.05,n,300,t,.3),pen:1,width:.007}]}}},{name:"Drei Wellen",f:({t:e,w:t,asp:a})=>{const n=[];for(let s=-1;s<=1;s++){const o=s*a*.55+.06*Math.sin(e*.5+s);n.push({pts:de(o,-1.05,o,1.05,220,t,.12,(s+1)/3,1/3),pen:1,width:.0026})}return{lines:n}}},{name:"Ellipsen",f:({t:e,w:t,f:a})=>{const n=[];for(let s=0;s<3;s++){const o=e*(.18+s*.06)*(s%2?-1:1)+s*1.1,r=.72+a(.1+s*.3)*.14,i=.28+s*.08,c=[];for(let u=0;u<=240;u++){const f=u/240,l=f*ue,m=1+t(f)*.06;c.push(...ce(Math.cos(l)*r*m,Math.sin(l)*i*m,o))}n.push({pts:c,pen:1,width:.0026,closed:!0})}return n.push(...nt(0,0,.05+.03*a(.05),e*1.5,1,.003)),{lines:n}}},{name:"Blüte",f:({t:e,w:t,f:a})=>{const n=[],s=.62+.18*a(.08);for(const[o,r]of[[1,1],[.9,.7]]){const i=[];for(let c=0;c<=480;c++){const u=c/480,f=u*ue,l=(s*Math.cos(3*f)+t(u)*.035)*o;i.push(...ce(l*Math.cos(f),l*Math.sin(f),e*.14))}n.push({pts:i,pen:r,width:.0024,closed:!0})}return{lines:n}}},{name:"Kleeblatt",f:({t:e,w:t,bass:a})=>{const n=[],s=.26+.05*xe(a);for(let o=0;o<3;o++){const r=e*.2+o/3*ue+Math.PI/2;n.push({pts:Pe(200,Ae(Math.cos(r)*.22,Math.sin(r)*.22,s,-e*.5),i=>t((i+o/3)%1),.07),pen:1,width:.004,closed:!0})}return{lines:n}}},{name:"Strahlen",f:({t:e,f:t})=>{const a=[];for(let s=0;s<36;s++){const o=s/36,r=t(Math.abs(o*2-1)),i=o*ue+e*.1,c=.07,u=c+.06+r*.95;a.push({pts:[c*Math.cos(i),c*Math.sin(i),u*Math.cos(i),u*Math.sin(i)],pen:.55+.45*r,width:.0035+.004*r})}return{lines:a}}},{name:"X-Strahlen",f:({t:e,w:t,f:a,asp:n})=>{const s=[],o=Math.hypot(n,1)*1.05;for(const r of[1,-1]){const i=r*(.55+.12*Math.sin(e*.21)),c=18;for(let f=0;f<c;f++){const l=f/c,m=(f+.8)/c,p=a(Math.abs(l*2-1)),v=ce((l*2-1)*o,0,i),w=ce((m*2-1)*o,0,i);s.push({pts:[...v,...w],pen:.45+.55*p,width:.012+.014*p})}const u=de(...ce(-o,0,i),...ce(o,0,i),200,t,.05,r>0?0:.5,.5);s.push({pts:u,pen:1,width:.0022})}return{lines:s}}},{name:"Blitzkreuz",f:({t:e,w:t})=>{const a=[];for(let n=0;n<4;n++){const s=e*.16+n*Math.PI/2,[o,r]=ce(1.2,0,s);a.push({pts:de(0,0,o,r,140,t,.14,n*.25,.5,i=>Math.sin(i*Math.PI)),pen:1,width:.003})}return{lines:a}}},{name:"Stern",f:({t:e,w:t,bass:a})=>{const n=.5+.08*xe(a),s=n*.42,o=[];for(let i=0;i<10;i++){const c=e*.2+i/10*ue-Math.PI/2,u=i%2?s:n;o.push([Math.cos(c)*u,Math.sin(c)*u])}const r=[];for(let i=0;i<10;i++){const[c,u]=o[i],[f,l]=o[(i+1)%10],m=de(c,u,f,l,30,t,.05,i/10,.1,p=>Math.sin(p*Math.PI));r.push(...i?m.slice(2):m)}return{lines:[{pts:r,pen:1,width:.0032,closed:!0}]}}},{name:"Spirale",f:({t:e,w:t})=>{const a=[];for(let n=0;n<=420;n++){const s=n/420,o=s*ue*3.5+e*.45,r=.03+s*.98+t(s)*.04;a.push(Math.cos(o)*r,Math.sin(o)*r)}return{lines:[{pts:a,pen:1,width:.003}]}}},{name:"Kreischen",f:({t:e,w:t,f:a,asp:n})=>{const s=[];for(let o=0;o<3;o++)for(let r=0;r<22;r++){const i=r/21,c=e*(.3+o*.1)*(o%2?-1:1)+i*Math.PI*1.2+o*2.1,u=.3+o*.22+t(i)*.025;s.push({x:u*Math.cos(c)*Math.min(1.35,n*.75),y:u*Math.sin(c)*.85,r:.008+a(i)*.02,pen:1})}return{dots:s}}},{name:"Lissajous",f:({t:e,w:t,bass:a,asp:n})=>{const s=[],o=.45+.12*xe(a);for(let r=0;r<=400;r++){const i=r/400;s.push(...ce(t(i)*o*Math.min(1.4,n*.8),t((i+.23)%1)*o,e*.12))}return{lines:[{pts:s,pen:1,width:.0022}]}}},{name:"Helix",f:({t:e,w:t,asp:a})=>{const n=[];for(const s of[1,-1]){const o=[];for(let r=0;r<=260;r++){const i=r/260,c=(i*2-1)*a*1.05;o.push(c,s*.3*Math.sin(i*ue*1.5+e*.9)+t((i*.5+(s>0?0:.5))%1)*.06)}n.push({pts:o,pen:1,width:.003})}return{lines:n}}},{name:"Raute",f:({t:e,w:t,bass:a})=>{const n=[];for(const[s,o]of[[.62+.08*xe(a),0],[.34,.5]]){const r=[[s,0],[0,s],[-s,0],[0,-s]].map(([c,u])=>ce(c,u,e*.1*(o?-1:1))),i=[];for(let c=0;c<4;c++){const u=de(...r[c],...r[(c+1)%4],50,t,.05,o+c*.125,.125);i.push(...c?u.slice(2):u)}n.push({pts:i,pen:o?.8:1,width:.003,closed:!0})}return{lines:n}}},{name:"Schmetterling",f:({t:e,w:t,bass:a})=>{const n=[],s=.13+.025*xe(a);for(let o=0;o<=600;o++){const r=o/600,i=r*ue*2,c=(Math.exp(Math.cos(i))-2*Math.cos(4*i)+Math.pow(Math.sin(i/12),5))*s+t(r)*.02;n.push(...ce(Math.sin(i)*c,Math.cos(i)*c-.1,Math.sin(e*.3)*.3))}return{lines:[{pts:n,pen:1,width:.0024}]}}},{name:"Fächer",f:({t:e,f:t})=>{const a=[];for(let s=0;s<28;s++){const o=s/27,r=t(o),i=Math.PI*(.08+o*.84)+Math.sin(e*.2)*.05,c=.25+r*1.4;a.push({pts:[0,-1.05,Math.cos(i)*c,-1.05+Math.sin(i)*c],pen:.5+.5*r,width:.004+.004*r})}return{lines:a}}},{name:"Sechseck",f:({t:e,w:t})=>{const a=[];return[.28,.52,.78].forEach((n,s)=>{const o=[];for(let i=0;i<6;i++)o.push(ce(n*Math.cos(i/6*ue),n*Math.sin(i/6*ue),e*.15*(s%2?-1:1)));const r=[];for(let i=0;i<6;i++){const c=de(...o[i],...o[(i+1)%6],30,t,.035,s/3+i/18,.05555555555555555);r.push(...i?c.slice(2):c)}a.push({pts:r,pen:1-s*.15,width:.003,closed:!0})}),{lines:a}}},{name:"Fliege",f:({t:e,w:t})=>{const a=[];for(let n=0;n<7;n++)for(const s of[1,-1]){const o=(n-3)*.12+Math.sin(e*.3)*.1,[r,i]=ce(s*1.25,0,o*s);a.push({pts:de(s*.04,0,r,i,60,t,.06,n*.13,.25,c=>c),pen:.9,width:.0026})}return{lines:a}}},{name:"Vier Kreise",f:({t:e,w:t,f:a})=>{const n=[],s=.045+.02*a(.05),o=.13;for(const[r,i]of[[1,1],[-1,1],[1,-1],[-1,-1]])n.push({pts:Pe(40,Ae(r*o,i*o*1.2,s),()=>0,0),pen:1,width:.004,closed:!0});return n.push({pts:Pe(300,Ae(0,0,.62,e*.2),t,.12),pen:.75,width:.0028,closed:!0}),{lines:n}}},{name:"Kamm",f:({t:e,w:t,f:a,asp:n})=>{const s=[],o=.25*Math.sin(e*.33),r=de(-n*1.05,o,n*1.05,o,240,t,.16);s.push({pts:r,pen:1,width:.003});const i=26;for(let c=0;c<=i;c++){const u=Math.round(c/i*240),f=r[u*2],l=r[u*2+1],m=.12+a(c/i)*.35;s.push({pts:[f,l,f+.04*Math.sin(e+c),l-m],pen:.85,width:.0024})}return{lines:s}}},{name:"Bögen",f:({t:e,w:t})=>{const a=[];for(const n of[1,-1]){const s=n*(.6+.15*Math.sin(e*.17));for(let o=0;o<5;o++){const r=.62+o*.1,i=[];for(let c=0;c<=200;c++){const u=c/200,f=u*ue,l=1+t((u+o*.1)%1)*.02;i.push(...ce(Math.cos(f)*1.1*r*l,Math.sin(f)*.32*r*l,s))}a.push({pts:i,pen:1-o*.1,width:.0022,closed:!0})}}return{lines:a}}},{name:"Sternchen",f:({t:e,f:t,bass:a})=>{const n=[],o=.48+.06*xe(a);for(let r=0;r<8;r++){const i=e*.3+r/8*ue;n.push(...nt(Math.cos(i)*o,Math.sin(i)*o,.035+.05*t(r/8),-e*2+r,1,.0028))}return n.push(...nt(0,0,.08+.05*t(.05),e,1,.0035,4)),{lines:n}}}],Vt=ee(`
uniform sampler2D uPrev;
uniform int uFa, uFb;
uniform float uFm, uTa, uTb, uKeep, uSub, uGrain;
uniform vec4 uPa, uPb;
${Ct}
void main(){
  vec2 asp = vec2(uAspect, 1.);
  vec2 p = (uv * 2. - 1.) * asp;
  vec2 s = mix(flow(uFa, p, uPa, uTa), flow(uFb, p, uPb, uTb), uFm);
  // feste Körnung (hängt nur vom Bildpunkt ab): zieht feine Fasern entlang der Strömung
  vec2 h = vec2(hash12(gl_FragCoord.xy * 1.37 + 11.), hash12(gl_FragCoord.xy * .73 + 3.)) - .5;
  s += h * uGrain * 2. / uRes.y;
  vec2 q = s / asp * .5 + .5;
  float v = (q.x < 0. || q.y < 0. || q.x > 1. || q.y > 1.) ? 0. : texture(uPrev, q).r;
  o = vec4(max(v * uKeep - uSub, 0.), 0., 0., 1.);
}`),Xt=`#version 300 es
in vec2 p; in vec2 a;
uniform float uAspect;
out vec2 va;
void main(){ va = a; gl_Position = vec4(p.x / uAspect, p.y, 0., 1.); }`,Ot=`#version 300 es
precision mediump float;
in vec2 va; out vec4 o;
void main(){ o = vec4(va.y * (1. - smoothstep(.5, 1., abs(va.x))), 0., 0., 1.); }`,Gt=ee(`
uniform sampler2D uText; uniform float uAmt;
void main(){ float v = texture(uText, vec2(uv.x, 1. - uv.y)).r; o = vec4(v * uAmt, 0., 0., 1.); }`),Kt=ee(`
uniform sampler2D uSrc;
void main(){ o = vec4(texture(uSrc, uv).r, 0., 0., 1.); }`),Ht=ee(`
uniform sampler2D uI, uMap;
void main(){
  float v = clamp(texture(uI, uv).r, 0., 1.);
  o = vec4(pow(texture(uMap, vec2(v * (255. / 256.) + .5 / 256., .5)).rgb, vec3(2.2)), 1.);   // linear, Ausgabe macht sRGB
}`),we=Math.PI*2,ot=e=>e*e*(3-2*e);function vt(e,t,a){const n=t?[...e,e[0],e[1]]:e,s=n.length/2,o=new Float32Array(a*2);if(s<2){for(let u=0;u<a;u++)o[u*2]=n[0]||0,o[u*2+1]=n[1]||0;return o}const r=new Float32Array(s);for(let u=1;u<s;u++)r[u]=r[u-1]+Math.hypot(n[u*2]-n[u*2-2],n[u*2+1]-n[u*2-1]);const i=r[s-1]||1e-6;let c=0;for(let u=0;u<a;u++){const f=u/(a-1)*i;for(;c<s-2&&r[c+1]<f;)c++;const l=r[c+1]-r[c]||1e-6,m=Math.min(1,Math.max(0,(f-r[c])/l));o[u*2]=n[c*2]+(n[c*2+2]-n[c*2])*m,o[u*2+1]=n[c*2+1]+(n[c*2+3]-n[c*2+1])*m}return o}function ct(e){const t=(e.lines||[]).slice();for(const a of e.dots||[]){const n=[];for(let s=0;s<12;s++)n.push(a.x+Math.cos(s/12*we)*a.r,a.y+Math.sin(s/12*we)*a.r);t.push({pts:n,pen:a.pen,width:a.r*.35,closed:!0})}return t}function xt(e,t,a){const n=e.length;if(n>=t)return e.slice(0,t).map(f=>({pts:vt(f.pts,f.closed,a),pen:f.pen,width:f.width}));const s=e.map(f=>{let l=0;for(let m=2;m<f.pts.length;m+=2)l+=Math.hypot(f.pts[m]-f.pts[m-2],f.pts[m+1]-f.pts[m-1]);return l+1e-4}),o=s.reduce((f,l)=>f+l,0),r=t-n,i=s.map(f=>1+Math.floor(r*f/o));let c=t-i.reduce((f,l)=>f+l,0);for(let f=0;c>0;f=(f+1)%n,c--)i[f]++;const u=[];return e.forEach((f,l)=>{const m=i[l],p=vt(f.pts,f.closed,m*(a-1)+1);for(let v=0;v<m;v++)u.push({pts:p.subarray(v*(a-1)*2,((v+1)*(a-1)+1)*2),pen:f.pen,width:f.width})}),u}function Wt(e,t,a){const n=ct(e),s=ct(t);if(!n.length)return s.map(f=>({...f,pen:f.pen*a}));if(!s.length)return n.map(f=>({...f,pen:f.pen*(1-a)}));const o=Math.max(n.length,s.length);if(o>120)return[...n.map(f=>({...f,pen:f.pen*(1-a)})),...s.map(f=>({...f,pen:f.pen*a}))];const r=Math.max(10,Math.min(220,Math.round(4e3/o))),i=xt(n,o,r),c=xt(s,o,r),u=[];for(let f=0;f<o;f++){const l=i[f],m=c[f],p=new Float32Array(r*2);for(let v=0;v<r*2;v++)p[v]=l.pts[v]+(m.pts[v]-l.pts[v])*a;u.push({pts:p,pen:l.pen+(m.pen-l.pen)*a,width:l.width+(m.width-l.width)*a})}return u}const bt=["Sternchen","Kreischen","Funken","ohne"];function $t(e,t){const a=[],{x:n,y:s,size:o,rot:r}=e;if(e.form===0)for(let i=0;i<3;i++){const c=r+i/3*Math.PI;a.push({pts:[n-Math.cos(c)*o,s-Math.sin(c)*o,n+Math.cos(c)*o,s+Math.sin(c)*o],pen:t,width:.0028})}else if(e.form===1){const i=[];for(let c=0;c<10;c++){const u=c%2?o*.42:o,f=r+c/10*we-Math.PI/2;i.push(n+Math.cos(f)*u,s+Math.sin(f)*u)}a.push({pts:i,pen:t,width:.0024,closed:!0})}else a.push({pts:[n-Math.cos(r)*o*1.3,s-Math.sin(r)*o*1.3,n+Math.cos(r)*o*1.3,s+Math.sin(r)*o*1.3],pen:t,width:.0026}),a.push({pts:[n+Math.sin(r)*o*.6,s-Math.cos(r)*o*.6,n-Math.sin(r)*o*.6,s+Math.cos(r)*o*.6],pen:t,width:.0026});return a}function Zt(e,t){const a=J(e,Vt),n=J(e,Ot,Xt),s=J(e,Gt),o=J(e,Ht),r=J(e,Kt);let i=null,c=null;const u=12e4,f=new Float32Array(u*4),l=e.createBuffer(),m=e.createVertexArray();e.bindVertexArray(m),e.bindBuffer(e.ARRAY_BUFFER,l),e.bufferData(e.ARRAY_BUFFER,f.byteLength,e.DYNAMIC_DRAW);const p=e.getAttribLocation(n.p,"p"),v=e.getAttribLocation(n.p,"a");e.enableVertexAttribArray(p),e.vertexAttribPointer(p,2,e.FLOAT,!1,16,0),e.enableVertexAttribArray(v),e.vertexAttribPointer(v,2,e.FLOAT,!1,16,8),e.bindVertexArray(null);const w=e.createTexture(),E=new Uint8Array(256*4);e.bindTexture(e.TEXTURE_2D,w),e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,256,1,0,e.RGBA,e.UNSIGNED_BYTE,E),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE);const T=e.createTexture(),P=document.createElement("canvas");P.width=1024,P.height=256;let A=null,q=-99,h=Math.random,d=null,F=null,z=0;const x={shape:{from:0,to:0,m:1,next:0},flow:{from:0,to:0,m:1,next:0,pa:[.5,.5,.5,.5],pb:[.5,.5,.5,.5],ta:0,tb:0},map:{from:0,to:0,m:1,next:0},part:{from:3,to:3,m:1,next:0}},k={shape:Fe.length,flow:Ce.length,map:Ue.length,part:bt.length},D={shape:[18,34],flow:[22,44],map:[16,32],part:[18,36]},O={shape:3.2,flow:4,map:3,part:1},G=[];let _=0,y=0,C=0,W=0;const b=M=>{const[R,L]=D[M];let H=z+R+h()*(L-R);for(let Q=0;Q<6&&Object.keys(x).some(X=>X!==M&&Math.abs(x[X].next-H)<4);Q++)H+=5;x[M].next=H},g=M=>{let R=d[M].next();return R===x[M].to&&(R=d[M].next()),R%k[M]},N=(M,R)=>{const L=x[M];L.from=L.to,L.to=R,L.m=0,M==="flow"&&(L.pa=L.pb,L.ta=L.tb,L.pb=[h(),h(),h(),h()],L.tb=0),b(M)},I=(M,R)=>{const L=P.getContext("2d");L.fillStyle="#000",L.fillRect(0,0,1024,256),L.fillStyle="#fff",L.textAlign="center",L.textBaseline="middle",L.font="700 64px system-ui, -apple-system, Segoe UI, sans-serif",L.fillText(String(M||"").slice(0,40),512,100),L.font="400 40px system-ui, -apple-system, Segoe UI, sans-serif",L.fillText(String(R||"").slice(0,50),512,172),e.bindTexture(e.TEXTURE_2D,T),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,P),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)},B=(M,R,L)=>{const H=bt[x.part.to],Q=M.events.kick!==_,K=M.events.onset!==y;if(_=M.events.kick,y=M.events.onset,M.playing&&x.part.m>=1){if(H==="Sternchen"){W+=R;const X=Q?2+Math.floor(h()*3):W>.9&&M.conf<.4?1:0;X&&(W=0);for(let $=0;$<X;$++){const U=h()*we,j=.25+h()*.5;G.push({type:"star",form:Math.floor(h()*3),x:Math.cos(U)*.12,y:Math.sin(U)*.12,vx:Math.cos(U)*j,vy:Math.sin(U)*j,rot:h()*we,vr:(h()-.5)*5,size:.03+h()*.035,age:0,life:2.2+h()*1.6})}}else if(H==="Kreischen"){if(z>C){C=z+1.6+h()*1.8;const X=.25+h()*.55,$=h()*we,U=(h()<.5?-1:1)*(.5+h()*.6),j=6+Math.floor(h()*4);for(let oe=0;oe<j;oe++)G.push({type:"ring",R:X,th:$,w:U,lag:oe*.11,r:.012+.01*(oe*7%3),age:0,life:3.2})}}else if(H==="Funken"){const X=K?10+Math.floor(h()*16):h()<R*6?1:0;for(let $=0;$<X;$++)G.push({type:"spark",x:(h()*2-1)*L,y:h()*2-1,r:.003+h()*.004,age:0,life:.3+h()*.6})}}for(let X=G.length-1;X>=0;X--){const $=G[X];if($.age+=R,$.age>$.life){G.splice(X,1);continue}$.type==="star"&&($.x+=$.vx*R,$.y+=$.vy*R,$.rot+=$.vr*R)}G.length>400&&G.splice(0,G.length-400)};return{look:{linear:!1,bloom:.06,scale:1,expo:1,vignette:0},keys:{m:()=>(N("shape",g("shape")),`Figur: ${Fe[x.shape.to].name}`),s:()=>(N("flow",g("flow")),`Strömung: ${Ce[x.flow.to].name}`),p:()=>(N("map",g("map")),`Farben: ${Ue[x.map.to].name}`)},help:"M Figur · S Strömung · P Farben",resize(M,R){c&&c.dispose();const L=Math.min(1,1440/R),H=i;i=kt(e,Math.max(32,Math.round(M*L)),Math.max(32,Math.round(R*L)),t),c=ie(e,M,R,t),H&&(e.bindFramebuffer(e.FRAMEBUFFER,i.src.fb),e.viewport(0,0,i.src.w,i.src.h),e.useProgram(r.p),Z(e,r,"uSrc",H.src.tex,0),e.drawArrays(e.TRIANGLES,0,3),H.dispose())},render(M,R){const L=M.dt;if(z+=L,F!==R.seed){const S=F===null;F=R.seed;let ne=Math.floor(R.seed*1e6)||1;h=()=>(ne=ne*16807%2147483647)/2147483647,d={shape:Ee(k.shape,h),flow:Ee(k.flow,h),map:Ee(k.map,h),part:Ee(k.part,h)};for(const V of["shape","flow","map","part"]){const re=g(V);S?(Object.assign(x[V],{from:re,to:re,m:1}),V==="flow"&&(x.flow.pb=[h(),h(),h(),h()]),b(V)):V!=="part"&&N(V,re)}}if(M.playing)for(const S of["shape","flow","map","part"])z>x[S].next&&x[S].m>=1&&N(S,g(S));for(const S of["shape","flow","map","part"])x[S].m=Math.min(1,x[S].m+L/O[S]);x.flow.ta+=L,x.flow.tb+=L;const H=i.dst.w,Q=i.dst.h;e.bindFramebuffer(e.FRAMEBUFFER,i.dst.fb),e.viewport(0,0,H,Q),e.useProgram(a.p),Me(e,a,M,R),e.uniform2f(a.u.uRes,H,Q),Z(e,a,"uPrev",i.src.tex,0);const K=ot(x.flow.m),X=Ce[x.flow.from],$=Ce[x.flow.to];e.uniform1i(a.u.uFa,x.flow.from),e.uniform1i(a.u.uFb,x.flow.to),e.uniform1f(a.u.uFm,K),e.uniform4fv(a.u.uPa,x.flow.pa),e.uniform4fv(a.u.uPb,x.flow.pb),e.uniform1f(a.u.uTa,x.flow.ta),e.uniform1f(a.u.uTb,x.flow.tb);const U=Math.min(3,L*60);e.uniform1f(a.u.uAmt,U*(.8+.35*Math.min(2,M.bassAtt))),e.uniform1f(a.u.uKeep,Math.pow(X.keep+($.keep-X.keep)*K,U)),e.uniform1f(a.u.uSub,.0012*U),e.uniform1f(a.u.uGrain,(X.grain+($.grain-X.grain)*K)*(Q/720)),e.bindVertexArray(R.quadVao),e.drawArrays(e.TRIANGLES,0,3);let j=0;const oe=(S,ne,V,re)=>{if(j>=u)return;const ae=j*4;f[ae]=S,f[ae+1]=ne,f[ae+2]=V,f[ae+3]=re,j++},Dt=2/Q,He=(S,ne,V,re)=>{if(V<=.003)return;const ae=Math.max(ne,1.2*Dt),_e=S.length/2,tt=re?_e:_e-1;for(let ve=0;ve<tt;ve++){const ye=(ve+1)%_e,ze=S[ve*2],qe=S[ve*2+1],ge=S[ye*2],Ne=S[ye*2+1];let me=-(Ne-qe),he=ge-ze;const Ie=Math.hypot(me,he);if(Ie<1e-7)continue;me=me/Ie*ae,he=he/Ie*ae;const Re=(ge-ze)/Ie*ae*.5,Se=(Ne-qe)/Ie*ae*.5;oe(ze-Re+me,qe-Se+he,1,V),oe(ze-Re-me,qe-Se-he,-1,V),oe(ge+Re+me,Ne+Se+he,1,V),oe(ze-Re-me,qe-Se-he,-1,V),oe(ge+Re-me,Ne+Se-he,-1,V),oe(ge+Re+me,Ne+Se+he,1,V)}},Ye={t:z,w:S=>Math.max(-1.3,Math.min(1.3,M.waveRaw[Math.min(511,Math.max(0,Math.round(S*511)))])),f:S=>{const ne=Math.min(31,Math.max(0,S*31)),V=Math.floor(ne),re=ne-V;return Math.min(1,M.bands[V]*(1-re)+M.bands[Math.min(31,V+1)]*re)},bass:M.bassAtt,asp:R.aspect},Bt=M.playing?.85+.15*Math.min(1,M.bassAtt):.25,dt=ot(x.shape.m);let Je;dt>=1||x.shape.from===x.shape.to?Je=ct(Fe[x.shape.to].f(Ye)):Je=Wt(Fe[x.shape.from].f(Ye),Fe[x.shape.to].f(Ye),dt);for(const S of Je)He(S.pts,S.width,S.pen*Bt,S.closed);B(M,L,R.aspect);for(const S of G){const ne=Math.min(1,S.age/.15,(S.life-S.age)/.6);if(S.type==="star")for(const V of $t(S,ne))He(V.pts,V.width,V.pen,V.closed);else if(S.type==="ring"){const V=S.age-S.lag;if(V<0)continue;const re=S.th+S.w*V,ae=S.R*(1+.15*V),_e=Math.cos(re)*ae*Math.min(1.4,R.aspect*.8),tt=Math.sin(re)*ae*.85,ve=[];for(let ye=0;ye<14;ye++)ve.push(_e+Math.cos(ye/14*we)*S.r,tt+Math.sin(ye/14*we)*S.r);He(ve,.0028,ne,!0)}else{const V=.6+.4*Math.sin(S.age*40+S.x*10);He([S.x-S.r,S.y,S.x+S.r,S.y],S.r*.8,ne*V,!1)}}j&&(e.useProgram(n.p),e.uniform1f(n.u.uAspect,R.aspect),e.bindBuffer(e.ARRAY_BUFFER,l),e.bufferSubData(e.ARRAY_BUFFER,0,f.subarray(0,j*4)),e.bindVertexArray(m),e.enable(e.BLEND),e.blendEquation(e.MAX),e.drawArrays(e.TRIANGLES,0,j));const Qe=R.title?`${R.title}|${R.artist}`:null;Qe&&Qe!==A&&(A=Qe,I(R.title,R.artist),q=z);const et=z-q;if(et<3.2){const S=Math.min(1,et/.4)*Math.min(1,(3.2-et)/.8)*.95;e.useProgram(s.p),Z(e,s,"uText",T,0),e.uniform1f(s.u.uAmt,S),e.enable(e.BLEND),e.blendEquation(e.MAX);const ne=Math.round(H*.6),V=Math.round(ne/4);e.viewport(Math.round((H-ne)/2),Math.round(Q*.5-V/2),ne,V),e.bindVertexArray(R.quadVao),e.drawArrays(e.TRIANGLES,0,3),e.viewport(0,0,H,Q)}e.blendEquation(e.FUNC_ADD),e.disable(e.BLEND);const pt=ot(x.map.m),Lt=Ue[x.map.from].f,_t=Ue[x.map.to].f;for(let S=0;S<256;S++){const ne=S/255,V=Lt(ne,z),re=pt>0?_t(ne,z):V;for(let ae=0;ae<3;ae++)E[S*4+ae]=Math.round(Math.min(1,Math.max(0,V[ae]+(re[ae]-V[ae])*pt))*255);E[S*4+3]=255}return e.bindTexture(e.TEXTURE_2D,w),e.texSubImage2D(e.TEXTURE_2D,0,0,0,256,1,e.RGBA,e.UNSIGNED_BYTE,E),e.bindFramebuffer(e.FRAMEBUFFER,c.fb),e.viewport(0,0,c.w,c.h),e.useProgram(o.p),Z(e,o,"uI",i.dst.tex,0),Z(e,o,"uMap",w,1),e.bindVertexArray(R.quadVao),e.drawArrays(e.TRIANGLES,0,3),i.swap(),c.tex},debug(M){for(const R of["shape","flow","map","part"])M[R]!=null&&(Object.assign(x[R],{from:M[R],to:M[R],m:1,next:z+1e6}),R==="flow"&&M.params&&(x.flow.pb=M.params))},info(){return`${Fe[x.shape.to].name} (M) · ${Ce[x.flow.to].name} (S) · ${Ue[x.map.to].name} (P)`},dispose(){i&&i.dispose(),c&&c.dispose(),e.deleteBuffer(l),e.deleteVertexArray(m),e.deleteTexture(w),e.deleteTexture(T);for(const M of[a,n,s,o,r])e.deleteProgram(M.p)}}}const wt=2400,ut=16,at=50*Math.PI/180,St=`
uniform mat4 uVP;
uniform vec3 uCore[4];
uniform float uCoreR[4];
uniform vec4 uCoreS[4];     // Bildschirm: x, y (-1..1), Tiefe (clip w, <= 0 = unsichtbar), Radius (Höhe = 2)
uniform float uClock, uSwirl, uLife, uTail, uSpread, uPx, uFocus, uMode;
uniform float uKicks[8];    // Teilchen-Uhr der letzten Schläge
uniform vec3 uCol[5];
float hs(float n){ return fract(sin(n * 12.9898) * 43758.5453); }
vec3 hs3(float n){ return vec3(hs(n), hs(n + 7.13), hs(n + 19.71)); }
vec3 rotAxis(vec3 v, vec3 k, float a){ float c = cos(a), s = sin(a); return v * c + cross(k, v) * s + k * dot(k, v) * (1. - c); }
struct Pt { vec3 p; float age; float life; float band; int core; float birth; float id; };
// Teilchen id, back Sekunden (Teilchen-Uhr) früher
Pt particle(float id, float back){
  Pt q;
  q.id = id;
  int c = int(mod(id, 4.));
  q.core = c;
  vec3 h = hs3(id * .731 + 1.3 + uMode * 3.1);
  vec3 g = hs3(id * 1.917 + 4.1);
  q.life = uLife * (.55 + .9 * h.x);
  float cl = uClock - back;
  q.age = mod(cl + h.y * q.life, q.life);
  q.birth = cl - q.age;
  float z = g.x * 2. - 1., a = g.y * 6.2831853;
  vec3 dir = vec3(sqrt(1. - z * z) * cos(a), z, sqrt(1. - z * z) * sin(a));
  vec3 ax = normalize(cross(dir, normalize(hs3(id * 3.3 + 9.) - .5 + 1e-3)));
  float speed = .3 + .8 * g.z;
  q.band = floor(hs(id * 5.71) * 31.99);
  float r0 = uCoreR[c] * 1.03;
  float r = r0 + speed * q.age * (.55 + .12 * q.age) * uSpread;
  vec3 d = rotAxis(dir, ax, uSwirl * q.age * (.4 + .9 * h.z));
  q.p = uCore[c] + d * r;
  return q;
}
// Helligkeit: eigenes Band, Pulk bei Schlägen (Geburt nahe einem Schlag), ein- und ausblenden
float glow(Pt q){
  float e = band(q.band / 31.);
  float k = 0.;
  for (int i = 0; i < 8; i++) k += exp(-abs(q.birth - uKicks[i]) * 12.);
  float fade = smoothstep(0., .2, q.age) * (1. - smoothstep(q.life * .55, q.life, q.age));
  return (.03 + .4 * e * e + .8 * min(k, 1.5)) * fade;
}
vec3 colorOf(Pt q){
  float x = hs(q.id * 2.37);
  vec3 c = x < .45 ? uCol[4] : x < .8 ? uCol[2] : mix(uCol[2], uCol[4], .5);
  return c * (.7 + .6 * hs(q.id * 9.1));
}
// hinter einer dunklen Glaskugel? -> stark gedämpft
float behind(vec4 clip){
  vec2 ndc = clip.xy / clip.w;
  float f = 1.;
  for (int i = 1; i < 4; i++) {
    vec4 s = uCoreS[i];
    if (s.z <= 0.) continue;
    vec2 d = (ndc - s.xy) * vec2(uAspect, 1.);
    if (clip.w > s.z && length(d) < s.w) f *= .12;
  }
  return f;
}
`,jt=`#version 300 es
${Ke}
${St}
uniform float uTailN, uAmt;
out vec3 vc;
void main(){
  int vid = gl_VertexID;
  int pid = vid / (2 * ${ut});
  int seg = (vid / 2) % ${ut};
  int end = vid % 2;
  float id = float(pid);
  Pt h = particle(id, 0.);
  float s = float(seg + end);
  float back = min(s * uTail, h.age);       // nicht über die Geburt hinaus
  Pt q = particle(id, back);
  vec4 clip = uVP * vec4(q.p, 1.);
  gl_Position = clip;
  // Teilchen dicht vor oder hinter der Kamera: Schweif nicht zeichnen (sonst Linien quer durchs Bild)
  float near = smoothstep(1.8, 3.2, (uVP * vec4(h.p, 1.)).w) * step(.5, clip.w);
  float on = step(float(seg) + .5, uTailN) * near;
  float k = 1. - s / (uTailN + 1.);
  vc = colorOf(h) * glow(h) * k * k * on * behind(clip) * .45 * uAmt;
}`,Yt=`#version 300 es
precision mediump float;
in vec3 vc; out vec4 o;
void main(){ o = vec4(vc, 1.); }`,Jt=`#version 300 es
${Ke}
${St}
uniform float uAmt;
out vec3 vc;
out float vb;
void main(){
  Pt q = particle(float(gl_VertexID), 0.);
  vec4 clip = uVP * vec4(q.p, 1.);
  gl_Position = clip;
  float blur = clamp(abs(clip.w - uFocus) * .45 - .25, 0., 3.);   // Tiefenunschärfe
  float e = band(q.band / 31.);
  float size = (1.6 + 2.6 * e) * uPx / max(clip.w, .3) * (1. + blur * 4.);
  gl_PointSize = clip.w < .3 ? 0. : clamp(size, 1., 96.);
  float spread = 1. / (1. + blur * 4.);                          // grosse Scheibe = gleiche Lichtmenge
  vc = colorOf(q) * glow(q) * (.35 + 1.3 * spread * spread) * behind(clip) * uAmt;
  vb = clamp(blur, 0., 1.);
}`,Qt=`#version 300 es
precision mediump float;
uniform float uRing;
in vec3 vc; in float vb; out vec4 o;
void main(){
  float d = length(gl_PointCoord - .5) * 2.;
  if (d > 1.) discard;
  float sharp = exp(-d * d * 5.) + .25 * exp(-d * d * 1.2);
  float bokeh = smoothstep(1., .82, d) * (.55 + .45 * d);
  float a = mix(sharp, bokeh * .5, vb);
  if (uRing > .5) a = smoothstep(.6, .75, d) * smoothstep(1., .88, d) * 1.6 + exp(-d * d * 30.) * .8;
  o = vec4(vc * a, 1.);
}`,en=ee(`
uniform vec4 uCoreS[4];
uniform float uCoreE[4], uNeb, uBurst;
uniform vec3 uCol[5];
void main(){
  vec2 q = (uv * 2. - 1.) * vec2(uAspect, 1.);
  vec2 nq = q * .8 + vec2(uT * .012, -uT * .006);
  float f = fbm(vec3(nq + vec2(fbm(vec3(nq * 1.3, uT * .02)), 0.) * .8, uT * .015));
  float f2 = fbm(vec3(nq * 2.1 + 9.3, uT * .02));
  vec3 neb = mix(uCol[3], uCol[1], smoothstep(-.3, .6, f)) * smoothstep(-.45, .75, f + f2 * .3);
  vec3 col = neb * uNeb * (.75 + .25 * min(uBassAtt, 2.));
  // Lichtkern
  vec4 s0 = uCoreS[0];
  if (s0.z > 0.) {
    float r = length(q - s0.xy * vec2(uAspect, 1.)) / max(s0.w, 1e-3);
    col += uCol[4] * (exp(-r * r * .9) * .9 + .05 / (r * r * .2 + .02)) * (.45 + .9 * uCoreE[0] + uBurst);
    col += vec3(1.) * exp(-r * r * 6.) * (1.6 + uBurst * 2.);
    col += uCol[2] * smoothstep(.15, 0., abs(r - 2.4)) * .05;          // schwacher Ring (Linsenschein)
  }
  // dunkle Glaskugeln
  for (int i = 1; i < 4; i++) {
    vec4 s = uCoreS[i];
    if (s.z <= 0.) continue;
    vec2 d = (q - s.xy * vec2(uAspect, 1.)) / max(s.w, 1e-3);
    float l = length(d);
    float e = uCoreE[i];
    if (l < 1.) {
      vec3 n = vec3(d, sqrt(1. - l * l));
      float fr = pow(1. - n.z, 4.);
      vec3 L = normalize(vec3(-.45, .6, .65));
      float spec = pow(max(dot(reflect(vec3(0., 0., -1.), n), L), 0.), 70.);
      float spec2 = pow(max(dot(reflect(vec3(0., 0., -1.), n), normalize(vec3(.6, -.3, .7))), 0.), 20.) * .15;
      // Funkeln im Glas (dreht mit)
      float a = uT * .15 + float(i);
      vec2 g = mat2(cos(a), -sin(a), sin(a), cos(a)) * d * 7.;
      vec2 ci = floor(g);
      float hh = hash12(ci + float(i) * 17.);
      float sp = step(.82, hh) * smoothstep(.3, 0., length(fract(g) - .5)) * (.4 + .6 * sin(uT * 2.5 + hh * 40.)) * (1. - l * .6);
      vec3 inside = col * .1 + uCol[0] * .02;
      col = inside + uCol[2] * fr * (.18 + .7 * e) + uCol[4] * pow(1. - n.z, 9.) * .25 + vec3(1.) * (spec * 1.2 + spec2) + uCol[4] * sp * (.25 + .9 * e);
    } else {
      col += uCol[2] * exp(-(l - 1.) * 12.) * .035 * (.4 + e);         // weicher Hof
    }
  }
  o = vec4(col, 1.);
}`),tn=e=>[1,3,5].map(t=>Math.pow(parseInt(e.slice(t,t+2),16)/255,2.2)),Ve=[{name:"Rosé",c:["#0a0408","#3a1430","#ff4fd8","#140816","#ffe6d2"]},{name:"Nordlicht",c:["#02060c","#0a2c4a","#3fa0ff","#030c1a","#d8f4ff"]},{name:"Glut",c:["#0a0402","#3a1606","#ff7a1a","#160702","#fff0c8"]},{name:"Smaragd",c:["#020a04","#0e3016","#5cff88","#041208","#eaffd8"]},{name:"Violett",c:["#06020c","#1e0c44","#8a5aff","#09041c","#ece2ff"]},{name:"Cover",c:null}],be=[{name:"Kometen",count:520,tail:12,tailDt:.055,swirl:.9,spread:1,head:1,ring:0,life:4.2},{name:"Haare",count:2400,tail:16,tailDt:.05,swirl:.12,spread:1.1,head:0,ring:0,life:3.2},{name:"Funken",count:900,tail:0,tailDt:0,swirl:.55,spread:.9,head:1.2,ring:0,life:5.5},{name:"Ringe",count:320,tail:3,tailDt:.07,swirl:.35,spread:.85,head:1,ring:1,life:5},{name:"Wirbel",count:800,tail:14,tailDt:.04,swirl:2.3,spread:.8,head:.8,ring:0,life:4.2}];function nn(e,t){const a=J(e,Yt,jt),n=J(e,Qt,Jt),s=J(e,en),o=e.createVertexArray();let r=null,i=0,c=0,u=0,f=0;const l=new Float32Array(8).fill(-99);let m=0,p=0,v=-1,w=1,E=0,T=null;const P=Le({beats:64,minSec:45,maxSec:100}),A=[0,1,2,3].map(()=>({p:[0,0,0],e:0,r:.3})),q=(d,F)=>{if(d===0)return[.35*Math.sin(F*.07),.2*Math.sin(F*.05+1),.35*Math.cos(F*.06)];const z=F*(.09+d*.017)+d*2.1,x=1.8+.45*Math.sin(F*.05+d);return[Math.cos(z)*x,.8*Math.sin(F*(.06+d*.011)+d*1.3),Math.sin(z)*x*.85]},h=(d,F,z,x,k,D,O,G)=>{Me(e,d,F,z),e.uniformMatrix4fv(d.u.uVP,!1,x),e.uniform3fv(d.u.uCore,A.flatMap(_=>_.p)),e.uniform1fv(d.u.uCoreR,A.map(_=>_.r)),e.uniform4fv(d.u.uCoreS,k),e.uniform1f(d.u.uClock,c),e.uniform1f(d.u.uSwirl,D.swirl),e.uniform1f(d.u.uLife,D.life),e.uniform1f(d.u.uTail,D.tailDt),e.uniform1f(d.u.uSpread,D.spread),e.uniform1f(d.u.uPx,r.h/2/Math.tan(at/2)*.012),e.uniform1f(d.u.uFocus,6.2),e.uniform1f(d.u.uMode,be.indexOf(D)),e.uniform1fv(d.u.uKicks,l),e.uniform3fv(d.u.uCol,G),e.uniform1f(d.u.uAmt,O)};return{look:{linear:!0,bloom:.6,scale:1,expo:1},keys:{m:()=>(v=p,p=(p+1)%be.length,w=0,P.reset(),`Modus: ${be[p].name}`),p:()=>(E=(E+1)%Ve.length,`Farben: ${Ve[E].name}`)},help:"M Modus · P Farben",resize(d,F){r&&r.dispose(),r=ie(e,d,F,t)},render(d,F){const z=d.dt;if(i+=z,T!==F.seed){T=F.seed,E=Math.floor(F.seed*997)%(Ve.length-1);const N=Math.floor(F.seed*131)%be.length;N!==p&&(v=p,p=N,w=0)}P.tick(d,z)&&(v=p,p=(p+1+Math.floor(Math.random()*(be.length-1)))%be.length,w=0),w=Math.min(1,w+z/2.5),c+=z*(.55+.45*Math.min(2,d.bassAtt))*(d.playing?1:.25),d.events.kick!==f&&(f=d.events.kick,l[m]=c,m=(m+1)%8,u=1),u*=Math.exp(-z*7);const x=[[0,5],[5,12],[12,21],[21,32]];for(let N=0;N<4;N++){const I=A[N];I.p=q(N,i);let B=0;for(let M=x[N][0];M<x[N][1];M++)B+=d.bands[M];B/=x[N][1]-x[N][0],I.e+=(B-I.e)*(1-Math.exp(-z*8)),I.r=(N===0?.08:[.62,.5,.4][N-1])*(1+.1*I.e)}const k=Ve[E].c;let D;if(k)D=k.flatMap(tn);else{const N=Array.from({length:5},(M,R)=>Array.from(F.palette.slice(R*3,R*3+3))),I=M=>.2126*M[0]+.7152*M[1]+.0722*M[2],B=N.slice().sort((M,R)=>I(M)-I(R));D=[B[0].map(M=>M*.1),B[1].map(M=>M*.35),B[3],B[0].map(M=>M*.15),B[4].map(M=>Math.min(1,M*1.2+.1))].flat()}const O=i*.045,G=6.2+.5*Math.sin(i*.03),_=[Math.sin(O)*G,1.1*Math.sin(i*.027)+.3,Math.cos(O)*G],y=ht(lt(at,F.aspect,.1,50),mt(_,[0,0,0])),C=1/Math.tan(at/2),W=[];for(const N of A){const I=N.p,B=y[0]*I[0]+y[4]*I[1]+y[8]*I[2]+y[12],M=y[1]*I[0]+y[5]*I[1]+y[9]*I[2]+y[13],R=y[3]*I[0]+y[7]*I[1]+y[11]*I[2]+y[15];R<.2?W.push(0,0,-1,0):W.push(B/R,M/R,R,N.r*C/R)}e.bindFramebuffer(e.FRAMEBUFFER,r.fb),e.viewport(0,0,r.w,r.h),e.useProgram(s.p),Me(e,s,d,F),e.uniform4fv(s.u.uCoreS,W),e.uniform1fv(s.u.uCoreE,A.map(N=>N.e)),e.uniform1f(s.u.uNeb,.85),e.uniform1f(s.u.uBurst,u*.6),e.uniform3fv(s.u.uCol,D),e.bindVertexArray(F.quadVao),e.drawArrays(e.TRIANGLES,0,3),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE),e.bindVertexArray(o);const b=(N,I)=>{if(I<=.01)return;const B=be[N];B.tail>0&&(e.useProgram(a.p),h(a,d,F,y,W,B,I,D),e.uniform1f(a.u.uTailN,B.tail),e.drawArrays(e.LINES,0,Math.min(wt,B.count)*ut*2)),B.head>0&&(e.useProgram(n.p),h(n,d,F,y,W,B,I*B.head,D),e.uniform1f(n.u.uRing,B.ring),e.drawArrays(e.POINTS,0,Math.min(wt,B.count)))},g=w*w*(3-2*w);return v>=0&&g<1&&b(v,1-g),b(p,g),e.disable(e.BLEND),e.blendFunc(e.ONE,e.ZERO),r.tex},debug(d){d.mode!=null&&(p=d.mode,v=-1,w=1),d.pal!=null&&(E=d.pal)},info(){return`${be[p].name} (M) · ${Ve[E].name} (P)`},dispose(){r&&r.dispose(),e.deleteVertexArray(o);for(const d of[a,n,s])e.deleteProgram(d.p)}}}const $e=new Map;function on(e){if(!$e.has(e)){const t=new Promise((a,n)=>{const s=new Image;s.decoding="async",s.onload=()=>(s.decode?s.decode().catch(()=>{}):Promise.resolve()).then(()=>a(s)),s.onerror=()=>n(new Error("Bild fehlt: "+e)),s.src=Tt("/viz/"+e)});t.catch(()=>$e.delete(e)),$e.set(e,t)}return $e.get(e)}function an(e,t,{srgb:a=!0,mip:n=!0,repeat:s=!1,nearest:o=!1}={}){const r=e.createTexture();return e.bindTexture(e.TEXTURE_2D,r),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.NONE),e.texImage2D(e.TEXTURE_2D,0,a?e.SRGB8_ALPHA8:e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,t),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),n&&!o&&e.generateMipmap(e.TEXTURE_2D),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,o?e.NEAREST:n?e.LINEAR_MIPMAP_LINEAR:e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,o?e.NEAREST:e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,s?e.REPEAT:e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),r}function Ze(e,t){let a="idle",n=null;return{get(){return a==="idle"&&(a="loading",Promise.all(t.map(s=>on(s.name))).then(s=>{a==="loading"&&(n=s.map((o,r)=>an(e,o,t[r])),a="ready")}).catch(s=>{console.warn("Visualizer-Bilder:",s&&s.message),a="failed"})),a==="ready"?n:null},get failed(){return a==="failed"},release(){if(n)for(const s of n)e.deleteTexture(s);n=null,a="idle"}}}const sn=ee(`
uniform vec3 uNeon;
uniform int uShapeA, uShapeB; uniform float uShapeM;
uniform float uBeam[4], uBeamX[4];
uniform float uPx;                     // ein Bildpunkt in Bild-Einheiten (Höhe = 1)
uniform float uHZ;                     // Wasserlinie (Bühnen an Land: ganz unten, ohne Wasser)
uniform vec2 uC;                       // Mitte der Form
uniform float uSc;                     // Grösse der Form
uniform int uStage;                    // 0 gerechneter Felsen, 1 Felsinsel (Bild), 2 Bühne (Vollbild)
uniform sampler2D uImg, uImgL, uDep, uSmoke;
uniform vec4 uRect;                    // Bild im Bildraum: links, unten, Breite, Höhe
uniform vec2 uSway;                    // Kamera wiegt: nahe Dinge verschieben sich mehr (Tiefe)
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
  float beamFloor = uHZ;
  if (uStage == 2) {
    // Bühne (Bild): Mondlicht-Durchgang, dazu das Neonlicht in der aktuellen Farbe, im Takt
    float dep = texture(uDep, rectUV(q)).r;
    vec2 tuv = rectUV(q + uSway * (1. - dep));
    col = texture(uImg, tuv).rgb;
    col += texture(uImgL, tuv).rgb * uNeon * (.55 + .5 * uPulse + .2 * min(uBass, 2.));
    float sky = smoothstep(.97, .995, dep);
    col += vec3(.75, .8, 1.) * stars(q) * sky * .5;
    col += uNeon * exp(-length(p) * 2.6) * .025 * (.6 + .4 * uPulse);
    beamFloor = uRect.y + uRect.w * .3;
  } else {
    // Nebel: dünn, zieht seitlich; Licht hinter der Form; Sterne oben
    float f = fbm(vec3(q * vec2(1.1, 2.4) + vec2(uT * .02, 0.), uT * .035));
    float near = exp(-length(p * vec2(.8, 1.)) * 2.);
    col = uNeon * (.004 + (.018 + .035 * min(uBassAtt, 2.) * .5) * smoothstep(-.2, .6, f) * (.25 + near));
    col += uNeon * exp(-length(p) * 3.2) * .05 * (.6 + .4 * uPulse);
    col += vec3(.7, .75, 1.) * stars(q) * smoothstep(0., .35, q.y) * .45;
  }
  // Lichtstrahlen (schmal und scharf)
  for (int k = 0; k < 4; k++) {
    float dx = abs(q.x - uBeamX[k]);
    col += uNeon * uBeam[k] * ((1. - smoothstep(uPx, 3. * uPx, dx)) * .8 + exp(-dx * 60.) * .04) * smoothstep(beamFloor, beamFloor + .45, q.y) * (uStage == 2 ? .5 : 1.);
  }
  col += neon(p);
  if (uStage == 1) {
    // Felsinsel (Bild): schwebt knapp über dem Wasser, Oberseite vom Neon angeleuchtet
    vec2 tuv = rectUV(q);
    if (tuv.x > 0. && tuv.y > 0. && tuv.x < 1. && tuv.y < 1.) {
      vec4 b = texture(uImg, tuv);
      vec3 l = texture(uImgL, tuv).rgb;
      vec3 isl = b.rgb * 1.3 + l * uNeon * (.6 + .55 * uPulse + .2 * min(uBass, 2.));
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
  // Neon-Linie unten: weich, wölbt sich mit dem Spektrum (von der Mitte nach aussen)
  float yl = -.4;
  float xw = q.x / (uAspect * .3);
  if (abs(xw) < 1.) {
    float taper = smoothstep(1., .55, abs(xw));
    float ax = abs(xw) * .9;
    float sb = (band(ax - .04) + 2. * band(ax) + band(ax + .04)) * .25;      // geglättet: keine Knicke
    float y = yl + (sb * .03 * (.5 + .5 * min(uBass, 2.)) + .003 * sin(xw * 9. + uT * 2.)) * taper;
    float d = abs(q.y - y);
    float core = 1. - smoothstep(uPx, 2.4 * uPx, d);
    col += mix(uNeon, vec3(1.), .6) * core * .9 * (.4 + .6 * smoothstep(1., .85, abs(xw))) + uNeon * exp(-d / .006) * .35 * taper;
  }
  o = vec4(col * uFade, 1.);
}`),Te=[[1,.32,.03],[.08,.35,1],[.55,.12,1],[1,.05,.22],[.12,1,.2],[.05,.85,1],[1,.1,.8],[1,.78,.05]],De=[{name:"Felsinsel",kind:1,files:["felsinsel_basis.webp","felsinsel_neonlicht.webp"]},{name:"Wüste",kind:2,files:["wueste_basis.webp","wueste_neonlicht.webp","wueste_tiefe.webp"],free:[.5,.59],size:.74,ground:.3},{name:"Ruinen",kind:2,files:["ruinen_basis.webp","ruinen_neonlicht.webp","ruinen_tiefe.webp"],free:[.505,.585],size:.68,ground:.3}],rn="rauch_atlas.webp";function cn(e,t){const a=J(e,sn);let n=null,s=0,o=[...Te[0]],r=[...Te[0]],i=[...Te[0]],c=1,u=0,f=0,l=0,m=1,p=null,v=0;const w=[0,0,0,0],E=[0,0,0,0];let T=0;const P=De.map(_=>Ze(e,_.files.map(y=>({name:y,srgb:!y.includes("tiefe")})))),A=Ze(e,[{name:rn}]);let q=0,h=-1,d=1,F=0;const z=Array.from({length:5},(_,y)=>({x:y/5*2-1,y:0,size:.7,a:0,img:y,v:.01})),x=(_,y,C,W)=>{_.img=3+Math.floor(Math.random()*5),_.size=.55+Math.random()*.45,_.v=(Math.random()<.5?-1:1)*(.008+Math.random()*.012),_.a=.16+Math.random()*.2,_.x=W?(Math.random()*2-1)*C*.5:_.v>0?-C*.5-_.size*.5:C*.5+_.size*.5,_.yr=Math.random()};z.forEach(_=>x(_,null,1.78,!0));const k=Ee(Te.length),D=Le({beats:64,minSec:40,maxSec:90}),O=()=>{let _=k.next();_===u&&(_=k.next()),u=_,r=[...o],i=[...Te[u]],c=0},G=()=>{f=l,l=(l+1+Math.floor(Math.random()*4))%5,m=0};return{look:{linear:!0,bloom:.42,scale:1,expo:.95,full:!0},label:"center",keys:{m:()=>(G(),"Form gewechselt"),p:()=>(O(),"Farbe gewechselt"),b:()=>(q=(q+1)%De.length,`Bühne: ${De[q].name}`)},help:"M Form · P Farbe · B Bühne",resize(_,y){n&&n.dispose(),n=ie(e,_,y,t)},render(_,y){const C=_.dt;if(s+=C,p!==y.seed){const U=p===null;p=y.seed;const j=Math.floor(y.seed*97)%5;q=Math.floor(y.seed*61)%De.length,U?(f=l=j,u=Math.floor(y.seed*Te.length),o=[...Te[u]],i=[...o],c=1):j!==l&&(f=l,l=j,m=0)}D.tick(_,C)&&O(),c=Math.min(1,c+C/1.5),m=Math.min(1,m+C/1.2);const W=c*c*(3-2*c);if(o=r.map((U,j)=>U+(i[j]-U)*W),_.events.kick!==v&&(v=_.events.kick,s>T)){const U=w.indexOf(Math.min(...w));w[U]=1,E[U]=(Math.random()-.5)*1.6,T=s+.25}for(let U=0;U<4;U++)w[U]*=Math.exp(-C*3);const b=P[q].get();q!==h&&b&&F===0&&(F=-1),F<0?(d=Math.max(0,d-C/.35),d===0&&(h>=0&&h!==q&&P[h].release(),h=P[q].get()?q:h,F=1)):F>0&&(d=Math.min(1,d+C/.6),d===1&&(F=0));const g=y.aspect,N=h>=0?De[h]:null,I=h>=0?P[h].get():null,B=A.get();let M=I?N.kind:0,R=-.17,L=[0,.1],H=1,Q=[0,0,1,1];if(M===1)Q=[-.75,-.38,1.5,.5],R=-.34,L=[0,.17],H=.7;else if(M===2){const U=1.7777777777777777,j=Math.max(g,U),oe=j/U;Q=[-j/2,-oe/2,j,oe],R=-9,L=[Q[0]+N.free[0]*j,Q[1]+N.free[1]*oe],H=N.size*oe}for(const U of z)U.x+=U.v*C,Math.abs(U.x)>g*.5+U.size*.6&&x(U,N,g,!1);const K=[],X=[];for(const U of z){const j=M===2?Q[1]+Q[3]*(N.ground-.12+U.yr*.16):M===1?-.34+U.yr*.26:-.2+U.yr*.15;K.push(U.x,j,U.size,B?U.a*(M===0?.6:1):0),X.push(U.img)}e.bindFramebuffer(e.FRAMEBUFFER,n.fb),e.viewport(0,0,n.w,n.h),e.useProgram(a.p),Me(e,a,_,y),e.uniform3fv(a.u.uNeon,o),e.uniform1i(a.u.uShapeA,f),e.uniform1i(a.u.uShapeB,l),e.uniform1f(a.u.uShapeM,m*m*(3-2*m)),e.uniform1fv(a.u.uBeam,w),e.uniform1fv(a.u.uBeamX,E),e.uniform1f(a.u.uPx,1/n.h),e.uniform1i(a.u.uStage,M),e.uniform1f(a.u.uHZ,R),e.uniform2fv(a.u.uC,L),e.uniform1f(a.u.uSc,H),e.uniform4fv(a.u.uRect,Q),e.uniform2f(a.u.uSway,Math.sin(s*.11)*.006,Math.sin(s*.07)*.003),e.uniform4fv(a.u.uSmk,K),e.uniform1fv(a.u.uSmkI,X),e.uniform1f(a.u.uHasSmoke,B?1:0),e.uniform1f(a.u.uFade,d);const $=(U,j,oe)=>{a.u[U]!=null&&(e.activeTexture(e.TEXTURE0+oe),e.bindTexture(e.TEXTURE_2D,j),e.uniform1i(a.u[U],oe))};return $("uImg",I?I[0]:null,0),$("uImgL",I?I[1]:null,1),$("uDep",I&&I[2]?I[2]:null,2),$("uSmoke",B?B[0]:null,3),e.activeTexture(e.TEXTURE0),e.bindVertexArray(y.quadVao),e.drawArrays(e.TRIANGLES,0,3),n.tex},info:()=>`${h>=0?De[h].name:"Felsen"} (B)`,debug(_){_.stage!=null&&(q=_.stage)},dispose(){n&&n.dispose();for(const _ of P)_.release();A.release(),e.deleteProgram(a.p)}}}const un=`#version 300 es
precision mediump float;
in vec3 vc; out vec4 o;
void main(){ float d = length(gl_PointCoord - .5) * 2.; o = vec4(vc * smoothstep(1., .2, d), 1.); }`,fn=ee(`
uniform sampler2D uPrev; uniform float uDecay;
void main(){ o = vec4(max(texture(uPrev, uv).rgb * uDecay - .002, 0.), 1.); }`),Pt=64e3,ln=`#version 300 es
${Ke}
${Et}
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
  float y = 1. - 2. * fi / ${Pt}.;
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
}`,Ge=240,ft=150,mn=`#version 300 es
${Ke}
${Et}
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
  int id = gl_VertexID, ix = id % ${Ge}, iz = id / ${Ge};
  float u = float(ix) / ${Ge-1}., v = float(iz) / ${ft-1}.;
  // Übergang läuft als Welle von vorne nach hinten über die Fläche
  mm = clamp(uMorph * 1.6 - (v * .5 + hash12(vec2(u, v) * 91.) * .1), 0., 1.);
  mm = mm * mm * (3. - 2. * mm);
  vec4 P = pos(u, v);
  vec3 px = pos(u + 1. / ${Ge}., v).xyz, pz = pos(u, v + 1. / ${ft}.).xyz;
  vec3 nrm = normalize(cross(pz - P.xyz, px - P.xyz));
  if (nrm.y < 0.) nrm = -nrm;
  vec4 clip = uVP * vec4(P.xyz, 1.);
  gl_Position = clip;
  gl_PointSize = clamp((2. + 2.5 * P.w) * uPx / clip.w, 1., 6.);
  float light = .18 + .82 * pow(max(0., dot(nrm, normalize(vec3(-.55, .75, -.4)))), 1.5);
  float dist = length(P.xyz - vec3(0., 0., 2.));
  float fade = exp(-max(0., P.z) * .2) * smoothstep(0., .06, v) * smoothstep(1., .9, v);
  vc = mix(vec3(1.), pal(u * .5 + v * .3 + P.w * .3), uTint) * (light * .55 + P.w * 1.4) * fade * .6;
}`;function At(e,t,a,n,s){const o=J(e,un,a),r=J(e,fn),i=e.createVertexArray();let c=null,u=null,f=0;return{resize(l,m){c&&c.dispose(),u&&u.dispose(),c=kt(e,l,m,t),u=ie(e,l,m,t)},tint(l){f=l},render(l,m,p){return e.bindFramebuffer(e.FRAMEBUFFER,c.dst.fb),e.viewport(0,0,c.dst.w,c.dst.h),e.useProgram(r.p),Z(e,r,"uPrev",c.src.tex,0),e.uniform1f(r.u.uDecay,Math.pow(p,l.dt*60)),e.bindVertexArray(m.quadVao),e.drawArrays(e.TRIANGLES,0,3),e.useProgram(o.p),Me(e,o,l,m),e.uniform1f(o.u.uPx,c.dst.h/240),e.uniform1f(o.u.uTint,f),s(o),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE),e.bindVertexArray(i),e.drawArrays(e.POINTS,0,n),e.disable(e.BLEND),c.swap(),c.src.tex},dispose(){c&&c.dispose(),u&&u.dispose(),e.deleteVertexArray(i),e.deleteProgram(o.p),e.deleteProgram(r.p)}}}const pe=[{name:"Weiss",v:0},{name:"Hauch Farbe",v:.35},{name:"Cover-Farben",v:.85}];function Ft(e,t,a=6){let n=0,s=0,o=1,r=-1e9,i=0,c=Ee(e);const u=Le({beats:64,minSec:45,maxSec:100}),f=l=>{n=s,s=l,o=0,u.reset()};return{tick(l,m){if(i+=m,u.tick(l,m)&&o>=1&&i-r>120){let p=c.next();p===s&&(p=c.next()),f(p)}return o=Math.min(1,o+m/a),{a:n,b:s,m:o}},next(){return r=i,f((s+1)%e),`Muster: ${t[s]}`},name:()=>t[s],seed(l){s=Math.floor(l*e)%e,n=s,o=1;let m=Math.floor(l*1e6)||1;c=Ee(e,()=>(m=m*16807%2147483647)/2147483647),u.reset()}}}function hn(e,t){let a=0,n=9,s=0,o=0,r=null,i=[0,0,3.4],c=0,u=null,f={a:0,b:0,m:1};const l=Ft(4,["gefaltet","Stacheln","Ringe","Blüte"]),m=At(e,t,ln,Pt,p=>{e.uniformMatrix4fv(p.u.uVP,!1,r),e.uniform1f(p.u.uRip,n),e.uniform1f(p.u.uRipAmp,s),e.uniform3fv(p.u.uEye,i),e.uniform1i(p.u.uVa,f.a),e.uniform1i(p.u.uVb,f.b),e.uniform1f(p.u.uMorph,f.m)});return{look:{linear:!0,bloom:.45,scale:1},keys:{p:()=>(c=(c+1)%pe.length,m.tint(pe[c].v),`Farbe: ${pe[c].name}`),m:()=>l.next()},resize:(p,v)=>m.resize(p,v),render(p,v){return a+=p.dt,u!==v.seed&&(u=v.seed,l.seed(v.seed)),f=l.tick(p,p.dt),p.events.kick!==o&&(o=p.events.kick,n=0,s=1),n+=p.dt*2.6,s*=Math.exp(-p.dt*1.6),i=[0,.15*Math.sin(a*.07),3.6],r=ht(lt(40*Math.PI/180,v.aspect,.1,20),mt(i,[0,0,0])),m.render(p,v,0)},info:()=>`${l.name()} (M) · ${pe[c].name} (P)`,dispose:()=>m.dispose()}}const Mt=[[1.25,-1.5,-.2,2.8],[2.7,-.25,-.35,2.3],[2,-.7,-.25,2.4],[.95,-1.25,0,3]];function dn(e,t){let a=0,n=9,s=0,o=0,r=null,i=2,c=null,u={a:0,b:0,m:1};const f=Ft(4,["Stoff","Spirale","Ringe","Landschaft"]),l=At(e,t,mn,Ge*ft,m=>{e.uniformMatrix4fv(m.u.uVP,!1,r),e.uniform1f(m.u.uKickR,n),e.uniform1f(m.u.uKickAmp,s),e.uniform1i(m.u.uVa,u.a),e.uniform1i(m.u.uVb,u.b),e.uniform1f(m.u.uMorph,u.m)});return l.tint(pe[i].v),{look:{linear:!0,bloom:.5,scale:1},keys:{p:()=>(i=(i+1)%pe.length,l.tint(pe[i].v),`Farbe: ${pe[i].name}`),m:()=>f.next()},resize:(m,p)=>l.resize(m,p),render(m,p){a+=m.dt,c!==p.seed&&(c=p.seed,f.seed(p.seed)),u=f.tick(m,m.dt),m.events.kick!==o&&(o=m.events.kick,n=0,s=1),n+=m.dt*2.2,s*=Math.exp(-m.dt*1.4);const v=Mt[u.a],w=Mt[u.b],E=u.m*u.m*(3-2*u.m),T=v.map((q,h)=>q+(w[h]-q)*E),P=Math.sin(a*.05)*.3,A=[P,T[0]+.08*Math.sin(a*.04),T[1]];return r=ht(lt(50*Math.PI/180,p.aspect,.05,30),mt(A,[P*.3,T[2],T[3]])),l.render(m,p,.45)},info:()=>`${f.name()} (M) · ${pe[i].name} (P)`,dispose:()=>l.dispose()}}function je(e,t,a,{look:n,label:s,keys:o,help:r,info:i,before:c,setup:u}){const f=J(e,a);let l=null;return{look:n,label:s,keys:o,help:r,info:i,resize(m,p){l&&l.dispose(),l=ie(e,m,p,t)},render(m,p){return c&&c(m,p),e.bindFramebuffer(e.FRAMEBUFFER,l.fb),e.viewport(0,0,l.w,l.h),e.useProgram(f.p),Me(e,f,m,p),u&&u(f,m,p),e.bindVertexArray(p.quadVao),e.drawArrays(e.TRIANGLES,0,3),l.tex},dispose(){l&&l.dispose(),e.deleteProgram(f.p)}}}const pn=ee(`
uniform float uSpeed, uTwist, uRing, uRingDepth, uRoll, uSides, uPoly;
float near(float x){ return abs(fract(x + .5) - .5); }
// Mittellinie des Tunnels: weite Kurven nach links/rechts und oben/unten
vec2 path(float s){ return vec2(sin(s * .17) * 1.4 + sin(s * .071) * 1.1, sin(s * .13 + 1.) * .9 + cos(s * .053) * .7); }
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
  vec2 c0 = path(uSpeed), t0 = (path(uSpeed + .01) - path(uSpeed - .01)) / .02;
  vec2 q = p;
  float d = .3 / max(length(p), 1e-3);
  for (int i = 0; i < 4; i++) {
    vec2 off = (path(uSpeed + d) - c0 - t0 * d) * .3 / d;
    q = p - off;
    d = .3 * shapeR(atan(q.y, q.x)) / max(length(q), 1e-3);
  }
  float a = atan(q.y, q.x);
  float z = d + uSpeed;
  float u = a / 6.2831853 + .5 + uTwist + .05 * sin(z * .3);
  float zr = z * 1.4, ur = u * 20.;
  // Ableitungen ohne Sprung an der Naht (Winkel springt von +pi auf -pi)
  float fz = max(fwidth(zr), 1e-3);
  float fu = max(min(fwidth(ur), fwidth(fract(u + .5) * 20.)), 1e-3);
  float ring = smoothstep(fz * 2., 0., near(zr)) + .25 * exp(-near(zr) * 10.);
  float rail = smoothstep(fu * 2., 0., near(ur)) + .2 * exp(-near(ur) * 10.);
  vec2 cell = vec2(mod(floor(ur), 20.), floor(zr));
  float ce = band(fract(hash12(cell) + .13));
  float panel = pow(ce, 3.) * .5;
  float e = band(fract(z * .04));
  vec3 base = pal(z * .02 + u * .3);
  vec3 col = base * (ring * (.35 + 1.1 * e) + rail * (.25 + .6 * ce)) + pal(hash12(cell) * .5 + .2) * panel;
  // Kick-Ring: kommt aus der Tiefe auf einen zu
  col += vec3(1.) * exp(-abs(z - uRingDepth) * 7.) * uRing * 1.2;
  // Nebel in der Tiefe, Licht am Ende des Tunnels
  float far = smoothstep(4., 16., d);
  col *= 1. - far;
  col += pal(.1) * far * far * (.18 + .5 * min(uBassAtt, 2.) * .5);
  o = vec4(col, 1.);
}`),st=e=>[Math.sin(e*.17)*1.4+Math.sin(e*.071)*1.1,Math.sin(e*.13+1)*.9+Math.cos(e*.053)*.7];function vn(e,t){let a=0,n=0,s=0,o=0,r=0,i=0;const c=[6,4,8,3];let u=6,f=0,l=0;const m=Le({beats:64,minSec:40,maxSec:90});return je(e,t,pn,{look:{linear:!0,bloom:.7,scale:1},before(p){const v=p.conf>.4?p.bpm/60*.72:.6+.8*Math.min(2,p.bassAtt);a+=p.dt*v*(p.playing?1:.15),n+=p.dt*.02*(p.midAtt-.9),p.events.kick!==r&&(r=p.events.kick,s=1,o=a+7),s*=Math.exp(-p.dt*1.8);const w=st(a-.05),E=st(a+.05),P=(st(a+1.5)[0]-E[0])/1.45-(E[0]-w[0])/.1;i+=(Math.max(-.5,Math.min(.5,-P*.35))-i)*(1-Math.exp(-p.dt*2)),m.tick(p,p.dt)&&(l>.5?l=0:(u=c[Math.floor(Math.random()*c.length)],l=1)),f+=(l-f)*(1-Math.exp(-p.dt*.8))},setup(p){e.uniform1f(p.u.uSpeed,a),e.uniform1f(p.u.uTwist,n),e.uniform1f(p.u.uRing,s),e.uniform1f(p.u.uRingDepth,o),e.uniform1f(p.u.uRoll,i),e.uniform1f(p.u.uSides,u),e.uniform1f(p.u.uPoly,f)}})}const xn=ee(`
uniform float uMove, uSun, uSway, uWave, uShoot, uShootY;
uniform vec3 uGrid, uRim, uSunA, uSunB, uSky;
float near(float x){ return abs(fract(x + .5) - .5); }
// Landschaft: flache Strasse in der Mitte, Berge an den Seiten; Höhe atmet mit dem Spektrum
float hgt(vec2 p){
  float side = smoothstep(.9, 3.4, abs(p.x));
  float n = gnoise(p * vec2(.26, .19)) * .5 + .5;
  float n2 = gnoise(p * vec2(.8, .6) + 7.) * .5 + .5;
  float b = band(clamp(abs(p.x) / 11., 0., 1.));
  return side * (n * 1.7 + n2 * .45) * (.3 + 1.6 * b);
}
void main(){
  vec2 q = (uv - .5) * vec2(uAspect, 1.);
  vec3 ro = vec3(uSway, .62, uMove);
  vec3 rd = normalize(vec3(q.x, q.y - .07, 1.15));
  float px = 1. / uRes.y;
  // --- Himmel: Verlauf, Sterne, Sonne mit Streifen, Sternschnuppe
  float y = q.y - .07;
  vec3 col = mix(uSky * 1.3, uSky * .12, smoothstep(-.02, .5, y));
  vec2 g = floor(q * 260.);
  float st = step(.9965, hash12(g)) * smoothstep(.12, .35, y);
  col += vec3(.9) * st * (.55 + .45 * sin(uT * 3. + hash12(g + 3.) * 40.));
  vec2 sp = q - vec2(0., .07 + .19);
  float R = .21 * (1. + .035 * uSun);
  float sd = length(sp);
  float k = clamp((sp.y + R) / (2. * R), 0., 1.);
  float stripe = smoothstep(.0, px * 120., fract(sp.y * 24. + uT * .35) - .45 + .35 * k);
  float disc = smoothstep(R, R - px * 1.5, sd) * clamp(stripe + step(.55, k), 0., 1.);
  col = mix(col, mix(uSunA, uSunB, k) * 1.45, disc);
  col += uSunA * exp(-sd * 5.5) * .16 * (1. + uSun);
  if (uShoot > 0. && uShoot < 1.) {
    vec2 a0 = vec2(mix(-1.1, 1.1, uShoot) * uAspect * .5, uShootY - uShoot * .12);
    vec2 dir = normalize(vec2(1., -.11));
    vec2 rel = q - a0;
    float along = dot(rel, -dir), across = abs(dot(rel, vec2(-dir.y, dir.x)));
    col += vec3(1.) * smoothstep(px * 2., 0., across) * smoothstep(.25, 0., along) * step(0., along) * sin(uShoot * 3.1416);
  }
  // --- Boden: Strahl bis zur Landschaft verfolgen, darauf das Neon-Raster
  float t = .2;
  bool hit = false;
  vec3 p = ro;
  for (int i = 0; i < 90; i++) {
    p = ro + rd * t;
    float dh = p.y - hgt(p.xz);
    if (dh < .0015 * t) { hit = true; break; }
    t += max(dh * .42, .008 * t + .004);
    if (t > 80.) break;
  }
  if (hit) {
    vec2 w = p.xz;
    vec2 fw = max(fwidth(w), vec2(1e-4));
    float lx = smoothstep(fw.x * 1.6, fw.x * .3, near(w.x * .75) / .75);
    float lz = smoothstep(fw.y * 1.6, fw.y * .3, near(w.y * .75) / .75);
    float line = max(lx, lz);
    float fade = exp(-t * .03);
    float wave = exp(-abs(w.y - uWave) * 1.2) * 1.2;
    float h = hgt(w);
    vec3 ground = uSky * .04 + uGrid * line * (.5 + .45 * uPulse + wave) * fade;
    ground += uRim * smoothstep(.6, 2.2, h) * line * .5 * fade;            // Bergkämme heller
    ground += uGrid * exp(-t * .5) * .02;
    col = mix(ground, uSky * .55 + uSunA * .05, smoothstep(25., 80., t));    // Dunst am Horizont
  }
  o = vec4(col, 1.);
}`),Xe=[{grid:[1,.08,.75],rim:[.1,.85,1],sunA:[1,.12,.45],sunB:[1,.85,.2],sky:[.35,.03,.28]},{grid:[.05,.85,1],rim:[.9,.3,1],sunA:[1,.35,.1],sunB:[1,.9,.35],sky:[.12,.03,.35]},{grid:[1,.35,.05],rim:[1,.85,.3],sunA:[.9,.08,.2],sunB:[1,.75,.3],sky:[.05,.05,.3]},{grid:[.2,1,.45],rim:[.2,.8,1],sunA:[.1,.6,1],sunB:[.75,1,.9],sky:[.02,.12,.2]}];function bn(e,t){let a=0,n=0,s=-99,o=0,r=0,i=0,c=.35,u=0,f=0,l=1;const m=Le({beats:64,minSec:45,maxSec:100}),p=(v,w,E)=>v.map((T,P)=>T+(w[P]-T)*E);return je(e,t,xn,{look:{linear:!0,bloom:.65,scale:1},keys:{p:()=>(f=u,u=(u+1)%Xe.length,l=0,m.reset(),"Farben gewechselt")},help:"P Farben",before(v){n+=v.dt;const w=v.conf>.4?v.bpm/60:1.2;a+=v.dt*w*1.1*(v.playing?1:.2),v.events.kick!==o&&(o=v.events.kick,s=a+1.5),s+=v.dt*9,v.events.onset!==r&&(r=v.events.onset,i<=0&&Math.random()<.06&&(i=.001,c=.25+Math.random()*.2)),i>0&&(i=i+v.dt*.9>1?0:i+v.dt*.9),m.tick(v,v.dt)&&(f=u,u=(u+1+Math.floor(Math.random()*(Xe.length-1)))%Xe.length,l=0),l=Math.min(1,l+v.dt/4)},setup(v,w){e.uniform1f(v.u.uMove,a),e.uniform1f(v.u.uSun,w.pulse),e.uniform1f(v.u.uSway,Math.sin(n*.09)*.7),e.uniform1f(v.u.uWave,s),e.uniform1f(v.u.uShoot,i),e.uniform1f(v.u.uShootY,c);const E=Xe[f],T=Xe[u],P=l*l*(3-2*l);for(const[A,q]of[["uGrid","grid"],["uRim","rim"],["uSunA","sunA"],["uSunB","sunB"],["uSky","sky"]])e.uniform3fv(v.u[A],p(E[q],T[q],P))}})}const wn=ee(`
uniform vec3 uDir[32];
void main(){
  float lon = (uv.x * 2. - 1.) * 3.1415927, lat = (uv.y - .5) * 3.1415927;
  vec3 n = vec3(cos(lat) * cos(lon), sin(lat), cos(lat) * sin(lon));
  float s = 0.;
  for (int k = 0; k < 32; k++) {
    float d = max(dot(n, uDir[k]), 0.);
    s = max(s, pow(d, 90.) * texelFetch(uAudio, ivec2(k, 0), 0).r);
  }
  o = vec4(s, 0., 0., 1.);
}`),Mn=ee(`
uniform sampler2D uSpk, uEnv;
uniform mat3 uRotM;
uniform float uR, uHasEnv, uEnvRot;
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
float spikes(vec3 n){
  return texture(uSpk, vec2(atan(n.z, n.x) / 6.2831853 + .5, asin(clamp(n.y, -1., 1.)) / 3.1415927 + .5)).r;
}
float sdf(vec3 p){
  p = uRotM * p;
  float l = length(p);
  vec3 n = p / max(l, 1e-4);
  return l - uR - spikes(n) * .72 - .03 * noise3(p * 3. + uT * .3);
}
vec3 env(vec3 d){
  // dunkles Studio: Leiste oben, zwei senkrechte hinten, weiche Fläche oben
  float top = smoothstep(.02, 0., abs(d.y - .55)) * smoothstep(.9, .3, abs(d.x));
  float side = smoothstep(.04, 0., abs(abs(atan(d.x, d.z)) - 2.3)) * smoothstep(-.2, .2, d.y);
  float soft = smoothstep(.75, .98, d.y);
  return vec3(1.) * (top * 2.5 + side * 1.8 + soft * .6) + pal(.6) * .03;
}
void main(){
  vec2 q = (uv - .5) * vec2(uAspect, 1.);
  vec3 ro = vec3(0., 0., -5.4), rd = normalize(vec3(q, 1.75));
  vec3 col = vec3(.006, .006, .01) + pal(.7) * .02 * (1. - length(q));
  // nur innerhalb der Hüllkugel suchen; kleine Schritte, weil die Stacheln steil sind (sonst Löcher)
  float Rb = uR + .95;
  float bb = dot(ro, rd), cc = dot(ro, ro) - Rb * Rb, hh = bb * bb - cc;
  if (hh > 0.) {
    float t = -bb - sqrt(hh), t1 = -bb + sqrt(hh);
    bool hit = false;
    for (int i = 0; i < 220; i++) {
      float d = sdf(ro + rd * t);
      if (d < .0006 * t) { hit = true; break; }
      t += max(d * .3, .0015);
      if (t > t1) break;
    }
    if (hit) {
      vec3 p = ro + rd * t;
      vec2 e = vec2(.0025, 0.);
      vec3 n = normalize(vec3(sdf(p + e.xyy) - sdf(p - e.xyy), sdf(p + e.yxy) - sdf(p - e.yxy), sdf(p + e.yyx) - sdf(p - e.yyx)));
      vec3 r = reflect(rd, n);
      float fr = .04 + .96 * pow(1. - max(dot(n, -rd), 0.), 5.);
      col = (uHasEnv > .5 ? envTex(r) * .4 : env(r)) * (.05 + .95 * fr) * vec3(.9, .92, 1.) + pal(.15 + uCen) * pow(max(dot(r, normalize(vec3(-.6, .4, -1.))), 0.), 40.) * (.3 + uPulse);
    }
  }
  o = vec4(col, 1.);
}`);function yn(e,t){const a=[];for(let u=0;u<32;u++){const f=1-2*(u+.5)/32,l=Math.sqrt(1-f*f),m=u*2.39996323;a.push(Math.cos(m)*l,f,Math.sin(m)*l)}const n=J(e,wn),s=Ze(e,[{name:"studio_rgbe.png",srgb:!1,mip:!1,nearest:!0}]),o=ie(e,512,256,t);e.bindTexture(e.TEXTURE_2D,o.tex),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.REPEAT);let r=0;const i=je(e,t,Mn,{look:{linear:!0,bloom:.5,scale:1},before(u,f){r+=u.dt*(.15+.15*Math.min(2,u.midAtt)),e.bindFramebuffer(e.FRAMEBUFFER,o.fb),e.viewport(0,0,o.w,o.h),e.useProgram(n.p),Me(e,n,u,f),e.uniform3fv(n.u.uDir,a),e.bindVertexArray(f.quadVao),e.drawArrays(e.TRIANGLES,0,3)},setup(u,f){const l=r,m=r*.7,p=Math.cos(l),v=Math.sin(l),w=Math.cos(m),E=Math.sin(m);e.uniformMatrix3fv(u.u.uRotM,!1,new Float32Array([p,v*E,-v*w,0,w,E,v,-p*E,p*w])),e.uniform1f(u.u.uR,.9+.08*Math.min(2,f.bassAtt)),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,o.tex),e.uniform1i(u.u.uSpk,0);const T=s.get();e.uniform1f(u.u.uHasEnv,T?1:0),e.uniform1f(u.u.uEnvRot,.5),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,T?T[0]:null),e.uniform1i(u.u.uEnv,1),e.activeTexture(e.TEXTURE0)}}),c=i.dispose;return i.dispose=()=>{c(),o.dispose(),s.release(),e.deleteProgram(n.p)},i}const Tn=ee(`
uniform sampler2D uBase, uLight, uWater;
uniform float uHas, uFlow, uGlow;
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
    float base = yAt(.66 + fi * .07) + .07 * gnoise(vec2(x * .8 + uFlow * .06 * (1. + fi * .3), fi * 5.)) + .025 * sin(x * 2.6 + uFlow * .15 + fi);
    float h = q.y - base;
    if (h < -.03) continue;
    float seg = smoothstep(-.12, .45, gnoise(vec2(x * .55 + uFlow * .025, fi * 7.3)));
    float r1 = .5 + .5 * gnoise(vec2(x * 26. + uFlow * .45, fi * 3.));
    float r2 = .5 + .5 * gnoise(vec2(x * 75. - uFlow * .3, fi * 9.));
    float rays = r1 * (.6 + .4 * r2);
    float edge = smoothstep(-.02, .006, h);
    float fall = exp(-max(h, 0.) * (15. - 10. * rays));
    float rim = exp(-abs(h) * 90.) * .5;
    float e = band(.08 + fi * .22);
    float k = (edge * fall * (.3 + .7 * rays) + rim) * seg * (.16 + .8 * e * e) * (1. + uGlow);
    col += mix(uAurA, uAurB, smoothstep(0., .22, h)) * k * (.65 - fi * .1);
  }
  return col;
}
vec3 sky(vec2 q){
  float y = (q.y - yAt(.38)) / (uRect.w * .62);
  vec3 c = mix(vec3(.012, .02, .05), vec3(.002, .003, .01), smoothstep(0., 1., y));
  c += vec3(.75, .8, 1.) * stars(q) * .55;
  c += aurora(q);
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
      float ys = yAt(.38);
      float d = ys - q.y;
      vec2 rq = vec2(q.x + sin(q.y * 140. + uT * 1.3) * .0012 * (1. + d * 8.) + gnoise(vec2(q.x * 9., q.y * 70. - uT)) * .002, ys + d);
      land += sky(rq) * (.55 - .35 * clamp(d / (uRect.w * .38), 0., 1.)) * water;
    }
    // Bergkämme im Gegenlicht, in der Farbe des Polarlichts
    land += texture(uLight, t).rgb * mix(uAurA, uAurB, .35) * (.25 + .9 * uGlow + .5 * band(.2));
    col = mix(col, land, b.a);
  } else {
    col = mix(col, vec3(.004, .005, .008), step(q.y, yAt(.4)));
  }
  o = vec4(col, 1.);
}`),le=[{name:"Grün",a:[.12,1,.45],b:[.45,.2,1]},{name:"Violett",a:[.55,.25,1],b:[1,.25,.6]},{name:"Rot-Grün",a:[.2,1,.4],b:[1,.15,.15]},{name:"Eisblau",a:[.2,.85,1],b:[.35,.3,1]}];function kn(e,t){const a=Ze(e,[{name:"bergsee_basis.webp"},{name:"bergsee_licht.webp"},{name:"bergsee_wasser.webp",srgb:!1}]);let n=0,s=0,o=0,r=0,i=0,c=1,u=null,f=null;const l=Le({beats:64,minSec:45,maxSec:110}),m=(w,E,T)=>w.map((P,A)=>P+(E[A]-P)*T),p=je(e,t,Tn,{look:{linear:!0,bloom:.55,scale:1},keys:{p:()=>(i=r,r=(r+1)%le.length,c=0,l.reset(),`Farben: ${le[r].name}`)},help:"P Farben",info:()=>`${le[r].name} (P)`,before(w,E){if(f=a.get(),u!==E.seed){u=E.seed;const T=Math.floor(E.seed*37)%le.length;T!==r&&(i=r,r=T,c=0)}n+=w.dt*(.35+.9*Math.min(2,w.midAtt))*(w.playing?1:.2),w.events.kick!==o&&(o=w.events.kick,s=Math.min(1.2,s+.6)),s*=Math.exp(-w.dt*2.2),l.tick(w,w.dt)&&(i=r,r=(r+1+Math.floor(Math.random()*(le.length-1)))%le.length,c=0),c=Math.min(1,c+w.dt/5)},setup(w,E,T){const P=1.7777777777777777,A=Math.max(T.aspect,P),q=A/P;e.uniform4f(w.u.uRect,-A/2,-q/2,A,q),e.uniform1f(w.u.uFlow,n),e.uniform1f(w.u.uGlow,s),e.uniform1f(w.u.uPx,1/T.h);const h=c*c*(3-2*c);e.uniform3fv(w.u.uAurA,m(le[i].a,le[r].a,h)),e.uniform3fv(w.u.uAurB,m(le[i].b,le[r].b,h)),e.uniform1f(w.u.uHas,f?1:0),["uBase","uLight","uWater"].forEach((d,F)=>{w.u[d]!=null&&(e.activeTexture(e.TEXTURE0+F),e.bindTexture(e.TEXTURE_2D,f?f[F]:null),e.uniform1i(w.u[d],F))}),e.activeTexture(e.TEXTURE0)}}),v=p.dispose;return p.dispose=()=>{v(),a.release()},p}const En=ee(`
uniform sampler2D uVel, uSrc; uniform vec2 uTexel; uniform float uStep, uDiss;
void main(){
  vec2 p = uv - uStep * texture(uVel, uv).xy * uTexel;
  o = vec4(texture(uSrc, p).rgb / (1. + uDiss * uStep), 1.);
}`),Rn=ee(`
uniform sampler2D uSrc; uniform vec2 uPoint; uniform vec3 uVal; uniform float uRad;
void main(){
  vec2 d = uv - uPoint; d.x *= uAspect;
  o = vec4(texture(uSrc, uv).rgb + uVal * exp(-dot(d, d) / uRad), 1.);
}`),Sn=ee(`
uniform sampler2D uVel; uniform vec2 uTexel;
void main(){
  float L = texture(uVel, uv - vec2(uTexel.x, 0.)).y, R = texture(uVel, uv + vec2(uTexel.x, 0.)).y;
  float B = texture(uVel, uv - vec2(0., uTexel.y)).x, T = texture(uVel, uv + vec2(0., uTexel.y)).x;
  o = vec4(.5 * (R - L - T + B), 0., 0., 1.);
}`),Pn=ee(`
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
}`),An=ee(`
uniform sampler2D uVel; uniform vec2 uTexel;
void main(){
  vec2 c = texture(uVel, uv).xy;
  float L = texture(uVel, uv - vec2(uTexel.x, 0.)).x, R = texture(uVel, uv + vec2(uTexel.x, 0.)).x;
  float B = texture(uVel, uv - vec2(0., uTexel.y)).y, T = texture(uVel, uv + vec2(0., uTexel.y)).y;
  if (uv.x - uTexel.x < 0.) L = -c.x; if (uv.x + uTexel.x > 1.) R = -c.x;
  if (uv.y - uTexel.y < 0.) B = -c.y; if (uv.y + uTexel.y > 1.) T = -c.y;
  o = vec4(.5 * (R - L + T - B), 0., 0., 1.);
}`),Fn=ee(`
uniform sampler2D uSrc; uniform float uK;
void main(){ o = vec4(texture(uSrc, uv).rgb * uK, 1.); }`),Dn=ee(`
uniform sampler2D uP, uDiv; uniform vec2 uTexel;
void main(){
  float L = texture(uP, uv - vec2(uTexel.x, 0.)).x, R = texture(uP, uv + vec2(uTexel.x, 0.)).x;
  float B = texture(uP, uv - vec2(0., uTexel.y)).x, T = texture(uP, uv + vec2(0., uTexel.y)).x;
  o = vec4((L + R + B + T - texture(uDiv, uv).x) * .25, 0., 0., 1.);
}`),Bn=ee(`
uniform sampler2D uP, uVel; uniform vec2 uTexel;
void main(){
  float L = texture(uP, uv - vec2(uTexel.x, 0.)).x, R = texture(uP, uv + vec2(uTexel.x, 0.)).x;
  float B = texture(uP, uv - vec2(0., uTexel.y)).x, T = texture(uP, uv + vec2(0., uTexel.y)).x;
  o = vec4(texture(uVel, uv).xy - vec2(R - L, T - B), 0., 1.);
}`),Ln=ee(`
uniform sampler2D uDye;
void main(){
  vec3 c = texture(uDye, uv).rgb;
  // leichte Tiefe: Kanten etwas heller (Licht von oben links)
  vec2 e = vec2(1.5) / uRes;
  float hx = length(texture(uDye, uv + vec2(e.x, 0.)).rgb) - length(texture(uDye, uv - vec2(e.x, 0.)).rgb);
  float hy = length(texture(uDye, uv + vec2(0., e.y)).rgb) - length(texture(uDye, uv - vec2(0., e.y)).rgb);
  float shade = clamp(1. + (hy - hx) * 1.5, .6, 1.5);
  // sanft begrenzen: viel Farbe wird satt, aber nie weiss und grell
  c = (1. - exp(-c * 1.6)) * .55;
  o = vec4(c * shade, 1.);
}`);function _n(e,t){const a={advect:J(e,En),splat:J(e,Rn),curl:J(e,Sn),vort:J(e,Pn),div:J(e,An),scale:J(e,Fn),pres:J(e,Dn),grad:J(e,Bn),show:J(e,Ln)};let n=null,s=null,o=null,r=1,i=0,c=0;const u=(v,w)=>[ie(e,v,w,t),ie(e,v,w,t)],f=v=>v.reverse();let l=null;const m=(v,w,E)=>{e.bindFramebuffer(e.FRAMEBUFFER,w.fb),e.viewport(0,0,w.w,w.h),e.useProgram(v.p),E(v),e.bindVertexArray(l),e.drawArrays(e.TRIANGLES,0,3)},p=(v,w,E,T,P,A)=>{m(a.splat,n.vel[1],q=>{Z(e,q,"uSrc",n.vel[0].tex,0),e.uniform2f(q.u.uPoint,v,w),e.uniform3f(q.u.uVal,E,T,0),e.uniform1f(q.u.uRad,A),e.uniform1f(q.u.uAspect,r)}),f(n.vel),m(a.splat,s[1],q=>{Z(e,q,"uSrc",s[0].tex,0),e.uniform2f(q.u.uPoint,v,w),e.uniform3fv(q.u.uVal,P),e.uniform1f(q.u.uRad,A),e.uniform1f(q.u.uAspect,r)}),f(s)};return{look:{linear:!0,bloom:.18,scale:1,expo:.9},resize(v,w){for(const P of[...n?[...n.vel,...n.prs,n.div,n.curl]:[],...s||[],...o?[o]:[]])P.dispose();r=v/w;const E=160,T=Math.round(E*r);n={vel:u(T,E),prs:u(T,E),div:ie(e,T,E,t),curl:ie(e,T,E,t),w:T,h:E},s=u(v,w),o=ie(e,v,w,t)},render(v,w){l=w.quadVao;const E=Math.min(1/30,v.dt);i+=E,e.disable(e.BLEND);const T=[1/n.w,1/n.h],P=w.palette,A=(h,d)=>[P[h*3]*d,P[h*3+1]*d,P[h*3+2]*d],q=[[0,6],[6,14],[14,22],[22,32]];for(let h=0;h<4;h++){let d=0;for(let O=q[h][0];O<q[h][1];O++)d+=v.bands[O];if(d/=q[h][1]-q[h][0],!v.playing||d<.25)continue;const F=i*(.15+h*.04)+h*Math.PI/2,z=.5+Math.cos(F)*.3,x=.5+Math.sin(F*1.3)*.28,k=F+Math.PI/2,D=400*d*d;p(z,x,Math.cos(k)*D,Math.sin(k)*D,A(h,.012+.06*d*d),.0012+.002*d)}if(v.events.kick!==c){c=v.events.kick;const h=Math.random()*Math.PI*2,d=.5+Math.cos(h)*.35,F=.5+Math.sin(h)*.35;p(d,F,-Math.cos(h)*2200,-Math.sin(h)*2200,A(Math.floor(Math.random()*5),.3),.004)}m(a.curl,n.curl,h=>{Z(e,h,"uVel",n.vel[0].tex,0),e.uniform2fv(h.u.uTexel,T)}),m(a.vort,n.vel[1],h=>{Z(e,h,"uVel",n.vel[0].tex,0),Z(e,h,"uCurl",n.curl.tex,1),e.uniform2fv(h.u.uTexel,T),e.uniform1f(h.u.uStep,E),e.uniform1f(h.u.uStr,18+14*Math.min(2,v.midAtt))}),f(n.vel),m(a.div,n.div,h=>{Z(e,h,"uVel",n.vel[0].tex,0),e.uniform2fv(h.u.uTexel,T)}),m(a.scale,n.prs[1],h=>{Z(e,h,"uSrc",n.prs[0].tex,0),e.uniform1f(h.u.uK,.8)}),f(n.prs);for(let h=0;h<20;h++)m(a.pres,n.prs[1],d=>{Z(e,d,"uP",n.prs[0].tex,0),Z(e,d,"uDiv",n.div.tex,1),e.uniform2fv(d.u.uTexel,T)}),f(n.prs);return m(a.grad,n.vel[1],h=>{Z(e,h,"uP",n.prs[0].tex,0),Z(e,h,"uVel",n.vel[0].tex,1),e.uniform2fv(h.u.uTexel,T)}),f(n.vel),m(a.advect,n.vel[1],h=>{Z(e,h,"uVel",n.vel[0].tex,0),Z(e,h,"uSrc",n.vel[0].tex,1),e.uniform2fv(h.u.uTexel,T),e.uniform1f(h.u.uStep,E),e.uniform1f(h.u.uDiss,.25)}),f(n.vel),m(a.advect,s[1],h=>{Z(e,h,"uVel",n.vel[0].tex,0),Z(e,h,"uSrc",s[0].tex,1),e.uniform2fv(h.u.uTexel,T),e.uniform1f(h.u.uStep,E),e.uniform1f(h.u.uDiss,.9)}),f(s),m(a.show,o,h=>{Z(e,h,"uDye",s[0].tex,0),e.uniform2f(h.u.uRes,o.w,o.h)}),o.tex},dispose(){for(const v of[...n.vel,...n.prs,n.div,n.curl,...s,o])v.dispose();for(const v of Object.values(a))e.deleteProgram(v.p)}}}const ke=[{id:"klassik",name:"Klassik",make:Zt},{id:"magnet",name:"Magnetfeld",make:nn},{id:"neon",name:"Neon",make:cn},{id:"sphaere",name:"Punktsphäre",make:hn},{id:"welle",name:"Punktwelle",make:dn},{id:"tunnel",name:"Tunnelflug",make:vn},{id:"tinte",name:"Tinte",make:_n},{id:"polarlicht",name:"Polarlicht",make:kn},{id:"synthwave",name:"Synthwave",make:bn},{id:"ferrofluid",name:"Ferrofluid",make:yn}],zn=ee(`
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
}`),qn=ee(`
uniform sampler2D uSrc; uniform vec2 uPx;
vec3 s(vec2 d){ return texture(uSrc, uv + d * uPx).rgb; }
void main(){
  vec3 c = s(vec2(-1, -1)) + 2. * s(vec2(0, -1)) + s(vec2(1, -1))
         + 2. * s(vec2(-1, 0)) + 4. * s(vec2(0, 0)) + 2. * s(vec2(1, 0))
         + s(vec2(-1, 1)) + 2. * s(vec2(0, 1)) + s(vec2(1, 1));
  o = vec4(c / 16., 1.);
}`),gn=ee(`
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
}`);function Nn(e){const t=e.getContext("webgl2",{antialias:!1,alpha:!1,preserveDrawingBuffer:!1,powerPreference:"high-performance"});if(!t)throw new Error("WebGL 2 fehlt");const a=!!t.getExtension("EXT_color_buffer_float")||!!t.getExtension("EXT_color_buffer_half_float"),n=t.createBuffer(),s=t.createVertexArray();t.bindVertexArray(s),t.bindBuffer(t.ARRAY_BUFFER,n),t.bufferData(t.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),t.STATIC_DRAW),t.enableVertexAttribArray(0),t.vertexAttribPointer(0,2,t.FLOAT,!1,0,0);const o=J(t,zn),r=J(t,qn),i=J(t,gn),c=t.createTexture(),u=new Float32Array(512*2);t.bindTexture(t.TEXTURE_2D,c),t.texImage2D(t.TEXTURE_2D,0,t.R32F,512,2,0,t.RED,t.FLOAT,u),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.NEAREST);const f=t.createTexture();t.bindTexture(t.TEXTURE_2D,f),t.texImage2D(t.TEXTURE_2D,0,t.R32F,fe,128,0,t.RED,t.FLOAT,new Float32Array(fe*128)),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.NEAREST);let l=0,m=0;const p=new Float32Array(fe),v=ke.map(y=>y.make(t,a));let w=0,E=0,T=1,P=[];const A={seed:.3,aspect:1,histRow:0,w:1,h:1,palette:new Float32Array(15),audioTex:c,histTex:f,quadVao:s,cover:null,coverPixels:null,coverCanvas:null,title:"",artist:""},q=y=>[Math.max(32,Math.round(w*(y.look.scale||1))),Math.max(32,Math.round(E*(y.look.scale||1)))],h=()=>{const y=Math.min(window.devicePixelRatio||1,2);e.width=Math.round(e.clientWidth*y)||1,e.height=Math.round(e.clientHeight*y)||1,w=Math.max(64,Math.round(e.width*T)),E=Math.max(64,Math.round(e.height*T)),A.aspect=w/E,t.bindVertexArray(s),t.disable(t.BLEND);for(const b of v)b.resize(...q(b));for(const b of P)b.dispose();P=[];let C=w,W=E;for(let b=0;b<6;b++)C=Math.max(4,C>>1),W=Math.max(4,W>>1),P.push(ie(t,C,W,a))};h();let d=0,F=-1,z=0,x=16,k=performance.now(),D=60;const O=y=>{y!==d&&(F=d,d=y,z=1e-4)},G=(y,C)=>{const W=v[y],[b,g]=q(W);return A.w=b,A.h=g,t.bindVertexArray(s),t.disable(t.BLEND),W.render(C,A)};return{gl:t,frame:(y,C)=>{t.bindVertexArray(s),t.disable(t.BLEND);for(let K=0;K<fe;K++)u[K]=y.bands[K];if(u.set(y.wave,512),t.bindTexture(t.TEXTURE_2D,c),t.texSubImage2D(t.TEXTURE_2D,0,0,0,512,2,t.RED,t.FLOAT,u),m+=y.dt,m>=1/32){m%=1/32,l=(l+1)%128;for(let K=0;K<fe;K++)p[K]=y.bands[K]*(y.playing?1:0);t.bindTexture(t.TEXTURE_2D,f),t.texSubImage2D(t.TEXTURE_2D,0,0,l,fe,1,t.RED,t.FLOAT,p)}A.histRow=l;const W=G(d,y);let b=null;const g=F;g>=0&&(b=G(g,y),z=Math.min(1,z+y.dt/2.5)),t.bindVertexArray(s),t.disable(t.BLEND);let N=W,[I,B]=q(v[d]);t.useProgram(o.p);for(let K=0;K<P.length;K++){const X=P[K];t.bindFramebuffer(t.FRAMEBUFFER,X.fb),t.viewport(0,0,X.w,X.h),Z(t,o,"uSrc",N,0),t.uniform2f(o.u.uPx,1/I,1/B),t.uniform1f(o.u.uThresh,K===0?.3:0),t.drawArrays(t.TRIANGLES,0,3),N=X.tex,I=X.w,B=X.h}t.useProgram(r.p),t.enable(t.BLEND),t.blendFunc(t.ONE,t.ONE);for(let K=P.length-2;K>=0;K--){const X=P[K],$=P[K+1];t.bindFramebuffer(t.FRAMEBUFFER,X.fb),t.viewport(0,0,X.w,X.h),Z(t,r,"uSrc",$.tex,0),t.uniform2f(r.u.uPx,1/$.w,1/$.h),t.drawArrays(t.TRIANGLES,0,3)}t.disable(t.BLEND),t.blendFunc(t.ONE,t.ZERO);const M=v[d].look,R=b?v[g].look:M,L=b?z:1,H=(K,X)=>(R[K]??X)+((M[K]??X)-(R[K]??X))*L;t.bindFramebuffer(t.FRAMEBUFFER,null),t.viewport(0,0,e.width,e.height),t.useProgram(i.p),Me(t,i,y,A),Z(t,i,"uA",b||W,0),Z(t,i,"uB",W,1),Z(t,i,"uBloom",P[0].tex,2),t.uniform1f(i.u.uMix,b?z:0),t.uniform1f(i.u.uExpo,H("expo",1.1)),t.uniform1f(i.u.uBloomAmt,H("bloom",.5)),t.uniform1f(i.u.uTone,H("linear",1)),t.uniform1f(i.u.uVig,H("vignette",.45)),t.uniform1f(i.u.uFlashAmt,Math.min(.12,y.flash*.1)),t.drawArrays(t.TRIANGLES,0,3),b&&z>=1&&(F=-1,z=0),x+=(C-x)*.05,D=1e3/Math.max(1,x);const Q=performance.now();x>22&&T>.5&&Q-k>5e3?(T=Math.max(.5,Math.round((T-.1)*10)/10),k=Q,h()):x<18&&T<1&&Q-k>2e4&&(T=Math.min(1,Math.round((T+.1)*10)/10),k=Q,h())},resize:h,setScene:O,get scene(){return d},get fps(){return D},get scale(){return T},current:()=>v[d],setLook(y){for(const C of["palette","seed","title","artist"])y[C]!=null&&(A[C]=y[C]);y.cover!==void 0&&(A.cover=y.cover,A.coverPixels=y.coverPixels||null,A.coverCanvas=y.coverCanvas||null)},dispose(){const y=t.getExtension("WEBGL_lose_context");for(const C of v)C.dispose();for(const C of P)C.dispose();for(const C of[o,r,i])t.deleteProgram(C.p);y&&y.loseContext()}}}const rt=e=>e<=.04045?e/12.92:Math.pow((e+.055)/1.055,2.4);function In([e,t,a]){const n=Math.cbrt(.4122214708*e+.5363325363*t+.0514459929*a),s=Math.cbrt(.2119034982*e+.6806995451*t+.1073969566*a),o=Math.cbrt(.0883024619*e+.2817188376*t+.6299787005*a);return[.2104542553*n+.793617785*s-.0040720468*o,1.9779984951*n-2.428592205*s+.4505937099*o,.0259040371*n+.7827717662*s-.808675766*o]}function Cn([e,t,a]){const n=(e+.3963377774*t+.2158037573*a)**3,s=(e-.1055613458*t-.0638541728*a)**3,o=(e-.0894841775*t-1.291485548*a)**3;return[4.0767416621*n-3.3077115913*s+.2309699292*o,-1.2684380046*n+2.6097574011*s-.3413193965*o,-.0041960863*n-.7034186147*s+1.707614701*o].map(r=>Math.max(0,Math.min(1,r)))}const it=new Float32Array([.25,.12,.9,.55,.15,.85,.1,.5,.95,.15,.85,.6,.95,.35,.45]);function yt(e){let t=2166136261;for(const a of String(e||"x"))t=Math.imul(t^a.charCodeAt(0),16777619);return(t>>>0)%1e5/1e5}function Un(e){return new Promise(t=>{if(!e)return t(null);const a=new Image;a.crossOrigin="anonymous",a.onload=()=>{try{const n=document.createElement("canvas");n.width=n.height=120;const s=n.getContext("2d",{willReadFrequently:!0});s.drawImage(a,0,0,120,120);const o=s.getImageData(0,0,120,120).data,r=document.createElement("canvas");r.width=r.height=512,r.getContext("2d").drawImage(a,0,0,512,512),t({pixels:o,palette:Vn(o),canvas:r})}catch{t(null)}},a.onerror=()=>t(null),a.src=e})}function Vn(e){const t=[];for(let r=0;r<e.length;r+=16)t.push(In([rt(e[r]/255),rt(e[r+1]/255),rt(e[r+2]/255)]));const a=5,n=[t[Math.floor(t.length/2)]];for(;n.length<a;){let r=null,i=-1;for(const c of t){let u=1/0;for(const f of n)u=Math.min(u,(c[0]-f[0])**2+(c[1]-f[1])**2+(c[2]-f[2])**2);u>i&&(i=u,r=c)}n.push(r)}const s=new Array(a).fill(0);for(let r=0;r<8;r++){const i=n.map(()=>[0,0,0]);s.fill(0);for(const c of t){let u=0,f=1/0;for(let l=0;l<a;l++){const m=n[l],p=(c[0]-m[0])**2+(c[1]-m[1])**2+(c[2]-m[2])**2;p<f&&(f=p,u=l)}s[u]++,i[u][0]+=c[0],i[u][1]+=c[1],i[u][2]+=c[2]}for(let c=0;c<a;c++)s[c]&&(n[c]=i[c].map(u=>u/s[c]))}const o=n.map(([r,i,c],u)=>{let f=Math.hypot(i,c),l=Math.atan2(c,i);f<.03&&(l=4.2+u*.5),f=Math.max(.09,Math.min(.2,f*1.25));const m=Math.max(.62,Math.min(.85,r*.6+.4));return{h:l,rgb:Cn([m,f*Math.cos(l),f*Math.sin(l)])}});return o.sort((r,i)=>r.h-i.h),new Float32Array(o.flatMap(r=>r.rgb))}const Be={get(e,t){try{const a=localStorage.getItem("viz."+e);return a==null?t:JSON.parse(a)}catch{return t}},set(e,t){try{localStorage.setItem("viz."+e,JSON.stringify(t))}catch{}}};function Kn({track:e,onClose:t}){const a=se.useRef(null),n=se.useRef(null),s=se.useRef(null),[o,r]=se.useState(!0),[i,c]=se.useState(()=>Math.min(ke.length-1,Math.max(0,Be.get("scene",0)))),[u,f]=se.useState(()=>!!Be.get("calm",!1)),[l,m]=se.useState(()=>!!Be.get("auto",!1)),[p,v]=se.useState(!1),[w,E]=se.useState(""),[T,P]=se.useState(""),[A,q]=se.useState(null),h=se.useRef(u),d=se.useRef(l);h.current=u,d.current=l;const F=x=>{const k=n.current;if(!k)return;const D=(x%ke.length+ke.length)%ke.length;k.setScene(D),c(D),Be.set("scene",D),r(!0);const O=k.current().needs;E(O||"")};se.useEffect(()=>{const x=n.current;if(!x)return;x.setLook({seed:yt(e&&e.id),palette:it,cover:null,title:e&&e.title||"",artist:e&&e.artist||""});let k=!1;return Un(e&&e.albumId?zt(e.albumId,640):null).then(D=>{k||!n.current||n.current.setLook({palette:D?D.palette:it,cover:e&&e.albumId||null,coverPixels:D?D.pixels:null,coverCanvas:D?D.canvas:null})}),()=>{k=!0}},[e&&e.id,e&&e.albumId,!!n.current]),se.useEffect(()=>{r(!0);let x=setTimeout(()=>r(!1),5e3);const k=()=>{r(!0),clearTimeout(x),x=setTimeout(()=>r(!1),2500)};return window.addEventListener("pointermove",k),()=>{clearTimeout(x),window.removeEventListener("pointermove",k)}},[e&&e.id,i,u,l,w]),se.useEffect(()=>{const x=k=>{const D=k.key.toLowerCase(),O=n.current;if(D==="escape"||D==="v"&&!k.ctrlKey&&!k.metaKey||D==="t"&&(k.ctrlKey||k.metaKey))t();else if(D==="arrowright"||D==="n")F((O?O.scene:0)+1);else if(D==="arrowleft")F((O?O.scene:0)-1);else if(/^[0-9]$/.test(D)&&(Number(D)||10)<=ke.length)F((Number(D)||10)-1);else if(D==="r")f(G=>(Be.set("calm",!G),!G));else if(D==="a")m(G=>(Be.set("auto",!G),!G));else if(D==="d")v(G=>!G);else if(O&&O.current().keys&&O.current().keys[D])E(O.current().keys[D]()||"");else return;k.preventDefault(),k.stopPropagation()};return window.addEventListener("keydown",x,!0),()=>window.removeEventListener("keydown",x,!0)},[t]),se.useEffect(()=>{let x;try{x=Nn(a.current)}catch(B){console.error(B),P(String(B&&B.message||B).split(`
`)[0]);return}n.current=x;const k=Nt();s.current=k;let D=0,O=0;const G=gt(B=>{D++,O+=(B.frames||[]).length,k.push(B)});x.setLook({seed:yt(e&&e.id),palette:it,title:e&&e.title||"",artist:e&&e.artist||""}),x.setScene(i),E(x.current().needs||"");let _=0,y=performance.now(),C=performance.now(),W=performance.now();const b=B=>{const M=B-y,R=Math.min(.1,M/1e3);y=B;const L=k.update(R);h.current&&(L.flash=0,L.kick*=.35,L.pulse*=.35),d.current&&L.playing&&(B-C)/1e3>180&&(L.conf<.4||L.phase<.08)&&(C=B,F(x.scene+1));try{x.frame(L,M)}catch(H){console.error(H)}if(B-W>500){const H=(B-W)/1e3;q({fps:x.fps,scale:x.scale,msg:D/H,frames:O/H,bpm:L.bpm,conf:L.conf,playing:L.playing,kicks:L.events.kick,int:L.intensity,bands:Array.from(L.bands),info:x.current().info?x.current().info():""}),D=0,O=0,W=B}_=requestAnimationFrame(b)};_=requestAnimationFrame(b);const g=()=>x.resize();window.addEventListener("resize",g);const N=B=>{B.preventDefault(),P("Die Grafikkarte hat den Visualizer beendet – bitte nochmals öffnen.")},I=a.current;return I.addEventListener("webglcontextlost",N),()=>{cancelAnimationFrame(_),window.removeEventListener("resize",g),I.removeEventListener("webglcontextlost",N),G(),x.dispose(),n.current=null}},[]);const z=n.current&&n.current.current().label==="center";return te.jsxs("div",{className:"fixed inset-0 z-[70] bg-black",onClick:t,style:{cursor:o?"default":"none"},children:[te.jsx("canvas",{ref:a,className:"absolute inset-0 h-full w-full"}),T&&te.jsxs("div",{className:"absolute inset-0 grid place-items-center p-8 text-center text-sm text-zinc-400",children:["Visualizer geht hier nicht: ",T]}),z&&e&&te.jsxs("div",{className:"pointer-events-none absolute inset-x-0 top-[66%] text-center",style:{textShadow:"0 0 18px rgba(0,0,0,.8)"},children:[te.jsx("div",{className:"truncate px-8 text-2xl font-bold text-white sm:text-3xl",children:e.artist}),te.jsx("div",{className:"mt-1 truncate px-8 text-base text-zinc-200 sm:text-lg",children:e.title})]}),te.jsxs("div",{className:"pointer-events-none absolute bottom-8 left-8 max-w-[80vw] transition-opacity duration-700 "+(o?"opacity-100":"opacity-0"),children:[e&&!z&&te.jsxs(te.Fragment,{children:[te.jsx("div",{className:"truncate text-2xl font-bold text-white drop-shadow-lg",children:e.title}),te.jsx("div",{className:"truncate text-lg text-zinc-300 drop-shadow",children:e.artist})]}),te.jsxs("div",{className:"mt-2 text-xs text-zinc-400 drop-shadow",children:[te.jsxs("span",{className:"text-zinc-100",children:[i+1," ",ke[i].name]}),A&&A.info?` · ${A.info}`:"",l?" · wechselt automatisch (A)":"",u?" · ruhig (R)":""]}),te.jsxs("div",{className:"mt-0.5 text-[11px] text-zinc-500 drop-shadow",children:["1–9, 0 / ← → Stil · ",n.current&&n.current.current().help||"M Muster · P Farben"," · A automatisch · R ruhig · D Diagnose · Esc schliessen"]}),w&&te.jsx("div",{className:"mt-1 text-xs text-amber-300 drop-shadow",children:w})]}),p&&A&&te.jsxs("div",{className:"pointer-events-none absolute right-4 top-4 w-72 rounded-xl bg-black/70 p-3 font-mono text-[11px] leading-5 text-zinc-300",children:[te.jsxs("div",{children:["Bild: ",A.fps.toFixed(0)," fps · Auflösung ",Math.round(A.scale*100)," %"]}),te.jsxs("div",{children:["Daten: ",A.msg.toFixed(0)," Pakete/s · ",A.frames.toFixed(0)," Frames/s ",A.playing?"":"· (keine Musik)"]}),te.jsxs("div",{children:["Tempo: ",A.bpm?`${A.bpm.toFixed(1)} BPM`:"–"," · sicher ",Math.round(A.conf*100)," % · Kicks ",A.kicks]}),te.jsxs("div",{children:["Spannung: ",Math.round(A.int*100)," %"]}),te.jsx("div",{className:"mt-1 flex h-10 items-end gap-px",children:A.bands.map((x,k)=>te.jsx("span",{className:"flex-1 bg-accent/80",style:{height:`${Math.min(100,x*80)}%`}},k))})]})]})}export{Kn as default};
