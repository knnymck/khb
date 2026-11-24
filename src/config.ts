// Site configuration for Kirby House Buyers.
//
// Placeholders Kenny still needs to fill in:
//
//   FORMSPREE_FORM_ID — Create a free form at https://formspree.io and paste
//   the form ID here. Until this is set, the lead form will not submit.
//
//   PHONE_NUMBER / CONTACT_EMAIL — The business phone and email, once they
//   exist. Leave them as empty strings until then; the site hides the
//   contact links while they are unset. Never put a personal cell number here.

export const BRAND_NAME = "Kirby House Buyers";

export const FORMSPREE_FORM_ID = "YOUR_FORM_ID";

export const PHONE_NUMBER = "";

export const CONTACT_EMAIL = "";

/** True once Kenny has pasted a real Formspree form ID above. */
export const IS_FORM_CONFIGURED = FORMSPREE_FORM_ID !== "YOUR_FORM_ID";
