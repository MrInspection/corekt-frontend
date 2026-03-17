import Image from "next/image";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t py-14">
      <div className="container max-w-6xl">
        <Link href="" className="w-fit">
          <Image
            src="/brand/corekt-logo.svg"
            alt="Corekt Logo"
            width={100}
            height={100}
            className="h-8 w-auto"
          />
        </Link>
        <nav className="mt-4 flex gap-6 border-b border-dotted pb-4">
          <p className="cursor-pointer text-muted-foreground text-sm hover:text-foreground hover:underline hover:underline-offset-4">
            Features
          </p>
          <p className="text-muted-foreground text-sm">Terms & Conditions</p>
          <p className="text-muted-foreground text-sm">Privacy Policy</p>
        </nav>
        <p className="mt-4 text-muted-foreground text-sm">
          Built by{" "}
          <a
            href="https://moussax.vercel.app"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            Moussax
          </a>
          . The source code is available on{" "}
          {/** biome-ignore lint/a11y/useValidAnchor: req */}
          <a href="#" className="font-medium underline underline-offset-4">
            GitHub
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
