import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getUser } from "@/lib/auth-session";

export async function SiteHeader() {
  const user = await getUser();

  return (
    <header className="sticky top-0 z-50 border-b border-dashed bg-background/90 backdrop-blur">
      <div className="container flex h-16 max-w-6xl items-center justify-between">
        <Link href="/" className="w-fit">
          <Image
            src="/brand/corekt-brand.svg"
            alt="Corekt Logo"
            width={100}
            height={100}
            className="h-6 w-auto select-none"
            draggable={false}
          />
        </Link>
        {user ? (
          <Link href="/dashboard">
            <Button className="cursor-pointer px-4">
              Dashboard <ChevronRight />
            </Button>
          </Link>
        ) : (
          <Link href="/login">
            <Button className="cursor-pointer px-4">
              Get started <ChevronRight />
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
}
