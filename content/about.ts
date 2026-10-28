import { site } from "./site"

export const about = {
  eyebrow: "About",
  // Revealed word by word on scroll.
  statement:
    `We're a small studio in ${site.region} that makes brands look as good as they are. Clear ideas, quick replies, work you'll want to post.`,
  paragraph:
    "Align Media works with shops, restaurants, startups and personal brands that need good design without the agency runaround. One team handles your posters, videos, social pages and ads, so everything looks like it belongs together. We keep things simple: you talk to the people doing the work, on WhatsApp, and you get files on time.",
  sticker: site.location,
} as const
