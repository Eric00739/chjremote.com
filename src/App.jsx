// Updated: 2026-04-15 15:30 UTC - Force deployment
import React, { useEffect, useState } from "react";
import {
  Menu,
  X,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  Cpu,
  Zap,
  Globe,
  Download,
  ArrowRight,
  CheckCircle,
  Settings,
  Truck,
  Clock,
  Users,
  Star
} from "lucide-react";
import Logo from "../logo/LOGO.png";

const COMPANY_NAME = "Dongguan Chuangjiang Electronics Co., Ltd.";
const BRAND_NAME = "CHJ Remotes";
const CATALOG_URL = "/catalog.pdf";
const HERO_VIDEO_URL = `${import.meta.env.BASE_URL}videos/factory-hero.mp4`;
const KNOWN_PAGES = ["home", "about", "products", "blog", "contact"];

const CONTACT_INFO = {
  address: "8th Floor, Building 1, Huawei Kegu Industrial Park, Dalingshan, Dongguan, Guangdong, China",
  phone: "+86 18028993261",
  whatsapp: "+86 18028993261",
  email: "sales@chjremote.com"
};

const PRODUCT_FAMILIES = [
  {
    title: "Rolling-code remotes",
    summary: "Branded handheld programs for gate automation, access control, and premium replacement ranges.",
    chips: ["315 MHz", "433.92 MHz", "868.35 MHz"]
  },
  {
    title: "Receivers and retrofit kits",
    summary: "Receiver boards and controller boxes for upgrades, multi-channel logic, and installed-base extension.",
    chips: ["433 MHz", "AC/DC", "Relay control"]
  },
  {
    title: "Smart access modules",
    summary: "Hybrid WiFi + RF paths that add mobile control without breaking existing remote behavior.",
    chips: ["Tuya", "WiFi 2.4G", "Bridge modules"]
  }
];

const CASE_STUDIES = [
  {
    market: "Italy · Gate distributor",
    title: "Rolling-code replacement program",
    copy: "A cleaner pilot program reduced compatibility friction and gave the distributor a more premium replacement offer"
  },
  {
    market: "United States · Access OEM",
    title: "Hybrid smart retrofit package",
    copy: "A receiver bridge preserved legacy RF use while adding smartphone access for the next product tier"
  }
];

