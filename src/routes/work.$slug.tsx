import { createFileRoute, Link, notFound, redirect } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SiteLayout, SectionLabel } from "@/components/site/Layout";
import {
  BidiText,
  EnglishLayoutSlot,
  formatLocalizedNumber,
  localizeProject,
  siteCopy,
  useLanguage,
} from "@/lib/language";
import mahnImg from "@/assets/projects/mahn.webp";
import lilyImg from "@/assets/projects/lily.webp";

import coutureExperienceHero from "@/assets/projects/couture-experience/01-hero-couture-experience.png";
import tartaHero from "@/assets/projects/tarta-de-amor/01-hero.webp";
import tartaOrderExperience from "@/assets/projects/tarta-de-amor/02-order-experience.webp";
import tartaChocolateSauce from "@/assets/projects/tarta-de-amor/03-chocolate-sauce.webp";
import tartaPackaging from "@/assets/projects/tarta-de-amor/04-packaging-presentation.webp";
import tartaMoments from "@/assets/projects/tarta-de-amor/05-made-for-moments.webp";
import tartaPresented from "@/assets/projects/tarta-de-amor/06-presented-before-opened.webp";
import tartaContact from "@/assets/projects/tarta-de-amor/07-contact-final.webp";
import coutureExperienceCouture from "@/assets/projects/couture-experience/02-couture.webp";
import coutureExperienceRtw from "@/assets/projects/couture-experience/03-rtw.webp";
import coutureExperienceBridal from "@/assets/projects/couture-experience/04-bridal.webp";
import coutureExperienceBridalDetails from "@/assets/projects/couture-experience/05-bridal-details.webp";
import coutureExperienceJournal from "@/assets/projects/couture-experience/06-journal.webp";
import coutureExperiencePress from "@/assets/projects/couture-experience/07-press.webp";
import coutureExperiencePresence from "@/assets/projects/couture-experience/08-house-presence.webp";
import coutureExperienceWornBy from "@/assets/projects/couture-experience/09-worn-by.webp";
import coutureExperienceEvents from "@/assets/projects/couture-experience/10-events.webp";
import lillyHero from "@/assets/projects/lilly-breeze/01-home-hero.webp";
import lillyArrival from "@/assets/projects/lilly-breeze/02-house-arrival.webp";
import lillyPhilosophy from "@/assets/projects/lilly-breeze/03-philosophy.webp";
import lillyRituals from "@/assets/projects/lilly-breeze/04-rituals.webp";
import lillyFragments from "@/assets/projects/lilly-breeze/05-fragments-note.webp";
import lillyGallery from "@/assets/projects/lilly-breeze/06-visual-gallery.webp";
import lillyPromise from "@/assets/projects/lilly-breeze/07-promise.webp";
import lillyInvitation from "@/assets/projects/lilly-breeze/08-invitation.webp";
import sipHero from "@/assets/projects/sip/01-hero.webp";
import sipProductLineup from "@/assets/projects/sip/02-product-lineup.webp";
import sipZeroRange from "@/assets/projects/sip/03-zero-range.webp";
import sipBrandStory from "@/assets/projects/sip/04-brand-story.webp";
import sipProductCards from "@/assets/projects/sip/05-product-cards.webp";
import mihnHero from "@/assets/projects/mihn/01-hero-home.webp";
import mihnIntro from "@/assets/projects/mihn/02-introduction.webp";
import mihnDashOne from "@/assets/projects/mihn/03-dashboard-overview.webp";
import mihnDashTwo from "@/assets/projects/mihn/04-management-interface.webp";
import mihnDashThree from "@/assets/projects/mihn/05-platform-operations.webp";
import mihnSignIn from "@/assets/projects/mihn/06-authentication-experience.webp";
import noorixHero from "@/assets/projects/noorix/01-website-hero.webp";
import noorixPositioning from "@/assets/projects/noorix/02-brand-positioning.webp";
import noorixSpaces from "@/assets/projects/noorix/03-premium-spaces.webp";
import noorixColorSystem from "@/assets/projects/noorix/04-color-system.webp";
import noorixTransformation from "@/assets/projects/noorix/05-transformation.webp";
import noorixOrigin from "@/assets/projects/noorix/06-origin-hero.webp";
import noorixApplication from "@/assets/projects/noorix/07-brand-application.webp";
import noorixProductSpectrum from "@/assets/projects/noorix/08-product-spectrum.webp";
import noorixPaletteCollection from "@/assets/projects/noorix/09-palette-collection.webp";
import noorixTrendReport from "@/assets/projects/noorix/10-color-trend-report.webp";
import pokemonHero from "@/assets/projects/pokemon-sa/01-hero-home.webp";
import pokemonBrandExperience from "@/assets/projects/pokemon-sa/02-brand-experience.webp";
import pokemonTradingCards from "@/assets/projects/pokemon-sa/03-trading-cards.webp";
import pokemonSealedProducts from "@/assets/projects/pokemon-sa/04-sealed-products.webp";
import pokemonCollectibles from "@/assets/projects/pokemon-sa/05-collectibles.webp";
import pokemonMerchandise from "@/assets/projects/pokemon-sa/06-merchandise.webp";
import pokemonApparel from "@/assets/projects/pokemon-sa/07-apparel.webp";
import pokemonHoodies from "@/assets/projects/pokemon-sa/08-hoodies.webp";
import pokemonCustomBuilder from "@/assets/projects/pokemon-sa/09-custom-builder.webp";
import pokemonCommunityGamification from "@/assets/projects/pokemon-sa/10-community-gamification.webp";
import pokemonRareMarketplace from "@/assets/projects/pokemon-sa/11-rare-marketplace.webp";
import jorofHero from "@/assets/projects/jorof/01-hero.webp";
import jorofIntro from "@/assets/projects/jorof/02-intro.webp";
import jorofBrandStory from "@/assets/projects/jorof/03-brand-story.webp";
import jorofProductRange from "@/assets/projects/jorof/04-product-range.webp";
import jorofManufacturing from "@/assets/projects/jorof/05-manufacturing.webp";
import jorofQuality from "@/assets/projects/jorof/06-quality-assurance.webp";
import jorofCustomerJourney from "@/assets/projects/jorof/07-customer-journey.webp";
import jorofContact from "@/assets/projects/jorof/08-contact-acquisition.webp";
import pakmanHero from "@/assets/projects/pakman/01-hero.webp";
import pakmanProductCategories from "@/assets/projects/pakman/02-product-categories.webp";
import pakmanAbout from "@/assets/projects/pakman/03-about-pakman.webp";
import pakmanPackagingGallery from "@/assets/projects/pakman/04-packaging-gallery.webp";
import pakmanClients from "@/assets/projects/pakman/05-clients.webp";
import pakmanHeadquarters from "@/assets/projects/pakman/06-headquarters.webp";
import pakmanQuoteForm from "@/assets/projects/pakman/07-quote-form.webp";
import pakmanFooter from "@/assets/projects/pakman/08-footer-final.webp";
import pakmanFoodBusinesses from "@/assets/projects/pakman/09-food-businesses.webp";
import pakmanWhy from "@/assets/projects/pakman/10-why-pakman.webp";
import circleSectionHero from "@/assets/projects/circle-section/01-hero.webp";
import circleSectionIntro from "@/assets/projects/circle-section/02-intro.webp";
import circleSectionFlavorHeader from "@/assets/projects/circle-section/03-flavor-header.webp";
import circleSectionMenu from "@/assets/projects/circle-section/04-menu-experience.webp";
import circleSectionMainEvent from "@/assets/projects/circle-section/05-main-event.webp";
import circleSectionHotdog from "@/assets/projects/circle-section/06-hotdog-detail.webp";
import circleSectionReasons from "@/assets/projects/circle-section/07-brand-reasons.webp";
import circleSectionDessert from "@/assets/projects/circle-section/08-dessert-detail.webp";
import circleSectionStoryRoom from "@/assets/projects/circle-section/09-story-room.webp";
import circleSectionBigFlavor from "@/assets/projects/circle-section/10-big-flavor.webp";
import circleSectionTrustStory from "@/assets/projects/circle-section/11-trust-story.webp";
import circleSectionDelivery from "@/assets/projects/circle-section/12-delivery-experience.webp";
import circleSectionContact from "@/assets/projects/circle-section/13-contact-experience.webp";
import circleSectionFooterBrand from "@/assets/projects/circle-section/14-footer-brand.webp";
import opalStonesHero from "@/assets/projects/opal-stones/01-homepage-hero.webp";
import opalStonesLogo from "@/assets/projects/opal-stones/02-logo-cover.webp";
import opalBeginPiece from "@/assets/projects/opal-stones/03-begin-with-piece.webp";
import opalChoices from "@/assets/projects/opal-stones/04-choices-before-sketch.webp";
import opalCraftDetails from "@/assets/projects/opal-stones/05-craft-details.webp";
import opalStoneStories from "@/assets/projects/opal-stones/06-stone-stories.webp";
import opalCommissions from "@/assets/projects/opal-stones/07-commissions.webp";
import opalEmeraldNecklace from "@/assets/projects/opal-stones/08-emerald-necklace.webp";
import opalPrivateAppointment from "@/assets/projects/opal-stones/09-private-appointment.webp";
import exEventsHero from "@/assets/projects/ex-events-exhibitions/01-hero.webp";
import exEventsHomepageHero from "@/assets/projects/ex-events-exhibitions/02-homepage-hero.webp";
import exOperationsOverview from "@/assets/projects/ex-events-exhibitions/03-operations-overview.webp";
import exOperationsSystem from "@/assets/projects/ex-events-exhibitions/04-operations-system.webp";
import exCompanyValues from "@/assets/projects/ex-events-exhibitions/05-company-values.webp";
import exFieldWork from "@/assets/projects/ex-events-exhibitions/06-field-work.webp";
import exMajorProjects from "@/assets/projects/ex-events-exhibitions/07-major-projects.webp";
import exMission from "@/assets/projects/ex-events-exhibitions/08-mission.webp";
import exBehindScenes from "@/assets/projects/ex-events-exhibitions/09-behind-the-scenes.webp";
import exContact from "@/assets/projects/ex-events-exhibitions/10-contact.webp";
import firstAdvanceHero from "@/assets/projects/first-advance/01-hero-homepage.webp";
import firstAdvanceAbout from "@/assets/projects/first-advance/02-company-introduction.webp";
import firstAdvanceVision from "@/assets/projects/first-advance/03-vision-mission.webp";
import firstAdvanceServices from "@/assets/projects/first-advance/04-services.webp";
import firstAdvanceProcess from "@/assets/projects/first-advance/05-work-process.webp";
import firstAdvanceAudience from "@/assets/projects/first-advance/06-target-audience.webp";
import firstAdvancePackages from "@/assets/projects/first-advance/07-packages-offers.webp";
import firstAdvanceWhy from "@/assets/projects/first-advance/08-why-us.webp";
import firstAdvanceContact from "@/assets/projects/first-advance/09-contact.webp";
import osamaLawHero from "@/assets/projects/osama-bin-mahfouz-law-firm/01-hero-homepage.jpg";
import osamaLawLogoIntro from "@/assets/projects/osama-bin-mahfouz-law-firm/02-logo-intro.jpg";
import osamaLawAbout from "@/assets/projects/osama-bin-mahfouz-law-firm/03-about-statement.jpg";
import osamaLawServices from "@/assets/projects/osama-bin-mahfouz-law-firm/04-legal-services.jpg";
import osamaLawContact from "@/assets/projects/osama-bin-mahfouz-law-firm/05-contact-footer.jpg";
import osamaLawValues from "@/assets/projects/osama-bin-mahfouz-law-firm/06-process-values.jpg";
import bamaroufStudioHero from "@/assets/projects/bamarouf-studio/01-three-doors-main-concept.jpg";
import bamaroufStudioNoor from "@/assets/projects/bamarouf-studio/02-noor-world.jpg";
import bamaroufStudioHouse from "@/assets/projects/bamarouf-studio/03-house-philosophy.jpg";
import bamaroufStudioTarik from "@/assets/projects/bamarouf-studio/04-tarik-world.jpg";
import bamaroufStudioMeet from "@/assets/projects/bamarouf-studio/05-when-worlds-meet.jpg";
import bamaroufStudioKhaled from "@/assets/projects/bamarouf-studio/06-khaled-world.jpg";
import bamaroufStudioDestination from "@/assets/projects/bamarouf-studio/07-choose-destination.jpg";
import bamaroufStudioPrinciples from "@/assets/projects/bamarouf-studio/08-house-principles.jpg";
import khalidBamaroufIntro from "@/assets/projects/khalid-bamarouf/01-intro-loading.jpg";
import khalidBamaroufHero from "@/assets/projects/khalid-bamarouf/02-hero.jpg";
import khalidBamaroufWhatIDo from "@/assets/projects/khalid-bamarouf/03-what-i-do.jpg";
import khalidBamaroufWhy from "@/assets/projects/khalid-bamarouf/04-why-work-with-me.jpg";
import khalidBamaroufCapabilities from "@/assets/projects/khalid-bamarouf/05-capabilities.jpg";
import khalidBamaroufProcess from "@/assets/projects/khalid-bamarouf/06-process.jpg";
import khalidBamaroufOperatingNotes from "@/assets/projects/khalid-bamarouf/07-operating-notes-contact.jpg";
import noorBamaroufHero from "@/assets/projects/noor-bamarouf/01-hero-matcha.jpg";
import noorBamaroufIntro from "@/assets/projects/noor-bamarouf/02-introduction.jpg";
import noorBamaroufSelectedWork from "@/assets/projects/noor-bamarouf/03-selected-work-overview.jpg";
import noorBamaroufWello from "@/assets/projects/noor-bamarouf/04-wello-featured-project.jpg";
import noorBamaroufServices from "@/assets/projects/noor-bamarouf/05-services.jpg";
import noorBamaroufWemo from "@/assets/projects/noor-bamarouf/06-wemo-delights.jpg";
import noorBamaroufMoreWork from "@/assets/projects/noor-bamarouf/07-more-work-contact.jpg";

