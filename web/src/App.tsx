const policies = [
  { id: "POL-1043", holder: "Aarti Sharma", type: "Auto", premium: "$142/mo", status: "Active" },
  { id: "POL-1044", holder: "Daniel Moore", type: "Home", premium: "$98/mo", status: "Active" },
  { id: "POL-1045", holder: "Lin Wei", type: "Health", premium: "$310/mo", status: "Pending" },
  { id: "POL-1046", holder: "Sofia Rossi", type: "Travel", premium: "$24/mo", status: "Lapsed" },
];

const stats = [
  { label: "Active policies", value: "1,284" },
  { label: "Open claims", value: "37" },
  { label: "Premium written", value: "$4.2M" },
  { label: "Retention", value: "92%" },
];

const statusColor: Record<string, string> = {
  Active: "#0f766e",
  Pending: "#b45309",
  Lapsed: "#b91c1c",
};

export default function App() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <header
        style={{
          background: "#ffffff",
          borderBottom: "1px solid #e2e8f0",
          padding: "20px 32px",
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: "#0f766e",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
          }}
        >
          I
        </div>
        <strong style={{ fontSize: 18 }}>InsuraTech</strong>
        <span style={{ marginLeft: "auto", fontSize: 14, color: "#64748b" }}>
          Operations dashboard
        </span>
      </header>

      <main
        style={{
          width: "100%",
          maxWidth: 1080,
          margin: "0 auto",
          padding: "32px",
          display: "flex",
          flexDirection: "column",
          gap: 32,
        }}
      >
        <section style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <h1 style={{ margin: 0, fontSize: 28 }}>Portfolio overview</h1>
          <p style={{ margin: 0, color: "#64748b" }}>
            Live snapshot of policies, claims and written premium.
          </p>
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 16,
          }}
        >
          {stats.map((s) => (
            <div
              key={s.label}
              style={{
                background: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: 12,
                padding: 20,
                display: "flex",
                flexDirection: "column",
                gap: 6,
              }}
            >
              <span style={{ fontSize: 13, color: "#64748b" }}>{s.label}</span>
              <strong style={{ fontSize: 24 }}>{s.value}</strong>
            </div>
          ))}
        </section>

        <section style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <h2 style={{ margin: 0, fontSize: 20 }}>Recent policies</h2>
          <div
            style={{
              background: "#fff",
              border: "1px solid #e2e8f0",
              borderRadius: 12,
              overflow: "hidden",
            }}
          >
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
              <thead>
                <tr style={{ background: "#f8fafc", color: "#475569", textAlign: "left" }}>
                  <th style={{ padding: "12px 20px" }}>Policy</th>
                  <th style={{ padding: "12px 20px" }}>Holder</th>
                  <th style={{ padding: "12px 20px" }}>Type</th>
                  <th style={{ padding: "12px 20px" }}>Premium</th>
                  <th style={{ padding: "12px 20px" }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {policies.map((p) => (
                  <tr key={p.id} style={{ borderTop: "1px solid #e2e8f0" }}>
                    <td style={{ padding: "12px 20px", fontVariantNumeric: "tabular-nums" }}>
                      {p.id}
                    </td>
                    <td style={{ padding: "12px 20px" }}>{p.holder}</td>
                    <td style={{ padding: "12px 20px" }}>{p.type}</td>
                    <td style={{ padding: "12px 20px" }}>{p.premium}</td>
                    <td style={{ padding: "12px 20px", color: statusColor[p.status] }}>
                      {p.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
