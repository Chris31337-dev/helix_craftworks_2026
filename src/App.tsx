import { useMemo, useState } from 'react';

const services = [
  {
    title: 'Hidden doors & entries',
    copy: 'Bookcase doors, concealed passages, and secure reveals that look original to the home.',
  },
  {
    title: 'Built-ins & millwork',
    copy: 'Wall-to-wall cabinetry, mudrooms, mantels, and trim packages tailored to your footprint.',
  },
  {
    title: 'Renovations & finish carpentry',
    copy: 'Precision framing, paneling, and finish details that elevate everyday spaces.',
  },
];

const steps = [
  {
    label: '01',
    title: 'Discover',
    copy: 'We walk the space, note constraints, and map feasibility so the vision is buildable.',
  },
  {
    label: '02',
    title: 'Design',
    copy: 'Renderings, materials, and joinery decisions locked before a saw ever starts.',
  },
  {
    label: '03',
    title: 'Build',
    copy: 'On-site installs with dust control, clean lines, and daily check-ins until delivery.',
  },
];

const highlights = [
  { title: 'Precision is in our DNA', copy: 'Veteran-owned team blending engineering rigor with heritage carpentry.' },
  { title: 'Oak-scented sophistication', copy: 'Warm, confident tone with meticulous fits, reveals, and grain matching.' },
  { title: 'Protected investment', copy: 'Transparent scope, clear allowances, and craftsmanship built to last.' },
];

const faqs = [
  {
    q: 'Where do you work?',
    a: 'We serve Pennsylvania and nearby markets for specialty installs. Travel projects are considered case-by-case.',
  },
  {
    q: 'Do you design and build?',
    a: 'Yes. We handle concept through install, collaborating with your architect or designer when provided.',
  },
  {
    q: 'What makes a great first call?',
    a: 'Share goals, dimensions, inspiration photos, and timeline. We will bring options, samples, and a crisp plan.',
  },
];

const projects = [
  {
    name: 'Secret bookcase entry',
    summary: 'Counterweighted bookcase with hidden latch and soft-close swing, stained to match 1940s trim.',
  },
  {
    name: 'Tailored mudroom wall',
    summary: 'White-oak lockers with integrated lighting, brass hooks, and durable benches for a busy family of five.',
  },
  {
    name: 'Great room millwork',
    summary: 'Beam cladding, crown, and paneled columns that tie new cabinetry into the original architecture.',
  },
];

function Divider() {
  return <div className="h-px w-full bg-canvas/10" />;
}

