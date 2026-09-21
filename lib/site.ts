// Minden tartalmi adat egy helyen. Forrás: facebook.com/hirosmedicalcenter (2026. szeptember).

export const site = {
  name: "Hírös Medical Center",
  shortName: "Hírös Medical",
  tagline: "A mozgás a legjobb orvosság.",
  script: "Mi segítünk elkezdeni.",
  description:
    "Gyógytorna, McKenzie-terápia, manuális technikák, sportrehabilitáció, lökéshullám-, TR/Tecar-, mágnes- és lézerterápia, masszázs és kiscsoportos gyógytorna-órák Kecskeméten, az Ady Endre utca 10. alatt.",
  url: "https://hirosmedicalcenter.hu",
  phone: "+36 70 523 4732",
  phoneHref: "tel:+36705234732",
  email: "hirosmedicalcenter@gmail.com",
  address: { street: "Ady Endre utca 10.", zip: "6000", city: "Kecskemét" },
  facebook: "https://www.facebook.com/hirosmedicalcenter/",
  mapsQuery: "Hírös Medical Center, Kecskemét, Ady Endre utca 10.",
  founder: {
    name: "Ivánné Juhász Andrea",
    titles: ["gyógytornász-fizioterapeuta", "sportrehabilitációs tréner", "ProSki tréner"],
    role: "a Hírös Medical Center vezetője",
  },
  founded: 2019,
} as const;

export const nav = [
  { href: "#panaszok", label: "Panaszok" },
  { href: "#szolgaltatasok", label: "Szolgáltatások" },
  { href: "#kezelesek", label: "Kezelések" },
  { href: "#orak", label: "Csoportos órák" },
  { href: "#rolunk", label: "Rólunk" },
  { href: "#galeria", label: "Galéria" },
  { href: "#kapcsolat", label: "Kapcsolat" },
] as const;

/** A "Van megoldás!" testtérkép pontjai (a pozíciók a BodyMap komponensben). */
export const complaints = [
  { id: "vall", label: "Vállpanaszok", detail: "Meszes váll, befagyott váll, krónikus vállfájdalom" },
  { id: "derek", label: "Derék- és hátfájdalom", detail: "Gerincsérv, lumbágó, tartáshibák, merev hát" },
  { id: "izom", label: "Fájdalmas izomcsomók", detail: "Triggerpontok, letapadások, feszes izomzat" },
  { id: "konyok", label: "Tenisz- és golfkönyök", detail: "Túlterheléses ínhüvely-gyulladások" },
  { id: "csipo", label: "Csípő- és térdfájdalom", detail: "Kopásos panaszok, patella-ín, ugrótérd" },
  { id: "kez", label: "Kéztőalagút-szindróma", detail: "Zsibbadás, feszülés, alagút szindrómák" },
  { id: "sarok", label: "Sarokfájdalom", detail: "Sarkantyú, plantaris fasciitis, Achilles-ín panaszok" },
] as const;

export type ServiceGroup = {
  id: string;
  title: string;
  lead: string;
  icon: "physio" | "device" | "hands";
  items: { name: string; text: string }[];
};

