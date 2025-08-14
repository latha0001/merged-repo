const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Dummy data for prizes
const prizes = [
  {
    id: 1,
    title: "Premium Watch Collection",
    retailPrice: 2500,
    bulkCost: 1800,
    image:
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&auto=format&fit=crop&q=60",
    status: "active",
    winner: null,
    shipped: false,
  },
  {
    id: 2,
    title: "Luxury Travel Package",
    retailPrice: 5000,
    bulkCost: 3500,
    image:
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&auto=format&fit=crop&q=60",
    status: "upcoming",
    winner: null,
    shipped: false,
  },
  {
    id: 3,
    title: "Designer Handbag Collection",
    retailPrice: 3500,
    bulkCost: 2200,
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&auto=format&fit=crop&q=60",
    status: "active",
    winner: null,
    shipped: false,
  },
  {
    id: 4,
    title: "Premium Audio System",
    retailPrice: 1800,
    bulkCost: 1200,
    image:
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop&q=60",
    status: "upcoming",
    winner: null,
    shipped: false,
  },
];

// Dummy data for enrolled users
const enrolledUsers = [];

// Routes
app.get("/api/prizes", (req, res) => {
  res.json(prizes);
});

app.post("/api/prizes", (req, res) => {
  const newPrize = {
    id: prizes.length + 1,
    ...req.body,
    status: "active",
    winner: null,
    shipped: false,
  };
  prizes.push(newPrize);
  res.status(201).json(newPrize);
});

app.put("/api/prizes/:id", (req, res) => {
  const { id } = req.params;
  const prizeIndex = prizes.findIndex((p) => p.id === parseInt(id));
  if (prizeIndex === -1)
    return res.status(404).json({ message: "Prize not found" });

  prizes[prizeIndex] = { ...prizes[prizeIndex], ...req.body };
  res.json(prizes[prizeIndex]);
});

// Raffle drawing endpoint
app.post("/api/raffle/draw/:prizeId", (req, res) => {
  const { prizeId } = req.params;
  const prizeIndex = prizes.findIndex((p) => p.id === parseInt(prizeId));

  if (prizeIndex === -1) {
    return res.status(404).json({ message: "Prize not found" });
  }

  // Get eligible users (enrolled for 45+ days)
  const eligibleUsers = enrolledUsers.filter((user) => {
    const enrollmentDate = new Date(user.enrolledOn);
    const daysEnrolled = Math.floor(
      (new Date() - enrollmentDate) / (1000 * 60 * 60 * 24)
    );
    return daysEnrolled >= 45 && user.eligibleForRaffle;
  });

  if (eligibleUsers.length === 0) {
    return res.status(400).json({ message: "No eligible users for raffle" });
  }

  // Randomly select a winner
  const winner =
    eligibleUsers[Math.floor(Math.random() * eligibleUsers.length)];

  // Update prize with winner
  prizes[prizeIndex].winner = winner.email;
  prizes[prizeIndex].status = "completed";

  res.json({
    message: "Winner drawn successfully",
    winner: {
      email: winner.email,
      enrolledOn: winner.enrolledOn,
    },
  });
});

// Simulate partner platform enrollment
app.post("/api/enroll", (req, res) => {
  const { email } = req.body;
  const enrollmentDate = new Date();

  // Simulate API calls to partner platforms
  const partnerPlatforms = [
    "EcoWorldBuy.com",
    "TalentKonnect.com",
    "LanguageKonnect.com",
  ];

  const enrollment = {
    email,
    enrolledOn: enrollmentDate,
    platforms: partnerPlatforms,
    optOutLink: `https://thetop36.com/opt-out/${Buffer.from(email).toString(
      "base64"
    )}`,
    eligibleForRaffle: false,
  };

  enrolledUsers.push(enrollment);

  res.status(201).json({
    message: "Successfully enrolled in partner platforms",
    enrollment,
  });
});

// Simulate opt-out
app.post("/api/opt-out/:emailHash", (req, res) => {
  const { emailHash } = req.params;
  const email = Buffer.from(emailHash, "base64").toString();

  const userIndex = enrolledUsers.findIndex((u) => u.email === email);
  if (userIndex === -1)
    return res.status(404).json({ message: "User not found" });

  const enrollmentDate = new Date(enrolledUsers[userIndex].enrolledOn);
  const daysEnrolled = Math.floor(
    (new Date() - enrollmentDate) / (1000 * 60 * 60 * 24)
  );

  enrolledUsers[userIndex].platforms = [];
  enrolledUsers[userIndex].eligibleForRaffle = daysEnrolled >= 45;

  res.json({
    message: "Successfully opted out",
    eligibleForRaffle: enrolledUsers[userIndex].eligibleForRaffle,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
