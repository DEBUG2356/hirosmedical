const items = [
  "Gyógytorna",
  "McKenzie-terápia",
  "Manuális technikák",
  "Sportrehabilitáció",
  "ProSki tréning",
  "Lökéshullám-terápia",
  "TR Therapy · Tecar",
  "Induktív mágnesterápia",
  "Lézerterápia",
  "Fizikoterápia",
  "Masszázs",
  "Köpölyözés",
  "Flossing",
  "Kiscsoportos órák",
];

/** Navy szalag – a plakát alsó sávjának mozgó változata. */
export default function Marquee({ dark = true }: { dark?: boolean }) {
  const row = items.map((t, i) => (
    <span key={i} className="flex items-center gap-6 pr-6">
      <span className={`font-display text-[0.78rem] font-bold uppercase tracking-[0.2em] ${dark ? "text-white" : "text-navy"}`}>{t}</span>
      <span className="h-[7px] w-7 shrink-0 rounded-full bg-green" aria-hidden />
    </span>
  ));
  return (
    <div className={`relative overflow-hidden py-5 ${dark ? "bg-navy" : "bg-ice"}`} aria-hidden>
      <div className="flex w-max animate-[marquee_48s_linear_infinite] whitespace-nowrap hover:[animation-play-state:paused]">
        <div className="flex">{row}</div>
        <div className="flex">{row}</div>
      </div>
    </div>
  );
}
