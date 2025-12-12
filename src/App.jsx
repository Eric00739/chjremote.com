import React, { useEffect, useRef, useState } from "react";
import {
  Menu,
  X,
  Search,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  Cpu,
  Zap,
  Globe,
  Download,
  ArrowRight,
  ArrowLeft,
  Filter,
  CheckCircle,
  Settings,
  Truck,
  Clock,
  Users,
  PlayCircle,
  Star,
  Award,
  MessageSquare,
  Send,
  User
} from "lucide-react";
import Logo from "../logo/LOGO.png";

// --- Brand Constants ---
const COMPANY_NAME = "Dongguan Chuangjiang Electronics Co., Ltd.";
const BRAND_NAME = "CHJ Remotes";

// --- SEO Helper ---
const SEO_METADATA = {
  title: "CHJ Remotes | China Source Factory for RF Remotes & Controllers",
  description:
    "China source OEM factory for RF remote controls & controllers, car remotes, Tuya WiFi switches and infrared beam sensors. Free product design & prototyping."
};

// --- Contact Info Constants ---
const CONTACT_INFO = {
  address: "8th Floor, Building 1, Huawei Kegu Industrial Park, Dalingshan, Dongguan, Guangdong, China",
  phone: "+86 18028993261",
  whatsapp: "+86 18028993261",
  email: "sales@chjremote.com"
};

const CATALOG_URL = "/catalog.pdf";

// --- Brand Colors ---
const COLORS = {
  primary: "#1C2D5A", // Logo Text Blue
  accent: "#FF8A00" // Logo Dot Orange
};

// --- Language Support ---
const LANGUAGE_OPTIONS = [
  { code: "en", label: "EN" },
  { code: "fr", label: "FR" },
  { code: "pt", label: "PT" },
  { code: "es", label: "ES" },
  { code: "it", label: "IT" },
  { code: "ru", label: "RU" }
];

// --- Simple Path Routing (Static Multi-Page Support) ---
const KNOWN_PAGES = ["home", "about", "products", "blog", "contact"];

const pageFromPathname = (pathname) => {
  const cleaned = (pathname || "/").replace(/^\/+|\/+$/g, "");
  const segment = cleaned.split("/")[0];
  if (!segment || segment === "home") return "home";
  return KNOWN_PAGES.includes(segment) ? segment : "home";
};

