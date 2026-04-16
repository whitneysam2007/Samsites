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

const heroImage =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663421536846/axGeqRw57podisBRfPU5Zi/ai-consulting-hero-Q4mS9dbNBrsGZcRbzbbaXT.webp";
const readinessImage =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663421536846/axGeqRw57podisBRfPU5Zi/ai-readiness-section-hF53owir67fvqsbK9zaV2o.webp";
const consultationImage =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663421536846/axGeqRw57podisBRfPU5Zi/consultation-cta-EPN9SeZSWzyhxjNuRHdtCz.webp";
const logoImage =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663421536846/axGeqRw57podisBRfPU5Zi/practical-ai-logo-1-ZSLgVbFvdVTj6wZ6BwcH4v.webp";

const contactRecipient = "whitney.sam@gmail.com";
const emailjsServiceId = "service_x5ymj1c";
const consultationTemplateId = "template_exunaza";
const surveyTemplateId = "template_exunaza";
const emailjsPublicKey = "JBiZ9XbX-Wd-twUS2";
const siteName = "Practical AI Implementation Group";

const scoredQuestionKeys = ["q1", "q2", "q4", "q5", "q6", "q7", "q8", "q9", "q10", "q11"] as const;

type ScoredQuestionKey = (typeof scoredQuestionKeys)[number];

type ContactForm = {
  name: string;
  organization: string;
  email: string;
  interest: string;
  challenge: string;
};

type SurveyForm = {
  name: string;
  email: string;
  organization: string;
  primaryAiTool: string;
  experienceNotes: string;
  q1: string;
  q2: string;
  q4: string;
  q5: string;
  q6: string;
  q7: string;
  q8: string;
  q9: string;
  q10: string;
  q11: string;
};

const readinessQuestions: Array<{
  key: ScoredQuestionKey;
  number: number;
  category: string;
  prompt: string;
}> = [
  {
    key: "q1",
    number: 2,
    category: "Mindset & openness",
    prompt:
      "People in our organization see AI as a tool that enhances their expertise rather than a threat to their role or value.",
  },
  {
    key: "q2",
    number: 3,
    category: "Mindset & openness",
    prompt:
      "People in our organization feel they have genuine permission to experiment with AI tools — even if they make mistakes along the way.",
  },
  {
    key: "q4",
    number: 4,
    category: "Personal fluency & comfort",
    prompt:
      "People across our organization regularly use AI tools to help with everyday tasks like summarising, drafting, or preparing for meetings.",
  },
  {
    key: "q5",
    number: 5,
    category: "Personal fluency & comfort",
    prompt:
      "Most people in our organization could identify at least one task in their daily work where AI would save them meaningful time or effort.",
  },
  {
    key: "q6",
    number: 6,
    category: "Personal fluency & comfort",
    prompt:
      "People in our organization feel confident using AI tools without needing someone else to guide them through it.",
  },
  {
    key: "q7",
    number: 7,
    category: "Shared operating habits",
    prompt:
      "When people in our organization use AI tools, they consistently provide context (role, audience, purpose) to get better outputs.",
  },
  {
    key: "q8",
    number: 8,
    category: "Shared operating habits",
    prompt:
      "There is a common expectation across our organization that AI-generated content is reviewed and verified before it's shared or acted on.",
  },
  {
    key: "q9",
    number: 9,
    category: "Shared operating habits",
    prompt:
      "People in our organization have a clear understanding of what information is and isn't safe to share with AI tools.",
  },
  {
    key: "q10",
    number: 10,
    category: "Role-based application & workflow value",
    prompt:
      "AI use in our organization has moved beyond general productivity into role-specific workflows and practices.",
  },
  {
    key: "q11",
    number: 11,
    category: "Role-based application & workflow value",
    prompt:
      "Teams in our organization share examples and practices for how they use AI together — not just individually.",
  },
];

const readinessScale = [
  { value: "1", label: "Strongly disagree" },
  { value: "2", label: "Disagree" },
  { value: "3", label: "Neutral" },
  { value: "4", label: "Agree" },
  { value: "5", label: "Strongly agree" },
];

