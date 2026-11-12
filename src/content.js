/* =====================================================================
   WEDDINGS BY EDWARD: ALL EDITABLE CONTENT LIVES IN THIS FILE
   Change text, contact details or photos here. Photos live in public/images.
   ===================================================================== */

export const CONTACT = {
  whatsapp: "919743011524",          // country code + number, digits only
  phone: "+91 97430 11524",
  email: "eventsdonatella@gmail.com",
  instagram: "weddingsbyedward",     // without the @
  hours: "Monday to Saturday, 9am to 6pm",
  location: "Bengaluru, India",
};

export const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "founder", label: "Founder" },
  { id: "services", label: "Services" },
  { id: "portfolio", label: "Portfolio" },
  { id: "contact", label: "Contact" },
];

export const SERVICES = [
  { title: "Muhurtham & Mandaps", text: "Traditional mandaps with fresh flowers, from intimate halls to grand open lawns." },
  { title: "Nikah", text: "Graceful nikah stages and seating, styled with care for every family tradition." },
  { title: "Church Weddings & Roce", text: "Aisles, altars and roce ceremonies dressed in soft, Western-style florals." },
  { title: "Receptions", text: "Statement stages, ceiling drapes, entrances and aisles that welcome every guest." },
  { title: "Engagements", text: "Ring ceremonies and engagement evenings with a personal, elegant backdrop." },
  { title: "Haldi", text: "Bright, joyful haldi setups for the celebrations before the big day." },
];

// category must be "stages", "mandaps" or "entrances" so the filters work
export const PORTFOLIO = [
  { src: "stage-lavender.jpg", title: "Lavender Floral Wall", category: "stages", alt: "Reception stage with a lavender floral wall framed in a curved white panel, chandeliers and hanging greenery" },
  { src: "mandap.jpg", title: "Rose & Chrysanthemum Mandap", category: "mandaps", alt: "Mandap with red rose canopy and white chrysanthemum pillars in a wedding hall" },
  { src: "stage-gold-arches.jpg", title: "Gold Arches in Bloom", category: "stages", alt: "Reception stage with gold arches, a central floral wall and ceiling drapes" },
  { src: "aisle-rose.jpg", title: "Rose-lined Aisle", category: "entrances", alt: "Aisle lined with pink and purple roses and glowing leaf lamps leading to a reception stage" },
  { src: "stage-floral-wall.jpg", title: "Cascading Floral Wall", category: "stages", alt: "Stage with a cascading pink and cream floral wall and a central arch" },
  { src: "entrance-evening.jpg", title: "Entrance by Evening", category: "entrances", alt: "Wedding hall entrance framed with white flowers, greenery and hanging gold lanterns at night" },
  { src: "garden-mandap.jpg", title: "Garden Mandap", category: "mandaps", alt: "Open-lawn garden mandap with pink canopies and dining tables on either side of a stone path" },
  { src: "stage-pergola.jpg", title: "Greenery Pergola", category: "stages", alt: "White pergola stage covered in greenery and white flowers under ceiling drapes" },
  { src: "aisle-white.jpg", title: "White Floral Aisle", category: "entrances", alt: "White floral aisle with leaf lamps leading to a white arched stage" },
  { src: "stage-red-velvet.jpg", title: "Red Velvet & Chandeliers", category: "stages", alt: "Stage with red ceiling drapes, crystal chandeliers and red and white roses" },
  { src: "entrance-archway.jpg", title: "Floral Archway", category: "entrances", alt: "Floral entrance archway draped in purple and white fabric with lilac blooms" },
  { src: "stage-floral-wonderland.jpg", title: "Floral Wonderland", category: "stages", alt: "Stage with a full white and pink floral wall, hanging pink blooms and a colourful flower border" },
];

export const FILTERS = [
  { id: "all", label: "All" },
  { id: "stages", label: "Stages", tag: "Stage" },
  { id: "mandaps", label: "Mandaps", tag: "Mandap" },
  { id: "entrances", label: "Entrances & Aisles", tag: "Entrance" },
];

export const STEPS = [
  { title: "Listen", text: "We learn about you, your families, your traditions, your venue and your budget." },
  { title: "Design", text: "We shape the concept: the frame of the stage, the palette and the flowers." },
  { title: "Prepare", text: "We source, coordinate and refine every element, and keep you updated along the way." },
  { title: "Celebrate", text: "We set up on the day and look after the details, so you can enjoy every moment." },
];

// Choices offered in the "Plan your wedding" enquiry
export const CEREMONIES = ["Muhurtham", "Nikah", "Church wedding", "Roce", "Reception", "Engagement", "Haldi"];
export const GUESTS = ["Under 100", "100 – 300", "300 – 600", "600+"];