const translations = {
  en: {
    nav: { home: "Home", about: "About", products: "Products", blog: "Blog", contact: "Contact", request: "Request a Quote" },
    hero: {
      badgeFactory: "China Source Factory | B2B OEM/ODM",
      badgeBrand: `${COMPANY_NAME} | ${BRAND_NAME}`,
      badgeFree: "Free Product Design & Prototyping",
      title: "China OEM RF Remote & Controller Factory",
      subtitle: "RF Remotes & Receivers · Car Remotes · Tuya WiFi Switches · Infrared Beam Sensors",
      bullets: [
        "Free industrial design + PCB/firmware prototyping for OEM projects",
        "433/868/315MHz RF remotes & controllers, multi-protocol compatible",
        "MP samples delivered in 7 days with RF test report"
      ],
      tags: [
        "ISO9001 · CE/FCC/ROHS",
        "In-house RF chamber & antenna tuning",
        "B2B only (no retail)"
      ],
      primaryCta: "Start OEM Project",
      secondaryCta: "Download Catalog (PDF)",
      ctaNote: "No middlemen · Factory direct pricing",
      freeNote: "Free for qualified B2B OEM/ODM projects · NDA supported",
      stats: { exp: "20+", expLabel: "Years Experience", qc: "100%", qcLabel: "QC Tested", countries: "50+", countriesLabel: "Countries Served" }
    },
    highlights: [
      { title: "Factory Direct B2B", desc: "No retail or dropshipping; engineering + production with NDA support." },
      { title: "7-Day MP Samples", desc: "PCB layout, antenna tuning, and molded enclosure delivered with test report." },
      { title: "Compliance & Shipping", desc: "CE/FCC/RoHS documents, HS codes ready, door-to-door to EU/US/LatAm." }
    ],
    industries: {
      title: "Built for Gates, Doors, Smart Home, Industrial",
      subtitle: "Protocols: HCS301/HCS361 rolling code, EV1527/PT2262 fixed/learning code, Tuya WiFi/Zigbee bridges, and multi-frequency clones.",
      bullets: [
        "Garage/gate automation distributors",
        "Access control OEM / panel builders",
        "Smart home integrators (Tuya/Alexa/Google)",
        "Industrial hoists and shutters",
        "Parking barrier arms & bollards",
        "Aftermarket car remotes (315/433MHz)"
      ],
      techTitle: "Technical Delivery",
      techList: [
        "RF validation: shielding room sweep, antenna VSWR tuning, and range proof.",
        "Firmware hooks: learning code tables, whitelist/blacklist, and Tuya SDK handoff.",
        "Docs ready: CE/FCC/RoHS, HS code, packing list, and aging test records.",
        "Support: engineer-to-engineer WhatsApp/Teams within GMT+8 business hours."
      ],
      ctaEngineer: "Book Engineer Call",
      ctaCatalog: "Catalog & Specs PDF"
    },
    process: {
      title: "From Concept to Delivery",
      subtitle: "Our streamlined OEM/ODM workflow ensures your custom remotes are market-ready in record time."
    },
    trending: { title: "Trending Solutions" },
    cases: { title: "Case Studies", subtitle: "Real projects: challenge -> solution -> outcome for distributors and OEM partners." },
    testimonials: { title: "What Our Clients Say", subtitle: "Trusted by distributors and system integrators worldwide." },
    faq: { title: "FAQ", subtitle: "Common queries regarding OEM, shipping, and compatibility." },
    catalog: { title: "Product Catalog", subtitle: "OEM/ODM only - ready for distributors and system integrators. Download the PDF catalog or request a tuned PCB layout for your protocol." },
    about: {
      title: `About ${COMPANY_NAME}`,
      subtitle: `Operating the brand ${BRAND_NAME}, we are a B2B-only RF remote manufacturer in Dongguan. No retail or dropshipping - only OEM/ODM for distributors and system integrators.`,
      cards: [
        { title: "B2B Only / Factory Direct", desc: "Direct engineering + production. We do not run consumer webshops." },
        { title: "Brand Clarity", desc: `Use ${BRAND_NAME} to avoid confusion with other 'Chuanghui' companies in the market.` },
        { title: "Export-Ready", desc: "ISO9001 plant with CE/FCC/RoHS capability and internal aging test lab." }
      ]
    },
    contact: {
      heroTitle: "Contact Our Factory",
      heroSubtitle: "Direct Manufacturer Pricing. Professional Technical Support.",
      b2bNote: "B2B projects only (distributors / OEM / system integrators). Please include application & volume."
    },
    blog: { title: "Industry Insights", subtitle: "Stay updated with the latest RF technology and company news." }
  },
  fr: {
    nav: { home: "Accueil", about: "À propos", products: "Produits", blog: "Blog", contact: "Contact", request: "Demander un devis" },
    hero: {
      badgeFactory: "Usine en Chine | OEM/ODM B2B",
      badgeBrand: `${COMPANY_NAME} | ${BRAND_NAME}`,
      badgeFree: "Conception & prototypage gratuits",
      title: "Usine OEM de télécommandes RF et contrôleurs",
      subtitle: "Télécommandes & récepteurs RF · Télécommandes auto · Interrupteurs WiFi Tuya · Faisceaux infrarouge",
      bullets: [
        "Conception industrielle + prototypage PCB/firmware offerts pour projets OEM",
        "Télécommandes/contrôleurs RF 433/868/315MHz, multi-protocole",
        "Échantillons MP en 7 jours avec rapport RF"
      ],
      tags: ["ISO9001 | CE/FCC/ROHS", "Chambre RF interne & réglage antenne", "Clients B2B uniquement (pas de retail)"],
      primaryCta: "Lancer un projet OEM",
      secondaryCta: "Télécharger le catalogue (PDF)",
      ctaNote: "Prix direct usine · Pas d'intermédiaire",
      freeNote: "Offerts pour projets B2B qualifiés · NDA disponible",
      stats: { exp: "20+", expLabel: "Années d'expérience", qc: "100%", qcLabel: "Tests QC", countries: "50+", countriesLabel: "Pays desservis" }
    },
    highlights: [
      { title: "B2B usine directe", desc: "Pas de retail ni dropshipping ; ingénierie + production sous NDA." },
      { title: "Échantillons en 7 jours", desc: "PCB, antenne et boîtier livrés avec rapport de test." },
      { title: "Conformité & logistique", desc: "Docs CE/FCC/RoHS, codes SH prêts, livraison UE/US/LatAm." }
    ],
    industries: {
      title: "Portails, portes, smart home, industriel",
      subtitle: "Protocoles : HCS301/HCS361, EV1527/PT2262, passerelles Tuya WiFi/Zigbee, clones multi-fréquences.",
      bullets: [
        "Distributeurs d'automatisme de portails",
        "Constructeurs OEM d'accès / tableaux",
        "Intégrateurs smart home (Tuya/Alexa/Google)",
        "Treuils et volets industriels",
        "Barrières et bornes de parking",
        "Télécommandes auto 315/433MHz"
      ],
      techTitle: "Livraison technique",
      techList: [
        "Validation RF : chambre blindée, accord VSWR, portée vérifiée.",
        "Firmware : tables d'apprentissage, listes blanche/noire, SDK Tuya.",
        "Docs : CE/FCC/RoHS, code SH, packing list, vieillissement.",
        "Support : ingénieur à ingénieur (WhatsApp/Teams, GMT+8)."
      ],
      ctaEngineer: "Appel avec ingénieur",
      ctaCatalog: "Catalogue & fiches PDF"
    },
    process: { title: "Du concept à la livraison", subtitle: "Workflow OEM/ODM pour lancer vos télécommandes rapidement." },
    trending: { title: "Solutions en vogue" },
    cases: { title: "Études de cas", subtitle: "Projets réels : défi -> solution -> résultat pour distributeurs/OEM." },
    testimonials: { title: "Ce que disent nos clients", subtitle: "Approuvé par distributeurs et intégrateurs." },
    faq: { title: "FAQ", subtitle: "Questions fréquentes sur l'OEM, l'expédition et la compatibilité." },
    catalog: { title: "Catalogue produit", subtitle: "OEM/ODM uniquement. Téléchargez le PDF ou demandez un PCB accordé à votre protocole." },
    about: {
      title: `À propos de ${COMPANY_NAME}`,
      subtitle: `${BRAND_NAME} est une usine RF 100% B2B à Dongguan. Pas de retail ni dropshipping - seulement OEM/ODM.`,
      cards: [
        { title: "B2B uniquement / usine", desc: "Ingénierie + production directe, pas de site e-commerce grand public." },
        { title: "Clarté de marque", desc: `Utilisez ${BRAND_NAME} pour éviter la confusion avec d'autres sociétés "Chuanghui".` },
        { title: "Prêt export", desc: "ISO9001, CE/FCC/RoHS, labo de vieillissement intégré." }
      ]
    },
    contact: {
      heroTitle: "Contacter l'usine",
      heroSubtitle: "Prix fabricant direct. Support technique pro.",
      b2bNote: "Projets B2B uniquement (distributeurs / OEM / intégrateurs). Merci d'indiquer l'usage et le volume."
    },
    blog: { title: "Analyses industrie", subtitle: "Restez à jour sur la RF et nos actualités." }
  },
  pt: {
    nav: { home: "Início", about: "Sobre", products: "Produtos", blog: "Blog", contact: "Contato", request: "Pedir um orçamento" },
    hero: {
      badgeFactory: "China Source Factory | B2B OEM/ODM",
      badgeBrand: `${COMPANY_NAME} | ${BRAND_NAME}`,
      badgeFree: "Free Product Design & Prototyping",
      title: "China OEM RF Remote & Controller Factory",
      subtitle: "RF Remotes & Receivers · Car Remotes · Tuya WiFi Switches · Infrared Beam Sensors",
      bullets: [
        "Free industrial design + PCB/firmware prototyping for OEM projects",
        "433/868/315MHz RF remotes & controllers, multi-protocol compatible",
        "MP samples delivered in 7 days with RF test report"
      ],
      tags: ["ISO9001 | CE/FCC/ROHS", "Câmara RF interna e ajuste de antena", "Somente clientes B2B (sem varejo)"],
      primaryCta: "Iniciar projeto OEM",
      secondaryCta: "Baixar catálogo (PDF)",
      ctaNote: "Preço direto de fábrica",
      freeNote: "Free for qualified B2B OEM/ODM projects · NDA supported",
      stats: { exp: "20+", expLabel: "Anos de experiência", qc: "100%", qcLabel: "Testado em QC", countries: "50+", countriesLabel: "Países atendidos" }
    },
    highlights: [
      { title: "B2B direto da fábrica", desc: "Sem varejo ou dropshipping; engenharia + produção com NDA." },
      { title: "Amostras em 7 dias", desc: "PCB, antena e carcaça com relatório de testes." },
      { title: "Conformidade e frete", desc: "Docs CE/FCC/RoHS, HS codes prontos, envio porta a porta UE/EUA/LatAm." }
    ],
    industries: {
      title: "Portões, portas, smart home, industrial",
      subtitle: "Protocolos: HCS301/HCS361, EV1527/PT2262, pontes Tuya WiFi/Zigbee e clones multifrequência.",
      bullets: [
        "Distribuidores de automação de portões",
        "OEM de controle de acesso / painéis",
        "Integradores smart home (Tuya/Alexa/Google)",
        "Guinchos e persianas industriais",
        "Cancelas e barreiras de estacionamento",
        "Chaves automotivas 315/433MHz"
      ],
      techTitle: "Entrega técnica",
      techList: [
        "Validação RF: câmara blindada, ajuste VSWR e prova de alcance.",
        "Firmware: tabelas de aprendizado, whitelist/blacklist, SDK Tuya.",
        "Documentos: CE/FCC/RoHS, HS code, packing list, teste de envelhecimento.",
        "Suporte: engenheiro para engenheiro (WhatsApp/Teams, GMT+8)."
      ],
      ctaEngineer: "Agendar com engenheiro",
      ctaCatalog: "Catálogo e fichas PDF"
    },
    process: { title: "Do conceito à entrega", subtitle: "Fluxo OEM/ODM para lançar rápido." },
    trending: { title: "Soluções em destaque" },
    cases: { title: "Casos de sucesso", subtitle: "Projetos reais: desafio -> solução -> resultado para distribuidores/OEM." },
    testimonials: { title: "O que dizem os clientes", subtitle: "Confiado por distribuidores e integradores." },
    faq: { title: "FAQ", subtitle: "Dúvidas sobre OEM, frete e compatibilidade." },
    catalog: { title: "Catálogo de produtos", subtitle: "Somente OEM/ODM. Baixe o PDF ou peça PCB ajustado ao seu protocolo." },
    about: {
      title: `Sobre ${COMPANY_NAME}`,
      subtitle: `${BRAND_NAME} é uma fábrica RF 100% B2B em Dongguan. Sem varejo ou dropshipping - apenas OEM/ODM.`,
      cards: [
        { title: "Somente B2B / fábrica", desc: "Engenharia + produção direta, sem loja B2C." },
        { title: "Clareza de marca", desc: `Use ${BRAND_NAME} para evitar confusão com outras empresas \"Chuanghui\".` },
        { title: "Pronto para exportação", desc: "ISO9001, CE/FCC/RoHS, laboratório de envelhecimento interno." }
      ]
    },
    contact: {
      heroTitle: "Fale com a fábrica",
      heroSubtitle: "Preço direto de fabricante. Suporte técnico profissional.",
      b2bNote: "Projetos B2B apenas (distribuidores / OEM / integradores). Informe aplicação e volume."
    },
    blog: { title: "Insights do setor", subtitle: "Novidades em RF e notícias da empresa." }
  },
  es: {
    nav: { home: "Inicio", about: "Sobre nosotros", products: "Productos", blog: "Blog", contact: "Contacto", request: "Solicitar un presupuesto" },
    hero: {
      badgeFactory: "Fábrica en China | OEM/ODM B2B",
      badgeBrand: `${COMPANY_NAME} | ${BRAND_NAME}`,
      badgeFree: "Diseño y prototipos gratis",
      title: "Fábrica OEM en China de mandos y controladores RF",
      subtitle: "Mandos y receptores RF · Mandos de coche · Interruptores WiFi Tuya · Barreras infrarrojas",
      bullets: [
        "Diseño industrial + prototipado PCB/firmware gratis para proyectos OEM",
        "Mandos/controladores RF 433/868/315MHz, multi-protocolo",
        "Muestras MP en 7 días con informe RF"
      ],
      tags: ["ISO9001 | CE/FCC/ROHS", "Cámara RF interna y ajuste de antena", "Solo clientes B2B (sin retail)"],
      primaryCta: "Iniciar proyecto OEM",
      secondaryCta: "Descargar catálogo (PDF)",
      ctaNote: "Precio directo de fábrica",
      freeNote: "Gratis para proyectos B2B cualificados · NDA disponible",
      stats: { exp: "20+", expLabel: "Años de experiencia", qc: "100%", qcLabel: "QC probado", countries: "50+", countriesLabel: "Países servidos" }
    },
    highlights: [
      { title: "B2B directo de fábrica", desc: "Sin retail ni dropshipping; ingeniería + producción con NDA." },
      { title: "Muestras en 7 días", desc: "PCB, antena y carcasa con informe de pruebas." },
      { title: "Cumplimiento y logística", desc: "Docs CE/FCC/RoHS, códigos HS listos, envío puerta a puerta UE/EEUU/LatAm." }
    ],
    industries: {
      title: "Puertas, smart home, industrial",
      subtitle: "Protocolos: HCS301/HCS361, EV1527/PT2262, bridges Tuya WiFi/Zigbee y clones multifrecuencia.",
      bullets: [
        "Distribuidores de automatización de portones",
        "OEM de control de acceso / tableros",
        "Integradores smart home (Tuya/Alexa/Google)",
        "Polipastos y persianas industriales",
        "Barras y bolardos de parking",
        "Llaves de auto 315/433MHz"
      ],
      techTitle: "Entrega técnica",
      techList: [
        "Validación RF: cámara blindada, VSWR y prueba de alcance.",
        "Firmware: tablas de aprendizaje, listas blanca/negra, SDK Tuya.",
        "Documentos: CE/FCC/RoHS, código HS, packing list, pruebas de envejecimiento.",
        "Soporte: ingeniero a ingeniero (WhatsApp/Teams, GMT+8)."
      ],
      ctaEngineer: "Agendar con ingeniero",
      ctaCatalog: "Catálogo y fichas PDF"
    },
    process: { title: "Del concepto a la entrega", subtitle: "Flujo OEM/ODM para lanzar rápido tus mandos." },
    trending: { title: "Soluciones destacadas" },
    cases: { title: "Casos de éxito", subtitle: "Proyectos reales: reto -> solución -> resultado para distribuidores/OEM." },
    testimonials: { title: "Lo que opinan", subtitle: "Confiado por distribuidores e integradores." },
    faq: { title: "FAQ", subtitle: "Dudas sobre OEM, envío y compatibilidad." },
    catalog: { title: "Catálogo de producto", subtitle: "Solo OEM/ODM. Descarga el PDF o pide PCB afinado a tu protocolo." },
    about: {
      title: `Sobre ${COMPANY_NAME}`,
      subtitle: `${BRAND_NAME} es una fábrica RF 100% B2B en Dongguan. Sin retail ni dropshipping - solo OEM/ODM.`,
      cards: [
        { title: "Solo B2B / fábrica", desc: "Ingeniería + producción directa, sin tienda B2C." },
        { title: "Claridad de marca", desc: `Usa ${BRAND_NAME} para evitar confusión con otras empresas \"Chuanghui\".` },
        { title: "Listo para exportar", desc: "ISO9001, CE/FCC/RoHS, laboratorio de envejecimiento propio." }
      ]
    },
    contact: {
      heroTitle: "Contacta la fábrica",
      heroSubtitle: "Precio directo de fabricante. Soporte técnico profesional.",
      b2bNote: "Solo proyectos B2B (distribuidores / OEM / integradores). Indica uso y volumen."
    },
    blog: { title: "Ideas de la industria", subtitle: "Actualizaciones RF y noticias de la empresa." }
  },
  it: {
    nav: { home: "Home", about: "Chi siamo", products: "Prodotti", blog: "Blog", contact: "Contatti", request: "Richiedi un preventivo" },
    hero: {
      badgeFactory: "Fabbrica in Cina | OEM/ODM B2B",
      badgeBrand: `${COMPANY_NAME} | ${BRAND_NAME}`,
      badgeFree: "Design e prototipi gratuiti",
      title: "Fabbrica OEM in Cina di radiocomandi e controller RF",
      subtitle: "Radiocomandi e ricevitori RF · Telecomandi auto · Interruttori WiFi Tuya · Barriere a infrarossi",
      bullets: [
        "Design industriale + prototipazione PCB/firmware gratuiti per progetti OEM",
        "Radiocomandi/controller RF 433/868/315MHz, multi-protocollo",
        "Campioni MP in 7 giorni con report RF"
      ],
      tags: ["ISO9001 | CE/FCC/ROHS", "Camera RF interna e tuning antenna", "Solo clienti B2B (no retail)"],
      primaryCta: "Avvia progetto OEM",
      secondaryCta: "Scarica catalogo (PDF)",
      ctaNote: "Prezzo diretto di fabbrica",
      freeNote: "Gratis per progetti B2B qualificati · NDA disponibile",
      stats: { exp: "20+", expLabel: "Anni di esperienza", qc: "100%", qcLabel: "Test QC", countries: "50+", countriesLabel: "Paesi serviti" }
    },
    highlights: [
      { title: "B2B diretto da fabbrica", desc: "Nessun retail o dropshipping; ingegneria + produzione con NDA." },
      { title: "Campioni in 7 giorni", desc: "PCB, antenna e case con report di test." },
      { title: "Conformità e logistica", desc: "Documenti CE/FCC/RoHS, codici HS pronti, consegna porta a porta UE/USA/LatAm." }
    ],
    industries: {
      title: "Cancelli, porte, smart home, industriale",
      subtitle: "Protocolli: HCS301/HCS361, EV1527/PT2262, bridge Tuya WiFi/Zigbee e cloni multi-frequenza.",
      bullets: [
        "Distributori di automazione cancelli",
        "OEM controllo accessi / quadri",
        "Integratori smart home (Tuya/Alexa/Google)",
        "Argani e serrande industriali",
        "Barriere parcheggio",
        "Chiavi auto 315/433MHz"
      ],
      techTitle: "Consegna tecnica",
      techList: [
        "Validazione RF: camera schermata, VSWR, test di raggio.",
        "Firmware: tabelle learning, whitelist/blacklist, SDK Tuya.",
        "Documenti: CE/FCC/RoHS, codice HS, packing list, aging test.",
        "Supporto: ingegnere a ingegnere (WhatsApp/Teams, GMT+8)."
      ],
      ctaEngineer: "Parla con ingegnere",
      ctaCatalog: "Catalogo e schede PDF"
    },
    process: { title: "Dal concept alla consegna", subtitle: "Flusso OEM/ODM per lanciare rapidamente." },
    trending: { title: "Soluzioni in evidenza" },
    cases: { title: "Casi di studio", subtitle: "Progetti reali: sfida -> soluzione -> risultato per distributori/OEM." },
    testimonials: { title: "Dicono di noi", subtitle: "Scelto da distributori e integratori." },
    faq: { title: "FAQ", subtitle: "Domande su OEM, spedizione e compatibilità." },
    catalog: { title: "Catalogo prodotti", subtitle: "Solo OEM/ODM. Scarica il PDF o chiedi PCB accordato." },
    about: {
      title: `Chi è ${COMPANY_NAME}`,
      subtitle: `${BRAND_NAME} è una fabbrica RF 100% B2B a Dongguan. Niente retail o dropshipping - solo OEM/ODM.`,
      cards: [
        { title: "Solo B2B / fabbrica", desc: "Ingegneria + produzione diretta, nessun e-commerce B2C." },
        { title: "Chiarezza di brand", desc: `Usa ${BRAND_NAME} per evitare confusione con altre aziende \"Chuanghui\".` },
        { title: "Pronto export", desc: "ISO9001, CE/FCC/RoHS, laboratorio aging interno." }
      ]
    },
    contact: {
      heroTitle: "Contatta la fabbrica",
      heroSubtitle: "Prezzo diretto e supporto tecnico professionale.",
      b2bNote: "Solo progetti B2B (distributori / OEM / integratori). Indica applicazione e volume."
    },
    blog: { title: "Approfondimenti RF", subtitle: "Aggiornamenti tecnologici e notizie aziendali." }
  },
  ru: {
    nav: { home: "Главная", about: "О нас", products: "Продукты", blog: "Блог", contact: "Контакты", request: "Запросить предложение" },
    hero: {
      badgeFactory: "Китайская фабрика | B2B OEM/ODM",
      badgeBrand: `${COMPANY_NAME} | ${BRAND_NAME}`,
      badgeFree: "Бесплатный дизайн и прототипы",
      title: "Китайская OEM-фабрика пультов и контроллеров RF",
      subtitle: "RF пульты и приёмники · Автопульты · WiFi-выключатели Tuya · ИК-барьеры",
      bullets: [
        "Бесплатный дизайн и прототипирование PCB/firmware для OEM-проектов",
        "RF пульты/контроллеры 433/868/315MHz, мультипротокольные",
        "MP-образцы за 7 дней с RF-отчётом"
      ],
      tags: ["ISO9001 | CE/FCC/ROHS", "Собственная RF-камера и настройка антенны", "Только B2B (без розницы)"],
      primaryCta: "Начать OEM-проект",
      secondaryCta: "Скачать каталог (PDF)",
      ctaNote: "Прямые цены фабрики",
      freeNote: "Бесплатно для квалифицированных B2B OEM/ODM-проектов · NDA доступно",
      stats: { exp: "20+", expLabel: "Лет опыта", qc: "100%", qcLabel: "QC тест", countries: "50+", countriesLabel: "Стран" }
    },
    highlights: [
      { title: "B2B напрямую с фабрики", desc: "Без розницы и дропшиппинга; инженерия + производство под NDA." },
      { title: "Образцы за 7 дней", desc: "PCB, антенна и корпус с протоколом испытаний." },
      { title: "Сертификация и логистика", desc: "CE/FCC/RoHS, коды HS, доставка до двери ЕС/США/ЛатАм." }
    ],
    industries: {
      title: "Ворота, двери, умный дом, индустрия",
      subtitle: "Протоколы: HCS301/HCS361, EV1527/PT2262, мосты Tuya WiFi/Zigbee, мультичастотные клоны.",
      bullets: [
        "Дистрибьюторы автоматики ворот",
        "OEM систем контроля доступа / щитов",
        "Интеграторы умного дома (Tuya/Alexa/Google)",
        "Промышленные лебёдки и рольставни",
        "Парковочные шлагбаумы и болларды",
        "Авто ключи 315/433МГц"
      ],
      techTitle: "Техническая поставка",
      techList: [
        "RF-валидация: экранированная камера, VSWR, тест дальности.",
        "Прошивка: таблицы обучения, whitelist/blacklist, SDK Tuya.",
        "Документы: CE/FCC/RoHS, HS code, packing list, aging-тест.",
        "Поддержка: инженер-инженеру (WhatsApp/Teams, GMT+8)."
      ],
      ctaEngineer: "Встреча с инженером",
      ctaCatalog: "Каталог и спецификации PDF"
    },
    process: { title: "От концепта до поставки", subtitle: "OEM/ODM процесс для быстрого вывода продукта." },
    trending: { title: "Популярные решения" },
    cases: { title: "Кейсы", subtitle: "Реальные проекты: задача -> решение -> результат для дистрибьюторов/OEM." },
    testimonials: { title: "Отзывы клиентов", subtitle: "Нас выбирают дистрибьюторы и интеграторы." },
    faq: { title: "FAQ", subtitle: "Частые вопросы по OEM, доставке и совместимости." },
    catalog: { title: "Каталог продукции", subtitle: "Только OEM/ODM. Скачайте PDF или запросите PCB под ваш протокол." },
    about: {
      title: `О ${COMPANY_NAME}`,
      subtitle: `${BRAND_NAME} �?фабрика RF 100% B2B в Дунгуане. Без розницы и дропшиппинга �?только OEM/ODM.`,
      cards: [
        { title: "Только B2B / фабрика", desc: "Инженерия + производство, без B2C-магазина." },
        { title: "Чистота бренда", desc: `Используйте ${BRAND_NAME}, чтобы исключить путаницу с другими компаниями \"Chuanghui\".` },
        { title: "Готовность к экспорту", desc: "ISO9001, CE/FCC/RoHS, собственный aging-лаборатория." }
      ]
    },
    contact: {
      heroTitle: "Связаться с фабрикой",
      heroSubtitle: "Цена производителя. Профессиональная поддержка.",
      b2bNote: "Только B2B проекты (дистрибьюторы / OEM / интеграторы). Укажите применение и объём."
    },
    blog: { title: "Отраслевые обзоры", subtitle: "Новости RF и компании." }
  }
};
// --- Mock Data ---

