import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site.config";

export function SiteFooter() {
  const navItems = [
    {
      label: "Features",
      href: "/#features",
    },
    {
      label: "Terms & Conditions",
      href: "/legal/terms-and-conditions",
    },
    {
      label: "Privacy Policy",
      href: "/legal/privacy-policy",
    },
  ];

  return (
    <footer className="border-t py-14">
      <div className="container max-w-6xl">
        <Link href="/" className="w-fit">
          <Image
            src="/brand/corekt-logo.svg"
            alt="Corekt Logo"
            width={100}
            height={100}
            className="h-8 w-auto"
          />
        </Link>
        <nav className="mt-4 flex gap-6 border-b border-dotted pb-4">
          {navItems.map((item, index) => (
            <Link href={item.href} key={index}>
              <p className="text-muted-foreground text-sm hover:text-foreground hover:underline hover:underline-offset-4">
                {item.label}
              </p>
            </Link>
          ))}
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
          <a
            href={siteConfig.repositoryUrl}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            GitHub
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