export const serviceGroups: ServiceGroup[] = [
  {
    id: "gyogytorna",
    title: "Gyógytorna és rehabilitáció",
    lead: "Egyénre szabott mozgásterápia akut és krónikus mozgásszervi panaszokra – a felméréstől a teljes funkció visszanyeréséig.",
    icon: "physio",
    items: [
      { name: "Gyógytorna", text: "Egyéni felmérés után összeállított, célzott gyakorlatsor a fájdalom csökkentésére és a mozgás helyreállítására." },
      { name: "McKenzie-terápia", text: "Gerincpanaszok mechanikai diagnosztikája és kezelése irányspecifikus gyakorlatokkal, derék- és nyakfájdalomra." },
      { name: "Manuális technikák", text: "Ízületi mobilizáció és lágyrész-technikák a beszűkült mozgástartományok felszabadítására." },
      { name: "Sportrehabilitáció, ProSki tréning", text: "Sérülés utáni visszatérés és teljesítményfókuszú felkészítés – síelőknek speciális ProSki programmal." },
      { name: "Műtét előtti és utáni torna", text: "Felkészítő torna a beavatkozás előtt, majd fokozatos rehabilitáció a műtét után." },
      { name: "Stabilizáló tréning", text: "A mély törzsizmok és a gerinc körüli stabilizáló rendszer megerősítése a visszatérő panaszok ellen." },
    ],
  },
  {
    id: "fizikoterapia",
    title: "Modern fizikoterápia",
    lead: "A legkorszerűbb BTL készülékekkel – gyógyszermentes, célzott kezelések, amelyek a panasz forrásánál hatnak.",
    icon: "device",
    items: [
      { name: "Lökéshullám-terápia", text: "Az egyetlen konzervatív eljárás, amely mechanikusan feloldja a meszesedést. Sarkantyúra, meszes vállra, teniszkönyökre." },
      { name: "TR Therapy (Tecar)", text: "Rádiófrekvenciás mélymelegítés, amely fokozza a keringést és ellazítja a feszes, túlterhelt izomzatot – manuális kezeléssel kombinálva." },
      { name: "Induktív mágnesterápia (SIS)", text: "Nagy intenzitású elektromágneses mező a fókuszált, keringést nem terhelő fájdalomcsillapításra és izomaktiválásra." },
      { name: "Soft-laser kezelés", text: "Gyulladáscsökkentő, sebgyógyulást és regenerációt segítő lágylézer-terápia." },
      { name: "Ultrahang-kezelés", text: "Mélyszöveti mikromasszázs ínhüvely-gyulladásokra és letapadásokra." },
      { name: "Elektroterápia", text: "TENS, interferencia és egyéb áramformák a fájdalomcsillapításra és az izomstimulációra." },
    ],
  },
  {
    id: "masszazs",
    title: "Masszázs és lágyrész-kezelés",
    lead: "Frissítő, gyógyító és relaxáló technikák – önállóan vagy a gyógytorna kiegészítéseként.",
    icon: "hands",
    items: [
      { name: "Frissítő masszázs", text: "Élénkítő, izomlazító svédmasszázs a mindennapi feszültség oldására." },
      { name: "Nyirokkeringést serkentő masszázs", text: "Finom, ritmikus fogások az ödéma csökkentésére és a méregtelenítés támogatására." },
      { name: "Lávaköves masszázs", text: "Meleg bazaltkövekkel végzett, mélyen ellazító kezelés." },
      { name: "Relaxáló masszázs", text: "Nyugtató, stresszoldó egésztest-masszázs." },
      { name: "Köpölyözés", text: "Vákuumos technika a letapadások oldására és a helyi keringés fokozására." },
      { name: "Flossing", text: "Kompressziós szalagos módszer az ízületi mozgástartomány gyors javítására." },
    ],
  },
];

export type Treatment = {
  id: string;
  kicker: string;
  title: string;
  question: string;
  text: string[];
  helps: string[];
  image: "shock-photo" | "tr-photo" | "device";
  note?: string;
};

