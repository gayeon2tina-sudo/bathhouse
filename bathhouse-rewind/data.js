/**
 * data.js — Bathhouse Rewind content
 *
 * Single source of truth for every stop on the map. Add a new bathhouse
 * tradition by adding one object to STOPS — nothing else in the app needs
 * to change.
 *
 * Fields:
 *   id, city, region   — identifiers / display names
 *   coords              — { lat, lon } real-world coordinates
 *   term, pronunciation — local-language name of the practice
 *   past, present       — 2-4 sentence paragraphs, historical origin & current form
 *   story               — a short present-tense narrative vignette (3-5 sentences),
 *                          the "natural language" scene-setting piece
 *   touch                — one sentence, the central embodied gesture (shown as pull-quote)
 *   heritageStatus       — { protected: bool, note: string }
 *   audio                — path to audio file, or null (see README)
 *   image                — path to an image file, or null (see README — sourcing guidance,
 *                          do not hotlink copyrighted photos without a checked license)
 *   imageCredit           — required if image is set — photographer/source + license
 */

const STOPS = [
  {
    id: "korea",
    city: "Seoul",
    region: "South Korea",
    coords: { lat: 37.57, lon: 126.98 },
    term: "목욕탕 · mogyoktang",
    pronunciation: "moh-gyok-tang",
    past: "Public bathhouses spread across Korea through the twentieth century as running hot water became shared urban infrastructure, arriving in most neighborhoods well before it reached private homes.",
    present: "Many mogyoktang and jjimjilbang endure as gender-separated wet rooms where scrubbing — seshin (세신) — is performed hand to hand, often between family members rather than by staff, using a rough green exfoliating cloth.",
    story: "The tiled room fills with steam before it fills with people. Someone's grandmother sits on a low plastic stool, back bent forward, waiting. A granddaughter kneels behind her with the green cloth soaked and ready. Nobody explains what to do — it is understood the way a native language is understood, learned by being inside it long before anyone can name it.",
    touch: "A rough green cloth passed from a grandmother's hand to a granddaughter's, one generation reading the other's skin like a map.",
    heritageStatus: { protected: false, note: "No UNESCO or formal heritage protection. Transmission depends entirely on family practice continuing." },
    audio: null,
    image: null,
    imageCredit: null
  },
  {
    id: "japan",
    city: "Tokyo",
    region: "Japan",
    coords: { lat: 35.68, lon: 139.65 },
    term: "銭湯 · sentō",
    pronunciation: "sen-toh",
    past: "Rooted in Buddhist purification rites dating to the Nara period, sentō became essential urban infrastructure through the twentieth century, when many homes lacked private baths.",
    present: "The ritual still insists on washing thoroughly at a low stool before ever entering the shared water. Mutual washing between family members — nagashi — remains common, though the number of sentō nationwide has been declining for decades as private plumbing became standard.",
    story: "Before the water, there is the stool. Two people sit facing each other, knees nearly touching, and take turns with the washcloth on backs neither can quite reach alone. It is unhurried in a way little else in the day is. Only once both are clean does either one stand to enter the shared bath — the order itself is the etiquette, and the etiquette is the relationship.",
    touch: "Mother and daughter at facing stools, washing each other in turn — an exchange with no beginning, only the pass of a hand from one back to the next.",
    heritageStatus: { protected: false, note: "No formal protection. Sentō numbers have fallen sharply since the mid-20th century." },
    audio: null,
    image: null,
    imageCredit: null
  },
  {
    id: "turkey",
    city: "Istanbul",
    region: "Türkiye",
    coords: { lat: 41.01, lon: 28.98 },
    term: "hamam",
    pronunciation: "hah-mahm",
    past: "Descended from Roman and Byzantine bathing halls, the hamam was refined under Ottoman rule into a sequence of cold, warm, and hot rooms centered on the göbek taşı, a heated marble platform.",
    present: "For centuries, a tellak's scrub and soap-foam massage were performed before weddings, births, and holidays — a rite some historic hamams still offer largely unchanged.",
    story: "The marble is warm before the body understands why. She lies on the göbek taşı at the center of the domed room, and for a while nothing happens except heat working its way in. Then the tellak arrives with the coarse kese mitt, and what lifts off in gray rolls is not just dead skin — it is whatever tension the last week left behind. A copper bowl of water follows, poured slowly, rinsing without rushing.",
    touch: "The kese lifts more than dead skin — it is meant to lift the worry of the last hour too.",
    heritageStatus: { protected: true, note: "Some historic hamam buildings are protected as architectural monuments. The embodied ritual of touch performed inside them is not." },
    audio: null,
    image: null,
    imageCredit: null
  },
  {
    id: "finland",
    city: "Helsinki",
    region: "Finland",
    coords: { lat: 60.17, lon: 24.94 },
    term: "sauna",
    pronunciation: "sow-na",
    past: "Practiced continuously for millennia, the sauna was historically used for childbirth, healing, and even settling disputes — 'saunassa ollaan kuin kirkossa,' behave as in church.",
    present: "Steam thrown onto hot stones — löyly — is still described as the spirit of the room. A bundle of birch, the vihta, is used to gently strike the skin and open circulation.",
    story: "Water hits the stones and the room exhales before anyone speaks. Löyly rises, sharp with heat, and conversation — if there is any — drops to something closer to silence. Someone lifts a bundle of birch, still damp, and works it in slow arcs across a friend's shoulders. The air smells like a forest in July, even in the middle of a Finnish January.",
    touch: "A bundle of birch struck gently against skin until the room smells like summer.",
    heritageStatus: { protected: true, note: "Inscribed on UNESCO's Representative List of Intangible Cultural Heritage in 2020 — the only tradition on this map with that formal recognition." },
    audio: null,
    image: null,
    imageCredit: null
  },
  {
    id: "russia",
    city: "Moscow",
    region: "Russia",
    coords: { lat: 55.75, lon: 37.62 },
    term: "баня · banya",
    pronunciation: "bahn-ya",
    past: "Bathhouses in Rus date to at least the tenth century, once attending births, weddings, and illness alike. A Russian proverb holds that a venik in the banya is worth more than money.",
    present: "The venik — a bundle of birch or oak branches — is passed hand to hand in a ritual called parenie, still treated by many families as a non-negotiable weekly practice.",
    story: "A grandfather lights the stove the way his father taught him, exactly, without deviation — this is not a chore, it is an inheritance. Inside, the heat is almost too much before it becomes exactly enough. He sweeps the venik across a grandchild's shoulders in slow, rhythmic strokes, not as punishment but as care, and the room fills with the smell of hot leaves and old stories neither of them has told yet.",
    touch: "A grandfather sweeping the branches across a grandchild's shoulders exactly as his own father taught him.",
    heritageStatus: { protected: false, note: "No formal protection. Increasingly commercialized outside the Slavic communities that once treated it as inseparable from family life." },
    audio: null,
    image: null,
    imageCredit: null
  },
  {
    id: "morocco",
    city: "Marrakech",
    region: "Morocco",
    coords: { lat: 31.63, lon: -7.99 },
    term: "hammam",
    pronunciation: "hah-mahm",
    past: "The public bath arrived via Roman tradition and expanded through the Islamic world; hammams were built near mosques so worshippers could purify themselves before prayer, and became woven into weekly neighborhood life.",
    present: "A visit moves through a warm room and a hot room, where savon noir — a thick olive-oil soap — is worked into the skin before exfoliation with a kessa glove, often finished with mineral-rich rhassoul clay from the Atlas Mountains.",
    story: "The black soap goes on first, dark and oily, and is left to sit while the steam does its slow work. Only then does the kessa glove come out — coarse, unhurried, moving in circles until what rinses away in the bucket is visibly, almost shockingly, a week's worth of city dust. Around her, aunts and cousins are doing the same thing to each other, and the gossip moves as steadily as the water.",
    touch: "Savon noir worked into the skin by a mother's hand, left to sit in silence before the scrubbing even begins.",
    heritageStatus: { protected: false, note: "Some individual hammam buildings hold local heritage status, but the communal ritual itself carries no UNESCO protection." },
    audio: null,
    image: null,
    imageCredit: null
  },
  {
    id: "iceland",
    city: "Reykjavik",
    region: "Iceland",
    coords: { lat: 64.13, lon: -21.82 },
    term: "heitir pottar",
    pronunciation: "HAY-tir POHT-ar",
    past: "Iceland's geothermal geology has produced naturally heated water for as long as people have lived there; some hot pots, like Guðrúnarlaug in the west, are said to date back roughly a thousand years and appear in the Icelandic sagas.",
    present: "Nearly every town, however small, has a public sundlaug with hot pots kept around 38–44°C. Locals visit several times a week — not to swim laps, but to talk. Photography inside is often discouraged; it is understood as a space for people, not for tourists.",
    story: "Nobody swims fast in a hot pot. You lower yourself in slowly, say hæ to whoever is already there, and let the conversation start however it starts — about the weather, a football match, a neighbor's new car. There is no agenda. By the time you leave, you may not know anyone's last name, but you will know what they think about something they care about, and that, in a town this small and this cold, is most of what community means.",
    touch: "Sliding into water someone else has already warmed with their presence, and being handed a conversation instead of silence.",
    heritageStatus: { protected: false, note: "No formal protection, though sundlaug culture is treated by locals as close to a national institution." },
    audio: null,
    image: null,
    imageCredit: null
  },
  {
    id: "hungary",
    city: "Budapest",
    region: "Hungary",
    coords: { lat: 47.50, lon: 19.04 },
    term: "gyógyfürdő",
    pronunciation: "dyohj-fewr-doh",
    past: "Bathing culture in Budapest reaches back to Roman Aquincum, but its most distinctive layer arrived during the Ottoman occupation of the 16th and 17th centuries, which built octagonal domed pools like those still standing at Rudas and Veli Bej.",
    present: "After the Ottomans left, Hungarians kept and expanded the tradition — grand 19th-century complexes like Széchenyi turned bathing into civic spectacle, famous for elderly men playing chess shoulder-deep in steaming outdoor water.",
    story: "Under Rudas's five-hundred-year-old dome, small shafts of colored light fall through the ceiling and land on the water in moving coins. Men who have known each other for decades sit in the octagonal pool the way others might sit at a familiar café table — no agenda, no clock, just heat and half-finished conversations picked up from the week before. Above them, on the rooftop pool, a different crowd watches the Danube light up as evening comes on.",
    touch: "A worn chess board balanced on the pool's edge, a game continued from a week no one quite remembers starting.",
    heritageStatus: { protected: true, note: "Several historic bathhouse buildings are protected as architectural monuments; Budapest is informally known as the 'City of Spas.'" },
    audio: null,
    image: null,
    imageCredit: null
  }
];

// Map projection bounds — widened to cover Iceland through Japan.
// If you add a stop outside this range, widen these accordingly.
const MAP_BOUNDS = {
  lonMin: -25,
  lonMax: 150,
  latMin: 25,
  latMax: 68
};

if (typeof module !== "undefined") {
  module.exports = { STOPS, MAP_BOUNDS };
}
