import { useEffect, useState, lazy, Suspense } from 'react';
import { flushSync } from 'react-dom';
import { ArrowRight, ArrowLeft, ArrowUpRight, ArrowDown, EnvelopeSimple, Plus, DeviceMobile, Database, Waveform, LinkedinLogo, GithubLogo, DownloadSimple } from '@phosphor-icons/react';
import { projects, projectById } from './projects';
import { Resume } from './components/Resume';
import { ProductScreens } from './components/ProductScreens';
import { WorkStack, ProjectArt, asset } from './components/WorkStack';
import { Aurora } from './components/Aurora';
import { Reveal, CountUp, WeightText, spotlight, reducedMotion } from './lib/motion';

const Architecture = lazy(() => import('./components/Architecture'));
const resume = `${asset('Hanke-Zhang-CV.pdf')}?v=20261115-auli`;
const linkedin = 'https://www.linkedin.com/in/hanke-z-939b61301/';
const github = 'https://github.com/Hank-Rabbit';
const email = 'zhabghank1997@gmail.com';

function useRoute() {
  const [hash, setHash] = useState(window.location.hash || '#/');
  useEffect(() => {
    const update = () => {
      const next = window.location.hash || '#/';
      const samePage = next.split('?')[0] === hash.split('?')[0];
      if (!samePage && document.startViewTransition && !document.hidden && !reducedMotion()) {
        const vt = document.startViewTransition(() => flushSync(() => setHash(next)));
        [vt.ready, vt.finished, vt.updateCallbackDone].forEach(pr => pr?.catch(() => {}));
      }
      else setHash(next);
    };
    window.addEventListener('hashchange', update);
    return () => window.removeEventListener('hashchange', update);
  }, [hash]);
  useEffect(() => {
    const anchor = new URLSearchParams(hash.split('?')[1] || '').get('section');
    requestAnimationFrame(() => {
      if (anchor) document.getElementById(anchor)?.scrollIntoView({ behavior: 'instant' });
      else window.scrollTo({ top: 0, behavior: 'instant' });
    });
  }, [hash]);
  return hash.split('?')[0];
}

function Header() {
  return <header className="nav-shell"><nav className="nav-pill" aria-label="Main navigation">
    <a className="nav-id" href="#/" aria-label="Hanke Zhang home">HZ</a>
    <a className="nav-link" href="#/?section=work">Work</a>
    <a className="nav-link hide-s" href="#/?section=experience">Experience</a>
    <a className="nav-link" href="#/?section=contact">Contact</a>
    <a className="nav-cta" href={resume} target="_blank" rel="noreferrer">Résumé <ArrowUpRight size={14} weight="bold" /></a>
  </nav></header>;
}

const stackLine = ['React', 'Next.js', 'TypeScript', 'React Native', 'Expo', 'Python', 'FastAPI', 'PostgreSQL', 'LiveKit Agents', 'STT · LLM · TTS', 'Stripe', 'Firebase', 'Docker', 'GCP', 'AWS'];
const capabilities = [
  { icon: DeviceMobile, title: 'Product interfaces', text: 'Web and mobile apps from first sketch to release build: React, Next.js, React Native and Expo.', proof: [['GuardSync · Web + Mobile', 'guardsync'], ['Auli · iOS + Android', 'auli']] },
  { icon: Database, title: 'APIs & data', text: 'Python and Node services, relational models, payments and the rules that keep them correct.', proof: [['Stride · rides + Stripe wallet', 'stride'], ['Auli · typed contract', 'auli']] },
  { icon: Waveform, title: 'AI applications', text: 'Realtime voice agents with tools and state, plus the admin surfaces that configure them.', proof: [['Voice Learning · realtime agent', 'voice-learning'], ['Voice Learning · admin console', 'voice-learning']] },
];

