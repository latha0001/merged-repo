
import NavBar from "@/components/NavBar";
import Card from "@/components/Card";
import React from "react";

// FAQ content as JSON array for ease of editing.
const FAQS = [
  {
    question: "What is TheTop36.com?",
    answer: "A platform offering public domain knowledge assets bundled with branded prize raffles and exclusive partner services."
  },
  {
    question: "How does the 45-day lock-in period work?",
    answer: "After purchase, you are auto-enrolled in our partner platforms and locked in for 45 days — enables raffle eligibility and ecosystem access."
  },
  {
    question: "Can I opt-out early?",
    answer: "No. Early opt-out isn't permitted; only after 45 days using your secure email link."
  },
  {
    question: "How are winners selected?",
    answer: "Randomly after 45 days. You will be notified by email if you win."
  },
  {
    question: "Is my data shared outside the listed partners?",
    answer: "No. Your enrollment is only for service integration and never sold to third parties."
  }
];

export default function FAQ() {
  return (
    <div>
      <NavBar />
      <main className="max-w-2xl mx-auto pt-10">
        <Card>
          <h1 className="text-2xl font-bold mb-4">Frequently Asked Questions</h1>
          <div className="divide-y">
            {FAQS.map((faq, i) => (
              <div key={i} className="py-4">
                <div className="font-semibold text-lg">{faq.question}</div>
                <div className="text-gray-600">{faq.answer}</div>
              </div>
            ))}
          </div>
        </Card>
      </main>
    </div>
  );
}
