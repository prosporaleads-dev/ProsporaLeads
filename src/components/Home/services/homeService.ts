export const defaultServices = [
  {
    slug: "b2b-lead-generation",
    title: "B2B Lead Generation",
    shortDescription:
      "Researched, qualified prospects matched to your ideal customer profile.",
    icon: "target",
  },
  {
    slug: "appointment-setting",
    title: "Appointment Setting",
    shortDescription:
      "Qualified meetings placed directly on your sales team's calendar.",
    icon: "calendar-check",
  },
  {
    slug: "email-outreach",
    title: "Email Outreach",
    shortDescription:
      "Personalised email sequences built to start relevant conversations.",
    icon: "mail",
  },
  {
    slug: "linkedin-outreach",
    title: "LinkedIn Outreach",
    shortDescription:
      "Relationship-led social selling for key decision-makers.",
    icon: "network",
  },
  {
    slug: "market-account-research",
    title: "Market & Account Research",
    shortDescription:
      "Insight before activity: market maps, ICPs and target accounts.",
    icon: "map",
  },
  {
    slug: "data-verification",
    title: "Data Verification & Enrichment",
    shortDescription:
      "Clean, current contact and company data your CRM can rely on.",
    icon: "database",
  },
] as const;

export const defaultIndustries = [
  "Software, SaaS and IT services",
  "Staffing, recruitment and HR services",
  "Real estate and property technology",
  "Financial services and fintech",
  "Manufacturing and industrial",
  "Logistics and supply chain",
  "Healthcare and life sciences",
  "Professional and business services",
  "Marketing, advertising and creative agencies",
  "Education and training providers",
] as const;

export const defaultMarkets = [
  {
    slug: "usa",
    name: "United States",
    description:
      "Focused segments, role-specific messaging and disciplined follow-up for a competitive B2B market.",
    complianceNote:
      "Campaigns should be reviewed for applicable CAN-SPAM requirements.",
  },
  {
    slug: "canada",
    name: "Canada",
    description:
      "Relationship-aware outreach with attention to local audiences, language and business expectations.",
    complianceNote:
      "Campaigns should be reviewed for applicable CASL requirements.",
  },
  {
    slug: "middle-east",
    name: "Middle East",
    description:
      "Careful attention to introductions, local working weeks, holidays and country-specific business culture.",
    complianceNote:
      "Requirements vary by country; obtain local compliance review.",
  },
  {
    slug: "australia",
    name: "Australia",
    description:
      "Concise, practical messaging adapted to local business hours and time zones.",
    complianceNote:
      "Campaigns should be reviewed for the Spam Act and privacy requirements.",
  },
] as const;

export const defaultFaqs = [
  {
    question: "What does Propspora Leads do?",
    answer:
      "We research target companies, identify and verify decision-makers, and run personalised outreach designed to create qualified conversations and booked meetings.",
  },
  {
    question: "Which regions do you work in?",
    answer:
      "We support B2B campaigns targeting the USA, Canada, the Middle East and Australia.",
  },
  {
    question: "How do you define a qualified lead?",
    answer:
      "We agree on qualification criteria at the start, typically industry, company size, role, need and timing.",
  },
  {
    question: "Do you guarantee leads or meetings?",
    answer:
      "We do not make blanket guarantees. Outcomes depend on your offer, market and sales process. We commit to a rigorous process and transparent reporting.",
  },
  {
    question: "Can you work with our CRM and sales team?",
    answer:
      "We can deliver leads in a CRM-ready format and coordinate meeting handovers with your sales team.",
  },
] as const;
