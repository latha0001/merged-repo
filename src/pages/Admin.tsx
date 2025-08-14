
import NavBar from "@/components/NavBar";
import Card from "@/components/Card";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type Order = {
  id: string;
  email: string | null;
  amount: number | null;
  currency: string | null;
  status: string | null;
  stripe_session_id: string | null;
  created_at: string;
};

export default function Admin() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      setLoading(true);
      const { data, error } = await supabase
        .from("orders")
        .select(
          "id, email, amount, currency, status, stripe_session_id, created_at"
        )
        .order("created_at", { ascending: false });
      
      if (error) {
        console.error("Error fetching orders:", error);
        setOrders([]);
      } else {
        setOrders(data ?? []);
      }
      setLoading(false);
    }
    fetchOrders();
  }, []);

  return (
    <div>
      <NavBar />
      <main className="max-w-6xl mx-auto pt-10">
        <Card>
          <h1 className="text-xl font-bold mb-4">Stripe Payment Orders</h1>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left border">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-2 px-4 border-b">Email</th>
                  <th className="py-2 px-4 border-b">Date</th>
                  <th className="py-2 px-4 border-b">Amount</th>
                  <th className="py-2 px-4 border-b">Currency</th>
                  <th className="py-2 px-4 border-b">Status</th>
                  <th className="py-2 px-4 border-b">Stripe Session ID</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6} className="text-center py-4 text-gray-500">
                      Loading…
                    </td>
                  </tr>
                ) : orders.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="text-center text-gray-500 py-4 italic"
                    >
                      No Stripe orders found yet.
                    </td>
                  </tr>
                ) : (
                  orders.map((o) => (
                    <tr key={o.id} className="hover:bg-gray-100">
                      <td className="py-2 px-4 border-b">{o.email ?? "–"}</td>
                      <td className="py-2 px-4 border-b">
                        {new Date(o.created_at).toLocaleString()}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {typeof o.amount === "number"
                          ? `$${(o.amount / 100).toFixed(2)}`
                          : "–"}
                      </td>
                      <td className="py-2 px-4 border-b">{o.currency ?? "usd"}</td>
                      <td className="py-2 px-4 border-b capitalize">
                        {o.status ?? "pending"}
                      </td>
                      <td className="py-2 px-4 border-b font-mono break-all">
                        {o.stripe_session_id ?? "–"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </main>
    </div>
  );
}
