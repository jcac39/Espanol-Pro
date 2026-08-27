// ─── VOCAB ───────────────────────────────────────────────────────────────────
// ~250 words across 16 themes. Each word drilled in both directions (EN→ES and ES→EN).

export const VOCAB = [
  // drinks
  { id: "v1",   es: "el agua",         en: "water",                theme: "drinks" },
  { id: "v2",   es: "el vino",         en: "wine",                 theme: "drinks" },
  { id: "v3",   es: "la cerveza",      en: "beer",                 theme: "drinks" },
  { id: "v4",   es: "el café",         en: "coffee",               theme: "drinks" },
  { id: "v5",   es: "la leche",        en: "milk",                 theme: "drinks" },
  { id: "v6",   es: "el zumo",         en: "juice",                theme: "drinks" },
  { id: "v7",   es: "el té",           en: "tea",                  theme: "drinks" },

  // food
  { id: "v8",   es: "el pan",          en: "bread",                theme: "food" },
  { id: "v9",   es: "la carne",        en: "meat",                 theme: "food" },
  { id: "v10",  es: "el pollo",        en: "chicken",              theme: "food" },
  { id: "v11",  es: "el pescado",      en: "fish",                 theme: "food" },
  { id: "v12",  es: "el arroz",        en: "rice",                 theme: "food" },
  { id: "v13",  es: "la verdura",      en: "vegetable",            theme: "food" },
  { id: "v14",  es: "la fruta",        en: "fruit",                theme: "food" },
  { id: "v15",  es: "la manzana",      en: "apple",                theme: "food" },
  { id: "v16",  es: "la naranja",      en: "orange",               theme: "food" },
  { id: "v17",  es: "el tomate",       en: "tomato",               theme: "food" },
  { id: "v18",  es: "el queso",        en: "cheese",               theme: "food" },
  { id: "v19",  es: "el huevo",        en: "egg",                  theme: "food" },
  { id: "v20",  es: "la sopa",         en: "soup",                 theme: "food" },
  { id: "v21",  es: "el azúcar",       en: "sugar",                theme: "food" },
  { id: "v22",  es: "la sal",          en: "salt",                 theme: "food" },
  { id: "v23",  es: "el aceite",       en: "oil",                  theme: "food" },
  { id: "v24",  es: "la mantequilla",  en: "butter",               theme: "food" },
  { id: "v25",  es: "el jamón",        en: "ham",                  theme: "food" },
  { id: "v26",  es: "el desayuno",     en: "breakfast",            theme: "food" },
  { id: "v27",  es: "el almuerzo",     en: "lunch",                theme: "food" },
  { id: "v28",  es: "la cena",         en: "dinner",               theme: "food" },

  // home
  { id: "v29",  es: "la casa",         en: "house",                theme: "home" },
  { id: "v30",  es: "la habitación",   en: "room",                 theme: "home" },
  { id: "v31",  es: "la cocina",       en: "kitchen",              theme: "home" },
  { id: "v32",  es: "el baño",         en: "bathroom",             theme: "home" },
  { id: "v33",  es: "la sala",         en: "living room",          theme: "home" },
  { id: "v34",  es: "la mesa",         en: "table",                theme: "home" },
  { id: "v35",  es: "la silla",        en: "chair",                theme: "home" },
  { id: "v36",  es: "la cama",         en: "bed",                  theme: "home" },
  { id: "v37",  es: "el sofá",         en: "sofa",                 theme: "home" },
  { id: "v38",  es: "la puerta",       en: "door",                 theme: "home" },
  { id: "v39",  es: "la ventana",      en: "window",               theme: "home" },
  { id: "v40",  es: "el jardín",       en: "garden",               theme: "home" },
  { id: "v41",  es: "la nevera",       en: "fridge",               theme: "home" },
  { id: "v42",  es: "el armario",      en: "wardrobe",             theme: "home" },
  { id: "v43",  es: "el espejo",       en: "mirror",               theme: "home" },
  { id: "v44",  es: "la lámpara",      en: "lamp",                 theme: "home" },

  // people & family
  { id: "v45",  es: "el amigo",        en: "friend",               theme: "people" },
  { id: "v46",  es: "la familia",      en: "family",               theme: "people" },
  { id: "v47",  es: "el padre",        en: "father",               theme: "people" },
  { id: "v48",  es: "la madre",        en: "mother",               theme: "people" },
  { id: "v49",  es: "el hermano",      en: "brother",              theme: "people" },
  { id: "v50",  es: "la hermana",      en: "sister",               theme: "people" },
  { id: "v51",  es: "el abuelo",       en: "grandfather",          theme: "people" },
  { id: "v52",  es: "la abuela",       en: "grandmother",          theme: "people" },
  { id: "v53",  es: "el hijo",         en: "son",                  theme: "people" },
  { id: "v54",  es: "la hija",         en: "daughter",             theme: "people" },
  { id: "v55",  es: "el marido",       en: "husband",              theme: "people" },
  { id: "v56",  es: "la esposa",       en: "wife",                 theme: "people" },
  { id: "v57",  es: "el novio",        en: "boyfriend",            theme: "people" },
  { id: "v58",  es: "la novia",        en: "girlfriend",           theme: "people" },
  { id: "v59",  es: "el hombre",       en: "man",                  theme: "people" },
  { id: "v60",  es: "la mujer",        en: "woman",                theme: "people" },
  { id: "v61",  es: "el niño",         en: "boy / child",          theme: "people" },
  { id: "v62",  es: "el vecino",       en: "neighbour",            theme: "people" },
  { id: "v63",  es: "el jefe",         en: "boss",                 theme: "people" },

  // body
  { id: "v64",  es: "la cabeza",       en: "head",                 theme: "body" },
  { id: "v65",  es: "la cara",         en: "face",                 theme: "body" },
  { id: "v66",  es: "el ojo",          en: "eye",                  theme: "body" },
  { id: "v67",  es: "la nariz",        en: "nose",                 theme: "body" },
  { id: "v68",  es: "la boca",         en: "mouth",                theme: "body" },
  { id: "v69",  es: "la mano",         en: "hand",                 theme: "body" },
  { id: "v70",  es: "el brazo",        en: "arm",                  theme: "body" },
  { id: "v71",  es: "la pierna",       en: "leg",                  theme: "body" },
  { id: "v72",  es: "el pie",          en: "foot",                 theme: "body" },
  { id: "v73",  es: "el corazón",      en: "heart",                theme: "body" },
  { id: "v74",  es: "la espalda",      en: "back",                 theme: "body" },
  { id: "v75",  es: "el estómago",     en: "stomach",              theme: "body" },
  { id: "v76",  es: "el pelo",         en: "hair",                 theme: "body" },
  { id: "v77",  es: "el diente",       en: "tooth",                theme: "body" },
  { id: "v78",  es: "la oreja",        en: "ear",                  theme: "body" },

  // clothing
  { id: "v79",  es: "la ropa",         en: "clothes",              theme: "clothing" },
  { id: "v80",  es: "la camisa",       en: "shirt",                theme: "clothing" },
  { id: "v81",  es: "la camiseta",     en: "t-shirt",              theme: "clothing" },
  { id: "v82",  es: "el pantalón",     en: "trousers",             theme: "clothing" },
  { id: "v83",  es: "la falda",        en: "skirt",                theme: "clothing" },
  { id: "v84",  es: "el vestido",      en: "dress",                theme: "clothing" },
  { id: "v85",  es: "el zapato",       en: "shoe",                 theme: "clothing" },
  { id: "v86",  es: "el abrigo",       en: "coat",                 theme: "clothing" },
  { id: "v87",  es: "la chaqueta",     en: "jacket",               theme: "clothing" },
  { id: "v88",  es: "el sombrero",     en: "hat",                  theme: "clothing" },
  { id: "v89",  es: "el bolso",        en: "bag / handbag",        theme: "clothing" },
  { id: "v90",  es: "la talla",        en: "size",                 theme: "clothing" },

  // transport
  { id: "v91",  es: "el coche",        en: "car",                  theme: "transport" },
  { id: "v92",  es: "el autobús",      en: "bus",                  theme: "transport" },
  { id: "v93",  es: "el tren",         en: "train",                theme: "transport" },
  { id: "v94",  es: "el avión",        en: "plane",                theme: "transport" },
  { id: "v95",  es: "la bicicleta",    en: "bicycle",              theme: "transport" },
  { id: "v96",  es: "el taxi",         en: "taxi",                 theme: "transport" },
  { id: "v97",  es: "el metro",        en: "underground / subway", theme: "transport" },
  { id: "v98",  es: "el barco",        en: "boat / ship",          theme: "transport" },
  { id: "v99",  es: "el aeropuerto",   en: "airport",              theme: "transport" },
  { id: "v100", es: "la estación",     en: "station",              theme: "transport" },
  { id: "v101", es: "el billete",      en: "ticket",               theme: "transport" },
  { id: "v102", es: "el pasaporte",    en: "passport",             theme: "transport" },
  { id: "v103", es: "la maleta",       en: "suitcase",             theme: "transport" },

  // places
  { id: "v104", es: "la ciudad",       en: "city",                 theme: "places" },
  { id: "v105", es: "la calle",        en: "street",               theme: "places" },
  { id: "v106", es: "el mercado",      en: "market",               theme: "places" },
  { id: "v107", es: "la tienda",       en: "shop / store",         theme: "places" },
  { id: "v108", es: "el restaurante",  en: "restaurant",           theme: "places" },
  { id: "v109", es: "el hotel",        en: "hotel",                theme: "places" },
  { id: "v110", es: "el banco",        en: "bank",                 theme: "places" },
  { id: "v111", es: "el hospital",     en: "hospital",             theme: "places" },
  { id: "v112", es: "la farmacia",     en: "pharmacy",             theme: "places" },
  { id: "v113", es: "el parque",       en: "park",                 theme: "places" },
  { id: "v114", es: "el supermercado", en: "supermarket",          theme: "places" },
  { id: "v115", es: "el museo",        en: "museum",               theme: "places" },
  { id: "v116", es: "la biblioteca",   en: "library",              theme: "places" },
  { id: "v117", es: "la playa",        en: "beach",                theme: "places" },
  { id: "v118", es: "la iglesia",      en: "church",               theme: "places" },
  { id: "v119", es: "el pueblo",       en: "town / village",       theme: "places" },
  { id: "v120", es: "el país",         en: "country",              theme: "places" },

  // work & school
  { id: "v121", es: "el trabajo",      en: "work / job",           theme: "work" },
  { id: "v122", es: "la oficina",      en: "office",               theme: "work" },
  { id: "v123", es: "la reunión",      en: "meeting",              theme: "work" },
  { id: "v124", es: "el ordenador",    en: "computer",             theme: "work" },
  { id: "v125", es: "el teléfono",     en: "phone",                theme: "work" },
  { id: "v126", es: "el correo",       en: "email / post",         theme: "work" },
  { id: "v127", es: "la empresa",      en: "company",              theme: "work" },
  { id: "v128", es: "la escuela",      en: "school",               theme: "work" },
  { id: "v129", es: "la universidad",  en: "university",           theme: "work" },
  { id: "v130", es: "la clase",        en: "class",                theme: "work" },
  { id: "v131", es: "el estudiante",   en: "student",              theme: "work" },
  { id: "v132", es: "el libro",        en: "book",                 theme: "work" },
  { id: "v133", es: "el bolígrafo",    en: "pen",                  theme: "work" },
  { id: "v134", es: "el papel",        en: "paper",                theme: "work" },

  // nature & animals
  { id: "v135", es: "el sol",          en: "sun",                  theme: "nature" },
  { id: "v136", es: "la lluvia",       en: "rain",                 theme: "nature" },
  { id: "v137", es: "el viento",       en: "wind",                 theme: "nature" },
  { id: "v138", es: "la nieve",        en: "snow",                 theme: "nature" },
  { id: "v139", es: "el cielo",        en: "sky",                  theme: "nature" },
  { id: "v140", es: "el mar",          en: "sea",                  theme: "nature" },
  { id: "v141", es: "el río",          en: "river",                theme: "nature" },
  { id: "v142", es: "la montaña",      en: "mountain",             theme: "nature" },
  { id: "v143", es: "el árbol",        en: "tree",                 theme: "nature" },
  { id: "v144", es: "la flor",         en: "flower",               theme: "nature" },
  { id: "v145", es: "el perro",        en: "dog",                  theme: "nature" },
  { id: "v146", es: "el gato",         en: "cat",                  theme: "nature" },
  { id: "v147", es: "el pájaro",       en: "bird",                 theme: "nature" },

  // time & dates
  { id: "v148", es: "ahora",           en: "now",                  theme: "time" },
  { id: "v149", es: "hoy",             en: "today",                theme: "time" },
  { id: "v150", es: "mañana",          en: "tomorrow / morning",   theme: "time" },
  { id: "v151", es: "ayer",            en: "yesterday",            theme: "time" },
  { id: "v152", es: "siempre",         en: "always",               theme: "time" },
  { id: "v153", es: "nunca",           en: "never",                theme: "time" },
  { id: "v154", es: "la semana",       en: "week",                 theme: "time" },
  { id: "v155", es: "el mes",          en: "month",                theme: "time" },
  { id: "v156", es: "el año",          en: "year",                 theme: "time" },
  { id: "v157", es: "la hora",         en: "hour / time",          theme: "time" },
  { id: "v158", es: "el minuto",       en: "minute",               theme: "time" },
  { id: "v159", es: "el lunes",        en: "Monday",               theme: "time" },
  { id: "v160", es: "el martes",       en: "Tuesday",              theme: "time" },
  { id: "v161", es: "el miércoles",    en: "Wednesday",            theme: "time" },
  { id: "v162", es: "el jueves",       en: "Thursday",             theme: "time" },
  { id: "v163", es: "el viernes",      en: "Friday",               theme: "time" },
  { id: "v164", es: "el sábado",       en: "Saturday",             theme: "time" },
  { id: "v165", es: "el domingo",      en: "Sunday",               theme: "time" },
  { id: "v166", es: "la tarde",        en: "afternoon / evening",  theme: "time" },
  { id: "v167", es: "la noche",        en: "night",                theme: "time" },
  { id: "v168", es: "el día",          en: "day",                  theme: "time" },

  // numbers
  { id: "v169", es: "uno",             en: "one",                  theme: "numbers" },
  { id: "v170", es: "dos",             en: "two",                  theme: "numbers" },
  { id: "v171", es: "tres",            en: "three",                theme: "numbers" },
  { id: "v172", es: "cuatro",          en: "four",                 theme: "numbers" },
  { id: "v173", es: "cinco",           en: "five",                 theme: "numbers" },
  { id: "v174", es: "seis",            en: "six",                  theme: "numbers" },
  { id: "v175", es: "siete",           en: "seven",                theme: "numbers" },
  { id: "v176", es: "ocho",            en: "eight",                theme: "numbers" },
  { id: "v177", es: "nueve",           en: "nine",                 theme: "numbers" },
  { id: "v178", es: "diez",            en: "ten",                  theme: "numbers" },
  { id: "v179", es: "veinte",          en: "twenty",               theme: "numbers" },
  { id: "v180", es: "cien",            en: "one hundred",          theme: "numbers" },
  { id: "v181", es: "mil",             en: "one thousand",         theme: "numbers" },

  // adjectives
  { id: "v182", es: "grande",          en: "big / large",          theme: "adjectives" },
  { id: "v183", es: "pequeño",         en: "small / little",       theme: "adjectives" },
  { id: "v184", es: "bueno",           en: "good",                 theme: "adjectives" },
  { id: "v185", es: "malo",            en: "bad",                  theme: "adjectives" },
  { id: "v186", es: "nuevo",           en: "new",                  theme: "adjectives" },
  { id: "v187", es: "viejo",           en: "old",                  theme: "adjectives" },
  { id: "v188", es: "mucho",           en: "a lot / many",         theme: "adjectives" },
  { id: "v189", es: "poco",            en: "a little / few",       theme: "adjectives" },
  { id: "v190", es: "bonito",          en: "pretty / nice",        theme: "adjectives" },
  { id: "v191", es: "feo",             en: "ugly",                 theme: "adjectives" },
  { id: "v192", es: "fácil",           en: "easy",                 theme: "adjectives" },
  { id: "v193", es: "difícil",         en: "difficult",            theme: "adjectives" },
  { id: "v194", es: "rápido",          en: "fast / quick",         theme: "adjectives" },
  { id: "v195", es: "lento",           en: "slow",                 theme: "adjectives" },
  { id: "v196", es: "joven",           en: "young",                theme: "adjectives" },
  { id: "v197", es: "caliente",        en: "hot",                  theme: "adjectives" },
  { id: "v198", es: "frío",            en: "cold",                 theme: "adjectives" },
  { id: "v199", es: "limpio",          en: "clean",                theme: "adjectives" },
  { id: "v200", es: "sucio",           en: "dirty",                theme: "adjectives" },
  { id: "v201", es: "cansado",         en: "tired",                theme: "adjectives" },
  { id: "v202", es: "contento",        en: "happy / pleased",      theme: "adjectives" },
  { id: "v203", es: "triste",          en: "sad",                  theme: "adjectives" },
  { id: "v204", es: "enfermo",         en: "ill / sick",           theme: "adjectives" },
  { id: "v205", es: "abierto",         en: "open",                 theme: "adjectives" },
  { id: "v206", es: "cerrado",         en: "closed",               theme: "adjectives" },
  { id: "v207", es: "lleno",           en: "full",                 theme: "adjectives" },
  { id: "v208", es: "vacío",           en: "empty",                theme: "adjectives" },
  { id: "v209", es: "rico",            en: "rich / delicious",     theme: "adjectives" },
  { id: "v210", es: "importante",      en: "important",            theme: "adjectives" },
  { id: "v211", es: "interesante",     en: "interesting",          theme: "adjectives" },
  { id: "v212", es: "diferente",       en: "different",            theme: "adjectives" },
  { id: "v213", es: "mismo",           en: "same",                 theme: "adjectives" },
  { id: "v214", es: "seguro",          en: "safe / sure",          theme: "adjectives" },

  // place words & prepositions
  { id: "v215", es: "aquí",            en: "here",                 theme: "place words" },
  { id: "v216", es: "allí",            en: "there",                theme: "place words" },
  { id: "v217", es: "cerca",           en: "near / close",         theme: "place words" },
  { id: "v218", es: "lejos",           en: "far",                  theme: "place words" },
  { id: "v219", es: "arriba",          en: "above / upstairs",     theme: "place words" },
  { id: "v220", es: "abajo",           en: "below / downstairs",   theme: "place words" },
  { id: "v221", es: "dentro",          en: "inside",               theme: "place words" },
  { id: "v222", es: "fuera",           en: "outside",              theme: "place words" },
  { id: "v223", es: "delante",         en: "in front",             theme: "place words" },
  { id: "v224", es: "detrás",          en: "behind",               theme: "place words" },
  { id: "v225", es: "entre",           en: "between / among",      theme: "place words" },

  // basics & question words
  { id: "v226", es: "sí",              en: "yes",                  theme: "basics" },
  { id: "v227", es: "no",              en: "no",                   theme: "basics" },
  { id: "v228", es: "por favor",       en: "please",               theme: "basics" },
  { id: "v229", es: "gracias",         en: "thank you",            theme: "basics" },
  { id: "v230", es: "perdón",          en: "sorry / excuse me",    theme: "basics" },
  { id: "v231", es: "de nada",         en: "you're welcome",       theme: "basics" },
  { id: "v232", es: "el número",       en: "number",               theme: "basics" },
  { id: "v233", es: "la pregunta",     en: "question",             theme: "basics" },
  { id: "v234", es: "la respuesta",    en: "answer",               theme: "basics" },
  { id: "v235", es: "¿cómo?",          en: "how?",                 theme: "basics" },
  { id: "v236", es: "¿dónde?",         en: "where?",               theme: "basics" },
  { id: "v237", es: "¿cuándo?",        en: "when?",                theme: "basics" },
  { id: "v238", es: "¿qué?",           en: "what?",                theme: "basics" },
  { id: "v239", es: "¿quién?",         en: "who?",                 theme: "basics" },
  { id: "v240", es: "¿cuánto?",        en: "how much?",            theme: "basics" },
  { id: "v241", es: "¿por qué?",       en: "why?",                 theme: "basics" },

  // daily life
  { id: "v242", es: "el dinero",       en: "money",                theme: "daily" },
  { id: "v243", es: "el precio",       en: "price",                theme: "daily" },
  { id: "v244", es: "la cuenta",       en: "bill / account",       theme: "daily" },
  { id: "v245", es: "el tiempo",       en: "time / weather",       theme: "daily" },
  { id: "v246", es: "el problema",     en: "problem",              theme: "daily" },
  { id: "v247", es: "la idea",         en: "idea",                 theme: "daily" },
  { id: "v248", es: "la vez",          en: "time / occasion",      theme: "daily" },
  { id: "v249", es: "el camino",       en: "road / way / path",    theme: "daily" },
  { id: "v250", es: "la vida",         en: "life",                 theme: "daily" },
  { id: "v251", es: "el mundo",        en: "world",                theme: "daily" },
  { id: "v252", es: "la gente",        en: "people",               theme: "daily" },
  { id: "v253", es: "la cosa",         en: "thing",                theme: "daily" },
  { id: "v254", es: "el lugar",        en: "place",                theme: "daily" },
  { id: "v255", es: "la parte",        en: "part",                 theme: "daily" },
];

