import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LoginForm } from "@/features/auth/components/login-form";
import { getUser } from "@/lib/auth-session";

export const metadata: Metadata = {
  title: "Sign In - Corekt",
  description: "Sign in to your account to continue using Corekt",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function LoginPage() {
  const user = await getUser();
  if (user) redirect("/dashboard");

  return <LoginForm />;
}
