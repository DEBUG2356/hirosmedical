import { site } from "@/lib/site";
import { Reveal, SplitLines } from "./motion";
import { PhoneIcon, MailIcon, PinIcon, FacebookIcon, ArrowIcon } from "./Icons";

const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(site.mapsQuery)}&z=16&output=embed&hl=hu`;

export default function Contact() {
  const rows = [
    { icon: PhoneIcon, label: "Telefon", value: site.phone, href: site.phoneHref, note: "Bejelentkezés, érdeklődés" },
    { icon: MailIcon, label: "E-mail", value: site.email, href: `mailto:${site.email}` },
    { icon: PinIcon, label: "Cím", value: `${site.address.zip} ${site.address.city}, ${site.address.street}`, href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapsQuery)}` },
    { icon: FacebookIcon, label: "Facebook", value: "hirosmedicalcenter", href: site.facebook },
  ];

  return (
    <section id="kapcsolat" className="relative overflow-hidden bg-ice py-24 lg:py-32">
      <div aria-hidden className="absolute -right-32 -top-32 h-[480px] w-[480px] rounded-full bg-mint/60 blur-3xl" />
      <div className="container-x relative grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <div>
          <Reveal>
            <p className="eyebrow mb-5">Kapcsolat</p>
          </Reveal>
          <SplitLines
            className="display text-[clamp(2.2rem,5vw,3.8rem)] text-navy"
            lines={[
              <span key="a">Keressen minket</span>,
              <span key="b" className="text-green">
                bizalommal!
              </span>,
            ]}
          />
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-soft">
              Számunkra elsődleges betegeink állapota, ezért a legrövidebb várakozási idővel dolgozunk – akut esetben akár azonnali segítséget tudunk biztosítani. Bejelentkezés telefonon vagy személyesen.
            </p>
          </Reveal>

          <ul className="mt-9 grid gap-3">
            {rows.map((r, i) => (
              <Reveal as="li" key={r.label} delay={0.2 + i * 0.07} y={16}>
                <a
                  href={r.href}
                  target={r.href.startsWith("http") ? "_blank" : undefined}
                  rel={r.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="card group flex items-center gap-4 rounded-[1.5rem] px-5 py-4 transition-all duration-400 hover:-translate-y-1 hover:border-green/40 hover:shadow-lift"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy text-white transition-colors duration-400 group-hover:bg-green">
                    <r.icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-display text-[0.64rem] font-bold uppercase tracking-[0.2em] text-green-deep">{r.label}</span>
                    <span className="mt-0.5 block break-all font-display text-[0.95rem] font-bold text-navy">{r.value}</span>
                    {"note" in r && r.note && <span className="mt-0.5 block text-xs text-ink-soft">{r.note}</span>}
                  </span>
                  <ArrowIcon className="ml-auto h-4 w-4 shrink-0 text-green opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" />
                </a>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.5} className="mt-8 rounded-[1.5rem] border border-green/25 bg-mint/50 p-5">
            <p className="font-display text-[0.7rem] font-bold uppercase tracking-[0.2em] text-green-deep">Nyitvatartás</p>
            <p className="mt-2 text-[0.95rem] leading-relaxed text-navy">
              Egyéni kezelésekre <strong>előzetes bejelentkezés</strong> alapján fogadjuk vendégeinket. A csoportos órák heti órarendjét a{" "}
              <a href="#orak" className="font-bold underline decoration-green decoration-2 underline-offset-4">Csoportos órák</a> résznél találja.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.2} y={40} className="relative min-h-[420px] lg:min-h-0">
          <div className="card absolute inset-0 overflow-hidden rounded-[2rem] p-2">
            <iframe
              title="Hírös Medical Center térkép"
              src={mapSrc}
              className="h-full w-full rounded-[1.6rem] border-0 grayscale-[0.2]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <div className="pointer-events-none absolute bottom-6 left-6 rounded-2xl bg-white/90 px-4 py-3 shadow-lift backdrop-blur">
              <p className="font-display text-[0.62rem] font-bold uppercase tracking-[0.2em] text-green-deep">Itt talál minket</p>
              <p className="mt-0.5 font-display text-sm font-bold text-navy">
                {site.address.city}, {site.address.street}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
