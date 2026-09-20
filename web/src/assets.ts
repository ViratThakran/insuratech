/* ==========================================================================
   AUREVIA — IMAGE ASSETS
   ==========================================================================
   Four art-directed assets carry the film. Drop the files into
   `web/public/images/` using the exact filenames below and they appear —
   no other change is required anywhere in the codebase.

   Until then each slot renders as an honest production placeholder: a
   framed, labelled reservation with crop marks. It is deliberately NOT a
   drawn stand-in pretending to be a photograph.

   Brief for the photography / film:
   ---------------------------------
   01  world.jpg      Cinematic commercial or industrial environment.
                      Aerial or low-angle. Large scale, strong shadow,
                      restrained grade. This is the opening frame of the
                      film — it must hold the screen on its own.
                      Optional: world.mp4 (8–12s, near-static camera,
                      silent, loops) — if present it is used instead.

   02  document.jpg   A realistic fictional insurance policy, photographed.
                      Paper texture, raking light, page edge visible,
                      shallow depth of field. Shot flat or at a slight
                      angle. No screens in frame.

   03  human.jpg      Hands reviewing a policy at a desk. No face. Pen,
                      paper, coffee, daylight. Quiet, documentary, unposed.

   04  industry.jpg   Industrial or logistics environment that can carry a
                      dark grade — warehouse interior, yard, plant, fleet.
                      Used as the ground for the risk scene.

   All four should read as one shoot: same grade, same grain, same
   restraint. Monochrome or near-monochrome is preferred.
   ========================================================================== */

export type AssetKey = "world" | "document" | "human" | "industry";

export type Asset = {
  /** file to drop into web/public/images/ */
  src: string;
  /** optional silent video loop, used in place of the still if present */
  video?: string;
  alt: string;
  /** what the slot is reserving, shown on the placeholder */
  slot: string;
  note: string;
};

export const assets: Record<AssetKey, Asset> = {
  world: {
    src: "/images/world.jpg",
    video: "/images/world.mp4",
    alt: "A commercial industrial environment at scale",
    slot: "01 · The world",
    note: "Cinematic commercial / industrial environment",
  },
  document: {
    src: "/images/document.jpg",
    alt: "A property insurance policy on a desk",
    slot: "02 · The document",
    note: "Realistic insurance policy, photographed on paper",
  },
  human: {
    src: "/images/human.jpg",
    alt: "Hands reviewing an insurance policy at a desk",
    slot: "03 · The human",
    note: "Hands, paper, desk — no face",
  },
  industry: {
    src: "/images/industry.jpg",
    alt: "An industrial logistics environment",
    slot: "04 · The ground",
    note: "Industrial / logistics environment for the risk scene",
  },
};
