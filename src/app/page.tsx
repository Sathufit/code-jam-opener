"use client";

import { useEffect, useRef, useState } from "react";

const PORTAL_URL = "https://platform.codejam.one/login";
const CONTACT_EMAIL = "sesc.foc@sliit.lk";
const DELEGATES_GROUP_URL =
  "https://chat.whatsapp.com/Hx2WzWO85DCGXcV7DtYSWG?mode=gi_t";

const challenges = [
  {
    title: "Data Structures & Algorithms",
    description:
      "Solve focused DSA problems where correctness, computational efficiency, and passing hidden test cases all matter.",
  },
  {
    title: "Real-World Bug Fixing",
    description:
      "Investigate and repair broken codebases using technologies such as Node.js, Java, and JavaScript.",
  },
  {
    title: "Critical Thinking",
    description:
      "Understand unfamiliar problems, make sound decisions under pressure, and work with your team to move the mission forward.",
  },
];

const timeline = [
  {
    title: "Registrations Open",
    description: "Team registration opens on the Codejam portal.",
    date: "2 July 2026",
    dateKey: "2026-07-02",
    activeFrom: "2026-07-02T00:00:00+05:30",
    activeUntil: "2026-07-06T20:00:00+05:30",
  },
  {
    title: "Awareness Session & Demo Trial",
    description: "Platform walkthrough and practice environment access.",
    date: "6 July · 8:00–9:00 PM",
    dateKey: "2026-07-06",
    activeFrom: "2026-07-06T20:00:00+05:30",
    activeUntil: "2026-07-06T21:00:00+05:30",
  },
  {
    title: "Registrations Close",
    description: "No registrations will be accepted after this deadline.",
    date: "7 July · 11:00 PM",
    dateKey: "2026-07-07",
    activeFrom: "2026-07-06T21:00:00+05:30",
    activeUntil: "2026-07-07T23:00:00+05:30",
  },
  {
    title: "Round 1 — The Trials",
    description:
      "The online qualifier round on the Codejam competition platform.",
    date: "8 July · 8:30–10:30 PM",
    dateKey: "2026-07-08",
    activeFrom: "2026-07-07T23:00:00+05:30",
    activeUntil: "2026-07-08T22:30:00+05:30",
  },
  {
    title: "Finalist Announcement",
    description: "Qualified teams are added to the private final competition.",
    date: "9 July 2026",
    dateKey: "2026-07-09",
    activeFrom: "2026-07-08T22:30:00+05:30",
    activeUntil: "2026-07-10T00:00:00+05:30",
  },
  {
    title: "Final Round",
    description: "The on-premises immersive experience at SLIIT Malabe.",
    date: "12 July · 9:00 AM–3:00 PM",
    dateKey: "2026-07-12",
    activeFrom: "2026-07-10T00:00:00+05:30",
    activeUntil: "2026-07-12T15:00:00+05:30",
  },
];

const storyPanels = [
  {
    title: "The Chronos Experiment",
    text: "A red glowing portal appears on the edge of the Solar System, and a team of specialists sets on a voyage to explore this.",
    image: "/story-1.png",
  },
  {
    title: "The Signal Is Lost",
    text: "Moments after the crew crosses the portal, every signal disappears. The crew never returns.",
    image: "/story-2.png",
  },
  {
    title: "Your Mission Begins",
    text: "Professor Mikhail Volkov sends an emergency transmission. Specialist teams must recover the mission data, restore the systems, and uncover what happened to the crew.",
    image: "/story-3.png",
  },
];

function getSriLankaDateKey(now: number) {
  const dateParts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Colombo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date(now));

  const year = dateParts.find((part) => part.type === "year")?.value;
  const month = dateParts.find((part) => part.type === "month")?.value;
  const day = dateParts.find((part) => part.type === "day")?.value;

  return `${year}-${month}-${day}`;
}

function getActiveTimelineIndex(now: number) {
  const today = getSriLankaDateKey(now);
  const eventTodayIndex = timeline.findIndex(
    (event) => event.dateKey === today,
  );

  if (eventTodayIndex >= 0) return eventTodayIndex;

  const activeIndex = timeline.findIndex(
    (event) =>
      now >= new Date(event.activeFrom).getTime() &&
      now < new Date(event.activeUntil).getTime(),
  );

  if (activeIndex >= 0) return activeIndex;

  return timeline.findIndex(
    (event) => now < new Date(event.activeFrom).getTime(),
  );
}

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      radius: 1 + Math.random(),
    }));

    let animationFrame: number;

    const draw = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      for (const particle of particles) {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fillStyle = "rgba(255,42,42,0.12)";
        context.fill();
      }

      animationFrame = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-canvas" />;
}

