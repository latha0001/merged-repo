import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const email = (body.email || "").toString().trim();
    if (!email) {
      return new Response(JSON.stringify({ error: "Email is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Set up Stripe and Supabase
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") ?? "", {
      apiVersion: "2023-10-16",
    });

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    // Price details
    const amount = 900; // $9 in cents
    const currency = "usd";

    // --- Use session_id in success_url ---
    const successUrlBase = req.headers.get("origin") || "https://thetop36.com";
    // session_id will be appended by Stripe (see docs)
    // Provide {CHECKOUT_SESSION_ID} token
    const successUrl = `${successUrlBase}/payment-success?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${successUrlBase}/payment-canceled`;

    // Create a Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency,
            product_data: { name: "Instant Asset Bundle" },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: successUrl,
      cancel_url: cancelUrl,
      // Optionally: add email to metadata for easy access later
      metadata: { email: email },
    });

    // Record order in Supabase
    await supabase.from("orders").insert([
      {
        email,
        stripe_session_id: session.id,
        amount,
        currency,
        status: "pending",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ]);

    return new Response(JSON.stringify({ url: session.url }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message ?? "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
