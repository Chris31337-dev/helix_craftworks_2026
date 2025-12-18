import { useEffect, useMemo, useState } from 'react';
import headerLogo from '../Assets/Asset 25@1.5x.webp';
import CareersPage from './pages/Careers';

const BRAND = 'Helix Craftworks';
const BRAND_MARK = `${BRAND}®`;
const BRAND_MARK_UPPER = `${BRAND.toUpperCase()}®`;
const HEADER_LOGO_SRC = headerLogo;
const DEFAULT_PROJECT_TYPE = 'Kitchen renovation';

const services = [
  {
    title: 'Renovations & Remodels',
    copy: 'Full-scope residential renovations managed end to end, from early planning and permits through final inspection and close-out.',
    href: '/renovations',
  },
  {
    title: 'General Contracting',
    copy: 'Scheduling, sequencing, and trade coordination handled directly to keep scope, budget, and finish quality aligned throughout the build.',
    href: '/general-contracting',
  },
  {
    title: 'Project Planning & Sequencing',
    copy: 'Layouts, materials, and construction order defined before work begins to reduce delays, conflicts, and mid-project changes.',
    href: '#process',
  },
  {
    title: 'Finish Carpentry & Millwork',
    copy: 'Trim, paneling, built-ins, and architectural details executed with tight tolerances and careful alignment to the existing home.',
    href: '/finish-carpentry-millwork',
  },
  {
    title: 'Specialty Details & Custom Elements',
    copy: 'Complex features such as concealed storage, integrated millwork, and custom transitions handled as part of a larger renovation scope.',
    href: '#specialty-work',
  },
  {
    title: 'Repairs, Upgrades & Phased Work',
    copy: 'Targeted improvements and phased renovations planned to integrate cleanly with future work and long-term goals.',
    href: '/repairs-upgrades',
  },
  {
    title: 'Helix Services (Maintenance & Repairs)',
    copy: 'Preventive maintenance and responsive repairs delivered by Helix Services™ to keep systems reliable and downtime low.',
    href: '/helix-services',
  },
];

const steps = [
  {
    label: '01',
    title: 'Discover',
    copy: 'We walk the space, review structure, and define scope so the work is understood before decisions are made.',
  },
  {
    label: '02',
    title: 'Plan',
    copy: 'Trades are sequenced, materials are locked, and details are finalized before work begins.',
  },
  {
    label: '03',
    title: 'Build',
    copy: 'On-site execution with active supervision, dust control, clean lines, and daily check-ins through handoff.',
  },
];

const deliverySnapshots = [
  {
    title: 'Schedule & Scope Control',
    tag: 'Built like a plan, not a guess',
    description: 'Renovations managed with clear sequencing, documented scope, and steady oversight from start to finish.',
    stats: [
      { value: '40+', label: 'Renovations managed end-to-end' },
      { value: '90%+', label: 'Milestones met as scheduled' },
      { value: '0', label: 'Unapproved change orders' },
    ],
  },
  {
    title: 'Plan Before We Cut',
    tag: 'Decisions made early. Fewer surprises later.',
    description: 'Layouts, materials, and details are locked before work begins so installs move cleanly and predictably.',
    stats: [
      { value: '2–4 wks', label: 'Typical planning window before site start' },
      { value: '100%', label: 'Material selections approved pre-demo' },
      { value: '1', label: 'Coordinated plan across trades' },
    ],
  },
  {
    title: 'Clean Sites, Clear Progress',
    tag: 'Respect for the home while work is underway',
    description: 'Active job sites are protected, organized, and reset daily so homeowners can live comfortably during renovations.',
    stats: [
      { value: 'Daily cleanup', label: 'On active sites' },
      { value: 'Dust control', label: 'Used on all interior projects' },
      { value: 'Protected finishes', label: 'Floors, trim, and access paths' },
    ],
  },
  {
    title: 'Finish-Driven Execution',
    tag: "Details noticed because they're right",
    description: 'Trim, cabinetry, and transitions installed with tight tolerances and an eye for alignment.',
    stats: [
      { value: 'Tight tolerances', label: 'On trim, reveals, and cabinetry' },
      { value: 'Matched materials', label: 'Integrated with existing architecture' },
      { value: 'Zero', label: 'Finish callbacks on completed work' },
    ],
  },
  {
    title: 'Clear, Direct Communication',
    tag: 'No chasing updates. No guesswork.',
    description: 'Clients receive consistent updates and a single point of contact throughout the project.',
    stats: [
      { value: 'Weekly', label: 'Schedule and progress updates' },
      { value: '1', label: 'Point of contact start to finish' },
      { value: '48 hrs', label: 'Typical response time during active work' },
    ],
  },
  {
    title: 'Advanced Carpentry Capability',
    tag: 'Complex details, handled quietly',
    description: 'Specialty features like hidden doors and complex millwork are integrated seamlessly within larger renovation scopes.',
    stats: [
      { value: 'Dozens', label: 'Specialty installations completed' },
      { value: 'Integrated', label: 'Into full-room and whole-home projects' },
      { value: 'No novelty installs', label: 'Without architectural context' },
    ],
  },
  {
    title: 'Built for the Next Phase',
    tag: 'Work that earns repeat calls',
    description: 'Many clients return for additional rooms or future projects after the first renovation is complete.',
    stats: [
      { value: '5⭐', label: 'Average client rating' },
      { value: 'Repeat clients', label: 'Drive most new work' },
      { value: 'Next-phase ready', label: 'Projects planned with longevity in mind' },
    ],
  },
];

