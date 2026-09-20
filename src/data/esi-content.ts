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
    body: "Multi-year initiatives connecting industry, policymakers and experts around Europe's most consequential strategic challenges.",
  },
  {
    number: "03",
    title: "Reports & briefings",
    body: "Independent analysis, developed with leading experts, turning regulatory and geopolitical developments into clear, actionable insight.",
  },
  {
    number: "04",
    title: "Strategic support",
    body: "Tailored advisory drawing on our network of experts to help organisations navigate Europe's evolving policy and security landscape.",
  },
  {
    number: "05",
    title: "European Dialogue platform",
    body: "Operating at the intersection of business, policy and European institutions, translating sector needs into a stronger Central and Eastern European voice on Europe's geopolitical agenda.",
  },
];

export const sectors = [
  {
    title: "Addressing Europe's Strategic Challenges",
    topics: "TBD",
  },
  {
    title: "Competitiveness & Industrial Policy",
    topics: "TBD",
  },
  {
    title: "Defence, Security & Strategic Resilience",
    topics: "European Defence Fund · EDIP · SAFE",
  },
  {
    title: "Energy, Industry & Industrial Transformation",
    topics: "EU Industrial Strategy · circular economy · competitiveness · Net-Zero Industry Act · Fit for 55",
  },
  {
    title: "Critical Resources & Supply Chains",
    topics: "Critical Raw Materials Act · resilient supply chains",
  },
  {
    title: "Space, Nuclear & Emerging Technologies",
    topics: "EU Space Act · European Space Programme",
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
  // {
  //   title: "Chemicals & construction",
  //   topics: "REACH · CBAM for the cement sector",
  // },
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
    role: "Co-Founder & CEO",
    email: "agnieszka.sitek@esi-eu.com",
  }),
  person({
    name: "Daria Smolarek",
    role: "Communication & Program Director",
    email: "daria.smolarek@esi-eu.com",
  }),
];

export const executiveTeam: Person[] = [
  person({
    name: "Agnieszka Sitek-Kobosko",
    role: "Co-Founder & CEO",
    email: "agnieszka.sitek@esi-eu.com",
  }),
  person({
    name: "Daria Smolarek",
    role: "Communication & Program Director",
    email: "daria.smolarek@esi-eu.com",
    photoSlug: "daria_smolarek",
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
    bio: "Born in Warsaw, he is married and has three adult children. He graduated from the Faculty of Law at the University of Warsaw and has participated in international business scholarship programmes in the United Kingdom, including at Nottingham Trent University, and in the United States. He is the founder and President of BIGRAM, a human resources consultancy that has been successfully operating on the Polish market for more than 30 years. The company specialises in executive recruitment and HR advisory services, including management audits, 360-degree assessments and outplacement. BIGRAM is also the exclusive Polish partner of two renowned global networks: IIC Partners Executive Search, where Piotr Wielgomas served for several years as a member of the Global Board, and Career Star Group. For many years, BIGRAM has also been running Enactus Poland, part of the international Enactus student entrepreneurship initiative, which operates across 40 countries and 1,700 universities worldwide. Piotr Wielgomas also has extensive corporate governance experience, having served for many years on the supervisory boards of a number of companies. Beyond his professional activities, he has served for many years as Vice President of the Association of Collectors of Historical Securities. He is also a co-creator of a unique project reconstructing pre-war Warsaw in the form of a detailed scale model, developed together with the renowned Polish actor and director Emilian Kamiński."
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
    photoSlug: "joanna_kulczycka",
    bio: "Professor of Management Mineral and Energy Economy Research Institute Polish Academy of Sciences and  AGH University of Krakow, Poland Prof. Joanna Kulczycka is the Head and Founder of the Division of Strategic Research and the Department of Circular Economy at the Mineral and Energy Economy Research Institute of the Polish Academy of Sciences (MEERI PAS), and a Professor at the Academy of Krakow, Faculty of Management, where she delivers lectures on economics, circular economy, eco-innovation in industry, and corporate social responsibility (CSR). She also serves as Director of the IATI Bureau—the largest virtual research institute in Poland—and as President of the Waste Management and Recycling Cluster, a Key National Cluster in Poland. She is the author of over 250 publications, including the first Polish-language book on Life Cycle Assessment (LCA), the first Polish Minerals Yearbook, and more than 120 peer-reviewed scientific articles addressing raw materials, the circular economy, energy and waste management, eco-efficiency of industrial processes, corporate social responsibility (CSR), and just transition. She is a member of the UNEP International Resource Panel (IRP) and a co-author of two flagship reports: Global Resources Outlook 2024 and Global Environment Outlook 7. She has been actively involved in numerous national and European research and innovation projects. She also served as the organizer and Chair of the Steering Committee of EUIndTech2025 – Industrial Technologies and Materials for a Sustainable Europe, the EU flagship event held under the Polish Presidency of the Council of the European Union."
  }),
  person({
    name: "Adam Guibourgé-Czetwertyński",
    role: "Former Deputy Minister at the Polish Ministry of Climate and Environment",
    photoSlug: "adam_guibourge-czetwertynski",
    bio: "Former Secretary of State (Deputy Minister) at the Polish Ministry of Climate and Environment,former Government Plenipotentiary for Strategic Energy Infrastructure.  He currently works at Transport & Environment (T&E), providing evidence-based analysis and policy recommendations to Polish decision-makers on the transition to clean transport. Previously, he served as Head of the Environment Section at Poland’s Permanent Representation to the EU and as a Deputy Minister in the Polish government. He was also a member of Poland’s UNFCCC Presidency negotiating team at COP19 in Warsaw and Poland’s chief negotiator at COP24 in Katowice."
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

// Placeholder roster — replace with real names/roles/bios before launch.
export const board: Person[] = [
  person({
    name: "TBD",
    role: "Board member profile pending",
  }),
  person({
    name: "TBD",
    role: "Board member profile pending",
  }),
  person({
    name: "TBD",
    role: "Board member profile pending",
  }),
  person({
    name: "TBD",
    role: "Board member profile pending",
  }),
];