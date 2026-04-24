import CodeSnippet from "@/components/CodeSnippet";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import Link from "next/link";
import { BiCommentEdit } from "react-icons/bi";
import { BsQuestionSquareFill } from "react-icons/bs";
import {
  FiArrowUpRight,
  FiCode,
  FiUsers,
} from "react-icons/fi";
import { GoCommentDiscussion } from "react-icons/go";
import {
  LuBadgeCheck,
} from "react-icons/lu";
import { MdTerminal } from "react-icons/md";

//#region Font Declaration
const space_grotesk = Space_Grotesk({
  subsets: ["latin"],
});

const inter = Inter({
  subsets: ["latin"],
});

const jetbrains_mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: "400",
});
//#endregion

const pipelineSteps = [
  {
    icon: <MdTerminal size={30} />,
    title: "1. Post Code",
    description:
      "Share your snippets or sync directly with GitHub. Tag with languages and architecture patterns.",
  },
  {
    icon: <GoCommentDiscussion size={25} />,
    title: "2. Get Feedback",
    description:
      "Receive line-by-line comments from verified senior engineers and specialized architects.",
  },
  {
    icon: <LuBadgeCheck size={25} />,
    title: "3. Build Reputation",
    description:
      "Earn points for quality reviews, resolve complex issues, and rise through the Hub ranks.",
  },
];

const metrics = [
  { value: "12,400+", label: "ACTIVE ARCHITECTS", className: "text-primary" },
  { value: "1.2M", label: "LINES REVIEWED", className: "text-primary-dark" },
  { value: "85k", label: "RESOLVED ISSUES", className: "text-slate-300" },
];

