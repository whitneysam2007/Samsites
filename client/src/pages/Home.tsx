/*
Design philosophy: Editorial Corporate Modernism.
This page should feel like an executive strategy brief translated into an elegant landing page.
Use asymmetry, disciplined whitespace, light backgrounds, blue-to-violet accents, and restrained motion.
Avoid generic startup tropes, centered filler layouts, and playful visual language.
*/

import emailjs from "@emailjs/browser";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ArrowRight,
  CheckCircle2,
  Compass,
  GraduationCap,
  MessageSquareMore,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const assetBasePath = `${import.meta.env.BASE_URL}images/`;
const heroImage = `${assetBasePath}paiig-hero.jpg`;
const readinessImage = `${assetBasePath}paiig-approach.jpg`;
const consultationImage = `${assetBasePath}paiig-consultation.jpg`;
const founderImage = `${assetBasePath}sam-whitney-headshot.png`;
const logoImage = `${assetBasePath}paiig-mark.svg`;

const contactRecipient = "whitney.sam@gmail.com";
const emailjsServiceId = "service_x5ymj1c";
const consultationTemplateId = "template_exunaza";
const cycleAssessmentTemplateId = "template_exunaza";
const emailjsPublicKey = "JBiZ9XbX-Wd-twUS2";
const siteName = "Practical AI Implementation Group";

type ContactForm = {
  name: string;
  organization: string;
  email: string;
  interest: string;
  challenge: string;
};

type DurationUnit = "days" | "weeks" | "months";
type CycleStageKey = "ideation" | "build" | "testing" | "market";

type ProductCycleForm = {
  name: string;
  email: string;
  organization: string;
  role: string;
  productType: string;
  processDescription: string;
  primaryBottleneck: string;
  durations: Record<CycleStageKey, string>;
  durationUnits: Record<CycleStageKey, DurationUnit>;
};

type ProductCycleResult = {
  totalDays: number;
  stageDays: Record<CycleStageKey, number>;
  longestStage: CycleStageKey;
};

const durationUnits: Array<{ value: DurationUnit; label: string; days: number }> = [
  { value: "days", label: "days", days: 1 },
  { value: "weeks", label: "weeks", days: 7 },
  { value: "months", label: "months", days: 30 },
];

const cycleStages: Array<{
  key: CycleStageKey;
  number: string;
  title: string;
  description: string;
}> = [
  {
    key: "ideation",
    number: "01",
    title: "Idea to approved direction",
    description: "From the first signal or idea until the team has enough alignment to begin building.",
  },
  {
    key: "build",
    number: "02",
    title: "Build",
    description: "From an approved direction to a working product, prototype, or meaningful first release.",
  },
  {
    key: "testing",
    number: "03",
    title: "Test and iterate",
    description: "From the first usable version through customer or user feedback and the changes it creates.",
  },
  {
    key: "market",
    number: "04",
    title: "Ready for market",
    description: "From a tested product to launch, rollout, or availability for the people it is meant to serve.",
  },
];

const services = [
  {
    title: "Advisory",
    description:
      "We assess where your product process is breaking down — from ideation bottlenecks to slow testing cycles — and return a practical roadmap for AI-powered transformation. Discovery before anything else.",
    icon: Compass,
  },
  {
    title: "Training",
    description:
      "From AI basics to advanced no-code prototyping with Replit and AI agents — we run workshops where teams leave with working prototypes, process maps, and a new vision for what's possible. We also embed with teams end-to-end.",
    icon: GraduationCap,
  },
  {
    title: "Custom Tools",
    description:
      "We build and deploy custom tools that embed AI directly into your product workflow — from idea capture to prototype to deployment. You own the code, your data stays yours, and your competitive advantage is protected.",
    icon: Workflow,
  },
];

const operatingModel = [
  {
    label: "01",
    title: "Signal to idea",
    text: "We start by identifying the real product opportunity — the signal in the market, the unmet need, the friction point worth solving. Discovery before build.",
  },
  {
    label: "02",
    title: "Idea to prototype",
    text: "Using no-code tools like Replit and AI agents, teams move from concept to working prototype in days. We teach the process, facilitate the build, and leave teams with a new capability.",
  },
  {
    label: "03",
    title: "Prototype to deployed product",
    text: "We guide testing, iteration, and deployment so organizations don't just prototype — they ship. Faster cycles, better products, and a team that knows how to do it again.",
  },
];

const credibilityPoints = [
  "Executive-ready analysis and product process roadmaps.",
  "Human-centered transformation strategy, not tool hype.",
  "Partnership approach designed for product teams, L&D, and executive leadership.",
  "End-to-end capability: from discovery and training to custom-built deployed tools.",
];

const customTools = [
  {
    title: "Goal Tracking & Analysis",
    description: "Real-time performance dashboards with AI-powered insights. Track progress, surface blockers, and make data-driven decisions.",
  },
  {
    title: "Custom Survey Platform",
    description: "Replace expensive SaaS with a lean, custom platform built for your workflows. Capture feedback, analyze patterns, and act faster.",
  },
  {
    title: "Agent Harness",
    description: "Test, deploy, and monitor AI agents in production safely. Built for teams that need control, visibility, and reliability.",
  },
  {
    title: "Content Library with AI Translation",
    description: "Centralized knowledge base with AI-powered translation, cataloging, and discovery. Scale your content globally without the overhead.",
  },
  {
    title: "Idea Submission Platform",
    description: "Capture product ideas and improvements from your team. Organize, vote, and track progress — all in one place.",
  },
  {
    title: "Leadership Development Tracking",
    description: "Track growth, skills development, and progress toward leadership goals. Measure impact, identify development gaps, and support continuous improvement.",
  },
];

const aiTools = [
  {
    name: "Claude",
    company: "Anthropic",
    logo: `${assetBasePath}tools/claude.png`,
  },
  {
    name: "GitHub Copilot",
    company: "GitHub",
    logo: `${assetBasePath}tools/github.png`,
  },
  {
    name: "ChatGPT",
    company: "OpenAI",
    logo: `${assetBasePath}tools/openai.png`,
  },
  {
    name: "Perplexity",
    company: "Perplexity",
    logo: `${assetBasePath}tools/perplexity.png`,
  },
  {
    name: "Replit",
    company: "Replit",
    logo: `${assetBasePath}tools/replit.png`,
  },
  {
    name: "Manus",
    company: "Manus",
    logo: `${assetBasePath}tools/manus.png`,
  },
  {
    name: "Gemini",
    company: "Google",
    logo: `${assetBasePath}tools/gemini.png`,
  },
  {
    name: "NotebookLM",
    company: "Google",
    logo: `${assetBasePath}tools/notebooklm.png`,
  },
  {
    name: "Cursor",
    company: "Cursor",
    logo: `${assetBasePath}tools/cursor.png`,
  },
  {
    name: "Claude Cowork",
    company: "Anthropic",
    logo: `${assetBasePath}tools/claude.png`,
  },
];

