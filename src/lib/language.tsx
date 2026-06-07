import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Language = "en" | "ar";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  isArabic: boolean;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const LANGUAGE_STORAGE_KEY = "tarik-bamarouf-language";

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

export const siteCopy = {
  en: {
    nav: {
      work: "Work",
      about: "About",
      services: "Services",
      process: "Process",
      contact: "Contact",
      menu: "Menu",
      close: "Close",
      switchTo: "عربي",
      switchLabel: "Switch language to Arabic",
    },
    common: {
      viewProject: "View Project",
      viewAllProjects: "View All Projects",
      backToWork: "Back to Work",
      scroll: "Scroll",
    },
    home: {
      metaTitle: "Tarik Bamarouf | Digital Experiences for Ambitious Brands",
      metaDescription:
        "Tarik Bamarouf designs and builds premium websites, e-commerce stores, and digital experiences for modern brands.",
      heroLabel: "Digital Experiences",
      heroLine1: "Digital",
      heroLine2: "Experiences",
      heroLine3: "For",
      heroEmphasis: "Ambitious",
      heroLine4: "Brands.",
      heroBody:
        "Premium websites, e-commerce experiences, and digital products crafted for modern brands.",
      viewWork: "View Work",
      startProject: "Start Project",
      portfolioLabel: "Portfolio 2026",
      selectedWork: "Selected Work",
      selectedTitle: "Cinematic chapters.",
      aboutLabel: "About",
      aboutTitle: "Design.\nStrategy.\nDevelopment.",
      aboutBody: "Websites that elevate perception and present every brand with clarity.",
      aboutCta: "About Me",
      servicesLabel: "Services",
      processLabel: "The Process",
      ctaLabel: "Let's Work Together",
      ctaTitle: "Let's build something exceptional.",
      ctaBody: "Tell me about your project, your vision, and your goals.",
      ctaButton: "Start Your Project",
    },
    services: [
      {
        t: "Brand Websites",
        d: "Identity led websites that elevate perception.",
      },
      {
        t: "Business Websites",
        d: "Clear, credible presence for modern companies.",
      },
      {
        t: "E-Commerce Stores",
        d: "Stores designed for desire and conversion.",
      },
      {
        t: "Design and Development",
        d: "Complete digital craft, from concept to launch.",
      },
    ],
    steps: [
      {
        t: "Discovery",
        d: "Understanding your brand, goals, target audience, and market landscape.",
      },
      {
        t: "Strategy",
        d: "Building the right plan and structure that aligns with your goals.",
      },
      {
        t: "Design",
        d: "Crafting visuals that reflect your brand and create a memorable experience.",
      },
      {
        t: "Development and Launch",
        d: "Developing, testing, and launching with precision and performance in mind.",
      },
    ],
    work: {
      metaTitle: "Work | Tarik Bamarouf",
      metaDescription:
        "Selected projects by Tarik Bamarouf across luxury brand websites, e-commerce, and digital experiences.",
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
        "A digital experience designer working with brand systems, cinematic art direction, and considered technology.",
      label: "Portrait of a Practice",
      titleA: "A studio of ",
      titleB: "one.",
      titleC: "An ambition for many.",
      portraitAlt: "Tarik Bamarouf portrait",
      portraitLabel: "Tarik Bamarouf studio portrait",
      biography: "Biography",
      biographyBody:
        "I design digital experiences where brand, interface, and atmosphere work as one system.",
      philosophy: "Philosophy",
      philosophyBody:
        "The work is quiet by choice. Every page is shaped to slow the visitor down, clarify the offer, and make the brand feel considered from the first moment.",
      disciplines: "Disciplines",
      recognition: "Focus",
      recognitionBody:
        "Available for selected collaborations, launches, and private digital systems.",
      begin: "Begin a conversation",
      disciplineItems: [
        "Art Direction",
        "Web Design",
        "Brand Identity",
        "Motion",
        "Editorial",
        "Strategy",
      ],
    },
    contact: {
      metaTitle: "Contact | Tarik Bamarouf",
      metaDescription:
        "Start a direct conversation about your next digital experience by WhatsApp or email.",
      label: "Direct",
      titleA: "Let's ",
      titleB: "talk.",
      body: "No forms. Choose a channel, and we begin immediately.",
      primary: "Primary",
      compose: "Compose",
      secondary: "Secondary",
      whatsapp: "WhatsApp",
      whatsappBody: "Open a conversation in one tap.",
      openChat: "Open Chat",
    },
    footer: {
      headline: "Premium websites for brands, businesses, and online stores.",
      whatsapp: "WhatsApp",
      email: "Email",
      navigate: "Navigate",
      direct: "Direct",
      rights: "© 2026 Tarik Bamarouf. All rights reserved.",
      location: "Digital Experiences. Worldwide.",
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
    },
  },
  ar: {
    nav: {
      work: "الأعمال",
      about: "عنّي",
      services: "الخدمات",
      process: "المنهجية",
      contact: "تواصل",
      menu: "القائمة",
      close: "إغلاق",
      switchTo: "EN",
      switchLabel: "تغيير اللغة إلى الإنجليزية",
    },
    common: {
      viewProject: "عرض المشروع",
      viewAllProjects: "عرض كل الأعمال",
      backToWork: "العودة إلى الأعمال",
      scroll: "تصفّح",
    },
    home: {
      metaTitle: "طارق بامعروف | تجارب رقمية لعلامات طموحة",
      metaDescription:
        "يصمم طارق بامعروف مواقع راقية ومتاجر إلكترونية وتجارب رقمية للعلامات الحديثة.",
      heroLabel: "تجارب رقمية",
      heroLine1: "تجارب",
      heroLine2: "رقمية",
      heroLine3: "لعلامات",
      heroEmphasis: "طموحة",
      heroLine4: "",
      heroBody: "مواقع راقية، متاجر إلكترونية، ومنتجات رقمية تُصاغ بعناية للعلامات الحديثة.",
      viewWork: "عرض الأعمال",
      startProject: "ابدأ مشروعك",
      portfolioLabel: "محفظة 2026",
      selectedWork: "أعمال مختارة",
      selectedTitle: "فصول بصرية متقنة.",
      aboutLabel: "عنّي",
      aboutTitle: "تصميم.\nاستراتيجية.\nتطوير.",
      aboutBody: "مواقع ترفع حضور العلامة وتقدمها بوضوح وثقة.",
      aboutCta: "عنّي",
      servicesLabel: "الخدمات",
      processLabel: "المنهجية",
      ctaLabel: "لنعمل معًا",
      ctaTitle: "لنصنع شيئًا استثنائيًا.",
      ctaBody: "حدثني عن مشروعك ورؤيتك وأهدافك.",
      ctaButton: "ابدأ مشروعك",
    },
    services: [
      {
        t: "مواقع العلامات التجارية",
        d: "مواقع مبنية على الهوية، تعزز الحضور والانطباع الأول.",
      },
      {
        t: "مواقع الأعمال",
        d: "حضور واضح وموثوق للشركات الحديثة.",
      },
      {
        t: "متاجر إلكترونية",
        d: "تجارب بيع مصممة لجذب الاهتمام وتحويله إلى طلبات.",
      },
      {
        t: "تصميم وتطوير",
        d: "حرفة رقمية متكاملة، من الفكرة حتى الإطلاق.",
      },
    ],
    steps: [
      {
        t: "الاكتشاف",
        d: "فهم العلامة، الأهداف، الجمهور، والسوق المحيط بها.",
      },
      {
        t: "الاستراتيجية",
        d: "بناء خطة وهيكل واضحين ينسجمان مع أهداف المشروع.",
      },
      {
        t: "التصميم",
        d: "صياغة لغة بصرية تعبّر عن العلامة وتصنع تجربة لا تُنسى.",
      },
      {
        t: "التطوير والإطلاق",
        d: "تطوير واختبار وإطلاق بدقة، مع عناية بالأداء والتفاصيل.",
      },
    ],
    work: {
      metaTitle: "الأعمال | طارق بامعروف",
      metaDescription:
        "مجموعة مختارة من مشاريع طارق بامعروف في مواقع العلامات الفاخرة والمتاجر الإلكترونية والتجارب الرقمية.",
      archive: "الأرشيف",
      title: "أعمال مختارة.",
      volume: "محفظة 2026",
      projectLabel: "مشروع",
      end: "اكتمل الأرشيف",
      note: "فصول جديدة قيد التحضير",
    },
    about: {
      metaTitle: "عني | طارق بامعروف",
      metaDescription:
        "مصمم تجارب رقمية يعمل على أنظمة الهوية، والتوجيه البصري السينمائي، والتقنية المدروسة.",
      label: "ملامح الممارسة",
      titleA: "استوديو من ",
      titleB: "شخص واحد.",
      titleC: "وطموح يتسع لكثيرين.",
      portraitAlt: "بورتريه طارق بامعروف",
      portraitLabel: "بورتريه طارق بامعروف في الاستوديو",
      biography: "نبذة",
      biographyBody: "أصمم تجارب رقمية تعمل فيها الهوية والواجهة والأجواء كنظام واحد متماسك.",
      philosophy: "الفلسفة",
      philosophyBody:
        "الهدوء هنا اختيار مقصود. كل صفحة تُصاغ لتمنح الزائر لحظة أبطأ، وتوضح العرض، وتجعل العلامة مدروسة منذ اللحظة الأولى.",
      disciplines: "التخصصات",
      recognition: "التركيز",
      recognitionBody: "متاح لمشاريع مختارة، وإطلاقات جديدة، وأنظمة رقمية خاصة.",
      begin: "ابدأ الحوار",
      disciplineItems: [
        "التوجيه الفني",
        "تصميم المواقع",
        "هوية العلامة",
        "الحركة",
        "السرد التحريري",
        "الاستراتيجية",
      ],
    },
    contact: {
      metaTitle: "تواصل | طارق بامعروف",
      metaDescription: "ابدأ حوارًا مباشرًا حول تجربتك الرقمية القادمة عبر البريد أو واتساب.",
      label: "تواصل مباشر",
      titleA: "لنتحدث.",
      titleB: "",
      body: "بلا نماذج. اختر قناة التواصل ونبدأ مباشرة.",
      primary: "البريد",
      compose: "راسلني",
      secondary: "قناة سريعة",
      whatsapp: "واتساب",
      whatsappBody: "افتح محادثة مباشرة بخطوة واحدة.",
      openChat: "افتح المحادثة",
    },
    footer: {
      headline: "مواقع راقية للعلامات والشركات والمتاجر الإلكترونية.",
      whatsapp: "واتساب",
      email: "البريد",
      navigate: "التنقل",
      direct: "مباشر",
      rights: "© 2026 طارق بامعروف. جميع الحقوق محفوظة.",
      location: "تجارب رقمية. حضور عالمي.",
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
    },
  },
} as const;

