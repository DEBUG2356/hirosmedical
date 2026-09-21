import { site, nav } from "@/lib/site";
import { LogoLockup, Arc } from "./Logo";
import { PhoneIcon, MailIcon, PinIcon, FacebookIcon } from "./Icons";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-900 text-white">
      <div aria-hidden className="absolute -left-32 -bottom-40 h-[520px] w-[520px] opacity-[0.07]">
        <Arc id="footer-arc" className="h-full w-full" />
      </div>
      <div className="container-x relative grid gap-12 py-16 lg:grid-cols-[1.3fr_0.8fr_1fr] lg:py-20">
        <div>
          <LogoLockup light />
          <p className="mt-6 max-w-sm text-[0.95rem] leading-relaxed text-white/60">
            Gyógytorna, modern fizikoterápia, masszázs és kiscsoportos mozgásórák Kecskeméten – több mint 10 év tapasztalattal.
          </p>
          <p className="font-script mt-6 text-[1.8rem] font-semibold leading-none text-green-light">{site.script}</p>
        </div>

        <nav aria-label="Lábléc navigáció">
          <p className="font-display text-[0.66rem] font-bold uppercase tracking-[0.25em] text-green-light">Menü</p>
          <ul className="mt-5 space-y-2.5">
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="font-display text-[0.9rem] font-semibold text-white/80 transition-colors hover:text-green-light">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="font-display text-[0.66rem] font-bold uppercase tracking-[0.25em] text-green-light">Elérhetőség</p>
          <ul className="mt-5 space-y-3.5 text-[0.95rem]">
            <li>
              <a href={site.phoneHref} className="flex items-center gap-3 font-semibold transition-colors hover:text-green-light">
                <PhoneIcon className="h-4 w-4 text-green-light" /> {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="flex items-center gap-3 transition-colors hover:text-green-light">
                <MailIcon className="h-4 w-4 text-green-light" /> {site.email}
              </a>
            </li>
            <li className="flex items-start gap-3 text-white/80">
              <PinIcon className="mt-0.5 h-4 w-4 shrink-0 text-green-light" />
              <span>
                {site.address.zip} {site.address.city}, {site.address.street}
              </span>
            </li>
            <li>
              <a
                href={site.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 font-display text-[0.75rem] font-bold transition-colors hover:border-green-light hover:text-green-light"
              >
                <FacebookIcon className="h-4 w-4" /> Facebook
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="relative border-t border-white/10">
        <div className="container-x flex flex-col gap-2 py-6 text-[0.78rem] text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name} · {site.founder.name}
          </p>
          <p>Kecskemét, Ady Endre utca 10.</p>
        </div>
      </div>
    </footer>
  );
}