const BLOG_POSTS = [
  {
    id: "rf-architecture-buyers",
    tag: "RF Architecture",
    title: "What buyers actually need from an RF remote supplier",
    copy: "Protocol behavior, range stability, and export readiness matter more than a long generic catalog",
    date: "2026-04-10",
    author: "CHJ Engineering Team",
    content: `
      <h2>The real decision criteria for RF remote sourcing</h2>
      <p>When distributors and OEMs evaluate RF remote suppliers, the surface-level comparison often focuses on catalog size and unit price. The deeper technical and commercial criteria that actually drive successful programs get less attention.</p>

      <h3>Protocol behavior is the first real test</h3>
      <p>A supplier that understands protocol behavior can explain how their rolling-code implementation handles edge cases — interference, replay attacks, receiver compatibility. Generic catalogs rarely address these questions.</p>
      <p>The supplier that can discuss protocol details is usually the one that can support custom frequency allocation, regional certification, and protocol matching for installed-base programs.</p>

      <h3>Range stability under real conditions</h3>
      <p>Testing range in a lab is straightforward. Maintaining range stability across temperature extremes, metal-adjacent mounting, and crowded RF environments requires design choices that generic products often skip.</p>
      <p>Buyers who ask about antenna tuning, RF output power control, and coexistence strategies tend to find suppliers that can deliver consistent field performance.</p>

      <h3>Export readiness as a factory capability</h3>
      <p>Export-ready documentation and shipment planning are separate from product design. A supplier that treats export support as a deliverable — not an afterthought — reduces the friction that delays shipment and complicates compliance.</p>
      <p>The factory that can discuss documentation timelines, regional certification paths, and shipment planning is the one that can support multi-region programs without last-minute scrambles.</p>

      <h3>What to ask in the first conversation</h3>
      <ul>
        <li>How do you handle protocol matching for installed systems?</li>
        <li>What is your approach to antenna tuning and range optimization?</li>
        <li>Can you support documentation and certification for export markets?</li>
        <li>What is the minimum annual volume for a custom program?</li>
      </ul>
      <p>The answers to these questions reveal whether a supplier is positioned for OEM support or catalog resale.</p>
    `
  },
  {
    id: "hybrid-tuya-rf-retrofit",
    tag: "Smart Retrofit",
    title: "Why hybrid Tuya + RF projects reduce retrofit friction",
    copy: "The best retrofit path keeps the installed base useful while opening a modern control layer",
    date: "2026-04-08",
    author: "CHJ Engineering Team",
    content: `
      <h2>The retrofit challenge for installed RF systems</h2>
      <p>Many residential and commercial access systems already use RF remotes. Adding smartphone control without disrupting the existing remote behavior requires a bridge approach — not a wholesale replacement.</p>

      <h3>Hybrid modules preserve installed behavior</h3>
      <p>A hybrid WiFi + RF module can pair with Tuya smart apps while maintaining the existing remote protocol. The installed remote continues to work alongside the new smartphone layer.</p>
      <p>This approach avoids the friction of explaining why existing remotes no longer work, and it preserves the fallback reliability that RF provides when network connectivity is interrupted.</p>

      <h3>The receiver bridge as the integration point</h3>
      <p>A receiver bridge that accepts both RF and WiFi inputs can be installed without changing the gate controller. The bridge receives RF commands from existing remotes and WiFi commands from the Tuya app, passing both to the controller.</p>
      <p>This integration approach reduces the scope of retrofit work and maintains compatibility with the installed base.</p>

      <h3>Installation and setup workflow</h3>
      <p>The installation workflow for a hybrid retrofit package typically includes:</p>
      <ul>
        <li>Mounting the receiver bridge near the controller</li>
        <li>Pairing existing remotes to the bridge</li>
        <li>Connecting the bridge to WiFi and the Tuya app</li>
        <li>Testing both RF and app control paths</li>
      </ul>
      <p>The setup process is simpler than replacing the entire control system.</p>

      <h3>Why hybrid retrofit packages sell better</h3>
      <p>Installers and distributors prefer retrofit packages that preserve installed behavior. A hybrid approach that adds smartphone control without removing RF functionality is easier to explain and easier to support.</p>
      <p>The retrofit market is large, and the hybrid approach is the one that addresses it without forcing a complete system change.</p>
    `
  },
  {
    id: "oem-brief-quotations",
    tag: "Program Planning",
    title: "The OEM brief that gets a serious quotation faster",
    copy: "Application, target region, protocol direction, timing, and annual volume are the minimum useful inputs",
    date: "2026-04-05",
    author: "CHJ Engineering Team",
    content: `
      <h2>The information that accelerates OEM quotation</h2>
      <p>OEM programs require more information than catalog purchases. The brief that includes the right inputs from the start reduces back-and-forth and accelerates quotation.</p>

      <h3>Application as the starting point</h3>
      <p>The application — gate automation, access control, vehicle security — determines the protocol direction, frequency allocation, and environmental requirements.</p>
      <p>A supplier that understands the application can propose protocol choices, frequency options, and enclosure directions that match the use case.</p>

      <h3>Target region as the certification path</h3>
      <p>Different regions have different certification requirements. A brief that specifies the target region allows the supplier to propose documentation paths and certification strategies.</p>
      <p>The supplier that can discuss regional certification is the one that can support export programs without compliance surprises.</p>

      <h3>Protocol direction as the compatibility decision</h3>
      <p>Rolling-code, learning-code, and fixed-code protocols each have different compatibility implications. The brief that specifies protocol direction allows the supplier to propose receiver and remote combinations that match the installed base.</p>
      <p>The protocol decision affects security, range, and compatibility — and it is the decision that determines the rest of the program direction.</p>

      <h3>Timing and volume as the production plan</h3>
      <p>Timing and annual volume determine the production planning. A brief that includes realistic timing and volume expectations allows the supplier to propose sample timelines, pilot batch sizes, and production scheduling.</p>
      <p>The supplier that can discuss timing and volume is the one that can support pilot and production phases without schedule conflicts.</p>

      <h3>The minimum useful brief</h3>
      <p>The brief that includes application, target region, protocol direction, timing, and annual volume is the minimum input that allows a supplier to propose a serious quotation.</p>
      <p>Briefs that omit these inputs tend to generate exploratory responses rather than actionable quotations.</p>
    `
  }
];