type GalleryItem = { image: string; title: string; caption: string; fit?: "cover" | "contain" };

type ProjectData = {
  slug: string;
  name: string;
  category: string;
  intro: string;
  image: string;
  details: {
    client: string;
    industry: string;
    services: string;
    year: string;
    platform: string;
  };
  overview?: { challenge: string; approach: string; outcome: string };
  gallery?: GalleryItem[];
  reflection?: string;
  nextSlug?: string;
  url?: string;
};

const SITE_URL = "https://tarikbamarouf.com";
const LEGACY_PROJECT_SLUGS: Record<string, string> = {
  "maison-elan": "couture-experience",
};

const PROJECTS: ProjectData[] = [
  {
    slug: "couture-experience",
    name: "Couture Experience",
    category: "Luxury Couture House",
    intro:
      "A luxury fashion house website designed around couture, bridal, ready-to-wear, editorial storytelling, and house presence.",
    image: coutureExperienceHero,
    details: {
      client: "Couture Experience",
      industry: "Luxury Couture",
      services: "Website Design and Development",
      year: "2026",
      platform: "Luxury Couture Website",
    },
    overview: {
      challenge:
        "Couture Experience presents couture collections, bridal creations, ready-to-wear capsules, editorial stories, press presence, and private house moments through a refined cinematic website.",
      approach:
        "The goal was to build a premium online presence that feels elegant, restrained, and visually memorable while allowing the brand’s collections and atmosphere to lead the experience.",
      outcome:
        "Every chapter of the house is composed with the same quiet authority, so the website reads as one continuous editorial experience rather than a catalogue.",
    },
    gallery: [
      {
        image: coutureExperienceCouture,
        title: "Couture World",
        caption: "A restrained visual direction for the house’s couture identity.",
      },
      {
        image: coutureExperienceRtw,
        title: "Ready to Wear",
        caption:
          "A seasonal product experience designed with clarity, softness, and luxury spacing.",
      },
      {
        image: coutureExperienceBridal,
        title: "Bridal Archive",
        caption: "A quiet presentation of bridal creations, craftsmanship, and detail.",
      },
      {
        image: coutureExperienceBridalDetails,
        title: "Bridal Details",
        caption: "Close visual storytelling for embroidery, texture, and ceremony.",
      },
      {
        image: coutureExperienceJournal,
        title: "Journal",
        caption: "Editorial storytelling built to extend the house beyond product.",
      },
      {
        image: coutureExperiencePress,
        title: "In The Press",
        caption: "A dedicated media presence for features, interviews, and brand visibility.",
      },
      {
        image: coutureExperiencePresence,
        title: "House Presence",
        caption: "A cinematic presentation of runway, cultural presence, and public moments.",
      },
      {
        image: coutureExperienceWornBy,
        title: "Worn By",
        caption: "A visual archive of the women, occasions, and figures connected to the house.",
      },
      {
        image: coutureExperienceEvents,
        title: "Events",
        caption: "Private gatherings and atmospheric moments presented as part of the brand world.",
      },
    ],
    reflection:
      "The final experience positions Couture Experience as a refined luxury couture house, combining visual storytelling, collection presentation, editorial depth, and premium digital presence in one cohesive website.",
  },
  {
    slug: "tarta-de-amor",
    name: "Tarta De Amor",
    category: "Luxury Dessert Brand / Premium E-Commerce Experience",
    intro:
      "A luxury Madrid Cheesecake brand built around gifting, premium presentation, and elevated digital ordering.",
    image: tartaHero,
    details: {
      client: "Tarta De Amor",
      industry: "Luxury Dessert Brand",
      services:
        "Brand Direction, Creative Direction, Website Design, E-Commerce Experience, Product Presentation, Conversion-Focused UX",
      year: "2026",
      platform: "Premium E-Commerce Experience",
    },
    url: "#",
  },
  {
    slug: "mahn-platform",
    name: "Mihn",
    category: "Employment Platform / UX/UI Experience",
    intro:
      "A Saudi employment and operations platform shaped around job discovery, candidate onboarding, and clear management workflows.",
    image: mahnImg,
    details: {
      client: "Mihn",
      industry: "Employment Technology",
      services: "UX/UI Design, Candidate Experience, Operations Interface, Front-end Experience",
      year: "2026",
      platform: "Employment and Operations Platform",
    },
  },
  {
    slug: "norx-paints",
    name: "NOORIX",
    category: "Brand Identity and Website Experience",
    intro:
      "A visual identity and website experience shaped around premium presence, color, and customer trust.",
    image: noorixOrigin,
    details: {
      client: "NOORIX",
      industry: "Interiors and Coatings",
      services: "Naming, Brand Identity, Visual Direction, Website Design and Front-end Craft",
      year: "2026",
      platform: "Brand Identity and Website Experience",
    },
  },
  {
    slug: "pikmon-store",
    name: "Pokémon SA",
    category: "Collectibles E-Commerce Experience",
    intro:
      "A Pokémon-inspired e-commerce experience for collectors, merchandise, customization, and playful brand moments.",
    image: pokemonHero,
    details: {
      client: "Pokémon SA",
      industry: "Collectibles and E-Commerce",
      services:
        "Brand Creation, Naming, Brand Strategy, Visual Identity, Logo Design, User Experience Design, Product Experience and Website Development",
      year: "2026",
      platform: "E-Commerce Website",
    },
  },
  {
    slug: "lily-home-spa",
    name: "Lilly Breeze",
    category: "Luxury Wellness Experience",
    intro:
      "A private luxury wellness experience designed around discretion, ritual, atmosphere, and in-home spa services.",
    image: lilyImg,
    details: {
      client: "Lilly Breeze",
      industry: "Luxury Wellness",
      services: "Website Design and Development",
      year: "2026",
      platform: "Luxury Wellness Website",
    },
  },
  {
    slug: "sip",
    name: "SIP",
    category: "Saudi Beverage Brand",
    intro:
      "A Saudi beverage brand developed from the ground up, spanning naming, identity, visual direction, digital presence, and website experience.",
    image: sipHero,
    details: {
      client: "SIP",
      industry: "Beverage",
      services: "Naming, Brand Identity, Website Design and Development",
      year: "2026",
      platform: "Beverage Brand",
    },
  },
  {
    slug: "jorof",
    name: "JOROF",
    category: "Brand Identity, Creative Direction, UX/UI, Website Design",
    intro:
      "A Saudi bottled water brand shaped into a complete digital identity and website experience around clarity, trust, quality, and daily reliability.",
    image: jorofHero,
    details: {
      client: "JOROF",
      industry: "Bottled Water",
      services:
        "Creative Direction, Visual Identity, UX/UI Design, Website Design, Front-end Experience",
      year: "2026",
      platform: "Brand Identity and Website Experience",
    },
  },
  {
    slug: "pakman",
    name: "Pakman",
    category: "Brand Identity, Website Design, Art Direction",
    intro:
      "A Saudi restaurant packaging company shaped into a complete brand identity, packaging direction, and website experience for food businesses.",
    image: pakmanHero,
    details: {
      client: "Pakman",
      industry: "Restaurant Packaging",
      services:
        "Logo, Brand Identity, Visual Direction, Packaging Concept, Website Design, User Interface Direction, Art Direction",
      year: "2026",
      platform: "Packaging Brand Website",
    },
  },
  {
    slug: "circle-section",
    name: "Circle Section",
    category: "Brand Identity, UX/UI Design, Web Design, Front-end Development, Content Direction",
    intro:
      "Circle Section is a premium smash burger restaurant in Jeddah. The project shaped the complete digital experience from strategy to execution.",
    image: circleSectionHero,
    details: {
      client: "Circle Section",
      industry: "Restaurant / Smash Burger",
      services:
        "Brand Positioning, UX/UI Design, Content Direction, Website Design, Front-end Implementation, Menu Experience, Motion, Performance Optimization",
      year: "2026",
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
        image: circleSectionHero,
        title: "Hero and Header Experience",
        caption:
          "The main website entry introduces Circle Section through a clear header, burger-led composition, and direct paths into the restaurant experience.",
        fit: "contain",
      },
      {
        image: circleSectionIntro,
        title: "Intro Brand Moment",
        caption:
          "A bold opening brand screen establishes the Circle Section identity before the visitor moves into the website.",
        fit: "contain",
      },
      {
        image: circleSectionFlavorHeader,
        title: "Flavor System",
        caption:
          "The visual language frames product photography, copy, and interface cards around the idea of a circular flavor experience.",
        fit: "contain",
      },
      {
        image: circleSectionMenu,
        title: "Menu Experience",
        caption:
          "The menu organizes burgers and categories with a light interface, clear item hierarchy, and an easy browsing rhythm.",
        fit: "contain",
      },
      {
        image: circleSectionMainEvent,
        title: "Menu Showcase",
        caption:
          "Food sections highlight sides and supporting products with strong imagery and structured product cards.",
        fit: "contain",
      },
      {
        image: circleSectionHotdog,
        title: "Product Detail",
        caption:
          "Individual menu moments give each product space to feel distinct while keeping the same brand energy.",
        fit: "contain",
      },
      {
        image: circleSectionReasons,
        title: "Brand Reasons",
        caption:
          "A compact value section explains why guests return, pairing direct copy with a warm set of product-led cards.",
        fit: "contain",
      },
      {
        image: circleSectionDessert,
        title: "Dessert Detail",
        caption:
          "Dessert presentation extends the menu experience beyond burgers without losing the brand's playful personality.",
        fit: "contain",
      },
      {
        image: circleSectionStoryRoom,
        title: "Story Section",
        caption:
          "The story chapter connects flavor, people, and place through restaurant context, brand copy, and atmospheric details.",
        fit: "contain",
      },
      {
        image: circleSectionBigFlavor,
        title: "Big Flavor",
        caption:
          "A product-led storytelling section pairs burger imagery with bold editorial typography and focused brand messaging.",
        fit: "contain",
      },
      {
        image: circleSectionTrustStory,
        title: "In Circle We Trust",
        caption:
          "Brand trust is expressed through food photography, concise storytelling, and a relaxed restaurant tone.",
        fit: "contain",
      },
      {
        image: circleSectionDelivery,
        title: "Delivery Experience",
        caption:
          "The delivery section turns ordering services into a branded moment with simple choices and strong orange presence.",
        fit: "contain",
      },
      {
        image: circleSectionContact,
        title: "Contact Experience",
        caption:
          "The contact section combines location, opening hours, and direct action in a clean interface built for real visits.",
        fit: "contain",
      },
      {
        image: circleSectionFooterBrand,
        title: "Final Brand View",
        caption:
          "The closing brand moment keeps the logo, color, and final action simple, memorable, and easy to recognize.",
        fit: "contain",
      },
    ],
    reflection:
      "Circle Section became a complete restaurant digital experience, combining brand clarity, menu structure, responsive interface design, content direction, motion, and front-end implementation into a premium website that preserves the brand's personality.",
  },
  {
    slug: "opal-stones",
    name: "OPAL STONES",
    category:
      "Luxury Brand Identity, UX/UI Design, Website Design, Front-end Craft, Content Direction",
    intro:
      "OPAL STONES is a contemporary Saudi fine jewellery maison focused on timeless craftsmanship and bespoke pieces.",
    image: opalStonesHero,
    details: {
      client: "OPAL STONES",
      industry: "Fine Jewellery / Luxury Maison, Saudi Arabia",
      services:
        "Brand Direction, UX/UI Design, Content Direction, Editorial Experience, Responsive Design, Front-end Craft",
      year: "2026",
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
        image: opalStonesHero,
        title: "Homepage Experience",
        caption:
          "The homepage opens with a cinematic jewellery composition and positions OPAL STONES as a contemporary luxury maison.",
        fit: "contain",
      },
      {
        image: opalStonesLogo,
        title: "Logo and Brand Cover",
        caption:
          "The logo cover establishes the maison identity with a quiet, tactile, and premium visual tone.",
        fit: "contain",
      },
      {
        image: opalBeginPiece,
        title: "Begin With The Piece",
        caption:
          "The collection entry frames rings, necklaces, and earrings through editorial spacing and refined product storytelling.",
        fit: "contain",
      },
      {
        image: opalChoices,
        title: "Before The First Sketch",
        caption:
          "A curated product pathway lets visitors begin with a category, a mood, a material, or a bespoke direction.",
        fit: "contain",
      },
      {
        image: opalCraftDetails,
        title: "Craft and Detail",
        caption:
          "Behind-the-scenes jewellery imagery brings handwork, stone setting, and atelier detail into the digital experience.",
        fit: "contain",
      },
      {
        image: opalStoneStories,
        title: "Stone Stories",
        caption:
          "Editorial cards introduce bracelets, bridal suites, and heirloom rework as distinct maison narratives.",
        fit: "contain",
      },
      {
        image: opalCommissions,
        title: "Private Commissions",
        caption:
          "The commission chapter communicates bespoke pieces through restraint, space, and a quiet sense of ceremony.",
        fit: "contain",
      },
      {
        image: opalEmeraldNecklace,
        title: "Editorial Product Moment",
        caption:
          "A focused jewellery feature gives a single emerald necklace the atmosphere and attention of an editorial spread.",
        fit: "contain",
      },
      {
        image: opalPrivateAppointment,
        title: "Private Appointment",
        caption:
          "The final appointment flow turns inquiry into a composed private consultation rather than a standard checkout.",
        fit: "contain",
      },
    ],
    reflection:
      "OPAL STONES became a luxury digital experience for a contemporary Saudi fine jewellery maison, combining brand direction, editorial UX, premium interface design, content direction, responsive layouts, and front-end development into a refined online presence.",
  },
  {
    slug: "ex-events-exhibitions",
    name: "EX Events & Exhibitions",
    category: "UX/UI Design, Website Design, Brand Presence, Front-end Craft",
    intro:
      "A Saudi events and exhibitions brand shaped into a premium website with clear service storytelling and a confident digital presence.",
    image: exEventsHero,
    details: {
      client: "EX Events & Exhibitions",
      industry: "Events and Exhibitions / Saudi Arabia",
      services:
        "UX/UI Design, Website Design, Content Direction, Responsive Design, Motion Direction, Front-end Craft",
      year: "2026",
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
        image: exEventsHero,
        title: "Hero and Brand Entry",
        caption:
          "The opening visual introduces EX through a cinematic command-room atmosphere, linking the brand to precision, scale, and readiness.",
        fit: "contain",
      },
      {
        image: exEventsHomepageHero,
        title: "Homepage Hero",
        caption:
          "The homepage frames EX as a company that leads major event details through professionalism, planning, and on-site execution.",
        fit: "contain",
      },
      {
        image: exOperationsOverview,
        title: "Service Overview",
        caption:
          "A compact service section presents experience, VIP protocol, media, exhibitions, and events with clear hierarchy.",
        fit: "contain",
      },
      {
        image: exOperationsSystem,
        title: "Service Flow",
        caption:
          "The service flow translates planning, documentation, supervision, field execution, and protocol into one readable sequence.",
        fit: "contain",
      },
      {
        image: exCompanyValues,
        title: "Company Values",
        caption:
          "The values chapter communicates professionalism, commitment, transparency, and efficiency with a restrained interface.",
        fit: "contain",
      },
      {
        image: exBehindScenes,
        title: "Behind The Scenes",
        caption:
          "Execution imagery shows field teams, venues, production moments, and the visible discipline behind major events.",
        fit: "contain",
      },
      {
        image: exMission,
        title: "Mission",
        caption:
          "The mission section clarifies the company's role in improving the visitor experience through preparation, planning, and precise execution.",
        fit: "contain",
      },
      {
        image: exMajorProjects,
        title: "Major Projects",
        caption:
          "Milestone projects are presented with strong event imagery and structured cards that communicate scale, reliability, and experience.",
        fit: "contain",
      },
      {
        image: exContact,
        title: "Contact and Consultation",
        caption:
          "The contact section turns inquiry into a focused consultation path with clear channels for WhatsApp, calls, email, and appointment requests.",
        fit: "contain",
      },
      {
        image: exFieldWork,
        title: "Field Work",
        caption:
          "Field-work moments highlight official occasions, guest guidance, site presence, and the visible discipline of live execution.",
        fit: "contain",
      },
    ],
    reflection:
      "EX Events & Exhibitions became a premium website and digital brand presence, connecting UX/UI, content direction, motion, responsive design, and front-end craft.",
  },
  {
    slug: "first-advance",
    name: "First Advance",
    category: "Brand Identity, Logo Design, UX/UI Design, Website Design, Front-end Craft",
    intro:
      "A Saudi service brand shaped through a refined logo, calm identity, clear UX/UI, and a composed website experience.",
    image: firstAdvanceHero,
    details: {
      client: "First Advance",
      industry: "Service Brand / Saudi Arabia",
      services:
        "Logo Design, Brand Direction, UX/UI Design, Website Design, Content Direction, Responsive Design, Front-end Craft",
      year: "2026",
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
        image: firstAdvanceHero,
        title: "Hero and Homepage",
        caption:
          "The homepage introduces First Advance through a calm Saudi business identity, a refined logo presence, and a clear service promise.",
        fit: "contain",
      },
      {
        image: firstAdvanceServices,
        title: "Services Structure",
        caption:
          "The services chapter organizes the offer into clear sections that make the brand easy to understand.",
        fit: "contain",
      },
      {
        image: firstAdvanceAbout,
        title: "Company Introduction",
        caption:
          "The company introduction frames First Advance as a composed Saudi service brand with a clear promise.",
        fit: "contain",
      },
      {
        image: firstAdvanceVision,
        title: "Vision and Mission",
        caption:
          "The vision and mission section clarifies the company's ambition, service philosophy, and commitment to quality.",
        fit: "contain",
      },
      {
        image: firstAdvanceAudience,
        title: "Target Audience",
        caption:
          "The audience section gives each visitor group a simple visual context and a clear reason to keep reading.",
        fit: "contain",
      },
      {
        image: firstAdvanceProcess,
        title: "Work Process",
        caption:
          "The process section presents a simple working rhythm from understanding the need to shaping the right service path.",
        fit: "contain",
      },
      {
        image: firstAdvanceWhy,
        title: "Why First Advance",
        caption:
          "The trust section communicates service integration, responsiveness, compliance, and long-term client relationships.",
        fit: "contain",
      },
      {
        image: firstAdvancePackages,
        title: "Packages and Offers",
        caption:
          "The packages section turns service offers into an easy comparison with direct inquiry paths.",
        fit: "contain",
      },
      {
        image: firstAdvanceContact,
        title: "Contact Experience",
        caption:
          "The closing section gives visitors a clear path to WhatsApp and email while keeping the brand calm and composed.",
        fit: "contain",
      },
    ],
    reflection:
      "First Advance became a calm service-brand website, combining logo design, brand direction, UX/UI, content direction, responsive design, and front-end craft.",
  },
  {
    slug: "osama-bin-mahfouz-law-firm",
    name: "Osama Bin Ahmed Bin Mahfouz Law Firm",
    category: "Law Firm Website",
    intro:
      "A refined bilingual website created for Osama Bin Ahmed Bin Mahfouz Law Firm, combining Saudi architectural references, professional legal clarity and a quiet premium visual language. The experience presents the firm, its legal services and direct communication channels through a structured Arabic and English interface.",
    image: osamaLawHero,
    details: {
      client: "Osama Bin Ahmed Bin Mahfouz Law Firm",
      industry: "Legal Services / Saudi Arabia",
      services:
        "Web Design, UX/UI Design, Arabic & English Experience, Front-End Development, Responsive Design, Visual Direction",
      year: "2026",
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
        image: osamaLawHero,
        title: "Hero and Homepage View",
        caption:
          "The homepage introduces the firm through Saudi architectural atmosphere, a clear legal promise, and direct paths into services and consultation.",
        fit: "contain",
      },
      {
        image: osamaLawLogoIntro,
        title: "Intro and Logo View",
        caption:
          "The official identity is presented with restraint, giving the brand mark room to feel formal, sharp, and memorable.",
        fit: "contain",
      },
      {
        image: osamaLawAbout,
        title: "About and Statement Section",
        caption:
          "The firm story pairs a confident legal statement with premium interior and architectural references.",
        fit: "contain",
      },
      {
        image: osamaLawServices,
        title: "Legal Services Section",
        caption:
          "Legal services are organized through a calm interface that makes each practice area easy to scan and understand.",
        fit: "contain",
      },
      {
        image: osamaLawContact,
        title: "Contact and Footer Section",
        caption:
          "The final contact area brings calls, WhatsApp, email, firm details, and legal-service navigation into one structured closing moment.",
        fit: "contain",
      },
      {
        image: osamaLawValues,
        title: "Values and Communication Journey",
        caption:
          "Supporting sections clarify the firm’s values and communication process with a composed visual rhythm.",
        fit: "contain",
      },
    ],
    reflection:
      "The project became a premium bilingual law-firm website, combining website design, UX/UI, Arabic and English experience, front-end development, responsive design, and visual direction into one composed digital presence.",
  },
  {
    slug: "bamarouf-studio",
    name: "BAMAROUF STUDIO",
    category: "Digital Ecosystem & Brand Experience",
    intro:
      "BAMAROUF STUDIO is a premium digital gateway connecting three independent professional worlds under one architectural identity. The experience was designed as a house of specialists, allowing visitors to enter the distinct worlds of digital experiences, graphic design and systems engineering while preserving the identity and character of each discipline.",
    image: bamaroufStudioHero,
    details: {
      client: "BAMAROUF STUDIO",
      industry: "Digital Ecosystem / Family Brand Gateway",
      services:
        "Digital Strategy, Website Design, UX/UI Design, Creative Direction, Front-End Development, Bilingual Experience, Responsive Design, Brand Ecosystem Architecture",
      year: "2026",
      platform: "Website Design & Development",
    },
    url: "https://bamaroufstudio.com",
    overview: {
      challenge:
        "The project needed to present three independent professional worlds without making them feel like one generic agency. Each destination needed its own character while still belonging to one refined family ecosystem.",
      approach:
        "The experience was shaped as an architectural house: a cinematic gateway, three distinct destinations, bilingual navigation, and restrained editorial pages that allow each world to feel independent and connected.",
      outcome:
        "The final website gives visitors a premium way to choose the right specialist, moving from the parent house into Tarik, Noor, or Khaled with clarity, atmosphere, and trust.",
    },
    gallery: [
      {
        image: bamaroufStudioHero,
        title: "Three Doors / Main Concept",
        caption:
          "The opening world presents three architectural destinations under one quiet BAMAROUF STUDIO identity.",
        fit: "contain",
      },
      {
        image: bamaroufStudioNoor,
        title: "Noor World",
        caption:
          "The graphic design destination carries a softer visual atmosphere while staying connected to the parent house.",
        fit: "contain",
      },
      {
        image: bamaroufStudioHouse,
        title: "House Philosophy",
        caption:
          "The house story explains how three independent disciplines can live side by side without becoming alike.",
        fit: "contain",
      },
      {
        image: bamaroufStudioTarik,
        title: "Tarik World",
        caption:
          "The digital experiences destination is framed with darker architectural materials, motion, and interaction cues.",
        fit: "contain",
      },
      {
        image: bamaroufStudioMeet,
        title: "When the Worlds Meet",
        caption:
          "A transitional chapter gives the collaboration model a calm architectural rhythm and keeps responsibilities clear.",
        fit: "contain",
      },
      {
        image: bamaroufStudioKhaled,
        title: "Khaled World",
        caption:
          "The systems engineering destination uses stone, structure, and measured composition to express precision.",
        fit: "contain",
      },
      {
        image: bamaroufStudioDestination,
        title: "Choose Your Destination",
        caption:
          "The selection experience helps visitors enter the world their project needs without confusion or unnecessary friction.",
        fit: "contain",
      },
      {
        image: bamaroufStudioPrinciples,
        title: "House Principles",
        caption:
          "The closing principles clarify autonomy, purpose, rigour, shared standards, and the single vision behind the house.",
        fit: "contain",
      },
    ],
    reflection:
      "BAMAROUF STUDIO became a refined digital ecosystem: one architectural address for three specialist worlds, each with its own identity, voice, and purpose.",
  },
  {
    slug: "khalid-bamarouf",
    name: "KHALID BAMAROUF",
    category: "AI Automation & Systems Engineering",
    intro:
      "A premium engineering website designed for Khalid Bamarouf, presenting AI automation, systems engineering, enterprise architecture and intelligent digital infrastructure through a calm architectural visual language.",
    image: khalidBamaroufHero,
    details: {
      client: "KHALID BAMAROUF",
      industry: "AI Automation & Systems Engineering",
      services:
        "AI Automation, Systems Engineering, Enterprise Architecture, Backend Engineering, API Architecture, Cloud Infrastructure, Technical Consulting, Digital Transformation",
      year: "2026",
      platform: "Website Design & Development",
    },
    url: "https://khaledbamarouf.com",
    overview: {
      challenge:
        "The project needed to present AI automation and systems engineering as a premium personal brand, making technical expertise feel clear, credible, and calm instead of complex or scattered.",
      approach:
        "The website was shaped around dark architectural systems, intelligent operations, structured capabilities, and a clear bilingual narrative that explains what Khalid builds and how he works.",
      outcome:
        "The final experience positions Khalid Bamarouf as an AI automation engineer and systems builder, connecting automation, architecture, backend engineering, cloud infrastructure, and transformation into one focused digital presence.",
    },
    gallery: [
      {
        image: khalidBamaroufIntro,
        title: "Intro / Loading",
        caption:
          "The opening sequence introduces the Khalid mark through a dark control-plane atmosphere and a precise systems interface.",
        fit: "contain",
      },
      {
        image: khalidBamaroufHero,
        title: "Hero",
        caption:
          "The homepage frames the offer around AI automations that solve current operational problems and make systems run better.",
        fit: "contain",
      },
      {
        image: khalidBamaroufWhatIDo,
        title: "What I Do",
        caption:
          "The services section organizes AI automation, architecture, backend engineering, operations, cloud, APIs, and integration into one clear capability system.",
        fit: "contain",
      },
      {
        image: khalidBamaroufWhy,
        title: "Why Work With Me",
        caption:
          "The trust section explains the value of problem-first automation, custom implementation, shipping discipline, and calm execution.",
        fit: "contain",
      },
      {
        image: khalidBamaroufCapabilities,
        title: "Capabilities",
        caption:
          "The capabilities chapter groups AI apps, engineering, integration, strategy, and architecture into premium technical cards.",
        fit: "contain",
      },
      {
        image: khalidBamaroufProcess,
        title: "Process",
        caption:
          "The process chapter shows a structured path from the current issue to working AI automation.",
        fit: "contain",
      },
      {
        image: khalidBamaroufOperatingNotes,
        title: "Operating Notes and Contact",
        caption:
          "The closing section combines operating principles, contact details, and the final conversation path without losing the technical atmosphere.",
        fit: "contain",
      },
    ],
    reflection:
      "The project became a premium personal engineering website, combining website design, UX/UI, visual direction, responsive front-end development, and a technical brand narrative for AI automation and systems engineering.",
  },
  {
    slug: "noor-bamarouf",
    name: "NOOR BAMAROUF",
    category: "Graphic Design & Visual Identity",
    intro:
      "A refined bilingual portfolio website designed for Noor Bamarouf, presenting her work in brand identity, packaging, print, editorial and social media design through a soft editorial system. The experience balances warm beige tones, blush pink, sage green, carefully composed imagery and expressive typography to create a feminine, modern and professional digital presence.",
    image: noorBamaroufHero,
    details: {
      client: "NOOR BAMAROUF",
      industry: "Graphic Design & Visual Identity",
      services:
        "Brand Identity, Graphic Design, Packaging Design, Print Design, Social Media Design, Editorial Design, Creative Direction, Bilingual Portfolio Experience, Responsive Web Design, Front-End Development",
      year: "2026",
      platform: "Portfolio Website Design & Development",
    },
    url: "https://noorbamarouf.com",
    overview: {
      challenge:
        "The project needed to present Noor Bamarouf's graphic design work with softness, clarity, and professional confidence while keeping her visual identity delicate, memorable, and bilingual.",
      approach:
        "The website was shaped around warm beige surfaces, blush monogram details, sage green accents, spacious editorial composition, selected project storytelling, and a clear service structure.",
      outcome:
        "The final experience gives Noor Bamarouf a refined bilingual portfolio that presents identity, packaging, print, social media, editorial design, and creative direction through one calm digital presence.",
    },
    gallery: [
      {
        image: noorBamaroufHero,
        title: "Hero / MATCHA Composition",
        caption:
          "The opening composition introduces Noor's visual world through soft packaging imagery, warm surfaces, sage tones, and a restrained editorial layout.",
        fit: "contain",
      },
      {
        image: noorBamaroufIntro,
        title: "Introduction / Hello, I'm Noor",
        caption:
          "The introduction frames Noor as an independent graphic designer with a quiet, feminine, and professional design presence.",
        fit: "contain",
      },
      {
        image: noorBamaroufSelectedWork,
        title: "Selected Work Overview",
        caption:
          "The work section presents identity, print, packaging, editorial, and social systems through a spacious portfolio rhythm.",
        fit: "contain",
      },
      {
        image: noorBamaroufWello,
        title: "WELLO Featured Project",
        caption:
          "The WELLO chapter highlights bilingual packaging, color systems, ingredient-led imagery, and bright product storytelling.",
        fit: "contain",
      },
      {
        image: noorBamaroufServices,
        title: "Services Section",
        caption:
          "Services are organized with large editorial numbering, refined hierarchy, and a calm description of each design discipline.",
        fit: "contain",
      },
      {
        image: noorBamaroufWemo,
        title: "Wemo Delights Project",
        caption:
          "The Wemo Delights project shows playful brand identity work within the same soft and measured portfolio system.",
        fit: "contain",
      },
      {
        image: noorBamaroufMoreWork,
        title: "More Work and Contact",
        caption:
          "The closing view brings additional selected work and the final project invitation into one composed call-to-action moment.",
        fit: "contain",
      },
    ],
    reflection:
      "The project became a soft editorial portfolio website, combining bilingual experience design, UX/UI, visual direction, responsive front-end development, and a refined presentation system for Noor Bamarouf's graphic design work.",
  },
];

