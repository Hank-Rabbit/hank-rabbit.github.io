import { useEffect, useRef } from 'react';
import { reducedMotion } from '../lib/motion';

const VERT = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
const FRAG = `
precision highp float;
uniform vec2 r; uniform float t; uniform vec2 m;
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
  return mix(mix(h(i),h(i+vec2(1.,0.)),f.x),mix(h(i+vec2(0.,1.)),h(i+vec2(1.,1.)),f.x),f.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<5;i++){v+=a*n(p);p=p*2.03+vec2(13.1,7.7);a*=.5;}return v;}
void main(){
  vec2 p=(gl_FragCoord.xy-.5*r)/r.y;
  float tt=t*.045;
  vec2 q=vec2(fbm(p*1.1+tt),fbm(p*1.1-tt+4.2));
  vec2 w=p+1.5*q+(m-.5)*vec2(.5,-.35);
  float f=fbm(w*1.3+tt*1.4);
  float g=fbm(w*.9-tt+9.);
  vec3 col=vec3(.043,.043,.047);
  vec3 blue=vec3(.20,.47,.98), orange=vec3(.98,.42,.14), green=vec3(.14,.45,.33), lime=vec3(.84,1.,.29);
  float a=r.x/r.y;
  col=mix(col,blue,  smoothstep(.25,.80,f)*.80*smoothstep(1.25,.0,length(p-vec2(-.42*a,.22)+q*.35)));
  col=mix(col,orange,smoothstep(.30,.85,g)*.72*smoothstep(1.05,.0,length(p-vec2(.40*a,-.02)-q*.30)));
  col=mix(col,green, smoothstep(.28,.82,fbm(w*1.1+tt+2.))*.70*smoothstep(1.10,.0,length(p-vec2(.02*a,-.62)+q*.25)));
  col+=lime*.05*smoothstep(.55,.95,f*g*2.2)*smoothstep(1.2,.2,length(p));
  col*=smoothstep(1.55,.25,length(p*vec2(.62,1.)));
  col+=(h(gl_FragCoord.xy+fract(t)*91.)-.5)*.045;
  gl_FragColor=vec4(col,1.);
}`;

/** Slow flowing colour field behind the hero. Falls back to the CSS gradient on the canvas element. */
export function Aurora() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' });
    if (!gl) return;
    const shader = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return s; };
    const prog = gl.createProgram();
    gl.attachShader(prog, shader(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, shader(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'p');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const uR = gl.getUniformLocation(prog, 'r'), uT = gl.getUniformLocation(prog, 't'), uM = gl.getUniformLocation(prog, 'm');
    const still = reducedMotion();
    let frame = 0, visible = true, mx = 0.5, my = 0.5, tx = 0.5, ty = 0.5;
    const resize = () => {
      const scale = Math.min(window.devicePixelRatio || 1, 1.25) * 0.75;
      canvas.width = Math.max(2, Math.round(canvas.clientWidth * scale));
      canvas.height = Math.max(2, Math.round(canvas.clientHeight * scale));
      gl.viewport(0, 0, canvas.width, canvas.height);
      if (still) draw(12000);
    };
    const draw = now => {
      mx += (tx - mx) * 0.04; my += (ty - my) * 0.04;
      gl.uniform2f(uR, canvas.width, canvas.height);
      gl.uniform1f(uT, now / 1000 + 40);
      gl.uniform2f(uM, mx, my);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    const loop = now => { draw(now); frame = visible && !document.hidden ? requestAnimationFrame(loop) : 0; };
    const start = () => { if (!still && !frame && visible && !document.hidden) frame = requestAnimationFrame(loop); };
    const move = e => { tx = e.clientX / window.innerWidth; ty = e.clientY / window.innerHeight; };
    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; start(); });
    io.observe(canvas);
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('visibilitychange', start);
    resize();
    start();
    return () => { cancelAnimationFrame(frame); io.disconnect(); ro.disconnect(); window.removeEventListener('pointermove', move); document.removeEventListener('visibilitychange', start); };
  }, []);
  return <canvas className="hero-canvas" ref={ref} aria-hidden="true" />;
}
