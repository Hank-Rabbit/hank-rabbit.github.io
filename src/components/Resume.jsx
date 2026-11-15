import { Reveal } from '../lib/motion';

const experience = [
  { company: 'TriVector AI', role: 'Web & Full-Stack Developer', dates: 'Mar 2025 — Present', place: 'Melbourne, Australia', text: 'Independent Web and Mobile development for GuardSync, with contributions to its Python APIs and business logic. End-to-end design and development of the Voice Learning Platform, including the dashboard, Python agent and supporting services.', tags: ['Web', 'Mobile', 'Conversational AI'] },
  { company: 'Stride', role: 'Contract Developer · Full Stack & Mobile', dates: 'Jul 2025 — Mar 2026', place: 'Canberra, Australia', text: 'Designed and built a shared-mobility application across the rider experience, maps, backend APIs, ride data, vehicle communication and Stripe integration.', tags: ['Product design', 'React Native', 'FastAPI', 'Payments'] },
  { company: 'Waytale Big-data Service', role: 'R&D Deputy Director & Front-End Lead', dates: 'Mar 2020 — Mar 2024', place: 'Guiyang, China', text: 'Led front-end delivery for business dashboards and web/mobile applications, contributing architecture decisions, code reviews and coordination with technical and business stakeholders.', tags: ['Front-end leadership', 'Business applications'] },
];
const skills = [
  ['Web & Mobile', ['React', 'Next.js', 'TypeScript', 'JavaScript', 'React Native', 'Expo']],
  ['APIs & Data', ['Python', 'FastAPI', 'Fastify', 'REST APIs', 'PostgreSQL', 'Prisma', 'SQLAlchemy', 'PostGIS']],
  ['AI & Integrations', ['LiveKit Agents', 'STT / LLM / TTS', 'Activity state', 'Stripe', 'Firebase messaging']],
  ['Delivery', ['Git', 'Docker', 'GCP', 'AWS', 'EAS Update', 'Unit testing', 'API integration']],
];

export function Resume() {
  return <section className="section wrap" id="experience">
    <Reveal className="section-head"><h2><span className="serif-i">Experience</span></h2><p>Five-plus years across product teams: leading a front-end group, then building whole products as an independent developer.</p></Reveal>
    <div className="xp-list">{experience.map((e, i) => <Reveal as="article" className="xp-row" key={e.company} delay={i * 80}>
      <div className="xp-when">{e.dates}<small>{e.place}</small></div>
      <div><h3>{e.company}</h3><p className="xp-role">{e.role}</p></div>
      <div className="xp-body"><p>{e.text}</p><div className="card-chips">{e.tags.map(t => <span className="chip" key={t}>{t}</span>)}</div></div>
    </Reveal>)}</div>
    <div className="skills">{skills.map(([title, list], i) => <Reveal className="skill-col" key={title} delay={i * 70}><h3>{title}</h3><ul>{list.map(s => <li key={s}>{s}</li>)}</ul></Reveal>)}</div>
    <div className="edu">
      <Reveal><span className="eyebrow">Education</span><h3>Bachelor of Information and Communication Technology</h3><p>Ara Institute of Canterbury · Christchurch, New Zealand · Mar 2021</p></Reveal>
      <Reveal delay={80}><span className="eyebrow">Certification</span><h3>AWS Certified Machine Learning — Specialty</h3><p>MLS certification, as listed in my CV.</p></Reveal>
    </div>
  </section>;
}
