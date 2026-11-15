import { useRef, useState } from 'react';
import { MagnifyingGlassPlus, X } from '@phosphor-icons/react';
import { VoiceAgentStory } from './VoiceAgentStory';
import { AutoVideo, Reveal } from '../lib/motion';
import { asset } from './WorkStack';

const strideScreens = [
  { file: 'stride/vehicle.png', title: 'Find & inspect a vehicle', text: 'Vehicle, transport and parking markers share the map. Selecting a scooter reveals its battery, distance and ride entry point.', generated: true },
  { file: 'stride/bus.png', title: 'Explore transport stops', text: 'Bus-stop details sit alongside vehicle discovery, with a dedicated place card and map/timetable actions.', generated: true },
  { file: 'stride/wallet.png', title: 'Manage the wallet', text: 'Card setup and top-up entry points connect to Stripe PaymentSheet. The displayed balance and history are sample data.', generated: true },
  { file: 'captures/stride-clean-06-map.png', title: 'Navigate the rider map', text: 'The original app view combines map controls, layer filtering and the scan-to-ride entry point.' },
  { file: 'captures/stride-clean-02-unlock-guide.png', title: 'Scan & unlock', text: 'The onboarding explains QR scanning and the safety check before a ride.' },
  { file: 'captures/stride-clean-04-parking-guide.png', title: 'Park & finish', text: 'Parking guidance explains how to leave the vehicle at the end of a ride.' },
];
const auliScreens = [
  { file: 'auli/feed.jpg', title: 'Neighbourhood feed', text: 'Photo-first posts with like, comment, share and save actions floating over the image.' },
  { file: 'auli/shops.jpg', title: 'Local shops', text: 'A directory of small businesses. Each storefront is assembled from reusable blocks.' },
  { file: 'auli/booking.jpg', title: 'Book a service', text: 'A shop’s booking block: pick a day and time, add a note and send the request.' },
  { file: 'auli/messages.jpg', title: 'Messages with context', text: 'A conversation started from a listing carries that item as a card in the thread.' },
  { file: 'auli/profile.jpg', title: 'Profiles', text: 'A member’s posts and saved items. Counts are calculated from stored records, never hard-coded.' },
  { file: 'auli/badges.jpg', title: 'Achievements', text: 'A badge wall that fills in as members post, join events and help neighbours.' },
];
const auliFeatures = [
  ['Five kinds of post', 'Jobs, rentals, second-hand, carpools and events'],
  ['Sign-ups & seats', 'Event registration, rescheduling and carpool seat requests'],
  ['Local shops', 'Storefront blocks, bookings and group pre-orders'],
  ['Messaging', 'Private conversations with listing context cards'],
  ['Moderation', 'Reports, review queues and an audit trail for admins'],
  ['Achievements', 'A badge collection tied to community activity'],
];
const guardSteps = [
  { title: 'Report an incident', text: 'A QR code identifies the site and location. The reporter adds the incident, evidence and contact details, then reviews the form.', files: [['Type & time', 'guardsync/reporting-01-type.png'], ['Evidence', 'guardsync/reporting-02-evidence.png'], ['Contact', 'guardsync/reporting-03-contact.png'], ['Review', 'guardsync/reporting-04-review.png']], kind: 'narrow', caption: 'Reporting Web · test environment · walkthrough stopped before submission' },
  { title: 'Review in the dashboard', text: 'Staff filter the incident queue, review AI analysis and use the timeline to follow the response.', files: [['Incident queue', 'guardsync/site-incidents.png'], ['AI analysis', 'guardsync/ai-analysis.png'], ['Timeline', 'guardsync/timeline.png']], caption: 'Management Web · test environment' },
];
const voiceSteps = [
  { title: 'Choose a profile and review progress', text: 'The learner workspace brings together language profiles, practice time and activity results. A profile supplies the target language, level and voice settings used by the agent; historical views can be explored without changing the active learning profile.', files: [['Learning overview', 'captures/samira-overview.png'], ['Learning profiles', 'captures/samira-profiles.png']], caption: 'Samira learner dashboard · original local captures' },
  { title: 'Return to learning history', text: 'Session history provides a route back to completed practice, activity records and saved words. Results remain activity-specific: quiz accuracy, pronunciation feedback and conversation time are reported separately.', files: [['Session history', 'captures/samira-learning.png']], caption: 'Samira learning dashboard · original local capture' },
  { title: 'Configure and inspect the agent', text: 'The admin workspace manages prompts and activities, the voice catalogue, transition speech, system settings and plan controls. Draft, compare and publish actions separate editing from the configuration loaded by new agent sessions.', files: [['Admin overview', 'captures/samira-admin-overview.png'], ['Voice catalogue', 'captures/samira-voice-catalog.png']], caption: 'Samira administration dashboard · original local captures' },
];

