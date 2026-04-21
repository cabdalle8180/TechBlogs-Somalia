import DOMPurify from "dompurify";

export function sanitizeHtml(html) {
  return DOMPurify.sanitize(html || "", {
    USE_PROFILES: { html: true },
    FORBID_TAGS: ["style", "script"],
    FORBID_ATTR: ["onerror", "onload", "onclick"],
  });
}

export function stripHtml(html) {
  if (!html) return "";
  return String(html).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

