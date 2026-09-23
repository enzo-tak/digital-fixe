/*
 * BotaoFluido.tsx — botão "Fluid Glass" em tons de azul
 *
 * Líquido, aro, reflexo e partículas desenhados com WebGL puro (sem bibliotecas).
 * - só anima quando o botão está visível no ecrã;
 * - sem WebGL, mostra o gradiente azul atual do site;
 * - respeita "reduzir movimento".
 *
 * Uso:
 *   <BotaoFluido href="#contacto">Falar sobre o meu projeto</BotaoFluido>
 *   <BotaoFluido href="#servicos" variante="secundario">VER SERVIÇOS</BotaoFluido>
 *   <BotaoFluido type="submit">Enviar mensagem</BotaoFluido>
 *   tamanho: "pequeno" | "normal" | "grande"
 */
import { useEffect, useRef, type ReactNode, type MouseEventHandler } from "react";

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: MouseEventHandler<HTMLElement>;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  variante?: "primario" | "secundario";
  tamanho?: "pequeno" | "normal" | "grande";
  className?: string;
  target?: string;
  rel?: string;
};

const CORES = {
  primario: { base: "#040e28", brilho: "#4c8dff" },
  secundario: { base: "#05080f", brilho: "#2a5bd7" },
};
const VELOCIDADE_HOVER = 0.6;

const CSS = `
.bfl { position:relative; isolation:isolate; display:inline-flex; align-items:center; justify-content:center;
  padding:16px 36px; border-radius:999px; overflow:hidden; cursor:pointer; border:0;
  font-family:"Special Gothic Expanded One", system-ui, sans-serif; font-size:18px; line-height:1.2;
  color:#fff; text-decoration:none; white-space:nowrap;
  text-shadow:0 2px 10px rgba(76,141,255,.3);
  box-shadow:inset 0 0 0 1px rgba(127,176,255,.15), 0 10px 30px -10px rgba(0,0,0,.5);
  transition:transform .4s cubic-bezier(.16,1,.3,1), box-shadow .4s cubic-bezier(.16,1,.3,1);
  -webkit-tap-highlight-color:transparent;
  background:linear-gradient(90deg, #002e80 9%, #3162e0 82%, #002e80); }
.bfl:hover { box-shadow:inset 0 0 0 1px rgba(127,176,255,.28), 0 12px 34px -10px rgba(40,100,255,.35); }
.bfl:active { transform:scale(.96); }
.bfl:focus-visible { outline:2px solid #4c8dff; outline-offset:3px; }
.bfl:disabled { opacity:.55; cursor:not-allowed; }
.bfl > canvas { position:absolute; inset:0; width:100%; height:100%; z-index:-1; display:block; pointer-events:none; }
.bfl.bfl-gl { background:transparent; }
.bfl.bfl-secundario { text-shadow:none; }
.bfl.bfl-secundario:not(.bfl-gl) { background:#05080f; box-shadow:inset 0 0 0 1px rgba(76,141,255,.35); }
.bfl.bfl-grande { font-size:22px; padding:18px 44px; }
.bfl.bfl-pequeno { font-size:14px; padding:11px 24px; }
@media (max-width:767px) { .bfl.bfl-grande { font-size:18px; padding:16px 32px; } }
`;

const VERT = `attribute vec2 p; varying vec2 vUv; void main(){ vUv = p*.5+.5; gl_Position = vec4(p,0.,1.); }`;
const FRAG = `
precision highp float;
varying vec2 vUv;
uniform vec2 uRes; uniform float uDpr, uTime, uHover, uClick;
uniform vec3 uBase, uGlass;
float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }
float noise(vec2 p){ vec2 i=floor(p), f=fract(p); vec2 u=f*f*(3.-2.*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),u.x), mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x), u.y); }
float fbm(vec2 p){ float v=0., a=.5; for(int i=0;i<5;i++){ v+=a*noise(p); p=p*2.03+vec2(1.7,9.2); a*=.5; } return v; }
float sdPill(vec2 p, vec2 b, float r){ vec2 q=abs(p)-b+r; return length(max(q,0.))+min(max(q.x,q.y),0.)-r; }
void main(){
  vec2 px = vUv*uRes, c = uRes*.5, p = px-c;
  float d = sdPill(p, c, c.y);
  float mask = 1. - smoothstep(-uDpr, uDpr, d);
  if (mask <= 0.) { gl_FragColor = vec4(0.); return; }
  float t = uTime;
  vec2 uv = p / uRes.y;
  float dc = length(uv);
  uv -= normalize(uv + 1e-4) * uClick * .25 * smoothstep(.8, 0., dc);
  vec2 warp = vec2(fbm(uv*1.4 + vec2(t*.35, 0.)), fbm(uv*1.4 - vec2(0., t*.3) + 4.));
  float n = fbm(uv*2.2 + warp*(.7 + uHover*.9) + vec2(t, 0.));
  float liquido = smoothstep(.52, .9, n);
  vec3 col = uBase;
  col = mix(col, uGlass, liquido*(.12 + .22*uHover));
  col += uGlass * pow(smoothstep(-4.*uDpr, 0., d), 1.5) * (.22 + .3*uHover);
  vec2 hp = (p - vec2(-.3*c.x, .95*c.y)) / vec2(c.x*.7, c.y*.55);
  col += mix(uGlass, vec3(.78,.87,1.), .45) * pow(max(0., 1.-length(hp)), 2.) * (.12 + .1*uHover);
  vec2 s = px/(16.*uDpr); s.x -= t*.9; s.y += sin(t*.7 + s.x*.3)*uHover*.4;
  vec2 cell = floor(s), f = fract(s)-.5; float h = hash(cell);
  if (h > .9) {
    vec2 o = vec2(hash(cell+7.), hash(cell+13.)) - .5;
    float star = smoothstep(.06, 0., length(f - o*.6)) * (.5 + .5*sin(t*7. + h*50.));
    col += mix(uGlass, vec3(.75,.85,1.), .5) * star * (.25 + .5*uHover);
  }
  col += uGlass * uClick * .35 * smoothstep(.9, 0., dc);
  gl_FragColor = vec4(col*mask, mask);
}`;

