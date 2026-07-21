// Direct contact channels — update these to your real handles.
export const CONTACT_EMAIL = "tarikbamarouf@gmail.com";

// E.164 format without "+" or spaces (used by wa.me).
export const WHATSAPP_NUMBER = "966573511132";
export const WHATSAPP_DISPLAY = "0573511132";

export const INSTAGRAM_URL =
  "https://www.instagram.com/bamaroufstudio?igsh=MWs0dW0ybzZrMmE4Mw==";
export const TIKTOK_URL = "https://www.tiktok.com/@bamaroufstudio?_r=1&_t=ZS-98DieCp6cKa";

export const WHATSAPP_MESSAGES = {
  ar: "السلام عليكم طارق،\nاطلعت على موقعك وأرغب في مناقشة تنفيذ موقع إلكتروني لمشروعي.",
  en: "Hi Tarik,\n\nI came across your portfolio and I'd like to discuss building a website for my project.",
} as const;

export function getWhatsappHref(language: keyof typeof WHATSAPP_MESSAGES) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    WHATSAPP_MESSAGES[language],
  )}`;
}

export const emailHref = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
  "New project inquiry",
)}`;
