import React from "react";

type Stat = { label: string; value: string };

type StatsRowProps = {
  stats: Stat[];
};

export default function StatsRow({ stats }: StatsRowProps) {
  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 lg:divide-x divide-slate-200/80">
          {stats.map((s, idx) => (
            <div key={idx} className="py-6 lg:py-0 lg:px-8">
              <div className="text-3xl font-extrabold text-blue-600">{s.value}</div>
              <div className="mt-2 text-slate-600">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