// ─── VERB HELPERS ─────────────────────────────────────────────────────────────
// Compute regular conjugation tables from the infinitive.
// Irregular forms are overridden per verb entry below.

function ar(inf) {
  const s = inf.slice(0, -2);
  return {
    present:   { yo: s+"o",   tú: s+"as",   él: s+"a",   nosotros: s+"amos",   vosotros: s+"áis",    ellos: s+"an" },
    preterite: { yo: s+"é",   tú: s+"aste", él: s+"ó",   nosotros: s+"amos",   vosotros: s+"asteis", ellos: s+"aron" },
    future:    { yo: inf+"é", tú: inf+"ás", él: inf+"á", nosotros: inf+"emos", vosotros: inf+"éis",  ellos: inf+"án" },
  };
}
function er(inf) {
  const s = inf.slice(0, -2);
  return {
    present:   { yo: s+"o",   tú: s+"es",   él: s+"e",   nosotros: s+"emos",   vosotros: s+"éis",    ellos: s+"en" },
    preterite: { yo: s+"í",   tú: s+"iste", él: s+"ió",  nosotros: s+"imos",   vosotros: s+"isteis", ellos: s+"ieron" },
    future:    { yo: inf+"é", tú: inf+"ás", él: inf+"á", nosotros: inf+"emos", vosotros: inf+"éis",  ellos: inf+"án" },
  };
}
function ir(inf) {
  const s = inf.slice(0, -2);
  return {
    present:   { yo: s+"o",   tú: s+"es",   él: s+"e",   nosotros: s+"imos",   vosotros: s+"ís",     ellos: s+"en" },
    preterite: { yo: s+"í",   tú: s+"iste", él: s+"ió",  nosotros: s+"imos",   vosotros: s+"isteis", ellos: s+"ieron" },
    future:    { yo: inf+"é", tú: inf+"ás", él: inf+"á", nosotros: inf+"emos", vosotros: inf+"éis",  ellos: inf+"án" },
  };
}

