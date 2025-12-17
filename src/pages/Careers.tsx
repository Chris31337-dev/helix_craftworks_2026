import { type FormEvent, type ReactNode, useMemo, useState } from 'react';
import headerLogo from '../../Assets/Asset 25@1.5x.webp';

const BRAND = 'Helix Craftworks';
const BRAND_MARK = `${BRAND}®`;
const BRAND_MARK_UPPER = `${BRAND.toUpperCase()}®`;
const HEADER_LOGO_SRC = headerLogo;

type SubmitStatus = 'idle' | 'sending' | 'success' | 'error';

type Position = {
  title: string;
  summary: string;
  bullets: string[];
};

type ValueCard = {
  title: string;
  bullets: string[];
};

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

function Shell({ children }: Readonly<{ children: ReactNode }>) {
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
    <footer className="mt-16 flex flex-col gap-4 border-t border-canvas/10 pt-6 text-sm text-steel sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2 text-canvas">
        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-canvas/10 bg-canvas/5">
          <img src={HEADER_LOGO_SRC} alt={`${BRAND_MARK} logo`} className="h-6 w-6 object-contain" />
        </div>
        <span>{BRAND_MARK}</span>
      </div>
      <div className="flex flex-wrap gap-4">
        <a href="/#services">Services</a>
        <a href="/#contact">Contact</a>
        <a href="/terms">Terms</a>
        <a href="/privacy">Privacy</a>
        <div className="flex flex-col leading-tight">
          <a href="https://store.helixcraftworks.com" target="_blank" rel="noreferrer" className="text-canvas">
            Loom & Lathe
          </a>
          <span className="text-xs text-steel">Apparel and small-batch goods from Helix Craftworks</span>
        </div>
        <span className="text-steel">© {year}</span>
      </div>
    </footer>
  );
}

const valueCards: ValueCard[] = [
  {
    title: 'What we value',
    bullets: ['Respect for the trade, the client, and the home', 'Clear communication and follow-through', 'Attention to detail at every stage of the build', 'Clean job sites and steady progress'],
  },
  {
    title: 'What you can expect',
    bullets: ['Work planned and sequenced so the job runs cleanly', 'Standards that stay consistent from start to close-out', 'A team that takes pride in finish quality and professionalism', 'Room to grow through real responsibility, not chaos'],
  },
];

const positions: Position[] = [
  {
    title: 'Lead Craftsman / Project Manager',
    summary: 'Own jobsite execution and client communication. Drive schedule, sequencing, and finish quality from start to close-out.',
    bullets: ['Lead on-site work and coordinate trades', 'Maintain scope, schedule, and quality standards', 'Communicate daily/weekly updates to clients', 'Solve field issues with a calm, disciplined approach'],
  },
  {
    title: 'Finish-Forward Carpenter',
    summary: 'Skilled field carpenter focused on framing, trim, and renovation details that close cleanly.',
    bullets: ['Framing, trim, millwork installs, punch-list completion', 'Reads plans, checks dimensions, maintains alignment and fit', 'Works cleanly in occupied homes (dust control and protection)', 'Helps maintain jobsite order and daily resets'],
  },
  {
    title: 'Field Construction Technician I',
    summary: 'Entry-level role supporting renovation work, material handling, site protection, and daily jobsite flow.',
    bullets: ['Demo support, cleanup, material staging, basic tool use', 'Site protection (floors, paths, dust barriers) and daily reset', 'Learns processes, follows direction, shows up ready', 'Growth path into skilled carpentry over time'],
  },
];

