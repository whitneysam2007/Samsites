/**
 * SAM WHITNEY — SPEAKER LANDING PAGE
 * Design: "Editorial Authority"
 * Palette: Charcoal (#1A1A1A), Gold (#F5C518), Off-white (#FAF8F4)
 * Fonts: Bebas Neue (display), Lora (body), DM Sans (UI)
 * Layout: Asymmetric editorial, alternating dark/light bands
 */

import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import { Menu, X, ChevronDown, Quote, Mic, Star, Mail, ArrowRight, Play } from "lucide-react";

// ── EMAILJS CONFIG ────────────────────────────────────────────────────────────
const EMAILJS_PUBLIC_KEY  = "JBiZ9XbX-Wd-twUS2";
const EMAILJS_SERVICE_ID  = "service_1p1anmn";
const EMAILJS_TEMPLATE_ID = "template_g56qwfo";

// ── CDN ASSETS ──────────────────────────────────────────────────────────────
const HERO_BG       = "https://d2xsxph8kpxj0f.cloudfront.net/310519663520822653/XzHygVphCqKdRzjxHXTGoD/hero-speaker-audience-7NCB7ymw3hYVurSxNJkTk3.webp";
const HEADSHOT      = "https://d2xsxph8kpxj0f.cloudfront.net/310519663520822653/XzHygVphCqKdRzjxHXTGoD/SamWhitneyArbingerHeadshots2024-3_a1b156c5.jpg";
const SPEAKING_1    = "https://d2xsxph8kpxj0f.cloudfront.net/310519663520822653/XzHygVphCqKdRzjxHXTGoD/IMG_2423.jpg_112ee0f6.jpeg";
const SPEAKING_2    = "https://d2xsxph8kpxj0f.cloudfront.net/310519663520822653/XzHygVphCqKdRzjxHXTGoD/IMG_2429.jpg_29748416.jpeg";
const BOOK_WITH_SAM = "https://d2xsxph8kpxj0f.cloudfront.net/310519663520822653/XzHygVphCqKdRzjxHXTGoD/PXL_20240829_021806055~3(2)_4d982a94.jpg";
const BOOK_COVER    = "https://d2xsxph8kpxj0f.cloudfront.net/310519663520822653/XzHygVphCqKdRzjxHXTGoD/HowtoDateAuthenticallyCoverV2.6_fccb5ad1.jpg";
const COUPLE_IMG    = "https://d2xsxph8kpxj0f.cloudfront.net/310519663520822653/XzHygVphCqKdRzjxHXTGoD/20230602_210022_57e8de33.jpg";
const SPEAKER_VIDEO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663520822653/XzHygVphCqKdRzjxHXTGoD/c7885ba3368e45c1b99b60e706bba856_582436d4.MP4";
const BOOK_LINK     = "https://amzn.to/4dXqEGD";

// ── DATA ─────────────────────────────────────────────────────────────────────
const talks = [
  {
    title: "End the Dating Game",
    subtitle: "Keynote",
    audience: "Singles Conferences · Universities · Young Adults",
    description:
      "Modern dating culture has turned connection into a performance. In this keynote, Sam dismantles the games, scripts, and strategies that keep singles stuck — and replaces them with a framework for radical authenticity. Audiences leave with a concrete shift in how they show up on every date.",
    duration: "45–60 min",
    tags: ["Keynote", "Singles"],
  },
  {
    title: "The Authenticity Framework",
    subtitle: "Workshop",
    audience: "Universities · Young Professional Groups",
    description:
      "A deep-dive workshop built on the principles of Sam's bestselling book. Participants work through the 3 pillars of authentic connection — self-knowledge, honest communication, and intentional pursuit — with guided exercises and real conversation.",
    duration: "90 min – Half Day",
    tags: ["Workshop", "Interactive"],
  },
  {
    title: "Dating with Faith & Purpose",
    subtitle: "Fireside / Devotional",
    audience: "Faith Communities · YSA · Christian Singles",
    description:
      "A faith-forward message for singles navigating the tension between modern dating culture and their faith values. Sam draws on gospel principles to help young adults date with clarity, confidence, and integrity — without losing themselves in the process.",
    duration: "30–45 min",
    tags: ["Faith-Forward", "Devotional"],
  },
];