const TARTA_DE_AMOR_PROJECT: ProjectData = {
  slug: "tarta-de-amor",
  name: "Tarta De Amor",
  category: "Luxury Dessert Brand / Premium E-Commerce Experience",
  intro:
    "A luxury Madrid Cheesecake brand built around gifting, premium presentation, and elevated digital ordering. The experience combines cinematic food photography, elegant storytelling, and a refined ordering journey designed to make every cake feel like a luxury gift.",
  image: tartaHero,
  details: {
    client: "Tarta De Amor",
    industry: "Luxury Dessert Brand",
    services:
      "Brand Direction, Creative Direction, Website Design, E-Commerce Experience, Product Presentation, Conversion-Focused UX",
    year: "2026",
    platform: "Premium E-Commerce Experience",
  },
  url: "#",
  overview: {
    challenge:
      "Tarta De Amor was created as a premium digital experience for a luxury Madrid Cheesecake brand in Jeddah, with a focus on turning a simple dessert purchase into an elevated gifting journey.",
    approach:
      "The work combined brand direction, creative direction, website design, e-commerce experience, product presentation, conversion-focused UX, and an intro video into one cinematic ordering flow.",
    outcome:
      "Every detail, from photography direction and interface design to the cinematic intro sequence, was crafted to communicate quality, exclusivity, and emotion.",
  },
  gallery: [
    {
      image: tartaHero,
      title: "Madrid Cheesecake Hero",
      caption:
        "The opening visual presents the signature cake with warm cinematic lighting, minimal composition, and a premium dessert mood.",
    },
    {
      image: tartaOrderExperience,
      title: "Reservation and Order Experience",
      caption:
        "The order flow turns sauce selection, timing, quantity, and checkout into a calm and refined reservation journey.",
    },
    {
      image: tartaChocolateSauce,
      title: "Chocolate Sauce Cheesecake",
      caption:
        "A rich product moment highlights the chocolate sauce selection through close photography and a clear ordering interface.",
    },
    {
      image: tartaPackaging,
      title: "Packaging Presentation",
      caption:
        "The packaging frames the cake as a gift, with the box, sauce bottle, and product presented as one considered ritual.",
    },
    {
      image: tartaMoments,
      title: "Made for Moments Worth Remembering",
      caption:
        "An editorial brand section positions the Madrid Cheesecake as a quiet centerpiece for gifting, gatherings, and memorable evenings.",
    },
    {
      image: tartaPresented,
      title: "Presented Before It Is Opened",
      caption:
        "The gift presentation moment emphasizes anticipation, craft, and the premium feeling before the first slice is served.",
    },
    {
      image: tartaContact,
      title: "Contact and Final Section",
      caption:
        "The final section completes the experience with contact details, brand presence, and a polished closing moment.",
    },
  ],
  reflection:
    "Tarta De Amor brings together creative direction, website design, UX/UI, front-end craft, and cinematic intro work, shaping a premium digital ordering experience for a luxury cheesecake brand in Jeddah.",
  nextSlug: "mahn-platform",
};

