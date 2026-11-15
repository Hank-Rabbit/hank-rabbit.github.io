import { useEffect, useRef } from 'react';
import { ArrowRight } from '@phosphor-icons/react';
import { projects } from '../projects';
import { AutoVideo, Tilt, reducedMotion } from '../lib/motion';

export const asset = file => `${import.meta.env.BASE_URL}assets/${file}`;

/** Cover visual for a project. The three approved presentation artworks are kept; Auli plays its opening film. */
export function ProjectArt({ id }) {
  if (id === 'auli') return <div className="card-art tall"><Tilt max={3}><div className="art-video"><AutoVideo src={asset('auli/opening.mp4')} poster={asset('auli/opening-poster.jpg')} label="Auli opening film: the home feed opening into an event page" /></div></Tilt></div>;
  if (id === 'voice-learning') return <div className="card-art"><Tilt><div className="art-voice"><div className="rings">{[0, 1, 2].map(i => <i key={i} style={{ '--i': i }} />)}</div><img src={asset('samira-device.webp')} alt="Original Samira voice device product artwork" width="1254" height="836" loading="lazy" /></div></Tilt></div>;
  const guard = id === 'guardsync';
  return <div className="card-art"><Tilt><img className="art-img" src={asset(guard ? 'guardsync-concept.webp' : 'stride-concept.webp')} alt={guard ? 'GuardSync blue Web and Mobile presentation artwork' : 'Stride map and wallet presentation artwork'} width="1536" height="1024" loading="lazy" /></Tilt></div>;
}

/** Project cards that pin and stack as the page scrolls. */
export function WorkStack() {
  const ref = useRef(null);
  useEffect(() => {
    const root = ref.current;
    if (!root || reducedMotion()) return;
    const items = [...root.querySelectorAll('.stack-card')];
    let frame = 0;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      items.forEach((card, i) => {
        const next = items[i + 1];
        let p = 0;
        if (next) {
          const top = card.getBoundingClientRect().top;
          const gap = next.getBoundingClientRect().top - top;
          p = Math.min(1, Math.max(0, 1 - gap / card.offsetHeight));
        }
        card.style.setProperty('--p', p.toFixed(3));
        const r = card.getBoundingClientRect();
        card.style.setProperty('--v', Math.min(1, Math.max(0, 1 - r.top / vh)).toFixed(3));
      });
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); cancelAnimationFrame(frame); };
  }, []);
  return <div className="stack" ref={ref}>{projects.map((p, i) => <article className={`stack-card theme-${p.id}`} style={{ '--i': i }} key={p.id}>
      <div className="card-text">
        <div className="card-top"><b>{p.number}</b><span>{p.category}</span><span className="pill"><i />{p.status}</span></div>
        <h3 className={`card-title ${p.name.length > 12 ? 'long' : ''}`}><a href={`#/work/${p.id}`}>{p.name}</a></h3>
        <p className="card-tagline">{p.tagline}</p>
        <ul className="card-highlights">{p.highlights.map(h => <li key={h}><span>{h}</span></li>)}</ul>
        <div className="card-chips">{p.chips.map(c => <span className="chip" key={c}>{c}</span>)}</div>
        <a className="card-cta" href={`#/work/${p.id}`} aria-label={`Read the ${p.name} case study`}>Case study <span><ArrowRight size={18} weight="bold" /></span></a>
      </div>
      <ProjectArt id={p.id} />
    </article>)}</div>;
}
