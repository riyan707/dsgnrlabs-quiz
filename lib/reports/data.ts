import { GarageReport } from './types';

const reports: Record<string, GarageReport> = {
  'deans-lane-tyres': {
    slug: 'deans-lane-tyres',
    garageName: "Deans Lane Tyres",
    address: "133b Deans Ln, Edgware HA8 9NY",
    auditYear: '2026',
    visibilityScore: 25,
    criticalInsight: 'You are invisible to online customers. When people search "garage near Edgware" or "MOT Edgware", Deans Lane Tyres does not appear. 87% of UK consumers search online before visiting a local business.',
    executiveSummary: '"Deans Lane Tyres has a solid reputation with a 4.9★ rating from 258 verified Google reviews. However, the business has zero online presence — no website, no online booking, no Google Ads, and no active social media. In an area where competitors like CarFix Garage (2,241 reviews) and Hendon Tyre Service (771 reviews) dominate search results, this invisibility is estimated to cost £6,000 – £11,500 per month in missed revenue."',
    bookingFriction: '67%',
    bookingFrictionLabel: 'Prefer Online Booking',
    searchShare: '4.9★',
    searchShareLabel: 'Google Rating (258 Reviews)',
    estRevenueLoss: '£6,000 — £11,500',
    diagnosis: [
      { icon: 'laptop_mac', severity: 'critical', title: 'No Website', description: 'When customers search for garages or MOTs near Edgware, you don\'t appear. You\'re invisible to 87% of consumers who search online first.' },
      { icon: 'event_available', severity: 'high', title: 'No Online Booking', description: '67% of UK consumers prefer to book services online. Without this, you lose every customer who won\'t pick up the phone.' },
      { icon: 'ads_click', severity: 'high', title: 'No Google Ads', description: 'Competitors are running ads for "MOT near me" and "car service Edgware". They appear first. You\'re missing high-intent traffic.' },
      { icon: 'share_reviews', severity: 'medium', title: 'No Social Media', description: 'No active Facebook or Instagram found. Local businesses with social profiles generate 2-3x more word-of-mouth referrals.' },
      { icon: 'stars', severity: 'good', title: 'Strong Reviews', description: '4.9★ from 258 reviews is excellent — this builds immediate trust with potential customers.' },
    ],
    benchmark: [
      { feature: 'Google Reviews', yours: '258', yoursStatus: 'neutral', competitor: '2,241 (CarFix)', competitorStatus: 'good' },
      { feature: 'Website', yours: 'None', yoursStatus: 'bad', competitor: 'Yes (All 4)', competitorStatus: 'good' },
      { feature: 'Online Booking', yours: 'No', yoursStatus: 'bad', competitor: 'Yes (All 4)', competitorStatus: 'good' },
      { feature: 'Google Ads', yours: 'None', yoursStatus: 'bad', competitor: 'Active (All 4)', competitorStatus: 'good' },
      { feature: 'Google Rating', yours: '4.9★', yoursStatus: 'good', competitor: '4.5★ avg', competitorStatus: 'neutral' },
    ],
    competitors: [
      { name: 'CarFix Garage', reviews: 2241, website: true, booking: true, ads: true },
      { name: 'Hendon Tyre Service', reviews: 771, website: true, booking: true, ads: true },
      { name: 'Colindale Tyres', reviews: 585, website: true, booking: true, ads: true },
      { name: 'Russell Automotive', reviews: 366, website: true, booking: true, ads: true },
    ],
    revenueImpact: [
      { amount: '£2,000 – £4,000', title: 'Search Invisibility', description: 'Customers searching "MOT near Edgware" who can\'t find you — they go straight to competitors who show up.' },
      { amount: '£1,500 – £3,000', title: 'No Online Booking', description: 'Customers who prefer booking online are choosing competitors with instant scheduling instead of calling.' },
      { amount: '£2,000 – £3,500', title: 'Lost Ad Traffic', description: 'Google Ads traffic for "MOT near me" and "car service Edgware" captured entirely by your competitors.' },
      { amount: '£500 – £1,000', title: 'No Social Referrals', description: 'Word-of-mouth referrals you\'re missing by not having an active social media presence.' },
    ],
    totalMonthlyLoss: '£6,000 – £11,500',
    prescription: [
      { icon: 'desktop_windows', title: 'Professional Website', description: 'A modern, mobile-first website with online booking, transparent pricing, and trust signals. Customers find you and book — 24/7, without needing to call.' },
      { icon: 'rocket_launch', title: 'Online Booking System', description: 'Let customers book MOTs, services, and repairs online. Reduces phone calls and captures the 67% who prefer self-service booking.' },
      { icon: 'campaign', title: 'Targeted Google Ads', description: 'Capture high-intent searches like "MOT near me" and "car service Edgware". Appear first when customers are actively looking to book.' },
    ],
    psychologicalHook: 'What would you do with an extra £6,000 – £11,500 a month?',
    psychologicalSubtext: 'That\'s not a fantasy number — it\'s the revenue currently walking past your door to competitors who simply show up online. With 258 five-star reviews, your reputation is already built. We just need to make sure people can actually find you.',
    whatsappLink: 'https://wa.me/447978075556?text=Hi%20DSGNR%20Labs%2C%20I%20just%20read%20my%20Digital%20Prescription%20report%20for%20Deans%20Lane%20Tyres%20and%20I%27d%20like%20to%20discuss%20it.',
    phoneNumber: '07978 075556',
  },
};

export function getReport(slug: string): GarageReport | null {
  return reports[slug] || null;
}

export function getAllReportSlugs(): string[] {
  return Object.keys(reports);
}
