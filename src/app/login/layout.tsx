import { ChevronLeftIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="grid h-screen grid-cols-1 p-4 xl:grid-cols-3 xl:gap-12">
      <section className="relative flex items-center justify-center">
        <Link href="/" className="absolute top-0 left-0">
          <Button variant="ghost" size="sm">
            <ChevronLeftIcon /> Back
          </Button>
        </Link>
        <div className="w-full max-w-md max-2xl:px-4">{children}</div>
      </section>
      <section className="relative col-span-2 overflow-hidden rounded border bg-gray-100 p-14 shadow-xs max-xl:hidden">
        <h3 className="max-w-(--breakpoint-lg) font-semibold text-4xl tracking-tight">
          Hi, I'm your AI coherence tool, Corekt.
        </h3>
        <p className="mt-2.5 max-w-prose text-lg text-muted-foreground">
          I analyze your business deliverables, detect inconsistencies, and
          suggest precise improvements to enhance clarity and alignment.
        </p>
        <div className="absolute top-48 right-0 bottom-0 left-10">
          <Image
            src="/product-image.png"
            alt="Corekt product preview"
            fill
            priority
            sizes="(min-width: 1280px) 66vw, 0px"
            className="select-none object-cover object-top-left"
          />
        </div>
      </section>
    </main>
  );
}
