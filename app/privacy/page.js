// app/privacy/page.js
export const metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for ilovepdf.fun",
};

const Section = ({ title, children }) => (
  <div style={{ marginBottom: 28 }}>
    <h2 style={{ fontSize: 17, fontWeight: 600, marginBottom: 8, color: "#1A1614" }}>{title}</h2>
    <div style={{ fontSize: 14, color: "#6B6460", lineHeight: 1.8 }}>{children}</div>
  </div>
);

export default function PrivacyPage() {
  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: "48px 24px 80px" }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 6 }}>Privacy Policy</h1>
      <p style={{ fontSize: 13, color: "#A09890", marginBottom: 36 }}>
        Last updated: {new Date().toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })}
      </p>

      <div style={{ background: "#fff", border: "1px solid #EDE8E1", borderRadius: 16, padding: "28px 32px" }}>

        <Section title="1. In a nutshell">
          <p>
            ilovepdf.fun processes all files <strong>entirely in your browser</strong>.
            Your PDF files are <strong>never uploaded</strong> to our servers or any third-party servers.
            We have no access to your files at any time.
          </p>
        </Section>

        <Section title="2. Data we collect">
          <p>
            We do not collect any personal data. We do not use cookies beyond what is
            strictly necessary for the website to function. If you choose your language,
            that preference is stored in your browser&apos;s localStorage only.
          </p>
        </Section>

        <Section title="3. Google AdSense">
          <p>
            This website uses Google AdSense to display advertisements. Google AdSense may
            use cookies and similar technologies to show personalized ads based on your
            browsing behavior. For more information, see{" "}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer"
               style={{ color: "#E8452C" }}>
              Google&apos;s Privacy Policy
            </a>. You can opt out of personalized ads at{" "}
            <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer"
               style={{ color: "#E8452C" }}>
              google.com/settings/ads
            </a>.
          </p>
        </Section>

        <Section title="4. Your file processing">
          <p>
            All PDF processing is done locally using the open-source pdf-lib library.
            Files are loaded into your browser&apos;s memory, processed, and immediately
            offered for download. No file content is transmitted over the network.
          </p>
        </Section>

        <Section title="5. Hosting">
          <p>
            This website is hosted on Vercel. Vercel may collect standard server logs
            (IP addresses, timestamps, requested URLs) for operational purposes.
            See <a href="https://vercel.com/legal/privacy-policy" target="_blank"
                   rel="noopener noreferrer" style={{ color: "#E8452C" }}>
              Vercel&apos;s Privacy Policy
            </a>.
          </p>
        </Section>

        <Section title="6. Contact">
          <p>
            If you have any questions about this privacy policy, please contact us via
            the information provided on our <a href="/imprint" style={{ color: "#E8452C" }}>Imprint</a> page.
          </p>
        </Section>

      </div>
    </div>
  );
}
