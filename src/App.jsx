// Updated: 2026-04-15 15:30 UTC - Force deployment
import React, { useEffect, useRef, useState } from "react";
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
  ArrowRight,
  CheckCircle,
  Settings,
  Truck,
  Clock,
  Users,
  Layers,
  MessageSquare,
  FileText
} from "lucide-react";
import Logo from "../logo/LOGO.png";

const COMPANY_NAME = "Dongguan Chuangjiang Electronics Co., Ltd.";
const BRAND_NAME = "CHJ Remotes";
const KNOWN_PAGES = ["home", "about", "products", "blog", "contact"];

const CONTACT_INFO = {
  address: "8th Floor, Building 1, Huawei Kegu Industrial Park, Dalingshan, Dongguan, Guangdong, China",
  phone: "+86 18028993261",
  whatsapp: "+86 18028993261",
  email: "sales@chjremote.com"
};

const WHATSAPP_URL = "https://wa.me/8618028993261";
const EMAIL_BRIEF_URL = `mailto:${CONTACT_INFO.email}?subject=${encodeURIComponent("OEM project brief")}`;

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

const PROGRAM_CHECKS = [
  ["Installed-base fit", "Protocol, receiver, and pairing constraints"],
  ["RF environment", "Antenna, range, interference, and enclosure conditions"],
  ["Market requirements", "Documentation and compliance questions for the target region"],
  ["Program scope", "Sample direction, annual volume, and customization needs"]
];

