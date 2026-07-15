// Direct contact channels — update these to your real handles.
export const CONTACT_EMAIL = "tarikbamarouf@gmail.com";

// E.164 format without "+" or spaces (used by wa.me).
export const WHATSAPP_NUMBER = "966573511132";
export const WHATSAPP_DISPLAY = "0573511132";

export const INSTAGRAM_HANDLE = "tarikbamarouf";
export const INSTAGRAM_URL = `https://instagram.com/${INSTAGRAM_HANDLE}`;

export const WHATSAPP_MESSAGES = {
  ar: "السلام عليكم طارق، زرت موقعك وأرغب في تنفيذ موقع إلكتروني.",
  en: "Hi Tarik, I visited your portfolio and would like to discuss a website project.",
} as const;

export function getWhatsappHref(language: keyof typeof WHATSAPP_MESSAGES) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    WHATSAPP_MESSAGES[language],
  )}`;
}

export const emailHref = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
  "New project inquiry",
)}`;