const products = [
  {
    id: 1,
    name: "CJ-433 Universal Rolling Code Remote",
    category: "Remote Control",
    frequency: "433.92 MHz",
    freqKey: "433",
    chip: "HCS301 (Microchip)",
    protocolKey: "rolling",
    voltage: "12V (27A)",
    image: `https://placehold.co/600x600/f8fafc/1C2D5A?text=CJ-433+Pro+Series`,
    tag: "Best Seller",
    desc: "High-security rolling code transmitter with 100m range and universal 433MHz receiver replacement for garage door openers.",
    specs: ["Chipset: HCS301 / Rolling code", "Range: >100m tuned PCB antenna", "Enclosure: Zinc alloy, 12V 27A"]
  },
  {
    id: 2,
    name: "Smart WiFi + RF Hybrid Receiver",
    category: "Receiver",
    frequency: "WiFi 2.4G + 433MHz",
    freqKey: "wifi",
    chip: "Tuya Smart Module",
    protocolKey: "tuya",
    voltage: "AC 85-265V",
    image: `https://placehold.co/600x600/f8fafc/1C2D5A?text=WiFi+Smart+Receiver`,
    tag: "Tuya Certified",
    desc: "Upgrade old garage doors to smart control. Works with App, Alexa, and Google Home; Tuya Zigbee switch module OEM ready.",
    specs: ["ESP32/Tuya WiFi-Zigbee", "AC/DC 9-30V & 110-240V", "Stores up to 500 codes"]
  },
  {
    id: 3,
    name: "Industrial IP67 Waterproof Remote",
    category: "Industrial",
    frequency: "868.35 MHz",
    freqKey: "868",
    chip: "EV1527 (Learning)",
    protocolKey: "fixed",
    voltage: "DC 3V (CR2032)",
    image: `https://placehold.co/600x600/f8fafc/1C2D5A?text=IP67+Waterproof`,
    tag: "Heavy Duty",
    desc: "Designed for harsh environments. Dustproof, waterproof, and drop-resistant for industrial doors and hoists.",
    specs: ["IP67 sealed enclosure", "CR2032 low-power MCU", "868MHz learning code"]
  },
  {
    id: 4,
    name: "Long Range Active Infrared Beam",
    category: "Security",
    frequency: "Infrared",
    freqKey: "infrared",
    chip: "Smart AI Detection",
    protocolKey: "sensor",
    voltage: "DC 12V-24V",
    image: `https://placehold.co/800x800/f8fafc/1C2D5A?text=IR+Beam+Sensor`,
    tag: "100m Range",
    desc: "Anti-glare active infrared detector for perimeter security and automatic gates."
  },
  {
    id: 5,
    name: "4-Channel Gate Controller Box",
    category: "Controller",
    frequency: "433.92 MHz",
    freqKey: "433",
    chip: "PT2262 (Fixed Code)",
    protocolKey: "fixed",
    voltage: "AC 220V",
    image: `https://placehold.co/400x400/e2e8f0/1C2D5A?text=Gate+Controller`,
    tag: "Heavy Duty",
    desc: "External receiver box for tubular motors and sliding gates."
  },
  {
    id: 6,
    name: "Universal Car Key Fob Replacement",
    category: "Car Remote",
    frequency: "315/433 MHz",
    freqKey: "multi",
    chip: "Multi-Frequency Clone",
    protocolKey: "clone",
    voltage: "DC 3V",
    image: `https://placehold.co/400x400/e2e8f0/1C2D5A?text=Car+Key+Fob`,
    tag: "Universal",
    desc: "Face-to-face copy remote for aftermarket car key replacement."
  }
];