const initialForm: ContactForm = {
  name: "",
  organization: "",
  email: "",
  interest: "Advisory",
  challenge: "",
};

const initialProductCycleForm: ProductCycleForm = {
  name: "",
  email: "",
  organization: "",
  role: "",
  productType: "",
  processDescription: "",
  primaryBottleneck: "",
  durations: {
    ideation: "",
    build: "",
    testing: "",
    market: "",
  },
  durationUnits: {
    ideation: "weeks",
    build: "weeks",
    testing: "weeks",
    market: "weeks",
  },
};

const getDurationDays = (value: string, unit: DurationUnit) => {
  const multiplier = durationUnits.find((option) => option.value === unit)?.days ?? 1;
  return Math.round(Number(value) * multiplier);
};

const formatDuration = (days: number) => {
  if (days >= 60) {
    const months = Math.round((days / 30) * 10) / 10;
    return `${months} ${months === 1 ? "month" : "months"}`;
  }

  if (days >= 14) {
    const weeks = Math.round((days / 7) * 10) / 10;
    return `${weeks} ${weeks === 1 ? "week" : "weeks"}`;
  }

  return `${days} ${days === 1 ? "day" : "days"}`;
};

const getProductCycleResult = (cycleForm: ProductCycleForm): ProductCycleResult => {
  const stageDays = Object.fromEntries(
    cycleStages.map((stage) => [stage.key, getDurationDays(cycleForm.durations[stage.key], cycleForm.durationUnits[stage.key])]),
  ) as Record<CycleStageKey, number>;
  const longestStage = cycleStages.reduce(
    (longest, stage) => (stageDays[stage.key] > stageDays[longest.key] ? stage : longest),
    cycleStages[0]!,
  ).key;

  return {
    totalDays: Object.values(stageDays).reduce((total, days) => total + days, 0),
    stageDays,
    longestStage,
  };
};

const getCycleSummaryMessage = (result: ProductCycleResult) => {
  const longestStage = cycleStages.find((stage) => stage.key === result.longestStage) ?? cycleStages[0]!;

  if (result.totalDays >= 180) {
    return `Your current estimate is more than six months from idea to market. ${longestStage.title} is the longest named stage, which gives us a useful place to begin the conversation.`;
  }

  if (result.totalDays >= 90) {
    return `Your current estimate is roughly a quarter or more from idea to market. ${longestStage.title} is the longest named stage, so it is a natural place to look for unnecessary handoffs and delay.`;
  }

  return `${longestStage.title} is the longest named stage in your current cycle. A focused review can uncover which steps genuinely need time and which can be simplified, combined, or tested earlier.`;
};

