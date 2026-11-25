import{u as Bt,r as fe,c as Wt,j as ie}from"./index-JtQC8hmL.js";const ve=32,Ot=.07;function Xt(e){let t=!1,a=null;return(async()=>{for(;!t;){try{a=new AbortController;const s=await fetch(Bt("/api/player/viz",!0),{signal:a.signal,cache:"no-store"});if(!s.ok||!s.body)throw new Error(`Fehler ${s.status}`);const n=s.body.getReader(),i=new TextDecoder;let r="";for(;;){const{value:c,done:f}=await n.read();if(f||t)break;r+=i.decode(c,{stream:!0});let u;for(;(u=r.indexOf(`

`))>=0;){const l=r.slice(0,u);if(r=r.slice(u+2),l.startsWith("data: "))try{e(JSON.parse(l.slice(6)))}catch{}}}}catch{}t||await new Promise(s=>setTimeout(s,800))}})(),()=>{t=!0,a&&a.abort()}}function jt(){const e=[];let t=null,a=new Float32Array(512),o={bpm:0,conf:0,beat0:0,int:0,playing:!1},s=0;const n={t:0,dt:0,playing:!1,bands:new Float32Array(ve),db:new Float32Array(ve),wave:new Float32Array(512),waveRaw:new Float32Array(512),beats:0,bass:1,mid:1,treb:1,bassAtt:1,midAtt:1,trebAtt:1,kick:0,onset:0,pulse:0,flash:0,phase:0,beatIndex:0,conf:0,bpm:0,intensity:0,rms:0,centroid:0,lowClock:0,midClock:0,highClock:0,events:{kick:0,onset:0}},i=[0,0,0],r=[0,0,0],c=[0,0,0];let f=0;const u=new Float32Array(ve).fill(-90);let l=-90,m=-9,h=-9,x=-9,A=0,B=0,P=0,D=.05;const C=v=>{const y=performance.now()/1e3-v.now;t=t==null?y:Math.min(y,t+.002);for(const d of v.frames||[])(!e.length||d.at>e[e.length-1].at)&&e.push(d);for(;e.length>600;)e.shift();v.wave&&(a=Float32Array.from(v.wave)),o={bpm:v.bpm||0,conf:v.conf||0,beat0:v.beat0||0,int:v.int||0,playing:!!v.playing}},te=(v,U)=>Math.pow(v,U*30);return{push:C,update:v=>{const U=performance.now()/1e3;n.dt=v,n.t+=v,n.playing=o.playing&&e.length>0;const y=t==null?0:U-t-Ot;let d=e.findIndex(p=>p.at>y),M=null;if(e.length){if(d===-1)M={f0:e[e.length-1],f1:e[e.length-1],k:0};else if(d===0)M={f0:e[0],f1:e[0],k:0};else{const p=e[d-1],g=e[d];M={f0:p,f1:g,k:Math.min(1,Math.max(0,(y-p.at)/Math.max(.001,g.at-p.at)))}}y-e[e.length-1].at>.5&&(M=null)}if(M){for(const p of e)if(!(p.at<=s)){if(p.at>y)break;p.k&&(n.events.kick++,m=n.t),p.on&&(n.events.onset++,h=n.t)}}const V=[];if(M)for(const p of e)p.at>s&&p.at<=y&&V.push(p);s=y;const Z=(p,g,O)=>p+(g-p)*O;let j=-90;for(let p=0;p<ve;p++){let g=-100;if(M){g=Z(M.f0.b[p],M.f1.b[p],M.k);for(const O of V)g=Math.max(g,O.b[p])}n.db[p]=g,u[p]=g>u[p]?g:Math.max(-90,u[p]-5*v),j=Math.max(j,u[p])}l=j>l?j:Math.max(-90,l-5*v);for(let p=0;p<ve;p++){const g=n.db[p],O=.6*u[p]+.4*l,z=Math.min(1,Math.max(0,(g+82)/12)),R=Math.min(1.15,Math.max(0,1+(g-O)/28))*z,q=R>n.bands[p]?1-Math.exp(-v*30):1-Math.exp(-v*8);n.bands[p]+=(R-n.bands[p])*q}for(let p=0;p<3;p++){let g=M?Z(M.f0.bmt[p],M.f1.bmt[p],M.k):0;for(const q of V)g=Math.max(g,q.bmt[p]);i[p]=g;const O=i[p]>r[p],z=te(O?.2:.5,v);r[p]=r[p]*z+i[p]*(1-z);const R=te(f<50?.9:.992,v);c[p]=c[p]*R+i[p]*(1-R)}M&&(f+=v*30);const b=(p,g)=>c[g]>1e-5?Math.min(3,p/c[g]):0;if(n.bass=b(i[0],0),n.mid=b(i[1],1),n.treb=b(i[2],2),n.bassAtt=b(r[0],0),n.midAtt=b(r[1],1),n.trebAtt=b(r[2],2),n.bpm=o.bpm,n.conf=o.conf,n.playing&&(n.beats+=v*(o.conf>.4&&o.bpm>40?o.bpm:120)/60),o.bpm>0&&o.conf>.3&&t!=null){const p=60/o.bpm,g=(y-o.beat0)/p;n.phase=(g%1+1)%1,n.beatIndex=Math.floor(g)}else n.phase=(n.phase+v*2)%1;n.kick=Math.exp(-(n.t-m)/.14),n.onset=Math.exp(-(n.t-h)/.09),n.pulse=n.conf>.45?Math.exp(-(n.phase*60)/Math.max(40,n.bpm)/.12)*(n.playing?1:0):n.kick,m===n.t&&n.t-x>.34&&(x=n.t),n.flash=Math.exp(-(n.t-x)/.12);const k=1-Math.exp(-v*1.2);A+=((n.playing?o.int:0)-A)*(1-Math.exp(-v*.5)),B+=((M?Z(M.f0.rms,M.f1.rms,M.k):0)-B)*k,P+=((M?Z(M.f0.c,M.f1.c,M.k):P)-P)*k,n.intensity=A,n.rms=B,n.centroid=P,n.lowClock+=v*(.25+.9*Math.min(2,n.bassAtt)),n.midClock+=v*(.25+.9*Math.min(2,n.midAtt)),n.highClock+=v*(.25+.9*Math.min(2,n.trebAtt));let L=0;for(let p=0;p<512;p++)L=Math.max(L,Math.abs(a[p]));D=Math.max(L,D*Math.exp(-v*.4),.02);const S=1-Math.exp(-v*30);for(let p=0;p<512;p++){const g=n.playing?a[p]/D:0;n.wave[p]+=(g-n.wave[p])*S,n.waveRaw[p]=g}return n},A:n}}const Zt=`#version 300 es
in vec2 p; out vec2 uv;
void main(){ uv = p * 0.5 + 0.5; gl_Position = vec4(p, 0.0, 1.0); }`,je=`
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
`;function ue(e,t,a=Zt){const o=e.createProgram();for(const[i,r]of[[e.VERTEX_SHADER,a],[e.FRAGMENT_SHADER,t]]){const c=e.createShader(i);if(e.shaderSource(c,r),e.compileShader(c),!e.getShaderParameter(c,e.COMPILE_STATUS)){const f=e.getShaderInfoLog(c);throw new Error("Shader: "+f+`
`+r.split(`
`).map((u,l)=>`${l+1}: ${u}`).join(`
`).slice(0,4e3))}e.attachShader(o,c)}if(e.bindAttribLocation(o,0,"p"),e.linkProgram(o),!e.getProgramParameter(o,e.LINK_STATUS))throw new Error(e.getProgramInfoLog(o));const s={},n=e.getProgramParameter(o,e.ACTIVE_UNIFORMS);for(let i=0;i<n;i++){const r=e.getActiveUniform(o,i).name.replace(/\[0\]$/,"");s[r]=e.getUniformLocation(o,e.getActiveUniform(o,i).name)}return{p:o,u:s}}const me=e=>`#version 300 es
${je}
in vec2 uv; out vec4 o;
${e}`;function ke(e,t,a,o,s=!0,n=!1){const i=e.createTexture();e.bindTexture(e.TEXTURE_2D,i),n?e.texImage2D(e.TEXTURE_2D,0,e.RGBA32F,t,a,0,e.RGBA,e.FLOAT,null):o?e.texImage2D(e.TEXTURE_2D,0,e.RGBA16F,t,a,0,e.RGBA,e.HALF_FLOAT,null):e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,t,a,0,e.RGBA,e.UNSIGNED_BYTE,null);const r=s?e.LINEAR:e.NEAREST;e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,r),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,r),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE);const c=e.createFramebuffer();return e.bindFramebuffer(e.FRAMEBUFFER,c),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,i,0),e.clearColor(0,0,0,1),e.clear(e.COLOR_BUFFER_BIT),{tex:i,fb:c,w:t,h:a,dispose:()=>(e.deleteTexture(i),e.deleteFramebuffer(c))}}function Lt(e,t,a,o){let s=ke(e,t,a,o),n=ke(e,t,a,o);return{get src(){return s},get dst(){return n},swap(){const i=s;s=n,n=i},dispose(){s.dispose(),n.dispose()}}}function ge(e,t,a,o){const s=t.u,n=(i,r)=>s[i]!=null&&e.uniform1f(s[i],r);n("uT",a.t),n("uDt",a.dt),n("uBass",a.bass),n("uMid",a.mid),n("uTreb",a.treb),n("uBassAtt",a.bassAtt),n("uMidAtt",a.midAtt),n("uTrebAtt",a.trebAtt),n("uPulse",a.pulse),n("uKick",a.kick),n("uOnset",a.onset),n("uFlash",a.flash),n("uPhase",a.phase),n("uConf",a.conf),n("uInt",a.intensity),n("uRms",a.rms),n("uCen",a.centroid),n("uLowClk",a.lowClock),n("uMidClk",a.midClock),n("uHighClk",a.highClock),n("uSeed",o.seed),n("uAspect",o.aspect),n("uHistRow",o.histRow),s.uRes!=null&&e.uniform2f(s.uRes,o.w,o.h),s.uPal!=null&&e.uniform3fv(s.uPal,o.palette),s.uAudio!=null&&(e.activeTexture(e.TEXTURE6),e.bindTexture(e.TEXTURE_2D,o.audioTex),e.uniform1i(s.uAudio,6)),s.uHist!=null&&(e.activeTexture(e.TEXTURE7),e.bindTexture(e.TEXTURE_2D,o.histTex),e.uniform1i(s.uHist,7)),e.activeTexture(e.TEXTURE0)}function xe(e,t,a,o,s){t.u[a]!=null&&(e.activeTexture(e.TEXTURE0+s),e.bindTexture(e.TEXTURE_2D,o),e.uniform1i(t.u[a],s),e.activeTexture(e.TEXTURE0))}function kt(e,t,a,o){const s=1/Math.tan(e/2),n=1/(a-o);return new Float32Array([s/t,0,0,0,0,s,0,0,0,0,(o+a)*n,-1,0,0,2*o*a*n,0])}function yt(e,t,a=[0,1,0]){let o=e[0]-t[0],s=e[1]-t[1],n=e[2]-t[2],i=Math.hypot(o,s,n)||1;o/=i,s/=i,n/=i;let r=a[1]*n-a[2]*s,c=a[2]*o-a[0]*n,f=a[0]*s-a[1]*o;i=Math.hypot(r,c,f)||1,r/=i,c/=i,f/=i;const u=s*f-n*c,l=n*r-o*f,m=o*c-s*r;return new Float32Array([r,u,o,0,c,l,s,0,f,m,n,0,-(r*e[0]+c*e[1]+f*e[2]),-(u*e[0]+l*e[1]+m*e[2]),-(o*e[0]+s*e[1]+n*e[2]),1])}function St(e,t){const a=new Float32Array(16);for(let o=0;o<4;o++)for(let s=0;s<4;s++){let n=0;for(let i=0;i<4;i++)n+=e[i*4+s]*t[o*4+i];a[o*4+s]=n}return a}const qt=`
vec3 hash33(vec3 p){ p = fract(p * vec3(.1031, .1030, .0973)); p += dot(p, p.yxz + 33.33); return fract((p.xxy + p.yxx) * p.zyx) * 2. - 1.; }
float noise3d(vec3 p){
  vec3 i = floor(p), f = fract(p); vec3 u = f * f * (3. - 2. * f);
  return mix(mix(mix(dot(hash33(i), f), dot(hash33(i + vec3(1,0,0)), f - vec3(1,0,0)), u.x),
                 mix(dot(hash33(i + vec3(0,1,0)), f - vec3(0,1,0)), dot(hash33(i + vec3(1,1,0)), f - vec3(1,1,0)), u.x), u.y),
             mix(mix(dot(hash33(i + vec3(0,0,1)), f - vec3(0,0,1)), dot(hash33(i + vec3(1,0,1)), f - vec3(1,0,1)), u.x),
                 mix(dot(hash33(i + vec3(0,1,1)), f - vec3(0,1,1)), dot(hash33(i + vec3(1,1,1)), f - vec3(1,1,1)), u.x), u.y), u.z); }
float fbm3d(vec3 p){ float s = 0., a = .5; for (int i = 0; i < 4; i++) { s += a * noise3d(p); p = p * 2.02 + 17.1; a *= .5; } return s; }
`;function Ne(e,t=Math.random){let a=[],o=-1;return{next(){if(!a.length){a=Array.from({length:e},(s,n)=>n);for(let s=e-1;s>0;s--){const n=Math.floor(t()*(s+1));[a[s],a[n]]=[a[n],a[s]]}e>1&&a[0]===o&&a.push(a.shift())}return o=a.shift(),o}}}function Ie({beats:e=64,minSec:t=45,maxSec:a=100}={}){let o=0,s=null;return{tick(n,i){if(!n.playing)return!1;o+=i;const r=Math.floor(n.beats/e),c=s!==null&&r!==s;return s=r,c&&o>=t||o>=a?(o=0,!0):!1},reset(){o=0}}}const Le=[{name:"Sog",grain:.5,keep:.989},{name:"Wirbel",grain:.3,keep:.991},{name:"Spiralarme",grain:.4,keep:.99},{name:"Wellenringe",grain:.2,keep:.99},{name:"Kaleidoskop",grain:.3,keep:.992},{name:"Spiegelkreuz",grain:.4,keep:.991},{name:"Kacheln",grain:.2,keep:.993},{name:"Marmor",grain:.1,keep:.994},{name:"Strahlen",grain:1.6,keep:.988},{name:"Horizont",grain:.6,keep:.989},{name:"Vorhang",grain:.7,keep:.989},{name:"Breitzug",grain:.7,keep:.989},{name:"Raute",grain:.5,keep:.991},{name:"Kachelspiegel",grain:.2,keep:.993},{name:"Scherwellen",grain:.2,keep:.991},{name:"Linse",grain:.4,keep:.99},{name:"Doppelwirbel",grain:.3,keep:.992},{name:"Achsenkreuz",grain:.8,keep:.989},{name:"Wellenstrahlen",grain:.4,keep:.99},{name:"Kreisel",grain:.3,keep:.991},{name:"Aufwind",grain:.3,keep:.991},{name:"Fasern",grain:1.4,keep:.988},{name:"Seitenspiegel",grain:.4,keep:.991},{name:"Wabe",grain:.3,keep:.991},{name:"Strahlenkranz",grain:1.2,keep:.99},{name:"Drift",grain:.3,keep:.993},{name:"Zoom",grain:.6,keep:.991}],$t=`
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
`,Me=e=>[parseInt(e.slice(1,3),16)/255,parseInt(e.slice(3,5),16)/255,parseInt(e.slice(5,7),16)/255],bt=(e,t,a)=>[e[0]+(t[0]-e[0])*a,e[1]+(t[1]-e[1])*a,e[2]+(t[2]-e[2])*a],ae=e=>{const t=e.map(([a,o])=>[a,Me(o)]);return a=>{if(a<=t[0][0])return t[0][1];for(let o=1;o<t.length;o++)if(a<=t[o][0]){const s=(a-t[o-1][0])/Math.max(1e-6,t[o][0]-t[o-1][0]);return bt(t[o-1][1],t[o][1],s)}return t[t.length-1][1]}},Yt=(e,t,a)=>{e=(e%1+1)%1;const o=Math.floor(e*6),s=e*6-o,n=a*(1-t),i=a*(1-s*t),r=a*(1-(1-s)*t);return[[a,i,n,n,r,a][o%6],[r,a,a,i,n,n][o%6],[n,n,r,a,a,i][o%6]]},st=(e,t,a,o=8)=>(s,n)=>{const i=e(s,n),r=1-a*Math.pow(.5+.5*Math.cos(s*Math.PI*2*t),o);return[i[0]*r,i[1]*r,i[2]*r]},Xe=[{name:"Tiefsee",f:ae([[0,"#000000"],[.12,"#000a3a"],[.35,"#0029c8"],[.6,"#1f9cff"],[.82,"#a8e6ff"],[1,"#ffffff"]])},{name:"Nachtblau",f:ae([[0,"#02020a"],[.2,"#0b0b3c"],[.45,"#3a3a9a"],[.7,"#9f9fe6"],[.9,"#e6e6ff"],[1,"#ffffff"]])},{name:"Kupfer",f:st(ae([[0,"#000000"],[.2,"#2a1205"],[.45,"#b5571a"],[.7,"#ff9a3c"],[.86,"#ffe0b8"],[1,"#ffffff"]]),3,.75)},{name:"Himmel",f:ae([[0,"#2f7be8"],[.18,"#4f95f4"],[.36,"#8a1048"],[.55,"#4a0020"],[.78,"#8fd0ff"],[1,"#ffffff"]])},{name:"Eis",f:ae([[0,"#4fd3ff"],[.3,"#1f86e0"],[.55,"#0a3fa0"],[.8,"#08164a"],[1,"#000000"]])},{name:"Ultramarin",f:ae([[0,"#050540"],[.3,"#1a1a9a"],[.6,"#5555ff"],[.85,"#c8c8ff"],[1,"#ffffff"]])},{name:"Amethyst",f:ae([[0,"#0a000f"],[.25,"#3a0a55"],[.5,"#8a2ad0"],[.75,"#d79bff"],[1,"#ffffff"]])},{name:"Feuerpink",f:ae([[0,"#000000"],[.2,"#3a0010"],[.4,"#c0103a"],[.6,"#ff4f7a"],[.75,"#ff9a3a"],[.9,"#ffe3c4"],[1,"#ffffff"]])},{name:"Lagune",f:st(ae([[0,"#062a33"],[.5,"#2fa6bf"],[1,"#d8faff"]]),5,.9)},{name:"Pflaume",f:ae([[0,"#120412"],[.3,"#4a1e4a"],[.6,"#a06aa0"],[.85,"#ecd2ec"],[1,"#ffffff"]])},{name:"Fahne",f:e=>{const t=[Me("#3a00a8"),Me("#c8102e"),Me("#ffffff"),Me("#2050ff")],a=e*6,o=Math.floor(a);return bt(t[o%4],t[(o+1)%4],a-o)}},{name:"Schiefer",f:ae([[0,"#000000"],[.3,"#1a2440"],[.6,"#4a5e9a"],[.85,"#9fb2e6"],[1,"#e8eeff"]])},{name:"Flamme",f:ae([[0,"#000000"],[.15,"#300000"],[.35,"#a01000"],[.55,"#ff5a00"],[.75,"#ffb000"],[.9,"#fff0a0"],[1,"#ffffff"]])},{name:"Indigo",f:ae([[0,"#000000"],[.2,"#10083a"],[.45,"#3a1ea0"],[.65,"#6a50e0"],[.85,"#b8a8ff"],[1,"#ffffff"]])},{name:"Gletscher",f:ae([[0,"#ffffff"],[.2,"#c0f4ff"],[.45,"#30c0e8"],[.7,"#1060c0"],[.85,"#0a3a6a"],[1,"#04262a"]])},{name:"Rosa & Mint",f:ae([[0,"#000000"],[.25,"#1e5a4a"],[.45,"#5ab49a"],[.6,"#c0507a"],[.8,"#ff9ac0"],[1,"#ffffff"]])},{name:"Neonblau",f:ae([[0,"#000000"],[.3,"#0010ff"],[.55,"#0080ff"],[.8,"#80e8ff"],[1,"#ffffff"]])},{name:"Magenta",f:ae([[0,"#2a2aff"],[.3,"#6a20ff"],[.55,"#ff2ad0"],[.8,"#ffa0f0"],[1,"#ffffff"]])},{name:"Creme",f:st(ae([[0,"#0a0c08"],[.4,"#3a3a2a"],[.7,"#c8c09a"],[.9,"#fff8e0"],[1,"#ffffff"]]),7,.35,4)},{name:"Chrom",f:ae([[0,"#000000"],[.15,"#10123a"],[.3,"#e8e8ff"],[.45,"#20224a"],[.6,"#ffffff"],[.75,"#2a2c5a"],[.9,"#f0f0ff"],[1,"#ffffff"]])},{name:"Wolken",f:ae([[0,"#f4f6ff"],[.3,"#f0d0d8"],[.55,"#c08a9a"],[.75,"#6a3a4a"],[.9,"#2a1418"],[1,"#000000"]])},{name:"Terrakotta",f:st(ae([[0,"#0e3a40"],[.25,"#2a6a70"],[.4,"#7a2a10"],[.6,"#c85a2a"],[.8,"#ffc890"],[1,"#ffffff"]]),4,.5)},{name:"Ultraviolett",f:ae([[0,"#000000"],[.25,"#0a0aa0"],[.45,"#8a10ff"],[.65,"#ff40e0"],[.85,"#ffc0f8"],[1,"#ffffff"]])},{name:"Regenbogen",f:(e,t)=>e<.015?[0,0,0]:Yt(e*1.5+t*.03,.9,Math.min(1,.35+e*2))},{name:"Sand",f:ae([[0,"#ead2b0"],[.4,"#c49a6a"],[.7,"#6a4422"],[1,"#1a0e04"]])},{name:"Smaragd",f:ae([[0,"#000000"],[.25,"#003a1a"],[.5,"#00a050"],[.75,"#8cff8c"],[1,"#ffffff"]])},{name:"Gold",f:ae([[0,"#000000"],[.25,"#2a1a00"],[.5,"#a06a10"],[.75,"#ffd070"],[1,"#ffffff"]])},{name:"Lila Grund",f:ae([[0,"#2a1478"],[.25,"#3c22a8"],[.5,"#7a5cf0"],[.75,"#c8b8ff"],[1,"#ffffff"]])},{name:"Zitrone",f:ae([[0,"#f4b000"],[.25,"#f2c800"],[.5,"#c8d820"],[.75,"#4aa040"],[1,"#0a3a14"]])},{name:"Wiese",f:ae([[0,"#3cc050"],[.3,"#2a9a3a"],[.6,"#0e5a1e"],[.85,"#06300e"],[1,"#d8ffd0"]])},{name:"Streifen",f:e=>{if(e<.02)return[0,0,0];const t=[Me("#0a0402"),Me("#b02a14"),Me("#f08a5a"),Me("#f6e2c0"),Me("#8a8478")],a=e*10,o=Math.floor(a),s=a-o;return bt(t[o%5],t[(o+1)%5],s*s*(3-2*s))}}],he=Math.PI*2,pe=(e,t,a)=>[e*Math.cos(a)-t*Math.sin(a),e*Math.sin(a)+t*Math.cos(a)],Te=e=>Math.min(1.6,Math.max(.4,e)),Ke=(e,t,a,o,s=0)=>{const n=[];for(let i=0;i<=e;i++){const r=i/e,[c,f,u,l]=t(r),m=a((r+s)%1)*o;n.push(c+u*m,f+l*m)}return n},Ge=(e,t,a,o=0)=>s=>{const n=s*he+o;return[e+Math.cos(n)*a,t+Math.sin(n)*a,Math.cos(n),Math.sin(n)]},Ee=(e,t,a,o,s,n,i,r=0,c=1,f=null)=>{const u=a-e,l=o-t,m=Math.hypot(u,l)||1,h=-l/m,x=u/m,A=[];for(let B=0;B<=s;B++){const P=B/s,D=n((r+P*c)%1)*i*(f?f(P):1);A.push(e+u*P+h*D,t+l*P+x*D)}return A},dt=(e,t,a,o,s,n=.003,i=3)=>{const r=[];for(let c=0;c<i;c++){const f=o+c/i*Math.PI;r.push({pts:[e-Math.cos(f)*a,t-Math.sin(f)*a,e+Math.cos(f)*a,t+Math.sin(f)*a],pen:s,width:n})}return r},qe=[{name:"Ring",f:({t:e,w:t,bass:a})=>{const o=.34+.09*Te(a);return{lines:[{pts:Ke(320,Ge(0,0,o,e*.25),t,.16),pen:1,width:.003,closed:!0}]}}},{name:"Doppelring",f:({t:e,w:t,bass:a,asp:o})=>{const s=.24+.06*Te(a),n=Math.min(.75,o*.42);return{lines:[{pts:Ke(220,Ge(-n,0,s,e*.4),i=>t(i*.5),.12),pen:1,width:.003,closed:!0},{pts:Ke(220,Ge(n,0,s,-e*.4),i=>t(.5+i*.5),.12),pen:1,width:.003,closed:!0}]}}},{name:"Welle",f:({t:e,w:t,asp:a})=>{const o=.12*Math.sin(e*.37);return{lines:[{pts:Ee(-a*1.05,o,a*1.05,o,300,t,.3),pen:1,width:.007}]}}},{name:"Drei Wellen",f:({t:e,w:t,asp:a})=>{const o=[];for(let s=-1;s<=1;s++){const n=s*a*.55+.06*Math.sin(e*.5+s);o.push({pts:Ee(n,-1.05,n,1.05,220,t,.12,(s+1)/3,1/3),pen:1,width:.0026})}return{lines:o}}},{name:"Ellipsen",f:({t:e,w:t,f:a})=>{const o=[];for(let s=0;s<3;s++){const n=e*(.18+s*.06)*(s%2?-1:1)+s*1.1,i=.72+a(.1+s*.3)*.14,r=.28+s*.08,c=[];for(let f=0;f<=240;f++){const u=f/240,l=u*he,m=1+t(u)*.06;c.push(...pe(Math.cos(l)*i*m,Math.sin(l)*r*m,n))}o.push({pts:c,pen:1,width:.0026,closed:!0})}return o.push(...dt(0,0,.05+.03*a(.05),e*1.5,1,.003)),{lines:o}}},{name:"Blüte",f:({t:e,w:t,f:a})=>{const o=[],s=.62+.18*a(.08);for(const[n,i]of[[1,1],[.9,.7]]){const r=[];for(let c=0;c<=480;c++){const f=c/480,u=f*he,l=(s*Math.cos(3*u)+t(f)*.035)*n;r.push(...pe(l*Math.cos(u),l*Math.sin(u),e*.14))}o.push({pts:r,pen:i,width:.0024,closed:!0})}return{lines:o}}},{name:"Kleeblatt",f:({t:e,w:t,bass:a})=>{const o=[],s=.26+.05*Te(a);for(let n=0;n<3;n++){const i=e*.2+n/3*he+Math.PI/2;o.push({pts:Ke(200,Ge(Math.cos(i)*.22,Math.sin(i)*.22,s,-e*.5),r=>t((r+n/3)%1),.07),pen:1,width:.004,closed:!0})}return{lines:o}}},{name:"Strahlen",f:({t:e,f:t})=>{const a=[];for(let s=0;s<36;s++){const n=s/36,i=t(Math.abs(n*2-1)),r=n*he+e*.1,c=.07,f=c+.06+i*.95;a.push({pts:[c*Math.cos(r),c*Math.sin(r),f*Math.cos(r),f*Math.sin(r)],pen:.55+.45*i,width:.0035+.004*i})}return{lines:a}}},{name:"X-Strahlen",f:({t:e,w:t,f:a,asp:o})=>{const s=[],n=Math.hypot(o,1)*1.05;for(const i of[1,-1]){const r=i*(.55+.12*Math.sin(e*.21)),c=18;for(let u=0;u<c;u++){const l=u/c,m=(u+.8)/c,h=a(Math.abs(l*2-1)),x=pe((l*2-1)*n,0,r),A=pe((m*2-1)*n,0,r);s.push({pts:[...x,...A],pen:.45+.55*h,width:.012+.014*h})}const f=Ee(...pe(-n,0,r),...pe(n,0,r),200,t,.05,i>0?0:.5,.5);s.push({pts:f,pen:1,width:.0022})}return{lines:s}}},{name:"Blitzkreuz",f:({t:e,w:t})=>{const a=[];for(let o=0;o<4;o++){const s=e*.16+o*Math.PI/2,[n,i]=pe(1.2,0,s);a.push({pts:Ee(0,0,n,i,140,t,.14,o*.25,.5,r=>Math.sin(r*Math.PI)),pen:1,width:.003})}return{lines:a}}},{name:"Stern",f:({t:e,w:t,bass:a})=>{const o=.5+.08*Te(a),s=o*.42,n=[];for(let r=0;r<10;r++){const c=e*.2+r/10*he-Math.PI/2,f=r%2?s:o;n.push([Math.cos(c)*f,Math.sin(c)*f])}const i=[];for(let r=0;r<10;r++){const[c,f]=n[r],[u,l]=n[(r+1)%10],m=Ee(c,f,u,l,30,t,.05,r/10,.1,h=>Math.sin(h*Math.PI));i.push(...r?m.slice(2):m)}return{lines:[{pts:i,pen:1,width:.0032,closed:!0}]}}},{name:"Spirale",f:({t:e,w:t})=>{const a=[];for(let o=0;o<=420;o++){const s=o/420,n=s*he*3.5+e*.45,i=.03+s*.98+t(s)*.04;a.push(Math.cos(n)*i,Math.sin(n)*i)}return{lines:[{pts:a,pen:1,width:.003}]}}},{name:"Kreischen",f:({t:e,w:t,f:a,asp:o})=>{const s=[];for(let n=0;n<3;n++)for(let i=0;i<22;i++){const r=i/21,c=e*(.3+n*.1)*(n%2?-1:1)+r*Math.PI*1.2+n*2.1,f=.3+n*.22+t(r)*.025;s.push({x:f*Math.cos(c)*Math.min(1.35,o*.75),y:f*Math.sin(c)*.85,r:.008+a(r)*.02,pen:1})}return{dots:s}}},{name:"Perlenband",f:({t:e,f:t,asp:a})=>{const o=[],n=e*.17,i=Math.min(1.25,a*.7),r=Math.cos(n),c=Math.sin(n);for(let f=0;f<96;f++){const u=f/95,l=(u*2-1)*i,m=t(Math.abs(u*2-1))*.26+.04*Math.sin(u*9+e*1.3);o.push({x:r*l-c*m,y:c*l+r*m,r:.0042,pen:1})}return{dots:o}}},{name:"Perlenring",f:({t:e,f:t,bass:a})=>{const o=[],n=.34+.08*Te(a);for(let i=0;i<84;i++){const r=i/84,c=r*he+e*.3,f=n+t(Math.abs(r*2-1))*.14+.02*Math.sin(r*he*3-e);o.push({x:Math.cos(c)*f,y:Math.sin(c)*f,r:.0042,pen:1})}return{dots:o}}},{name:"Schwinge",f:({t:e,f:t,asp:a})=>{const o=[],s=[[-.22*a,.3],[.25*a,-.34]];for(let n=0;n<2;n++){const i=[],r=(n?.35:-.25)+.55*Math.sin(e*(.42+n*.11)+n*2),c=Math.cos(r),f=Math.sin(r),u=a*1.4;for(let l=0;l<=120;l++){const m=l/120,h=(m*2-1)*u,x=Math.sin(m*Math.PI*2+e*.7+n)*.05*(.4+t(m));i.push(s[n][0]+c*h-f*x,s[n][1]+f*h+c*x)}o.push({pts:i,pen:1,width:.0018})}return{lines:o}}},{name:"Lissajous",f:({t:e,w:t,bass:a,asp:o})=>{const s=[],n=.45+.12*Te(a);for(let i=0;i<=400;i++){const r=i/400;s.push(...pe(t(r)*n*Math.min(1.4,o*.8),t((r+.23)%1)*n,e*.12))}return{lines:[{pts:s,pen:1,width:.0022}]}}},{name:"Helix",f:({t:e,w:t,asp:a})=>{const o=[];for(const s of[1,-1]){const n=[];for(let i=0;i<=260;i++){const r=i/260,c=(r*2-1)*a*1.05;n.push(c,s*.3*Math.sin(r*he*1.5+e*.9)+t((r*.5+(s>0?0:.5))%1)*.06)}o.push({pts:n,pen:1,width:.003})}return{lines:o}}},{name:"Raute",f:({t:e,w:t,bass:a})=>{const o=[];for(const[s,n]of[[.62+.08*Te(a),0],[.34,.5]]){const i=[[s,0],[0,s],[-s,0],[0,-s]].map(([c,f])=>pe(c,f,e*.1*(n?-1:1))),r=[];for(let c=0;c<4;c++){const f=Ee(...i[c],...i[(c+1)%4],50,t,.05,n+c*.125,.125);r.push(...c?f.slice(2):f)}o.push({pts:r,pen:n?.8:1,width:.003,closed:!0})}return{lines:o}}},{name:"Schmetterling",f:({t:e,w:t,bass:a})=>{const o=[],s=.13+.025*Te(a);for(let n=0;n<=600;n++){const i=n/600,r=i*he*2,c=(Math.exp(Math.cos(r))-2*Math.cos(4*r)+Math.pow(Math.sin(r/12),5))*s+t(i)*.02;o.push(...pe(Math.sin(r)*c,Math.cos(r)*c-.1,Math.sin(e*.3)*.3))}return{lines:[{pts:o,pen:1,width:.0024}]}}},{name:"Fächer",f:({t:e,f:t})=>{const a=[];for(let s=0;s<28;s++){const n=s/27,i=t(n),r=Math.PI*(.08+n*.84)+Math.sin(e*.2)*.05,c=.25+i*1.4;a.push({pts:[0,-1.05,Math.cos(r)*c,-1.05+Math.sin(r)*c],pen:.5+.5*i,width:.004+.004*i})}return{lines:a}}},{name:"Sechseck",f:({t:e,w:t})=>{const a=[];return[.28,.52,.78].forEach((o,s)=>{const n=[];for(let r=0;r<6;r++)n.push(pe(o*Math.cos(r/6*he),o*Math.sin(r/6*he),e*.15*(s%2?-1:1)));const i=[];for(let r=0;r<6;r++){const c=Ee(...n[r],...n[(r+1)%6],30,t,.035,s/3+r/18,.05555555555555555);i.push(...r?c.slice(2):c)}a.push({pts:i,pen:1-s*.15,width:.003,closed:!0})}),{lines:a}}},{name:"Fliege",f:({t:e,w:t})=>{const a=[];for(let o=0;o<7;o++)for(const s of[1,-1]){const n=(o-3)*.12+Math.sin(e*.3)*.1,[i,r]=pe(s*1.25,0,n*s);a.push({pts:Ee(s*.04,0,i,r,60,t,.06,o*.13,.25,c=>c),pen:.9,width:.0026})}return{lines:a}}},{name:"Vier Kreise",f:({t:e,w:t,f:a})=>{const o=[],s=.045+.02*a(.05),n=.13;for(const[i,r]of[[1,1],[-1,1],[1,-1],[-1,-1]])o.push({pts:Ke(40,Ge(i*n,r*n*1.2,s),()=>0,0),pen:1,width:.004,closed:!0});return o.push({pts:Ke(300,Ge(0,0,.62,e*.2),t,.12),pen:.75,width:.0028,closed:!0}),{lines:o}}},{name:"Kamm",f:({t:e,w:t,f:a,asp:o})=>{const s=[],n=.25*Math.sin(e*.33),i=Ee(-o*1.05,n,o*1.05,n,240,t,.16);s.push({pts:i,pen:1,width:.003});const r=26;for(let c=0;c<=r;c++){const f=Math.round(c/r*240),u=i[f*2],l=i[f*2+1],m=.12+a(c/r)*.35;s.push({pts:[u,l,u+.04*Math.sin(e+c),l-m],pen:.85,width:.0024})}return{lines:s}}},{name:"Bögen",f:({t:e,w:t})=>{const a=[];for(const o of[1,-1]){const s=o*(.6+.15*Math.sin(e*.17));for(let n=0;n<5;n++){const i=.62+n*.1,r=[];for(let c=0;c<=200;c++){const f=c/200,u=f*he,l=1+t((f+n*.1)%1)*.02;r.push(...pe(Math.cos(u)*1.1*i*l,Math.sin(u)*.32*i*l,s))}a.push({pts:r,pen:1-n*.1,width:.0022,closed:!0})}}return{lines:a}}},{name:"Sternchen",f:({t:e,f:t,bass:a})=>{const o=[],n=.48+.06*Te(a);for(let i=0;i<8;i++){const r=e*.3+i/8*he;o.push(...dt(Math.cos(r)*n,Math.sin(r)*n,.035+.05*t(i/8),-e*2+i,1,.0028))}return o.push(...dt(0,0,.08+.05*t(.05),e,1,.0035,4)),{lines:o}}}],Qt=me(`
uniform sampler2D uPrev;
uniform int uFa, uFb;
uniform float uFm, uTa, uTb, uKeep, uSub, uGrain, uFlood, uSpin;
uniform vec4 uPa, uPb;
${$t}
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
void main(){ va = a; gl_Position = vec4(p.x / uAspect, p.y, 0., 1.); }`,en=`#version 300 es
precision mediump float;
in vec2 va; out vec4 o;
void main(){ o = vec4(va.y * (1. - smoothstep(.5, 1., abs(va.x))), 0., 0., 1.); }`,tn=me(`
uniform sampler2D uText; uniform float uAmt;
void main(){ float v = texture(uText, vec2(uv.x, 1. - uv.y)).r; o = vec4(v * uAmt, 0., 0., 1.); }`),nn=me(`
uniform sampler2D uSrc;
void main(){ o = vec4(texture(uSrc, uv).r, 0., 0., 1.); }`),an=me(`
uniform sampler2D uI, uMap;
void main(){
  float v = clamp(texture(uI, uv).r, 0., 1.);
  o = vec4(pow(texture(uMap, vec2(v * (255. / 256.) + .5 / 256., .5)).rgb, vec3(2.2)), 1.);   // linear, Ausgabe macht sRGB
}`),ze=Math.PI*2,pt=e=>e*e*(3-2*e);function Rt(e,t,a){const o=t?[...e,e[0],e[1]]:e,s=o.length/2,n=new Float32Array(a*2);if(s<2){for(let f=0;f<a;f++)n[f*2]=o[0]||0,n[f*2+1]=o[1]||0;return n}const i=new Float32Array(s);for(let f=1;f<s;f++)i[f]=i[f-1]+Math.hypot(o[f*2]-o[f*2-2],o[f*2+1]-o[f*2-1]);const r=i[s-1]||1e-6;let c=0;for(let f=0;f<a;f++){const u=f/(a-1)*r;for(;c<s-2&&i[c+1]<u;)c++;const l=i[c+1]-i[c]||1e-6,m=Math.min(1,Math.max(0,(u-i[c])/l));n[f*2]=o[c*2]+(o[c*2+2]-o[c*2])*m,n[f*2+1]=o[c*2+1]+(o[c*2+3]-o[c*2+1])*m}return n}function wt(e){const t=(e.lines||[]).slice();for(const a of e.dots||[]){const o=[];for(let s=0;s<12;s++)o.push(a.x+Math.cos(s/12*ze)*a.r,a.y+Math.sin(s/12*ze)*a.r);t.push({pts:o,pen:a.pen,width:a.r*.35,closed:!0})}return t}function gt(e,t,a){const o=e.length;if(o>=t)return e.slice(0,t).map(u=>({pts:Rt(u.pts,u.closed,a),pen:u.pen,width:u.width}));const s=e.map(u=>{let l=0;for(let m=2;m<u.pts.length;m+=2)l+=Math.hypot(u.pts[m]-u.pts[m-2],u.pts[m+1]-u.pts[m-1]);return l+1e-4}),n=s.reduce((u,l)=>u+l,0),i=t-o,r=s.map(u=>1+Math.floor(i*u/n));let c=t-r.reduce((u,l)=>u+l,0);for(let u=0;c>0;u=(u+1)%o,c--)r[u]++;const f=[];return e.forEach((u,l)=>{const m=r[l],h=Rt(u.pts,u.closed,m*(a-1)+1);for(let x=0;x<m;x++)f.push({pts:h.subarray(x*(a-1)*2,((x+1)*(a-1)+1)*2),pen:u.pen,width:u.width})}),f}function on(e,t,a){const o=wt(e),s=wt(t);if(!o.length)return s.map(u=>({...u,pen:u.pen*a}));if(!s.length)return o.map(u=>({...u,pen:u.pen*(1-a)}));const n=Math.max(o.length,s.length);if(n>120)return[...o.map(u=>({...u,pen:u.pen*(1-a)})),...s.map(u=>({...u,pen:u.pen*a}))];const i=Math.max(10,Math.min(220,Math.round(4e3/n))),r=gt(o,n,i),c=gt(s,n,i),f=[];for(let u=0;u<n;u++){const l=r[u],m=c[u],h=new Float32Array(i*2);for(let x=0;x<i*2;x++)h[x]=l.pts[x]+(m.pts[x]-l.pts[x])*a;f.push({pts:h,pen:l.pen+(m.pen-l.pen)*a,width:l.width+(m.width-l.width)*a})}return f}const Pt=["Sternchen","Kreischen","Funken","ohne"],sn=new Set(["Kaleidoskop","Spiegelkreuz","Kacheln","Kachelspiegel","Seitenspiegel","Raute","Wabe","Strahlenkranz"].map(e=>Le.findIndex(t=>t.name===e)).filter(e=>e>=0)),rn=new Set(["Strahlen","X-Strahlen","Kamm","Fächer","Sternchen","Vier Kreise"].map(e=>qe.findIndex(t=>t.name===e)).filter(e=>e>=0)),cn=new Set(Xe.map((e,t)=>[t,e.f(0,0)]).filter(([,e])=>.2126*e[0]+.7152*e[1]+.0722*e[2]>.1).map(([e])=>e));function un(e,t){const a=[],{x:o,y:s,size:n,rot:i}=e;if(e.form===0)for(let r=0;r<3;r++){const c=i+r/3*Math.PI;a.push({pts:[o-Math.cos(c)*n,s-Math.sin(c)*n,o+Math.cos(c)*n,s+Math.sin(c)*n],pen:t,width:.0028})}else if(e.form===1){const r=[];for(let c=0;c<10;c++){const f=c%2?n*.42:n,u=i+c/10*ze-Math.PI/2;r.push(o+Math.cos(u)*f,s+Math.sin(u)*f)}a.push({pts:r,pen:t,width:.0024,closed:!0})}else a.push({pts:[o-Math.cos(i)*n*1.3,s-Math.sin(i)*n*1.3,o+Math.cos(i)*n*1.3,s+Math.sin(i)*n*1.3],pen:t,width:.0026}),a.push({pts:[o+Math.sin(i)*n*.6,s-Math.cos(i)*n*.6,o-Math.sin(i)*n*.6,s+Math.cos(i)*n*.6],pen:t,width:.0026});return a}function fn(e,t){const a=ue(e,Qt),o=ue(e,en,Jt),s=ue(e,tn),n=ue(e,an),i=ue(e,nn);let r=null,c=null;const f=12e4,u=new Float32Array(f*4),l=e.createBuffer(),m=e.createVertexArray();e.bindVertexArray(m),e.bindBuffer(e.ARRAY_BUFFER,l),e.bufferData(e.ARRAY_BUFFER,u.byteLength,e.DYNAMIC_DRAW);const h=e.getAttribLocation(o.p,"p"),x=e.getAttribLocation(o.p,"a");e.enableVertexAttribArray(h),e.vertexAttribPointer(h,2,e.FLOAT,!1,16,0),e.enableVertexAttribArray(x),e.vertexAttribPointer(x,2,e.FLOAT,!1,16,8),e.bindVertexArray(null);const A=e.createTexture(),B=new Uint8Array(256*4);e.bindTexture(e.TEXTURE_2D,A),e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,256,1,0,e.RGBA,e.UNSIGNED_BYTE,B),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE);const P=e.createTexture(),D=document.createElement("canvas");D.width=1024,D.height=256;let C=null,te=-99,w=Math.random,v=null,U=null,y=0;const d={shape:{from:0,to:0,m:1,next:0},flow:{from:0,to:0,m:1,next:0,pa:[.5,.5,.5,.5],pb:[.5,.5,.5,.5],ta:0,tb:0,ka:.96,kb:.96,sa:0,sb:0},map:{from:0,to:0,m:1,next:0},part:{from:3,to:3,m:1,next:0}},M={shape:qe.length,flow:Le.length,map:Xe.length,part:Pt.length},V={shape:[7,15],flow:[6,13],map:[7,15],part:[10,20]},Z={shape:2,flow:2.5,map:2,part:1},j={...Z},b=[];let k=0,L=0,S=0,p=!1,g=0,O=0,z=0,R=0,q=0;const J=T=>{const[E,N]=V[T];let F=y+E+w()*(N-E);for(let Y=0;Y<6&&Object.keys(d).some(X=>X!==T&&Math.abs(d[X].next-F)<4);Y++)F+=5;d[T].next=F},$=T=>{let E=v[T].next();return E===d[T].to&&(E=v[T].next()),T==="flow"&&sn.has(E)&&w()<.6&&(E=v.flow.next()),T==="map"&&cn.has(E)&&w()<.65&&(E=v.map.next()),T==="shape"&&rn.has(E)&&w()<.25&&(E=v.shape.next()),E%M[T]},ne=T=>{const E=w();return E<.35?.9+w()*.05:E<.8?.95+w()*.025:Le[T].keep},ee=T=>{k=T?.45:.22,L=T?3+w()*7:0,S=y},K=(T,E)=>{const N=d[T];if(N.from=N.to,N.to=E,N.m=0,j[T]=Z[T],T==="flow"){N.pa=N.pb,N.ta=N.tb,N.pb=[w(),w(),w(),w()],N.tb=0,N.ka=N.kb,N.kb=ne(E),N.sa=N.sb,N.sb=w()<.3?0:(w()<.5?-1:1)*(.0015+w()*.004);const F=w();F<.4&&(j.flow=.25),F<.15?p=!0:F<.35&&y-S>8&&ee(w()<.35)}T==="map"&&w()<.5&&(j.map=.4),J(T)},G=(T,E)=>{const N=D.getContext("2d");N.fillStyle="#000",N.fillRect(0,0,1024,256),N.fillStyle="#fff",N.textAlign="center",N.textBaseline="middle",N.font="700 64px system-ui, -apple-system, Segoe UI, sans-serif",N.fillText(String(T||"").slice(0,40),512,100),N.font="400 40px system-ui, -apple-system, Segoe UI, sans-serif",N.fillText(String(E||"").slice(0,50),512,172),e.bindTexture(e.TEXTURE_2D,P),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,D),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)},oe=(T,E,N)=>{const F=Pt[d.part.to],Y=T.events.kick!==O,_=T.events.onset!==z;if(O=T.events.kick,z=T.events.onset,T.playing&&d.part.m>=1){if(F==="Sternchen"){q+=E;const X=Y?2+Math.floor(w()*3):q>.9&&T.conf<.4?1:0;X&&(q=0);for(let H=0;H<X;H++){const W=w()*ze,se=.25+w()*.5;b.push({type:"star",form:Math.floor(w()*3),x:Math.cos(W)*.12,y:Math.sin(W)*.12,vx:Math.cos(W)*se,vy:Math.sin(W)*se,rot:w()*ze,vr:(w()-.5)*5,size:.03+w()*.035,age:0,life:2.2+w()*1.6})}}else if(F==="Kreischen"){if(y>R){R=y+1.6+w()*1.8;const X=.25+w()*.55,H=w()*ze,W=(w()<.5?-1:1)*(.5+w()*.6),se=6+Math.floor(w()*4);for(let de=0;de<se;de++)b.push({type:"ring",R:X,th:H,w:W,lag:de*.11,r:.012+.01*(de*7%3),age:0,life:3.2})}}else if(F==="Funken"){const X=_?10+Math.floor(w()*16):w()<E*6?1:0;for(let H=0;H<X;H++)b.push({type:"spark",x:(w()*2-1)*N,y:w()*2-1,r:.003+w()*.004,age:0,life:.3+w()*.6})}}for(let X=b.length-1;X>=0;X--){const H=b[X];if(H.age+=E,H.age>H.life){b.splice(X,1);continue}H.type==="star"&&(H.x+=H.vx*E,H.y+=H.vy*E,H.rot+=H.vr*E)}b.length>400&&b.splice(0,b.length-400)};return{look:{linear:!1,bloom:.06,scale:1,expo:1,vignette:0},keys:{m:()=>(K("shape",$("shape")),`Figur: ${qe[d.shape.to].name}`),s:()=>(K("flow",$("flow")),`Strömung: ${Le[d.flow.to].name}`),p:()=>(K("map",$("map")),`Farben: ${Xe[d.map.to].name}`)},help:"M Figur · S Strömung · P Farben",resize(T,E){c&&c.dispose();const N=Math.min(1,1440/E),F=r;r=Lt(e,Math.max(32,Math.round(T*N)),Math.max(32,Math.round(E*N)),t),c=ke(e,T,E,t),F&&(e.bindFramebuffer(e.FRAMEBUFFER,r.src.fb),e.viewport(0,0,r.src.w,r.src.h),e.useProgram(i.p),xe(e,i,"uSrc",F.src.tex,0),e.drawArrays(e.TRIANGLES,0,3),F.dispose())},render(T,E){const N=T.dt;if(y+=N,U!==E.seed){const I=U===null;U=E.seed;let re=Math.floor(E.seed*1e6)||1;w=()=>(re=re*16807%2147483647)/2147483647,v={shape:Ne(M.shape,w),flow:Ne(M.flow,w),map:Ne(M.map,w),part:Ne(M.part,w)};for(const Q of["shape","flow","map","part"]){const le=$(Q);I?(Object.assign(d[Q],{from:le,to:le,m:1}),Q==="flow"&&(d.flow.pb=[w(),w(),w(),w()],d.flow.ka=d.flow.kb=ne(le),d.flow.sa=d.flow.sb=(w()<.5?-1:1)*(.0015+w()*.004)),J(Q)):Q!=="part"&&K(Q,le)}}if(T.playing)for(const I of["shape","flow","map","part"])y>d[I].next&&d[I].m>=1&&K(I,$(I));for(const I of["shape","flow","map","part"])d[I].m=Math.min(1,d[I].m+N/j[I]);T.events.kick!==g&&(g=T.events.kick,T.playing&&y-S>12&&T.bassAtt>1.2&&w()<.3&&ee(w()<.3)),d.flow.ta+=N,d.flow.tb+=N;const F=r.dst.w,Y=r.dst.h;e.bindFramebuffer(e.FRAMEBUFFER,r.dst.fb),e.viewport(0,0,F,Y),e.useProgram(a.p),ge(e,a,T,E),e.uniform2f(a.u.uRes,F,Y),xe(e,a,"uPrev",r.src.tex,0);const _=pt(d.flow.m),X=Le[d.flow.from],H=Le[d.flow.to];e.uniform1i(a.u.uFa,d.flow.from),e.uniform1i(a.u.uFb,d.flow.to),e.uniform1f(a.u.uFm,_),e.uniform4fv(a.u.uPa,d.flow.pa),e.uniform4fv(a.u.uPb,d.flow.pb),e.uniform1f(a.u.uTa,d.flow.ta),e.uniform1f(a.u.uTb,d.flow.tb);const W=Math.min(3,N*60);e.uniform1f(a.u.uAmt,W*(1.15+.6*Math.min(2,T.bassAtt))*2.9),e.uniform1f(a.u.uSpin,d.flow.sa+(d.flow.sb-d.flow.sa)*_),e.uniform1f(a.u.uZmax,.03*W),e.uniform1f(a.u.uZAmt,W*(1.15+.6*Math.min(2,T.bassAtt))*1.8);let se=d.flow.ka+(d.flow.kb-d.flow.ka)*_,de=0;k>0?(de=.09*W,k-=N,se=Math.max(se,.97)):L>0&&(se=.9975,L-=N),p&&(se=0,p=!1),e.uniform1f(a.u.uKeep,Math.pow(se,W)),e.uniform1f(a.u.uFlood,de),e.uniform1f(a.u.uSub,.0012*W),e.uniform1f(a.u.uGrain,(X.grain+(H.grain-X.grain)*_)*.35*(Y/720)),e.bindVertexArray(E.quadVao),e.drawArrays(e.TRIANGLES,0,3);let Ue=0;const Ce=(I,re,Q,le)=>{if(Ue>=f)return;const ce=Ue*4;u[ce]=I,u[ce+1]=re,u[ce+2]=Q,u[ce+3]=le,Ue++},Ut=2/Y,ot=(I,re,Q,le)=>{if(Q<=.003)return;const ce=Math.max(re*.7,.9*Ut),Ze=I.length/2,ht=le?Ze:Ze-1;for(let Pe=0;Pe<ht;Pe++){const Fe=(Pe+1)%Ze,$e=I[Pe*2],Ye=I[Pe*2+1],Qe=I[Fe*2],Je=I[Fe*2+1];let ye=-(Je-Ye),Se=Qe-$e;const et=Math.hypot(ye,Se);if(et<1e-7)continue;ye=ye/et*ce,Se=Se/et*ce;const Ve=(Qe-$e)/et*ce*.5,He=(Je-Ye)/et*ce*.5;Ce($e-Ve+ye,Ye-He+Se,1,Q),Ce($e-Ve-ye,Ye-He-Se,-1,Q),Ce(Qe+Ve+ye,Je+He+Se,1,Q),Ce($e-Ve-ye,Ye-He-Se,-1,Q),Ce(Qe+Ve-ye,Je+He-Se,-1,Q),Ce(Qe+Ve+ye,Je+He+Se,1,Q)}},Ct=I=>Math.max(-1.3,Math.min(1.3,T.waveRaw[Math.min(511,Math.max(0,Math.round(I*511)))])),Vt=I=>{const re=Math.min(31,Math.max(0,I*31)),Q=Math.floor(re),le=re-Q;return Math.min(1,T.bands[Q]*(1-le)+T.bands[Math.min(31,Q+1)]*le)},ut={t:y*1.7,w:Ct,f:Vt,bass:T.bassAtt,asp:E.aspect},Ht=T.playing?.85+.15*Math.min(1,T.bassAtt):.25,Tt=pt(d.shape.m);let ft;Tt>=1||d.shape.from===d.shape.to?ft=wt(qe[d.shape.to].f(ut)):ft=on(qe[d.shape.from].f(ut),qe[d.shape.to].f(ut),Tt);for(const I of ft)ot(I.pts,I.width,I.pen*Ht,I.closed);oe(T,N,E.aspect);for(const I of b){const re=Math.min(1,I.age/.15,(I.life-I.age)/.6);if(I.type==="star")for(const Q of un(I,re))ot(Q.pts,Q.width,Q.pen,Q.closed);else if(I.type==="ring"){const Q=I.age-I.lag;if(Q<0)continue;const le=I.th+I.w*Q,ce=I.R*(1+.15*Q),Ze=Math.cos(le)*ce*Math.min(1.4,E.aspect*.8),ht=Math.sin(le)*ce*.85,Pe=[];for(let Fe=0;Fe<14;Fe++)Pe.push(Ze+Math.cos(Fe/14*ze)*I.r,ht+Math.sin(Fe/14*ze)*I.r);ot(Pe,.0028,re,!0)}else{const Q=.6+.4*Math.sin(I.age*40+I.x*10);ot([I.x-I.r,I.y,I.x+I.r,I.y],I.r*.8,re*Q,!1)}}Ue&&(e.useProgram(o.p),e.uniform1f(o.u.uAspect,E.aspect),e.bindBuffer(e.ARRAY_BUFFER,l),e.bufferSubData(e.ARRAY_BUFFER,0,u.subarray(0,Ue*4)),e.bindVertexArray(m),e.enable(e.BLEND),e.blendEquation(e.MAX),e.drawArrays(e.TRIANGLES,0,Ue));const lt=E.title?`${E.title}|${E.artist}`:null;lt&&lt!==C&&(C=lt,G(E.title,E.artist),te=y);const mt=y-te;if(mt<3.2){const I=Math.min(1,mt/.4)*Math.min(1,(3.2-mt)/.8)*.95;e.useProgram(s.p),xe(e,s,"uText",P,0),e.uniform1f(s.u.uAmt,I),e.enable(e.BLEND),e.blendEquation(e.MAX);const re=Math.round(F*.6),Q=Math.round(re/4);e.viewport(Math.round((F-re)/2),Math.round(Y*.5-Q/2),re,Q),e.bindVertexArray(E.quadVao),e.drawArrays(e.TRIANGLES,0,3),e.viewport(0,0,F,Y)}e.blendEquation(e.FUNC_ADD),e.disable(e.BLEND);const Et=pt(d.map.m),Kt=Xe[d.map.from].f,Gt=Xe[d.map.to].f;for(let I=0;I<256;I++){const re=I/255,Q=Kt(re,y),le=Et>0?Gt(re,y):Q;for(let ce=0;ce<3;ce++)B[I*4+ce]=Math.round(Math.min(1,Math.max(0,Q[ce]+(le[ce]-Q[ce])*Et))*255);B[I*4+3]=255}return e.bindTexture(e.TEXTURE_2D,A),e.texSubImage2D(e.TEXTURE_2D,0,0,0,256,1,e.RGBA,e.UNSIGNED_BYTE,B),e.bindFramebuffer(e.FRAMEBUFFER,c.fb),e.viewport(0,0,c.w,c.h),e.useProgram(n.p),xe(e,n,"uI",r.dst.tex,0),xe(e,n,"uMap",A,1),e.bindVertexArray(E.quadVao),e.drawArrays(e.TRIANGLES,0,3),r.swap(),c.tex},debug(T){for(const E of["shape","flow","map","part"])T[E]!=null&&(Object.assign(d[E],{from:T[E],to:T[E],m:1,next:y+1e6}),E==="flow"&&T.params&&(d.flow.pb=T.params));T.keep!=null&&(d.flow.ka=d.flow.kb=T.keep),T.flood&&ee(T.flood==="long"),T.cut&&(p=!0)},info(){return`${qe[d.shape.to].name} (M) · ${Le[d.flow.to].name} (S) · ${Xe[d.map.to].name} (P)`},dispose(){r&&r.dispose(),c&&c.dispose(),e.deleteBuffer(l),e.deleteVertexArray(m),e.deleteTexture(A),e.deleteTexture(P);for(const T of[a,o,s,n,i])e.deleteProgram(T.p)}}}const ln=1400,mn=28,hn=1800,_t=`
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
`,dn=`#version 300 es
${je}
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
}`,pn=`#version 300 es
${je}
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
}`,vn=`#version 300 es
${je}
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
}`,At=`#version 300 es
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
}`,xn=`#version 300 es
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
}`,bn=me(`
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
}`),wn=e=>[1,3,5].map(t=>Math.pow(parseInt(e.slice(t,t+2),16)/255,2.2)),tt=[{name:"Rosé",c:["#0a0408","#2a0e22","#ff4fd8","#0e0510","#ffe6d2"]},{name:"Nordlicht",c:["#02060c","#082036","#3fa0ff","#020812","#d8f4ff"]},{name:"Glut",c:["#0a0402","#2a1004","#ff7a1a","#100502","#fff0c8"]},{name:"Smaragd",c:["#020a04","#0a2410","#5cff88","#030c06","#eaffd8"]},{name:"Violett",c:["#06020c","#160932","#8a5aff","#060314","#ece2ff"]},{name:"Cover",c:null}],Ae=[{name:"Bänder",count:520,seg:28,tail:.065,width:.045,twist:1.8,spin:1.2,spiral:.35,prec:.4,chaos:.3,life:4.6,head:0,ring:0,src:0},{name:"Fäden",count:900,seg:28,tail:.06,width:.004,twist:0,spin:1.8,spiral:.14,prec:1.2,chaos:.8,life:4.2,head:.45,ring:0,src:0},{name:"Kometen",count:440,seg:14,tail:.045,width:.018,twist:1.5,spin:.9,spiral:.6,prec:.3,chaos:.2,life:4.4,head:1.2,ring:0,src:0},{name:"Strahlen",count:760,seg:20,tail:.03,width:.012,twist:2,spin:.12,spiral:1.5,prec:.1,chaos:.1,life:3.4,head:1,ring:0,src:1},{name:"Wirbel",count:420,seg:28,tail:.05,width:.05,twist:2,spin:2.4,spiral:.2,prec:2,chaos:.2,life:5,head:0,ring:0,src:2,gain:.45}],be=[{name:"Überblick",dist:8.2,fov:50,look:0,w:3},{name:"Nah",dist:3.6,fov:55,look:1,w:3},{name:"Mittendrin",dist:1.7,fov:68,look:0,w:2},{name:"Fern",dist:15,fov:42,look:0,w:1}];function Mn(e,t){const a=ue(e,xn,dn),o=ue(e,At,pn),s=ue(e,At,vn),n=ue(e,bn),i=e.createVertexArray();let r=null,c=0,f=0,u=0,l=0;const m=new Float32Array(8).fill(-99);let h=0,x=0,A=-1,B=1,P=0,D=null;const C=Ie({beats:64,minSec:45,maxSec:100}),te=Ie({beats:32,minSec:14,maxSec:32}),w=[0,1,2,3,4].map(b=>({p:[0,0,0],e:0,r:b<2?.12:.5})),v=[.6,.48,.38];let U=0;const y={dist:8.2,fov:50,look:[0,0,0],yaw:0,pitch:.15},d={dist:0,fov:0};let M=0;const V=(b,k)=>{if(b===0)return[.35*Math.sin(k*.07),.2*Math.sin(k*.05+1),.35*Math.cos(k*.06)];if(b===1){const g=k*.05+2;return[Math.cos(g)*2.9,1.1*Math.sin(k*.04),Math.sin(g)*2.6]}const L=b-2,S=k*(.08+L*.017)+L*2.1,p=1.8+.45*Math.sin(k*.05+L);return[Math.cos(S)*p,.8*Math.sin(k*(.06+L*.011)+L*1.3),Math.sin(S)*p*.85]},Z=()=>{const b=be.reduce((L,S)=>L+S.w,0);let k=U;for(;k===U;){let L=Math.random()*b;for(k=0;L>be[k].w;)L-=be[k++].w}U=k,M=be[k].look?[0,2,3,4][Math.floor(Math.random()*4)]:0},j=(b,k,L,S,p,g,O,z,R)=>{ge(e,b,k,L),e.uniformMatrix4fv(b.u.uVP,!1,S),b.u.uEye!=null&&e.uniform3fv(b.u.uEye,p),e.uniform4fv(b.u.uMag,w.flatMap(q=>[...q.p,q.r])),e.uniform4fv(b.u.uSphS,g),e.uniform1f(b.u.uClock,f),e.uniform1f(b.u.uLife,O.life),e.uniform1f(b.u.uSpiral,O.spiral),e.uniform1f(b.u.uSpin,O.spin),e.uniform1f(b.u.uPrec,O.prec),e.uniform1f(b.u.uChaos,O.chaos),b.u.uTwist!=null&&e.uniform1f(b.u.uTwist,O.twist),b.u.uTail!=null&&e.uniform1f(b.u.uTail,O.tail),e.uniform1f(b.u.uMode,Ae.indexOf(O)),e.uniform1f(b.u.uSrc,O.src),e.uniform1fv(b.u.uKicks,m),e.uniform3fv(b.u.uCol,R),e.uniform1f(b.u.uAmt,z)};return{look:{linear:!0,bloom:.55,scale:1,expo:1},keys:{m:()=>(A=x,x=(x+1)%Ae.length,B=0,C.reset(),`Modus: ${Ae[x].name}`),p:()=>(P=(P+1)%tt.length,`Farben: ${tt[P].name}`),k:()=>(Z(),te.reset(),`Kamera: ${be[U].name}`)},help:"M Modus · P Farben · K Kamera",resize(b,k){r&&r.dispose(),r=ke(e,b,k,t)},render(b,k){const L=b.dt;if(c+=L,D!==k.seed){D=k.seed,P=Math.floor(k.seed*997)%(tt.length-1);const _=Math.floor(k.seed*131)%Ae.length;_!==x&&(A=x,x=_,B=0)}C.tick(b,L)&&(A=x,x=(x+1+Math.floor(Math.random()*(Ae.length-1)))%Ae.length,B=0),B=Math.min(1,B+L/1.6),te.tick(b,L)&&Z(),f+=L*(.55+.45*Math.min(2,b.bassAtt))*(b.playing?1:.25),b.events.kick!==l&&(l=b.events.kick,m[h]=f,h=(h+1)%8,u=1),u*=Math.exp(-L*7);const S=[[0,5],[21,32],[5,12],[12,21],[3,9]];for(let _=0;_<5;_++){const X=w[_];X.p=V(_,c);let H=0;for(let W=S[_][0];W<S[_][1];W++)H+=b.bands[W];H/=S[_][1]-S[_][0],X.e+=(H-X.e)*(1-Math.exp(-L*8)),X.r=(_<2?.12:v[_-2])*(1+.1*X.e)}const p=tt[P].c;let g;if(p)g=p.flatMap(wn);else{const _=Array.from({length:5},(W,se)=>Array.from(k.palette.slice(se*3,se*3+3))),X=W=>.2126*W[0]+.7152*W[1]+.0722*W[2],H=_.slice().sort((W,se)=>X(W)-X(se));g=[H[0].map(W=>W*.1),H[1].map(W=>W*.25),H[3],H[0].map(W=>W*.1),H[4].map(W=>Math.min(1,W*1.2+.1))].flat()}const O=be[U],z=(_,X,H)=>{const W=-2*H*d[_]-H*H*(y[_]-X);d[_]+=W*L,y[_]+=d[_]*L};z("dist",O.dist,.9),z("fov",O.fov,.9);const R=M?w[M].p:[0,0,0],q=1-Math.exp(-L*.8);y.look=y.look.map((_,X)=>_+(R[X]-_)*q),y.yaw+=L*(.05+.03*Math.min(2,b.midAtt))*(y.dist<3?1.6:1),y.pitch=.18*Math.sin(c*.027)+.06;const J=Math.cos(y.pitch),$=[y.look[0]+Math.sin(y.yaw)*J*y.dist,y.look[1]+Math.sin(y.pitch)*y.dist,y.look[2]+Math.cos(y.yaw)*J*y.dist],ne=y.fov*Math.PI/180,ee=St(kt(ne,k.aspect,.1,80),yt($,y.look)),K=1/Math.tan(ne/2),G=(_,X,H)=>{const W=ee[0]*_[0]+ee[4]*_[1]+ee[8]*_[2]+ee[12],se=ee[1]*_[0]+ee[5]*_[1]+ee[9]*_[2]+ee[13],de=ee[3]*_[0]+ee[7]*_[1]+ee[11]*_[2]+ee[15];return de<H?[0,0,-1,0]:[W/de,se/de,de,X*K/de]},oe=[2,3,4].flatMap(_=>G(w[_].p,w[_].r,w[_].r*2.2)),T=[0,1].flatMap(_=>G(w[_].p,.22+.12*w[_].e,.3)),E=Math.hypot($[0]-y.look[0],$[1]-y.look[1],$[2]-y.look[2]),N=r.h/2*K*.012;e.bindFramebuffer(e.FRAMEBUFFER,r.fb),e.viewport(0,0,r.w,r.h),e.useProgram(n.p),ge(e,n,b,k),e.uniform4fv(n.u.uSphS,oe),e.uniform1fv(n.u.uSphE,[w[2].e,w[3].e,w[4].e]),e.uniform4fv(n.u.uLightS,T),e.uniform1fv(n.u.uLightE,[w[0].e,w[1].e*.7]),e.uniform1f(n.u.uNeb,.6),e.uniform4fv(n.u.uCloud,G([0,0,0],2.6,.3)),e.uniform1f(n.u.uBurst,u*.6),e.uniform3fv(n.u.uCol,g),e.bindVertexArray(k.quadVao),e.drawArrays(e.TRIANGLES,0,3),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE),e.bindVertexArray(i),e.useProgram(s.p),ge(e,s,b,k),e.uniformMatrix4fv(s.u.uVP,!1,ee),e.uniform1f(s.u.uPx,N),e.uniform1f(s.u.uFocus,E),e.uniform1f(s.u.uAmt,1),e.uniform1f(s.u.uDrift,c),e.uniform1f(s.u.uRing,0),e.uniform3fv(s.u.uCol,g),e.uniform4fv(s.u.uSphS,oe),e.drawArrays(e.POINTS,0,hn);const F=(_,X)=>{if(X<=.01)return;const H=Ae[_],W=Math.min(ln,H.count);e.useProgram(a.p),j(a,b,k,ee,$,oe,H,X*(H.gain||1),g),e.uniform1f(a.u.uSegN,H.seg),e.uniform1f(a.u.uW,H.width),e.uniform1f(a.u.uMinPx,Math.max(.6,r.h/1200)),e.uniform2f(a.u.uHalf,r.w/2,r.h/2);const se=2*(Math.min(mn,H.seg)+1)+2;e.uniform1f(a.u.uV,se),e.drawArrays(e.TRIANGLE_STRIP,0,W*se),H.head>0&&(e.useProgram(o.p),j(o,b,k,ee,$,oe,H,X*H.head,g),e.uniform1f(o.u.uPx,N),e.uniform1f(o.u.uFocus,E),e.uniform1f(o.u.uRing,H.ring),e.drawArrays(e.POINTS,0,W))},Y=B*B*(3-2*B);return A>=0&&Y<1&&F(A,1-Y),F(x,Y),e.disable(e.BLEND),e.blendFunc(e.ONE,e.ZERO),r.tex},debug(b){b.mode!=null&&(x=b.mode,A=-1,B=1),b.pal!=null&&(P=b.pal),b.shot!=null&&(U=b.shot,M=be[U].look?2:0,y.dist=be[U].dist,y.fov=be[U].fov)},info(){return`${Ae[x].name} (M) · ${tt[P].name} (P) · ${be[U].name} (K)`},dispose(){r&&r.dispose(),e.deleteVertexArray(i);for(const b of[a,o,s,n])e.deleteProgram(b.p)}}}const it=new Map;function kn(e){if(!it.has(e)){const t=new Promise((a,o)=>{const s=new Image;s.decoding="async",s.onload=()=>(s.decode?s.decode().catch(()=>{}):Promise.resolve()).then(()=>a(s)),s.onerror=()=>o(new Error("Bild fehlt: "+e)),s.src=Bt("/viz/"+e)});t.catch(()=>it.delete(e)),it.set(e,t)}return it.get(e)}function yn(e,t,{srgb:a=!0,mip:o=!0,repeat:s=!1,nearest:n=!1}={}){const i=e.createTexture();return e.bindTexture(e.TEXTURE_2D,i),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.NONE),e.texImage2D(e.TEXTURE_2D,0,a?e.SRGB8_ALPHA8:e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,t),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),o&&!n&&e.generateMipmap(e.TEXTURE_2D),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,n?e.NEAREST:o?e.LINEAR_MIPMAP_LINEAR:e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,n?e.NEAREST:e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,s?e.REPEAT:e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),i}function rt(e,t){let a="idle",o=null;return{get(){return a==="idle"&&(a="loading",Promise.all(t.map(s=>kn(s.name))).then(s=>{a==="loading"&&(o=s.map((n,i)=>yn(e,n,t[i])),a="ready")}).catch(s=>{console.warn("Visualizer-Bilder:",s&&s.message),a="failed"})),a==="ready"?o:null},get failed(){return a==="failed"},release(){if(o)for(const s of o)e.deleteTexture(s);o=null,a="idle"}}}const Sn=me(`
uniform vec3 uNeon;
uniform int uShapeA, uShapeB; uniform float uShapeM;
uniform float uPx;                     // ein Bildpunkt in Bild-Einheiten (Höhe = 1)
uniform float uHZ;                     // Wasserlinie (Bühnen an Land: ganz unten, ohne Wasser)
uniform vec2 uC;                       // Mitte der Form
uniform float uSc;                     // Grösse der Form
uniform int uStage;                    // 0 gerechneter Felsen, 1 Felsinsel (Bild), 2 Bühne (Vollbild)
uniform sampler2D uAlb, uNrm, uDep, uSky, uShadow, uSmoke;
uniform vec4 uRect;                    // Bild im Bildraum: links, unten, Breite, Höhe
uniform vec4 uCam;                     // tan(halber Blickwinkel) waagrecht, senkrecht; Meter je Tiefeneinheit
uniform vec3 uUp;                      // "oben" der Welt im Kameraraum
uniform ivec2 uVisSize;                // Grösse des Schattenbilds
uniform vec4 uLs[24];                  // Lichtpunkte auf der Form (Kameraraum) und ihre Stärke
uniform int uNs;
uniform vec3 uLight;                   // direktes Licht, Fülllicht (Streulicht), Rest im Schatten
uniform vec3 uAmb;                     // Grundlicht vom Nachthimmel
uniform float uLightPulse;
uniform int uView;                     // Prüfen: 1 = nur Schatten-Anteil
uniform vec4 uSmk[5];                  // Rauchschwaden: x, y, Grösse, Deckkraft
uniform float uSmkI[5];                // welches der 8 Rauchbilder
uniform float uHasSmoke, uFade;
vec2 rectUV(vec2 q){ return vec2((q.x - uRect.x) / uRect.z, 1. - (q.y - uRect.y) / uRect.w); }

// ---- Bühne: Licht der Neon-Form live (Albedo, Normalen, Tiefe; Schatten aus dem kleinen Durchgang)
float depthAt(vec3 t){ return (floor(t.r * 255. + .5) * 256. + floor(t.g * 255. + .5)) / 65535.; }
vec3 rayDir(vec2 tuv){ return normalize(vec3((tuv.x - .5) * 2. * uCam.x, (.5 - tuv.y) * 2. * uCam.y, -1.)); }
// Schatten bilinear aus dem Schattenbild, aber nur aus Punkten ähnlicher Tiefe (keine Säume an Kanten)
float shadowAt(vec2 tuv, float dist){
  vec2 f = vec2(tuv.x, 1. - tuv.y) * vec2(uVisSize) - .5;
  vec2 fl = floor(f), fr = f - fl;
  ivec2 i0 = ivec2(fl);
  float acc = 0., ws = 0.;
  for (int k = 0; k < 4; k++) {
    ivec2 o = ivec2(k & 1, k >> 1);
    vec2 s = texelFetch(uShadow, clamp(i0 + o, ivec2(0), uVisSize - 1), 0).rg;
    float wb = (o.x == 1 ? fr.x : 1. - fr.x) * (o.y == 1 ? fr.y : 1. - fr.y);
    float w = wb / (.02 + abs(s.y * 64. - dist) / dist * 30.) + 1e-6;
    acc += s.x * w; ws += w;
  }
  return acc / ws;
}
// beleuchtete Bühne an der Bildstelle tuv; a = Deckung (0 = Himmel bzw. durchsichtig)
vec3 stageLit(vec2 tuv, out float a){
  vec4 ab = texture(uAlb, tuv);
  vec3 dt = texture(uDep, tuv).rgb;
  float dn = depthAt(dt);
  a = ab.a * step(dn, .999);
  if (a <= 0.) return vec3(0.);
  float dist = 2. + dn * uCam.z;
  vec3 P = rayDir(tuv) * dist;
  vec3 n = texture(uNrm, tuv).rgb * 2. - 1.;
  vec3 N = n / max(length(n), 1e-3);
  float ao = dt.b;
  float E = 0., Ef = 0.;
  for (int i = 0; i < 24; i++) {
    if (i >= uNs) break;
    vec3 l = uLs[i].xyz - P;
    float d2 = dot(l, l);
    l *= inversesqrt(d2);
    E += uLs[i].w * max(dot(N, l), 0.) / (d2 + .36);
    Ef += uLs[i].w / (d2 + 4.);
  }
  float sh = shadowAt(tuv, dist);
  if (uView == 1) return vec3(sh * .25);
  float L = uLight.x * (E * mix(uLight.z, 1., sh) + uLight.y * Ef * ao) * uLightPulse;
  vec3 amb = uAmb * (.55 + .45 * dot(N, uUp)) * ao;
  return ab.rgb * (amb + uNeon * L);
}

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
    // Bühne (Bild): das Neon ist das Hauptlicht, live gerechnet; dazu ein weiches Grundlicht vom
    // Nachthimmel ohne eigene Schatten. Der Himmel kommt aus dem Mondlicht-Render.
    vec2 tuv = rectUV(q);
    float a;
    vec3 st = stageLit(tuv, a);
    col = st * a + texture(uSky, tuv).rgb * .42 * (1. - a);
    col += vec3(.75, .8, 1.) * stars(q) * (1. - a) * .5;
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
    // Felsinsel (Bild): schwebt knapp über dem Wasser, vom Neon darüber live angeleuchtet
    vec2 tuv = rectUV(q);
    if (tuv.x > 0. && tuv.y > 0. && tuv.x < 1. && tuv.y < 1.) {
      float a;
      vec3 isl = stageLit(tuv, a);
      col = mix(col, isl, a);
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
}`),Tn=me(`
uniform sampler2D uNrm, uDep, uVis;
uniform vec4 uCam;
uniform vec4 uGrid;                    // Raster: x0, y0, Abstand waagrecht, senkrecht (Meter)
uniform ivec2 uVisSize;
uniform vec4 uLs[24];
uniform vec2 uLsh[24];                 // Lichtpunkte für die Schatten (zusammengezogen, siehe SHARP)
uniform int uNs;
float bitv(uint w0, uint w1, uint w2, int b){
  int k = b / 24; int s = b - k * 24;
  uint w = k == 0 ? w0 : (k == 1 ? w1 : w2);
  return float((w >> uint(s)) & 1u);
}
uint word(ivec2 at){ uvec3 c = uvec3(texelFetch(uVis, at, 0).rgb * 255. + .5); return c.r | (c.g << 8u) | (c.b << 16u); }
void main(){
  ivec2 ij = ivec2(gl_FragCoord.xy);
  int rT = uVisSize.y - 1 - ij.y;                  // Zeile von oben
  ivec2 dpx = ivec2(ij.x * 2 + 1, rT * 2 + 1);     // derselbe Punkt im Tiefen-/Normalenbild
  vec3 dt = texelFetch(uDep, dpx, 0).rgb;
  float dn = (floor(dt.r * 255. + .5) * 256. + floor(dt.g * 255. + .5)) / 65535.;
  if (dn > .999) { o = vec4(1., 1., 0., 1.); return; }
  float dist = 2. + dn * uCam.z;
  vec2 im = (vec2(dpx) * 2. + .5) / (vec2(uVisSize) * 4.);
  vec3 P = normalize(vec3((im.x - .5) * 2. * uCam.x, (.5 - im.y) * 2. * uCam.y, -1.)) * dist;
  vec3 n = texelFetch(uNrm, dpx, 0).rgb * 2. - 1.;
  vec3 N = n / max(length(n), 1e-3);
  uint w0 = word(ivec2(ij.x, rT)), w1 = word(ivec2(ij.x, rT + uVisSize.y)), w2 = word(ivec2(ij.x, rT + 2 * uVisSize.y));
  float acc = 0., tot = 0.;
  for (int i = 0; i < 24; i++) {
    if (i >= uNs) break;
    vec3 l = uLs[i].xyz - P;
    float d2 = dot(l, l);
    l *= inversesqrt(d2);
    float g = uLs[i].w * max(dot(N, l), 0.) / (d2 + .36);
    if (g <= 0.) continue;
    vec2 gp = clamp((uLsh[i] - uGrid.xy) / uGrid.zw, 0., 6.999);
    ivec2 gi = ivec2(gp);
    vec2 gf = gp - vec2(gi);
    int b = gi.y * 8 + gi.x;
    float v = mix(mix(bitv(w0, w1, w2, b), bitv(w0, w1, w2, b + 1), gf.x),
                  mix(bitv(w0, w1, w2, b + 8), bitv(w0, w1, w2, b + 9), gf.x), gf.y);
    acc += g * v;
    tot += g;
  }
  o = vec4(tot > 1e-12 ? acc / tot : 1., dist / 64., 0., 1.);
}`),Be=[[1,.32,.03],[.08,.35,1],[.55,.12,1],[1,.05,.22],[.12,1,.2],[.05,.85,1],[1,.1,.8],[1,.78,.05]],We=[{name:"Felsinsel",kind:1,key:"felsinsel",hover:[.05,.03],cam:{th:.360002,tv:.120001,far:62,zL:-15.6479,g0:[-1.15,-.0967],gs:[.32857,.67143],up:[0,.99452,.10453],vis:[960,320]},light:[32,.07,.04],amb:[.025,.035,.07]},{name:"Wüste",kind:2,key:"wueste",free:[.5,.59],size:.74,ground:.3,hover:[.06,.035],cam:{th:.514283,tv:.289284,far:62,zL:-15,g0:[-1.65,-2.2189],gs:[.47143,.85714],up:[0,.99674,-.08074],vis:[960,540]},light:[90,.07,.04],amb:[.05,.07,.15]},{name:"Ruinen",kind:2,key:"ruinen",free:[.505,.585],size:.68,ground:.3,hover:[.025,.02],cam:{th:.514283,tv:.289284,far:52,zL:-9.0777,g0:[-.7533,-1.2036],gs:[.22857,.47143],up:[0,.99619,-.08716],vis:[960,540]},light:[18,.07,.04],amb:[.04,.05,.09]}],En=e=>[{name:`${e.key}_albedo.webp`,srgb:!0},{name:`${e.key}_normalen.webp`,srgb:!1},{name:`${e.key}_tiefe.png`,srgb:!1,nearest:!0},{name:`${e.key}_licht.png`,srgb:!1,nearest:!0},...e.kind===2?[{name:`${e.key}_himmel.webp`,srgb:!0}]:[]],Rn=.25,gn=.4,_e=24;function Pn(e,t){const a=[],o=(u,l)=>{for(let m=0;m<u.length-(l?0:1);m++)a.push([u[m],u[(m+1)%u.length]])},s=u=>o(Array.from({length:40},(l,m)=>[u*Math.cos(m/40*2*Math.PI),u*Math.sin(m/40*2*Math.PI)]),!0);if(e===0)for(const u of[1,.8,.6])o([[-.36*u,-.27*u],[0,.36*u],[.36*u,-.27*u]],!1);else if(e===1)o([[-.32,-.32],[.32,-.32],[.32,.32],[-.32,.32]],!0);else if(e===2)for(const u of[.2,.29,.38])s(u);else if(e===3)for(const u of[.27,.19]){const l=u*Math.SQRT2;o([[0,l],[l,0],[0,-l],[-l,0]],!0)}else for(const u of[.34,.25]){const l=u*1.1547;o(Array.from({length:6},(m,h)=>[l*Math.cos(h*Math.PI/3),l*Math.sin(h*Math.PI/3)]),!0)}const n=a.map(([u,l])=>Math.hypot(l[0]-u[0],l[1]-u[1])),i=n.reduce((u,l)=>u+l,0),r=[];let c=0,f=0;for(let u=0;u<t;u++){const l=(u+.5)/t*i;for(;c<a.length-1&&f+n[c]<l;)f+=n[c++];const m=(l-f)/n[c],[h,x]=a[c];r.push([h[0]+(x[0]-h[0])*m,h[1]+(x[1]-h[1])*m])}return r}const An=[0,1,2,3,4].map(e=>Pn(e,_e)),zn="rauch_atlas.webp";function Fn(e,t){const a=ue(e,Sn),o=ue(e,Tn);let s=null,n=null;const i=new Float32Array(_e*4),r=new Float32Array(_e*2);let c=0,f=null,u=0,l=[...Be[0]],m=[...Be[0]],h=[...Be[0]],x=1,A=0,B=0,P=0,D=1,C=null;const te=We.map(S=>rt(e,En(S))),w=rt(e,[{name:zn}]);let v=0,U=-1,y=1,d=0;const M=Array.from({length:5},(S,p)=>({x:p/5*2-1,y:0,size:.7,a:0,img:p,v:.01})),V=(S,p,g,O)=>{S.img=3+Math.floor(Math.random()*5),S.size=.55+Math.random()*.45,S.v=(Math.random()<.5?-1:1)*(.008+Math.random()*.012),S.a=.16+Math.random()*.2,S.x=O?(Math.random()*2-1)*g*.5:S.v>0?-g*.5-S.size*.5:g*.5+S.size*.5,S.yr=Math.random()};M.forEach(S=>V(S,null,1.78,!0));const Z=Ne(Be.length),j=Ie({beats:64,minSec:40,maxSec:90}),b=()=>{let S=Z.next();S===A&&(S=Z.next()),A=S,m=[...l],h=[...Be[A]],x=0},k=()=>{B=P,P=(P+1+Math.floor(Math.random()*4))%5,D=0},L=(S,p,g,O,z)=>{const R=S.cam,q=-R.zL,J=((g[0]-p[0])/p[2]-.5)*2*R.th*q,$=((g[1]-p[1])/p[3]-.5)*2*R.tv*q,ne=O/p[2]*2*R.th*q,ee=O/p[3]*2*R.tv*q,K=$-.12*ee,G=D*D*(3-2*D),oe=G>.001&&G<.999&&B!==P;let T=0;for(let E=0;E<_e;E++){const N=oe?E%2===0:G<.5,F=An[N?B:P][E],Y=Math.atan2(F[1],F[0])/(2*Math.PI)+.5,_=Math.abs(Y*2%1*2-1),X=z.bands[Math.min(31,Math.round(_*31))]||0,H=(.7+.6*Math.min(1,X))*(oe?N?1-G:G:1),W=J+F[0]*ne,se=$+F[1]*ee;i[E*4]=W,i[E*4+1]=se,i[E*4+2]=R.zL,i[E*4+3]=H,r[E*2]=J+(W-J)*Rn,r[E*2+1]=K+(se-K)*gn,T+=H}for(let E=0;E<_e;E++)i[E*4+3]/=T};return{look:{linear:!0,bloom:.42,scale:1,expo:.95,full:!0},label:"center",keys:{m:()=>(k(),"Form gewechselt"),p:()=>(b(),"Farbe gewechselt"),b:()=>(v=(v+1)%We.length,`Bühne: ${We[v].name}`)},help:"M Form · P Farbe · B Bühne",resize(S,p){s&&s.dispose(),s=ke(e,S,p,t)},render(S,p){const g=S.dt;if(C!==p.seed){const F=C===null;C=p.seed;const Y=Math.floor(p.seed*97)%5;v=Math.floor(p.seed*61)%We.length,F?(B=P=Y,A=Math.floor(p.seed*Be.length),l=[...Be[A]],h=[...l],x=1):Y!==P&&(B=P,P=Y,D=0)}j.tick(S,g)&&b(),x=Math.min(1,x+g/1.5),D=Math.min(1,D+g/1.2);const O=x*x*(3-2*x);l=m.map((F,Y)=>F+(h[Y]-F)*O);const z=te[v].get();v!==U&&z&&d===0&&(d=-1),d<0?(y=Math.max(0,y-g/.35),y===0&&(U>=0&&U!==v&&te[U].release(),U=te[v].get()?v:U,d=1)):d>0&&(y=Math.min(1,y+g/.6),y===1&&(d=0));const R=p.aspect;c+=g*(.8+.2*Math.min(S.bassAtt,2));const q=U>=0?We[U]:null,J=U>=0?te[U].get():null,$=w.get();let ne=J?q.kind:0,ee=-.17,K=[0,.1],G=1,oe=[0,0,1,1];if(ne===1)oe=[-.75,-.38,1.5,.5],ee=-.34,K=[0,.17],G=.7;else if(ne===2){const F=1.7777777777777777,Y=Math.max(R,F),_=Y/F;oe=[-Y/2,-_/2,Y,_],ee=-9,K=[oe[0]+q.free[0]*Y,oe[1]+q.free[1]*_],G=q.size*_}if(ne>0){const F=f??c;K=[K[0]+q.hover[0]*oe[3]*(.7*Math.sin(F*.21+1.3)+.3*Math.sin(F*.47+.4)),K[1]+q.hover[1]*oe[3]*Math.sin(F*.17+.6)],L(q,oe,K,G*(1+.025*S.kick),S)}for(const F of M)F.x+=F.v*g,Math.abs(F.x)>R*.5+F.size*.6&&V(F,q,R,!1);const T=[],E=[];for(const F of M){const Y=ne===2?oe[1]+oe[3]*(q.ground-.12+F.yr*.16):ne===1?-.34+F.yr*.26:-.2+F.yr*.15;T.push(F.x,Y,F.size,$?F.a*(ne===0?.6:1):0),E.push(F.img)}const N=(F,Y,_,X)=>{F.u[Y]!=null&&(e.activeTexture(e.TEXTURE0+X),e.bindTexture(e.TEXTURE_2D,_),e.uniform1i(F.u[Y],X))};if(e.bindVertexArray(p.quadVao),ne>0){const[F,Y]=q.cam.vis;(!n||n.w!==F||n.h!==Y)&&(n&&n.dispose(),n=ke(e,F,Y,t,!1)),e.bindFramebuffer(e.FRAMEBUFFER,n.fb),e.viewport(0,0,F,Y),e.useProgram(o.p),e.uniform4f(o.u.uCam,q.cam.th,q.cam.tv,q.cam.far-2,0),e.uniform4f(o.u.uGrid,q.cam.g0[0],q.cam.g0[1],q.cam.gs[0],q.cam.gs[1]),e.uniform2i(o.u.uVisSize,F,Y),e.uniform4fv(o.u.uLs,i),e.uniform2fv(o.u.uLsh,r),e.uniform1i(o.u.uNs,_e),N(o,"uNrm",J[1],0),N(o,"uDep",J[2],1),N(o,"uVis",J[3],2),e.drawArrays(e.TRIANGLES,0,3)}return e.bindFramebuffer(e.FRAMEBUFFER,s.fb),e.viewport(0,0,s.w,s.h),e.useProgram(a.p),ge(e,a,S,p),e.uniform3fv(a.u.uNeon,l),e.uniform1i(a.u.uShapeA,B),e.uniform1i(a.u.uShapeB,P),e.uniform1f(a.u.uShapeM,D*D*(3-2*D)),e.uniform1f(a.u.uPx,1/s.h),e.uniform1i(a.u.uStage,ne),e.uniform1f(a.u.uHZ,ee),e.uniform2fv(a.u.uC,K),e.uniform1f(a.u.uSc,G),e.uniform4fv(a.u.uRect,oe),e.uniform4fv(a.u.uSmk,T),e.uniform1fv(a.u.uSmkI,E),e.uniform1f(a.u.uHasSmoke,$?1:0),e.uniform1f(a.u.uFade,y),ne>0&&(e.uniform4f(a.u.uCam,q.cam.th,q.cam.tv,q.cam.far-2,0),e.uniform3fv(a.u.uUp,q.cam.up),e.uniform2i(a.u.uVisSize,q.cam.vis[0],q.cam.vis[1]),e.uniform4fv(a.u.uLs,i),e.uniform1i(a.u.uNs,_e),e.uniform3fv(a.u.uLight,q.light),e.uniform3fv(a.u.uAmb,q.amb),e.uniform1f(a.u.uLightPulse,.6+.5*S.pulse+.2*Math.min(S.bass,2)),e.uniform1i(a.u.uView,u)),N(a,"uAlb",J?J[0]:null,0),N(a,"uNrm",J?J[1]:null,1),N(a,"uDep",J?J[2]:null,2),N(a,"uSky",J&&J[4]?J[4]:null,3),N(a,"uShadow",ne>0?n.tex:null,4),N(a,"uSmoke",$?$[0]:null,5),e.activeTexture(e.TEXTURE0),e.drawArrays(e.TRIANGLES,0,3),s.tex},info:()=>`${U>=0?We[U].name:"Felsen"} (B)`,debug(S){S.stage!=null&&(v=S.stage),S.shape!=null&&(B=P=S.shape,D=1),S.hover!==void 0&&(f=S.hover),S.view!=null&&(u=S.view)},dispose(){s&&s.dispose(),n&&n.dispose(),e.deleteProgram(o.p);for(const S of te)S.release();w.release(),e.deleteProgram(a.p)}}}const Bn=`#version 300 es
precision mediump float;
in vec3 vc; out vec4 o;
void main(){ float d = length(gl_PointCoord - .5) * 2.; o = vec4(vc * smoothstep(1., .2, d), 1.); }`,Ln=me(`
uniform sampler2D uPrev; uniform float uDecay;
void main(){ o = vec4(max(texture(uPrev, uv).rgb * uDecay - .002, 0.), 1.); }`),Dt=64e3,qn=`#version 300 es
${je}
${qt}
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
  float y = 1. - 2. * fi / ${Dt}.;
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
}`,at=240,Mt=150,_n=`#version 300 es
${je}
${qt}
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
  int id = gl_VertexID, ix = id % ${at}, iz = id / ${at};
  float u = float(ix) / ${at-1}., v = float(iz) / ${Mt-1}.;
  // Übergang läuft als Welle von vorne nach hinten über die Fläche
  mm = clamp(uMorph * 1.6 - (v * .5 + hash12(vec2(u, v) * 91.) * .1), 0., 1.);
  mm = mm * mm * (3. - 2. * mm);
  vec4 P = pos(u, v);
  vec3 px = pos(u + 1. / ${at}., v).xyz, pz = pos(u, v + 1. / ${Mt}.).xyz;
  vec3 nrm = normalize(cross(pz - P.xyz, px - P.xyz));
  if (nrm.y < 0.) nrm = -nrm;
  vec4 clip = uVP * vec4(P.xyz, 1.);
  gl_Position = clip;
  gl_PointSize = clamp((2. + 2.5 * P.w) * uPx / clip.w, 1., 6.);
  float light = .18 + .82 * pow(max(0., dot(nrm, normalize(vec3(-.55, .75, -.4)))), 1.5);
  float dist = length(P.xyz - vec3(0., 0., 2.));
  float fade = exp(-max(0., P.z) * .2) * smoothstep(0., .06, v) * smoothstep(1., .9, v);
  vc = mix(vec3(1.), pal(u * .5 + v * .3 + P.w * .3), uTint) * (light * .55 + P.w * 1.4) * fade * .6;
}`;function Nt(e,t,a,o,s){const n=ue(e,Bn,a),i=ue(e,Ln),r=e.createVertexArray();let c=null,f=null,u=0;return{resize(l,m){c&&c.dispose(),f&&f.dispose(),c=Lt(e,l,m,t),f=ke(e,l,m,t)},tint(l){u=l},render(l,m,h){return e.bindFramebuffer(e.FRAMEBUFFER,c.dst.fb),e.viewport(0,0,c.dst.w,c.dst.h),e.useProgram(i.p),xe(e,i,"uPrev",c.src.tex,0),e.uniform1f(i.u.uDecay,Math.pow(h,l.dt*60)),e.bindVertexArray(m.quadVao),e.drawArrays(e.TRIANGLES,0,3),e.useProgram(n.p),ge(e,n,l,m),e.uniform1f(n.u.uPx,c.dst.h/240),e.uniform1f(n.u.uTint,u),s(n),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE),e.bindVertexArray(r),e.drawArrays(e.POINTS,0,o),e.disable(e.BLEND),c.swap(),c.src.tex},dispose(){c&&c.dispose(),f&&f.dispose(),e.deleteVertexArray(r),e.deleteProgram(n.p),e.deleteProgram(i.p)}}}const Re=[{name:"Weiss",v:0},{name:"Hauch Farbe",v:.35},{name:"Cover-Farben",v:.85}];function It(e,t,a=6){let o=0,s=0,n=1,i=-1e9,r=0,c=Ne(e);const f=Ie({beats:64,minSec:45,maxSec:100}),u=l=>{o=s,s=l,n=0,f.reset()};return{tick(l,m){if(r+=m,f.tick(l,m)&&n>=1&&r-i>120){let h=c.next();h===s&&(h=c.next()),u(h)}return n=Math.min(1,n+m/a),{a:o,b:s,m:n}},next(){return i=r,u((s+1)%e),`Muster: ${t[s]}`},name:()=>t[s],seed(l){s=Math.floor(l*e)%e,o=s,n=1;let m=Math.floor(l*1e6)||1;c=Ne(e,()=>(m=m*16807%2147483647)/2147483647),f.reset()}}}function Dn(e,t){let a=0,o=9,s=0,n=0,i=null,r=[0,0,3.4],c=0,f=null,u={a:0,b:0,m:1};const l=It(4,["gefaltet","Stacheln","Ringe","Blüte"]),m=Nt(e,t,qn,Dt,h=>{e.uniformMatrix4fv(h.u.uVP,!1,i),e.uniform1f(h.u.uRip,o),e.uniform1f(h.u.uRipAmp,s),e.uniform3fv(h.u.uEye,r),e.uniform1i(h.u.uVa,u.a),e.uniform1i(h.u.uVb,u.b),e.uniform1f(h.u.uMorph,u.m)});return{look:{linear:!0,bloom:.45,scale:1},keys:{p:()=>(c=(c+1)%Re.length,m.tint(Re[c].v),`Farbe: ${Re[c].name}`),m:()=>l.next()},resize:(h,x)=>m.resize(h,x),render(h,x){return a+=h.dt,f!==x.seed&&(f=x.seed,l.seed(x.seed)),u=l.tick(h,h.dt),h.events.kick!==n&&(n=h.events.kick,o=0,s=1),o+=h.dt*2.6,s*=Math.exp(-h.dt*1.6),r=[0,.15*Math.sin(a*.07),3.6],i=St(kt(40*Math.PI/180,x.aspect,.1,20),yt(r,[0,0,0])),m.render(h,x,0)},info:()=>`${l.name()} (M) · ${Re[c].name} (P)`,dispose:()=>m.dispose()}}const zt=[[1.25,-1.5,-.2,2.8],[2.7,-.25,-.35,2.3],[2,-.7,-.25,2.4],[.95,-1.25,0,3]];function Nn(e,t){let a=0,o=9,s=0,n=0,i=null,r=2,c=null,f={a:0,b:0,m:1};const u=It(4,["Stoff","Spirale","Ringe","Landschaft"]),l=Nt(e,t,_n,at*Mt,m=>{e.uniformMatrix4fv(m.u.uVP,!1,i),e.uniform1f(m.u.uKickR,o),e.uniform1f(m.u.uKickAmp,s),e.uniform1i(m.u.uVa,f.a),e.uniform1i(m.u.uVb,f.b),e.uniform1f(m.u.uMorph,f.m)});return l.tint(Re[r].v),{look:{linear:!0,bloom:.5,scale:1},keys:{p:()=>(r=(r+1)%Re.length,l.tint(Re[r].v),`Farbe: ${Re[r].name}`),m:()=>u.next()},resize:(m,h)=>l.resize(m,h),render(m,h){a+=m.dt,c!==h.seed&&(c=h.seed,u.seed(h.seed)),f=u.tick(m,m.dt),m.events.kick!==n&&(n=m.events.kick,o=0,s=1),o+=m.dt*2.2,s*=Math.exp(-m.dt*1.4);const x=zt[f.a],A=zt[f.b],B=f.m*f.m*(3-2*f.m),P=x.map((te,w)=>te+(A[w]-te)*B),D=Math.sin(a*.05)*.3,C=[D,P[0]+.08*Math.sin(a*.04),P[1]];return i=St(kt(50*Math.PI/180,h.aspect,.05,30),yt(C,[D*.3,P[2],P[3]])),l.render(m,h,.45)},info:()=>`${u.name()} (M) · ${Re[r].name} (P)`,dispose:()=>l.dispose()}}function ct(e,t,a,{look:o,label:s,keys:n,help:i,info:r,before:c,setup:f,debug:u}){const l=ue(e,a);let m=null;return{look:o,label:s,keys:n,help:i,info:r,debug:u,resize(h,x){m&&m.dispose(),m=ke(e,h,x,t)},render(h,x){return c&&c(h,x),e.bindFramebuffer(e.FRAMEBUFFER,m.fb),e.viewport(0,0,m.w,m.h),e.useProgram(l.p),ge(e,l,h,x),f&&f(l,h,x),e.bindVertexArray(x.quadVao),e.drawArrays(e.TRIANGLES,0,3),m.tex},dispose(){m&&m.dispose(),e.deleteProgram(l.p)}}}const In=me(`
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
}`);function Un(e,t){let a=0,o=0,s=0,n=0,i=0,r=0,c=0,f=0,u=0,l=0,m=1;const h=[6,4,8,3],x=[20,16,24,12];let A=6,B=0,P=0,D=20,C=0,te=0,w=0,v=0,U=1,y=1,d=0,M=0,V=-99,Z=1,j=1,b=0,k=0;const L=Array.from({length:8},()=>({rail:0,z:0,b:0,hue:0})),S=new Float32Array(32),p=Ie({beats:32,minSec:12,maxSec:28}),g=z=>[U*(Math.sin(z*.21)*2.4+Math.sin(z*.083)*1.9),U*(Math.sin(z*.16+1)*1.6+Math.cos(z*.059)*1.2)],O=z=>{d=1;const R=z?[0,1,2,3]:[[0],[1],[2],[3],[4]][Math.floor(Math.random()*5)];for(const q of R)if(q===0)P>.5&&Math.random()<.4?P=0:(A=h[Math.floor(Math.random()*h.length)],P=1);else if(q===1){let J=D;for(;J===D;)J=x[Math.floor(Math.random()*x.length)];D=J}else q===2?te=Math.random()<.4?0:(Math.random()<.5?-1:1)*(.5+Math.random()*.7):q===3?v+=.2+Math.random()*.35:q===4&&(u=f,l=f+(Math.random()<.5?-1:1)*Math.PI*2,m=0);y=.7+Math.random()*.8};return ct(e,t,In,{look:{linear:!0,bloom:.7,scale:1},before(z){const R=z.dt;k+=R;const q=(Math.min(3,z.bassAtt)+Math.min(3,z.midAtt))/2;Z+=(q-Z)*(1-Math.exp(-R/.25)),j+=(q-j)*(1-Math.exp(-R/6)),z.playing&&Z>j*1.45&&Z>1.15&&k-V>10&&(V=k,M=1,O(!0)),M*=Math.exp(-R/1.3);const J=z.conf>.4?z.bpm/60*.72:.6+.8*Math.min(2,z.bassAtt);if(a+=R*J*(1+2.2*M)*(z.playing?1:.15),o+=R*.02*(z.midAtt-.9),z.events.kick!==i&&(i=z.events.kick,s=1,n=a+7),s*=Math.exp(-R*1.8),z.events.onset!==r){r=z.events.onset;const G=L.reduce((oe,T)=>T.b<oe.b?T:oe,L[0]);G.rail=Math.floor(Math.random()*D),G.z=a+10+Math.random()*4,G.b=.6+.4*Math.min(1,z.onset),G.hue=w+Math.random()*.4}for(const G of L)G.z-=R*(5+6*M),G.z<a+.3&&(G.b=0),G.b*=Math.exp(-R*.35);b+=(.07*Math.min(2,z.bass)-.04-b)*(1-Math.exp(-R*10));const $=g(a-.05),ne=g(a+.05),K=(g(a+1.5)[0]-ne[0])/1.45-(ne[0]-$[0])/.1;if(c+=(Math.max(-.85,Math.min(.85,-K*.5))-c)*(1-Math.exp(-R*2)),m<1){m=Math.min(1,m+R/2.6);const G=m*m*(3-2*m);f=u+(l-u)*G}p.tick(z,R)&&O(!1),d*=Math.exp(-R/.25),B+=(P-B)*(1-Math.exp(-R*.8)),C+=(te-C)*(1-Math.exp(-R*.5)),w+=(v-w)*(1-Math.exp(-R*.8)),U+=(y-U)*(1-Math.exp(-R*.25))},setup(z){e.uniform1f(z.u.uSpeed,a),e.uniform1f(z.u.uTwist,o),e.uniform1f(z.u.uRing,s),e.uniform1f(z.u.uRingDepth,n),e.uniform1f(z.u.uRoll,c+f),e.uniform1f(z.u.uSides,A),e.uniform1f(z.u.uPoly,B),e.uniform1f(z.u.uRails,D),e.uniform1f(z.u.uSpiral,C),e.uniform1f(z.u.uSecFlash,d),e.uniform1f(z.u.uWarp,M),e.uniform1f(z.u.uHue,w),e.uniform1f(z.u.uBreath,b),e.uniform1f(z.u.uBend,U),L.forEach((R,q)=>S.set([R.rail,R.z,R.b>.02?R.b:0,R.hue],q*4)),e.uniform4fv(z.u.uSpark,S)},debug(z){z.warp&&(M=1,O(!0)),z.section&&O(!1),z.spin&&(u=f,l=f+Math.PI*2,m=0)}})}const Cn=me(`
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
}`),nt=[{grid:[1,.08,.75],rim:[.1,.85,1],sunA:[1,.12,.45],sunB:[1,.85,.2],sky:[.35,.03,.28]},{grid:[.05,.85,1],rim:[.9,.3,1],sunA:[1,.35,.1],sunB:[1,.9,.35],sky:[.12,.03,.35]},{grid:[1,.35,.05],rim:[1,.85,.3],sunA:[.9,.08,.2],sunB:[1,.75,.3],sky:[.05,.05,.3]},{grid:[.2,1,.45],rim:[.2,.8,1],sunA:[.1,.6,1],sunB:[.75,1,.9],sky:[.02,.12,.2]}];function Vn(e,t){let a=0,o=-99,s=0,n=0,i=0,r=.35,c=0,f=0,u=1;const l=Ie({beats:64,minSec:45,maxSec:100}),m=(h,x,A)=>h.map((B,P)=>B+(x[P]-B)*A);return ct(e,t,Cn,{look:{linear:!0,bloom:.45,scale:1},keys:{p:()=>(f=c,c=(c+1)%nt.length,u=0,l.reset(),"Farben gewechselt")},help:"P Farben",before(h){const x=h.conf>.4?h.bpm/60:1.2;a+=h.dt*x*1.1*(h.playing?1:.2),h.events.kick!==s&&(s=h.events.kick,o=a+1.5),o+=h.dt*9,h.events.onset!==n&&(n=h.events.onset,i<=0&&Math.random()<.06&&(i=.001,r=.24+Math.random()*.16)),i>0&&(i=i+h.dt*.9>1?0:i+h.dt*.9),l.tick(h,h.dt)&&(f=c,c=(c+1+Math.floor(Math.random()*(nt.length-1)))%nt.length,u=0),u=Math.min(1,u+h.dt/4)},setup(h,x){e.uniform1f(h.u.uMove,a),e.uniform1f(h.u.uSun,x.pulse),e.uniform1f(h.u.uWave,o),e.uniform1f(h.u.uShoot,i),e.uniform1f(h.u.uShootY,r);const A=nt[f],B=nt[c],P=u*u*(3-2*u);for(const[D,C]of[["uGrid","grid"],["uRim","rim"],["uSunA","sunA"],["uSunB","sunB"],["uSky","sky"]])e.uniform3fv(h.u[D],m(A[C],B[C],P))}})}const Hn=me(`
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
}`),Kn=me(`
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
}`);function Gn(e,t){const a=[];for(let l=0;l<32;l++){const m=1-2*(l+.5)/32,h=Math.sqrt(1-m*m),x=l*2.39996323;a.push(Math.cos(x)*h,m,Math.sin(x)*h)}const o=ue(e,Hn),s=rt(e,[{name:"studio_rgbe.png",srgb:!1,mip:!1,nearest:!0}]),n=ke(e,1024,512,t);e.bindTexture(e.TEXTURE_2D,n.tex),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.REPEAT);const i=new Float32Array(32),r=new Float32Array(32);let c=0;const f=ct(e,t,Kn,{look:{linear:!0,bloom:.3,scale:1},before(l,m){c+=l.dt*(.15+.15*Math.min(2,l.midAtt));const h=1-Math.exp(-l.dt/.06),x=1-Math.exp(-l.dt/.3);for(let A=0;A<32;A++){const B=l.bands[A]||0;i[A]+=(B-i[A])*(B>i[A]?h:x),r[A]=Math.pow(Math.max(0,i[A]),1.2)}e.bindFramebuffer(e.FRAMEBUFFER,n.fb),e.viewport(0,0,n.w,n.h),e.useProgram(o.p),ge(e,o,l,m),e.uniform3fv(o.u.uDir,a),e.uniform1fv(o.u.uB,r),e.bindVertexArray(m.quadVao),e.drawArrays(e.TRIANGLES,0,3)},setup(l,m){const h=c,x=c*.7,A=Math.cos(h),B=Math.sin(h),P=Math.cos(x),D=Math.sin(x);e.uniformMatrix3fv(l.u.uRotM,!1,new Float32Array([A,B*D,-B*P,0,P,D,B,-A*D,A*P])),e.uniform1f(l.u.uR,.9+.08*Math.min(2,m.bassAtt)),e.uniform1f(l.u.uHS,.62),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,n.tex),e.uniform1i(l.u.uSpk,0);const C=s.get();e.uniform1f(l.u.uHasEnv,C?1:0),e.uniform1f(l.u.uEnvRot,.5),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,C?C[0]:null),e.uniform1i(l.u.uEnv,1),e.activeTexture(e.TEXTURE0)}}),u=f.dispose;return f.dispose=()=>{u(),n.dispose(),s.release(),e.deleteProgram(o.p)},f}const Wn=me(`
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
}`),we=[{name:"Grün",a:[.12,1,.45],b:[.45,.2,1]},{name:"Violett",a:[.55,.25,1],b:[1,.25,.6]},{name:"Rot-Grün",a:[.2,1,.4],b:[1,.15,.15]},{name:"Eisblau",a:[.2,.85,1],b:[.35,.3,1]}];function On(e,t){const a=rt(e,[{name:"bergsee_basis.webp"},{name:"bergsee_licht.webp"},{name:"bergsee_wasser.webp",srgb:!1}]);let o=0,s=0,n=0,i=0,r=0,c=0,f=0;const u=[0,0,1,0],l=Array.from({length:4},()=>({x:0,age:9,dir:1,s:0})),m=new Float32Array(16);let h=0,x=0,A=1,B=null,P=null;const D=Ie({beats:64,minSec:45,maxSec:110}),C=(v,U,y)=>v.map((d,M)=>d+(U[M]-d)*y),te=ct(e,t,Wn,{look:{linear:!0,bloom:.55,scale:1},keys:{p:()=>(x=h,h=(h+1)%we.length,A=0,D.reset(),`Farben: ${we[h].name}`)},help:"P Farben",info:()=>`${we[h].name} (P)`,before(v,U){if(P=a.get(),B!==U.seed){B=U.seed;const d=Math.floor(U.seed*37)%we.length;d!==h&&(x=h,h=d,A=0)}const y=Math.min(1,Math.max(0,(Math.min(2.2,(v.bassAtt+v.midAtt)/2)-.75)/.9));if(r+=(y-r)*(1-Math.exp(-v.dt/2.5)),o+=v.dt*(.35+.9*Math.min(2,v.midAtt)+.6*r)*(v.playing?1:.2),v.events.kick!==n){n=v.events.kick,s=Math.min(1.2,s+.45);const d=l.reduce((M,V)=>V.age>M.age?V:M,l[0]);d.dir=Math.random()<.5?-1:1,d.x=-d.dir*(.3+Math.random()*.5)*U.aspect*.5,d.age=0,d.s=.6+.4*Math.min(1,v.kick)}for(const d of l)d.age+=v.dt;if(s*=Math.exp(-v.dt*2.2),v.events.onset!==i&&(i=v.events.onset,c=Math.min(1,c+.5),f<=0&&Math.random()<.05)){f=.001;const d=Math.random()<.5?-1:1,M=-.25-Math.random()*.35;u[0]=-d*(.1+Math.random()*.5)*U.aspect*.5,u[1]=.28+Math.random()*.16,u[2]=d*Math.cos(M),u[3]=Math.sin(M)}c*=Math.exp(-v.dt*1.6),f>0&&(f=f+v.dt*1.1>1?0:f+v.dt*1.1),D.tick(v,v.dt)&&(x=h,h=(h+1+Math.floor(Math.random()*(we.length-1)))%we.length,A=0),A=Math.min(1,A+v.dt/5)},setup(v,U,y){const d=1.7777777777777777,M=Math.max(y.aspect,d),V=M/d;e.uniform4f(v.u.uRect,-M/2,-V/2,M,V),e.uniform1f(v.u.uFlow,o),e.uniform1f(v.u.uGlow,s),e.uniform1f(v.u.uAct,r),e.uniform1f(v.u.uFlare,c),e.uniform1f(v.u.uMet,f),e.uniform4fv(v.u.uMetP,u),l.forEach((j,b)=>m.set([j.x,j.age,j.dir,j.age<6?j.s:0],b*4)),e.uniform4fv(v.u.uWaves,m),e.uniform1f(v.u.uPx,1/y.h);const Z=A*A*(3-2*A);e.uniform3fv(v.u.uAurA,C(we[x].a,we[h].a,Z)),e.uniform3fv(v.u.uAurB,C(we[x].b,we[h].b,Z)),e.uniform1f(v.u.uHas,P?1:0),["uBase","uLight","uWater"].forEach((j,b)=>{v.u[j]!=null&&(e.activeTexture(e.TEXTURE0+b),e.bindTexture(e.TEXTURE_2D,P?P[b]:null),e.uniform1i(v.u[j],b))}),e.activeTexture(e.TEXTURE0)}});te.debug=v=>{v.act!=null&&(r=v.act),v.met&&(f=.001,u.splice(0,4,-.4,.38,Math.cos(-.35),Math.sin(-.35)))};const w=te.dispose;return te.dispose=()=>{w(),a.release()},te}const De=[{id:"klassik",name:"Klassik",make:fn},{id:"magnet",name:"Magnetfeld",make:Mn},{id:"neon",name:"Neon",make:Fn},{id:"sphaere",name:"Punktsphäre",make:Dn},{id:"welle",name:"Punktwelle",make:Nn},{id:"tunnel",name:"Tunnelflug",make:Un},{id:"polarlicht",name:"Polarlicht",make:On},{id:"synthwave",name:"Synthwave",make:Vn},{id:"ferrofluid",name:"Ferrofluid",make:Gn}],Xn=me(`
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
}`),jn=me(`
uniform sampler2D uSrc; uniform vec2 uPx;
vec3 s(vec2 d){ return texture(uSrc, uv + d * uPx).rgb; }
void main(){
  vec3 c = s(vec2(-1, -1)) + 2. * s(vec2(0, -1)) + s(vec2(1, -1))
         + 2. * s(vec2(-1, 0)) + 4. * s(vec2(0, 0)) + 2. * s(vec2(1, 0))
         + s(vec2(-1, 1)) + 2. * s(vec2(0, 1)) + s(vec2(1, 1));
  o = vec4(c / 16., 1.);
}`),Zn=me(`
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
}`);function $n(e){const t=e.getContext("webgl2",{antialias:!1,alpha:!1,preserveDrawingBuffer:!1,powerPreference:"high-performance"});if(!t)throw new Error("WebGL 2 fehlt");const a=!!t.getExtension("EXT_color_buffer_float")||!!t.getExtension("EXT_color_buffer_half_float"),o=t.createBuffer(),s=t.createVertexArray();t.bindVertexArray(s),t.bindBuffer(t.ARRAY_BUFFER,o),t.bufferData(t.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),t.STATIC_DRAW),t.enableVertexAttribArray(0),t.vertexAttribPointer(0,2,t.FLOAT,!1,0,0);const n=ue(t,Xn),i=ue(t,jn),r=ue(t,Zn),c=t.createTexture(),f=new Float32Array(512*2);t.bindTexture(t.TEXTURE_2D,c),t.texImage2D(t.TEXTURE_2D,0,t.R32F,512,2,0,t.RED,t.FLOAT,f),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.NEAREST);const u=t.createTexture();t.bindTexture(t.TEXTURE_2D,u),t.texImage2D(t.TEXTURE_2D,0,t.R32F,ve,128,0,t.RED,t.FLOAT,new Float32Array(ve*128)),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.NEAREST);let l=0,m=0;const h=new Float32Array(ve),x=De.map(k=>k.make(t,a));let A=0,B=0,P=1,D=[];const C={seed:.3,aspect:1,histRow:0,w:1,h:1,palette:new Float32Array(15),audioTex:c,histTex:u,quadVao:s,cover:null,coverPixels:null,coverCanvas:null,title:"",artist:""},te=k=>[Math.max(32,Math.round(A*(k.look.scale||1))),Math.max(32,Math.round(B*(k.look.scale||1)))],w=()=>{const k=Math.min(window.devicePixelRatio||1,2);e.width=Math.round(e.clientWidth*k)||1,e.height=Math.round(e.clientHeight*k)||1,A=Math.max(64,Math.round(e.width*P)),B=Math.max(64,Math.round(e.height*P)),C.aspect=A/B,t.bindVertexArray(s),t.disable(t.BLEND);for(const p of x)p.resize(...te(p));for(const p of D)p.dispose();D=[];let L=A,S=B;for(let p=0;p<6;p++)L=Math.max(4,L>>1),S=Math.max(4,S>>1),D.push(ke(t,L,S,a))};w();let v=0,U=-1,y=0,d=16,M=performance.now(),V=60;const Z=k=>{k!==v&&(U=v,v=k,y=1e-4)},j=(k,L)=>{const S=x[k],[p,g]=te(S);return C.w=p,C.h=g,t.bindVertexArray(s),t.disable(t.BLEND),S.render(L,C)};return{gl:t,frame:(k,L)=>{t.bindVertexArray(s),t.disable(t.BLEND);for(let K=0;K<ve;K++)f[K]=k.bands[K];if(f.set(k.wave,512),t.bindTexture(t.TEXTURE_2D,c),t.texSubImage2D(t.TEXTURE_2D,0,0,0,512,2,t.RED,t.FLOAT,f),m+=k.dt,m>=1/32){m%=1/32,l=(l+1)%128;for(let K=0;K<ve;K++)h[K]=k.bands[K]*(k.playing?1:0);t.bindTexture(t.TEXTURE_2D,u),t.texSubImage2D(t.TEXTURE_2D,0,0,l,ve,1,t.RED,t.FLOAT,h)}C.histRow=l;const S=j(v,k);let p=null;const g=U;g>=0&&(p=j(g,k),y=Math.min(1,y+k.dt/2.5)),t.bindVertexArray(s),t.disable(t.BLEND);let O=S,[z,R]=te(x[v]);t.useProgram(n.p);for(let K=0;K<D.length;K++){const G=D[K];t.bindFramebuffer(t.FRAMEBUFFER,G.fb),t.viewport(0,0,G.w,G.h),xe(t,n,"uSrc",O,0),t.uniform2f(n.u.uPx,1/z,1/R),t.uniform1f(n.u.uThresh,K===0?.3:0),t.drawArrays(t.TRIANGLES,0,3),O=G.tex,z=G.w,R=G.h}t.useProgram(i.p),t.enable(t.BLEND),t.blendFunc(t.ONE,t.ONE);for(let K=D.length-2;K>=0;K--){const G=D[K],oe=D[K+1];t.bindFramebuffer(t.FRAMEBUFFER,G.fb),t.viewport(0,0,G.w,G.h),xe(t,i,"uSrc",oe.tex,0),t.uniform2f(i.u.uPx,1/oe.w,1/oe.h),t.drawArrays(t.TRIANGLES,0,3)}t.disable(t.BLEND),t.blendFunc(t.ONE,t.ZERO);const q=x[v].look,J=p?x[g].look:q,$=p?y:1,ne=(K,G)=>(J[K]??G)+((q[K]??G)-(J[K]??G))*$;t.bindFramebuffer(t.FRAMEBUFFER,null),t.viewport(0,0,e.width,e.height),t.useProgram(r.p),ge(t,r,k,C),xe(t,r,"uA",p||S,0),xe(t,r,"uB",S,1),xe(t,r,"uBloom",D[0].tex,2),t.uniform1f(r.u.uMix,p?y:0),t.uniform1f(r.u.uExpo,ne("expo",1.1)),t.uniform1f(r.u.uBloomAmt,ne("bloom",.5)),t.uniform1f(r.u.uTone,ne("linear",1)),t.uniform1f(r.u.uVig,ne("vignette",.45)),t.uniform1f(r.u.uFlashAmt,Math.min(.12,k.flash*.1)),t.drawArrays(t.TRIANGLES,0,3),p&&y>=1&&(U=-1,y=0),d+=(L-d)*.05,V=1e3/Math.max(1,d);const ee=performance.now();d>22&&P>.5&&ee-M>5e3?(P=Math.max(.5,Math.round((P-.1)*10)/10),M=ee,w()):d<18&&P<1&&ee-M>2e4&&(P=Math.min(1,Math.round((P+.1)*10)/10),M=ee,w())},resize:w,setScene:Z,get scene(){return v},get fps(){return V},get scale(){return P},current:()=>x[v],setLook(k){for(const L of["palette","seed","title","artist"])k[L]!=null&&(C[L]=k[L]);k.cover!==void 0&&(C.cover=k.cover,C.coverPixels=k.coverPixels||null,C.coverCanvas=k.coverCanvas||null)},dispose(){const k=t.getExtension("WEBGL_lose_context");for(const L of x)L.dispose();for(const L of D)L.dispose();for(const L of[n,i,r])t.deleteProgram(L.p);k&&k.loseContext()}}}const vt=e=>e<=.04045?e/12.92:Math.pow((e+.055)/1.055,2.4);function Yn([e,t,a]){const o=Math.cbrt(.4122214708*e+.5363325363*t+.0514459929*a),s=Math.cbrt(.2119034982*e+.6806995451*t+.1073969566*a),n=Math.cbrt(.0883024619*e+.2817188376*t+.6299787005*a);return[.2104542553*o+.793617785*s-.0040720468*n,1.9779984951*o-2.428592205*s+.4505937099*n,.0259040371*o+.7827717662*s-.808675766*n]}function Qn([e,t,a]){const o=(e+.3963377774*t+.2158037573*a)**3,s=(e-.1055613458*t-.0638541728*a)**3,n=(e-.0894841775*t-1.291485548*a)**3;return[4.0767416621*o-3.3077115913*s+.2309699292*n,-1.2684380046*o+2.6097574011*s-.3413193965*n,-.0041960863*o-.7034186147*s+1.707614701*n].map(i=>Math.max(0,Math.min(1,i)))}const xt=new Float32Array([.25,.12,.9,.55,.15,.85,.1,.5,.95,.15,.85,.6,.95,.35,.45]);function Ft(e){let t=2166136261;for(const a of String(e||"x"))t=Math.imul(t^a.charCodeAt(0),16777619);return(t>>>0)%1e5/1e5}function Jn(e){return new Promise(t=>{if(!e)return t(null);const a=new Image;a.crossOrigin="anonymous",a.onload=()=>{try{const o=document.createElement("canvas");o.width=o.height=120;const s=o.getContext("2d",{willReadFrequently:!0});s.drawImage(a,0,0,120,120);const n=s.getImageData(0,0,120,120).data,i=document.createElement("canvas");i.width=i.height=512,i.getContext("2d").drawImage(a,0,0,512,512),t({pixels:n,palette:ea(n),canvas:i})}catch{t(null)}},a.onerror=()=>t(null),a.src=e})}function ea(e){const t=[];for(let i=0;i<e.length;i+=16)t.push(Yn([vt(e[i]/255),vt(e[i+1]/255),vt(e[i+2]/255)]));const a=5,o=[t[Math.floor(t.length/2)]];for(;o.length<a;){let i=null,r=-1;for(const c of t){let f=1/0;for(const u of o)f=Math.min(f,(c[0]-u[0])**2+(c[1]-u[1])**2+(c[2]-u[2])**2);f>r&&(r=f,i=c)}o.push(i)}const s=new Array(a).fill(0);for(let i=0;i<8;i++){const r=o.map(()=>[0,0,0]);s.fill(0);for(const c of t){let f=0,u=1/0;for(let l=0;l<a;l++){const m=o[l],h=(c[0]-m[0])**2+(c[1]-m[1])**2+(c[2]-m[2])**2;h<u&&(u=h,f=l)}s[f]++,r[f][0]+=c[0],r[f][1]+=c[1],r[f][2]+=c[2]}for(let c=0;c<a;c++)s[c]&&(o[c]=r[c].map(f=>f/s[c]))}const n=o.map(([i,r,c],f)=>{let u=Math.hypot(r,c),l=Math.atan2(c,r);u<.03&&(l=4.2+f*.5),u=Math.max(.09,Math.min(.2,u*1.25));const m=Math.max(.62,Math.min(.85,i*.6+.4));return{h:l,rgb:Qn([m,u*Math.cos(l),u*Math.sin(l)])}});return n.sort((i,r)=>i.h-r.h),new Float32Array(n.flatMap(i=>i.rgb))}const Oe={get(e,t){try{const a=localStorage.getItem("viz."+e);return a==null?t:JSON.parse(a)}catch{return t}},set(e,t){try{localStorage.setItem("viz."+e,JSON.stringify(t))}catch{}}};function na({track:e,onClose:t}){const a=fe.useRef(null),o=fe.useRef(null),s=fe.useRef(null),[n,i]=fe.useState(!0),[r,c]=fe.useState(()=>Math.min(De.length-1,Math.max(0,Oe.get("scene",0)))),[f,u]=fe.useState(()=>!!Oe.get("calm",!1)),[l,m]=fe.useState(()=>!!Oe.get("auto",!1)),[h,x]=fe.useState(!1),[A,B]=fe.useState(""),[P,D]=fe.useState(""),[C,te]=fe.useState(null),w=fe.useRef(f),v=fe.useRef(l);w.current=f,v.current=l;const U=d=>{const M=o.current;if(!M)return;const V=(d%De.length+De.length)%De.length;M.setScene(V),c(V),Oe.set("scene",V),i(!0);const Z=M.current().needs;B(Z||"")};fe.useEffect(()=>{const d=o.current;if(!d)return;d.setLook({seed:Ft(e&&e.id),palette:xt,cover:null,title:e&&e.title||"",artist:e&&e.artist||""});let M=!1;return Jn(e&&e.albumId?Wt(e.albumId,640):null).then(V=>{M||!o.current||o.current.setLook({palette:V?V.palette:xt,cover:e&&e.albumId||null,coverPixels:V?V.pixels:null,coverCanvas:V?V.canvas:null})}),()=>{M=!0}},[e&&e.id,e&&e.albumId,!!o.current]),fe.useEffect(()=>{i(!0);let d=setTimeout(()=>i(!1),5e3);const M=()=>{i(!0),clearTimeout(d),d=setTimeout(()=>i(!1),2500)};return window.addEventListener("pointermove",M),()=>{clearTimeout(d),window.removeEventListener("pointermove",M)}},[e&&e.id,r,f,l,A]),fe.useEffect(()=>{const d=M=>{const V=M.key.toLowerCase(),Z=o.current;if(V==="escape"||V==="v"&&!M.ctrlKey&&!M.metaKey||V==="t"&&(M.ctrlKey||M.metaKey))t();else if(V==="arrowright"||V==="n")U((Z?Z.scene:0)+1);else if(V==="arrowleft")U((Z?Z.scene:0)-1);else if(/^[0-9]$/.test(V)&&(Number(V)||10)<=De.length)U((Number(V)||10)-1);else if(V==="r")u(j=>(Oe.set("calm",!j),!j));else if(V==="a")m(j=>(Oe.set("auto",!j),!j));else if(V==="d")x(j=>!j);else if(Z&&Z.current().keys&&Z.current().keys[V])B(Z.current().keys[V]()||"");else return;M.preventDefault(),M.stopPropagation()};return window.addEventListener("keydown",d,!0),()=>window.removeEventListener("keydown",d,!0)},[t]),fe.useEffect(()=>{let d;try{d=$n(a.current)}catch(R){console.error(R),D(String(R&&R.message||R).split(`
`)[0]);return}o.current=d;const M=jt();s.current=M;let V=0,Z=0;const j=Xt(R=>{V++,Z+=(R.frames||[]).length,M.push(R)});d.setLook({seed:Ft(e&&e.id),palette:xt,title:e&&e.title||"",artist:e&&e.artist||""}),d.setScene(r),B(d.current().needs||"");let b=0,k=performance.now(),L=performance.now(),S=performance.now();const p=R=>{const q=R-k,J=Math.min(.1,q/1e3);k=R;const $=M.update(J);w.current&&($.flash=0,$.kick*=.35,$.pulse*=.35),v.current&&$.playing&&(R-L)/1e3>180&&($.conf<.4||$.phase<.08)&&(L=R,U(d.scene+1));try{d.frame($,q)}catch(ne){console.error(ne)}if(R-S>500){const ne=(R-S)/1e3;te({fps:d.fps,scale:d.scale,msg:V/ne,frames:Z/ne,bpm:$.bpm,conf:$.conf,playing:$.playing,kicks:$.events.kick,int:$.intensity,bands:Array.from($.bands),info:d.current().info?d.current().info():""}),V=0,Z=0,S=R}b=requestAnimationFrame(p)};b=requestAnimationFrame(p);const g=()=>d.resize();window.addEventListener("resize",g);const O=R=>{R.preventDefault(),D("Die Grafikkarte hat den Visualizer beendet – bitte nochmals öffnen.")},z=a.current;return z.addEventListener("webglcontextlost",O),()=>{cancelAnimationFrame(b),window.removeEventListener("resize",g),z.removeEventListener("webglcontextlost",O),j(),d.dispose(),o.current=null}},[]);const y=o.current&&o.current.current().label==="center";return ie.jsxs("div",{className:"fixed inset-0 z-[70] bg-black",onClick:t,style:{cursor:n?"default":"none"},children:[ie.jsx("canvas",{ref:a,className:"absolute inset-0 h-full w-full"}),P&&ie.jsxs("div",{className:"absolute inset-0 grid place-items-center p-8 text-center text-sm text-zinc-400",children:["Visualizer geht hier nicht: ",P]}),y&&e&&ie.jsxs("div",{className:"pointer-events-none absolute inset-x-0 top-[66%] text-center",style:{textShadow:"0 0 18px rgba(0,0,0,.8)"},children:[ie.jsx("div",{className:"truncate px-8 text-2xl font-bold text-white sm:text-3xl",children:e.artist}),ie.jsx("div",{className:"mt-1 truncate px-8 text-base text-zinc-200 sm:text-lg",children:e.title})]}),ie.jsxs("div",{className:"pointer-events-none absolute bottom-8 left-8 max-w-[80vw] transition-opacity duration-700 "+(n?"opacity-100":"opacity-0"),children:[e&&!y&&ie.jsxs(ie.Fragment,{children:[ie.jsx("div",{className:"truncate text-2xl font-bold text-white drop-shadow-lg",children:e.title}),ie.jsx("div",{className:"truncate text-lg text-zinc-300 drop-shadow",children:e.artist})]}),ie.jsxs("div",{className:"mt-2 text-xs text-zinc-400 drop-shadow",children:[ie.jsxs("span",{className:"text-zinc-100",children:[r+1," ",De[r].name]}),C&&C.info?` · ${C.info}`:"",l?" · wechselt automatisch (A)":"",f?" · ruhig (R)":""]}),ie.jsxs("div",{className:"mt-0.5 text-[11px] text-zinc-500 drop-shadow",children:["1–9 / ← → Stil · ",o.current&&o.current.current().help||"M Muster · P Farben"," · A automatisch · R ruhig · D Diagnose · Esc schliessen"]}),A&&ie.jsx("div",{className:"mt-1 text-xs text-amber-300 drop-shadow",children:A})]}),h&&C&&ie.jsxs("div",{className:"pointer-events-none absolute right-4 top-4 w-72 rounded-xl bg-black/70 p-3 font-mono text-[11px] leading-5 text-zinc-300",children:[ie.jsxs("div",{children:["Bild: ",C.fps.toFixed(0)," fps · Auflösung ",Math.round(C.scale*100)," %"]}),ie.jsxs("div",{children:["Daten: ",C.msg.toFixed(0)," Pakete/s · ",C.frames.toFixed(0)," Frames/s ",C.playing?"":"· (keine Musik)"]}),ie.jsxs("div",{children:["Tempo: ",C.bpm?`${C.bpm.toFixed(1)} BPM`:"–"," · sicher ",Math.round(C.conf*100)," % · Kicks ",C.kicks]}),ie.jsxs("div",{children:["Spannung: ",Math.round(C.int*100)," %"]}),ie.jsx("div",{className:"mt-1 flex h-10 items-end gap-px",children:C.bands.map((d,M)=>ie.jsx("span",{className:"flex-1 bg-accent/80",style:{height:`${Math.min(100,d*80)}%`}},M))})]})]})}export{na as default};