const services = [
  {
    title: "Advisory",
    description:
      "We help you discover the deeper needs and obstacles to AI fluency and results. Using our unique tools, we work to understand strengths and weak areas, and return practical reports with rollout recommendations.",
    icon: Compass,
  },
  {
    title: "Training",
    description:
      "We develop and deliver training curriculum and practice design in concert with L&D teams so people move from awareness to fluency, confidence, and repeatable habits.",
    icon: GraduationCap,
  },
  {
    title: "Custom Tools",
    description:
      "We design and build role-specific AI applications. From goal tracking to survey platforms to agent harnesses. We deploy on your infrastructure or ours, and you own the code. Your tools, your data, your competitive advantage.",
    icon: Workflow,
  },
];

const operatingModel = [
  {
    label: "01",
    title: "Discovery before rollout",
    text: "We begin by identifying where friction, opportunity, and readiness actually live so implementation decisions are based on real conditions rather than assumptions.",
  },
  {
    label: "02",
    title: "Capability building with L&D",
    text: "We shape training, manager reinforcement, and safe-use habits so adoption grows through practical confidence, not compliance theater.",
  },
  {
    label: "03",
    title: "Role-based implementation",
    text: "We translate early wins into workflow-level practice, governance-aware routines, and tailored tools that support lasting business value.",
  },
];

const credibilityPoints = [
  "Executive-ready analysis and recommendation framing.",
  "Human-centered adoption strategy, not tool hype.",
  "Partnership approach designed for HR, L&D, operations, and leadership teams.",
  "Custom advisory work that can move from diagnosis to enablement to tailored build-out.",
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
    logo: "https://www.google.com/s2/favicons?domain=claude.com&sz=128",
  },
  {
    name: "GitHub Copilot",
    company: "GitHub",
    logo: "https://www.google.com/s2/favicons?domain=github.com&sz=128",
  },
  {
    name: "ChatGPT",
    company: "OpenAI",
    logo: "https://www.google.com/s2/favicons?domain=openai.com&sz=128",
  },
  {
    name: "Perplexity",
    company: "Perplexity",
    logo: "https://www.google.com/s2/favicons?domain=perplexity.ai&sz=128",
  },
  {
    name: "Replit",
    company: "Replit",
    logo: "https://www.google.com/s2/favicons?domain=replit.com&sz=128",
  },
  {
    name: "Manus",
    company: "Manus",
    logo: "https://www.google.com/s2/favicons?domain=manus.im&sz=128",
  },
  {
    name: "Gemini",
    company: "Google",
    logo: "https://www.google.com/s2/favicons?domain=gemini.google.com&sz=128",
  },
  {
    name: "NotebookLM",
    company: "Google",
    logo: "https://www.google.com/s2/favicons?domain=notebooklm.google.com&sz=128",
  },
  {
    name: "Cursor",
    company: "Cursor",
    logo: "https://www.google.com/s2/favicons?domain=cursor.com&sz=128",
  },
  {
    name: "Claude Cowork",
    company: "Anthropic",
    logo: "https://www.google.com/s2/favicons?domain=claude.com&sz=128",
  },
];

const initialForm: ContactForm = {
  name: "",
  organization: "",
  email: "",
  interest: "Advisory",
  challenge: "",
};

const initialSurveyForm: SurveyForm = {
  name: "",
  email: "",
  organization: "",
  primaryAiTool: "",
  experienceNotes: "",
  q1: "",
  q2: "",
  q4: "",
  q5: "",
  q6: "",
  q7: "",
  q8: "",
  q9: "",
  q10: "",
  q11: "",
};