const LILLY_BREEZE_PROJECT: ProjectData = {
  slug: "lily-home-spa",
  name: "Lilly Breeze",
  category: "Luxury Wellness Experience",
  intro:
    "A private luxury wellness experience designed around discretion, ritual, atmosphere, and in-home spa services.",
  image: lillyHero,
  details: {
    client: "Lilly Breeze",
    industry: "Luxury Wellness",
    services: "Website Design and Development",
    year: "2026",
    platform: "Luxury Wellness Website",
  },
  overview: {
    challenge:
      "Lilly Breeze is a premium wellness brand focused on bringing refined spa experiences directly into private residences. The digital experience was designed to communicate calm, privacy, luxury, and ritual through elegant layouts, restrained typography, and immersive visual storytelling.",
    approach:
      "The project page presents the experience as a quiet sequence: arrival, promise, philosophy, rituals, visual atmosphere, and invitation. Each image is arranged to show how the brand moves from private service positioning into tactile wellness details.",
    outcome:
      "The final website feels intimate and composed, framing Lilly Breeze as a private luxury wellness destination through calm storytelling and a clear visual rhythm.",
  },
  gallery: [
    {
      image: lillyHero,
      title: "Private Arrival",
      caption:
        "The opening moment establishes Lilly Breeze as an in-home spa experience brought quietly to the client.",
    },
    {
      image: lillyArrival,
      title: "The House",
      caption:
        "A calm introductory chapter defines the feeling of a spa assembled around the privacy of the home.",
    },
    {
      image: lillyPhilosophy,
      title: "The Philosophy",
      caption:
        "The brand language centers discretion, ritual, and composition as the foundations of the service.",
    },
    {
      image: lillyPromise,
      title: "The Promise",
      caption:
        "A cinematic promise section reinforces the central idea that the client will not have to leave.",
    },
    {
      image: lillyRituals,
      title: "The Rituals",
      caption:
        "The rituals page organizes service options with restrained typography and a composed editorial rhythm.",
    },
    {
      image: lillyGallery,
      title: "Visual Atmosphere",
      caption:
        "A visual gallery gathers massage, oils, interiors, and sensory details into one immersive brand world.",
    },
    {
      image: lillyFragments,
      title: "House Fragments",
      caption:
        "Editorial imagery and founder note styling add intimacy, texture, and a quieter sense of luxury.",
    },
    {
      image: lillyInvitation,
      title: "Invitation",
      caption:
        "The booking moment is treated as a private invitation, maintaining the same calm and discreet tone.",
    },
  ],
  reflection:
    "The final experience positions Lilly Breeze as a sophisticated luxury wellness brand, combining private hospitality, refined rituals, and premium digital storytelling into a calm and memorable online experience.",
  nextSlug: "mahn-platform",
};

