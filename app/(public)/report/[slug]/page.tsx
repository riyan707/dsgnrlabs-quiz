import { notFound } from 'next/navigation';
import { getReport, getAllReportSlugs } from '@/lib/reports/data';
import { Metadata } from 'next';
import ReportClient from './ReportClient';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllReportSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const report = getReport(slug);
  if (!report) return { title: 'Report Not Found' };
  return {
    title: `Digital Prescription — ${report.garageName} | DSGNR Labs`,
    description: `Free digital health report for ${report.garageName}. Discover how much revenue you're losing and how to fix it.`,
    openGraph: {
      title: `${report.garageName} — Your Digital Prescription`,
      description: `Visibility Score: ${report.visibilityScore}/100. Estimated monthly loss: ${report.estRevenueLoss}. See the full breakdown.`,
    },
  };
}

export default async function ReportPage({ params }: Props) {
  const { slug } = await params;
  const report = getReport(slug);
  if (!report) notFound();
  return <ReportClient report={report} />;
}
