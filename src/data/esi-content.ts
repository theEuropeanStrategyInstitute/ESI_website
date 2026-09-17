import type { ImageMetadata } from "astro";

const peoplePhotos = import.meta.glob<{ default: ImageMetadata }>(
  "./people/*.{png,jpg,jpeg,webp}",
  { eager: true },
);

/** Look up a portrait by `firstname_surname` filename (no extension). */
function personPhoto(slug: string): ImageMetadata | undefined {
  const match = Object.entries(peoplePhotos).find(([path]) => {
    const file = path.split("/").pop() ?? "";
    return file.replace(/\.(png|jpe?g|webp)$/i, "") === slug;
  });
  return match?.[1].default;
}

type PersonInput = {
  name: string;
  role: string;
  bio?: string;
  email?: string;
  /** Matches a file in `./people/` as `firstname_surname.(png|jpg|webp)`. */
  photoSlug?: string;
};

export type Person = {
  name: string;
  role: string;
  bio?: string;
  email?: string;
  photo?: ImageMetadata;
};

function person(input: PersonInput): Person {
  const { photoSlug, ...rest } = input;
  const photo = photoSlug ? personPhoto(photoSlug) : undefined;
  return photo ? { ...rest, photo } : rest;
}

export const strategicObjectives = [
  "Give Central and Eastern European business a permanent, professional voice in Brussels.",
  "Transform companies from regulation-takers into regulation co-authors.",
  "Provide independent, evidence-based analysis of the socio-economic impact of EU regulation.",
  "Build cross-border industry coalitions that contribute expertise to the EU legislative process.",
  "Develop the next generation of EU public-affairs capability in the CEE region.",
];

export const influenceTools = [
  {
    number: "01",
    title: "Executive round tables",
    body: "Closed-door conversations in Brussels that bring business leaders and public institutions together.",
  },
  {
    number: "02",
    title: "Flagship programmes",
    body: "Invitation-only forums focused on Europe’s future and the strategic challenges facing the continent.",
  },
  {
    number: "03",
    title: "Reports & briefings",
    body: "Industry reports and tailored executive briefings connecting policy developments to business decisions.",
  },
  {
    number: "04",
    title: "Strategic support",
    body: "Direct support for companies strengthening their position and relationships across European markets.",
  },
];

export const sectors = [
  {
    title: "Defence, security & dual-use",
    topics: "European Defence Fund · EDIP · SAFE",
  },
  {
    title: "Industry & manufacturing",
    topics: "EU Industrial Strategy · circular economy · competitiveness",
  },
  {
    title: "Critical raw materials",
    topics: "Critical Raw Materials Act · resilient supply chains",
  },
  {
    title: "Chemicals & construction",
    topics: "REACH · CBAM for the cement sector",
  },
  {
    title: "Special Projects",
    topics:
      "Fit for 55 · Net-Zero Industry Act · EU Space Act · European Space Programme",
  },
  //{
  //  title: "Space & New Space Economy",
  //  topics:
  //    "EU Space Act · European Space Programme · EUSPA · dual-use technologies",
  //},
  //{
  //  title: "Energy & energy-intensive industries",
  //  topics:
  //    "ETS1/ETS2 · CBAM · Fit for 55 · Net-Zero Industry Act · hydrogen · RED IV",
  //},
];

export const programmes = [
  {
    number: "Programme 01",
    title: "Future of Europe",
    body: "A platform for senior dialogue on Europe's economic direction, competitiveness and capacity to act.",
    note: "Detailed programme information to be confirmed.",
  },
  {
    number: "Programme 02",
    title: "Challenges for Europe & the World",
    body: "A forum examining the geopolitical, industrial and societal forces redefining Europe's place in the world.",
    note: "Detailed programme information to be confirmed.",
  },
];

export const founders: Person[] = [
  person({
    name: "Agnieszka Sitek-Kobosko",
    role: "Founder & Executive Director",
    email: "agnieszka.sitek@esi-eu.com",
  }),
  person({
    name: "Daria Smolarek",
    role: "Communication & Program Director",
    email: "daria.smolarek@esi-eu.com",
  }),
];

export const council: Person[] = [
  person({
    name: "Elżbieta Bieńkowska",
    role: "Former European Commissioner for the Internal Market and Industry; former Minister of Regional Development",
  }),
  person({
    name: "Dominika Bettman",
    role: "Former President of Microsoft Poland; former head of the Siemens group in Poland",
  }),
  person({
    name: "Dr Ewa Łabno-Falęcka",
    role: "Former Communications Director at Mercedes-Benz Poland; founder, Foundation for Development of Education for Industry",
  }),
  person({
    name: "Piotr Wielgomas",
    role: "Founder and President of BIGRAM",
    photoSlug: "piotr_wielgomas",
  }),
  person({
    name: "Prof. Piotr Wachowiak",
    role: "Rector of SGH Warsaw School of Economics; Chairman of KRUE",
  }),
  person({
    name: "Andrij Deszczyca",
    role: "Former Acting Minister of Foreign Affairs of Ukraine; Ambassador of Ukraine to Poland, 2014–2022",
  }),
  person({
    name: "Jacek Siewiera",
    role: "Former Head of Poland’s National Security Bureau; Senior Fellow at the Atlantic Council",
    photoSlug: "jacek_siewiera",
    bio: "Polish transatlantic security strategist, military physician, and founder of Hybrid Global Strategy, a company focused on civil protection, CBRN infrastructure, and defence technologies. From 2022 to 2025, he served as Secretary of State and Head of Poland’s National Security Bureau. A lieutenant colonel in the reserve and a holder of a habilitation (DSc) in medical sciences, he brings extensive experience at the intersection of medicine, defence policy, and hybrid threat response. After completing his government service in early 2025, he transitioned to international strategic roles. He is a Clarendon Scholar at the University of Oxford and a Senior Fellow at the Atlantic Council, where his work focuses on transatlantic security, resilience, and the evolving sub-defence sector. Founder of Hybrid Global Strategy (Hybrid GS), a holding company focused on urban life-protection infrastructure, CBRN preparedness, and technologies designed to counter hybrid threats, contributing to the development of advanced security and resilience solutions. In parallel, he serves as an Associate Professor at the Polish Naval Academy and remains a leading authority in international discussions on hybrid threats, national resilience, and the transformation of civil defence.",
  }),
  person({
    name: "Prof. Joanna Kulczycka",
    role: "Professor at AGH University of Krakow; Head of the Circular Economy Division at IGSMiE PAN",
  }),
  person({
    name: "Adam Guibourgé-Czetwertyński",
    role: "Former Deputy Minister at the Polish Ministry of Climate and Environment",
  }),
  person({
    name: "Žygimantas Vaičiūnas",
    role: "Former Minister of Energy of Lithuania; former Energy Attaché to the European Union",
  }),
  person({
    name: "Sameer Chauhan",
    role: "Director of the United Nations International Computing Centre (UNICC), with over twenty years of experience across the public and private sectors, including senior roles at Deutsche Bank and Deloitte.",
  }),
];

// Placeholder roster — replace with real names/roles/bios before launch.
export const experts: Person[] = [
  person({
    name: "TBD",
    role: "Expert profile pending",
  }),
  person({
    name: "TBD",
    role: "Expert profile pending",
  }),
  person({
    name: "TBD",
    role: "Expert profile pending",
  }),
  person({
    name: "TBD",
    role: "Expert profile pending",
  }),
];