export default function CareersPage() {
  const year = useMemo(() => new Date().getFullYear(), []);
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('sending');
    setErrorMessage('');

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('/', {
        method: 'POST',
        body: formData,
      });

      if (response.ok || (response.status >= 300 && response.status < 400)) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
        setErrorMessage(`Something went wrong. Status ${response.status}. Please try again or email careers@helixcraftworks.com.`);
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
      setErrorMessage('Network issue. Please try again.');
    }
  }

  return (
    <Shell>
      <Header />
      <main className="mt-16 flex flex-col gap-14 sm:gap-16">
        <section className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-steel">CAREERS</p>
            <h1 className="font-display text-3xl font-semibold leading-tight text-canvas sm:text-4xl lg:text-5xl">Build work you’re proud to put your name on.</h1>
            <p className="max-w-2xl text-sm text-steel sm:text-base">
              We’re a veteran-owned residential general contractor focused on disciplined planning, clean execution, and finish quality. If you care about doing things right, you’ll fit in here.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <a
                href="#apply"
                className="inline-flex items-center justify-center rounded-full bg-redwood px-5 py-3 text-sm font-semibold text-canvas shadow-glow transition hover:-translate-y-0.5"
              >
                Apply now
              </a>
              <p className="text-xs text-steel">Pennsylvania-based. Travel considered case-by-case.</p>
            </div>
          </div>
          <div className="rounded-2xl border border-canvas/10 bg-canvas/5 p-6 shadow-card shadow-glow/30">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.18em] text-steel">What makes a fit</p>
              <Divider />
              <ul className="space-y-2 text-sm text-steel">
                <li className="flex gap-2">
                  <span className="text-redwood">•</span>
                  <span>Comfortable sequencing work and keeping sites clean</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-redwood">•</span>
                  <span>Steady communication with clients and the team</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-redwood">•</span>
                  <span>Care for finish quality on every task</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <SectionHeading
            eyebrow="Why join"
            title="Why join Helix"
            copy="A calm, disciplined environment built for people who want to deliver consistent, finish-forward work."
          />
          <div className="grid gap-4 md:grid-cols-2">
            {valueCards.map((card) => (
              <article key={card.title} className="rounded-2xl border border-canvas/10 bg-canvas/5 p-6 shadow-card">
                <h3 className="font-display text-lg font-semibold text-canvas">{card.title}</h3>
                <ul className="mt-3 space-y-2 text-sm text-steel">
                  {card.bullets.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-redwood">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <p className="text-sm text-steel">We don’t rush work, and we don’t cut corners. We build methodically and expect the same from our team.</p>
        </section>

        <section className="space-y-6">
          <SectionHeading eyebrow="Open roles" title="Open positions" />
          <div className="space-y-4">
            {positions.map((role) => (
              <article key={role.title} className="rounded-2xl border border-canvas/10 bg-canvas/5 p-6 shadow-card">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="font-display text-xl font-semibold text-canvas">{role.title}</h3>
                  <p className="text-xs uppercase tracking-[0.18em] text-redwood">Finish-driven construction</p>
                </div>
                <p className="mt-3 text-sm text-steel">{role.summary}</p>
                <ul className="mt-4 space-y-2 text-sm text-steel">
                  {role.bullets.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-redwood">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <p className="text-sm text-steel">Experience matters. Attitude matters more.</p>
        </section>

        <section id="apply" className="rounded-3xl border border-canvas/10 bg-gradient-to-br from-canvas/5 via-redwood/10 to-charcoal p-8 shadow-glow sm:p-10">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-steel">Apply</p>
              <h2 className="font-display text-3xl font-semibold text-canvas sm:text-4xl">Apply to Helix Craftworks</h2>
              <p className="text-sm text-steel">Send the basics and a resume. We’ll reply if it’s a fit.</p>
              <p className="text-xs text-steel">Resume uploads: PDF preferred. Keep files under 8 MB.</p>
              <ul className="grid gap-3 text-sm text-steel">
                <li className="flex items-center gap-2">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-canvas/10 text-xs text-redwood">✓</span>
                  Roles from entry-level to lead, focused on finish-forward renovations
                </li>
                <li className="flex items-center gap-2">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-canvas/10 text-xs text-redwood">✓</span>
                  Calm, disciplined job sites with steady communication
                </li>
                <li className="flex items-center gap-2">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-canvas/10 text-xs text-redwood">✓</span>
                  Growth through responsibility and consistent standards
                </li>
              </ul>
            </div>

            <form
              name="careers-application"
              method="POST"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              encType="multipart/form-data"
              onSubmit={handleSubmit}
              className="space-y-4 rounded-2xl border border-canvas/10 bg-charcoal/80 p-6 shadow-card"
            >
              <input type="hidden" name="form-name" value="careers-application" />
              <p className="hidden">
                <label>
                  Don’t fill this out: <input name="bot-field" />
                </label>
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-sm text-steel">
                  Full name
                  <input
                    required
                    name="name"
                    className="mt-2 w-full rounded-lg border border-canvas/10 bg-canvas/5 px-3 py-2 text-canvas placeholder:text-steel/60 focus:border-redwood focus:outline-none"
                    placeholder="Jordan Ellis"
                  />
                </label>
                <label className="text-sm text-steel">
                  Email
                  <input
                    required
                    type="email"
                    name="email"
                    className="mt-2 w-full rounded-lg border border-canvas/10 bg-canvas/5 px-3 py-2 text-canvas placeholder:text-steel/60 focus:border-redwood focus:outline-none"
                    placeholder="you@helixcraftworks.com"
                  />
                </label>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-sm text-steel">
                  Phone
                  <input
                    required
                    type="tel"
                    name="phone"
                    className="mt-2 w-full rounded-lg border border-canvas/10 bg-canvas/5 px-3 py-2 text-canvas placeholder:text-steel/60 focus:border-redwood focus:outline-none"
                    placeholder="(555) 123-4567"
                  />
                </label>
                <label className="text-sm text-steel">
                  Position applying for
                  <select
                    name="position"
                    required
                    className="mt-2 w-full rounded-lg border border-canvas/10 bg-charcoal/80 px-3 py-2 text-canvas focus:border-redwood focus:outline-none"
                    defaultValue="Lead Craftsman / Project Manager"
                  >
                    <option>Lead Craftsman / Project Manager</option>
                    <option>Finish-Forward Carpenter</option>
                    <option>Field Construction Technician I</option>
                    <option>Other / Not sure yet</option>
                  </select>
                </label>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-sm text-steel">
                  Location
                  <input
                    required
                    name="location"
                    className="mt-2 w-full rounded-lg border border-canvas/10 bg-canvas/5 px-3 py-2 text-canvas placeholder:text-steel/60 focus:border-redwood focus:outline-none"
                    placeholder="City / Town"
                  />
                </label>
                <label className="text-sm text-steel">
                  Availability
                  <select
                    name="availability"
                    required
                    className="mt-2 w-full rounded-lg border border-canvas/10 bg-charcoal/80 px-3 py-2 text-canvas focus:border-redwood focus:outline-none"
                    defaultValue="Full-time"
                  >
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Contract / 1099</option>
                  </select>
                </label>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-sm text-steel">
                  Start timeframe
                  <select
                    name="startTimeframe"
                    required
                    className="mt-2 w-full rounded-lg border border-canvas/10 bg-charcoal/80 px-3 py-2 text-canvas focus:border-redwood focus:outline-none"
                    defaultValue="ASAP"
                  >
                    <option>ASAP</option>
                    <option>2–4 weeks</option>
                    <option>1–3 months</option>
                    <option>Not sure yet</option>
                  </select>
                </label>
                <label className="text-sm text-steel">
                  Experience level
                  <select
                    name="experience"
                    required
                    className="mt-2 w-full rounded-lg border border-canvas/10 bg-charcoal/80 px-3 py-2 text-canvas focus:border-redwood focus:outline-none"
                    defaultValue="Entry-level"
                  >
                    <option>Entry-level</option>
                    <option>1–3 years</option>
                    <option>3–7 years</option>
                    <option>7+ years</option>
                  </select>
                </label>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-sm text-steel">
                  Reliable transportation?
                  <select
                    name="transportation"
                    required
                    className="mt-2 w-full rounded-lg border border-canvas/10 bg-charcoal/80 px-3 py-2 text-canvas focus:border-redwood focus:outline-none"
                    defaultValue="Yes"
                  >
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                </label>
                <label className="text-sm text-steel">
                  Licensed driver?
                  <select
                    name="driver"
                    required
                    className="mt-2 w-full rounded-lg border border-canvas/10 bg-charcoal/80 px-3 py-2 text-canvas focus:border-redwood focus:outline-none"
                    defaultValue="Yes"
                  >
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                </label>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-semibold text-canvas">Primary skills</p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {["Demo", "Framing", "Drywall / finishing", "Trim / finish carpentry", "Cabinet / built-in install", "Tile / bath work", "Painting", "Light electrical", "Light plumbing"].map((skill) => (
                    <label key={skill} className="flex items-center gap-2 text-sm text-steel">
                      <input type="checkbox" name="skills" value={skill} className="h-4 w-4 rounded border-canvas/10 bg-canvas/5 text-redwood focus:ring-redwood" />
                      <span>{skill}</span>
                    </label>
                  ))}
                </div>
              </div>
              <label className="text-sm text-steel">
                Tools
                <select
                  name="tools"
                  className="mt-2 w-full rounded-lg border border-canvas/10 bg-charcoal/80 px-3 py-2 text-canvas focus:border-redwood focus:outline-none"
                  defaultValue="Basic hand tools"
                >
                  <option>Basic hand tools</option>
                  <option>Full carpentry kit</option>
                  <option>Not yet</option>
                </select>
              </label>
              <label className="text-sm text-steel">
                Tell us about your recent work and what you want to build next.
                <textarea
                  name="recentWork"
                  rows={4}
                  className="mt-2 w-full rounded-lg border border-canvas/10 bg-canvas/5 px-3 py-2 text-canvas placeholder:text-steel/60 focus:border-redwood focus:outline-none"
                  placeholder="Briefly describe recent projects, responsibilities, and the type of work you want to focus on."
                />
              </label>
              <label className="text-sm text-steel">
                Reference / portfolio link
                <input
                  type="url"
                  name="portfolio"
                  className="mt-2 w-full rounded-lg border border-canvas/10 bg-canvas/5 px-3 py-2 text-canvas placeholder:text-steel/60 focus:border-redwood focus:outline-none"
                  placeholder="https://..."
                />
              </label>
              <div className="space-y-2">
                <label className="text-sm text-steel">
                  Resume
                  <input
                    type="file"
                    name="resume"
                    accept=".pdf,.doc,.docx"
                    className="mt-2 block w-full text-sm text-steel file:mr-4 file:rounded-lg file:border-0 file:bg-redwood file:px-3 file:py-2 file:text-sm file:font-semibold file:text-canvas file:shadow-glow file:transition hover:file:-translate-y-0.5"
                  />
                </label>
                <p className="text-xs text-steel">PDF preferred. Max 8 MB.</p>
              </div>
              <button
                type="submit"
                disabled={status === 'sending' || status === 'success'}
                className="w-full rounded-full bg-redwood px-5 py-3 text-sm font-semibold text-canvas shadow-glow transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
              >
                Submit application
              </button>
              {status === 'success' ? (
                <output className="rounded-lg border border-redwood/30 bg-redwood/10 px-3 py-2 text-sm text-canvas" aria-live="polite">
                  Application received. If it’s a fit, we’ll reach out.
                </output>
              ) : null}
              {status === 'error' ? (
                <div className="rounded-lg border border-redwood/40 bg-redwood/10 px-3 py-2 text-sm text-redwood" role="alert" aria-live="assertive">
                  {errorMessage || 'Something went wrong. Please try again.'}
                </div>
              ) : null}
              <p className="text-xs text-steel">By submitting, you agree to let us contact you about this application. We keep conversations confidential.</p>
            </form>
          </div>
        </section>
      </main>
      <Footer year={year} />
    </Shell>
  );
}