const FAQS = [
  {
    q: "Do you support both rolling-code and learning-code projects?",
    a: "Yes — The exact direction depends on the installed system, market expectations, and security requirement"
  },
  {
    q: "Can you support custom branding and enclosure direction?",
    a: "Yes — OEM programs can include shell direction, finish, logo treatment, and packaging alignment"
  },
  {
    q: "Can you prepare projects for overseas distribution?",
    a: "Yes — Export-oriented documentation support and shipment planning are part of the manufacturing conversation"
  }
];

const PAGE_META = {
  home: {
    title: "CHJ Remotes | RF Control Manufacturing for Global Access Brands",
    description: "International OEM and ODM manufacturer for RF remotes, receivers, and smart retrofit modules"
  },
  about: {
    title: "About CHJ Remotes | Factory Capability",
    description: "Factory capability, RF tuning workflow, and export-ready OEM manufacturing"
  },
  products: {
    title: "Products | CHJ Remotes",
    description: "Rolling-code remotes, receivers, retrofit kits, and smart access module programs"
  },
  blog: {
    title: "Insights | CHJ Remotes",
    description: "Technical and commercial notes for RF access and control programs"
  },
  contact: {
    title: "Contact CHJ Remotes | Start an OEM Conversation",
    description: "Start an OEM conversation with CHJ Remotes about RF control programs"
  }
};

const pageFromPathname = (pathname) => {
  const cleaned = (pathname || "/").replace(/^\/+|\/+$/g, "");
  const segment = cleaned.split("/")[0];
  if (!segment || segment === "home") return "home";
  return KNOWN_PAGES.includes(segment) ? segment : "home";
};

function safeScrollTop() {
  if (typeof window === "undefined") return;
  if (window.navigator?.userAgent?.includes("jsdom")) return;
  try {
    window.scrollTo(0, 0);
  } catch {}
}