const faqs = [
  {
    q: 'Where do you work?',
    a: 'Pennsylvania and nearby markets for renovations and finish-driven builds. Travel projects case-by-case.',
  },
  {
    q: 'Do you design and build?',
    a: 'Yes. Concept through completion, collaborating with your architect or designer when provided.',
  },
  {
    q: 'What makes a great first call?',
    a: 'Share goals, dimensions, drawings if available, and timing. We will return options, allowances, and a clear plan.',
  },
];

const projects = [
  {
    name: 'Whole-home refresh',
    summary: 'Sequenced trades, updated mechanicals, and finish carpentry that ties new spaces back to the original character.',
  },
  {
    name: 'Kitchen + mudroom',
    summary: 'Renovation with site protection, cabinet alignment, integrated lighting, and durable storage for daily use.',
  },
  {
    name: 'Living room millwork',
    summary: 'Beam cladding, crown, and paneling with concealed storage; specialty hardware set flush and true.',
  },
];

function StorePage({ year }: Readonly<{ year: number }>) {
  return (
    <Shell>
      <Header />
      <main className="mt-16 space-y-10 sm:space-y-14">
        <section className="rounded-3xl border border-canvas/10 bg-canvas/5 p-8 shadow-card shadow-glow/30 sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-steel">Loom &amp; Lathe</p>
          <h1 className="mt-2 font-display text-3xl font-semibold text-canvas sm:text-4xl">Helix Craftworks Store</h1>
          <p className="mt-4 max-w-2xl text-sm text-steel">
            Apparel and small-batch goods built with the same attention to detail we bring to every renovation. Visit the store to browse and order.
          </p>
          <a
            href="https://store.helixcraftworks.com"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-redwood px-5 py-3 text-sm font-semibold text-canvas shadow-glow transition hover:-translate-y-0.5"
            target="_blank"
                    <option>{DEFAULT_PROJECT_TYPE}</option>
          </a>
        </section>
      </main>
      <Footer year={year} />
    </Shell>
  );
}

function Divider() {
  return <div className="h-px w-full bg-canvas/10" />;
}

function SectionHeading({ title, eyebrow, copy }: Readonly<{ title: string; eyebrow: string; copy?: string }>) {
  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-steel">{eyebrow}</p>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
        <h2 className="font-display text-2xl font-semibold text-canvas sm:text-3xl">{title}</h2>
        {copy ? <p className="max-w-xl text-sm text-steel">{copy}</p> : null}
      </div>
    </div>
  );
}

function Shell({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen bg-charcoal text-canvas">
      <div className="absolute inset-0 -z-10 bg-radial-spot" aria-hidden />
      <div className="absolute inset-0 -z-20 opacity-25 bg-grid-light bg-[length:140px_140px]" aria-hidden />
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 pb-16 pt-10 sm:px-10 sm:pt-14 lg:px-14">{children}</div>
    </div>
  );
}

function Header() {
  return (
    <header className="flex items-center justify-between">
      <a href="/#top" className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-canvas/10 bg-canvas/5 shadow-glow">
          <img src={HEADER_LOGO_SRC} alt={`${BRAND_MARK} logo`} className="h-8 w-8 object-contain" />
        </div>
        <div>
          <p className="font-display text-sm font-semibold text-canvas">{BRAND_MARK_UPPER}</p>
          <p className="text-xs text-steel">Custom Renovations. Visible craftsmanship. Built by {BRAND_MARK}.</p>
        </div>
      </a>
      <nav className="hidden items-center gap-6 text-sm text-steel sm:flex">
        <a href="/#services">Services</a>
        <a href="/helix-services">Helix Services</a>
        <a href="/#process">Process</a>
        <a href="/careers">Careers</a>
        <a href="/#contact" className="rounded-full bg-redwood px-4 py-2 text-canvas shadow-glow transition hover:-translate-y-0.5">
          Request a consult
        </a>
      </nav>
    </header>
  );
}