export default function Home() {
  const [form, setForm] = useState<ContactForm>(initialForm);
  const [requestSubmitted, setRequestSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cycleForm, setCycleForm] = useState<ProductCycleForm>(initialProductCycleForm);
  const [cycleStarted, setCycleStarted] = useState(false);
  const [cycleSubmitted, setCycleSubmitted] = useState(false);
  const [isCycleSubmitting, setIsCycleSubmitting] = useState(false);
  const [cycleResult, setCycleResult] = useState<ProductCycleResult | null>(null);
  const [showTerms, setShowTerms] = useState(false);

  useEffect(() => {
    emailjs.init(emailjsPublicKey);
  }, []);

  const handleSubmit = async () => {
    if (!form.name || !form.organization || !form.email || !form.challenge) {
      toast.error("Please complete the form before requesting a consultation.");
      return;
    }

    setIsSubmitting(true);

    try {
      await emailjs.send(
        emailjsServiceId,
        consultationTemplateId,
        {
          from_name: form.name,
          organization: form.organization,
          reply_to: form.email,
          interest: form.interest,
          message: form.challenge,
          to_email: contactRecipient,
          site_name: siteName,
        },
      );

      setRequestSubmitted(true);
      setForm(initialForm);
      toast.success("Your message has been sent! We'll get back to you within 48 hours.");
    } catch (error) {
      console.error("EmailJS submission failed", error);
      toast.error("We couldn't send your message just now. Please try again in a moment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearCycleResult = () => {
    setCycleSubmitted(false);
    setCycleResult(null);
  };

  const handleCycleStart = () => {
    if (!cycleForm.name || !cycleForm.organization || !cycleForm.email) {
      toast.error("Please enter your name, organization, and work email before mapping your product cycle.");
      return;
    }

    clearCycleResult();
    setCycleStarted(true);
    toast.success("Thanks. You can now map your product cycle.");
  };

  const handleCycleSubmit = async () => {
    if (!cycleStarted) {
      toast.error("Please submit your contact information first to unlock the assessment.");
      return;
    }

    const hasMissingDuration = cycleStages.some((stage) => {
      const value = Number(cycleForm.durations[stage.key]);
      return !Number.isFinite(value) || value <= 0;
    });

    if (
      !cycleForm.name ||
      !cycleForm.organization ||
      !cycleForm.email ||
      !cycleForm.processDescription ||
      hasMissingDuration
    ) {
      toast.error("Please describe your process and enter a time estimate for all four stages.");
      return;
    }

    setIsCycleSubmitting(true);
    const result = getProductCycleResult(cycleForm);
    const longestStage = cycleStages.find((stage) => stage.key === result.longestStage) ?? cycleStages[0]!;
    const message = [
      `Product Cycle Assessment for ${cycleForm.name}`,
      `Organization: ${cycleForm.organization}`,
      `Role: ${cycleForm.role || "Not provided"}`,
      `Product or initiative: ${cycleForm.productType || "Not provided"}`,
      `Reply to: ${cycleForm.email}`,
      "",
      "Current process:",
      cycleForm.processDescription,
      "",
      "Time by stage:",
      ...cycleStages.map(
        (stage) =>
          `${stage.number} — ${stage.title}: ${cycleForm.durations[stage.key]} ${cycleForm.durationUnits[stage.key]} (${formatDuration(result.stageDays[stage.key])})`,
      ),
      `Estimated end-to-end product cycle: ${formatDuration(result.totalDays)}`,
      `Longest named stage: ${longestStage.title} (${formatDuration(result.stageDays[longestStage.key])})`,
      "",
      `Primary bottleneck: ${cycleForm.primaryBottleneck || "Not specified"}`,
      `Assessment summary: ${getCycleSummaryMessage(result)}`,
    ].join("\n");

    setCycleResult(result);
    setCycleSubmitted(true);

    try {
      await emailjs.send(
        emailjsServiceId,
        cycleAssessmentTemplateId,
        {
          from_name: cycleForm.name,
          organization: cycleForm.organization,
          reply_to: cycleForm.email,
          interest: "Product Cycle Assessment",
          message,
          product_cycle_total: formatDuration(result.totalDays),
          longest_cycle_stage: longestStage.title,
          cycle_process: cycleForm.processDescription,
          primary_bottleneck: cycleForm.primaryBottleneck || "Not specified",
          submitted_at: new Date().toLocaleString("en-US", {
            dateStyle: "medium",
            timeStyle: "short",
          }),
          to_email: contactRecipient,
          site_name: siteName,
        },
      );

      toast.success("Your product-cycle assessment has been sent. Your summary is ready below.");
    } catch (error) {
      console.error("EmailJS product-cycle assessment submission failed", error);
      toast.error("Your summary is ready below, but we couldn't send the assessment just now. Please try again in a moment.");
    } finally {
      setIsCycleSubmitting(false);
    }
  };

  const prepareCycleReview = () => {
    if (!cycleResult) return;

    const stageSummary = cycleStages
      .map((stage) => `${stage.title}: ${formatDuration(cycleResult.stageDays[stage.key])}`)
      .join("\n");

    setForm({
      name: cycleForm.name,
      organization: cycleForm.organization,
      email: cycleForm.email,
      interest: "Advisory",
      challenge: [
        "I completed the Product Cycle Assessment.",
        `Estimated idea-to-market cycle: ${formatDuration(cycleResult.totalDays)}.`,
        "",
        "Stage breakdown:",
        stageSummary,
        "",
        `Current process: ${cycleForm.processDescription}`,
        `Primary bottleneck: ${cycleForm.primaryBottleneck || "Not specified"}`,
        "",
        "I would like to identify how we can simplify and speed up this process.",
      ].join("\n"),
    });
    setRequestSubmitted(false);
    requestAnimationFrame(() => document.getElementById("consultation")?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(90,165,255,0.13),transparent_32%),radial-gradient(circle_at_85%_10%,rgba(166,125,255,0.12),transparent_24%),linear-gradient(180deg,#ffffff_0%,#f7fbff_44%,#ffffff_100%)]" />
      <div className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-80 bg-[linear-gradient(90deg,rgba(255,255,255,0.98),rgba(223,243,255,0.82),rgba(174,204,255,0.24),rgba(176,160,255,0.18))] blur-2xl" />

      {/* ── Header ── */}
      <header className="sticky top-0 z-40 border-b border-white/60 bg-white/80 backdrop-blur-xl">
        <div className="container flex flex-col items-start gap-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <a href="#top" className="flex min-w-0 items-center gap-3 sm:w-auto">
            <img
              alt="Practical AI Implementation Group logo"
              className="h-11 w-auto shrink-0"
              src={logoImage}
            />
            <div className="min-w-0">
              <div className="font-display text-base font-semibold tracking-[-0.03em] text-slate-900 sm:text-lg">
                Practical AI Implementation Group
              </div>
              <div className="text-[9px] uppercase tracking-[0.22em] text-slate-500 sm:text-xs sm:tracking-[0.24em]">
                Advisory · Training · Tools
              </div>
            </div>
          </a>

          <nav className="hidden items-center gap-8 text-sm text-slate-600 lg:flex">
            <a className="transition-colors hover:text-slate-950" href="#services">
              Services
            </a>
            <a className="transition-colors hover:text-slate-950" href="#approach">
              Approach
            </a>
            <a className="transition-colors hover:text-slate-950" href="#who-we-are">
              Who We Are
            </a>
          </nav>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
            <Button
              asChild
              variant="outline"
              className="w-full rounded-full border-slate-300 bg-white px-5 text-center text-slate-700 hover:bg-slate-50 sm:w-auto"
            >
              <a href="#readiness-survey">Map your product cycle</a>
            </Button>
            <Button asChild className="w-full rounded-full bg-slate-950 px-5 text-center text-white hover:bg-slate-800 sm:w-auto">
              <a href="#consultation">Book a free 30-minute consultation</a>
            </Button>
          </div>
        </div>
      </header>

      <main id="top">
        {/* ── Hero ── */}
        <section className="relative overflow-hidden border-b border-slate-200/70">
          <div className="container grid gap-14 py-14 lg:grid-cols-[1.08fr_0.92fr] lg:items-end lg:py-24 xl:gap-20">
            <div className="relative z-10 max-w-2xl">
              <div className="inline-flex rounded-full border border-[#6f8cff]/30 bg-white/80 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.24em] text-[#5877ff] shadow-[0_10px_30px_rgba(115,147,255,0.10)] backdrop-blur">
                Product Development Transformation
              </div>

              <h1 className="mt-8 max-w-4xl font-display text-5xl font-semibold leading-[0.94] tracking-[-0.06em] text-slate-950 sm:text-6xl xl:text-7xl">
                Build faster. Ship smarter. Transform how your organization creates.
              </h1>

              <p className="mt-8 max-w-xl text-lg leading-8 text-slate-600 sm:text-xl">
                If your organization is ready to move from slow, consensus-driven product cycles to AI-powered prototyping and deployment, we teach the tools, the process, and the mindset to get there.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Button asChild className="rounded-full bg-slate-950 px-6 py-6 text-sm text-white hover:bg-slate-800">
                  <a href="#consultation">
                    Start the conversation
                    <ArrowRight className="ml-2 size-4" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full border-slate-300 bg-white px-6 py-6 text-sm text-slate-700 hover:bg-slate-50"
                >
                  <a href="#services">Explore services</a>
                </Button>
              </div>

              <div className="mt-12 grid gap-4 sm:grid-cols-3">
                {[
                  ["Advisory", "Assess where your product process is breaking down and get a clear roadmap."],
                  ["Training", "Learn to prototype, test, and ship with AI — teams leave with working products."],
                  ["Tools", "Custom-built tools that embed AI directly into your product workflow."],
                ].map(([title, text]) => (
                  <div
                    key={title}
                    className="rounded-[1.6rem] border border-slate-200 bg-white/82 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)] backdrop-blur"
                  >
                    <div className="text-sm font-semibold text-slate-900">{title}</div>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative lg:pl-8">
              <div className="absolute -left-8 top-12 hidden h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(103,165,255,0.18),transparent_70%)] blur-3xl lg:block" />
              <div className="absolute -right-10 bottom-8 hidden h-44 w-44 rounded-full bg-[radial-gradient(circle,rgba(162,126,255,0.18),transparent_70%)] blur-3xl lg:block" />
              <div className="hero-frame relative overflow-hidden rounded-[1.45rem]">
                <img
                  alt="Abstract consulting brand illustration"
                  className="h-[420px] w-full rounded-[1.45rem] object-cover object-center"
                  src={heroImage}
                />
                <div className="absolute inset-x-10 bottom-9 rounded-[1.35rem] border border-white/70 bg-white/84 p-6 backdrop-blur-xl shadow-[0_18px_40px_rgba(30,41,59,0.12)]">
                  <div className="text-xs uppercase tracking-[0.22em] text-slate-500">Operating principle</div>
                  <p className="mt-3 text-lg font-medium leading-7 text-slate-900">
                    The fastest organizations aren't the ones with the biggest teams. They're the ones who've learned to move from signal to shipped product in days — not months.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Services ── */}
        <section id="services" className="py-24">
          <div className="container">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
              <div>
                <div className="section-tag">Core services</div>
                <h2 className="mt-6 max-w-lg font-display text-4xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-5xl">
                  We help your organization transform how it builds, tests, and ships.
                </h2>
              </div>
              <p className="max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                Each engagement is designed to compress your product cycle, build team capability, and give leaders and product teams a practical path from idea to deployed product — faster than they thought possible.
              </p>
            </div>

            <div className="mt-14 grid gap-6 xl:grid-cols-3">
              {services.map((service, index) => {
                const Icon = service.icon;

                return (
                  <article
                    key={service.title}
                    className="service-card group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_24px_70px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_90px_rgba(88,119,255,0.14)]"
                  >
                    <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#7fd8ff_0%,#5d87ff_48%,#a57dff_100%)]" />
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex size-14 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(127,216,255,0.18),rgba(165,125,255,0.14))] text-slate-900">
                        <Icon className="size-6" />
                      </div>
                      <div className="text-sm text-slate-400">0{index + 1}</div>
                    </div>
                    <h3 className="mt-8 font-display text-2xl font-semibold tracking-[-0.04em] text-slate-950">
                      {service.title}
                    </h3>
                    <p className="mt-4 text-base leading-8 text-slate-600">
                      {service.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Product Development Transformation Infographic ── */}
        <section id="product-transformation" className="border-b border-slate-200/70 bg-[linear-gradient(180deg,#f0f6ff_0%,#ffffff_100%)] py-24">
          <div className="container">
            <div className="mb-14 max-w-2xl">
              <div className="section-tag">The transformation</div>
              <h2 className="mt-6 font-display text-4xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-5xl">
                From slow cycles to shipped products.
              </h2>
              <p className="mt-6 text-lg leading-8 text-slate-600">
                Most organizations are stuck in a product development model built for a different era. We teach a faster, AI-powered path from signal to shipped.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              {/* Traditional Path */}
              <div className="rounded-[2rem] border border-red-100 bg-white p-8 shadow-[0_16px_40px_rgba(15,23,42,0.05)]">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2">
                  <div className="size-2 rounded-full bg-red-400" />
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-red-600">Traditional approach</span>
                </div>
                <h3 className="font-display text-2xl font-semibold tracking-[-0.03em] text-slate-950">Slow. Expensive. Uncertain.</h3>
                <p className="mt-3 text-sm leading-7 text-slate-500">Months of planning, consensus-building, and development before anything is tested with real users.</p>
                <div className="mt-8 space-y-3">
                  {[
                    { step: "01", label: "Idea surfaces", detail: "Weeks of internal discussion and alignment" },
                    { step: "02", label: "Requirements phase", detail: "Months of documentation and stakeholder sign-off" },
                    { step: "03", label: "Development begins", detail: "Large dev team, high cost, long timeline" },
                    { step: "04", label: "Testing & feedback", detail: "Late-stage discovery of problems — expensive to fix" },
                    { step: "05", label: "Launch (eventually)", detail: "Market window may have closed. ROI uncertain." },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4 rounded-xl border border-red-100 bg-red-50/50 px-4 py-3">
                      <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-red-100 text-xs font-semibold text-red-500">{item.step}</div>
                      <div>
                        <div className="text-sm font-semibold text-slate-800">{item.label}</div>
                        <div className="text-xs leading-5 text-slate-500">{item.detail}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-center">
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-red-500">Typical cycle time</div>
                  <div className="mt-1 font-display text-2xl font-semibold text-red-700">6 – 18 months</div>
                </div>
              </div>

              {/* PAIIG Path */}
              <div className="rounded-[2rem] border border-blue-100 bg-white p-8 shadow-[0_16px_40px_rgba(88,119,255,0.10)]">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2">
                  <div className="size-2 rounded-full bg-blue-500" />
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">The PAIIG way</span>
                </div>
                <h3 className="font-display text-2xl font-semibold tracking-[-0.03em] text-slate-950">Fast. Focused. Deployed.</h3>
                <p className="mt-3 text-sm leading-7 text-slate-500">AI-powered prototyping gets real products in front of real users in days — not months.</p>
                <div className="mt-8 space-y-3">
                  {[
                    { step: "01", label: "Signal identified", detail: "Market signal, user need, or friction point surfaced" },
                    { step: "02", label: "Idea shaped", detail: "Rapid ideation with AI — concept defined in hours" },
                    { step: "03", label: "Prototype built", detail: "Working prototype via Replit + AI agents in days" },
                    { step: "04", label: "Tested with users", detail: "Real feedback before significant investment is made" },
                    { step: "05", label: "Developed & deployed", detail: "Ship with confidence. Team owns the process." },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4 rounded-xl border border-blue-100 bg-blue-50/50 px-4 py-3">
                      <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-600">{item.step}</div>
                      <div>
                        <div className="text-sm font-semibold text-slate-800">{item.label}</div>
                        <div className="text-xs leading-5 text-slate-500">{item.detail}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-center">
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-500">Typical cycle time</div>
                  <div className="mt-1 font-display text-2xl font-semibold text-blue-700">Days to weeks</div>
                </div>
              </div>
            </div>

            <div className="mt-10 rounded-[1.6rem] border border-slate-200 bg-slate-950 px-8 py-7 text-center">
              <p className="font-display text-xl font-semibold tracking-[-0.03em] text-white">
                The difference isn't resources. It's process, tools, and the confidence to move.
              </p>
              <div className="mt-5">
                <Button asChild className="rounded-full bg-white px-6 py-5 text-sm font-semibold text-slate-950 hover:bg-slate-100">
                  <a href="#consultation">Talk to us about transforming your product process</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ── What We Build ── */}
        <section id="what-we-build" className="border-b border-slate-200/70 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] py-24">
          <div className="container">
            <div className="mb-16 max-w-2xl">
              <div className="section-tag">What we build</div>
              <h2 className="mt-6 font-display text-4xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-5xl">
                Custom tools that turn AI ambition into measurable value.
              </h2>
              <p className="mt-6 text-lg leading-8 text-slate-600">
                We don't just design workflows — we build, deploy, and maintain production software. You own the code, your data stays yours, and your competitive advantage is protected. Below are examples of tools we have built and deployed. Partner with us to bring your vision to life.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {customTools.map((tool) => (
                <div
                  key={tool.title}
                  className="group rounded-[1.8rem] border border-slate-200 bg-white p-8 shadow-[0_16px_40px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(88,119,255,0.12)]"
                >
                  <div className="flex size-12 items-center justify-center rounded-xl bg-[linear-gradient(135deg,rgba(127,216,255,0.18),rgba(165,125,255,0.14))] text-slate-700">
                    <Sparkles className="size-5" />
                  </div>
                  <h3 className="mt-6 font-display text-xl font-semibold tracking-[-0.03em] text-slate-950">
                    {tool.title}
                  </h3>
                  <p className="mt-3 text-base leading-7 text-slate-600">
                    {tool.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Approach ── */}
        <section id="approach" className="relative overflow-hidden border-y border-slate-200/70 bg-slate-950 py-24 text-white">
          <div className="absolute inset-0 opacity-45">
            <img alt="Abstract readiness assessment illustration" className="h-full w-full object-cover" src={readinessImage} />
          </div>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,6,23,0.96)_0%,rgba(2,6,23,0.86)_44%,rgba(15,23,42,0.74)_100%)]" />
          <div className="container relative z-10">
            <div className="grid gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
              <div>
                <div className="section-tag-dark">How the work unfolds</div>
                <h2 className="mt-6 max-w-lg font-display text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">
                  The unique human centered approach that works
                </h2>
                <p className="mt-8 max-w-xl text-lg leading-8 text-slate-300">
                  Product development fails not because organizations lack ideas — it fails because the process between idea and deployment is too slow, too expensive, and too dependent on consensus. We teach organizations to compress that cycle using AI tools, no-code prototyping, and agent-assisted workflows. The result is a team that can move from signal to shipped in days.
                </p>
              </div>

              <div className="grid gap-5">
                {operatingModel.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[1.8rem] border border-white/12 bg-white/7 p-7 backdrop-blur-md transition-transform duration-300 hover:-translate-y-1"
                  >
                    <div className="flex items-start gap-5">
                      <div className="flex h-14 min-w-14 items-center justify-center rounded-full border border-[#9db6ff]/50 bg-[linear-gradient(135deg,rgba(127,216,255,0.18),rgba(165,125,255,0.18))] text-sm font-semibold tracking-[0.18em] text-white">
                        {item.label}
                      </div>
                      <div>
                        <h3 className="font-display text-2xl font-semibold tracking-[-0.03em] text-white">
                          {item.title}
                        </h3>
                        <p className="mt-3 max-w-2xl text-base leading-8 text-slate-300">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>


        {/* ── Product Cycle Assessment ── */}
        <section id="readiness-survey" className="relative overflow-hidden border-b border-slate-200/70 bg-[linear-gradient(180deg,#f7fbff_0%,#ffffff_100%)] py-24">
          <div className="container">
            <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
              <div className="lg:sticky lg:top-28">
                <div className="section-tag">Product cycle assessment</div>
                <h2 className="mt-6 max-w-xl font-display text-4xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-5xl">
                  See the real time cost of your product-development process.
                </h2>
                <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600">
                  Outline how a typical product moves through your organization, then estimate the time it takes to shape the idea, build, test, and reach the market. We will turn it into one clear cycle summary.
                </p>
              </div>

              <div className="rounded-[2.25rem] border border-slate-200 bg-white p-6 shadow-[0_30px_90px_rgba(15,23,42,0.08)] sm:p-8 lg:p-10">
                {!cycleStarted ? (
                  <>
                    <div className="rounded-[1.85rem] border border-slate-200 bg-slate-50/80 p-6">
                      <div className="text-xs uppercase tracking-[0.22em] text-slate-500">Step 1 · Contact details</div>
                      <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
                        Enter your contact information first. After you continue, the assessment will open here and your cycle summary will appear when it is complete.
                      </p>
                    </div>

                    <div className="mt-6 grid gap-5 sm:grid-cols-2">
                      <label className="space-y-2">
                        <span className="text-sm text-slate-600">Name</span>
                        <input
                          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-[#86beff] focus:ring-4 focus:ring-[#86beff]/20"
                          onChange={(event) => {
                            clearCycleResult();
                            setCycleForm((current) => ({ ...current, name: event.target.value }));
                          }}
                          placeholder="Your name"
                          value={cycleForm.name}
                        />
                      </label>
                      <label className="space-y-2">
                        <span className="text-sm text-slate-600">Work email</span>
                        <input
                          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-[#86beff] focus:ring-4 focus:ring-[#86beff]/20"
                          onChange={(event) => {
                            clearCycleResult();
                            setCycleForm((current) => ({ ...current, email: event.target.value }));
                          }}
                          placeholder="name@organization.com"
                          type="email"
                          value={cycleForm.email}
                        />
                      </label>
                      <label className="space-y-2 sm:col-span-2">
                        <span className="text-sm text-slate-600">Organization</span>
                        <input
                          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-[#86beff] focus:ring-4 focus:ring-[#86beff]/20"
                          onChange={(event) => {
                            clearCycleResult();
                            setCycleForm((current) => ({ ...current, organization: event.target.value }));
                          }}
                          placeholder="Company, school, division, or team"
                          value={cycleForm.organization}
                        />
                      </label>
                      <label className="space-y-2 sm:col-span-2">
                        <span className="text-sm text-slate-600">Your role <span className="text-slate-400">(optional)</span></span>
                        <input
                          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-[#86beff] focus:ring-4 focus:ring-[#86beff]/20"
                          onChange={(event) => {
                            clearCycleResult();
                            setCycleForm((current) => ({ ...current, role: event.target.value }));
                          }}
                          placeholder="Product leader, founder, operator, team lead, or another role"
                          value={cycleForm.role}
                        />
                      </label>
                    </div>

                    <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <p className="max-w-xl text-sm leading-7 text-slate-600">
                        This takes about three minutes. Your result is an estimate, not a diagnosis.
                      </p>
                      <Button className="rounded-full bg-slate-950 px-6 py-6 text-sm text-white hover:bg-slate-800" onClick={handleCycleStart} type="button">
                        Map my product cycle
                        <ArrowRight className="ml-2 size-4" />
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="rounded-[1.85rem] border border-[#dbe7ff] bg-[linear-gradient(135deg,rgba(239,246,255,0.9),rgba(245,243,255,0.9))] p-6">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <div className="text-xs uppercase tracking-[0.22em] text-slate-500">Step 2 · Map a typical product cycle</div>
                          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-700">
                            Start with a representative product, feature, or initiative for <span className="font-semibold text-slate-950">{cycleForm.organization}</span>. Estimate elapsed time, including waiting, approvals, and rework—not only hands-on work.
                          </p>
                        </div>
                        <button
                          className="text-sm font-medium text-slate-600 transition hover:text-slate-950"
                          onClick={() => {
                            setCycleStarted(false);
                            clearCycleResult();
                          }}
                          type="button"
                        >
                          Edit contact info
                        </button>
                      </div>
                    </div>

                    <label className="mt-8 block space-y-2">
                      <span className="text-sm text-slate-600">What kind of product, feature, or initiative are you thinking about? <span className="text-slate-400">(optional)</span></span>
                      <input
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-[#86beff] focus:ring-4 focus:ring-[#86beff]/20"
                        onChange={(event) => {
                          clearCycleResult();
                          setCycleForm((current) => ({ ...current, productType: event.target.value }));
                        }}
                        placeholder="A new offering, a customer-facing feature, an internal tool, or another initiative"
                        value={cycleForm.productType}
                      />
                    </label>

                    <label className="mt-8 block space-y-2">
                      <span className="text-sm text-slate-600">Outline your current product process <span className="text-red-500">*</span></span>
                      <textarea
                        className="min-h-40 w-full rounded-[1.6rem] border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-[#86beff] focus:ring-4 focus:ring-[#86beff]/20"
                        onChange={(event) => {
                          clearCycleResult();
                          setCycleForm((current) => ({ ...current, processDescription: event.target.value }));
                        }}
                        placeholder="Walk us through a typical path from an initial idea to market. Who is involved? Where are the approvals, handoffs, waiting periods, or rework loops?"
                        value={cycleForm.processDescription}
                      />
                    </label>

                    <div className="mt-8">
                      <div className="text-sm text-slate-600">Estimate elapsed time by stage <span className="text-red-500">*</span></div>
                      <p className="mt-2 text-sm leading-7 text-slate-500">Use the average for a typical product. Include the calendar time between steps, not just the hours people are actively working.</p>
                      <div className="mt-5 space-y-4">
                        {cycleStages.map((stage) => (
                          <div key={stage.key} className="rounded-[1.75rem] border border-slate-200 bg-slate-50/70 p-5 sm:p-6">
                            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                              <div className="max-w-xl">
                                <div className="text-xs uppercase tracking-[0.22em] text-slate-500">{stage.number} · Product cycle</div>
                                <div className="mt-2 font-display text-xl font-semibold tracking-[-0.03em] text-slate-950">{stage.title}</div>
                                <p className="mt-2 text-sm leading-6 text-slate-600">{stage.description}</p>
                              </div>
                              <div className="grid w-full grid-cols-[minmax(7rem,1fr)_8.5rem] gap-3 sm:w-80">
                                <label className="sr-only" htmlFor={`${stage.key}-duration`}>Estimated time for {stage.title}</label>
                                <input
                                  id={`${stage.key}-duration`}
                                  aria-label={`Estimated time for ${stage.title}`}
                                  autoComplete="off"
                                  className="min-w-0 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base font-medium text-slate-900 outline-none transition placeholder:font-normal placeholder:text-slate-400 focus:border-[#86beff] focus:ring-4 focus:ring-[#86beff]/20"
                                  inputMode="decimal"
                                  onChange={(event) => {
                                    clearCycleResult();
                                    setCycleForm((current) => ({
                                      ...current,
                                      durations: { ...current.durations, [stage.key]: event.target.value },
                                    }));
                                  }}
                                  placeholder="e.g. 3"
                                  type="text"
                                  value={cycleForm.durations[stage.key]}
                                />
                                <label className="sr-only" htmlFor={`${stage.key}-unit`}>Time unit for {stage.title}</label>
                                <select
                                  id={`${stage.key}-unit`}
                                  className="rounded-2xl border border-slate-200 bg-white px-3 py-3 text-slate-700 outline-none transition focus:border-[#86beff] focus:ring-4 focus:ring-[#86beff]/20"
                                  onChange={(event) => {
                                    clearCycleResult();
                                    setCycleForm((current) => ({
                                      ...current,
                                      durationUnits: { ...current.durationUnits, [stage.key]: event.target.value as DurationUnit },
                                    }));
                                  }}
                                  value={cycleForm.durationUnits[stage.key]}
                                >
                                  {durationUnits.map((unit) => <option key={unit.value} value={unit.value}>{unit.label}</option>)}
                                </select>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <label className="mt-8 block space-y-2">
                      <span className="text-sm text-slate-600">Where does time most often get lost? <span className="text-slate-400">(optional)</span></span>
                      <input
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-[#86beff] focus:ring-4 focus:ring-[#86beff]/20"
                        onChange={(event) => {
                          clearCycleResult();
                          setCycleForm((current) => ({ ...current, primaryBottleneck: event.target.value }));
                        }}
                        placeholder="Approvals, requirements, handoffs, technical build, customer access, launch coordination, or another constraint"
                        value={cycleForm.primaryBottleneck}
                      />
                    </label>

                    <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <p className="max-w-xl text-sm leading-7 text-slate-600">
                        You will see your estimated end-to-end cycle and stage-by-stage breakdown here. We will also receive the same summary so we can prepare for a useful conversation.
                      </p>
                      <Button
                        className="rounded-full bg-slate-950 px-6 py-6 text-sm text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
                        disabled={isCycleSubmitting}
                        onClick={handleCycleSubmit}
                        type="button"
                      >
                        {isCycleSubmitting ? "Calculating..." : "See my cycle summary"}
                        {!isCycleSubmitting && <ArrowRight className="ml-2 size-4" />}
                      </Button>
                    </div>

                    {cycleSubmitted && cycleResult && (
                      <div className="mt-6 rounded-[1.6rem] border border-emerald-200 bg-emerald-50 px-5 py-5 text-emerald-950">
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-700" />
                          <div>
                            <div className="text-sm font-semibold tracking-[0.01em]">Your product-cycle summary</div>
                            <p className="mt-2 text-sm leading-7 text-emerald-900/90">
                              Your current estimate is <span className="font-semibold">{formatDuration(cycleResult.totalDays)}</span> from idea to market.
                            </p>
                            <div className="mt-5 grid gap-3 sm:grid-cols-2">
                              {cycleStages.map((stage) => (
                                <div key={stage.key} className="rounded-2xl border border-emerald-200/80 bg-white/70 p-4">
                                  <div className="text-xs uppercase tracking-[0.18em] text-emerald-800/70">{stage.number}</div>
                                  <div className="mt-2 text-sm font-semibold text-emerald-950">{stage.title}</div>
                                  <div className="mt-1 text-lg font-semibold tracking-[-0.02em] text-emerald-900">{formatDuration(cycleResult.stageDays[stage.key])}</div>
                                </div>
                              ))}
                            </div>
                            <p className="mt-5 text-sm leading-7 text-emerald-900/90">{getCycleSummaryMessage(cycleResult)}</p>
                            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
                              <Button className="rounded-full bg-emerald-900 px-5 py-5 text-sm text-white hover:bg-emerald-800" onClick={prepareCycleReview} type="button">
                                Review my cycle with Sam
                                <ArrowRight className="ml-2 size-4" />
                              </Button>
                              <p className="text-sm leading-7 text-emerald-900/80">
                                This will add your cycle summary to the consultation form below, ready for you to review before sending.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ── AI Tools ── */}
        <section className="relative py-24">
          <div className="container">
            <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
              <div className="lg:sticky lg:top-28">
                <div className="section-tag">AI tools we love</div>
                <h2 className="mt-6 max-w-xl font-display text-4xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-5xl">
                  The tools we use and recommend when practical implementation matters.
                </h2>
                <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600">
                  We work across Claude, GitHub Copilot, ChatGPT, Perplexity, Replit, Manus, and a broader operating stack that helps teams research faster, write better, prototype quickly, and build useful habits around AI.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {aiTools.map((tool) => (
                  <div
                    key={tool.name}
                    className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.05)]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex size-12 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 shadow-inner shadow-white">
                        <img
                          alt={`${tool.company} logo`}
                          className="size-8 rounded-lg"
                          loading="lazy"
                          referrerPolicy="no-referrer"
                          src={tool.logo}
                        />
                      </div>
                      <div>
                        <div className="text-base font-semibold text-slate-950">{tool.name}</div>
                        <div className="text-xs uppercase tracking-[0.18em] text-slate-500">{tool.company}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Consultation CTA ── */}
        <section id="consultation" className="relative overflow-hidden py-24">
          <div className="container">
            <div className="relative overflow-hidden rounded-[2.25rem] border border-slate-200 bg-slate-950 shadow-[0_35px_100px_rgba(15,23,42,0.20)]">
              <div className="absolute inset-0 opacity-30">
                <img alt="Abstract consultation environment" className="h-full w-full object-cover" src={consultationImage} />
              </div>
              <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(2,6,23,0.95)_0%,rgba(15,23,42,0.84)_45%,rgba(24,24,27,0.76)_100%)]" />

              <div className="relative z-10 grid gap-10 p-8 sm:p-10 lg:grid-cols-[0.86fr_1.14fr] lg:p-14">
                <div>
                  <div className="section-tag-dark">Free 30-minute consultation</div>
                  <h2 className="mt-6 max-w-lg font-display text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">
                    Start with a focused conversation about where AI can help your organization most.
                  </h2>
                  <p className="mt-7 max-w-xl text-lg leading-8 text-slate-300">
                    This initial conversation is designed to clarify your current situation, discuss readiness and rollout priorities, and identify the most practical next step for your organization.
                  </p>
                  <div className="mt-10 rounded-[1.6rem] border border-white/10 bg-white/6 p-6 backdrop-blur">
                    <div className="text-sm font-medium uppercase tracking-[0.18em] text-slate-400">
                      What we can cover
                    </div>
                    <div className="mt-5 space-y-4 text-sm leading-7 text-slate-200">
                      <p>We can discuss organizational readiness, training priorities, rollout friction, or a custom workflow opportunity that needs clearer definition.</p>
                      <p>If it is helpful, we can also outline which next step would create the clearest early value, whether that is an assessment, an enablement program, or a bespoke engagement.</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-[2rem] border border-white/12 bg-white/10 p-6 backdrop-blur-xl sm:p-8">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="space-y-2 sm:col-span-1">
                      <span className="text-sm text-slate-300">Name</span>
                      <input
                        className="w-full rounded-2xl border border-white/14 bg-white/90 px-4 py-3 text-slate-900 outline-none transition focus:border-[#86beff] focus:ring-4 focus:ring-[#86beff]/20"
                        onChange={(event) => {
                          setRequestSubmitted(false);
                          setForm((current) => ({ ...current, name: event.target.value }));
                        }}
                        placeholder="Your name"
                        value={form.name}
                      />
                    </label>
                    <label className="space-y-2 sm:col-span-1">
                      <span className="text-sm text-slate-300">Organization</span>
                      <input
                        className="w-full rounded-2xl border border-white/14 bg-white/90 px-4 py-3 text-slate-900 outline-none transition focus:border-[#86beff] focus:ring-4 focus:ring-[#86beff]/20"
                        onChange={(event) => {
                          setRequestSubmitted(false);
                          setForm((current) => ({ ...current, organization: event.target.value }));
                        }}
                        placeholder="Company or team"
                        value={form.organization}
                      />
                    </label>
                    <label className="space-y-2 sm:col-span-2">
                      <span className="text-sm text-slate-300">Work email</span>
                      <input
                        className="w-full rounded-2xl border border-white/14 bg-white/90 px-4 py-3 text-slate-900 outline-none transition focus:border-[#86beff] focus:ring-4 focus:ring-[#86beff]/20"
                        onChange={(event) => {
                          setRequestSubmitted(false);
                          setForm((current) => ({ ...current, email: event.target.value }));
                        }}
                        placeholder="name@organization.com"
                        type="email"
                        value={form.email}
                      />
                    </label>
                    <label className="space-y-2 sm:col-span-2">
                      <span className="text-sm text-slate-300">Primary interest</span>
                      <select
                        className="w-full rounded-2xl border border-white/14 bg-white/90 px-4 py-3 text-slate-900 outline-none transition focus:border-[#86beff] focus:ring-4 focus:ring-[#86beff]/20"
                        onChange={(event) => {
                          setRequestSubmitted(false);
                          setForm((current) => ({ ...current, interest: event.target.value }));
                        }}
                        value={form.interest}
                      >
                        <option>Advisory</option>
                        <option>Training</option>
                        <option>Tools</option>
                      </select>
                    </label>
                    <label className="space-y-2 sm:col-span-2">
                      <span className="text-sm text-slate-300">What would you like to discuss?</span>
                      <textarea
                        className="min-h-36 w-full rounded-[1.5rem] border border-white/14 bg-white/90 px-4 py-3 text-slate-900 outline-none transition focus:border-[#86beff] focus:ring-4 focus:ring-[#86beff]/20"
                        onChange={(event) => {
                          setRequestSubmitted(false);
                          setForm((current) => ({ ...current, challenge: event.target.value }));
                        }}
                        placeholder="Briefly describe your goals, friction points, or the kind of support you are exploring."
                        value={form.challenge}
                      />
                    </label>
                  </div>

                  <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="max-w-sm text-sm leading-7 text-slate-300">
                      Use this form to send your consultation request directly to Practical AI Implementation Group. We will review the note and respond within 48 hours.
                    </p>
                    <Button
                      className="rounded-full bg-white px-6 py-6 text-sm text-slate-950 hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-70"
                      disabled={isSubmitting}
                      onClick={handleSubmit}
                      type="button"
                    >
                      {isSubmitting ? "Sending..." : "Request consultation"}
                      {!isSubmitting && <ArrowRight className="ml-2 size-4" />}
                    </Button>
                  </div>

                  {requestSubmitted && (
                    <div className="mt-5 flex items-start gap-3 rounded-[1.5rem] border border-emerald-400/25 bg-emerald-400/10 px-5 py-4 text-emerald-50">
                      <CheckCircle2 className="mt-0.5 size-5 shrink-0" />
                      <div>
                        <div className="text-sm font-semibold tracking-[0.01em]">Your message has been sent.</div>
                        <p className="mt-1 text-sm leading-6 text-emerald-50/90">
                          Thank you for reaching out. We will review your note and get back to you within 48 hours.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Who We Are ── */}
        <section id="who-we-are" className="border-t border-slate-200/70 bg-white py-24">
          <div className="container">
            <div className="section-tag">Who we are</div>
            <h2 className="mt-6 max-w-xl font-display text-4xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-5xl">
              Making AI Accessible to Everyone
            </h2>

            <div className="mt-16 grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:items-start">
              {/* Photo + name card */}
              <div className="flex flex-col gap-6">
                <div className="overflow-hidden rounded-[1.8rem] border border-slate-200 shadow-[0_16px_40px_rgba(15,23,42,0.08)]">
                  <img
                    src={founderImage}
                    alt="Sam Whitney — Founder, Practical AI Implementation Group"
                    className="h-full w-full object-cover object-top"
                    style={{ maxHeight: '480px' }}
                  />
                </div>
                <div>
                  <div className="font-display text-2xl font-semibold tracking-[-0.03em] text-slate-950">Sam Whitney</div>
                  <div className="mt-1 text-sm font-medium uppercase tracking-[0.18em] text-slate-500">Founder &amp; Principal</div>
                  <a
                    href="https://www.linkedin.com/in/samuel-whitney1/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <svg className="size-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    Connect on LinkedIn
                  </a>
                </div>
              </div>

              {/* Bio + values */}
              <div className="flex flex-col gap-10">
                <div>
                  <p className="text-lg leading-8 text-slate-700">
                    Sam Whitney is a builder-strategist with 13 years of experience leading product, culture, and AI transformation across some of the world's most demanding organizations — from hospitals and defense contractors to sovereign wealth funds, global non-profits, and logistics enterprises.
                  </p>
                  <p className="mt-5 text-lg leading-8 text-slate-700">
                    He has facilitated hundreds of workshops for groups ranging from 10 to 500 people, led international teams of 100+, and built and deployed enterprise-grade AI tools used in production. Sam specializes in teaching organizations to compress their product development cycle — using AI tools, no-code prototyping, and agent-assisted workflows to move from signal to shipped product in days, not months.
                  </p>
                  <p className="mt-5 text-lg leading-8 text-slate-700">
                    PAIIG exists because most organizations don't need more AI hype. They need a trusted partner who can assess where they actually are, build what they actually need, and help their people actually use it.
                  </p>
                  <p className="mt-5 text-lg leading-8 text-slate-700">
                    While Sam works all over the world, he is based in Layton, Utah with his wife and 5 children.
                  </p>
                </div>

                {/* Values */}
                <div>
                  <div className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Our values</div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    {[
                      {
                        title: "Human First",
                        text: "AI works for people, not the other way around. We design every engagement so that technology serves as a genuine partner to the humans using it — not a replacement for their judgment or expertise."
                      },
                      {
                        title: "Integrity",
                        text: "We do what we say we will do. That means hard work, honest communication, and following through on every commitment — from discovery to delivery and beyond."
                      },
                      {
                        title: "Helpfulness",
                        text: "Everything we do is in service of making your work easier, your team more capable, and your organization more effective. If it doesn't help, we don't do it."
                      },
                      {
                        title: "Results",
                        text: "We measure our success by yours. Every advisory engagement, training program, and custom tool is designed to produce outcomes you can see, measure, and build on."
                      },
                    ].map((v) => (
                      <div key={v.title} className="rounded-[1.35rem] border border-slate-200 bg-slate-50/60 p-6">
                        <div className="font-display text-base font-semibold tracking-[-0.02em] text-slate-950">{v.title}</div>
                        <p className="mt-2 text-sm leading-6 text-slate-600">{v.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-slate-200/70 py-10">
        <div className="container flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <img alt="PAIIG logo" className="h-8 w-auto" src={logoImage} />
            <div className="text-sm font-semibold text-slate-700">Practical AI Implementation Group</div>
          </div>
          <div className="flex items-center gap-6 text-xs text-slate-400">
            <button
              onClick={() => setShowTerms(true)}
              className="hover:text-slate-600 transition-colors underline"
            >
              Terms of Service
            </button>
            <div>
              © {new Date().getFullYear()} Practical AI Implementation Group. All rights reserved.
            </div>
          </div>
        </div>
      </footer>

      {/* Terms of Service Modal */}
      <Dialog open={showTerms} onOpenChange={setShowTerms}>
        <DialogContent className="max-h-[80vh] overflow-y-auto max-w-2xl">
          <DialogHeader>
            <DialogTitle>Terms of Service</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-sm leading-relaxed text-slate-700">
            <div>
              <p className="font-semibold">Practical AI Implementation Group (PAIIG)</p>
              <p className="mt-2">These Terms of Service govern the relationship between Practical AI Implementation Group, LLC ("PAIIG," "we," "us," or "our") and any organization or individual engaging our services ("Client," "you," or "your").</p>
              <p className="mt-2">By engaging PAIIG for Advisory Services, Training Services, or Custom Software Development Services, you acknowledge that you have read, understood, and agree to be bound by these Terms.</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Services Overview</h3>
              <p><strong>Advisory Services:</strong> Assessment and consultation on AI readiness, adoption strategy, and organizational implementation planning.</p>
              <p className="mt-2"><strong>Training Services:</strong> Curriculum development, delivery, and practice design to build organizational capability in AI adoption.</p>
              <p className="mt-2"><strong>Custom Software Development:</strong> Design and development of custom applications and tools tailored to your organization's workflows.</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Payment Terms</h3>
              <p><strong>Advisory & Training:</strong> 100% due upfront before services commence. All fees are non-refundable once services have begun.</p>
              <p className="mt-2"><strong>Custom Software:</strong> 50% deposit upon SOW signature; 50% final payment upon delivery and acceptance. Net 30 from invoice date.</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Intellectual Property</h3>
              <p>For custom software, Client owns all work product upon final payment. PAIIG retains ownership of pre-existing code libraries, frameworks, and the right to use learnings and patterns in future work.</p>
              <p className="mt-2">For advisory and training services, PAIIG retains ownership of all materials, frameworks, and methodologies.</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Confidentiality & Use of Name</h3>
              <p>PAIIG may use Client's name, logo, and general description of the engagement in marketing materials, case studies, and proposals unless Client opts out in writing within 30 days of project completion.</p>
              <p className="mt-2">PAIIG will not disclose Client's confidential business information, pricing, or proprietary strategies without explicit written consent.</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Warranties & Liability</h3>
              <p>PAIIG warrants services will be performed professionally and consistently with industry standards. However, PAIIG does not guarantee specific outcomes, business results, or ROI.</p>
              <p className="mt-2">PAIIG's total liability is limited to fees paid in the preceding 12 months. PAIIG is not liable for indirect, consequential, or punitive damages.</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Termination</h3>
              <p>Either party may terminate with 30 days' notice. Client remains responsible for all accrued fees. Material breaches may be terminated immediately with 10 business days' notice to cure.</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Dispute Resolution</h3>
              <p>Any disputes shall be resolved by binding arbitration under the American Arbitration Association's Commercial Arbitration Rules.</p>
            </div>

            <div className="text-xs text-slate-500 border-t border-slate-200 pt-4">
              <p>For the complete Terms of Service, please contact us directly.</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
