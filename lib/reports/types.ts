export interface DiagnosisItem {
  icon: string;
  severity: 'critical' | 'high' | 'medium' | 'good';
  title: string;
  description: string;
}

export interface BenchmarkRow {
  feature: string;
  yours: string;
  yoursStatus: 'bad' | 'neutral' | 'good';
  competitor: string;
  competitorStatus: 'bad' | 'neutral' | 'good';
}

export interface CompetitorRow {
  name: string;
  reviews: number;
  website: boolean;
  booking: boolean;
  ads: boolean;
}

export interface RevenueItem {
  amount: string;
  title: string;
  description: string;
}

export interface PrescriptionItem {
  icon: string;
  title: string;
  description: string;
}

export interface GarageReport {
  slug: string;
  garageName: string;
  address?: string;
  auditYear: string;
  visibilityScore: number;
  criticalInsight: string;
  executiveSummary: string;
  bookingFriction: string;
  bookingFrictionLabel?: string;
  searchShare: string;
  searchShareLabel?: string;
  estRevenueLoss: string;
  diagnosis: DiagnosisItem[];
  benchmark: BenchmarkRow[];
  competitors?: CompetitorRow[];
  revenueImpact: RevenueItem[];
  totalMonthlyLoss: string;
  prescription: PrescriptionItem[];
  psychologicalHook: string;
  psychologicalSubtext: string;
  whatsappLink: string;
  phoneNumber: string;
}