function SectionHeading({ title, eyebrow, copy }: { title: string; eyebrow: string; copy?: string }) {
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

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('sending');
    setErrorMessage('');

    const form = event.currentTarget;
    const formData = new FormData(form);
    const body = new URLSearchParams();
    formData.forEach((value, key) => {
      body.append(key, value.toString());
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

  return (
    <div className="min-h-screen bg-charcoal text-canvas">
      <div className="absolute inset-0 -z-10 bg-radial-spot" aria-hidden />
      <div className="absolute inset-0 -z-20 opacity-25 bg-grid-light bg-[length:140px_140px]" aria-hidden />
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 pb-16 pt-10 sm:px-10 sm:pt-14 lg:px-14">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-canvas/10 bg-canvas/5 shadow-glow">
              <span className="font-display text-lg font-semibold text-canvas">H</span>
            </div>
            <div>
              <p className="font-display text-sm font-semibold text-canvas">Helix Craftworks</p>
              <p className="text-xs text-steel">Hidden doors. Visible craftsmanship.</p>
            </div>
          </div>
          <nav className="hidden items-center gap-6 text-sm text-steel sm:flex">
            <a href="#services">Services</a>
            <a href="#work">Work</a>
            <a href="#process">Process</a>
            <a href="#contact" className="rounded-full bg-redwood px-4 py-2 text-canvas shadow-card shadow-glow transition hover:-translate-y-0.5">
              Book a consult
            </a>
          </nav>
        </header>

        <main className="flex flex-col gap-16 sm:gap-20">
          <section className="mt-16 grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-steel">Precision is in our DNA</p>
              <h1 className="font-display text-4xl font-semibold leading-tight text-canvas sm:text-5xl lg:text-6xl">
                Custom carpentry that feels original to your home.
              </h1>
              <p className="max-w-2xl text-lg text-steel">
                Veteran-owned craftsmanship delivering secret doors, built-ins, and finish trim with oak-scented sophistication. We engineer the details so every reveal feels effortless.
              </p>
              <div className="flex flex-wrap gap-3 text-sm text-steel">
                <span className="rounded-full border border-canvas/10 px-3 py-2">Hidden bookcase doors</span>
                <span className="rounded-full border border-canvas/10 px-3 py-2">Wall-to-wall built-ins</span>
                <span className="rounded-full border border-canvas/10 px-3 py-2">Crown, beams, paneling</span>
                <span className="rounded-full border border-canvas/10 px-3 py-2">Trim + finish carpentry</span>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-full bg-redwood px-5 py-3 text-sm font-semibold text-canvas shadow-card shadow-glow transition hover:-translate-y-0.5"
                >
                  Schedule a walkthrough
                </a>
                <a href="#work" className="inline-flex items-center text-sm font-semibold text-canvas">
                  See recent builds →
                </a>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-canvas/10 bg-canvas/5 p-6 shadow-card">
              <div className="absolute inset-0 bg-gradient-to-br from-canvas/5 via-redwood/10 to-transparent" aria-hidden />
              <div className="relative space-y-6">
                <div className="flex items-baseline justify-between">
                  <p className="text-sm uppercase tracking-[0.2em] text-steel">Delivery snapshot</p>
                  <span className="rounded-full bg-canvas/10 px-3 py-1 text-xs text-canvas">Real homes, real installs</span>
                </div>
                <Divider />
                <div className="grid grid-cols-2 gap-6 text-canvas sm:grid-cols-3">
                  <div>
                    <p className="text-3xl font-semibold"><span className="text-redwood">48</span></p>
                    <p className="text-sm text-steel">Hidden doors & bookcase entries installed</p>
                  </div>
                  <div>
                    <p className="text-3xl font-semibold">2-4 wks</p>
                    <p className="text-sm text-steel">Typical concept-to-install timeline</p>
                  </div>
                  <div>
                    <p className="text-3xl font-semibold">5⭐</p>
                    <p className="text-sm text-steel">Homeowners who call us back for the next room</p>
                  </div>
                </div>
                <Divider />
                <div className="grid gap-3 text-sm text-steel">
                  {highlights.map((item) => (
                    <div key={item.title} className="flex items-start gap-3 rounded-xl bg-charcoal/60 p-3">
                      <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-redwood/20 text-xs font-semibold text-redwood">
                        ●
                      </span>
                      <div>
                        <p className="text-canvas">{item.title}</p>
                        <p className="text-steel">{item.copy}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section id="services" className="space-y-8">
            <SectionHeading
              eyebrow="Offerings"
              title="Built to fit. Engineered to last."
              copy="We pair precision joinery with a warm, confident tone - always aligned to your home, not a catalog."
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
              title="Craft that feels custom"
              copy="Every project respects the existing architecture - grain matched, trim aligned, and hardware chosen for the way you live."
            />
            <div className="grid gap-6 md:grid-cols-3">
              {projects.map((project) => (
                <article key={project.name} className="flex flex-col rounded-2xl border border-canvas/10 bg-canvas/5 p-6 shadow-card">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-display text-lg font-semibold text-canvas">{project.name}</h3>
                    <span className="rounded-full bg-redwood/20 px-3 py-1 text-xs font-semibold text-redwood">Case</span>
                  </div>
                  <p className="mt-3 text-sm text-steel">{project.summary}</p>
                  <div className="mt-auto pt-4 text-sm font-semibold text-redwood">View details →</div>
                </article>
              ))}
            </div>
          </section>

          <section id="process" className="space-y-8">
            <SectionHeading
              eyebrow="Approach"
              title="A steady, intentional process"
              copy="Clean job sites, clear updates, and craftsmanship you can feel when you open the door."
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
                  We reply within one business day. This Netlify-powered form routes straight to the shop. Share the room, dimensions, timing, and any inspiration - then we will bring the plan.
                </p>
                <ul className="grid gap-3 text-sm text-steel">
                  <li className="flex items-center gap-2">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-canvas/10 text-xs text-redwood">✓</span>
                    Hidden doors, built-ins, trim, and bespoke millwork
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
                    defaultValue="Hidden door"
                  >
                    <option>Hidden door</option>
                    <option>Built-ins / cabinetry</option>
                    <option>Trim & finish carpentry</option>
                    <option>Renovation support</option>
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
                  {status === 'sending' ? 'Sending...' : status === 'success' ? 'Sent' : 'Send message'}
                </button>
                {status === 'success' ? (
                  <div className="rounded-lg border border-redwood/30 bg-redwood/10 px-3 py-2 text-sm text-canvas" role="status" aria-live="polite">
                    Thanks for reaching out. We will reply within one business day.
                  </div>
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
              <span className="font-display text-sm font-semibold">H</span>
            </div>
            <span>Helix Craftworks</span>
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
