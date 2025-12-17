import { useMemo, useState } from 'react';

const BRAND = 'Helix Craftworks';
const BRAND_MARK = `${BRAND}®`;
const BRAND_MARK_UPPER = `${BRAND.toUpperCase()}®`;
const HEADER_LOGO_SRC = '/favicon/android-chrome-192x192.png';

const services = [
  {
    title: 'Renovations & remodels',
    copy: 'Full-scope residential projects with planning, permits, and trades managed end to end.',
  },
  {
    title: 'General contracting',
    copy: 'Scheduling, sequencing, and coordination to keep scope, budget, and finish quality on track.',
  },
  {
    title: 'Finish carpentry & millwork',
    copy: 'Trim, paneling, built-ins, and specialty elements that close projects with tight fit and alignment.',
  },
];

const steps = [
  {
    label: '01',
    title: 'Discover',
    copy: 'We walk the space, review structure, and scope what is needed to build it right.',
  },
  {
    label: '02',
    title: 'Plan',
    copy: 'Sequence trades, lock materials, and finalize joinery and finishes before work starts.',
  },
  {
    label: '03',
    title: 'Build',
    copy: 'On-site execution with dust control, clean lines, and daily check-ins until handoff.',
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

export default function App() {
  const year = useMemo(() => new Date().getFullYear(), []);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [snapshotIndex, setSnapshotIndex] = useState(0);

  const currentSnapshot = deliverySnapshots[snapshotIndex];

  let submitLabel = 'Send message';
  if (status === 'sending') {
    submitLabel = 'Sending...';
  } else if (status === 'success') {
    submitLabel = 'Sent';
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

  return (
    <div className="min-h-screen bg-charcoal text-canvas">
      <div className="absolute inset-0 -z-10 bg-radial-spot" aria-hidden />
      <div className="absolute inset-0 -z-20 opacity-25 bg-grid-light bg-[length:140px_140px]" aria-hidden />
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 pb-16 pt-10 sm:px-10 sm:pt-14 lg:px-14">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-canvas/10 bg-canvas/5 shadow-glow">
              <img src={HEADER_LOGO_SRC} alt={`${BRAND_MARK} logo`} className="h-8 w-8 object-contain" />
            </div>
            <div>
              <p className="font-display text-sm font-semibold text-canvas">{BRAND_MARK_UPPER}</p>
              <p className="text-xs text-steel">Hidden doors. Visible craftsmanship. Built by {BRAND_MARK}.</p>
            </div>
          </div>
          <nav className="hidden items-center gap-6 text-sm text-steel sm:flex">
            <a href="#services">Services</a>
            <a href="#work">Work</a>
            <a href="#process">Process</a>
            <a href="#contact" className="rounded-full bg-redwood px-4 py-2 text-canvas shadow-card shadow-glow transition hover:-translate-y-0.5">
              Request a consult
            </a>
          </nav>
        </header>

        <main className="flex flex-col gap-16 sm:gap-20">
          <section className="mt-16 grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-steel">Precision is in our DNA</p>
              <h1 className="font-display text-4xl font-semibold leading-tight text-canvas sm:text-5xl lg:text-6xl">
                Residential renovations managed end to end.
              </h1>
                    <p className="max-w-2xl text-lg text-steel">
                      Veteran-owned general contractor delivering residential renovations with disciplined planning and finish-forward execution at {BRAND_MARK}.
                    </p>
              <div className="flex flex-wrap gap-3 text-sm text-steel">
                <span className="rounded-full border border-canvas/10 px-3 py-2">Renovations & remodels</span>
                <span className="rounded-full border border-canvas/10 px-3 py-2">Project planning & sequencing</span>
                <span className="rounded-full border border-canvas/10 px-3 py-2">Finish carpentry & millwork</span>
                <span className="rounded-full border border-canvas/10 px-3 py-2">Hidden doors as needed</span>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-full bg-redwood px-5 py-3 text-sm font-semibold text-canvas shadow-card shadow-glow transition hover:-translate-y-0.5"
                >
                  Request a walkthrough
                </a>
                <a href="#work" className="inline-flex items-center text-sm font-semibold text-canvas">
                  See recent builds →
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
                  <span className="rounded-full bg-canvas/10 px-3 py-1 text-xs text-canvas">Real homes, real installs</span>
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
                {currentSnapshot.note ? <p className="text-xs text-steel">{currentSnapshot.note}</p> : null}
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
              copy="General contracting with clear sequencing, accountable budgets, and finish-driven delivery."
            />
            <div className="grid gap-6 md:grid-cols-3">
              {services.map((service) => (
                <article key={service.title} className="rounded-2xl border border-canvas/10 bg-canvas/5 p-6 shadow-card shadow-glow/40">
                  <h3 className="font-display text-lg font-semibold text-canvas">{service.title}</h3>
                  <p className="mt-3 text-sm text-steel">{service.copy}</p>
                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-redwood">
                    <span>Explore</span>
                    <span aria-hidden>→</span>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section id="work" className="space-y-8">
            <SectionHeading
              eyebrow="Selected work"
              title="Renovations with finish fidelity"
              copy="Respecting the existing structure, aligning trims, and integrating specialty elements without calling attention to them."
            />
            <div className="grid gap-6 md:grid-cols-3">
              {projects.map((project) => (
                <article key={project.name} className="flex flex-col rounded-2xl border border-canvas/10 bg-canvas/5 p-6 shadow-card">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-display text-lg font-semibold text-canvas">{project.name}</h3>
                    <span className="rounded-full bg-redwood/20 px-3 py-1 text-xs font-semibold text-redwood">Case</span>
                  </div>
                  <p className="mt-3 text-sm text-steel">{project.summary} Delivered by {BRAND_MARK}.</p>
                  <div className="mt-auto pt-4 text-sm font-semibold text-redwood">View details →</div>
                </article>
              ))}
            </div>
          </section>

          <section id="process" className="space-y-8">
            <SectionHeading
              eyebrow="Approach"
              title="A steady, intentional process"
              copy="Clean job sites, clear updates, and work that feels solid every time you open the door."
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
          </section>

          <section id="contact" className="rounded-3xl border border-canvas/10 bg-gradient-to-br from-canvas/5 via-redwood/10 to-charcoal p-8 shadow-glow sm:p-10">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-steel">Start a project</p>
                <h2 className="font-display text-3xl font-semibold text-canvas sm:text-4xl">Tell us about your space</h2>
                <p className="text-sm text-steel">
                  We reply within one business day. This form routes straight to the shop at {BRAND_MARK}. Share scope, dimensions, timing, and any drawings - we will return with a plan.
                </p>
                <ul className="grid gap-3 text-sm text-steel">
                  <li className="flex items-center gap-2">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-canvas/10 text-xs text-redwood">✓</span>
                    Hidden doors, built-ins, trim, and custom millwork
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-canvas/10 text-xs text-redwood">✓</span>
                    Clean job sites with dust control and daily updates
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-canvas/10 text-xs text-redwood">✓</span>
                    Veteran-owned, detail-obsessed craftsmanship
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
                <label className="text-sm text-steel">
                  Project type
                  <select
                    name="projectType"
                    className="mt-2 w-full rounded-lg border border-canvas/10 bg-canvas/5 px-3 py-2 text-canvas focus:border-redwood focus:outline-none"
                    defaultValue="Renovation / remodel"
                  >
                    <option>Renovation / remodel</option>
                    <option>Kitchen / bath</option>
                    <option>Finish carpentry & millwork</option>
                    <option>Hidden door / specialty feature</option>
                    <option>Other</option>
                  </select>
                </label>
                <label className="text-sm text-steel">
                  Budget range
                  <select
                    name="budget"
                    className="mt-2 w-full rounded-lg border border-canvas/10 bg-canvas/5 px-3 py-2 text-canvas focus:border-redwood focus:outline-none"
                    defaultValue="$10k–$25k"
                  >
                    <option>$10k–$25k</option>
                    <option>$25k–$50k</option>
                    <option>$50k–$100k</option>
                    <option>$100k+</option>
                  </select>
                </label>
                <label className="text-sm text-steel">
                  Project context
                  <textarea
                    required
                    name="message"
                    rows={4}
                    className="mt-2 w-full rounded-lg border border-canvas/10 bg-canvas/5 px-3 py-2 text-canvas placeholder:text-steel/60 focus:border-redwood focus:outline-none"
                    placeholder="Room, dimensions, timing, links to inspiration"
                  />
                </label>
                <button
                  type="submit"
                  disabled={status === 'sending' || status === 'success'}
                  className="w-full rounded-full bg-redwood px-5 py-3 text-sm font-semibold text-canvas shadow-glow transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {submitLabel}
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
          <div className="flex items-center gap-2 text-canvas">
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-canvas/10 bg-canvas/5">
              <img src={HEADER_LOGO_SRC} alt={`${BRAND_MARK} logo`} className="h-6 w-6 object-contain" />
            </div>
            <span>{BRAND_MARK}</span>
          </div>
          <div className="flex flex-wrap gap-4">
            <a href="#services">Services</a>
            <a href="#contact">Contact</a>
            <span className="text-steel">© {year}</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