export const treatments: Treatment[] = [
  {
    id: "lokeshullam",
    kicker: "Bizonyított megoldás makacs panaszokra",
    title: "Lökéshullám-terápia",
    question: "Nem múló sarok-, váll- vagy könyökfájdalom?",
    text: [
      "A mindennapokat megkeserítő sarok-, talp-, váll- vagy könyökfájdalom hátterében gyakran krónikus gyulladás vagy meszesedés áll. A lökéshullám-terápia az egyetlen műtét nélküli eljárás, amely képes mechanikusan feloldani a szövetekben lerakódott meszesedést.",
      "A kezelőfej nagy energiájú akusztikus hullámai célzottan hatolnak a szövetekbe, fellazítják a meszes gócokat és a letapadásokat, miközben a terület vér- és nyirokkeringése többszörösére fokozódik – a szervezet így kimossa a feloldott mészszemcséket, a gyulladás csökken, az öngyógyítás felgyorsul.",
    ],
    helps: [
      "Sarkantyú, plantaris fasciitis",
      "Achilles-ín panaszok",
      "Meszes váll, krónikus vállfájdalom",
      "Tenisz- és golfkönyök",
      "Makacs izomcsomók, triggerpontok",
      "Kéztőalagút-szindróma",
      "Pattanó ujj",
      "Térdpanaszok (patella-ín, ugrótérd)",
    ],
    image: "shock-photo",
    note: "Gyors, gyógyszermentes – már 3–5 alkalom után tartós, érezhető javulást hozhat.",
  },
  {
    id: "tr-therapy",
    kicker: "Célzott rádiófrekvenciás kezelés",
    title: "TR Therapy (Tecar)",
    question: "Feszül, húz, fáj?",
    text: [
      "A TR-terápia rádiófrekvenciás energiát juttat a kezelt szövetekbe, ahol belső, endogén hő keletkezik. A felmelegedő terület keringése fokozódik, több oxigén és tápanyag érkezik, az izomtónus csökken, a lágyrészek rugalmasabbá válnak.",
      "A kezelőfej mozgatása közben manuálisan is dolgozunk a szöveteken, így a rádiófrekvenciás kezelés és a lágyrész-mobilizálás egyszerre történik. Nem egyszerű „melegítő kezelés”: a készülék módjait a szövethez, a probléma mélységéhez és a kezelés céljához igazítjuk.",
    ],
    helps: [
      "Nyak–váll feszülés",
      "Izomcsomók, letapadások",
      "Feszes, merev izmok",
      "Hát- és derékfájdalom",
      "Vállfájdalom, teniszkönyök",
      "Térdfájdalom",
      "Kézzsibbadás, alagút szindrómák",
      "Túlterhelés, sportsérülések",
    ],
    image: "tr-photo",
    note: "Célzott kezelés. Szabadabb mozgás. Önállóan vagy gyógytornával, manuális technikákkal kombinálva.",
  },
  {
    id: "sis",
    kicker: "BTL Super Inductive System",
    title: "Induktív mágnesterápia",
    question: "Fókuszált, keringést nem terhelő kezelés",
    text: [
      "A készülék nagy intenzitású elektromágneses mezőt hoz létre, amely kölcsönhatásba lép a test szöveteivel – leginkább az izmokkal és az idegszövettel. Az eredmény izom-összehúzódás, az idegsejtek depolarizációja és a vérkeringésre gyakorolt pozitív hatás.",
      "A vázizomrendszer, az idegrendszer és a lágyrészek krónikus és akut rendellenességeinek kezelésére használjuk. Előnye, hogy a mezőt fókuszáltan a problémás területre irányítjuk, így nem terheli meg a keringést.",
    ],
    helps: [
      "Izomfájdalom, izomgörcsök",
      "Alagút szindrómák",
      "Teniszkönyök",
      "Sarokfájdalom",
      "Derékfájdalom",
      "Ízületi mobilizáció",
      "Törésgyógyulás támogatása",
      "Idegregeneráció",
    ],
    image: "device",
  },
];

export type Day = "H" | "K" | "Sze" | "Cs" | "P";
export const days: { key: Day; label: string; short: string }[] = [
  { key: "H", label: "Hétfő", short: "Hét" },
  { key: "K", label: "Kedd", short: "Kedd" },
  { key: "Sze", label: "Szerda", short: "Sze" },
  { key: "Cs", label: "Csütörtök", short: "Csüt" },
  { key: "P", label: "Péntek", short: "Pén" },
];

export type GroupClass = {
  id: string;
  title: [string, string];
  tagline: string;
  text: string;
  audience: string;
  hue: "green" | "navy" | "teal" | "lime" | "sky" | "moss";
  poster: "senior" | "gyerek" | "core" | "osteo" | "mobilitas" | "45plus";
  slots: { day: Day; time: string }[];
};