function Contact() {
  return <section className="contact" id="contact"><div className="wrap">
    <Reveal><p className="eyebrow">Contact</p><h2 className="contact-title">Let’s build<br /><span className="serif-i">something.</span></h2></Reveal>
    <Reveal className="contact-row" delay={120}>
      <p>I’m looking for software engineering, full-stack and AI application roles. Based in Canberra with full Australian work rights (subclass 491 visa).</p>
      <div className="contact-actions">
        <a className="mail-btn" href={`mailto:${email}`}><EnvelopeSimple size={22} />{email}</a>
        <a className="btn btn-ghost" href={linkedin} target="_blank" rel="noreferrer"><LinkedinLogo size={20} />LinkedIn</a>
        <a className="btn btn-ghost" href={github} target="_blank" rel="noreferrer"><GithubLogo size={20} />GitHub</a>
        <a className="btn btn-ghost" href={resume} target="_blank" rel="noreferrer"><DownloadSimple size={20} />Résumé</a>
      </div>
    </Reveal>
    <footer className="foot"><span>© {new Date().getFullYear()} Hanke Zhang</span><div><a href="#/?section=work">Work</a><a href="#/?section=experience">Experience</a><a href="#/">Top ↑</a></div></footer>
  </div></section>;
}

function Home() {
  useEffect(() => { document.title = 'Hanke Zhang — Software Engineer'; }, []);
  return <main id="main-content" tabIndex={-1}>
    <section className="hero" id="about">
      <Aurora />
      <div className="hero-inner wrap">
        <div className="hero-top">
          <p className="mono status fade-up" style={{ '--d': '.05s' }}><i />Open to work · Canberra · Full Australian work rights</p>
          <p className="mono hero-roles fade-up" style={{ '--d': '.15s' }}>Software Engineer<br />Full-Stack Developer<br />AI Application Developer</p>
        </div>
        <h1 className="hero-name" aria-label="Hanke Zhang"><WeightText lines={['Hanke', 'Zhang']} /></h1>
        <div className="hero-row">
          <p className="hero-lede fade-up" style={{ '--d': '.55s' }}>I design and build products end to end — <span className="serif-i">web, mobile and voice AI</span> — from the first screen to the API behind it.</p>
          <div className="hero-side fade-up" style={{ '--d': '.7s' }}>
            <div className="hero-ctas">
              <a className="btn btn-primary" href="#/?section=work">See the work <ArrowDown size={18} weight="bold" /></a>
              <a className="btn btn-ghost" href={resume} target="_blank" rel="noreferrer">Download résumé <ArrowUpRight size={16} /></a>
            </div>
            <div className="hero-stats">
              <div className="stat"><CountUp value={5} suffix="+" /><span>years building software</span></div>
              <div className="stat"><CountUp value={4} /><span>products built across web and mobile</span></div>
              <div className="stat"><CountUp value={3} /><span>platforms: Web, iOS and Android</span></div>
            </div>
          </div>
        </div>
      </div>
      <div className="marquee" aria-hidden="true"><div className="marquee-track">{[0, 1].map(k => <span key={k}>{stackLine.map(s => <span key={s}>{s}</span>)}</span>)}</div></div>
    </section>

    <section className="section wrap" id="work">
      <Reveal className="section-head"><h2><span className="serif-i">Selected</span> work<sup>({String(projects.length).padStart(2, '0')})</sup></h2><p>Four products where I owned the build. Each case study covers the screens, the architecture and the engineering decisions behind it.</p></Reveal>
      <WorkStack />
    </section>

    <section className="section wrap" id="capabilities">
      <Reveal className="section-head"><h2>What I <span className="serif-i">do</span></h2><p>Three areas I work in, each linked to the project where you can see it.</p></Reveal>
      <div className="caps">{capabilities.map((c, i) => <Reveal className="cap" key={c.title} delay={i * 90} onPointerMove={spotlight}>
        <span className="cap-icon"><c.icon size={26} weight="light" /></span>
        <h3>{c.title}</h3><p>{c.text}</p>
        <div className="cap-proof">{c.proof.map(([label, id]) => <a key={label} href={`#/work/${id}`}>{label}<span>Case study →</span></a>)}</div>
      </Reveal>)}</div>
    </section>

    <Resume />
    <Contact />
  </main>;
}

