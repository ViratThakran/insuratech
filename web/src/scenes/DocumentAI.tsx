import { c, font, gutter, micro, shell, statement } from "../theme";
import { DocumentAIProductPreview } from "../components/DocumentAIProductPreview";
import { Plate } from "../components/Plate";
import { ScrollTrigger, gsap, useScene } from "../lib/motion";

/* ==========================================================================
   03 — DOCUMENT AI
   ==========================================================================
   A real fictional policy, set as a document rather than a UI card. Aurevia
   reads it: a clause is marked, the mark travels, the clause lifts off the
   page and lands as a structured field. When the page has been decomposed,
   the fields become the product.
   ========================================================================== */

type Clause = {
  /** the sentence as it appears in the policy */
  text?: (string | { t: string; lift: number })[];
  head?: string;
};

const policy: Clause[] = [
  { head: "Commercial Property Insurance Policy" },
  {
    text: [
      "This Policy is issued to ",
      { t: "Example Industries Limited", lift: 0 },
      " of Pune, Maharashtra, under policy number ",
      { t: "AV-PR-4021-A", lift: 1 },
      ".",
    ],
  },
  {
    text: [
      "The Period of Insurance is ",
      { t: "01 January 2026 to 01 January 2027", lift: 2 },
      ", both days inclusive, unless cancelled earlier in accordance with Section 9.",
    ],
  },
  { head: "Section 4 — Limits of liability" },
  {
    text: [
      "Coverage is provided for ",
      { t: "physical loss of or damage to the Property Insured", lift: 3 },
      " arising from an insured peril, up to a limit of ",
      { t: "₹65,00,00,000", lift: 4 },
      " in respect of any one occurrence, subject to a deductible of ",
      { t: "₹5,00,000", lift: 5 },
      " each and every claim.",
    ],
  },
  { head: "Endorsements" },
  {
    text: [
      "Endorsement 03 extends cover to flood and inundation within a sub-limit of ",
      { t: "₹15,00,00,000", lift: 6 },
      " in the aggregate. Wording CL-118 applies to all excluded perils.",
    ],
  },
];

const fields = [
  { key: "Insured", value: "Example Industries Ltd." },
  { key: "Policy number", value: "AV-PR-4021-A" },
  { key: "Policy period", value: "01 JAN 2026 → 01 JAN 2027" },
  { key: "Coverage", value: "Property damage" },
  { key: "Limit", value: "₹65,00,00,000", tone: "blue" as const },
  { key: "Deductible", value: "₹5,00,000" },
  { key: "Endorsement 03", value: "Flood sub-limit ₹15,00,00,000", tone: "copper" as const },
];

