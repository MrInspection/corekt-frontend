import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CallToActionSection() {
  return (
    <div className="container flex max-w-6xl justify-between px-6 py-16 max-sm:justify-center max-md:flex-col max-md:gap-6 sm:py-20 md:items-center">
      <p className="bg-linear-to-r from-gray-900 to-gray-500 bg-clip-text font-medium text-4xl text-balance! text-transparent -tracking-2 md:text-5xl md:-tracking-3">
        With Corekt, nothing slips through.
      </p>
      <Link href="/login">
        <Button className="group cursor-pointer px-6" size="lg">
          Get started now{" "}
          <ChevronRight className="transition-transform duration-300 group-hover:translate-x-1" />
        </Button>
      </Link>
    </div>
  );
}
