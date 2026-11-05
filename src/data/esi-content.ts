import type { ImageMetadata } from "astro";

const peoplePhotos = import.meta.glob<{ default: ImageMetadata }>(
  "./people/*.{png,jpg,jpeg,webp}",
  { eager: true },
);

const partnerLogoFiles = import.meta.glob<{ default: ImageMetadata }>(
  "../assets/logos/*.svg",
  { eager: true },
);

/** Look up a partner mark by its exact filename in `src/assets/logos/`. */
function partnerLogo(filename: string): ImageMetadata {
  const match = Object.entries(partnerLogoFiles).find(([path]) =>
    path.endsWith(`/${filename}`),
  );
  if (!match) throw new Error(`Missing partner logo: ${filename}`);
  return match[1].default;
}

const benefitIconFiles = import.meta.glob<{ default: ImageMetadata }>(
  "../assets/icons/*.{svg,png}",
  { eager: true },
);

/** Look up a benefit icon by its exact filename in `src/assets/icons/`. */
function benefitIcon(filename: string): ImageMetadata {
  const match = Object.entries(benefitIconFiles).find(([path]) =>
    path.endsWith(`/${filename}`),
  );
  if (!match) throw new Error(`Missing benefit icon: ${filename}`);
  return match[1].default;
}

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
  /** Shrinks a tightly cropped portrait inside its card on small screens. */
  photoZoomOut?: boolean;
};

export type Person = {
  name: string;
  role: string;
  bio?: string;
  email?: string;
  photo?: ImageMetadata;
  photoZoomOut?: boolean;
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
    title: "Flagship programmes & Special projects",
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
    title: "Competitiveness & Industrial Policy",
    topics:
      "Supporting a stronger, more innovative and globally competitive European economy: advanced manufacturing, pharmaceuticals, life sciences ",
  },
  {
    title: "Financial Infrastructure & Economic Security",
    topics:
      "Payments, capital markets, digital finance and resilience",
  },
  {
    title: "Energy, Industry & Industrial Transformation",
    topics:
      "Energy systems, energy-intensive industries, advanced manufacturing, chemicals & pharmaceuticals, construction and industrial competitiveness",
  },
  {
    title: "Defence, Security & Strategic Resilience",
    topics:
      "Defence industries, security policy, dual-use technologies, health security, Europe’s resilience in an increasingly complex geopolitical environment",
  },
  {
    title: "Foundations of Europe's industrial sovereignty",
    topics:
      "Critical raw materials, strategic value chains: critical medicines & active pharmaceutical ingredients (APIs), resource security",
  },
  {
    title: "AI & Emerging technologies critical to Europe’s future competitiveness & strategic autonomy",
    topics:
      "Space & New Space industries, Civil Nuclear & SMR, biotechnology",
  },
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

export const memberBenefits = [
  {
    number: "01",
    eyebrow: "Engage",
    title: "Stay informed<br/> Be connected",
    icon: benefitIcon("Groups--Streamline-Outlined-Streamline-Material.png"),
    points: [
      "Access to high-quality insights and analysis",
      "Invitations to public events and briefings",
      "Join a growing community of forward-looking businesses",
      "Stay up to date on key EU policy developments",
    ],
    stage: "Intelligence",
  },
  {
    number: "02",
    eyebrow: "Participate",
    title: "Contribute <br/> Share perspectives",
    icon: benefitIcon("Handshake--Streamline-Lucide.svg"),
    points: [
      "Take part in sectoral discussions and working groups",
      "Access tailored briefings and closed-door meetings",
      "Share your expertise and business perspective",
      "Build valuable connections with policymakers and peers",
    ],
    stage: "Dialogue",
  },
  {
    number: "03",
    eyebrow: "Shape",
    title: "Co-create solutions<br/> Drive change",
    icon: benefitIcon("Open-Settings-Gear--Streamline-Plump.png"),
    points: [
      "Contribute to policy positions and recommendations",
      "Work with ESI experts and peers on key regulatory topics",
      "Help shape cross-border industry coalitions",
      "Increase your visibility in the European policy debate",
    ],
    stage: "Co-creation",
  },
  {
    number: "04",
    eyebrow: "Lead",
    title: "Set the agenda<br/> Create lasting impact",
    icon: benefitIcon(
      "Target-Arrow--Streamline-Rounded-Streamline-Material.png",
    ),
    points: [
      "Play a leading role in ESI's strategic priorities",
      "Co-initiate major projects and policy initiatives",
      "Engage directly with European institutions at the highest level",
      "Position your organisation as a key partner in shaping a stronger, more competitive Europe",
    ],
    stage: "Strategic leadership",
  },
];

