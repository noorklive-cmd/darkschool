import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const SCENE_DURATION = 12_000;

const scenes = [
  { id: "attention", label: "ATENÇÃO SEM DIREÇÃO", caption: "O problema não é você não estar anunciando." },
  { id: "noise", label: "ALCANCE NÃO É ESTRATÉGIA", caption: "Aumentar o orçamento não resolve uma conversa mal começada." },
  { id: "leak", label: "O FLUXO QUEBRADO", caption: "Clique sem oferta vira curiosidade. Página confusa vira saída." },
  { id: "structure", label: "A CONVERSA CONTINUA", caption: "O anúncio abre a conversa. A estrutura é quem leva adiante." },
  { id: "opportunity", label: "ATENÇÃO COM PROPÓSITO", caption: "Quando cada etapa responde à próxima dúvida, a atenção encontra direção." },
  { id: "closing", label: "DARK ADS", caption: "Anúncios com estrutura." }
];

const fade = {
  initial: { opacity: 0, y: 18, filter: "blur(8px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -12, filter: "blur(8px)", transition: { duration: 0.35 } }
};

function Figure({ bright = false, moving = false }) {
  return (
    <motion.div className={`figure ${bright ? "is-bright" : ""}`} animate={moving ? { x: [0, 10, 0] } : {}} transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}>
      <i className="figure-head" />
      <i className="figure-body" />
      <i className="figure-arm figure-arm-left" />
      <i className="figure-arm figure-arm-right" />
    </motion.div>
  );
}

function Node({ icon, label, active = false, dim = false }) {
  return <motion.div className={`flow-node ${active ? "is-active" : ""} ${dim ? "is-dim" : ""}`} initial={{ opacity: 0, scale: 0.84 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", stiffness: 230, damping: 20 }}><span aria-hidden="true">{icon}</span><small>{label}</small></motion.div>;
}

function SceneGraphic({ scene }) {
  if (scene.id === "attention") return <div className="stage stage-attention"><motion.div className="spotlight" initial={{ opacity: 0, scaleY: 0.2 }} animate={{ opacity: 1, scaleY: 1 }} transition={{ duration: 1.2 }} /><Figure bright /><motion.div className="orbit orbit-money" animate={{ rotate: 360 }} transition={{ duration: 9, repeat: Infinity, ease: "linear" }}><span>R$</span></motion.div><motion.div className="signal-lines" initial="initial" animate="animate"><i /><i /><i /></motion.div></div>;
  if (scene.id === "noise") return <div className="stage stage-noise"><Figure bright /><div className="scatter">{[0, 1, 2, 3, 4].map((n) => <motion.div key={n} className="visitor" initial={{ opacity: 0, x: 0, y: 0 }} animate={{ opacity: [0, 1, 1, 0.2], x: [-8, 18 + n * 20, 55 + n * 18, 84 + n * 24], y: [0, -18 + n * 12, 18 - n * 15, 42 - n * 7] }} transition={{ duration: 3.4, delay: n * 0.16, repeat: Infinity, repeatDelay: 1.1 }}><Figure /></motion.div>)}</div><motion.div className="budget" animate={{ y: [0, -5, 0] }} transition={{ duration: 1.8, repeat: Infinity }}><span>R$</span><small>ORÇAMENTO</small></motion.div></div>;
  if (scene.id === "leak") return <div className="stage stage-leak"><div className="flow broken"><Node icon="◒" label="ANÚNCIO" active /><span className="connector connector-break" /><Node icon="⌁" label="CLIQUE" /><span className="connector connector-break" /><Node icon="▤" label="PÁGINA" dim /><motion.span className="escape" animate={{ x: [0, 45], opacity: [0, 1, 0] }} transition={{ duration: 2.3, repeat: Infinity }}>SAÍDA →</motion.span></div></div>;
  if (scene.id === "structure") return <div className="stage stage-structure"><div className="flow"><Node icon="✦" label="MENSAGEM" active /><span className="connector live" /><Node icon="◒" label="ANÚNCIO" active /><span className="connector live delay-one" /><Node icon="▤" label="PÁGINA" active /><span className="connector live delay-two" /><Node icon="→" label="PRÓXIMO PASSO" active /></div><motion.div className="reply" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}>A PRÓXIMA DÚVIDA JÁ TEM RESPOSTA.</motion.div></div>;
  if (scene.id === "opportunity") return <div className="stage stage-opportunity"><svg className="path" viewBox="0 0 800 260" preserveAspectRatio="none"><motion.path d="M28 216 C190 216 178 112 326 112 S464 194 568 100 S692 68 772 36" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 3.4, ease: "easeInOut" }} /></svg><motion.div className="traveler" animate={{ x: [0, 185, 345, 510], y: [0, -64, -22, -136] }} transition={{ duration: 4.2, ease: "easeInOut" }}><Figure bright /></motion.div><div className="step-label step-one">MENSAGEM</div><div className="step-label step-two">PÁGINA</div><div className="step-label step-three">OPORTUNIDADE</div></div>;
  return <div className="stage stage-closing"><motion.div className="closing-ring" initial={{ scale: 0.65, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 110, damping: 18 }}><span>D</span></motion.div><motion.div className="closing-line" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.45, duration: 0.8 }} /></div>;
}

function Vsl() {
  const prefersReducedMotion = useReducedMotion();
  const [sceneIndex, setSceneIndex] = useState(0);
  const scene = scenes[sceneIndex];

  useEffect(() => {
    if (prefersReducedMotion) return undefined;
    const timer = window.setInterval(() => setSceneIndex((index) => (index + 1) % scenes.length), SCENE_DURATION);
    return () => window.clearInterval(timer);
  }, [prefersReducedMotion]);

  return <section className="vsl-shell" aria-label="VSL animada da Dark Ads"><div className="grain" /><div className="vsl-frame"><div className="topline"><span> DARK ADS </span><div className="scene-meter" aria-label={`Cena ${sceneIndex + 1} de ${scenes.length}`}>{scenes.map((item, index) => <i key={item.id} className={index <= sceneIndex ? "is-seen" : ""} />)}</div></div><div className="scene-space"><AnimatePresence mode="wait"><motion.article className={`scene scene-${scene.id}`} key={scene.id} {...fade}><div className="copy"><motion.p className="scene-label" initial={{ opacity: 0, letterSpacing: "0.42em" }} animate={{ opacity: 1, letterSpacing: "0.18em" }} transition={{ duration: 0.75 }}>{scene.label}</motion.p><motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18, duration: 0.7 }}>{scene.caption}</motion.h1></div><SceneGraphic scene={scene} /></motion.article></AnimatePresence></div><div className="horizon" /><div className="caption" aria-live="polite"><span>0{sceneIndex + 1}</span><p>{scene.id === "closing" ? "Conheça a Dark Ads." : ""}</p></div></div></section>;
}

createRoot(document.getElementById("root")).render(<Vsl />);