const testimonials = [
  {
    id: 1,
    name: "Purchasing Director",
    role: "Top 3 Gate Automation Distributor (Italy)",
    content:
      "CHJ solved our rolling code encryption conflict with LiftMaster systems. Their SDK support helped us launch in Germany within 3 months.",
    stars: 5
  },
  {
    id: 2,
    name: "Hardware Lead",
    role: "Access Control OEM Partner (USA)",
    content: "They tuned 433/868MHz antenna to pass FCC/CE on first round and shared full RF test reports. Zero returns so far.",
    stars: 5
  },
  {
    id: 3,
    name: "R&D Manager",
    role: "Smart Home Integrator (Brazil)",
    content: "Tuya + RF hybrid receivers shipped with custom firmware hooks. Their engineers answered MCU coding questions overnight.",
    stars: 5
  }
];

// Case Studies (Problem > Solution > Outcome)
const caseStudies = [
  {
    id: "cs-1",
    title: "Rolling Code Conflict Resolved",
    market: "Italy | Gate automation distributor",
    badge: "CE/FCC Report",
    challenge: "LiftMaster remotes caused RF collisions with local brand receivers, creating 12% return rate.",
    solution: "Re-tuned HCS301 PCB + SAW oscillator, added whitelist firmware, and provided CE/FCC test report in one batch.",
    outcome: "Returns dropped to 0.8% and the client launched in Germany within 3 months."
  },
  {
    id: "cs-2",
    title: "Tuya + RF Hybrid Retrofit",
    market: "USA | Access control OEM",
    badge: "UL Prep",
    challenge: "Needed app control without replacing legacy 433MHz fobs for 40K installed doors.",
    solution: "Custom Tuya WiFi bridge + rolling-code receiver, SDK handoff, and antenna matching for long garages.",
    outcome: "App adoption hit 72% in 60 days; no on-site rewiring required."
  },
  {
    id: "cs-3",
    title: "Industrial IP67 Handset",
    market: "Brazil | Smart home integrator",
    badge: "IP67 Test",
    challenge: "Humid coastal sites killed consumer-grade remotes every rainy season.",
    solution: "Designed IP67 housing, gold-plated PCB fingers, and salt-spray certification with batch aging test.",
    outcome: "Warranty claims down 35%, enabling a premium maintenance plan upsell."
  }
];

// Expanded Blog Data with Content
const blogPosts = [
  {
    id: 1,
    title: "Rolling Code vs. Fixed Code: Which is Secure?",
    date: "Oct 12, 2023",
    author: "Engineer Li",
    excerpt: "Understanding the security differences between HCS301 and PT2262 for garage door openers.",
    content: `
      <p class="mb-4">When choosing a remote control system for garage doors or gate openers, security is the top priority. The two main encoding technologies in the market are <strong>Fixed Code (e.g., PT2262)</strong> and <strong>Rolling Code (e.g., HCS301)</strong>.</p>
      <h4 class="text-xl font-bold text-[#1C2D5A] mb-2">The Vulnerability of Fixed Code</h4>
      <p class="mb-4">Fixed code remotes send the exact same binary signal every time you press the button. While these are cheap and easy to clone, they are vulnerable to "Replay Attacks" where a thief can record your signal and play it back later to open your door.</p>
      <h4 class="text-xl font-bold text-[#1C2D5A] mb-2">Why Rolling Code is Superior</h4>
      <p class="mb-4">Rolling code technology, developed by Microchip (HCS series), changes the code every time the button is pressed. An algorithm inside the transmitter and receiver calculates a new code based on a synchronized counter. Even if a thief intercepts the signal, that specific code is now invalid.</p>
      <p>For high-security applications, CHJ Remotes strongly recommends using our HCS301 based remotes.</p>
    `,
    image: `https://placehold.co/800x400/f1f5f9/1C2D5A?text=Security+Tech`
  },
  {
    id: 2,
    title: "How to Program a Universal RF Remote",
    date: "Nov 05, 2023",
    author: "Support Team",
    excerpt: "A step-by-step guide for cloning 433MHz remotes using our face-to-face copy series.",
    content: `
      <p class="mb-4">Our "Face-to-Face" copy remotes are designed to clone existing fixed code and learning code remotes without needing tools.</p>
      <h4 class="text-xl font-bold text-[#1C2D5A] mb-2">Step 1: Clear History Code</h4>
      <p class="mb-4">Press and hold buttons A and B simultaneously until the LED flashes 3 times. Release button B (keep holding A) and press B 3 times slowly. The LED will flash continuously.</p>
      <h4 class="text-xl font-bold text-[#1C2D5A] mb-2">Step 2: Copy Code</h4>
      <p class="mb-4">Place the original remote and the copy remote back-to-back. Press and hold the corresponding buttons on both remotes. The LED on the copy remote will flash quickly, indicating success.</p>
    `,
    image: `https://placehold.co/800x400/f1f5f9/1C2D5A?text=Programming+Guide`
  },
  {
    id: 3,
    title: "The Future of Smart Home: Tuya + RF Integration",
    date: "Dec 20, 2023",
    author: "R&D Dept",
    excerpt: "Why hybrid solutions are dominating the European market in 2024.",
    content: `
      <p class="mb-4">Traditional RF remotes are reliable but lack remote access. WiFi modules are smart but depend on the internet. The solution? <strong>Hybrid Modules.</strong></p>
      <p>Our new Tuya-compatible receivers allow users to open their gates via:</p>
      <ul class="list-disc ml-6 mb-4">
        <li>Traditional RF Remote (for quick access from the car)</li>
        <li>Smartphone App (from anywhere in the world)</li>
        <li>Voice Control (Alexa / Google Home)</li>
      </ul>
    `,
    image: `https://placehold.co/800x400/f1f5f9/1C2D5A?text=Smart+Home`
  }
];

const faqs = [
  {
    q: "Do your universal remotes support both Rolling Code (HCS301) and Fixed Code (EV1527)?",
    a: "Yes. Our Smart-Clone series uses a self-learning MCU covering ~95% of global brands (LiftMaster, Nice, Came). It supports mixed-frequency cloning (433MHz + 868MHz) on one device to cut distributor inventory."
  },
  {
    q: "Can you customize RF frequency (315/433/868MHz) and button functions for OEM orders?",
    a: "Absolutely. From PCB layout to mold tooling, we tune frequencies (e.g., 433.92MHz ±75kHz) with SAW or crystal oscillators to meet local regulations and map buttons per your protocol."
  },
  {
    q: "Do you provide SDK/API for Tuya WiFi modules and smart home integration?",
    a: "Yes. We supply SDK/API plus full docs for WiFi-to-RF bridges and Tuya-compatible modules, enabling secondary development into your app, CRM, or cloud workflows."
  },
  {
    q: "What certifications (FCC, CE, RoHS) do your remote controls hold for export?",
    a: "Our remotes are export-ready with CE-RED (EU), FCC ID (USA), and RoHS. In-house aging and RF tests ensure every batch meets ISO9001 standards before shipment."
  }
];

// --- Mock Comments Data (Simulating a Database) ---
const initialComments = [
  { id: 101, postId: 1, user: "Alex Miller", date: "2023-10-15", text: "Great explanation! Can you provide the datasheet for the HCS301 chip used?" },
  { id: 102, postId: 1, user: "Chuangjiang Admin", date: "2023-10-16", text: "Hi Alex, sure. We have sent the datasheet to your email. You can also download it from our products page.", isAdmin: true },
  { id: 103, postId: 2, user: "Pedro Gomez", date: "2023-11-10", text: "Does this work with 315MHz remotes as well?" }
];
// --- Components ---

const Button = ({ children, variant = "primary", className = "", ...props }) => {
  const baseStyle =
    "px-7 py-3 rounded-md font-semibold transition-all duration-300 flex items-center justify-center text-sm";
  const variants = {
    primary: `bg-[#1C2D5A] hover:bg-[#0f1e4d] text-white shadow-md hover:shadow-lg`,
    secondary: `bg-white text-slate-800 border border-slate-200 hover:border-[#1C2D5A] hover:text-[#1C2D5A] shadow-sm hover:shadow-md`,
    outline: `bg-transparent border-2 border-[#1C2D5A] text-[#1C2D5A] hover:bg-[#1C2D5A] hover:text-white`,
    small: `bg-[#1C2D5A] hover:bg-[#0f1e4d] text-white text-xs px-4 py-2 rounded-md`
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

const SectionHeader = ({ title, subtitle, centered = true }) => (
  <div className={`mb-16 ${centered ? "text-center" : "text-left"}`}>
    <h2 className="text-3xl md:text-5xl font-bold text-brand mb-6 tracking-tight">{title}</h2>
    <div className={`w-20 h-1.5 bg-[#1C2D5A] mb-6 ${centered ? "mx-auto" : ""}`}></div>
    <p className="text-lg text-slate-500 max-w-3xl leading-relaxed font-light mx-auto">{subtitle}</p>
  </div>
);

const AccordionItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-200 last:border-0">
      <button className="w-full py-6 flex justify-between items-center text-left focus:outline-none group" onClick={() => setIsOpen(!isOpen)}>
        <span className="text-lg font-semibold text-slate-800 group-hover:text-[#1C2D5A] transition-colors pr-8">{question}</span>
        {isOpen ? <ChevronUp className="text-[#1C2D5A]" /> : <ChevronDown className="text-slate-400" />}
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-48 opacity-100 pb-6" : "max-h-0 opacity-0"}`}>
        <p className="text-slate-600 leading-relaxed pl-4 border-l-2 border-[#FF8A00]">{answer}</p>
      </div>
    </div>
  );
};

