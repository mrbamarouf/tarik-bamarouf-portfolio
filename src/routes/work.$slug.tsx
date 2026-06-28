import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SiteLayout, SectionLabel } from "@/components/site/Layout";
import {
  EnglishLayoutSlot,
  formatLocalizedNumber,
  localizeProject,
  siteCopy,
  useLanguage,
} from "@/lib/language";
import hudaImg from "@/assets/projects/huda.webp";
import mahnImg from "@/assets/projects/mahn.webp";
import lilyImg from "@/assets/projects/lily.webp";

import hudaHero from "@/assets/projects/huda/01-hero.webp";
import tartaHero from "@/assets/projects/tarta-de-amor/01-hero.webp";
import tartaOrderExperience from "@/assets/projects/tarta-de-amor/02-order-experience.webp";
import tartaChocolateSauce from "@/assets/projects/tarta-de-amor/03-chocolate-sauce.webp";
import tartaPackaging from "@/assets/projects/tarta-de-amor/04-packaging-presentation.webp";
import tartaMoments from "@/assets/projects/tarta-de-amor/05-made-for-moments.webp";
import tartaPresented from "@/assets/projects/tarta-de-amor/06-presented-before-opened.webp";
import tartaContact from "@/assets/projects/tarta-de-amor/07-contact-final.webp";
import hudaCouture from "@/assets/projects/huda/02-couture.webp";
import hudaRtw from "@/assets/projects/huda/03-rtw.webp";
import hudaBridal from "@/assets/projects/huda/04-bridal.webp";
import hudaBridalDetails from "@/assets/projects/huda/05-bridal-details.webp";
import hudaJournal from "@/assets/projects/huda/06-journal.webp";
import hudaPress from "@/assets/projects/huda/07-press.webp";
import hudaMaison from "@/assets/projects/huda/08-maison-presence.webp";
import hudaWornBy from "@/assets/projects/huda/09-worn-by.webp";
import hudaEvents from "@/assets/projects/huda/10-events.webp";
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