const BLOG_POSTS = [
  {
    id: "receiver-sensitivity-rf-range",
    tag: "RF Engineering",
    title: "Your Remote Controller Might Be Hard of Hearing",
    copy: "Why receiver sensitivity is the real key to RF range - understanding the negative dBm numbers that determine remote control performance",
    date: "2026-04-16",
    author: "CHJ Engineering Team",
    content: `
      <h2>How to read receiver sensitivity without guessing range</h2>

      <p>Receiver sensitivity is the lowest input level at which a receiver can still meet a stated decoding condition. It is commonly expressed in dBm, but the number is meaningful only when the modulation, data rate, bandwidth, error criterion, temperature, and test setup are also known.</p>

      <h3>dBm is a level; dB is a difference</h3>

      <p>A sensitivity of <strong>-105 dBm</strong> describes an absolute input level. Compared with <strong>-90 dBm</strong>, it is 15 dB lower. Under comparable test conditions, a receiver specified at -105 dBm can detect about <strong>31.6 times lower power</strong> than one specified at -90 dBm.</p>

      <p>That does not mean the finished product will automatically reach a particular distance. Sensitivity is one term in the link budget, not a range guarantee.</p>

      <h3>Build the link budget before discussing distance</h3>

      <p>A useful range estimate starts with transmit power, transmitter and receiver antenna gain, cable and enclosure losses, path loss, interference, fade margin, and the receiver level required for the target packet or bit error rate.</p>

      <p>In an ideal free-space model, doubling distance adds about 6 dB of path loss. Real gate, access, and industrial installations can behave very differently because metal, walls, antenna orientation, ground reflections, nearby transmitters, and enclosure placement change the available margin.</p>

      <h3>Ask for the test conditions</h3>

      <ul>
        <li>Operating frequency and channel bandwidth</li>
        <li>Modulation, coding, and data rate</li>
        <li>BER or PER criterion used for the sensitivity result</li>
        <li>Supply voltage and temperature range</li>
        <li>Antenna and enclosure configuration</li>
        <li>Open-field and installed-environment test methods</li>
      </ul>

      <p>Compare receiver numbers only when these conditions are close enough to make the comparison valid. Then validate the complete remote and receiver pair in the target installation with a documented margin.</p>
    `
  },
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
  },
  {
    id: "gate-remote-control-oem-supplier",
    tag: "Gate Remote Control",
    title: "How to choose a gate remote control supplier for OEM programs",
    copy: "Frequency support, code behavior, range stability, receiver compatibility, and export readiness should be checked before a buyer compares unit price",
    date: "2026-06-02",
    author: "CHJ Engineering Team",
    content: `
      <h2>Gate remote control sourcing starts before the price sheet</h2>
      <p>For many gate automation distributors and access-control brands, a gate remote control looks like a small product. In reality, it is part of a wider RF system: transmitter, receiver, antenna design, code logic, installation environment, and regional compliance all decide whether the product works reliably in the field.</p>
      <p>That is why the strongest OEM sourcing conversations should begin with technical fit, not only with shell style or unit price. A low-cost remote that cannot match the installed receiver base, loses range near metal gates, or lacks export-ready documentation will cost more after the first shipment.</p>

      <h3>Start with frequency and regional requirements</h3>
      <p>The first filter is frequency. Common gate remote control programs often involve 315 MHz, 433.92 MHz, or 868 MHz ranges, but the right choice depends on the target market and existing receiver ecosystem. A supplier should be able to discuss the working frequency, tolerance, antenna direction, and certification expectations for the region where the product will be sold.</p>
      <p>If the program is for replacement remotes, the question becomes even more specific: what frequency does the installed base use, and how strict is the receiver about signal timing and modulation behavior?</p>

      <h3>Clarify code behavior before sampling</h3>
      <p>Gate remotes may use fixed-code, learning-code, or rolling-code behavior. Those terms are not interchangeable. Rolling-code projects usually need tighter coordination between the remote, receiver, and security expectations. Learning-code projects may be simpler to deploy, but compatibility still depends on the receiver design.</p>
      <p>A serious supplier should ask about the receiver model, protocol direction, button count, channel behavior, and pairing workflow before promising compatibility. If the supplier only asks for quantity and logo placement, the technical risk has not been addressed.</p>

      <h3>Range stability matters more than a laboratory range claim</h3>
      <p>Gate sites are rarely clean RF environments. Metal gates, underground motors, concrete walls, parked vehicles, and neighboring wireless devices can all reduce usable range. A gate remote control supplier should explain how they handle antenna tuning, PCB layout, output power control, and receiver matching.</p>
      <p>The useful question is not only "how far can it work?" The better question is "how much signal margin remains at the required distance in the real installation environment?" That margin is what keeps the remote reliable after weather, battery level, and antenna orientation change.</p>

      <h3>Check receiver compatibility and retrofit path</h3>
      <p>Many OEM and distributor programs are built around an installed base. In that case, the remote is only half of the product story. The receiver board, relay output, pairing capacity, and enclosure direction may decide whether the program can scale.</p>
      <p>For retrofit programs, hybrid RF plus smart-control modules can also reduce friction. Existing handheld remotes continue to work, while a WiFi or app layer adds modern access control without forcing the installer to replace the whole system.</p>

      <h3>Use the first brief to test the supplier</h3>
      <p>A practical gate remote control brief should include the application, target market, frequency, code direction, receiver information, button count, enclosure preference, branding requirement, sample timing, and annual volume. With those inputs, a factory can respond with a real technical and commercial direction instead of a generic quotation.</p>
      <p>The best supplier is not always the one with the longest catalog. It is the one that can connect RF behavior, installed compatibility, manufacturing control, and export support into one repeatable OEM program.</p>
    `
  }
];

const PUBLISHED_BLOG_POSTS = BLOG_POSTS.filter(({ id }) => id === "receiver-sensitivity-rf-range");

const FAQS = [
  {
    q: "Do you support both rolling-code and learning-code projects?",
    a: "Discuss the installed system, target market, and security requirement with the team before selecting a code direction."
  },
  {
    q: "Can you support custom branding and enclosure direction?",
    a: "Share the shell, finish, logo, and packaging requirements that need to be confirmed for the program."
  },
  {
    q: "Can you prepare projects for overseas distribution?",
    a: "Name the target countries early so documentation, testing, and shipment responsibilities can be confirmed before sampling."
  }
];

