import { useEffect, useRef, useState, lazy, Suspense } from 'react';
import { ArrowRight, ArrowLeft, ArrowUpRight, List, X, EnvelopeSimple, MagnifyingGlassPlus } from '@phosphor-icons/react';
import { projects, projectById } from './projects';
import { Resume } from './components/Resume';
import { ProductScreens, ProjectPreview } from './components/ProductScreens';
const Architecture = lazy(() => import('./components/Architecture'));
const asset = name => `${import.meta.env.BASE_URL}assets/${name}`;
const resume = `${asset('Hanke-Zhang-CV.pdf')}?v=20260927-links`;
const linkedin = 'https://www.linkedin.com/in/hanke-z-939b61301/';
function useRoute(){
  const [hash,setHash]=useState(window.location.hash || '#/');
  useEffect(()=>{ const update=()=>setHash(window.location.hash || '#/'); window.addEventListener('hashchange',update); return()=>window.removeEventListener('hashchange',update); },[]);
  useEffect(()=>{const anchor=new URLSearchParams(hash.split('?')[1]||'').get('section');requestAnimationFrame(()=>{if(anchor)document.getElementById(anchor)?.scrollIntoView({behavior:'instant'});else window.scrollTo({top:0,behavior:'instant'});});},[hash]);
  return hash.split('?')[0];
}
function Header({isHome}){
  const [open,setOpen]=useState(false);
  useEffect(()=>{const close=()=>setOpen(false);window.addEventListener('hashchange',close);return()=>window.removeEventListener('hashchange',close);},[]);
  return <header className="site-header wrap"><a className="identity" href="#/" aria-label="Hanke Zhang home"><span className="monogram">HZ</span><span>Hanke Zhang</span></a><button className="menu-toggle" onClick={()=>setOpen(!open)} aria-expanded={open} aria-controls="main-nav" aria-label={open?'Close menu':'Open menu'}>{open?<X size={25}/>:<List size={25}/>}</button><nav id="main-nav" className={open?'nav open':'nav'} aria-label="Main navigation"><a href="#/?section=work" aria-current={isHome?'page':undefined}>Work</a><a href="#/?section=about">About</a><a href={resume} target="_blank" rel="noreferrer">Resume <ArrowUpRight size={13}/></a><a href={linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={13}/></a></nav></header>;
}

function Footer(){return <footer className="site-footer wrap"><a className="identity" href="#/"><span className="monogram">HZ</span><span>Hanke Zhang</span></a><div><a href={resume}>Resume</a><a href={linkedin} target="_blank" rel="noreferrer">LinkedIn</a><a href="mailto:zhabghank1997@gmail.com">Email</a></div></footer>;}
const descriptions={guardsync:'Incident reporting and response across public Web, management dashboard and staff Mobile.',stride:'A shared-mobility app with map discovery, vehicle controls and Stripe wallet integration.','voice-learning':'A voice learning product with learner profiles, session history and an administration dashboard.'};
function Home(){
 useEffect(()=>{document.title='Hanke Zhang — Software Engineer';},[]);
 return <main id="main-content" tabIndex={-1}>
  <section className="profile wrap" id="about"><div><p className="eyebrow">CANBERRA, AUSTRALIA</p><h1>Hanke Zhang<span>Software Engineer</span></h1><p className="seeking-roles"><span>SEEKING OPPORTUNITIES IN</span>Software Engineering<br/>Full-Stack Development<br/>AI Application Development</p></div><div className="profile-copy"><p>Full-stack software engineer with 5+ years of experience building web, mobile and business applications.</p><p>I work across React, Next.js, React Native and Python APIs, with hands-on experience in payments and conversational AI. My background combines independent product delivery with front-end leadership: translating business requirements into interfaces, services and maintainable workflows.</p><div className="profile-links"><a className="text-link" href={resume} target="_blank" rel="noreferrer">Resume <ArrowUpRight size={16}/></a><a className="text-link" href={linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={16}/></a><a className="text-link" href="mailto:zhabghank1997@gmail.com">Email <EnvelopeSimple size={16}/></a></div></div></section>
  <Resume/>
  <section className="selected-work wrap" id="work"><div className="plain-heading"><h2>Selected work</h2><span>Web · Mobile · Backend</span></div>{projects.map(p=><article className="work-entry" key={p.id}><a className={`work-preview preview-${p.id}`} href={`#/work/${p.id}`} aria-label={`Read ${p.name} case study`}><ProjectPreview id={p.id}/></a><div className="work-info"><p className="eyebrow">{p.category}</p><h3><a href={`#/work/${p.id}`}>{p.name}</a></h3><p>{descriptions[p.id]}</p><p className="work-role">{p.role}</p><a className="text-link" href={`#/work/${p.id}`}>View project <ArrowRight size={18}/></a></div></article>)}</section>
 </main>;
}
function Challenges({project}){return <section className="challenges wrap" id="decisions"><div className="plain-heading"><h2>Engineering challenges</h2></div><div className="challenge-list">{project.decisions.map((d,i)=><article key={d.title}><span className="step-number">0{i+1}</span><div><h3>{d.title}</h3><p>{d.summary}</p><p>{d.implementation}</p><details><summary>Contribution, trade-offs & source <ArrowRight size={15}/></summary>{d.tradeoff&&<p>{d.tradeoff}</p>}<p className="challenge-contribution">{d.contribution}</p><small>{d.evidence}</small></details></div></article>)}</div></section>;}
function CaseStudy({project}){
 useEffect(()=>{document.title=`${project.name} — Hanke Zhang`;},[project.name]);const next=projectById[project.next];
 return <main id="main-content" tabIndex={-1} className={`linear-case case-${project.id}`}>
  <div className="wrap case-back"><a href="#/?section=work"><ArrowLeft size={16}/> All projects</a><span>{project.number} / 03</span></div>
  <section className="project-intro wrap"><p className="eyebrow">{project.category}</p><h1>{project.name}</h1><p className="project-description">{descriptions[project.id]}</p><div className="project-facts"><div><span>My role</span><p>{project.ownership}</p></div><div><span>Technology</span><p>{project.fullStack.join(' · ')}</p></div></div>{project.id==='guardsync'&&<p className="stage-note">Mobile · final closed testing</p>}{project.id==='stride'&&<p className="stage-note">Project currently paused · implementation case study</p>}<nav className="case-index" aria-label="Project sections"><a href={`#/work/${project.id}?section=experience`}>Product walkthrough</a><a href={`#/work/${project.id}?section=architecture`}>Architecture</a><a href={`#/work/${project.id}?section=decisions`}>Engineering challenges</a></nav></section>
  <ProductScreens project={project}/>
  <Suspense fallback={<section className="architecture loading-architecture" id="architecture"><p>Loading architecture…</p></section>}><Architecture key={project.id} project={project}/></Suspense>
  <Challenges project={project}/>
  <nav className="next-project wrap" aria-label="More case studies"><span>Next project</span><a href={`#/work/${next.id}`}>{next.name}<ArrowRight size={24}/></a></nav>
 </main>;
}
function NotFound(){return <main className="wrap not-found" id="main-content"><h1>Project not found</h1><a className="text-link" href="#/">Back to selected work</a></main>;}
export function App(){const route=useRoute();const project=projectById[route.replace('#/work/','')];return <><a className="skip-link" href="#main-content" onClick={e=>{e.preventDefault();document.getElementById('main-content')?.focus();}}>Skip to content</a><Header isHome={route==='#/'}/>{route==='#/'?<Home/>:project?<CaseStudy key={project.id} project={project}/>:<NotFound/>}<Footer/></>;}