const MIHN_PROJECT: ProjectData = {
  slug: "mahn-platform",
  name: "Mihn",
  category: "Employment Platform / UX/UI Experience",
  intro:
    "A Saudi employment and operations platform shaped around job discovery, candidate onboarding, and clear management workflows.",
  image: mihnHero,
  details: {
    client: "Mihn",
    industry: "Employment Technology",
    services: "UX/UI Design, Candidate Experience, Operations Interface, Front-end Experience",
    year: "2026",
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
      image: mihnIntro,
      title: "Introduction",
      caption:
        "A clear introduction to the employment platform, its audience, and the candidate journey.",
    },
    {
      image: mihnDashOne,
      title: "Candidate Dashboard",
      caption:
        "Profile, job discovery, applications, and onboarding actions organized in one candidate view.",
    },
    {
      image: mihnDashTwo,
      title: "Operator and Admin Dashboard",
      caption: "Candidate review and management workflows structured for daily operations.",
    },
    {
      image: mihnDashThree,
      title: "Platform Operations",
      caption: "Operational views for managing candidates, roles, reviews, and platform activity.",
    },
    {
      image: mihnSignIn,
      title: "Authentication Experience",
      caption:
        "A direct sign-in flow that guides candidates and operating teams to the right workspace.",
    },
  ],
  reflection:
    "Mihn brings candidate experience, employment discovery, onboarding, and operational management into one focused UX/UI system.",
};

