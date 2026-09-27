import { useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, MagnifyingGlassPlus, X, Desktop, DeviceMobile, QrCode, CheckCircle } from '@phosphor-icons/react';
const asset = file => `${import.meta.env.BASE_URL}assets/guardsync/${file}`;

export function GuardSyncVisual() {
  return <div className="gs-product-composition" aria-label="GuardSync management Web capture and Mobile interface visualisation">
    <div className="gs-browser-frame"><div className="gs-browser-bar"><i/><i/><i/><span>GuardSync / Operations</span></div><img src={asset('site-incidents.png')} alt="GuardSync management Web: incident metrics, filters and incident records in a test environment" loading="lazy" width="2219" height="1807"/></div>
    <div className="gs-phone-frame"><img src={asset('mobile-overview.png')} alt="GuardSync Mobile Overview, generated from source-informed interface references" loading="lazy" width="852" height="1846"/></div>
    <div className="gs-composition-label"><span>ONE INCIDENT.</span><strong>A shared context.</strong></div>
  </div>;
}

export function GuardSyncContext() {
  return <>
    <nav className="gs-section-nav wrap" aria-label="GuardSync case study sections">{[['experience','Product walkthrough'],['architecture','Architecture'],['decisions','Engineering decisions'],['delivery','Scope & delivery']].map(([id,label])=><a href={`#/work/guardsync?section=${id}`} key={id}>{label}<ArrowRight size={14}/></a>)}</nav>
    <section className="gs-context wrap"><div><p className="eyebrow">THE CHALLENGE</p><h2>Different people.<br/>The same incident.</h2></div><div className="gs-context-copy"><p>A visitor needs a clear way to report a problem. A manager needs enough context to assess it. A staff member needs to know what happened and what to do next—even when arriving through a push notification.</p><p>My work connects those entry points through site context, incident identity and a shared response history. Each surface is designed for its own user, while carrying the same incident forward.</p></div></section>
    <section className="gs-ownership wrap" aria-label="Implementation responsibilities">
      <article><span className="gs-ownership-kicker">01 / WEB</span><h3>Reporting & operations</h3><p>I independently built the public reporting and management interfaces, including their API integrations.</p></article>
      <article><span className="gs-ownership-kicker">02 / MOBILE</span><h3>The staff experience</h3><p>I independently built the React Native / Expo app: incident views, follow-up interactions and notification navigation.</p></article>
      <article><span className="gs-ownership-kicker">03 / BACKEND</span><h3>A shared implementation</h3><p>I contributed Python business logic and API endpoints, and worked through the wider backend to understand the business rules.</p></article>
    </section>
  </>;
}

const reporting = [
  {title:'Type & time',file:'reporting-01-type.png',headline:'Start with the place, then the problem.',text:'The QR entry carries site and location into the form. The reporter chooses when the incident happened and selects a category, so the report starts with structured context.',note:'Observed in the test flow: 15 categories and a visible session countdown.'},
  {title:'Evidence',file:'reporting-02-evidence.png',headline:'Give the report enough context.',text:'A description, speech-input control and live-camera entry support different ways of explaining the incident. The photo interface requires a fresh capture rather than an existing-file upload.',note:'The capture used a labelled demonstration description. Camera and microphone were not activated.'},
  {title:'Contact',file:'reporting-03-contact.png',headline:'Collect the details this workflow needs.',text:'This QR configuration requires a name and phone number, with email optional. Keeping contact information in its own step gives the reporter a focused task.',note:'The recorded walkthrough uses a fictional identity and a placeholder phone number.'},
  {title:'Review',file:'reporting-04-review.png',headline:'Bring the report together before sending.',text:'The final screen brings location, type, narrative and contact details into one review. It makes the submission boundary visible before the report is sent to management.',note:'Walkthrough stopped before submission. No new incident or staff notification was created.'},
];
const management = [
  {title:'Triage',file:'site-incidents.png',text:'Metrics, status, severity and filters bring the incident queue into one workspace. The detail view keeps the report connected to its supporting context.'},
  {title:'AI analysis',file:'ai-analysis.png',text:'The management view presents an AI summary and report-credibility rationale alongside the incident. They support staff review; they are not presented as verified facts or an automatic resolution.'},
  {title:'Timeline',file:'timeline.png',text:'Status progression, incident history and follow-up controls sit together. Notes and actions remain attached to the incident instead of becoming a separate conversation.'},
];

