# TheTop36.com – Project Plan

## Overview
TheTop36.com is a digital-vault store selling curated $19 bundles of public-domain content. Each purchase qualifies the buyer for a multi-tier raffle (grand prize $10,000, secondary tiers), daily micro-draws, and referral-boosted odds across a 45-day cycle.

This plan outlines the steps to build and deploy the project, including repo structure, brand variables, and module implementation.

---

## 1. Brand Variables
Use these variables in every UI. Provide as CSS/SCSS variables or Tailwind config for consistency.

| Variable         | Value                                                      | Notes                                 |
|------------------|------------------------------------------------------------|---------------------------------------|
| Primary colour   | `#111D5E`                                                  | Deep navy                             |
| Accent colour    | `#FF7A00`                                                  | Button / link                         |
| Background       | `#F1F5FB`                                                  | Page BG                               |
| Font stack       | `"Inter", "Helvetica Neue", Arial, sans-serif`           | Font files in `/assets/fonts/`        |
| Border radius    | `8px`                                                      | Cards & buttons                       |
| Logo             | `/assets/logo.svg`                                         | 120 × 40 px, dark & light versions    |
| Spacing scale    | 4-pt grid (`4, 8, 16, 24px`)                               | Use consistently                      |

**Action:**
- Define these as CSS variables, SCSS variables, or Tailwind config.
- Ensure all modules import and use these variables.

---

## 2. Repository Structure
Create a separate GitHub repository for each module:

- `thetop36-referral-engine`
- `thetop36-engagement-survey`
- `thetop36-analytics-dashboard`
- `thetop36-support-faq`

---

## 3. Module Implementation Steps

### 3.1. Referral & Odds Tracker
- **Features:**
  - Social-share boosts (0.2 entries/share, up to 5)
  - Purchase referrals (0.5 entries/buy, up to 4)
  - Live entries counter
- **Repo:** `thetop36-referral-engine`
- **Steps:**
  1. Set up repo and project structure
  2. Implement UI using brand variables
  3. Add social sharing and referral logic
  4. Display live entries counter
  5. Integrate with shared shell (header/footer, navigation)
  6. Write tests
  7. Deploy to Netlify/Vercel

### 3.2. Engagement Survey & Check-In Flow
- **Features:**
  - One-click daily check-in
  - Email push integration
  - Survey UI
- **Repo:** `thetop36-engagement-survey`
- **Steps:**
  1. Set up repo and project structure
  2. Implement daily check-in and survey UI
  3. Integrate email push logic
  4. Use brand variables and shared shell
  5. Write tests
  6. Deploy to Netlify/Vercel

### 3.3. Analytics Dashboard
- **Features:**
  - Track purchases/day, shares, referrals, entries per user, daily winners count
- **Repo:** `thetop36-analytics-dashboard`
- **Steps:**
  1. Set up repo and project structure
  2. Implement dashboard UI and data visualization
  3. Integrate data sources/APIs
  4. Use brand variables and shared shell
  5. Write tests
  6. Deploy to Netlify/Vercel

### 3.4. Support & FAQ Widget
- **Features:**
  - Embedded chat/contact form
  - Searchable FAQ
  - Opt-out functionality
- **Repo:** `thetop36-support-faq`
- **Steps:**
  1. Set up repo and project structure
  2. Implement chat/contact form and FAQ search
  3. Add opt-out logic
  4. Use brand variables and shared shell
  5. Write tests
  6. Deploy to Netlify/Vercel

---

## 4. Shared Shell & Global Styles
- Create a shared header, footer, and navigation stub for all modules.
- Ensure all modules import global styles and brand variables.
- Navigation should link to all other modules.

---

## 5. Deployment
- Deploy each module to Netlify, Vercel, or similar.
- Ensure each has a unique preview URL (e.g. `https://thetop36-referral-engine.vercel.app`).

---

## 6. General Guidelines
- **No external UI kits**; use only brand variables.
- Maintain consistent spacing, typography, and color usage.
- Use the provided logo and font stack.
- Test each module thoroughly before deployment.

---

## 7. Next Steps
1. Define brand variables in a shared config (CSS/SCSS/Tailwind).
2. Create GitHub repos for each module.
3. Scaffold each module with shared shell and brand styles.
4. Implement features per module spec.
5. Deploy and test each module. 