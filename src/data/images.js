// Every photo used on the site is referenced from here, so swapping in new
// photography is a one-line change per image.
// /images/team/*  : photos supplied by the business.
// /images/*       : Unsplash photography (free for commercial use), stored locally.

const img = (file, alt, width, height) => ({ src: `/images/${file}`, alt, width, height })

export const images = {
  // Interiors and details (Unsplash)
  hero: img('hero-living.jpg', 'Sunlit living room with large windows, a grey sofa and leather chairs', 2200, 1160),
  gloveWipe: img('detail-glove-wipe.jpg', 'Gloved hand wiping a white worktop with a cloth', 1400, 933),
  gloveSpray: img('detail-glove-spray.jpg', 'Gloved hand holding a spray bottle', 1400, 933),
  deskWipe: img('detail-desk-wipe.jpg', 'Gloved hands wiping down a dark desk surface', 1400, 933),
  amberBottles: img('detail-amber-bottles.jpg', 'Two amber glass spray bottles labelled for bathroom and kitchen', 1400, 2100),
  lemonSpray: img('detail-lemon-spray.jpg', 'Spray bottle of citrus cleaner next to fresh lemons', 1400, 1050),
  vacuumCarpet: img('vacuum-carpet.jpg', 'Vacuum cleaner head lifting debris from a carpet', 1600, 1200),
  officeNight: img('office-silhouette.jpg', 'Cleaner mopping an office floor after hours', 2000, 1333),
  bathroomWood: img('bathroom-wood.jpg', 'Bathroom with timber slat wall and grey tiles', 1600, 1200),
  kitchenIsland: img('kitchen-island.jpg', 'White kitchen with an island and timber stools', 1800, 1200),
  bathroomTub: img('bathroom-tub.jpg', 'Freestanding bath in a white bathroom', 1600, 1068),
  bedroom: img('bedroom-calm.jpg', 'Neatly made bed in a calm, light bedroom', 1600, 1067),
  livingBright: img('living-bright.jpg', 'Bright open-plan living space with grey sofa', 1800, 1224),
  kitchenWhite: img('kitchen-white.jpg', 'White kitchen with pendant lights and bar stools', 1600, 1063),
  glassHouse: img('glass-house.jpg', 'Glass-walled living area with a staircase and pool view', 1800, 1200),
  apartmentPlants: img('apartment-plants.jpg', 'Airy apartment with timber floors and plants', 1600, 1067),
  livingLoft: img('living-loft.jpg', 'Loft living room with a gallery wall and leather sofa', 1600, 1200),

  // The team at work (supplied). Cut-outs are transparent WebP versions.
  heroCutout: img('team/hero-cleaner-cutout.webp', 'Smiling Algorique cleaner in a navy uniform reviewing a checklist on a clipboard', 687, 789),
  smilingCutout: img('team/cleaner-smiling-cutout.webp', 'Smiling cleaner in yellow gloves wiping a table with a spray bottle in hand', 549, 778),
  teamChecklist: img('team/team-checklist.jpg', 'Cleaner reviewing a checklist on a clipboard while a colleague cleans behind her', 1200, 800),
  kitchenMopping: img('team/kitchen-mopping.jpg', 'Cleaner mopping a bright kitchen floor', 736, 1051),
  livingTeamGreen: img('team/living-team-green.jpg', 'Two cleaners in green aprons wiping and mopping a living room', 556, 770),
  cleanerSmiling: img('team/cleaner-smiling.jpg', 'Smiling cleaner in yellow gloves wiping a table, colleagues working behind', 1200, 800),
  kitchenFloorScrub: img('team/kitchen-floor-scrub.jpg', 'Cleaner scrubbing a tiled kitchen floor with a machine', 736, 775),
  bathroomAndCarpet: img('team/bathroom-and-carpet.jpg', 'Cleaners scrubbing bathroom tiles and vacuuming a rug', 735, 490),
  handshake: img('team/handshake-caddy.jpg', 'Client shaking hands with a cleaner beside a caddy of cleaning supplies', 1200, 800),
  kitchenWipe: img('team/kitchen-wipe.jpg', 'Cleaner wiping down a kitchen worktop', 1024, 977),
  tablePolish: img('team/table-polish.jpg', 'Cleaner polishing a wooden coffee table while a colleague mops behind', 1200, 1800),
  officeGlass: img('team/office-glass.jpg', 'Cleaner wiping a glass partition in an office corridor', 1024, 1024),
  showerGlass: img('team/shower-glass.jpg', 'Cleaner kneeling to clean a glass shower screen', 848, 1264),
  teamLivingRoom: img('team/team-living-room.jpg', 'Cleaning team vacuuming and tidying a living room together', 1000, 667),
  buildersMopping: img('team/builders-mopping.jpg', 'Cleaners in overalls mopping a newly finished glazed space', 736, 736),
  sofaUpholstery: img('team/sofa-upholstery.jpg', 'Cleaners vacuuming a grey sofa and rug', 796, 952),
  teamOpenPlan: img('team/team-open-plan.jpg', 'Two cleaners vacuuming and wiping an open-plan apartment', 736, 736),
  officeVacuum: img('team/office-vacuum.jpg', 'Cleaner vacuuming carpet between office desks', 736, 1104),
  bathroomShower: img('team/bathroom-shower.jpg', 'Cleaner spraying and wiping a shower enclosure', 736, 1103),
}
