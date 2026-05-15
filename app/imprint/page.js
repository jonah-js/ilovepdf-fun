// app/imprint/page.js
export const metadata = {
  title: "Imprint / Impressum",
  description: "Legal information about ilovepdf.fun",
};

export default function ImprintPage() {
  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "48px 24px 80px" }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Imprint</h1>
      <p style={{ fontSize: 14, color: "#6B6460", marginBottom: 32 }}>
        Pflichtangaben gemäß § 5 TMG (Germany)
      </p>

      <div style={{
        background: "#fff",
        border: "1px solid #EDE8E1",
        borderRadius: 16,
        padding: "28px 32px",
        lineHeight: 1.8,
        fontSize: 14,
        color: "#1A1614",
      }}>
        {/*
          ──────────────────────────────────────────────────
          FILL IN YOUR DETAILS BELOW.
          This is legally required to run a website in Germany.
          ──────────────────────────────────────────────────
        */}
        <p><strong>Name:</strong> [Your Full Name]</p>
        <p><strong>Address:</strong> [Your Street and Number]</p>
        <p><strong>City:</strong> [ZIP Code, City, Country]</p>
        <p><strong>Email:</strong> [your@email.com]</p>
        <br />
        <p style={{ fontSize: 13, color: "#A09890" }}>
          Responsible for content according to § 55 Abs. 2 RStV:<br />
          [Your Full Name], [Your Address]
        </p>
      </div>
    </div>
  );
}