function Button({ children, variant = "primary", className = "", ...props }) {
  const styles = {
    primary: "bg-gradient-to-r from-[var(--brand-accent)] to-[var(--brand-accent-hover)] text-white shadow-lg hover:shadow-xl hover:-translate-y-1 active:translate-y-0 active:shadow-md",
    secondary: "border-2 border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 hover:border-white/40 active:bg-white/15",
    outline: "border-2 border-[var(--brand-navy)] bg-transparent text-[var(--brand-navy)] hover:bg-[var(--brand-navy)] hover:text-white active:bg-[var(--brand-navy)]/90"
  };

  return (
    <button
      className={`inline-flex items-center justify-center gap-2.5 rounded-xl px-7 py-3.5 text-sm font-semibold transition-all duration-200 ease-out ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

function NavButton({ active, label, mobile = false, onClick }) {
  const classes = mobile
    ? "flex w-full items-center justify-between border-b border-white/10 py-4 text-left text-lg font-semibold text-white"
    : `text-sm font-semibold transition-colors ${active ? "text-[var(--brand-navy)]" : "text-slate-600 hover:text-[var(--brand-navy)]"}`;

  return (
    <button className={classes} onClick={onClick}>
      <span>{label}</span>
      {mobile && <ArrowRight className="h-4 w-4 text-white/70" />}
    </button>
  );
}

function SectionIntro({ eyebrow, title, copy, light = false, centered = false }) {
  return (
    <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}>
      <div className={`font-mono-brand text-xs uppercase tracking-[0.28em] ${light ? "text-white/55" : "text-[var(--brand-muted)]"}`}>{eyebrow}</div>
      <h2 className={`mt-4 text-3xl font-extrabold tracking-tight md:text-5xl ${light ? "text-white" : "text-[var(--brand-ink)]"}`}>{title}</h2>
      <p className={`mt-5 text-base leading-8 ${light ? "text-slate-300" : "text-slate-600"}`}>{copy}</p>
    </div>
  );
}

export default function App() {
  const [activePage, setActivePage] = useState(() => pageFromPathname(window.location.pathname));
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const meta = PAGE_META[activePage] || PAGE_META.home;
    document.title = meta.title;
    let description = document.querySelector('meta[name="description"]');
    if (!description) {
      description = document.createElement("meta");
      description.setAttribute("name", "description");
      document.head.appendChild(description);
    }
    description.setAttribute("content", meta.description);
  }, [activePage]);

  const navigate = (page) => {
    setActivePage(page);
    setIsMenuOpen(false);
    safeScrollTop();
  };

  const renderHome = () => (
    <>
      <section className="hero-shell relative overflow-hidden text-white">
        <div className="hero-mesh absolute inset-0" />
        <div className="container mx-auto grid gap-12 px-6 pb-16 pt-10 md:pb-20 md:pt-14 lg:grid-cols-[1.06fr_0.94fr]">
          <div className="relative z-10 max-w-3xl animate-slide-up">
            <div className="badge-accent mb-6">Global OEM / ODM manufacturer</div>
            <h1 className="text-responsive-2xl mt-6 font-extrabold tracking-tight">RF Control Manufacturing for Global Access Brands</h1>
            <p className="mt-8 max-w-2xl text-responsive-base leading-relaxed text-slate-300">
              CHJ Remotes builds rolling-code remotes, receivers, retrofit control kits, and Tuya-ready smart modules for distributors and OEM programs that need a stronger factory story.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button onClick={() => navigate("contact")}>
                Request OEM Quote
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="secondary" onClick={() => window.open(CATALOG_URL, "_blank")}>
                <Download className="h-4 w-4" />
                Download Catalog PDF
              </Button>
            </div>
            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              {[
                ["20+", "Years in RF manufacturing"],
                ["50+", "Countries served"],
                ["7 days", "Pilot sample target"]
              ].map(([value, label]) => (
                <div key={label} className="rounded-2xl border border-white/30 bg-white/15 backdrop-blur-md p-6 transition-smooth hover:scale-[1.02] hover:bg-white/20 hover:border-white/40">
                  <div className="text-amber-400 text-4xl font-extrabold md:text-5xl">{value}</div>
                  <div className="mt-3 text-white text-sm font-medium">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-panel relative overflow-hidden rounded-3xl border border-white/10 bg-white/6 p-7 backdrop-blur-xl md:p-9">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(200,137,71,0.22),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_30%)]" />
            <div className="relative z-10">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.26em] text-white/70">
                <span className="font-mono-brand">Factory floor preview</span>
                <span className="font-mono-brand">90 sec reel</span>
              </div>
              <div className="mt-6 overflow-hidden rounded-3xl border border-white/10 bg-black/30 shadow-hero-video">
                <div className="relative">
                  <video
                    aria-label="Factory floor video"
                    className="h-[380px] w-full object-cover md:h-[460px] lg:h-[540px]"
                    src={HERO_VIDEO_URL}
                    poster={`${import.meta.env.BASE_URL}videos/factory-hero-poster.jpg`}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    onError={(e) => {
                      console.warn('Video load failed');
                      e.target.style.display = 'none';
                    }}
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent px-6 pb-6 pt-16">
                    <div className="font-mono-brand text-[11px] uppercase tracking-[0.24em] text-white/75">
                      Dongguan production line
                    </div>
                    <p className="mt-3 max-w-md text-sm leading-7 text-slate-200">
                      A short look at factory assembly, RF tuning, and export packing inside the same production flow
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {["Assembly", "RF testing", "Packaging"].map((label) => (
                  <span
                    key={label}
                    className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 font-mono-brand text-[11px] uppercase tracking-[0.18em] text-white/70"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="container mx-auto px-6">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <SectionIntro
              eyebrow="Factory message"
              title="The site now leads with identity, capability, and control"
              copy="The original page spread too many equal-weight blocks across the first impression. This version compresses the message into a more international manufacturing story"
            />
            <div className="grid gap-4 md:grid-cols-3">
              {[
                [ShieldCheck, "Factory-direct B2B", "Engineering, production, and export support stay in one team"],
                [Cpu, "RF tuning inside the project", "Protocol behavior and antenna performance are treated as deliverables"],
                [Truck, "Export-ready handoff", "Document support and shipment planning stay close to the product program"]
              ].map(([IconComp, title, copy]) => (
                <div key={title} className="surface-panel p-6">
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-[var(--brand-soft)] text-[var(--brand-navy)]">
                    <IconComp className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-bold text-[var(--brand-ink)]">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--brand-soft)] py-24">
        <div className="container mx-auto px-6">
          <SectionIntro
            eyebrow="Product families"
            title="A smaller set of clearer families makes the catalog feel stronger"
            copy="Instead of opening with a generic product wall, the homepage frames the product offering around a few strong OEM families"
            centered={true}
          />
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {PRODUCT_FAMILIES.map((item, index) => (
              <article key={item.title} className="surface-panel p-8">
                <div className="font-mono-brand text-xs uppercase tracking-[0.28em] text-[var(--brand-muted)]">Family 0{index + 1}</div>
                <h3 className="mt-4 text-2xl font-bold text-[var(--brand-ink)]">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-600">{item.summary}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {item.chips.map((chip) => (
                    <span key={chip} className="rounded-full border border-[var(--brand-line)] bg-[var(--brand-soft)] px-3 py-1 text-xs font-semibold text-[var(--brand-navy)]">
                      {chip}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--brand-panel)] py-24 text-white">
        <div className="container mx-auto px-6">
          <SectionIntro
            eyebrow="Delivery flow"
            title="One controlled path from technical brief to shipment"
            copy="The strongest B2B factory sites explain how work moves. This section replaces filler with a simple, controlled delivery path"
            light={true}
          />
          <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {[
              ["01", Settings, "RF and PCB definition"],
              ["02", Zap, "Sample and firmware work"],
              ["03", Users, "Pilot validation"],
              ["04", Truck, "Production and shipment"]
            ].map(([step, IconComp, title]) => (
              <div key={step} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                <div className="flex items-center justify-between">
                  <span className="font-mono-brand text-xs uppercase tracking-[0.28em] text-white/45">{step}</span>
                  <IconComp className="h-5 w-5 text-[var(--brand-accent)]" />
                </div>
                <h3 className="mt-6 text-xl font-bold">{title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="container mx-auto grid gap-10 px-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionIntro
              eyebrow="Commercial proof"
              title="Case structure matters more than a long stack of unlabeled claims"
              copy="The homepage proof area is smaller, but the framing is stronger and easier to scan"
            />
            <div className="mt-10 grid gap-6">
              {CASE_STUDIES.map((item) => (
                <article key={item.title} className="surface-panel p-7">
                  <div className="font-mono-brand text-xs uppercase tracking-[0.24em] text-[var(--brand-muted)]">{item.market}</div>
                  <h3 className="mt-4 text-2xl font-bold text-[var(--brand-ink)]">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-600">{item.copy}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="surface-panel bg-[var(--brand-soft)] p-8">
            <div className="font-mono-brand text-xs uppercase tracking-[0.24em] text-[var(--brand-muted)]">Partner voice</div>
            <div className="mt-8 space-y-6">
              {[
                "The project felt like working with an engineering team, not chasing a trading company through a checklist.",
                "CHJ stayed inside the protocol issue until the batch was stable."
              ].map((quote, index) => (
                <div key={quote} className="rounded-2xl border border-[var(--brand-line)] bg-white p-6">
                  <div className="mb-4 flex gap-1 text-[var(--brand-accent)]">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <Star key={`${index}-${starIndex}`} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-base leading-8 text-slate-700">“{quote}”</p>
                </div>
              ))}
            </div>
            <Button className="mt-8" onClick={() => navigate("contact")}>
              Start the conversation
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </>
  );

  const renderAbout = () => (
    <section className="bg-white pb-24">
      <div className="hero-shell relative overflow-hidden px-6 py-20 text-white">
        <div className="hero-mesh absolute inset-0" />
        <div className="container mx-auto relative z-10 max-w-3xl">
          <div className="font-mono-brand text-xs uppercase tracking-[0.3em] text-white/55">About the factory</div>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight md:text-6xl">{BRAND_NAME} inside {COMPANY_NAME}</h1>
          <p className="mt-6 text-lg leading-8 text-slate-300">The revised About page now reads like a manufacturing brand page instead of a generic company block list.</p>
        </div>
      </div>
      <div className="container mx-auto grid gap-6 px-6 pt-16 md:grid-cols-2 xl:grid-cols-4">
        {["Dongguan manufacturing base", "RF-first engineering mindset", "OEM brand discipline", "Export documentation support"].map((item, index) => (
          <div key={item} className="surface-panel p-7">
            <div className="font-mono-brand text-xs uppercase tracking-[0.26em] text-[var(--brand-muted)]">0{index + 1}</div>
            <h3 className="mt-4 text-xl font-bold text-[var(--brand-ink)]">{item}</h3>
          </div>
        ))}
      </div>
    </section>
  );

  const renderProducts = () => (
    <section className="bg-[var(--brand-soft)] pb-24">
      <div className="bg-white px-6 py-20">
        <div className="container mx-auto">
          <SectionIntro
            eyebrow="Product direction"
            title="Product families built for OEM programs, not retail browsing"
            copy="The products page stays useful, but the layout now favors family thinking over cluttered item overload"
          />
        </div>
      </div>
      <div className="container mx-auto grid gap-6 px-6 pt-16">
        {PRODUCT_FAMILIES.map((item) => (
          <article key={item.title} className="surface-panel grid gap-6 p-8 lg:grid-cols-[0.8fr_1.2fr]">
            <h2 className="text-3xl font-bold text-[var(--brand-ink)]">{item.title}</h2>
            <div>
              <p className="text-base leading-8 text-slate-600">{item.summary}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {item.chips.map((chip) => (
                  <span key={chip} className="rounded-full border border-[var(--brand-line)] bg-[var(--brand-soft)] px-3 py-1 text-xs font-semibold text-[var(--brand-navy)]">
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );

  const renderBlog = () => {
    // If a post is selected, show the article detail
    if (selectedPost) {
      const post = BLOG_POSTS.find(p => p.id === selectedPost);
      if (!post) return null;

      return (
        <section className="bg-white pb-24">
          <div className="hero-shell relative overflow-hidden px-6 py-16 text-white">
            <div className="hero-mesh absolute inset-0" />
            <div className="container mx-auto relative z-10 max-w-4xl">
              <button
                onClick={() => setSelectedPost(null)}
                className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-white/70 hover:text-white transition-colors"
              >
                <ArrowRight className="h-4 w-4 rotate-180" />
                Back to all articles
              </button>
              <div className="badge-accent mb-6">{post.tag}</div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">{post.title}</h1>
              <div className="mt-6 flex items-center gap-4 text-sm text-white/60">
                <span>{post.author}</span>
                <span>·</span>
                <span>{post.date}</span>
              </div>
            </div>
          </div>
          <div className="container mx-auto max-w-4xl px-6 pt-12">
            <article className="prose prose-lg max-w-none">
              <div
                className="text-slate-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </article>
            <div className="mt-12 pt-8 border-t border-slate-200">
              <button
                onClick={() => setSelectedPost(null)}
                className="btn-secondary"
              >
                <ArrowRight className="h-4 w-4 rotate-180" />
                Back to articles
              </button>
            </div>
          </div>
        </section>
      );
    }

    // Otherwise, show the blog listing
    return (
      <section className="bg-white pb-24">
        <div className="bg-[var(--brand-soft)] px-6 py-20">
          <div className="container mx-auto">
            <SectionIntro
              eyebrow="Editorial"
              title="Technical and commercial notes for RF access programs"
              copy="The blog is reframed as a smaller editorial surface with more intention and less filler"
            />
          </div>
        </div>
        <div className="container mx-auto grid gap-6 px-6 pt-16 lg:grid-cols-3">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.id}
              className="card-featured p-8 cursor-pointer"
              onClick={() => setSelectedPost(post.id)}
            >
              <div className="badge-accent mb-4">{post.tag}</div>
              <h2 className="mt-4 text-2xl font-bold text-[var(--brand-ink)] leading-tight">{post.title}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">{post.copy}</p>
              <div className="mt-6 flex items-center gap-2 text-xs text-[var(--brand-muted)]">
                <span>{post.author}</span>
                <span>·</span>
                <span>{post.date}</span>
              </div>
              <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand-accent)] group-hover:text-[var(--brand-accent-hover)] transition-colors">
                Read article
                <ArrowRight className="h-4 w-4" />
              </div>
            </article>
          ))}
        </div>
      </section>
    );
  };

  const renderContact = () => (
    <section className="bg-white pb-24">
      <div className="hero-shell relative overflow-hidden px-6 py-20 text-white">
        <div className="hero-mesh absolute inset-0" />
        <div className="container mx-auto relative z-10 max-w-3xl">
          <div className="font-mono-brand text-xs uppercase tracking-[0.3em] text-white/55">OEM inquiry</div>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight md:text-6xl">Start an OEM Conversation</h1>
          <p className="mt-6 text-lg leading-8 text-slate-300">Share the application, target market, protocol direction, and timing. The contact page now feels like the natural end point of the site.</p>
        </div>
      </div>
      <div className="container mx-auto grid gap-8 px-6 pt-16 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="surface-panel bg-[var(--brand-panel)] p-8 text-white">
          <div className="space-y-6">
            {[
              [Mail, "Email", CONTACT_INFO.email],
              [Phone, "Phone / WhatsApp", CONTACT_INFO.phone],
              [MapPin, "Factory address", CONTACT_INFO.address]
            ].map(([IconComp, label, value]) => (
              <div key={label} className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10">
                  <IconComp className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold uppercase tracking-[0.18em] text-white/55">{label}</div>
                  <div className="mt-1 text-base leading-7 text-slate-300">{value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="surface-panel p-8 md:p-10">
          <form
            className="space-y-5"
            onSubmit={(event) => {
              event.preventDefault();
              alert("Inquiry simulated. Connect this form to Formspree, EmailJS, or your backend for production.");
            }}
          >
            <div className="grid gap-5 md:grid-cols-2">
              <input className="h-12 md:h-14 rounded-2xl border border-[var(--brand-line)] bg-[var(--brand-soft)] px-4 outline-none focus:border-[var(--brand-accent)] focus:ring-2 focus:ring-[var(--brand-accent)] focus:ring-offset-2 transition-all duration-200 placeholder:text-[var(--brand-muted)] placeholder:text-sm" placeholder="Company" required />
              <input className="h-12 md:h-14 rounded-2xl border border-[var(--brand-line)] bg-[var(--brand-soft)] px-4 outline-none focus:border-[var(--brand-accent)] focus:ring-2 focus:ring-[var(--brand-accent)] focus:ring-offset-2 transition-all duration-200 placeholder:text-[var(--brand-muted)] placeholder:text-sm" placeholder="Business email" type="email" required />
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <input className="h-12 md:h-14 rounded-2xl border border-[var(--brand-line)] bg-[var(--brand-soft)] px-4 outline-none focus:border-[var(--brand-accent)] focus:ring-2 focus:ring-[var(--brand-accent)] focus:ring-offset-2 transition-all duration-200 placeholder:text-[var(--brand-muted)] placeholder:text-sm" placeholder="Application" />
              <input className="h-12 md:h-14 rounded-2xl border border-[var(--brand-line)] bg-[var(--brand-soft)] px-4 outline-none focus:border-[var(--brand-accent)] focus:ring-2 focus:ring-[var(--brand-accent)] focus:ring-offset-2 transition-all duration-200 placeholder:text-[var(--brand-muted)] placeholder:text-sm" placeholder="Target market" />
            </div>
            <textarea
              className="min-h-[180px] w-full rounded-2xl border border-[var(--brand-line)] bg-[var(--brand-soft)] px-4 py-4 outline-none focus:border-[var(--brand-accent)] focus:ring-2 focus:ring-[var(--brand-accent)] focus:ring-offset-2 transition-all duration-200 placeholder:text-[var(--brand-muted)] placeholder:text-sm"
              placeholder="Share protocol, frequency, timing, and annual volume"
              required
            />
            <Button type="submit">
              Send project brief
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-[var(--brand-bg)] text-[var(--brand-ink)]">
      <header className={`sticky top-0 z-50 border-b transition-all duration-300 ${scrolled ? "border-[var(--brand-line)] bg-white/90 shadow-header backdrop-blur-xl" : "border-transparent bg-white/78 backdrop-blur-md"}`}>
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between py-4">
            <button className="flex items-center gap-4 text-left" onClick={() => navigate("home")}>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--brand-line)] bg-white p-2">
                <img src={Logo} alt="CHJ logo" className="h-full w-full object-contain" />
              </div>
              <div>
                <div className="text-xl font-extrabold tracking-tight text-[var(--brand-navy)]">{BRAND_NAME}</div>
                <div className="font-mono-brand text-[11px] uppercase tracking-[0.22em] text-[var(--brand-muted)]">B2B RF manufacturing</div>
              </div>
            </button>

            <nav className="hidden items-center gap-8 lg:flex">
              {KNOWN_PAGES.map((page) => (
                <NavButton key={page} active={activePage === page} label={page.charAt(0).toUpperCase() + page.slice(1)} onClick={() => navigate(page)} />
              ))}
              <Button className="px-5 py-2.5" onClick={() => navigate("contact")}>
                Contact Sales
              </Button>
            </nav>

            <button className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--brand-line)] text-[var(--brand-navy)] lg:hidden" onClick={() => setIsMenuOpen((value) => !value)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[rgba(7,17,31,0.96)] px-6 pb-10 pt-24 lg:hidden">
          <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            {KNOWN_PAGES.map((page) => (
              <NavButton key={page} mobile label={page.charAt(0).toUpperCase() + page.slice(1)} onClick={() => navigate(page)} />
            ))}
            <Button className="mt-6 w-full" onClick={() => navigate("contact")}>
              Contact Sales
            </Button>
          </div>
        </div>
      )}

      <main>
        {activePage === "home" && renderHome()}
        {activePage === "about" && renderAbout()}
        {activePage === "products" && renderProducts()}
        {activePage === "blog" && renderBlog()}
        {activePage === "contact" && renderContact()}
      </main>

      <footer className="bg-[var(--brand-panel)] px-6 pb-10 pt-20 text-slate-300">
        <div className="container mx-auto">
          <div className="grid gap-12 border-b border-white/10 pb-14 lg:grid-cols-[1.3fr_0.8fr_0.8fr_1fr]">
            <div>
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-2">
                  <img src={Logo} alt="CHJ footer logo" className="h-full w-full object-contain" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{BRAND_NAME}</div>
                  <div className="font-mono-brand text-[11px] uppercase tracking-[0.22em] text-white/45">International RF OEM partner</div>
                </div>
              </div>
              <p className="mt-6 max-w-xl text-sm leading-7 text-slate-400">{COMPANY_NAME} is presented here as a more disciplined international manufacturing brand for RF control programs.</p>
            </div>

            <div>
              <div className="font-mono-brand text-xs uppercase tracking-[0.24em] text-white/45">Site</div>
              <div className="mt-5 space-y-3 text-sm">
                {KNOWN_PAGES.map((page) => (
                  <button key={page} className="block text-left text-slate-300 transition-colors hover:text-white" onClick={() => navigate(page)}>
                    {page.charAt(0).toUpperCase() + page.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="font-mono-brand text-xs uppercase tracking-[0.24em] text-white/45">Programs</div>
              <div className="mt-5 space-y-3 text-sm text-slate-300">
                <div>Rolling-code remotes</div>
                <div>Receivers and retrofit kits</div>
                <div>Smart access modules</div>
              </div>
            </div>

            <div>
              <div className="font-mono-brand text-xs uppercase tracking-[0.24em] text-white/45">Contact</div>
              <div className="mt-5 space-y-4 text-sm text-slate-300">
                <div className="flex items-start gap-3"><Mail className="mt-0.5 h-4 w-4 text-[var(--brand-accent)]" /><span>{CONTACT_INFO.email}</span></div>
                <div className="flex items-start gap-3"><Phone className="mt-0.5 h-4 w-4 text-[var(--brand-accent)]" /><span>{CONTACT_INFO.phone}</span></div>
                <div className="flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4 text-[var(--brand-accent)]" /><span>{CONTACT_INFO.address}</span></div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 pt-8 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
            <div>&copy; 2026 CHJ Remotes. All rights reserved.</div>
            <div className="flex items-center gap-4">
              <a href="/robots.txt" className="transition-colors hover:text-white">Robots</a>
              <a href="/sitemap.xml" className="transition-colors hover:text-white">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