const endorsements = [
  {
    name: "Stephen M.R. Covey",
    title: "NYT & WSJ #1 Bestselling Author, Speed of Trust",
    quote:
      "Sam Whitney is extraordinary, and his insights into this are both incredibly timely and beautifully on target. Just wonderful.",
    initial: "S",
  },
  {
    name: "Joseph Grenny",
    title: "Chairman, The Other Side Academy",
    quote:
      "Sam Whitney's book is a must read not just for dating but for life. He reframes what is often a painful exercise in mutual manipulation into a lifetime project of growth and true intimacy.",
    initial: "J",
  },
  {
    name: "Jacob Brown, Ph.D",
    title: "Postdoctoral Research Associate, NCPRE",
    quote:
      "These insights are powerful, practical, and poignant. For anyone looking for stories, insights, and strategies to overcome dating roadblocks and find authentic connection, look no further.",
    initial: "J",
  },
];

const budgetOptions = [
  "Under $1,000",
  "$1,000 – $2,500",
  "$2,500 – $5,000",
  "$5,000 – $10,000",
  "$10,000+",
  "Not sure yet",
];

// ── HOOKS ─────────────────────────────────────────────────────────────────────
function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.12 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, visible };
}

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, visible } = useScrollAnimation();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
    >
      {children}
    </div>
  );
}