export const groupClasses: GroupClass[] = [
  {
    id: "senior",
    title: ["Senior", "Torna"],
    tagline: "Biztonságos mozgás, jobb egyensúly, könnyebb mindennapok.",
    text: "60 perces, kíméletesen felépített csoportos torna az idősebb korosztály számára. Cél az egyensúly, a mobilitás, az izomerő és a mindennapi terhelhetőség fejlesztése biztonságos gyakorlatokkal.",
    audience: "Idősebb korosztály",
    hue: "green",
    poster: "senior",
    slots: [
      { day: "H", time: "16:00" },
      { day: "Sze", time: "16:00" },
      { day: "K", time: "11:00" },
    ],
  },
  {
    id: "gyerek",
    title: ["Tartásjavító", "Gerinctorna gyerekeknek"],
    tagline: "Szebb testtartás, jobb testtudat, magabiztosabb mozgás.",
    text: "60 perces, játékos és tudatosan felépített csoportos torna iskolás korú gyermekek számára. Cél a helyes testtartás támogatása, a törzsizmok erősítése, valamint a mozgáskoordináció és a testtudat fejlesztése.",
    audience: "Iskolás gyerekek",
    hue: "sky",
    poster: "gyerek",
    slots: [
      { day: "K", time: "17:00" },
      { day: "Cs", time: "17:00" },
    ],
  },
  {
    id: "core",
    title: ["Balance", "Gerinc / Core"],
    tagline: "Stabilabb törzs, jobb testtartás, magabiztosabb mozgás.",
    text: "60 perces, tudatosan felépített csoportos torna a mély törzsizmok, a gerinc körüli stabilizáló rendszer és a testtartás fejlesztésére.",
    audience: "Minden korosztály",
    hue: "navy",
    poster: "core",
    slots: [
      { day: "H", time: "17:00" },
      { day: "Sze", time: "17:00" },
      { day: "P", time: "09:00" },
    ],
  },
  {
    id: "osteo",
    title: ["Osteoporosis", "Mozgásprogram"],
    tagline: "Erősebb csontok, biztonságosabb egyensúly, magabiztosabb mozgás.",
    text: "60 perces, szakmailag felépített csoportos torna biztonságos erősítő, tartásjavító és egyensúlyfejlesztő gyakorlatokkal az elesési kockázat csökkentéséért – a csontritkulás megelőzésére és kezelésére.",
    audience: "Csontritkulás megelőzésére",
    hue: "moss",
    poster: "osteo",
    slots: [
      { day: "K", time: "10:00" },
      { day: "P", time: "10:00" },
      { day: "H", time: "15:00" },
      { day: "Sze", time: "15:00" },
    ],
  },
  {
    id: "mobilitas",
    title: ["Balance", "Mobilitás"],
    tagline: "Mozogj könnyedebben. Mozogj szabadabban.",
    text: "60 perces csoportos mozgásóra, ahol mobilizáló, nyújtó és kontrollált erősítő gyakorlatokkal dolgozunk az ízületi mozgástartományok és a rugalmasság fejlesztéséért.",
    audience: "Minden korosztály",
    hue: "teal",
    poster: "mobilitas",
    slots: [
      { day: "K", time: "09:00" },
      { day: "K", time: "18:00" },
      { day: "P", time: "11:00" },
    ],
  },
  {
    id: "45plus",
    title: ["Erőben", "a 45+"],
    tagline: "Tudatos erő a mindennapokhoz.",
    text: "60 perces, fokozatosan felépített csoportos erősítő torna a 45 év feletti korosztály számára. Cél az izomerő, az egyensúly és a terhelhetőség fejlesztése biztonságos gyakorlatokkal.",
    audience: "45 év felettieknek",
    hue: "lime",
    poster: "45plus",
    slots: [
      { day: "H", time: "18:00" },
      { day: "Sze", time: "18:00" },
    ],
  },
];

export const classPerks = [
  { icon: "clock", label: "60 perces órák" },
  { icon: "group", label: "Kis létszámú csoportok", sub: "legfeljebb 8 fő" },
  { icon: "physio", label: "Gyógytornász vezetéssel" },
] as const;

export const stats = [
  { value: 10, suffix: "+", label: "év szakmai tapasztalat" },
  { value: 8, label: "fő max. egy csoportban" },
  { value: 6, label: "féle csoportos óra" },
  { value: 60, label: "perces órák" },
] as const;

export const values = [
  { title: "Komplex terápia", text: "Kezeléseink külön-külön, de egymással kombinálva is felvehetők – így egy valóban egyénre szabott, komplex terápiát állítunk össze." },
  { title: "Legmodernebb eszközök", text: "Színvonalas környezetben, a legkorszerűbb BTL fizikoterápiás készülékekkel és eszközökkel dolgozunk." },
  { title: "Rövid várakozás", text: "Számunkra elsődleges betegeink állapota, ezért a legrövidebb várakozási idővel dolgozunk – akut esetben akár azonnali segítséget tudunk biztosítani." },
  { title: "Folyamatos továbbképzés", text: "Szakmailag mindig a lehető legjobban szeretnénk teljesíteni, ezért tudásunkat folyamatos továbbképzésekkel bővítjük." },
] as const;

export const quote = {
  text: "Senki nem tud annyit tenni az egészségünkért, mint mi magunk.",
  by: "Hírös Medical Center",
} as const;