function ScreenStep({ step, index, onOpen }) {
  const [selected, setSelected] = useState(0);
  const current = step.files[selected];
  return <Reveal as="article" className="screen-step">
    <div className="screen-copy">
      <span className="step-number">STEP {String(index + 1).padStart(2, '0')}</span>
      <h3>{step.title}</h3><p>{step.text}</p>
      {step.files.length > 1 && <div className="screen-tabs" role="group" aria-label={`${step.title} screens`}>{step.files.map(([name], i) => <button key={name} onClick={() => setSelected(i)} aria-pressed={selected === i}>{name}</button>)}</div>}
    </div>
    <figure className={`screen-frame ${step.kind || ''}`}>
      <button className="screen-image" onClick={() => onOpen(current[1], current[0], step.caption)} aria-label={`Enlarge ${current[0]}`}><img src={asset(current[1])} alt={`${current[0]} — original Web capture`} loading="lazy" /><span className="screen-enlarge"><MagnifyingGlassPlus size={15} /> Enlarge</span></button>
      <figcaption>{step.caption}</figcaption>
    </figure>
  </Reveal>;
}

function PhoneGallery({ screens, name, onOpen, caption, alt }) {
  return <div className={`phone-gallery ${screens.length > 3 ? 'six' : ''}`}>{screens.map((s, i) => <Reveal as="article" className="phone-item" key={s.file} delay={i * 70}>
    <button className="phone-shot" onClick={() => onOpen(s.file, s.title, caption(s))} aria-label={`Enlarge ${name} ${s.title}`}><img src={asset(s.file)} alt={`${name} ${s.title} — ${alt(s)}`} loading="lazy" /></button>
    <div className="phone-copy"><span className="step-number">{String(i + 1).padStart(2, '0')}</span><h3>{s.title}</h3>{s.text && <p>{s.text}</p>}</div>
  </Reveal>)}</div>;
}

