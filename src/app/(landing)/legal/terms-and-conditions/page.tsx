import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description:
    "Legal terms governing the use of the Corekt platform and its services.",
};

export default function TermsAndConditionsPage() {
  return (
    <main className="w-full max-w-4xl px-6 md:mx-auto my-20">
      {/* Hero */}
      <div className="flex flex-col items-center justify-center">
        <h1 className="mt-3 text-center text-4xl">Terms and Conditions</h1>
        <p className="mt-3 text-center text-sm md:text-base">
          Legal terms governing your use of the Corekt platform.
        </p>
      </div>

      {/* Content */}
      <div className="mt-20 mb-28">

        <section className="my-8">
          <h2 className="font-medium text-xl tracking-tight">
            1. Acceptance of Terms
          </h2>
          <p className="mt-3 text-muted-foreground">
            By accessing or using Corekt, you agree to be bound by these Terms.
            If you do not agree, you must not use the platform.
          </p>
        </section>

        <section className="my-8">
          <h2 className="font-medium text-xl tracking-tight">
            2. Services Overview
          </h2>
          <p className="mt-3 text-muted-foreground">
            Corekt provides tools for data validation, comparison, and analysis,
            including AI-assisted matching, discrepancy detection, and
            integrations with external systems. Features may evolve over time.
          </p>
        </section>

        <section className="my-8">
          <h2 className="font-medium text-xl tracking-tight">
            3. Changes to These Terms
          </h2>
          <p className="mt-3 text-muted-foreground">
            We may update these Terms at any time. Continued use of the platform
            after changes become effective constitutes acceptance of the updated
            Terms.
          </p>
        </section>

        <section className="my-8">
          <h2 className="font-medium text-xl tracking-tight">
            4. Eligibility and Accounts
          </h2>
          <p className="mt-3 text-muted-foreground">
            You must be legally capable of entering into a binding agreement.
            You are responsible for maintaining the confidentiality of your
            account credentials and all activity under your account.
          </p>
        </section>

        <section className="my-8">
          <h2 className="font-medium text-xl tracking-tight">
            5. Acceptable Use
          </h2>
          <p className="mt-3 text-muted-foreground">
            You agree not to misuse the platform, including attempting
            unauthorized access, reverse engineering, interfering with system
            integrity, or using the service in violation of applicable laws.
          </p>
        </section>

        <section className="my-8">
          <h2 className="font-medium text-xl tracking-tight">
            6. Data Usage and Responsibility
          </h2>
          <p className="mt-3 text-muted-foreground">
            You retain ownership of the data you submit. You are responsible for
            ensuring you have the rights to process such data. Corekt processes
            data solely to provide its services and does not claim ownership.
          </p>
        </section>

        <section className="my-8">
          <h2 className="font-medium text-xl tracking-tight">
            7. Intellectual Property
          </h2>
          <p className="mt-3 text-muted-foreground">
            All platform components, including software, algorithms, and design,
            are owned by Corekt or its licensors. You may not reproduce,
            distribute, or create derivative works without prior authorization.
          </p>
        </section>

        <section className="my-8">
          <h2 className="font-medium text-xl tracking-tight">
            8. Third-Party Services
          </h2>
          <p className="mt-3 text-muted-foreground">
            The platform may integrate with third-party services. Corekt is not
            responsible for their availability, security, or practices.
          </p>
        </section>

        <section className="my-8">
          <h2 className="font-medium text-xl tracking-tight">
            9. Disclaimer of Warranties
          </h2>
          <p className="mt-3 text-muted-foreground">
            The platform is provided “as is” and “as available” without
            warranties of any kind, including accuracy of results, uninterrupted
            operation, or fitness for a particular purpose.
          </p>
        </section>

        <section className="my-8">
          <h2 className="font-medium text-xl tracking-tight">
            10. Limitation of Liability
          </h2>
          <p className="mt-3 text-muted-foreground">
            To the fullest extent permitted by law, Corekt shall not be liable
            for indirect, incidental, or consequential damages, including loss
            of data or business interruption.
          </p>
        </section>

        <section className="my-8">
          <h2 className="font-medium text-xl tracking-tight">
            11. Indemnification
          </h2>
          <p className="mt-3 text-muted-foreground">
            You agree to indemnify and hold harmless Corekt from any claims,
            damages, or liabilities arising from your use of the platform or
            violation of these Terms.
          </p>
        </section>

        <section className="my-8">
          <h2 className="font-medium text-xl tracking-tight">
            12. Termination
          </h2>
          <p className="mt-3 text-muted-foreground">
            We may suspend or terminate access at any time if you breach these
            Terms or use the platform in a harmful manner.
          </p>
        </section>

        <section className="my-8">
          <h2 className="font-medium text-xl tracking-tight">
            13. Governing Law
          </h2>
          <p className="mt-3 text-muted-foreground">
            These Terms are governed by applicable laws in your jurisdiction,
            subject to mandatory consumer protections.
          </p>
        </section>

        <section className="my-8">
          <h2 className="font-medium text-xl tracking-tight">
            14. Contact
          </h2>
          <p className="mt-3 text-muted-foreground">
            For any questions regarding these Terms, please contact us through
            official channels provided on the platform.
          </p>
        </section>

      </div>
    </main>
  );
}