const PROJECTS: ProjectData[] = [
  {
    slug: "huda-bamarouf",
    name: "Huda Bamarouf",
    category: "Luxury Fashion Maison",
    intro:
      "A luxury fashion maison website designed around couture, bridal, ready-to-wear, editorial storytelling, and maison presence.",
    image: hudaHero,
    details: {
      client: "Huda Bamarouf",
      industry: "Luxury Fashion",
      services: "Website Design and Development",
      year: "2026",
      platform: "Luxury Fashion Website",
    },
    overview: {
      challenge:
        "Huda Bamarouf is a luxury fashion maison digital experience created to present couture collections, bridal creations, ready-to-wear capsules, editorial stories, press presence, and private maison moments through a refined cinematic website.",
      approach:
        "The goal was to build a premium online presence that feels elegant, restrained, and visually memorable while allowing the brand’s collections and atmosphere to lead the experience.",
      outcome:
        "Every chapter of the maison is composed with the same quiet authority, so the website reads as one continuous editorial experience rather than a catalogue.",
    },
    gallery: [
      {
        image: hudaCouture,
        title: "Couture World",
        caption: "A restrained visual direction for the maison’s couture identity.",
      },
      {
        image: hudaRtw,
        title: "Ready to Wear",
        caption:
          "A seasonal product experience designed with clarity, softness, and luxury spacing.",
      },
      {
        image: hudaBridal,
        title: "Bridal Archive",
        caption: "A quiet presentation of bridal creations, craftsmanship, and detail.",
      },
      {
        image: hudaBridalDetails,
        title: "Bridal Details",
        caption: "Close visual storytelling for embroidery, texture, and ceremony.",
      },
      {
        image: hudaJournal,
        title: "Journal",
        caption: "Editorial storytelling built to extend the maison beyond product.",
      },
      {
        image: hudaPress,
        title: "In The Press",
        caption: "A dedicated media presence for features, interviews, and brand visibility.",
      },
      {
        image: hudaMaison,
        title: "Maison Presence",
        caption: "A cinematic presentation of runway, cultural presence, and public moments.",
      },
      {
        image: hudaWornBy,
        title: "Worn By",
        caption: "A visual archive of the women, occasions, and figures connected to the maison.",
      },
      {
        image: hudaEvents,
        title: "Events",
        caption: "Private gatherings and atmospheric moments presented as part of the brand world.",
      },
    ],
    reflection:
      "The final experience positions Huda Bamarouf as a refined luxury fashion maison, combining visual storytelling, collection presentation, editorial depth, and premium digital presence into one cohesive website.",
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
    category: "Digital Platform",
    intro:
      "A digital platform designed around refined interaction, intuitive navigation, and a modern product experience.",
    image: mahnImg,
    details: {
      client: "Mihn",
      industry: "Technology",
      services: "Brand Identity, User Experience Design, Product Design and Development",
      year: "2026",
      platform: "Digital Platform",
    },
  },
  {
    slug: "norx-paints",
    name: "NOORIX",
    category: "Brand Identity and Digital Experience",
    intro:
      "A complete brand identity and digital experience created around strategic positioning, visual presence, and a cohesive customer journey.",
    image: noorixOrigin,
    details: {
      client: "NOORIX",
      industry: "Business and Technology",
      services: "Naming, Brand Strategy, Brand Identity, Website Design and Development",
      year: "2026",
      platform: "Brand Identity and Digital Experience",
    },
  },
  {
    slug: "pikmon-store",
    name: "Pokémon SA",
    category: "Collectibles Commerce Platform",
    intro:
      "A complete Pokémon-inspired commerce ecosystem designed from the ground up, combining collectibles, merchandise, customization, community engagement, and immersive digital experiences.",
    image: pokemonHero,
    details: {
      client: "Pokémon SA",
      industry: "Collectibles and E-Commerce",
      services:
        "Brand Creation, Naming, Brand Strategy, Visual Identity, Logo Design, User Experience Design, Product Experience and Website Development",
      year: "2026",
      platform: "Commerce Platform",
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
    category: "Brand Identity, Creative Direction, User Experience, Website Design and Development",
    intro:
      "A Saudi bottled water brand shaped into a complete digital identity and website experience around clarity, trust, quality, and daily reliability.",
    image: jorofHero,
    details: {
      client: "JOROF",
      industry: "Bottled Water",
      services:
        "Creative Direction, Visual Identity Development, Brand System, Color Strategy, User Experience Design, Website Design, Frontend Experience Planning",
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
        "Brand Positioning, UX Strategy, User Experience, UI Design, Content Direction, Information Architecture, Responsive Design, Front-end Implementation, Menu Experience, Motion, Performance Optimization",
      year: "2026",
      platform: "Restaurant Brand Website",
    },
    overview: {
      challenge:
        "Circle Section is a premium smash burger restaurant in Jeddah. The objective was to transform the restaurant into a premium digital experience while preserving the personality of the brand.",
      approach:
        "The project included the complete digital experience from strategy to execution, covering brand positioning, UX strategy, user experience, UI design, content direction, information architecture, responsive design, front-end implementation, menu experience, motion, and performance optimization.",
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
          "The delivery section turns ordering platforms into a branded moment with simple choices and strong orange presence.",
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
      "Luxury Brand Identity, UX Strategy, UI Design, Website Design, Front-end Development, Content Direction",
    intro:
      "OPAL STONES is a contemporary Saudi fine jewellery maison focused on timeless craftsmanship and bespoke pieces.",
    image: opalStonesHero,
    details: {
      client: "OPAL STONES",
      industry: "Fine Jewellery / Luxury Maison, Saudi Arabia",
      services:
        "Brand Direction, UX Strategy, UI Design, Content Direction, Editorial Experience, Responsive Design, Front-end Development",
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
    category:
      "Digital Strategy, UX Strategy, UX/UI Design, Website Design, Front-end Development, Content Direction",
    intro:
      "EX Events & Exhibitions is a Saudi events and exhibitions company specializing in operational excellence, supervision, planning, protocol, visitor experience, and on-site execution.",
    image: exEventsHero,
    details: {
      client: "EX Events & Exhibitions",
      industry: "Events, Exhibitions, Operations / Saudi Arabia",
      services:
        "Digital Strategy, UX Strategy, Information Architecture, UX/UI Design, Content Direction, Responsive Design, Motion Direction, Front-end Development",
      year: "2026",
      platform: "Events and Exhibitions Website",
    },
    overview: {
      challenge:
        "EX Events & Exhibitions is a Saudi events and exhibitions company specializing in operational excellence, supervision, planning, protocol, visitor experience, and on-site execution.",
      approach:
        "The project focused on transforming a traditional corporate presence into a premium digital experience that reflects the company's professionalism and large-scale operational capabilities.",
      outcome:
        "The final website brings strategy, information architecture, interface design, responsive layouts, content direction, and front-end development together into a clear digital presence for events and exhibition operations.",
    },
    gallery: [
      {
        image: exEventsHero,
        title: "Hero and Brand Entry",
        caption:
          "The opening visual introduces EX through a cinematic command-room atmosphere, linking the brand to supervision, control, and operational readiness.",
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
        title: "Operations Overview",
        caption:
          "A compact operations section presents experience, VIP protocol, media, exhibitions, and events as a structured capability system.",
        fit: "contain",
      },
      {
        image: exOperationsSystem,
        title: "Operations System",
        caption:
          "The operations system translates planning, documentation, supervision, field execution, and protocol into one organized service model.",
        fit: "contain",
      },
      {
        image: exCompanyValues,
        title: "Company Values",
        caption:
          "The values chapter communicates professionalism, commitment, transparency, and efficiency with a restrained corporate interface.",
        fit: "contain",
      },
      {
        image: exBehindScenes,
        title: "Behind The Scenes",
        caption:
          "Execution imagery shows the field teams, venues, production moments, and operational scenes behind major events.",
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
      "EX Events & Exhibitions became a premium digital presence for a Saudi events and exhibitions company, connecting operational strategy, UX structure, interface design, content direction, responsive layouts, motion direction, and front-end implementation into one professional case study.",
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
        "The packaging system frames the cake as a gift, with the box, sauce bottle, and product presented as one considered ritual.",
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
    "Tarta De Amor brings together concept, creative direction, website design, UX/UI, development, and intro video by Tarik Bamarouf, shaping a premium digital ordering experience for a luxury cheesecake brand in Jeddah.",
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
  category: "Digital Platform",
  intro:
    "A digital platform designed around refined interaction, intuitive navigation, and a modern product experience.",
  image: mihnHero,
  details: {
    client: "Mihn",
    industry: "Technology",
    services: "Brand Identity, User Experience Design, Product Design and Development",
    year: "2026",
    platform: "Digital Platform",
  },
  overview: {
    challenge:
      "Mihn is a digital platform designed to simplify user interaction through a refined interface, intuitive navigation, and a modern digital experience. The project focused on creating a seamless product ecosystem that combines elegant visual design with practical functionality across authentication, dashboard management, and platform operations.",
    approach:
      "The experience was structured around a cinematic home entry, a clear introduction, focused dashboard views, operational management flows, and a streamlined authentication journey.",
    outcome:
      "The platform presentation connects brand atmosphere with practical product surfaces, showing how Mihn moves from public positioning into everyday user and operator workflows.",
  },
  gallery: [
    {
      image: mihnIntro,
      title: "Introduction",
      caption:
        "A visual introduction establishing the platform’s atmosphere, positioning, and digital identity.",
    },
    {
      image: mihnDashOne,
      title: "Dashboard Overview",
      caption:
        "Core platform functionality presented through a clean and structured dashboard experience.",
    },
    {
      image: mihnDashTwo,
      title: "Management Interface",
      caption: "Administrative workflows designed for efficiency, clarity, and ease of use.",
    },
    {
      image: mihnDashThree,
      title: "Platform Operations",
      caption: "System tools and operational controls built around usability and scalability.",
    },
    {
      image: mihnSignIn,
      title: "Authentication Experience",
      caption:
        "A streamlined access flow designed to provide secure and frictionless platform access.",
    },
  ],
  reflection:
    "The final experience positions Mihn as a modern digital platform that balances functionality, usability, and visual refinement through a cohesive product ecosystem.",
};

const NOORIX_PROJECT: ProjectData = {
  slug: "norx-paints",
  name: "NOORIX",
  category: "Brand Identity and Digital Experience",
  intro:
    "A complete brand identity and digital experience created around strategic positioning, visual presence, and a cohesive customer journey.",
  image: noorixOrigin,
  details: {
    client: "NOORIX",
    industry: "Business and Technology",
    services: "Naming, Brand Strategy, Brand Identity, Website Design and Development",
    year: "2026",
    platform: "Brand Identity and Digital Experience",
  },
  overview: {
    challenge:
      "NOORIX is a brand created from the ground up, including naming, strategy, visual identity, digital direction, and website experience. The project focused on building a distinctive and scalable brand with a strong visual presence, clear positioning, and a cohesive identity system across every customer touchpoint.",
    approach:
      "The brand world was shaped through premium editorial layouts, refined color language, product presentation, environmental applications, and a website experience that connects visual identity with customer-facing storytelling.",
    outcome:
      "The digital presentation brings the brand system together across positioning, product identity, interiors, color exploration, transformation moments, and final brand applications.",
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
        "A product range section introduces the full premium coatings system through editorial layout and refined product presentation.",
    },
    {
      image: noorixPaletteCollection,
      title: "Palette Collection",
      caption:
        "The color library organizes signature shades, finishes, and families into a clear system for browsing and specification.",
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
    "The final outcome established NOORIX as a complete brand ecosystem, combining strategic positioning, visual identity, and digital execution into a cohesive and memorable experience.",
};

const POKEMON_SA_PROJECT: ProjectData = {
  slug: "pikmon-store",
  name: "Pokémon SA",
  category: "Collectibles Commerce Platform",
  intro:
    "A complete Pokémon-inspired commerce ecosystem designed from the ground up, combining collectibles, merchandise, customization, community engagement, and immersive digital experiences.",
  image: pokemonHero,
  details: {
    client: "Pokémon SA",
    industry: "Collectibles and E-Commerce",
    services:
      "Brand Creation, Naming, Brand Strategy, Visual Identity, Logo Design, User Experience Design, Product Experience and Website Development",
    year: "2026",
    platform: "Commerce Platform",
  },
  overview: {
    challenge:
      "Pokémon SA was created entirely from scratch, including brand naming, brand strategy, logo design, visual identity, user experience, interface design, product architecture, gamified experiences, merchandise customization systems, and the complete e-commerce website experience.",
    approach:
      "The goal was to build the ultimate destination for Pokémon collectors in Saudi Arabia, bringing together trading cards, sealed products, apparel, collectibles, rewards, and community-driven interactions inside a unified platform inspired by the Pokémon universe.",
    outcome:
      "The project organizes commerce, customization, rewards, and rare item discovery into a single collector ecosystem designed for browsing, buying, participating, and building personal Pokémon collections.",
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
        "A focused brand moment introduces the platform identity and visual language before the experience expands into products and community features.",
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
        "The hoodie collection expands the merchandise system with richer product presentation, sizing guidance, and premium apparel options.",
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
        "Interactive reward mechanics and subscription prompts turn the store into a participatory platform with challenges, codes, and community touchpoints.",
    },
    {
      image: pokemonRareMarketplace,
      title: "Rare Collector Marketplace",
      caption:
        "The rare desk creates a specialized intake flow for rare cards, sealed products, consignment, authenticity review, and collector requests.",
    },
  ],
  reflection:
    "Pokémon SA demonstrates a complete brand creation process, from naming and visual identity to user experience, commerce architecture, gamification systems, product customization tools, and platform development. The result is an immersive collector ecosystem designed for Pokémon fans and collectors in Saudi Arabia.",
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
      "SIP is a Saudi beverage brand developed from the ground up, including naming, brand identity, visual direction, digital presence, and website experience. The project focused on creating a modern and memorable beverage brand with a strong visual personality, distinctive market positioning, and a cohesive brand world across physical and digital touchpoints.",
    approach:
      "The identity system was built around bold typography, high-contrast product presentation, packaging shaped around flavor, and a dark digital environment that lets the cans, naming, and visual attitude carry the experience.",
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
        "The full beverage range is presented as a focused product system built around taste, energy, and zero-sugar options.",
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
        "Product cards translate the packaging system into a polished website experience for browsing the full range.",
    },
  ],
  reflection:
    "The final outcome established SIP as a distinctive Saudi beverage brand with a cohesive identity system, memorable visual language, and a premium digital presence that supports lasting brand growth.",
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
      "Creative Direction, Visual Identity Development, Brand System, Color Strategy, User Experience Design, Website Design, Frontend Experience Planning",
    year: "2026",
    platform: "Brand Identity and Website Experience",
  },
  overview: {
    challenge:
      "JOROF is a Saudi bottled water brand. The client already had the logo, and the project expanded that foundation into a complete visual direction, brand system, color strategy, digital experience, interface design, user experience structure, and full website experience.",
    approach:
      "The work focused on clarity, trust, quality, and daily reliability, translating the existing mark into a calm Saudi water brand with product presentation, manufacturing storytelling, quality assurance communication, and a customer acquisition journey.",
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
        "The brand story section turns the logo into a wider identity system, connecting Saudi origin, operational confidence, and daily trust.",
    },
    {
      image: jorofProductRange,
      title: "Product Range",
      caption:
        "The product presentation system organizes bottle formats with clean hierarchy, soft gradients, and information architecture shaped for purchase decisions.",
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
    "JOROF transformed an existing logo into a complete digital brand experience through visual direction, brand system development, color strategy, product presentation, manufacturing storytelling, quality assurance communication, and a customer acquisition journey. The result is a modern Saudi water brand built around clarity, trust, quality, and daily reliability.",
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
        "A structured product system organizes cups, bags, boxes, labels, and food service essentials for easy browsing.",
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
        "Client references show how the packaging system supports restaurants, cafés, and food brands in daily operation.",
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
    "Pakman becomes a complete professional case study for a Saudi restaurant packaging company, combining brand identity, packaging direction, website design, user interface direction, and art direction into a clear digital presence for food businesses.",
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

function getNextProject(currentSlug: string) {
  const idx = PROJECT_SEQUENCE.indexOf(currentSlug);
  const nextSlug = PROJECT_SEQUENCE[(idx + 1) % PROJECT_SEQUENCE.length];
  return BY_SLUG[nextSlug];
}

export const Route = createFileRoute("/work/$slug")({
  head: ({ params }) => {
    const p = BY_SLUG[params.slug];
    const title = p ? `${p.name} | Tarik Bamarouf` : "Project | Tarik Bamarouf";
    const desc = p?.intro ?? "Selected project by Tarik Bamarouf.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        ...(p ? [{ property: "og:image", content: p.image }] : []),
      ],
    };
  },
  loader: ({ params }) => {
    if (!BY_SLUG[params.slug]) throw notFound();
    return BY_SLUG[params.slug];
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
        <p className="font-serif text-3xl">{labels.loadError}</p>
      </div>
    </SiteLayout>
  );
}

function ProjectDetail() {
  const { language } = useLanguage();
  const labels = siteCopy[language].project;
  const rawProject = Route.useLoaderData();
  const project = localizeProject(rawProject, language);
  const masterProject = localizeProject(rawProject, "en");
  const next = localizeProject(getNextProject(rawProject.slug), language);

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
    { key: labels.client, value: project.details.client, masterValue: masterProject.details.client },
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
    { key: labels.type, value: project.details.platform, masterValue: masterProject.details.platform },
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
              <EnglishLayoutSlot master={masterProject.intro}>
                {project.intro}
              </EnglishLayoutSlot>
            </p>
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