// --- Floating Contact Button (New Marketing Feature) ---
const FloatingContact = () => (
  <a
    href={`https://wa.me/${CONTACT_INFO.whatsapp.replace(/\+| /g, "")}`}
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center animate-bounce-slow"
    title="Chat on WhatsApp"
  >
    <Phone className="w-6 h-6 fill-current" />
    <span className="absolute right-full mr-3 bg-white text-slate-800 text-xs font-bold px-2 py-1 rounded shadow hidden group-hover:block whitespace-nowrap">Chat with Engineer</span>
  </a>
);

// --- Main Application ---

export default function ChuangjiangWebsite() {
  const [lang, setLang] = useState("en");
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [activePage, setActivePage] = useState("home");
  const [viewingPost, setViewingPost] = useState(null); // State for Single Blog Post View
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [filters, setFilters] = useState({ frequency: null, protocol: null });

  // Comment System State
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState({ user: "", text: "" });
  const langMenuRef = useRef(null);

  const t = (path) => {
    const parts = path.split(".");
    const source = translations[lang] || translations.en;
    let value = source;
    for (const p of parts) {
      value = value?.[p];
    }
    if (value === undefined) {
      value = translations.en;
      for (const p of parts) {
        value = value?.[p];
      }
    }
    return value ?? path;
  };

  // Sync active page from URL path (e.g. /about) so deep links work on static hosts.
  useEffect(() => {
    const syncFromLocation = () => {
      const nextPage = pageFromPathname(window.location.pathname);
      setActivePage((prev) => (prev === nextPage ? prev : nextPage));
    };
    syncFromLocation();
    window.addEventListener("popstate", syncFromLocation);
    return () => window.removeEventListener("popstate", syncFromLocation);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getSeoForCurrentView = () => {
    if (activePage === "blog" && viewingPost) {
      return {
        title: `${viewingPost.title} | ${BRAND_NAME} Blog`,
        description: viewingPost.excerpt || SEO_METADATA.description
      };
    }

    switch (activePage) {
      case "about":
        return {
          title: `${t("nav.about")} | ${BRAND_NAME}`,
          description: t("about.subtitle") || SEO_METADATA.description
        };
      case "products":
        return {
          title: `${t("nav.products")} | ${BRAND_NAME}`,
          description: t("catalog.subtitle") || SEO_METADATA.description
        };
      case "blog":
        return {
          title: `${t("nav.blog")} | ${BRAND_NAME}`,
          description: t("blog.subtitle") || SEO_METADATA.description
        };
      case "contact":
        return {
          title: `${t("nav.contact")} | ${BRAND_NAME}`,
          description: t("contact.heroSubtitle") || SEO_METADATA.description
        };
      default:
        return {
          title: SEO_METADATA.title,
          description: SEO_METADATA.description
        };
    }
  };

  useEffect(() => {
    const { title, description } = getSeoForCurrentView();
    document.title = title;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", description);
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = description;
      document.head.appendChild(meta);
    }

    const origin = window.location.origin;
    const canonicalPath = activePage === "home" ? "/" : `/${activePage}`;
    const canonicalUrl = `${origin}${canonicalPath}`;
    let canonicalEl = document.querySelector('link[rel="canonical"]');
    if (!canonicalEl) {
      canonicalEl = document.createElement("link");
      canonicalEl.rel = "canonical";
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute("href", canonicalUrl);

    document.documentElement.lang = lang;
  }, [lang, activePage, viewingPost]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (activePage !== "blog") {
      setViewingPost(null); // Reset blog view when changing pages
    }
    setLangMenuOpen(false);
  }, [activePage]);

  // Push active page changes back to the path for shareable URLs.
  useEffect(() => {
    const desiredPath = activePage === "home" ? "/" : `/${activePage}`;
    if (window.location.pathname !== desiredPath) {
      window.history.pushState({}, "", desiredPath);
    }
  }, [activePage]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (langMenuRef.current && !langMenuRef.current.contains(e.target)) {
        setLangMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle Comment Submission (Simulated for GitHub Pages)
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!newComment.user || !newComment.text) return;

    const commentObj = {
      id: Date.now(),
      postId: viewingPost.id,
      user: newComment.user,
      date: new Date().toISOString().split("T")[0],
      text: newComment.text,
      isAdmin: false
    };

    setComments([...comments, commentObj]);
    setNewComment({ user: "", text: "" });
    alert("Thank you! Your comment has been posted.");
  };

  const NavLink = ({ page, label, mobile = false }) => (
    <button
      onClick={() => {
        setActivePage(page);
        setIsMenuOpen(false);
      }}
      className={`
        font-semibold transition-all duration-200 text-sm
        ${
          mobile
            ? "block w-full text-left py-4 text-xl border-b border-slate-100 text-slate-800 normal-case"
            : `px-3 pb-3 pt-2 border-b-2 ${activePage === page ? "text-[#1C2D5A] border-[#FF8A00]" : "border-transparent text-slate-700 hover:text-[#1C2D5A] hover:border-[#1C2D5A]"}`
        }
      `}
    >
      {label}
    </button>
  );

  // --- Render Functions ---

  const renderHome = () => {
    const heroCopy = { ...translations.en.hero, ...(translations[lang]?.hero || {}) };
    const highlightsCopy = translations[lang]?.highlights || translations.en.highlights;
    const industriesCopy = translations[lang]?.industries || translations.en.industries;
    const processCopy = translations[lang]?.process || translations.en.process;
    const trendingCopy = translations[lang]?.trending || translations.en.trending;
    const caseCopy = translations[lang]?.cases || translations.en.cases;
    const testimonialCopy = translations[lang]?.testimonials || translations.en.testimonials;
    const faqCopy = translations[lang]?.faq || translations.en.faq;
    return (
      <>
      {/* Hero Section */}
      <section className="relative min-h-[82vh] flex items-center bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-[-10%] right-[-10%] w-[380px] h-[380px] bg-white/60 backdrop-blur-3xl rounded-full blur-3xl"></div>
          <div className="absolute bottom-[-15%] left-[-5%] w-[460px] h-[460px] bg-[#FF8A00]/16 rounded-full blur-3xl"></div>
          <div className="absolute inset-6 bg-white/60 rounded-[28px] shadow-[0_25px_80px_-40px_rgba(0,0,0,0.35)] backdrop-blur-xl border border-white/70"></div>
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-b from-transparent to-white"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 pt-10 pb-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 lg:space-y-5 animate-fade-in-up lg:flex lg:flex-col lg:justify-between">
              <div className="flex flex-wrap gap-3">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/80 text-[#1C2D5A] rounded-full text-xs font-semibold tracking-wide border border-slate-200 shadow-sm">
                  <ShieldCheck className="w-4 h-4" /> {heroCopy.badgeFactory}
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#FFF3E0] text-[#FF8A00] rounded-full text-xs font-semibold tracking-wide border border-[#FF8A00]/30 shadow-sm">
                  <Zap className="w-4 h-4" /> {heroCopy.badgeFree}
                </div>
              </div>

              <div className="space-y-2">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-brand leading-tight max-w-3xl">
                  {heroCopy.title}
                </h1>
                <p className="text-lg text-slate-600">{heroCopy.subtitle}</p>
              </div>

              <ul className="space-y-2 text-slate-700">
                {(heroCopy.bullets || []).map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 inline-block w-2 h-2 rounded-full bg-[#FF8A00]"></span>
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2 text-sm text-slate-700">
                {(heroCopy.tags || []).map((tag) => (
                  <span key={tag} className="inline-flex items-center gap-2 px-3 py-2 bg-white rounded-xl border border-slate-200 shadow-sm">
                    <CheckCircle className="w-4 h-4 text-[#1C2D5A]" />
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button onClick={() => setActivePage("contact")}>{heroCopy.primaryCta}</Button>
                <Button variant="outline" onClick={() => window.open(CATALOG_URL, "_blank")}>
                  <Download className="w-5 h-5 mr-2" /> {heroCopy.secondaryCta}
                </Button>
              </div>
              <div className="text-sm text-slate-500">{heroCopy.ctaNote}</div>
              <div className="text-xs font-semibold text-[#FF8A00]">{heroCopy.freeNote}</div>

              {/* Mobile-only tags/stats for better scroll order */}
              <div className="space-y-3 lg:hidden">
                <div className="flex flex-wrap gap-2 text-xs">
                  {(heroCopy.tags || []).map((tag) => (
                    <span key={tag} className="inline-flex items-center gap-2 px-3 py-2 bg-white rounded-xl border border-slate-200 shadow-sm">
                      <CheckCircle className="w-4 h-4 text-[#1C2D5A]" />
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-white rounded-xl p-3 shadow-sm border border-slate-100 text-center">
                    <div className="text-xl font-bold text-brand">{heroCopy.stats.exp}</div>
                    <div className="text-[11px] text-slate-500 mt-1">{heroCopy.stats.expLabel}</div>
                  </div>
                  <div className="bg-white rounded-xl p-3 shadow-sm border border-slate-100 text-center">
                    <div className="text-xl font-bold text-brand">{heroCopy.stats.qc}</div>
                    <div className="text-[11px] text-slate-500 mt-1">{heroCopy.stats.qcLabel}</div>
                  </div>
                  <div className="bg-white rounded-xl p-3 shadow-sm border border-slate-100 text-center">
                    <div className="text-xl font-bold text-brand">{heroCopy.stats.countries}</div>
                    <div className="text-[11px] text-slate-500 mt-1">{heroCopy.stats.countriesLabel}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Video Card */}
            <div className="relative hidden lg:flex flex-col gap-4 h-full">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/70 bg-slate-900">
                <video
                  className="w-full h-[420px] object-cover opacity-90"
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster="https://placehold.co/800x600/1C2D5A/ffffff?text=Factory+Tour"
                >
                  <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-br from-[#0f1e4d]/50 via-transparent to-[#0f1e4d]/30"></div>
                <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 text-[#1C2D5A] text-xs font-semibold shadow">
                  <PlayCircle className="w-4 h-4" />
                  Factory Tour · 10s
                </div>
                <div className="absolute bottom-4 right-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 text-slate-800 text-xs font-semibold shadow">
                  <Cpu className="w-4 h-4 text-[#1C2D5A]" />
                  HCS301 Lab
                </div>
              </div>
              <div className="mt-3 text-slate-500 text-sm text-right">High-Tech Remote 3D Render / Factory Demo</div>

              {/* Desktop-only trust + stats */}
              <div className="bg-white/85 backdrop-blur rounded-2xl border border-slate-100 shadow-lg p-5 space-y-3 hidden lg:block">
                <div className="flex flex-wrap gap-2 text-xs">
                  {(heroCopy.tags || []).map((tag) => (
                    <span key={tag} className="inline-flex items-center gap-2 px-3 py-2 bg-white rounded-xl border border-slate-200 shadow-sm">
                      <CheckCircle className="w-4 h-4 text-[#1C2D5A]" />
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-slate-50 rounded-xl p-3 shadow-sm border border-slate-100 text-center">
                    <div className="text-xl font-bold text-brand">{heroCopy.stats.exp}</div>
                    <div className="text-[11px] text-slate-500 mt-1">{heroCopy.stats.expLabel}</div>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-3 shadow-sm border border-slate-100 text-center">
                    <div className="text-xl font-bold text-brand">{heroCopy.stats.qc}</div>
                    <div className="text-[11px] text-slate-500 mt-1">{heroCopy.stats.qcLabel}</div>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-3 shadow-sm border border-slate-100 text-center">
                    <div className="text-xl font-bold text-brand">{heroCopy.stats.countries}</div>
                    <div className="text-[11px] text-slate-500 mt-1">{heroCopy.stats.countriesLabel}</div>
                  </div>
                </div>
              </div>
            </div>
            {/* Mobile visual fallback */}
            <div className="lg:hidden">
              <div className="rounded-3xl overflow-hidden shadow-xl border border-white/70 bg-slate-900">
                <img
                  src="https://placehold.co/800x600/1C2D5A/ffffff?text=Factory+Tour"
                  alt="Factory preview"
                  className="w-full h-64 object-cover opacity-90"
                />
              </div>
              <div className="mt-2 text-slate-500 text-xs text-left">Factory preview · Tap contact to request live demo</div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Belt */}
      <section className="bg-white border-y border-slate-100">
        <div className="container mx-auto px-6 py-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "ISO9001 Factory", desc: "Audited QA system with full aging tests" },
              { label: "CE / FCC / RoHS", desc: "Compliance docs + HS codes ready" },
              { label: "50+ Countries", desc: "EU / US / LatAm distributors served" },
              { label: "Engineer Support", desc: "RF tuning, firmware hooks, NDA ready" }
            ].map((item, idx) => (
              <div
                key={idx}
                className="rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 flex flex-col gap-1 shadow-[0_6px_20px_-12px_rgba(0,0,0,0.2)]"
              >
                <div className="text-[#1C2D5A] font-bold text-sm">{item.label}</div>
                <div className="text-xs text-slate-600">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* B2B Highlights */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: ShieldCheck,
                title: "Factory Direct B2B",
                desc: "No retail or dropshipping; engineering + production in one place with NDA support."
              },
              {
                icon: Clock,
                title: "7-Day MP Samples",
                desc: "PCB layout, antenna tuning, and molded enclosure delivered with test report."
              },
              {
                icon: Truck,
                title: "Compliance & Shipping",
                desc: "CE/FCC/RoHS documentation, HS codes ready, door-to-door to EU/US/LatAm."
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-slate-50 rounded-2xl border border-slate-200 p-6 shadow-sm flex gap-4">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#1C2D5A] border border-slate-200">
                  <item.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OEM Process */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <SectionHeader title={processCopy.title} subtitle={processCopy.subtitle} />
          <div className="grid md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-slate-200 -z-0"></div>
            {[
              { icon: Settings, title: "1. PCB & Antenna Tuning", desc: "Altium layout + spectrum analysis tuned for >100m range." },
              { icon: Cpu, title: "2. 3D Mold & MCU Coding", desc: "Custom firmware (C/ASM) plus SLA rapid prototyping." },
              { icon: Users, title: "3. SMT & ISO Assembly", desc: "Yamaha SMT, AOI inspection, and 100% function test." },
              { icon: CheckCircle, title: "4. Aging & RF Testing", desc: "-40°C~80°C chamber & salt spray for durability." }
            ].map((step, idx) => (
              <div key={idx} className="relative z-10 bg-white p-6 pt-0 text-center group">
                <div className="w-24 h-24 mx-auto bg-white border-4 border-slate-100 rounded-full flex items-center justify-center mb-6 group-hover:border-[#1C2D5A] transition-colors duration-300 shadow-sm">
                  <step.icon className="w-10 h-10 text-slate-400 group-hover:text-[#1C2D5A] transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                <p className="text-slate-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries & Protocols */}
      <section className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeader
              title={industriesCopy.title}
              subtitle={industriesCopy.subtitle}
              centered={false}
            />
            <div className="grid md:grid-cols-2 gap-4">
              {(industriesCopy.bullets || []).map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <span className="mt-1 inline-block w-2 h-2 rounded-full bg-[#FF8A00]"></span>
                  <p className="text-sm text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
            <h3 className="text-xl font-bold text-slate-900">{industriesCopy.techTitle}</h3>
            <ul className="space-y-2 text-sm text-slate-700">
              {(industriesCopy.techList || []).map((item, idx) => (
                <li key={idx} className="flex gap-2">
                  <CheckCircle className="w-4 h-4 text-[#1C2D5A]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="pt-2 flex flex-wrap gap-3">
              <Button variant="primary" className="px-6 py-3" onClick={() => setActivePage("contact")}>
                {industriesCopy.ctaEngineer}
              </Button>
              <Button variant="secondary" className="px-6 py-3" onClick={() => window.open(CATALOG_URL, "_blank")}>
                {industriesCopy.ctaCatalog}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-16">
            <div className="max-w-xl">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">{trendingCopy.title}</h2>
              <div className="w-16 h-1 bg-[#1C2D5A]"></div>
            </div>
            <Button variant="outline" className="hidden md:flex" onClick={() => setActivePage("products")}>
              Full Catalog <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.slice(0, 3).map((product) => (
              <article
                key={product.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 group flex flex-col h-full border border-slate-100"
              >
                <div className="relative h-64 bg-slate-100 overflow-hidden flex items-center justify-center p-8">
                  <img src={product.image} alt={product.name} className="max-h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider text-slate-800 shadow-sm">
                    {product.category}
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-slate-800 mb-2 leading-tight group-hover:text-[#1C2D5A] transition-colors">{product.name}</h3>
                  <div className="flex items-center gap-4 text-sm text-slate-500 mb-6 font-mono bg-slate-50 p-2 rounded">
                    <span>{product.frequency}</span>
                    <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                    <span>{product.chip}</span>
                  </div>
                  <p className="text-slate-500 mb-4 leading-relaxed line-clamp-2">{product.desc}</p>
                  {product.specs && (
                    <ul className="text-sm text-slate-600 space-y-1 mb-6">
                      {product.specs.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="mt-1 inline-block w-1.5 h-1.5 rounded-full bg-[#FF8A00]"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="mt-auto">
                    <button
                      onClick={() => setActivePage("contact")}
                      className="w-full py-3 border border-slate-200 rounded font-semibold text-slate-700 hover:bg-[#1C2D5A] hover:text-white hover:border-[#1C2D5A] transition-all"
                    >
                      {t("nav.request")}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="container mx-auto px-6">
          <SectionHeader title={caseCopy.title} subtitle={caseCopy.subtitle} />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((item) => (
              <div key={item.id} className="bg-slate-50 border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-semibold text-[#1C2D5A] bg-white px-3 py-1 rounded-full border border-slate-200">{item.market}</span>
                  {item.badge && <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 bg-white px-2 py-1 rounded-full border border-slate-200">{item.badge}</span>}
                  <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500">B2B Only</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 leading-snug">{item.title}</h3>
                <p className="text-slate-600 text-sm mb-4">Challenge: {item.challenge}</p>
                <div className="bg-white border border-slate-200 rounded-xl p-4 mb-4">
                  <div className="text-xs uppercase font-bold text-slate-500 mb-1">Solution</div>
                  <p className="text-sm text-slate-700 leading-relaxed">{item.solution}</p>
                </div>
                <div className="mt-auto flex items-center justify-between pt-2">
                  <div className="text-sm font-semibold text-[#FF8A00] leading-snug max-w-[80%]">Outcome: {item.outcome}</div>
                  <ArrowRight className="w-4 h-4 text-slate-300" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <SectionHeader title={testimonialCopy.title} subtitle={testimonialCopy.subtitle} />
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((item) => (
              <div key={item.id} className="bg-slate-50 p-8 rounded-xl border border-slate-100 relative">
                <div className="flex gap-1 text-[#FF8A00] mb-4">
                  {[...Array(item.stars)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <p className="text-slate-600 mb-6 italic">"{item.content}"</p>
                <div>
                  <h4 className="font-bold text-slate-900">{item.name}</h4>
                  <p className="text-sm text-slate-500 flex items-center gap-2">
                    <span className="px-2 py-1 bg-white rounded-full border border-slate-200 text-xs text-[#1C2D5A]">{item.role}</span>
                  </p>
                </div>
                <div className="absolute -bottom-4 right-8 text-9xl text-slate-200 leading-none opacity-50 pointer-events-none">"</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="container mx-auto px-6 max-w-4xl">
          <SectionHeader title={faqCopy.title} subtitle={faqCopy.subtitle} centered={true} />
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm">
            {faqs.map((faq, idx) => (
              <AccordionItem key={idx} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
  };
  const renderProducts = () => {
    const catalogCopy = translations[lang]?.catalog || translations.en.catalog;
    const frequencyFilters = [
      { key: "433", label: "433 MHz" },
      { key: "868", label: "868 MHz" },
      { key: "multi", label: "Multi / Dual" },
      { key: "wifi", label: "WiFi / Smart" },
      { key: "infrared", label: "Infrared" }
    ];
    const protocolFilters = [
      { key: "rolling", label: "Rolling Code" },
      { key: "fixed", label: "Fixed / Learning" },
      { key: "tuya", label: "Tuya / WiFi" },
      { key: "clone", label: "Clone" },
      { key: "sensor", label: "Sensors" }
    ];

    const toggleFilter = (type, key) => {
      setFilters((prev) => (prev[type] === key ? { ...prev, [type]: null } : { ...prev, [type]: key }));
    };

    const filteredProducts = products.filter((product) => {
      const matchFrequency = filters.frequency ? product.freqKey === filters.frequency : true;
      const matchProtocol = filters.protocol ? product.protocolKey === filters.protocol : true;
      return matchFrequency && matchProtocol;
    });

    return (
    <section className="py-12 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-6">
        <div className="bg-gradient-to-br from-[#1C2D5A] via-[#1C2D5A] to-[#0f1e4d] rounded-3xl p-12 mb-12 text-center text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 relative z-10">{catalogCopy.title}</h1>
          <p className="text-blue-100 max-w-2xl mx-auto text-lg relative z-10">{catalogCopy.subtitle}</p>
          <div className="relative z-10 flex justify-center mt-6">
            <Button
              variant="secondary"
              className="bg-white text-[#1C2D5A] hover:text-white hover:bg-[#1C2D5A] border-white/40"
              onClick={() => window.open(CATALOG_URL, "_blank")}
            >
              <Download className="w-5 h-5 mr-2" /> Download PDF
            </Button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <aside className="lg:w-72 flex-shrink-0">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 sticky top-28">
              <div className="flex items-center gap-2 mb-8 pb-4 border-b border-slate-100">
                <Filter className="w-5 h-5 text-[#1C2D5A]" />
                <span className="font-bold text-lg text-slate-900">Filters</span>
              </div>
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-slate-800 mb-3 text-xs uppercase tracking-[0.2em]">Frequency</h4>
                  <div className="flex flex-wrap gap-2">
                    {frequencyFilters.map((item) => {
                      const active = filters.frequency === item.key;
                      return (
                        <button
                          key={item.key}
                          onClick={() => toggleFilter("frequency", item.key)}
                          className={`px-3 py-2 rounded-full border text-sm transition-all ${
                            active
                              ? "bg-[#1C2D5A] text-white border-[#1C2D5A] shadow-sm"
                              : "bg-white text-slate-700 border-slate-200 hover:border-[#1C2D5A] hover:text-[#1C2D5A]"
                          }`}
                        >
                          {item.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 mb-3 text-xs uppercase tracking-[0.2em]">Protocol</h4>
                  <div className="flex flex-wrap gap-2">
                    {protocolFilters.map((item) => {
                      const active = filters.protocol === item.key;
                      return (
                        <button
                          key={item.key}
                          onClick={() => toggleFilter("protocol", item.key)}
                          className={`px-3 py-2 rounded-full border text-sm transition-all ${
                            active
                              ? "bg-[#FF8A00] text-[#0B1A39] border-[#FF8A00] shadow-sm"
                              : "bg-white text-slate-700 border-slate-200 hover:border-[#FF8A00] hover:text-[#0B1A39]"
                          }`}
                        >
                          {item.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
                {(filters.frequency || filters.protocol) && (
                  <button
                    onClick={() => setFilters({ frequency: null, protocol: null })}
                    className="w-full mt-4 text-sm font-semibold text-[#1C2D5A] bg-slate-50 border border-slate-200 rounded-lg py-2 hover:border-[#1C2D5A] hover:bg-white transition"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            </div>
          </aside>

          {/* Grid */}
          <div className="flex-1">
            <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-slate-600">
              <span className="px-3 py-1 rounded-full bg-white border border-slate-200">Showing {filteredProducts.length} items</span>
              {filters.frequency && (
                <span className="px-3 py-1 rounded-full bg-[#E9EDFB] text-[#0B1A39] border border-[#1C2D5A]/20">
                  Freq: {frequencyFilters.find((f) => f.key === filters.frequency)?.label}
                </span>
              )}
              {filters.protocol && (
                <span className="px-3 py-1 rounded-full bg-[#FFF3E0] text-[#8b5b00] border border-[#FF8A00]/30">
                  Protocol: {protocolFilters.find((f) => f.key === filters.protocol)?.label}
                </span>
              )}
            </div>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 group flex flex-col">
                  <div className="relative pt-[100%] bg-slate-50 overflow-hidden rounded-t-xl">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="absolute top-0 left-0 w-full h-full object-contain p-8 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-[#FF8A00] text-white text-xs font-bold px-3 py-1 rounded shadow-sm">{product.tag}</span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="text-xs font-bold text-slate-400 uppercase mb-2 tracking-wider">{product.category}</div>
                    <h3 className="font-bold text-lg text-slate-900 mb-4 leading-snug hover:text-[#1C2D5A] cursor-pointer">{product.name}</h3>
                    <div className="flex flex-wrap gap-2 text-xs mb-4">
                      <span className="px-2 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">{product.frequency}</span>
                      <span className="px-2 py-1 rounded-full bg-white text-slate-700 border border-slate-200">{product.chip}</span>
                    </div>
                    <div className="text-sm text-slate-600 space-y-1 mb-4">
                      {(product.specs || []).map((item, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span className="mt-1 inline-block w-1.5 h-1.5 rounded-full bg-[#FF8A00]"></span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-auto pt-4 border-t border-slate-100 grid grid-cols-2 gap-2">
                      <button
                        className="w-full flex items-center justify-center gap-2 text-slate-700 font-semibold py-2 border border-slate-200 rounded hover:bg-slate-50 transition-colors"
                        onClick={() => setActivePage("contact")}
                      >
                        <Download className="w-4 h-4" /> Datasheet
                      </button>
                      <button
                        className="w-full flex items-center justify-center gap-2 text-white font-semibold py-2 bg-[#1C2D5A] rounded hover:bg-[#0f1e4d] transition-colors"
                        onClick={() => setActivePage("contact")}
                      >
                        <Mail className="w-4 h-4" /> {t("nav.request")}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
  };

  const renderAbout = () => {
    const aboutCopy = translations[lang]?.about || translations.en.about;
    return (
    <div className="min-h-screen bg-white">
      {/* Intro */}
      <div className="bg-slate-100 py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">{aboutCopy.title}</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">{aboutCopy.subtitle}</p>
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {[ShieldCheck, Globe, Award].map((IconComp, idx) => {
              const item = aboutCopy.cards[idx];
              return (
              <div key={idx} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex items-start gap-4 text-left">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-[#1C2D5A]">
                  <IconComp className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 mb-1">{item?.title}</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">{item?.desc}</p>
                </div>
              </div>
            );
            })}
          </div>
        </div>
      </div>

      {/* Factory Strength & Certificates */}
      <div className="container mx-auto px-6 py-24">
        {/* Engineering Strength */}
        <div className="mb-24">
          <SectionHeader title="Factory Strength" subtitle="State-of-the-art facilities ensuring ISO9001 quality standards." centered={true} />

          <div className="grid md:grid-cols-3 gap-6">
            <div className="group relative overflow-hidden rounded-xl shadow-lg">
              <img
                src={`https://placehold.co/600x400/e2e8f0/1C2D5A?text=SMT+Production+Line`}
                alt="SMT Line"
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <h3 className="text-white font-bold text-lg">Automated SMT Lines</h3>
                <p className="text-slate-300 text-sm">High precision component placement</p>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-xl shadow-lg">
              <img
                src={`https://placehold.co/600x400/e2e8f0/1C2D5A?text=Aging+Test+Room`}
                alt="Aging Room"
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <h3 className="text-white font-bold text-lg">Aging Test Room</h3>
                <p className="text-slate-300 text-sm">72-hour continuous testing</p>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-xl shadow-lg">
              <img
                src={`https://placehold.co/600x400/e2e8f0/1C2D5A?text=R%26D+Laboratory`}
                alt="R&D Lab"
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <h3 className="text-white font-bold text-lg">RF Shielding Lab</h3>
                <p className="text-slate-300 text-sm">Signal spectrum analysis</p>
              </div>
            </div>
          </div>
        </div>

        {/* Certificates */}
        <div className="bg-slate-50 rounded-3xl p-12 border border-slate-100">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Certifications</h2>
            <p className="text-slate-500">We meet international standards for safety and compliance.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {["ISO 9001:2015", "CE Certified", "FCC Approved", "RoHS Compliant"].map((cert, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center justify-center gap-4 hover:shadow-md transition-shadow">
                <Award className="w-12 h-12 text-[#FF8A00]" />
                <span className="font-bold text-slate-800">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
  };
  // --- IMPROVED BLOG LOGIC (Detail View + Comments) ---
  const renderBlog = () => {
    const blogCopy = translations[lang]?.blog || translations.en.blog;
    if (viewingPost) {
      // Single Post View with Comments
      const postComments = comments.filter((c) => c.postId === viewingPost.id);

      return (
        <div className="min-h-screen bg-slate-50 py-12">
          <div className="container mx-auto px-6 max-w-4xl">
            <button onClick={() => setViewingPost(null)} className="flex items-center text-[#1C2D5A] font-bold mb-8 hover:underline">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to All Articles
            </button>

            <article className="bg-white rounded-2xl shadow-lg overflow-hidden mb-12 animate-fade-in-up">
              <img src={viewingPost.image} alt={viewingPost.title} className="w-full h-80 object-cover" />
              <div className="p-8 md:p-12">
                <div className="flex items-center gap-4 text-sm text-slate-500 mb-6">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" /> {viewingPost.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4" /> {viewingPost.author}
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">{viewingPost.title}</h1>
                <div className="prose prose-lg text-slate-600 max-w-none" dangerouslySetInnerHTML={{ __html: viewingPost.content }}></div>
              </div>
            </article>

            {/* Comment Section (Marketing Master Feature) */}
            <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">
              <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
                <MessageSquare className="w-6 h-6 text-[#FF8A00]" />
                Discussion ({postComments.length})
              </h3>

              {/* Comment List */}
              <div className="space-y-8 mb-12">
                {postComments.map((comment) => (
                  <div key={comment.id} className={`flex gap-4 ${comment.isAdmin ? "ml-8 bg-blue-50 p-4 rounded-lg" : ""}`}>
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shrink-0 ${
                        comment.isAdmin ? "bg-[#1C2D5A]" : "bg-slate-300"
                      }`}
                    >
                      {comment.user.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-slate-900">{comment.user}</span>
                        {comment.isAdmin && <span className="text-xs bg-[#1C2D5A] text-white px-2 py-0.5 rounded">Official</span>}
                        <span className="text-xs text-slate-400">{comment.date}</span>
                      </div>
                      <p className="text-slate-600 text-sm">{comment.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Comment Form */}
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                <h4 className="font-bold text-slate-800 mb-4">Leave a Reply</h4>
                <form onSubmit={handleCommentSubmit} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Your Name (Client / Partner)"
                      className="w-full px-4 py-3 border border-slate-200 rounded focus:border-[#1C2D5A] outline-none"
                      value={newComment.user}
                      onChange={(e) => setNewComment({ ...newComment, user: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <textarea
                      placeholder="Ask a question about this product..."
                      className="w-full px-4 py-3 border border-slate-200 rounded focus:border-[#1C2D5A] outline-none h-24"
                      value={newComment.text}
                      onChange={(e) => setNewComment({ ...newComment, text: e.target.value })}
                      required
                    ></textarea>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-400">* Comments are moderated.</span>
                    <Button variant="small" className="flex items-center gap-2">
                      Post Comment <Send className="w-3 h-3" />
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Default Blog List View
    return (
      <div className="min-h-screen bg-slate-50 py-12">
        <div className="container mx-auto px-6">
          <SectionHeader title={blogCopy.title} subtitle={blogCopy.subtitle} centered={true} />
          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-xl transition-all cursor-pointer group"
                onClick={() => {
                  setViewingPost(post);
                  window.scrollTo(0, 0);
                }}
              >
                <div className="overflow-hidden h-48">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-8">
                  <div className="text-xs text-[#1C2D5A] font-bold mb-2 uppercase tracking-wide">{post.date}</div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-[#1C2D5A] transition-colors leading-tight">{post.title}</h3>
                  <p className="text-slate-500 mb-6 text-sm leading-relaxed">{post.excerpt}</p>
                  <span className="text-[#1C2D5A] font-bold flex items-center text-sm">
                    Read Article <ArrowRight className="w-4 h-4 ml-1" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  const renderContact = () => {
    const contactCopy = translations[lang]?.contact || translations.en.contact;
    return (
    <section className="bg-white min-h-screen">
      <div className="h-96 bg-gradient-to-br from-[#0f1e4d] via-[#1C2D5A] to-[#0f1e4d] relative flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[#1C2D5A] opacity-20"></div>
        <div className="text-center relative z-10 px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">{contactCopy.heroTitle}</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">{contactCopy.heroSubtitle}</p>
        </div>
      </div>

      <div className="container mx-auto px-6 -mt-32 relative z-20 pb-24">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
          {/* Left Info Panel */}
          <div className="lg:w-2/5 bg-[#1C2D5A] p-12 text-white flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-8">Get In Touch</h3>
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h5 className="font-bold text-lg mb-1">Factory Address</h5>
                    <p className="text-blue-100 leading-relaxed text-sm">{CONTACT_INFO.address}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h5 className="font-bold text-lg mb-1">Email</h5>
                    <p className="text-blue-100">{CONTACT_INFO.email}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h5 className="font-bold text-lg mb-1">WhatsApp / Phone</h5>
                    <p className="text-blue-100">{CONTACT_INFO.phone}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-12 border-t border-white/20">
              <p className="text-blue-200 text-sm">Working Hours: Mon-Sat, 09:00 - 18:00 (GMT+8)</p>
            </div>
          </div>

          {/* Right Form Panel */}
          <div className="lg:w-3/5 p-12 lg:p-16 bg-white">
            <div className="max-w-lg mx-auto">
              <h3 className="text-3xl font-bold text-slate-900 mb-2">Send Inquiry</h3>
              <p className="text-slate-500 mb-3">We usually reply within 2 hours.</p>
              <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 mb-6">
                <ShieldCheck className="w-4 h-4 text-[#1C2D5A]" />
                {contactCopy.b2bNote}
            </div>

            {/* Note for GitHub Pages User: Replace 'action' with your Formspree endpoint */}
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Inquiry Simulated: For GitHub Pages, integrate Formspree or EmailJS here."); }}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Company *</label>
                  <input type="text" required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#1C2D5A] outline-none transition" placeholder="Distributor / OEM Name" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Business Email *</label>
                  <input type="email" required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#1C2D5A] outline-none transition" placeholder="name@company.com" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Application</label>
                  <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#1C2D5A] outline-none transition">
                    <option>Gate / Garage</option>
                    <option>Access Control</option>
                    <option>Smart Home</option>
                    <option>Industrial Hoist</option>
                    <option>Parking Barrier</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Protocol</label>
                  <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#1C2D5A] outline-none transition">
                    <option>Rolling Code (HCS301)</option>
                    <option>Fixed / Learning (EV1527/PT2262)</option>
                    <option>Clone / Multi-frequency</option>
                    <option>Tuya WiFi / Zigbee Bridge</option>
                    <option>Not sure (need guidance)</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Annual Volume</label>
                  <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#1C2D5A] outline-none transition">
                    <option>500 - 2,000 pcs</option>
                    <option>2,000 - 10,000 pcs</option>
                    <option>10,000 - 50,000 pcs</option>
                    <option>50,000+ pcs</option>
                    <option>Sample run first</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Timeline</label>
                  <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#1C2D5A] outline-none transition">
                    <option>Need samples in 7-10 days</option>
                    <option>Production in 4-6 weeks</option>
                    <option>Just collecting quotations</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Project Details *</label>
                <textarea
                  required
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#1C2D5A] outline-none transition h-32"
                  placeholder="Example: Need rolling code remote compatible with HCS301 receivers, 433.92MHz, 2-button, IP54 enclosure. Target market: EU."
                ></textarea>
              </div>

              <div className="flex items-center gap-3 text-sm text-slate-600 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2">
                <input type="checkbox" className="w-4 h-4 accent-[#1C2D5A]" id="nda" />
                <label htmlFor="nda" className="cursor-pointer">Request NDA before sharing CAD/BOM</label>
              </div>

              <Button className="w-full text-lg shadow-xl">Send Message</Button>
              <p className="text-xs text-slate-500 text-center">Response within 2h · Engineers answer protocol/antenna questions</p>
            </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-[#1C2D5A] selection:text-white">
      {/* Top Bar */}
      <div className="bg-slate-900 text-slate-400 text-xs py-2 hidden lg:block">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex gap-6">
            <span className="flex items-center gap-1 hover:text-white cursor-pointer">
              <Mail className="w-3 h-3" /> {CONTACT_INFO.email}
            </span>
            <span className="flex items-center gap-1 hover:text-white cursor-pointer">
              <Phone className="w-3 h-3" /> {CONTACT_INFO.phone}
            </span>
          </div>
          <div className="flex gap-4">
            <span className="px-3 py-1 bg-white/10 rounded-full text-white font-semibold">B2B Only</span>
            <span className="hover:text-white cursor-pointer">Support</span>
            <span className="hover:text-white cursor-pointer">Login (Dealer)</span>
          </div>
        </div>
      </div>

      {/* Sticky Header */}
      <header className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/85 backdrop-blur-md shadow-md py-3" : "bg-[#f8faff] py-4 shadow-sm"}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setActivePage("home")}>
            <div className="w-16 h-16 p-1.5 flex items-center justify-center">
              <img src={Logo} alt="CHJ logo" className="w-full h-full object-contain" />
            </div>

            <div>
              <h1 className="text-xl font-extrabold text-[#1C2D5A] leading-none tracking-tight">{BRAND_NAME}</h1>
              <span className="text-[11px] font-semibold text-slate-500 tracking-wide">B2B OEM | {COMPANY_NAME}</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            <NavLink page="home" label={t("nav.home")} />
            <NavLink page="about" label={t("nav.about")} />
            <NavLink page="products" label={t("nav.products")} />
            <NavLink page="blog" label={t("nav.blog")} />
            <NavLink page="contact" label={t("nav.contact")} />
            <div className="flex items-center gap-3 relative" ref={langMenuRef}>
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-full border border-slate-200 bg-white text-slate-700 hover:text-[#0B1A39] hover:border-[#1C2D5A] shadow-sm"
                aria-label="Change language"
              >
                <Globe className="w-4 h-4" />
                <ChevronDown className="w-4 h-4" />
              </button>
              {langMenuOpen && (
                <div className="absolute right-0 top-12 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden min-w-[160px]">
                  {LANGUAGE_OPTIONS.map((option) => (
                    <button
                      key={option.code}
                      onClick={() => {
                        setLang(option.code);
                        setLangMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 ${lang === option.code ? "font-bold text-[#1C2D5A]" : "text-slate-700"}`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
              <Button className="px-6 py-2.5 text-sm shadow-md hover:shadow-lg rounded-md" onClick={() => setActivePage("contact")}>
                {t("nav.request")}
              </Button>
            </div>
          </nav>

          <button className="lg:hidden p-2 text-slate-800" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-24 px-6 lg:hidden animate-fade-in">
          <div className="flex flex-col space-y-4">
            <NavLink page="home" label={t("nav.home")} mobile />
            <NavLink page="about" label={t("nav.about")} mobile />
            <NavLink page="products" label={t("nav.products")} mobile />
            <NavLink page="blog" label={t("nav.blog")} mobile />
            <NavLink page="contact" label={t("nav.contact")} mobile />
            <div className="flex items-center gap-2">
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value)}
                className="flex-1 bg-white border border-slate-200 rounded-full px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm"
              >
                {LANGUAGE_OPTIONS.map((option) => (
                  <option key={option.code} value={option.code}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <Button
              className="w-full mt-8"
              onClick={() => {
                setActivePage("contact");
                setIsMenuOpen(false);
              }}
            >
              {t("nav.request")}
            </Button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main>
        {activePage === "home" && renderHome()}
        {activePage === "about" && renderAbout()}
        {activePage === "products" && renderProducts()}
        {activePage === "blog" && renderBlog()}
        {activePage === "contact" && renderContact()}
      </main>

      {/* Sticky Floating Action Button (Marketing Optimization) */}
      <FloatingContact />

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 pt-24 pb-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 border-b border-slate-800 pb-16">
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="text-white font-bold text-2xl mb-6 flex items-center gap-3">
                <div className="w-12 h-12 flex items-center justify-center text-xs p-1">
                  <img src={Logo} alt="CHJ footer logo" className="w-full h-full object-contain" />
                </div>
                CHJ Remotes
              </div>
              <p className="text-slate-400 leading-relaxed text-sm">
                {COMPANY_NAME} ({BRAND_NAME}) is an ISO9001 B2B-only factory in Dongguan, China. We build RF remotes, receivers, and Tuya-ready smart modules with in-house PCB and antenna tuning since 2004.
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Products</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <span className="hover:text-[#FF8A00] transition cursor-pointer" onClick={() => setActivePage("products")}>
                    Universal Gate Remotes
                  </span>
                </li>
                <li>
                  <span className="hover:text-[#FF8A00] transition cursor-pointer" onClick={() => setActivePage("products")}>
                    Rolling Code (HCS301)
                  </span>
                </li>
                <li>
                  <span className="hover:text-[#FF8A00] transition cursor-pointer" onClick={() => setActivePage("products")}>
                    Tuya WiFi Receivers
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Company</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <span className="hover:text-[#FF8A00] transition cursor-pointer" onClick={() => setActivePage("about")}>
                    About Factory
                  </span>
                </li>
                <li>
                  <span className="hover:text-[#FF8A00] transition cursor-pointer" onClick={() => setActivePage("about")}>
                    Certificates
                  </span>
                </li>
                <li>
                  <span className="hover:text-[#FF8A00] transition cursor-pointer" onClick={() => setActivePage("contact")}>
                    Contact Us
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Contact</h4>
              <p className="text-xs text-slate-500 mb-2">Email: {CONTACT_INFO.email}</p>
              <p className="text-xs text-slate-500 mb-2">WhatsApp: {CONTACT_INFO.whatsapp}</p>
              <p className="text-xs text-slate-500">Add: {CONTACT_INFO.address}</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Links</h4>
              <ul className="space-y-3 text-sm">
                <li><a className="hover:text-[#FF8A00]" href="/robots.txt">Robots</a></li>
                <li><a className="hover:text-[#FF8A00]" href="/sitemap.xml">Sitemap</a></li>
                <li><span className="hover:text-[#FF8A00] cursor-pointer">Privacy</span></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 text-center text-sm text-slate-500">
            {/* Updated Copyright Year */}
            <p>&copy; 2025 CHJ Remotes. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