// ─── VERBS ────────────────────────────────────────────────────────────────────
// 100 most common Spanish verbs with present, preterite, and future conjugations.

export const VERBS = [
  // 1 ─ ser
  { id: "ser", infinitive: "ser", en: "to be (permanent)",
    present:   { yo: "soy",    tú: "eres",     él: "es",      nosotros: "somos",    vosotros: "sois",      ellos: "son" },
    preterite: { yo: "fui",    tú: "fuiste",   él: "fue",     nosotros: "fuimos",   vosotros: "fuisteis",  ellos: "fueron" },
    future:    { yo: "seré",   tú: "serás",    él: "será",    nosotros: "seremos",  vosotros: "seréis",    ellos: "serán" },
  },
  // 2 ─ estar
  { id: "estar", infinitive: "estar", en: "to be (temporary)",
    present:   { yo: "estoy",   tú: "estás",    él: "está",    nosotros: "estamos",   vosotros: "estáis",    ellos: "están" },
    preterite: { yo: "estuve",  tú: "estuviste",él: "estuvo",  nosotros: "estuvimos", vosotros: "estuvisteis",ellos: "estuvieron" },
    future:    { yo: "estaré",  tú: "estarás",  él: "estará",  nosotros: "estaremos", vosotros: "estaréis",  ellos: "estarán" },
  },
  // 3 ─ tener
  { id: "tener", infinitive: "tener", en: "to have",
    present:   { yo: "tengo",   tú: "tienes",   él: "tiene",   nosotros: "tenemos",   vosotros: "tenéis",    ellos: "tienen" },
    preterite: { yo: "tuve",    tú: "tuviste",  él: "tuvo",    nosotros: "tuvimos",   vosotros: "tuvisteis", ellos: "tuvieron" },
    future:    { yo: "tendré",  tú: "tendrás",  él: "tendrá",  nosotros: "tendremos", vosotros: "tendréis",  ellos: "tendrán" },
  },
  // 4 ─ hacer
  { id: "hacer", infinitive: "hacer", en: "to do / make",
    present:   { yo: "hago",    tú: "haces",    él: "hace",    nosotros: "hacemos",   vosotros: "hacéis",    ellos: "hacen" },
    preterite: { yo: "hice",    tú: "hiciste",  él: "hizo",    nosotros: "hicimos",   vosotros: "hicisteis", ellos: "hicieron" },
    future:    { yo: "haré",    tú: "harás",    él: "hará",    nosotros: "haremos",   vosotros: "haréis",    ellos: "harán" },
  },
  // 5 ─ ir
  { id: "ir", infinitive: "ir", en: "to go",
    present:   { yo: "voy",     tú: "vas",      él: "va",      nosotros: "vamos",     vosotros: "vais",      ellos: "van" },
    preterite: { yo: "fui",     tú: "fuiste",   él: "fue",     nosotros: "fuimos",    vosotros: "fuisteis",  ellos: "fueron" },
    future:    { yo: "iré",     tú: "irás",     él: "irá",     nosotros: "iremos",    vosotros: "iréis",     ellos: "irán" },
  },
  // 6 ─ poder
  { id: "poder", infinitive: "poder", en: "to be able to / can",
    present:   { yo: "puedo",   tú: "puedes",   él: "puede",   nosotros: "podemos",   vosotros: "podéis",    ellos: "pueden" },
    preterite: { yo: "pude",    tú: "pudiste",  él: "pudo",    nosotros: "pudimos",   vosotros: "pudisteis", ellos: "pudieron" },
    future:    { yo: "podré",   tú: "podrás",   él: "podrá",   nosotros: "podremos",  vosotros: "podréis",   ellos: "podrán" },
  },
  // 7 ─ decir
  { id: "decir", infinitive: "decir", en: "to say / tell",
    present:   { yo: "digo",    tú: "dices",    él: "dice",    nosotros: "decimos",   vosotros: "decís",     ellos: "dicen" },
    preterite: { yo: "dije",    tú: "dijiste",  él: "dijo",    nosotros: "dijimos",   vosotros: "dijisteis", ellos: "dijeron" },
    future:    { yo: "diré",    tú: "dirás",    él: "dirá",    nosotros: "diremos",   vosotros: "diréis",    ellos: "dirán" },
  },
  // 8 ─ dar
  { id: "dar", infinitive: "dar", en: "to give",
    present:   { yo: "doy",     tú: "das",      él: "da",      nosotros: "damos",     vosotros: "dais",      ellos: "dan" },
    preterite: { yo: "di",      tú: "diste",    él: "dio",     nosotros: "dimos",     vosotros: "disteis",   ellos: "dieron" },
    future:    { yo: "daré",    tú: "darás",    él: "dará",    nosotros: "daremos",   vosotros: "daréis",    ellos: "darán" },
  },
  // 9 ─ ver
  { id: "ver", infinitive: "ver", en: "to see",
    present:   { yo: "veo",     tú: "ves",      él: "ve",      nosotros: "vemos",     vosotros: "veis",      ellos: "ven" },
    preterite: { yo: "vi",      tú: "viste",    él: "vio",     nosotros: "vimos",     vosotros: "visteis",   ellos: "vieron" },
    future:    { yo: "veré",    tú: "verás",    él: "verá",    nosotros: "veremos",   vosotros: "veréis",    ellos: "verán" },
  },
  // 10 ─ saber
  { id: "saber", infinitive: "saber", en: "to know (a fact)",
    present:   { yo: "sé",      tú: "sabes",    él: "sabe",    nosotros: "sabemos",   vosotros: "sabéis",    ellos: "saben" },
    preterite: { yo: "supe",    tú: "supiste",  él: "supo",    nosotros: "supimos",   vosotros: "supisteis", ellos: "supieron" },
    future:    { yo: "sabré",   tú: "sabrás",   él: "sabrá",   nosotros: "sabremos",  vosotros: "sabréis",   ellos: "sabrán" },
  },
  // 11 ─ querer
  { id: "querer", infinitive: "querer", en: "to want / love",
    present:   { yo: "quiero",  tú: "quieres",  él: "quiere",  nosotros: "queremos",  vosotros: "queréis",   ellos: "quieren" },
    preterite: { yo: "quise",   tú: "quisiste", él: "quiso",   nosotros: "quisimos",  vosotros: "quisisteis",ellos: "quisieron" },
    future:    { yo: "querré",  tú: "querrás",  él: "querrá",  nosotros: "querremos", vosotros: "querréis",  ellos: "querrán" },
  },
  // 12 ─ venir
  { id: "venir", infinitive: "venir", en: "to come",
    present:   { yo: "vengo",   tú: "vienes",   él: "viene",   nosotros: "venimos",   vosotros: "venís",     ellos: "vienen" },
    preterite: { yo: "vine",    tú: "viniste",  él: "vino",    nosotros: "vinimos",   vosotros: "vinisteis", ellos: "vinieron" },
    future:    { yo: "vendré",  tú: "vendrás",  él: "vendrá",  nosotros: "vendremos", vosotros: "vendréis",  ellos: "vendrán" },
  },
  // 13 ─ poner
  { id: "poner", infinitive: "poner", en: "to put / place",
    present:   { yo: "pongo",   tú: "pones",    él: "pone",    nosotros: "ponemos",   vosotros: "ponéis",    ellos: "ponen" },
    preterite: { yo: "puse",    tú: "pusiste",  él: "puso",    nosotros: "pusimos",   vosotros: "pusisteis", ellos: "pusieron" },
    future:    { yo: "pondré",  tú: "pondrás",  él: "pondrá",  nosotros: "pondremos", vosotros: "pondréis",  ellos: "pondrán" },
  },
  // 14 ─ salir
  { id: "salir", infinitive: "salir", en: "to leave / go out",
    present:   { yo: "salgo",   tú: "sales",    él: "sale",    nosotros: "salimos",   vosotros: "salís",     ellos: "salen" },
    preterite: { yo: "salí",    tú: "saliste",  él: "salió",   nosotros: "salimos",   vosotros: "salisteis", ellos: "salieron" },
    future:    { yo: "saldré",  tú: "saldrás",  él: "saldrá",  nosotros: "saldremos", vosotros: "saldréis",  ellos: "saldrán" },
  },
  // 15 ─ traer
  { id: "traer", infinitive: "traer", en: "to bring",
    present:   { yo: "traigo",  tú: "traes",    él: "trae",    nosotros: "traemos",   vosotros: "traéis",    ellos: "traen" },
    preterite: { yo: "traje",   tú: "trajiste", él: "trajo",   nosotros: "trajimos",  vosotros: "trajisteis",ellos: "trajeron" },
    future:    { yo: "traeré",  tú: "traerás",  él: "traerá",  nosotros: "traeremos", vosotros: "traeréis",  ellos: "traerán" },
  },
  // 16 ─ caer
  { id: "caer", infinitive: "caer", en: "to fall",
    present:   { yo: "caigo",   tú: "caes",     él: "cae",     nosotros: "caemos",    vosotros: "caéis",     ellos: "caen" },
    preterite: { yo: "caí",     tú: "caíste",   él: "cayó",    nosotros: "caímos",    vosotros: "caísteis",  ellos: "cayeron" },
    future:    { yo: "caeré",   tú: "caerás",   él: "caerá",   nosotros: "caeremos",  vosotros: "caeréis",   ellos: "caerán" },
  },
  // 17 ─ oír
  { id: "oír", infinitive: "oír", en: "to hear",
    present:   { yo: "oigo",    tú: "oyes",     él: "oye",     nosotros: "oímos",     vosotros: "oís",       ellos: "oyen" },
    preterite: { yo: "oí",      tú: "oíste",    él: "oyó",     nosotros: "oímos",     vosotros: "oísteis",   ellos: "oyeron" },
    future:    { yo: "oiré",    tú: "oirás",    él: "oirá",    nosotros: "oiremos",   vosotros: "oiréis",    ellos: "oirán" },
  },
  // 18 ─ conocer
  { id: "conocer", infinitive: "conocer", en: "to know (a person/place)",
    present:   { yo: "conozco", tú: "conoces",  él: "conoce",  nosotros: "conocemos", vosotros: "conocéis",  ellos: "conocen" },
    preterite: { yo: "conocí",  tú: "conociste",él: "conoció", nosotros: "conocimos", vosotros: "conocisteis",ellos: "conocieron" },
    future:    { yo: "conoceré",tú: "conocerás",él: "conocerá",nosotros: "conoceremos",vosotros: "conoceréis",ellos: "conocerán" },
  },
  // 19 ─ parecer
  { id: "parecer", infinitive: "parecer", en: "to seem / appear",
    present:   { yo: "parezco", tú: "pareces",  él: "parece",  nosotros: "parecemos", vosotros: "parecéis",  ellos: "parecen" },
    preterite: { yo: "parecí",  tú: "pareciste",él: "pareció", nosotros: "parecimos", vosotros: "parecisteis",ellos: "parecieron" },
    future:    { yo: "pareceré",tú: "parecerás",él: "parecerá",nosotros: "pareceremos",vosotros: "pareceréis",ellos: "parecerán" },
  },
  // 20 ─ aparecer
  { id: "aparecer", infinitive: "aparecer", en: "to appear / show up",
    present:   { yo: "aparezco",tú: "apareces", él: "aparece", nosotros: "aparecemos",vosotros: "aparecéis", ellos: "aparecen" },
    preterite: { yo: "aparecí", tú: "apareciste",él: "apareció",nosotros: "aparecimos",vosotros: "aparecisteis",ellos: "aparecieron" },
    future:    { yo: "apareceré",tú: "aparecerás",él: "aparecerá",nosotros: "apareceremos",vosotros: "apareceréis",ellos: "aparecerán" },
  },
  // 21 ─ nacer
  { id: "nacer", infinitive: "nacer", en: "to be born",
    present:   { yo: "nazco",   tú: "naces",    él: "nace",    nosotros: "nacemos",   vosotros: "nacéis",    ellos: "nacen" },
    preterite: { yo: "nací",    tú: "naciste",  él: "nació",   nosotros: "nacimos",   vosotros: "nacisteis", ellos: "nacieron" },
    future:    { yo: "naceré",  tú: "nacerás",  él: "nacerá",  nosotros: "naceremos", vosotros: "naceréis",  ellos: "nacerán" },
  },
  // 22 ─ crecer
  { id: "crecer", infinitive: "crecer", en: "to grow",
    present:   { yo: "crezco",  tú: "creces",   él: "crece",   nosotros: "crecemos",  vosotros: "crecéis",   ellos: "crecen" },
    preterite: { yo: "crecí",   tú: "creciste", él: "creció",  nosotros: "crecimos",  vosotros: "crecisteis",ellos: "crecieron" },
    future:    { yo: "creceré", tú: "crecerás", él: "crecerá", nosotros: "creceremos",vosotros: "creceréis", ellos: "crecerán" },
  },
  // 23 ─ producir
  { id: "producir", infinitive: "producir", en: "to produce",
    present:   { yo: "produzco",tú: "produces", él: "produce", nosotros: "producimos",vosotros: "producís",  ellos: "producen" },
    preterite: { yo: "produje", tú: "produjiste",él: "produjo",nosotros: "produjimos",vosotros: "produjisteis",ellos: "produjeron" },
    future:    { yo: "produciré",tú: "producirás",él: "producirá",nosotros: "produciremos",vosotros: "produciréis",ellos: "producirán" },
  },
  // 24 ─ conducir
  { id: "conducir", infinitive: "conducir", en: "to drive",
    present:   { yo: "conduzco",tú: "conduces", él: "conduce", nosotros: "conducimos",vosotros: "conducís",  ellos: "conducen" },
    preterite: { yo: "conduje", tú: "condujiste",él: "condujo",nosotros: "condujimos",vosotros: "condujisteis",ellos: "condujeron" },
    future:    { yo: "conduciré",tú: "conducirás",él: "conducirá",nosotros: "conduciremos",vosotros: "conduciréis",ellos: "conducirán" },
  },
  // 25 ─ suponer
  { id: "suponer", infinitive: "suponer", en: "to suppose / assume",
    present:   { yo: "supongo", tú: "supones",  él: "supone",  nosotros: "suponemos", vosotros: "suponéis",  ellos: "suponen" },
    preterite: { yo: "supuse",  tú: "supusiste",él: "supuso",  nosotros: "supusimos", vosotros: "supusisteis",ellos: "supusieron" },
    future:    { yo: "supondré",tú: "supondrás",él: "supondrá",nosotros: "supondremos",vosotros: "supondréis",ellos: "supondrán" },
  },
  // 26 ─ mantener
  { id: "mantener", infinitive: "mantener", en: "to maintain / keep",
    present:   { yo: "mantengo",tú: "mantienes",él: "mantiene",nosotros: "mantenemos",vosotros: "mantenéis", ellos: "mantienen" },
    preterite: { yo: "mantuve", tú: "mantuviste",él: "mantuvo",nosotros: "mantuvimos",vosotros: "mantuvisteis",ellos: "mantuvieron" },
    future:    { yo: "mantendré",tú: "mantendrás",él: "mantendrá",nosotros: "mantendremos",vosotros: "mantendréis",ellos: "mantendrán" },
  },
  // 27 ─ creer
  { id: "creer", infinitive: "creer", en: "to believe / think",
    present:   { yo: "creo",    tú: "crees",    él: "cree",    nosotros: "creemos",   vosotros: "creéis",    ellos: "creen" },
    preterite: { yo: "creí",    tú: "creíste",  él: "creyó",   nosotros: "creímos",   vosotros: "creísteis", ellos: "creyeron" },
    future:    { yo: "creeré",  tú: "creerás",  él: "creerá",  nosotros: "creeremos", vosotros: "creeréis",  ellos: "creerán" },
  },
  // 28 ─ leer
  { id: "leer", infinitive: "leer", en: "to read",
    present:   { yo: "leo",     tú: "lees",     él: "lee",     nosotros: "leemos",    vosotros: "leéis",     ellos: "leen" },
    preterite: { yo: "leí",     tú: "leíste",   él: "leyó",    nosotros: "leímos",    vosotros: "leísteis",  ellos: "leyeron" },
    future:    { yo: "leeré",   tú: "leerás",   él: "leerá",   nosotros: "leeremos",  vosotros: "leeréis",   ellos: "leerán" },
  },
  // 29 ─ elegir
  { id: "elegir", infinitive: "elegir", en: "to choose",
    present:   { yo: "elijo",   tú: "eliges",   él: "elige",   nosotros: "elegimos",  vosotros: "elegís",    ellos: "eligen" },
    preterite: { yo: "elegí",   tú: "elegiste", él: "eligió",  nosotros: "elegimos",  vosotros: "elegisteis",ellos: "eligieron" },
    future:    { yo: "elegiré", tú: "elegirás", él: "elegirá", nosotros: "elegiremos",vosotros: "elegiréis", ellos: "elegirán" },
  },
  // 30 ─ proteger
  { id: "proteger", infinitive: "proteger", en: "to protect",
    present:   { yo: "protejo", tú: "proteges", él: "protege", nosotros: "protegemos",vosotros: "protegéis", ellos: "protegen" },
    preterite: { yo: "protegí", tú: "protegiste",él: "protegió",nosotros: "protegimos",vosotros: "protegisteis",ellos: "protegieron" },
    future:    { yo: "protegeré",tú: "protegerás",él: "protegerá",nosotros: "protegeremos",vosotros: "protegeréis",ellos: "protegerán" },
  },
  // 31 ─ seguir
  { id: "seguir", infinitive: "seguir", en: "to follow / continue",
    present:   { yo: "sigo",    tú: "sigues",   él: "sigue",   nosotros: "seguimos",  vosotros: "seguís",    ellos: "siguen" },
    preterite: { yo: "seguí",   tú: "seguiste", él: "siguió",  nosotros: "seguimos",  vosotros: "seguisteis",ellos: "siguieron" },
    future:    { yo: "seguiré", tú: "seguirás", él: "seguirá", nosotros: "seguiremos",vosotros: "seguiréis", ellos: "seguirán" },
  },
  // 32 ─ conseguir
  { id: "conseguir", infinitive: "conseguir", en: "to get / achieve",
    present:   { yo: "consigo", tú: "consigues",él: "consigue",nosotros: "conseguimos",vosotros: "conseguís",ellos: "consiguen" },
    preterite: { yo: "conseguí",tú: "conseguiste",él: "consiguió",nosotros: "conseguimos",vosotros: "conseguisteis",ellos: "consiguieron" },
    future:    { yo: "conseguiré",tú: "conseguirás",él: "conseguirá",nosotros: "conseguiremos",vosotros: "conseguiréis",ellos: "conseguirán" },
  },
  // 33 ─ sentir
  { id: "sentir", infinitive: "sentir", en: "to feel / be sorry",
    present:   { yo: "siento",  tú: "sientes",  él: "siente",  nosotros: "sentimos",  vosotros: "sentís",    ellos: "sienten" },
    preterite: { yo: "sentí",   tú: "sentiste", él: "sintió",  nosotros: "sentimos",  vosotros: "sentisteis",ellos: "sintieron" },
    future:    { yo: "sentiré", tú: "sentirás", él: "sentirá", nosotros: "sentiremos",vosotros: "sentiréis", ellos: "sentirán" },
  },
  // 34 ─ preferir
  { id: "preferir", infinitive: "preferir", en: "to prefer",
    present:   { yo: "prefiero",tú: "prefieres",él: "prefiere",nosotros: "preferimos",vosotros: "preferís",  ellos: "prefieren" },
    preterite: { yo: "preferí", tú: "preferiste",él: "prefirió",nosotros: "preferimos",vosotros: "preferisteis",ellos: "prefirieron" },
    future:    { yo: "preferiré",tú: "preferirás",él: "preferirá",nosotros: "preferiremos",vosotros: "preferiréis",ellos: "preferirán" },
  },
  // 35 ─ repetir
  { id: "repetir", infinitive: "repetir", en: "to repeat",
    present:   { yo: "repito",  tú: "repites",  él: "repite",  nosotros: "repetimos", vosotros: "repetís",   ellos: "repiten" },
    preterite: { yo: "repetí",  tú: "repetiste",él: "repitió", nosotros: "repetimos", vosotros: "repetisteis",ellos: "repitieron" },
    future:    { yo: "repetiré",tú: "repetirás",él: "repetirá",nosotros: "repetiremos",vosotros: "repetiréis",ellos: "repetirán" },
  },
  // 36 ─ pedir
  { id: "pedir", infinitive: "pedir", en: "to ask for / order",
    present:   { yo: "pido",    tú: "pides",    él: "pide",    nosotros: "pedimos",   vosotros: "pedís",     ellos: "piden" },
    preterite: { yo: "pedí",    tú: "pediste",  él: "pidió",   nosotros: "pedimos",   vosotros: "pedisteis", ellos: "pidieron" },
    future:    { yo: "pediré",  tú: "pedirás",  él: "pedirá",  nosotros: "pediremos", vosotros: "pediréis",  ellos: "pedirán" },
  },
  // 37 ─ servir
  { id: "servir", infinitive: "servir", en: "to serve",
    present:   { yo: "sirvo",   tú: "sirves",   él: "sirve",   nosotros: "servimos",  vosotros: "servís",    ellos: "sirven" },
    preterite: { yo: "serví",   tú: "serviste", él: "sirvió",  nosotros: "servimos",  vosotros: "servisteis",ellos: "sirvieron" },
    future:    { yo: "serviré", tú: "servirás", él: "servirá", nosotros: "serviremos",vosotros: "serviréis", ellos: "servirán" },
  },
  // 38 ─ dormir
  { id: "dormir", infinitive: "dormir", en: "to sleep",
    present:   { yo: "duermo",  tú: "duermes",  él: "duerme",  nosotros: "dormimos",  vosotros: "dormís",    ellos: "duermen" },
    preterite: { yo: "dormí",   tú: "dormiste", él: "durmió",  nosotros: "dormimos",  vosotros: "dormisteis",ellos: "durmieron" },
    future:    { yo: "dormiré", tú: "dormirás", él: "dormirá", nosotros: "dormiremos",vosotros: "dormiréis", ellos: "dormirán" },
  },
  // 39 ─ morir
  { id: "morir", infinitive: "morir", en: "to die",
    present:   { yo: "muero",   tú: "mueres",   él: "muere",   nosotros: "morimos",   vosotros: "morís",     ellos: "mueren" },
    preterite: { yo: "morí",    tú: "moriste",  él: "murió",   nosotros: "morimos",   vosotros: "moristeis", ellos: "murieron" },
    future:    { yo: "moriré",  tú: "morirás",  él: "morirá",  nosotros: "moriremos", vosotros: "moriréis",  ellos: "morirán" },
  },
  // 40 ─ volver
  { id: "volver", infinitive: "volver", en: "to return / come back",
    present:   { yo: "vuelvo",  tú: "vuelves",  él: "vuelve",  nosotros: "volvemos",  vosotros: "volvéis",   ellos: "vuelven" },
    preterite: { yo: "volví",   tú: "volviste", él: "volvió",  nosotros: "volvimos",  vosotros: "volvisteis",ellos: "volvieron" },
    future:    { yo: "volveré", tú: "volverás", él: "volverá", nosotros: "volveremos",vosotros: "volveréis", ellos: "volverán" },
  },
  // 41 ─ resolver
  { id: "resolver", infinitive: "resolver", en: "to solve / resolve",
    present:   { yo: "resuelvo",tú: "resuelves",él: "resuelve",nosotros: "resolvemos",vosotros: "resolvéis", ellos: "resuelven" },
    preterite: { yo: "resolví", tú: "resolviste",él: "resolvió",nosotros: "resolvimos",vosotros: "resolvisteis",ellos: "resolvieron" },
    future:    { yo: "resolveré",tú: "resolverás",él: "resolverá",nosotros: "resolveremos",vosotros: "resolveréis",ellos: "resolverán" },
  },
  // 42 ─ encontrar
  { id: "encontrar", infinitive: "encontrar", en: "to find / meet",
    present:   { yo: "encuentro",tú: "encuentras",él: "encuentra",nosotros: "encontramos",vosotros: "encontráis",ellos: "encuentran" },
    preterite: { yo: "encontré",tú: "encontraste",él: "encontró",nosotros: "encontramos",vosotros: "encontrasteis",ellos: "encontraron" },
    future:    { yo: "encontraré",tú: "encontrarás",él: "encontrará",nosotros: "encontraremos",vosotros: "encontraréis",ellos: "encontrarán" },
  },
  // 43 ─ recordar
  { id: "recordar", infinitive: "recordar", en: "to remember",
    present:   { yo: "recuerdo",tú: "recuerdas",él: "recuerda",nosotros: "recordamos",vosotros: "recordáis", ellos: "recuerdan" },
    preterite: { yo: "recordé", tú: "recordaste",él: "recordó",nosotros: "recordamos",vosotros: "recordasteis",ellos: "recordaron" },
    future:    { yo: "recordaré",tú: "recordarás",él: "recordará",nosotros: "recordaremos",vosotros: "recordaréis",ellos: "recordarán" },
  },
  // 44 ─ contar
  { id: "contar", infinitive: "contar", en: "to count / tell",
    present:   { yo: "cuento",  tú: "cuentas",  él: "cuenta",  nosotros: "contamos",  vosotros: "contáis",   ellos: "cuentan" },
    preterite: { yo: "conté",   tú: "contaste", él: "contó",   nosotros: "contamos",  vosotros: "contasteis",ellos: "contaron" },
    future:    { yo: "contaré", tú: "contarás", él: "contará", nosotros: "contaremos",vosotros: "contaréis", ellos: "contarán" },
  },
  // 45 ─ empezar
  { id: "empezar", infinitive: "empezar", en: "to begin / start",
    present:   { yo: "empiezo", tú: "empiezas", él: "empieza", nosotros: "empezamos", vosotros: "empezáis",  ellos: "empiezan" },
    preterite: { yo: "empecé",  tú: "empezaste",él: "empezó",  nosotros: "empezamos", vosotros: "empezasteis",ellos: "empezaron" },
    future:    { yo: "empezaré",tú: "empezarás",él: "empezará",nosotros: "empezaremos",vosotros: "empezaréis",ellos: "empezarán" },
  },
  // 46 ─ pensar
  { id: "pensar", infinitive: "pensar", en: "to think",
    present:   { yo: "pienso",  tú: "piensas",  él: "piensa",  nosotros: "pensamos",  vosotros: "pensáis",   ellos: "piensan" },
    preterite: { yo: "pensé",   tú: "pensaste", él: "pensó",   nosotros: "pensamos",  vosotros: "pensasteis",ellos: "pensaron" },
    future:    { yo: "pensaré", tú: "pensarás", él: "pensará", nosotros: "pensaremos",vosotros: "pensaréis", ellos: "pensarán" },
  },
  // 47 ─ cerrar
  { id: "cerrar", infinitive: "cerrar", en: "to close / shut",
    present:   { yo: "cierro",  tú: "cierras",  él: "cierra",  nosotros: "cerramos",  vosotros: "cerráis",   ellos: "cierran" },
    preterite: { yo: "cerré",   tú: "cerraste", él: "cerró",   nosotros: "cerramos",  vosotros: "cerrasteis",ellos: "cerraron" },
    future:    { yo: "cerraré", tú: "cerrarás", él: "cerrará", nosotros: "cerraremos",vosotros: "cerraréis", ellos: "cerrarán" },
  },
  // 48 ─ perder
  { id: "perder", infinitive: "perder", en: "to lose / miss",
    present:   { yo: "pierdo",  tú: "pierdes",  él: "pierde",  nosotros: "perdemos",  vosotros: "perdéis",   ellos: "pierden" },
    preterite: { yo: "perdí",   tú: "perdiste", él: "perdió",  nosotros: "perdimos",  vosotros: "perdisteis",ellos: "perdieron" },
    future:    { yo: "perderé", tú: "perderás", él: "perderá", nosotros: "perderemos",vosotros: "perderéis", ellos: "perderán" },
  },
  // 49 ─ entender
  { id: "entender", infinitive: "entender", en: "to understand",
    present:   { yo: "entiendo",tú: "entiendes",él: "entiende",nosotros: "entendemos",vosotros: "entendéis", ellos: "entienden" },
    preterite: { yo: "entendí", tú: "entendiste",él: "entendió",nosotros: "entendimos",vosotros: "entendisteis",ellos: "entendieron" },
    future:    { yo: "entenderé",tú: "entenderás",él: "entenderá",nosotros: "entenderemos",vosotros: "entenderéis",ellos: "entenderán" },
  },
  // 50 ─ jugar
  { id: "jugar", infinitive: "jugar", en: "to play",
    present:   { yo: "juego",   tú: "juegas",   él: "juega",   nosotros: "jugamos",   vosotros: "jugáis",    ellos: "juegan" },
    preterite: { yo: "jugué",   tú: "jugaste",  él: "jugó",    nosotros: "jugamos",   vosotros: "jugasteis", ellos: "jugaron" },
    future:    { yo: "jugaré",  tú: "jugarás",  él: "jugará",  nosotros: "jugaremos", vosotros: "jugaréis",  ellos: "jugarán" },
  },
  // 51 ─ llegar
  { id: "llegar", infinitive: "llegar", en: "to arrive",
    present:   { yo: "llego",   tú: "llegas",   él: "llega",   nosotros: "llegamos",  vosotros: "llegáis",   ellos: "llegan" },
    preterite: { yo: "llegué",  tú: "llegaste", él: "llegó",   nosotros: "llegamos",  vosotros: "llegasteis",ellos: "llegaron" },
    future:    { yo: "llegaré", tú: "llegarás", él: "llegará", nosotros: "llegaremos",vosotros: "llegaréis", ellos: "llegarán" },
  },
  // 52 ─ buscar
  { id: "buscar", infinitive: "buscar", en: "to look for / search",
    present:   { yo: "busco",   tú: "buscas",   él: "busca",   nosotros: "buscamos",  vosotros: "buscáis",   ellos: "buscan" },
    preterite: { yo: "busqué",  tú: "buscaste", él: "buscó",   nosotros: "buscamos",  vosotros: "buscasteis",ellos: "buscaron" },
    future:    { yo: "buscaré", tú: "buscarás", él: "buscará", nosotros: "buscaremos",vosotros: "buscaréis", ellos: "buscarán" },
  },
  // 53 ─ sacar
  { id: "sacar", infinitive: "sacar", en: "to take out / get",
    present:   { yo: "saco",    tú: "sacas",    él: "saca",    nosotros: "sacamos",   vosotros: "sacáis",    ellos: "sacan" },
    preterite: { yo: "saqué",   tú: "sacaste",  él: "sacó",    nosotros: "sacamos",   vosotros: "sacasteis", ellos: "sacaron" },
    future:    { yo: "sacaré",  tú: "sacarás",  él: "sacará",  nosotros: "sacaremos", vosotros: "sacaréis",  ellos: "sacarán" },
  },
  // 54 ─ pagar
  { id: "pagar", infinitive: "pagar", en: "to pay",
    present:   { yo: "pago",    tú: "pagas",    él: "paga",    nosotros: "pagamos",   vosotros: "pagáis",    ellos: "pagan" },
    preterite: { yo: "pagué",   tú: "pagaste",  él: "pagó",    nosotros: "pagamos",   vosotros: "pagasteis", ellos: "pagaron" },
    future:    { yo: "pagaré",  tú: "pagarás",  él: "pagará",  nosotros: "pagaremos", vosotros: "pagaréis",  ellos: "pagarán" },
  },
  // 55 ─ hablar  (regular -ar)
  { id: "hablar", infinitive: "hablar", en: "to speak / talk", ...ar("hablar") },
  // 56 ─ pasar   (regular -ar)
  { id: "pasar",  infinitive: "pasar",  en: "to pass / happen", ...ar("pasar") },
  // 57 ─ llevar  (regular -ar)
  { id: "llevar", infinitive: "llevar", en: "to carry / wear", ...ar("llevar") },
  // 58 ─ dejar   (regular -ar)
  { id: "dejar",  infinitive: "dejar",  en: "to leave / let", ...ar("dejar") },
  // 59 ─ llamar  (regular -ar)
  { id: "llamar", infinitive: "llamar", en: "to call / name", ...ar("llamar") },
  // 60 ─ tratar  (regular -ar)
  { id: "tratar", infinitive: "tratar", en: "to try / treat", ...ar("tratar") },
  // 61 ─ mirar   (regular -ar)
  { id: "mirar",  infinitive: "mirar",  en: "to look / watch", ...ar("mirar") },
  // 62 ─ esperar (regular -ar)
  { id: "esperar",infinitive: "esperar",en: "to wait / hope", ...ar("esperar") },
  // 63 ─ entrar  (regular -ar)
  { id: "entrar", infinitive: "entrar", en: "to enter / come in", ...ar("entrar") },
  // 64 ─ trabajar (regular -ar)
  { id: "trabajar",infinitive: "trabajar",en: "to work", ...ar("trabajar") },
  // 65 ─ cambiar (regular -ar)
  { id: "cambiar",infinitive: "cambiar",en: "to change", ...ar("cambiar") },
  // 66 ─ ganar   (regular -ar)
  { id: "ganar",  infinitive: "ganar",  en: "to win / earn", ...ar("ganar") },
  // 67 ─ comprar (regular -ar)
  { id: "comprar",infinitive: "comprar",en: "to buy", ...ar("comprar") },
  // 68 ─ escuchar (regular -ar)
  { id: "escuchar",infinitive: "escuchar",en: "to listen", ...ar("escuchar") },
  // 69 ─ ayudar  (regular -ar)
  { id: "ayudar", infinitive: "ayudar", en: "to help", ...ar("ayudar") },
  // 70 ─ enseñar (regular -ar)
  { id: "enseñar",infinitive: "enseñar",en: "to teach / show", ...ar("enseñar") },
  // 71 ─ preguntar (regular -ar)
  { id: "preguntar",infinitive: "preguntar",en: "to ask (a question)", ...ar("preguntar") },
  // 72 ─ contestar (regular -ar)
  { id: "contestar",infinitive: "contestar",en: "to answer / reply", ...ar("contestar") },
  // 73 ─ regresar (regular -ar)
  { id: "regresar",infinitive: "regresar",en: "to return / go back", ...ar("regresar") },
  // 74 ─ bajar   (regular -ar)
  { id: "bajar",  infinitive: "bajar",  en: "to go down / lower", ...ar("bajar") },
  // 75 ─ descansar (regular -ar)
  { id: "descansar",infinitive: "descansar",en: "to rest", ...ar("descansar") },
  // 76 ─ viajar  (regular -ar)
  { id: "viajar", infinitive: "viajar", en: "to travel", ...ar("viajar") },
  // 77 ─ cocinar (regular -ar)
  { id: "cocinar",infinitive: "cocinar",en: "to cook", ...ar("cocinar") },
  // 78 ─ limpiar (regular -ar)
  { id: "limpiar",infinitive: "limpiar",en: "to clean", ...ar("limpiar") },
  // 79 ─ usar    (regular -ar)
  { id: "usar",   infinitive: "usar",   en: "to use", ...ar("usar") },
  // 80 ─ olvidar (regular -ar)
  { id: "olvidar",infinitive: "olvidar",en: "to forget", ...ar("olvidar") },
  // 81 ─ intentar (regular -ar)
  { id: "intentar",infinitive: "intentar",en: "to try / attempt", ...ar("intentar") },
  // 82 ─ lograr  (regular -ar)
  { id: "lograr", infinitive: "lograr", en: "to achieve / manage", ...ar("lograr") },
  // 83 ─ quedar  (regular -ar)
  { id: "quedar", infinitive: "quedar", en: "to stay / remain", ...ar("quedar") },
  // 84 ─ tomar   (regular -ar)
  { id: "tomar",  infinitive: "tomar",  en: "to take / drink", ...ar("tomar") },
  // 85 ─ terminar (regular -ar)
  { id: "terminar",infinitive: "terminar",en: "to finish / end", ...ar("terminar") },
  // 86 ─ necesitar (regular -ar)
  { id: "necesitar",infinitive: "necesitar",en: "to need", ...ar("necesitar") },
  // 87 ─ deber   (regular -er)
  { id: "deber",  infinitive: "deber",  en: "to must / owe", ...er("deber") },
  // 88 ─ comer   (regular -er)
  { id: "comer",  infinitive: "comer",  en: "to eat", ...er("comer") },
  // 89 ─ beber   (regular -er)
  { id: "beber",  infinitive: "beber",  en: "to drink", ...er("beber") },
  // 90 ─ correr  (regular -er)
  { id: "correr", infinitive: "correr", en: "to run", ...er("correr") },
  // 91 ─ aprender (regular -er)
  { id: "aprender",infinitive: "aprender",en: "to learn", ...er("aprender") },
  // 92 ─ depender (regular -er)
  { id: "depender",infinitive: "depender",en: "to depend", ...er("depender") },
  // 93 ─ meter   (regular -er)
  { id: "meter",  infinitive: "meter",  en: "to put in / insert", ...er("meter") },
  // 94 ─ subir   (regular -ir)
  { id: "subir",  infinitive: "subir",  en: "to go up / climb", ...ir("subir") },
  // 95 ─ recibir (regular -ir)
  { id: "recibir",infinitive: "recibir",en: "to receive", ...ir("recibir") },
  // 96 ─ permitir (regular -ir)
  { id: "permitir",infinitive: "permitir",en: "to allow / permit", ...ir("permitir") },
  // 97 ─ vivir   (regular -ir)
  { id: "vivir",  infinitive: "vivir",  en: "to live", ...ir("vivir") },
  // 98 ─ existir (regular -ir)
  { id: "existir",infinitive: "existir",en: "to exist", ...ir("existir") },
  // 99 ─ escribir (regular -ir)
  { id: "escribir",infinitive: "escribir",en: "to write", ...ir("escribir") },
  // 100 ─ abrir  (regular -ir)
  { id: "abrir",  infinitive: "abrir",  en: "to open", ...ir("abrir") },
];

