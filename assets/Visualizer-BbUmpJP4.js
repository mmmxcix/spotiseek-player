import{u as je,r as H,c as Ke,j as O}from"./index-Yf5EMzwH.js";const g=32,We=.07;function Ye(e){let t=!1,o=null;return(async()=>{for(;!t;){try{o=new AbortController;const s=await fetch(je("/api/player/viz",!0),{signal:o.signal,cache:"no-store"});if(!s.ok||!s.body)throw new Error(`Fehler ${s.status}`);const n=s.body.getReader(),r=new TextDecoder;let i="";for(;;){const{value:c,done:f}=await n.read();if(f||t)break;i+=r.decode(c,{stream:!0});let d;for(;(d=i.indexOf(`

`))>=0;){const h=i.slice(0,d);if(i=i.slice(d+2),h.startsWith("data: "))try{e(JSON.parse(h.slice(6)))}catch{}}}}catch{}t||await new Promise(s=>setTimeout(s,800))}})(),()=>{t=!0,o&&o.abort()}}function Ze(){const e=[];let t=null,o=new Float32Array(512),a={bpm:0,conf:0,beat0:0,int:0,playing:!1},s=0;const n={t:0,dt:0,playing:!1,bands:new Float32Array(g),db:new Float32Array(g),wave:new Float32Array(512),bass:1,mid:1,treb:1,bassAtt:1,midAtt:1,trebAtt:1,kick:0,onset:0,pulse:0,flash:0,phase:0,beatIndex:0,conf:0,bpm:0,intensity:0,rms:0,centroid:0,lowClock:0,midClock:0,highClock:0,events:{kick:0,onset:0}},r=[0,0,0],i=[0,0,0],c=[0,0,0];let f=0;const d=new Float32Array(g).fill(-90);let h=-90,x=-9,E=-9,F=-9,V=0,L=0,_=0,I=.05;const P=u=>{const D=performance.now()/1e3-u.now;t=t==null?D:Math.min(D,t+.002);for(const v of u.frames||[])(!e.length||v.at>e[e.length-1].at)&&e.push(v);for(;e.length>600;)e.shift();u.wave&&(o=Float32Array.from(u.wave)),a={bpm:u.bpm||0,conf:u.conf||0,beat0:u.beat0||0,int:u.int||0,playing:!!u.playing}},N=(u,k)=>Math.pow(u,k*30);return{push:P,update:u=>{const k=performance.now()/1e3;n.dt=u,n.t+=u,n.playing=a.playing&&e.length>0;const D=t==null?0:k-t-We;let v=e.findIndex(m=>m.at>D),p=null;if(e.length){if(v===-1)p={f0:e[e.length-1],f1:e[e.length-1],k:0};else if(v===0)p={f0:e[0],f1:e[0],k:0};else{const m=e[v-1],R=e[v];p={f0:m,f1:R,k:Math.min(1,Math.max(0,(D-m.at)/Math.max(.001,R.at-m.at)))}}D-e[e.length-1].at>.5&&(p=null)}if(p){for(const m of e)if(!(m.at<=s)){if(m.at>D)break;m.k&&(n.events.kick++,x=n.t),m.on&&(n.events.onset++,E=n.t)}}const y=[];if(p)for(const m of e)m.at>s&&m.at<=D&&y.push(m);s=D;const w=(m,R,G)=>m+(R-m)*G;let T=-90;for(let m=0;m<g;m++){let R=-100;if(p){R=w(p.f0.b[m],p.f1.b[m],p.k);for(const G of y)R=Math.max(R,G.b[m])}n.db[m]=R,d[m]=R>d[m]?R:Math.max(-90,d[m]-5*u),T=Math.max(T,d[m])}h=T>h?T:Math.max(-90,h-5*u);for(let m=0;m<g;m++){const R=n.db[m],G=.6*d[m]+.4*h,Z=Math.min(1,Math.max(0,(R+82)/12)),C=Math.min(1.15,Math.max(0,1+(R-G)/28))*Z,W=C>n.bands[m]?1-Math.exp(-u*30):1-Math.exp(-u*8);n.bands[m]+=(C-n.bands[m])*W}for(let m=0;m<3;m++){let R=p?w(p.f0.bmt[m],p.f1.bmt[m],p.k):0;for(const W of y)R=Math.max(R,W.bmt[m]);r[m]=R;const G=r[m]>i[m],Z=N(G?.2:.5,u);i[m]=i[m]*Z+r[m]*(1-Z);const C=N(f<50?.9:.992,u);c[m]=c[m]*C+r[m]*(1-C)}p&&(f+=u*30);const l=(m,R)=>c[R]>1e-5?Math.min(3,m/c[R]):0;if(n.bass=l(r[0],0),n.mid=l(r[1],1),n.treb=l(r[2],2),n.bassAtt=l(i[0],0),n.midAtt=l(i[1],1),n.trebAtt=l(i[2],2),n.bpm=a.bpm,n.conf=a.conf,a.bpm>0&&a.conf>.3&&t!=null){const m=60/a.bpm,R=(D-a.beat0)/m;n.phase=(R%1+1)%1,n.beatIndex=Math.floor(R)}else n.phase=(n.phase+u*2)%1;n.kick=Math.exp(-(n.t-x)/.14),n.onset=Math.exp(-(n.t-E)/.09),n.pulse=n.conf>.45?Math.exp(-(n.phase*60)/Math.max(40,n.bpm)/.12)*(n.playing?1:0):n.kick,x===n.t&&n.t-F>.34&&(F=n.t),n.flash=Math.exp(-(n.t-F)/.12);const b=1-Math.exp(-u*1.2);V+=((n.playing?a.int:0)-V)*(1-Math.exp(-u*.5)),L+=((p?w(p.f0.rms,p.f1.rms,p.k):0)-L)*b,_+=((p?w(p.f0.c,p.f1.c,p.k):_)-_)*b,n.intensity=V,n.rms=L,n.centroid=_,n.lowClock+=u*(.25+.9*Math.min(2,n.bassAtt)),n.midClock+=u*(.25+.9*Math.min(2,n.midAtt)),n.highClock+=u*(.25+.9*Math.min(2,n.trebAtt));let U=0;for(let m=0;m<512;m++)U=Math.max(U,Math.abs(o[m]));I=Math.max(U,I*Math.exp(-u*.4),.02);const A=1-Math.exp(-u*30);for(let m=0;m<512;m++)n.wave[m]+=((n.playing?o[m]/I:0)-n.wave[m])*A;return n},A:n}}const Je=`#version 300 es
in vec2 p; out vec2 uv;
void main(){ uv = p * 0.5 + 0.5; gl_Position = vec4(p, 0.0, 1.0); }`,he=`
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
`;function K(e,t,o=Je){const a=e.createProgram();for(const[r,i]of[[e.VERTEX_SHADER,o],[e.FRAGMENT_SHADER,t]]){const c=e.createShader(r);if(e.shaderSource(c,i),e.compileShader(c),!e.getShaderParameter(c,e.COMPILE_STATUS)){const f=e.getShaderInfoLog(c);throw new Error("Shader: "+f+`
`+i.split(`
`).map((d,h)=>`${h+1}: ${d}`).join(`
`).slice(0,4e3))}e.attachShader(a,c)}if(e.bindAttribLocation(a,0,"p"),e.linkProgram(a),!e.getProgramParameter(a,e.LINK_STATUS))throw new Error(e.getProgramInfoLog(a));const s={},n=e.getProgramParameter(a,e.ACTIVE_UNIFORMS);for(let r=0;r<n;r++){const i=e.getActiveUniform(a,r).name.replace(/\[0\]$/,"");s[i]=e.getUniformLocation(a,e.getActiveUniform(a,r).name)}return{p:a,u:s}}const ae=e=>`#version 300 es
${he}
in vec2 uv; out vec4 o;
${e}`;function le(e,t,o,a,s=!0,n=!1){const r=e.createTexture();e.bindTexture(e.TEXTURE_2D,r),n?e.texImage2D(e.TEXTURE_2D,0,e.RGBA32F,t,o,0,e.RGBA,e.FLOAT,null):a?e.texImage2D(e.TEXTURE_2D,0,e.RGBA16F,t,o,0,e.RGBA,e.HALF_FLOAT,null):e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,t,o,0,e.RGBA,e.UNSIGNED_BYTE,null);const i=s?e.LINEAR:e.NEAREST;e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,i),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,i),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE);const c=e.createFramebuffer();return e.bindFramebuffer(e.FRAMEBUFFER,c),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,r,0),e.clearColor(0,0,0,1),e.clear(e.COLOR_BUFFER_BIT),{tex:r,fb:c,w:t,h:o,dispose:()=>(e.deleteTexture(r),e.deleteFramebuffer(c))}}function _e(e,t,o,a){let s=le(e,t,o,a),n=le(e,t,o,a);return{get src(){return s},get dst(){return n},swap(){const r=s;s=n,n=r},dispose(){s.dispose(),n.dispose()}}}function se(e,t,o,a){const s=t.u,n=(r,i)=>s[r]!=null&&e.uniform1f(s[r],i);n("uT",o.t),n("uDt",o.dt),n("uBass",o.bass),n("uMid",o.mid),n("uTreb",o.treb),n("uBassAtt",o.bassAtt),n("uMidAtt",o.midAtt),n("uTrebAtt",o.trebAtt),n("uPulse",o.pulse),n("uKick",o.kick),n("uOnset",o.onset),n("uFlash",o.flash),n("uPhase",o.phase),n("uConf",o.conf),n("uInt",o.intensity),n("uRms",o.rms),n("uCen",o.centroid),n("uLowClk",o.lowClock),n("uMidClk",o.midClock),n("uHighClk",o.highClock),n("uSeed",a.seed),n("uAspect",a.aspect),n("uHistRow",a.histRow),s.uRes!=null&&e.uniform2f(s.uRes,a.w,a.h),s.uPal!=null&&e.uniform3fv(s.uPal,a.palette),s.uAudio!=null&&(e.activeTexture(e.TEXTURE6),e.bindTexture(e.TEXTURE_2D,a.audioTex),e.uniform1i(s.uAudio,6)),s.uHist!=null&&(e.activeTexture(e.TEXTURE7),e.bindTexture(e.TEXTURE_2D,a.histTex),e.uniform1i(s.uHist,7)),e.activeTexture(e.TEXTURE0)}function j(e,t,o,a,s){t.u[o]!=null&&(e.activeTexture(e.TEXTURE0+s),e.bindTexture(e.TEXTURE_2D,a),e.uniform1i(t.u[o],s),e.activeTexture(e.TEXTURE0))}function De(e,t,o,a){const s=1/Math.tan(e/2),n=1/(o-a);return new Float32Array([s/t,0,0,0,0,s,0,0,0,0,(a+o)*n,-1,0,0,2*a*o*n,0])}function Be(e,t,o=[0,1,0]){let a=e[0]-t[0],s=e[1]-t[1],n=e[2]-t[2],r=Math.hypot(a,s,n)||1;a/=r,s/=r,n/=r;let i=o[1]*n-o[2]*s,c=o[2]*a-o[0]*n,f=o[0]*s-o[1]*a;r=Math.hypot(i,c,f)||1,i/=r,c/=r,f/=r;const d=s*f-n*c,h=n*i-a*f,x=a*c-s*i;return new Float32Array([i,d,a,0,c,h,s,0,f,x,n,0,-(i*e[0]+c*e[1]+f*e[2]),-(d*e[0]+h*e[1]+x*e[2]),-(a*e[0]+s*e[1]+n*e[2]),1])}function Le(e,t){const o=new Float32Array(16);for(let a=0;a<4;a++)for(let s=0;s<4;s++){let n=0;for(let r=0;r<4;r++)n+=e[r*4+s]*t[a*4+r];o[a*4+s]=n}return o}const Ne=`
vec3 hash33(vec3 p){ p = fract(p * vec3(.1031, .1030, .0973)); p += dot(p, p.yxz + 33.33); return fract((p.xxy + p.yxx) * p.zyx) * 2. - 1.; }
float noise3d(vec3 p){
  vec3 i = floor(p), f = fract(p); vec3 u = f * f * (3. - 2. * f);
  return mix(mix(mix(dot(hash33(i), f), dot(hash33(i + vec3(1,0,0)), f - vec3(1,0,0)), u.x),
                 mix(dot(hash33(i + vec3(0,1,0)), f - vec3(0,1,0)), dot(hash33(i + vec3(1,1,0)), f - vec3(1,1,0)), u.x), u.y),
             mix(mix(dot(hash33(i + vec3(0,0,1)), f - vec3(0,0,1)), dot(hash33(i + vec3(1,0,1)), f - vec3(1,0,1)), u.x),
                 mix(dot(hash33(i + vec3(0,1,1)), f - vec3(0,1,1)), dot(hash33(i + vec3(1,1,1)), f - vec3(1,1,1)), u.x), u.y), u.z); }
float fbm3d(vec3 p){ float s = 0., a = .5; for (int i = 0; i < 4; i++) { s += a * noise3d(p); p = p * 2.02 + 17.1; a *= .5; } return s; }
`,Qe=ae(`
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
}`),ge=`#version 300 es
in vec2 p; in vec2 a;
uniform float uAspect;
out vec2 va;
void main(){ va = a; gl_Position = vec4(p.x / uAspect, p.y, 0., 1.); }`,et=`#version 300 es
precision mediump float;
in vec2 va; out vec4 o;
void main(){ float e = 1. - va.x * va.x; o = vec4(va.y * e * e, 0., 0., 1.); }`,tt=ae(`
uniform sampler2D uText; uniform float uAmt;
void main(){ vec2 q = (uv - .5) * vec2(1., 1.) + .5; float v = texture(uText, vec2(q.x, 1. - q.y)).r; o = vec4(v * uAmt, 0., 0., 1.); }`),nt=ae(`
uniform sampler2D uI, uMap;
void main(){
  float v = clamp(texture(uI, uv).r, 0., 1.);
  o = vec4(pow(texture(uMap, vec2(v * (255. / 256.) + .5 / 256., .5)).rgb, vec3(2.2)), 1.);   // linear, Ausgabe macht sRGB
}`),qe=(e,t,o)=>[e[0]+(t[0]-e[0])*o,e[1]+(t[1]-e[1])*o,e[2]+(t[2]-e[2])*o],ce=e=>t=>{for(let o=1;o<e.length;o++)if(t<=e[o][0]){const[a,s]=e[o-1],[n,r]=e[o];return qe(s,r,(t-a)/Math.max(1e-6,n-a))}return e[e.length-1][1]},Ve=(e,t,o)=>{e=(e%1+1)%1;const a=Math.floor(e*6),s=e*6-a,n=o*(1-t),r=o*(1-s*t),i=o*(1-(1-s)*t);return[[o,r,n,n,i,o][a%6],[i,o,o,r,n,n][a%6],[n,n,i,o,o,r][a%6]]},pe=[{name:"Lagune",f:ce([[0,[0,0,0]],[.18,[.02,.08,.3]],[.45,[.1,.55,.95]],[.7,[.45,.85,1]],[.88,[.75,.7,.95]],[1,[1,1,1]]])},{name:"Violett",f:ce([[0,[0,0,0]],[.2,[.15,.02,.3]],[.5,[.55,.25,.85]],[.75,[.7,.6,1]],[1,[.95,.95,1]]])},{name:"Rosé",f:ce([[0,[0,0,0]],[.25,[.22,.1,.2]],[.55,[.6,.38,.5]],[.8,[.9,.62,.72]],[1,[1,.92,.95]]])},{name:"Glut",f:ce([[0,[0,0,0]],[.25,[.4,.02,.02]],[.5,[.9,.3,.02]],[.75,[1,.75,.15]],[1,[1,1,.85]]])},{name:"Eis",f:ce([[0,[0,0,0]],[.3,[0,.12,.25]],[.6,[.1,.6,.7]],[.85,[.7,.95,.95]],[1,[1,1,1]]])},{name:"Smaragd",f:ce([[0,[0,0,0]],[.3,[0,.2,.12]],[.6,[.1,.7,.4]],[.85,[.7,1,.5]],[1,[1,1,.9]]])},{name:"Regenbogen",f:(e,t)=>e<.04?[0,0,0]:Ve(e*2.2+t*.03,.75,Math.min(1,e*2.2))},{name:"Konturen",f:(e,t)=>{const o=Math.floor(e*9)/9;return e<.05?[0,0,0]:Ve(o*.7+.55+t*.02,.6,Math.min(1,.25+e))}},{name:"Dämmerung",f:ce([[0,[0,0,0]],[.2,[.1,.03,.25]],[.45,[.6,.1,.5]],[.7,[1,.45,.3]],[1,[1,.95,.7]]])}],xe=(e,t,o)=>[e*Math.cos(o)-t*Math.sin(o),e*Math.sin(o)+t*Math.cos(o)],ye=[(e,t,o)=>{const a=[];for(const s of[1,-1]){const n=[];for(let r=0;r<=160;r++){const i=r/160,[c,f]=xe(i*2.4-1.2,s*.28+o(i)*.22*s,Math.sin(t*.13)*.4);n.push(c,f)}a.push({pts:n,pen:1,width:.006})}return{lines:a}},(e,t,o)=>{const s=[];for(let n=0;n<6;n++){const r=t*.35+n/6*Math.PI*2,i=[];for(let c=0;c<=70;c++){const f=c/70,d=.08+f*1.05,h=o((f+n/6)%1)*.12*f,[x,E]=xe(d,h,r);i.push(x,E)}s.push({pts:i,pen:.95,width:.005})}return{lines:s}},(e,t,o,a)=>{const n=[],r=.55+.25*a(.1);for(let i=0;i<=360;i++){const c=i/360,f=c*Math.PI*2,d=r*Math.cos(5*f)+o(c)*.05,[h,x]=xe(d*Math.cos(f),d*Math.sin(f),t*.2);n.push(h,x)}return{lines:[{pts:n,pen:1,width:.0045,closed:!0}]}},(e,t,o,a)=>{const s=[];for(let n=0;n<3;n++){const r=.25+n*.22+a(.1+n*.3)*.08,i=[];for(let c=0;c<=200;c++){const f=c/200,d=f*Math.PI*2+t*(n%2?-.3:.3),h=r+o((f+n*.33)%1)*.06;i.push(h*Math.cos(d),h*Math.sin(d))}s.push({pts:i,pen:.9,width:.005,closed:!0})}return{lines:s}},(e,t,o)=>{const a=[];for(let s=0;s<=300;s++){const n=s/300,r=n*Math.PI*7+t*.6,i=.04+n*.95+o(n)*.05;a.push(i*Math.cos(r),i*Math.sin(r))}return{lines:[{pts:a,pen:1,width:.005}]}},(e,t,o,a)=>{const s=[];for(let r=0;r<48;r++){const i=r/48,c=a(Math.abs(i*2-1)),f=i*Math.PI*2+t*.15,d=.12,h=d+.1+c*.75;s.push({pts:[d*Math.cos(f),d*Math.sin(f),h*Math.cos(f),h*Math.sin(f)],pen:.55+.45*c,width:.006})}return{lines:s}},(e,t,o,a)=>{const s=[];for(let n=0;n<3;n++)for(let r=0;r<26;r++){const i=r/25,c=t*(.4+n*.15)+i*Math.PI*1.3+n*2.1,f=.35+n*.22+o(i)*.04;s.push({x:f*Math.cos(c)*1.25,y:f*Math.sin(c)*.85,r:.006+a(i)*.016,pen:.85})}return{dots:s}},(e,t,o)=>{const a=[];for(let s=0;s<=260;s++){const n=s/260,r=n*Math.PI*2,i=1+o(n)*.12,[c,f]=xe(Math.sin(r)*.85*i,Math.sin(r)*Math.cos(r)*.65*i,t*.25);a.push(c,f)}return{lines:[{pts:a,pen:1,width:.005,closed:!0}]}},(e,t,o,a)=>{const s=[];for(let n=0;n<=128;n++){const r=n/128,i=a(Math.abs(r*2-1));s.push(r*2.2-1.1,(i*.35+o(r)*.05)*(n%2?1:-.4))}return{lines:[{pts:s,pen:1,width:.004}]}},(e,t,o,a)=>{const s=[];for(let n=0;n<3;n++){const r=.25+n*.2+a(n/3+.1)*.12,i=t*(n%2?.3:-.25),c=[];for(const[f,d]of[[-1,-1],[1,-1],[1,1],[-1,1],[-1,-1]])c.push(...xe(f*r,d*r,i));s.push({pts:c,pen:.9,width:.005})}return{lines:s}}],Ue=[(e,t)=>{const o=[];for(let a=0;a<5;a++){const s=t*3+a/5*Math.PI*2;o.push({pts:[e.x,e.y,e.x+Math.cos(s)*.09,e.y+Math.sin(s)*.09],pen:.9,width:.004})}return o},(e,t)=>{const o=[];for(let a=0;a<=40;a++){const s=a/40*Math.PI*2;o.push(e.x+Math.cos(s)*.07*(1+.3*Math.sin(t*5)),e.y+Math.sin(s)*.07)}return[{pts:o,pen:.9,width:.004,closed:!0}]}];function ot(e,t){const o=K(e,Qe),a=K(e,et,ge),s=K(e,tt),n=K(e,nt);let r=null,i=null;const c=6e4,f=new Float32Array(c*4),d=e.createBuffer(),h=e.createVertexArray();e.bindVertexArray(h),e.bindBuffer(e.ARRAY_BUFFER,d),e.bufferData(e.ARRAY_BUFFER,f.byteLength,e.DYNAMIC_DRAW);const x=e.getAttribLocation(a.p,"p"),E=e.getAttribLocation(a.p,"a");e.enableVertexAttribArray(x),e.vertexAttribPointer(x,2,e.FLOAT,!1,16,0),e.enableVertexAttribArray(E),e.vertexAttribPointer(E,2,e.FLOAT,!1,16,8),e.bindVertexArray(null);const F=e.createTexture(),V=new Uint8Array(256*4);e.bindTexture(e.TEXTURE_2D,F),e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,256,1,0,e.RGBA,e.UNSIGNED_BYTE,V),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE);const L=e.createTexture(),_=document.createElement("canvas");_.width=1024,_.height=256;let I=null,P=-99,N=Math.random;const M=(T,l)=>{let b=Math.floor(N()*T);return b===l&&(b=(b+1)%T),b},u={shape:[0,0,1,0],flow:[0,0,1,0],map:[0,0,1,0],ta:0,tb:0};let k=null;const D=[];let v=8,p=0;const y=(T,l,b,U)=>{T[2]<1||(T[0]=T[1],T[1]=M(l,T[0]),T[2]=0,T[3]=U+b)},w=(T,l)=>{const b=_.getContext("2d");b.fillStyle="#000",b.fillRect(0,0,1024,256),b.fillStyle="#fff",b.textAlign="center",b.textBaseline="middle",b.font="700 64px system-ui, -apple-system, Segoe UI, sans-serif",b.fillText(String(T||"").slice(0,40),512,100),b.font="400 40px system-ui, -apple-system, Segoe UI, sans-serif",b.fillText(String(l||"").slice(0,50),512,172),e.bindTexture(e.TEXTURE_2D,L),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,_),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)};return{look:{linear:!1,bloom:.1,scale:.6,expo:1,vignette:0},resize(T,l){r&&r.dispose(),i&&i.dispose(),r=_e(e,T,l,t),i=le(e,T,l,t)},render(T,l){const b=T.dt;if(p+=b,k!==l.seed){k=l.seed;let B=Math.floor(l.seed*1e6)||1;N=()=>(B=B*16807%2147483647)/2147483647,u.shape=[M(ye.length),M(ye.length),1,p+14+N()*8],u.flow=[M(10),M(10),1,p+18+N()*10],u.map=[M(pe.length),M(pe.length),1,p+12+N()*8],u.shape[0]=u.shape[1],u.flow[0]=u.flow[1],u.map[0]=u.map[1]}p>u.shape[3]&&y(u.shape,ye.length,15+N()*10,p),p>u.flow[3]&&y(u.flow,10,18+N()*12,p),p>u.map[3]&&y(u.map,pe.length,12+N()*8,p),u.shape[2]=Math.min(1,u.shape[2]+b/2.5),u.flow[2]=Math.min(1,u.flow[2]+b/4),u.map[2]=Math.min(1,u.map[2]+b/3),u.ta+=b,u.tb+=b,e.bindFramebuffer(e.FRAMEBUFFER,r.dst.fb),e.viewport(0,0,r.dst.w,r.dst.h),e.useProgram(o.p),se(e,o,T,l),j(e,o,"uPrev",r.src.tex,0),e.uniform1i(o.u.uFa,u.flow[0]),e.uniform1i(o.u.uFb,u.flow[1]),e.uniform1f(o.u.uFm,u.flow[2]*u.flow[2]*(3-2*u.flow[2])),e.uniform1f(o.u.uTa,u.ta),e.uniform1f(o.u.uTb,u.tb);const U=Math.min(3,b*60);e.uniform1f(o.u.uZoomBoost,U*(.85+.35*Math.min(2,T.bassAtt))),e.uniform1f(o.u.uDecay,Math.pow(.965,U)),e.bindVertexArray(l.quadVao),e.drawArrays(e.TRIANGLES,0,3);let A=0;const m=(B,z,S,q)=>{if(A>=c)return;const Y=A*4;f[Y]=B,f[Y+1]=z,f[Y+2]=S,f[Y+3]=q,A++},R=(B,z,S,q)=>{const Y=B.length/2,re=q?Y:Y-1;for(let ee=0;ee<re;ee++){const Ie=(ee+1)%Y,Ee=B[ee*2],Te=B[ee*2+1],Me=B[Ie*2],we=B[Ie*2+1];let te=-(we-Te),ne=Me-Ee;const ze=Math.hypot(te,ne)||1;te=te/ze*z,ne=ne/ze*z,m(Ee+te,Te+ne,1,S),m(Ee-te,Te-ne,-1,S),m(Me+te,we+ne,1,S),m(Ee-te,Te-ne,-1,S),m(Me-te,we-ne,-1,S),m(Me+te,we+ne,1,S)}},G=(B,z,S,q)=>{const Y=[];for(let re=0;re<10;re++)Y.push(B+Math.cos(re/10*6.283)*S,z+Math.sin(re/10*6.283)*S);R(Y,S*.6,q,!0)},Z=B=>{const z=Math.min(511,Math.max(0,B*511)),S=Math.floor(z),q=z-S;return Math.max(-1.2,Math.min(1.2,T.wave[S]*(1-q)+T.wave[Math.min(511,S+1)]*q))},C=B=>{const z=Math.min(31,Math.max(0,B*31)),S=Math.floor(z),q=z-S;return Math.min(1,T.bands[S]*(1-q)+T.bands[Math.min(31,S+1)]*q)},W=T.playing?Math.min(1,.55+.45*Math.min(1.5,T.bassAtt)*.7+.25*T.onset):.12,me=u.shape[2],$=(B,z)=>{if(z<=.01)return;const S=ye[B](T,p,Z,C);for(const q of S.lines||[])R(q.pts,q.width,q.pen*W*z,q.closed);for(const q of S.dots||[])G(q.x,q.y,q.r,q.pen*W*z)};$(u.shape[0],1-me),$(u.shape[1],me),T.playing&&p>v&&(v=p+10+N()*18,D.push({k:Math.floor(N()*Ue.length),t0:p,life:5+N()*4,a:N()*6.28,sp:(N()<.5?-1:1)*(.25+N()*.3)}));for(let B=D.length-1;B>=0;B--){const z=D[B],S=p-z.t0;if(S>z.life){D.splice(B,1);continue}const q=z.a+S*z.sp,Y={x:Math.cos(q)*(.5+.2*Math.sin(S))*l.aspect*.8,y:Math.sin(q*1.3)*.6},re=Math.min(1,S,z.life-S);for(const ee of Ue[z.k](Y,p))R(ee.pts,ee.width,ee.pen*re*W,ee.closed)}A&&(e.useProgram(a.p),e.uniform1f(a.u.uAspect,l.aspect),e.bindBuffer(e.ARRAY_BUFFER,d),e.bufferSubData(e.ARRAY_BUFFER,0,f.subarray(0,A*4)),e.bindVertexArray(h),e.enable(e.BLEND),e.blendEquation(e.MAX),e.drawArrays(e.TRIANGLES,0,A));const J=l.title?`${l.title}|${l.artist}`:null;J&&J!==I&&(I=J,w(l.title,l.artist),P=p);const X=p-P;if(X<3.2){const B=Math.min(1,X/.4)*Math.min(1,(3.2-X)/.8)*.95;e.useProgram(s.p),j(e,s,"uText",L,0),e.uniform1f(s.u.uAmt,B),e.enable(e.BLEND),e.blendEquation(e.MAX);const z=Math.round(r.dst.w*.6),S=Math.round(z/4);e.viewport(Math.round((r.dst.w-z)/2),Math.round(r.dst.h*.5-S/2),z,S),e.bindVertexArray(l.quadVao),e.drawArrays(e.TRIANGLES,0,3),e.viewport(0,0,r.dst.w,r.dst.h)}e.blendEquation(e.FUNC_ADD),e.disable(e.BLEND);const Q=u.map[2]*u.map[2]*(3-2*u.map[2]),$e=pe[u.map[0]].f,He=pe[u.map[1]].f;for(let B=0;B<256;B++){const z=B/255,S=qe($e(z,p),He(z,p),Q);V[B*4]=Math.round(Math.min(1,S[0])*255),V[B*4+1]=Math.round(Math.min(1,S[1])*255),V[B*4+2]=Math.round(Math.min(1,S[2])*255),V[B*4+3]=255}return e.bindTexture(e.TEXTURE_2D,F),e.texSubImage2D(e.TEXTURE_2D,0,0,0,256,1,e.RGBA,e.UNSIGNED_BYTE,V),e.bindFramebuffer(e.FRAMEBUFFER,i.fb),e.viewport(0,0,i.w,i.h),e.useProgram(n.p),j(e,n,"uI",r.dst.tex,0),j(e,n,"uMap",F,1),e.bindVertexArray(l.quadVao),e.drawArrays(e.TRIANGLES,0,3),r.swap(),i.tex},info(){return`Figur ${u.shape[1]+1} · Strömung ${u.flow[1]+1} · Farben ${pe[u.map[1]].name}`},dispose(){r&&r.dispose(),i&&i.dispose(),e.deleteBuffer(d),e.deleteVertexArray(h),e.deleteTexture(F),e.deleteTexture(L);for(const T of[o,a,s,n])e.deleteProgram(T.p)}}}const ie=256,Fe=128,ve=ie*Fe,at=`#version 300 es
${he}
${Ne}
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
  float id = float(ij.y * ${ie} + ij.x);
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
}`,rt=`#version 300 es
${he}
uniform sampler2D uPos, uVel;
uniform mat4 uVP;
uniform float uPx;
out vec3 vc;
void main(){
  int id = gl_VertexID;
  ivec2 ij = ivec2(id % ${ie}, id / ${ie});
  vec4 P = texelFetch(uPos, ij, 0), V = texelFetch(uVel, ij, 0);
  float b = V.w;
  float e = band(b / 31.);
  vec4 clip = uVP * vec4(P.xyz, 1.);
  gl_Position = clip;
  float life = clamp(P.w * 2., 0., 1.);
  gl_PointSize = clamp((1.1 + 2.4 * e * e) * uPx / max(clip.w, .3), 1., 9.);
  vc = pal(b / 31. * .85) * (.018 + .2 * e * e + .025 * length(V.xyz)) * life;
}`,st=`#version 300 es
precision mediump float;
in vec3 vc; out vec4 o;
void main(){ float d = length(gl_PointCoord - .5) * 2.; o = vec4(vc * exp(-d * d * 3.), 1.); }`,it=`#version 300 es
${he}
uniform sampler2D uPos, uVel;
uniform mat4 uVP;
out vec3 vc;
void main(){
  int id = gl_VertexID / 2, end = gl_VertexID % 2;
  ivec2 ij = ivec2(id % ${ie}, id / ${ie});
  vec4 P = texelFetch(uPos, ij, 0), V = texelFetch(uVel, ij, 0);
  float e = band(V.w / 31.);
  vec3 p = P.xyz - V.xyz * .07 * float(end);
  gl_Position = uVP * vec4(p, 1.);
  vc = pal(V.w / 31. * .85) * (.01 + .12 * e * e) * (1. - float(end)) * clamp(P.w * 2., 0., 1.);
}`,ct=`#version 300 es
precision mediump float;
in vec3 vc; out vec4 o;
void main(){ o = vec4(vc, 1.); }`,ut=ae(`
uniform sampler2D uPrev; uniform float uDecay;
void main(){ o = vec4(max(texture(uPrev, uv).rgb * uDecay - .001, 0.), 1.); }`),ft=ae(`
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
}`),Ae=[{name:"Nordlicht",c:[.05,.35,1,.25,.75,1,.55,.25,1,.95,.2,.75,.2,.9,.85]},{name:"Glut",c:[1,.35,.05,1,.15,.3,1,.65,.2,.8,.1,.6,1,.85,.5]},{name:"Cover",c:null}];function lt(e,t){const o=!!e.getExtension("EXT_color_buffer_float"),a=K(e,at),s=K(e,st,rt),n=K(e,ct,it),r=K(e,ut),i=K(e,ft),f=o?(()=>{const M=new Float32Array(ve*4),u=new Float32Array(ve*4);for(let v=0;v<ve;v++){const p=v%32%4,y=Math.random()*Math.PI*2,w=Math.random()*2-1,T=.3+Math.random()*1.2,l=Math.sqrt(1-w*w);M[v*4]=Math.cos(y)*l*T+(p-1.5)*.4,M[v*4+1]=w*T,M[v*4+2]=Math.sin(y)*l*T,M[v*4+3]=Math.random()*8,u[v*4+3]=v%32}const k=v=>{const p=e.createTexture();return e.bindTexture(e.TEXTURE_2D,p),e.texImage2D(e.TEXTURE_2D,0,e.RGBA32F,ie,Fe,0,e.RGBA,e.FLOAT,v),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),p};return[0,1].map(()=>{const v=k(M),p=k(u),y=e.createFramebuffer();return e.bindFramebuffer(e.FRAMEBUFFER,y),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,v,0),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT1,e.TEXTURE_2D,p,0),{p:v,v:p,fb:y}})})():null;let d=0;const h=e.createVertexArray();let x=null,E=null,F=0,V=0,L=0,_=0,I=0;const P=[0,1,2,3].map(()=>({p:[0,0,0],ax:[0,1,0],e:0})),N=(M,u)=>[1.05*Math.sin(u*(.11+M*.023)+M*1.7),.55*Math.sin(u*(.07+M*.019)+M*.9),1.05*Math.cos(u*(.09+M*.021)+M*2.3)];return{look:{linear:!0,bloom:.55,scale:.75,expo:.95},needs:o?null:"Diese Grafikkarte kann keine Float-Texturen rendern (für Magnetfeld nötig).",keys:{p:()=>(I=(I+1)%Ae.length,`Farben: ${Ae[I].name}`)},resize(M,u){x&&x.dispose(),E&&E.dispose(),x=_e(e,M,u,t),E=le(e,M,u,t)},render(M,u){const k=M.dt;F+=k;const D=Ae[I].c||Array.from(u.palette),v=[[0,6],[6,14],[14,22],[22,32]];for(let l=0;l<4;l++){const b=P[l];b.p=N(l,F);const U=F*(.05+l*.013)+l,A=[Math.sin(U)*.4,1,Math.cos(U*1.3)*.4],m=Math.hypot(...A);b.ax=A.map(G=>G/m*(l%2?-1:1));let R=0;for(let G=v[l][0];G<v[l][1];G++)R+=M.bands[G];R/=v[l][1]-v[l][0],b.e+=(R-b.e)*(1-Math.exp(-k*10))}M.events.kick!==L&&(L=M.events.kick,_=1),_*=Math.exp(-k*9);const p=F*.06,y=[Math.sin(p)*4.4,.9*Math.sin(F*.035)+.4,Math.cos(p)*4.4],w=Le(De(48*Math.PI/180,u.aspect,.1,40),Be(y,[0,0,0]));if(f){V=Math.min(V+k,.06);const l=1/60;for(e.disable(e.BLEND);V>=l;){V-=l;const b=f[d],U=f[1-d];e.bindFramebuffer(e.FRAMEBUFFER,U.fb),e.drawBuffers([e.COLOR_ATTACHMENT0,e.COLOR_ATTACHMENT1]),e.viewport(0,0,ie,Fe),e.useProgram(a.p),se(e,a,M,u),j(e,a,"uPos",b.p,0),j(e,a,"uVel",b.v,1),e.uniform3fv(a.u.uCore,P.flatMap(A=>A.p)),e.uniform3fv(a.u.uAxis,P.flatMap(A=>A.ax)),e.uniform1fv(a.u.uCoreE,P.map(A=>A.e)),e.uniform1f(a.u.uStep,l),e.uniform1f(a.u.uTime,F),e.uniform1f(a.u.uBurst,_),e.bindVertexArray(u.quadVao),e.drawArrays(e.TRIANGLES,0,3),d=1-d}}if(e.bindFramebuffer(e.FRAMEBUFFER,x.dst.fb),e.viewport(0,0,x.dst.w,x.dst.h),e.useProgram(r.p),j(e,r,"uPrev",x.src.tex,0),e.uniform1f(r.u.uDecay,Math.pow(.62,k*60)),e.bindVertexArray(u.quadVao),e.drawArrays(e.TRIANGLES,0,3),f){const l=f[d];e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE),e.bindVertexArray(h),e.useProgram(n.p),se(e,n,M,u),e.uniform3fv(n.u.uPal,D),j(e,n,"uPos",l.p,0),j(e,n,"uVel",l.v,1),e.uniformMatrix4fv(n.u.uVP,!1,w),e.drawArrays(e.LINES,0,ve*2),e.useProgram(s.p),se(e,s,M,u),e.uniform3fv(s.u.uPal,D),j(e,s,"uPos",l.p,0),j(e,s,"uVel",l.v,1),e.uniformMatrix4fv(s.u.uVP,!1,w),e.uniform1f(s.u.uPx,x.dst.h/300),e.drawArrays(e.POINTS,0,ve),e.disable(e.BLEND)}x.swap();const T=[];for(const l of P){const b=[l.p[0],l.p[1],l.p[2],1],U=w[0]*b[0]+w[4]*b[1]+w[8]*b[2]+w[12],A=w[1]*b[0]+w[5]*b[1]+w[9]*b[2]+w[13],m=w[3]*b[0]+w[7]*b[1]+w[11]*b[2]+w[15],R=(.035+.035*l.e+.02*_)*(4.4/Math.max(.5,m));T.push(U/m*.5+.5,A/m*.5+.5,m>.1?R:0)}return e.bindFramebuffer(e.FRAMEBUFFER,E.fb),e.viewport(0,0,E.w,E.h),e.useProgram(i.p),se(e,i,M,u),e.uniform3fv(i.u.uPal,D),j(e,i,"uTrail",x.src.tex,0),e.uniform3fv(i.u.uCoreS,T),e.uniform1fv(i.u.uCoreE,P.map(l=>l.e)),e.uniform1f(i.u.uYaw,p),e.bindVertexArray(u.quadVao),e.drawArrays(e.TRIANGLES,0,3),E.tex},info(){return`Farben: ${Ae[I].name} (P)`},dispose(){if(x&&x.dispose(),E&&E.dispose(),f)for(const M of f)e.deleteTexture(M.p),e.deleteTexture(M.v),e.deleteFramebuffer(M.fb);e.deleteVertexArray(h);for(const M of[a,s,n,r,i])e.deleteProgram(M.p)}}}const mt=ae(`
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
}`),ue=[[1,.32,.03],[.08,.35,1],[.55,.12,1],[1,.05,.22],[.12,1,.2],[.05,.85,1],[1,.1,.8],[1,.78,.05]];function pt(e,t){const o=K(e,mt);let a=null,s=0,n=[...ue[0]],r=[...ue[0]],i=[...ue[0]],c=1,f=0,d=0,h=0,x=1,E=-1,F=-1,V=null,L=0;const _=[0,0,0,0],I=[0,0,0,0];let P=0;const N=()=>{f=(f+1)%ue.length,r=[...n],i=[...ue[f]],c=0},M=()=>{d=h,h=(h+1+Math.floor(Math.random()*4))%5,x=0};return{look:{linear:!0,bloom:.7,scale:1,expo:.9},label:"center",keys:{m:()=>(M(),"Form gewechselt"),p:()=>(N(),"Farbe gewechselt")},resize(u,k){a&&a.dispose(),a=le(e,u,k,t)},render(u,k){const D=u.dt;s+=D,V!==k.seed&&(V=k.seed,f=Math.floor(k.seed*ue.length),h=Math.floor(k.seed*97)%5,d=h,n=[...ue[f]],i=[...n],c=1);const v=u.conf>.4?Math.floor(u.beatIndex/32):Math.floor(s/16);v!==E&&(E!==-1&&N(),E=v);const p=u.conf>.4?Math.floor(u.beatIndex/64):Math.floor(s/32);p!==F&&(F!==-1&&M(),F=p),c=Math.min(1,c+D/1.5),x=Math.min(1,x+D/1.2);const y=c*c*(3-2*c);if(n=r.map((w,T)=>w+(i[T]-w)*y),u.events.kick!==L&&(L=u.events.kick,s>P)){const w=_.indexOf(Math.min(..._));_[w]=1,I[w]=(Math.random()-.5)*1.6,P=s+.25}for(let w=0;w<4;w++)_[w]*=Math.exp(-D*3);return e.bindFramebuffer(e.FRAMEBUFFER,a.fb),e.viewport(0,0,a.w,a.h),e.useProgram(o.p),se(e,o,u,k),e.uniform3fv(o.u.uNeon,n),e.uniform1i(o.u.uShapeA,d),e.uniform1i(o.u.uShapeB,h),e.uniform1f(o.u.uShapeM,x*x*(3-2*x)),e.uniform1fv(o.u.uBeam,_),e.uniform1fv(o.u.uBeamX,I),e.bindVertexArray(k.quadVao),e.drawArrays(e.TRIANGLES,0,3),a.tex},dispose(){a&&a.dispose(),e.deleteProgram(o.p)}}}const dt=`#version 300 es
precision mediump float;
in vec3 vc; out vec4 o;
void main(){ float d = length(gl_PointCoord - .5) * 2.; o = vec4(vc * smoothstep(1., .2, d), 1.); }`,ht=ae(`
uniform sampler2D uPrev; uniform float uDecay;
void main(){ o = vec4(max(texture(uPrev, uv).rgb * uDecay - .002, 0.), 1.); }`),Re=26e3,xt=`#version 300 es
${he}
${Ne}
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
  int id = gl_VertexID, shell = id / ${Re}, i = id % ${Re};
  float fi = float(i) + .5;
  float y = 1. - 2. * fi / ${Re}.;
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
}`,be=240,Se=150,vt=`#version 300 es
${he}
${Ne}
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
  int id = gl_VertexID, ix = id % ${be}, iz = id / ${be};
  float u = float(ix) / ${be-1}., v = float(iz) / ${Se-1}.;
  vec4 P = pos(u, v);
  vec3 px = pos(u + 1. / ${be}., v).xyz, pz = pos(u, v + 1. / ${Se}.).xyz;
  vec3 nrm = normalize(cross(pz - P.xyz, px - P.xyz));
  if (nrm.y < 0.) nrm = -nrm;
  vec4 clip = uVP * vec4(P.xyz, 1.);
  gl_Position = clip;
  gl_PointSize = clamp((2. + 2.5 * P.w) * uPx / clip.w, 1., 6.);
  float light = .18 + .82 * pow(max(0., dot(nrm, normalize(vec3(-.55, .75, -.4)))), 1.5);
  float dist = length(P.xyz - vec3(0., 0., 2.));
  float fade = exp(-max(0., P.z) * .2) * smoothstep(0., .06, v) * smoothstep(1., .9, v);
  vc = mix(vec3(1.), pal(u * .5 + v * .3 + P.w * .3), uTint) * (light * .55 + P.w * 1.4) * fade * .6;
}`;function Oe(e,t,o,a,s){const n=K(e,dt,o),r=K(e,ht),i=e.createVertexArray();let c=null,f=null,d=0;return{resize(h,x){c&&c.dispose(),f&&f.dispose(),c=_e(e,h,x,t),f=le(e,h,x,t)},tint(h){d=h},render(h,x,E){return e.bindFramebuffer(e.FRAMEBUFFER,c.dst.fb),e.viewport(0,0,c.dst.w,c.dst.h),e.useProgram(r.p),j(e,r,"uPrev",c.src.tex,0),e.uniform1f(r.u.uDecay,Math.pow(E,h.dt*60)),e.bindVertexArray(x.quadVao),e.drawArrays(e.TRIANGLES,0,3),e.useProgram(n.p),se(e,n,h,x),e.uniform1f(n.u.uPx,c.dst.h/240),e.uniform1f(n.u.uTint,d),s(n),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE),e.bindVertexArray(i),e.drawArrays(e.POINTS,0,a),e.disable(e.BLEND),c.swap(),c.src.tex},dispose(){c&&c.dispose(),f&&f.dispose(),e.deleteVertexArray(i),e.deleteProgram(n.p),e.deleteProgram(r.p)}}}const oe=[{name:"Weiss",v:0},{name:"Hauch Farbe",v:.35},{name:"Cover-Farben",v:.85}];function Ge(e,t){let o=0,a=0,s=1,n=-1,r=0,i=-1e9;const c=f=>{o=a,a=f%e,s=0};return{tick(f,d){r+=d;const h=f.conf>.4?Math.floor(f.beatIndex/32):Math.floor(r/40);return h!==n&&(n!==-1&&s>=1&&r-i>60&&f.playing&&c(a+1),n=h),s=Math.min(1,s+d/3),{a:o,b:a,m:s*s*(3-2*s)}},next(){return i=r,c(a+1),`Muster: ${t[a]}`},name:()=>t[a],seed(f){a=Math.floor(f*e)%e,o=a,s=1}}}function bt(e,t){let o=0,a=9,s=0,n=0,r=null,i=[0,0,3.4],c=0,f=null,d={a:0,b:0,m:1};const h=Ge(4,["gefaltet","Stacheln","Ringe","Blüte"]),x=Oe(e,t,xt,Re*3,E=>{e.uniformMatrix4fv(E.u.uVP,!1,r),e.uniform1f(E.u.uRip,a),e.uniform1f(E.u.uRipAmp,s),e.uniform3fv(E.u.uEye,i),e.uniform1i(E.u.uVa,d.a),e.uniform1i(E.u.uVb,d.b),e.uniform1f(E.u.uMorph,d.m)});return{look:{linear:!0,bloom:.45,scale:1},keys:{p:()=>(c=(c+1)%oe.length,x.tint(oe[c].v),`Farbe: ${oe[c].name}`),m:()=>h.next()},resize:(E,F)=>x.resize(E,F),render(E,F){return o+=E.dt,f!==F.seed&&(f=F.seed,h.seed(F.seed)),d=h.tick(E,E.dt),E.events.kick!==n&&(n=E.events.kick,a=0,s=1),a+=E.dt*2.6,s*=Math.exp(-E.dt*1.6),i=[0,.15*Math.sin(o*.07),3.6],r=Le(De(40*Math.PI/180,F.aspect,.1,20),Be(i,[0,0,0])),x.render(E,F,.55)},info:()=>`${h.name()} (M) · ${oe[c].name} (P)`,dispose:()=>x.dispose()}}const Ce=[[1.25,-1.5,-.2,2.8],[2.7,-.25,-.35,2.3],[2,-.7,-.25,2.4],[.95,-1.25,0,3]];function Et(e,t){let o=0,a=9,s=0,n=0,r=null,i=2,c=null,f={a:0,b:0,m:1};const d=Ge(4,["Stoff","Spirale","Ringe","Landschaft"]),h=Oe(e,t,vt,be*Se,x=>{e.uniformMatrix4fv(x.u.uVP,!1,r),e.uniform1f(x.u.uKickR,a),e.uniform1f(x.u.uKickAmp,s),e.uniform1i(x.u.uVa,f.a),e.uniform1i(x.u.uVb,f.b),e.uniform1f(x.u.uMorph,f.m)});return h.tint(oe[i].v),{look:{linear:!0,bloom:.5,scale:1},keys:{p:()=>(i=(i+1)%oe.length,h.tint(oe[i].v),`Farbe: ${oe[i].name}`),m:()=>d.next()},resize:(x,E)=>h.resize(x,E),render(x,E){o+=x.dt,c!==E.seed&&(c=E.seed,d.seed(E.seed)),f=d.tick(x,x.dt),x.events.kick!==n&&(n=x.events.kick,a=0,s=1),a+=x.dt*2.2,s*=Math.exp(-x.dt*1.4);const F=Ce[f.a],V=Ce[f.b],L=F.map((P,N)=>P+(V[N]-P)*f.m),_=Math.sin(o*.05)*.3,I=[_,L[0]+.08*Math.sin(o*.04),L[1]];return r=Le(De(50*Math.PI/180,E.aspect,.05,30),Be(I,[_*.3,L[2],L[3]])),h.render(x,E,.45)},info:()=>`${d.name()} (M) · ${oe[i].name} (P)`,dispose:()=>h.dispose()}}const fe=[{id:"klassik",name:"Klassik",make:ot},{id:"magnet",name:"Magnetfeld",make:lt},{id:"neon",name:"Neon",make:pt},{id:"sphaere",name:"Punktsphäre",make:bt},{id:"welle",name:"Punktwelle",make:Et}],Tt=ae(`
uniform sampler2D uSrc; uniform vec2 uPx; uniform float uThresh;
void main(){
  vec3 c = (texture(uSrc, uv + uPx * vec2(-1, -1)).rgb + texture(uSrc, uv + uPx * vec2(1, -1)).rgb +
            texture(uSrc, uv + uPx * vec2(-1, 1)).rgb + texture(uSrc, uv + uPx * vec2(1, 1)).rgb) * .25;
  if (uThresh > 0.) { float l = max(c.r, max(c.g, c.b)); c *= smoothstep(uThresh * .5, uThresh * 1.5, l); }
  o = vec4(c, 1.);
}`),Mt=ae(`
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
}`);function wt(e){const t=e.getContext("webgl2",{antialias:!1,alpha:!1,preserveDrawingBuffer:!1,powerPreference:"high-performance"});if(!t)throw new Error("WebGL 2 fehlt");const o=!!t.getExtension("EXT_color_buffer_float")||!!t.getExtension("EXT_color_buffer_half_float"),a=t.createBuffer(),s=t.createVertexArray();t.bindVertexArray(s),t.bindBuffer(t.ARRAY_BUFFER,a),t.bufferData(t.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),t.STATIC_DRAW),t.enableVertexAttribArray(0),t.vertexAttribPointer(0,2,t.FLOAT,!1,0,0);const n=K(t,Tt),r=K(t,Mt),i=t.createTexture(),c=new Float32Array(512*2);t.bindTexture(t.TEXTURE_2D,i),t.texImage2D(t.TEXTURE_2D,0,t.R32F,512,2,0,t.RED,t.FLOAT,c),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.NEAREST);const f=t.createTexture();t.bindTexture(t.TEXTURE_2D,f),t.texImage2D(t.TEXTURE_2D,0,t.R32F,g,128,0,t.RED,t.FLOAT,new Float32Array(g*128)),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.NEAREST);let d=0,h=0;const x=new Float32Array(g),E=fe.map(l=>l.make(t,o));let F=0,V=0,L=.75,_=[];const I={seed:.3,aspect:1,histRow:0,w:1,h:1,palette:new Float32Array(15),audioTex:i,histTex:f,quadVao:s,cover:null,coverPixels:null,title:"",artist:""},P=l=>[Math.max(32,Math.round(F*(l.look.scale||1))),Math.max(32,Math.round(V*(l.look.scale||1)))],N=()=>{const l=Math.min(window.devicePixelRatio||1,2);e.width=Math.round(e.clientWidth*l)||1,e.height=Math.round(e.clientHeight*l)||1,F=Math.max(64,Math.round(e.width*L)),V=Math.max(64,Math.round(e.height*L)),I.aspect=F/V;for(const A of E)A.resize(...P(A));for(const A of _)A.dispose();_=[];let b=F,U=V;for(let A=0;A<4;A++)b=Math.max(8,b>>1),U=Math.max(8,U>>1),_.push(le(t,b,U,o))};N();let M=0,u=-1,k=0,D=16,v=performance.now(),p=60;const y=l=>{l!==M&&(u=M,M=l,k=1e-4)},w=(l,b)=>{const U=E[l],[A,m]=P(U);return I.w=A,I.h=m,t.bindVertexArray(s),t.disable(t.BLEND),U.render(b,I)};return{gl:t,frame:(l,b)=>{t.bindVertexArray(s),t.disable(t.BLEND);for(let X=0;X<g;X++)c[X]=l.bands[X];if(c.set(l.wave,512),t.bindTexture(t.TEXTURE_2D,i),t.texSubImage2D(t.TEXTURE_2D,0,0,0,512,2,t.RED,t.FLOAT,c),h+=l.dt,h>=1/32){h%=1/32,d=(d+1)%128;for(let X=0;X<g;X++)x[X]=l.bands[X]*(l.playing?1:0);t.bindTexture(t.TEXTURE_2D,f),t.texSubImage2D(t.TEXTURE_2D,0,0,d,g,1,t.RED,t.FLOAT,x)}I.histRow=d;const U=w(M,l);let A=null;const m=u;m>=0&&(A=w(m,l),k=Math.min(1,k+l.dt/2.5)),t.bindVertexArray(s),t.disable(t.BLEND);let R=U,[G,Z]=P(E[M]);for(let X=0;X<_.length;X++){const Q=_[X];t.bindFramebuffer(t.FRAMEBUFFER,Q.fb),t.viewport(0,0,Q.w,Q.h),t.useProgram(n.p),j(t,n,"uSrc",R,0),t.uniform2f(n.u.uPx,.5/G,.5/Z),t.uniform1f(n.u.uThresh,X===0?.3:0),t.drawArrays(t.TRIANGLES,0,3),R=Q.tex,G=Q.w,Z=Q.h}const C=E[M].look,W=A?E[m].look:C,me=A?k:1,$=(X,Q)=>(W[X]??Q)+((C[X]??Q)-(W[X]??Q))*me;t.bindFramebuffer(t.FRAMEBUFFER,null),t.viewport(0,0,e.width,e.height),t.useProgram(r.p),se(t,r,l,I),j(t,r,"uA",A||U,0),j(t,r,"uB",U,1);for(let X=0;X<4;X++)j(t,r,"uB"+(X+1),_[X].tex,2+X);t.uniform1f(r.u.uMix,A?k:0),t.uniform1f(r.u.uExpo,$("expo",1.1)),t.uniform1f(r.u.uBloomAmt,$("bloom",.5)),t.uniform1f(r.u.uTone,$("linear",1)),t.uniform1f(r.u.uVig,$("vignette",.45)),t.uniform1f(r.u.uFlashAmt,Math.min(.12,l.flash*.1)),t.drawArrays(t.TRIANGLES,0,3),A&&k>=1&&(u=-1,k=0),D+=(b-D)*.05,p=1e3/Math.max(1,D);const J=performance.now();J-v>5e3&&(D>24&&L>.45?(L=Math.max(.45,L-.1),v=J,N()):D<11&&L<.75&&(L=Math.min(.75,L+.1),v=J,N()))},resize:N,setScene:y,get scene(){return M},get fps(){return p},get scale(){return L},current:()=>E[M],setLook(l){for(const b of["palette","seed","title","artist"])l[b]!=null&&(I[b]=l[b]);l.cover!==void 0&&(I.cover=l.cover,I.coverPixels=l.coverPixels||null)},dispose(){const l=t.getExtension("WEBGL_lose_context");for(const b of E)b.dispose();for(const b of _)b.dispose();l&&l.loseContext()}}}const ke=e=>e<=.04045?e/12.92:Math.pow((e+.055)/1.055,2.4);function yt([e,t,o]){const a=Math.cbrt(.4122214708*e+.5363325363*t+.0514459929*o),s=Math.cbrt(.2119034982*e+.6806995451*t+.1073969566*o),n=Math.cbrt(.0883024619*e+.2817188376*t+.6299787005*o);return[.2104542553*a+.793617785*s-.0040720468*n,1.9779984951*a-2.428592205*s+.4505937099*n,.0259040371*a+.7827717662*s-.808675766*n]}function At([e,t,o]){const a=(e+.3963377774*t+.2158037573*o)**3,s=(e-.1055613458*t-.0638541728*o)**3,n=(e-.0894841775*t-1.291485548*o)**3;return[4.0767416621*a-3.3077115913*s+.2309699292*n,-1.2684380046*a+2.6097574011*s-.3413193965*n,-.0041960863*a-.7034186147*s+1.707614701*n].map(r=>Math.max(0,Math.min(1,r)))}const Pe=new Float32Array([.25,.12,.9,.55,.15,.85,.1,.5,.95,.15,.85,.6,.95,.35,.45]);function Xe(e){let t=2166136261;for(const o of String(e||"x"))t=Math.imul(t^o.charCodeAt(0),16777619);return(t>>>0)%1e5/1e5}function Rt(e){return new Promise(t=>{if(!e)return t(null);const o=new Image;o.crossOrigin="anonymous",o.onload=()=>{try{const a=document.createElement("canvas");a.width=a.height=120;const s=a.getContext("2d",{willReadFrequently:!0});s.drawImage(o,0,0,120,120);const n=s.getImageData(0,0,120,120).data;t({pixels:n,palette:kt(n)})}catch{t(null)}},o.onerror=()=>t(null),o.src=e})}function kt(e){const t=[];for(let r=0;r<e.length;r+=16)t.push(yt([ke(e[r]/255),ke(e[r+1]/255),ke(e[r+2]/255)]));const o=5,a=[t[Math.floor(t.length/2)]];for(;a.length<o;){let r=null,i=-1;for(const c of t){let f=1/0;for(const d of a)f=Math.min(f,(c[0]-d[0])**2+(c[1]-d[1])**2+(c[2]-d[2])**2);f>i&&(i=f,r=c)}a.push(r)}const s=new Array(o).fill(0);for(let r=0;r<8;r++){const i=a.map(()=>[0,0,0]);s.fill(0);for(const c of t){let f=0,d=1/0;for(let h=0;h<o;h++){const x=a[h],E=(c[0]-x[0])**2+(c[1]-x[1])**2+(c[2]-x[2])**2;E<d&&(d=E,f=h)}s[f]++,i[f][0]+=c[0],i[f][1]+=c[1],i[f][2]+=c[2]}for(let c=0;c<o;c++)s[c]&&(a[c]=i[c].map(f=>f/s[c]))}const n=a.map(([r,i,c],f)=>{let d=Math.hypot(i,c),h=Math.atan2(c,i);d<.03&&(h=4.2+f*.5),d=Math.max(.09,Math.min(.2,d*1.25));const x=Math.max(.62,Math.min(.85,r*.6+.4));return{h,rgb:At([x,d*Math.cos(h),d*Math.sin(h)])}});return n.sort((r,i)=>r.h-i.h),new Float32Array(n.flatMap(r=>r.rgb))}const de={get(e,t){try{const o=localStorage.getItem("viz."+e);return o==null?t:JSON.parse(o)}catch{return t}},set(e,t){try{localStorage.setItem("viz."+e,JSON.stringify(t))}catch{}}};function Ft({track:e,onClose:t}){const o=H.useRef(null),a=H.useRef(null),s=H.useRef(null),[n,r]=H.useState(!0),[i,c]=H.useState(()=>Math.min(fe.length-1,Math.max(0,de.get("scene",0)))),[f,d]=H.useState(()=>!!de.get("calm",!1)),[h,x]=H.useState(()=>!!de.get("auto",!1)),[E,F]=H.useState(!1),[V,L]=H.useState(""),[_,I]=H.useState(""),[P,N]=H.useState(null),M=H.useRef(f),u=H.useRef(h);M.current=f,u.current=h;const k=v=>{const p=a.current;if(!p)return;const y=(v%fe.length+fe.length)%fe.length;p.setScene(y),c(y),de.set("scene",y),r(!0);const w=p.current().needs;L(w||"")};H.useEffect(()=>{const v=a.current;if(!v)return;v.setLook({seed:Xe(e&&e.id),palette:Pe,cover:null,title:e&&e.title||"",artist:e&&e.artist||""});let p=!1;return Rt(e&&e.albumId?Ke(e.albumId,240):null).then(y=>{p||!a.current||a.current.setLook({palette:y?y.palette:Pe,cover:e&&e.albumId||null,coverPixels:y?y.pixels:null})}),()=>{p=!0}},[e&&e.id,e&&e.albumId,!!a.current]),H.useEffect(()=>{r(!0);let v=setTimeout(()=>r(!1),5e3);const p=()=>{r(!0),clearTimeout(v),v=setTimeout(()=>r(!1),2500)};return window.addEventListener("pointermove",p),()=>{clearTimeout(v),window.removeEventListener("pointermove",p)}},[e&&e.id,i,f,h,V]),H.useEffect(()=>{const v=p=>{const y=p.key.toLowerCase(),w=a.current;if(y==="escape"||y==="v"&&!p.ctrlKey&&!p.metaKey||y==="t"&&(p.ctrlKey||p.metaKey))t();else if(y==="arrowright"||y==="n")k((w?w.scene:0)+1);else if(y==="arrowleft")k((w?w.scene:0)-1);else if(/^[1-9]$/.test(y)&&Number(y)<=fe.length)k(Number(y)-1);else if(y==="r")d(T=>(de.set("calm",!T),!T));else if(y==="a")x(T=>(de.set("auto",!T),!T));else if(y==="d")F(T=>!T);else if(w&&w.current().keys&&w.current().keys[y])L(w.current().keys[y]()||"");else return;p.preventDefault(),p.stopPropagation()};return window.addEventListener("keydown",v,!0),()=>window.removeEventListener("keydown",v,!0)},[t]),H.useEffect(()=>{let v;try{v=wt(o.current)}catch(C){console.error(C),I(String(C&&C.message||C).split(`
`)[0]);return}a.current=v;const p=Ze();s.current=p;let y=0,w=0;const T=Ye(C=>{y++,w+=(C.frames||[]).length,p.push(C)});v.setLook({seed:Xe(e&&e.id),palette:Pe,title:e&&e.title||"",artist:e&&e.artist||""}),v.setScene(i),L(v.current().needs||"");let l=0,b=performance.now(),U=performance.now(),A=performance.now();const m=C=>{const W=C-b,me=Math.min(.1,W/1e3);b=C;const $=p.update(me);M.current&&($.flash=0,$.kick*=.35,$.pulse*=.35),u.current&&$.playing&&(C-U)/1e3>180&&($.conf<.4||$.phase<.08)&&(U=C,k(v.scene+1));try{v.frame($,W)}catch(J){console.error(J)}if(C-A>500){const J=(C-A)/1e3;N({fps:v.fps,scale:v.scale,msg:y/J,frames:w/J,bpm:$.bpm,conf:$.conf,playing:$.playing,kicks:$.events.kick,int:$.intensity,bands:Array.from($.bands),info:v.current().info?v.current().info():""}),y=0,w=0,A=C}l=requestAnimationFrame(m)};l=requestAnimationFrame(m);const R=()=>v.resize();window.addEventListener("resize",R);const G=C=>{C.preventDefault(),I("Die Grafikkarte hat den Visualizer beendet – bitte nochmals öffnen.")},Z=o.current;return Z.addEventListener("webglcontextlost",G),()=>{cancelAnimationFrame(l),window.removeEventListener("resize",R),Z.removeEventListener("webglcontextlost",G),T(),v.dispose(),a.current=null}},[]);const D=a.current&&a.current.current().label==="center";return O.jsxs("div",{className:"fixed inset-0 z-[70] bg-black",onClick:t,style:{cursor:n?"default":"none"},children:[O.jsx("canvas",{ref:o,className:"absolute inset-0 h-full w-full"}),_&&O.jsxs("div",{className:"absolute inset-0 grid place-items-center p-8 text-center text-sm text-zinc-400",children:["Visualizer geht hier nicht: ",_]}),D&&e&&O.jsxs("div",{className:"pointer-events-none absolute inset-x-0 top-[66%] text-center",style:{textShadow:"0 0 18px rgba(0,0,0,.8)"},children:[O.jsx("div",{className:"truncate px-8 text-2xl font-bold text-white sm:text-3xl",children:e.artist}),O.jsx("div",{className:"mt-1 truncate px-8 text-base text-zinc-200 sm:text-lg",children:e.title})]}),O.jsxs("div",{className:"pointer-events-none absolute bottom-8 left-8 max-w-[80vw] transition-opacity duration-700 "+(n?"opacity-100":"opacity-0"),children:[e&&!D&&O.jsxs(O.Fragment,{children:[O.jsx("div",{className:"truncate text-2xl font-bold text-white drop-shadow-lg",children:e.title}),O.jsx("div",{className:"truncate text-lg text-zinc-300 drop-shadow",children:e.artist})]}),O.jsxs("div",{className:"mt-2 text-xs text-zinc-400 drop-shadow",children:[O.jsxs("span",{className:"text-zinc-100",children:[i+1," ",fe[i].name]}),P&&P.info?` · ${P.info}`:"",h?" · wechselt automatisch (A)":"",f?" · ruhig (R)":""]}),O.jsx("div",{className:"mt-0.5 text-[11px] text-zinc-500 drop-shadow",children:"1–5 / ← → Stil · M Muster · P Farben · A automatisch · R ruhig · D Diagnose · Esc schliessen"}),V&&O.jsx("div",{className:"mt-1 text-xs text-amber-300 drop-shadow",children:V})]}),E&&P&&O.jsxs("div",{className:"pointer-events-none absolute right-4 top-4 w-72 rounded-xl bg-black/70 p-3 font-mono text-[11px] leading-5 text-zinc-300",children:[O.jsxs("div",{children:["Bild: ",P.fps.toFixed(0)," fps · Auflösung ",Math.round(P.scale*100)," %"]}),O.jsxs("div",{children:["Daten: ",P.msg.toFixed(0)," Pakete/s · ",P.frames.toFixed(0)," Frames/s ",P.playing?"":"· (keine Musik)"]}),O.jsxs("div",{children:["Tempo: ",P.bpm?`${P.bpm.toFixed(1)} BPM`:"–"," · sicher ",Math.round(P.conf*100)," % · Kicks ",P.kicks]}),O.jsxs("div",{children:["Spannung: ",Math.round(P.int*100)," %"]}),O.jsx("div",{className:"mt-1 flex h-10 items-end gap-px",children:P.bands.map((v,p)=>O.jsx("span",{className:"flex-1 bg-accent/80",style:{height:`${Math.min(100,v*80)}%`}},p))})]})]})}export{Ft as default};
