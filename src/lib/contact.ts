// Direct contact channels — update these to your real handles.
export const CONTACT_EMAIL = "tarikbamarouf@gmail.com";

// E.164 format without "+" or spaces (used by wa.me).
export const WHATSAPP_NUMBER = "966503938398";
export const WHATSAPP_DISPLAY = "0503938398";

export const INSTAGRAM_HANDLE = "tarikbamarouf";
export const INSTAGRAM_URL = `https://instagram.com/${INSTAGRAM_HANDLE}`;

export const WHATSAPP_MESSAGE =
  "Hello Tarik, I'd like to start a conversation about a new project.";

export const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE,
)}`;

export const emailHref = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
  "New project inquiry",
)}`;
