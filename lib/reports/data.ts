import { GarageReport } from './types';

const reports: Record<string, GarageReport> = {
  'deans-lane-tyres': {
    slug: 'deans-lane-tyres',
    garageName: "Dean's Lane Tyres",
    auditYear: '2025',
    visibilityScore: 22,
    criticalInsight: 'You are invisible to 80% of local search traffic looking for tyre services in your area. Customers searching "tyres near me" are finding your competitors first.',
    executiveSummary: '"Dean\'s Lane Tyres has a loyal walk-in base, but the digital front door is practically closed. No website optimisation, no online booking, and minimal search presence means every day you\'re losing customers to competitors who simply showed up online first. The gap between your service quality and your digital visibility is costing you real revenue."',
    bookingFriction: '91%',
    searchShare: '8%',
    estRevenueLoss: '£4,500 - £9,200',
    diagnosis: [
      { icon: 'laptop_mac', severity: 'critical', title: 'Website', description: 'Outdated design, not mobile-optimised, slow load times.' },
      { icon: 'event_available', severity: 'critical', title: 'Booking', description: 'Phone-only. No online scheduling option.' },
      { icon: 'ads_click', severity: 'high', title: 'Local SEO', description: 'Not ranking for key local tyre search terms.' },
      { icon: 'share_reviews', severity: 'medium', title: 'Social', description: 'Minimal presence. No regular content.' },
      { icon: 'stars', severity: 'good', title: 'Reviews', description: 'Decent rating but very low review count.' },
    ],
    benchmark: [
      { feature: 'Online Booking', yours: 'No', yoursStatus: 'bad', competitor: 'Yes (Instant)', competitorStatus: 'good' },
      { feature: 'Mobile Experience', yours: 'Poor', yoursStatus: 'bad', competitor: 'Fully Optimised', competitorStatus: 'good' },
      { feature: 'Google Map Ranking', yours: '#15+', yoursStatus: 'bad', competitor: '#1', competitorStatus: 'good' },
      { feature: 'Price Transparency', yours: 'Call for quote', yoursStatus: 'bad', competitor: 'Live Tyre Finder', competitorStatus: 'good' },
      { feature: 'Service Range Visible', yours: 'Partially listed', yoursStatus: 'neutral', competitor: 'Full catalogue online', competitorStatus: 'good' },
    ],
    revenueImpact: [
      { amount: '£3,800', title: 'Lost Bookings', description: 'Customers who searched for tyre services but couldn\'t book online — they went to a competitor instead.' },
      { amount: '£2,200', title: 'Bounce Rate Cost', description: 'Visitors who landed on your site from mobile and left within 5 seconds due to poor experience.' },
      { amount: '£3,500', title: 'Visibility Gap', description: 'Local search traffic going directly to top 3 competitors who invest in SEO and Google Ads.' },
      { amount: '£1,200', title: 'Review Deficit', description: 'High-intent customers choosing competitors with 100+ reviews over your limited social proof.' },
    ],
    totalMonthlyLoss: '£10,700',
    prescription: [
      { icon: 'desktop_windows', title: 'Professional Website', description: 'A high-performance, mobile-first website that loads in under 2 seconds, showcases your full service range, and converts visitors into booked customers. Built for trust.' },
      { icon: 'rocket_launch', title: 'Automated Booking Engine', description: 'Let customers book MOTs, tyre fittings, and services 24/7 without calling. Syncs to your calendar. Fills slots while you sleep.' },
      { icon: 'campaign', title: 'Local SEO & Google Ads', description: 'Dominate "tyres near me" and every relevant local search. Hyper-targeted ads that put you at position #1 for customers ready to buy today.' },
      { icon: 'history_edu', title: 'Review & Social Engine', description: 'Automated review collection after every job. Weekly social content that builds trust and keeps your brand visible in the community.' },
    ],
    psychologicalHook: 'What would you do with an extra £10,000 a month?',
    psychologicalSubtext: 'That\'s not a fantasy number — it\'s the revenue currently walking past your door to competitors who simply have a better digital presence. Our systems don\'t just bring in more customers — they free up your time so you can focus on what you do best: the work itself.',
    whatsappLink: 'https://wa.me/447000000000?text=Hi%20DSGNR%20Labs%2C%20I%20just%20read%20my%20Digital%20Prescription%20report%20and%20I%27d%20like%20to%20discuss%20it.',
    phoneNumber: '+44 7000 000000',
  },
};

export function getReport(slug: string): GarageReport | null {
  return reports[slug] || null;
}

export function getAllReportSlugs(): string[] {
  return Object.keys(reports);
}
