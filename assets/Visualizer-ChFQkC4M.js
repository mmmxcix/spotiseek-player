import{u as re,r as z,c as oe,j as X}from"./index-F7JjzxfI.js";const O=32,ne=.07;function ae(e){let t=!1,n=null;return(async()=>{for(;!t;){try{n=new AbortController;const a=await fetch(re("/api/player/viz",!0),{signal:n.signal,cache:"no-store"});if(!a.ok||!a.body)throw new Error(`Fehler ${a.status}`);const r=a.body.getReader(),i=new TextDecoder;let c="";for(;;){const{value:f,done:p}=await r.read();if(p||t)break;c+=i.decode(f,{stream:!0});let E;for(;(E=c.indexOf(`

`))>=0;){const T=c.slice(0,E);if(c=c.slice(E+2),T.startsWith("data: "))try{e(JSON.parse(T.slice(6)))}catch{}}}}catch{}t||await new Promise(a=>setTimeout(a,800))}})(),()=>{t=!0,n&&n.abort()}}function se(){const e=[];let t=null,n=new Float32Array(512),o={bpm:0,conf:0,beat0:0,int:0,playing:!1},a=0;const r={t:0,dt:0,playing:!1,bands:new Float32Array(O),raw:new Float32Array(O),wave:new Float32Array(512),bass:1,mid:1,treb:1,bassAtt:1,midAtt:1,trebAtt:1,kick:0,onset:0,pulse:0,flash:0,phase:0,beatIndex:0,conf:0,bpm:0,intensity:0,rms:0,centroid:0,lowClock:0,midClock:0,highClock:0,events:{kick:0,onset:0}},i=[0,0,0],c=[0,0,0],f=[0,0,0];let p=0;const E=new Float32Array(O).fill(.5),T=new Float32Array(O).fill(.2);let _=-9,L=-9,w=-9,P=0,m=0,v=0,h=.05;const l=u=>{const S=performance.now()/1e3-u.now;t=t==null?S:Math.min(S,t+.002);for(const D of u.frames||[])(!e.length||D.at>e[e.length-1].at)&&e.push(D);for(;e.length>600;)e.shift();u.wave&&(n=Float32Array.from(u.wave)),o={bpm:u.bpm||0,conf:u.conf||0,beat0:u.beat0||0,int:u.int||0,playing:!!u.playing}},F=(u,B)=>Math.pow(u,B*30);return{push:l,update:u=>{const B=performance.now()/1e3;r.dt=u,r.t+=u,r.playing=o.playing&&e.length>0;const S=t==null?0:B-t-ne;let D=e.findIndex(s=>s.at>S),y=null;if(e.length){if(D===-1)y={f0:e[e.length-1],f1:e[e.length-1],k:0};else if(D===0)y={f0:e[0],f1:e[0],k:0};else{const s=e[D-1],A=e[D];y={f0:s,f1:A,k:Math.min(1,Math.max(0,(S-s.at)/Math.max(.001,A.at-s.at)))}}S-e[e.length-1].at>.5&&(y=null)}if(y){for(const s of e)if(!(s.at<=a)){if(s.at>S)break;s.k&&(r.events.kick++,_=r.t),s.on&&(r.events.onset++,L=r.t)}}a=S;const x=(s,A,I)=>s+(A-s)*I;for(let s=0;s<O;s++){const A=y?x(y.f0.b[s],y.f1.b[s],y.k):0;r.raw[s]=A,E[s]=Math.max(A,E[s]-u*.05),T[s]=Math.min(A,T[s]+u*.02);const I=Math.max(.12,E[s]-T[s]),C=Math.min(1,Math.max(0,(A-T[s])/I)),b=C>r.bands[s]?1-Math.exp(-u*28):1-Math.exp(-u*7);r.bands[s]+=(C-r.bands[s])*b}for(let s=0;s<3;s++){i[s]=y?x(y.f0.bmt[s],y.f1.bmt[s],y.k):0;const A=i[s]>c[s],I=F(A?.2:.5,u);c[s]=c[s]*I+i[s]*(1-I);const C=F(p<50?.9:.992,u);f[s]=f[s]*C+i[s]*(1-C)}y&&(p+=u*30);const M=(s,A)=>f[A]>1e-5?Math.min(3,s/f[A]):0;if(r.bass=M(i[0],0),r.mid=M(i[1],1),r.treb=M(i[2],2),r.bassAtt=M(c[0],0),r.midAtt=M(c[1],1),r.trebAtt=M(c[2],2),r.bpm=o.bpm,r.conf=o.conf,o.bpm>0&&o.conf>.3&&t!=null){const s=60/o.bpm,A=(S-o.beat0)/s;r.phase=(A%1+1)%1,r.beatIndex=Math.floor(A)}else r.phase=(r.phase+u*2)%1;r.kick=Math.exp(-(r.t-_)/.14),r.onset=Math.exp(-(r.t-L)/.09),r.pulse=r.conf>.45?Math.exp(-(r.phase*60)/Math.max(40,r.bpm)/.12)*(r.playing?1:0):r.kick,_===r.t&&r.t-w>.34&&(w=r.t),r.flash=Math.exp(-(r.t-w)/.12);const d=1-Math.exp(-u*1.2);P+=((r.playing?o.int:0)-P)*(1-Math.exp(-u*.5)),m+=((y?x(y.f0.rms,y.f1.rms,y.k):0)-m)*d,v+=((y?x(y.f0.c,y.f1.c,y.k):v)-v)*d,r.intensity=P,r.rms=m,r.centroid=v,r.lowClock+=u*(.25+.9*Math.min(2,r.bassAtt)),r.midClock+=u*(.25+.9*Math.min(2,r.midAtt)),r.highClock+=u*(.25+.9*Math.min(2,r.trebAtt));let k=0;for(let s=0;s<512;s++)k=Math.max(k,Math.abs(n[s]));h=Math.max(k,h*Math.exp(-u*.4),.02);const U=1-Math.exp(-u*30);for(let s=0;s<512;s++)r.wave[s]+=((r.playing?n[s]/h:0)-r.wave[s])*U;return r},A:r}}const ie=`#version 300 es
in vec2 p; out vec2 uv;
void main(){ uv = p * 0.5 + 0.5; gl_Position = vec4(p, 0.0, 1.0); }`,ce=`
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
`;function H(e,t,n=ie){const o=e.createProgram();for(const[i,c]of[[e.VERTEX_SHADER,n],[e.FRAGMENT_SHADER,t]]){const f=e.createShader(i);if(e.shaderSource(f,c),e.compileShader(f),!e.getShaderParameter(f,e.COMPILE_STATUS)){const p=e.getShaderInfoLog(f);throw new Error("Shader: "+p+`
`+c.split(`
`).map((E,T)=>`${T+1}: ${E}`).join(`
`).slice(0,4e3))}e.attachShader(o,f)}if(e.bindAttribLocation(o,0,"p"),e.linkProgram(o),!e.getProgramParameter(o,e.LINK_STATUS))throw new Error(e.getProgramInfoLog(o));const a={},r=e.getProgramParameter(o,e.ACTIVE_UNIFORMS);for(let i=0;i<r;i++){const c=e.getActiveUniform(o,i).name.replace(/\[0\]$/,"");a[c]=e.getUniformLocation(o,e.getActiveUniform(o,i).name)}return{p:o,u:a}}const j=e=>`#version 300 es
${ce}
in vec2 uv; out vec4 o;
${e}`;function G(e,t,n,o,a=!0){const r=e.createTexture();e.bindTexture(e.TEXTURE_2D,r),o?e.texImage2D(e.TEXTURE_2D,0,e.RGBA16F,t,n,0,e.RGBA,e.HALF_FLOAT,null):e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,t,n,0,e.RGBA,e.UNSIGNED_BYTE,null);const i=a?e.LINEAR:e.NEAREST;e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,i),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,i),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE);const c=e.createFramebuffer();return e.bindFramebuffer(e.FRAMEBUFFER,c),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,r,0),e.clearColor(0,0,0,1),e.clear(e.COLOR_BUFFER_BIT),{tex:r,fb:c,w:t,h:n,dispose:()=>(e.deleteTexture(r),e.deleteFramebuffer(c))}}function Q(e,t,n,o){let a=G(e,t,n,o),r=G(e,t,n,o);return{get src(){return a},get dst(){return r},swap(){const i=a;a=r,r=i},dispose(){a.dispose(),r.dispose()}}}function W(e,t,n,o){const a=t.u,r=(i,c)=>a[i]!=null&&e.uniform1f(a[i],c);r("uT",n.t),r("uDt",n.dt),r("uBass",n.bass),r("uMid",n.mid),r("uTreb",n.treb),r("uBassAtt",n.bassAtt),r("uMidAtt",n.midAtt),r("uTrebAtt",n.trebAtt),r("uPulse",n.pulse),r("uKick",n.kick),r("uOnset",n.onset),r("uFlash",n.flash),r("uPhase",n.phase),r("uConf",n.conf),r("uInt",n.intensity),r("uRms",n.rms),r("uCen",n.centroid),r("uLowClk",n.lowClock),r("uMidClk",n.midClock),r("uHighClk",n.highClock),r("uSeed",o.seed),r("uAspect",o.aspect),r("uHistRow",o.histRow),a.uRes!=null&&e.uniform2f(a.uRes,o.w,o.h),a.uPal!=null&&e.uniform3fv(a.uPal,o.palette),a.uAudio!=null&&(e.activeTexture(e.TEXTURE6),e.bindTexture(e.TEXTURE_2D,o.audioTex),e.uniform1i(a.uAudio,6)),a.uHist!=null&&(e.activeTexture(e.TEXTURE7),e.bindTexture(e.TEXTURE_2D,o.histTex),e.uniform1i(a.uHist,7)),e.activeTexture(e.TEXTURE0)}function V(e,t,n,o,a){t.u[n]!=null&&(e.activeTexture(e.TEXTURE0+a),e.bindTexture(e.TEXTURE_2D,o),e.uniform1i(t.u[n],a),e.activeTexture(e.TEXTURE0))}const $=[{id:"orbit",name:"Orbit"},{id:"stroemung",name:"Strömung"},{id:"staub",name:"Cover-Staub"},{id:"relief",name:"Relief"},{id:"ruhe",name:"Ruhe"}],Y=e=>e.drawArrays(e.TRIANGLES,0,3),ue=j(`
uniform sampler2D uPrev; uniform float uFold, uRot, uDecay;
void main(){
  vec2 p = (uv - .5) * vec2(uAspect, 1.);
  // Spur: leicht nach aussen schieben und drehen, verblassen
  float ra = .0025 * sign(uSeed - .5);
  vec2 q = mat2(cos(ra), -sin(ra), sin(ra), cos(ra)) * p * .992;
  vec3 prev = texture(uPrev, q / vec2(uAspect, 1.) + .5).rgb * uDecay;
  prev = max(prev - .0015, 0.);
  float r = length(p);
  float a = atan(p.y, p.x) + uRot;
  float seg = 6.2831853 / uFold;
  float am = mod(a, seg); am = abs(am - seg * .5) / (seg * .5);      // 0..1, gespiegelt
  vec3 col = vec3(0.);
  // Ringe: je Band ein Bogen, länger und dicker, je lauter
  for (int i = 0; i < 32; i++) {
    float fi = float(i);
    float v = texelFetch(uAudio, ivec2(i, 0), 0).r;
    float rr = .11 + fi * .0102;
    float w = .0011 + v * .0032;
    float d = abs(r - rr);
    float arc = smoothstep(v * 1.05 + .02, v * 1.05 - .04, am);
    col += pal(fi / 40. + uSeed) * smoothstep(w, 0., d) * arc * (.25 + 1.4 * v);
  }
  // Wellenform als geschlossene Kurve
  float rw = .45 + wave(am) * .07 * (.6 + .5 * min(uBass, 2.));
  float dw = abs(r - rw);
  col += pal(.55 + uSeed) * (exp(-dw * dw * 9000.) * (.6 + .6 * uMidAtt) + exp(-dw * 90.) * .05);
  // Kern: atmet mit dem Kick
  col += pal(.2 + uSeed) * exp(-r * 14.) * (.15 + .9 * uKick);
  o = vec4(prev + col * .55, 1.);
}`);function fe(e,t){const n=H(e,ue);let o=null,a=0;return{resize(r,i){o&&o.dispose(),o=Q(e,r,i,t)},render(r,i){const c=r.conf>.45?(r.beatIndex+r.phase)*(Math.PI/16):a+r.dt*.15*(.4+r.midAtt);return a+=(c-a)*(r.conf>.45?1-Math.exp(-r.dt*6):1),e.bindFramebuffer(e.FRAMEBUFFER,o.dst.fb),e.viewport(0,0,o.dst.w,o.dst.h),e.useProgram(n.p),W(e,n,r,i),V(e,n,"uPrev",o.src.tex,0),e.uniform1f(n.u.uFold,i.fold),e.uniform1f(n.u.uRot,a),e.uniform1f(n.u.uDecay,Math.pow(.86,r.dt*60)),Y(e),o.swap(),o.src.tex},dispose(){o&&o.dispose(),e.deleteProgram(n.p)}}}const le=j(`
uniform sampler2D uPrev; uniform float uDecay;
void main(){
  vec2 asp = vec2(uAspect, 1.);
  vec2 q = (uv - .5) * asp;
  // Strömungsfeld: Curl-Noise, Tempo von der Bass-Uhr, Wirbel von den Mitten
  vec2 v = curl(vec3(q * 1.2, uLowClk * .06 + uSeed * 13.)) * (.0022 + .004 * min(uBassAtt, 2.));
  v += vec2(-q.y, q.x) * .0012 * (min(uMidAtt, 2.) - .7) * sign(uSeed - .5);
  v += normalize(q + 1e-4) * uKick * .0035;                       // Schub auf dem Kick
  vec3 prev = texture(uPrev, uv - v / asp).rgb * uDecay;
  prev = max(prev - .0008, 0.);
  // Farbquellen: wandern langsam, stärker, wenn ihre Bänder laut sind
  vec3 add = vec3(0.);
  for (int k = 0; k < 4; k++) {
    float fk = float(k);
    vec2 c = vec2(sin(uMidClk * (.11 + fk * .023) + fk * 2.1 + uSeed * 6.) * .55 * uAspect,
                  cos(uMidClk * (.09 + fk * .031) + fk * 1.3 + uSeed * 4.) * .38);
    float e = band(fk / 4. + .06);
    vec2 d = q - c;
    add += pal(fk * .23 + uSeed + uT * .004) * exp(-dot(d, d) * 70.) * (.004 + .03 * e * e);
  }
  // Wellenform als dünnes, leuchtendes Band quer durchs Bild
  float x = uv.x;
  float y = wave(x) * .16 * (.5 + .5 * min(uBass, 2.)) * smoothstep(0., .15, x) * smoothstep(1., .85, x);
  float dy = q.y - y;
  add += pal(.6 + uSeed + x * .2) * exp(-dy * dy * 160000.) * (.012 + .045 * min(uTreb, 2.));
  o = vec4(prev + add, 1.);
}`);function me(e,t){const n=H(e,le);let o=null;return{resize(a,r){o&&o.dispose(),o=Q(e,a,r,t)},render(a,r){return e.bindFramebuffer(e.FRAMEBUFFER,o.dst.fb),e.viewport(0,0,o.dst.w,o.dst.h),e.useProgram(n.p),W(e,n,a,r),V(e,n,"uPrev",o.src.tex,0),e.uniform1f(n.u.uDecay,Math.pow(.975,a.dt*60)),Y(e),o.swap(),o.src.tex},dispose(){o&&o.dispose(),e.deleteProgram(n.p)}}}const de=j(`
uniform float uCalm;
void main(){
  vec2 q = (uv - .5) * vec2(uAspect, 1.);
  float t = uT * .018 + uSeed * 10.;
  vec2 w = vec2(fbm(vec3(q * 1.1, t)), fbm(vec3(q * 1.1 + 5.2, t + 3.)));
  float f = fbm(vec3(q * 1.3 + w * 1.6, t * 1.2)) + .5;
  vec3 c = pal(f * .8 + uSeed + t * .05);
  c = fromLab(toLab(c) * vec3(.85, 1.25, 1.25));       // tiefer und satter
  float glow = .055 + .1 * uCalm;
  float v = smoothstep(1.2, .2, length(q));
  o = vec4(c * glow * (.55 + .9 * f) * v, 1.);
}`);function pe(e,t){const n=H(e,de);let o=null,a=0;return{resize(r,i){o&&o.dispose(),o=G(e,r,i,t)},render(r,i){return a+=(Math.min(1,r.intensity*.7+r.rms*2)-a)*(1-Math.exp(-r.dt*.3)),e.bindFramebuffer(e.FRAMEBUFFER,o.fb),e.viewport(0,0,o.w,o.h),e.useProgram(n.p),W(e,n,r,i),e.uniform1f(n.u.uCalm,a),Y(e),o.tex},dispose(){o&&o.dispose(),e.deleteProgram(n.p)}}}const he=j(`
float H(vec2 g){                       // g.x -1..1 quer (Bass in der Mitte), g.y 0..1 Tiefe (0 = jetzt)
  float v = hist(abs(g.x), g.y);
  return v * v * .2;
}
void main(){
  vec2 q = (uv - .5) * vec2(uAspect, 1.);
  float bob = .012 * sin(uPhase * 6.2831853) * uConf;
  vec3 ro = vec3(0., .4 + bob, -.12);
  vec3 rd = normalize(vec3(q.x, q.y - .42, 1.));
  float t = .02, hit = -1.;
  vec2 g;
  for (int i = 0; i < 110; i++) {
    vec3 p = ro + rd * t;
    g = vec2(p.x / 1.15, p.z / 2.4);
    if (g.y > 1. || p.y < -.05) break;
    float h = H(g);
    if (p.y < h) {
      float a = t - .02, b = t;                      // genauer: halbieren
      for (int j = 0; j < 5; j++) { float m = (a + b) * .5; vec3 pm = ro + rd * m; if (pm.y < H(vec2(pm.x / 1.15, pm.z / 2.4))) b = m; else a = m; }
      hit = b; break;
    }
    t += .006 + t * .012;
  }
  vec3 col = pal(.75 + uSeed) * .03 * smoothstep(.2, -.3, q.y);     // Himmel
  if (hit > 0.) {
    vec3 p = ro + rd * hit;
    g = vec2(p.x / 1.15, p.z / 2.4);
    float h = H(g);
    float k = h * 30.;
    float fw = max(fwidth(k), 1e-3);
    float line = 1. - smoothstep(0., 1.4 * fw, min(fract(k), 1. - fract(k)));
    vec3 base = pal(h * 2.2 + uCen * .6 + uSeed);
    float fog = exp(-hit * 1.1);
    col = base * (.05 + .25 * h * 3. + line * (1.1 + .8 * uPulse)) * fog + col * (1. - fog);
  }
  o = vec4(col, 1.);
}`);function xe(e,t){const n=H(e,he);let o=null;return{resize(a,r){o&&o.dispose(),o=G(e,a,r,t)},render(a,r){return e.bindFramebuffer(e.FRAMEBUFFER,o.fb),e.viewport(0,0,o.w,o.h),e.useProgram(n.p),W(e,n,a,r),Y(e),o.tex},dispose(){o&&o.dispose(),e.deleteProgram(n.p)}}}const g=120,ve=`#version 300 es
in vec2 p; in vec4 c;
uniform float uSize;
out vec4 vc;
void main(){ vc = c; gl_PointSize = uSize; gl_Position = vec4(p, 0., 1.); }`,be=`#version 300 es
precision mediump float;
in vec4 vc; out vec4 o;
void main(){ float d = length(gl_PointCoord - .5) * 2.; o = vec4(vc.rgb * vc.a * smoothstep(1., .35, d), 1.); }`,Ee=j(`
uniform sampler2D uPrev; uniform float uDecay;
void main(){ o = vec4(max(texture(uPrev, uv).rgb * uDecay - .002, 0.), 1.); }`);function Te(e,t){const n=H(e,be,ve),o=H(e,Ee),a=g*g,r=new Float32Array(a*2),i=new Float32Array(a*2),c=new Float32Array(a*2),f=new Float32Array(a*4),p=new Float32Array(a*6),E=e.createBuffer(),T=e.createVertexArray();e.bindVertexArray(T),e.bindBuffer(e.ARRAY_BUFFER,E),e.bufferData(e.ARRAY_BUFFER,p.byteLength,e.DYNAMIC_DRAW);const _=e.getAttribLocation(n.p,"p"),L=e.getAttribLocation(n.p,"c");e.enableVertexAttribArray(_),e.vertexAttribPointer(_,2,e.FLOAT,!1,24,0),e.enableVertexAttribArray(L),e.vertexAttribPointer(L,4,e.FLOAT,!1,24,8),e.bindVertexArray(null);let w=null,P=0,m=0,v=null;for(let l=0;l<a;l++){const F=l%g/(g-1)-.5,R=.5-Math.floor(l/g)/(g-1);c[l*2]=F*1.4,c[l*2+1]=R*1.4,r[l*2]=(Math.random()-.5)*3,r[l*2+1]=(Math.random()-.5)*2}const h=(l,F)=>{for(let R=0;R<a;R++){if(l)for(let u=0;u<3;u++)f[R*4+u]=Math.pow(l[R*4+u]/255,2.2);else{const u=R%g/g,B=Math.floor(R/g)/g,S=Math.floor((u+B)*2.5)%5;for(let D=0;D<3;D++)f[R*4+D]=F[S*3+D]*(.4+.6*B)}f[R*4+3]=1}};return h(null,[.3,.2,.9,.6,.3,.9,.2,.6,.9,.9,.4,.6,.5,.9,.5]),{resize(l,F){w&&w.dispose(),w=Q(e,l,F,t)},render(l,F){F.cover!==v&&(v=F.cover,h(F.coverPixels,F.palette));const R=Math.min(.05,l.dt),u=Math.min(.92,Math.max(0,(l.intensity-.35)*1.1+(l.bassAtt-1)*.35));m+=(u-m)*(1-Math.exp(-R*1.5));const B=l.events.kick!==P;P=l.events.kick;const S=l.t,D=7*(1-m)+.6,y=.25+1.1*m,x=F.aspect;for(let M=0;M<a;M++){const d=M*2,k=r[d],U=r[d+1],s=c[d+1],A=l.bands[Math.min(31,Math.max(0,Math.floor((s/1.4+.5)*31)))];let I=Math.sin(U*3.1+S*.6+F.seed*9)*y+(c[d]-k)*D+c[d]*A*m*1.6,C=Math.cos(k*2.7-S*.5+F.seed*5)*y+(s-U)*D;if(B&&m>.08){const N=Math.hypot(k,U)+.05,ee=(.5+Math.random())*1.4*(.3+m);I+=k/N*ee/R*.02,C+=U/N*ee/R*.02}i[d]=i[d]*Math.exp(-R*3.2)+I*R,i[d+1]=i[d+1]*Math.exp(-R*3.2)+C*R,r[d]=k+i[d]*R,r[d+1]=U+i[d+1]*R;const b=M*6;p[b]=r[d]*.62/x,p[b+1]=r[d+1]*.62,p[b+2]=f[M*4],p[b+3]=f[M*4+1],p[b+4]=f[M*4+2],p[b+5]=.2+.25*A*m+.08*l.pulse}return e.bindFramebuffer(e.FRAMEBUFFER,w.dst.fb),e.viewport(0,0,w.dst.w,w.dst.h),e.useProgram(o.p),V(e,o,"uPrev",w.src.tex,0),e.uniform1f(o.u.uDecay,Math.pow(.55,l.dt*60)),Y(e),e.useProgram(n.p),e.uniform1f(n.u.uSize,Math.max(1.5,w.dst.h*.62*1.4/g*1.35)),e.bindBuffer(e.ARRAY_BUFFER,E),e.bufferSubData(e.ARRAY_BUFFER,0,p),e.bindVertexArray(T),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE),e.drawArrays(e.POINTS,0,a),e.disable(e.BLEND),e.bindVertexArray(F.quadVao),w.swap(),w.src.tex},dispose(){w&&w.dispose(),e.deleteBuffer(E),e.deleteVertexArray(T),e.deleteProgram(n.p),e.deleteProgram(o.p)}}}const we={orbit:fe,stroemung:me,ruhe:pe,relief:xe,staub:Te},Re=j(`
uniform sampler2D uSrc; uniform vec2 uPx; uniform float uThresh;
void main(){
  vec3 c = (texture(uSrc, uv + uPx * vec2(-1, -1)).rgb + texture(uSrc, uv + uPx * vec2(1, -1)).rgb +
            texture(uSrc, uv + uPx * vec2(-1, 1)).rgb + texture(uSrc, uv + uPx * vec2(1, 1)).rgb) * .25;
  if (uThresh > 0.) { float l = max(c.r, max(c.g, c.b)); c *= smoothstep(uThresh * .5, uThresh * 1.5, l); }
  o = vec4(c, 1.);
}`),ye=j(`
uniform sampler2D uA, uB, uB1, uB2, uB3, uB4;
uniform float uMix, uExpo, uFlashAmt;
void main(){
  vec3 c = texture(uA, uv).rgb;
  if (uMix > 0.) {
    float n = fbm(vec3(uv * vec2(uAspect, 1.) * 2.2, 7.3)) * .9 + .5;
    float m = smoothstep(n - .12, n + .12, uMix * 1.3 - .15);
    c = mix(c, texture(uB, uv).rgb, m);
  }
  vec3 bloom = texture(uB1, uv).rgb * .5 + texture(uB2, uv).rgb * .6 + texture(uB3, uv).rgb * .7 + texture(uB4, uv).rgb * .8;
  c += bloom * .35;
  c *= uExpo * (1. + uFlashAmt);
  // ACES-Näherung
  c = clamp((c * (2.51 * c + .03)) / (c * (2.43 * c + .59) + .14), 0., 1.);
  float v = smoothstep(1.35, .45, length((uv - .5) * vec2(uAspect, 1.)) * 1.25);
  c *= mix(.55, 1., v);
  c = pow(c, vec3(1. / 2.2));
  c += (hash12(gl_FragCoord.xy + fract(uT) * 91.) - .5) / 255.;   // gegen Farbstufen
  o = vec4(c, 1.);
}`);function Me(e){const t=e.getContext("webgl2",{antialias:!1,alpha:!1,preserveDrawingBuffer:!1,powerPreference:"high-performance"});if(!t)throw new Error("WebGL 2 fehlt");const n=!!t.getExtension("EXT_color_buffer_float")||!!t.getExtension("EXT_color_buffer_half_float"),o=t.createBuffer(),a=t.createVertexArray();t.bindVertexArray(a),t.bindBuffer(t.ARRAY_BUFFER,o),t.bufferData(t.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),t.STATIC_DRAW),t.enableVertexAttribArray(0),t.vertexAttribPointer(0,2,t.FLOAT,!1,0,0);const r=H(t,Re),i=H(t,ye),c=t.createTexture(),f=new Float32Array(512*2);t.bindTexture(t.TEXTURE_2D,c),t.texImage2D(t.TEXTURE_2D,0,t.R32F,512,2,0,t.RED,t.FLOAT,f);for(const x of[c])t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.NEAREST);const p=t.createTexture();t.bindTexture(t.TEXTURE_2D,p),t.texImage2D(t.TEXTURE_2D,0,t.R32F,O,128,0,t.RED,t.FLOAT,new Float32Array(O*128)),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.NEAREST);let E=0,T=0;const _=new Float32Array(O),L={};for(const x of $)L[x.id]=we[x.id](t,n);let w=0,P=0,m=.7,v=[];const h={seed:.3,aspect:1,histRow:0,w:1,h:1,palette:new Float32Array(15),audioTex:c,histTex:p,quadVao:a,fold:6,cover:null,coverPixels:null},l=()=>{const x=Math.min(window.devicePixelRatio||1,2);e.width=Math.round(e.clientWidth*x)||1,e.height=Math.round(e.clientHeight*x)||1,w=Math.max(64,Math.round(e.width*m)),P=Math.max(64,Math.round(e.height*m)),h.w=w,h.h=P,h.aspect=w/P;for(const k of Object.values(L))k.resize(w,P);for(const k of v)k.dispose();v=[];let M=w,d=P;for(let k=0;k<4;k++)M=Math.max(8,M>>1),d=Math.max(8,d>>1),v.push(G(t,M,d,n))};l();let F=0,R=-1,u=0,B=16,S=performance.now();return{gl:t,frame:(x,M)=>{t.bindVertexArray(a),t.disable(t.BLEND);for(let b=0;b<O;b++)f[b]=x.bands[b];if(f.set(x.wave,512),t.bindTexture(t.TEXTURE_2D,c),t.texSubImage2D(t.TEXTURE_2D,0,0,0,512,2,t.RED,t.FLOAT,f),T+=x.dt,T>=1/32){T%=1/32,E=(E+1)%128;for(let b=0;b<O;b++)_[b]=x.bands[b]*(x.playing?1:0);t.bindTexture(t.TEXTURE_2D,p),t.texSubImage2D(t.TEXTURE_2D,0,0,E,O,1,t.RED,t.FLOAT,_)}h.histRow=E;const d=$.map(b=>b.id),k=L[d[F]].render(x,h);let U=null;R>=0&&(t.bindVertexArray(a),U=L[d[R]].render(x,h),u=Math.min(1,u+x.dt/3.5),u>=1&&(R=-1,u=0)),t.bindVertexArray(a);let s=k,A=w,I=P;for(let b=0;b<v.length;b++){const N=v[b];t.bindFramebuffer(t.FRAMEBUFFER,N.fb),t.viewport(0,0,N.w,N.h),t.useProgram(r.p),V(t,r,"uSrc",s,0),t.uniform2f(r.u.uPx,.5/A,.5/I),t.uniform1f(r.u.uThresh,b===0?.35:0),t.drawArrays(t.TRIANGLES,0,3),s=N.tex,A=N.w,I=N.h}t.bindFramebuffer(t.FRAMEBUFFER,null),t.viewport(0,0,e.width,e.height),t.useProgram(i.p),W(t,i,x,h),V(t,i,"uA",U||k,0),V(t,i,"uB",k,1);for(let b=0;b<4;b++)V(t,i,"uB"+(b+1),v[b].tex,2+b);t.uniform1f(i.u.uMix,U?u:0),t.uniform1f(i.u.uExpo,1.15),t.uniform1f(i.u.uFlashAmt,Math.min(.15,x.flash*.12)),t.drawArrays(t.TRIANGLES,0,3),B+=(M-B)*.05;const C=performance.now();C-S>4e3&&(B>22&&m>.42?(m=Math.max(.42,m-.1),S=C,l()):B<13&&m<.75&&(m=Math.min(.75,m+.05),S=C,l()))},resize:l,setScene:x=>{x!==F&&(R=F,F=x,u=1e-4)},get scene(){return F},setLook({palette:x,seed:M,fold:d,cover:k,coverPixels:U}){x&&(h.palette=x),M!=null&&(h.seed=M),d&&(h.fold=d),k!==void 0&&(h.cover=k,h.coverPixels=U||null)},dispose(){const x=t.getExtension("WEBGL_lose_context");for(const M of Object.values(L))M.dispose();for(const M of v)M.dispose();x&&x.loseContext()}}}const Z=e=>e<=.04045?e/12.92:Math.pow((e+.055)/1.055,2.4);function Ae([e,t,n]){const o=Math.cbrt(.4122214708*e+.5363325363*t+.0514459929*n),a=Math.cbrt(.2119034982*e+.6806995451*t+.1073969566*n),r=Math.cbrt(.0883024619*e+.2817188376*t+.6299787005*n);return[.2104542553*o+.793617785*a-.0040720468*r,1.9779984951*o-2.428592205*a+.4505937099*r,.0259040371*o+.7827717662*a-.808675766*r]}function Fe([e,t,n]){const o=(e+.3963377774*t+.2158037573*n)**3,a=(e-.1055613458*t-.0638541728*n)**3,r=(e-.0894841775*t-1.291485548*n)**3;return[4.0767416621*o-3.3077115913*a+.2309699292*r,-1.2684380046*o+2.6097574011*a-.3413193965*r,-.0041960863*o-.7034186147*a+1.707614701*r].map(i=>Math.max(0,Math.min(1,i)))}const J=new Float32Array([.25,.12,.9,.55,.15,.85,.1,.5,.95,.15,.85,.6,.95,.35,.45]);function te(e){let t=2166136261;for(const n of String(e||"x"))t=Math.imul(t^n.charCodeAt(0),16777619);return(t>>>0)%1e5/1e5}function ke(e){return new Promise(t=>{if(!e)return t(null);const n=new Image;n.crossOrigin="anonymous",n.onload=()=>{try{const o=document.createElement("canvas");o.width=o.height=120;const a=o.getContext("2d",{willReadFrequently:!0});a.drawImage(n,0,0,120,120);const r=a.getImageData(0,0,120,120).data;t({pixels:r,palette:Se(r)})}catch{t(null)}},n.onerror=()=>t(null),n.src=e})}function Se(e){const t=[];for(let i=0;i<e.length;i+=16)t.push(Ae([Z(e[i]/255),Z(e[i+1]/255),Z(e[i+2]/255)]));const n=5,o=[t[Math.floor(t.length/2)]];for(;o.length<n;){let i=null,c=-1;for(const f of t){let p=1/0;for(const E of o)p=Math.min(p,(f[0]-E[0])**2+(f[1]-E[1])**2+(f[2]-E[2])**2);p>c&&(c=p,i=f)}o.push(i)}const a=new Array(n).fill(0);for(let i=0;i<8;i++){const c=o.map(()=>[0,0,0]);a.fill(0);for(const f of t){let p=0,E=1/0;for(let T=0;T<n;T++){const _=o[T],L=(f[0]-_[0])**2+(f[1]-_[1])**2+(f[2]-_[2])**2;L<E&&(E=L,p=T)}a[p]++,c[p][0]+=f[0],c[p][1]+=f[1],c[p][2]+=f[2]}for(let f=0;f<n;f++)a[f]&&(o[f]=c[f].map(p=>p/a[f]))}const r=o.map(([i,c,f],p)=>{let E=Math.hypot(c,f),T=Math.atan2(f,c);E<.03&&(T=4.2+p*.5),E=Math.max(.09,Math.min(.2,E*1.25));const _=Math.max(.62,Math.min(.85,i*.6+.4));return{h:T,rgb:Fe([_,E*Math.cos(T),E*Math.sin(T)])}});return r.sort((i,c)=>i.h-c.h),new Float32Array(r.flatMap(i=>i.rgb))}const K=$.map(e=>e.id),q=K.indexOf("ruhe"),Pe=()=>{try{return localStorage.getItem("viz.calm")==="1"}catch{return!1}};function _e({track:e,onClose:t}){const n=z.useRef(null),o=z.useRef(null),a=z.useRef(null),[r,i]=z.useState(!0),[c,f]=z.useState(0),[p,E]=z.useState(Pe),[T,_]=z.useState(""),L=z.useRef(0),w=z.useRef(p);w.current=p;const P=(m,v=!0)=>{const h=o.current;if(!h)return;const l=(m%K.length+K.length)%K.length;h.setScene(l),f(l),v&&(L.current=performance.now()),i(!0)};return z.useEffect(()=>{const m=o.current,v=te(e&&e.id);m&&m.setLook({seed:v,fold:4+Math.floor(v*5),palette:J,cover:null});let h=!1;return ke(e&&e.albumId?oe(e.albumId,240):null).then(l=>{h||!o.current||o.current.setLook({palette:l?l.palette:J,cover:e&&e.albumId||null,coverPixels:l?l.pixels:null})}),()=>{h=!0}},[e&&e.id,e&&e.albumId,!!o.current]),z.useEffect(()=>{i(!0);let m=setTimeout(()=>i(!1),5e3);const v=()=>{i(!0),clearTimeout(m),m=setTimeout(()=>i(!1),2500)};return window.addEventListener("pointermove",v),()=>{clearTimeout(m),window.removeEventListener("pointermove",v)}},[e&&e.id,c,p]),z.useEffect(()=>{const m=v=>{const h=v.key.toLowerCase();if(h==="escape"||h==="v"&&!v.ctrlKey&&!v.metaKey||h==="t"&&(v.ctrlKey||v.metaKey))t();else if(h==="arrowright"||h==="n")P((o.current?o.current.scene:0)+1);else if(h==="arrowleft")P((o.current?o.current.scene:0)-1);else if(/^[1-5]$/.test(h))P(Number(h)-1);else if(h==="r"){const l=!w.current;E(l);try{localStorage.setItem("viz.calm",l?"1":"0")}catch{}l&&P(q,!1)}else return;v.preventDefault(),v.stopPropagation()};return window.addEventListener("keydown",m,!0),()=>window.removeEventListener("keydown",m,!0)},[t]),z.useEffect(()=>{let m;try{m=Me(n.current)}catch(d){console.error(d),_(String(d&&d.message||d).split(`
`)[0]);return}o.current=m;const v=se();a.current=v;const h=ae(v.push),l=te(e&&e.id);m.setLook({seed:l,fold:4+Math.floor(l*5),palette:J}),w.current&&(m.setScene(q),f(q));let F=0,R=performance.now(),u=performance.now(),B=90+l*60,S=0,D=0;const y=d=>{const k=d-R,U=Math.min(.1,k/1e3);R=d;const s=v.update(U);w.current&&(s.flash=0,s.kick*=.3,s.pulse*=.3);const A=(d-u)/1e3;D=s.playing&&s.intensity<.18?D+U:0;const I=d-L.current<300*1e3;if(!w.current&&!I){if(!s.playing&&A>8&&m.scene!==q)P(q,!1),u=d;else if(s.playing&&(D>20||s.intensity<.1&&A>10)&&m.scene!==q)P(q,!1),u=d;else if(s.playing&&A>25&&(m.scene===q&&s.intensity>.35||A>B||Math.abs(s.intensity-S)>.35)){const C=K.map((b,N)=>N).filter(b=>b!==q&&b!==m.scene);P(C[Math.floor((l*7+A)%C.length)],!1),u=d,B=90+Math.random()*60}}d-u<50?S=s.intensity:S+=(s.intensity-S)*(1-Math.exp(-U*.15));try{m.frame(s,k)}catch(C){console.error(C)}F=requestAnimationFrame(y)};F=requestAnimationFrame(y);const x=()=>m.resize();window.addEventListener("resize",x);const M=d=>{d.preventDefault(),_("Die Grafikkarte hat den Visualizer beendet – bitte nochmals öffnen.")};return n.current.addEventListener("webglcontextlost",M),()=>{cancelAnimationFrame(F),window.removeEventListener("resize",x),h(),m.dispose(),o.current=null}},[]),X.jsxs("div",{className:"fixed inset-0 z-[70] bg-black",onClick:t,style:{cursor:r?"default":"none"},children:[X.jsx("canvas",{ref:n,className:"absolute inset-0 h-full w-full"}),T&&X.jsxs("div",{className:"absolute inset-0 grid place-items-center p-8 text-center text-sm text-zinc-400",children:["Visualizer geht hier nicht: ",T]}),X.jsxs("div",{className:"pointer-events-none absolute bottom-8 left-8 max-w-[70vw] transition-opacity duration-700 "+(r?"opacity-100":"opacity-0"),children:[e&&X.jsxs(X.Fragment,{children:[X.jsx("div",{className:"truncate text-2xl font-bold text-white drop-shadow-lg",children:e.title}),X.jsx("div",{className:"truncate text-lg text-zinc-300 drop-shadow",children:e.artist})]}),X.jsxs("div",{className:"mt-2 text-xs text-zinc-400 drop-shadow",children:[X.jsx("span",{className:"text-zinc-200",children:$[c].name}),p?" · ruhig (R)":""," · ← → oder 1–5 wechseln · R ruhig · Esc schliessen"]})]})]})}export{_e as default};