export const partnershipBenefits = [
  {
    number: "01",
    title: "Co-create programmes and special initiatives",
    icon: benefitIcon(
      "Lightbulb-Circle--Streamline-Outlined-Streamline-Material-Free.svg",
    ),
    body: "Develop dedicated projects around strategic issues relevant to your organisation, sector and Europe",
    stage: "Programme development",
  },
  {
    number: "02",
    title: "Partner on research and thought leadership",
    icon: benefitIcon("File-Text--Streamline-Feather.svg"),
    body: "Work with ESI experts and external specialists on reports, analysis, briefings and other knowledge-driven projects",
    stage: "Research & insights",
  },
  {
    number: "03",
    title: "Bring the right people together",
    icon: benefitIcon("Groups--Streamline-Outlined-Streamline-Material.png"),
    body: "Co-create roundtables, expert discussions, conferences and other formats connecting business, academia, public institutions and European stakeholders",
    stage: "Dialogue & networking",
  },
  {
    number: "04",
    title: "Build visibility around shared priorities",
    icon: benefitIcon(
      "Bar-Chart-Increase--Streamline-Outlined-Streamline-Material.png",
    ),
    body: "Be recognised as a partner of selected ESI programmes, events and publications, with visibility appropriate to the nature of the collaboration",
    stage: "Visibility & impact",
  },
];

export const publicationCategories = [
  "Strategic Reports",
  "Policy Briefs",
  "Expert Commentary",
  "Research Papers",
  "Event Insights",
];

export const eventFormats = [
  "Executive Roundtables",
  "Policy Dialogues",
  "Strategic Forums",
  "Closed-Door Expert Discussions",
  "Public Conferences",
  "Bilateral Stakeholder Meetings",
];

