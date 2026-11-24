import{u as Bt,r as fe,c as Ot,j as se}from"./index-C9xHKkIP.js";const be=32,Ht=.07;function Wt(e){let t=!1,a=null;return(async()=>{for(;!t;){try{a=new AbortController;const s=await fetch(Bt("/api/player/viz",!0),{signal:a.signal,cache:"no-store"});if(!s.ok||!s.body)throw new Error(`Fehler ${s.status}`);const o=s.body.getReader(),i=new TextDecoder;let r="";for(;;){const{value:c,done:u}=await o.read();if(u||t)break;r+=i.decode(c,{stream:!0});let f;for(;(f=r.indexOf(`

`))>=0;){const l=r.slice(0,f);if(r=r.slice(f+2),l.startsWith("data: "))try{e(JSON.parse(l.slice(6)))}catch{}}}}catch{}t||await new Promise(s=>setTimeout(s,800))}})(),()=>{t=!0,a&&a.abort()}}function Gt(){const e=[];let t=null,a=new Float32Array(512),n={bpm:0,conf:0,beat0:0,int:0,playing:!1},s=0;const o={t:0,dt:0,playing:!1,bands:new Float32Array(be),db:new Float32Array(be),wave:new Float32Array(512),waveRaw:new Float32Array(512),beats:0,bass:1,mid:1,treb:1,bassAtt:1,midAtt:1,trebAtt:1,kick:0,onset:0,pulse:0,flash:0,phase:0,beatIndex:0,conf:0,bpm:0,intensity:0,rms:0,centroid:0,lowClock:0,midClock:0,highClock:0,events:{kick:0,onset:0}},i=[0,0,0],r=[0,0,0],c=[0,0,0];let u=0;const f=new Float32Array(be).fill(-90);let l=-90,d=-9,p=-9,M=-9,w=0,T=0,S=0,R=.05;const D=m=>{const E=performance.now()/1e3-m.now;t=t==null?E:Math.min(E,t+.002);for(const h of m.frames||[])(!e.length||h.at>e[e.length-1].at)&&e.push(h);for(;e.length>600;)e.shift();m.wave&&(a=Float32Array.from(m.wave)),n={bpm:m.bpm||0,conf:m.conf||0,beat0:m.beat0||0,int:m.int||0,playing:!!m.playing}},Y=(m,z)=>Math.pow(m,z*30);return{push:D,update:m=>{const z=performance.now()/1e3;o.dt=m,o.t+=m,o.playing=n.playing&&e.length>0;const E=t==null?0:z-t-Ht;let h=e.findIndex(v=>v.at>E),x=null;if(e.length){if(h===-1)x={f0:e[e.length-1],f1:e[e.length-1],k:0};else if(h===0)x={f0:e[0],f1:e[0],k:0};else{const v=e[h-1],L=e[h];x={f0:v,f1:L,k:Math.min(1,Math.max(0,(E-v.at)/Math.max(.001,L.at-v.at)))}}E-e[e.length-1].at>.5&&(x=null)}if(x){for(const v of e)if(!(v.at<=s)){if(v.at>E)break;v.k&&(o.events.kick++,d=o.t),v.on&&(o.events.onset++,p=o.t)}}const B=[];if(x)for(const v of e)v.at>s&&v.at<=E&&B.push(v);s=E;const V=(v,L,G)=>v+(L-v)*G;let C=-90;for(let v=0;v<be;v++){let L=-100;if(x){L=V(x.f0.b[v],x.f1.b[v],x.k);for(const G of B)L=Math.max(L,G.b[v])}o.db[v]=L,f[v]=L>f[v]?L:Math.max(-90,f[v]-5*m),C=Math.max(C,f[v])}l=C>l?C:Math.max(-90,l-5*m);for(let v=0;v<be;v++){const L=o.db[v],G=.6*f[v]+.4*l,F=Math.min(1,Math.max(0,(L+82)/12)),A=Math.min(1.15,Math.max(0,1+(L-G)/28))*F,J=A>o.bands[v]?1-Math.exp(-m*30):1-Math.exp(-m*8);o.bands[v]+=(A-o.bands[v])*J}for(let v=0;v<3;v++){let L=x?V(x.f0.bmt[v],x.f1.bmt[v],x.k):0;for(const J of B)L=Math.max(L,J.bmt[v]);i[v]=L;const G=i[v]>r[v],F=Y(G?.2:.5,m);r[v]=r[v]*F+i[v]*(1-F);const A=Y(u<50?.9:.992,m);c[v]=c[v]*A+i[v]*(1-A)}x&&(u+=m*30);const k=(v,L)=>c[L]>1e-5?Math.min(3,v/c[L]):0;if(o.bass=k(i[0],0),o.mid=k(i[1],1),o.treb=k(i[2],2),o.bassAtt=k(r[0],0),o.midAtt=k(r[1],1),o.trebAtt=k(r[2],2),o.bpm=n.bpm,o.conf=n.conf,o.playing&&(o.beats+=m*(n.conf>.4&&n.bpm>40?n.bpm:120)/60),n.bpm>0&&n.conf>.3&&t!=null){const v=60/n.bpm,L=(E-n.beat0)/v;o.phase=(L%1+1)%1,o.beatIndex=Math.floor(L)}else o.phase=(o.phase+m*2)%1;o.kick=Math.exp(-(o.t-d)/.14),o.onset=Math.exp(-(o.t-p)/.09),o.pulse=o.conf>.45?Math.exp(-(o.phase*60)/Math.max(40,o.bpm)/.12)*(o.playing?1:0):o.kick,d===o.t&&o.t-M>.34&&(M=o.t),o.flash=Math.exp(-(o.t-M)/.12);const y=1-Math.exp(-m*1.2);w+=((o.playing?n.int:0)-w)*(1-Math.exp(-m*.5)),T+=((x?V(x.f0.rms,x.f1.rms,x.k):0)-T)*y,S+=((x?V(x.f0.c,x.f1.c,x.k):S)-S)*y,o.intensity=w,o.rms=T,o.centroid=S,o.lowClock+=m*(.25+.9*Math.min(2,o.bassAtt)),o.midClock+=m*(.25+.9*Math.min(2,o.midAtt)),o.highClock+=m*(.25+.9*Math.min(2,o.trebAtt));let g=0;for(let v=0;v<512;v++)g=Math.max(g,Math.abs(a[v]));R=Math.max(g,R*Math.exp(-m*.4),.02);const H=1-Math.exp(-m*30);for(let v=0;v<512;v++){const L=o.playing?a[v]/R:0;o.wave[v]+=(L-o.wave[v])*H,o.waveRaw[v]=L}return o},A:o}}const Xt=`#version 300 es
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
`;function ne(e,t,a=Xt){const n=e.createProgram();for(const[i,r]of[[e.VERTEX_SHADER,a],[e.FRAGMENT_SHADER,t]]){const c=e.createShader(i);if(e.shaderSource(c,r),e.compileShader(c),!e.getShaderParameter(c,e.COMPILE_STATUS)){const u=e.getShaderInfoLog(c);throw new Error("Shader: "+u+`
`+r.split(`
`).map((f,l)=>`${l+1}: ${f}`).join(`
`).slice(0,4e3))}e.attachShader(n,c)}if(e.bindAttribLocation(n,0,"p"),e.linkProgram(n),!e.getProgramParameter(n,e.LINK_STATUS))throw new Error(e.getProgramInfoLog(n));const s={},o=e.getProgramParameter(n,e.ACTIVE_UNIFORMS);for(let i=0;i<o;i++){const r=e.getActiveUniform(n,i).name.replace(/\[0\]$/,"");s[r]=e.getUniformLocation(n,e.getActiveUniform(n,i).name)}return{p:n,u:s}}const ae=e=>`#version 300 es
${Xe}
in vec2 uv; out vec4 o;
${e}`;function de(e,t,a,n,s=!0,o=!1){const i=e.createTexture();e.bindTexture(e.TEXTURE_2D,i),o?e.texImage2D(e.TEXTURE_2D,0,e.RGBA32F,t,a,0,e.RGBA,e.FLOAT,null):n?e.texImage2D(e.TEXTURE_2D,0,e.RGBA16F,t,a,0,e.RGBA,e.HALF_FLOAT,null):e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,t,a,0,e.RGBA,e.UNSIGNED_BYTE,null);const r=s?e.LINEAR:e.NEAREST;e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,r),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,r),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE);const c=e.createFramebuffer();return e.bindFramebuffer(e.FRAMEBUFFER,c),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,i,0),e.clearColor(0,0,0,1),e.clear(e.COLOR_BUFFER_BIT),{tex:i,fb:c,w:t,h:a,dispose:()=>(e.deleteTexture(i),e.deleteFramebuffer(c))}}function Dt(e,t,a,n){let s=de(e,t,a,n),o=de(e,t,a,n);return{get src(){return s},get dst(){return o},swap(){const i=s;s=o,o=i},dispose(){s.dispose(),o.dispose()}}}function Pe(e,t,a,n){const s=t.u,o=(i,r)=>s[i]!=null&&e.uniform1f(s[i],r);o("uT",a.t),o("uDt",a.dt),o("uBass",a.bass),o("uMid",a.mid),o("uTreb",a.treb),o("uBassAtt",a.bassAtt),o("uMidAtt",a.midAtt),o("uTrebAtt",a.trebAtt),o("uPulse",a.pulse),o("uKick",a.kick),o("uOnset",a.onset),o("uFlash",a.flash),o("uPhase",a.phase),o("uConf",a.conf),o("uInt",a.intensity),o("uRms",a.rms),o("uCen",a.centroid),o("uLowClk",a.lowClock),o("uMidClk",a.midClock),o("uHighClk",a.highClock),o("uSeed",n.seed),o("uAspect",n.aspect),o("uHistRow",n.histRow),s.uRes!=null&&e.uniform2f(s.uRes,n.w,n.h),s.uPal!=null&&e.uniform3fv(s.uPal,n.palette),s.uAudio!=null&&(e.activeTexture(e.TEXTURE6),e.bindTexture(e.TEXTURE_2D,n.audioTex),e.uniform1i(s.uAudio,6)),s.uHist!=null&&(e.activeTexture(e.TEXTURE7),e.bindTexture(e.TEXTURE_2D,n.histTex),e.uniform1i(s.uHist,7)),e.activeTexture(e.TEXTURE0)}function te(e,t,a,n,s){t.u[a]!=null&&(e.activeTexture(e.TEXTURE0+s),e.bindTexture(e.TEXTURE_2D,n),e.uniform1i(t.u[a],s),e.activeTexture(e.TEXTURE0))}function kt(e,t,a,n){const s=1/Math.tan(e/2),o=1/(a-n);return new Float32Array([s/t,0,0,0,0,s,0,0,0,0,(n+a)*o,-1,0,0,2*n*a*o,0])}function yt(e,t,a=[0,1,0]){let n=e[0]-t[0],s=e[1]-t[1],o=e[2]-t[2],i=Math.hypot(n,s,o)||1;n/=i,s/=i,o/=i;let r=a[1]*o-a[2]*s,c=a[2]*n-a[0]*o,u=a[0]*s-a[1]*n;i=Math.hypot(r,c,u)||1,r/=i,c/=i,u/=i;const f=s*u-o*c,l=o*r-n*u,d=n*c-s*r;return new Float32Array([r,f,n,0,c,l,s,0,u,d,o,0,-(r*e[0]+c*e[1]+u*e[2]),-(f*e[0]+l*e[1]+d*e[2]),-(n*e[0]+s*e[1]+o*e[2]),1])}function Tt(e,t){const a=new Float32Array(16);for(let n=0;n<4;n++)for(let s=0;s<4;s++){let o=0;for(let i=0;i<4;i++)o+=e[i*4+s]*t[n*4+i];a[n*4+s]=o}return a}const Lt=`
vec3 hash33(vec3 p){ p = fract(p * vec3(.1031, .1030, .0973)); p += dot(p, p.yxz + 33.33); return fract((p.xxy + p.yxx) * p.zyx) * 2. - 1.; }
float noise3d(vec3 p){
  vec3 i = floor(p), f = fract(p); vec3 u = f * f * (3. - 2. * f);
  return mix(mix(mix(dot(hash33(i), f), dot(hash33(i + vec3(1,0,0)), f - vec3(1,0,0)), u.x),
                 mix(dot(hash33(i + vec3(0,1,0)), f - vec3(0,1,0)), dot(hash33(i + vec3(1,1,0)), f - vec3(1,1,0)), u.x), u.y),
             mix(mix(dot(hash33(i + vec3(0,0,1)), f - vec3(0,0,1)), dot(hash33(i + vec3(1,0,1)), f - vec3(1,0,1)), u.x),
                 mix(dot(hash33(i + vec3(0,1,1)), f - vec3(0,1,1)), dot(hash33(i + vec3(1,1,1)), f - vec3(1,1,1)), u.x), u.y), u.z); }
float fbm3d(vec3 p){ float s = 0., a = .5; for (int i = 0; i < 4; i++) { s += a * noise3d(p); p = p * 2.02 + 17.1; a *= .5; } return s; }
`;function qe(e,t=Math.random){let a=[],n=-1;return{next(){if(!a.length){a=Array.from({length:e},(s,o)=>o);for(let s=e-1;s>0;s--){const o=Math.floor(t()*(s+1));[a[s],a[o]]=[a[o],a[s]]}e>1&&a[0]===n&&a.push(a.shift())}return n=a.shift(),n}}}function Ne({beats:e=64,minSec:t=45,maxSec:a=100}={}){let n=0,s=null;return{tick(o,i){if(!o.playing)return!1;n+=i;const r=Math.floor(o.beats/e),c=s!==null&&r!==s;return s=r,c&&n>=t||n>=a?(n=0,!0):!1},reset(){n=0}}}const De=[{name:"Sog",grain:.5,keep:.989},{name:"Wirbel",grain:.3,keep:.991},{name:"Spiralarme",grain:.4,keep:.99},{name:"Wellenringe",grain:.2,keep:.99},{name:"Kaleidoskop",grain:.3,keep:.992},{name:"Spiegelkreuz",grain:.4,keep:.991},{name:"Kacheln",grain:.2,keep:.993},{name:"Marmor",grain:.1,keep:.994},{name:"Strahlen",grain:1.6,keep:.988},{name:"Horizont",grain:.6,keep:.989},{name:"Vorhang",grain:.7,keep:.989},{name:"Breitzug",grain:.7,keep:.989},{name:"Raute",grain:.5,keep:.991},{name:"Kachelspiegel",grain:.2,keep:.993},{name:"Scherwellen",grain:.2,keep:.991},{name:"Linse",grain:.4,keep:.99},{name:"Doppelwirbel",grain:.3,keep:.992},{name:"Achsenkreuz",grain:.8,keep:.989},{name:"Wellenstrahlen",grain:.4,keep:.99},{name:"Kreisel",grain:.3,keep:.991},{name:"Aufwind",grain:.3,keep:.991},{name:"Fasern",grain:1.4,keep:.988},{name:"Seitenspiegel",grain:.4,keep:.991},{name:"Wabe",grain:.3,keep:.991},{name:"Strahlenkranz",grain:1.2,keep:.99},{name:"Drift",grain:.3,keep:.993},{name:"Zoom",grain:.6,keep:.991}],jt=`
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
`,ke=e=>[parseInt(e.slice(1,3),16)/255,parseInt(e.slice(3,5),16)/255,parseInt(e.slice(5,7),16)/255],xt=(e,t,a)=>[e[0]+(t[0]-e[0])*a,e[1]+(t[1]-e[1])*a,e[2]+(t[2]-e[2])*a],ee=e=>{const t=e.map(([a,n])=>[a,ke(n)]);return a=>{if(a<=t[0][0])return t[0][1];for(let n=1;n<t.length;n++)if(a<=t[n][0]){const s=(a-t[n-1][0])/Math.max(1e-6,t[n][0]-t[n-1][0]);return xt(t[n-1][1],t[n][1],s)}return t[t.length-1][1]}},$t=(e,t,a)=>{e=(e%1+1)%1;const n=Math.floor(e*6),s=e*6-n,o=a*(1-t),i=a*(1-s*t),r=a*(1-(1-s)*t);return[[a,i,o,o,r,a][n%6],[r,a,a,i,o,o][n%6],[o,o,r,a,a,i][n%6]]},at=(e,t,a,n=8)=>(s,o)=>{const i=e(s,o),r=1-a*Math.pow(.5+.5*Math.cos(s*Math.PI*2*t),n);return[i[0]*r,i[1]*r,i[2]*r]},Ge=[{name:"Tiefsee",f:ee([[0,"#000000"],[.12,"#000a3a"],[.35,"#0029c8"],[.6,"#1f9cff"],[.82,"#a8e6ff"],[1,"#ffffff"]])},{name:"Nachtblau",f:ee([[0,"#02020a"],[.2,"#0b0b3c"],[.45,"#3a3a9a"],[.7,"#9f9fe6"],[.9,"#e6e6ff"],[1,"#ffffff"]])},{name:"Kupfer",f:at(ee([[0,"#000000"],[.2,"#2a1205"],[.45,"#b5571a"],[.7,"#ff9a3c"],[.86,"#ffe0b8"],[1,"#ffffff"]]),3,.75)},{name:"Himmel",f:ee([[0,"#2f7be8"],[.18,"#4f95f4"],[.36,"#8a1048"],[.55,"#4a0020"],[.78,"#8fd0ff"],[1,"#ffffff"]])},{name:"Eis",f:ee([[0,"#4fd3ff"],[.3,"#1f86e0"],[.55,"#0a3fa0"],[.8,"#08164a"],[1,"#000000"]])},{name:"Ultramarin",f:ee([[0,"#050540"],[.3,"#1a1a9a"],[.6,"#5555ff"],[.85,"#c8c8ff"],[1,"#ffffff"]])},{name:"Amethyst",f:ee([[0,"#0a000f"],[.25,"#3a0a55"],[.5,"#8a2ad0"],[.75,"#d79bff"],[1,"#ffffff"]])},{name:"Feuerpink",f:ee([[0,"#000000"],[.2,"#3a0010"],[.4,"#c0103a"],[.6,"#ff4f7a"],[.75,"#ff9a3a"],[.9,"#ffe3c4"],[1,"#ffffff"]])},{name:"Lagune",f:at(ee([[0,"#062a33"],[.5,"#2fa6bf"],[1,"#d8faff"]]),5,.9)},{name:"Pflaume",f:ee([[0,"#120412"],[.3,"#4a1e4a"],[.6,"#a06aa0"],[.85,"#ecd2ec"],[1,"#ffffff"]])},{name:"Fahne",f:e=>{const t=[ke("#3a00a8"),ke("#c8102e"),ke("#ffffff"),ke("#2050ff")],a=e*6,n=Math.floor(a);return xt(t[n%4],t[(n+1)%4],a-n)}},{name:"Schiefer",f:ee([[0,"#000000"],[.3,"#1a2440"],[.6,"#4a5e9a"],[.85,"#9fb2e6"],[1,"#e8eeff"]])},{name:"Flamme",f:ee([[0,"#000000"],[.15,"#300000"],[.35,"#a01000"],[.55,"#ff5a00"],[.75,"#ffb000"],[.9,"#fff0a0"],[1,"#ffffff"]])},{name:"Indigo",f:ee([[0,"#000000"],[.2,"#10083a"],[.45,"#3a1ea0"],[.65,"#6a50e0"],[.85,"#b8a8ff"],[1,"#ffffff"]])},{name:"Gletscher",f:ee([[0,"#ffffff"],[.2,"#c0f4ff"],[.45,"#30c0e8"],[.7,"#1060c0"],[.85,"#0a3a6a"],[1,"#04262a"]])},{name:"Rosa & Mint",f:ee([[0,"#000000"],[.25,"#1e5a4a"],[.45,"#5ab49a"],[.6,"#c0507a"],[.8,"#ff9ac0"],[1,"#ffffff"]])},{name:"Neonblau",f:ee([[0,"#000000"],[.3,"#0010ff"],[.55,"#0080ff"],[.8,"#80e8ff"],[1,"#ffffff"]])},{name:"Magenta",f:ee([[0,"#2a2aff"],[.3,"#6a20ff"],[.55,"#ff2ad0"],[.8,"#ffa0f0"],[1,"#ffffff"]])},{name:"Creme",f:at(ee([[0,"#0a0c08"],[.4,"#3a3a2a"],[.7,"#c8c09a"],[.9,"#fff8e0"],[1,"#ffffff"]]),7,.35,4)},{name:"Chrom",f:ee([[0,"#000000"],[.15,"#10123a"],[.3,"#e8e8ff"],[.45,"#20224a"],[.6,"#ffffff"],[.75,"#2a2c5a"],[.9,"#f0f0ff"],[1,"#ffffff"]])},{name:"Wolken",f:ee([[0,"#f4f6ff"],[.3,"#f0d0d8"],[.55,"#c08a9a"],[.75,"#6a3a4a"],[.9,"#2a1418"],[1,"#000000"]])},{name:"Terrakotta",f:at(ee([[0,"#0e3a40"],[.25,"#2a6a70"],[.4,"#7a2a10"],[.6,"#c85a2a"],[.8,"#ffc890"],[1,"#ffffff"]]),4,.5)},{name:"Ultraviolett",f:ee([[0,"#000000"],[.25,"#0a0aa0"],[.45,"#8a10ff"],[.65,"#ff40e0"],[.85,"#ffc0f8"],[1,"#ffffff"]])},{name:"Regenbogen",f:(e,t)=>e<.015?[0,0,0]:$t(e*1.5+t*.03,.9,Math.min(1,.35+e*2))},{name:"Sand",f:ee([[0,"#ead2b0"],[.4,"#c49a6a"],[.7,"#6a4422"],[1,"#1a0e04"]])},{name:"Smaragd",f:ee([[0,"#000000"],[.25,"#003a1a"],[.5,"#00a050"],[.75,"#8cff8c"],[1,"#ffffff"]])},{name:"Gold",f:ee([[0,"#000000"],[.25,"#2a1a00"],[.5,"#a06a10"],[.75,"#ffd070"],[1,"#ffffff"]])},{name:"Lila Grund",f:ee([[0,"#2a1478"],[.25,"#3c22a8"],[.5,"#7a5cf0"],[.75,"#c8b8ff"],[1,"#ffffff"]])},{name:"Zitrone",f:ee([[0,"#f4b000"],[.25,"#f2c800"],[.5,"#c8d820"],[.75,"#4aa040"],[1,"#0a3a14"]])},{name:"Wiese",f:ee([[0,"#3cc050"],[.3,"#2a9a3a"],[.6,"#0e5a1e"],[.85,"#06300e"],[1,"#d8ffd0"]])},{name:"Streifen",f:e=>{if(e<.02)return[0,0,0];const t=[ke("#0a0402"),ke("#b02a14"),ke("#f08a5a"),ke("#f6e2c0"),ke("#8a8478")],a=e*10,n=Math.floor(a),s=a-n;return xt(t[n%5],t[(n+1)%5],s*s*(3-2*s))}}],he=Math.PI*2,xe=(e,t,a)=>[e*Math.cos(a)-t*Math.sin(a),e*Math.sin(a)+t*Math.cos(a)],Se=e=>Math.min(1.6,Math.max(.4,e)),Ke=(e,t,a,n,s=0)=>{const o=[];for(let i=0;i<=e;i++){const r=i/e,[c,u,f,l]=t(r),d=a((r+s)%1)*n;o.push(c+f*d,u+l*d)}return o},Oe=(e,t,a,n=0)=>s=>{const o=s*he+n;return[e+Math.cos(o)*a,t+Math.sin(o)*a,Math.cos(o),Math.sin(o)]},Ee=(e,t,a,n,s,o,i,r=0,c=1,u=null)=>{const f=a-e,l=n-t,d=Math.hypot(f,l)||1,p=-l/d,M=f/d,w=[];for(let T=0;T<=s;T++){const S=T/s,R=o((r+S*c)%1)*i*(u?u(S):1);w.push(e+f*S+p*R,t+l*S+M*R)}return w},ht=(e,t,a,n,s,o=.003,i=3)=>{const r=[];for(let c=0;c<i;c++){const u=n+c/i*Math.PI;r.push({pts:[e-Math.cos(u)*a,t-Math.sin(u)*a,e+Math.cos(u)*a,t+Math.sin(u)*a],pen:s,width:o})}return r},Le=[{name:"Ring",f:({t:e,w:t,bass:a})=>{const n=.34+.09*Se(a);return{lines:[{pts:Ke(320,Oe(0,0,n,e*.25),t,.16),pen:1,width:.003,closed:!0}]}}},{name:"Doppelring",f:({t:e,w:t,bass:a,asp:n})=>{const s=.24+.06*Se(a),o=Math.min(.75,n*.42);return{lines:[{pts:Ke(220,Oe(-o,0,s,e*.4),i=>t(i*.5),.12),pen:1,width:.003,closed:!0},{pts:Ke(220,Oe(o,0,s,-e*.4),i=>t(.5+i*.5),.12),pen:1,width:.003,closed:!0}]}}},{name:"Welle",f:({t:e,w:t,asp:a})=>{const n=.12*Math.sin(e*.37);return{lines:[{pts:Ee(-a*1.05,n,a*1.05,n,300,t,.3),pen:1,width:.007}]}}},{name:"Drei Wellen",f:({t:e,w:t,asp:a})=>{const n=[];for(let s=-1;s<=1;s++){const o=s*a*.55+.06*Math.sin(e*.5+s);n.push({pts:Ee(o,-1.05,o,1.05,220,t,.12,(s+1)/3,1/3),pen:1,width:.0026})}return{lines:n}}},{name:"Ellipsen",f:({t:e,w:t,f:a})=>{const n=[];for(let s=0;s<3;s++){const o=e*(.18+s*.06)*(s%2?-1:1)+s*1.1,i=.72+a(.1+s*.3)*.14,r=.28+s*.08,c=[];for(let u=0;u<=240;u++){const f=u/240,l=f*he,d=1+t(f)*.06;c.push(...xe(Math.cos(l)*i*d,Math.sin(l)*r*d,o))}n.push({pts:c,pen:1,width:.0026,closed:!0})}return n.push(...ht(0,0,.05+.03*a(.05),e*1.5,1,.003)),{lines:n}}},{name:"Blüte",f:({t:e,w:t,f:a})=>{const n=[],s=.62+.18*a(.08);for(const[o,i]of[[1,1],[.9,.7]]){const r=[];for(let c=0;c<=480;c++){const u=c/480,f=u*he,l=(s*Math.cos(3*f)+t(u)*.035)*o;r.push(...xe(l*Math.cos(f),l*Math.sin(f),e*.14))}n.push({pts:r,pen:i,width:.0024,closed:!0})}return{lines:n}}},{name:"Kleeblatt",f:({t:e,w:t,bass:a})=>{const n=[],s=.26+.05*Se(a);for(let o=0;o<3;o++){const i=e*.2+o/3*he+Math.PI/2;n.push({pts:Ke(200,Oe(Math.cos(i)*.22,Math.sin(i)*.22,s,-e*.5),r=>t((r+o/3)%1),.07),pen:1,width:.004,closed:!0})}return{lines:n}}},{name:"Strahlen",f:({t:e,f:t})=>{const a=[];for(let s=0;s<36;s++){const o=s/36,i=t(Math.abs(o*2-1)),r=o*he+e*.1,c=.07,u=c+.06+i*.95;a.push({pts:[c*Math.cos(r),c*Math.sin(r),u*Math.cos(r),u*Math.sin(r)],pen:.55+.45*i,width:.0035+.004*i})}return{lines:a}}},{name:"X-Strahlen",f:({t:e,w:t,f:a,asp:n})=>{const s=[],o=Math.hypot(n,1)*1.05;for(const i of[1,-1]){const r=i*(.55+.12*Math.sin(e*.21)),c=18;for(let f=0;f<c;f++){const l=f/c,d=(f+.8)/c,p=a(Math.abs(l*2-1)),M=xe((l*2-1)*o,0,r),w=xe((d*2-1)*o,0,r);s.push({pts:[...M,...w],pen:.45+.55*p,width:.012+.014*p})}const u=Ee(...xe(-o,0,r),...xe(o,0,r),200,t,.05,i>0?0:.5,.5);s.push({pts:u,pen:1,width:.0022})}return{lines:s}}},{name:"Blitzkreuz",f:({t:e,w:t})=>{const a=[];for(let n=0;n<4;n++){const s=e*.16+n*Math.PI/2,[o,i]=xe(1.2,0,s);a.push({pts:Ee(0,0,o,i,140,t,.14,n*.25,.5,r=>Math.sin(r*Math.PI)),pen:1,width:.003})}return{lines:a}}},{name:"Stern",f:({t:e,w:t,bass:a})=>{const n=.5+.08*Se(a),s=n*.42,o=[];for(let r=0;r<10;r++){const c=e*.2+r/10*he-Math.PI/2,u=r%2?s:n;o.push([Math.cos(c)*u,Math.sin(c)*u])}const i=[];for(let r=0;r<10;r++){const[c,u]=o[r],[f,l]=o[(r+1)%10],d=Ee(c,u,f,l,30,t,.05,r/10,.1,p=>Math.sin(p*Math.PI));i.push(...r?d.slice(2):d)}return{lines:[{pts:i,pen:1,width:.0032,closed:!0}]}}},{name:"Spirale",f:({t:e,w:t})=>{const a=[];for(let n=0;n<=420;n++){const s=n/420,o=s*he*3.5+e*.45,i=.03+s*.98+t(s)*.04;a.push(Math.cos(o)*i,Math.sin(o)*i)}return{lines:[{pts:a,pen:1,width:.003}]}}},{name:"Kreischen",f:({t:e,w:t,f:a,asp:n})=>{const s=[];for(let o=0;o<3;o++)for(let i=0;i<22;i++){const r=i/21,c=e*(.3+o*.1)*(o%2?-1:1)+r*Math.PI*1.2+o*2.1,u=.3+o*.22+t(r)*.025;s.push({x:u*Math.cos(c)*Math.min(1.35,n*.75),y:u*Math.sin(c)*.85,r:.008+a(r)*.02,pen:1})}return{dots:s}}},{name:"Perlenband",f:({t:e,f:t,asp:a})=>{const n=[],o=e*.17,i=Math.min(1.25,a*.7),r=Math.cos(o),c=Math.sin(o);for(let u=0;u<96;u++){const f=u/95,l=(f*2-1)*i,d=t(Math.abs(f*2-1))*.26+.04*Math.sin(f*9+e*1.3);n.push({x:r*l-c*d,y:c*l+r*d,r:.0042,pen:1})}return{dots:n}}},{name:"Perlenring",f:({t:e,f:t,bass:a})=>{const n=[],o=.34+.08*Se(a);for(let i=0;i<84;i++){const r=i/84,c=r*he+e*.3,u=o+t(Math.abs(r*2-1))*.14+.02*Math.sin(r*he*3-e);n.push({x:Math.cos(c)*u,y:Math.sin(c)*u,r:.0042,pen:1})}return{dots:n}}},{name:"Schwinge",f:({t:e,f:t,asp:a})=>{const n=[],s=[[-.22*a,.3],[.25*a,-.34]];for(let o=0;o<2;o++){const i=[],r=(o?.35:-.25)+.55*Math.sin(e*(.42+o*.11)+o*2),c=Math.cos(r),u=Math.sin(r),f=a*1.4;for(let l=0;l<=120;l++){const d=l/120,p=(d*2-1)*f,M=Math.sin(d*Math.PI*2+e*.7+o)*.05*(.4+t(d));i.push(s[o][0]+c*p-u*M,s[o][1]+u*p+c*M)}n.push({pts:i,pen:1,width:.0018})}return{lines:n}}},{name:"Lissajous",f:({t:e,w:t,bass:a,asp:n})=>{const s=[],o=.45+.12*Se(a);for(let i=0;i<=400;i++){const r=i/400;s.push(...xe(t(r)*o*Math.min(1.4,n*.8),t((r+.23)%1)*o,e*.12))}return{lines:[{pts:s,pen:1,width:.0022}]}}},{name:"Helix",f:({t:e,w:t,asp:a})=>{const n=[];for(const s of[1,-1]){const o=[];for(let i=0;i<=260;i++){const r=i/260,c=(r*2-1)*a*1.05;o.push(c,s*.3*Math.sin(r*he*1.5+e*.9)+t((r*.5+(s>0?0:.5))%1)*.06)}n.push({pts:o,pen:1,width:.003})}return{lines:n}}},{name:"Raute",f:({t:e,w:t,bass:a})=>{const n=[];for(const[s,o]of[[.62+.08*Se(a),0],[.34,.5]]){const i=[[s,0],[0,s],[-s,0],[0,-s]].map(([c,u])=>xe(c,u,e*.1*(o?-1:1))),r=[];for(let c=0;c<4;c++){const u=Ee(...i[c],...i[(c+1)%4],50,t,.05,o+c*.125,.125);r.push(...c?u.slice(2):u)}n.push({pts:r,pen:o?.8:1,width:.003,closed:!0})}return{lines:n}}},{name:"Schmetterling",f:({t:e,w:t,bass:a})=>{const n=[],s=.13+.025*Se(a);for(let o=0;o<=600;o++){const i=o/600,r=i*he*2,c=(Math.exp(Math.cos(r))-2*Math.cos(4*r)+Math.pow(Math.sin(r/12),5))*s+t(i)*.02;n.push(...xe(Math.sin(r)*c,Math.cos(r)*c-.1,Math.sin(e*.3)*.3))}return{lines:[{pts:n,pen:1,width:.0024}]}}},{name:"Fächer",f:({t:e,f:t})=>{const a=[];for(let s=0;s<28;s++){const o=s/27,i=t(o),r=Math.PI*(.08+o*.84)+Math.sin(e*.2)*.05,c=.25+i*1.4;a.push({pts:[0,-1.05,Math.cos(r)*c,-1.05+Math.sin(r)*c],pen:.5+.5*i,width:.004+.004*i})}return{lines:a}}},{name:"Sechseck",f:({t:e,w:t})=>{const a=[];return[.28,.52,.78].forEach((n,s)=>{const o=[];for(let r=0;r<6;r++)o.push(xe(n*Math.cos(r/6*he),n*Math.sin(r/6*he),e*.15*(s%2?-1:1)));const i=[];for(let r=0;r<6;r++){const c=Ee(...o[r],...o[(r+1)%6],30,t,.035,s/3+r/18,.05555555555555555);i.push(...r?c.slice(2):c)}a.push({pts:i,pen:1-s*.15,width:.003,closed:!0})}),{lines:a}}},{name:"Fliege",f:({t:e,w:t})=>{const a=[];for(let n=0;n<7;n++)for(const s of[1,-1]){const o=(n-3)*.12+Math.sin(e*.3)*.1,[i,r]=xe(s*1.25,0,o*s);a.push({pts:Ee(s*.04,0,i,r,60,t,.06,n*.13,.25,c=>c),pen:.9,width:.0026})}return{lines:a}}},{name:"Vier Kreise",f:({t:e,w:t,f:a})=>{const n=[],s=.045+.02*a(.05),o=.13;for(const[i,r]of[[1,1],[-1,1],[1,-1],[-1,-1]])n.push({pts:Ke(40,Oe(i*o,r*o*1.2,s),()=>0,0),pen:1,width:.004,closed:!0});return n.push({pts:Ke(300,Oe(0,0,.62,e*.2),t,.12),pen:.75,width:.0028,closed:!0}),{lines:n}}},{name:"Kamm",f:({t:e,w:t,f:a,asp:n})=>{const s=[],o=.25*Math.sin(e*.33),i=Ee(-n*1.05,o,n*1.05,o,240,t,.16);s.push({pts:i,pen:1,width:.003});const r=26;for(let c=0;c<=r;c++){const u=Math.round(c/r*240),f=i[u*2],l=i[u*2+1],d=.12+a(c/r)*.35;s.push({pts:[f,l,f+.04*Math.sin(e+c),l-d],pen:.85,width:.0024})}return{lines:s}}},{name:"Bögen",f:({t:e,w:t})=>{const a=[];for(const n of[1,-1]){const s=n*(.6+.15*Math.sin(e*.17));for(let o=0;o<5;o++){const i=.62+o*.1,r=[];for(let c=0;c<=200;c++){const u=c/200,f=u*he,l=1+t((u+o*.1)%1)*.02;r.push(...xe(Math.cos(f)*1.1*i*l,Math.sin(f)*.32*i*l,s))}a.push({pts:r,pen:1-o*.1,width:.0022,closed:!0})}}return{lines:a}}},{name:"Sternchen",f:({t:e,f:t,bass:a})=>{const n=[],o=.48+.06*Se(a);for(let i=0;i<8;i++){const r=e*.3+i/8*he;n.push(...ht(Math.cos(r)*o,Math.sin(r)*o,.035+.05*t(i/8),-e*2+i,1,.0028))}return n.push(...ht(0,0,.08+.05*t(.05),e,1,.0035,4)),{lines:n}}}],Zt=ae(`
uniform sampler2D uPrev;
uniform int uFa, uFb;
uniform float uFm, uTa, uTb, uKeep, uSub, uGrain, uFlood;
uniform vec4 uPa, uPb;
${jt}
void main(){
  vec2 asp = vec2(uAspect, 1.);
  vec2 p = (uv * 2. - 1.) * asp;
  vec2 s = mix(flow(uFa, p, uPa, uTa), flow(uFb, p, uPb, uTb), uFm);
  // feste Körnung (hängt nur vom Bildpunkt ab): zieht feine Fasern entlang der Strömung
  vec2 h = vec2(hash12(gl_FragCoord.xy * 1.37 + 11.), hash12(gl_FragCoord.xy * .73 + 3.)) - .5;
  s += h * uGrain * 2. / uRes.y;
  vec2 q = s / asp * .5 + .5;
  float v = (q.x < 0. || q.y < 0. || q.x > 1. || q.y > 1.) ? 0. : texture(uPrev, q).r;
  // Flut: das ganze Bild läuft voll und klingt dann durch die Farbtabelle wieder ab
  o = vec4(min(max(v * uKeep - uSub, 0.) + uFlood, 1.3), 0., 0., 1.);
}`),Yt=`#version 300 es
in vec2 p; in vec2 a;
uniform float uAspect;
out vec2 va;
void main(){ va = a; gl_Position = vec4(p.x / uAspect, p.y, 0., 1.); }`,Jt=`#version 300 es
precision mediump float;
in vec2 va; out vec4 o;
void main(){ o = vec4(va.y * (1. - smoothstep(.5, 1., abs(va.x))), 0., 0., 1.); }`,Qt=ae(`
uniform sampler2D uText; uniform float uAmt;
void main(){ float v = texture(uText, vec2(uv.x, 1. - uv.y)).r; o = vec4(v * uAmt, 0., 0., 1.); }`),en=ae(`
uniform sampler2D uSrc;
void main(){ o = vec4(texture(uSrc, uv).r, 0., 0., 1.); }`),tn=ae(`
uniform sampler2D uI, uMap;
void main(){
  float v = clamp(texture(uI, uv).r, 0., 1.);
  o = vec4(pow(texture(uMap, vec2(v * (255. / 256.) + .5 / 256., .5)).rgb, vec3(2.2)), 1.);   // linear, Ausgabe macht sRGB
}`),Fe=Math.PI*2,dt=e=>e*e*(3-2*e);function Rt(e,t,a){const n=t?[...e,e[0],e[1]]:e,s=n.length/2,o=new Float32Array(a*2);if(s<2){for(let u=0;u<a;u++)o[u*2]=n[0]||0,o[u*2+1]=n[1]||0;return o}const i=new Float32Array(s);for(let u=1;u<s;u++)i[u]=i[u-1]+Math.hypot(n[u*2]-n[u*2-2],n[u*2+1]-n[u*2-1]);const r=i[s-1]||1e-6;let c=0;for(let u=0;u<a;u++){const f=u/(a-1)*r;for(;c<s-2&&i[c+1]<f;)c++;const l=i[c+1]-i[c]||1e-6,d=Math.min(1,Math.max(0,(f-i[c])/l));o[u*2]=n[c*2]+(n[c*2+2]-n[c*2])*d,o[u*2+1]=n[c*2+1]+(n[c*2+3]-n[c*2+1])*d}return o}function bt(e){const t=(e.lines||[]).slice();for(const a of e.dots||[]){const n=[];for(let s=0;s<12;s++)n.push(a.x+Math.cos(s/12*Fe)*a.r,a.y+Math.sin(s/12*Fe)*a.r);t.push({pts:n,pen:a.pen,width:a.r*.35,closed:!0})}return t}function Pt(e,t,a){const n=e.length;if(n>=t)return e.slice(0,t).map(f=>({pts:Rt(f.pts,f.closed,a),pen:f.pen,width:f.width}));const s=e.map(f=>{let l=0;for(let d=2;d<f.pts.length;d+=2)l+=Math.hypot(f.pts[d]-f.pts[d-2],f.pts[d+1]-f.pts[d-1]);return l+1e-4}),o=s.reduce((f,l)=>f+l,0),i=t-n,r=s.map(f=>1+Math.floor(i*f/o));let c=t-r.reduce((f,l)=>f+l,0);for(let f=0;c>0;f=(f+1)%n,c--)r[f]++;const u=[];return e.forEach((f,l)=>{const d=r[l],p=Rt(f.pts,f.closed,d*(a-1)+1);for(let M=0;M<d;M++)u.push({pts:p.subarray(M*(a-1)*2,((M+1)*(a-1)+1)*2),pen:f.pen,width:f.width})}),u}function nn(e,t,a){const n=bt(e),s=bt(t);if(!n.length)return s.map(f=>({...f,pen:f.pen*a}));if(!s.length)return n.map(f=>({...f,pen:f.pen*(1-a)}));const o=Math.max(n.length,s.length);if(o>120)return[...n.map(f=>({...f,pen:f.pen*(1-a)})),...s.map(f=>({...f,pen:f.pen*a}))];const i=Math.max(10,Math.min(220,Math.round(4e3/o))),r=Pt(n,o,i),c=Pt(s,o,i),u=[];for(let f=0;f<o;f++){const l=r[f],d=c[f],p=new Float32Array(i*2);for(let M=0;M<i*2;M++)p[M]=l.pts[M]+(d.pts[M]-l.pts[M])*a;u.push({pts:p,pen:l.pen+(d.pen-l.pen)*a,width:l.width+(d.width-l.width)*a})}return u}const At=["Sternchen","Kreischen","Funken","ohne"],on=new Set(["Kaleidoskop","Spiegelkreuz","Kacheln","Kachelspiegel","Seitenspiegel","Raute","Wabe","Strahlenkranz"].map(e=>De.findIndex(t=>t.name===e)).filter(e=>e>=0)),an=new Set(["Strahlen","X-Strahlen","Kamm","Fächer","Sternchen","Vier Kreise"].map(e=>Le.findIndex(t=>t.name===e)).filter(e=>e>=0)),sn=new Set(Ge.map((e,t)=>[t,e.f(0,0)]).filter(([,e])=>.2126*e[0]+.7152*e[1]+.0722*e[2]>.1).map(([e])=>e));function rn(e,t){const a=[],{x:n,y:s,size:o,rot:i}=e;if(e.form===0)for(let r=0;r<3;r++){const c=i+r/3*Math.PI;a.push({pts:[n-Math.cos(c)*o,s-Math.sin(c)*o,n+Math.cos(c)*o,s+Math.sin(c)*o],pen:t,width:.0028})}else if(e.form===1){const r=[];for(let c=0;c<10;c++){const u=c%2?o*.42:o,f=i+c/10*Fe-Math.PI/2;r.push(n+Math.cos(f)*u,s+Math.sin(f)*u)}a.push({pts:r,pen:t,width:.0024,closed:!0})}else a.push({pts:[n-Math.cos(i)*o*1.3,s-Math.sin(i)*o*1.3,n+Math.cos(i)*o*1.3,s+Math.sin(i)*o*1.3],pen:t,width:.0026}),a.push({pts:[n+Math.sin(i)*o*.6,s-Math.cos(i)*o*.6,n-Math.sin(i)*o*.6,s+Math.cos(i)*o*.6],pen:t,width:.0026});return a}function cn(e,t){const a=ne(e,Zt),n=ne(e,Jt,Yt),s=ne(e,Qt),o=ne(e,tn),i=ne(e,en);let r=null,c=null;const u=12e4,f=new Float32Array(u*4),l=e.createBuffer(),d=e.createVertexArray();e.bindVertexArray(d),e.bindBuffer(e.ARRAY_BUFFER,l),e.bufferData(e.ARRAY_BUFFER,f.byteLength,e.DYNAMIC_DRAW);const p=e.getAttribLocation(n.p,"p"),M=e.getAttribLocation(n.p,"a");e.enableVertexAttribArray(p),e.vertexAttribPointer(p,2,e.FLOAT,!1,16,0),e.enableVertexAttribArray(M),e.vertexAttribPointer(M,2,e.FLOAT,!1,16,8),e.bindVertexArray(null);const w=e.createTexture(),T=new Uint8Array(256*4);e.bindTexture(e.TEXTURE_2D,w),e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,256,1,0,e.RGBA,e.UNSIGNED_BYTE,T),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE);const S=e.createTexture(),R=document.createElement("canvas");R.width=1024,R.height=256;let D=null,Y=-99,b=Math.random,m=null,z=null,E=0;const h={shape:{from:0,to:0,m:1,next:0},flow:{from:0,to:0,m:1,next:0,pa:[.5,.5,.5,.5],pb:[.5,.5,.5,.5],ta:0,tb:0,ka:.96,kb:.96},map:{from:0,to:0,m:1,next:0},part:{from:3,to:3,m:1,next:0}},x={shape:Le.length,flow:De.length,map:Ge.length,part:At.length},B={shape:[18,34],flow:[22,44],map:[16,32],part:[18,36]},V={shape:3.2,flow:4,map:3,part:1},C={...V},k=[];let y=0,g=0,H=0,v=!1,L=0,G=0,F=0,A=0,J=0;const ie=P=>{const[q,O]=B[P];let oe=E+q+b()*(O-q);for(let me=0;me<6&&Object.keys(h).some($=>$!==P&&Math.abs(h[$].next-oe)<4);me++)oe+=5;h[P].next=oe},Z=P=>{let q=m[P].next();return q===h[P].to&&(q=m[P].next()),P==="flow"&&on.has(q)&&b()<.6&&(q=m.flow.next()),P==="map"&&sn.has(q)&&b()<.65&&(q=m.map.next()),P==="shape"&&an.has(q)&&b()<.5&&(q=m.shape.next()),q%x[P]},U=P=>{const q=b();return q<.45?.88+b()*.06:q<.88?.94+b()*.028:De[P].keep},W=P=>{y=P?.45:.22,g=P?3+b()*7:0,H=E},K=(P,q)=>{const O=h[P];if(O.from=O.to,O.to=q,O.m=0,C[P]=V[P],P==="flow"){O.pa=O.pb,O.ta=O.tb,O.pb=[b(),b(),b(),b()],O.tb=0,O.ka=O.kb,O.kb=U(q);const oe=b();oe<.4&&(C.flow=.25),oe<.18?v=!0:oe<.3&&E-H>12&&W(b()<.35)}P==="map"&&b()<.5&&(C.map=.4),ie(P)},Q=(P,q)=>{const O=R.getContext("2d");O.fillStyle="#000",O.fillRect(0,0,1024,256),O.fillStyle="#fff",O.textAlign="center",O.textBaseline="middle",O.font="700 64px system-ui, -apple-system, Segoe UI, sans-serif",O.fillText(String(P||"").slice(0,40),512,100),O.font="400 40px system-ui, -apple-system, Segoe UI, sans-serif",O.fillText(String(q||"").slice(0,50),512,172),e.bindTexture(e.TEXTURE_2D,S),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,R),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)},pe=(P,q,O)=>{const oe=At[h.part.to],me=P.events.kick!==G,N=P.events.onset!==F;if(G=P.events.kick,F=P.events.onset,P.playing&&h.part.m>=1){if(oe==="Sternchen"){J+=q;const $=me?2+Math.floor(b()*3):J>.9&&P.conf<.4?1:0;$&&(J=0);for(let I=0;I<$;I++){const j=b()*Fe,ue=.25+b()*.5;k.push({type:"star",form:Math.floor(b()*3),x:Math.cos(j)*.12,y:Math.sin(j)*.12,vx:Math.cos(j)*ue,vy:Math.sin(j)*ue,rot:b()*Fe,vr:(b()-.5)*5,size:.03+b()*.035,age:0,life:2.2+b()*1.6})}}else if(oe==="Kreischen"){if(E>A){A=E+1.6+b()*1.8;const $=.25+b()*.55,I=b()*Fe,j=(b()<.5?-1:1)*(.5+b()*.6),ue=6+Math.floor(b()*4);for(let ve=0;ve<ue;ve++)k.push({type:"ring",R:$,th:I,w:j,lag:ve*.11,r:.012+.01*(ve*7%3),age:0,life:3.2})}}else if(oe==="Funken"){const $=N?10+Math.floor(b()*16):b()<q*6?1:0;for(let I=0;I<$;I++)k.push({type:"spark",x:(b()*2-1)*O,y:b()*2-1,r:.003+b()*.004,age:0,life:.3+b()*.6})}}for(let $=k.length-1;$>=0;$--){const I=k[$];if(I.age+=q,I.age>I.life){k.splice($,1);continue}I.type==="star"&&(I.x+=I.vx*q,I.y+=I.vy*q,I.rot+=I.vr*q)}k.length>400&&k.splice(0,k.length-400)};return{look:{linear:!1,bloom:.06,scale:1,expo:1,vignette:0},keys:{m:()=>(K("shape",Z("shape")),`Figur: ${Le[h.shape.to].name}`),s:()=>(K("flow",Z("flow")),`Strömung: ${De[h.flow.to].name}`),p:()=>(K("map",Z("map")),`Farben: ${Ge[h.map.to].name}`)},help:"M Figur · S Strömung · P Farben",resize(P,q){c&&c.dispose();const O=Math.min(1,1440/q),oe=r;r=Dt(e,Math.max(32,Math.round(P*O)),Math.max(32,Math.round(q*O)),t),c=de(e,P,q,t),oe&&(e.bindFramebuffer(e.FRAMEBUFFER,r.src.fb),e.viewport(0,0,r.src.w,r.src.h),e.useProgram(i.p),te(e,i,"uSrc",oe.src.tex,0),e.drawArrays(e.TRIANGLES,0,3),oe.dispose())},render(P,q){const O=P.dt;if(E+=O,z!==q.seed){const _=z===null;z=q.seed;let re=Math.floor(q.seed*1e6)||1;b=()=>(re=re*16807%2147483647)/2147483647,m={shape:qe(x.shape,b),flow:qe(x.flow,b),map:qe(x.map,b),part:qe(x.part,b)};for(const X of["shape","flow","map","part"]){const le=Z(X);_?(Object.assign(h[X],{from:le,to:le,m:1}),X==="flow"&&(h.flow.pb=[b(),b(),b(),b()],h.flow.ka=h.flow.kb=U(le)),ie(X)):X!=="part"&&K(X,le)}}if(P.playing)for(const _ of["shape","flow","map","part"])E>h[_].next&&h[_].m>=1&&K(_,Z(_));for(const _ of["shape","flow","map","part"])h[_].m=Math.min(1,h[_].m+O/C[_]);P.events.kick!==L&&(L=P.events.kick,P.playing&&E-H>25&&P.bassAtt>1.25&&b()<.18&&W(b()<.3)),h.flow.ta+=O,h.flow.tb+=O;const oe=r.dst.w,me=r.dst.h;e.bindFramebuffer(e.FRAMEBUFFER,r.dst.fb),e.viewport(0,0,oe,me),e.useProgram(a.p),Pe(e,a,P,q),e.uniform2f(a.u.uRes,oe,me),te(e,a,"uPrev",r.src.tex,0);const N=dt(h.flow.m),$=De[h.flow.from],I=De[h.flow.to];e.uniform1i(a.u.uFa,h.flow.from),e.uniform1i(a.u.uFb,h.flow.to),e.uniform1f(a.u.uFm,N),e.uniform4fv(a.u.uPa,h.flow.pa),e.uniform4fv(a.u.uPb,h.flow.pb),e.uniform1f(a.u.uTa,h.flow.ta),e.uniform1f(a.u.uTb,h.flow.tb);const j=Math.min(3,O*60);e.uniform1f(a.u.uAmt,j*(.8+.35*Math.min(2,P.bassAtt)));let ue=h.flow.ka+(h.flow.kb-h.flow.ka)*N,ve=0;y>0?(ve=.09*j,y-=O,ue=Math.max(ue,.97)):g>0&&(ue=.9975,g-=O),v&&(ue=0,v=!1),e.uniform1f(a.u.uKeep,Math.pow(ue,j)),e.uniform1f(a.u.uFlood,ve),e.uniform1f(a.u.uSub,.0012*j),e.uniform1f(a.u.uGrain,($.grain+(I.grain-$.grain)*N)*.35*(me/720)),e.bindVertexArray(q.quadVao),e.drawArrays(e.TRIANGLES,0,3);let Ie=0;const Ce=(_,re,X,le)=>{if(Ie>=u)return;const ce=Ie*4;f[ce]=_,f[ce+1]=re,f[ce+2]=X,f[ce+3]=le,Ie++},Ct=2/me,ot=(_,re,X,le)=>{if(X<=.003)return;const ce=Math.max(re*.7,.9*Ct),je=_.length/2,mt=le?je:je-1;for(let Ae=0;Ae<mt;Ae++){const ze=(Ae+1)%je,$e=_[Ae*2],Ze=_[Ae*2+1],Ye=_[ze*2],Je=_[ze*2+1];let ye=-(Je-Ze),Te=Ye-$e;const Qe=Math.hypot(ye,Te);if(Qe<1e-7)continue;ye=ye/Qe*ce,Te=Te/Qe*ce;const Ue=(Ye-$e)/Qe*ce*.5,Ve=(Je-Ze)/Qe*ce*.5;Ce($e-Ue+ye,Ze-Ve+Te,1,X),Ce($e-Ue-ye,Ze-Ve-Te,-1,X),Ce(Ye+Ue+ye,Je+Ve+Te,1,X),Ce($e-Ue-ye,Ze-Ve-Te,-1,X),Ce(Ye+Ue-ye,Je+Ve-Te,-1,X),Ce(Ye+Ue+ye,Je+Ve+Te,1,X)}},ct={t:E,w:_=>Math.max(-1.3,Math.min(1.3,P.waveRaw[Math.min(511,Math.max(0,Math.round(_*511)))])),f:_=>{const re=Math.min(31,Math.max(0,_*31)),X=Math.floor(re),le=re-X;return Math.min(1,P.bands[X]*(1-le)+P.bands[Math.min(31,X+1)]*le)},bass:P.bassAtt,asp:q.aspect},Ut=P.playing?.85+.15*Math.min(1,P.bassAtt):.25,St=dt(h.shape.m);let ut;St>=1||h.shape.from===h.shape.to?ut=bt(Le[h.shape.to].f(ct)):ut=nn(Le[h.shape.from].f(ct),Le[h.shape.to].f(ct),St);for(const _ of ut)ot(_.pts,_.width,_.pen*Ut,_.closed);pe(P,O,q.aspect);for(const _ of k){const re=Math.min(1,_.age/.15,(_.life-_.age)/.6);if(_.type==="star")for(const X of rn(_,re))ot(X.pts,X.width,X.pen,X.closed);else if(_.type==="ring"){const X=_.age-_.lag;if(X<0)continue;const le=_.th+_.w*X,ce=_.R*(1+.15*X),je=Math.cos(le)*ce*Math.min(1.4,q.aspect*.8),mt=Math.sin(le)*ce*.85,Ae=[];for(let ze=0;ze<14;ze++)Ae.push(je+Math.cos(ze/14*Fe)*_.r,mt+Math.sin(ze/14*Fe)*_.r);ot(Ae,.0028,re,!0)}else{const X=.6+.4*Math.sin(_.age*40+_.x*10);ot([_.x-_.r,_.y,_.x+_.r,_.y],_.r*.8,re*X,!1)}}Ie&&(e.useProgram(n.p),e.uniform1f(n.u.uAspect,q.aspect),e.bindBuffer(e.ARRAY_BUFFER,l),e.bufferSubData(e.ARRAY_BUFFER,0,f.subarray(0,Ie*4)),e.bindVertexArray(d),e.enable(e.BLEND),e.blendEquation(e.MAX),e.drawArrays(e.TRIANGLES,0,Ie));const ft=q.title?`${q.title}|${q.artist}`:null;ft&&ft!==D&&(D=ft,Q(q.title,q.artist),Y=E);const lt=E-Y;if(lt<3.2){const _=Math.min(1,lt/.4)*Math.min(1,(3.2-lt)/.8)*.95;e.useProgram(s.p),te(e,s,"uText",S,0),e.uniform1f(s.u.uAmt,_),e.enable(e.BLEND),e.blendEquation(e.MAX);const re=Math.round(oe*.6),X=Math.round(re/4);e.viewport(Math.round((oe-re)/2),Math.round(me*.5-X/2),re,X),e.bindVertexArray(q.quadVao),e.drawArrays(e.TRIANGLES,0,3),e.viewport(0,0,oe,me)}e.blendEquation(e.FUNC_ADD),e.disable(e.BLEND);const Et=dt(h.map.m),Vt=Ge[h.map.from].f,Kt=Ge[h.map.to].f;for(let _=0;_<256;_++){const re=_/255,X=Vt(re,E),le=Et>0?Kt(re,E):X;for(let ce=0;ce<3;ce++)T[_*4+ce]=Math.round(Math.min(1,Math.max(0,X[ce]+(le[ce]-X[ce])*Et))*255);T[_*4+3]=255}return e.bindTexture(e.TEXTURE_2D,w),e.texSubImage2D(e.TEXTURE_2D,0,0,0,256,1,e.RGBA,e.UNSIGNED_BYTE,T),e.bindFramebuffer(e.FRAMEBUFFER,c.fb),e.viewport(0,0,c.w,c.h),e.useProgram(o.p),te(e,o,"uI",r.dst.tex,0),te(e,o,"uMap",w,1),e.bindVertexArray(q.quadVao),e.drawArrays(e.TRIANGLES,0,3),r.swap(),c.tex},debug(P){for(const q of["shape","flow","map","part"])P[q]!=null&&(Object.assign(h[q],{from:P[q],to:P[q],m:1,next:E+1e6}),q==="flow"&&P.params&&(h.flow.pb=P.params));P.keep!=null&&(h.flow.ka=h.flow.kb=P.keep),P.flood&&W(P.flood==="long"),P.cut&&(v=!0)},info(){return`${Le[h.shape.to].name} (M) · ${De[h.flow.to].name} (S) · ${Ge[h.map.to].name} (P)`},dispose(){r&&r.dispose(),c&&c.dispose(),e.deleteBuffer(l),e.deleteVertexArray(d),e.deleteTexture(w),e.deleteTexture(S);for(const P of[a,n,s,o,i])e.deleteProgram(P.p)}}}const un=1400,wt=28,fn=1800,_t=`
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
// Teilchen id, back Sekunden (Teilchen-Uhr) früher
Pt particle(float id, float back){
  Pt q;
  q.id = id;
  vec3 h = hs3(id * .731 + 1.3 + uMode * 3.1);
  vec3 g = hs3(id * 1.917 + 4.1);
  vec3 k = hs3(id * 3.37 + 8.8);
  int m = uSrc > 1.5 ? 2 + int(mod(id, 3.)) : uSrc > .5 ? 0 : int(mod(id, 5.));
  q.life = uLife * (.6 + .8 * h.x);
  float cl = uClock - back;
  q.age = mod(cl + h.y * q.life, q.life);
  q.birth = cl - q.age;
  float kb = 0.;
  for (int i = 0; i < 8; i++) kb += exp(-abs(q.birth - uKicks[i]) * 10.);
  q.burst = min(kb, 1.);
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
  q.band = floor(hs(id * 5.71) * 31.99);
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
`,ln=`#version 300 es
${Xe}
${_t}
uniform float uSegN, uAmt, uW, uMinPx;
uniform vec2 uHalf;         // halbe Bildgrösse in Bildpunkten
out vec3 vc;
out float vW;
void main(){
  int vid = gl_VertexID;
  int pid = vid / (6 * ${wt});
  int r = vid % (6 * ${wt});
  int seg = r / 6;
  int corner = r % 6;
  float e = (corner == 1 || corner == 4 || corner == 5) ? 1. : 0.;
  float side = (corner == 2 || corner == 3 || corner == 5) ? 1. : -1.;
  if (float(seg) >= uSegN) { gl_Position = vec4(0.); vc = vec3(0.); vW = 0.; return; }
  float id = float(pid);
  Pt h = particle(id, 0.);
  float s = float(seg) + e;
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
}`,mn=`#version 300 es
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
}`,hn=`#version 300 es
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
}`,gt=`#version 300 es
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
}`,dn=`#version 300 es
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
}`,pn=ae(`
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
}`),vn=e=>[1,3,5].map(t=>Math.pow(parseInt(e.slice(t,t+2),16)/255,2.2)),et=[{name:"Rosé",c:["#0a0408","#2a0e22","#ff4fd8","#0e0510","#ffe6d2"]},{name:"Nordlicht",c:["#02060c","#082036","#3fa0ff","#020812","#d8f4ff"]},{name:"Glut",c:["#0a0402","#2a1004","#ff7a1a","#100502","#fff0c8"]},{name:"Smaragd",c:["#020a04","#0a2410","#5cff88","#030c06","#eaffd8"]},{name:"Violett",c:["#06020c","#160932","#8a5aff","#060314","#ece2ff"]},{name:"Cover",c:null}],ge=[{name:"Bänder",count:650,seg:28,tail:.065,width:.045,twist:1.8,spin:1.2,spiral:.35,prec:.4,chaos:.3,life:4.6,head:0,ring:0,src:0},{name:"Fäden",count:1300,seg:28,tail:.06,width:.004,twist:0,spin:1.8,spiral:.14,prec:1.2,chaos:.8,life:4.2,head:.45,ring:0,src:0},{name:"Kometen",count:520,seg:14,tail:.045,width:.018,twist:1.5,spin:.9,spiral:.6,prec:.3,chaos:.2,life:4.4,head:1.2,ring:0,src:0},{name:"Strahlen",count:1e3,seg:20,tail:.03,width:.012,twist:2,spin:.12,spiral:1.5,prec:.1,chaos:.1,life:3.4,head:1,ring:0,src:1},{name:"Wirbel",count:420,seg:28,tail:.05,width:.05,twist:2,spin:2.4,spiral:.2,prec:2,chaos:.2,life:5,head:0,ring:0,src:2,gain:.45}],we=[{name:"Überblick",dist:8.2,fov:50,look:0,w:3},{name:"Nah",dist:3.6,fov:55,look:1,w:3},{name:"Mittendrin",dist:1.7,fov:68,look:0,w:2},{name:"Fern",dist:15,fov:42,look:0,w:1}];function xn(e,t){const a=ne(e,dn,ln),n=ne(e,gt,mn),s=ne(e,gt,hn),o=ne(e,pn),i=e.createVertexArray();let r=null,c=0,u=0,f=0,l=0;const d=new Float32Array(8).fill(-99);let p=0,M=0,w=-1,T=1,S=0,R=null;const D=Ne({beats:64,minSec:45,maxSec:100}),Y=Ne({beats:32,minSec:14,maxSec:32}),b=[0,1,2,3,4].map(k=>({p:[0,0,0],e:0,r:k<2?.12:.5})),m=[.6,.48,.38];let z=0;const E={dist:8.2,fov:50,look:[0,0,0],yaw:0,pitch:.15},h={dist:0,fov:0};let x=0;const B=(k,y)=>{if(k===0)return[.35*Math.sin(y*.07),.2*Math.sin(y*.05+1),.35*Math.cos(y*.06)];if(k===1){const L=y*.05+2;return[Math.cos(L)*2.9,1.1*Math.sin(y*.04),Math.sin(L)*2.6]}const g=k-2,H=y*(.08+g*.017)+g*2.1,v=1.8+.45*Math.sin(y*.05+g);return[Math.cos(H)*v,.8*Math.sin(y*(.06+g*.011)+g*1.3),Math.sin(H)*v*.85]},V=()=>{const k=we.reduce((g,H)=>g+H.w,0);let y=z;for(;y===z;){let g=Math.random()*k;for(y=0;g>we[y].w;)g-=we[y++].w}z=y,x=we[y].look?[0,2,3,4][Math.floor(Math.random()*4)]:0},C=(k,y,g,H,v,L,G,F,A)=>{Pe(e,k,y,g),e.uniformMatrix4fv(k.u.uVP,!1,H),k.u.uEye!=null&&e.uniform3fv(k.u.uEye,v),e.uniform4fv(k.u.uMag,b.flatMap(J=>[...J.p,J.r])),e.uniform4fv(k.u.uSphS,L),e.uniform1f(k.u.uClock,u),e.uniform1f(k.u.uLife,G.life),e.uniform1f(k.u.uSpiral,G.spiral),e.uniform1f(k.u.uSpin,G.spin),e.uniform1f(k.u.uPrec,G.prec),e.uniform1f(k.u.uChaos,G.chaos),k.u.uTwist!=null&&e.uniform1f(k.u.uTwist,G.twist),k.u.uTail!=null&&e.uniform1f(k.u.uTail,G.tail),e.uniform1f(k.u.uMode,ge.indexOf(G)),e.uniform1f(k.u.uSrc,G.src),e.uniform1fv(k.u.uKicks,d),e.uniform3fv(k.u.uCol,A),e.uniform1f(k.u.uAmt,F)};return{look:{linear:!0,bloom:.55,scale:1,expo:1},keys:{m:()=>(w=M,M=(M+1)%ge.length,T=0,D.reset(),`Modus: ${ge[M].name}`),p:()=>(S=(S+1)%et.length,`Farben: ${et[S].name}`),k:()=>(V(),Y.reset(),`Kamera: ${we[z].name}`)},help:"M Modus · P Farben · K Kamera",resize(k,y){r&&r.dispose(),r=de(e,k,y,t)},render(k,y){const g=k.dt;if(c+=g,R!==y.seed){R=y.seed,S=Math.floor(y.seed*997)%(et.length-1);const N=Math.floor(y.seed*131)%ge.length;N!==M&&(w=M,M=N,T=0)}D.tick(k,g)&&(w=M,M=(M+1+Math.floor(Math.random()*(ge.length-1)))%ge.length,T=0),T=Math.min(1,T+g/2.5),Y.tick(k,g)&&V(),u+=g*(.55+.45*Math.min(2,k.bassAtt))*(k.playing?1:.25),k.events.kick!==l&&(l=k.events.kick,d[p]=u,p=(p+1)%8,f=1),f*=Math.exp(-g*7);const H=[[0,5],[21,32],[5,12],[12,21],[3,9]];for(let N=0;N<5;N++){const $=b[N];$.p=B(N,c);let I=0;for(let j=H[N][0];j<H[N][1];j++)I+=k.bands[j];I/=H[N][1]-H[N][0],$.e+=(I-$.e)*(1-Math.exp(-g*8)),$.r=(N<2?.12:m[N-2])*(1+.1*$.e)}const v=et[S].c;let L;if(v)L=v.flatMap(vn);else{const N=Array.from({length:5},(j,ue)=>Array.from(y.palette.slice(ue*3,ue*3+3))),$=j=>.2126*j[0]+.7152*j[1]+.0722*j[2],I=N.slice().sort((j,ue)=>$(j)-$(ue));L=[I[0].map(j=>j*.1),I[1].map(j=>j*.25),I[3],I[0].map(j=>j*.1),I[4].map(j=>Math.min(1,j*1.2+.1))].flat()}const G=we[z],F=(N,$,I)=>{const j=-2*I*h[N]-I*I*(E[N]-$);h[N]+=j*g,E[N]+=h[N]*g};F("dist",G.dist,.9),F("fov",G.fov,.9);const A=x?b[x].p:[0,0,0],J=1-Math.exp(-g*.8);E.look=E.look.map((N,$)=>N+(A[$]-N)*J),E.yaw+=g*(.05+.03*Math.min(2,k.midAtt))*(E.dist<3?1.6:1),E.pitch=.18*Math.sin(c*.027)+.06;const ie=Math.cos(E.pitch),Z=[E.look[0]+Math.sin(E.yaw)*ie*E.dist,E.look[1]+Math.sin(E.pitch)*E.dist,E.look[2]+Math.cos(E.yaw)*ie*E.dist],U=E.fov*Math.PI/180,W=Tt(kt(U,y.aspect,.1,80),yt(Z,E.look)),K=1/Math.tan(U/2),Q=(N,$,I)=>{const j=W[0]*N[0]+W[4]*N[1]+W[8]*N[2]+W[12],ue=W[1]*N[0]+W[5]*N[1]+W[9]*N[2]+W[13],ve=W[3]*N[0]+W[7]*N[1]+W[11]*N[2]+W[15];return ve<I?[0,0,-1,0]:[j/ve,ue/ve,ve,$*K/ve]},pe=[2,3,4].flatMap(N=>Q(b[N].p,b[N].r,b[N].r*2.2)),P=[0,1].flatMap(N=>Q(b[N].p,.22+.12*b[N].e,.3)),q=Math.hypot(Z[0]-E.look[0],Z[1]-E.look[1],Z[2]-E.look[2]),O=r.h/2*K*.012;e.bindFramebuffer(e.FRAMEBUFFER,r.fb),e.viewport(0,0,r.w,r.h),e.useProgram(o.p),Pe(e,o,k,y),e.uniform4fv(o.u.uSphS,pe),e.uniform1fv(o.u.uSphE,[b[2].e,b[3].e,b[4].e]),e.uniform4fv(o.u.uLightS,P),e.uniform1fv(o.u.uLightE,[b[0].e,b[1].e*.7]),e.uniform1f(o.u.uNeb,.6),e.uniform4fv(o.u.uCloud,Q([0,0,0],2.6,.3)),e.uniform1f(o.u.uBurst,f*.6),e.uniform3fv(o.u.uCol,L),e.bindVertexArray(y.quadVao),e.drawArrays(e.TRIANGLES,0,3),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE),e.bindVertexArray(i),e.useProgram(s.p),Pe(e,s,k,y),e.uniformMatrix4fv(s.u.uVP,!1,W),e.uniform1f(s.u.uPx,O),e.uniform1f(s.u.uFocus,q),e.uniform1f(s.u.uAmt,1),e.uniform1f(s.u.uDrift,c),e.uniform1f(s.u.uRing,0),e.uniform3fv(s.u.uCol,L),e.uniform4fv(s.u.uSphS,pe),e.drawArrays(e.POINTS,0,fn);const oe=(N,$)=>{if($<=.01)return;const I=ge[N],j=Math.min(un,I.count);e.useProgram(a.p),C(a,k,y,W,Z,pe,I,$*(I.gain||1),L),e.uniform1f(a.u.uSegN,I.seg),e.uniform1f(a.u.uW,I.width),e.uniform1f(a.u.uMinPx,Math.max(.6,r.h/1200)),e.uniform2f(a.u.uHalf,r.w/2,r.h/2),e.drawArrays(e.TRIANGLES,0,j*wt*6),I.head>0&&(e.useProgram(n.p),C(n,k,y,W,Z,pe,I,$*I.head,L),e.uniform1f(n.u.uPx,O),e.uniform1f(n.u.uFocus,q),e.uniform1f(n.u.uRing,I.ring),e.drawArrays(e.POINTS,0,j))},me=T*T*(3-2*T);return w>=0&&me<1&&oe(w,1-me),oe(M,me),e.disable(e.BLEND),e.blendFunc(e.ONE,e.ZERO),r.tex},debug(k){k.mode!=null&&(M=k.mode,w=-1,T=1),k.pal!=null&&(S=k.pal),k.shot!=null&&(z=k.shot,x=we[z].look?2:0,E.dist=we[z].dist,E.fov=we[z].fov)},info(){return`${ge[M].name} (M) · ${et[S].name} (P) · ${we[z].name} (K)`},dispose(){r&&r.dispose(),e.deleteVertexArray(i);for(const k of[a,n,s,o])e.deleteProgram(k.p)}}}const st=new Map;function bn(e){if(!st.has(e)){const t=new Promise((a,n)=>{const s=new Image;s.decoding="async",s.onload=()=>(s.decode?s.decode().catch(()=>{}):Promise.resolve()).then(()=>a(s)),s.onerror=()=>n(new Error("Bild fehlt: "+e)),s.src=Bt("/viz/"+e)});t.catch(()=>st.delete(e)),st.set(e,t)}return st.get(e)}function wn(e,t,{srgb:a=!0,mip:n=!0,repeat:s=!1,nearest:o=!1}={}){const i=e.createTexture();return e.bindTexture(e.TEXTURE_2D,i),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.NONE),e.texImage2D(e.TEXTURE_2D,0,a?e.SRGB8_ALPHA8:e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,t),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),n&&!o&&e.generateMipmap(e.TEXTURE_2D),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,o?e.NEAREST:n?e.LINEAR_MIPMAP_LINEAR:e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,o?e.NEAREST:e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,s?e.REPEAT:e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),i}function rt(e,t){let a="idle",n=null;return{get(){return a==="idle"&&(a="loading",Promise.all(t.map(s=>bn(s.name))).then(s=>{a==="loading"&&(n=s.map((o,i)=>wn(e,o,t[i])),a="ready")}).catch(s=>{console.warn("Visualizer-Bilder:",s&&s.message),a="failed"})),a==="ready"?n:null},get failed(){return a==="failed"},release(){if(n)for(const s of n)e.deleteTexture(s);n=null,a="idle"}}}const Mn=ae(`
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
    // Bühne (Bild): das Neon ist das Hauptlicht. Das Mondlicht wirft Schatten in eine andere
    // Richtung - darum nur schwach und zum Teil weich (unscharfe Stufe: Licht ohne harte Schatten)
    vec2 tuv = rectUV(q);
    float dep = texture(uDep, tuv).r;
    col = texture(uImg, tuv).rgb * .34 + textureLod(uImg, tuv, 5.).rgb * .26;
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
      vec3 isl = b.rgb * .55 + textureLod(uImg, tuv, 5.).rgb * .35 + l * uNeon * (.7 + .55 * uPulse + .2 * min(uBass, 2.));
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
}`),Be=[[1,.32,.03],[.08,.35,1],[.55,.12,1],[1,.05,.22],[.12,1,.2],[.05,.85,1],[1,.1,.8],[1,.78,.05]],He=[{name:"Felsinsel",kind:1,files:["felsinsel_basis.webp","felsinsel_neonlicht.webp"]},{name:"Wüste",kind:2,files:["wueste_basis.webp","wueste_neonlicht.webp","wueste_tiefe.webp"],free:[.5,.59],size:.74,ground:.3},{name:"Ruinen",kind:2,files:["ruinen_basis.webp","ruinen_neonlicht.webp","ruinen_tiefe.webp"],free:[.505,.585],size:.68,ground:.3}],kn="rauch_atlas.webp";function yn(e,t){const a=ne(e,Mn);let n=null,s=[...Be[0]],o=[...Be[0]],i=[...Be[0]],r=1,c=0,u=0,f=0,l=1,d=null;const p=He.map(h=>rt(e,h.files.map(x=>({name:x,srgb:!x.includes("tiefe")})))),M=rt(e,[{name:kn}]);let w=0,T=-1,S=1,R=0;const D=Array.from({length:5},(h,x)=>({x:x/5*2-1,y:0,size:.7,a:0,img:x,v:.01})),Y=(h,x,B,V)=>{h.img=3+Math.floor(Math.random()*5),h.size=.55+Math.random()*.45,h.v=(Math.random()<.5?-1:1)*(.008+Math.random()*.012),h.a=.16+Math.random()*.2,h.x=V?(Math.random()*2-1)*B*.5:h.v>0?-B*.5-h.size*.5:B*.5+h.size*.5,h.yr=Math.random()};D.forEach(h=>Y(h,null,1.78,!0));const b=qe(Be.length),m=Ne({beats:64,minSec:40,maxSec:90}),z=()=>{let h=b.next();h===c&&(h=b.next()),c=h,o=[...s],i=[...Be[c]],r=0},E=()=>{u=f,f=(f+1+Math.floor(Math.random()*4))%5,l=0};return{look:{linear:!0,bloom:.42,scale:1,expo:.95,full:!0},label:"center",keys:{m:()=>(E(),"Form gewechselt"),p:()=>(z(),"Farbe gewechselt"),b:()=>(w=(w+1)%He.length,`Bühne: ${He[w].name}`)},help:"M Form · P Farbe · B Bühne",resize(h,x){n&&n.dispose(),n=de(e,h,x,t)},render(h,x){const B=h.dt;if(d!==x.seed){const U=d===null;d=x.seed;const W=Math.floor(x.seed*97)%5;w=Math.floor(x.seed*61)%He.length,U?(u=f=W,c=Math.floor(x.seed*Be.length),s=[...Be[c]],i=[...s],r=1):W!==f&&(u=f,f=W,l=0)}m.tick(h,B)&&z(),r=Math.min(1,r+B/1.5),l=Math.min(1,l+B/1.2);const V=r*r*(3-2*r);s=o.map((U,W)=>U+(i[W]-U)*V);const C=p[w].get();w!==T&&C&&R===0&&(R=-1),R<0?(S=Math.max(0,S-B/.35),S===0&&(T>=0&&T!==w&&p[T].release(),T=p[w].get()?w:T,R=1)):R>0&&(S=Math.min(1,S+B/.6),S===1&&(R=0));const k=x.aspect,y=T>=0?He[T]:null,g=T>=0?p[T].get():null,H=M.get();let v=g?y.kind:0,L=-.17,G=[0,.1],F=1,A=[0,0,1,1];if(v===1)A=[-.75,-.38,1.5,.5],L=-.34,G=[0,.17],F=.7;else if(v===2){const U=1.7777777777777777,W=Math.max(k,U),K=W/U;A=[-W/2,-K/2,W,K],L=-9,G=[A[0]+y.free[0]*W,A[1]+y.free[1]*K],F=y.size*K}for(const U of D)U.x+=U.v*B,Math.abs(U.x)>k*.5+U.size*.6&&Y(U,y,k,!1);const J=[],ie=[];for(const U of D){const W=v===2?A[1]+A[3]*(y.ground-.12+U.yr*.16):v===1?-.34+U.yr*.26:-.2+U.yr*.15;J.push(U.x,W,U.size,H?U.a*(v===0?.6:1):0),ie.push(U.img)}e.bindFramebuffer(e.FRAMEBUFFER,n.fb),e.viewport(0,0,n.w,n.h),e.useProgram(a.p),Pe(e,a,h,x),e.uniform3fv(a.u.uNeon,s),e.uniform1i(a.u.uShapeA,u),e.uniform1i(a.u.uShapeB,f),e.uniform1f(a.u.uShapeM,l*l*(3-2*l)),e.uniform1f(a.u.uPx,1/n.h),e.uniform1i(a.u.uStage,v),e.uniform1f(a.u.uHZ,L),e.uniform2fv(a.u.uC,G),e.uniform1f(a.u.uSc,F),e.uniform4fv(a.u.uRect,A),e.uniform4fv(a.u.uSmk,J),e.uniform1fv(a.u.uSmkI,ie),e.uniform1f(a.u.uHasSmoke,H?1:0),e.uniform1f(a.u.uFade,S);const Z=(U,W,K)=>{a.u[U]!=null&&(e.activeTexture(e.TEXTURE0+K),e.bindTexture(e.TEXTURE_2D,W),e.uniform1i(a.u[U],K))};return Z("uImg",g?g[0]:null,0),Z("uImgL",g?g[1]:null,1),Z("uDep",g&&g[2]?g[2]:null,2),Z("uSmoke",H?H[0]:null,3),e.activeTexture(e.TEXTURE0),e.bindVertexArray(x.quadVao),e.drawArrays(e.TRIANGLES,0,3),n.tex},info:()=>`${T>=0?He[T].name:"Felsen"} (B)`,debug(h){h.stage!=null&&(w=h.stage)},dispose(){n&&n.dispose();for(const h of p)h.release();M.release(),e.deleteProgram(a.p)}}}const Tn=`#version 300 es
precision mediump float;
in vec3 vc; out vec4 o;
void main(){ float d = length(gl_PointCoord - .5) * 2.; o = vec4(vc * smoothstep(1., .2, d), 1.); }`,Sn=ae(`
uniform sampler2D uPrev; uniform float uDecay;
void main(){ o = vec4(max(texture(uPrev, uv).rgb * uDecay - .002, 0.), 1.); }`),qt=64e3,En=`#version 300 es
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
}`,nt=240,Mt=150,Rn=`#version 300 es
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
  float u = float(ix) / ${nt-1}., v = float(iz) / ${Mt-1}.;
  // Übergang läuft als Welle von vorne nach hinten über die Fläche
  mm = clamp(uMorph * 1.6 - (v * .5 + hash12(vec2(u, v) * 91.) * .1), 0., 1.);
  mm = mm * mm * (3. - 2. * mm);
  vec4 P = pos(u, v);
  vec3 px = pos(u + 1. / ${nt}., v).xyz, pz = pos(u, v + 1. / ${Mt}.).xyz;
  vec3 nrm = normalize(cross(pz - P.xyz, px - P.xyz));
  if (nrm.y < 0.) nrm = -nrm;
  vec4 clip = uVP * vec4(P.xyz, 1.);
  gl_Position = clip;
  gl_PointSize = clamp((2. + 2.5 * P.w) * uPx / clip.w, 1., 6.);
  float light = .18 + .82 * pow(max(0., dot(nrm, normalize(vec3(-.55, .75, -.4)))), 1.5);
  float dist = length(P.xyz - vec3(0., 0., 2.));
  float fade = exp(-max(0., P.z) * .2) * smoothstep(0., .06, v) * smoothstep(1., .9, v);
  vc = mix(vec3(1.), pal(u * .5 + v * .3 + P.w * .3), uTint) * (light * .55 + P.w * 1.4) * fade * .6;
}`;function Nt(e,t,a,n,s){const o=ne(e,Tn,a),i=ne(e,Sn),r=e.createVertexArray();let c=null,u=null,f=0;return{resize(l,d){c&&c.dispose(),u&&u.dispose(),c=Dt(e,l,d,t),u=de(e,l,d,t)},tint(l){f=l},render(l,d,p){return e.bindFramebuffer(e.FRAMEBUFFER,c.dst.fb),e.viewport(0,0,c.dst.w,c.dst.h),e.useProgram(i.p),te(e,i,"uPrev",c.src.tex,0),e.uniform1f(i.u.uDecay,Math.pow(p,l.dt*60)),e.bindVertexArray(d.quadVao),e.drawArrays(e.TRIANGLES,0,3),e.useProgram(o.p),Pe(e,o,l,d),e.uniform1f(o.u.uPx,c.dst.h/240),e.uniform1f(o.u.uTint,f),s(o),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE),e.bindVertexArray(r),e.drawArrays(e.POINTS,0,n),e.disable(e.BLEND),c.swap(),c.src.tex},dispose(){c&&c.dispose(),u&&u.dispose(),e.deleteVertexArray(r),e.deleteProgram(o.p),e.deleteProgram(i.p)}}}const Re=[{name:"Weiss",v:0},{name:"Hauch Farbe",v:.35},{name:"Cover-Farben",v:.85}];function It(e,t,a=6){let n=0,s=0,o=1,i=-1e9,r=0,c=qe(e);const u=Ne({beats:64,minSec:45,maxSec:100}),f=l=>{n=s,s=l,o=0,u.reset()};return{tick(l,d){if(r+=d,u.tick(l,d)&&o>=1&&r-i>120){let p=c.next();p===s&&(p=c.next()),f(p)}return o=Math.min(1,o+d/a),{a:n,b:s,m:o}},next(){return i=r,f((s+1)%e),`Muster: ${t[s]}`},name:()=>t[s],seed(l){s=Math.floor(l*e)%e,n=s,o=1;let d=Math.floor(l*1e6)||1;c=qe(e,()=>(d=d*16807%2147483647)/2147483647),u.reset()}}}function Pn(e,t){let a=0,n=9,s=0,o=0,i=null,r=[0,0,3.4],c=0,u=null,f={a:0,b:0,m:1};const l=It(4,["gefaltet","Stacheln","Ringe","Blüte"]),d=Nt(e,t,En,qt,p=>{e.uniformMatrix4fv(p.u.uVP,!1,i),e.uniform1f(p.u.uRip,n),e.uniform1f(p.u.uRipAmp,s),e.uniform3fv(p.u.uEye,r),e.uniform1i(p.u.uVa,f.a),e.uniform1i(p.u.uVb,f.b),e.uniform1f(p.u.uMorph,f.m)});return{look:{linear:!0,bloom:.45,scale:1},keys:{p:()=>(c=(c+1)%Re.length,d.tint(Re[c].v),`Farbe: ${Re[c].name}`),m:()=>l.next()},resize:(p,M)=>d.resize(p,M),render(p,M){return a+=p.dt,u!==M.seed&&(u=M.seed,l.seed(M.seed)),f=l.tick(p,p.dt),p.events.kick!==o&&(o=p.events.kick,n=0,s=1),n+=p.dt*2.6,s*=Math.exp(-p.dt*1.6),r=[0,.15*Math.sin(a*.07),3.6],i=Tt(kt(40*Math.PI/180,M.aspect,.1,20),yt(r,[0,0,0])),d.render(p,M,0)},info:()=>`${l.name()} (M) · ${Re[c].name} (P)`,dispose:()=>d.dispose()}}const Ft=[[1.25,-1.5,-.2,2.8],[2.7,-.25,-.35,2.3],[2,-.7,-.25,2.4],[.95,-1.25,0,3]];function An(e,t){let a=0,n=9,s=0,o=0,i=null,r=2,c=null,u={a:0,b:0,m:1};const f=It(4,["Stoff","Spirale","Ringe","Landschaft"]),l=Nt(e,t,Rn,nt*Mt,d=>{e.uniformMatrix4fv(d.u.uVP,!1,i),e.uniform1f(d.u.uKickR,n),e.uniform1f(d.u.uKickAmp,s),e.uniform1i(d.u.uVa,u.a),e.uniform1i(d.u.uVb,u.b),e.uniform1f(d.u.uMorph,u.m)});return l.tint(Re[r].v),{look:{linear:!0,bloom:.5,scale:1},keys:{p:()=>(r=(r+1)%Re.length,l.tint(Re[r].v),`Farbe: ${Re[r].name}`),m:()=>f.next()},resize:(d,p)=>l.resize(d,p),render(d,p){a+=d.dt,c!==p.seed&&(c=p.seed,f.seed(p.seed)),u=f.tick(d,d.dt),d.events.kick!==o&&(o=d.events.kick,n=0,s=1),n+=d.dt*2.2,s*=Math.exp(-d.dt*1.4);const M=Ft[u.a],w=Ft[u.b],T=u.m*u.m*(3-2*u.m),S=M.map((Y,b)=>Y+(w[b]-Y)*T),R=Math.sin(a*.05)*.3,D=[R,S[0]+.08*Math.sin(a*.04),S[1]];return i=Tt(kt(50*Math.PI/180,p.aspect,.05,30),yt(D,[R*.3,S[2],S[3]])),l.render(d,p,.45)},info:()=>`${f.name()} (M) · ${Re[r].name} (P)`,dispose:()=>l.dispose()}}function it(e,t,a,{look:n,label:s,keys:o,help:i,info:r,before:c,setup:u,debug:f}){const l=ne(e,a);let d=null;return{look:n,label:s,keys:o,help:i,info:r,debug:f,resize(p,M){d&&d.dispose(),d=de(e,p,M,t)},render(p,M){return c&&c(p,M),e.bindFramebuffer(e.FRAMEBUFFER,d.fb),e.viewport(0,0,d.w,d.h),e.useProgram(l.p),Pe(e,l,p,M),u&&u(l,p,M),e.bindVertexArray(M.quadVao),e.drawArrays(e.TRIANGLES,0,3),d.tex},dispose(){d&&d.dispose(),e.deleteProgram(l.p)}}}const gn=ae(`
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
  for (int i = 0; i < 5; i++) {
    vec2 off = (path(uSpeed + d) - c0 - t0 * d) * .3 / d;
    q = p - off;
    d = rad * shapeR(atan(q.y, q.x)) / max(length(q), 1e-3);
  }
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
    col += mix(pal(s.w), vec3(1.), .45) * g * s.z * 2.2;
  }
  // Kick-Ring: kommt aus der Tiefe auf einen zu
  col += mix(vec3(1.), base, .35) * exp(-abs(z - uRingDepth) * 7.) * uRing * 1.3;
  // Abschnittswechsel: kurzes Aufleuchten
  col += base * uSecFlash * .35;
  // Nebel in der Tiefe, Licht am Ende des Tunnels
  float far = smoothstep(4., 16., d);
  col *= 1. - far;
  col += pal(.1 + uHue) * far * far * (.18 + .5 * min(uBassAtt, 2.) * .5 + uWarp * .35);
  o = vec4(col, 1.);
}`);function Fn(e,t){let a=0,n=0,s=0,o=0,i=0,r=0,c=0,u=0,f=0,l=0,d=1;const p=[6,4,8,3],M=[20,16,24,12];let w=6,T=0,S=0,R=20,D=0,Y=0,b=0,m=0,z=1,E=1,h=0,x=0,B=-99,V=1,C=1,k=0,y=0;const g=Array.from({length:8},()=>({rail:0,z:0,b:0,hue:0})),H=new Float32Array(32),v=Ne({beats:32,minSec:12,maxSec:28}),L=F=>[z*(Math.sin(F*.21)*2.4+Math.sin(F*.083)*1.9),z*(Math.sin(F*.16+1)*1.6+Math.cos(F*.059)*1.2)],G=F=>{h=1;const A=F?[0,1,2,3]:[[0],[1],[2],[3],[4]][Math.floor(Math.random()*5)];for(const J of A)if(J===0)S>.5&&Math.random()<.4?S=0:(w=p[Math.floor(Math.random()*p.length)],S=1);else if(J===1){let ie=R;for(;ie===R;)ie=M[Math.floor(Math.random()*M.length)];R=ie}else J===2?Y=Math.random()<.4?0:(Math.random()<.5?-1:1)*(.5+Math.random()*.7):J===3?m+=.2+Math.random()*.35:J===4&&(f=u,l=u+(Math.random()<.5?-1:1)*Math.PI*2,d=0);E=.7+Math.random()*.8};return it(e,t,gn,{look:{linear:!0,bloom:.7,scale:1},before(F){const A=F.dt;y+=A;const J=(Math.min(3,F.bassAtt)+Math.min(3,F.midAtt))/2;V+=(J-V)*(1-Math.exp(-A/.25)),C+=(J-C)*(1-Math.exp(-A/6)),F.playing&&V>C*1.45&&V>1.15&&y-B>10&&(B=y,x=1,G(!0)),x*=Math.exp(-A/1.3);const ie=F.conf>.4?F.bpm/60*.72:.6+.8*Math.min(2,F.bassAtt);if(a+=A*ie*(1+2.2*x)*(F.playing?1:.15),n+=A*.02*(F.midAtt-.9),F.events.kick!==i&&(i=F.events.kick,s=1,o=a+7),s*=Math.exp(-A*1.8),F.events.onset!==r){r=F.events.onset;const Q=g.reduce((pe,P)=>P.b<pe.b?P:pe,g[0]);Q.rail=Math.floor(Math.random()*R),Q.z=a+10+Math.random()*4,Q.b=.6+.4*Math.min(1,F.onset),Q.hue=b+Math.random()*.4}for(const Q of g)Q.z-=A*(5+6*x),Q.z<a+.3&&(Q.b=0),Q.b*=Math.exp(-A*.35);k+=(.07*Math.min(2,F.bass)-.04-k)*(1-Math.exp(-A*10));const Z=L(a-.05),U=L(a+.05),K=(L(a+1.5)[0]-U[0])/1.45-(U[0]-Z[0])/.1;if(c+=(Math.max(-.85,Math.min(.85,-K*.5))-c)*(1-Math.exp(-A*2)),d<1){d=Math.min(1,d+A/2.6);const Q=d*d*(3-2*d);u=f+(l-f)*Q}v.tick(F,A)&&G(!1),h*=Math.exp(-A/.25),T+=(S-T)*(1-Math.exp(-A*.8)),D+=(Y-D)*(1-Math.exp(-A*.5)),b+=(m-b)*(1-Math.exp(-A*.8)),z+=(E-z)*(1-Math.exp(-A*.25))},setup(F){e.uniform1f(F.u.uSpeed,a),e.uniform1f(F.u.uTwist,n),e.uniform1f(F.u.uRing,s),e.uniform1f(F.u.uRingDepth,o),e.uniform1f(F.u.uRoll,c+u),e.uniform1f(F.u.uSides,w),e.uniform1f(F.u.uPoly,T),e.uniform1f(F.u.uRails,R),e.uniform1f(F.u.uSpiral,D),e.uniform1f(F.u.uSecFlash,h),e.uniform1f(F.u.uWarp,x),e.uniform1f(F.u.uHue,b),e.uniform1f(F.u.uBreath,k),e.uniform1f(F.u.uBend,z),g.forEach((A,J)=>H.set([A.rail,A.z,A.b>.02?A.b:0,A.hue],J*4)),e.uniform4fv(F.u.uSpark,H)},debug(F){F.warp&&(x=1,G(!0)),F.section&&G(!1),F.spin&&(f=u,l=u+Math.PI*2,d=0)}})}const zn=ae(`
uniform float uMove, uSun, uWave, uShoot, uShootY;
uniform vec3 uGrid, uRim, uSunA, uSunB, uSky;
float near(float x){ return abs(fract(x + .5) - .5); }
const float HMAX = 1.9;     // höchster Berg
const float ROAD = 1.15;    // halbe Breite der flachen Mitte (dort keine Berge)
// Landschaft: flache Strasse in der Mitte, Berge an den Seiten; Höhe atmet mit dem Spektrum
float hgt(vec2 p){
  float side = smoothstep(ROAD, 3.6, abs(p.x));
  if (side <= 0.) return 0.;
  float n = gnoise(p * vec2(.26, .19)) * .5 + .5;
  float n2 = gnoise(p * vec2(.8, .6) + 7.) * .5 + .5;
  float b = band(clamp(abs(p.x) / 11., 0., 1.));
  return min(side * (n * 1.15 + n2 * .3) * (.3 + 1.1 * b), HMAX);
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
  float tS = abs(rd.x) > 1e-5 ? ROAD / abs(rd.x) : 1e9;   // ab hier seitlich Berge möglich
  bool hit = false;
  float t = tP;
  if (tS < tEnd) {
    float t0 = tS, t1 = tS;
    for (int i = 0; i < 72; i++) {
      vec3 p = ro + rd * t1;
      float dh = p.y - hgt(p.xz);
      if (dh < 0.) { hit = true; break; }
      t0 = t1;
      if (t1 >= tEnd) break;
      t1 = min(t1 + max(dh * .45, .02 + t1 * .012), tEnd);
    }
    if (hit) {
      // Kante genau suchen (scharfe Bergkämme)
      for (int i = 0; i < 6; i++) {
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
    vec3 ground = uSky * .035 + uGrid * line * (.5 + .45 * uPulse + wave);
    ground += uRim * smoothstep(.5, 1.6, h) * line * .5;               // Bergkämme heller
    ground += uGrid * exp(-t * .5) * .02;
    ground += uSunA * exp(-abs(q.x) * 16.) * smoothstep(-.25, 0., q.y) * .25;  // Sonne spiegelt sich
    // Dunst: die Ferne wird dunkel (die Sonne geht hinter einem dunklen Horizont unter, kein Farbband davor)
    col = mix(ground, uSky * .3 + uSunA * .015, smoothstep(14., FAR, t));
  }
  o = vec4(col, 1.);
}`),tt=[{grid:[1,.08,.75],rim:[.1,.85,1],sunA:[1,.12,.45],sunB:[1,.85,.2],sky:[.35,.03,.28]},{grid:[.05,.85,1],rim:[.9,.3,1],sunA:[1,.35,.1],sunB:[1,.9,.35],sky:[.12,.03,.35]},{grid:[1,.35,.05],rim:[1,.85,.3],sunA:[.9,.08,.2],sunB:[1,.75,.3],sky:[.05,.05,.3]},{grid:[.2,1,.45],rim:[.2,.8,1],sunA:[.1,.6,1],sunB:[.75,1,.9],sky:[.02,.12,.2]}];function Bn(e,t){let a=0,n=-99,s=0,o=0,i=0,r=.35,c=0,u=0,f=1;const l=Ne({beats:64,minSec:45,maxSec:100}),d=(p,M,w)=>p.map((T,S)=>T+(M[S]-T)*w);return it(e,t,zn,{look:{linear:!0,bloom:.45,scale:1},keys:{p:()=>(u=c,c=(c+1)%tt.length,f=0,l.reset(),"Farben gewechselt")},help:"P Farben",before(p){const M=p.conf>.4?p.bpm/60:1.2;a+=p.dt*M*1.1*(p.playing?1:.2),p.events.kick!==s&&(s=p.events.kick,n=a+1.5),n+=p.dt*9,p.events.onset!==o&&(o=p.events.onset,i<=0&&Math.random()<.06&&(i=.001,r=.24+Math.random()*.16)),i>0&&(i=i+p.dt*.9>1?0:i+p.dt*.9),l.tick(p,p.dt)&&(u=c,c=(c+1+Math.floor(Math.random()*(tt.length-1)))%tt.length,f=0),f=Math.min(1,f+p.dt/4)},setup(p,M){e.uniform1f(p.u.uMove,a),e.uniform1f(p.u.uSun,M.pulse),e.uniform1f(p.u.uWave,n),e.uniform1f(p.u.uShoot,i),e.uniform1f(p.u.uShootY,r);const w=tt[u],T=tt[c],S=f*f*(3-2*f);for(const[R,D]of[["uGrid","grid"],["uRim","rim"],["uSunA","sunA"],["uSunB","sunB"],["uSky","sky"]])e.uniform3fv(p.u[R],d(w[D],T[D],S))}})}const Dn=ae(`
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
}`),Ln=ae(`
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
}`);function _n(e,t){const a=[];for(let l=0;l<32;l++){const d=1-2*(l+.5)/32,p=Math.sqrt(1-d*d),M=l*2.39996323;a.push(Math.cos(M)*p,d,Math.sin(M)*p)}const n=ne(e,Dn),s=rt(e,[{name:"studio_rgbe.png",srgb:!1,mip:!1,nearest:!0}]),o=de(e,1024,512,t);e.bindTexture(e.TEXTURE_2D,o.tex),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.REPEAT);const i=new Float32Array(32),r=new Float32Array(32);let c=0;const u=it(e,t,Ln,{look:{linear:!0,bloom:.3,scale:1},before(l,d){c+=l.dt*(.15+.15*Math.min(2,l.midAtt));const p=1-Math.exp(-l.dt/.06),M=1-Math.exp(-l.dt/.3);for(let w=0;w<32;w++){const T=l.bands[w]||0;i[w]+=(T-i[w])*(T>i[w]?p:M),r[w]=Math.pow(Math.max(0,i[w]),1.2)}e.bindFramebuffer(e.FRAMEBUFFER,o.fb),e.viewport(0,0,o.w,o.h),e.useProgram(n.p),Pe(e,n,l,d),e.uniform3fv(n.u.uDir,a),e.uniform1fv(n.u.uB,r),e.bindVertexArray(d.quadVao),e.drawArrays(e.TRIANGLES,0,3)},setup(l,d){const p=c,M=c*.7,w=Math.cos(p),T=Math.sin(p),S=Math.cos(M),R=Math.sin(M);e.uniformMatrix3fv(l.u.uRotM,!1,new Float32Array([w,T*R,-T*S,0,S,R,T,-w*R,w*S])),e.uniform1f(l.u.uR,.9+.08*Math.min(2,d.bassAtt)),e.uniform1f(l.u.uHS,.62),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,o.tex),e.uniform1i(l.u.uSpk,0);const D=s.get();e.uniform1f(l.u.uHasEnv,D?1:0),e.uniform1f(l.u.uEnvRot,.5),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,D?D[0]:null),e.uniform1i(l.u.uEnv,1),e.activeTexture(e.TEXTURE0)}}),f=u.dispose;return u.dispose=()=>{f(),o.dispose(),s.release(),e.deleteProgram(n.p)},u}const qn=ae(`
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
}`),Me=[{name:"Grün",a:[.12,1,.45],b:[.45,.2,1]},{name:"Violett",a:[.55,.25,1],b:[1,.25,.6]},{name:"Rot-Grün",a:[.2,1,.4],b:[1,.15,.15]},{name:"Eisblau",a:[.2,.85,1],b:[.35,.3,1]}];function Nn(e,t){const a=rt(e,[{name:"bergsee_basis.webp"},{name:"bergsee_licht.webp"},{name:"bergsee_wasser.webp",srgb:!1}]);let n=0,s=0,o=0,i=0,r=0,c=0,u=0;const f=[0,0,1,0],l=Array.from({length:4},()=>({x:0,age:9,dir:1,s:0})),d=new Float32Array(16);let p=0,M=0,w=1,T=null,S=null;const R=Ne({beats:64,minSec:45,maxSec:110}),D=(m,z,E)=>m.map((h,x)=>h+(z[x]-h)*E),Y=it(e,t,qn,{look:{linear:!0,bloom:.55,scale:1},keys:{p:()=>(M=p,p=(p+1)%Me.length,w=0,R.reset(),`Farben: ${Me[p].name}`)},help:"P Farben",info:()=>`${Me[p].name} (P)`,before(m,z){if(S=a.get(),T!==z.seed){T=z.seed;const h=Math.floor(z.seed*37)%Me.length;h!==p&&(M=p,p=h,w=0)}const E=Math.min(1,Math.max(0,(Math.min(2.2,(m.bassAtt+m.midAtt)/2)-.75)/.9));if(r+=(E-r)*(1-Math.exp(-m.dt/2.5)),n+=m.dt*(.35+.9*Math.min(2,m.midAtt)+.6*r)*(m.playing?1:.2),m.events.kick!==o){o=m.events.kick,s=Math.min(1.2,s+.45);const h=l.reduce((x,B)=>B.age>x.age?B:x,l[0]);h.dir=Math.random()<.5?-1:1,h.x=-h.dir*(.3+Math.random()*.5)*z.aspect*.5,h.age=0,h.s=.6+.4*Math.min(1,m.kick)}for(const h of l)h.age+=m.dt;if(s*=Math.exp(-m.dt*2.2),m.events.onset!==i&&(i=m.events.onset,c=Math.min(1,c+.5),u<=0&&Math.random()<.05)){u=.001;const h=Math.random()<.5?-1:1,x=-.25-Math.random()*.35;f[0]=-h*(.1+Math.random()*.5)*z.aspect*.5,f[1]=.28+Math.random()*.16,f[2]=h*Math.cos(x),f[3]=Math.sin(x)}c*=Math.exp(-m.dt*1.6),u>0&&(u=u+m.dt*1.1>1?0:u+m.dt*1.1),R.tick(m,m.dt)&&(M=p,p=(p+1+Math.floor(Math.random()*(Me.length-1)))%Me.length,w=0),w=Math.min(1,w+m.dt/5)},setup(m,z,E){const h=1.7777777777777777,x=Math.max(E.aspect,h),B=x/h;e.uniform4f(m.u.uRect,-x/2,-B/2,x,B),e.uniform1f(m.u.uFlow,n),e.uniform1f(m.u.uGlow,s),e.uniform1f(m.u.uAct,r),e.uniform1f(m.u.uFlare,c),e.uniform1f(m.u.uMet,u),e.uniform4fv(m.u.uMetP,f),l.forEach((C,k)=>d.set([C.x,C.age,C.dir,C.age<6?C.s:0],k*4)),e.uniform4fv(m.u.uWaves,d),e.uniform1f(m.u.uPx,1/E.h);const V=w*w*(3-2*w);e.uniform3fv(m.u.uAurA,D(Me[M].a,Me[p].a,V)),e.uniform3fv(m.u.uAurB,D(Me[M].b,Me[p].b,V)),e.uniform1f(m.u.uHas,S?1:0),["uBase","uLight","uWater"].forEach((C,k)=>{m.u[C]!=null&&(e.activeTexture(e.TEXTURE0+k),e.bindTexture(e.TEXTURE_2D,S?S[k]:null),e.uniform1i(m.u[C],k))}),e.activeTexture(e.TEXTURE0)}});Y.debug=m=>{m.act!=null&&(r=m.act),m.met&&(u=.001,f.splice(0,4,-.4,.38,Math.cos(-.35),Math.sin(-.35)))};const b=Y.dispose;return Y.dispose=()=>{b(),a.release()},Y}const In=ae(`
uniform sampler2D uVel, uSrc; uniform vec2 uTexel; uniform float uStep, uDiss;
void main(){
  vec2 p = uv - uStep * texture(uVel, uv).xy * uTexel;
  o = vec4(texture(uSrc, p).rgb / (1. + uDiss * uStep), 1.);
}`),Cn=ae(`
uniform sampler2D uSrc; uniform vec2 uPoint; uniform vec3 uVal; uniform float uRad;
void main(){
  vec2 d = uv - uPoint; d.x *= uAspect;
  o = vec4(texture(uSrc, uv).rgb + uVal * exp(-dot(d, d) / uRad), 1.);
}`),Un=ae(`
uniform sampler2D uVel; uniform vec2 uTexel;
void main(){
  float L = texture(uVel, uv - vec2(uTexel.x, 0.)).y, R = texture(uVel, uv + vec2(uTexel.x, 0.)).y;
  float B = texture(uVel, uv - vec2(0., uTexel.y)).x, T = texture(uVel, uv + vec2(0., uTexel.y)).x;
  o = vec4(.5 * (R - L - T + B), 0., 0., 1.);
}`),Vn=ae(`
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
}`),Kn=ae(`
uniform sampler2D uVel; uniform vec2 uTexel;
void main(){
  vec2 c = texture(uVel, uv).xy;
  float L = texture(uVel, uv - vec2(uTexel.x, 0.)).x, R = texture(uVel, uv + vec2(uTexel.x, 0.)).x;
  float B = texture(uVel, uv - vec2(0., uTexel.y)).y, T = texture(uVel, uv + vec2(0., uTexel.y)).y;
  if (uv.x - uTexel.x < 0.) L = -c.x; if (uv.x + uTexel.x > 1.) R = -c.x;
  if (uv.y - uTexel.y < 0.) B = -c.y; if (uv.y + uTexel.y > 1.) T = -c.y;
  o = vec4(.5 * (R - L + T - B), 0., 0., 1.);
}`),On=ae(`
uniform sampler2D uSrc; uniform float uK;
void main(){ o = vec4(texture(uSrc, uv).rgb * uK, 1.); }`),Hn=ae(`
uniform sampler2D uP, uDiv; uniform vec2 uTexel;
void main(){
  float L = texture(uP, uv - vec2(uTexel.x, 0.)).x, R = texture(uP, uv + vec2(uTexel.x, 0.)).x;
  float B = texture(uP, uv - vec2(0., uTexel.y)).x, T = texture(uP, uv + vec2(0., uTexel.y)).x;
  o = vec4((L + R + B + T - texture(uDiv, uv).x) * .25, 0., 0., 1.);
}`),Wn=ae(`
uniform sampler2D uP, uVel; uniform vec2 uTexel;
void main(){
  float L = texture(uP, uv - vec2(uTexel.x, 0.)).x, R = texture(uP, uv + vec2(uTexel.x, 0.)).x;
  float B = texture(uP, uv - vec2(0., uTexel.y)).x, T = texture(uP, uv + vec2(0., uTexel.y)).x;
  o = vec4(texture(uVel, uv).xy - vec2(R - L, T - B), 0., 1.);
}`),Gn=ae(`
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
}`);function Xn(e,t){const a={advect:ne(e,In),splat:ne(e,Cn),curl:ne(e,Un),vort:ne(e,Vn),div:ne(e,Kn),scale:ne(e,On),pres:ne(e,Hn),grad:ne(e,Wn),show:ne(e,Gn)};let n=null,s=null,o=null,i=1,r=0,c=0,u=-9;const f=(w,T)=>[de(e,w,T,t),de(e,w,T,t)],l=w=>w.reverse();let d=null;const p=(w,T,S)=>{e.bindFramebuffer(e.FRAMEBUFFER,T.fb),e.viewport(0,0,T.w,T.h),e.useProgram(w.p),S(w),e.bindVertexArray(d),e.drawArrays(e.TRIANGLES,0,3)},M=(w,T,S,R,D,Y)=>{p(a.splat,n.vel[1],b=>{te(e,b,"uSrc",n.vel[0].tex,0),e.uniform2f(b.u.uPoint,w,T),e.uniform3f(b.u.uVal,S,R,0),e.uniform1f(b.u.uRad,Y),e.uniform1f(b.u.uAspect,i)}),l(n.vel),p(a.splat,s[1],b=>{te(e,b,"uSrc",s[0].tex,0),e.uniform2f(b.u.uPoint,w,T),e.uniform3fv(b.u.uVal,D),e.uniform1f(b.u.uRad,Y),e.uniform1f(b.u.uAspect,i)}),l(s)};return{look:{linear:!0,bloom:.18,scale:1,expo:.9},resize(w,T){for(const D of[...n?[...n.vel,...n.prs,n.div,n.curl]:[],...s||[],...o?[o]:[]])D.dispose();i=w/T;const S=160,R=Math.round(S*i);n={vel:f(R,S),prs:f(R,S),div:de(e,R,S,t),curl:de(e,R,S,t),w:R,h:S},s=f(w,T),o=de(e,w,T,t)},render(w,T){d=T.quadVao;const S=Math.min(1/30,w.dt);r+=S,e.disable(e.BLEND);const R=[1/n.w,1/n.h],D=T.palette,Y=(m,z)=>[D[m*3]*z,D[m*3+1]*z,D[m*3+2]*z],b=[[0,6],[6,14],[14,22],[22,32]];for(let m=0;m<4;m++){let z=0;for(let C=b[m][0];C<b[m][1];C++)z+=w.bands[C];if(z/=b[m][1]-b[m][0],!w.playing||z<.25)continue;const E=r*(.07+m*.02)+m*Math.PI/2,h=.5+Math.cos(E)*.3,x=.5+Math.sin(E*1.3)*.28,B=E+Math.PI/2,V=140*z*z;M(h,x,Math.cos(B)*V,Math.sin(B)*V,Y(m,.01+.05*z*z),.0018+.0025*z)}if(w.events.kick!==c&&(c=w.events.kick,r-u>2.5)){u=r;const m=Math.random()*Math.PI*2,z=.5+Math.cos(m)*.35,E=.5+Math.sin(m)*.35;M(z,E,-Math.cos(m)*650,-Math.sin(m)*650,Y(Math.floor(Math.random()*5),.16),.007)}p(a.curl,n.curl,m=>{te(e,m,"uVel",n.vel[0].tex,0),e.uniform2fv(m.u.uTexel,R)}),p(a.vort,n.vel[1],m=>{te(e,m,"uVel",n.vel[0].tex,0),te(e,m,"uCurl",n.curl.tex,1),e.uniform2fv(m.u.uTexel,R),e.uniform1f(m.u.uStep,S),e.uniform1f(m.u.uStr,5+4*Math.min(2,w.midAtt))}),l(n.vel),p(a.div,n.div,m=>{te(e,m,"uVel",n.vel[0].tex,0),e.uniform2fv(m.u.uTexel,R)}),p(a.scale,n.prs[1],m=>{te(e,m,"uSrc",n.prs[0].tex,0),e.uniform1f(m.u.uK,.8)}),l(n.prs);for(let m=0;m<20;m++)p(a.pres,n.prs[1],z=>{te(e,z,"uP",n.prs[0].tex,0),te(e,z,"uDiv",n.div.tex,1),e.uniform2fv(z.u.uTexel,R)}),l(n.prs);return p(a.grad,n.vel[1],m=>{te(e,m,"uP",n.prs[0].tex,0),te(e,m,"uVel",n.vel[0].tex,1),e.uniform2fv(m.u.uTexel,R)}),l(n.vel),p(a.advect,n.vel[1],m=>{te(e,m,"uVel",n.vel[0].tex,0),te(e,m,"uSrc",n.vel[0].tex,1),e.uniform2fv(m.u.uTexel,R),e.uniform1f(m.u.uStep,S),e.uniform1f(m.u.uDiss,.7)}),l(n.vel),p(a.advect,s[1],m=>{te(e,m,"uVel",n.vel[0].tex,0),te(e,m,"uSrc",s[0].tex,1),e.uniform2fv(m.u.uTexel,R),e.uniform1f(m.u.uStep,S),e.uniform1f(m.u.uDiss,.55)}),l(s),p(a.show,o,m=>{te(e,m,"uDye",s[0].tex,0),e.uniform2f(m.u.uRes,o.w,o.h)}),o.tex},dispose(){for(const w of[...n.vel,...n.prs,n.div,n.curl,...s,o])w.dispose();for(const w of Object.values(a))e.deleteProgram(w.p)}}}const _e=[{id:"klassik",name:"Klassik",make:cn},{id:"magnet",name:"Magnetfeld",make:xn},{id:"neon",name:"Neon",make:yn},{id:"sphaere",name:"Punktsphäre",make:Pn},{id:"welle",name:"Punktwelle",make:An},{id:"tunnel",name:"Tunnelflug",make:Fn},{id:"tinte",name:"Tinte",make:Xn},{id:"polarlicht",name:"Polarlicht",make:Nn},{id:"synthwave",name:"Synthwave",make:Bn},{id:"ferrofluid",name:"Ferrofluid",make:_n}],jn=ae(`
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
}`),$n=ae(`
uniform sampler2D uSrc; uniform vec2 uPx;
vec3 s(vec2 d){ return texture(uSrc, uv + d * uPx).rgb; }
void main(){
  vec3 c = s(vec2(-1, -1)) + 2. * s(vec2(0, -1)) + s(vec2(1, -1))
         + 2. * s(vec2(-1, 0)) + 4. * s(vec2(0, 0)) + 2. * s(vec2(1, 0))
         + s(vec2(-1, 1)) + 2. * s(vec2(0, 1)) + s(vec2(1, 1));
  o = vec4(c / 16., 1.);
}`),Zn=ae(`
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
}`);function Yn(e){const t=e.getContext("webgl2",{antialias:!1,alpha:!1,preserveDrawingBuffer:!1,powerPreference:"high-performance"});if(!t)throw new Error("WebGL 2 fehlt");const a=!!t.getExtension("EXT_color_buffer_float")||!!t.getExtension("EXT_color_buffer_half_float"),n=t.createBuffer(),s=t.createVertexArray();t.bindVertexArray(s),t.bindBuffer(t.ARRAY_BUFFER,n),t.bufferData(t.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),t.STATIC_DRAW),t.enableVertexAttribArray(0),t.vertexAttribPointer(0,2,t.FLOAT,!1,0,0);const o=ne(t,jn),i=ne(t,$n),r=ne(t,Zn),c=t.createTexture(),u=new Float32Array(512*2);t.bindTexture(t.TEXTURE_2D,c),t.texImage2D(t.TEXTURE_2D,0,t.R32F,512,2,0,t.RED,t.FLOAT,u),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.NEAREST);const f=t.createTexture();t.bindTexture(t.TEXTURE_2D,f),t.texImage2D(t.TEXTURE_2D,0,t.R32F,be,128,0,t.RED,t.FLOAT,new Float32Array(be*128)),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.NEAREST);let l=0,d=0;const p=new Float32Array(be),M=_e.map(y=>y.make(t,a));let w=0,T=0,S=1,R=[];const D={seed:.3,aspect:1,histRow:0,w:1,h:1,palette:new Float32Array(15),audioTex:c,histTex:f,quadVao:s,cover:null,coverPixels:null,coverCanvas:null,title:"",artist:""},Y=y=>[Math.max(32,Math.round(w*(y.look.scale||1))),Math.max(32,Math.round(T*(y.look.scale||1)))],b=()=>{const y=Math.min(window.devicePixelRatio||1,2);e.width=Math.round(e.clientWidth*y)||1,e.height=Math.round(e.clientHeight*y)||1,w=Math.max(64,Math.round(e.width*S)),T=Math.max(64,Math.round(e.height*S)),D.aspect=w/T,t.bindVertexArray(s),t.disable(t.BLEND);for(const v of M)v.resize(...Y(v));for(const v of R)v.dispose();R=[];let g=w,H=T;for(let v=0;v<6;v++)g=Math.max(4,g>>1),H=Math.max(4,H>>1),R.push(de(t,g,H,a))};b();let m=0,z=-1,E=0,h=16,x=performance.now(),B=60;const V=y=>{y!==m&&(z=m,m=y,E=1e-4)},C=(y,g)=>{const H=M[y],[v,L]=Y(H);return D.w=v,D.h=L,t.bindVertexArray(s),t.disable(t.BLEND),H.render(g,D)};return{gl:t,frame:(y,g)=>{t.bindVertexArray(s),t.disable(t.BLEND);for(let K=0;K<be;K++)u[K]=y.bands[K];if(u.set(y.wave,512),t.bindTexture(t.TEXTURE_2D,c),t.texSubImage2D(t.TEXTURE_2D,0,0,0,512,2,t.RED,t.FLOAT,u),d+=y.dt,d>=1/32){d%=1/32,l=(l+1)%128;for(let K=0;K<be;K++)p[K]=y.bands[K]*(y.playing?1:0);t.bindTexture(t.TEXTURE_2D,f),t.texSubImage2D(t.TEXTURE_2D,0,0,l,be,1,t.RED,t.FLOAT,p)}D.histRow=l;const H=C(m,y);let v=null;const L=z;L>=0&&(v=C(L,y),E=Math.min(1,E+y.dt/2.5)),t.bindVertexArray(s),t.disable(t.BLEND);let G=H,[F,A]=Y(M[m]);t.useProgram(o.p);for(let K=0;K<R.length;K++){const Q=R[K];t.bindFramebuffer(t.FRAMEBUFFER,Q.fb),t.viewport(0,0,Q.w,Q.h),te(t,o,"uSrc",G,0),t.uniform2f(o.u.uPx,1/F,1/A),t.uniform1f(o.u.uThresh,K===0?.3:0),t.drawArrays(t.TRIANGLES,0,3),G=Q.tex,F=Q.w,A=Q.h}t.useProgram(i.p),t.enable(t.BLEND),t.blendFunc(t.ONE,t.ONE);for(let K=R.length-2;K>=0;K--){const Q=R[K],pe=R[K+1];t.bindFramebuffer(t.FRAMEBUFFER,Q.fb),t.viewport(0,0,Q.w,Q.h),te(t,i,"uSrc",pe.tex,0),t.uniform2f(i.u.uPx,1/pe.w,1/pe.h),t.drawArrays(t.TRIANGLES,0,3)}t.disable(t.BLEND),t.blendFunc(t.ONE,t.ZERO);const J=M[m].look,ie=v?M[L].look:J,Z=v?E:1,U=(K,Q)=>(ie[K]??Q)+((J[K]??Q)-(ie[K]??Q))*Z;t.bindFramebuffer(t.FRAMEBUFFER,null),t.viewport(0,0,e.width,e.height),t.useProgram(r.p),Pe(t,r,y,D),te(t,r,"uA",v||H,0),te(t,r,"uB",H,1),te(t,r,"uBloom",R[0].tex,2),t.uniform1f(r.u.uMix,v?E:0),t.uniform1f(r.u.uExpo,U("expo",1.1)),t.uniform1f(r.u.uBloomAmt,U("bloom",.5)),t.uniform1f(r.u.uTone,U("linear",1)),t.uniform1f(r.u.uVig,U("vignette",.45)),t.uniform1f(r.u.uFlashAmt,Math.min(.12,y.flash*.1)),t.drawArrays(t.TRIANGLES,0,3),v&&E>=1&&(z=-1,E=0),h+=(g-h)*.05,B=1e3/Math.max(1,h);const W=performance.now();h>22&&S>.5&&W-x>5e3?(S=Math.max(.5,Math.round((S-.1)*10)/10),x=W,b()):h<18&&S<1&&W-x>2e4&&(S=Math.min(1,Math.round((S+.1)*10)/10),x=W,b())},resize:b,setScene:V,get scene(){return m},get fps(){return B},get scale(){return S},current:()=>M[m],setLook(y){for(const g of["palette","seed","title","artist"])y[g]!=null&&(D[g]=y[g]);y.cover!==void 0&&(D.cover=y.cover,D.coverPixels=y.coverPixels||null,D.coverCanvas=y.coverCanvas||null)},dispose(){const y=t.getExtension("WEBGL_lose_context");for(const g of M)g.dispose();for(const g of R)g.dispose();for(const g of[o,i,r])t.deleteProgram(g.p);y&&y.loseContext()}}}const pt=e=>e<=.04045?e/12.92:Math.pow((e+.055)/1.055,2.4);function Jn([e,t,a]){const n=Math.cbrt(.4122214708*e+.5363325363*t+.0514459929*a),s=Math.cbrt(.2119034982*e+.6806995451*t+.1073969566*a),o=Math.cbrt(.0883024619*e+.2817188376*t+.6299787005*a);return[.2104542553*n+.793617785*s-.0040720468*o,1.9779984951*n-2.428592205*s+.4505937099*o,.0259040371*n+.7827717662*s-.808675766*o]}function Qn([e,t,a]){const n=(e+.3963377774*t+.2158037573*a)**3,s=(e-.1055613458*t-.0638541728*a)**3,o=(e-.0894841775*t-1.291485548*a)**3;return[4.0767416621*n-3.3077115913*s+.2309699292*o,-1.2684380046*n+2.6097574011*s-.3413193965*o,-.0041960863*n-.7034186147*s+1.707614701*o].map(i=>Math.max(0,Math.min(1,i)))}const vt=new Float32Array([.25,.12,.9,.55,.15,.85,.1,.5,.95,.15,.85,.6,.95,.35,.45]);function zt(e){let t=2166136261;for(const a of String(e||"x"))t=Math.imul(t^a.charCodeAt(0),16777619);return(t>>>0)%1e5/1e5}function eo(e){return new Promise(t=>{if(!e)return t(null);const a=new Image;a.crossOrigin="anonymous",a.onload=()=>{try{const n=document.createElement("canvas");n.width=n.height=120;const s=n.getContext("2d",{willReadFrequently:!0});s.drawImage(a,0,0,120,120);const o=s.getImageData(0,0,120,120).data,i=document.createElement("canvas");i.width=i.height=512,i.getContext("2d").drawImage(a,0,0,512,512),t({pixels:o,palette:to(o),canvas:i})}catch{t(null)}},a.onerror=()=>t(null),a.src=e})}function to(e){const t=[];for(let i=0;i<e.length;i+=16)t.push(Jn([pt(e[i]/255),pt(e[i+1]/255),pt(e[i+2]/255)]));const a=5,n=[t[Math.floor(t.length/2)]];for(;n.length<a;){let i=null,r=-1;for(const c of t){let u=1/0;for(const f of n)u=Math.min(u,(c[0]-f[0])**2+(c[1]-f[1])**2+(c[2]-f[2])**2);u>r&&(r=u,i=c)}n.push(i)}const s=new Array(a).fill(0);for(let i=0;i<8;i++){const r=n.map(()=>[0,0,0]);s.fill(0);for(const c of t){let u=0,f=1/0;for(let l=0;l<a;l++){const d=n[l],p=(c[0]-d[0])**2+(c[1]-d[1])**2+(c[2]-d[2])**2;p<f&&(f=p,u=l)}s[u]++,r[u][0]+=c[0],r[u][1]+=c[1],r[u][2]+=c[2]}for(let c=0;c<a;c++)s[c]&&(n[c]=r[c].map(u=>u/s[c]))}const o=n.map(([i,r,c],u)=>{let f=Math.hypot(r,c),l=Math.atan2(c,r);f<.03&&(l=4.2+u*.5),f=Math.max(.09,Math.min(.2,f*1.25));const d=Math.max(.62,Math.min(.85,i*.6+.4));return{h:l,rgb:Qn([d,f*Math.cos(l),f*Math.sin(l)])}});return o.sort((i,r)=>i.h-r.h),new Float32Array(o.flatMap(i=>i.rgb))}const We={get(e,t){try{const a=localStorage.getItem("viz."+e);return a==null?t:JSON.parse(a)}catch{return t}},set(e,t){try{localStorage.setItem("viz."+e,JSON.stringify(t))}catch{}}};function so({track:e,onClose:t}){const a=fe.useRef(null),n=fe.useRef(null),s=fe.useRef(null),[o,i]=fe.useState(!0),[r,c]=fe.useState(()=>Math.min(_e.length-1,Math.max(0,We.get("scene",0)))),[u,f]=fe.useState(()=>!!We.get("calm",!1)),[l,d]=fe.useState(()=>!!We.get("auto",!1)),[p,M]=fe.useState(!1),[w,T]=fe.useState(""),[S,R]=fe.useState(""),[D,Y]=fe.useState(null),b=fe.useRef(u),m=fe.useRef(l);b.current=u,m.current=l;const z=h=>{const x=n.current;if(!x)return;const B=(h%_e.length+_e.length)%_e.length;x.setScene(B),c(B),We.set("scene",B),i(!0);const V=x.current().needs;T(V||"")};fe.useEffect(()=>{const h=n.current;if(!h)return;h.setLook({seed:zt(e&&e.id),palette:vt,cover:null,title:e&&e.title||"",artist:e&&e.artist||""});let x=!1;return eo(e&&e.albumId?Ot(e.albumId,640):null).then(B=>{x||!n.current||n.current.setLook({palette:B?B.palette:vt,cover:e&&e.albumId||null,coverPixels:B?B.pixels:null,coverCanvas:B?B.canvas:null})}),()=>{x=!0}},[e&&e.id,e&&e.albumId,!!n.current]),fe.useEffect(()=>{i(!0);let h=setTimeout(()=>i(!1),5e3);const x=()=>{i(!0),clearTimeout(h),h=setTimeout(()=>i(!1),2500)};return window.addEventListener("pointermove",x),()=>{clearTimeout(h),window.removeEventListener("pointermove",x)}},[e&&e.id,r,u,l,w]),fe.useEffect(()=>{const h=x=>{const B=x.key.toLowerCase(),V=n.current;if(B==="escape"||B==="v"&&!x.ctrlKey&&!x.metaKey||B==="t"&&(x.ctrlKey||x.metaKey))t();else if(B==="arrowright"||B==="n")z((V?V.scene:0)+1);else if(B==="arrowleft")z((V?V.scene:0)-1);else if(/^[0-9]$/.test(B)&&(Number(B)||10)<=_e.length)z((Number(B)||10)-1);else if(B==="r")f(C=>(We.set("calm",!C),!C));else if(B==="a")d(C=>(We.set("auto",!C),!C));else if(B==="d")M(C=>!C);else if(V&&V.current().keys&&V.current().keys[B])T(V.current().keys[B]()||"");else return;x.preventDefault(),x.stopPropagation()};return window.addEventListener("keydown",h,!0),()=>window.removeEventListener("keydown",h,!0)},[t]),fe.useEffect(()=>{let h;try{h=Yn(a.current)}catch(A){console.error(A),R(String(A&&A.message||A).split(`
`)[0]);return}n.current=h;const x=Gt();s.current=x;let B=0,V=0;const C=Wt(A=>{B++,V+=(A.frames||[]).length,x.push(A)});h.setLook({seed:zt(e&&e.id),palette:vt,title:e&&e.title||"",artist:e&&e.artist||""}),h.setScene(r),T(h.current().needs||"");let k=0,y=performance.now(),g=performance.now(),H=performance.now();const v=A=>{const J=A-y,ie=Math.min(.1,J/1e3);y=A;const Z=x.update(ie);b.current&&(Z.flash=0,Z.kick*=.35,Z.pulse*=.35),m.current&&Z.playing&&(A-g)/1e3>180&&(Z.conf<.4||Z.phase<.08)&&(g=A,z(h.scene+1));try{h.frame(Z,J)}catch(U){console.error(U)}if(A-H>500){const U=(A-H)/1e3;Y({fps:h.fps,scale:h.scale,msg:B/U,frames:V/U,bpm:Z.bpm,conf:Z.conf,playing:Z.playing,kicks:Z.events.kick,int:Z.intensity,bands:Array.from(Z.bands),info:h.current().info?h.current().info():""}),B=0,V=0,H=A}k=requestAnimationFrame(v)};k=requestAnimationFrame(v);const L=()=>h.resize();window.addEventListener("resize",L);const G=A=>{A.preventDefault(),R("Die Grafikkarte hat den Visualizer beendet – bitte nochmals öffnen.")},F=a.current;return F.addEventListener("webglcontextlost",G),()=>{cancelAnimationFrame(k),window.removeEventListener("resize",L),F.removeEventListener("webglcontextlost",G),C(),h.dispose(),n.current=null}},[]);const E=n.current&&n.current.current().label==="center";return se.jsxs("div",{className:"fixed inset-0 z-[70] bg-black",onClick:t,style:{cursor:o?"default":"none"},children:[se.jsx("canvas",{ref:a,className:"absolute inset-0 h-full w-full"}),S&&se.jsxs("div",{className:"absolute inset-0 grid place-items-center p-8 text-center text-sm text-zinc-400",children:["Visualizer geht hier nicht: ",S]}),E&&e&&se.jsxs("div",{className:"pointer-events-none absolute inset-x-0 top-[66%] text-center",style:{textShadow:"0 0 18px rgba(0,0,0,.8)"},children:[se.jsx("div",{className:"truncate px-8 text-2xl font-bold text-white sm:text-3xl",children:e.artist}),se.jsx("div",{className:"mt-1 truncate px-8 text-base text-zinc-200 sm:text-lg",children:e.title})]}),se.jsxs("div",{className:"pointer-events-none absolute bottom-8 left-8 max-w-[80vw] transition-opacity duration-700 "+(o?"opacity-100":"opacity-0"),children:[e&&!E&&se.jsxs(se.Fragment,{children:[se.jsx("div",{className:"truncate text-2xl font-bold text-white drop-shadow-lg",children:e.title}),se.jsx("div",{className:"truncate text-lg text-zinc-300 drop-shadow",children:e.artist})]}),se.jsxs("div",{className:"mt-2 text-xs text-zinc-400 drop-shadow",children:[se.jsxs("span",{className:"text-zinc-100",children:[r+1," ",_e[r].name]}),D&&D.info?` · ${D.info}`:"",l?" · wechselt automatisch (A)":"",u?" · ruhig (R)":""]}),se.jsxs("div",{className:"mt-0.5 text-[11px] text-zinc-500 drop-shadow",children:["1–9, 0 / ← → Stil · ",n.current&&n.current.current().help||"M Muster · P Farben"," · A automatisch · R ruhig · D Diagnose · Esc schliessen"]}),w&&se.jsx("div",{className:"mt-1 text-xs text-amber-300 drop-shadow",children:w})]}),p&&D&&se.jsxs("div",{className:"pointer-events-none absolute right-4 top-4 w-72 rounded-xl bg-black/70 p-3 font-mono text-[11px] leading-5 text-zinc-300",children:[se.jsxs("div",{children:["Bild: ",D.fps.toFixed(0)," fps · Auflösung ",Math.round(D.scale*100)," %"]}),se.jsxs("div",{children:["Daten: ",D.msg.toFixed(0)," Pakete/s · ",D.frames.toFixed(0)," Frames/s ",D.playing?"":"· (keine Musik)"]}),se.jsxs("div",{children:["Tempo: ",D.bpm?`${D.bpm.toFixed(1)} BPM`:"–"," · sicher ",Math.round(D.conf*100)," % · Kicks ",D.kicks]}),se.jsxs("div",{children:["Spannung: ",Math.round(D.int*100)," %"]}),se.jsx("div",{className:"mt-1 flex h-10 items-end gap-px",children:D.bands.map((h,x)=>se.jsx("span",{className:"flex-1 bg-accent/80",style:{height:`${Math.min(100,h*80)}%`}},x))})]})]})}export{so as default};