export function DocumentAI() {
  const ref = useScene<HTMLElement>(({ root, reduced }) => {
    if (reduced) {
      /* the read document beside the record it becomes: the frame that carries
         the whole idea without needing the scrub */
      gsap.set(root, { height: "100vh" });
      gsap.set(".d-page", { yPercent: 0, rotate: 0 });
      gsap.set(".d-field", { opacity: 1, x: 0 });
      gsap.set(".d-mark", { scaleX: 1 });
      return;
    }

    /* the product frame is dark: hand the navigation the right tone for it */
    ScrollTrigger.create({
      trigger: root,
      start: "82% top",
      /* through to the end of the section, not just the end of the pin, or the
         navigation flips back to the light tone on the last frame */
      end: "bottom top",
      onToggle: (self) => {
        root.dataset.tone = self.isActive ? "dark" : "paper";
      },
    });

    const tl = gsap.timeline({
      scrollTrigger: { trigger: root, start: "top top", end: "bottom bottom", scrub: 0.55 },
    });

    /* the page settles onto the desk */
    tl.fromTo(".d-page", { yPercent: 8, rotate: 0.6 }, { yPercent: 0, rotate: 0, duration: 1, ease: "power2.out" }, 0);

    /* each clause is marked, then lifts into the record */
    fields.forEach((_, i) => {
      const at = 0.9 + i * 0.6;
      tl.to(`.d-mark-${i}`, { scaleX: 1, duration: 0.28, ease: "power2.inOut" }, at)
        .to(`.d-lift-${i}`, { backgroundColor: "rgba(82,103,255,0.16)", duration: 0.2 }, at)
        .to(`.d-lift-${i}`, { color: c.onLightFaint, duration: 0.3 }, at + 0.35)
        .fromTo(
          `.d-field-${i}`,
          { opacity: 0, x: -14 },
          { opacity: 1, x: 0, duration: 0.35, ease: "power2.out" },
          at + 0.2
        );
    });

    const after = 0.9 + fields.length * 0.6;

    /* the page recedes, the record becomes the product */
    tl.to(".d-page", { opacity: 0.12, duration: 0.6 }, after)
      .to(".d-record", { yPercent: -6, opacity: 0.1, duration: 0.8 }, after + 0.4)
      .fromTo(
        ".d-product",
        { opacity: 0, yPercent: 10, scale: 0.94 },
        { opacity: 1, yPercent: 0, scale: 1, duration: 1.1, ease: "power3.out" },
        after + 0.5
      )
      .fromTo(".d-title", { opacity: 0 }, { opacity: 1, duration: 0.5 }, after + 0.9);
  });

  return (
    <section
      ref={ref}
      id="document-ai"
      data-scene
      data-tone="paper"
      className="mat"
      style={{ position: "relative", background: c.paper, height: "620vh" }}
    >
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>
        {/* the desk the page sits on */}
        <Plate
          asset="document"
          dark={false}
          position="50% 60%"
          style={{ position: "absolute", inset: 0, opacity: 0.5 }}
        />

        <div
          style={{
            position: "relative",
            height: "100%",
            maxWidth: shell,
            margin: "0 auto",
            padding: `clamp(84px, 12vh, 120px) ${gutter} clamp(40px, 6vh, 72px)`,
            display: "grid",
            gridTemplateColumns: "minmax(0, 7fr) minmax(0, 4fr)",
            gap: "clamp(20px, 3vw, 56px)",
            alignItems: "center",
          }}
          className="cols"
        >
          {/* ---------------- the document ---------------- */}
          <div
            className="d-page"
            style={{
              position: "relative",
              background: c.sheet,
              boxShadow: "0 60px 90px -60px rgba(9,11,14,0.6), 0 2px 0 rgba(255,255,255,0.7) inset",
              padding: "clamp(26px, 3.4vw, 54px)",
              maxHeight: "72vh",
              overflow: "hidden",
            }}
          >
            {policy.map((block, bi) =>
              block.head ? (
                <h3
                  key={bi}
                  style={{
                    fontFamily: font.sans,
                    fontSize: "clamp(0.78rem, 0.95vw, 0.92rem)",
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    margin: bi === 0 ? "0 0 22px" : "26px 0 12px",
                    paddingBottom: bi === 0 ? 14 : 0,
                    borderBottom: bi === 0 ? `1px solid ${c.hairLight}` : "none",
                    color: c.onLight,
                  }}
                >
                  {block.head}
                </h3>
              ) : (
                <p
                  key={bi}
                  style={{
                    fontFamily: font.serif,
                    fontSize: "clamp(0.88rem, 1.06vw, 1.02rem)",
                    lineHeight: 1.82,
                    color: c.onLight,
                    textAlign: "justify",
                    margin: "0 0 12px",
                  }}
                >
                  {block.text!.map((part, pi) =>
                    typeof part === "string" ? (
                      <span key={pi}>{part}</span>
                    ) : (
                      <span
                        key={pi}
                        className={`d-lift-${part.lift}`}
                        style={{ position: "relative", padding: "1px 2px", margin: "0 -2px" }}
                      >
                        {part.t}
                        <span
                          aria-hidden
                          className={`d-mark d-mark-${part.lift}`}
                          style={{
                            position: "absolute",
                            left: 0,
                            right: 0,
                            bottom: -1,
                            height: 1,
                            background: part.lift === 6 ? c.brass : c.blue,
                            transform: "scaleX(0)",
                            transformOrigin: "left",
                          }}
                        />
                      </span>
                    )
                  )}
                </p>
              )
            )}
          </div>

          {/* ---------------- the record it becomes ---------------- */}
          <div className="d-record" style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {fields.map((f, i) => (
              <div
                key={f.key}
                className={`d-field d-field-${i}`}
                style={{
                  opacity: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                  padding: "10px 0",
                  borderBottom: `1px solid ${c.hairLight}`,
                }}
              >
                <span style={{ ...micro, color: c.onLightMuted }}>{f.key}</span>
                <span
                  style={{
                    fontFamily: font.mono,
                    fontSize: "clamp(0.78rem, 0.95vw, 0.9rem)",
                    letterSpacing: "0.02em",
                    color: f.tone === "blue" ? c.blue : f.tone === "copper" ? c.brass : c.onLight,
                  }}
                >
                  {f.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ---------------- and then becomes the product ---------------- */}
        <div
          className="d-product"
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0,
            background: c.ink,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: `clamp(96px, 13vh, 140px) ${gutter} clamp(48px, 8vh, 90px)`,
          }}
        >
          <div style={{ maxWidth: shell, margin: "0 auto", width: "100%" }}>
            <h2
              className="d-title"
              style={{ ...statement(1.4, 2.6), color: c.onDark, opacity: 0, margin: "0 0 clamp(20px, 3vh, 34px)" }}
            >
              DOCUMENT AI
            </h2>
            <div
              style={{
                height: "min(58vh, 520px)",
                boxShadow: "0 60px 110px -60px rgba(0,0,0,0.9)",
              }}
            >
              <DocumentAIProductPreview focus="fields" />
            </div>
            <p style={{ ...micro, color: c.onDarkFaint, marginTop: 14 }}>
              Illustrative interface · example data
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