/* ---------- motor partilhado: um único ciclo de animação para todos os botões ---------- */
type Instancia = {
  canvas: HTMLCanvasElement; gl: WebGLRenderingContext;
  u: Record<string, WebGLUniformLocation | null>;
  base: number[]; brilho: number[];
  t: number; hover: number; alvo: number; click: number; dpr: number; visivel: boolean;
};
const ativas = new Set<Instancia>();
let raf = 0, ultimo = 0;
const reduzir = () => typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;
const rgb = (h: string) => { const n = parseInt(h.slice(1), 16); return [(n >> 16 & 255) / 255, (n >> 8 & 255) / 255, (n & 255) / 255]; };

function desenhar(b: Instancia, dt: number) {
  const { gl, u } = b;
  b.hover += (b.alvo - b.hover) * Math.min(1, dt * 4);
  b.click += (0 - b.click) * Math.min(1, dt * 6);
  b.t += dt * (0.15 + (VELOCIDADE_HOVER - 0.15) * b.hover);
  gl.viewport(0, 0, b.canvas.width, b.canvas.height);
  gl.uniform2f(u.res, b.canvas.width, b.canvas.height);
  gl.uniform1f(u.dpr, b.dpr);
  gl.uniform1f(u.time, b.t);
  gl.uniform1f(u.hover, b.hover);
  gl.uniform1f(u.click, b.click);
  gl.uniform3fv(u.base, b.base);
  gl.uniform3fv(u.glass, b.brilho);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}
function ciclo(agora: number) {
  const dt = ultimo ? Math.min(0.05, (agora - ultimo) / 1000) : 0;
  ultimo = agora;
  const parado = reduzir();
  ativas.forEach((b) => b.visivel && desenhar(b, parado ? 0 : dt));
  raf = ativas.size ? requestAnimationFrame(ciclo) : 0;
  if (!raf) ultimo = 0;
}

function iniciar(el: HTMLElement, cores: { base: string; brilho: string }): (() => void) | undefined {
  const canvas = document.createElement("canvas");
  const gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: true, antialias: false });
  if (!gl) return; // sem WebGL (ou limite do browser atingido): fica o gradiente CSS
  const sh = (tipo: number, src: string) => { const s = gl.createShader(tipo)!; gl.shaderSource(s, src); gl.compileShader(s); return s; };
  const prog = gl.createProgram()!;
  gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT));
  gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG));
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
  gl.useProgram(prog);
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, "p");
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  const U = (n: string) => gl.getUniformLocation(prog, n);

  const b: Instancia = {
    canvas, gl,
    u: { res: U("uRes"), dpr: U("uDpr"), time: U("uTime"), hover: U("uHover"), click: U("uClick"), base: U("uBase"), glass: U("uGlass") },
    base: rgb(cores.base), brilho: rgb(cores.brilho),
    t: Math.random() * 10, hover: 0, alvo: 0, click: 0, dpr: 1, visivel: false,
  };
  el.prepend(canvas);
  el.classList.add("bfl-gl");

  const tamanho = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const r = el.getBoundingClientRect();
    canvas.width = Math.max(1, Math.round(r.width * dpr));
    canvas.height = Math.max(1, Math.round(r.height * dpr));
    b.dpr = dpr;
    desenhar(b, 0);
  };
  const ro = new ResizeObserver(tamanho); ro.observe(el); tamanho();
  const io = new IntersectionObserver(([e]) => { b.visivel = e.isIntersecting; }); io.observe(el);
  const entrar = () => { b.alvo = 1; }, sair = () => { b.alvo = 0; }, premir = () => { b.click = 1; };
  el.addEventListener("pointerenter", entrar);
  el.addEventListener("pointerleave", sair);
  el.addEventListener("pointerdown", premir);
  const perdido = (e: Event) => { e.preventDefault(); limpar(); };
  canvas.addEventListener("webglcontextlost", perdido);

  ativas.add(b);
  if (!raf) raf = requestAnimationFrame(ciclo);

  function limpar() {
    ativas.delete(b);
    ro.disconnect(); io.disconnect();
    el.removeEventListener("pointerenter", entrar);
    el.removeEventListener("pointerleave", sair);
    el.removeEventListener("pointerdown", premir);
    canvas.removeEventListener("webglcontextlost", perdido);
    b.gl.getExtension("WEBGL_lose_context")?.loseContext();
    canvas.remove();
    el.classList.remove("bfl-gl");
  }
  return limpar;
}

/* ---------- componente ---------- */
export default function BotaoFluido({
  children, href, onClick, type = "button", disabled, variante = "primario", tamanho = "normal",
  className = "", target, rel,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    return iniciar(ref.current, CORES[variante]);
  }, [variante]);

  const classes = ["bfl", `bfl-${variante}`, tamanho !== "normal" ? `bfl-${tamanho}` : "", className].filter(Boolean).join(" ");

  return (
    <>
      <style>{CSS}</style>
      {href ? (
        <a ref={(n) => { ref.current = n; }} className={classes} href={href} onClick={onClick} target={target} rel={rel}>
          <span>{children}</span>
        </a>
      ) : (
        <button ref={(n) => { ref.current = n; }} className={classes} type={type} onClick={onClick} disabled={disabled}>
          <span>{children}</span>
        </button>
      )}
    </>
  );
}