export function ProductScreens({ project }) {
  const dialog = useRef(null), [expanded, setExpanded] = useState(null), [actualSize, setActualSize] = useState(false);
  function open(file, title, caption) { setActualSize(false); setExpanded({ file, title, caption }); dialog.current.showModal(); }
  return <section className="case-section wrap" id="experience">
    <Reveal className="case-head"><h2>Product <span className="serif-i">walkthrough</span></h2><span className="mono">Select any screen to enlarge</span></Reveal>

    {project.id === 'guardsync' && <>
      {guardSteps.map((s, i) => <ScreenStep key={s.title} step={s} index={i} onOpen={open} />)}
      <Reveal as="article" className="screen-step">
        <div className="screen-copy"><span className="step-number">STEP 03</span><h3>Follow up on Mobile</h3><p>Staff move from the overview into incident details, analysis and response history. Notification taps open the relevant incident after the session is ready.</p></div>
        <PhoneGallery name="GuardSync Mobile" onOpen={open} screens={[['overview', 'Overview'], ['incidents', 'Incidents'], ['analysis', 'Incident analysis']].map(([file, title]) => ({ file: `guardsync/mobile-${file}.png`, title }))} caption={() => 'Mobile interface visualisation · source-informed sample data'} alt={() => 'interface visualisation'} />
      </Reveal>
    </>}

    {project.id === 'auli' && <>
      <div className="film">
        <Reveal className="film-stage"><AutoVideo src={asset('auli/opening.mp4')} poster={asset('auli/opening-poster.jpg')} label="Auli opening film: the home feed opening into an event page" /></Reveal>
        <Reveal className="film-copy" delay={120}>
          <span className="step-number">THE PRODUCT</span>
          <h3>One place for the things neighbours actually ask each other.</h3>
          <p>Auli brings the posts that usually scatter across group chats — a room to rent, a lift to Sydney, a weekend walk, a café’s pre-order — into one feed with proper detail pages, sign-ups and messaging.</p>
          <ul className="feature-list">{auliFeatures.map(([title, text]) => <li key={title}><b>{title}</b><span>{text}</span></li>)}</ul>
        </Reveal>
      </div>
      <PhoneGallery name="Auli" onOpen={open} screens={auliScreens} caption={() => 'iOS Simulator capture · labelled demo content'} alt={() => 'iOS Simulator capture'} />
      <p className="capture-note">The interface is in Chinese for its audience. Screens are iOS Simulator captures of the current build; every person, shop and post shown is labelled demo content. The opening film is composed from captures of the app. Auli is in development and has not been released on the app stores.</p>
    </>}

    {project.id === 'stride' && <>
      <PhoneGallery name="Stride" onOpen={open} screens={strideScreens} caption={s => s.generated ? 'Source-informed UI visualisation · sample data' : 'Original iOS simulator capture · backend unavailable during capture'} alt={s => s.generated ? 'interface visualisation' : 'original simulator capture'} />
      <p className="capture-note">The paused project is presented through its interface and implementation. Card setup and top-ups are integrated; wallet figures are sample data and production ride settlement is not demonstrated.</p>
    </>}

    {project.id === 'voice-learning' && <>
      <VoiceAgentStory />
      <div className="part-heading dashboard-heading"><span className="step-number">02 / DASHBOARD</span><h3>Learner history and agent administration</h3><p>The dashboard is both the learner’s review workspace and the control surface for published agent configuration.</p></div>
      {voiceSteps.map((s, i) => <ScreenStep key={s.title} step={s} index={i} onOpen={open} />)}
      <div className="agent-lifecycle"><h4>How the Dashboard controls a new session</h4><p>The admin Playground creates a short-lived, room-scoped LiveKit token using the signed-in account’s active profile. The agent validates that context, then loads published configuration. This starts a test conversation; it does not operate the hosted worker process.</p><p>Voice and model changes apply to subsequent sessions. Speaking rate has a separate runtime update path. Drafts, version-conflict checks and change history make configuration changes reviewable, while administrative permissions remain separate from learner subscription access.</p></div>
      <p className="capture-note">Original local dashboard captures. A live end-to-end voice session was not recorded in this walkthrough.</p>
    </>}

    <dialog className={`screen-dialog ${actualSize ? 'actual-size' : ''}`} ref={dialog} aria-label={expanded?.title || 'Project screen'} onClick={e => { if (e.target === e.currentTarget) dialog.current.close(); }}>
      <header><div><h3>{expanded?.title}</h3><p>{expanded?.caption}</p></div><button onClick={() => setActualSize(!actualSize)} aria-pressed={actualSize}>{actualSize ? 'Fit to screen' : 'Actual size'}</button><button onClick={() => dialog.current.close()} aria-label="Close screenshot"><X size={18} /></button></header>
      <div className="dialog-scroll">{expanded && <img src={asset(expanded.file)} alt={expanded.title} />}</div>
    </dialog>
  </section>;
}
