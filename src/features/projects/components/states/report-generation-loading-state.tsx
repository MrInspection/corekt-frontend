import Image from "next/image";

export function ReportGenerationLoadingState() {
  return (
    <div className="container flex max-w-3xl flex-1 flex-col items-center justify-center">
      <Image
        src="/illustrations/key-issues.svg"
        alt="Key Issues Illustration"
        height={100}
        width={100}
        className="size-56"
      />
      <h2 className="font-medium text-4xl tracking-tight">
        Analyzing your deliverables...
      </h2>
      <p className="mt-4 max-w-prose text-pretty text-center text-lg text-muted-foreground">
        This may take a few minutes. We're processing your documents and
        generating a detailed report. Please keep this page open until the
        process is complete.
      </p>
    </div>
  );
}