// ─── SITUATIONS ───────────────────────────────────────────────────────────────

export const SITUATIONS = {
  restaurant: {
    icon: "🍽️", label: "Restaurant",
    sentences: [
      { en: "A table for two, please.", es: "Una mesa para dos, por favor." },
      { en: "Can I see the menu?", es: "¿Me puede traer la carta?" },
      { en: "What do you recommend?", es: "¿Qué recomienda usted?" },
      { en: "I would like the fish.", es: "Quisiera el pescado." },
      { en: "The bill, please.", es: "La cuenta, por favor." },
      { en: "Is service included?", es: "¿Está incluido el servicio?" },
      { en: "This is delicious.", es: "Esto está delicioso." },
      { en: "I am a vegetarian.", es: "Soy vegetariano." },
      { en: "Do you have any specials today?", es: "¿Tienen algún especial hoy?" },
      { en: "Can I have some water?", es: "¿Me puede traer agua?" },
    ],
  },
  shopping: {
    icon: "🛒", label: "Shopping",
    sentences: [
      { en: "How much does this cost?", es: "¿Cuánto cuesta esto?" },
      { en: "Do you have this in a different size?", es: "¿Tiene esto en otra talla?" },
      { en: "I am just looking.", es: "Solo estoy mirando." },
      { en: "Do you accept credit cards?", es: "¿Aceptan tarjeta de crédito?" },
      { en: "Can I try this on?", es: "¿Me lo puedo probar?" },
      { en: "Where are the changing rooms?", es: "¿Dónde están los probadores?" },
      { en: "I would like a refund.", es: "Quisiera un reembolso." },
      { en: "It is too expensive.", es: "Es demasiado caro." },
      { en: "Have you got anything cheaper?", es: "¿Tiene algo más barato?" },
      { en: "I will take it.", es: "Me lo llevo." },
    ],
  },
  hotel: {
    icon: "🏨", label: "Hotel",
    sentences: [
      { en: "I have a reservation.", es: "Tengo una reserva." },
      { en: "I would like a room for two nights.", es: "Quisiera una habitación para dos noches." },
      { en: "What time is check-out?", es: "¿A qué hora es el check-out?" },
      { en: "Is breakfast included?", es: "¿Está incluido el desayuno?" },
      { en: "The air conditioning is not working.", es: "El aire acondicionado no funciona." },
      { en: "Can I have an extra pillow?", es: "¿Me puede dar una almohada extra?" },
      { en: "Where is the lift?", es: "¿Dónde está el ascensor?" },
      { en: "Can you call me a taxi?", es: "¿Me puede pedir un taxi?" },
      { en: "I would like to extend my stay.", es: "Quisiera extender mi estancia." },
      { en: "Is there a safe in the room?", es: "¿Hay una caja fuerte en la habitación?" },
    ],
  },
  smalltalk: {
    icon: "💬", label: "Small Talk",
    sentences: [
      { en: "How are you?", es: "¿Cómo estás?" },
      { en: "I am fine, thank you.", es: "Estoy bien, gracias." },
      { en: "What is your name?", es: "¿Cómo te llamas?" },
      { en: "My name is John.", es: "Me llamo John." },
      { en: "Where are you from?", es: "¿De dónde eres?" },
      { en: "I am from England.", es: "Soy de Inglaterra." },
      { en: "Do you speak English?", es: "¿Hablas inglés?" },
      { en: "I do not speak Spanish well.", es: "No hablo español bien." },
      { en: "Can you speak more slowly?", es: "¿Puedes hablar más despacio?" },
      { en: "Nice to meet you.", es: "Mucho gusto." },
    ],
  },
  directions: {
    icon: "🗺️", label: "Directions",
    sentences: [
      { en: "Where is the nearest metro station?", es: "¿Dónde está la estación de metro más cercana?" },
      { en: "How do I get to the city centre?", es: "¿Cómo llego al centro de la ciudad?" },
      { en: "Turn left at the corner.", es: "Gire a la izquierda en la esquina." },
      { en: "Go straight ahead.", es: "Siga todo recto." },
      { en: "It is on the right.", es: "Está a la derecha." },
      { en: "How far is it?", es: "¿A qué distancia está?" },
      { en: "Is it within walking distance?", es: "¿Se puede ir a pie?" },
      { en: "Can you show me on the map?", es: "¿Me lo puede mostrar en el mapa?" },
      { en: "I am lost.", es: "Estoy perdido." },
      { en: "Does this bus go to the airport?", es: "¿Este autobús va al aeropuerto?" },
    ],
  },
  health: {
    icon: "🏥", label: "Health",
    sentences: [
      { en: "I do not feel well.", es: "No me encuentro bien." },
      { en: "I have a headache.", es: "Me duele la cabeza." },
      { en: "I need to see a doctor.", es: "Necesito ver a un médico." },
      { en: "Where is the nearest pharmacy?", es: "¿Dónde está la farmacia más cercana?" },
      { en: "Do you have something for a cold?", es: "¿Tiene algo para el resfriado?" },
      { en: "I am allergic to penicillin.", es: "Soy alérgico a la penicilina." },
      { en: "Call an ambulance, please.", es: "Llame a una ambulancia, por favor." },
      { en: "It hurts here.", es: "Me duele aquí." },
      { en: "I have a fever.", es: "Tengo fiebre." },
      { en: "I need a prescription.", es: "Necesito una receta." },
    ],
  },
};

// ─── CONSTANTS ────────────────────────────────────────────────────────────────

export const PRONOUNS = ["yo", "tú", "él", "nosotros", "vosotros", "ellos"];
export const TENSES = ["present", "preterite", "future"];
export const TENSE_LABELS = { present: "Present", preterite: "Preterite (Past)", future: "Future" };