function SectionHeading({ title }: { title: string }) {
  return (
    <div className="section-heading">
      <h2>{title}</h2>
    </div>
  );
}

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTimelineIndex, setActiveTimelineIndex] = useState(() =>
    getActiveTimelineIndex(Date.now()),
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveTimelineIndex(getActiveTimelineIndex(Date.now()));
    }, 60_000);

    return () => window.clearInterval(timer);
  }, []);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <div className="bg-atmosphere" />
      <ParticleCanvas />
      <div className="bg-pillars" />
      <div className="bg-scanlines" />

      <header className="site-header">
        <div className="site-container navbar">
          <a className="navbar-brand" href="#home" onClick={closeMobileMenu}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="Codejam" />
          </a>

          <button
            className={`menu-toggle${mobileMenuOpen ? " is-open" : ""}`}
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={mobileMenuOpen}
            aria-controls="main-navigation"
            onClick={() => setMobileMenuOpen((open) => !open)}>
            <span />
            <span />
            <span />
          </button>

          <nav
            id="main-navigation"
            className={`navbar-links${mobileMenuOpen ? " is-open" : ""}`}
            aria-label="Main navigation">
            <a href="#home" onClick={closeMobileMenu}>
              Home
            </a>
            <a href="#what" onClick={closeMobileMenu}>
              What
            </a>
            <a href="#when" onClick={closeMobileMenu}>
              When
            </a>
            <a href="#booklet" onClick={closeMobileMenu}>
              Booklet
            </a>
            <a href="#prizes" onClick={closeMobileMenu}>
              Prizes
            </a>
            <a
              className="navbar-register"
              href={PORTAL_URL}
              onClick={closeMobileMenu}>
              Register now
            </a>
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="hero" id="home">
          <div className="hero-inner">
            <h1 className="visually-hidden">
              Codejam 2026: Project Chronos — World&apos;s First Truly Immersive
              Hackathon by the Software Engineering Student Community of SLIIT
            </h1>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="hero-logo" src="/logo.png" alt="Codejam" />
            <p className="hero-tagline">World&apos;s First Truly Immersive</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="hero-title-art"
              src="/title text.png"
              alt=""
              aria-hidden="true"
            />
            <div className="action-row hero-actions">
              <a className="cta-btn" href={PORTAL_URL}>
                &gt;_ Register now
              </a>
              <a className="cta-btn cta-btn-secondary" href="#booklet">
                Download Delegate Booklet
              </a>
            </div>
          </div>
        </section>

        <section className="content-section" id="what">
          <div className="site-container two-column">
            <SectionHeading title="What is Codejam?" />
            <div className="prose">
              <p>
                Codejam: Project Chronos is a story-driven software engineering
                hackathon.
              </p>
              <p>
                Instead of solving random coding questions, teams will take part
                in a mission-themed experience where each challenge connects to
                the storyline. Participants will debug broken systems, solve
                problems, complete tasks, and progress through different stages
                of the mission.
              </p>
              <p className="prose-highlight">
                It is a hackathon built around coding, teamwork, pressure, and
                immersion.
              </p>
            </div>
          </div>
        </section>

        <section className="content-section story-section">
          <div className="site-container">
            <SectionHeading title="The Story" />
            <div className="story-blocks">
              {storyPanels.map((panel) => (
                <article className="story-block" key={panel.title}>
                  <div
                    className="story-block-image"
                    role="img"
                    aria-label={`${panel.title} comic panel`}
                    style={{
                      backgroundImage: `linear-gradient(rgba(5, 5, 5, 0.08), rgba(5, 5, 5, 0.08)), url("${panel.image}")`,
                    }}
                  />
                  <div className="story-block-copy">
                    <h3>{panel.title}</h3>
                    <p>{panel.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="content-section">
          <div className="site-container">
            <div className="challenge-intro">
              <SectionHeading title="What Your Team will be Doing" />
              <p>
                Teams will be tested across three core areas of software
                engineering:
              </p>
            </div>

            <ul className="challenge-grid">
              {challenges.map((challenge, index) => (
                <li key={challenge.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{challenge.title}</h3>
                  <p>{challenge.description}</p>
                </li>
              ))}
            </ul>

            <p className="section-summary">
              The focus is not only on writing code, but on solving the right
              problem with a clear, efficient, and collaborative approach.
            </p>
          </div>
        </section>

        <section className="content-section timeline-section" id="when">
          <div className="site-container">
            <SectionHeading title="Event Timeline" />
            <div className="timeline">
              {timeline.map((event, index) => (
                <article
                  className={`timeline-item${index === activeTimelineIndex ? " is-active" : ""}`}
                  key={event.title}>
                  <div className="timeline-marker">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div className="timeline-copy">
                    <span>{event.date}</span>
                    <h3>{event.title}</h3>
                    <p>{event.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="booklet-section" id="booklet">
          <div className="site-container booklet-hero-inner">
            <p className="booklet-label">Official event resource</p>
            <h2>Delegate Booklet</h2>
            <p className="booklet-description">
              Everything you need before the mission begins—event schedule,
              competition flow, platform instructions, scoring, rules, and
              final-round details.
            </p>
            <div className="action-row booklet-actions">
              <a
                className="cta-btn"
                href="/delegate-booklet"
                target="_blank"
                rel="noopener noreferrer">
                &gt;_ Download Booklet
              </a>
              <a
                className="cta-btn cta-btn-secondary"
                href={DELEGATES_GROUP_URL}
                target="_blank"
                rel="noopener noreferrer">
                Join Delegates Group ↗
              </a>
            </div>
          </div>
        </section>

        <section className="content-section" id="prizes">
          <div className="site-container rewards-grid">
            <div>
              <SectionHeading title="Prizes" />
              <div className="prose">
                <p>Exciting prizes await the top-performing teams.</p>
                <p>
                  The championship prize is confirmed. Runner-up prizes will be
                  announced soon.
                </p>
              </div>
            </div>
            <div className="prize-board">
              <article className="prize-card prize-card-winner">
                <p>Champions</p>
                <strong>
                  <span>LKR</span> 40,000
                </strong>
                <small>Main prize</small>
              </article>
              <div className="runner-up-prizes">
                <article className="prize-card">
                  <p>First Runner-Up</p>
                  <strong>TBA</strong>
                </article>
                <article className="prize-card">
                  <p>Second Runner-Up</p>
                  <strong>TBA</strong>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="content-section partners-section">
          <div className="site-container">
            <div className="partners-grid">
              <div>
                <SectionHeading title="Our Partners" />
                <div className="prose">
                  <p>Partner announcements coming soon.</p>
                  <p>
                    We are currently open to collaborations with organizations,
                    companies, and communities interested in supporting student
                    innovation and immersive tech experiences.
                  </p>
                  <p className="prose-highlight">
                    Interested in partnering with Codejam?
                    <br />
                    Get in touch with us.
                  </p>
                </div>
              </div>
              <div
                className="partner-placeholders"
                aria-label="Partner logo placeholders">
                <div className="image-frame" />
                <div className="image-frame" />
                <div className="image-frame" />
                <div className="image-frame" />
              </div>
            </div>
          </div>
        </section>

        <section className="final-call">
          <div className="site-container final-call-inner">
            <h2>The Chronos signal has been sent.</h2>
            <p>Now it needs a team capable of answering it.</p>
            <a className="cta-btn" href={PORTAL_URL}>
              &gt;_ Register for Codejam: Project Chronos
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="site-container footer-main">
          <div className="footer-brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="Codejam" />
            <p>
              Project: Chronos
              <br />
              World&apos;s First Truly Immersive Hackathon
            </p>
          </div>

          <div className="footer-contact">
            <p>Official contact</p>
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            <a
              href={DELEGATES_GROUP_URL}
              target="_blank"
              rel="noopener noreferrer">
              Join the Delegates WhatsApp Group ↗
            </a>
          </div>
        </div>

        <div className="site-container footer-bottom">
          <span>© 2026 Software Engineering Student Community of SLIIT</span>
          <span>
            Status: <strong>Recruiting</strong>
          </span>
        </div>
      </footer>
    </>
  );
}