type ProjectCopy = {
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
  "huda-bamarouf": {
    en: {
      category: "Luxury Fashion Maison",
      disciplines: "Identity, Direction, E-Commerce",
      intro:
        "A luxury fashion maison website shaped around couture, bridal, ready-to-wear, editorial storytelling, and maison presence.",
      details: {
        industry: "Luxury Fashion",
        services: "Website Design and Development",
        platform: "Luxury Fashion Website",
      },
      overview: {
        challenge:
          "Huda Bamarouf is a luxury fashion maison digital experience created to present couture collections, bridal pieces, ready-to-wear capsules, editorial stories, press presence, and private maison moments through a refined cinematic website.",
        approach:
          "The goal was to build a premium online presence that feels elegant, restrained, and memorable while allowing the collections and atmosphere to lead the experience.",
        outcome:
          "Every chapter of the maison is composed with quiet authority, so the website reads as one continuous editorial experience rather than a catalogue.",
      },
      gallery: [
        {
          title: "Couture World",
          caption: "A restrained visual direction for the maison’s couture identity.",
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
          caption: "Editorial storytelling built to extend the maison beyond product.",
        },
        {
          title: "In The Press",
          caption: "A dedicated media presence for features, interviews, and brand visibility.",
        },
        {
          title: "Maison Presence",
          caption: "A cinematic presentation of runway, cultural presence, and public moments.",
        },
        {
          title: "Worn By",
          caption: "A visual archive of the women, occasions, and figures connected to the maison.",
        },
        {
          title: "Events",
          caption:
            "Private gatherings and atmospheric moments presented as part of the brand world.",
        },
      ],
      reflection:
        "The final experience positions Huda Bamarouf as a refined luxury fashion maison, combining visual storytelling, collection presentation, editorial depth, and premium digital presence into one cohesive website.",
    },
    ar: {
      category: "دار أزياء فاخرة",
      disciplines: "هوية، توجيه بصري، تجارة إلكترونية",
      intro:
        "موقع لدار أزياء فاخرة صُمم حول الكوتور، أزياء العرائس، الأزياء الجاهزة، السرد التحريري، وحضور الدار.",
      details: {
        industry: "الأزياء الفاخرة",
        services: "تصميم وتطوير الموقع",
        platform: "موقع لدار أزياء فاخرة",
      },
      overview: {
        challenge:
          "صُممت تجربة Huda Bamarouf الرقمية لتقديم مجموعات الكوتور، قطع العرائس، الأزياء الجاهزة، القصص التحريرية، الحضور الإعلامي، ولحظات الدار الخاصة ضمن موقع مصقول بإيقاع سينمائي.",
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
        "تضع التجربة النهائية Huda Bamarouf كدار أزياء فاخرة وهادئة، تجمع بين السرد البصري، عرض المجموعات، العمق التحريري، والحضور الرقمي الرفيع داخل موقع واحد متماسك.",
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
            "The packaging system frames the cake as a gift, with the box, sauce bottle, and product presented as one considered ritual.",
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
        "Tarta De Amor brings together concept, creative direction, website design, UX/UI, development, and intro video by Tarik Bamarouf, shaping a premium digital ordering experience for a luxury cheesecake brand in Jeddah.",
    },
    ar: {
      category: "علامة حلويات فاخرة / تجربة تجارة إلكترونية راقية",
      disciplines: "توجيه العلامة، تجارة إلكترونية، تجربة منتج",
      intro:
        "علامة مدريد تشيزكيك فاخرة بُنيت حول الإهداء، العرض الراقي، وتجربة طلب رقمية مصقولة.",
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
          caption:
            "لحظة منتج غنية تبرز اختيار صوص الشوكولاتة عبر تصوير قريب وواجهة طلب واضحة.",
        },
        {
          title: "عرض التغليف",
          caption:
            "يقدم نظام التغليف الكيكة كهدية، حيث يجتمع الصندوق وعبوة الصوص والمنتج في طقس مدروس.",
        },
        {
          title: "صُنعت للحظات تُحفظ في الذاكرة",
          caption:
            "قسم تحريري يضع مدريد تشيزكيك كمركز هادئ للهدايا واللقاءات والأمسيات التي تستحق البقاء.",
        },
        {
          title: "تُقدّم قبل أن تُفتح",
          caption:
            "لحظة الإهداء تؤكد الترقب والحرفة والشعور الفاخر قبل أول قطعة.",
        },
        {
          title: "التواصل والختام",
          caption:
            "يختتم القسم الأخير التجربة بتفاصيل التواصل وحضور العلامة ولحظة نهائية مصقولة.",
        },
      ],
      reflection:
        "يجمع Tarta De Amor بين الفكرة، التوجيه الإبداعي، تصميم الموقع، تجربة المستخدم والواجهة، التطوير، وفيديو الانترو من Tarik Bamarouf، ليصنع تجربة طلب رقمية فاخرة لعلامة تشيزكيك في جدة.",
    },
  },
  "mahn-platform": {
    en: {
      category: "Digital Platform",
      disciplines: "Identity, User Experience, Platform",
      intro:
        "A digital platform designed around refined interaction, intuitive navigation, and a modern product experience.",
      details: {
        industry: "Technology",
        services:
          "Brand Identity, User Experience Design, Interface Design, Product Design and Development",
        platform: "Digital Platform",
      },
      overview: {
        challenge:
          "Mihn is a digital platform designed to simplify user interaction through a refined interface, intuitive navigation, and a modern product experience. The work focused on a seamless product ecosystem across authentication, dashboard management, and platform operations.",
        approach:
          "The experience was structured around a cinematic entry, a clear introduction, focused dashboard views, operational management flows, and a streamlined access journey.",
        outcome:
          "The platform presentation connects brand atmosphere with practical product surfaces, showing how Mihn moves from public positioning into everyday user and operator workflows.",
      },
      gallery: [
        {
          title: "Introduction",
          caption:
            "A visual introduction establishing the platform atmosphere, positioning, and digital identity.",
        },
        {
          title: "Dashboard Overview",
          caption:
            "Core platform functionality presented through a clean and structured dashboard experience.",
        },
        {
          title: "Management Interface",
          caption: "Administrative workflows designed for efficiency, clarity, and ease of use.",
        },
        {
          title: "Platform Operations",
          caption: "System tools and operational controls built around usability and scalability.",
        },
        {
          title: "Authentication Experience",
          caption: "A streamlined access flow designed to provide secure and frictionless entry.",
        },
      ],
      reflection:
        "The final experience positions Mihn as a modern digital platform that balances functionality, usability, and visual refinement through a cohesive product ecosystem.",
    },
    ar: {
      category: "منصة رقمية",
      disciplines: "هوية، تجربة مستخدم، منصة",
      intro: "منصة رقمية صُممت حول تفاعل مصقول، تنقّل واضح، وتجربة منتج حديثة.",
      details: {
        industry: "التقنية",
        services: "هوية تجارية، تصميم تجربة المستخدم، تصميم الواجهة، تصميم وتطوير المنتج",
        platform: "منصة رقمية",
      },
      overview: {
        challenge:
          "صُممت Mihn لتبسيط تفاعل المستخدم عبر واجهة مصقولة، تنقّل بديهي، وتجربة منتج حديثة. ركز العمل على بناء منظومة منتج متكاملة تشمل تسجيل الدخول، إدارة لوحات التحكم، وتشغيل المنصة.",
        approach:
          "نُظمت التجربة حول افتتاح بصري قوي، مقدمة واضحة، لوحات تشغيل مركزة، مسارات إدارية عملية، وتجربة وصول مختصرة وآمنة.",
        outcome:
          "يربط عرض المنصة بين أجواء العلامة وواجهات المنتج العملية، موضحًا انتقال Mihn من التموضع العام إلى الاستخدام اليومي للمستخدمين والمشغلين.",
      },
      gallery: [
        { title: "المقدمة", caption: "افتتاح بصري يحدد أجواء المنصة وتموضعها وهويتها الرقمية." },
        { title: "نظرة على اللوحة", caption: "وظائف المنصة الأساسية ضمن لوحة واضحة ومنظمة." },
        {
          title: "واجهة الإدارة",
          caption: "تدفقات إدارية مصممة للكفاءة والوضوح وسهولة الاستخدام.",
        },
        {
          title: "تشغيل المنصة",
          caption: "أدوات النظام والتحكم التشغيلي مبنية حول القابلية للاستخدام والتوسع.",
        },
        { title: "تجربة تسجيل الدخول", caption: "مسار دخول مختصر وآمن يمنح المستخدم وصولًا سلسًا." },
      ],
      reflection:
        "تضع التجربة النهائية Mihn كمنصة رقمية حديثة توازن بين الوظيفة وسهولة الاستخدام والصقل البصري ضمن منظومة منتج واحدة.",
    },
  },
  "norx-paints": {
    en: {
      category: "Brand Identity and Digital Experience",
      disciplines: "Naming, Identity, Website",
      intro:
        "A complete brand identity and digital experience created around strategic positioning, visual presence, and a cohesive customer journey.",
      details: {
        industry: "Business and Technology",
        services: "Naming, Brand Strategy, Brand Identity, Website Design and Development",
        platform: "Brand Identity and Digital Experience",
      },
      overview: {
        challenge:
          "NOORIX is a brand created from the ground up, including naming, strategy, visual identity, digital direction, and website experience. The project focused on building a distinctive and scalable brand with a strong visual presence and a cohesive identity system across every customer touchpoint.",
        approach:
          "The brand world was shaped through premium editorial layouts, refined color language, product presentation, environmental applications, and a website experience that connects identity with customer-facing storytelling.",
        outcome:
          "The digital presentation brings the brand system together across positioning, product identity, interiors, color exploration, transformation moments, and final applications.",
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
            "A product range section introduces the premium coatings system through editorial layout and refined presentation.",
        },
        {
          title: "Palette Collection",
          caption:
            "The color library organizes signature shades, finishes, and families into a clear browsing system.",
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
        "The final outcome established NOORIX as a complete brand ecosystem, combining strategic positioning, visual identity, and digital execution into a cohesive and memorable experience.",
    },
    ar: {
      category: "هوية تجارية وتجربة رقمية",
      disciplines: "تسمية، هوية، موقع",
      intro:
        "هوية تجارية وتجربة رقمية متكاملة مبنية حول التموضع، الحضور البصري، ورحلة عميل متماسكة.",
      details: {
        industry: "الأعمال والتقنية",
        services: "تسمية، استراتيجية العلامة، هوية تجارية، تصميم وتطوير الموقع",
        platform: "هوية تجارية وتجربة رقمية",
      },
      overview: {
        challenge:
          "بُنيت NOORIX من الصفر، من التسمية والاستراتيجية إلى الهوية البصرية والتوجه الرقمي وتجربة الموقع. ركز المشروع على إنشاء علامة قابلة للنمو، ذات حضور بصري واضح ونظام هوية متماسك عبر نقاط التفاعل.",
        approach:
          "تشكّل عالم العلامة عبر تخطيطات تحريرية راقية، لغة لونية مصقولة، عرض للمنتج، تطبيقات مكانية، وتجربة موقع تربط الهوية بالسرد الموجه للعميل.",
        outcome:
          "يجمع العرض الرقمي نظام العلامة عبر التموضع، هوية المنتج، المساحات الداخلية، استكشاف اللون، لحظات التحول، والتطبيقات النهائية.",
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
          caption: "قسم يعرض أنظمة الطلاء الفاخرة بتخطيط تحريري وتقديم مصقول.",
        },
        {
          title: "مجموعة الألوان",
          caption: "مكتبة تنظّم الدرجات والتشطيبات والعائلات اللونية بطريقة واضحة.",
        },
        {
          title: "تقرير اتجاهات اللون",
          caption: "عرض تحريري يربط لوحة NOORIX بالمساحات والعمارة والاتجاه البصري لعام 2026.",
        },
        { title: "قصة التحول", caption: "عرض التحول يبرز الأثر العملي للطلاء والاتجاه البصري." },
        {
          title: "العرض النهائي للعلامة",
          caption: "مشهد ختامي مرتبط بالأصل يعزز الحضور والهوية ذات الجذور السعودية.",
        },
      ],
      reflection:
        "رسخت النتيجة النهائية NOORIX كمنظومة علامة متكاملة، تجمع التموضع الاستراتيجي والهوية البصرية والتنفيذ الرقمي في تجربة واحدة متماسكة.",
    },
  },
  "pikmon-store": {
    en: {
      category: "Collectibles Commerce Platform",
      disciplines: "Identity, Commerce, User Experience",
      intro:
        "A complete Pokémon-inspired commerce ecosystem designed from the ground up, combining collectibles, merchandise, customization, community engagement, and immersive digital experiences.",
      details: {
        industry: "Collectibles and E-Commerce",
        services:
          "Brand Creation, Naming, Brand Strategy, Visual Identity, Logo Design, User Experience Design, Product Experience and Website Development",
        platform: "Commerce Platform",
      },
      overview: {
        challenge:
          "Pokémon SA was created from scratch, including brand naming, strategy, logo design, visual identity, user experience, interface design, product architecture, gamified experiences, merchandise customization systems, and the complete e-commerce website experience.",
        approach:
          "The goal was to build the ultimate destination for Pokémon collectors in Saudi Arabia, bringing together trading cards, sealed products, apparel, collectibles, rewards, and community-driven interactions inside a unified platform inspired by the Pokémon universe.",
        outcome:
          "The project organizes commerce, customization, rewards, and rare item discovery into a collector ecosystem designed for browsing, buying, participating, and building personal Pokémon collections.",
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
            "A focused brand moment introduces the platform identity and visual language before the experience expands into products and community features.",
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
            "The hoodie collection expands the merchandise system with richer product presentation, sizing guidance, and premium apparel options.",
        },
        {
          title: "Custom Product Builder",
          caption:
            "The customization studio lets collectors build personalized apparel by choosing garments, characters, colors, text, and reference uploads.",
        },
        {
          title: "Community and Gamification",
          caption:
            "Interactive reward mechanics and subscription prompts turn the store into a participatory platform with challenges, codes, and community touchpoints.",
        },
        {
          title: "Rare Collector Marketplace",
          caption:
            "The rare desk creates a specialized intake flow for rare cards, sealed products, consignment, authenticity review, and collector requests.",
        },
      ],
      reflection:
        "Pokémon SA demonstrates a complete brand creation process, from naming and visual identity to user experience, commerce architecture, gamification systems, product customization tools, and platform development. The result is an immersive collector ecosystem designed for Pokémon fans and collectors in Saudi Arabia.",
    },
    ar: {
      category: "منصة تجارة للمقتنيات",
      disciplines: "هوية، تجارة، تجربة مستخدم",
      intro:
        "منظومة تجارة مستوحاة من عالم Pokémon، تجمع المقتنيات والمنتجات المخصصة والمجتمع والتجارب الرقمية الغامرة.",
      details: {
        industry: "المقتنيات والتجارة الإلكترونية",
        services:
          "إنشاء العلامة، التسمية، استراتيجية العلامة، الهوية البصرية، تصميم الشعار، تجربة المستخدم، تجربة المنتج، وتطوير الموقع",
        platform: "منصة تجارة",
      },
      overview: {
        challenge:
          "أُنشئت Pokémon SA من الصفر، بما يشمل التسمية، الاستراتيجية، تصميم الشعار، الهوية البصرية، تجربة المستخدم، تصميم الواجهات، بنية المنتجات، التجارب التفاعلية، أنظمة تخصيص المنتجات، وتجربة المتجر الإلكتروني بالكامل.",
        approach:
          "كان الهدف بناء وجهة متكاملة لهواة Pokémon في السعودية، تجمع البطاقات، المنتجات المختومة، الملابس، المقتنيات، المكافآت، والتفاعل المجتمعي داخل منصة موحدة مستوحاة من عالم Pokémon.",
        outcome:
          "ينظم المشروع التجارة والتخصيص والمكافآت واكتشاف القطع النادرة ضمن منظومة لهواة الجمع، صُممت للتصفح والشراء والمشاركة وبناء المجموعات الشخصية.",
      },
      gallery: [
        {
          title: "تجربة العلامة",
          caption:
            "تقدم الصفحة الرئيسية Pokémon SA كوجهة شاملة لهواة الجمع، مع مسارات منتجات واضحة وتجربة تجارة مشوقة.",
        },
        {
          title: "الشعار والهوية",
          caption: "لحظة تعريفية مركزة تكشف هوية المنصة قبل الانتقال إلى المنتجات والمجتمع.",
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
          caption: "توسيع لمنظومة الملابس مع عرض أغنى للمنتج ودليل مقاسات وخيارات أعلى قيمة.",
        },
        {
          title: "منشئ المنتجات المخصصة",
          caption: "استوديو تخصيص يسمح باختيار القطعة والشخصية واللون والنص والمرجع.",
        },
        {
          title: "المجتمع والتحفيز",
          caption: "آليات مكافآت وتحديات واشتراك تجعل المتجر مساحة مشاركة لا مجرد واجهة بيع.",
        },
        {
          title: "سوق القطع النادرة",
          caption: "مسار مخصص للبطاقات والمنتجات النادرة، مع مراجعة الأصالة وطلبات الهواة.",
        },
      ],
      reflection:
        "تقدم Pokémon SA عملية إنشاء علامة متكاملة، من التسمية والهوية إلى تجربة المستخدم وبنية التجارة وأنظمة التحفيز وأدوات التخصيص وتطوير المنصة. النتيجة منظومة غامرة لهواة Pokémon وجامعيها في السعودية.",
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
          "SIP is a Saudi beverage brand developed from the ground up, including naming, brand identity, visual direction, digital presence, and website experience. The project focused on creating a modern and memorable beverage brand with a strong visual personality, clear market positioning, and a cohesive brand world across physical and digital touchpoints.",
        approach:
          "The identity system was built around bold typography, high-contrast product presentation, flavor-led packaging, and a dark digital environment that lets the cans, naming, and visual attitude carry the experience.",
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
            "The full beverage range is presented as a focused product system built around taste, energy, and zero-sugar options.",
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
            "Product cards translate the packaging system into a polished website experience for browsing the full range.",
        },
      ],
      reflection:
        "The final outcome established SIP as a distinctive Saudi beverage brand with a cohesive identity system, memorable visual language, and a premium digital presence that supports long-term brand growth.",
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
          "بُني نظام الهوية حول خط جريء، عرض منتج عالي التباين، تغليف يتمحور حول النكهات، وبيئة رقمية داكنة تمنح العبوات والاسم والموقف البصري مساحة القيادة.",
        outcome:
          "يقدم الموقع وتطبيقات العلامة SIP كعلامة سعودية واثقة ذات عائلة منتجات واضحة ولغة بصرية قابلة للتعرف وحضور رقمي مصمم للإطلاق والنمو.",
      },
      gallery: [
        {
          title: "تجربة العلامة",
          caption: "لحظة افتتاحية سينمائية تقدم SIP بهوية مشروبات سعودية واثقة وحضور واضح يقوده المنتج.",
        },
        {
          title: "تشكيلة المنتجات",
          caption: "عرض مركز لعائلة المشروبات مبني حول النكهات والطاقة وخيارات خالية من السكر.",
        },
        {
          title: "مجموعة خالية من السكر",
          caption: "تمتد المجموعة الخالية من السكر بهوية SIP إلى تعبير أنظف مع الحفاظ على الحضور الجريء نفسه.",
        },
        {
          title: "قصة العلامة",
          caption: "فصل سعودي المنشأ يربط العلامة بالوضوح والثقة والاتجاه البصري المميز.",
        },
        {
          title: "بطاقات المنتجات",
          caption: "بطاقات رقمية تترجم نظام التغليف إلى تجربة موقع مصقولة لتصفح المجموعة الكاملة.",
        },
      ],
      reflection:
        "رسخت النتيجة SIP كعلامة مشروبات سعودية مميزة، بنظام هوية متماسك ولغة بصرية واضحة وحضور رقمي فاخر يدعم نمو العلامة على المدى الطويل.",
    },
  },
  jorof: {
    en: {
      category:
        "Brand Identity, Creative Direction, User Experience, Website Design and Development",
      disciplines: "Identity, User Experience, Website",
      intro:
        "A modern Saudi bottled water brand transformed from an existing logo into a complete digital brand experience.",
      details: {
        industry: "Bottled Water",
        services:
          "Creative Direction, Visual Identity Development, Brand System, Color Strategy, User Experience Design, Website Design, Frontend Experience Planning",
        platform: "Brand Identity and Website Experience",
      },
      overview: {
        challenge:
          "JOROF is a Saudi bottled water brand. The client already had the logo, and the project expanded that foundation into a complete visual direction, brand system, color strategy, digital experience, interface design, user experience structure, and full website experience.",
        approach:
          "The work focused on clarity, trust, quality, and daily reliability, translating the existing mark into a calm Saudi water brand with product presentation, manufacturing storytelling, quality assurance communication, and a customer acquisition journey.",
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
            "The brand story section turns the logo into a wider identity system, connecting Saudi origin, operational confidence, and daily trust.",
        },
        {
          title: "Product Range",
          caption:
            "The product presentation system organizes bottle formats with clean hierarchy, soft gradients, and purchase-oriented information architecture.",
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
        "JOROF transformed an existing logo into a complete digital brand experience through visual direction, brand system development, color strategy, product presentation, manufacturing storytelling, quality assurance communication, and a customer acquisition journey. The result is a modern Saudi water brand built around clarity, trust, quality, and daily reliability.",
    },
    ar: {
      category: "هوية تجارية، توجيه إبداعي، تجربة مستخدم، تصميم وتطوير موقع",
      disciplines: "هوية، تجربة مستخدم، موقع",
      intro: "علامة مياه سعودية حديثة تحولت من شعار قائم إلى تجربة رقمية متكاملة للعلامة.",
      details: {
        industry: "المياه المعبأة",
        services:
          "توجيه إبداعي، تطوير الهوية البصرية، نظام العلامة، استراتيجية اللون، تجربة المستخدم، تصميم الموقع، تخطيط تجربة الواجهة",
        platform: "هوية تجارية وتجربة موقع",
      },
      overview: {
        challenge:
          "JOROF علامة مياه سعودية كان لديها شعار قائم، وتحوّل المشروع إلى بناء اتجاه بصري كامل، نظام علامة، استراتيجية لون، تجربة رقمية، تصميم واجهة، هيكل تجربة مستخدم، وموقع متكامل.",
        approach:
          "ركز العمل على الوضوح والثقة والجودة والاعتمادية اليومية، مع تحويل الشعار إلى علامة مياه سعودية هادئة من خلال عرض المنتج، سرد التصنيع، ضمان الجودة، ورحلة اكتساب العملاء.",
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
          caption:
            "قسم يحوّل الشعار إلى نظام هوية أوسع يربط الأصل السعودي والثقة التشغيلية والاستخدام اليومي.",
        },
        {
          title: "نطاق المنتجات",
          caption: "نظام عرض للعبوات بأحجام مختلفة مع هرمية واضحة ومعلومات موجهة للشراء.",
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
        "حوّلت JOROF شعارًا قائمًا إلى تجربة رقمية متكاملة عبر التوجيه البصري ونظام العلامة واستراتيجية اللون وعرض المنتج وسرد التصنيع وضمان الجودة ورحلة اكتساب العملاء. النتيجة علامة مياه سعودية حديثة مبنية على الوضوح والثقة والجودة والاعتمادية اليومية.",
    },
  },
  pakman: {
    en: {
      category: "Brand Identity, Website Design, Art Direction",
      disciplines: "Identity, Packaging, Website",
      intro:
        "A Saudi restaurant packaging company shaped into a complete brand identity, packaging direction, and website experience for food businesses.",
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
          "The final experience presents Pakman as a complete professional packaging brand, connecting product categories, packaging applications, client confidence, headquarters, and quote inquiry into one clear digital journey.",
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
            "A structured product system organizes cups, bags, boxes, labels, and food service essentials for easy browsing.",
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
            "Client references show how the packaging system supports restaurants, cafés, and food brands in daily operation.",
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
        "Pakman becomes a complete professional case study for a Saudi restaurant packaging company, combining brand identity, packaging direction, website design, user interface direction, and art direction into a clear digital presence for food businesses.",
    },
    ar: {
      category: "هوية تجارية، تصميم موقع، توجيه فني",
      disciplines: "هوية، تغليف، موقع",
      intro:
        "شركة سعودية لتغليف المطاعم صيغت كهوية متكاملة وتجربة موقع واضحة لقطاع الأغذية.",
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
          "تقدم التجربة النهائية Pakman كعلامة تغليف مهنية ومتكاملة، تربط فئات المنتجات وتطبيقات التغليف وثقة العملاء والمقر وطلب عرض السعر في رحلة رقمية واضحة.",
      },
      gallery: [
        {
          title: "واجهة الموقع",
          caption: "يفتتح الموقع تجربة Pakman كشريك تغليف مميز للمطاعم والمقاهي.",
        },
        {
          title: "فئات المنتجات",
          caption:
            "نظام منتجات منظم يجمع الأكواب والأكياس والصناديق والملصقات واحتياجات خدمة الطعام لتصفح واضح.",
        },
        {
          title: "عن Pakman",
          caption:
            "قسم تعريفي يربط خبرة Pakman السعودية في التغليف بقطاع الضيافة والأغذية.",
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
            "مراجع العملاء تبرز دعم النظام للمطاعم والمقاهي وعلامات الأغذية في التشغيل اليومي.",
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
        "أصبحت Pakman دراسة حالة متكاملة لشركة تغليف مطاعم سعودية، تجمع الهوية التجارية وتوجيه التغليف وتصميم الموقع وتصميم الواجهة والتوجيه الفني في حضور رقمي واضح يخدم قطاع الأغذية.",
    },
  },
};

export function projectDisplay(slug: string, language: Language) {
  return projectCopy[slug]?.[language] ?? {};
}

export function localizeProject<
  T extends {
    slug: string;
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
