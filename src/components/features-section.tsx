import {
  CircleAlertIcon,
  GitBranch,
  ListFilter,
  OctagonX,
  X,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Icons } from "@/features/shared/ui/icons";

function FilteringIllustration() {
  return (
    <div className="relative mt-6 -mr-6 -mb-6 flex flex-col rounded-tl-(--radius) border-t border-l sm:ml-6">
      <div className="absolute top-2 left-3 flex gap-1">
        <span className="block size-2 rounded-full border bg-muted" />
        <span className="block size-2 rounded-full border bg-muted" />
        <span className="block size-2 rounded-full border bg-muted" />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-6">
        {/* Mock FilterBar */}
        <div className="flex flex-wrap items-center gap-1.5">
          {/* Filter pill — Severity is Critical */}
          <div className="flex items-center overflow-hidden rounded-md border text-xs shadow-xs">
            <span className="border-r bg-muted/50 px-2 py-1 font-medium">
              Severity
            </span>
            <span className="border-r px-2 py-1 text-muted-foreground">is</span>
            <span className="flex items-center gap-1 px-2 py-1 font-medium text-red-500">
              <OctagonX className="size-3" /> Critical
            </span>
            <button className="border-l px-1.5 py-1 text-muted-foreground">
              <X className="size-2.5" />
            </button>
          </div>

          {/* Filter pill — Status is not resolved */}
          <div className="flex items-center overflow-hidden rounded-md border text-xs shadow-xs">
            <span className="border-r bg-muted/50 px-2 py-1 font-medium">
              Status
            </span>
            <span className="border-r px-2 py-1 text-muted-foreground">
              is not
            </span>
            <span className="px-2 py-1 font-medium">Resolved</span>
            <button className="border-l px-1.5 py-1 text-muted-foreground">
              <X className="size-2.5" />
            </button>
          </div>

          {/* Add filter ghost button */}
          <div className="flex items-center gap-1 rounded-md px-2 py-1 text-muted-foreground text-xs">
            <ListFilter className="size-3" /> Filter
          </div>

          <span className="ml-auto text-muted-foreground text-xs">Clear</span>
        </div>

        {/* Filtered issue rows */}
        <div className="mt-4 space-y-2">
          {["Missing actor coverage", "Undocumented flow detected"].map(
            (title) => (
              <div
                key={title}
                className="flex items-center justify-between rounded-xl border bg-card px-3 py-2.5 text-xs shadow-xs"
              >
                <span className="font-medium">{title}</span>
                <span className="flex items-center gap-1 font-medium text-red-500">
                  <OctagonX className="size-3" /> Critical
                </span>
              </div>
            ),
          )}
          <div className="flex items-center justify-between rounded-xl border bg-muted/30 px-3 py-2.5 text-xs opacity-40 shadow-xs">
            <span className="font-medium">Low confidence link</span>
            <span className="flex items-center gap-1 font-medium text-amber-500">
              <CircleAlertIcon className="size-3" /> Major
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function CompareVersionsIllustration() {
  return (
    <div className="relative mt-6 -mr-6 -mb-6 flex flex-col rounded-tl-(--radius) border-t border-l bg-gray-25 sm:ml-6">
      <div className="absolute top-2 left-3 flex gap-1">
        <span className="block size-2 rounded-full border bg-muted" />
        <span className="block size-2 rounded-full border bg-muted" />
        <span className="block size-2 rounded-full border bg-muted" />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-8">
        {/* Version selector row */}
        <div className="flex items-center gap-2 text-xs">
          <div className="flex items-center gap-1.5 rounded-md border bg-muted/50 px-2 py-1">
            <GitBranch className="size-3 text-muted-foreground" />
            <span className="font-medium">v1</span>
          </div>
          <span className="text-muted-foreground">vs</span>
          <div className="flex items-center gap-1.5 rounded-md border bg-muted/50 px-2 py-1">
            <GitBranch className="size-3 text-muted-foreground" />
            <span className="font-medium">v3</span>
          </div>
        </div>

        {/* Score delta */}
        <div className="flex items-center justify-between rounded-xl border bg-card px-4 py-3">
          <div className="text-center">
            <p className="text-muted-foreground text-xs">v1 Score</p>
            <p className="font-semibold text-lg">47</p>
          </div>
          <div className="flex flex-col items-center">
            <span className="rounded-full bg-success-100 px-2 py-0.5 font-semibold text-success-600 text-xs">
              ↑ +29
            </span>
            <span className="mt-0.5 text-muted-foreground text-xs">
              improvement
            </span>
          </div>
          <div className="text-center">
            <p className="text-muted-foreground text-xs">v3 Score</p>
            <p className="font-semibold text-lg">76</p>
          </div>
        </div>

        {/* Mini sparkline with tolerance zones */}
        <div className="rounded-xl border bg-card px-3 py-2">
          <p className="mb-2 text-muted-foreground text-xs">Score evolution</p>
          <svg viewBox="0 0 200 50" className="w-full" fill="none">
            {/* Zone bands — green (80-100), yellow (40-79), red (0-39) */}
            <rect
              x="0"
              y="0"
              width="200"
              height="10"
              fill="var(--color-success-100)"
              fillOpacity="0.6"
            />
            <rect
              x="0"
              y="10"
              width="200"
              height="20"
              fill="var(--color-warning-100)"
              fillOpacity="0.6"
            />
            <rect
              x="0"
              y="30"
              width="200"
              height="20"
              fill="var(--color-error-10)"
              fillOpacity="0.6"
            />

            {/* Area fill */}
            <path
              d="M10,43 L50,38 L90,30 L130,18 L170,12 L190,10 L190,50 L10,50 Z"
              fill="var(--color-brand-500)"
              fillOpacity="0.08"
            />

            {/* Line */}
            <polyline
              points="10,43 50,38 90,30 130,18 170,12 190,10"
              stroke="var(--color-brand-600)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Dots */}
            {(
              [
                [10, 43],
                [50, 38],
                [90, 30],
                [130, 18],
                [170, 12],
                [190, 10],
              ] as [number, number][]
            ).map(([x, y], i) => (
              <circle
                key={i}
                cx={x}
                cy={y}
                r="2.5"
                fill={
                  i === 0 || i === 2
                    ? "var(--color-brand-600)"
                    : "var(--color-brand-300)"
                }
                stroke="white"
                strokeWidth="1"
              />
            ))}

            {/* Highlight rings for compared versions (v1 = index 0, v3 = index 2) */}
            <circle
              cx="10"
              cy="43"
              r="5"
              stroke="var(--color-brand-600)"
              strokeWidth="1.5"
              fill="none"
            />
            <circle
              cx="90"
              cy="30"
              r="5"
              stroke="var(--color-brand-600)"
              strokeWidth="1.5"
              fill="none"
            />
          </svg>
          <div className="mt-1 flex justify-between text-muted-foreground text-xs">
            <span>v1</span>
            <span>v2</span>
            <span>v3</span>
            <span>v4</span>
            <span>v5</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FeaturesSection() {
  return (
    <div className="container max-w-6xl px-6 py-16 sm:py-20" id="features">
      <p className="bg-linear-to-r from-gray-900 to-gray-400 bg-clip-text pb-1 font-medium text-4xl text-balance! text-transparent -tracking-2 md:text-5xl md:-tracking-3">
        Jam-packed with features
      </p>
      <p className="mt-6 max-w-160.75 font-medium text-gray-600 text-lg md:text-xl">
        Everything you need to verify, iterate, and ship coherent functional
        specifications. No manual overhead, no missed inconsistencies.
      </p>

      <section className="mt-16 bg-gray-50">
        <div className="">
          <div className="relative">
            <div className="relative z-10 grid grid-cols-6 gap-3">
              {/* Card 1 — 100% traceable */}
              <Card className="relative col-span-full flex overflow-hidden lg:col-span-2">
                <CardContent className="relative m-auto size-fit pt-6">
                  <div className="relative flex h-24 w-56 items-center">
                    <svg
                      className="absolute inset-0 size-full text-muted"
                      viewBox="0 0 254 104"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M112.891 97.7022C140.366 97.0802 171.004 94.6715 201.087 87.5116C210.43 85.2881 219.615 82.6412 228.284 78.2473C232.198 76.3179 235.905 73.9942 239.348 71.3124C241.85 69.2557 243.954 66.7571 245.555 63.9408C249.34 57.3235 248.281 50.5341 242.498 45.6109C239.033 42.7237 235.228 40.2703 231.169 38.3054C219.443 32.7209 207.141 28.4382 194.482 25.534C184.013 23.1927 173.358 21.7755 162.64 21.2989C161.376 21.3512 160.113 21.181 158.908 20.796C158.034 20.399 156.857 19.1682 156.962 18.4535C157.115 17.8927 157.381 17.3689 157.743 16.9139C158.104 16.4588 158.555 16.0821 159.067 15.8066C160.14 15.4683 161.274 15.3733 162.389 15.5286C179.805 15.3566 196.626 18.8373 212.998 24.462C220.978 27.2494 228.798 30.4747 236.423 34.1232C240.476 36.1159 244.202 38.7131 247.474 41.8258C254.342 48.2578 255.745 56.9397 251.841 65.4892C249.793 69.8582 246.736 73.6777 242.921 76.6327C236.224 82.0192 228.522 85.4602 220.502 88.2924C205.017 93.7847 188.964 96.9081 172.738 99.2109C153.442 101.949 133.993 103.478 114.506 103.79C91.1468 104.161 67.9334 102.97 45.1169 97.5831C36.0094 95.5616 27.2626 92.1655 19.1771 87.5116C13.839 84.5746 9.1557 80.5802 5.41318 75.7725C-0.54238 67.7259 -1.13794 59.1763 3.25594 50.2827C5.82447 45.3918 9.29572 41.0315 13.4863 37.4319C24.2989 27.5721 37.0438 20.9681 50.5431 15.7272C68.1451 8.8849 86.4883 5.1395 105.175 2.83669C129.045 0.0992292 153.151 0.134761 177.013 2.94256C197.672 5.23215 218.04 9.01724 237.588 16.3889C240.089 17.3418 242.498 18.5197 244.933 19.6446C246.627 20.4387 247.725 21.6695 246.997 23.615C246.455 25.1105 244.814 25.5605 242.63 24.5811C230.322 18.9961 217.233 16.1904 204.117 13.4376C188.761 10.3438 173.2 8.36665 157.558 7.52174C129.914 5.70776 102.154 8.06792 75.2124 14.5228C60.6177 17.8788 46.5758 23.2977 33.5102 30.6161C26.6595 34.3329 20.4123 39.0673 14.9818 44.658C12.9433 46.8071 11.1336 49.1622 9.58207 51.6855C4.87056 59.5336 5.61172 67.2494 11.9246 73.7608C15.2064 77.0494 18.8775 79.925 22.8564 82.3236C31.6176 87.7101 41.3848 90.5291 51.3902 92.5804C70.6068 96.5773 90.0219 97.7419 112.891 97.7022Z"
                        fill="currentColor"
                      />
                    </svg>
                    <span className="mx-auto block w-fit font-semibold text-5xl">
                      100%
                    </span>
                  </div>
                  <h2 className="mt-6 text-center font-semibold text-3xl">
                    Traceable
                  </h2>
                </CardContent>
              </Card>

              {/* Card 2 — Bring your own Mistral key */}
              <Card className="relative col-span-full overflow-hidden sm:col-span-3 lg:col-span-2">
                <CardContent className="pt-6">
                  <div className="relative mx-auto flex aspect-square size-32 items-center justify-center rounded-full border border-border before:absolute before:-inset-2 before:rounded-full before:border before:border-border">
                    <Icons.mistral className="size-12" />
                  </div>
                  <div className="relative z-10 mt-6 space-y-2 text-center">
                    <h2 className="font-medium text-lg transition">
                      Bring your own key
                    </h2>
                    <p className="text-foreground">
                      Connect your Mistral API key to run unlimited analyses.
                      Your key is stored securely and used exclusively to power
                      your reports.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Card 3 — Under 2 minutes */}
              <Card className="relative col-span-full overflow-hidden sm:col-span-3 lg:col-span-2">
                <CardContent className="pt-6">
                  <div className="pt-6 lg:px-6">
                    <svg
                      className="w-full dark:text-muted-foreground"
                      viewBox="0 0 386 123"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="386" height="123" rx="10" />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M3 123C3 123 14.3298 94.153 35.1282 88.0957C55.9266 82.0384 65.9333 80.5508 65.9333 80.5508C65.9333 80.5508 80.699 80.5508 92.1777 80.5508C103.656 80.5508 100.887 63.5348 109.06 63.5348C117.233 63.5348 117.217 91.9728 124.78 91.9728C132.343 91.9728 142.264 78.03 153.831 80.5508C165.398 83.0716 186.825 91.9728 193.761 91.9728C200.697 91.9728 206.296 63.5348 214.07 63.5348C221.844 63.5348 238.653 93.7771 244.234 91.9728C249.814 90.1684 258.8 60 266.19 60C272.075 60 284.1 88.057 286.678 88.0957C294.762 88.2171 300.192 72.9284 305.423 72.9284C312.323 72.9284 323.377 65.2437 335.553 63.5348C347.729 61.8259 348.218 82.07 363.639 80.5508C367.875 80.1335 372.949 82.2017 376.437 87.1008C379.446 91.3274 381.054 97.4325 382.521 104.647C383.479 109.364 382.521 123 382.521 123"
                        fill="url(#paint0_linear_features)"
                      />
                      <path
                        className="text-primary-600 dark:text-primary-500"
                        d="M3 121.077C3 121.077 15.3041 93.6691 36.0195 87.756C56.7349 81.8429 66.6632 80.9723 66.6632 80.9723C66.6632 80.9723 80.0327 80.9723 91.4656 80.9723C102.898 80.9723 100.415 64.2824 108.556 64.2824C116.696 64.2824 117.693 92.1332 125.226 92.1332C132.759 92.1332 142.07 78.5115 153.591 80.9723C165.113 83.433 186.092 92.1332 193 92.1332C199.908 92.1332 205.274 64.2824 213.017 64.2824C220.76 64.2824 237.832 93.8946 243.39 92.1332C248.948 90.3718 257.923 60.5 265.284 60.5C271.145 60.5 283.204 87.7182 285.772 87.756C293.823 87.8746 299.2 73.0802 304.411 73.0802C311.283 73.0802 321.425 65.9506 333.552 64.2824C345.68 62.6141 346.91 82.4553 362.27 80.9723C377.629 79.4892 383 106.605 383 106.605"
                        stroke="currentColor"
                        strokeWidth="3"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_features"
                          x1="3"
                          y1="60"
                          x2="3"
                          y2="123"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop
                            className="text-brand-900/15"
                            stopColor="currentColor"
                          />
                          <stop
                            className="text-transparent"
                            offset="1"
                            stopColor="currentColor"
                            stopOpacity="0.103775"
                          />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <div className="relative z-10 mt-14 space-y-2 text-center">
                    <h2 className="font-medium text-lg transition">
                      Under 3 minutes
                    </h2>
                    <p className="text-foreground">
                      From upload to full coherence report in under three
                      minutes. No waiting, no manual steps.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Card 4 — Precision filtering */}
              <Card className="card variant-outlined relative col-span-full overflow-hidden lg:col-span-3">
                <CardContent className="grid pt-6 sm:grid-cols-2">
                  <div className="relative z-10 flex flex-col justify-between space-y-12 lg:space-y-6">
                    <div className="relative flex aspect-square size-12 rounded-full border border-border before:absolute before:-inset-2 before:rounded-full before:border before:border-border">
                      <ListFilter className="m-auto size-5" />
                    </div>
                    <div className="space-y-2">
                      <h2 className="font-medium text-lg text-zinc-800 transition dark:text-white">
                        Precision filtering
                      </h2>
                      <p className="text-foreground">
                        Filter issues by severity, status, or artifact type.
                        Combine multiple conditions to focus on exactly what
                        needs your attention.
                      </p>
                    </div>
                  </div>
                  <FilteringIllustration />
                </CardContent>
              </Card>

              {/* Card 5 — Track your progress */}
              <Card className="card variant-outlined relative col-span-full overflow-hidden lg:col-span-3">
                <CardContent className="grid h-full pt-6 sm:grid-cols-2">
                  <div className="relative z-10 flex flex-col justify-between space-y-12 lg:space-y-6">
                    <div className="relative flex aspect-square size-12 rounded-full border border-border before:absolute before:-inset-2 before:rounded-full before:border before:border-border">
                      <GitBranch className="m-auto size-5" />
                    </div>
                    <div className="space-y-2">
                      <h2 className="font-medium text-lg transition">
                        Track your progress
                      </h2>
                      <p className="text-foreground">
                        Compare any two versions side by side. See your score
                        delta, resolved issues, and how your specification has
                        evolved over time.
                      </p>
                    </div>
                  </div>
                  <CompareVersionsIllustration />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
