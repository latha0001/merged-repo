
import NavBar from "@/components/NavBar";
import Card from "@/components/Card";
import { useEffect, useState } from "react";
import { getEnrollments, removeEnrollment, optOut, isOptedOut } from "@/lib/storage";
import { useSearchParams } from "react-router-dom";

function parseToken(token: string) {
  try {
    const [email, enrolledOn] = atob(token).split(':::');
    return { email, enrolledOn };
  } catch {
    return { email: "", enrolledOn: "" };
  }
}

function daysSince(date: string) {
  const from = new Date(date);
  const now = new Date();
  const ms = now.getTime() - from.getTime();
  return Math.floor(ms / 864e5);
}

export default function OptOut() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<"checking"|"too-early"|"can-optout"|"done"|"not-found">("checking");
  const [email, setEmail] = useState("");
  const [daysLeft, setDaysLeft] = useState(45);

  useEffect(() => {
    const token = searchParams.get("token") || "";
    if (!token) { setStatus("not-found"); return; }
    const { email, enrolledOn } = parseToken(token);
    setEmail(email);

    const entry = getEnrollments().find(e => e.email === email && e.enrolledOn === enrolledOn);
    if (!entry) { setStatus("not-found"); return; }

    const since = daysSince(enrolledOn);
    if (since < 45) {
      setStatus("too-early");
      setDaysLeft(45 - since);
    } else if (isOptedOut(email)) {
      setStatus("done");
    } else {
      setStatus("can-optout");
    }
  }, [searchParams]);

  function handleOptOut() {
    removeEnrollment(email);
    optOut(email);
    setStatus("done");
  }

  return (
    <div>
      <NavBar />
      <main className="max-w-2xl mx-auto pt-10">
        <Card>
          {status === "checking" && <div>Loading...</div>}
          {status === "not-found" && <div className="text-red-600">Invalid or expired opt-out link.</div>}
          {status === "too-early" && (
            <div>
              <div className="font-bold text-xl mb-2">Lock-in Period Active!</div>
              <div>You may opt-out after your 45-day enrollment ends.</div>
              <div className="mt-2">Time remaining: <span className="font-mono">{daysLeft} day(s)</span></div>
            </div>
          )}
          {status === "done" && (
            <div>
              <div className="font-bold text-xl mb-2">You have been opted out.</div>
              <div>You will not receive partner communications and your raffle entry is removed.</div>
            </div>
          )}
          {status === "can-optout" && (
            <div>
              <div className="font-bold text-xl mb-2">Opt-Out Eligible</div>
              <div>Click below to opt-out, remove from partners, and void your raffle entry.</div>
              <button
                onClick={handleOptOut}
                className="mt-4 px-6 py-2 bg-red-600 text-white rounded font-semibold hover:bg-red-700 transition"
              >
                Opt Out Now
              </button>
            </div>
          )}
        </Card>
      </main>
    </div>
  );
}