export const founders: Person[] = [
  person({
    name: "Agnieszka Sitek-Kobosko",
    role: "Co-Founder & CEO",
    email: "agnieszka.sitek@esi-eu.com",
    photoSlug: "agnieszka_sitek-kobosko",
    bio: "Founding President and CEO of The European Strategy Institute, an independent Brussels-based think tank dedicated to advancing strategic dialogue and developing forward-looking solutions for Europe's most pressing political, economic and societal challenges. Under her leadership, The European Strategy Institute brings together leaders from policy, business, academia and civil society to strengthen Europe's competitiveness, resilience and global influence. The Institute serves as a platform for expert analysis, cross-sector collaboration and high-level dialogue on the future of Europe. Agnieszka is a strategic communications and public affairs executive with more than 15 years of international experience spanning corporate communications, stakeholder engagement, reputation management and organisational transformation. Throughout her career, she has advised senior executives and leadership teams across Europe and Asia, helping organisations navigate change, build trust and communicate effectively in complex and rapidly evolving environments. Prior to establishing The European Strategy Institute, she held senior leadership roles within global organisations. At InPost Group, she led international brand communications and sponsorship integration across multiple European markets. At Citi, she served as Communications & Employee Engagement Manager and Chief of Staff for Global Consumer Technology, overseeing communication and engagement initiatives for a workforce of more than 5,000 professionals across EMEA and Asia. Earlier in her career, she held positions in marketing, corporate communications, retail development and brand strategy at Levi Strauss & Co., Momentum Worldwide, Brand Designers Planet, PepsiCo and Ogilvy, contributing to initiatives that strengthened organisational reputation, stakeholder engagement and business growth. Based in Brussels, at the heart of European decision-making, Agnieszka is committed to fostering trusted leadership, strategic foresight and meaningful dialogue that contributes to a stronger and more competitive Europe.",
  }),
  person({
    name: "Žygimantas Vaičiūnas",
    role: "Former Minister of Energy of Lithuania; former Energy Attaché to the European Union",
    photoSlug: "zygimantas_vaiciunas",
    bio: "An energy policy expert and former Lithuanian Minister of Energy, with more than 20 years of experience shaping national and European energy policy, advancing strategic energy infrastructure, and strengthening energy security. As Lithuania’s Minister of Energy across three governments, he led and contributed to key initiatives at the intersection of energy security, the energy transition, and European energy policy. He has also served as Acting Prime Minister, Acting Minister of Economy and Innovation, and Acting Minister of Environment. His career spans senior positions in the Lithuanian government, the Permanent Representation of Lithuania to the European Union, and the European Solar Manufacturing Council in Brussels, where he focused on European industrial policy for solar PV manufacturing. He has been closely involved in major strategic energy initiatives, including the synchronisation of the Baltic States’ electricity grids with Continental Europe, the development of renewable energy, and the deployment of battery energy storage systems. Žygimantas holds a Master’s degree in Political Science and European Studies and a Bachelor’s degree in Political Science from Vilnius University.",
  }),
  person({
    name: "TBD",
    role: "Founding member profile pending",
  }),
  person({
    name: "Matteo Maggiore",
    role: "Founding member profile pending",
    bio: "Senior Adviser at the European Investment Bank (EIB) Group, where he previously served as Director of Communications from 2014 to 2025. With an extensive career in journalism, media and communications management, he has held senior positions across leading international organisations. Before joining the EIB Group, he served as Deputy Director of Communication and Public Affairs at the Organisation for Economic Co-operation and Development (OECD). Earlier in his career, he spent over two decades at the British Broadcasting Corporation (BBC), holding various roles spanning journalism, policy and strategy, with a focus on global communications, policy and media. His professional experience also includes working at the European Broadcasting Union in Geneva, serving as a senior consultant in media, telecommunications and technology in Brussels, and holding positions at the European Parliament and the European Commission. Matteo holds a master’s degree in international relations and is the author of both fiction and non-fiction works."
  }),
];