const PAGE_META = {
  home: {
    title: "CHJ Remotes | RF Remotes, Receivers, and Control Modules",
    description: "RF remotes, receivers, retrofit kits, and smart access modules for OEM project discussions.",
    path: "/"
  },
  about: {
    title: "About CHJ Remotes | RF Control Program Support",
    description: "Company contact details and the questions to confirm before starting an RF control project.",
    path: "/about/"
  },
  products: {
    title: "Products | CHJ Remotes",
    description: "Explore rolling-code remotes, receivers, retrofit kits, and smart access module directions.",
    path: "/products/"
  },
  blog: {
    title: "Insights | CHJ Remotes",
    description: "Technical and commercial notes for evaluating RF access and control projects.",
    path: "/blog/"
  },
  contact: {
    title: "Contact CHJ Remotes | Share an RF Project Brief",
    description: "Contact CHJ Remotes by email, phone, or WhatsApp to discuss an RF control project.",
    path: "/contact/"
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

const shouldHandleClientNavigation = (event) =>
  event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;

function Button({ children, variant = "primary", className = "", href, onClick, type = "button", ...props }) {
  const styles = {
    primary: "bg-gradient-to-r from-[var(--brand-accent)] to-[var(--brand-accent-hover)] text-white shadow-lg hover:shadow-xl hover:-translate-y-1 active:translate-y-0 active:shadow-md",
    secondary: "border-2 border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 hover:border-white/40 active:bg-white/15",
    outline: "border-2 border-[var(--brand-navy)] bg-transparent text-[var(--brand-navy)] hover:bg-[var(--brand-navy)] hover:text-white active:bg-[var(--brand-navy)]/90"
  };

  const classes = `inline-flex items-center justify-center gap-2.5 rounded-xl px-7 py-3.5 text-sm font-semibold transition-all duration-200 ease-out ${styles[variant]} ${className}`;

  if (href) {
    return (
      <a
        className={classes}
        href={href}
        onClick={(event) => {
          if (onClick && shouldHandleClientNavigation(event)) {
            event.preventDefault();
            onClick();
          }
        }}
        {...props}
      >
        {children}
      </a>
    );
  }

  return <button type={type} className={classes} onClick={onClick} {...props}>{children}</button>;
}

function NavButton({ active, label, href, mobile = false, onClick }) {
  const classes = mobile
    ? "flex w-full items-center justify-between border-b border-white/10 py-4 text-left text-lg font-semibold text-white"
    : `text-sm font-semibold transition-colors ${active ? "text-[var(--brand-navy)]" : "text-slate-600 hover:text-[var(--brand-navy)]"}`;

  return (
    <a
      className={classes}
      href={href}
      onClick={(event) => {
        if (onClick && shouldHandleClientNavigation(event)) {
          event.preventDefault();
          onClick();
        }
      }}
      aria-current={active ? "page" : undefined}
    >
      <span>{label}</span>
      {mobile && <ArrowRight className="h-4 w-4 text-white/70" />}
    </a>
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
  const menuButtonRef = useRef(null);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onPopState = () => {
      setActivePage(pageFromPathname(window.location.pathname));
      setSelectedPost(null);
      setIsMenuOpen(false);
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
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

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    const canonicalUrl = `https://www.chjremote.com${meta.path}`;
    canonical.setAttribute("href", canonicalUrl);

    const setOpenGraphMeta = (property, content) => {
      let element = document.querySelector(`meta[property="${property}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute("property", property);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };
    setOpenGraphMeta("og:title", meta.title);
    setOpenGraphMeta("og:description", meta.description);
    setOpenGraphMeta("og:url", canonicalUrl);
  }, [activePage]);

  useEffect(() => {
    if (!isMenuOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    mobileMenuRef.current?.querySelector("a")?.focus();
    const onKeyDown = (event) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      menuButtonRef.current?.focus();
    };
  }, [isMenuOpen]);

  const navigate = (page) => {
    const nextPath = page === "home" ? "/" : `/${page}/`;
    if (window.location.pathname !== nextPath) {
      window.history.pushState({}, "", nextPath);
    }
    setActivePage(page);
    setIsMenuOpen(false);
    setSelectedPost(null);
    safeScrollTop();
  };

  const renderHome = () => (
    <>
      <section className="hero-shell relative overflow-hidden text-white">
        <div className="hero-mesh absolute inset-0" />
        <div className="container mx-auto grid gap-12 px-6 pb-16 pt-10 md:pb-20 md:pt-14 lg:grid-cols-[1.06fr_0.94fr]">
          <div className="relative z-10 max-w-3xl animate-slide-up">
            <div className="badge-accent mb-6">CHJ Remotes · RF control programs</div>
            <h1 className="text-responsive-2xl mt-6 font-extrabold tracking-tight">RF Remotes and Receivers for OEM Programs</h1>
            <p className="mt-8 max-w-2xl text-responsive-base leading-relaxed text-slate-300">
              Discuss rolling-code remotes, receivers, retrofit kits, and smart access modules with a clear application brief.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                WhatsApp Sales
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="secondary" href={EMAIL_BRIEF_URL}>
                <Mail className="h-4 w-4" />
                Email Project Brief
              </Button>
            </div>
          </div>

          <div className="hero-panel relative overflow-hidden rounded-3xl border border-white/10 bg-white/6 p-7 backdrop-blur-xl md:p-9">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(200,137,71,0.22),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_30%)]" />
            <div className="relative z-10">
              <div className="font-mono-brand text-xs uppercase tracking-[0.26em] text-white/70">A useful first message</div>
              <h2 className="mt-5 text-3xl font-bold tracking-tight">Four inputs move the conversation forward</h2>
              <div className="mt-8 divide-y divide-white/10 border-y border-white/10">
                {PROGRAM_CHECKS.map(([label, detail], index) => (
                  <div key={label} className="grid grid-cols-[2rem_1fr] gap-4 py-5">
                    <span className="font-mono-brand text-sm text-[var(--brand-accent)]">0{index + 1}</span>
                    <div>
                      <div className="font-semibold text-white">{label}</div>
                      <p className="mt-1 text-sm leading-6 text-slate-300">{detail}</p>
                    </div>
                  </div>
                ))}
              </div>
              <a className="mt-6 inline-block text-sm text-white/75 underline decoration-white/30 underline-offset-4 hover:text-white" href={`mailto:${CONTACT_INFO.email}`}>{CONTACT_INFO.email}</a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="container mx-auto px-6">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <SectionIntro
              eyebrow="Before sampling"
              title="Confirm the questions that decide product fit"
              copy="Start with the installed system, RF environment, target market, and program scope. Treat each answer as something to verify, not assume."
            />
            <div className="grid gap-4 md:grid-cols-3">
              {[
                [ShieldCheck, "Product fit", "Confirm protocol, frequency, pairing behavior, and installed-system constraints"],
                [Cpu, "Test plan", "Define antenna, range, interference, enclosure, and acceptance conditions"],
                [FileText, "Market documentation", "Agree which tests and documents are required for the target countries"]
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
            title="Start with the control path your program needs"
            copy="Choose a remote, receiver, or hybrid module direction, then confirm the protocol, frequency, and application constraints with engineering."
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
            eyebrow="Program checkpoints"
            title="Agree the path before committing to production"
            copy="Confirm who owns each requirement, sample decision, validation result, and production term."
            light={true}
          />
          <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {[
              ["01", Settings, "Requirements and compatibility"],
              ["02", Zap, "Sample scope and acceptance"],
              ["03", Users, "Validation plan and evidence"],
              ["04", Truck, "Production and shipment terms"]
            ].map(([step, IconComp, title]) => (
              <div key={step} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                <div className="flex items-center justify-between">
              <span className="font-mono-brand text-xs uppercase tracking-[0.28em] text-white/65">{step}</span>
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
              eyebrow="Before sampling"
              title="Resolve the questions that shape a workable quotation"
              copy="The first conversation should cover compatibility, environment, documentation, and program scope before a quotation is finalized."
            />
            <div className="mt-10 grid gap-6">
              {PROGRAM_CHECKS.map(([title, copy], index) => (
                <article key={title} className="surface-panel p-7">
                  <div className="font-mono-brand text-xs uppercase tracking-[0.24em] text-[var(--brand-muted)]">0{index + 1}</div>
                  <h3 className="mt-4 text-2xl font-bold text-[var(--brand-ink)]">{title}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-600">{copy}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="surface-panel bg-[var(--brand-soft)] p-8">
            <div className="font-mono-brand text-xs uppercase tracking-[0.24em] text-[var(--brand-muted)]">Bring the brief</div>
            <div className="mt-8 space-y-6 text-base leading-8 text-slate-700">
              <p>Share the installed system, target application, frequency, protocol direction, and expected volume.</p>
              <p>That gives engineering and sales a concrete starting point for the next conversation.</p>
            </div>
            <Button className="mt-8" href="/contact/" onClick={() => navigate("contact")}>
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
          <div className="font-mono-brand text-xs uppercase tracking-[0.3em] text-white/55">About CHJ Remotes</div>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight md:text-6xl">A direct starting point for RF control discussions</h1>
          <p className="mt-6 text-lg leading-8 text-slate-300">{BRAND_NAME} is presented by {COMPANY_NAME}. Use the published contact details to confirm product fit, project scope, documentation, and commercial terms.</p>
        </div>
      </div>
      <div className="container mx-auto grid gap-6 px-6 pt-16 md:grid-cols-2 xl:grid-cols-4">
        {["Company identity", "Product and protocol fit", "Testing responsibilities", "Documentation and terms"].map((item, index) => (
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
            copy="Select a product family, then confirm the application, protocol, frequency, and customization requirements with engineering."
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
      const post = PUBLISHED_BLOG_POSTS.find(p => p.id === selectedPost);
      if (!post) return null;

      return (
        <>
          {/* Enhanced Hero Section with Geometric Background */}
          <section className="hero-shell relative overflow-hidden px-6 py-20 text-white">
            <div className="hero-mesh absolute inset-0" />
            {/* Geometric pattern overlay */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, rgba(245, 158, 11, 0.15) 1px, transparent 0)`,
                backgroundSize: '32px 32px'
              }}
            />
            <div className="container mx-auto relative z-10 max-w-3xl">
              <button
                onClick={() => setSelectedPost(null)}
                className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-white/70 hover:text-white transition-colors"
              >
                <ArrowRight className="h-4 w-4 rotate-180" />
                Back to all articles
              </button>
              <div className="badge-accent mb-6">{post.tag}</div>
              <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">{post.title}</h1>
              <div className="mt-8 flex items-center gap-4 text-base text-white/60">
                <span className="font-semibold">{post.author}</span>
                <span>·</span>
                <span>{post.date}</span>
              </div>
            </div>
          </section>

          {/* Main Content Area with Sidebar Layout */}
          <section className="bg-white pb-24">
            <div className="container mx-auto px-6 py-12">
              <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
                {/* Main Article Content - max-w-3xl centered */}
                <div className="mx-auto w-full max-w-3xl">
                  <article className="prose prose-lg max-w-none">
                    <div
                      className="text-slate-700 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                  </article>

                  {/* Lead Magnet Section */}
                  <div className="mt-16 rounded-3xl bg-gradient-to-br from-[var(--brand-navy)] to-[var(--brand-panel)] p-8 text-white">
                    <h3 className="text-2xl font-bold mb-4">Have an RF project question?</h3>
                    <p className="text-slate-300 mb-6 leading-relaxed">
                      Share the application and known constraints so the team can confirm fit and next steps.
                    </p>
                    <Button href="/contact/" onClick={() => navigate("contact")}>
                      Share Your Project Brief
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Article Footer */}
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

                {/* Sticky Sidebar */}
                <aside className="hidden lg:block">
                  <div className="sticky top-24 space-y-8">
                    {/* Quick Consultation Card */}
                    <div className="surface-panel p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <MessageSquare className="h-5 w-5 text-[var(--brand-accent)]" />
                        <h4 className="text-sm font-bold text-[var(--brand-navy)]">Quick Consultation</h4>
                      </div>
                      <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                        Send the known specifications and open questions directly to the CHJ Remotes contact team.
                      </p>
                      <a
                        href="/contact/"
                        onClick={(event) => {
                          if (shouldHandleClientNavigation(event)) {
                            event.preventDefault();
                            navigate("contact");
                          }
                        }}
                        className="w-full rounded-lg bg-[var(--brand-accent)] px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-[var(--brand-accent-hover)] hover:shadow-md"
                      >
                        Contact CHJ Remotes
                      </a>
                    </div>

                    {/* Related Products */}
                    <div className="surface-panel p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Layers className="h-5 w-5 text-[var(--brand-accent)]" />
                        <h4 className="text-sm font-bold text-[var(--brand-navy)]">Related Products</h4>
                      </div>
                      <div className="space-y-4">
                        {PRODUCT_FAMILIES.slice(0, 2).map((product) => (
                          <a
                            key={product.title}
                            href="/products/"
                            onClick={(event) => {
                              if (shouldHandleClientNavigation(event)) {
                                event.preventDefault();
                                navigate("products");
                              }
                            }}
                            className="block w-full rounded-lg border border-[var(--brand-line)] bg-white p-4 text-left transition-all hover:border-[var(--brand-accent)] hover:shadow-md"
                          >
                            <div className="text-xs font-mono-brand uppercase tracking-[0.18em] text-[var(--brand-muted)] mb-2">Product Family</div>
                            <div className="text-sm font-semibold text-[var(--brand-navy)]">{product.title}</div>
                          </a>
                        ))}
                      </div>
                    </div>

                    {/* Product brief */}
                    <div className="surface-panel p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <FileText className="h-5 w-5 text-[var(--brand-accent)]" />
                        <h4 className="text-sm font-bold text-[var(--brand-navy)]">Resources</h4>
                      </div>
                      <a
                        href="/contact/"
                        onClick={(event) => {
                          if (shouldHandleClientNavigation(event)) {
                            event.preventDefault();
                            navigate("contact");
                          }
                        }}
                        className="w-full flex items-center justify-center gap-2 rounded-lg border border-[var(--brand-navy)] bg-white px-4 py-3 text-sm font-semibold text-[var(--brand-navy)] transition-all hover:bg-[var(--brand-navy)] hover:text-white"
                      >
                        <FileText className="h-4 w-4" />
                        Request Product Brief
                      </a>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </section>
        </>
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
              copy="Technical and commercial notes for teams evaluating RF access and control programs."
            />
          </div>
        </div>
        <div className="container mx-auto grid gap-6 px-6 pt-16 lg:grid-cols-3">
          {PUBLISHED_BLOG_POSTS.map((post) => (
            <button
              type="button"
              key={post.id}
              className="card-featured p-8 text-left"
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
            </button>
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
          <div className="font-mono-brand text-xs uppercase tracking-[0.3em] text-white/55">Project inquiry</div>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight md:text-6xl">Contact CHJ Remotes</h1>
          <p className="mt-6 text-lg leading-8 text-slate-300">Share the application, target market, protocol direction, timing, and expected volume so the first reply can address the right constraints.</p>
        </div>
      </div>
      <div className="container mx-auto grid gap-8 px-6 pt-16 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="surface-panel bg-[var(--brand-panel)] p-8 text-white">
          <div className="space-y-6">
            {[
              [Mail, "Email", CONTACT_INFO.email, `mailto:${CONTACT_INFO.email}`],
              [Phone, "Phone", CONTACT_INFO.phone, "tel:+8618028993261"],
              [MessageSquare, "WhatsApp", CONTACT_INFO.whatsapp, "https://wa.me/8618028993261"],
              [MapPin, "Factory address", CONTACT_INFO.address, null]
            ].map(([IconComp, label, value, href]) => (
              <div key={label} className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10">
                  <IconComp className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold uppercase tracking-[0.18em] text-white/55">{label}</div>
                  {href ? (
                    <a
                      href={href}
                      className="mt-1 inline-block text-base leading-7 text-slate-200 underline decoration-white/30 underline-offset-4 transition-colors hover:text-white"
                      {...(href.startsWith("https://") ? { target: "_blank", rel: "noreferrer" } : {})}
                    >
                      {value}
                    </a>
                  ) : (
                    <div className="mt-1 text-base leading-7 text-slate-300">{value}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="surface-panel p-8 md:p-10">
          <div className="font-mono-brand text-xs uppercase tracking-[0.28em] text-[var(--brand-muted)]">Before you write</div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-[var(--brand-ink)]">Send a useful first brief</h2>
          <p className="mt-4 max-w-2xl leading-7 text-slate-600">Include what is already known and mark open questions clearly. The first reply can then focus on fit and next steps.</p>
          <ol className="mt-8 divide-y divide-[var(--brand-line)] border-y border-[var(--brand-line)]">
            {PROGRAM_CHECKS.map(([label, detail], index) => (
              <li key={label} className="grid grid-cols-[2.25rem_1fr] gap-4 py-5">
                <span className="font-mono-brand text-sm text-[var(--brand-accent)]">0{index + 1}</span>
                <div>
                  <div className="font-semibold text-[var(--brand-ink)]">{label}</div>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{detail}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href={WHATSAPP_URL} target="_blank" rel="noreferrer">WhatsApp Sales</Button>
            <Button variant="outline" href={EMAIL_BRIEF_URL}>Email Project Brief</Button>
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-[var(--brand-bg)] text-[var(--brand-ink)]">
      <header className={`sticky top-0 z-50 border-b transition-all duration-300 ${scrolled ? "border-[var(--brand-line)] bg-white/90 shadow-header backdrop-blur-xl" : "border-transparent bg-white/78 backdrop-blur-md"}`}>
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between py-4">
            <a
              className="flex items-center gap-4 text-left"
              href="/"
              onClick={(event) => {
                if (shouldHandleClientNavigation(event)) {
                  event.preventDefault();
                  navigate("home");
                }
              }}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--brand-line)] bg-white p-2">
                <img src={Logo} alt="CHJ logo" className="h-full w-full object-contain" />
              </div>
              <div>
                <div className="text-xl font-extrabold tracking-tight text-[var(--brand-navy)]">{BRAND_NAME}</div>
                <div className="font-mono-brand text-[11px] uppercase tracking-[0.22em] text-[var(--brand-muted)]">RF control programs</div>
              </div>
            </a>

            <nav className="hidden items-center gap-8 lg:flex">
              {KNOWN_PAGES.map((page) => (
                <NavButton
                  key={page}
                  active={activePage === page}
                  href={page === "home" ? "/" : `/${page}/`}
                  label={page.charAt(0).toUpperCase() + page.slice(1)}
                  onClick={() => navigate(page)}
                />
              ))}
              <Button className="px-5 py-2.5" href="/contact/" onClick={() => navigate("contact")}>
                Contact Sales
              </Button>
            </nav>

            <button
              ref={menuButtonRef}
              type="button"
              aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--brand-line)] text-[var(--brand-navy)] lg:hidden"
              onClick={() => setIsMenuOpen((value) => !value)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      <div
        ref={mobileMenuRef}
        id="mobile-navigation"
        hidden={!isMenuOpen}
        aria-hidden={!isMenuOpen}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className="fixed inset-0 z-40 bg-[rgba(7,17,31,0.96)] px-6 pb-10 pt-24 lg:hidden"
      >
          <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            {KNOWN_PAGES.map((page) => (
              <NavButton
                key={page}
                mobile
                active={activePage === page}
                href={page === "home" ? "/" : `/${page}/`}
                label={page.charAt(0).toUpperCase() + page.slice(1)}
                onClick={() => navigate(page)}
              />
            ))}
            <Button className="mt-6 w-full" href="/contact/" onClick={() => navigate("contact")}>
              Contact Sales
            </Button>
          </div>
      </div>

      <main>
        {activePage === "home" && renderHome()}
        {activePage === "about" && renderAbout()}
        {activePage === "products" && renderProducts()}
        {activePage === "blog" && renderBlog()}
        {activePage === "contact" && renderContact()}
      </main>

      <footer className="bg-[var(--brand-panel)] px-6 pb-10 pt-20 text-slate-300">
        <div className="container mx-auto">
          <div className="grid gap-12 border-b border-white/10 pb-14 lg:grid-cols-4">
            {/* Column 1: Company Info */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-2">
                  <img src={Logo} alt="CHJ footer logo" className="h-full w-full object-contain" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{BRAND_NAME}</div>
                  <div className="font-mono-brand text-[11px] uppercase tracking-[0.22em] text-white/65">RF control program contact</div>
                </div>
              </div>
              <p className="text-sm leading-7 text-slate-400 mb-6">Contact {BRAND_NAME} to discuss RF remotes, receivers, retrofit kits, and project requirements.</p>
              <div className="flex gap-3">
                <a href="mailto:sales@chjremote.com" className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold transition-all hover:bg-white/10">
                  Email Us
                </a>
              </div>
            </div>

            {/* Column 2: Products */}
            <div>
              <div className="font-mono-brand text-xs uppercase tracking-[0.28em] text-white/65 mb-6">Product Families</div>
              <div className="space-y-4">
                {PRODUCT_FAMILIES.map((product) => (
                  <a
                    key={product.title}
                    href="/products/"
                    className="block w-full text-left rounded-lg border border-white/5 bg-white/[0.02] p-3 text-sm text-slate-300 transition-all hover:border-white/20 hover:bg-white/[0.05] hover:text-white"
                    onClick={(event) => {
                      if (shouldHandleClientNavigation(event)) {
                        event.preventDefault();
                        navigate("products");
                      }
                    }}
                  >
                    <div className="font-semibold">{product.title}</div>
                  </a>
                ))}
              </div>
            </div>

            {/* Column 3: Support */}
            <div>
              <div className="font-mono-brand text-xs uppercase tracking-[0.28em] text-white/65 mb-6">Support & Services</div>
              <div className="space-y-3 text-sm">
                <NavButton mobile href="/contact/" label="Project Contact" onClick={() => navigate("contact")} />
                <NavButton mobile href="/about/" label="About CHJ Remotes" onClick={() => navigate("about")} />
                <NavButton mobile href="/products/" label="Product Directions" onClick={() => navigate("products")} />
                <NavButton mobile href="/blog/" label="Technical Articles" onClick={() => navigate("blog")} />
              </div>
            </div>

            {/* Column 4: Contact */}
            <div>
              <div className="font-mono-brand text-xs uppercase tracking-[0.28em] text-white/65 mb-6">Contact Factory</div>
              <div className="space-y-5 text-sm">
                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand-accent)]" />
                  <div>
                    <div className="font-mono-brand text-xs text-white/65 mb-1">Email</div>
                    <a href={`mailto:${CONTACT_INFO.email}`} className="text-slate-300 underline decoration-white/20 underline-offset-4 hover:text-white">{CONTACT_INFO.email}</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand-accent)]" />
                  <div>
                    <div className="font-mono-brand text-xs text-white/65 mb-1">WhatsApp</div>
                    <a href="https://wa.me/8618028993261" target="_blank" rel="noreferrer" className="text-slate-300 underline decoration-white/20 underline-offset-4 hover:text-white">{CONTACT_INFO.whatsapp}</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand-accent)]" />
                  <div>
                    <div className="font-mono-brand text-xs text-white/65 mb-1">Location</div>
                    <div className="text-slate-300 leading-relaxed">{CONTACT_INFO.address}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="flex flex-col gap-3 pt-8 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
            <div>&copy; 2026 {BRAND_NAME}. All rights reserved.</div>
            <div className="flex items-center gap-6">
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
