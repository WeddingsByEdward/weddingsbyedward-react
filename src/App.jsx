import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CONTACT, NAV, SERVICES, PORTFOLIO, FILTERS, STEPS, CEREMONIES, GUESTS } from "./content.js";

const img = (name) => `${import.meta.env.BASE_URL}images/${name}`;
const waLink = (text) => `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`;
const IG = `https://www.instagram.com/${CONTACT.instagram}/`;
const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Fades sections in as they scroll into view */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal:not(.in)");
    if (!("IntersectionObserver" in window)) { els.forEach((el) => el.classList.add("in")); return; }
    const io = new IntersectionObserver((entries) => entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
    }), { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  });
}

function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: reduceMotion() ? "auto" : "smooth", block: "start" });
  history.pushState(null, "", id === "home" ? location.pathname : `#${id}`);
  if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
  el.focus({ preventScroll: true });
}

function NewTab() { return <span className="sr-only"> (opens in a new tab)</span>; }

/* ============ NAVIGATION ============ */
function Nav({ menuOpen, setMenuOpen }) {
  const [solid, setSolid] = useState(false);
  const [current, setCurrent] = useState("home");
  const toggleRef = useRef(null);
  const firstLinkRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById("home");
      setSolid(window.scrollY > (hero?.offsetHeight ?? 600) - 100);
      const y = window.scrollY + window.innerHeight * 0.4;
      let cur = "home";
      NAV.forEach(({ id }) => { const s = document.getElementById(id); if (s && s.offsetTop <= y) cur = id; });
      setCurrent(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    if (menuOpen) firstLinkRef.current?.focus({ preventScroll: true });
    const onResize = () => { if (window.innerWidth > 860) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [menuOpen, setMenuOpen]);

  const go = (e, id) => { e.preventDefault(); setMenuOpen(false); scrollToId(id); };

  return (
    <header className={`nav${solid || menuOpen ? " solid" : ""}`} id="nav">
      <div className="wrap">
        <a href="#home" className="brand" aria-label="Weddings by Edward, back to top" onClick={(e) => go(e, "home")}>
          <img className="logo-reverse" src={img("logo-reverse.svg")} alt="" />
          <img className="logo-full" src={img("logo-full.svg")} alt="" aria-hidden="true" />
        </a>
        <button type="button" className="menu-toggle" ref={toggleRef} aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen} aria-controls="navLinks" onClick={() => setMenuOpen(!menuOpen)}>
          <span></span><span></span>
        </button>
        <nav aria-label="Main">
          <ul className={`nav-links${menuOpen ? " open" : ""}`} id="navLinks">
            {NAV.map(({ id, label }, i) => {
              const on = current === id && id !== "home";
              return (
                <li key={id}>
                  <a href={`#${id}`} ref={i === 0 ? firstLinkRef : undefined} className={on ? "active" : undefined}
                    aria-current={on ? "true" : undefined} onClick={(e) => go(e, id)}>{label}</a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}

/* ============ PAGE SECTIONS ============ */
/* Hero background: video, with the photo as a fallback (reduced motion, data saver, or video can't play) */
function HeroMedia() {
  const [useVideo, setUseVideo] = useState(false);
  const [src, setSrc] = useState("");
  useEffect(() => {
    const saveData = navigator.connection && navigator.connection.saveData;
    if (reduceMotion() || saveData) return;
    setSrc(`${import.meta.env.BASE_URL}videos/${window.innerWidth <= 900 ? "hero-mobile.mp4" : "hero.mp4"}`);
    setUseVideo(true);
  }, []);
  const alt = "Wedding stage with cascading crystal strands, a hanging floral ring, candles and a flower-lined walkway";
  if (!useVideo) return <img src={img("hero.jpg")} alt={alt} fetchpriority="high" />;
  return (
    <video className="hero-video" src={src} poster={img("hero-poster.jpg")} autoPlay muted loop playsInline
      preload="auto" aria-label={alt} onError={() => setUseVideo(false)} />
  );
}

function Hero() {
  return (
    <section className="hero" id="home">
      <HeroMedia />
      <div className="wrap">
        <span className="label">Wedding décor · Bengaluru</span>
        <h1>Your story. <em>Beautifully celebrated.</em></h1>
        <p>Mandaps, stages and florals for muhurthams, nikahs, church weddings and receptions, designed around you and your family.</p>
        <div className="hero-actions">
          <a href="#portfolio" className="btn btn-gold" onClick={(e) => { e.preventDefault(); scrollToId("portfolio"); }}>See Our Work</a>
          <a href="#contact" className="text-link" onClick={(e) => { e.preventDefault(); scrollToId("contact"); }}>Plan Your Wedding</a>
        </div>
      </div>
    </section>
  );
}

function Intro() {
  return (
    <section className="section intro">
      <div className="wrap reveal">
        <span className="accent">our promise</span>
        <p>Décor that feels warm, graceful and quietly premium. Never loud, never cluttered, always made with care.</p>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="section about" id="about">
      <div className="wrap">
        <div className="about-img reveal">
          <img src={img("about.jpg")} alt="Tall crystal candelabra centrepiece with red lilies and anthuriums on a velvet table runner" loading="lazy" />
        </div>
        <div className="reveal">
          <span className="accent">about us</span>
          <h2>Wedding décor, <em>made personal</em></h2>
          <p>Weddings by Edward designs wedding décor for Bengaluru couples and their families. Since 2018 we have set mandaps, stages and florals for muhurthams, nikahs, church weddings, roce ceremonies, engagements and receptions.</p>
          <p>We begin by listening. Your traditions, your venue and the feeling you want your guests to carry home guide every choice, from the frame of the stage to the last flower. We are honest about budgets, and we take care of the details so you can enjoy your day.</p>
          <p className="since">Designing weddings in Bengaluru since 2018.</p>
        </div>
      </div>
    </section>
  );
}

function Founder() {
  const [hasPhoto, setHasPhoto] = useState(true);
  return (
    <section className="section founder" id="founder">
      <div className="wrap">
        <div className="founder-photo reveal">
          <div className="placeholder" aria-hidden="true"><img src={img("monogram-wine.svg")} alt="" /><span>Founder photo</span></div>
          {hasPhoto && <img className="photo" src={img("founder.jpg")} alt="Edward Jenner, founder of Weddings by Edward" loading="lazy" onError={() => setHasPhoto(false)} />}
        </div>
        <div className="founder-text reveal">
          <span className="accent">meet the founder</span>
          <h2>Edward Jenner</h2>
          <span className="role">Founder · Visual designer</span>
          <p>Weddings by Edward was founded by Edward Jenner, a professional visual designer. That design training shapes every wedding we set: how colour, light and flowers work together, how a stage looks from the last row, and how it photographs from every angle.</p>
          <p>It means more creative setups and real attention to detail. Every mandap, stage and entrance is drawn up with care before a single flower is placed, so your décor feels considered, balanced and completely yours.</p>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="section services" id="services">
      <div className="wrap">
        <div className="head reveal">
          <div>
            <span className="accent">what we do</span>
            <h2>Every ceremony, <em>beautifully set</em></h2>
          </div>
          <p>Décor only, or décor with planning. Every setup is shaped around your guest list, your venue and your budget.</p>
        </div>
        <div className="services-grid">
          {SERVICES.map((s, i) => (
            <article className="service reveal" key={s.title}>
              <span className="num">{String(i + 1).padStart(2, "0")}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ PORTFOLIO + IMAGE VIEWER ============ */
function Lightbox({ items, index, setIndex, onClose }) {
  const closeRef = useRef(null);
  const boxRef = useRef(null);
  const item = items[index];
  const step = useCallback((d) => setIndex((i) => (i + d + items.length) % items.length), [items.length, setIndex]);

  useEffect(() => {
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    const page = [document.getElementById("nav"), document.getElementById("main"), document.querySelector(".footer")];
    page.forEach((el) => el && (el.inert = true));
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "Tab") {
        const f = [...boxRef.current.querySelectorAll("button")];
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; page.forEach((el) => el && (el.inert = false)); };
  }, [onClose, step]);

  // swipe on phones
  const startX = useRef(null);
  return createPortal(
    <div className="lightbox open" role="dialog" aria-modal="true" aria-labelledby="lightboxCaption" ref={boxRef}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      onTouchStart={(e) => { startX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => { if (startX.current === null) return; const dx = e.changedTouches[0].clientX - startX.current; if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1); startX.current = null; }}>
      <button type="button" className="lightbox-close" ref={closeRef} aria-label="Close image viewer" onClick={onClose}>&times;</button>
      {items.length > 1 && <button type="button" className="lightbox-arrow prev" aria-label="Previous photo" onClick={() => step(-1)}>‹</button>}
      <img key={item.src} className="lightbox-img" src={img(item.src)} alt={item.alt} />
      {items.length > 1 && <button type="button" className="lightbox-arrow next" aria-label="Next photo" onClick={() => step(1)}>›</button>}
      <p id="lightboxCaption">{item.title} <span className="count">{index + 1} / {items.length}</span></p>
    </div>,
    document.body
  );
}

function Portfolio() {
  const [filter, setFilter] = useState("all");
  const [open, setOpen] = useState(null);
  const lastFocus = useRef(null);
  const shown = PORTFOLIO.filter((p) => filter === "all" || p.category === filter);
  const tagFor = (cat) => FILTERS.find((f) => f.id === cat)?.tag;
  const statusName = { all: "", stages: "stage ", mandaps: "mandap ", entrances: "entrance and aisle " }[filter];

  const close = useCallback(() => { setOpen(null); lastFocus.current?.focus(); }, []);

  return (
    <section className="section" id="portfolio">
      <div className="wrap">
        <div className="head reveal">
          <div>
            <span className="accent">our work</span>
            <h2>Selected <em>weddings</em></h2>
          </div>
          <div className="filters" role="group" aria-label="Filter portfolio">
            {FILTERS.map((f) => (
              <button type="button" key={f.id} className={`filter-btn${filter === f.id ? " active" : ""}`}
                aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}>{f.label}</button>
            ))}
          </div>
          <p className="sr-only" aria-live="polite">Showing {shown.length} {statusName}{shown.length === 1 ? "photo" : "photos"}</p>
        </div>
        <div className="gallery" key={filter}>
          {shown.map((p, i) => (
            <figure className="work fade-in" key={p.src} style={{ animationDelay: `${Math.min(i, 8) * 50}ms` }}>
              <div className="img"><img src={img(p.src)} alt={p.alt} loading="lazy" /></div>
              <figcaption><span>{p.title}</span><small>{tagFor(p.category)}</small></figcaption>
              <button type="button" aria-label={`View larger: ${p.title}`} onClick={(e) => { lastFocus.current = e.currentTarget; setOpen(i); }}></button>
            </figure>
          ))}
        </div>
      </div>
      {open !== null && <Lightbox items={shown} index={open} setIndex={setOpen} onClose={close} />}
    </section>
  );
}

function Band() {
  return (
    <div className="band">
      <img src={img("band.jpg")} alt="" loading="lazy" />
      <p className="reveal">The flowers should frame the couple,<br /><em>never hide them.</em></p>
    </div>
  );
}

function Process() {
  return (
    <section className="section" id="process">
      <div className="wrap">
        <div className="head reveal">
          <div>
            <span className="accent">how we work</span>
            <h2>From first call <em>to your big day</em></h2>
          </div>
          <p>A calm, clear process that keeps you close to what matters and free from what doesn't.</p>
        </div>
        <div className="steps">
          {STEPS.map((s, i) => (
            <div className="step reveal" key={s.title}>
              <span className="num">{String(i + 1).padStart(2, "0")}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ WEDDING PLANNER (interactive enquiry → WhatsApp) ============ */
function Planner() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({ ceremonies: [], date: "", dateUnsure: false, venue: "", guests: "", name: "" });
  const headingRef = useRef(null);
  const set = (k, v) => setData((d) => ({ ...d, [k]: v }));
  const toggleCeremony = (c) => set("ceremonies", data.ceremonies.includes(c) ? data.ceremonies.filter((x) => x !== c) : [...data.ceremonies, c]);

  const pages = ["Your ceremony", "Date & venue", "Guests", "Your name"];
  const canNext = [data.ceremonies.length > 0, data.dateUnsure || data.date, !!data.guests, data.name.trim().length > 0][step];
  const fmtDate = data.dateUnsure ? "Not fixed yet" : new Date(data.date + "T00:00").toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

  const message = [
    `Hello Weddings by Edward, I'm ${data.name.trim()} and I'd like to enquire about our wedding.`,
    `Ceremony: ${data.ceremonies.join(", ")}`,
    `Date: ${data.date || data.dateUnsure ? fmtDate : ""}`,
    data.venue.trim() ? `Venue: ${data.venue.trim()}` : "Venue: Not decided yet",
    `Guests: ${data.guests}`,
  ].join("\n");

  useEffect(() => { if (step > 0) headingRef.current?.focus(); }, [step]);

  return (
    <div className="planner reveal" aria-labelledby="plannerTitle">
      <div className="planner-top">
        <h3 id="plannerTitle">Plan your wedding</h3>
        <ol className="planner-dots" aria-label={`Step ${Math.min(step + 1, 4)} of 4`}>
          {pages.map((p, i) => <li key={p} className={i < step ? "done" : i === step ? "now" : ""} aria-hidden="true"></li>)}
        </ol>
      </div>

      {step < 4 && <p className="planner-step" tabIndex={-1} ref={headingRef}>Step {step + 1} of 4 · {pages[step]}</p>}

      {step === 0 && (
        <fieldset>
          <legend>Which ceremonies are you planning? Choose all that apply.</legend>
          <div className="chips">
            {CEREMONIES.map((c) => (
              <button type="button" key={c} className={`chip${data.ceremonies.includes(c) ? " on" : ""}`} aria-pressed={data.ceremonies.includes(c)} onClick={() => toggleCeremony(c)}>{c}</button>
            ))}
          </div>
        </fieldset>
      )}

      {step === 1 && (
        <fieldset>
          <legend>When and where is the wedding?</legend>
          <label className="field"><span>Wedding date</span>
            <input type="date" value={data.date} disabled={data.dateUnsure} onChange={(e) => set("date", e.target.value)} />
          </label>
          <label className="check"><input type="checkbox" checked={data.dateUnsure} onChange={(e) => set("dateUnsure", e.target.checked)} /> Date not fixed yet</label>
          <label className="field"><span>Venue (optional)</span>
            <input type="text" value={data.venue} placeholder="e.g. hall name or area in Bengaluru" onChange={(e) => set("venue", e.target.value)} />
          </label>
        </fieldset>
      )}

      {step === 2 && (
        <fieldset>
          <legend>Roughly how many guests?</legend>
          <div className="chips">
            {GUESTS.map((g) => (
              <button type="button" key={g} className={`chip${data.guests === g ? " on" : ""}`} aria-pressed={data.guests === g} onClick={() => set("guests", g)}>{g}</button>
            ))}
          </div>
        </fieldset>
      )}

      {step === 3 && (
        <fieldset>
          <legend>Who should we reply to?</legend>
          <label className="field"><span>Your name</span>
            <input type="text" value={data.name} autoComplete="name" onChange={(e) => set("name", e.target.value)} />
          </label>
        </fieldset>
      )}

      {step === 4 && (
        <div className="planner-summary">
          <p className="planner-step" tabIndex={-1} ref={headingRef}>Your enquiry is ready</p>
          <dl>
            <div><dt>Ceremony</dt><dd>{data.ceremonies.join(", ")}</dd></div>
            <div><dt>Date</dt><dd>{fmtDate}</dd></div>
            <div><dt>Venue</dt><dd>{data.venue.trim() || "Not decided yet"}</dd></div>
            <div><dt>Guests</dt><dd>{data.guests}</dd></div>
          </dl>
          <p className="planner-note">This opens WhatsApp with your details filled in. Nothing is sent until you press send there.</p>
        </div>
      )}

      <div className="planner-actions">
        {step > 0 && <button type="button" className="text-link" onClick={() => setStep(step - 1)}>Back</button>}
        {step < 4
          ? <button type="button" className="btn" disabled={!canNext} onClick={() => setStep(step + 1)}>{step === 3 ? "Review" : "Next"}</button>
          : <a className="btn" href={waLink(message)} target="_blank" rel="noopener noreferrer">Open in WhatsApp<NewTab /></a>}
      </div>
    </div>
  );
}

function Contact() {
  return (
    <section className="section contact" id="contact">
      <div className="wrap">
        <div>
          <span className="accent reveal">say hello</span>
          <h2 className="reveal">Let's plan your <em>wedding</em></h2>
          <p className="lead reveal">Answer four quick questions and we'll get back to you to begin the conversation. Prefer to chat directly? Use the details below.</p>
          <dl className="details reveal">
            <div><dt>Phone / WhatsApp</dt><dd><a href={`tel:+${CONTACT.whatsapp}`}>{CONTACT.phone}</a></dd></div>
            <div><dt>Email</dt><dd><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></dd></div>
            <div><dt>Instagram</dt><dd><a href={IG} target="_blank" rel="noopener noreferrer">@{CONTACT.instagram}<NewTab /></a></dd></div>
            <div><dt>Based in</dt><dd>{CONTACT.location}</dd></div>
            <div><dt>Hours</dt><dd>{CONTACT.hours}</dd></div>
          </dl>
        </div>
        <Planner />
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <img className="footer-logo" src={img("logo-reverse.svg")} alt="Weddings by Edward" loading="lazy" />
        <p className="tagline">Your story. Beautifully celebrated.</p>
        <p className="place">Wedding décor &amp; planning · Bengaluru</p>
        <div className="socials">
          <a href={IG} target="_blank" rel="noopener noreferrer">Instagram<NewTab /></a>
          <a href={waLink("Hello Weddings by Edward, I'd like to enquire about our wedding.")} target="_blank" rel="noopener noreferrer">WhatsApp<NewTab /></a>
        </div>
        <small>© {new Date().getFullYear()} Weddings by Edward</small>
      </div>
    </footer>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  useReveal();

  useEffect(() => {
    const main = document.getElementById("main"), footer = document.querySelector(".footer");
    if (main) main.inert = menuOpen;
    if (footer) footer.inert = menuOpen;
    const onKey = (e) => {
      if (!menuOpen) return;
      if (e.key === "Escape") { setMenuOpen(false); document.querySelector(".menu-toggle")?.focus(); }
      if (e.key === "Tab") {
        const f = [...document.querySelectorAll("#nav a[href], #nav button")].filter((el) => el.offsetParent !== null);
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Nav menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Intro />
        <About />
        <Founder />
        <Services />
        <Portfolio />
        <Band />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
