import { type ReactNode, useEffect, useMemo } from 'react';
import headerLogo from '../../Assets/Asset 25@1.5x.webp';

const BRAND = 'Helix Craftworks';
const BRAND_MARK = `${BRAND}®`;
const BRAND_MARK_UPPER = `${BRAND.toUpperCase()}®`;
const HEADER_LOGO_SRC = headerLogo;

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
        <a href="/#contact" className="rounded-full bg-redwood px-4 py-2 text-canvas shadow-card transition hover:-translate-y-0.5">
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

function loadEcwid(): void {
  const initBrowser = () => {
    if (typeof window === 'undefined') return;

    const w = window as any;

    if (w.xProductBrowser) {
      w.xProductBrowser('categoriesPerRow=3', 'views=grid(20,3) list(60) table(60)', 'categoryView=grid', 'searchView=list', 'id=my-store-116136023');
    }

    if (w.xCategoriesV2) {
      w.xCategoriesV2('id=my-categories-116136023');
    }

    if (w.Ecwid?.init) {
      w.Ecwid.init();
    }
  };

  const scriptId = 'ecwid-script';
  const existing = document.getElementById(scriptId) as HTMLScriptElement | null;

  if (existing) {
    if (existing.dataset.loaded === 'true') {
      initBrowser();
    } else {
      existing.addEventListener('load', initBrowser, { once: true });
    }
    return;
  }

  const script = document.createElement('script');
  script.id = scriptId;
  script.type = 'text/javascript';
  script.src = 'https://app.ecwid.com/script.js?116136023&data_platform=code&data_date=2025-12-17';
  script.defer = true;
  script.async = true;
  script.setAttribute('data-cfasync', 'false');
  script.addEventListener('load', () => {
    script.dataset.loaded = 'true';
    initBrowser();
  });
  document.body.appendChild(script);
}

export default function StorePage() {
  const year = useMemo(() => new Date().getFullYear(), []);

  useEffect(() => {
    loadEcwid();
  }, []);

  return (
    <Shell>
      <Header />
      <main className="mt-16 flex flex-col gap-8 sm:gap-10">
        <section className="space-y-4 rounded-2xl border border-canvas/10 bg-canvas/5 p-6 shadow-card">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-steel">Store</p>
          <h1 className="font-display text-3xl font-semibold text-canvas sm:text-4xl">Loom & Lathe</h1>
          <p className="max-w-2xl text-sm text-steel">
            Apparel and small-batch goods from {BRAND_MARK}. Browse and purchase directly through the catalog below.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-[1.4fr_0.6fr]">
          <article className="rounded-2xl border border-canvas/10 bg-canvas/5 p-4 shadow-card">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-steel">Categories</p>
            <div id="my-categories-116136023" className="mt-3" />
          </article>
          <article className="rounded-2xl border border-canvas/10 bg-canvas/5 p-4 shadow-card">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-steel">Bag</p>
              <span className="text-xs text-steel">Updates as you browse</span>
            </div>
            <div className="mt-3 ec-cart-widget" />
          </article>
        </section>

        <section className="rounded-2xl border border-canvas/10 bg-canvas/5 p-4 shadow-card">
          <div id="my-store-116136023" />
          <div className="sr-only" aria-hidden>
            Ecwid store integration
          </div>
        </section>
      </main>
      <Footer year={year} />
    </Shell>
  );
}
