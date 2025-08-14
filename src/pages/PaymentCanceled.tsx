
import NavBar from "@/components/NavBar";
import Card from "@/components/Card";
import { useNavigate } from "react-router-dom";

export default function PaymentCanceled() {
  const navigate = useNavigate();

  return (
    <div>
      <NavBar />
      <main className="max-w-xl mx-auto pt-10">
        <Card>
          <h1 className="text-2xl font-bold mb-2">Payment Canceled</h1>
          <p className="mb-4">Your payment was canceled. No charges have been made.</p>
          <button
            className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded"
            onClick={() => navigate("/")}
          >
            Try Again
          </button>
        </Card>
      </main>
    </div>
  );
}
