import React, { useEffect, useState } from "react";
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
  title: `${COMPANY_NAME} | ${BRAND_NAME} - B2B RF Remote Control Manufacturer`,
  description: `${COMPANY_NAME} (${BRAND_NAME}): ISO9001-certified, B2B-only factory for RF remotes, rolling code transmitters, Tuya WiFi/433MHz receivers, and OEM PCB layouts.`
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
  accent: "#F5A524" // Logo Dot Orange
};

// --- Mock Data ---

const products = [
  {
    id: 1,
    name: "CJ-433 Universal Rolling Code Remote",
    category: "Remote Control",
    frequency: "433.92 MHz",
    chip: "HCS301 (Microchip)",
    voltage: "12V (27A)",
    image: `https://placehold.co/600x600/f8fafc/1C2D5A?text=CJ-433+Pro+Series`,
    tag: "Best Seller",
    desc: "High-security rolling code transmitter with 100m range and universal 433MHz receiver replacement for garage door openers.",
    specs: [
      "Chipset: HCS301 / Rolling code encryption",
      "Range: >100m with tuned PCB antenna",
      "Enclosure: Zinc alloy frame, 12V 27A cell"
    ]
  },
  {
    id: 2,
    name: "Smart WiFi + RF Hybrid Receiver",
    category: "Receiver",
    frequency: "WiFi 2.4G + 433MHz",
    chip: "Tuya Smart Module",
    voltage: "AC 85-265V",
    image: `https://placehold.co/600x600/f8fafc/1C2D5A?text=WiFi+Smart+Receiver`,
    tag: "Tuya Certified",
    desc: "Upgrade old garage doors to smart control. Works with App, Alexa, and Google Home; Tuya Zigbee switch module OEM ready.",
    specs: [
      "Chipset: ESP32 / Tuya module (WiFi & Zigbee ready)",
      "Voltage: AC/DC 9-30V & 110-240V",
      "Memory: Stores up to 500 remote codes"
    ]
  },
  {
    id: 3,
    name: "Industrial IP67 Waterproof Remote",
    category: "Industrial",
    frequency: "868.35 MHz",
    chip: "EV1527 (Learning)",
    voltage: "DC 3V (CR2032)",
    image: `https://placehold.co/600x600/f8fafc/1C2D5A?text=IP67+Waterproof`,
    tag: "Heavy Duty",
    desc: "Designed for harsh environments. Dustproof, waterproof, and drop-resistant for industrial doors and hoists.",
    specs: [
      "Ingress: IP67 sealed enclosure, anti-drop shell",
      "Battery: CR2032, low-power MCU design",
      "RF: 868MHz learning code, tuned whip antenna"
    ]
  },
  {
    id: 4,
    name: "Long Range Active Infrared Beam",
    category: "Security",
    frequency: "Infrared",
    chip: "Smart AI Detection",
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
    chip: "PT2262 (Fixed Code)",
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
    chip: "Multi-Frequency Clone",
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
    challenge: "LiftMaster remotes caused RF collisions with local brand receivers, creating 12% return rate.",
    solution: "Re-tuned HCS301 PCB + SAW oscillator, added whitelist firmware, and provided CE/FCC test report in one batch.",
    outcome: "Returns dropped to 0.8% and the client launched in Germany within 3 months."
  },
  {
    id: "cs-2",
    title: "Tuya + RF Hybrid Retrofit",
    market: "USA | Access control OEM",
    challenge: "Needed app control without replacing legacy 433MHz fobs for 40K installed doors.",
    solution: "Custom Tuya WiFi bridge + rolling-code receiver, SDK handoff, and antenna matching for long garages.",
    outcome: "App adoption hit 72% in 60 days; no on-site rewiring required."
  },
  {
    id: "cs-3",
    title: "Industrial IP67 Handset",
    market: "Brazil | Smart home integrator",
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
    "px-8 py-4 rounded-lg font-bold transition-all duration-300 flex items-center justify-center tracking-wide text-sm uppercase";
  const variants = {
    primary: `bg-[#F5A524] hover:bg-[#d68f12] text-white shadow-lg hover:shadow-amber-500/30 transform hover:-translate-y-1`,
    secondary: `bg-white text-slate-800 border border-slate-200 hover:border-[#1C2D5A] hover:text-[#1C2D5A] shadow-sm hover:shadow-md`,
    outline: `bg-transparent border-2 border-[#1C2D5A] text-[#1C2D5A] hover:bg-[#1C2D5A] hover:text-white`,
    small: `bg-[#F5A524] hover:bg-[#d68f12] text-white text-xs px-4 py-2 rounded`
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

const SectionHeader = ({ title, subtitle, centered = true }) => (
  <div className={`mb-16 ${centered ? "text-center" : "text-left"}`}>
    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">{title}</h2>
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
        <p className="text-slate-600 leading-relaxed pl-4 border-l-2 border-[#F5A524]">{answer}</p>
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
  const [activePage, setActivePage] = useState("home");
  const [viewingPost, setViewingPost] = useState(null); // State for Single Blog Post View
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Comment System State
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState({ user: "", text: "" });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.title = SEO_METADATA.title;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", SEO_METADATA.description);
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = SEO_METADATA.description;
      document.head.appendChild(meta);
    }
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (activePage !== "blog") {
      setViewingPost(null); // Reset blog view when changing pages
    }
  }, [activePage]);

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
        font-medium transition-all duration-200 tracking-wide uppercase text-sm
        ${
          mobile
            ? "block w-full text-left py-4 text-xl border-b border-slate-100 text-slate-800 normal-case"
            : `px-4 py-2 ${activePage === page ? "text-[#1C2D5A] font-bold" : "text-slate-600 hover:text-[#1C2D5A]"}`
        }
      `}
    >
      {label}
    </button>
  );

  // --- Render Functions ---

  const renderHome = () => (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-slate-50 overflow-hidden">
        <div className="absolute inset-0 bg-white">
          <div className="absolute top-0 right-0 w-2/3 h-full bg-slate-100 skew-x-[-12deg] translate-x-20 z-0"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50 z-0"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 pt-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in-up">
              <div className="flex flex-wrap gap-3">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-[#1C2D5A] rounded-full text-sm font-bold tracking-wide border border-blue-100">
                  <ShieldCheck className="w-4 h-4" /> B2B Manufacturer | Factory Direct
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white text-slate-700 rounded-full text-xs font-semibold tracking-wide border border-slate-200 shadow-sm">
                  {COMPANY_NAME} | {BRAND_NAME}
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight max-w-3xl">
                B2B RF Remote & Receiver OEM/ODM | 433MHz / 868MHz | Tuya Hybrid
              </h1>

              <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
                B2B-only factory in Dongguan: rolling-code remotes, receivers, and Tuya + RF hybrids. We tune PCB antennas, provide firmware hooks, and deliver MP samples in 7 days.
              </p>

              <div className="flex flex-wrap gap-3 text-sm text-slate-600">
                {["ISO9001 | CE/FCC/ROHS ready", "In-house RF chamber & PCB/antenna tuning", "全球客户仅限B2B/不做零售"].map((tag) => (
                  <span key={tag} className="inline-flex items-center gap-2 px-3 py-2 bg-white rounded-full border border-slate-200 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F5A524]"></span>
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button onClick={() => setActivePage("contact")}>Start OEM Project</Button>
                <Button variant="secondary" onClick={() => window.open(CATALOG_URL, "_blank")}>
                  <PlayCircle className="w-5 h-5 mr-2 text-[#1C2D5A]" /> Download Catalog (PDF)
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="pt-12 grid grid-cols-3 gap-8 border-t border-slate-200">
                <div>
                  <div className="text-3xl font-bold text-slate-900">20+</div>
                  <div className="text-sm text-slate-500 mt-1">Years Experience</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-slate-900">100%</div>
                  <div className="text-sm text-slate-500 mt-1">QC Tested</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-slate-900">50+</div>
                  <div className="text-sm text-slate-500 mt-1">Countries Served</div>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative hidden lg:block h-[600px]">
              <img
                src={`https://placehold.co/800x800/transparent/1C2D5A?text=High-Tech+Remote+3D+Render`}
                alt="RF Remote Control 3D Render"
                className="w-full h-full object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-1/4 -left-10 bg-white p-4 rounded-xl shadow-xl border border-slate-100 flex items-center gap-3 animate-bounce-slow">
                <div className="bg-green-100 p-2 rounded-full">
                  <Cpu className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase font-bold">Chipset</div>
                  <div className="font-bold text-slate-800">Microchip HCS301</div>
                </div>
              </div>
            </div>
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
          <SectionHeader title="From Concept to Delivery" subtitle="Our streamlined OEM/ODM workflow ensures your custom remotes are market-ready in record time." />
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
              title="Built for Gates, Doors, Smart Home, Industrial"
              subtitle="Protocols we master: HCS301/HCS361 rolling code, EV1527/PT2262 fixed/learning code, Tuya WiFi/Zigbee bridges, and multi-frequency clones."
              centered={false}
            />
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "Garage/gate automation distributors",
                "Access control OEM / panel builders",
                "Smart home integrators (Tuya/Alexa/Google)",
                "Industrial hoists and shutters",
                "Parking barrier arms & bollards",
                "Aftermarket car remotes (315/433MHz)"
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <span className="mt-1 inline-block w-2 h-2 rounded-full bg-[#F5A524]"></span>
                  <p className="text-sm text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
            <h3 className="text-xl font-bold text-slate-900">Technical Delivery</h3>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex gap-2">
                <CheckCircle className="w-4 h-4 text-[#1C2D5A]" />
                <span>RF validation: shielding room sweep, antenna VSWR tuning, and range proof.</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle className="w-4 h-4 text-[#1C2D5A]" />
                <span>Firmware hooks: learning code tables, whitelist/blacklist, and Tuya SDK handoff.</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle className="w-4 h-4 text-[#1C2D5A]" />
                <span>Docs ready: CE/FCC/RoHS, HS code, packing list, and aging test records.</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle className="w-4 h-4 text-[#1C2D5A]" />
                <span>Support: engineer-to-engineer WhatsApp/Teams within GMT+8 business hours.</span>
              </li>
            </ul>
            <div className="pt-2 flex flex-wrap gap-3">
              <Button variant="primary" className="px-6 py-3" onClick={() => setActivePage("contact")}>
                Book Engineer Call
              </Button>
              <Button variant="secondary" className="px-6 py-3" onClick={() => window.open(CATALOG_URL, "_blank")}>
                Catalog & Specs PDF
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
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Trending Solutions</h2>
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
                          <span className="mt-1 inline-block w-1.5 h-1.5 rounded-full bg-[#F5A524]"></span>
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
                      Request OEM Quote
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
          <SectionHeader title="Case Studies" subtitle="Real projects: challenge → solution → outcome for distributors and OEM partners." />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((item) => (
              <div key={item.id} className="bg-slate-50 border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-semibold text-[#1C2D5A] bg-white px-3 py-1 rounded-full border border-slate-200">{item.market}</span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500">B2B Only</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 leading-snug">{item.title}</h3>
                <p className="text-slate-600 text-sm mb-4">Challenge: {item.challenge}</p>
                <div className="bg-white border border-slate-200 rounded-xl p-4 mb-4">
                  <div className="text-xs uppercase font-bold text-slate-500 mb-1">Solution</div>
                  <p className="text-sm text-slate-700 leading-relaxed">{item.solution}</p>
                </div>
                <div className="mt-auto flex items-center justify-between pt-2">
                  <div className="text-sm font-semibold text-[#F5A524] leading-snug max-w-[80%]">Outcome: {item.outcome}</div>
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
          <SectionHeader title="What Our Clients Say" subtitle="Trusted by distributors and system integrators worldwide." />
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((item) => (
              <div key={item.id} className="bg-slate-50 p-8 rounded-xl border border-slate-100 relative">
                <div className="flex gap-1 text-[#F5A524] mb-4">
                  {[...Array(item.stars)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <p className="text-slate-600 mb-6 italic">"{item.content}"</p>
                <div>
                  <h4 className="font-bold text-slate-900">{item.name}</h4>
                  <p className="text-sm text-slate-500">{item.role}</p>
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
          <SectionHeader title="FAQ" subtitle="Common queries regarding OEM, shipping, and compatibility." centered={true} />
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm">
            {faqs.map((faq, idx) => (
              <AccordionItem key={idx} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
  const renderProducts = () => (
    <section className="py-12 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-6">
        <div className="bg-[#1C2D5A] rounded-3xl p-12 mb-12 text-center text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 relative z-10">Product Catalog</h1>
          <p className="text-blue-100 max-w-2xl mx-auto text-lg relative z-10">
            OEM/ODM only - ready for distributors and system integrators. Download the PDF catalog or request a tuned PCB layout for your protocol.
          </p>
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
              <div className="space-y-8">
                <div>
                  <h4 className="font-bold text-slate-800 mb-4 text-sm uppercase tracking-wide">Frequency</h4>
                  <div className="space-y-3">
                    {["315 MHz", "433.92 MHz", "868.35 MHz", "Multi-Freq"].map((freq, i) => (
                      <label key={i} className="flex items-center gap-3 cursor-pointer group">
                        <div className="w-5 h-5 rounded border border-slate-300 group-hover:border-[#1C2D5A] flex items-center justify-center"></div>
                        <span className="text-slate-600 group-hover:text-[#1C2D5A] transition-colors">{freq}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Grid */}
          <div className="flex-1">
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
              {products.map((product) => (
                <div key={product.id} className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 group flex flex-col">
                  <div className="relative pt-[100%] bg-slate-50 overflow-hidden rounded-t-xl">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="absolute top-0 left-0 w-full h-full object-contain p-8 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-[#F5A524] text-white text-xs font-bold px-3 py-1 rounded shadow-sm">{product.tag}</span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="text-xs font-bold text-slate-400 uppercase mb-2 tracking-wider">{product.category}</div>
                    <h3 className="font-bold text-lg text-slate-900 mb-4 leading-snug hover:text-[#1C2D5A] cursor-pointer">{product.name}</h3>
                    <div className="mt-auto pt-4 border-t border-slate-100">
                      <button
                        className="w-full flex items-center justify-center gap-2 text-[#1C2D5A] font-bold py-2 hover:bg-blue-50 rounded transition-colors"
                        onClick={() => setActivePage("contact")}
                      >
                        <Mail className="w-4 h-4" /> Request B2B Quote
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

  const renderAbout = () => (
    <div className="min-h-screen bg-white">
      {/* Intro */}
      <div className="bg-slate-100 py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">About {COMPANY_NAME}</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Operating the brand {BRAND_NAME}, we are a B2B-only RF remote manufacturer in Dongguan. No retail, no dropshipping - only OEM/ODM for distributors and system integrators.
          </p>
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {[
              { icon: ShieldCheck, title: "B2B Only / 源头工厂", desc: "Direct engineering + production. We do not run consumer webshops." },
              { icon: Globe, title: "Brand Clarity", desc: `Use ${BRAND_NAME} to avoid confusion with other 'Chuanghui' companies in the market.` },
              { icon: Award, title: "Export-Ready", desc: "ISO9001 plant with CE/FCC/RoHS capability and internal aging test lab." }
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex items-start gap-4 text-left">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-[#1C2D5A]">
                  <item.icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 mb-1">{item.title}</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
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
                <Award className="w-12 h-12 text-[#F5A524]" />
                <span className="font-bold text-slate-800">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
  // --- IMPROVED BLOG LOGIC (Detail View + Comments) ---
  const renderBlog = () => {
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
                <MessageSquare className="w-6 h-6 text-[#F5A524]" />
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
          <SectionHeader title="Industry Insights" subtitle="Stay updated with the latest RF technology and company news." centered={true} />
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
  const renderContact = () => (
    <section className="bg-white min-h-screen">
      <div className="h-96 bg-slate-900 relative flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[#1C2D5A] opacity-20"></div>
        <div className="text-center relative z-10 px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Contact Our Factory</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">Direct Manufacturer Pricing. Professional Technical Support.</p>
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
                B2B projects only (distributors / OEM / system integrators). Please include application & volume.
              </div>

              {/* Note for GitHub Pages User: Replace 'action' with your Formspree endpoint */}
              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Inquiry Simulated: For GitHub Pages, integrate Formspree or EmailJS here."); }}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">First Name</label>
                    <input type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#1C2D5A] outline-none transition" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Last Name</label>
                    <input type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#1C2D5A] outline-none transition" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Business Email *</label>
                  <input type="email" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#1C2D5A] outline-none transition" required />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Message</label>
                  <textarea
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#1C2D5A] outline-none transition h-32"
                    placeholder="I need 433MHz remotes with rolling code..."
                  ></textarea>
                </div>

                <Button className="w-full text-lg shadow-xl">Send Message</Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

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
      <header className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-lg py-3" : "bg-white py-5 shadow-sm"}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setActivePage("home")}>
            <div className="w-14 h-14 bg-white rounded-full border border-slate-200 shadow-sm p-1 flex items-center justify-center">
              <img src={Logo} alt="CHJ logo" className="w-full h-full object-contain" />
            </div>

            <div>
              <h1 className="text-xl font-extrabold text-[#1C2D5A] leading-none tracking-tight">{BRAND_NAME}</h1>
              <span className="text-[10px] font-bold text-slate-400 tracking-[0.2em] uppercase">
                B2B OEM | {COMPANY_NAME}
              </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            <NavLink page="home" label="Home" />
            <NavLink page="about" label="About" />
            <NavLink page="products" label="Products" />
            <NavLink page="blog" label="Blog" />
            <NavLink page="contact" label="Contact" />
            <Button className="px-6 py-2.5 text-sm" onClick={() => setActivePage("contact")}>
              Request Quote
            </Button>
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
            <NavLink page="home" label="Home" mobile />
            <NavLink page="about" label="About" mobile />
            <NavLink page="products" label="Products" mobile />
            <NavLink page="blog" label="Blog" mobile />
            <NavLink page="contact" label="Contact" mobile />
            <Button
              className="w-full mt-8"
              onClick={() => {
                setActivePage("contact");
                setIsMenuOpen(false);
              }}
            >
              Get Quote Now
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
          <div className="grid md:grid-cols-4 gap-12 border-b border-slate-800 pb-16">
            <div className="col-span-1 md:col-span-1">
              <div className="text-white font-bold text-2xl mb-6 flex items-center gap-3">
                <div className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center text-xs bg-white p-1">
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
                  <span className="hover:text-[#F5A524] transition cursor-pointer" onClick={() => setActivePage("products")}>
                    Universal Gate Remotes
                  </span>
                </li>
                <li>
                  <span className="hover:text-[#F5A524] transition cursor-pointer" onClick={() => setActivePage("products")}>
                    Rolling Code (HCS301)
                  </span>
                </li>
                <li>
                  <span className="hover:text-[#F5A524] transition cursor-pointer" onClick={() => setActivePage("products")}>
                    Tuya WiFi Receivers
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Company</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <span className="hover:text-[#F5A524] transition cursor-pointer" onClick={() => setActivePage("about")}>
                    About Factory
                  </span>
                </li>
                <li>
                  <span className="hover:text-[#F5A524] transition cursor-pointer" onClick={() => setActivePage("about")}>
                    Certificates
                  </span>
                </li>
                <li>
                  <span className="hover:text-[#F5A524] transition cursor-pointer" onClick={() => setActivePage("contact")}>
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