export const executiveTeam: Person[] = [
  person({
    name: "Agnieszka Sitek-Kobosko",
    role: "Co-Founder & CEO",
    email: "agnieszka.sitek@esi-eu.com",
    photoSlug: "agnieszka_sitek-kobosko",
    bio: "Founding President and CEO of The European Strategy Institute, an independent Brussels-based think tank dedicated to advancing strategic dialogue and developing forward-looking solutions for Europe's most pressing political, economic and societal challenges. Under her leadership, The European Strategy Institute brings together leaders from policy, business, academia and civil society to strengthen Europe's competitiveness, resilience and global influence. The Institute serves as a platform for expert analysis, cross-sector collaboration and high-level dialogue on the future of Europe. Agnieszka is a strategic communications and public affairs executive with more than 15 years of international experience spanning corporate communications, stakeholder engagement, reputation management and organisational transformation. Throughout her career, she has advised senior executives and leadership teams across Europe and Asia, helping organisations navigate change, build trust and communicate effectively in complex and rapidly evolving environments. Prior to establishing The European Strategy Institute, she held senior leadership roles within global organisations. At InPost Group, she led international brand communications and sponsorship integration across multiple European markets. At Citi, she served as Communications & Employee Engagement Manager and Chief of Staff for Global Consumer Technology, overseeing communication and engagement initiatives for a workforce of more than 5,000 professionals across EMEA and Asia. Earlier in her career, she held positions in marketing, corporate communications, retail development and brand strategy at Levi Strauss & Co., Momentum Worldwide, Brand Designers Planet, PepsiCo and Ogilvy, contributing to initiatives that strengthened organisational reputation, stakeholder engagement and business growth. Based in Brussels, at the heart of European decision-making, Agnieszka is committed to fostering trusted leadership, strategic foresight and meaningful dialogue that contributes to a stronger and more competitive Europe.",
  }),
  person({
    name: "Daria Smolarek",
    role: "Communication & Programme Director",
    email: "daria.smolarek@esi-eu.com",
    photoSlug: "daria_smolarek",
    bio: "Communications and programme management professional with over 20 years of experience spanning media, public institutions, non-profit organisations and the creative sector. Prior to joining ESI, she worked at the Chancellery of the Sejm of the Republic of Poland, within the Office of the Marshal of the Sejm, where she was responsible for communications and public engagement activities for “Sejm Otwarty”, an initiative designed to strengthen connections between the Polish Parliament and citizens through social, cultural and educational programmes. She also developed and coordinated a range of projects aimed at increasing civic participation and public engagement. Earlier in her career, Daria spent more than twelve years at TVN, one of Poland's leading television broadcasters, contributing to a wide range of programmes and editorial projects. Her responsibilities included content development, production coordination and team management. She later joined Next Film, where she coordinated a team of project managers responsible for artist relations, communication strategies and budget oversight. Throughout her career, she has led multidisciplinary teams and delivered projects across the media, public and creative sectors, combining expertise in strategic communications, programme development and stakeholder engagement. At ESI, she leads the Institute's communications activities and supports the development and delivery of strategic programmes, partnerships and public engagement initiatives. She is currently pursuing a degree in Political Science with a specialisation in Communication and Public Relations at Vizja University in Warsaw.",
  }),
  person({
    name: "TBD",
    role: "Executive team",
    email: "TBD@esi-eu.com",
  }),
  person({
    name: "TBD",
    role: "Executive team",
    email: "TBD@esi-eu.com",
  }),
];

