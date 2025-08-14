import NavBar from "@/components/NavBar";
import Card from "@/components/Card";

// You can update these terms as needed.
const TERMS = `
# Terms of Purchase

By purchasing an asset bundle on TheTop36.com you agree to:

- Immediate access to knowledge assets and digital goods.
- Automatic enrollment in select partner services for 45 days ("lock-in").
- Entry into micro-lottery raffle(s), one entry per purchase.

_Winners will be selected fairly and contacted via email within one week of draw closure. See detailed rules below._

## Micro-Lottery Raffle Rules

1. Each eligible purchase grants a single raffle entry.
2. Drawing takes place after the 45-day cycle ends.
3. Only purchasers who remain enrolled throughout period are eligible for the draw.
4. No purchase = no entry.

## Opt-Out Policy

- Opt-out is available only after 45 days.
- Use your personal email link to request removal.
`;

export default function Terms() {
  return (
    <div>
      <NavBar />
      <main className="max-w-2xl mx-auto pt-10">
        <Card>
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{
              __html: TERMS.replace(/\n/g, "<br/>"),
            }}
          />
        </Card>
      </main>
    </div>
  );
}
