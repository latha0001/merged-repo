
const PARTNERS = [
  {
    name: "EcoWorldBuy.com",
    desc: "Eco-friendly e-commerce",
    api: "/api/enroll-user",
  },
  {
    name: "TalentKonnect.com",
    desc: "Talent network",
    api: "/api/enroll-user",
  },
  {
    name: "LanguageKonnect.com",
    desc: "AI-powered language services",
    api: "/api/enroll-user",
  },
];

type Partner = typeof PARTNERS[number];

export async function enrollWithPartners(email: string): Promise<string[]> {
  // Simulate async partner enroll (mock POST)
  return await Promise.all(
    PARTNERS.map(async partner => {
      // simulate POST
      await new Promise(res => setTimeout(res, 300));
      // Would POST: { email, source, enrolledOn }
      // e.g. fetch(partner.api, { method: "POST", ... })
      return partner.name;
    })
  );
}

export { PARTNERS };