const getReadinessLevel = (score: number) => {
  if (score <= 20) {
    return {
      title: "Early Awareness",
      description:
        "Your organization is at the very beginning of its AI journey. Most people haven't yet used AI tools in their work, and there's likely unaddressed fear or uncertainty about what AI means for them. Start with mindset — help people see AI as an enhancement, not a replacement — before introducing any tools or training.",
    };
  }

  if (score <= 28) {
    return {
      title: "Curious but Stuck",
      description:
        "There's some awareness and possibly pockets of interest, but AI hasn't become part of how people actually work. The gap is usually permission and practical exposure. Focus on Layer 1: get the approved tool into people's hands with real tasks and low-stakes practice.",
    };
  }

  if (score <= 36) {
    return {
      title: "Building Momentum",
      description:
        "People are starting to use AI and see value, but it's mostly individual and inconsistent. This is the Layer 2 moment: build shared habits around prompting, verification, and safe use so the organization develops a common standard, not just scattered experiments.",
    };
  }

  if (score <= 44) {
    return {
      title: "Gaining Traction",
      description:
        "AI use is becoming part of the culture. People are reasonably fluent and there are emerging team-level practices. The opportunity now is Layer 3: translate personal productivity into role-specific workflows and repeatable team patterns that deliver measurable business value.",
    };
  }

  return {
    title: "Leading Practice",
    description:
      "Your organization has strong AI fluency, shared operating habits, and role-based application. The focus shifts to scaling what works, capturing case studies, and building the learning infrastructure that keeps the organization ahead as AI tools and capabilities evolve.",
  };
};

