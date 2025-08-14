import NavBar from "@/components/NavBar";
import Card from "@/components/Card";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { enrollWithPartners } from "@/lib/partners";
import { addEnrollment } from "@/lib/storage";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

// Utility to persist buyer's email between payment flow pages (pseudo-session)
function getBuyerEmail() {
  return localStorage.getItem("last_stripe_email") || "";
}
function clearBuyerEmail() {
  localStorage.removeItem("last_stripe_email");
}

// Create opt-out token (same as Index page)
function createToken(email: string, enrolledOn: string): string {
  return btoa(`${email}:::${enrolledOn}`);
}

// Fetch order from Supabase by session_id
async function getEmailBySessionId(sessionId: string): Promise<string | null> {
  // use the public anon key for client-side fetch
  const SUPABASE_URL = "https://ajrzhrecwjxcohabagus.supabase.co";
  const SUPABASE_ANON_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqcnpocmVjd2p4Y29oYWJhZ3VzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAwMDk2NTgsImV4cCI6MjA2NTU4NTY1OH0.ptv1yqk51ciyAH3LC-MNFeUUpdUXaoa5m-FtwZLDWJI";
  const resp = await fetch(
    `${SUPABASE_URL}/rest/v1/orders?select=email&stripe_session_id=eq.${encodeURIComponent(
      sessionId
    )}`,
    {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
    }
  );
  const data = await resp.json();
  if (Array.isArray(data) && data.length && data[0]?.email) {
    return data[0].email;
  }
  return null;
}

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<
    "pending" | "done" | "error" | "getting-email"
  >("pending");
  const [enrolled, setEnrolled] = useState(false);
  const [raffleId, setRaffleId] = useState("");
  const [email, setEmail] = useState("");
  const [enrolledOn, setEnrolledOn] = useState("");
  const didEnroll = useRef(false);

  useEffect(() => {
    if (didEnroll.current) return;
    didEnroll.current = true;

    async function resolveAndEnroll() {
      setStatus("pending");
      // 1. Try localstorage
      let userEmail = getBuyerEmail()?.trim();
      // 2. Try email param
      if (!userEmail) {
        userEmail = searchParams.get("email") || "";
      }
      // 3. Try session_id lookup if no email resolved yet
      if (!userEmail) {
        const sessionId = searchParams.get("session_id");
        if (sessionId) {
          setStatus("getting-email");
          userEmail = (await getEmailBySessionId(sessionId)) || "";
        }
      }

      if (!userEmail) {
        setStatus("error");
        return;
      }

      setStatus("pending");
      const enrollmentDate = new Date().toISOString();
      const partners = await enrollWithPartners(userEmail);
      const newRaffleId = Math.random().toString(36).slice(2, 10).toUpperCase();
      addEnrollment({
        email: userEmail,
        source: "thetop36-payment",
        enrolledOn: enrollmentDate,
        partners,
        raffleId: newRaffleId,
      });

      // Update the order in Supabase with the raffle_id
      const sessionId = searchParams.get("session_id");
      if (sessionId) {
        await supabase
          .from("orders")
          .update({ raffle_id: newRaffleId })
          .eq("stripe_session_id", sessionId);
      }

      setRaffleId(newRaffleId);
      setEmail(userEmail);
      setEnrolledOn(enrollmentDate);
      setEnrolled(true);
      setStatus("done");
      clearBuyerEmail();
      toast({
        title: "All set!",
        description:
          "You have been auto-enrolled in all partner platforms and your raffle entry is secured.",
      });
    }

    resolveAndEnroll();
  }, [searchParams]);

  return (
    <div>
      <NavBar />
      <main className="max-w-xl mx-auto pt-10">
        <Card>
          <h1 className="text-2xl font-bold mb-2">Payment Success!</h1>
          {status === "pending" && (
            <div className="mb-3">Syncing you with our partner ecosystem…</div>
          )}
          {status === "getting-email" && (
            <div className="mb-3">Verifying purchase…</div>
          )}
          {status === "done" && (
            <div>
              <div className="mb-3 text-green-700 font-semibold">
                Ecosystem sync complete!
              </div>
              <div className="mb-4">
                Thank you for your purchase.<br />
                <span>
                  <b>Check your email for asset bundle access.</b>
                  <br />
                  Raffle Entry ID:{" "}
                  <span className="bg-gray-100 px-2 rounded font-mono">{raffleId}</span>
                </span>
              </div>
              {email && enrolledOn && (
                <div className="mb-4 p-3 bg-gray-50 rounded border">
                  <div className="text-sm text-gray-600 mb-2">
                    <strong>Opt-out Information:</strong>
                  </div>
                  <div className="text-sm text-gray-600">
                    Want to opt-out after 45 days? Use this link:<br/>
                    <span className="font-mono text-xs break-all bg-white px-2 py-1 rounded border">
                      {window.location.origin}/optout?token={encodeURIComponent(createToken(email, enrolledOn))}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
          {status === "error" && (
            <div className="mb-4 text-red-600">
              Could not auto-enroll (missing email). Please return to home and try again.
            </div>
          )}
          <button
            className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded"
            onClick={() => navigate("/")}
          >
            Back to Home
          </button>
        </Card>
      </main>
    </div>
  );
}
