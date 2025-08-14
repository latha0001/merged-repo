import React, { useState } from "react";
import Card from "@/components/Card";
import NavBar from "@/components/NavBar";
import { enrollWithPartners } from "@/lib/partners";
import { addEnrollment } from "@/lib/storage";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

function createToken(email: string, enrolledOn: string): string {
  // Not secure, just for mock/demo
  return btoa(`${email}:::${enrolledOn}`);
}

const PRIZE = {
  name: "Luxury Gift Bundle",
  value: "Up to $2,500",
  description: "Curated eco-friendly products & premium digital assets.",
};

export default function Index() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [enrolled, setEnrolled] = useState(false);
  const [raffleId, setRaffleId] = useState("");
  const [partners, setPartners] = useState<string[]>([]);
  const navigate = useNavigate();
  const [buyLoading, setBuyLoading] = useState(false);

  const handleBuy = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const enrolledOn = new Date().toISOString();
    const newRaffleId = Math.random().toString(36).slice(2,10).toUpperCase();
    const partnerList = await enrollWithPartners(email);
    addEnrollment({
      email,
      source: "thetop36",
      enrolledOn,
      partners: partnerList,
      raffleId: newRaffleId
    });
    setEnrolled(true);
    setPartners(partnerList);
    setRaffleId(newRaffleId);
    setLoading(false);
    toast({
      title: "Enrollment Success!",
      description: "You have been enrolled to all platforms and entered the raffle.",
    });
    // show Opt-out link/token after enroll
  };

  const handleStripeBuy = async (e: React.FormEvent) => {
    e.preventDefault();
    setBuyLoading(true);
    try {
      const response = await fetch(
        "https://ajrzhrecwjxcohabagus.supabase.co/functions/v1/create-payment",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );
      const data = await response.json();
      if (data.url) {
        window.open(data.url, "_blank");
      } else {
        toast({
          title: "Payment Error",
          description: data.error || "Failed to start payment session.",
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        title: "Network Error",
        description: "Could not open payment session.",
        variant: "destructive",
      });
    } finally {
      setBuyLoading(false);
    }
  };

  return (
    <div>
      <NavBar />
      <main className="max-w-2xl mx-auto pt-10">
        <Card>
          <h1 className="text-3xl font-bold mb-3">Hybrid Raffle + Vault Engine</h1>
          <div className="mb-6 text-lg text-gray-600">
            Instantly unlock top-tier public domain assets + your chance to win!
          </div>
          <form onSubmit={handleStripeBuy} className="flex flex-col gap-3">
            <input
              type="email"
              required
              disabled={buyLoading}
              placeholder="Enter your email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="border px-3 py-2 rounded w-full"
            />
            <Button
              disabled={buyLoading || !email}
              type="submit"
              className="bg-green-700 hover:bg-green-800 text-white font-semibold"
            >
              {buyLoading ? "Redirecting..." : "Buy Now – $9"}
            </Button>
          </form>
        </Card>
        <Card>
          <h2 className="text-2xl font-bold mb-2">Current Grand Prize</h2>
          <div className="mb-1">{PRIZE.name} <span className="font-semibold">(Value: {PRIZE.value})</span></div>
          <div className="text-gray-600">{PRIZE.description}</div>
        </Card>
        {enrolled && (
          <Card>
            <h2 className="text-xl font-bold mb-1">You're Enrolled!</h2>
            <div className="mb-3">
              <span className="font-semibold">Raffle Entry ID:</span> <span className="bg-gray-100 rounded px-2">{raffleId}</span>
            </div>
            <div className="mb-2">
              Auto-Enrolled to:
              <ul className="list-disc ml-6 mt-1 text-gray-700">
                {partners.map(p => <li key={p}>{p}</li>)}
              </ul>
            </div>
            <div className="text-sm text-gray-600">
              Want to opt-out after 45 days? <br/>
              <span className="font-mono text-xs break-all">{window.location.origin + `/optout?token=${encodeURIComponent(createToken(email, new Date().toISOString()))}`}</span>
            </div>
          </Card>
        )}
      </main>
    </div>
  );
}
