import {
  createContext,
  isValidElement,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Language = "en" | "ar";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  isArabic: boolean;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const LANGUAGE_STORAGE_KEY = "tarik-bamarouf-language";
const ARABIC_DIGITS = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"] as const;
const ARABIC_TEXT_RE = /[\u0600-\u06FF]/;
const SECTION_INDEXES: Record<string, string> = {
  I: "01",
  II: "02",
  III: "03",
  IV: "04",
  V: "05",
};

export function formatLocalizedNumber(
  value: number | string,
  language: Language,
  options: { minimumIntegerDigits?: number } = {},
) {
  const normalized =
    typeof value === "number"
      ? String(value).padStart(options.minimumIntegerDigits ?? 0, "0")
      : value;

  if (language !== "ar") {
    return normalized;
  }

  return normalized.replace(/\d/g, (digit) => ARABIC_DIGITS[Number(digit)]);
}

export function formatSectionIndex(index: string, language: Language) {
  if (language !== "ar") {
    return index;
  }

  return formatLocalizedNumber(SECTION_INDEXES[index] ?? index, language);
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  const setLanguage = (nextLanguage: Language) => {
    setLanguageState(nextLanguage);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
    }
  };

  useEffect(() => {
    const direction = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;
    document.documentElement.dir = direction;
    document.body.dataset.lang = language;
    document.body.dir = direction;
  }, [language]);

  useEffect(() => {
    const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (storedLanguage === "ar") {
      setLanguageState("ar");
    }
  }, []);

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage,
      toggleLanguage: () => setLanguage(language === "ar" ? "en" : "ar"),
      isArabic: language === "ar",
    }),
    [language],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }
  return context;
}

function containsArabicText(node: ReactNode): boolean {
  if (typeof node === "string" || typeof node === "number") {
    return ARABIC_TEXT_RE.test(String(node));
  }

  if (Array.isArray(node)) {
    return node.some(containsArabicText);
  }

  if (isValidElement<{ children?: ReactNode }>(node)) {
    return containsArabicText(node.props.children);
  }

  return false;
}

export function BidiText({ children }: { children: ReactNode }) {
  const { language } = useLanguage();

  if (language !== "ar" || !containsArabicText(children)) {
    return <>{children}</>;
  }

  return (
    <bdi className="arabic-bidi-isolate" dir="rtl">
      {children}
    </bdi>
  );
}

export function EnglishLayoutSlot({
  master,
  children,
}: {
  master: ReactNode;
  children: ReactNode;
}) {
  return (
    <span className="english-layout-slot">
      <span className="english-layout-slot__master" aria-hidden="true">
        {master}
      </span>
      <span className="english-layout-slot__local">
        <BidiText>{children}</BidiText>
      </span>
    </span>
  );
}

export const siteCopy = {
  en: {
    nav: {
      home: "Home",
      work: "Work",
      about: "About",
      services: "Services",
      process: "Process",
      contact: "Contact",
      menu: "Menu",
      close: "Close",
      studio: "BAMAROUF STUDIO",
      studioLabel: "Visit BAMAROUF STUDIO",
      switchTo: "عربي",
      switchLabel: "Switch language to Arabic",
    },
    common: {
      viewProject: "View Project",
      viewAllProjects: "View All Projects",
      backToWork: "Back to Work",
      scroll: "Scroll",
      notFoundTitle: "Page not found",
      notFoundBody: "The page you are looking for does not exist or has moved.",
      errorTitle: "This page did not load",
      errorBody: "Something went wrong on our end. You can try refreshing or head back home.",
      tryAgain: "Try again",
      goHome: "Go home",
    },
    home: {
      metaTitle: "Tarik Bamarouf | Independent Digital Studio",
      metaDescription:
        "Premium website design, UX/UI, brand identity direction, and front-end experiences for ambitious brands.",
      heroLabel: "Independent Digital Studio",
      heroLine1: "Digital",
      heroLine2: "Experiences",
      heroLine3: "For",
      heroEmphasis: "Ambitious",
      heroLine4: "Brands.",
      heroStatement: {
        before: "Website Design, ",
        emphasis: "UX/UI",
        after: " and Digital Brand Presence.",
      },
      heroCapabilities:
        "Premium Websites\u00a0\u00a0•\u00a0\u00a0UX/UI Design\u00a0\u00a0•\u00a0\u00a0Brand Identity Direction\u00a0\u00a0•\u00a0\u00a0Front-end Craft",
      clientsEyebrow: "SELECTED CLIENTS",
      clientsLine: "Trusted by 14 ambitious brands.",
      viewWork: "View Work",
      startProject: "Start Project",
      portfolioLabel: "Portfolio 2026",
      approachHeadline: {
        line1: "Presence starts",
        line2Before: "",
        emphasis: "before",
        line2After: "design.",
        line3: "",
      },
      approachBody:
        "Before the interface, I define what the brand must make clear, what the visitor should feel, and what action should come next.",
      approachStages: [
        {
          t: "Clarify",
          d: "Offer, audience, and first impression.",
        },
        {
          t: "Strategy",
          d: "A focused direction before design begins.",
        },
        {
          t: "UX",
          d: "A visitor journey with no wasted moments.",
        },
        {
          t: "Design",
          d: "A visual language that feels unmistakably yours.",
        },
        {
          t: "Build",
          d: "A front-end experience shaped with care.",
        },
      ],
      selectedWork: "Selected Work",
      selectedTitle: "Selected Projects",
      selectedPortfolioLabel: "PORTFOLIO 2026",
      selectedProjectsLabel: "SELECTED PROJECTS",
      aboutLabel: "About",
      aboutTitle: "Websites.\nIdentity.\nExperience.",
      aboutBody: "Digital presence shaped with clarity, atmosphere, and front-end craft.",
      aboutCta: "About Me",
      servicesLabel: "Services",
      processLabel: "The Process",
      ctaLabel: "Let's Work Together",
      ctaTitle: "Let's shape your digital presence.",
      ctaBody: "Tell me what you are building, what it should feel like, and who it needs to move.",
      ctaButton: "Start Your Project",
    },
    services: [
      {
        t: "Premium Websites",
        d: "Websites designed to sharpen perception and earn attention.",
      },
      {
        t: "UX/UI Design",
        d: "Interfaces that feel clear, composed, and easy to trust.",
      },
      {
        t: "Digital Brand Presence",
        d: "A visual world that makes the brand feel considered.",
      },
      {
        t: "Front-end Craft",
        d: "Refined implementation with motion, detail, and performance in mind.",
      },
    ],
    steps: [
      {
        t: "Vision",
        d: "What should the client see?",
      },
      {
        t: "Message",
        d: "What should they feel?",
      },
      {
        t: "User Experience",
        d: "A clear and fluid journey.",
      },
      {
        t: "Visual Identity",
        d: "A language true to the brand.",
      },
      {
        t: "Execution",
        d: "A real experience, crafted to work beautifully.",
      },
    ],
    work: {
      metaTitle: "Work | Tarik Bamarouf",
      metaDescription:
        "Selected website design, UX/UI, brand identity, and digital experience work by Tarik Bamarouf.",
      archive: "The Archive",
      title: "Selected Work.",
      volume: "Portfolio 2026",
      projectLabel: "Project",
      end: "Portfolio complete",
      note: "New chapters in preparation",
    },
    about: {
      metaTitle: "About | Tarik Bamarouf",
      metaDescription:
        "An independent digital studio focused on premium website design, UX/UI, identity direction, and front-end craft.",
      label: "Portrait of a Practice",
      titleA: "One independent ",
      titleB: "studio.",
      titleC: "Driven by ambition that reaches far beyond one person.",
      portraitAlt: "Tarik Bamarouf portrait",
      portraitLabel: "Tarik Bamarouf studio portrait",
      biography: "Biography",
      biographyBody:
        "I design premium websites and digital experiences where identity, interface, and atmosphere work together.",
      philosophy: "Philosophy",
      philosophyBody:
        "The work is quiet by choice. Every page is shaped to clarify the offer, build trust, and make the brand feel considered from the first moment.",
      disciplines: "Disciplines",
      recognition: "Focus",
      recognitionBody:
        "Available for selected websites, brand launches, UX/UI work, and creative digital experiences.",
      begin: "Begin a conversation",
      disciplineItems: [
        "Creative Direction",
        "Website Design",
        "Brand Identity",
        "UX/UI",
        "Visual Storytelling",
        "Front-end Craft",
      ],
    },
    contact: {
      metaTitle: "Contact | Tarik Bamarouf",
      metaDescription:
        "Start a direct conversation about a premium website, UX/UI, brand identity, or digital experience.",
      label: "Direct",
      titleA: "Let's ",
      titleB: "talk.",
      body: "No forms. Send the idea, the ambition, or the problem. We begin there.",
      primary: "Primary",
      compose: "Compose",
      secondary: "Secondary",
      whatsapp: "WhatsApp",
      whatsappBody: "Share the project directly.",
      openChat: "Open Chat",
    },
    footer: {
      headline: "Premium websites, UX/UI, and digital presence for ambitious brands.",
      whatsapp: "WhatsApp",
      email: "Email",
      navigate: "Navigate",
      direct: "Direct",
      studioSignature: "AN INDEPENDENT WORLD OF BAMAROUF STUDIO",
      rights: "© 2026 Tarik Bamarouf. All rights reserved.",
      location: "Independent Digital Studio. Worldwide.",
    },
    project: {
      notFound: "Project not found",
      returnToIndex: "Return to index",
      loadError: "This page did not load.",
      overview: "Project Overview",
      challenge: "Challenge",
      approach: "Approach",
      outcome: "Outcome",
      information: "Project Information",
      client: "Client",
      industry: "Industry",
      service: "Scope",
      year: "Year",
      type: "Project Type",
      gallery: "Gallery",
      section: "Section",
      reflection: "Reflection",
      results: "Results and Outcome",
      next: "Next Project",
      view: "View",
      desktopExperience: "Desktop Experience",
      mobileExperience: "Mobile Experience",
      brandAssets: "Brand Assets",
      uiDetails: "Interface Details",
      additionalViews: "Additional Views",
      comingSoon: "Coming soon",
    },
  },
  ar: {
    nav: {
      home: "الرئيسية",
      work: "الأعمال",
      about: "عنّي",
      services: "الخدمات",
      process: "المنهجية",
      contact: "تواصل",
      menu: "القائمة",
      close: "إغلاق",
      studio: "بامعروف استديو",
      studioLabel: "زيارة بامعروف استديو",
      switchTo: "EN",
      switchLabel: "تغيير اللغة إلى الإنجليزية",
    },
    common: {
      viewProject: "عرض المشروع",
      viewAllProjects: "عرض كل الأعمال",
      backToWork: "العودة إلى الأعمال",
      scroll: "تصفّح",
      notFoundTitle: "الصفحة غير موجودة",
      notFoundBody: "الصفحة التي تبحث عنها غير موجودة أو تم نقلها.",
      errorTitle: "تعذر تحميل الصفحة",
      errorBody: "حدث خطأ غير متوقع. يمكنك تحديث الصفحة أو العودة إلى الرئيسية.",
      tryAgain: "حاول مرة أخرى",
      goHome: "العودة للرئيسية",
    },
    home: {
      metaTitle: "طارق بامعروف | استوديو رقمي مستقل",
      metaDescription:
        "تصميم مواقع راقية، تجربة وواجهة مستخدم، توجيه هوية، وتجارب واجهة أمامية لعلامات طموحة.",
      heroLabel: "استوديو رقمي مستقل",
      heroLine1: "تجارب",
      heroLine2: "رقمية",
      heroLine3: "لعلامات",
      heroEmphasis: "طموحة",
      heroLine4: "",
      heroStatement: {
        before: "تصميم مواقع، ",
        emphasis: "تجربة وواجهة",
        after: "، وحضور رقمي للعلامات.",
      },
      heroCapabilities:
        "مواقع راقية\u00a0\u00a0•\u00a0\u00a0تجربة وواجهة المستخدم\u00a0\u00a0•\u00a0\u00a0توجيه هوية العلامة\u00a0\u00a0•\u00a0\u00a0حرفة الواجهة الأمامية",
      clientsEyebrow: "عملاء مختارون",
      clientsLine: "تشرفت بالعمل مع ١٤ علامة طموحة.",
      viewWork: "عرض الأعمال",
      startProject: "ابدأ مشروعك",
      portfolioLabel: "محفظة ٢٠٢٦",
      approachHeadline: {
        line1: "الحضور يبدأ",
        line2Before: "",
        emphasis: "قبل",
        line2After: "التصميم.",
        line3: "",
      },
      approachBody:
        "قبل الواجهة، أحدد ما يجب أن توضحه العلامة، ما ينبغي أن يشعر به الزائر، وما الخطوة التي تستحق أن تأتي بعد ذلك.",
      approachStages: [
        {
          t: "التوضيح",
          d: "العرض، الجمهور، والانطباع الأول.",
        },
        {
          t: "الاستراتيجية",
          d: "اتجاه مركز قبل بدء التصميم.",
        },
        {
          t: "تجربة المستخدم",
          d: "رحلة زائر بلا لحظات ضائعة.",
        },
        {
          t: "التصميم",
          d: "لغة بصرية تشبه العلامة ولا تشبه غيرها.",
        },
        {
          t: "التنفيذ",
          d: "واجهة أمامية مصقولة بعناية.",
        },
      ],
      selectedWork: "أعمال مختارة",
      selectedTitle: "أعمال مختارة",
      selectedPortfolioLabel: "ملف الأعمال ٢٠٢٦",
      selectedProjectsLabel: "المشاريع المختارة",
      aboutLabel: "عنّي",
      aboutTitle: "مواقع.\nهوية.\nتجربة.",
      aboutBody: "حضور رقمي مصاغ بوضوح وأجواء وحرفة في الواجهة.",
      aboutCta: "عنّي",
      servicesLabel: "الخدمات",
      processLabel: "المنهجية",
      ctaLabel: "لنعمل معًا",
      ctaTitle: "لنصنع حضورك الرقمي.",
      ctaBody: "حدثني عمّا تبنيه، وما الشعور الذي تريده، ومن تريد أن تحرّكه التجربة.",
      ctaButton: "ابدأ مشروعك",
    },
    services: [
      {
        t: "مواقع راقية",
        d: "مواقع تصقل الانطباع وتمنح العلامة حضورًا أوضح.",
      },
      {
        t: "تجربة وواجهة المستخدم",
        d: "واجهات واضحة، هادئة، وسهلة الثقة.",
      },
      {
        t: "حضور العلامة الرقمي",
        d: "عالم بصري يجعل العلامة أكثر اتزانًا ووضوحًا.",
      },
      {
        t: "حرفة الواجهة الأمامية",
        d: "تنفيذ مصقول يهتم بالحركة والتفاصيل والأداء.",
      },
    ],
    steps: [
      {
        t: "الرؤية",
        d: "ماذا نريد أن يرى العميل؟",
      },
      {
        t: "الرسالة",
        d: "ماذا يجب أن يشعر؟",
      },
      {
        t: "تجربة المستخدم",
        d: "رحلة واضحة وسلسة.",
      },
      {
        t: "الهوية البصرية",
        d: "لغة تشبه العلامة.",
      },
      {
        t: "التنفيذ",
        d: "تجربة حقيقية تعمل بإتقان.",
      },
    ],
    work: {
      metaTitle: "الأعمال | طارق بامعروف",
      metaDescription:
        "أعمال مختارة في تصميم المواقع، تجربة وواجهة المستخدم، الهوية، والتجارب الرقمية.",
      archive: "الأرشيف",
      title: "أعمال مختارة.",
      volume: "محفظة ٢٠٢٦",
      projectLabel: "مشروع",
      end: "اكتمل الأرشيف",
      note: "فصول جديدة قيد التحضير",
    },
    about: {
      metaTitle: "عني | طارق بامعروف",
      metaDescription:
        "استوديو رقمي مستقل يركز على تصميم المواقع الراقية، تجربة وواجهة المستخدم، توجيه الهوية، وحرفة الواجهة الأمامية.",
      label: "ملامح الممارسة",
      titleA: "استوديو ",
      titleB: "مستقل.",
      titleC: "يقوده طموحٌ يتجاوز حدود الشخص الواحد.",
      portraitAlt: "بورتريه طارق بامعروف",
      portraitLabel: "بورتريه طارق بامعروف في الاستوديو",
      biography: "نبذة",
      biographyBody:
        "أصمم مواقع وتجارب رقمية راقية تعمل فيها الهوية والواجهة والأجواء بتناغم واضح.",
      philosophy: "الفلسفة",
      philosophyBody:
        "الهدوء هنا اختيار مقصود. كل صفحة تُصاغ لتوضح العرض، وتبني الثقة، وتجعل العلامة مدروسة منذ اللحظة الأولى.",
      disciplines: "التخصصات",
      recognition: "التركيز",
      recognitionBody:
        "متاح لمواقع مختارة، إطلاقات علامات، أعمال تجربة وواجهة، وتجارب رقمية إبداعية.",
      begin: "ابدأ الحوار",
      disciplineItems: [
        "التوجيه الإبداعي",
        "تصميم المواقع",
        "هوية العلامة",
        "تجربة وواجهة المستخدم",
        "السرد البصري",
        "حرفة الواجهة",
      ],
    },
    contact: {
      metaTitle: "تواصل | طارق بامعروف",
      metaDescription:
        "ابدأ حوارًا مباشرًا حول موقع راقٍ، تجربة وواجهة مستخدم، هوية علامة، أو تجربة رقمية.",
      label: "تواصل مباشر",
      titleA: "لنتحدث.",
      titleB: "",
      body: "بلا نماذج. أرسل الفكرة، الطموح، أو المشكلة. نبدأ من هناك.",
      primary: "البريد",
      compose: "راسلني",
      secondary: "قناة سريعة",
      whatsapp: "واتساب",
      whatsappBody: "شارك المشروع مباشرة.",
      openChat: "افتح المحادثة",
    },
    footer: {
      headline: "مواقع راقية، تجربة وواجهة، وحضور رقمي لعلامات طموحة.",
      whatsapp: "واتساب",
      email: "البريد",
      navigate: "التنقل",
      direct: "مباشر",
      studioSignature: "عالم مستقل ضمن بامعروف استديو",
      rights: "© ٢٠٢٦ طارق بامعروف. جميع الحقوق محفوظة.",
      location: "استوديو رقمي مستقل. حضور عالمي.",
    },
    project: {
      notFound: "المشروع غير موجود",
      returnToIndex: "العودة إلى الأرشيف",
      loadError: "تعذر تحميل الصفحة.",
      overview: "نظرة على المشروع",
      challenge: "السياق",
      approach: "المنهج",
      outcome: "النتيجة",
      information: "معلومات المشروع",
      client: "العميل",
      industry: "القطاع",
      service: "نطاق العمل",
      year: "السنة",
      type: "نوع المشروع",
      gallery: "المعرض",
      section: "الفصل",
      reflection: "الخلاصة",
      results: "النتائج والأثر",
      next: "المشروع التالي",
      view: "عرض المشروع",
      desktopExperience: "تجربة سطح المكتب",
      mobileExperience: "تجربة الجوال",
      brandAssets: "أصول الهوية",
      uiDetails: "تفاصيل الواجهة",
      additionalViews: "مشاهد إضافية",
      comingSoon: "قريبًا",
    },
  },
} as const;