const NOORIX_PROJECT: ProjectData = {
  slug: "norx-paints",
  name: "NOORIX",
  category: "Brand Identity and Website Experience",
  intro:
    "A visual identity and website experience shaped around premium presence, color, and customer trust.",
  image: noorixOrigin,
  details: {
    client: "NOORIX",
    industry: "Interiors and Coatings",
    services: "Naming, Brand Identity, Visual Direction, Website Design and Front-end Craft",
    year: "2026",
    platform: "Brand Identity and Website Experience",
  },
  overview: {
    challenge:
      "NOORIX was created from the name outward: visual identity, digital direction, and a website experience that makes the coatings brand feel distinctive, premium, and easy to trust.",
    approach:
      "The brand world was shaped through premium editorial layouts, refined color language, product presentation, environmental applications, and a website experience that connects visual identity with customer-facing storytelling.",
    outcome:
      "The final website brings the identity together through product storytelling, interior atmosphere, color exploration, transformation moments, and polished brand applications.",
  },
  gallery: [
    {
      image: noorixHero,
      title: "Website Experience",
      caption:
        "A refined digital entry point presenting NOORIX through premium positioning and a clear brand promise.",
    },
    {
      image: noorixPositioning,
      title: "Brand Positioning",
      caption:
        "A strategic brand narrative establishing NOORIX as a premium design standard in coatings.",
    },
    {
      image: noorixApplication,
      title: "Brand Applications",
      caption:
        "Interior applications show how the identity extends into real spaces and customer touchpoints.",
    },
    {
      image: noorixSpaces,
      title: "Premium Spaces",
      caption:
        "Curated spatial imagery demonstrates the brand’s visual language across hospitality and residential environments.",
    },
    {
      image: noorixColorSystem,
      title: "Visual System",
      caption:
        "A cinematic color experience translates the brand palette into mood, material, and interior atmosphere.",
    },
    {
      image: noorixProductSpectrum,
      title: "Product Spectrum",
      caption:
        "A product range section introduces premium coatings through editorial layout and refined product presentation.",
    },
    {
      image: noorixPaletteCollection,
      title: "Palette Collection",
      caption:
        "The color library organizes signature shades, finishes, and families into a calm way to explore the range.",
    },
    {
      image: noorixTrendReport,
      title: "Color Trend Report",
      caption:
        "An editorial trend report connects the NOORIX palette to interiors, architectural moods, and the 2026 visual direction.",
    },
    {
      image: noorixTransformation,
      title: "Transformation Story",
      caption:
        "A transformation view highlights the practical impact of the brand coatings and visual direction.",
    },
    {
      image: noorixOrigin,
      title: "Final Brand Presentation",
      caption:
        "A closing origin visual reinforces scale, presence, and an identity rooted in Saudi origin.",
    },
  ],
  reflection:
    "The final outcome gives NOORIX a memorable identity, a refined website, and a digital presence built around color, texture, trust, and visual clarity.",
};

const POKEMON_SA_PROJECT: ProjectData = {
  slug: "pikmon-store",
  name: "Pokémon SA",
  category: "Collectibles E-Commerce Experience",
  intro:
    "A Pokémon-inspired e-commerce experience for collectors, merchandise, customization, and playful brand moments.",
  image: pokemonHero,
  details: {
    client: "Pokémon SA",
    industry: "Collectibles and E-Commerce",
    services:
      "Brand Creation, Naming, Brand Strategy, Visual Identity, Logo Design, User Experience Design, Product Experience and Website Development",
    year: "2026",
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
      image: pokemonHero,
      title: "Brand Experience",
      caption:
        "The homepage establishes Pokémon SA as a complete collector destination with immersive visuals, clear product pathways, and a dedicated commerce journey for fans.",
    },
    {
      image: pokemonBrandExperience,
      title: "Logo and Identity",
      caption:
        "A focused brand moment introduces the identity and visual language before the experience expands into products and community features.",
    },
    {
      image: pokemonTradingCards,
      title: "Trading Cards",
      caption:
        "Individual card listings are designed for collectors who need clear rarity cues, product photography, pricing, and fast purchase actions.",
    },
    {
      image: pokemonSealedProducts,
      title: "Sealed Products",
      caption:
        "Booster packs and sealed boxes are presented with premium cards, strong hierarchy, and product details that support confident purchasing.",
    },
    {
      image: pokemonCollectibles,
      title: "Collectibles",
      caption:
        "The collectibles section extends the store beyond cards with character-based products that keep the Pokémon universe present across the catalogue.",
    },
    {
      image: pokemonMerchandise,
      title: "Merchandise",
      caption:
        "Fridge magnets and accessible collectibles create easy entry points for fans while keeping the product grid visually consistent.",
    },
    {
      image: pokemonApparel,
      title: "Apparel",
      caption:
        "Apparel product pages introduce trainer merchandise with color, size, pricing, and cart interactions built for everyday commerce.",
    },
    {
      image: pokemonHoodies,
      title: "Layered Apparel",
      caption:
        "The hoodie collection expands the merchandise presentation with richer product detail, sizing guidance, and premium apparel options.",
    },
    {
      image: pokemonCustomBuilder,
      title: "Custom Product Builder",
      caption:
        "The customization studio lets collectors build personalized apparel by choosing garments, characters, colors, text, and reference uploads.",
    },
    {
      image: pokemonCommunityGamification,
      title: "Community and Gamification",
      caption:
        "Reward moments and subscription prompts make the store feel participatory, with challenges, codes, and community touchpoints.",
    },
    {
      image: pokemonRareMarketplace,
      title: "Rare Collector Marketplace",
      caption:
        "The rare desk creates a specialized intake flow for rare cards, sealed products, consignment, authenticity review, and collector requests.",
    },
  ],
  reflection:
    "Pokémon SA demonstrates brand creation, UX/UI, e-commerce design, visual storytelling, customization, and front-end craft in one immersive collector website.",
};

const SIP_PROJECT: ProjectData = {
  slug: "sip",
  name: "SIP",
  category: "Saudi Beverage Brand",
  intro:
    "A Saudi beverage brand developed from the ground up, spanning naming, identity, visual direction, digital presence, and website experience.",
  image: sipHero,
  details: {
    client: "SIP",
    industry: "Beverage",
    services: "Naming, Brand Identity, Website Design and Development",
    year: "2026",
    platform: "Beverage Brand",
  },
  overview: {
    challenge:
      "SIP is a Saudi beverage brand developed from the ground up, including naming, brand identity, visual direction, digital presence, and website experience. The work focused on a modern beverage brand with strong visual personality, clear positioning, and a memorable brand world.",
    approach:
      "The visual identity was built around bold typography, high-contrast product presentation, packaging shaped around flavor, and a dark digital environment that lets the cans, naming, and attitude carry the experience.",
    outcome:
      "The website and brand applications present SIP as a confident Saudi beverage brand with a clear product family, a recognizable visual language, and a digital presence designed for launch and lasting recognition.",
  },
  gallery: [
    {
      image: sipHero,
      title: "Brand Experience",
      caption:
        "A cinematic landing moment introduces SIP with a confident Saudi beverage identity and a strong product-led presence.",
    },
    {
      image: sipProductLineup,
      title: "Product Lineup",
      caption:
        "The full beverage range is presented as a focused product family built around taste, energy, and zero-sugar options.",
    },
    {
      image: sipZeroRange,
      title: "Zero Range",
      caption:
        "The zero-sugar family extends the SIP identity into a cleaner product expression while preserving the same bold presence.",
    },
    {
      image: sipBrandStory,
      title: "Brand Story",
      caption:
        "A Saudi origin chapter connects the brand to clarity, confidence, and a distinctive visual point of view.",
    },
    {
      image: sipProductCards,
      title: "Product Cards",
      caption:
        "Product cards translate the packaging into a polished website experience for browsing the full range.",
    },
  ],
  reflection:
    "The final outcome established SIP as a distinctive Saudi beverage brand with a memorable visual language and a premium digital presence built for recognition.",
};