export function GuardSyncWalkthrough() {
  const [reportStep,setReportStep]=useState(0), [webStep,setWebStep]=useState(0), [expanded,setExpanded]=useState(null);
  const dialog=useRef(null); const current=reporting[reportStep], web=management[webStep];
  function open(file,title,caption){setExpanded({file,title,caption});dialog.current.showModal();}
  return <section className="gs-walkthrough" id="experience">
    <div className="wrap gs-walkthrough-heading"><p className="eyebrow">THE EXPERIENCE / THREE CONNECTED SURFACES</p><h2>Follow the work.<br/>Across every screen.</h2><p>Public reporting, a management workspace and a staff app—each with a distinct job.</p></div>
    <article className="gs-report-section wrap">
      <div className="gs-report-copy"><span className="gs-surface-label"><QrCode size={20}/> 01 / PUBLIC REPORTING</span><h3>A clear path<br/>from scan to report.</h3><p className="gs-section-lead">A location-aware form that turns an observation into a structured incident report.</p>
        <div className="gs-step-picker" role="group" aria-label="Reporting steps">{reporting.map((s,i)=><button key={s.title} aria-pressed={i===reportStep} onClick={()=>setReportStep(i)}><span>0{i+1}</span>{s.title}<ArrowRight size={18}/></button>)}</div>
        <div className="gs-step-description" aria-live="polite"><h4>{current.headline}</h4><p>{current.text}</p><small>{current.note}</small></div>
      </div>
      <figure className="gs-report-figure"><div className="gs-screen-toolbar"><span>REPORTING WEB / TEST ENVIRONMENT</span><button onClick={()=>open(current.file,current.title,'Original Web capture · demonstration report · not submitted')} aria-label={`Enlarge reporting ${current.title}`}><MagnifyingGlassPlus size={20}/></button></div><div className="gs-report-viewport" key={current.file} tabIndex={0} aria-label={`${current.title} screenshot; scroll to see the full form`}><img src={asset(current.file)} alt={`Actual public reporting form: ${current.title}`} loading="lazy"/></div><figcaption>Original Web capture · Step {reportStep+1} of 4 · Scroll to explore</figcaption></figure>
    </article>
    <article className="gs-management-section">
      <div className="wrap"><div className="gs-surface-heading"><div><span className="gs-surface-label"><Desktop size={20}/> 02 / MANAGEMENT WEB</span><h3>From incoming reports<br/>to informed follow-up.</h3></div><p>Managers need an overview of the queue and a detailed view of each event. The workspace connects both.</p></div>
        <div className="gs-web-tabs" role="group" aria-label="Management screenshots">{management.map((s,i)=><button key={s.title} aria-pressed={i===webStep} onClick={()=>setWebStep(i)}>{s.title}</button>)}</div>
        <figure className="gs-web-figure"><button onClick={()=>open(web.file,web.title,'Original management Web capture · test environment')} aria-label={`Enlarge management ${web.title}`}><img src={asset(web.file)} alt={`Actual GuardSync management Web: ${web.title}`} loading="lazy"/><span className="gs-enlarge"><MagnifyingGlassPlus size={19}/> Enlarge screen</span></button><figcaption><span>WEB / TEST ENVIRONMENT</span><p aria-live="polite">{web.text}</p></figcaption></figure>
      </div>
    </article>
    <article className="gs-mobile-section wrap"><div className="gs-surface-heading"><div><span className="gs-surface-label"><DeviceMobile size={20}/> 03 / STAFF MOBILE</span><h3>The incident travels<br/>with the person responding.</h3></div><p>Overview, incident lists and detail views provide a consistent route into the work. Notification taps reconnect staff to that same incident context.</p></div>
      <div className="gs-mobile-gallery">{[
        ['overview','See the overview','Site metrics and recent incidents establish the current context.'],
        ['incidents','Find the incident','Filters, severity and status help staff locate the relevant record.'],
        ['analysis','Understand the detail','Analysis and timeline views bring context and follow-up together.']
      ].map(([file,title,text],i)=><figure key={file}><button className="gs-mobile-image" onClick={()=>open(`mobile-${file}.png`,title,'Mobile interface visualisation · generated from source references · sample data')} aria-label={`Enlarge Mobile ${title}`}><img src={asset(`mobile-${file}.png`)} alt={`GuardSync Mobile interface visualisation: ${title}`} loading="lazy" width="852" height="1846"/><span className="gs-mobile-zoom"><MagnifyingGlassPlus size={22}/></span></button><figcaption><span>0{i+1}</span><h4>{title}</h4><p>{text}</p></figcaption></figure>)}</div>
    </article>
    <dialog className="gs-gallery-dialog" ref={dialog} aria-label={expanded?.title||'Project screenshot'} onClick={e=>{if(e.target===e.currentTarget)dialog.current.close();}}><div className="gs-dialog-header"><div><h3>{expanded?.title}</h3><p>{expanded?.caption}</p></div><button onClick={()=>dialog.current.close()} aria-label="Close screenshot"><X size={24}/></button></div>{expanded&&<img src={asset(expanded.file)} alt={expanded.title}/>}</dialog>
  </section>;
}

export function GuardSyncDelivery() {
  return <section className="gs-delivery wrap" id="delivery"><p className="eyebrow">SCOPE & DELIVERY</p><div className="gs-surface-heading"><h2>Built across the interfaces.<br/>Grounded in the system.</h2><p>The value of this work is the connection between product interaction, API contracts and the operational context behind each screen.</p></div><div className="gs-delivery-grid">
    <article><CheckCircle size={24}/><h3>Implemented in source</h3><p>Public reporting, management views, mobile incident follow-up, device registration and push navigation.</p></article>
    <article><DeviceMobile size={24}/><h3>Internal testing</h3><p>Mobile is in final closed testing, based on my project update. This case study does not claim an App Store release or production adoption metrics.</p></article>
    <article><Desktop size={24}/><h3>Demonstrated here</h3><p>Original test-environment Web screens and a four-step reporting walkthrough. Live submission, push delivery and device camera behaviour were not exercised during capture.</p></article>
  </div><a className="text-link" href={`${import.meta.env.BASE_URL}assets/guardsync/architecture.html`} target="_blank" rel="noreferrer">Open the expanded system map <ArrowUpRight size={18}/></a></section>;
}
