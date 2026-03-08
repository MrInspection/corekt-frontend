import { ChevronLeftIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="grid h-screen grid-cols-1 gap-8 p-4 xl:grid-cols-3 xl:gap-12">
      <section>
        <Link href="/">
          <Button variant="ghost" className="absolute top-6 left-6" size="sm">
            <ChevronLeftIcon /> Back
          </Button>
        </Link>
        <div className="container relative flex h-full w-full max-w-md flex-col justify-center">
          {children}
        </div>
      </section>
      <section className="relative col-span-2 overflow-hidden rounded-4xl border bg-gray-100 p-16 shadow-xs max-xl:hidden">
        <h3 className="max-w-(--breakpoint-lg) font-semibold text-4xl tracking-tight">
          Hi, I'm your AI powered coherence tool, Corekt.
        </h3>
        <p className="mt-2.5 max-w-prose text-lg text-muted-foreground">
          I analyze your business deliverables, detect inconsistencies, and
          suggest precise improvements to enhance clarity and alignment.
        </p>
        <Image
          src="/product-image.png"
          alt="Corekt Brand"
          sizes="30"
          loading="lazy"
          width={0}
          height={0}
          className="absolute top-48 w-400! shrink-0 select-none"
        />
      </section>
    </main>
  );
}