export default function Home() {
  const [form, setForm] = useState<ContactForm>(initialForm);
  const [requestSubmitted, setRequestSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [surveyForm, setSurveyForm] = useState<SurveyForm>(initialSurveyForm);
  const [surveyStarted, setSurveyStarted] = useState(false);
  const [surveySubmitted, setSurveySubmitted] = useState(false);
  const [isSurveySubmitting, setIsSurveySubmitting] = useState(false);
  const [surveyResult, setSurveyResult] = useState<{
    score: number;
    title: string;
    description: string;
  } | null>(null);
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

  const handleSurveyStart = () => {
    if (!surveyForm.name || !surveyForm.organization || !surveyForm.email) {
      toast.error("Please enter your name, organization, and work email before starting the survey.");
      return;
    }

    setSurveySubmitted(false);
    setSurveyResult(null);
    setSurveyStarted(true);
    toast.success("Thanks. You can now complete the assessment.");
  };

  const handleSurveySubmit = async () => {
    const missingScore = scoredQuestionKeys.some((key) => !surveyForm[key]);

    if (!surveyStarted) {
      toast.error("Please submit your contact information first to unlock the survey.");
      return;
    }

    if (
      !surveyForm.name ||
      !surveyForm.organization ||
      !surveyForm.email ||
      !surveyForm.primaryAiTool ||
      !surveyForm.experienceNotes ||
      missingScore
    ) {
      toast.error("Please complete every survey question before seeing your readiness result.");
      return;
    }

    setIsSurveySubmitting(true);

    const score = scoredQuestionKeys.reduce((sum, key) => sum + Number(surveyForm[key]), 0);
    const level = getReadinessLevel(score);
    const message = [
      `AI Readiness Survey submission for ${surveyForm.name}`,
      `Organization: ${surveyForm.organization || "Not provided"}`,
      `Reply to: ${surveyForm.email}`,
      `Readiness score: ${score}/50`,
      `Readiness level: ${level.title}`,
      `Q1 — Primary AI tool: ${surveyForm.primaryAiTool}`,
      "",
      "Scored responses:",
      ...readinessQuestions.map(
        (question) =>
          `Q${question.number} (${question.category}) — ${question.prompt} :: ${surveyForm[question.key]}/5`,
      ),
      "",
      `Q12 — Experience notes: ${surveyForm.experienceNotes}`,
    ].join("\n");

    try {
      await emailjs.send(
        emailjsServiceId,
        surveyTemplateId,
        {
          from_name: surveyForm.name,
          organization: surveyForm.organization || "Not provided",
          reply_to: surveyForm.email,
          interest: "AI Readiness Survey",
          message,
          readiness_score: `${score}/50`,
          readiness_band: level.title,
          readiness_interpretation: level.description,
          primary_ai_tool: surveyForm.primaryAiTool,
          q1: surveyForm.q1,
          q2: surveyForm.q2,
          q4: surveyForm.q4,
          q5: surveyForm.q5,
          q6: surveyForm.q6,
          q7: surveyForm.q7,
          q8: surveyForm.q8,
          q9: surveyForm.q9,
          q10: surveyForm.q10,
          q11: surveyForm.q11,
          experience_notes: surveyForm.experienceNotes,
          submitted_at: new Date().toLocaleString("en-US", {
            dateStyle: "medium",
            timeStyle: "short",
          }),
          to_email: contactRecipient,
          site_name: siteName,
        },
      );

      setSurveyResult({
        score,
        title: level.title,
        description: level.description,
      });
      setSurveySubmitted(true);
      toast.success("Your readiness assessment has been sent. We will follow up within 48 hours.");
    } catch (error) {
      console.error("EmailJS survey submission failed", error);
      toast.error("We couldn't send the readiness assessment just now. Please try again in a moment.");
    } finally {
      setIsSurveySubmitting(false);
    }
  };

  const totalPossibleScore = scoredQuestionKeys.length * 5;
  const completedSurveyAnswers = scoredQuestionKeys.filter((key) => Boolean(surveyForm[key])).length;

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
            <a className="transition-colors hover:text-slate-950" href="#why-us">
              Why us
            </a>
          </nav>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
            <Button
              asChild
              variant="outline"
              className="w-full rounded-full border-slate-300 bg-white px-5 text-center text-slate-700 hover:bg-slate-50 sm:w-auto"
            >
              <a href="#readiness-survey">Take the readiness survey</a>
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
                Advisory, training, and tools
              </div>

              <h1 className="mt-8 max-w-4xl font-display text-5xl font-semibold leading-[0.94] tracking-[-0.06em] text-slate-950 sm:text-6xl xl:text-7xl">
                Practical AI help for your organization
              </h1>

              <p className="mt-8 max-w-xl text-lg leading-8 text-slate-600 sm:text-xl">
                If your organization is trying to move from AI interest to disciplined rollout, we help you assess readiness, build capability, and put bespoke workflows and AI tools to work.
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
                  ["Advisory", "Identify strengths, weak areas, and rollout priorities."],
                  ["Training", "Custom training that builds skills and habits that stick"],
                  ["Tools", "We design and implement custom built tools for real value and ROI"],
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
                    AI rollouts rarely fail because of the tech. They stall when people lack trust, clarity, and practical ways to use the tools. We help you address the human side with advisory, training, and custom tools so the people and the tech can get to work.
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
                  We help your organization move from AI ambition to execution.
                </h2>
              </div>
              <p className="max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                Each engagement is designed to reduce uncertainty, build capability, and give teams a practical path from AI ambition to day-to-day adoption.
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
                  The idea is simple: AI adoption usually breaks down where technology meets people. The work succeeds when organizations understand how to help people feel seen in the process, create guardrails people can trust, and make new habits visible in daily work.
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


        {/* ── AI Readiness Survey ── */}
        <section id="readiness-survey" className="relative overflow-hidden border-b border-slate-200/70 bg-[linear-gradient(180deg,#f7fbff_0%,#ffffff_100%)] py-24">
          <div className="container">
            <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
              <div className="lg:sticky lg:top-28">
                <div className="section-tag">AI readiness survey</div>
                <h2 className="mt-6 max-w-xl font-display text-4xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-5xl">
                  Get an immediate read on how prepared your organization is for a Practical AI implementation.
                </h2>
                <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600">
                  Start by submitting your contact details to unlock a quick assessment of readiness, likely friction points, and practical next priorities. Your score and interpretation stay hidden until every assessment question has been answered.
                </p>
              </div>

              <div className="rounded-[2.25rem] border border-slate-200 bg-white p-6 shadow-[0_30px_90px_rgba(15,23,42,0.08)] sm:p-8 lg:p-10">
                {!surveyStarted ? (
                  <>
                    <div className="rounded-[1.85rem] border border-slate-200 bg-slate-50/80 p-6">
                      <div className="text-xs uppercase tracking-[0.22em] text-slate-500">Step 1 · Contact details</div>
                      <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
                        Enter your contact information first. After you submit it, the full assessment opens on this page. Your result stays hidden until you complete the survey.
                      </p>
                    </div>

                    <div className="mt-6 grid gap-5 sm:grid-cols-2">
                      <label className="space-y-2">
                        <span className="text-sm text-slate-600">Name</span>
                        <input
                          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-[#86beff] focus:ring-4 focus:ring-[#86beff]/20"
                          onChange={(event) => {
                            setSurveySubmitted(false);
                            setSurveyResult(null);
                            setSurveyForm((current) => ({ ...current, name: event.target.value }));
                          }}
                          placeholder="Your name"
                          value={surveyForm.name}
                        />
                      </label>
                      <label className="space-y-2">
                        <span className="text-sm text-slate-600">Work email</span>
                        <input
                          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-[#86beff] focus:ring-4 focus:ring-[#86beff]/20"
                          onChange={(event) => {
                            setSurveySubmitted(false);
                            setSurveyResult(null);
                            setSurveyForm((current) => ({ ...current, email: event.target.value }));
                          }}
                          placeholder="name@organization.com"
                          type="email"
                          value={surveyForm.email}
                        />
                      </label>
                      <label className="space-y-2 sm:col-span-2">
                        <span className="text-sm text-slate-600">Organization</span>
                        <input
                          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-[#86beff] focus:ring-4 focus:ring-[#86beff]/20"
                          onChange={(event) => {
                            setSurveySubmitted(false);
                            setSurveyResult(null);
                            setSurveyForm((current) => ({ ...current, organization: event.target.value }));
                          }}
                          placeholder="Company, school, division, or team"
                          value={surveyForm.organization}
                        />
                      </label>
                    </div>

                    <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <p className="max-w-xl text-sm leading-7 text-slate-600">
                        Step 1 only unlocks the survey. The final score and interpretation will appear only after the full assessment is submitted.
                      </p>
                      <Button className="rounded-full bg-slate-950 px-6 py-6 text-sm text-white hover:bg-slate-800" onClick={handleSurveyStart} type="button">
                        Continue to survey
                        <ArrowRight className="ml-2 size-4" />
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="rounded-[1.85rem] border border-[#dbe7ff] bg-[linear-gradient(135deg,rgba(239,246,255,0.9),rgba(245,243,255,0.9))] p-6">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <div className="text-xs uppercase tracking-[0.22em] text-slate-500">Step 2 · Complete the assessment</div>
                          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-700">
                            Survey for <span className="font-semibold text-slate-950">{surveyForm.name}</span> at <span className="font-semibold text-slate-950">{surveyForm.organization}</span>. Complete every question to reveal your readiness score and interpretation.
                          </p>
                        </div>
                        <button
                          className="text-sm font-medium text-slate-600 transition hover:text-slate-950"
                          onClick={() => {
                            setSurveyStarted(false);
                            setSurveySubmitted(false);
                            setSurveyResult(null);
                          }}
                          type="button"
                        >
                          Edit contact info
                        </button>
                      </div>
                    </div>

                    <label className="mt-8 block space-y-2">
                      <span className="text-sm text-slate-600">Q1. What is your organization's primary AI tool(s)?</span>
                      <input
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-[#86beff] focus:ring-4 focus:ring-[#86beff]/20"
                        onChange={(event) => {
                          setSurveySubmitted(false);
                          setSurveyResult(null);
                          setSurveyForm((current) => ({ ...current, primaryAiTool: event.target.value }));
                        }}
                        placeholder="Copilot, ChatGPT, Gemini, Claude, or another tool"
                        value={surveyForm.primaryAiTool}
                      />
                    </label>

                    <div className="mt-8 space-y-5">
                      {readinessQuestions.map((question) => (
                        <div key={question.key} className="rounded-[1.75rem] border border-slate-200 bg-slate-50/70 p-5 sm:p-6">
                          <div>
                            <div className="text-xs uppercase tracking-[0.22em] text-slate-500">Q{question.number} · {question.category}</div>
                            <p className="mt-3 max-w-3xl text-base leading-7 text-slate-900">{question.prompt}</p>
                          </div>

                          <div className="mt-5 grid grid-cols-5 gap-2">
                            {readinessScale.map((option) => {
                              const selected = surveyForm[question.key] === option.value;
                              return (
                                <button
                                  key={`${question.key}-${option.value}`}
                                  className={`rounded-2xl border px-3 py-3 text-sm font-medium transition ${
                                    selected
                                      ? "border-slate-900 bg-slate-900 text-white shadow-[0_12px_30px_rgba(15,23,42,0.15)]"
                                      : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-100"
                                  }`}
                                  onClick={() => {
                                    setSurveySubmitted(false);
                                    setSurveyResult(null);
                                    setSurveyForm((current) => ({ ...current, [question.key]: option.value }));
                                  }}
                                  type="button"
                                >
                                  <div className="text-base">{option.value}</div>
                                  <div className="mt-1 hidden text-[11px] leading-4 sm:block">{option.label}</div>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>

                    <label className="mt-8 block space-y-2">
                      <span className="text-sm text-slate-600">Q12. What has your organization already tried to build AI readiness? What has worked, and what hasn't?</span>
                      <textarea
                        className="min-h-40 w-full rounded-[1.6rem] border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-[#86beff] focus:ring-4 focus:ring-[#86beff]/20"
                        onChange={(event) => {
                          setSurveySubmitted(false);
                          setSurveyResult(null);
                          setSurveyForm((current) => ({ ...current, experienceNotes: event.target.value }));
                        }}
                        placeholder="Share any pilots, trainings, guidance, successes, friction points, or lessons learned so far."
                        value={surveyForm.experienceNotes}
                      />
                    </label>

                    <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <p className="max-w-xl text-sm leading-7 text-slate-600">
                        Complete the full survey to reveal your score in the browser and send the same response set to Practical AI Implementation Group for follow-up. We will review the assessment and respond within 48 hours.
                      </p>
                      <Button
                        className="rounded-full bg-slate-950 px-6 py-6 text-sm text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
                        disabled={isSurveySubmitting}
                        onClick={handleSurveySubmit}
                        type="button"
                      >
                        {isSurveySubmitting ? "Calculating..." : "See result"}
                        {!isSurveySubmitting && <ArrowRight className="ml-2 size-4" />}
                      </Button>
                    </div>

                    {surveySubmitted && surveyResult && (
                      <div className="mt-6 rounded-[1.6rem] border border-emerald-200 bg-emerald-50 px-5 py-5 text-emerald-950">
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-700" />
                          <div>
                            <div className="text-sm font-semibold tracking-[0.01em]">Assessment submitted successfully.</div>
                            <p className="mt-2 text-sm leading-7 text-emerald-900/90">
                              Your readiness score is <span className="font-semibold">{surveyResult.score} / {totalPossibleScore}</span>, which places you in the <span className="font-semibold">{surveyResult.title}</span> level.
                            </p>
                            <p className="mt-2 text-sm leading-7 text-emerald-900/90">{surveyResult.description}</p>
                            <p className="mt-2 text-sm leading-7 text-emerald-900/90">
                              Thank you for sharing your responses. We will review the assessment and get back to you within 48 hours.
                            </p>
                            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
                              <Button asChild className="rounded-full bg-emerald-900 px-5 py-5 text-sm text-white hover:bg-emerald-800">
                                <a href="#consultation">
                                  Book a consultation now
                                  <ArrowRight className="ml-2 size-4" />
                                </a>
                              </Button>
                              <p className="text-sm leading-7 text-emerald-900/80">
                                If you would like to discuss the result right away, continue directly to the consultation form below.
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