export default function Home() {
  return (
    <div className="text-white">
      <section className="relative overflow-hidden border-b border-white/6">
        <div className="mx-auto flex min-h-[calc(100vh-9rem)] w-full max-w-7xl flex-col justify-center px-5 pb-20 pt-12 sm:px-8 lg:px-10">
          <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_32rem]">
            <div className={`${space_grotesk.className} max-w-2xl`}>
              <h1 className="mt-8 max-w-xl text-5xl font-black leading-[0.92] tracking-[-0.04em] text-white sm:text-4xl lg:text-[4.5rem]">
                Elevate Your
                <span className="block text-primary bg-clip-text">
                  Code Quality
                </span>
              </h1>

              <p
                className={`${inter.className} mt-7 max-w-lg text-base leading-8 text-slate-300 sm:text-lg`}
              >
                The definitive collaborative platform where Stack Overflow meets
                GitHub PRs. Build better software through precise, architected
                feedback.
              </p>

              {/* TODO: Add the Handling when clicked on these button */}
              <div className={`${inter.className} mt-9 flex flex-wrap gap-4`}>
                <button className="rounded-md border border-sky-300/80 bg-linear-to-r from-primary to-primary-dark px-6 py-3 text-sm font-semibold text-slate-950 shadow-[0_10px_25px_rgba(86,201,255,0.25)] transition hover:brightness-105">
                  Start Reviewing
                </button>
                <button className="rounded-md border border-white/14 bg-white/4 px-6 py-3 text-sm font-semibold text-primary transition hover:border-white/25">
                  Post a Snippet
                </button>
              </div>
            </div>

            <div className="justify-self-end">
              <CodeSnippet title="MAIN.RS - 248 Lines">
                <div>
                  <span className="text-green-400 pe-2">fn</span>
                  <span className="text-blue-300">{"main() {"}</span>
                  <br />
                  <span className="ps-5 text-slate-400 tracking-wider">
                    {"let architect = Hub::new("}
                  </span>
                  <span className="text-white/80">{`"Digital"`}</span>
                  <span className="text-slate-400">{");"}</span> <br />
                  <span className="ps-5 text-slate-400 tracking-wider">
                    {"match architect.review() {"}
                  </span>
                  <br />
                  <span className="text-green-400 ps-9 pe-2">
                    {"Ok(quality) =>"}
                  </span>
                  <span className="text-white/80">{"println!"}</span>
                  <span className="text-blue-300">{"("}</span>
                  <span className="text-white/80">{`"Elevated: {}"`}</span>
                  <span className="text-green-400">{", quality"}</span>
                  <span className="text-blue-300">{"),"}</span> <br />
                  <span className="text-green-400 ps-9 pe-2">
                    {"Err(e) =>"}
                  </span>
                  <span className="text-white/80">{"panic!"}</span>
                  <span className="text-blue-300">{"("}</span>
                  <span className="text-white/80">{`"Refactor needed: {}"`}</span>
                  <span className="text-green-400">{", e"}</span>
                  <span className="text-blue-300">{"),"}</span> <br />
                  <span className="text-slate-400 ps-5">{"}"}</span> <br />
                  <span className="text-green-400">{"}"}</span>
                </div>
              </CodeSnippet>
            </div>
          </div>
        </div>
      </section>

      {/* Review Pipeline Section */}
      <section className="mx-auto bg-[#1a2030] w-full max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            className={`${space_grotesk.className} text-3xl font-bold tracking-[-0.03em] text-white`}
          >
            The Review Pipeline
          </h2>
          <p
            className={`${inter.className} mt-3 text-sm text-slate-400 sm:text-base`}
          >
            Three simple steps to world-class code and community recognition.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {pipelineSteps.map((step) => (
            <article
              key={step.title}
              className="panel-card flex min-h-52 flex-col items-center rounded-[1.25rem] px-6 py-8 text-center bg-[#111520]"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-300/10 bg-[#1a2030] text-cyan-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                {step.icon}
              </div>
              <h3
                className={`${space_grotesk.className} text-lg font-semibold text-white`}
              >
                {step.title}
              </h3>
              <p
                className={`${inter.className} mt-4 max-w-xs text-sm leading-6 text-slate-400`}
              >
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-18 px-5 py-10 sm:px-8 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          <div className="max-w-xl">
            <div className="bg-[#252d44] p-3 w-fit text-primary">
              <BiCommentEdit size={20} />
            </div>
            <h3
              className={`${space_grotesk.className} mt-6 text-4xl text-slate-300 font-bold tracking-[-0.03em]`}
            >
              Inline Commenting
            </h3>
            <p
              className={`${inter.className} mt-6 text-base leading-8 text-slate-400`}
            >
              Experience the familiar precision of GitHub-style reviews. Pin
              comments to specific lines, suggest diffs, and track resolution
              status in real-time. It&apos;s the PR experience, optimized for
              learning.
            </p>
          </div>

          <div
            className={`rounded-[1.2rem] p-4 sm:p-5 ${jetbrains_mono.className}`}
          >
            <div className="rounded-2xl border border-white/8 bg-[#0d1019] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
              <div
                className={`mb-3 grid grid-cols-[2.5rem_1fr] gap-1 ${jetbrains_mono.className} text-[0.66rem] text-slate-500`}
              >
                <span className="text-right">12 |</span>
                <span>pub fn calculate_hash()</span>
                <span className="text-right">13 |</span>
                <span>let mut hasher = DefaultHasher::new();</span>
              </div>

              <div className="ml-10 bg-[#0c1624] p-4 border-l-4 border-primary">
                <div className="mb-2 flex items-center gap-2 text-[0.7em] font-semibold  text-primary">
                  <div className="rounded-full bg-[#232b41] py-1 px-2">
                    <span>JD</span>
                  </div>
                  <span className="text-primary">SeniorArchitect</span>
                </div>
                <p className="text-[0.7em] text-slate-300">
                  Consider using a non-cryptographic hasher here for 40% better
                  performance since we don't need collision resistance.
                </p>
              </div>

              <div className="mt-3 grid grid-cols-[2.5rem_1fr] gap-3 font-mono text-[0.66rem] text-slate-500">
                <span className="text-right">14 |</span>
                <span>dict.hash(&amp;mut hasher);</span>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`grid items-center gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] ${inter.className}`}
        >
          <div className="grid gap-5">
            <article className="rounded-xl p-5 bg-[#192036]">
              <div className="mb-3 flex items-center gap-3 text-[0.64rem] uppercase tracking-[0.18em] text-slate-400">
                <span className="font-mono text-primary">124</span>
                <span className=" bg-slate-800 rounded-md font-bold border border-white/8 px-2 py-1">
                  GOLANG
                </span>
                <span className="bg-slate-800 rounded-md font-bold border border-white/8 px-2 py-1">
                  ARCHITECTURE
                </span>
              </div>
              <div className="flex items-start justify-between gap-4">
                <p className="max-w-sm text-sm font-semibold text-slate-300">
                  Best practices for hexagonal architecture in Go?
                </p>
                <FiArrowUpRight className="mt-1 text-slate-500" />
              </div>
            </article>

            <article className="rounded-xl p-5 bg-[#1920369e]">
              <div className="mb-3 flex items-center gap-3 text-[0.64rem] uppercase tracking-[0.18em] text-slate-500">
                <span className="font-mono text-primary">42</span>
                <span className="bg-slate-800 rounded-md font-bold border border-white/8 px-2 py-1">
                  VUEJS
                </span>
              </div>
              <div className="flex items-start justify-between gap-4">
                <p className="max-w-sm text-sm font-semibold text-slate-300">
                  How to manage global state in Vue 3 without Vuex?
                </p>
                <FiArrowUpRight className="mt-1 text-slate-500" />
              </div>
            </article>
          </div>

          <div className="max-w-xl lg:justify-self-end">
            <div className="bg-[#252d44] p-3 w-fit text-primary">
              <BsQuestionSquareFill />
            </div>
            <h3
              className={`mt-6 text-4xl font-bold tracking-[-0.03em] ${space_grotesk.className} text-slate-300`}
            >
              Structured Q&amp;A
            </h3>
            <p
              className={`mt-6 text-base leading-8 text-slate-400 ${inter.className}`}
            >
              Leverage a community knowledge base that feels like Stack Overflow
              but is laser-focused on code architecture. Find proven solutions
              to common design patterns and anti-patterns.
            </p>
          </div>
        </div>

        <div
          className={`grid items-center gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] ${space_grotesk.className} `}
        >
          <div className="max-w-xl">
            <div className="bg-[#252d44] p-3 w-fit text-primary">
              <FiCode />
            </div>
            <h3 className="mt-6 text-4xl font-bold tracking-[-0.03em]">
              Reputation System
            </h3>
            <p className={`mt-6 text-base text-slate-400 ${inter.className}`}>
              Turn your expertise into social capital. Earn badges, unlock
              exclusive review tiers, and build a public portfolio of reviews
              that demonstrates your technical leadership.
            </p>
          </div>

          <div
            className={`rounded-[1.25rem] p-5 sm:p-6 lg:justify-self-end ${space_grotesk.className}`}
          >
            <div className="rounded-[1.2rem] border border-white/8 bg-linear-to-r from-[#1a2735] to-[#1c2534] p-4">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-sky-300/15 bg-linear-to-br from-[#153758] to-[#0f1d34] text-sm font-bold text-sky-100">
                  AR
                </div>
                <div>
                  <div className="text-lg font-semibold text-slate-300">
                    Alex Rivera
                  </div>
                  <div className="text-xs tracking-[0.18em] text-primary">
                    Lvl 8 Senior Architect
                  </div>
                </div>
              </div>

              <div
                className={`${inter.className} mt-5 grid gap-3 sm:grid-cols-2`}
              >
                <div className="rounded-2xl border border-white/8 bg-[#000000] px-5 py-2 items-center flex flex-col  justify-center">
                  <div className="text-xl font-bold tracking-[-0.04em] text-white">
                    2,480
                  </div>
                  <div className="text-[0.68rem] uppercase text-slate-500">
                    Total Rep
                  </div>
                </div>
                <div className="rounded-2xl border border-white/8 bg-black px-5 py-4 items-center flex flex-col justify-center">
                  <div className="text-xl font-bold tracking-[-0.04em] text-[#4ce4c8]">
                    142
                  </div>
                  <div className="text-[0.68rem] uppercase text-slate-500">
                    Expert Reviews
                  </div>
                </div>
              </div>

              <div
                className={` ${inter.className} mt-4 flex flex-wrap gap-2 text-[0.5em] font-semibold uppercase tracking-widest text-slate-200`}
              >
                <span className="rounded-full border border-white/8 bg-[#14253d] px-3 py-1.5">
                  Bug Hunter
                </span>
                <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1.5 text-cyan-200">
                  Performance Guru
                </span>
                <span className="rounded-full border border-white/8 bg-[#14253d] px-3 py-1.5">
                  Top 5% Reviewer
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-5xl gap-10 px-5 pb-24 pt-4 text-center sm:grid-cols-3 sm:px-8">
        {metrics.map((metric) => (
          <div key={metric.label}>
            <div
              className={`${space_grotesk.className} ${metric.className || "text-white"} text-5xl font-black tracking-[-0.05em]`}
            >
              {metric.value}
            </div>
            <div
              className={`${inter.className} text-slate-400 mt-2 text-[0.72rem] uppercase tracking-[0.28em]`}
            >
              {metric.label}
            </div>
          </div>
        ))}
      </section>

      <section className=" w-full max-w-6xl p-2 sm:px-8 bg-linear-to-t from-[#222A3D] rounded-4xl to-[#2D3449] mx-auto">
        <div className="overflow-hidden rounded-[1.8rem] px-6 py-16 text-center sm:px-10">
          <div className="mx-auto flex h-14 w-14 items-center justify-center  text-primary">
            <FiUsers className="text-xl font-extrabold" />
          </div>
          <h2
            className={`mx-auto max-w-xl text-3xl font-bold text-slate-300 sm:text-5xl ${space_grotesk.className}`}
          >
            Join the elite network of digital architects.
          </h2>
          <p
            className={`mx-auto mt-6 max-w-2xl text-sm font-light text-slate-300 ${inter.className}`}
          >
            Whether you&apos;re looking to level up your code or share your
            hard-earned wisdom, there&apos;s a place for you in the Hub.
          </p>
          <Link
            href="/register"
            role="button"
            className="mt-10 inline-block rounded-md border border-sky-300/70 bg-linear-to-r from-[#a4e4ff] to-[#79c6fb] px-7 py-3 text-sm font-semibold text-slate-950 shadow-[0_10px_24px_rgba(74,187,255,0.22)] transition hover:brightness-105"
          >
            Create Free Account
          </Link>
        </div>
      </section>
    </div>
  );
}
