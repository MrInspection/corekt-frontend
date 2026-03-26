import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Corekt",
  description:
    "Legal terms and conditions governing the use of the Corekt application.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="w-full max-w-4xl px-6 container my-20">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center">
        <h1 className="mt-3 text-center text-4xl">Privacy Policy</h1>
        <p className="mt-3 text-center text-sm md:text-base">
          How we collect, use, and protect your information.
        </p>
      </div>

      {/* Content */}
      <div className="mt-20 mb-28">
        <section className="my-8">
          <h2 className="font-medium text-xl tracking-tight">
            1. Introduction
          </h2>
          <p className="mt-3 text-muted-foreground">
            Corekt Labs ("we", "our", "us") is committed to protecting
            your privacy. This Privacy Policy describes how we handle personal
            information when you use our website and services.
          </p>
        </section>

        <section className="my-8">
          <h2 className="font-medium text-xl tracking-tight">
            2. Information We Collect
          </h2>
          <p className="mt-3 text-muted-foreground">
            We may collect information you provide directly (such as account
            details or content you submit) and information collected
            automatically (such as device, usage, and cookie data).
          </p>
        </section>

        <section className="my-8">
          <h2 className="font-medium text-xl tracking-tight">
            3. How We Use Information
          </h2>
          <p className="mt-3 text-muted-foreground">
            We use information to operate and improve our services, personalize
            your experience, communicate with you, ensure security, and comply
            with legal obligations.
          </p>
        </section>

        <section className="my-8">
          <h2 className="font-medium text-xl tracking-tight">
            4. Cookies and Similar Technologies
          </h2>
          <p className="mt-3 text-muted-foreground">
            We use cookies and similar technologies to provide core
            functionality, remember preferences, and analyze usage. You can
            control cookies via your browser settings.
          </p>
        </section>

        <section className="my-8">
          <h2 className="font-medium text-xl tracking-tight">
            5. Data Sharing
          </h2>
          <p className="mt-3 text-muted-foreground">
            We may share information with service providers who help us operate
            the website, and as required by law. We do not sell your personal
            information.
          </p>
        </section>

        <section className="my-8">
          <h2 className="font-medium text-xl tracking-tight">
            6. Data Retention
          </h2>
          <p className="mt-3 text-muted-foreground">
            We retain personal information only as long as necessary for the
            purposes described in this policy or as required by law.
          </p>
        </section>

        <section className="my-8">
          <h2 className="font-medium text-xl tracking-tight">7. Security</h2>
          <p className="mt-3 text-muted-foreground">
            We implement reasonable safeguards to protect information. However,
            no method of transmission or storage is completely secure, and we
            cannot guarantee absolute security.
          </p>
        </section>

        <section className="my-8">
          <h2 className="font-medium text-xl tracking-tight">8. Your Rights</h2>
          <p className="mt-3 text-muted-foreground">
            Depending on your location, you may have rights such as access,
            correction, deletion, and objection. To exercise rights, contact us
            using the details provided below.
          </p>
        </section>

        <section className="my-8">
          <h2 className="font-medium text-xl tracking-tight">
            9. Changes to This Policy
          </h2>
          <p className="mt-3 text-muted-foreground">
            We may update this Privacy Policy from time to time. Material
            changes will be indicated by updating the effective date. Your
            continued use of the website after changes become effective
            constitutes acceptance of the updated policy.
          </p>
        </section>

        <section className="my-8">
          <h2 className="font-medium text-xl tracking-tight">10. Contact Us</h2>
          <p className="mt-3 text-muted-foreground">
            If you have questions about this Privacy Policy, please contact us
            via our official channels listed on the website.
          </p>
        </section>
      </div>
    </main>
  );
}