type ProjectCopy = {
  name?: string;
  category?: string;
  disciplines?: string;
  intro?: string;
  details?: {
    client?: string;
    industry?: string;
    services?: string;
    year?: string;
    platform?: string;
  };
  overview?: {
    challenge: string;
    approach: string;
    outcome: string;
  };
  gallery?: Array<{
    title: string;
    caption: string;
  }>;
  reflection?: string;
};

export const projectCopy: Record<string, Record<Language, ProjectCopy>> = {
  "osama-bin-mahfouz-law-firm": {
    en: {
      name: "Osama Bin Ahmed Bin Mahfouz Law Firm",
      category: "Law Firm Website",
      disciplines: "Website Design & Development",
      intro:
        "A refined bilingual website created for Osama Bin Ahmed Bin Mahfouz Law Firm, combining Saudi architectural references, professional legal clarity and a quiet premium visual language. The experience presents the firm, its legal services and direct communication channels through a structured Arabic and English interface.",
      details: {
        client: "Osama Bin Ahmed Bin Mahfouz Law Firm",
        industry: "Legal Services / Saudi Arabia",
        services:
          "Web Design, UX/UI Design, Arabic & English Experience, Front-End Development, Responsive Design, Visual Direction",
        platform: "Website Design & Development",
      },
      overview: {
        challenge:
          "The firm needed a digital presence that could communicate legal trust, bilingual clarity, direct communication, and a premium Saudi visual character without feeling generic or overdesigned.",
        approach:
          "The website was shaped around architectural warmth, olive and ivory contrast, structured legal services, direct contact paths, and a refined Arabic and English experience that keeps the firm easy to understand.",
        outcome:
          "The final experience presents the firm with quiet authority, making its services, values, office presence, and communication channels clear across desktop and mobile.",
      },
      gallery: [
        {
          title: "Hero and Homepage View",
          caption:
            "The homepage introduces the firm through Saudi architectural atmosphere, a clear legal promise, and direct paths into services and consultation.",
        },
        {
          title: "Intro and Logo View",
          caption:
            "The official identity is presented with restraint, giving the brand mark room to feel formal, sharp, and memorable.",
        },
        {
          title: "About and Statement Section",
          caption:
            "The firm story pairs a confident legal statement with premium interior and architectural references.",
        },
        {
          title: "Legal Services Section",
          caption:
            "Legal services are organized through a calm interface that makes each practice area easy to scan and understand.",
        },
        {
          title: "Contact and Footer Section",
          caption:
            "The final contact area brings calls, WhatsApp, email, firm details, and legal-service navigation into one structured closing moment.",
        },
        {
          title: "Values and Communication Journey",
          caption:
            "Supporting sections clarify the firm’s values and communication process with a composed visual rhythm.",
        },
      ],
      reflection:
        "The project became a premium bilingual law-firm website, combining website design, UX/UI, Arabic and English experience, front-end development, responsive design, and visual direction into one composed digital presence.",
    },
    ar: {
      name: "مكتب أسامه بن أحمد بن محفوظ للمحاماة",
      category: "موقع مكتب محاماة",
      disciplines: "تصميم وتطوير موقع إلكتروني",
      intro:
        "موقع ثنائي اللغة صُمم لمكتب أسامه بن أحمد بن محفوظ للمحاماة، يجمع بين الطابع المعماري السعودي والوضوح المهني والهوية البصرية الراقية والهادئة. يقدم الموقع تعريفًا بالمكتب وخدماته القانونية وقنوات التواصل المباشر ضمن تجربة عربية وإنجليزية منظمة.",
      details: {
        client: "مكتب أسامه بن أحمد بن محفوظ للمحاماة",
        industry: "الخدمات القانونية / السعودية",
        services:
          "تصميم الموقع، تصميم تجربة وواجهة المستخدم، تجربة عربية وإنجليزية، تطوير الواجهة الأمامية، تصميم متجاوب، التوجيه البصري",
        platform: "تصميم وتطوير موقع إلكتروني",
      },
      overview: {
        challenge:
          "احتاج المكتب إلى حضور رقمي يوضح الثقة القانونية، التجربة الثنائية اللغة، قنوات التواصل المباشر، والطابع السعودي الراقي دون أن يبدو تقليديًا أو زائد التصميم.",
        approach:
          "صيغ الموقع حول دفء العمارة السعودية، توازن الزيتوني والعاجي، تنظيم الخدمات القانونية، مسارات التواصل المباشر، وتجربة عربية وإنجليزية واضحة تحفظ هيبة المكتب.",
        outcome:
          "تقدم التجربة النهائية المكتب بحضور هادئ وواثق، وتوضح خدماته وقيمه وحضور المكتب وقنوات التواصل عبر سطح المكتب والجوال.",
      },
      gallery: [
        {
          title: "الواجهة الرئيسية",
          caption:
            "تقدم الصفحة الرئيسية المكتب بأجواء معمارية سعودية، وعد قانوني واضح، ومسارات مباشرة نحو الخدمات والاستشارة.",
        },
        {
          title: "الانترو والشعار",
          caption:
            "تُعرض الهوية الرسمية بهدوء، مع مساحة كافية للشعار كي يبدو رسميًا وحادًا وسهل التذكر.",
        },
        {
          title: "عن المكتب والرسالة",
          caption:
            "يربط قسم التعريف بالمكتب بين رسالة قانونية واثقة ومراجع داخلية ومعمارية راقية.",
        },
        {
          title: "الخدمات القانونية",
          caption:
            "تُنظم الخدمات القانونية داخل واجهة هادئة تجعل كل مجال ممارسة واضحًا وسهل التصفح.",
        },
        {
          title: "التواصل والختام",
          caption:
            "يجمع قسم التواصل الأخير الاتصال وواتساب والبريد وبيانات المكتب وروابط الخدمات القانونية في ختام منظم.",
        },
        {
          title: "القيم ورحلة التواصل",
          caption:
            "توضح الأقسام الداعمة قيم المكتب ومسار التواصل بإيقاع بصري هادئ ومتزن.",
        },
      ],
      reflection:
        "أصبح المشروع موقعًا راقيًا ثنائي اللغة لمكتب محاماة، يجمع تصميم الموقع، تجربة وواجهة المستخدم، التجربة العربية والإنجليزية، تطوير الواجهة الأمامية، التصميم المتجاوب، والتوجيه البصري داخل حضور رقمي واحد متماسك.",
    },
  },
  "couture-experience": {
    en: {
      category: "Luxury Couture House",
      disciplines: "Identity, Direction, E-Commerce",
      intro:
        "A luxury fashion house website shaped around couture, bridal, ready-to-wear, editorial storytelling, and house presence.",
      details: {
        industry: "Luxury Couture",
        services: "Website Design and Development",
        platform: "Luxury Couture Website",
      },
      overview: {
        challenge:
          "Couture Experience presents couture collections, bridal pieces, ready-to-wear capsules, editorial stories, press presence, and private house moments through a refined cinematic website.",
        approach:
          "The goal was to build a premium online presence that feels elegant, restrained, and memorable while allowing the collections and atmosphere to lead the experience.",
        outcome:
          "Every chapter of the house is composed with quiet authority, so the website reads as one continuous editorial experience rather than a catalogue.",
      },
      gallery: [
        {
          title: "Couture World",
          caption: "A restrained visual direction for the house’s couture identity.",
        },
        {
          title: "Ready-to-Wear",
          caption:
            "A seasonal product experience designed with clarity, softness, and luxury spacing.",
        },
        {
          title: "Bridal Archive",
          caption: "A quiet presentation of bridal creations, craftsmanship, and detail.",
        },
        {
          title: "Bridal Details",
          caption: "Close visual storytelling for embroidery, texture, and ceremony.",
        },
        {
          title: "Journal",
          caption: "Editorial storytelling built to extend the house beyond product.",
        },
        {
          title: "In The Press",
          caption: "A dedicated media presence for features, interviews, and brand visibility.",
        },
        {
          title: "House Presence",
          caption: "A cinematic presentation of runway, cultural presence, and public moments.",
        },
        {
          title: "Worn By",
          caption: "A visual archive of the women, occasions, and figures connected to the house.",
        },
        {
          title: "Events",
          caption:
            "Private gatherings and atmospheric moments presented as part of the brand world.",
        },
      ],
      reflection:
        "The final experience positions Couture Experience as a refined luxury couture house, combining visual storytelling, collection presentation, editorial depth, and premium digital presence in one cohesive website.",
    },
    ar: {
      category: "دار أزياء راقية",
      disciplines: "هوية، توجيه بصري، تجارة إلكترونية",
      intro:
        "موقع لدار أزياء فاخرة صُمم حول الكوتور، أزياء العرائس، الأزياء الجاهزة، السرد التحريري، وحضور الدار.",
      details: {
        industry: "الكوتور الفاخر",
        services: "تصميم وتطوير الموقع",
        platform: "موقع لدار أزياء راقية",
      },
      overview: {
        challenge:
          "صُممت تجربة Couture Experience الرقمية لتقديم مجموعات الكوتور، قطع العرائس، الأزياء الجاهزة، القصص التحريرية، الحضور الإعلامي، ولحظات الدار الخاصة ضمن موقع مصقول بإيقاع سينمائي.",
        approach:
          "كان الهدف بناء حضور رقمي فاخر يشعر بالأناقة والهدوء والتميّز، مع ترك المساحة للمجموعات والأجواء لتقود التجربة.",
        outcome:
          "كل فصل من فصول الدار قُدم بهدوء ووضوح، لتبدو التجربة كعمل تحريري متصل وليست مجرد كتالوج.",
      },
      gallery: [
        { title: "عالم الكوتور", caption: "اتجاه بصري هادئ يقدّم هوية الدار في سياق الكوتور." },
        { title: "الأزياء الجاهزة", caption: "تجربة موسمية واضحة وناعمة بمساحات فاخرة ومدروسة." },
        { title: "أرشيف العرائس", caption: "عرض رصين لأزياء العرائس والحرفة والتفاصيل." },
        { title: "تفاصيل العرائس", caption: "سرد بصري قريب للتطريز والملمس ولحظة المناسبة." },
        { title: "المجلة", caption: "سرد تحريري يوسّع حضور الدار خارج حدود المنتج." },
        { title: "في الصحافة", caption: "مساحة إعلامية مخصصة للمقابلات والظهور والانتشار." },
        { title: "حضور الدار", caption: "عرض سينمائي للحظات العروض والحضور الثقافي والعام." },
        { title: "من ارتدين تصاميمها", caption: "أرشيف بصري للشخصيات والمناسبات المرتبطة بالدار." },
        { title: "الفعاليات", caption: "لقاءات خاصة ولحظات مشحونة بالأجواء داخل عالم العلامة." },
      ],
      reflection:
        "تقدم التجربة النهائية Couture Experience كدار أزياء راقية وهادئة، تجمع بين السرد البصري، عرض المجموعات، العمق التحريري، والحضور الرقمي الرفيع داخل موقع واحد متماسك.",
    },
  },
  "tarta-de-amor": {
    en: {
      category: "Luxury Dessert Brand / Premium E-Commerce Experience",
      disciplines: "Brand Direction, E-Commerce, Product UX",
      intro:
        "A luxury Madrid Cheesecake brand built around gifting, premium presentation, and elevated digital ordering.",
      details: {
        industry: "Luxury Dessert Brand",
        services:
          "Brand Direction, Creative Direction, Website Design, E-Commerce Experience, Product Presentation, Conversion-Focused UX",
        platform: "Premium E-Commerce Experience",
      },
      overview: {
        challenge:
          "Tarta De Amor was created as a premium digital experience for a luxury Madrid Cheesecake brand in Jeddah, with a focus on transforming a simple dessert purchase into an elegant gifting journey.",
        approach:
          "The project combined cinematic food photography, refined product presentation, elegant storytelling, conversion-focused UX, and a calm ordering flow designed around clarity and desire.",
        outcome:
          "Every detail, from photography direction and interface design to the cinematic intro sequence, was crafted to communicate quality, exclusivity, and emotion.",
      },
      gallery: [
        {
          title: "Madrid Cheesecake Hero",
          caption:
            "The opening visual presents the signature cake with warm cinematic lighting, minimal composition, and a premium dessert mood.",
        },
        {
          title: "Reservation and Order Experience",
          caption:
            "The order flow turns sauce selection, timing, quantity, and checkout into a calm and refined reservation journey.",
        },
        {
          title: "Chocolate Sauce Cheesecake",
          caption:
            "A rich product moment highlights the chocolate sauce selection through close photography and a clear ordering interface.",
        },
        {
          title: "Packaging Presentation",
          caption:
            "The packaging frames the cake as a gift, with the box, sauce bottle, and product presented as one considered ritual.",
        },
        {
          title: "Made for Moments Worth Remembering",
          caption:
            "An editorial brand section positions the Madrid Cheesecake as a quiet centerpiece for gifting, gatherings, and memorable evenings.",
        },
        {
          title: "Presented Before It Is Opened",
          caption:
            "The gift presentation moment emphasizes anticipation, craft, and the premium feeling before the first slice is served.",
        },
        {
          title: "Contact and Final Section",
          caption:
            "The final section completes the experience with contact details, brand presence, and a polished closing moment.",
        },
      ],
      reflection:
        "Tarta De Amor brings together creative direction, website design, UX/UI, front-end craft, and a cinematic intro by Tarik Bamarouf, shaping a premium digital ordering experience for a luxury cheesecake brand in Jeddah.",
    },
    ar: {
      category: "علامة حلويات فاخرة / تجربة تجارة إلكترونية راقية",
      disciplines: "توجيه العلامة، تجارة إلكترونية، تجربة منتج",
      intro: "علامة مدريد تشيزكيك فاخرة بُنيت حول الإهداء، العرض الراقي، وتجربة طلب رقمية مصقولة.",
      details: {
        industry: "علامة حلويات فاخرة",
        services:
          "توجيه العلامة، التوجيه الإبداعي، تصميم الموقع، تجربة التجارة الإلكترونية، عرض المنتجات، تجربة مستخدم موجهة للتحويل",
        platform: "تجربة تجارة إلكترونية راقية",
      },
      overview: {
        challenge:
          "صُممت Tarta De Amor كتجربة رقمية راقية لعلامة مدريد تشيزكيك فاخرة في جدة، مع تركيز على تحويل شراء الحلوى إلى رحلة إهداء أنيقة.",
        approach:
          "جمع المشروع تصويرًا غذائيًا سينمائيًا، عرضًا مصقولًا للمنتج، سردًا أنيقًا، تجربة مستخدم موجهة للتحويل، ومسار طلب هادئًا مبنيًا حول الوضوح والرغبة.",
        outcome:
          "كل تفصيل، من توجيه التصوير وتصميم الواجهة إلى تسلسل الانترو السينمائي، صيغ للتعبير عن الجودة والخصوصية والعاطفة.",
      },
      gallery: [
        {
          title: "واجهة مدريد تشيزكيك",
          caption:
            "يفتتح المشروع بصورة دافئة للكيكة الرئيسية، بإضاءة سينمائية وتكوين هادئ ومزاج فاخر.",
        },
        {
          title: "تجربة الحجز والطلب",
          caption:
            "يحوّل مسار الطلب اختيار الصوص والموعد والكمية والدفع إلى رحلة حجز هادئة ومصقولة.",
        },
        {
          title: "تشيزكيك بصوص الشوكولاتة",
          caption: "لحظة منتج غنية تبرز اختيار صوص الشوكولاتة عبر تصوير قريب وواجهة طلب واضحة.",
        },
        {
          title: "عرض التغليف",
          caption: "يقدم التغليف الكيكة كهدية، حيث يجتمع الصندوق وعبوة الصوص والمنتج في طقس مدروس.",
        },
        {
          title: "صُنعت للحظات تُحفظ في الذاكرة",
          caption:
            "قسم تحريري يضع مدريد تشيزكيك كمركز هادئ للهدايا واللقاءات والأمسيات التي تستحق البقاء.",
        },
        {
          title: "تُقدّم قبل أن تُفتح",
          caption: "لحظة الإهداء تؤكد الترقب والحرفة والشعور الفاخر قبل أول قطعة.",
        },
        {
          title: "التواصل والختام",
          caption: "يختتم القسم الأخير التجربة بتفاصيل التواصل وحضور العلامة ولحظة نهائية مصقولة.",
        },
      ],
      reflection:
        "يجمع Tarta De Amor بين التوجيه الإبداعي، تصميم الموقع، تجربة وواجهة المستخدم، حرفة الواجهة، وانترو سينمائي من Tarik Bamarouf، ليصنع تجربة طلب رقمية فاخرة لعلامة تشيزكيك في جدة.",
    },
  },
  "mahn-platform": {
    en: {
      category: "Employment Platform / UX/UI Experience",
      disciplines: "Employment UX/UI, Candidate Experience, Operations",
      intro:
        "A Saudi employment and operations platform shaped around job discovery, candidate onboarding, and clear management workflows.",
      details: {
        industry: "Employment Technology",
        services: "UX/UI Design, Candidate Experience, Operations Interface, Front-end Experience",
        platform: "Employment and Operations Platform",
      },
      overview: {
        challenge:
          "Mihn needed to connect job seekers with opportunities while keeping profiles, applications, reviews, onboarding, and operational management clear across one platform.",
        approach:
          "The experience was organized around job discovery, candidate profiles, application review, candidate and operator dashboards, management workflows, and a direct authentication journey.",
        outcome:
          "The final interface gives candidates and operating teams distinct, readable paths through the employment experience.",
      },
      gallery: [
        {
          title: "Introduction",
          caption:
            "A clear introduction to the employment platform, its audience, and the candidate journey.",
        },
        {
          title: "Candidate Dashboard",
          caption:
            "Profile, job discovery, applications, and onboarding actions organized in one candidate view.",
        },
        {
          title: "Operator and Admin Dashboard",
          caption: "Candidate review and management workflows structured for daily operations.",
        },
        {
          title: "Platform Operations",
          caption:
            "Operational views for managing candidates, roles, reviews, and platform activity.",
        },
        {
          title: "Authentication Experience",
          caption:
            "A direct sign-in flow that guides candidates and operating teams to the right workspace.",
        },
      ],
      reflection:
        "Mihn brings candidate experience, employment discovery, onboarding, and operational management into one focused UX/UI system.",
    },
    ar: {
      category: "منصة توظيف وتجربة مستخدم",
      disciplines: "تجربة التوظيف، تجربة المرشح، واجهات التشغيل",
      intro:
        "منصة سعودية للتوظيف والتشغيل صُممت لاكتشاف الفرص، تهيئة المرشحين، وإدارة العمل بوضوح.",
      details: {
        industry: "تقنيات التوظيف",
        services: "تصميم تجربة وواجهة المستخدم، تجربة المرشح، واجهات التشغيل، حرفة الواجهة",
        platform: "منصة توظيف وتشغيل",
      },
      overview: {
        challenge:
          "احتاجت Mihn إلى ربط الباحثين عن عمل بالفرص، مع تنظيم الملفات، الطلبات، المراجعات، التهيئة، والإدارة التشغيلية داخل منصة واحدة.",
        approach:
          "نُظمت التجربة حول اكتشاف الوظائف، ملفات المرشحين، مراجعة الطلبات، لوحات المرشح والمشغل، مسارات الإدارة، وتجربة دخول مباشرة.",
        outcome:
          "تمنح الواجهة النهائية المرشحين وفرق التشغيل مسارات واضحة ومتمايزة عبر تجربة التوظيف.",
      },
      gallery: [
        { title: "المقدمة", caption: "تعريف واضح بمنصة التوظيف، جمهورها، ورحلة المرشح." },
        {
          title: "لوحة المرشح",
          caption: "الملف، اكتشاف الوظائف، الطلبات، وخطوات التهيئة ضمن واجهة واحدة.",
        },
        {
          title: "لوحة المشغل والإدارة",
          caption: "مراجعة المرشحين ومسارات الإدارة منظمة للعمل التشغيلي اليومي.",
        },
        {
          title: "تشغيل المنصة",
          caption: "واجهات لإدارة المرشحين، الوظائف، المراجعات، ونشاط المنصة.",
        },
        {
          title: "تجربة تسجيل الدخول",
          caption: "مسار مباشر يوجه المرشحين وفرق التشغيل إلى مساحة العمل المناسبة.",
        },
      ],
      reflection:
        "تجمع Mihn تجربة المرشح، اكتشاف الفرص، التهيئة، والإدارة التشغيلية داخل نظام تجربة وواجهة واحد.",
    },
  },
  "norx-paints": {
    en: {
      category: "Brand Identity and Website Experience",
      disciplines: "Naming, Identity, Website",
      intro:
        "A visual identity and website experience shaped around premium presence, color, and customer trust.",
      details: {
        industry: "Interiors and Coatings",
        services: "Naming, Brand Identity, Visual Direction, Website Design and Front-end Craft",
        platform: "Brand Identity and Website Experience",
      },
      overview: {
        challenge:
          "NOORIX was created from the name outward: visual identity, digital direction, and a website experience that makes the coatings brand feel distinctive, premium, and easy to trust.",
        approach:
          "The brand world was shaped through premium editorial layouts, refined color language, product presentation, environmental applications, and a website experience that connects identity with customer-facing storytelling.",
        outcome:
          "The final website brings the identity together through product storytelling, interior atmosphere, color exploration, transformation moments, and polished brand applications.",
      },
      gallery: [
        {
          title: "Website Experience",
          caption:
            "A refined digital entry point presenting NOORIX through premium positioning and a clear brand promise.",
        },
        {
          title: "Brand Positioning",
          caption:
            "A strategic brand narrative establishing NOORIX as a premium design-led standard in coatings.",
        },
        {
          title: "Brand Applications",
          caption:
            "Interior applications show how the identity extends into real spaces and customer touchpoints.",
        },
        {
          title: "Premium Spaces",
          caption:
            "Curated spatial imagery demonstrates the brand visual language across hospitality and residential environments.",
        },
        {
          title: "Visual System",
          caption:
            "A cinematic color experience translates the palette into mood, material, and interior atmosphere.",
        },
        {
          title: "Product Spectrum",
          caption:
            "A product range section introduces premium coatings through editorial layout and refined presentation.",
        },
        {
          title: "Palette Collection",
          caption:
            "The color library organizes signature shades, finishes, and families into a calm way to explore the range.",
        },
        {
          title: "Color Trend Report",
          caption:
            "A trend-led editorial view connects the NOORIX palette to interiors, architecture, and the 2026 visual direction.",
        },
        {
          title: "Transformation Story",
          caption:
            "Transformation presentation highlights the practical impact of the brand coatings and visual direction.",
        },
        {
          title: "Final Brand Presentation",
          caption:
            "A closing origin-led visual reinforces scale, presence, and the Saudi-rooted identity.",
        },
      ],
      reflection:
        "The final outcome gives NOORIX a memorable identity, a refined website, and a digital presence built around color, texture, trust, and visual clarity.",
    },
    ar: {
      category: "هوية تجارية وتجربة موقع",
      disciplines: "تسمية، هوية، موقع",
      intro: "هوية بصرية وتجربة موقع مصاغة حول الحضور الراقي واللون وثقة العميل.",
      details: {
        industry: "التصميم الداخلي والطلاء",
        services: "تسمية، هوية تجارية، توجيه بصري، تصميم الموقع، وحرفة الواجهة",
        platform: "هوية تجارية وتجربة موقع",
      },
      overview: {
        challenge:
          "بُنيت NOORIX من الاسم إلى الهوية البصرية والتوجه الرقمي وتجربة الموقع، لتبدو علامة طلاء مميزة وراقية وسهلة الثقة.",
        approach:
          "تشكّل عالم العلامة عبر تخطيطات تحريرية راقية، لغة لونية مصقولة، عرض للمنتج، تطبيقات مكانية، وتجربة موقع تربط الهوية بالسرد الموجه للعميل.",
        outcome:
          "يجمع الموقع الهوية عبر سرد المنتج، أجواء المساحات، استكشاف اللون، لحظات التحول، والتطبيقات النهائية.",
      },
      gallery: [
        { title: "تجربة الموقع", caption: "مدخل رقمي مصقول يقدم NOORIX بتموضع فاخر ووعد واضح." },
        { title: "تموضع العلامة", caption: "سرد استراتيجي يضع NOORIX كمعيار راق في عالم الطلاء." },
        {
          title: "تطبيقات العلامة",
          caption: "تُظهر التطبيقات المكانية امتداد الهوية إلى المساحات ونقاط التفاعل.",
        },
        {
          title: "مساحات فاخرة",
          caption: "صور مكانية مختارة توضح لغة العلامة في البيئات السكنية والضيافة.",
        },
        {
          title: "النظام البصري",
          caption: "تجربة لونية سينمائية تترجم اللوحة إلى مزاج وملمس وأجواء داخلية.",
        },
        {
          title: "نطاق المنتجات",
          caption: "قسم يعرض الطلاء الفاخر بتخطيط تحريري وتقديم مصقول.",
        },
        {
          title: "مجموعة الألوان",
          caption: "مكتبة تنظّم الدرجات والتشطيبات والعائلات اللونية بطريقة هادئة وواضحة.",
        },
        {
          title: "تقرير اتجاهات اللون",
          caption: "عرض تحريري يربط لوحة NOORIX بالمساحات والعمارة والاتجاه البصري لعام ٢٠٢٦.",
        },
        { title: "قصة التحول", caption: "عرض التحول يبرز الأثر العملي للطلاء والاتجاه البصري." },
        {
          title: "العرض النهائي للعلامة",
          caption: "مشهد ختامي مرتبط بالأصل يعزز الحضور والهوية ذات الجذور السعودية.",
        },
      ],
      reflection:
        "منحت النتيجة NOORIX هوية لا تُنسى، وموقعًا مصقولًا، وحضورًا رقميًا مبنيًا على اللون والملمس والثقة والوضوح.",
    },
  },
  "pikmon-store": {
    en: {
      category: "Collectibles E-Commerce Experience",
      disciplines: "Identity, Commerce, User Experience",
      intro:
        "A Pokémon-inspired e-commerce experience for collectors, merchandise, customization, and playful brand moments.",
      details: {
        industry: "Collectibles and E-Commerce",
        services:
          "Brand Creation, Naming, Brand Strategy, Visual Identity, Logo Design, User Experience Design, Product Experience and Website Development",
        platform: "E-Commerce Website",
      },
      overview: {
        challenge:
          "Pokémon SA needed to feel like a destination for collectors, not a standard online store. The work shaped the name, identity, UX/UI, product presentation, and the full e-commerce website experience.",
        approach:
          "The design brought trading cards, sealed products, apparel, collectibles, rewards, and customization into one vivid shopping journey inspired by the Pokémon universe.",
        outcome:
          "The final website makes browsing, buying, discovery, and customization feel playful, organized, and made for collectors in Saudi Arabia.",
      },
      gallery: [
        {
          title: "Brand Experience",
          caption:
            "The homepage establishes Pokémon SA as a complete collector destination with immersive visuals, clear product pathways, and a dedicated commerce journey for fans.",
        },
        {
          title: "Logo and Identity",
          caption:
            "A focused brand moment introduces the identity and visual language before the experience expands into products and community features.",
        },
        {
          title: "Trading Cards",
          caption:
            "Individual card listings give collectors clear rarity cues, product photography, pricing, and fast purchase actions.",
        },
        {
          title: "Sealed Products",
          caption:
            "Booster packs and sealed boxes are presented with premium cards, strong hierarchy, and product details that support confident purchasing.",
        },
        {
          title: "Collectibles",
          caption:
            "The collectibles section extends the store beyond cards with character-based products that keep the Pokémon world present across the catalogue.",
        },
        {
          title: "Merchandise",
          caption:
            "Magnets and accessible collectibles create easy entry points for fans while keeping the product grid visually consistent.",
        },
        {
          title: "Apparel",
          caption:
            "Apparel product pages introduce trainer merchandise with color, size, pricing, and cart interactions built for everyday commerce.",
        },
        {
          title: "Layered Apparel",
          caption:
            "The hoodie collection expands the merchandise presentation with richer product detail, sizing guidance, and premium apparel options.",
        },
        {
          title: "Custom Product Builder",
          caption:
            "The customization studio lets collectors build personalized apparel by choosing garments, characters, colors, text, and reference uploads.",
        },
        {
          title: "Community and Gamification",
          caption:
            "Reward moments and subscription prompts make the store feel participatory, with challenges, codes, and community touchpoints.",
        },
        {
          title: "Rare Collector Marketplace",
          caption:
            "The rare desk creates a specialized intake flow for rare cards, sealed products, consignment, authenticity review, and collector requests.",
        },
      ],
      reflection:
        "Pokémon SA demonstrates brand creation, UX/UI, e-commerce design, visual storytelling, customization, and front-end craft in one immersive collector website.",
    },
    ar: {
      category: "تجربة تجارة إلكترونية للمقتنيات",
      disciplines: "هوية، تجارة، تجربة مستخدم",
      intro:
        "تجربة تجارة إلكترونية مستوحاة من عالم Pokémon، تجمع المقتنيات والتخصيص ولحظات العلامة المرحة.",
      details: {
        industry: "المقتنيات والتجارة الإلكترونية",
        services:
          "إنشاء العلامة، التسمية، استراتيجية العلامة، الهوية البصرية، تصميم الشعار، تجربة المستخدم، تجربة المنتج، وتطوير الموقع",
        platform: "موقع تجارة إلكترونية",
      },
      overview: {
        challenge:
          "احتاجت Pokémon SA أن تشعر كوجهة لهواة الجمع، لا كمتجر عادي. شمل العمل التسمية، الهوية، تجربة وواجهة المستخدم، عرض المنتجات، وتجربة المتجر الإلكتروني بالكامل.",
        approach:
          "جمع التصميم البطاقات، المنتجات المختومة، الملابس، المقتنيات، المكافآت، والتخصيص داخل رحلة شراء نابضة بعالم Pokémon.",
        outcome:
          "يجعل الموقع التصفح والشراء والاكتشاف والتخصيص تجربة مرحة ومنظمة ومصممة لهواة الجمع في السعودية.",
      },
      gallery: [
        {
          title: "تجربة العلامة",
          caption:
            "تقدم الصفحة الرئيسية Pokémon SA كوجهة شاملة لهواة الجمع، مع مسارات منتجات واضحة وتجربة تجارة مشوقة.",
        },
        {
          title: "الشعار والهوية",
          caption: "لحظة تعريفية مركزة تكشف الهوية قبل الانتقال إلى المنتجات والمجتمع.",
        },
        {
          title: "بطاقات التداول",
          caption:
            "قوائم بطاقات واضحة لهواة الجمع مع إشارات الندرة والصور والأسعار وإجراءات الشراء.",
        },
        {
          title: "المنتجات المختومة",
          caption: "عرض للصناديق والحزم ببطاقات قوية وتسلسل معلومات يدعم الشراء بثقة.",
        },
        { title: "المقتنيات", caption: "قسم يوسّع المتجر إلى منتجات شخصية مرتبطة بعالم Pokémon." },
        {
          title: "منتجات يومية",
          caption: "مقتنيات مغناطيسية ومنتجات سهلة الوصول مع اتساق بصري في الشبكة.",
        },
        {
          title: "الملابس",
          caption: "صفحات منتجات للمدربين مع ألوان ومقاسات وأسعار وتفاعل شراء واضح.",
        },
        {
          title: "الكنزات والطبقات",
          caption: "توسيع لعرض الملابس مع تفاصيل أغنى للمنتج ودليل مقاسات وخيارات أعلى قيمة.",
        },
        {
          title: "منشئ المنتجات المخصصة",
          caption: "استوديو تخصيص يسمح باختيار القطعة والشخصية واللون والنص والمرجع.",
        },
        {
          title: "المجتمع والتحفيز",
          caption: "لحظات مكافآت وتحديات واشتراك تجعل المتجر مساحة مشاركة لا مجرد واجهة بيع.",
        },
        {
          title: "سوق القطع النادرة",
          caption: "مسار مخصص للبطاقات والمنتجات النادرة، مع مراجعة الأصالة وطلبات الهواة.",
        },
      ],
      reflection:
        "تقدم Pokémon SA إنشاء علامة، تجربة وواجهة مستخدم، تصميم تجارة إلكترونية، سردًا بصريًا، تخصيصًا، وحرفة واجهة داخل موقع غامر لهواة الجمع.",
    },
  },
  "lily-home-spa": {
    en: {
      category: "Luxury Wellness Experience",
      disciplines: "Brand, Website",
      intro:
        "A private luxury wellness experience designed around discretion, ritual, atmosphere, and in-home spa services.",
      details: {
        industry: "Luxury Wellness",
        services: "Website Design and Development",
        platform: "Luxury Wellness Website",
      },
      overview: {
        challenge:
          "Lilly Breeze is a premium wellness brand focused on bringing refined spa experiences directly into private residences. The digital experience was designed to communicate calm, privacy, luxury, and ritual through elegant layouts, restrained typography, and immersive visual storytelling.",
        approach:
          "The project page presents the experience as a quiet sequence: arrival, promise, philosophy, rituals, visual atmosphere, and invitation. Each image shows how the brand moves from private service positioning into tactile wellness details.",
        outcome:
          "The final website feels intimate and composed, framing Lilly Breeze as a private luxury wellness destination through calm storytelling and a clear visual rhythm.",
      },
      gallery: [
        {
          title: "Private Arrival",
          caption:
            "The opening moment establishes Lilly Breeze as an in-home spa experience brought quietly to the client.",
        },
        {
          title: "The House",
          caption:
            "A calm introductory chapter defines the feeling of a spa assembled around the privacy of the home.",
        },
        {
          title: "The Philosophy",
          caption:
            "The brand language centers discretion, ritual, and composition as the foundations of the service.",
        },
        {
          title: "The Promise",
          caption:
            "A cinematic promise section reinforces the central idea that the client will not have to leave.",
        },
        {
          title: "The Rituals",
          caption:
            "The rituals page organizes service options with restrained typography and a composed editorial rhythm.",
        },
        {
          title: "Visual Atmosphere",
          caption:
            "A visual gallery gathers massage, oils, interiors, and sensory details into one immersive brand world.",
        },
        {
          title: "House Fragments",
          caption:
            "Editorial imagery and founder note styling add intimacy, texture, and a quieter sense of luxury.",
        },
        {
          title: "Invitation",
          caption:
            "The booking moment is treated as a private invitation, maintaining the same calm and discreet tone.",
        },
      ],
      reflection:
        "The final experience positions Lilly Breeze as a sophisticated luxury wellness brand, combining private hospitality, refined rituals, and premium digital storytelling into a calm and memorable online experience.",
    },
    ar: {
      category: "تجربة عافية فاخرة",
      disciplines: "علامة، موقع",
      intro:
        "تجربة عافية خاصة وفاخرة صُممت حول الخصوصية والطقوس والأجواء وخدمات السبا داخل المنزل.",
      details: {
        industry: "العافية الفاخرة",
        services: "تصميم وتطوير الموقع",
        platform: "موقع عافية فاخر",
      },
      overview: {
        challenge:
          "تركز Lilly Breeze على تقديم تجربة سبا مصقولة داخل المساكن الخاصة. صُممت التجربة الرقمية للتعبير عن الهدوء والخصوصية والفخامة والطقوس عبر تخطيطات أنيقة وخط رصين وسرد بصري غامر.",
        approach:
          "تُعرض التجربة كتسلسل هادئ: الوصول، الوعد، الفلسفة، الطقوس، الأجواء البصرية، والدعوة. كل صورة توضّح انتقال العلامة من خدمة خاصة إلى تفاصيل عافية حسية.",
        outcome:
          "يشعر الموقع النهائي بالحميمية والاتزان، ويقدم Lilly Breeze كوجهة عافية خاصة وفاخرة من خلال سرد هادئ وإيقاع بصري واضح.",
      },
      gallery: [
        {
          title: "الوصول الخاص",
          caption: "لحظة افتتاحية تقدم Lilly Breeze كتجربة سبا تصل إلى العميل بهدوء.",
        },
        {
          title: "البيت",
          caption: "فصل تمهيدي هادئ يعرّف شعور السبا حين يُعاد تشكيله داخل خصوصية المنزل.",
        },
        {
          title: "الفلسفة",
          caption: "لغة العلامة تتمحور حول الخصوصية والطقوس والتكوين كأساس للخدمة.",
        },
        {
          title: "الوعد",
          caption: "قسم سينمائي يعزز الفكرة الأساسية: لن يضطر العميل إلى المغادرة.",
        },
        { title: "الطقوس", caption: "تنظيم خدمات العافية بإيقاع تحريري وخط رصين." },
        {
          title: "الأجواء البصرية",
          caption: "معرض يجمع اللمس والزيوت والمساحات الداخلية والتفاصيل الحسية في عالم واحد.",
        },
        {
          title: "تفاصيل البيت",
          caption: "صور تحريرية ونبرة مذكرات تضيف حميمية وملمسًا وهدوءًا فاخرًا.",
        },
        { title: "الدعوة", caption: "لحظة الحجز تُعامل كدعوة خاصة بنفس النبرة الهادئة والسرية." },
      ],
      reflection:
        "تضع التجربة النهائية Lilly Breeze كعلامة عافية فاخرة وراقية، تجمع الضيافة الخاصة والطقوس المصقولة والسرد الرقمي الراقي في تجربة هادئة ولا تُنسى.",
    },
  },
  sip: {
    en: {
      category: "Saudi Beverage Brand",
      disciplines: "Naming, Identity, Website",
      intro:
        "A Saudi beverage brand developed from the ground up, spanning naming, identity, visual direction, digital presence, and website experience.",
      details: {
        industry: "Beverage",
        services: "Naming, Brand Identity, Website Design and Development",
        platform: "Beverage Brand",
      },
      overview: {
        challenge:
          "SIP is a Saudi beverage brand developed from the ground up, including naming, brand identity, visual direction, digital presence, and website experience. The work focused on a modern beverage brand with strong visual personality, clear positioning, and a memorable brand world.",
        approach:
          "The visual identity was built around bold typography, high-contrast product presentation, flavor-led packaging, and a dark digital environment that lets the cans, naming, and attitude carry the experience.",
        outcome:
          "The website and brand applications present SIP as a confident Saudi beverage brand with a clear product family, recognizable visual language, and a digital presence designed for launch and long-term recognition.",
      },
      gallery: [
        {
          title: "Brand Experience",
          caption:
            "A cinematic landing moment introduces SIP with a confident Saudi beverage identity and a strong product-led presence.",
        },
        {
          title: "Product Lineup",
          caption:
            "The full beverage range is presented as a focused product family built around taste, energy, and zero-sugar options.",
        },
        {
          title: "Zero Range",
          caption:
            "The zero-sugar family extends the SIP identity into a cleaner product expression while preserving the same bold presence.",
        },
        {
          title: "Brand Story",
          caption:
            "A Saudi origin chapter connects the brand to clarity, confidence, and a distinctive visual point of view.",
        },
        {
          title: "Product Cards",
          caption:
            "Product cards translate the packaging into a polished website experience for browsing the full range.",
        },
      ],
      reflection:
        "The final outcome established SIP as a distinctive Saudi beverage brand with a memorable visual language and a premium digital presence built for recognition.",
    },
    ar: {
      category: "علامة مشروبات سعودية",
      disciplines: "تسمية، هوية، موقع",
      intro:
        "علامة مشروبات سعودية بُنيت من الصفر، من التسمية والهوية إلى التوجه البصري والحضور الرقمي وتجربة الموقع.",
      details: {
        industry: "المشروبات",
        services: "تسمية، هوية تجارية، تصميم وتطوير الموقع",
        platform: "علامة مشروبات",
      },
      overview: {
        challenge:
          "طُورت SIP كعلامة مشروبات سعودية من الصفر، بما يشمل التسمية والهوية والتوجه البصري والحضور الرقمي وتجربة الموقع. ركز المشروع على بناء علامة حديثة وسهلة التذكر ذات شخصية بصرية قوية وتموضع واضح.",
        approach:
          "بُنيت الهوية حول خط جريء، عرض منتج عالي التباين، تغليف يتمحور حول النكهات، وبيئة رقمية داكنة تمنح العبوات والاسم والموقف البصري مساحة القيادة.",
        outcome:
          "يقدم الموقع وتطبيقات العلامة SIP كعلامة سعودية واثقة ذات عائلة منتجات واضحة ولغة بصرية قابلة للتعرف وحضور رقمي مصمم للإطلاق والنمو.",
      },
      gallery: [
        {
          title: "تجربة العلامة",
          caption:
            "لحظة افتتاحية سينمائية تقدم SIP بهوية مشروبات سعودية واثقة وحضور واضح يقوده المنتج.",
        },
        {
          title: "تشكيلة المنتجات",
          caption: "عرض مركز لعائلة المشروبات مبني حول النكهات والطاقة وخيارات خالية من السكر.",
        },
        {
          title: "مجموعة خالية من السكر",
          caption:
            "تمتد المجموعة الخالية من السكر بهوية SIP إلى تعبير أنظف مع الحفاظ على الحضور الجريء نفسه.",
        },
        {
          title: "قصة العلامة",
          caption: "فصل سعودي المنشأ يربط العلامة بالوضوح والثقة والاتجاه البصري المميز.",
        },
        {
          title: "بطاقات المنتجات",
          caption: "بطاقات رقمية تترجم التغليف إلى تجربة موقع مصقولة لتصفح المجموعة الكاملة.",
        },
      ],
      reflection:
        "رسخت النتيجة SIP كعلامة مشروبات سعودية مميزة، بلغة بصرية واضحة وحضور رقمي فاخر مصمم للتميّز.",
    },
  },
  jorof: {
    en: {
      category: "Brand Identity, Creative Direction, UX/UI, Website Design",
      disciplines: "Identity, UX/UI, Website",
      intro:
        "A modern Saudi bottled water brand transformed from an existing logo into a complete digital brand experience.",
      details: {
        industry: "Bottled Water",
        services:
          "Creative Direction, Visual Identity, UX/UI Design, Website Design, Front-end Experience",
        platform: "Brand Identity and Website Experience",
      },
      overview: {
        challenge:
          "JOROF is a Saudi bottled water brand. The logo already existed, and the work expanded it into a clear visual direction, refined UX/UI, and a complete website experience.",
        approach:
          "The work focused on clarity, trust, quality, and daily reliability, translating the existing mark into a calm Saudi water brand with product presentation, manufacturing storytelling, and a clear inquiry path.",
        outcome:
          "The final experience presents JOROF as a clean and reliable bottled water brand, connecting origin, product range, manufacturing standards, quality controls, and conversion-focused contact moments into one cohesive website.",
      },
      gallery: [
        {
          title: "Brand Introduction",
          caption:
            "A soft opening moment frames the existing JOROF logo with purity, source, and calm before the full website experience begins.",
        },
        {
          title: "Hero Experience",
          caption:
            "The homepage hero establishes the brand promise through clear Arabic messaging, fresh natural imagery, and direct product discovery actions.",
        },
        {
          title: "Brand Story",
          caption:
            "The brand story section turns the logo into a wider identity, connecting Saudi origin, quality, and daily trust.",
        },
        {
          title: "Product Range",
          caption:
            "The product presentation organizes bottle formats with clean hierarchy, soft gradients, and clear purchase cues.",
        },
        {
          title: "Manufacturing Storytelling",
          caption:
            "The factory section explains capacity, distribution, and process credibility through structured content and a calm industrial visual language.",
        },
        {
          title: "Quality Assurance",
          caption:
            "Quality communication is presented through inspection, filtration, and standards focused messaging that reinforces trust and consistency.",
        },
        {
          title: "Customer Journey",
          caption:
            "The acquisition flow supports residential and business customers with clear pathways, practical ordering context, and reassuring service cues.",
        },
        {
          title: "Conversion Experience",
          caption:
            "The final contact section completes the journey with a focused inquiry flow designed to turn brand interest into customer action.",
        },
      ],
      reflection:
        "JOROF transformed an existing logo into a complete digital brand presence through visual direction, UX/UI, product presentation, manufacturing storytelling, and a clear inquiry journey.",
    },
    ar: {
      category: "هوية تجارية، توجيه إبداعي، تجربة وواجهة، تصميم موقع",
      disciplines: "هوية، تجربة وواجهة، موقع",
      intro: "علامة مياه سعودية حديثة تحولت من شعار قائم إلى تجربة رقمية متكاملة للعلامة.",
      details: {
        industry: "المياه المعبأة",
        services: "توجيه إبداعي، هوية بصرية، تجربة وواجهة المستخدم، تصميم الموقع، وحرفة الواجهة",
        platform: "هوية تجارية وتجربة موقع",
      },
      overview: {
        challenge:
          "JOROF علامة مياه سعودية كان لديها شعار قائم، وتحوّل العمل إلى اتجاه بصري واضح، تجربة وواجهة مصقولة، وموقع متكامل.",
        approach:
          "ركز العمل على الوضوح والثقة والجودة والاعتمادية اليومية، مع تحويل الشعار إلى علامة مياه سعودية هادئة من خلال عرض المنتج وسرد التصنيع ومسار تواصل واضح.",
        outcome:
          "تقدم التجربة النهائية JOROF كعلامة مياه نظيفة وموثوقة، تربط الأصل ونطاق المنتجات ومعايير التصنيع والجودة ولحظات التواصل داخل موقع واحد متماسك.",
      },
      gallery: [
        {
          title: "مقدمة العلامة",
          caption: "افتتاح ناعم يضع شعار JOROF في سياق النقاء والمصدر والهدوء.",
        },
        {
          title: "الواجهة الرئيسية",
          caption:
            "تؤسس الصفحة الرئيسية وعد العلامة برسالة عربية واضحة وصورة طبيعية منعشة ومسارات اكتشاف مباشرة.",
        },
        {
          title: "قصة العلامة",
          caption: "قسم يحوّل الشعار إلى هوية أوسع تربط الأصل السعودي والجودة والثقة اليومية.",
        },
        {
          title: "نطاق المنتجات",
          caption: "عرض للعبوات بأحجام مختلفة مع هرمية واضحة ومعلومات موجهة للشراء.",
        },
        {
          title: "سرد التصنيع",
          caption: "قسم المصنع يشرح القدرة والتوزيع والعملية بلغة بصرية صناعية هادئة.",
        },
        {
          title: "ضمان الجودة",
          caption: "تُعرض الجودة عبر التفتيش والترشيح والمعايير، لتعزيز الثقة والثبات.",
        },
        {
          title: "رحلة العميل",
          caption: "مسار يخدم العملاء السكنيين والتجاريين بخيارات واضحة وسياق طلب عملي.",
        },
        {
          title: "دعوة التواصل",
          caption: "قسم التواصل الأخير يختصر الاهتمام بالعلامة إلى خطوة استفسار واضحة.",
        },
      ],
      reflection:
        "حوّلت JOROF شعارًا قائمًا إلى حضور رقمي متكامل عبر التوجيه البصري، تجربة وواجهة المستخدم، عرض المنتج، سرد التصنيع، ومسار تواصل واضح.",
    },
  },
  pakman: {
    en: {
      category: "Brand Identity, Website Design, Art Direction",
      disciplines: "Identity, Packaging, Website",
      intro:
        "A Saudi restaurant packaging brand shaped through identity, packaging direction, and a clear website experience.",
      details: {
        industry: "Restaurant Packaging",
        services:
          "Logo, Brand Identity, Visual Direction, Packaging Concept, Website Design, User Interface Direction, Art Direction",
        platform: "Packaging Brand Website",
      },
      overview: {
        challenge:
          "Pakman is a Saudi restaurant packaging company providing complete packaging solutions for restaurants, cafés, bakeries, catering companies, cloud kitchens, and food brands.",
        approach:
          "The project was built from start to finish, covering the logo, brand identity, visual direction, packaging concept, website design, user interface direction, and art direction.",
        outcome:
          "The final website presents Pakman as a confident packaging brand, connecting product categories, applications, client trust, location, and quote inquiry in one clear journey.",
      },
      gallery: [
        {
          title: "Website Hero",
          caption:
            "The opening website visual introduces Pakman as a premium packaging partner for restaurants and cafés.",
        },
        {
          title: "Product Categories",
          caption:
            "A clear product catalogue organizes cups, bags, boxes, labels, and food service essentials for easy browsing.",
        },
        {
          title: "About Pakman",
          caption:
            "The about section connects Pakman’s Saudi packaging expertise with its focus on hospitality and food businesses.",
        },
        {
          title: "Food Business Segments",
          caption:
            "Segment cards show how the packaging offer adapts to restaurants, cafés, bakeries, catering, cloud kitchens, and food brands.",
        },
        {
          title: "Packaging Gallery",
          caption:
            "A visual gallery presents packaging applications across cups, cutlery, boxes, and takeaway solutions.",
        },
        {
          title: "Trusted Food Brands",
          caption:
            "Client references show how the packaging supports restaurants, cafés, and food brands in daily use.",
        },
        {
          title: "Why Pakman",
          caption:
            "A benefit-led section clarifies supply, branding, materials, flexibility, finishing, delivery, and support.",
        },
        {
          title: "Headquarters and Contact",
          caption:
            "A location-led contact section grounds Pakman in Jeddah and gives customers a clear next step.",
        },
        {
          title: "Quote Form",
          caption:
            "The quote flow collects the information needed to guide packaging selection and production planning.",
        },
        {
          title: "Final Brand View",
          caption:
            "The closing footer keeps the brand presence simple, structured, and easy to contact.",
        },
      ],
      reflection:
        "Pakman becomes a clear digital presence for a Saudi restaurant packaging brand, combining identity, packaging direction, website design, UX/UI, and art direction.",
    },
    ar: {
      category: "هوية تجارية، تصميم موقع، توجيه فني",
      disciplines: "هوية، تغليف، موقع",
      intro: "شركة سعودية لتغليف المطاعم صيغت كهوية متكاملة وتجربة موقع واضحة لقطاع الأغذية.",
      details: {
        industry: "تغليف المطاعم",
        services:
          "شعار، هوية تجارية، توجيه بصري، مفهوم التغليف، تصميم الموقع، تصميم الواجهة، توجيه فني",
        platform: "موقع لعلامة تغليف",
      },
      overview: {
        challenge:
          "Pakman شركة سعودية لتغليف المطاعم تقدم حلول تغليف متكاملة للمطاعم والمقاهي والمخابز وشركات الضيافة والمطابخ السحابية وعلامات الأغذية.",
        approach:
          "تم بناء المشروع من البداية إلى النهاية، من الشعار والهوية والتوجه البصري إلى مفهوم التغليف وتصميم الموقع وتصميم الواجهة والتوجيه الفني.",
        outcome:
          "يقدم الموقع Pakman كعلامة تغليف واثقة، تربط فئات المنتجات والتطبيقات وثقة العملاء والمقر وطلب عرض السعر في رحلة واضحة.",
      },
      gallery: [
        {
          title: "واجهة الموقع",
          caption: "يفتتح الموقع تجربة Pakman كشريك تغليف مميز للمطاعم والمقاهي.",
        },
        {
          title: "فئات المنتجات",
          caption:
            "كتالوج واضح يجمع الأكواب والأكياس والصناديق والملصقات واحتياجات خدمة الطعام لتصفح سهل.",
        },
        {
          title: "عن Pakman",
          caption: "قسم تعريفي يربط خبرة Pakman السعودية في التغليف بقطاع الضيافة والأغذية.",
        },
        {
          title: "قطاعات الأعمال الغذائية",
          caption:
            "بطاقات توضح امتداد حلول التغليف للمطاعم والمقاهي والمخابز والتموين والمطابخ السحابية وعلامات الأغذية.",
        },
        {
          title: "معرض التغليف",
          caption:
            "معرض بصري يعرض تطبيقات التغليف عبر الأكواب وأدوات الطعام والصناديق وحلول الطلبات الخارجية.",
        },
        {
          title: "علامات موثوقة",
          caption:
            "مراجع العملاء تبرز حضور التغليف داخل المطاعم والمقاهي وعلامات الأغذية في الاستخدام اليومي.",
        },
        {
          title: "لماذا Pakman",
          caption: "قسم يوضح التوريد والهوية والمواد والكميات والتشطيب والتوصيل والدعم.",
        },
        {
          title: "المقر والتواصل",
          caption: "قسم تواصل مرتبط بالموقع يثبت حضور Pakman في جدة ويمنح العميل خطوة واضحة.",
        },
        {
          title: "طلب عرض سعر",
          caption: "تدفق بسيط يجمع المعلومات اللازمة لتوجيه اختيار التغليف وتخطيط الإنتاج.",
        },
        {
          title: "الختام",
          caption: "ختام هادئ يحافظ على حضور العلامة بشكل واضح وسهل التواصل.",
        },
      ],
      reflection:
        "أصبحت Pakman حضورًا رقميًا واضحًا لعلامة تغليف مطاعم سعودية، يجمع الهوية وتوجيه التغليف وتصميم الموقع وتجربة الواجهة والتوجيه الفني.",
    },
  },
  "circle-section": {
    en: {
      category:
        "Brand Identity, UX/UI Design, Web Design, Front-end Development, Content Direction",
      disciplines: "Brand Identity, UX/UI, Web Design, Front-end Development",
      intro:
        "A premium smash burger restaurant in Jeddah shaped into a bold website and digital brand presence.",
      details: {
        industry: "Restaurant / Smash Burger",
        services:
          "Brand Positioning, UX/UI Design, Content Direction, Website Design, Front-end Implementation, Menu Experience, Motion, Performance Optimization",
        platform: "Restaurant Brand Website",
      },
      overview: {
        challenge:
          "Circle Section is a premium smash burger restaurant in Jeddah. The objective was to transform the restaurant into a premium digital experience while preserving the personality of the brand.",
        approach:
          "The work covered brand positioning, UX/UI, content direction, responsive website design, front-end implementation, menu experience, motion, and performance refinement.",
        outcome:
          "The final experience turns the restaurant into a polished digital brand presence, connecting menu discovery, brand storytelling, mobile readiness, and clear contact moments into one cohesive journey.",
      },
      gallery: [
        {
          title: "Hero and Header Experience",
          caption:
            "The main website entry introduces Circle Section through a clear header, burger-led composition, and direct paths into the restaurant experience.",
        },
        {
          title: "Intro Brand Moment",
          caption:
            "A bold opening brand screen establishes the Circle Section identity before the visitor moves into the website.",
        },
        {
          title: "Flavor System",
          caption:
            "The visual language frames product photography, copy, and interface cards around the idea of a circular flavor experience.",
        },
        {
          title: "Menu Experience",
          caption:
            "The menu organizes burgers and categories with a light interface, clear item hierarchy, and an easy browsing rhythm.",
        },
        {
          title: "Menu Showcase",
          caption:
            "Food sections highlight sides and supporting products with strong imagery and structured product cards.",
        },
        {
          title: "Product Detail",
          caption:
            "Individual menu moments give each product space to feel distinct while keeping the same brand energy.",
        },
        {
          title: "Brand Reasons",
          caption:
            "A compact value section explains why guests return, pairing direct copy with a warm set of product-led cards.",
        },
        {
          title: "Dessert Detail",
          caption:
            "Dessert presentation extends the menu experience beyond burgers without losing the brand's playful personality.",
        },
        {
          title: "Story Section",
          caption:
            "The story chapter connects flavor, people, and place through restaurant context, brand copy, and atmospheric details.",
        },
        {
          title: "Big Flavor",
          caption:
            "A product-led storytelling section pairs burger imagery with bold editorial typography and focused brand messaging.",
        },
        {
          title: "In Circle We Trust",
          caption:
            "Brand trust is expressed through food photography, concise storytelling, and a relaxed restaurant tone.",
        },
        {
          title: "Delivery Experience",
          caption:
            "The delivery section turns ordering services into a branded moment with simple choices and strong orange presence.",
        },
        {
          title: "Contact Experience",
          caption:
            "The contact section combines location, opening hours, and direct action in a clean interface built for real visits.",
        },
        {
          title: "Final Brand View",
          caption:
            "The closing brand moment keeps the logo, color, and final action simple, memorable, and easy to recognize.",
        },
      ],
      reflection:
        "Circle Section became a premium restaurant website that combines brand clarity, menu discovery, responsive UX/UI, motion, and front-end craft while preserving the brand's personality.",
    },
    ar: {
      category: "هوية تجارية، تجربة مستخدم وواجهة، تصميم موقع، تطوير الواجهة، توجيه المحتوى",
      disciplines: "هوية تجارية، تجربة وواجهة، تصميم موقع، تطوير الواجهة",
      intro: "مطعم برجر متخصص في جدة صيغ كموقع جريء وحضور رقمي واضح للعلامة.",
      details: {
        industry: "مطعم / سماش برجر",
        services:
          "تموضع العلامة، تجربة وواجهة المستخدم، توجيه المحتوى، تصميم الموقع، تطوير الواجهة الأمامية، تجربة المنيو، الحركة، وتحسين الأداء",
        platform: "موقع لعلامة مطعم",
      },
      overview: {
        challenge:
          "Circle Section مطعم برجر متخصص في جدة. كان الهدف تقديم تجربة رقمية تعكس جودة العلامة وتبرز شخصية المطعم بأسلوب معاصر ومميز.",
        approach:
          "شمل العمل تموضع العلامة، تجربة وواجهة المستخدم، توجيه المحتوى، تصميم الموقع المتجاوب، تطوير الواجهة، تجربة المنيو، الحركة، وتحسين الأداء.",
        outcome:
          "حوّلت التجربة النهائية المطعم إلى حضور رقمي مصقول يربط اكتشاف المنيو، سرد العلامة، جاهزية الجوال، ولحظات التواصل داخل رحلة واحدة متماسكة.",
      },
      gallery: [
        {
          title: "واجهة الموقع والهيدر",
          caption:
            "تقدم الواجهة الرئيسية Circle Section من خلال هيدر واضح، تكوين بصري يقوده البرجر، ومسارات مباشرة داخل تجربة المطعم.",
        },
        {
          title: "لحظة الانترو",
          caption: "شاشة افتتاح جريئة تثبت هوية Circle Section قبل انتقال الزائر إلى تجربة الموقع.",
        },
        {
          title: "نظام النكهة",
          caption: "لغة بصرية تربط تصوير المنتجات والنصوص وبطاقات الواجهة حول فكرة دائرة النكهة.",
        },
        {
          title: "تجربة المنيو",
          caption: "ينظم المنيو البرجر والفئات بواجهة خفيفة، هرمية واضحة، وإيقاع تصفح سهل.",
        },
        {
          title: "عرض المنيو",
          caption: "تُبرز أقسام الطعام المنتجات الجانبية بصور قوية وبطاقات منظمة تدعم الاختيار.",
        },
        {
          title: "تفاصيل المنتج",
          caption: "تمنح لحظات المنتج مساحة خاصة لكل صنف مع الحفاظ على طاقة العلامة نفسها.",
        },
        {
          title: "أسباب العودة",
          caption: "قسم مختصر يشرح لماذا يعود الزوار، عبر نص مباشر وبطاقات دافئة تقودها المنتجات.",
        },
        {
          title: "تفاصيل الحلى",
          caption: "يمد عرض الحلى تجربة المنيو إلى ما بعد البرجر دون فقدان شخصية العلامة المرحة.",
        },
        {
          title: "قصة المكان",
          caption:
            "يربط فصل القصة النكهة والناس والمكان من خلال سياق المطعم ونبرة العلامة والتفاصيل البصرية.",
        },
        {
          title: "نكهة كبيرة",
          caption: "قسم سردي تقوده المنتجات، يجمع صور البرجر مع تايبوغرافي جريء ورسالة واضحة.",
        },
        {
          title: "الثقة بالدائرة",
          caption: "تُعبّر الثقة بالعلامة عبر تصوير الطعام، سرد مختصر، ونبرة مطعم قريبة من الناس.",
        },
        {
          title: "تجربة التوصيل",
          caption:
            "يحوّل قسم التوصيل خدمات الطلب إلى لحظة تحمل هوية العلامة بخيارات واضحة وحضور برتقالي قوي.",
        },
        {
          title: "تجربة التواصل",
          caption:
            "يجمع قسم التواصل الموقع، ساعات العمل، والدعوة لاتخاذ خطوة مباشرة داخل واجهة واضحة.",
        },
        {
          title: "الختام البصري",
          caption: "يحافظ ختام العلامة على الشعار واللون والدعوة الأخيرة بشكل بسيط وسهل التذكر.",
        },
      ],
      reflection:
        "أصبح Circle Section موقعًا فاخرًا لمطعم، يجمع وضوح العلامة، اكتشاف المنيو، تجربة وواجهة متجاوبة، الحركة، وحرفة الواجهة مع الحفاظ على شخصية العلامة.",
    },
  },
  "opal-stones": {
    en: {
      category:
        "Luxury Brand Identity, UX/UI Design, Website Design, Front-end Craft, Content Direction",
      disciplines: "Luxury Brand Identity, UX/UI, Website Design",
      intro:
        "A contemporary Saudi fine jewellery maison focused on timeless craftsmanship and bespoke pieces.",
      details: {
        industry: "Fine Jewellery / Luxury Maison, Saudi Arabia",
        services:
          "Brand Direction, UX/UI Design, Content Direction, Editorial Experience, Responsive Design, Front-end Craft",
        platform: "Luxury Maison Website",
      },
      overview: {
        challenge:
          "OPAL STONES is a contemporary Saudi fine jewellery maison focused on timeless craftsmanship and bespoke pieces. The project needed to feel like a luxury digital experience rather than a traditional e-commerce store.",
        approach:
          "The work included creating a refined visual identity, an editorial user experience, premium interface design, content direction, responsive layouts, and front-end implementation that reflects the elegance of the brand.",
        outcome:
          "The final experience presents OPAL STONES as a composed luxury maison, balancing jewellery storytelling, private appointment flow, editorial product discovery, and a refined digital presence.",
      },
      gallery: [
        {
          title: "Homepage Experience",
          caption:
            "The homepage opens with a cinematic jewellery composition and positions OPAL STONES as a contemporary luxury maison.",
        },
        {
          title: "Logo and Brand Cover",
          caption:
            "The logo cover establishes the maison identity with a quiet, tactile, and premium visual tone.",
        },
        {
          title: "Begin With The Piece",
          caption:
            "The collection entry frames rings, necklaces, and earrings through editorial spacing and refined product storytelling.",
        },
        {
          title: "Before The First Sketch",
          caption:
            "A curated product pathway lets visitors begin with a category, a mood, a material, or a bespoke direction.",
        },
        {
          title: "Craft and Detail",
          caption:
            "Behind-the-scenes jewellery imagery brings handwork, stone setting, and atelier detail into the digital experience.",
        },
        {
          title: "Stone Stories",
          caption:
            "Editorial cards introduce bracelets, bridal suites, and heirloom rework as distinct maison narratives.",
        },
        {
          title: "Private Commissions",
          caption:
            "The commission chapter communicates bespoke pieces through restraint, space, and a quiet sense of ceremony.",
        },
        {
          title: "Editorial Product Moment",
          caption:
            "A focused jewellery feature gives a single emerald necklace the atmosphere and attention of an editorial spread.",
        },
        {
          title: "Private Appointment",
          caption:
            "The final appointment flow turns inquiry into a composed private consultation rather than a standard checkout.",
        },
      ],
      reflection:
        "OPAL STONES became a luxury digital experience for a contemporary Saudi fine jewellery maison, combining brand direction, editorial UX, premium interface design, content direction, responsive layouts, and front-end development into a refined online presence.",
    },
    ar: {
      category: "هوية فاخرة، تجربة وواجهة المستخدم، تصميم موقع، حرفة الواجهة، توجيه المحتوى",
      disciplines: "هوية فاخرة، تجربة وواجهة، تصميم موقع",
      intro: "دار مجوهرات سعودية معاصرة تقدم قطعًا مصممة بعناية، تجمع بين الحرفية والهوية الراقية.",
      details: {
        industry: "مجوهرات فاخرة / دار فاخرة، السعودية",
        services:
          "التوجه الإبداعي، تجربة وواجهة المستخدم، توجيه المحتوى، التجربة التحريرية، التصميم المتجاوب، وحرفة الواجهة الأمامية",
        platform: "موقع لدار مجوهرات فاخرة",
      },
      overview: {
        challenge:
          "OPAL STONES دار مجوهرات سعودية معاصرة تقدم قطعًا مصممة بعناية، تجمع بين الحرفية والهوية الراقية. صُمم المشروع كتجربة رقمية فاخرة تعكس قيمة العلامة، وليس كمتجر إلكتروني تقليدي.",
        approach:
          "شمل العمل التوجه الإبداعي، تجربة وواجهة المستخدم، توجيه المحتوى، التجربة التحريرية، التصميم المتجاوب، وحرفة الواجهة بما يعكس أناقة العلامة.",
        outcome:
          "تقدم التجربة النهائية OPAL STONES كدار فاخرة وهادئة، تجمع سرد المجوهرات، مسار المواعيد الخاصة، اكتشاف القطع بأسلوب تحريري، وحضورًا رقميًا مصقولًا.",
      },
      gallery: [
        {
          title: "تجربة الصفحة الرئيسية",
          caption:
            "تفتتح الصفحة الرئيسية بتكوين سينمائي للمجوهرات، وتضع OPAL STONES كدار سعودية معاصرة وفاخرة.",
        },
        {
          title: "الشعار وغلاف الهوية",
          caption: "يثبت غلاف الشعار هوية الدار بنبرة هادئة وملمس بصري فاخر.",
        },
        {
          title: "البدء بالقطعة",
          caption: "يعرض مدخل المجموعة الخواتم والعقود والأقراط بمساحات تحريرية وسرد منتج مصقول.",
        },
        {
          title: "قبل أول رسم",
          caption:
            "يوجه مسار الاختيار الزائر للبدء من الفئة أو المزاج أو الخامة أو اتجاه القطعة الخاصة.",
        },
        {
          title: "الحرفة والتفاصيل",
          caption: "تُدخل صور الكواليس الحرفة وترصيع الأحجار وتفاصيل المشغل إلى التجربة الرقمية.",
        },
        {
          title: "قصص الأحجار",
          caption:
            "تقدم البطاقات التحريرية الأساور وأطقم العروس وإعادة صياغة الإرث كقصص مميزة داخل الدار.",
        },
        {
          title: "الطلبات الخاصة",
          caption:
            "يتحدث فصل الطلبات الخاصة عن القطع المصممة بعناية عبر الهدوء والمساحة وإحساس المناسبة.",
        },
        {
          title: "لحظة منتج تحريرية",
          caption:
            "تمنح لقطة العقد المرصع بالزمرد قطعة واحدة حضورًا واهتمامًا يليقان بصفحة تحريرية.",
        },
        {
          title: "الموعد الخاص",
          caption: "يحوّل مسار الموعد الاستفسار إلى موعد خاص مصقول بدل تجربة شراء تقليدية.",
        },
      ],
      reflection:
        "أصبح OPAL STONES تجربة رقمية فاخرة لدار مجوهرات سعودية معاصرة، تجمع التوجه الإبداعي، تجربة المستخدم التحريرية، تصميم الواجهة الفاخر، توجيه المحتوى، التصميم المتجاوب، وتطوير الواجهة الأمامية داخل حضور رقمي مصقول.",
    },
  },
  "ex-events-exhibitions": {
    en: {
      category: "UX/UI Design, Website Design, Brand Presence, Front-end Craft",
      disciplines: "UX/UI, Website Design, Content Direction",
      intro:
        "A Saudi events and exhibitions brand shaped into a premium website with clear service storytelling and a confident digital presence.",
      details: {
        industry: "Events and Exhibitions / Saudi Arabia",
        services:
          "UX/UI Design, Website Design, Content Direction, Responsive Design, Motion Direction, Front-end Craft",
        platform: "Events and Exhibitions Website",
      },
      overview: {
        challenge:
          "EX Events & Exhibitions needed a website that could express trust, scale, service clarity, and the energy behind major events without feeling crowded.",
        approach:
          "The work shaped the brand into a polished digital presence through clear UX, refined interface design, cinematic imagery, concise content, and front-end craft.",
        outcome:
          "The final website presents EX with a confident visual rhythm, clear service chapters, responsive layouts, and a direct path for new inquiries.",
      },
      gallery: [
        {
          title: "Hero and Brand Entry",
          caption:
            "The opening visual introduces EX through a cinematic command-room atmosphere, linking the brand to precision, scale, and readiness.",
        },
        {
          title: "Homepage Hero",
          caption:
            "The homepage frames EX as a company that leads major event details through professionalism, planning, and on-site execution.",
        },
        {
          title: "Service Overview",
          caption:
            "A compact service section presents experience, VIP protocol, media, exhibitions, and events with clear hierarchy.",
        },
        {
          title: "Service Flow",
          caption:
            "The service flow translates planning, documentation, supervision, field execution, and protocol into one readable sequence.",
        },
        {
          title: "Company Values",
          caption:
            "The values chapter communicates professionalism, commitment, transparency, and efficiency with a restrained interface.",
        },
        {
          title: "Behind The Scenes",
          caption:
            "Execution imagery shows field teams, venues, production moments, and the visible discipline behind major events.",
        },
        {
          title: "Mission",
          caption:
            "The mission section clarifies the company's role in improving the visitor experience through preparation, planning, and precise execution.",
        },
        {
          title: "Major Projects",
          caption:
            "Milestone projects are presented with strong event imagery and structured cards that communicate scale, reliability, and experience.",
        },
        {
          title: "Contact and Consultation",
          caption:
            "The contact section turns inquiry into a focused consultation path with clear channels for WhatsApp, calls, email, and appointment requests.",
        },
        {
          title: "Field Work",
          caption:
            "Field-work moments highlight official occasions, guest guidance, site presence, and the visible discipline of live execution.",
        },
      ],
      reflection:
        "EX Events & Exhibitions became a premium website and digital brand presence, connecting UX/UI, content direction, motion, responsive design, and front-end craft.",
    },
    ar: {
      category: "تجربة وواجهة، تصميم موقع، حضور رقمي، حرفة الواجهة",
      disciplines: "تجربة وواجهة، تصميم موقع، توجيه محتوى",
      intro: "علامة سعودية في الفعاليات والمعارض صيغت كموقع راقٍ بسرد خدمات واضح وحضور رقمي واثق.",
      details: {
        industry: "فعاليات ومعارض / السعودية",
        services:
          "تجربة وواجهة المستخدم، تصميم الموقع، توجيه المحتوى، التصميم المتجاوب، الحركة، وحرفة الواجهة الأمامية",
        platform: "موقع لشركة فعاليات ومعارض",
      },
      overview: {
        challenge:
          "احتاجت EX Events & Exhibitions إلى موقع يعبّر عن الثقة والحجم ووضوح الخدمات وطاقة الفعاليات الكبرى دون ازدحام.",
        approach:
          "صاغ العمل حضور العلامة عبر تجربة واضحة، واجهة مصقولة، صور سينمائية، محتوى مختصر، وحرفة في الواجهة الأمامية.",
        outcome:
          "يقدم الموقع EX بإيقاع بصري واثق، فصول خدمات واضحة، تصميم متجاوب، ومسار مباشر للاستفسارات الجديدة.",
      },
      gallery: [
        {
          title: "الواجهة وهوية الدخول",
          caption:
            "تقدم اللقطة الافتتاحية EX من خلال أجواء سينمائية تربط العلامة بالدقة والحجم والجاهزية.",
        },
        {
          title: "واجهة الصفحة الرئيسية",
          caption:
            "تعرض الصفحة الرئيسية الشركة كجهة تقود تفاصيل الفعاليات الكبرى باحترافية وتخطيط وتنفيذ ميداني.",
        },
        {
          title: "نظرة على الخدمات",
          caption:
            "يعرض قسم الخدمات الخبرة والبروتوكول وخدمة كبار الشخصيات والإعلام والمعارض والفعاليات بهرمية واضحة.",
        },
        {
          title: "مسار الخدمة",
          caption:
            "يحوّل مسار الخدمة التخطيط والتوثيق والإشراف والتنفيذ الميداني والبروتوكول إلى تسلسل مقروء.",
        },
        {
          title: "قيم الشركة",
          caption: "ينقل فصل القيم الاحترافية والالتزام والشفافية والكفاءة من خلال واجهة هادئة.",
        },
        {
          title: "وراء الكواليس",
          caption:
            "تعرض الصور فرق العمل والمواقع ولحظات الإنتاج والانضباط المرئي خلف الفعاليات الكبرى.",
        },
        {
          title: "المهمة",
          caption:
            "يوضح قسم المهمة دور الشركة في تحسين تجربة الزائر من خلال التحضير والتخطيط والتنفيذ الدقيق.",
        },
        {
          title: "المشاريع الكبرى",
          caption: "تعرض المشاريع البارزة بصور قوية وبطاقات منظمة توضح الحجم والثقة والخبرة.",
        },
        {
          title: "التواصل والاستفسار",
          caption:
            "يحوّل قسم التواصل الاهتمام إلى مسار واضح عبر واتساب والاتصال والبريد وطلب الموعد.",
        },
        {
          title: "العمل الميداني",
          caption:
            "تبرز لحظات العمل الميداني المناسبات الرسمية وإرشاد الضيوف والحضور في الموقع وانضباط التنفيذ المباشر.",
        },
      ],
      reflection:
        "أصبح EX Events & Exhibitions موقعًا فاخرًا وحضورًا رقميًا واضحًا، يجمع تجربة وواجهة المستخدم، توجيه المحتوى، الحركة، التصميم المتجاوب، وحرفة الواجهة.",
    },
  },
  "first-advance": {
    en: {
      category: "Brand Identity, Logo Design, UX/UI Design, Website Design, Front-end Craft",
      disciplines: "Logo Design, Brand Identity, UX/UI, Website Design",
      intro:
        "A Saudi service brand shaped through a refined logo, calm identity, clear UX/UI, and a composed website experience.",
      details: {
        industry: "Service Brand / Saudi Arabia",
        services:
          "Logo Design, Brand Direction, UX/UI Design, Website Design, Content Direction, Responsive Design, Front-end Craft",
        platform: "Service Brand Website",
      },
      overview: {
        challenge:
          "First Advance needed a digital presence that could make its services feel clear, trustworthy, and easy to understand at first glance.",
        approach:
          "The work created a new logo, a calm visual direction, a clear service narrative, refined UX/UI, and a responsive website experience.",
        outcome:
          "The final website communicates trust, clarity, and service confidence through a refined Saudi identity and a clean user journey.",
      },
      gallery: [
        {
          title: "Hero and Homepage",
          caption:
            "The homepage introduces First Advance through a calm Saudi business identity, a refined logo presence, and a clear service promise.",
        },
        {
          title: "Services Structure",
          caption:
            "The services chapter organizes the offer into clear sections that make the brand easy to understand.",
        },
        {
          title: "Company Introduction",
          caption:
            "The company introduction frames First Advance as a composed Saudi service brand with a clear promise.",
        },
        {
          title: "Vision and Mission",
          caption:
            "The vision and mission section clarifies the company's ambition, service philosophy, and commitment to quality.",
        },
        {
          title: "Target Audience",
          caption:
            "The audience section gives each visitor group a simple visual context and a clear reason to keep reading.",
        },
        {
          title: "Work Process",
          caption:
            "The process section presents a simple working rhythm from understanding the need to shaping the right service path.",
        },
        {
          title: "Why First Advance",
          caption:
            "The trust section communicates service integration, responsiveness, compliance, and long-term client relationships.",
        },
        {
          title: "Packages and Offers",
          caption:
            "The packages section turns service offers into an easy comparison with direct inquiry paths.",
        },
        {
          title: "Contact Experience",
          caption:
            "The closing section gives visitors a clear path to WhatsApp and email while keeping the brand calm and composed.",
        },
      ],
      reflection:
        "First Advance became a calm service-brand website, combining logo design, brand direction, UX/UI, content direction, responsive design, and front-end craft.",
    },
    ar: {
      category: "هوية تجارية، تصميم شعار، تجربة وواجهة، تصميم موقع، حرفة الواجهة",
      disciplines: "تصميم شعار، هوية تجارية، تجربة وواجهة، تصميم موقع",
      intro: "علامة خدمات سعودية صيغت عبر شعار مصقول، هوية هادئة، تجربة واضحة، وموقع متزن.",
      details: {
        industry: "علامة خدمات / السعودية",
        services:
          "تصميم الشعار، التوجه البصري، تجربة وواجهة المستخدم، تصميم الموقع، توجيه المحتوى، التصميم المتجاوب، وحرفة الواجهة الأمامية",
        platform: "موقع لعلامة خدمات",
      },
      overview: {
        challenge:
          "احتاجت First Advance إلى حضور رقمي يجعل خدماتها واضحة وموثوقة وسهلة الفهم منذ اللحظة الأولى.",
        approach:
          "صمم العمل شعارًا جديدًا، وتوجهًا بصريًا هادئًا، وسردًا واضحًا للخدمات، وتجربة وواجهة مصقولة، وموقعًا متجاوبًا.",
        outcome:
          "يعكس الموقع الثقة والوضوح وحضور الخدمة من خلال هوية سعودية مصقولة ورحلة استخدام نظيفة.",
      },
      gallery: [
        {
          title: "الواجهة الرئيسية",
          caption:
            "تقدم الصفحة الرئيسية First Advance من خلال هوية أعمال سعودية هادئة، وحضور شعار مصقول، ووعد خدمة واضح.",
        },
        {
          title: "هيكلة الخدمات",
          caption: "ينظم فصل الخدمات العروض في أقسام واضحة تجعل العلامة سهلة الفهم.",
        },
        {
          title: "تعريف الشركة",
          caption: "يعرض تعريف الشركة First Advance كعلامة خدمات سعودية متزنة بوعد واضح.",
        },
        {
          title: "الرؤية والرسالة",
          caption: "يوضح قسم الرؤية والرسالة طموح الشركة وفلسفة الخدمة والالتزام بالجودة.",
        },
        {
          title: "الجمهور المستهدف",
          caption: "يمنح قسم الجمهور كل فئة سياقًا بصريًا بسيطًا وسببًا واضحًا لمتابعة القراءة.",
        },
        {
          title: "أسلوب العمل",
          caption:
            "يعرض قسم أسلوب العمل إيقاعًا بسيطًا يبدأ من فهم الاحتياج وينتهي بتشكيل المسار المناسب.",
        },
        {
          title: "لماذا First Advance",
          caption:
            "ينقل قسم الثقة تكامل الخدمات، سرعة الاستجابة، الالتزام، وبناء العلاقات الطويلة مع العملاء.",
        },
        {
          title: "الباقات والعروض",
          caption: "يحوّل قسم الباقات عروض الخدمة إلى مقارنة سهلة مع مسارات استفسار مباشرة.",
        },
        {
          title: "تجربة التواصل",
          caption:
            "يمنح القسم الختامي الزائر مسارًا واضحًا للتواصل عبر واتساب والبريد بنبرة هادئة ومتزنة.",
        },
      ],
      reflection:
        "أصبح First Advance موقعًا هادئًا لعلامة خدمات، يجمع تصميم الشعار، التوجه البصري، تجربة وواجهة المستخدم، توجيه المحتوى، التصميم المتجاوب، وحرفة الواجهة.",
    },
  },
};

export function projectDisplay(slug: string, language: Language) {
  return projectCopy[slug]?.[language] ?? {};
}

export function localizeProject<
  T extends {
    slug: string;
    name: string;
    category: string;
    intro?: string;
    details?: ProjectCopy["details"];
    overview?: ProjectCopy["overview"];
    gallery?: Array<{ title: string; caption: string }>;
    reflection?: string;
  },
>(project: T, language: Language): T {
  const copy = projectDisplay(project.slug, language);
  return {
    ...project,
    name: copy.name ?? project.name,
    category: copy.category ?? project.category,
    intro: copy.intro ?? project.intro,
    details: project.details
      ? {
          ...project.details,
          ...copy.details,
        }
      : project.details,
    overview: copy.overview ?? project.overview,
    gallery: project.gallery?.map((item, index) => ({
      ...item,
      ...(copy.gallery?.[index] ?? {}),
    })),
    reflection: copy.reflection ?? project.reflection,
  };
}
