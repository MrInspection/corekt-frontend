import {
  ChevronRight,
  CircleAlertIcon,
  CircleDot,
  OctagonX,
  PlusIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Icons } from "@/features/shared/ui/icons";

function UploadIllustration() {
  return (
    <div className="relative pt-8">
      {/* Stack layers */}
      <div className="absolute inset-x-8 top-0 bottom-4 rounded-2xl border bg-background" />
      <div className="absolute inset-x-4 top-4 bottom-2 rounded-2xl border bg-background shadow-sm" />

      {/* Front card — mock interview transcript */}
      <div className="relative rounded-2xl border bg-card p-6 shadow-xs">
        {/* Document header */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icons.corekt className="size-5" />
            <span className="font-semibold text-sm">Corekt</span>
          </div>
          <span className="text-muted-foreground text-xs">
            Interview Transcript
          </span>
        </div>

        <h4 className="font-semibold text-sm leading-snug">
          Stakeholder Interview — TinyWallets Project
        </h4>
        <p className="mt-0.5 text-muted-foreground text-xs">
          Jan 14, 2026 · Vincent Dupont
        </p>

        {/* Fake transcript lines */}
        <div className="mt-4 space-y-2">
          {[
            {
              speaker: "Analyst",
              line: "Can you describe the main actors involved in the payment flow?",
            },
            {
              speaker: "Vincent",
              line: "Sure. The client initiates the transaction, the system validates it, and the responsible manager approves it.",
            },
            {
              speaker: "Analyst",
              line: "Is there an external system involved at any point?",
            },
            {
              speaker: "Vincent",
              line: "Yes, we have a third-party gateway that handles the actual processing.",
            },
          ].map(({ speaker, line }, i) => (
            <div key={i} className="text-xs">
              <span className="font-semibold">{speaker}: </span>
              <span className="text-muted-foreground">{line}</span>
            </div>
          ))}
        </div>

        {/* Fade out at the bottom */}
        <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-16 rounded-b-2xl bg-linear-to-t from-card to-transparent" />
      </div>
    </div>
  );
}

function AnalysisIllustration() {
  const artifacts = [
    { label: "BPMN Diagram", progress: 100, status: "done" },
    { label: "Interview Transcript", progress: 100, status: "done" },
    { label: "User Stories", progress: 72, status: "processing" },
    { label: "Data Model", progress: 0, status: "pending" },
  ];

  return (
    <div className="relative space-y-5 rounded-2xl border bg-card p-6 shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icons.corekt className="size-5" />
          <span className="font-semibold text-sm">
            Analyzing your deliverables...
          </span>
        </div>
        <span className="text-muted-foreground text-xs">2 of 4 complete</span>
      </div>

      {/* Artifact rows */}
      <div className="space-y-3">
        {artifacts.map(({ label, progress, status }) => (
          <div key={label} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                {status === "done" && (
                  <div className="flex size-4 items-center justify-center rounded-full bg-green-100">
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path
                        d="M1.5 4l1.5 1.5 3.5-3.5"
                        stroke="#16a34a"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
                {status === "processing" && (
                  <div className="size-4 animate-spin rounded-full border-2 border-brand-500 border-t-transparent" />
                )}
                {status === "pending" && (
                  <div className="size-4 rounded-full border-2 border-muted" />
                )}
                <span
                  className={
                    status === "pending"
                      ? "text-muted-foreground"
                      : "font-medium"
                  }
                >
                  {label}
                </span>
              </div>
              <span className="text-muted-foreground">
                {status === "done"
                  ? "Done"
                  : status === "processing"
                    ? `${progress}%`
                    : "Waiting"}
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  status === "done"
                    ? "bg-success-400"
                    : status === "processing"
                      ? "bg-brand-400"
                      : "bg-transparent"
                }`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Global progress */}
      <div className="space-y-1.5 border-t pt-4">
        <div className="flex justify-between text-muted-foreground text-xs">
          <span>Overall progress</span>
          <span>54%</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div className="h-full w-[54%] rounded-full bg-brand-500" />
        </div>
      </div>
    </div>
  );
}

function IssuesIllustration() {
  return (
    <div className="relative pt-8">
      <div className="absolute inset-x-8 top-0 bottom-4 rounded-2xl border border-dashed bg-background" />
      <div className="absolute inset-x-4 top-4 bottom-2 rounded-2xl border border-dashed bg-background shadow-sm" />
      <div className="relative space-y-2 rounded-2xl border border-dashed bg-card p-5 shadow-xs">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icons.corekt className="size-5" />
            <span className="font-semibold text-sm">TinyWallets</span>
          </div>
          <Badge variant="secondary" className="text-xs">
            Version #1
          </Badge>
        </div>

        {/* Main visible issue card */}
        <section className="rounded-2xl border bg-card shadow-xs">
          <div className="p-4">
            <p className="font-semibold text-sm">Missing actor coverage</p>
            <p className="mt-1 text-pretty text-muted-foreground text-xs">
              Actor "System" defined in the BPMN has no corresponding mention in
              the interview transcript.
            </p>
          </div>
          <div className="flex items-center justify-between rounded-b-2xl border-t bg-gray-50 px-4 py-3">
            <div className="flex items-center gap-1.5 text-error-500 text-sm">
              <OctagonX className="size-3.5" />
              <span className="font-medium text-xs">Critical Severity</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground text-xs">
              <span className="font-medium">Click to view</span>
              <ChevronRight className="size-3.5" />
            </div>
          </div>
        </section>

        {/* Stacked ghost cards */}
        <section className="rounded-2xl border bg-card opacity-60 shadow-xs">
          <div className="p-4">
            <p className="font-semibold text-sm">Low confidence link</p>
            <p className="mt-1 text-muted-foreground text-xs">
              User story US-04 is weakly linked to the BPMN flow with a
              confidence score below 70%.
            </p>
          </div>
          <div className="flex items-center justify-between rounded-b-2xl border-t bg-gray-50 px-4 py-3">
            <div className="flex items-center gap-1.5 text-warning-500">
              <CircleAlertIcon className="size-3.5" />
              <span className="font-medium text-xs">Major Severity</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground text-xs">
              <span className="font-medium">Click to view</span>
              <ChevronRight className="size-3.5" />
            </div>
          </div>
        </section>

        <section className="rounded-2xl border bg-card opacity-30 shadow-xs">
          <div className="p-4">
            <p className="font-semibold text-sm">Semantic mismatch</p>
            <p className="mt-1 text-muted-foreground text-xs">
              "Submit" in user stories and "Validate" in BPMN appear to describe
              the same action.
            </p>
          </div>
          <div className="flex items-center justify-between rounded-b-2xl border-t bg-gray-50 px-4 py-3">
            <div className="flex items-center gap-1.5 text-gray-500">
              <CircleDot className="size-3.5" />
              <span className="font-medium text-xs">Minor Severity</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground text-xs">
              <span className="font-medium">Click to view</span>
              <ChevronRight className="size-3.5" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export function HowItWorksSection() {
  return (
    <div className="container max-w-6xl px-6 py-16 sm:py-20">
      <div className="@container relative">
        <PlusIcon
          aria-hidden
          className="mask-radial-from-15% -translate-[calc(50%-0.5px)] absolute size-4 before:absolute before:inset-0 before:m-auto before:h-px before:bg-foreground/25 after:absolute after:inset-0 after:m-auto after:w-px after:bg-foreground/25"
        />
        <PlusIcon className="mask-radial-from-15% absolute right-0 bottom-0 size-4 translate-x-[calc(50%-0.5px)] translate-y-[calc(50%-0.5px)] before:absolute before:inset-0 before:m-auto before:h-px before:bg-foreground/25 after:absolute after:inset-0 after:m-auto after:w-px after:bg-foreground/25" />

        <div className="grid @3xl:grid-cols-3 grid-cols-1 @3xl:divide-x border">
          <div className="w-full @4xl:p-12 @xl:p-8 p-6">
            <h2 className="mb-6 text-balance font-semibold text-3xl text-foreground">
              Verify the coherence of your deliverables in minutes.
            </h2>
            <p className="text-lg text-muted-foreground">
              Upload your artifacts, run a coherence analysis, and get a
              detailed report with AI-powered suggestions to help you align your
              specifications and ship with confidence.
            </p>
          </div>
          <div className="relative col-span-2 divide-y *:p-6 @4xl:*:p-12 @xl:*:p-8">
            <div className="group space-y-6">
              <span className="flex size-7 items-center justify-center rounded-full bg-foreground/5 font-medium text-foreground text-sm">
                1
              </span>
              <h3 className="my-4 font-semibold text-lg">
                Upload your deliverables
              </h3>
              <p className="text-muted-foreground">
                Import your BPMN diagram, user stories, interview transcript,
                and data model. Corekt accepts standard formats and connects
                directly to Taiga for your user stories.
              </p>
              <UploadIllustration />
            </div>
            <div className="group space-y-6">
              <span className="flex size-7 items-center justify-center rounded-full bg-foreground/5 font-medium text-foreground text-sm">
                2
              </span>
              <h3 className="my-4 font-semibold text-lg">
                Run a coherence analysis
              </h3>
              <p className="text-muted-foreground">
                Corekt parses every artifact, cross-checks them against each
                other, and scores the overall coherence of your specification.
                The entire process completes in under two minutes.
              </p>
              <AnalysisIllustration />
            </div>
            <div className="group space-y-6">
              <span className="flex size-7 items-center justify-center rounded-full bg-foreground/5 font-medium text-foreground text-sm">
                3
              </span>
              <h3 className="my-4 font-semibold text-lg">Review and iterate</h3>
              <p className="text-muted-foreground">
                Explore the issues detected, sorted by severity. Each one comes
                with an AI-generated suggestion to help you fix it. Resolve
                them, run a new version, and watch your score improve.
              </p>
              <IssuesIllustration />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