function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const { ref, visible } = useScrollAnimation();
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const step = Math.ceil(target / (1500 / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [visible, target]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

// ── COMPONENT ─────────────────────────────────────────────────────────────────
export default function Home() {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "", email: "", org: "", event: "", budget: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");

  useEffect(() => {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when video modal open
  useEffect(() => {
    document.body.style.overflow = videoOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [videoOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setSendError("");
    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name:    formData.name,
        from_email:   formData.email,
        organization: formData.org,
        event_type:   formData.event,
        budget:       formData.budget,
        message:      formData.message,
        to_email:     "authenticdating24@gmail.com",
      });
      setSubmitted(true);
    } catch (err) {
      setSendError("Something went wrong. Please email authenticdating24@gmail.com directly.");
    } finally {
      setSending(false);
    }
  };

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Talks", href: "#talks" },
    { label: "Audiences", href: "#audiences" },
    { label: "Praise", href: "#praise" },
    { label: "Book Sam", href: "#booking" },
  ];

  return (
    <div className="min-h-screen" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* ── VIDEO MODAL ── */}
      {videoOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ backgroundColor: "rgba(0,0,0,0.92)" }}
          onClick={() => setVideoOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute -top-10 right-0 text-white/70 hover:text-white transition-colors"
              onClick={() => setVideoOpen(false)}
            >
              <X size={28} />
            </button>
            <video
              src={SPEAKER_VIDEO}
              controls
              autoPlay
              className="w-full shadow-2xl"
              style={{ maxHeight: "80vh" }}
            />
          </div>
        </div>
      )}

      {/* ── STICKY NAV ── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "py-3 shadow-xl" : "py-5"}`}
        style={{ backgroundColor: scrolled ? "#1A1A1A" : "transparent" }}
      >
        <div className="container flex items-center justify-between">
          <a href="#" className="flex items-center gap-3">
            <span className="text-2xl tracking-widest text-white" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              SAM WHITNEY
            </span>
            <span className="hidden sm:block text-xs tracking-widest uppercase" style={{ color: "#F5C518", fontFamily: "'DM Sans', sans-serif" }}>
              Speaker
            </span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.slice(0, -1).map((link) => (
              <a key={link.label} href={link.href}
                className="text-sm tracking-wider text-white/80 hover:text-white transition-colors uppercase"
                style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {link.label}
              </a>
            ))}
            <a href="#booking" className="btn-gold px-5 py-2 text-sm rounded-sm">Book Sam</a>
          </div>
          <button className="md:hidden text-white" onClick={() => setNavOpen(!navOpen)}>
            {navOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {navOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 shadow-xl" style={{ backgroundColor: "#1A1A1A" }}>
            <div className="container py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a key={link.label} href={link.href}
                  className="text-white/80 hover:text-white py-2 border-b border-white/10 uppercase tracking-wider text-sm"
                  onClick={() => setNavOpen(false)}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center" style={{ backgroundColor: "#1A1A1A" }}>
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${HERO_BG})`, opacity: 0.45 }} />
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(105deg, rgba(26,26,26,0.95) 45%, rgba(26,26,26,0.3) 100%)" }} />

        <div className="container relative z-10 pt-28 pb-20">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6 animate-fade-up">
              <div className="h-px w-10" style={{ backgroundColor: "#F5C518" }} />
              <span className="text-xs tracking-widest uppercase" style={{ color: "#F5C518", fontFamily: "'DM Sans', sans-serif" }}>
                Bestselling Author & Relationship Speaker
              </span>
            </div>
            <h1 className="text-7xl sm:text-8xl lg:text-9xl leading-none text-white mb-4 animate-fade-up-delay-1"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              Stop Playing<br />
              <span style={{ color: "#F5C518" }}>The Game.</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/75 max-w-xl mb-10 leading-relaxed animate-fade-up-delay-2"
              style={{ fontFamily: "'Lora', serif" }}>
              Sam Whitney helps singles break free from modern dating culture and build relationships grounded in authenticity.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-up-delay-3">
              <a href="#booking" className="btn-gold px-8 py-4 text-sm rounded-sm flex items-center gap-2">
                Book Sam to Speak <ArrowRight size={16} />
              </a>
              <button
                onClick={() => setVideoOpen(true)}
                className="px-8 py-4 text-sm rounded-sm border border-white/30 text-white hover:border-white/70 transition-colors flex items-center gap-2"
                style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                <Play size={16} /> Watch Sam Speak
              </button>
            </div>
          </div>
        </div>



        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <ChevronDown size={24} className="text-white/40" />
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section style={{ backgroundColor: "#F5C518" }}>
        <div className="container py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x divide-black/20">
            {[
              { value: 1000, suffix: "+", label: "Thousands of Singles Reached" },
              { value: 5, suffix: "", label: "Podcast Appearances" },
              { value: 3, suffix: "", label: "Core Talk Topics" },
              { value: 1, suffix: "", label: "Bestselling Book" },
            ].map((stat) => (
              <div key={stat.label} className="text-center px-4">
                <div className="text-4xl sm:text-5xl text-black" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                  <CountUp target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-xs uppercase tracking-widest text-black/70 mt-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-24" style={{ backgroundColor: "#FAF8F4" }}>
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image collage */}
            <AnimatedSection>
              <div className="relative">
                {/* Main speaking photo */}
                <img src={SPEAKING_1} alt="Sam Whitney speaking on stage"
                  className="w-full object-cover shadow-2xl"
                  style={{ maxHeight: "500px", objectFit: "cover", objectPosition: "center top" }} />

                {/* Gold accent block */}
                <div className="absolute -bottom-3 -left-3 w-24 h-24 z-0 hidden sm:block"
                  style={{ backgroundColor: "#F5C518", opacity: 0.25 }} />
              </div>
            </AnimatedSection>

            {/* Text */}
            <AnimatedSection>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px w-8" style={{ backgroundColor: "#F5C518" }} />
                  <span className="text-xs tracking-widest uppercase text-gray-500" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    About Sam
                  </span>
                </div>
                <h2 className="text-5xl sm:text-6xl text-gray-900 mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                  A Message That<br />
                  <span style={{ color: "#F5C518" }}>Actually Changes</span><br />
                  How People Date
                </h2>
                <div className="space-y-4 text-gray-700 leading-relaxed" style={{ fontFamily: "'Lora', serif" }}>
                  <p>
                    Sam Whitney is the author of <em>How to Date Authentically: End the Dating Game and Find Lasting Love</em> — read by thousands of singles who are done playing games.
                  </p>
                  <p>
                    As a dating and relationship coach, Sam has spoken to thousands, appeared on multiple nationally recognized podcasts, and has become a trusted voice for young adults navigating the complexity of modern dating.
                  </p>
                  <p>
                    His message is direct, practical, and grounded: the games don't work. Authenticity does.
                  </p>
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  {["Bestselling Author", "Relationship Coach", "LDS Member", "Bilingual (English/Spanish)"].map((tag) => (
                    <span key={tag}
                      className="px-3 py-1 text-xs border border-gray-300 text-gray-600 rounded-sm uppercase tracking-wider"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-8">
                  <button
                    onClick={() => setVideoOpen(true)}
                    className="inline-flex items-center gap-3 group"
                  >
                    <div className="w-12 h-12 rounded-full flex items-center justify-center transition-colors"
                      style={{ backgroundColor: "#F5C518" }}>
                      <Play size={18} className="text-black ml-0.5" />
                    </div>
                    <span className="text-sm uppercase tracking-wider text-gray-700 group-hover:text-gray-900 transition-colors"
                      style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>
                      Watch Sam Speak
                    </span>
                  </button>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── TALKS ── */}
      <section id="talks" className="py-24" style={{ backgroundColor: "#1A1A1A" }}>
        <div className="container">
          <AnimatedSection>
            <div className="mb-14">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8" style={{ backgroundColor: "#F5C518" }} />
                <span className="text-xs tracking-widest uppercase" style={{ color: "#F5C518", fontFamily: "'DM Sans', sans-serif" }}>
                  Speaking Topics
                </span>
              </div>
              <h2 className="text-5xl sm:text-6xl text-white" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                Three Talks.<br />One Transformative Message.
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {talks.map((talk) => (
              <AnimatedSection key={talk.title}>
                <div className="flex flex-col h-full overflow-hidden"
                  style={{
                    backgroundColor: "#2D2D2D",
                    borderLeft: "4px solid #F5C518",
                    padding: "2rem",
                  }}>
                  <div className="text-xs tracking-widest uppercase mb-3 flex-shrink-0"
                    style={{ color: "#F5C518", fontFamily: "'DM Sans', sans-serif" }}>
                    {talk.subtitle}
                  </div>
                  <h3 className="text-3xl text-white mb-2 flex-shrink-0" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                    {talk.title}
                  </h3>
                  <div className="text-xs text-gray-400 mb-4 uppercase tracking-wider flex-shrink-0"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {talk.audience}
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed flex-1"
                    style={{ fontFamily: "'Lora', serif" }}>
                    {talk.description}
                  </p>
                  <div className="mt-6 pt-4 border-t border-white/10 flex-shrink-0">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className="text-xs text-gray-400" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        ⏱ {talk.duration}
                      </span>
                      <div className="flex gap-2 flex-wrap">
                        {talk.tags.map((tag) => (
                          <span key={tag} className="text-xs px-2 py-0.5 rounded-sm whitespace-nowrap"
                            style={{ backgroundColor: "rgba(245,197,24,0.12)", color: "#F5C518", fontFamily: "'DM Sans', sans-serif" }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── AUDIENCES ── */}
      <section id="audiences" className="relative py-0 overflow-hidden" style={{ minHeight: "520px" }}>
        {/* Full-bleed background image */}
        <div className="absolute inset-0">
          <img src={COUPLE_IMG} alt="Couple finding lasting love"
            className="w-full h-full object-cover" style={{ objectPosition: "center 40%" }} />
          <div className="absolute inset-0"
            style={{ background: "linear-gradient(to right, rgba(26,26,26,0.92) 50%, rgba(26,26,26,0.55) 100%)" }} />
        </div>

        <div className="relative z-10 container py-24">
          <div className="max-w-2xl">
            <AnimatedSection>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8" style={{ backgroundColor: "#F5C518" }} />
                <span className="text-xs tracking-widest uppercase" style={{ color: "#F5C518", fontFamily: "'DM Sans', sans-serif" }}>
                  Who Sam Speaks To
                </span>
              </div>
              <h2 className="text-5xl sm:text-6xl text-white mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                For Anyone Committed to<br />
                <span style={{ color: "#F5C518" }}>Long-Term Love</span>
              </h2>
              <p className="text-white/80 text-lg leading-relaxed mb-8" style={{ fontFamily: "'Lora', serif" }}>
                Sam speaks to groups who believe that lasting love is worth pursuing with intention. Regardless of the audience, his message resonates with anyone who is serious about building real, lasting connection — not just swiping through options.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { icon: <Mic size={16} />, label: "Singles Conferences & Retreats" },
                  { icon: <Star size={16} />, label: "University & Campus Events" },
                  { icon: <Mic size={16} />, label: "Faith Communities & Firesides" },
                  { icon: <Star size={16} />, label: "Young Professional Groups" },
                  { icon: <Mic size={16} />, label: "Relationship & Wellness Summits" },
                  { icon: <Star size={16} />, label: "Podcasts & Media Appearances" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3 py-2">
                    <span style={{ color: "#F5C518" }}>{item.icon}</span>
                    <span className="text-white/85 text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <a href="#booking" className="btn-gold px-7 py-3 text-sm rounded-sm inline-flex items-center gap-2">
                  Inquire About Your Event <ArrowRight size={15} />
                </a>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── PRAISE / ENDORSEMENTS ── */}
      <section id="praise" className="py-24" style={{ backgroundColor: "#1A1A1A" }}>
        <div className="container">
          <AnimatedSection>
            <div className="mb-14">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8" style={{ backgroundColor: "#F5C518" }} />
                <span className="text-xs tracking-widest uppercase" style={{ color: "#F5C518", fontFamily: "'DM Sans', sans-serif" }}>
                  Praise
                </span>
              </div>
              <h2 className="text-5xl sm:text-6xl text-white" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                What Leaders Are Saying
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {endorsements.map((e) => (
              <AnimatedSection key={e.name}>
                <div className="p-8 flex flex-col h-full" style={{ backgroundColor: "#2D2D2D" }}>
                  <Quote size={32} style={{ color: "#F5C518", opacity: 0.6 }} className="mb-4 flex-shrink-0" />
                  <blockquote className="text-gray-200 leading-relaxed flex-1 text-base italic"
                    style={{ fontFamily: "'Lora', serif" }}>
                    "{e.quote}"
                  </blockquote>
                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-3 flex-shrink-0">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-black font-bold text-sm flex-shrink-0"
                      style={{ backgroundColor: "#F5C518", fontFamily: "'DM Sans', sans-serif" }}>
                      {e.initial}
                    </div>
                    <div>
                      <div className="text-white text-sm font-semibold" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        {e.name}
                      </div>
                      <div className="text-gray-400 text-xs mt-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        {e.title}
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOOK FEATURE BAND ── */}
      <section className="py-20" style={{ backgroundColor: "#F5C518" }}>
        <div className="container">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="flex-shrink-0">
              <img src={BOOK_COVER} alt="How to Date Authentically book cover"
                className="w-36 shadow-2xl"
                style={{ transform: "rotate(-2deg)" }} />
            </div>
            <div className="flex-1">
              <p className="text-xs uppercase tracking-widest text-black/60 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                The Book Behind the Message
              </p>
              <h2 className="text-4xl sm:text-5xl text-black mb-3" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                How to Date Authentically
              </h2>
              <p className="text-black/75 max-w-xl leading-relaxed" style={{ fontFamily: "'Lora', serif" }}>
                End the Dating Game and Find Lasting Love. The bestselling book that started the conversation — get your copy now.
              </p>
            </div>
            <div className="flex-shrink-0">
              <a href={BOOK_LINK} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3 text-sm font-semibold uppercase tracking-wider bg-black text-white hover:bg-gray-900 transition-colors rounded-sm"
                style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Get the Book <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── BOOKING FORM ── */}
      <section id="booking" className="py-24" style={{ backgroundColor: "#1A1A1A" }}>
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left — copy */}
            <AnimatedSection>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px w-8" style={{ backgroundColor: "#F5C518" }} />
                  <span className="text-xs tracking-widest uppercase" style={{ color: "#F5C518", fontFamily: "'DM Sans', sans-serif" }}>
                    Book Sam
                  </span>
                </div>
                <h2 className="text-5xl sm:text-6xl text-white mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                  Bring This Message<br />
                  <span style={{ color: "#F5C518" }}>To Your Event</span>
                </h2>
                <p className="text-gray-300 leading-relaxed mb-8" style={{ fontFamily: "'Lora', serif" }}>
                  Whether you're planning a large singles conference, a university event, a church fireside, or a professional gathering — Sam brings a message that is engaging, practical, and genuinely transformative.
                </p>
                {/* Headshot in contact section */}
                <div className="flex items-center gap-5 mb-8">
                  <img src={HEADSHOT} alt="Sam Whitney"
                    className="w-16 h-16 rounded-full object-cover object-top border-2 flex-shrink-0"
                    style={{ borderColor: "#F5C518" }} />
                  <div>
                    <div className="text-white font-semibold" style={{ fontFamily: "'DM Sans', sans-serif" }}>Sam Whitney</div>
                    <div className="text-gray-400 text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>Author · Speaker · Coach</div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-300">
                    <Mail size={18} style={{ color: "#F5C518" }} />
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem" }}>
                      sam@howtodateauthentically.com
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <Mic size={18} style={{ color: "#F5C518" }} />
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem" }}>
                      Available in English &amp; Spanish
                    </span>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Right — form */}
            <AnimatedSection>
              {submitted ? (
                <div className="p-10 text-center" style={{ backgroundColor: "#2D2D2D" }}>
                  <div className="text-5xl mb-4" style={{ color: "#F5C518", fontFamily: "'Bebas Neue', sans-serif" }}>
                    Thank You
                  </div>
                  <p className="text-gray-300" style={{ fontFamily: "'Lora', serif" }}>
                    Sam will be in touch within 2 business days to discuss your event.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-8 space-y-5" style={{ backgroundColor: "#2D2D2D" }}>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}>Your Name *</label>
                      <input required type="text" value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 text-sm text-white bg-transparent border border-white/20 focus:border-yellow-400 outline-none transition-colors"
                        style={{ fontFamily: "'DM Sans', sans-serif" }} placeholder="Jane Smith" />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}>Email *</label>
                      <input required type="email" value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 text-sm text-white bg-transparent border border-white/20 focus:border-yellow-400 outline-none transition-colors"
                        style={{ fontFamily: "'DM Sans', sans-serif" }} placeholder="jane@conference.org" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}>Organization / Conference Name *</label>
                    <input required type="text" value={formData.org}
                      onChange={(e) => setFormData({ ...formData, org: e.target.value })}
                      className="w-full px-4 py-3 text-sm text-white bg-transparent border border-white/20 focus:border-yellow-400 outline-none transition-colors"
                      style={{ fontFamily: "'DM Sans', sans-serif" }} placeholder="Heart of Dating Conference" />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}>Event Type & Date</label>
                    <input type="text" value={formData.event}
                      onChange={(e) => setFormData({ ...formData, event: e.target.value })}
                      className="w-full px-4 py-3 text-sm text-white bg-transparent border border-white/20 focus:border-yellow-400 outline-none transition-colors"
                      style={{ fontFamily: "'DM Sans', sans-serif" }} placeholder="Singles Conference — August 2026" />
                  </div>
                  {/* Speaking Budget field */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}>Speaking Budget</label>
                    <select value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-4 py-3 text-sm text-white bg-transparent border border-white/20 focus:border-yellow-400 outline-none transition-colors appearance-none"
                      style={{ fontFamily: "'DM Sans', sans-serif", backgroundColor: "#2D2D2D" }}>
                      <option value="" style={{ backgroundColor: "#2D2D2D" }}>Select a range...</option>
                      {budgetOptions.map((opt) => (
                        <option key={opt} value={opt} style={{ backgroundColor: "#2D2D2D" }}>{opt}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}>Tell Sam About Your Event</label>
                    <textarea rows={4} value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 text-sm text-white bg-transparent border border-white/20 focus:border-yellow-400 outline-none transition-colors resize-none"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                      placeholder="Audience size, theme, what you're hoping Sam will bring..." />
                  </div>
                  <button type="submit" disabled={sending} className="btn-gold w-full py-4 text-sm rounded-sm flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed">
                    {sending ? "Sending..." : <>{"Submit Booking Inquiry"} <ArrowRight size={16} /></>}
                  </button>
                  {sendError && (
                    <p className="text-red-400 text-sm mt-3 text-center" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      {sendError}
                    </p>
                  )}
                </form>
              )}
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-10 border-t border-white/10" style={{ backgroundColor: "#111111" }}>
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xl tracking-widest text-white" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            SAM WHITNEY
          </span>
          <p className="text-xs text-gray-500 text-center" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            © {new Date().getFullYear()} Sam Whitney. Author of <em>How to Date Authentically</em>.
          </p>
          <a href="https://whitneysam.wixsite.com/htda" target="_blank" rel="noopener noreferrer"
            className="text-xs uppercase tracking-wider hover:text-white transition-colors"
            style={{ color: "#F5C518", fontFamily: "'DM Sans', sans-serif" }}>
            Visit Main Site →
          </a>
        </div>
      </footer>
    </div>
  );
}