const JOROF_PROJECT: ProjectData = {
  slug: "jorof",
  name: "JOROF",
  category: "Brand Identity, Creative Direction, User Experience, Website Design and Development",
  intro:
    "A modern Saudi bottled water brand transformed from an existing logo into a complete digital brand experience.",
  image: jorofHero,
  details: {
    client: "JOROF",
    industry: "Bottled Water",
    services:
      "Creative Direction, Visual Identity, UX/UI Design, Website Design, Front-end Experience",
    year: "2026",
    platform: "Brand Identity and Website Experience",
  },
  overview: {
    challenge:
      "JOROF is a Saudi bottled water brand. The logo already existed, and the work expanded it into a clear visual direction, refined UX/UI, and a complete website experience.",
    approach:
      "The work focused on clarity, trust, quality, and daily reliability, translating the existing mark into a calm Saudi water brand with product presentation, manufacturing storytelling, and a clear inquiry path.",
    outcome:
      "The final experience presents JOROF as a clean and reliable bottled water brand, connecting origin, product range, manufacturing standards, quality controls, and focused contact moments into one cohesive website.",
  },
  gallery: [
    {
      image: jorofIntro,
      title: "Brand Introduction",
      caption:
        "A soft opening moment frames the existing JOROF logo with purity, source, and calmness before the full website experience begins.",
    },
    {
      image: jorofHero,
      title: "Hero Experience",
      caption:
        "The homepage hero establishes the brand promise through clear Arabic messaging, fresh natural imagery, and direct product discovery actions.",
    },
    {
      image: jorofBrandStory,
      title: "Brand Story",
      caption:
        "The brand story section turns the logo into a wider identity, connecting Saudi origin, quality, and daily trust.",
    },
    {
      image: jorofProductRange,
      title: "Product Range",
      caption:
        "The product presentation organizes bottle formats with clean hierarchy, soft gradients, and clear purchase cues.",
    },
    {
      image: jorofManufacturing,
      title: "Manufacturing Storytelling",
      caption:
        "The factory section explains capacity, distribution, and process credibility through structured content and a calm industrial visual language.",
    },
    {
      image: jorofQuality,
      title: "Quality Assurance",
      caption:
        "Quality communication is presented through inspection, filtration, and standards-based messaging that reinforces trust and consistency.",
    },
    {
      image: jorofCustomerJourney,
      title: "Customer Journey",
      caption:
        "The acquisition flow supports residential and business customers with clear pathways, practical ordering context, and reassuring service cues.",
    },
    {
      image: jorofContact,
      title: "Conversion Experience",
      caption:
        "The final contact section completes the journey with a focused inquiry flow designed to turn brand interest into customer action.",
    },
  ],
  reflection:
    "JOROF transformed an existing logo into a complete digital brand presence through visual direction, UX/UI, product presentation, manufacturing storytelling, and a clear inquiry journey.",
};

const PAKMAN_PROJECT: ProjectData = {
  slug: "pakman",
  name: "Pakman",
  category: "Brand Identity, Website Design, Art Direction",
  intro:
    "A Saudi restaurant packaging company shaped into a complete brand identity, packaging direction, and website experience for food businesses.",
  image: pakmanHero,
  details: {
    client: "Pakman",
    industry: "Restaurant Packaging",
    services:
      "Logo, Brand Identity, Visual Direction, Packaging Concept, Website Design, User Interface Direction, Art Direction",
    year: "2026",
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
      image: pakmanHero,
      title: "Website Hero",
      caption:
        "The opening website visual introduces Pakman as a premium packaging partner for restaurants and cafés.",
    },
    {
      image: pakmanProductCategories,
      title: "Product Categories",
      caption:
        "A clear product catalogue organizes cups, bags, boxes, labels, and food service essentials for easy browsing.",
    },
    {
      image: pakmanAbout,
      title: "About Pakman",
      caption:
        "The about section connects Pakman’s Saudi packaging expertise with its focus on hospitality and food businesses.",
    },
    {
      image: pakmanFoodBusinesses,
      title: "Food Business Segments",
      caption:
        "Segment cards show how the packaging offer adapts to restaurants, cafés, bakeries, catering, cloud kitchens, and food brands.",
    },
    {
      image: pakmanPackagingGallery,
      title: "Packaging Gallery",
      caption:
        "A visual gallery presents packaging applications across cups, cutlery, boxes, and takeaway solutions.",
    },
    {
      image: pakmanClients,
      title: "Trusted Food Brands",
      caption:
        "Client references show how the packaging supports restaurants, cafés, and food brands in daily use.",
    },
    {
      image: pakmanWhy,
      title: "Why Pakman",
      caption:
        "A benefit-led section clarifies supply, branding, materials, flexibility, finishing, delivery, and support.",
    },
    {
      image: pakmanHeadquarters,
      title: "Headquarters and Contact",
      caption:
        "A location-led contact section grounds Pakman in Jeddah and gives customers a clear next step.",
    },
    {
      image: pakmanQuoteForm,
      title: "Quote Form",
      caption:
        "The quote flow collects the information needed to guide packaging selection and production planning.",
    },
    {
      image: pakmanFooter,
      title: "Final Brand View",
      caption:
        "The closing footer keeps the brand presence simple, structured, and easy to contact.",
    },
  ],
  reflection:
    "Pakman becomes a clear digital presence for a Saudi restaurant packaging brand, combining identity, packaging direction, website design, UX/UI, and art direction.",
};

const BY_SLUG: Record<string, ProjectData> = {
  ...Object.fromEntries(PROJECTS.map((p) => [p.slug, p])),
  [TARTA_DE_AMOR_PROJECT.slug]: TARTA_DE_AMOR_PROJECT,
  [LILLY_BREEZE_PROJECT.slug]: LILLY_BREEZE_PROJECT,
  [MIHN_PROJECT.slug]: MIHN_PROJECT,
  [NOORIX_PROJECT.slug]: NOORIX_PROJECT,
  [POKEMON_SA_PROJECT.slug]: POKEMON_SA_PROJECT,
  [SIP_PROJECT.slug]: SIP_PROJECT,
  [JOROF_PROJECT.slug]: JOROF_PROJECT,
  [PAKMAN_PROJECT.slug]: PAKMAN_PROJECT,
};

const PROJECT_SEQUENCE = PROJECTS.map((p) => p.slug);

function getNextProject(currentSlug: string): ProjectData {
  const idx = PROJECT_SEQUENCE.indexOf(currentSlug);
  const nextSlug = PROJECT_SEQUENCE[(idx + 1) % PROJECT_SEQUENCE.length];
  return BY_SLUG[nextSlug] ?? PROJECTS[0];
}

export const Route = createFileRoute("/work/$slug")({
  head: ({ params }) => {
    const canonicalSlug = LEGACY_PROJECT_SLUGS[params.slug] ?? params.slug;
    const p = BY_SLUG[canonicalSlug];
    const title = p ? `${p.name} | Tarik Bamarouf` : "Project | Tarik Bamarouf";
    const desc = p?.intro ?? "Selected project by Tarik Bamarouf.";
    const canonicalUrl = `${SITE_URL}/work/${canonicalSlug}`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { property: "og:url", content: canonicalUrl },
        { name: "twitter:card", content: "summary_large_image" },
        ...(p ? [{ property: "og:image", content: new URL(p.image, SITE_URL).href }] : []),
      ],
      links: p ? [{ rel: "canonical", href: canonicalUrl }] : [],
    };
  },
  loader: ({ params }) => {
    const legacyTarget = LEGACY_PROJECT_SLUGS[params.slug];
    if (legacyTarget) {
      throw redirect({
        to: "/work/$slug",
        params: { slug: legacyTarget },
        statusCode: 301,
      });
    }

    const project = BY_SLUG[params.slug];
    if (!project) throw notFound();
    return project as ProjectData;
  },
  component: ProjectDetail,
  notFoundComponent: ProjectNotFound,
  errorComponent: ProjectError,
});

function ProjectNotFound() {
  const { language } = useLanguage();
  const labels = siteCopy[language].project;

  return (
    <SiteLayout>
      <div className="pt-48 pb-32 px-6 text-center">
        <p className="text-bronze tracking-luxury text-[11px] uppercase">{labels.notFound}</p>
        <Link to="/work" className="mt-6 inline-block font-serif text-3xl link-underline">
          {labels.returnToIndex}
        </Link>
      </div>
    </SiteLayout>
  );
}

function ProjectError() {
  const { language } = useLanguage();
  const labels = siteCopy[language].project;

  return (
    <SiteLayout>
      <div className="pt-48 pb-32 px-6 text-center">
        <p className="font-serif text-3xl">
          <BidiText>{labels.loadError}</BidiText>
        </p>
      </div>
    </SiteLayout>
  );
}