export const council: Person[] = [
  person({
    name: "Elżbieta Bieńkowska",
    role: "Former European Commissioner for the Internal Market and Industry; former Minister of Regional Development",
    photoSlug: "elzbieta_bienkowska",
    bio: "Former European Commissioner and Deputy Prime Minister of Poland, with extensive experience in European policy, regional development, industry and public administration. A graduate of the Jagiellonian University, Poland’s National School of Public Administration (KSAP) and postgraduate studies at the SGH Warsaw School of Economics, she was also a scholarship recipient of the British Foreign and Commonwealth Office and the German Marshall Fund. From 2014 to 2019, Elżbieta Bieńkowska served as European Commissioner for Internal Market, Industry, Entrepreneurship and SMEs. Previously, she was Poland’s Deputy Prime Minister and Minister of Infrastructure and Development (2013–2014) and Minister of Regional Development (2007–2013), playing a key role in regional policy and the management of European funds. Her career in public administration spans several decades, including senior positions responsible for regional development and European funds in the Silesian Voivodeship. Currently, Bieńkowska serves as Chair of the Board of the Centre for European Policy Studies (CEPS) in Brussels, Senior Advisor at Rasmussen Global, Chair of the University Council of the University of Silesia, and a member of the Supervisory Board of Ukrainian Railways. Her position as Chair of the CEPS Board is also confirmed in CEPS's latest annual reporting.",
  }),
  person({
    name: "Dominika Bettman",
    role: "Former President of Microsoft Poland; former head of the Siemens group in Poland",
    photoSlug: "dominika_bettman",
    bio: 'Manager with many years of experience; CFO and CEO of international technological corporations. Leader, mentor, and speaker. Author of the books "Technological Magnolias" and "When No One\'s Watching: Ethical Dilemmas in Business" (December 2025). Connects the worlds of technology and business with an ethical approach, arguing that progress only makes sense when it serves people and the environment. She promotes leadership based on values, empathy, and trust. Graduate of the Faculty of International Trade at the Warsaw School of Economics and the Advanced Management Program at IESE in Barcelona. Member of supervisory boards, academic committees, and the program boards of congresses and business initiatives.',
  }),
  person({
    name: "Dr Ewa Łabno-Falęcka",
    role: "Former Communications Director at Mercedes-Benz Poland; founder, Foundation for Development of Education for Industry",
    photoSlug: "ewa_labno-falecka",
    bio: "Academic, former diplomat and senior business executive with extensive experience at the intersection of industry, public policy, communications and Polish-German relations.  From 1993 to 1999, she served as Counsellor at the Embassy of the Republic of Poland in Bonn. In 2000, she joined Mercedes-Benz Group in Poland, where she held senior roles spanning strategy, change management, marketing communications, governmental affairs and public policy. From 2015, she coordinated Mercedes-Benz investment projects in Poland. Since 2024, she has run her own consultancy, ELF Consulting & Communication.  She is an expert in Industry 4.0 and sustainable development and lectures on New Mobility at the Warsaw University of Technology. She has co-founded and led several initiatives, including the Partnership for Road Safety, the Friends of the Museum of Modern Art in Warsaw and the Foundation for the Development of Education for Industry.  A contemporary art collector and regular commentator in business media, she has received numerous industry and public distinctions, including Businesswoman of the Year (2016) and the Cross of the Order of Merit of the Federal Republic of Germany. In 2025, she received the European University Viadrina Prize for her contribution to Polish-German political, economic and social dialogue and her support for women’s rights.",
  }),
  person({
    name: "Piotr Wielgomas",
    role: "Founder and President of BIGRAM",
    photoSlug: "piotr_wielgomas",
    bio: "Born in Warsaw, he is married and has three adult children. He graduated from the Faculty of Law at the University of Warsaw and has participated in international business scholarship programmes in the United Kingdom, including at Nottingham Trent University, and in the United States. He is the founder and President of BIGRAM, a human resources consultancy that has been successfully operating on the Polish market for more than 30 years. The company specialises in executive recruitment and HR advisory services, including management audits, 360-degree assessments and outplacement. BIGRAM is also the exclusive Polish partner of two renowned global networks: IIC Partners Executive Search, where Piotr Wielgomas served for several years as a member of the Global Board, and Career Star Group. For many years, BIGRAM has also been running Enactus Poland, part of the international Enactus student entrepreneurship initiative, which operates across 40 countries and 1,700 universities worldwide. Piotr Wielgomas also has extensive corporate governance experience, having served for many years on the supervisory boards of a number of companies. Beyond his professional activities, he has served for many years as Vice President of the Association of Collectors of Historical Securities. He is also a co-creator of a unique project reconstructing pre-war Warsaw in the form of a detailed scale model, developed together with the renowned Polish actor and director Emilian Kamiński.",
  }),
  person({
    name: "Prof. Piotr Wachowiak",
    role: "Rector of SGH Warsaw School of Economics; Chairman of KRUE",
    photoSlug: "piotr_wachowiak",
    bio: "Professor Piotr Wachowiak n- Ph.D., D.Sc. - Rector of the SGH Warsaw School of Economics  Deputy Chairman of the Committee of Organization and Management Sciences at the Polish Academy of Sciences (PAN), Chairman of the Conference of Rectors of Economic Universities and the Conference of Rectors of Warsaw Universities. Specializes in human resource management in organizations and corporate social responsibility. Author or co-author of publications on negotiations, conflict resolution, human resources management, intellectual capital measurement and knowledge management in enterprises.",
  }),
  person({
    name: "Andrij Deshchytsia",
    role: "Former Acting Minister of Foreign Affairs of Ukraine; Ambassador of Ukraine to Poland, 2014–2022",
    bio: "Born in Sokal, Ukraine, Andrii Deshchytsia holds an MA in History and a PhD in Political Science. He studied at Ivan Franko National University of Lviv and the University of Alberta in Canada. He speaks English, Polish and Russian. A career diplomat holding the rank of Ambassador Extraordinary and Plenipotentiary, Deshchytsia served as Minister for Foreign Affairs of Ukraine in 2014 and as Ambassador of Ukraine to Poland from 2014 to 2022. His previous roles include Special Representative of the OSCE Chairperson-in-Office for Conflict Resolution, Ambassador of Ukraine to Finland and Iceland, and Spokesperson for the Ministry of Foreign Affairs of Ukraine. Earlier in his career, he held diplomatic posts at Ukrainian embassies in Poland and Finland and served as Senior Coordinator of the Polish-American-Ukrainian Cooperation Initiative (PAUCI) in Kyiv. He currently serves as Honorary Consul of Iceland in Lviv and is the Founder and CEO of AAD Consult Ltd.",
    photoSlug: "andrij_deszczyca",
  }),
  person({
    name: "Jacek Siewiera",
    role: "Former Head of Poland’s National Security Bureau; Senior Fellow at the Atlantic Council",
    photoSlug: "jacek_siewiera",
    photoZoomOut: true,
    bio: "Polish transatlantic security strategist, military physician, and founder of Hybrid Global Strategy, a company focused on civil protection, CBRN infrastructure, and defence technologies. From 2022 to 2025, he served as Secretary of State and Head of Poland’s National Security Bureau. A lieutenant colonel in the reserve and a holder of a habilitation (DSc) in medical sciences, he brings extensive experience at the intersection of medicine, defence policy, and hybrid threat response. After completing his government service in early 2025, he transitioned to international strategic roles. He is a Clarendon Scholar at the University of Oxford and a Senior Fellow at the Atlantic Council, where his work focuses on transatlantic security, resilience, and the evolving sub-defence sector. Founder of Hybrid Global Strategy (Hybrid GS), a holding company focused on urban life-protection infrastructure, CBRN preparedness, and technologies designed to counter hybrid threats, contributing to the development of advanced security and resilience solutions. In parallel, he serves as an Associate Professor at the Polish Naval Academy and remains a leading authority in international discussions on hybrid threats, national resilience, and the transformation of civil defence.",
  }),
  person({
    name: "Prof. Joanna Kulczycka",
    role: "Professor at AGH University of Krakow; Head of the Circular Economy Division at IGSMiE PAN",
    photoSlug: "joanna_kulczycka",
    photoZoomOut: true,
    bio: "Professor of Management Mineral and Energy Economy Research Institute Polish Academy of Sciences and  AGH University of Krakow, Poland Prof. Joanna Kulczycka is the Head and Founder of the Division of Strategic Research and the Department of Circular Economy at the Mineral and Energy Economy Research Institute of the Polish Academy of Sciences (MEERI PAS), and a Professor at the Academy of Krakow, Faculty of Management, where she delivers lectures on economics, circular economy, eco-innovation in industry, and corporate social responsibility (CSR). She also serves as Director of the IATI Bureau—the largest virtual research institute in Poland—and as President of the Waste Management and Recycling Cluster, a Key National Cluster in Poland. She is the author of over 250 publications, including the first Polish-language book on Life Cycle Assessment (LCA), the first Polish Minerals Yearbook, and more than 120 peer-reviewed scientific articles addressing raw materials, the circular economy, energy and waste management, eco-efficiency of industrial processes, corporate social responsibility (CSR), and just transition. She is a member of the UNEP International Resource Panel (IRP) and a co-author of two flagship reports: Global Resources Outlook 2024 and Global Environment Outlook 7. She has been actively involved in numerous national and European research and innovation projects. She also served as the organizer and Chair of the Steering Committee of EUIndTech2025 – Industrial Technologies and Materials for a Sustainable Europe, the EU flagship event held under the Polish Presidency of the Council of the European Union.",
  }),
  person({
    name: "Adam Guibourgé-Czetwertyński",
    role: "Former Deputy Minister at the Polish Ministry of Climate and Environment",
    photoSlug: "adam_guibourge-czetwertynski",
    bio: "Former Secretary of State (Deputy Minister) at the Polish Ministry of Climate and Environment,former Government Plenipotentiary for Strategic Energy Infrastructure.  He currently works at Transport & Environment (T&E), providing evidence-based analysis and policy recommendations to Polish decision-makers on the transition to clean transport. Previously, he served as Head of the Environment Section at Poland’s Permanent Representation to the EU and as a Deputy Minister in the Polish government. He was also a member of Poland’s UNFCCC Presidency negotiating team at COP19 in Warsaw and Poland’s chief negotiator at COP24 in Katowice.",
  }),
  person({
    name: "Žygimantas Vaičiūnas",
    role: "Former Minister of Energy of Lithuania; former Energy Attaché to the European Union",
    photoSlug: "zygimantas_vaiciunas",
    bio: "An energy policy expert and former Lithuanian Minister of Energy, with more than 20 years of experience shaping national and European energy policy, advancing strategic energy infrastructure, and strengthening energy security. As Lithuania’s Minister of Energy across three governments, he led and contributed to key initiatives at the intersection of energy security, the energy transition, and European energy policy. He has also served as Acting Prime Minister, Acting Minister of Economy and Innovation, and Acting Minister of Environment. His career spans senior positions in the Lithuanian government, the Permanent Representation of Lithuania to the European Union, and the European Solar Manufacturing Council in Brussels, where he focused on European industrial policy for solar PV manufacturing. He has been closely involved in major strategic energy initiatives, including the synchronisation of the Baltic States’ electricity grids with Continental Europe, the development of renewable energy, and the deployment of battery energy storage systems. Žygimantas holds a Master’s degree in Political Science and European Studies and a Bachelor’s degree in Political Science from Vilnius University.",
  }),
  // person({
  //   name: "Sameer Chauhan",
  //   role: "Director of the United Nations International Computing Centre (UNICC), with over twenty years of experience across the public and private sectors, including senior roles at Deutsche Bank and Deloitte.",
  // }),
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
    name: "Agnieszka Sitek-Kobosko",
    role: "Co-Founder & CEO",
    email: "agnieszka.sitek@esi-eu.com",
    photoSlug: "agnieszka_sitek-kobosko",
    bio: "Founding President and CEO of The European Strategy Institute, an independent Brussels-based think tank dedicated to advancing strategic dialogue and developing forward-looking solutions for Europe's most pressing political, economic and societal challenges. Under her leadership, The European Strategy Institute brings together leaders from policy, business, academia and civil society to strengthen Europe's competitiveness, resilience and global influence. The Institute serves as a platform for expert analysis, cross-sector collaboration and high-level dialogue on the future of Europe. Agnieszka is a strategic communications and public affairs executive with more than 15 years of international experience spanning corporate communications, stakeholder engagement, reputation management and organisational transformation. Throughout her career, she has advised senior executives and leadership teams across Europe and Asia, helping organisations navigate change, build trust and communicate effectively in complex and rapidly evolving environments. Prior to establishing The European Strategy Institute, she held senior leadership roles within global organisations. At InPost Group, she led international brand communications and sponsorship integration across multiple European markets. At Citi, she served as Communications & Employee Engagement Manager and Chief of Staff for Global Consumer Technology, overseeing communication and engagement initiatives for a workforce of more than 5,000 professionals across EMEA and Asia. Earlier in her career, she held positions in marketing, corporate communications, retail development and brand strategy at Levi Strauss & Co., Momentum Worldwide, Brand Designers Planet, PepsiCo and Ogilvy, contributing to initiatives that strengthened organisational reputation, stakeholder engagement and business growth. Based in Brussels, at the heart of European decision-making, Agnieszka is committed to fostering trusted leadership, strategic foresight and meaningful dialogue that contributes to a stronger and more competitive Europe.",
  }),
  person({
    name: "Dominika Bettman",
    role: "Former President of Microsoft Poland; former head of the Siemens group in Poland",
    photoSlug: "dominika_bettman",
    bio: 'Manager with many years of experience; CFO and CEO of international technological corporations. Leader, mentor, and speaker. Author of the books "Technological Magnolias" and "When No One\'s Watching: Ethical Dilemmas in Business" (December 2025). Connects the worlds of technology and business with an ethical approach, arguing that progress only makes sense when it serves people and the environment. She promotes leadership based on values, empathy, and trust. Graduate of the Faculty of International Trade at the Warsaw School of Economics and the Advanced Management Program at IESE in Barcelona. Member of supervisory boards, academic committees, and the program boards of congresses and business initiatives.',
  }),
  person({
    name: "Piotr Wielgomas",
    role: "Founder and President of BIGRAM",
    photoSlug: "piotr_wielgomas",
    bio: "Born in Warsaw, he is married and has three adult children. He graduated from the Faculty of Law at the University of Warsaw and has participated in international business scholarship programmes in the United Kingdom, including at Nottingham Trent University, and in the United States. He is the founder and President of BIGRAM, a human resources consultancy that has been successfully operating on the Polish market for more than 30 years. The company specialises in executive recruitment and HR advisory services, including management audits, 360-degree assessments and outplacement. BIGRAM is also the exclusive Polish partner of two renowned global networks: IIC Partners Executive Search, where Piotr Wielgomas served for several years as a member of the Global Board, and Career Star Group. For many years, BIGRAM has also been running Enactus Poland, part of the international Enactus student entrepreneurship initiative, which operates across 40 countries and 1,700 universities worldwide. Piotr Wielgomas also has extensive corporate governance experience, having served for many years on the supervisory boards of a number of companies. Beyond his professional activities, he has served for many years as Vice President of the Association of Collectors of Historical Securities. He is also a co-creator of a unique project reconstructing pre-war Warsaw in the form of a detailed scale model, developed together with the renowned Polish actor and director Emilian Kamiński.",
  }),
  person({
    name: "Daria Smolarek",
    role: "Communication & Programme Director",
    email: "daria.smolarek@esi-eu.com",
    photoSlug: "daria_smolarek",
    bio: "Communications and programme management professional with over 20 years of experience spanning media, public institutions, non-profit organisations and the creative sector. Prior to joining ESI, she worked at the Chancellery of the Sejm of the Republic of Poland, within the Office of the Marshal of the Sejm, where she was responsible for communications and public engagement activities for “Sejm Otwarty”, an initiative designed to strengthen connections between the Polish Parliament and citizens through social, cultural and educational programmes. She also developed and coordinated a range of projects aimed at increasing civic participation and public engagement. Earlier in her career, Daria spent more than twelve years at TVN, one of Poland's leading television broadcasters, contributing to a wide range of programmes and editorial projects. Her responsibilities included content development, production coordination and team management. She later joined Next Film, where she coordinated a team of project managers responsible for artist relations, communication strategies and budget oversight. Throughout her career, she has led multidisciplinary teams and delivered projects across the media, public and creative sectors, combining expertise in strategic communications, programme development and stakeholder engagement. At ESI, she leads the Institute's communications activities and supports the development and delivery of strategic programmes, partnerships and public engagement initiatives. She is currently pursuing a degree in Political Science with a specialisation in Communication and Public Relations at Vizja University in Warsaw.",
  }),
  person({
    name: "TBD",
    role: "Board member profile pending",
  }),
];

export type PartnerLogo = {
  name: string;
  logo: ImageMetadata;
};

export const partnerLogos: PartnerLogo[] = [
  { name: "KGHM Polska Miedź", logo: partnerLogo("KGHM_Logo.svg") },
  { name: "Veolia", logo: partnerLogo("Veolia_logo.svg") },
  { name: "KGHM Polska Miedź", logo: partnerLogo("KGHM_Logo2.svg") },
  { name: "Veolia", logo: partnerLogo("Veolia_logo2.svg") },
  { name: "Veolia", logo: partnerLogo("Veolia_logo3.svg") },
];
