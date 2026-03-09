'use client';

import { Manrope } from 'next/font/google';

import { GarageReport } from '@/lib/reports/types';

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

const severityColors: Record<string, { bg: string; text: string; label: string }> = {
  critical: { bg: 'bg-red-100', text: 'text-red-600', label: 'Critical' },
  high: { bg: 'bg-orange-100', text: 'text-orange-600', label: 'High' },
  medium: { bg: 'bg-yellow-100', text: 'text-yellow-600', label: 'Medium' },
  good: { bg: 'bg-green-100', text: 'text-green-600', label: 'Good' },
};

const statusColors: Record<string, string> = {
  bad: 'text-red-500',
  neutral: 'text-slate-500',
  good: 'text-green-600',
};

export default function ReportClient({ report }: { report: GarageReport }) {
  const progressPercent = report.visibilityScore;

  return (
    <div className={`min-h-screen bg-[#f8f7f6] ${manrope.className} text-[#3D3D3D] selection:bg-[#d7b65b]/30`}>
      {/* Sticky Nav */}
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-[#e4e2dd] bg-white/80 backdrop-blur-md px-6 md:px-20 py-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#d7b65b] flex items-center justify-center rounded">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
          </div>
          <h2 className="text-xl font-extrabold tracking-tight">DSGNR <span className="font-light text-[#d7b65b]">Labs</span></h2>
        </div>
        <nav className="hidden md:flex items-center gap-10">
          <a className="text-[#3D3D3D]/70 hover:text-[#d7b65b] text-sm font-semibold transition-colors" href="#diagnosis">Diagnosis</a>
          <a className="text-[#3D3D3D]/70 hover:text-[#d7b65b] text-sm font-semibold transition-colors" href="#revenue">Revenue Impact</a>
          <a className="text-[#3D3D3D]/70 hover:text-[#d7b65b] text-sm font-semibold transition-colors" href="#prescription">Prescription</a>
        </nav>
        <a href={report.whatsappLink} target="_blank" rel="noopener noreferrer" className="hidden sm:flex items-center justify-center rounded-lg h-10 px-6 bg-[#d7b65b] text-white text-sm font-bold shadow-lg hover:scale-[1.02] active:scale-95 transition-all">
          Discuss Report
        </a>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 md:px-10 py-12 space-y-24">
        {/* Hero */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d7b65b]/10 border border-[#d7b65b]/20 text-[#d7b65b] text-xs font-bold uppercase tracking-widest">
              Digital Audit {report.auditYear}
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold leading-[1.1] tracking-tight">
              Digital Prescription<br />
              <span className="text-[#d7b65b]/80">for {report.garageName}</span>
            </h1>
            <p className="text-xl text-[#3D3D3D]/60 max-w-lg leading-relaxed">
              Your physical service is trusted by your customers — but your digital presence is turning away new ones every single day. Here&apos;s the path to recovery.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a href={report.whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-xl h-14 px-8 bg-[#25D366] text-white text-lg font-bold shadow-xl shadow-green-500/30 hover:-translate-y-1 transition-all">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Message on WhatsApp
              </a>
              <div className="flex flex-col justify-center px-4">
                <span className="text-red-500 font-bold text-lg">{report.estRevenueLoss}</span>
                <span className="text-[#3D3D3D]/40 text-xs font-medium uppercase tracking-tighter">Est. Revenue Loss / Month</span>
              </div>
            </div>
          </div>
          {/* Score Circle */}
          <div className="relative flex justify-center">
            <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full flex flex-col items-center justify-center shadow-2xl"
              style={{
                background: `radial-gradient(closest-side, white 79%, transparent 80% 100%), conic-gradient(#d7b65b ${progressPercent}%, #f4f3f1 0)`,
              }}>
              <span className="text-6xl md:text-8xl font-black">{report.visibilityScore}<span className="text-2xl md:text-3xl text-[#3D3D3D]/30">/100</span></span>
              <span className="text-sm font-bold text-[#d7b65b] tracking-widest uppercase mt-2">Visibility Score</span>
            </div>
            <div className="absolute -bottom-4 -right-4 md:right-10 bg-white p-6 rounded-2xl shadow-xl border border-[#e4e2dd] max-w-xs">
              <div className="flex items-center gap-3 mb-2">
                <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>
                <span className="font-bold">Critical Insight</span>
              </div>
              <p className="text-sm text-[#3D3D3D]/60 leading-snug">{report.criticalInsight}</p>
            </div>
          </div>
        </section>

        {/* Executive Summary */}
        <section className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-[#e4e2dd] flex flex-col md:flex-row gap-12 items-center">
          <div className="w-full md:w-1/3 aspect-square bg-[#3D3D3D]/5 rounded-2xl flex items-center justify-center">
            <svg className="w-24 h-24 text-[#d7b65b]/20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          </div>
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl font-bold">Executive Summary</h2>
            <div className="w-20 h-1 bg-[#d7b65b] rounded-full"></div>
            <p className="text-xl text-[#3D3D3D]/70 leading-relaxed italic">{report.executiveSummary}</p>
            <div className="grid grid-cols-2 gap-8 pt-4">
              <div>
                <p className="text-3xl font-black">{report.bookingFriction}</p>
                <p className="text-sm text-[#3D3D3D]/40 uppercase font-bold">Booking Friction</p>
              </div>
              <div>
                <p className="text-3xl font-black">{report.searchShare}</p>
                <p className="text-sm text-[#3D3D3D]/40 uppercase font-bold">Search Share</p>
              </div>
            </div>
          </div>
        </section>

        {/* Diagnosis */}
        <section className="space-y-8" id="diagnosis">
          <div className="flex justify-between items-end">
            <h2 className="text-3xl font-extrabold tracking-tight">Digital Diagnosis</h2>
            <span className="text-red-500 text-sm font-medium">Status: Action Required</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {report.diagnosis.map((item, i) => {
              const sev = severityColors[item.severity];
              return (
                <div key={i} className="group bg-white p-6 rounded-2xl border border-[#e4e2dd] hover:border-[#d7b65b]/50 transition-all shadow-sm">
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-2xl">🔧</span>
                    <span className={`px-2 py-1 rounded ${sev.bg} ${sev.text} text-[10px] font-black uppercase tracking-wider`}>{sev.label}</span>
                  </div>
                  <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                  <p className="text-sm text-[#3D3D3D]/50">{item.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Benchmark */}
        <section className="space-y-8">
          <h2 className="text-3xl font-extrabold tracking-tight text-center">Market Benchmark</h2>
          <div className="overflow-hidden bg-white rounded-3xl border border-[#e4e2dd] shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#3D3D3D]/5">
                  <th className="p-6 text-sm font-bold uppercase tracking-widest text-[#3D3D3D]/40">Feature</th>
                  <th className="p-6 text-sm font-bold uppercase tracking-widest text-[#3D3D3D]">{report.garageName}</th>
                  <th className="p-6 text-sm font-bold uppercase tracking-widest text-[#d7b65b]">Top Competitor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e4e2dd]">
                {report.benchmark.map((row, i) => (
                  <tr key={i}>
                    <td className="p-6 font-semibold">{row.feature}</td>
                    <td className={`p-6 font-medium ${statusColors[row.yoursStatus]}`}>{row.yours}</td>
                    <td className={`p-6 font-medium ${statusColors[row.competitorStatus]}`}>{row.competitor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Revenue Impact */}
        <section className="bg-[#3D3D3D] text-white rounded-3xl p-8 md:p-12 overflow-hidden relative" id="revenue">
          <div className="relative z-10 space-y-12">
            <div className="max-w-xl">
              <h2 className="text-4xl font-extrabold mb-4">Revenue Impact Analysis</h2>
              <p className="text-white/60 text-lg">Detailed breakdown of your estimated monthly opportunity loss based on local market demand and competitor benchmarks.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {report.revenueImpact.map((item, i) => (
                <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <p className="text-[#d7b65b] text-2xl font-black mb-2">{item.amount}</p>
                  <h4 className="font-bold text-sm uppercase tracking-wider mb-2">{item.title}</h4>
                  <p className="text-xs text-white/40">{item.description}</p>
                </div>
              ))}
            </div>
            <div className="text-center pt-4">
              <p className="text-white/40 text-sm uppercase tracking-widest mb-2">Estimated Total Monthly Loss</p>
              <p className="text-5xl font-black text-[#d7b65b]">{report.totalMonthlyLoss}</p>
            </div>
          </div>
          <div className="absolute -bottom-10 -right-10 text-[12rem] font-black text-white/5 select-none pointer-events-none">LOSS</div>
        </section>

        {/* Prescription */}
        <section className="space-y-12" id="prescription">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-extrabold tracking-tight">The Prescription</h2>
            <p className="text-[#3D3D3D]/50 max-w-2xl mx-auto">Our four-pillar approach to reclaiming your market share and automating your growth.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {report.prescription.map((item, i) => (
              <div key={i} className="flex gap-6 p-8 rounded-3xl bg-white border border-[#e4e2dd] shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 shrink-0 rounded-2xl bg-[#d7b65b]/10 flex items-center justify-center">
                  <svg className="w-8 h-8 text-[#d7b65b]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <div>
                  <h3 className="text-xl font-extrabold mb-2">{item.title}</h3>
                  <p className="text-[#3D3D3D]/60 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Psychological Close */}
        <section className="text-center py-20 px-6 rounded-3xl bg-[#d7b65b]/5 border border-[#d7b65b]/10 space-y-6">
          <h2 className="text-3xl md:text-4xl font-extrabold max-w-2xl mx-auto leading-tight">
            {report.psychologicalHook}
          </h2>
          <p className="text-[#3D3D3D]/60 text-lg max-w-xl mx-auto">
            {report.psychologicalSubtext}
          </p>
          <div className="pt-4">
            <div className="flex items-center justify-center gap-3">
              <div className="flex -space-x-3">
                <div className="w-12 h-12 rounded-full border-4 border-[#f8f7f6] bg-slate-200"></div>
                <div className="w-12 h-12 rounded-full border-4 border-[#f8f7f6] bg-slate-300"></div>
                <div className="w-12 h-12 rounded-full border-4 border-[#f8f7f6] bg-slate-400"></div>
              </div>
              <span className="text-sm font-bold text-[#3D3D3D]/60 tracking-tight">Join 40+ Premium Garages</span>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="flex flex-col items-center text-center space-y-10 pb-20">
          <div className="space-y-4">
            <h2 className="text-5xl font-black">Ready to grow {report.garageName}?</h2>
            <p className="text-xl text-[#3D3D3D]/50">Let&apos;s discuss your report. No pressure, just a conversation.</p>
          </div>
          <a href={report.whatsappLink} target="_blank" rel="noopener noreferrer" className="group relative flex items-center justify-center gap-4 rounded-2xl h-20 px-12 bg-[#25D366] text-white text-2xl font-black shadow-2xl shadow-green-500/40 hover:scale-105 active:scale-95 transition-all">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Message on WhatsApp
          </a>
        </section>
      </main>

      {/* Sticky Mobile Footer CTA */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] w-[90%] max-w-md">
        <a href={report.whatsappLink} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-between px-6 py-4 rounded-full bg-[#3D3D3D] text-white shadow-2xl border border-white/10 hover:bg-[#3D3D3D]/95 transition-all">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-[#d7b65b]" fill="currentColor" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/></svg>
            <span className="font-bold text-sm tracking-tight uppercase">Discuss Report on WhatsApp</span>
          </div>
          <svg className="w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </a>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-[#e4e2dd] py-12 px-6 md:px-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-[#d7b65b]/20 flex items-center justify-center rounded">
              <svg className="w-4 h-4 text-[#d7b65b]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
            </div>
            <h2 className="font-extrabold">DSGNR Labs</h2>
          </div>
          <p className="text-[#3D3D3D]/40 text-sm">© {new Date().getFullYear()} DSGNR Labs. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