function ProjectDetail() {
  const { language } = useLanguage();
  const labels = siteCopy[language].project;
  const rawProject = Route.useLoaderData() as ProjectData;
  const project = localizeProject<ProjectData>(rawProject, language);
  const masterProject = localizeProject<ProjectData>(rawProject, "en");
  const next = localizeProject<ProjectData>(getNextProject(rawProject.slug), language);

  const overview = project.overview ?? {
    challenge:
      language === "ar"
        ? "سيُوثق سياق المشروع هنا."
        : "The project context will be documented here.",
    approach:
      language === "ar"
        ? "سيُوثق منهج التصميم والتطوير هنا."
        : "The design and development approach will be documented here.",
    outcome:
      language === "ar"
        ? "سيُوثق الأثر النهائي هنا."
        : "Final outcomes and reflections will be documented here.",
  };
  const masterOverview = masterProject.overview ?? {
    challenge: "The project context will be documented here.",
    approach: "The design and development approach will be documented here.",
    outcome: "Final outcomes and reflections will be documented here.",
  };
  const detailItems = [
    {
      key: labels.client,
      value: project.details.client,
      masterValue: masterProject.details.client,
    },
    {
      key: labels.industry,
      value: project.details.industry,
      masterValue: masterProject.details.industry,
    },
    {
      key: labels.service,
      value: project.details.services,
      masterValue: masterProject.details.services,
      wide: true,
    },
    {
      key: labels.year,
      value: formatLocalizedNumber(project.details.year, language),
      masterValue: masterProject.details.year,
    },
    {
      key: labels.type,
      value: project.details.platform,
      masterValue: masterProject.details.platform,
    },
  ];
  const reflection =
    project.reflection ??
    (language === "ar"
      ? "سيضم هذا القسم نتائج المشروع وأثره وخلاصته عند توفرها."
      : "This section will contain project impact and final observations once available.");
  const masterReflection =
    masterProject.reflection ??
    "This section will contain project impact and final observations once available.";

  return (
    <SiteLayout>
      {/* HERO */}
      <section className="project-detail__hero relative h-[88svh] min-h-[560px] overflow-hidden">
        <img
          src={project.image}
          alt={project.name}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background" />
        <div className="relative z-10 flex h-full w-full flex-col justify-between px-6 pt-28 pb-16 md:px-12">
          <Link
            to="/work"
            className="inline-flex items-center gap-2 text-[10px] tracking-luxury uppercase text-bronze hover:text-foreground transition-colors"
          >
            <ArrowLeft className="lang-arrow h-3.5 w-3.5" aria-hidden="true" />
            {siteCopy[language].common.backToWork}
          </Link>
          <div className="project-detail__copy">
            <p className="text-[10px] tracking-luxury uppercase text-bronze">{project.category}</p>
            <h1 className="mt-4 font-serif text-3xl md:text-5xl lg:text-[3.6rem] leading-[1.08] italic font-light">
              {project.name}
            </h1>
            <p className="mt-5 max-w-xl text-foreground/75 font-light">
              <EnglishLayoutSlot master={masterProject.intro}>{project.intro}</EnglishLayoutSlot>
            </p>
            {project.url && project.url !== "#" ? (
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className="mt-7 inline-flex items-center gap-3 text-[10px] tracking-luxury uppercase text-bronze transition-colors hover:text-foreground"
                aria-label={labels.visitWebsite}
              >
                <EnglishLayoutSlot master={siteCopy.en.project.visitWebsite}>
                  {labels.visitWebsite}
                </EnglishLayoutSlot>
                <ArrowRight className="lang-arrow h-3.5 w-3.5" aria-hidden="true" />
              </a>
            ) : null}
          </div>
        </div>
      </section>

      {/* OVERVIEW */}
      <section className="project-detail__section py-20 md:py-28">
        <div className="grid w-full grid-cols-1 gap-10 px-6 md:grid-cols-12 md:px-12">
          <div className="md:col-span-4">
            <SectionLabel index="I" title={labels.overview} />
          </div>
          <div className="project-detail__overview-list md:col-span-8 space-y-10">
            {[
              { h: labels.challenge, b: overview.challenge, master: masterOverview.challenge },
              { h: labels.approach, b: overview.approach, master: masterOverview.approach },
              { h: labels.outcome, b: overview.outcome, master: masterOverview.outcome },
            ].map((s) => (
              <div key={s.h}>
                <h3 className="text-[10px] tracking-luxury uppercase text-bronze">{s.h}</h3>
                <p className="mt-3 font-serif text-xl md:text-2xl leading-[1.3] font-light text-foreground/85">
                  <EnglishLayoutSlot master={s.master}>{s.b}</EnglishLayoutSlot>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECT INFORMATION */}
      <section className="project-info-section">
        <div className="project-info-section__ambient" aria-hidden="true" />
        <div className="relative z-10 grid w-full grid-cols-1 gap-8 px-6 md:grid-cols-12 md:gap-10 md:px-12">
          <div className="project-info-section__heading md:col-span-4">
            <SectionLabel index="II" title={labels.information} />
          </div>
          <div className="md:col-span-8">
            <dl className="project-spec-grid" aria-label={labels.information}>
              {detailItems.map((item) => (
                <div
                  key={item.key}
                  className={`project-spec-card ${item.wide ? "project-spec-card--wide" : ""}`}
                >
                  <dt className="project-spec-label">{item.key}</dt>
                  <dd className="project-spec-value">
                    <EnglishLayoutSlot master={item.masterValue}>{item.value}</EnglishLayoutSlot>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="project-detail__gallery py-20 md:py-28 bg-ink">
        <div className="w-full px-6 md:px-12">
          <SectionLabel index="III" title={labels.gallery} />

          {project.gallery ? (
            <div className="mt-12 space-y-16 md:space-y-20">
              {project.gallery.map((g: GalleryItem, i: number) => {
                const masterGalleryItem = masterProject.gallery?.[i];

                const imageFitClass = g.fit === "contain" ? "object-contain" : "object-cover";

                return (
                  <figure key={g.title} className="space-y-5">
                    <div
                      className={`relative aspect-[16/9] overflow-hidden ring-1 ring-bronze/10 ${g.fit === "contain" ? "bg-background" : ""}`}
                    >
                      <img
                        src={g.image}
                        alt={g.title}
                        className={`absolute inset-0 w-full h-full ${imageFitClass}`}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <figcaption className="project-detail__figure-caption grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10">
                      <div className="md:col-span-4">
                        <p className="text-[10px] tracking-luxury uppercase text-bronze">
                          {labels.section}{" "}
                          {formatLocalizedNumber(i + 1, language, { minimumIntegerDigits: 2 })}
                        </p>
                        <h3 className="mt-2 font-serif text-2xl md:text-3xl italic font-light">
                          <EnglishLayoutSlot master={masterGalleryItem?.title ?? g.title}>
                            {g.title}
                          </EnglishLayoutSlot>
                        </h3>
                      </div>
                      <p className="md:col-span-8 font-serif text-lg md:text-xl leading-[1.4] font-light text-foreground/80">
                        <EnglishLayoutSlot master={masterGalleryItem?.caption ?? g.caption}>
                          {g.caption}
                        </EnglishLayoutSlot>
                      </p>
                    </figcaption>
                  </figure>
                );
              })}
            </div>
          ) : (
            <div className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
              <div className="md:col-span-8 aspect-[16/10] relative overflow-hidden ring-1 ring-bronze/10">
                <img
                  src={project.image}
                  alt={`${project.name} ${labels.desktopExperience}`}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <span className="absolute bottom-4 left-4 text-[10px] tracking-luxury uppercase text-foreground/80 bg-background/40 backdrop-blur-sm px-3 py-1">
                  {labels.desktopExperience}
                </span>
              </div>
              <GalleryPlaceholder
                className="md:col-span-4 aspect-[4/5]"
                label={labels.mobileExperience}
                comingSoonLabel={labels.comingSoon}
              />
              <GalleryPlaceholder
                className="md:col-span-6 aspect-[4/3]"
                label={labels.brandAssets}
                comingSoonLabel={labels.comingSoon}
              />
              <GalleryPlaceholder
                className="md:col-span-6 aspect-[4/3]"
                label={labels.uiDetails}
                comingSoonLabel={labels.comingSoon}
              />
            </div>
          )}
        </div>
      </section>

      {/* RESULTS / REFLECTION */}
      <section className="project-detail__section py-20 md:py-28">
        <div className="grid w-full grid-cols-1 gap-10 px-6 md:grid-cols-12 md:px-12">
          <div className="md:col-span-4">
            <SectionLabel
              index="IV"
              title={project.reflection ? labels.reflection : labels.results}
            />
          </div>
          <div className="project-detail__reflection md:col-span-8">
            <p className="font-serif text-xl md:text-2xl leading-[1.35] font-light text-foreground/85">
              <EnglishLayoutSlot master={masterReflection}>{reflection}</EnglishLayoutSlot>
            </p>
          </div>
        </div>
      </section>

      {/* NEXT PROJECT */}
      <section className="project-detail__next py-16 md:py-20 bg-ink border-t border-border/30">
        <div className="w-full px-6 md:px-12">
          <SectionLabel index="V" title={labels.next} />
          <Link
            to="/work/$slug"
            params={{ slug: next.slug }}
            className="group mt-8 flex items-center gap-6 md:gap-10"
          >
            <div className="relative h-24 w-32 md:h-32 md:w-48 shrink-0 overflow-hidden ring-1 ring-bronze/15">
              <img
                src={next.image}
                alt={next.name}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
              />
            </div>
            <div className="project-detail__next-copy flex-1">
              <h3 className="font-serif text-2xl md:text-4xl italic font-light leading-[1.1] transition-transform duration-500 group-hover:translate-x-2 gradient-bronze-text">
                {next.name}
              </h3>
              <p className="mt-2 text-[10px] tracking-luxury uppercase text-foreground/55">
                {next.category}
              </p>
            </div>
            <span className="hidden md:inline-flex items-center gap-2 text-[10px] tracking-luxury uppercase text-bronze">
              <EnglishLayoutSlot master={siteCopy.en.project.view}>{labels.view}</EnglishLayoutSlot>
              <ArrowRight className="lang-arrow h-3.5 w-3.5" aria-hidden="true" />
            </span>
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}

function GalleryPlaceholder({
  className,
  label,
  comingSoonLabel,
}: {
  className: string;
  label: string;
  comingSoonLabel: string;
}) {
  return (
    <div
      className={`relative ${className} overflow-hidden ring-1 ring-bronze/10 bg-gradient-to-br from-card via-background to-card flex items-center justify-center`}
    >
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, currentColor 0 1px, transparent 1px 14px)",
        }}
      />
      <div className="relative text-center">
        <p className="text-[10px] tracking-luxury uppercase text-bronze">{label}</p>
        <p className="mt-2 text-[10px] tracking-luxury uppercase text-foreground/35">
          {comingSoonLabel}
        </p>
      </div>
    </div>
  );
}