function Challenges({ project }) {
  return <section className="case-section wrap" id="decisions">
    <Reveal className="case-head"><h2>Engineering <span className="serif-i">decisions</span></h2><span className="mono">{String(project.decisions.length).padStart(2, '0')} topics · select to expand</span></Reveal>
    <div>{project.decisions.map((d, i) => <details className="challenge" key={d.title} open={i === 0}>
      <summary><span className="step-number">{String(i + 1).padStart(2, '0')}</span><div><h3>{d.title}</h3><p>{d.summary}</p></div><span className="plus" aria-hidden="true"><Plus size={18} /></span></summary>
      <div className="challenge-body"><p>{d.implementation}</p><aside>
        {d.tradeoff && <div><span>Trade-off</span><p>{d.tradeoff}</p></div>}
        <div><span>My contribution</span><p>{d.contribution}</p></div>
        <div><span>Source</span><small>{d.evidence}</small></div>
      </aside></div>
    </details>)}</div>
  </section>;
}

function CaseStudy({ project }) {
  useEffect(() => { document.title = `${project.name} — Hanke Zhang`; }, [project.name]);
  const next = projectById[project.next];
  const link = section => `#/work/${project.id}?section=${section}`;
  return <main id="main-content" tabIndex={-1} className={`case case-${project.id}`}>
    <section className="case-hero wrap">
      <div className="case-back"><a href="#/?section=work"><ArrowLeft size={14} /> All projects</a><span>{project.number} / {String(projects.length).padStart(2, '0')}</span></div>
      <h1 className={`case-title fade-up ${project.name.length > 12 ? 'long' : ''}`}>{project.name}</h1>
      <div className="case-lede">
        <div className="fade-up" style={{ '--d': '.15s' }}><p className="case-tagline">{project.tagline}</p><p className="mono case-status"><i />{project.status}</p></div>
        <dl className="case-facts fade-up" style={{ '--d': '.25s' }}>
          <div><dt>Role</dt><dd>{project.ownership}</dd></div>
          <div><dt>Stack</dt><dd>{project.fullStack.join(' · ')}</dd></div>
          <div><dt>Platforms</dt><dd>{project.platforms}</dd></div>
          <div><dt>Period</dt><dd>{project.period}</dd></div>
        </dl>
      </div>
      <Reveal className={`case-cover theme-${project.id}`}>
        <div><h2>{project.category} · What I built</h2><ul className="card-highlights">{project.highlights.map(h => <li key={h}><span>{h}</span></li>)}</ul></div>
        <ProjectArt id={project.id} />
      </Reveal>
    </section>
    <nav className="case-nav" aria-label="Project sections"><div><a href={link('experience')}>Walkthrough</a><a href={link('architecture')}>Architecture</a><a href={link('decisions')}>Decisions</a></div></nav>
    <ProductScreens project={project} />
    <Suspense fallback={<section className="architecture loading-architecture" id="architecture"><p>Loading architecture…</p></section>}><Architecture key={project.id} project={project} /></Suspense>
    <Challenges project={project} />
    <a className="next-project wrap" href={`#/work/${next.id}`} style={{ '--next-accent': `var(--accent)` }}><span className="mono">Next project · {next.number}</span><strong>{next.name}<ArrowRight /></strong></a>
    <Contact />
  </main>;
}

function NotFound() { return <main className="wrap not-found" id="main-content"><h1>Project not found</h1><a className="text-link" href="#/">Back to selected work</a></main>; }

export function App() {
  const route = useRoute();
  const project = projectById[route.replace('#/work/', '')];
  return <>
    <a className="skip-link" href="#main-content" onClick={e => { e.preventDefault(); document.getElementById('main-content')?.focus(); }}>Skip to content</a>
    <Header />
    {route === '#/' ? <Home /> : project ? <CaseStudy key={project.id} project={project} /> : <NotFound />}
  </>;
}