function Footer({ year }: Readonly<{ year: number }>) {
  return (
    <footer className="mt-16 flex flex-col gap-4 border-t border-canvas/10 pt-6 text-sm text-steel sm:flex-row sm:items-start sm:justify-between">
      <div className="flex flex-col gap-2 text-canvas">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-canvas/10 bg-canvas/5">
            <img src={HEADER_LOGO_SRC} alt={`${BRAND_MARK} logo`} className="h-6 w-6 object-contain" />
          </div>
          <span>{BRAND_MARK}</span>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-steel">
          <a href="/#services">Services</a>
          <a href="/helix-services">Helix Services</a>
          <a href="/#process">Process</a>
          <a href="/careers">Careers</a>
          <a href="/#contact">Request a consult</a>
        </div>
      </div>
      <div className="flex flex-col items-start gap-1 sm:items-end">
        <div className="flex flex-col leading-tight text-right sm:text-right">
          <a href="https://store.helixcraftworks.com" target="_blank" rel="noreferrer" className="text-canvas">
            Loom & Lathe
          </a>
          <span className="text-xs text-steel">Apparel and small-batch goods from Helix Craftworks</span>
        </div>
        <div className="flex gap-4 text-steel">
          <a href="/terms">Terms</a>
          <a href="/privacy">Privacy</a>
          <span>© {year}</span>
        </div>
      </div>
    </footer>
  );
}

const standalonePages = {
  '/renovations': {
    title: 'Renovations & Remodels',
    intro: 'Full-scope residential renovations managed end to end, from early planning and permits through final inspection and close-out.',
    sections: [
      {
        heading: 'What we manage',
        items: ['Planning, permits, and inspections', 'Sequenced trades with documented scope', 'Site protection, dust control, and finish alignment'],
      },
      {
        heading: 'How we deliver',
        items: ['Clear schedule and milestone tracking', 'Material approvals before demo', 'Daily oversight until handoff'],
      },
    ],
  },
  '/general-contracting': {
    title: 'General Contracting',
    intro: 'Scheduling, sequencing, and trade coordination handled directly to keep scope, budget, and finish quality aligned throughout the build.',
    sections: [
      {
        heading: 'Controls in place',
        items: ['Single point of contact from start to finish', 'Approved scopes before mobilization', 'Weekly updates during active work'],
      },
      {
        heading: 'Oversight',
        items: ['On-site checks during critical phases', 'Issue resolution before it impacts schedule', 'Close-out with documented punch completion'],
      },
    ],
  },
  '/finish-carpentry-millwork': {
    title: 'Finish Carpentry & Millwork',
    intro: 'Trim, paneling, built-ins, and architectural details executed with tight tolerances and alignment to the existing home.',
    sections: [
      {
        heading: 'Focus areas',
        items: ['Casing, crown, and panel systems set true', 'Built-ins integrated with existing architecture', 'Transitions planned with flooring and trim profiles'],
      },
      {
        heading: 'Delivery approach',
        items: ['Material selection confirmed before fabrication', 'Mock-ups where alignment is critical', 'Installed with protected finishes and clean site standards'],
      },
    ],
  },
  '/repairs-upgrades': {
    title: 'Repairs, Upgrades & Phased Work',
    intro: 'Targeted improvements and phased renovations planned to integrate cleanly with future work and long-term goals.',
    sections: [
      {
        heading: 'Typical scopes',
        items: ['Targeted repairs tied to future phases', 'System and finish upgrades coordinated with existing conditions', 'Prep work that keeps the next phase efficient'],
      },
      {
        heading: 'Planning mindset',
        items: ['Scope designed to avoid rework later', 'Schedules aligned to material readiness', 'Documentation for continuity into the next phase'],
      },
    ],
  },
  '/helix-services': {
    title: 'Helix Services (Maintenance & Repairs)',
    intro: 'Preventive maintenance programs and responsive repairs delivered by Helix Craftworks® dba Helix Services™ for residential and light commercial systems.',
    ctaLabel: 'Request service',
    sections: [
      {
        heading: 'Overview',
        items: [
          'Reliability-first maintenance plans tailored to the specific systems on site',
          'Emphasis on early detection for condensate, venting, and control issues',
          'Flat-rate programs that keep annual costs predictable',
        ],
      },
      {
        heading: 'Response & support',
        items: [
          'Next-day response included for covered service issues',
          'Same-day response available as an annual upgrade (when available)',
          'Emergency lockouts and safety shutdowns prioritized',
        ],
      },
      {
        heading: 'Service schedule',
        items: [
          'Seasonal visits calibrated to the equipment (e.g., fall heating service, spring system checks)',
          'Condensate-focused cold-weather checks when freezing risk is highest',
          'Documented condition notes after each visit',
        ],
      },
      {
        heading: 'Investment starting points',
        items: [
          'Program pricing set per system and scope; example HVAC preventive maintenance starts around $325 per unit annually',
          'Includes two full preventive maintenance visits per year plus priority troubleshooting support',
          'Same-day response upgrade available as an annual add-on',
        ],
      },
      {
        heading: 'Not included in maintenance visits',
        items: [
          'Major component replacement, refrigerant service, or leak detection',
          'Duct modifications, balancing, or code upgrades unrelated to maintenance',
          'Compressor diagnostics beyond start-and-run confirmation',
        ],
      },
      {
        heading: 'Why this approach works',
        items: [
          'Condensate-sensitive and zoned systems stay stable with planned checks',
          'Older multi-story buildings avoid small issues snowballing into downtime',
          'Programs prioritize failure prevention over reactive calls',
        ],
      },
    ],
  },
  '/terms': {
    title: 'Terms & Conditions',
    intro: 'These terms outline how Helix Craftworks engages with site visitors and prospective clients. Please review before contacting us.',
    sections: [
      {
        heading: 'Use of this site',
        items: ['Content is informational and may change without notice', 'No warranties are expressed or implied for site accuracy', 'Do not reuse images or copy without permission'],
      },
      {
        heading: 'Engagements',
        items: ['Work is governed by executed contracts and approved scopes', 'Schedules and pricing are finalized in written agreements', 'Change orders require written approval before execution'],
      },
      {
        heading: 'Liability',
        items: ['Helix is not responsible for third-party sites linked here', 'We are not liable for losses arising from site use', 'Your use of the site indicates acceptance of these terms'],
      },
    ],
  },
  '/privacy': {
    title: 'Privacy Policy',
    intro: 'We collect only the information needed to respond to project inquiries and operate this site. We do not sell your data.',
    sections: [
      {
        heading: 'Information collected',
        items: ['Contact form details you provide (name, email, project context)', 'Basic site analytics to improve usability', 'No sensitive personal data is requested'],
      },
      {
        heading: 'How we use it',
        items: ['To respond to your inquiry and plan project discussions', 'To maintain site security and performance', 'To improve our communication and scheduling workflows'],
      },
      {
        heading: 'Sharing',
        items: ['We do not sell or rent your information', 'Vendors receive data only when needed to service your request and subject to confidentiality', 'You may request deletion of your submitted information'],
      },
    ],
  },
};

