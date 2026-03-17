import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <>
      <div className="container max-w-6xl px-6 pt-20 sm:pt-24">
        <h1 className="max-w-(--breakpoint-sm) text-balance font-medium text-4xl -tracking-2 md:text-5xl md:-tracking-3">
          Coherence, down to the last detail.
        </h1>
        <p className="mt-6 max-w-160.75 font-medium text-gray-600 text-lg md:text-xl">
          Corekt automatically cross-checks your deliverables. It surfaces every
          inconsistency, scores your coherence, and guides you toward a
          complete, reliable specification.
        </p>
        <div className="mt-8 inline-flex gap-8">
          <Link href="/login">
            <Button className="group cursor-pointer px-6" size="lg">
              Get started now{" "}
              <ChevronRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
      <div className="container max-w-8xl pb-16 sm:pb-20">
        <div className="perspective-distant flex justify-center">
          <div className="mask-b-from-55% mask-b-to-100% mask-r-from-75% w-full rotate-x-20 skew-x-12 pt-6 pl-6 lg:h-176">
            <Image
              className="rounded-(--radius) border shadow-xl"
              src="/product-preview.png"
              alt="Corekt product showcase"
              width={2880}
              height={2074}
            />
          </div>
        </div>
      </div>
    </>
  );
}