export default function App() {
  const year = useMemo(() => new Date().getFullYear(), []);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [snapshotIndex, setSnapshotIndex] = useState(0);
  const [path, setPath] = useState<string>(() => (globalThis.window === undefined ? '/' : globalThis.window.location.pathname));
  const [projectType, setProjectType] = useState<string>(DEFAULT_PROJECT_TYPE);

  const currentSnapshot = deliverySnapshots[snapshotIndex];

  useEffect(() => {
    function handlePopstate() {
      setPath(globalThis.window.location.pathname);
    }
    globalThis.addEventListener('popstate', handlePopstate);
    return () => globalThis.removeEventListener('popstate', handlePopstate);
  }, []);

  if (path === '/careers') {
    return <CareersPage />;
  }
  
  if (path === '/store') {
    return <StorePage year={year} />;
  }

  const standalonePage = standalonePages[path as keyof typeof standalonePages];

  if (standalonePage) {
    return (
      <Shell>
        <Header />
        <main className="mt-16 flex flex-col gap-12 sm:gap-16">
          <section className="space-y-6 rounded-2xl border border-canvas/10 bg-canvas/5 p-8 shadow-card shadow-glow/30">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-steel">{standalonePage.title}</p>
            <h1 className="font-display text-3xl font-semibold text-canvas sm:text-4xl">{standalonePage.title}</h1>
            <p className="max-w-2xl text-sm text-steel">{standalonePage.intro}</p>
            <div className="grid gap-6 md:grid-cols-2">
              {standalonePage.sections.map((section) => (
                <article key={section.heading} className="rounded-xl border border-canvas/10 bg-charcoal/60 p-5 shadow-card">
                  <h2 className="font-display text-lg font-semibold text-canvas">{section.heading}</h2>
                  <ul className="mt-3 space-y-2 text-sm text-steel">
                    {section.items.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="text-redwood">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
            <div className="pt-2">
              <a
                href="/#contact"
                className="inline-flex items-center justify-center rounded-full bg-redwood px-5 py-3 text-sm font-semibold text-canvas shadow-glow transition hover:-translate-y-0.5"
              >
                {standalonePage.ctaLabel ?? 'Request a walkthrough'}
              </a>
            </div>
          </section>
        </main>
        <Footer year={year} />
      </Shell>
    );
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('sending');
    setErrorMessage('');

    const form = event.currentTarget;
    const formData = new FormData(form);
    const body = new URLSearchParams();
    formData.forEach((value, key) => {
      let stringValue: string;
      if (typeof value === 'string') {
        stringValue = value;
      } else if (value instanceof File) {
        stringValue = value.name;
      } else {
        stringValue = String(value);
      }
      body.append(key, stringValue);
    });

    // Netlify returns 303 redirects for standard form posts. Setting Accept to application/json
    // keeps it AJAX-friendly and lets us treat 2xx/3xx as success.

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
        },
        body: body.toString(),
      });

      if (response.ok || (response.status >= 300 && response.status < 400)) {
        setStatus('success');
        setProjectType(DEFAULT_PROJECT_TYPE);
        form.reset();
      } else {
        setStatus('error');
        setErrorMessage(`Something went wrong. Status ${response.status}. Please try again or email chris@helixcraftworks.com.`);
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
      setErrorMessage('Network issue. Please try again.');
    }
  }

  function showPrevSnapshot() {
    setSnapshotIndex((prev) => (prev - 1 + deliverySnapshots.length) % deliverySnapshots.length);
  }

  function showNextSnapshot() {
    setSnapshotIndex((prev) => (prev + 1) % deliverySnapshots.length);
  }

  const isServicesLead = projectType === 'Preventive maintenance' || projectType === 'Repairs / service visit';

  return (
    <div className="min-h-screen bg-charcoal text-canvas">
      <div className="absolute inset-0 -z-10 bg-radial-spot" aria-hidden />
      <div className="absolute inset-0 -z-20 opacity-25 bg-grid-light bg-[length:140px_140px]" aria-hidden />
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 pb-16 pt-10 sm:px-10 sm:pt-14 lg:px-14">
        <header className="flex items-center justify-between">
          <a href="/#top" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-canvas/10 bg-canvas/5 shadow-glow">
              <img src={HEADER_LOGO_SRC} alt={`${BRAND_MARK} logo`} className="h-8 w-8 object-contain" />
            </div>
            <div>
              <p className="font-display text-sm font-semibold text-canvas">{BRAND_MARK_UPPER}</p>
              <p className="text-xs text-steel">Custom Renovations. Visible craftsmanship. Built by {BRAND_MARK}.</p>
            </div>
          </a>
          <nav className="hidden items-center gap-6 text-sm text-steel sm:flex">
            <a href="#services">Services</a>
            <a href="/helix-services">Helix Services</a>
            <a href="#process">Process</a>
            <a href="/careers">Careers</a>
            <a href="#contact" className="rounded-full bg-redwood px-4 py-2 text-canvas shadow-glow transition hover:-translate-y-0.5">
              Request a consult
            </a>
          </nav>
        </header>

        <main id="top" className="flex flex-col gap-16 sm:gap-20">
          <section className="mt-16 grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-steel">VETERAN-OWNED GENERAL CONTRACTOR</p>
              <h1 className="font-display text-4xl font-semibold leading-tight text-canvas sm:text-5xl lg:text-6xl">
                Residential renovations, managed end to end.
              </h1>
              <p className="max-w-2xl text-lg text-steel">
                Delivering residential renovations through disciplined planning and finish-forward execution.
              </p>
              <div className="flex flex-wrap gap-3 text-sm text-steel">
                <span className="rounded-full border border-canvas/10 px-3 py-2">Renovations & remodels</span>
                <span className="rounded-full border border-canvas/10 px-3 py-2">Project planning & sequencing</span>
                <span className="rounded-full border border-canvas/10 px-3 py-2">Finish carpentry & millwork</span>
                <span className="rounded-full border border-canvas/10 px-3 py-2">Specialty details as needed</span>
                <span className="rounded-full border border-canvas/10 px-3 py-2">Preventive maintenance & repairs</span>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-full bg-redwood px-5 py-3 text-sm font-semibold text-canvas shadow-glow transition hover:-translate-y-0.5"
                >
                  Request a walkthrough
                </a>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-canvas/10 bg-canvas/5 p-6 shadow-card">
              <div className="absolute inset-0 bg-gradient-to-br from-canvas/5 via-redwood/10 to-transparent" aria-hidden />
              <div className="relative space-y-6">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-steel">Delivery snapshot</p>
                    <p className="font-display text-xl font-semibold text-canvas">{currentSnapshot.title}</p>
                    <p className="text-xs uppercase tracking-[0.18em] text-redwood">{currentSnapshot.tag}</p>
                  </div>
                </div>
                <p className="text-sm text-steel">{currentSnapshot.description}</p>
                <Divider />
                <div className="grid gap-4 sm:grid-cols-2">
                  {currentSnapshot.stats.map((item) => (
                    <div key={`${currentSnapshot.title}-${item.label}`} className="rounded-xl border border-canvas/10 bg-charcoal/60 p-4 shadow-glow/30">
                      <p className="text-2xl font-semibold text-canvas">
                        <span className="text-redwood">{item.value}</span>
                      </p>
                      <p className="mt-2 text-sm text-steel">{item.label}</p>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-2">
                  <div className="text-xs uppercase tracking-[0.18em] text-steel">
                    {snapshotIndex + 1} / {deliverySnapshots.length}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={showPrevSnapshot}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-canvas/10 bg-canvas/5 text-canvas transition hover:-translate-y-0.5"
                      aria-label="Previous snapshot"
                    >
                      ←
                    </button>
                    <button
                      type="button"
                      onClick={showNextSnapshot}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-canvas/10 bg-canvas/5 text-canvas transition hover:-translate-y-0.5"
                      aria-label="Next snapshot"
                    >
                      →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="services" className="space-y-8">
            <SectionHeading
              eyebrow="Offerings"
              title="Renovations led with discipline"
              copy="General contracting defined by clear sequencing, accountable budgets, and finish-driven delivery."
            />
            <div className="grid gap-6 md:grid-cols-3">
              {services.map((service) => (
                <article key={service.title} className="rounded-2xl border border-canvas/10 bg-canvas/5 p-6 shadow-card shadow-glow/40">
                  <h3 className="font-display text-lg font-semibold text-canvas">{service.title}</h3>
                  <p className="mt-3 text-sm text-steel">{service.copy}</p>
                  <a href={service.href} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-redwood">
                    <span>Explore</span>
                    <span aria-hidden>→</span>
                  </a>
                </article>
              ))}
            </div>
          </section>

          <section id="specialty-work" className="space-y-6 rounded-2xl border border-canvas/10 bg-canvas/5 p-6 shadow-card shadow-glow/30">
            <SectionHeading
              eyebrow="Specialty work"
              title="Advanced carpentry, integrated"
              copy="Specialty details are planned within the broader renovation so they align with architecture, finishes, and sequencing from the start."
            />
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-canvas/10 bg-charcoal/60 p-4 text-sm text-steel">
                <p className="font-semibold text-canvas">Capabilities</p>
                <ul className="mt-2 space-y-1">
                  <li>Concealed storage and integrated panels</li>
                  <li>Aligned transitions with flooring and trim</li>
                  <li>Built-ins tied to the existing architecture</li>
                </ul>
              </div>
              <div className="rounded-xl border border-canvas/10 bg-charcoal/60 p-4 text-sm text-steel">
                <p className="font-semibold text-canvas">How we deliver</p>
                <ul className="mt-2 space-y-1">
                  <li>Details approved before fabrication</li>
                  <li>Installed with site protection and dust control</li>
                  <li>Sequenced to support the overall schedule</li>
                </ul>
              </div>
            </div>
            <p className="text-sm text-steel">Integrated into the renovation. Never treated as a standalone feature.</p>
          </section>

          <section id="process" className="space-y-8">
            <SectionHeading
              eyebrow="Approach"
              title="A steady, intentional process"
              copy="Clean job sites, clear updates, and work that holds up every time you open the door."
            />
            <div className="grid gap-6 md:grid-cols-3">
              {steps.map((step) => (
                <article key={step.title} className="rounded-2xl border border-canvas/10 bg-canvas/5 p-5 shadow-card">
                  <div className="flex items-center justify-between text-sm text-steel">
                    <span className="text-xs font-semibold uppercase tracking-[0.2em]">{step.label}</span>
                    <span className="h-[1px] flex-1 bg-canvas/10" aria-hidden />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold text-canvas">{step.title}</h3>
                  <p className="mt-2 text-sm text-steel">{step.copy}</p>
                </article>
              ))}
            </div>
            <p className="text-sm text-steel">No rushed decisions. No loose ends.</p>
          </section>

          <section id="contact" className="rounded-3xl border border-canvas/10 bg-gradient-to-br from-canvas/5 via-redwood/10 to-charcoal p-8 shadow-glow sm:p-10">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-steel">Start a project</p>
                <h2 className="font-display text-3xl font-semibold text-canvas sm:text-4xl">Tell us about your space</h2>
                <p className="text-sm text-steel">
                  We reply within one business day. This form goes straight to the project lead at {BRAND_MARK}. Share scope, rough dimensions, timing, and any inspiration. We'll come back with next steps and a plan.
                </p>
                <ul className="grid gap-3 text-sm text-steel">
                  <li className="flex items-center gap-2">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-canvas/10 text-xs text-redwood">✓</span>
                    Renovations, remodels, and finish-driven improvements
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-canvas/10 text-xs text-redwood">✓</span>
                    Clear scope, clean sequencing, and steady updates
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-canvas/10 text-xs text-redwood">✓</span>
                    Veteran-owned. Detail-forward execution.
                  </li>
                </ul>
              </div>

              <form
                name="contact"
                method="POST"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                action="/"
                onSubmit={handleSubmit}
                className="space-y-4 rounded-2xl border border-canvas/10 bg-charcoal/80 p-6 shadow-card"
              >
                <input type="hidden" name="form-name" value="contact" />
                <input type="hidden" name="leadType" value={isServicesLead ? 'Helix Services' : 'Helix Craftworks'} />
                <p className="hidden">
                  <label>
                    Don't fill this out if you're human: <input name="bot-field" />
                  </label>
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="text-sm text-steel">
                    Name
                    <input
                      required
                      name="name"
                      className="mt-2 w-full rounded-lg border border-canvas/10 bg-canvas/5 px-3 py-2 text-canvas placeholder:text-steel/60 focus:border-redwood focus:outline-none"
                      placeholder="Alex Rivera"
                    />
                  </label>
                  <label className="text-sm text-steel">
                    Email
                    <input
                      required
                      type="email"
                      name="email"
                      className="mt-2 w-full rounded-lg border border-canvas/10 bg-canvas/5 px-3 py-2 text-canvas placeholder:text-steel/60 focus:border-redwood focus:outline-none"
                      placeholder="you@home.com"
                    />
                  </label>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="text-sm text-steel">
                    Project location (city/town)
                    <input
                      name="location"
                      className="mt-2 w-full rounded-lg border border-canvas/10 bg-canvas/5 px-3 py-2 text-canvas placeholder:text-steel/60 focus:border-redwood focus:outline-none"
                      placeholder="Philadelphia, PA"
                    />
                  </label>
                  <label className="text-sm text-steel">
                    When are you hoping to start?
                    <select
                      name="startTimeframe"
                      className="mt-2 w-full rounded-lg border border-canvas/10 bg-charcoal/80 px-3 py-2 text-canvas focus:border-redwood focus:outline-none"
                      defaultValue="ASAP / next 30 days"
                    >
                      <option>ASAP / next 30 days</option>
                      <option>1–3 months</option>
                      <option>3–6 months</option>
                      <option>6+ months</option>
                      <option>Not sure yet</option>
                    </select>
                  </label>
                </div>
                <label className="text-sm text-steel">
                  Project type
                  <select
                    name="projectType"
                    className="mt-2 w-full rounded-lg border border-canvas/10 bg-charcoal/80 px-3 py-2 text-canvas focus:border-redwood focus:outline-none"
                    value={projectType}
                    onChange={(event) => setProjectType(event.target.value)}
                  >
                    <option>{DEFAULT_PROJECT_TYPE}</option>
                    <option>Bathroom renovation</option>
                    <option>Basement / lower level</option>
                    <option>Whole-home / multi-room</option>
                    <option>Structural / framing work</option>
                    <option>Finish carpentry & built-ins</option>
                    <option>Repairs / phased upgrades</option>
                    <option>Preventive maintenance</option>
                    <option>Repairs / service visit</option>
                    <option>Specialty detail (concealed storage / hidden door)</option>
                    <option>Not sure yet (help me scope it)</option>
                  </select>
                </label>
                {isServicesLead ? (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="text-sm text-steel">
                      System / asset type
                      <select
                        name="assetType"
                        className="mt-2 w-full rounded-lg border border-canvas/10 bg-charcoal/80 px-3 py-2 text-canvas focus:border-redwood focus:outline-none"
                        defaultValue="HVAC"
                      >
                        <option>HVAC</option>
                        <option>Plumbing</option>
                        <option>Electrical</option>
                        <option>Envelope / moisture</option>
                        <option>Multi-trade</option>
                        <option>Other</option>
                      </select>
                    </label>
                    <label className="text-sm text-steel">
                      Recurrence
                      <select
                        name="recurrence"
                        className="mt-2 w-full rounded-lg border border-canvas/10 bg-charcoal/80 px-3 py-2 text-canvas focus:border-redwood focus:outline-none"
                        defaultValue="One-time service"
                      >
                        <option>One-time service</option>
                        <option>Seasonal (spring/fall)</option>
                        <option>Quarterly</option>
                        <option>Annual</option>
                        <option>Not sure yet</option>
                      </select>
                    </label>
                    <label className="text-sm text-steel">
                      Response tier
                      <select
                        name="responseTier"
                        className="mt-2 w-full rounded-lg border border-canvas/10 bg-charcoal/80 px-3 py-2 text-canvas focus:border-redwood focus:outline-none"
                        defaultValue="Standard next-day"
                      >
                        <option>Standard next-day</option>
                        <option>Same-day upgrade</option>
                        <option>Flex (schedule with project)</option>
                      </select>
                    </label>
                    <label className="text-sm text-steel">
                      Urgency
                      <select
                        name="urgency"
                        className="mt-2 w-full rounded-lg border border-canvas/10 bg-charcoal/80 px-3 py-2 text-canvas focus:border-redwood focus:outline-none"
                        defaultValue="Routine"
                      >
                        <option>Routine</option>
                        <option>Urgent (48 hours)</option>
                        <option>Outage / safety issue</option>
                      </select>
                    </label>
                    <label className="text-sm text-steel sm:col-span-2">
                      Access or site notes
                      <input
                        name="accessNotes"
                        className="mt-2 w-full rounded-lg border border-canvas/10 bg-canvas/5 px-3 py-2 text-canvas placeholder:text-steel/60 focus:border-redwood focus:outline-none"
                        placeholder="Site contact, access hours, lockbox, roof/ladder, parking."
                      />
                    </label>
                  </div>
                ) : null}
                <label className="text-sm text-steel">
                  Budget range
                  <select
                    name="budget"
                    className="mt-2 w-full rounded-lg border border-canvas/10 bg-charcoal/80 px-3 py-2 text-canvas focus:border-redwood focus:outline-none"
                    defaultValue="$10k–$25k"
                  >
                    <option>$10k–$25k</option>
                    <option>$25k–$50k</option>
                    <option>$50k–$100k</option>
                    <option>$100k+</option>
                    <option>Not sure yet</option>
                  </select>
                </label>
                <label className="text-sm text-steel">
                  Project context
                  <textarea
                    required
                    name="message"
                    rows={4}
                    className="mt-2 w-full rounded-lg border border-canvas/10 bg-canvas/5 px-3 py-2 text-canvas placeholder:text-steel/60 focus:border-redwood focus:outline-none"
                    placeholder="Rooms involved, what's changing, rough dimensions, desired start date, and any links/photos."
                  />
                </label>
                <button
                  type="submit"
                  disabled={status === 'sending' || status === 'success'}
                  className="w-full rounded-full bg-redwood px-5 py-3 text-sm font-semibold text-canvas shadow-glow transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  Request a walkthrough
                </button>
                {status === 'success' ? (
                  <output className="rounded-lg border border-redwood/30 bg-redwood/10 px-3 py-2 text-sm text-canvas" aria-live="polite">
                    Thanks for reaching out. We will reply within one business day.
                  </output>
                ) : null}
                {status === 'error' ? (
                  <div className="rounded-lg border border-redwood/40 bg-redwood/10 px-3 py-2 text-sm text-redwood" role="alert" aria-live="assertive">
                    {errorMessage || 'Something went wrong. Please try again.'}
                  </div>
                ) : null}
                <p className="text-xs text-steel">
                  By submitting, you agree to let us contact you about this request. We keep conversations confidential.
                </p>
              </form>
            </div>

            <div className="space-y-4">
              <article className="rounded-2xl border border-canvas/10 bg-canvas/5 p-5 shadow-card">
                <h3 className="font-display text-lg font-semibold text-canvas">Other inquiries</h3>
                <p className="mt-2 text-xs text-steel">Pennsylvania-based. Travel considered case-by-case.</p>
                <ul className="mt-3 space-y-2 text-sm text-steel">
                  <li>
                    <a href="/careers" className="text-redwood">Careers</a>
                  </li>
                  <li>
                    <a href="https://store.helixcraftworks.com" target="_blank" rel="noreferrer" className="text-redwood">Loom & Lathe</a>
                  </li>
                  <li>
                    <a href="mailto:chris@helixcraftworks.com" className="text-redwood">General email</a>
                  </li>
                </ul>
              </article>
              <article className="rounded-2xl border border-canvas/10 bg-charcoal/60 p-5 shadow-card">
                <h3 className="font-display text-lg font-semibold text-canvas">Helix Craftworks vs. Helix Services</h3>
                <p className="mt-2 text-xs text-steel">Project builds stay with Helix Craftworks. Preventive maintenance and repairs run through Helix Services.</p>
                <ul className="mt-3 space-y-2 text-sm text-steel">
                  <li className="flex gap-2"><span className="text-redwood">•</span><span>Helix Craftworks: renovations, remodels, sequencing, finish work.</span></li>
                  <li className="flex gap-2"><span className="text-redwood">•</span><span>Helix Services: preventive maintenance plans and service visits.</span></li>
                  <li className="flex gap-2"><span className="text-redwood">•</span><span>Same leadership, tailored workflows for each type of request.</span></li>
                </ul>
              </article>
            </div>
          </section>

          <section className="space-y-6">
            <SectionHeading eyebrow="FAQ" title="Answers in one place" copy="Quick notes on timelines, scope, and collaboration." />
            <div className="grid gap-4 md:grid-cols-3">
              {faqs.map((item) => (
                <article key={item.q} className="rounded-2xl border border-canvas/10 bg-canvas/5 p-5 shadow-card">
                  <h3 className="font-display text-base font-semibold text-canvas">{item.q}</h3>
                  <p className="mt-2 text-sm text-steel">{item.a}</p>
                </article>
              ))}
            </div>
          </section>
        </main>

        <footer className="mt-16 flex flex-col gap-4 border-t border-canvas/10 pt-6 text-sm text-steel sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-3 text-canvas">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-canvas/10 bg-canvas/5">
                <img src={HEADER_LOGO_SRC} alt={`${BRAND_MARK} logo`} className="h-6 w-6 object-contain" />
              </div>
              <span>{BRAND_MARK}</span>
            </div>
            <div className="flex flex-wrap gap-4 text-steel">
              <a href="#services">Services</a>
              <a href="/helix-services">Helix Services</a>
              <a href="#process">Process</a>
              <a href="/careers">Careers</a>
              <a href="#contact">Request a consult</a>
            </div>
          </div>
          <div className="flex flex-col items-start gap-1 sm:items-end">
            <div className="flex flex-col leading-tight text-right sm:text-right">
              <a href="https://store.helixcraftworks.com" target="_blank" rel="noreferrer" className="text-canvas">
                Loom & Lathe
              </a>
              <span className="text-xs text-steel">Apparel and small-batch goods from Helix Craftworks</span>
            </div>
            <div className="flex flex-wrap gap-4 text-steel">
              <a href="/terms">Terms</a>
              <a href="/privacy">Privacy</a>
              <span>© {year}</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
