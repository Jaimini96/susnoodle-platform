import type { GameMetadata } from "./types";

const sharedTutorial = [
  {
    title: "Scan the table",
    body: "Watch the highlighted pieces first. SusNoodle teaches the current turn before asking you to act."
  },
  {
    title: "Make one move",
    body: "Legal choices glow with labels, not just color, so mobile and keyboard players get the same clarity."
  },
  {
    title: "Ask why",
    body: "Every confusing jump, capture, or reveal has a short explanation inside the rules drawer."
  }
];

export const games: GameMetadata[] = [
  {
    id: "rmcs",
    slug: "raja-mantri-chor-sipahi",
    title: "Raja Mantri Chor Sipahi",
    alternateNames: ["Raja Mantri Chor Police", "King Minister Thief Soldier"],
    shortDescription: "Four chits. One thief. One minister with questions.",
    longDescription:
      "A quick bluffing table game built around hidden roles, accusation, and a satisfying reveal.",
    culturalNote:
      "Played in many Indian classrooms and family corners with folded paper chits. Regional scoring differs, so this launch version labels its default scoring clearly.",
    minPlayers: 4,
    maxPlayers: 4,
    estimatedMinutes: 6,
    difficulty: "easy",
    categories: ["bluffing", "party", "family"],
    regions: ["Pan-India"],
    modes: ["local", "online", "practice", "tutorial"],
    status: "playable",
    heroAsset: "/assets/playfields/raja-mantri-court-v3.jpg",
    thumbnailAsset: "/assets/playfields/raja-mantri-court-v3.jpg",
    accent: "#f0b35b",
    rules: [
      {
        title: "Roles",
        body: "Each round secretly assigns Raja, Mantri, Chor, and Sipahi to four players."
      },
      {
        title: "The Guess",
        body: "The Mantri tries to identify the Chor. Everyone else may bluff through table talk."
      },
      {
        title: "Scoring",
        body: "Default scoring: Raja 1000, Mantri 800 if correct or 0 if wrong, Sipahi 500, Chor 0 if caught or 800 if the Mantri misses."
      },
      {
        title: "Match Target",
        body: "Practice mode plays up to 5 rounds or until someone reaches 3000 points. The highest score leads the court."
      }
    ],
    tutorial: [
      {
        title: "Reveal privately",
        body: "Tap your own chit. In pass-and-play, each player sees only their role."
      },
      {
        title: "Accuse with care",
        body: "When you are Mantri, choose the player you believe is Chor."
      },
      {
        title: "Scores tell the story",
        body: "The reveal screen explains why points changed after every round."
      }
    ],
    seo: {
      title: "How to Play Raja Mantri Chor Sipahi Online | SusNoodle",
      description:
        "Play Raja Mantri Chor Sipahi online with private role chits, bluffing rounds, scoring, tutorial, and friend rooms.",
      keywords: ["how to play Raja Mantri Chor Sipahi", "Indian childhood games", "role guessing game"]
    }
  },
  {
    id: "ashta",
    slug: "ashta-chamma",
    title: "Ashta Chamma",
    alternateNames: ["Chowka Bara", "Asta Changa Pe", "Challas Aath", "Changa Po", "Kavade"],
    shortDescription: "Cowries decide the pace. Safe squares decide the drama.",
    longDescription:
      "A South Indian race board game adapted with legal move hints, captures, and a compact mobile board.",
    culturalNote:
      "Ashta Chamma and Chowka Bara have many regional board sizes and cowrie interpretations. This MVP uses a compact 5x5 teaching board with variant hooks.",
    minPlayers: 2,
    maxPlayers: 4,
    estimatedMinutes: 12,
    difficulty: "medium",
    categories: ["board", "strategy", "family"],
    regions: ["Karnataka", "Andhra Pradesh", "Telangana", "Tamil Nadu"],
    modes: ["local", "online", "practice", "tutorial"],
    status: "playable",
    heroAsset: "/assets/playfields/ashta-chamma-board-v2.jpg",
    thumbnailAsset: "/assets/playfields/ashta-chamma-board-v2.jpg",
    accent: "#2db7a3",
    rules: [
      {
        title: "Throw",
        body: "Cowrie shells produce a move value. The launch set uses 1, 2, 3, 4, and 8."
      },
      {
        title: "Move",
        body: "Choose a token with a legal path. Safe squares protect tokens from capture."
      },
      {
        title: "Win",
        body: "Bring both tokens home before the other player."
      }
    ],
    tutorial: sharedTutorial,
    seo: {
      title: "Ashta Chamma Online | Chowka Bara Rules and Play",
      description:
        "Learn and play Ashta Chamma online with cowrie rolls, safe squares, captures, and mobile-friendly tutorials.",
      keywords: ["Ashta Chamma online", "Chowka Bara rules", "traditional Indian board games"]
    }
  },
  {
    id: "damroo",
    slug: "damroo",
    title: "Damroo",
    alternateNames: ["Damaru Reflex", "Damru"],
    shortDescription: "A quick rhythm-reflex burst for the party table.",
    longDescription:
      "A clearly labeled modern reflex interpretation inspired by regional Damroo play memories.",
    culturalNote:
      "Because Damroo rules vary by memory and region, this version does not claim to be universal. It ships with a feedback path for other versions.",
    minPlayers: 1,
    maxPlayers: 4,
    estimatedMinutes: 3,
    difficulty: "easy",
    categories: ["reflex", "party", "arcade"],
    regions: ["Regional variants"],
    modes: ["solo", "local", "practice", "tutorial"],
    status: "playable",
    heroAsset: "/assets/playfields/damroo-arena-v2.jpg",
    thumbnailAsset: "/assets/playfields/damroo-arena-v2.jpg",
    accent: "#e7573f",
    rules: [
      {
        title: "Listen for the Beat",
        body: "A pulse expands toward the hit ring. Tap when it lands inside the brass band."
      },
      {
        title: "Combo",
        body: "Accurate taps build a combo. Early and late taps break it."
      },
      {
        title: "Community Variants",
        body: "The rules drawer invites players to submit the version they grew up with."
      }
    ],
    tutorial: sharedTutorial,
    seo: {
      title: "Damroo Reflex Game | Traditional Indian Party Game Inspired",
      description:
        "Play a quick Damroo-inspired rhythm reflex mini game with tutorial mode and community variant notes.",
      keywords: ["Damroo game", "Indian reflex game", "traditional Indian games online"]
    }
  },
  {
    id: "moksha",
    slug: "moksha-patam",
    title: "Moksha Patam",
    alternateNames: [
      "Gyan Chauper",
      "Paramapadam",
      "Paramapada Sopanam",
      "Vaikuntapali",
      "Mokshapat",
      "Saanp Aur Seedhi",
      "Snakes and Ladders"
    ],
    shortDescription: "Climb by luck, slide by consequence, finish with grace.",
    longDescription:
      "A family board game inspired by the Indian lineage of snakes-and-ladders style progression.",
    culturalNote:
      "Moksha Patam and related boards carry moral or spiritual framing in many historical tellings. This version stays light and avoids overstating disputed details.",
    minPlayers: 1,
    maxPlayers: 4,
    estimatedMinutes: 8,
    difficulty: "easy",
    categories: ["board", "family"],
    regions: ["India"],
    modes: ["solo", "local", "practice", "tutorial"],
    status: "playable",
    heroAsset: "/assets/playfields/moksha-patam-board-v2.jpg",
    thumbnailAsset: "/assets/playfields/moksha-patam-board-v2.jpg",
    accent: "#7ebf63",
    rules: [
      {
        title: "Roll",
        body: "Roll the die and move forward. Exact finish is required in the default variant."
      },
      {
        title: "Paths",
        body: "Ladders lift you to a higher square; serpents pull you down."
      },
      {
        title: "Result",
        body: "The first player to land on the final square wins."
      }
    ],
    tutorial: sharedTutorial,
    seo: {
      title: "Moksha Patam Online | Gyan Chauper Rules",
      description:
        "Play Moksha Patam online with a quick tutorial, family mode, and mobile board controls.",
      keywords: ["Moksha Patam", "Gyan Chauper", "Indian snakes and ladders"]
    }
  },
  {
    id: "pallankuzhi",
    slug: "pallankuzhi",
    title: "Pallankuzhi",
    alternateNames: ["Ali Guli Mane", "Vamana Guntalu"],
    shortDescription: "Count seeds, read tempo, empty the board with patience.",
    longDescription:
      "A mancala-style strategy game with sowing animation, captures, and gentle turn hints.",
    culturalNote:
      "Pallankuzhi is played across South India with different pit counts and capture rules. The launch rule set is documented and variant-ready.",
    minPlayers: 2,
    maxPlayers: 2,
    estimatedMinutes: 10,
    difficulty: "medium",
    categories: ["strategy", "board", "family"],
    regions: ["Tamil Nadu", "Karnataka", "Andhra Pradesh", "Kerala"],
    modes: ["solo", "local", "practice", "tutorial"],
    status: "playable",
    heroAsset: "/assets/playfields/pallankuzhi-board-v2.jpg",
    thumbnailAsset: "/assets/playfields/pallankuzhi-board-v2.jpg",
    accent: "#b97448",
    rules: [
      {
        title: "Pick",
        body: "Choose one of your non-empty pits and distribute seeds one by one counterclockwise."
      },
      {
        title: "Capture",
        body: "If your final seed lands in an empty pit on your side, capture the opposite pit."
      },
      {
        title: "Win",
        body: "When one side cannot move, the higher captured seed count wins."
      }
    ],
    tutorial: sharedTutorial,
    seo: {
      title: "Pallankuzhi Online | Ali Guli Mane Rules",
      description:
        "Play Pallankuzhi online with seed-counting strategy, captures, tutorial hints, and mobile controls.",
      keywords: ["Pallankuzhi online", "Ali Guli Mane rules", "mancala Indian game"]
    }
  },
  {
    id: "chaupar",
    slug: "chaupar-pachisi",
    title: "Chaupar / Pachisi",
    alternateNames: ["Pachisi", "Chaupad", "Chausar", "Chaupar", "Chopat", "Twenty-Five"],
    shortDescription: "A royal cross-board race with heavier strategy.",
    longDescription:
      "A roadmap game using the race-board engine after Ashta Chamma stabilizes.",
    culturalNote:
      "Chaupar and Pachisi have deep historical roots and many house rules. This catalog page avoids claiming one definitive format.",
    minPlayers: 2,
    maxPlayers: 4,
    estimatedMinutes: 20,
    difficulty: "hard",
    categories: ["board", "strategy"],
    regions: ["North India", "Pan-India"],
    modes: ["tutorial"],
    status: "coming-soon",
    heroAsset: "/assets/playfields/pachisi-chaupar-board-v2.jpg",
    thumbnailAsset: "/assets/playfields/pachisi-chaupar-board-v2.jpg",
    accent: "#b63852",
    rules: [
      {
        title: "Objective",
        body: "Move all pieces around a cross-shaped board and bring them home."
      },
      {
        title: "Roadmap",
        body: "The launch plan reuses race movement, capture, and safe-square services from Ashta Chamma."
      }
    ],
    tutorial: sharedTutorial,
    seo: {
      title: "Chaupar and Pachisi Online Rules | SusNoodle",
      description:
        "Learn the roadmap rules for Chaupar and Pachisi, the classic Indian cross-and-circle race board games.",
      keywords: ["Chaupar rules", "Pachisi online", "traditional Indian board games"]
    }
  },
  {
    id: "chaturanga",
    slug: "chaturanga",
    title: "Chaturanga",
    alternateNames: ["Ancient Indian Chess Ancestor"],
    shortDescription: "A strategy board ancestor queued for a careful build.",
    longDescription:
      "A future simplified strategy mode inspired by Chaturanga, with historically careful rule notes.",
    culturalNote:
      "Chaturanga is often discussed as part of chess history. SusNoodle will cite sources before making specific claims.",
    minPlayers: 2,
    maxPlayers: 2,
    estimatedMinutes: 20,
    difficulty: "hard",
    categories: ["strategy", "board"],
    regions: ["India"],
    modes: ["tutorial"],
    status: "coming-soon",
    heroAsset: "/assets/games/roadmap-table.jpg",
    thumbnailAsset: "/assets/games/roadmap-table.jpg",
    accent: "#7267db",
    rules: [
      {
        title: "Roadmap",
        body: "Launch as a teachable simplified strategy module after core multiplayer is hardened."
      }
    ],
    tutorial: sharedTutorial,
    seo: {
      title: "Chaturanga Game Roadmap | SusNoodle",
      description: "Explore the planned Chaturanga strategy board module on SusNoodle.",
      keywords: ["Chaturanga", "Indian chess ancestor", "strategy board game"]
    }
  },
  {
    id: "adupuli",
    slug: "adu-puli-aattam",
    title: "Adu Puli Aattam",
    alternateNames: ["Bagh Chal", "Goats and Tigers", "Lambs and Tigers", "Bagh Bandi"],
    shortDescription: "One side hunts. The other side surrounds.",
    longDescription:
      "A future asymmetric strategy game with tiger-and-goat style movement and blocking.",
    culturalNote:
      "Related games appear across South India, Nepal, and Himalayan regions. Variant labeling will matter here.",
    minPlayers: 2,
    maxPlayers: 2,
    estimatedMinutes: 14,
    difficulty: "medium",
    categories: ["strategy", "board"],
    regions: ["Tamil Nadu", "Nepal", "Himalayan variants"],
    modes: ["tutorial"],
    status: "coming-soon",
    heroAsset: "/assets/games/roadmap-table.jpg",
    thumbnailAsset: "/assets/games/roadmap-table.jpg",
    accent: "#d59c35",
    rules: [
      {
        title: "Roadmap",
        body: "The first version will focus on legal move clarity and asymmetric turn teaching."
      }
    ],
    tutorial: sharedTutorial,
    seo: {
      title: "Adu Puli Aattam and Bagh Chal Online Roadmap",
      description: "Learn about the planned asymmetric hunt-and-block strategy game on SusNoodle.",
      keywords: ["Adu Puli Aattam", "Bagh Chal", "Lambs and Tigers game"]
    }
  },
  {
    id: "gilli",
    slug: "gilli-danda",
    title: "Gilli Danda",
    alternateNames: ["Viti Dandu", "Tipcat"],
    shortDescription: "Tap the lift. Time the strike. Send it flying.",
    longDescription:
      "A mobile-first arcade adaptation of the outdoor timing game, tuned for fast score runs.",
    culturalNote:
      "Gilli Danda is a broad family of outdoor games. This digital version focuses on the lift-and-strike rhythm rather than replacing outdoor rules.",
    minPlayers: 1,
    maxPlayers: 4,
    estimatedMinutes: 4,
    difficulty: "medium",
    categories: ["arcade", "reflex", "family"],
    regions: ["Pan-India"],
    modes: ["solo", "local", "practice", "tutorial"],
    status: "playable",
    heroAsset: "/assets/playfields/gilli-danda-field-v2.jpg",
    thumbnailAsset: "/assets/playfields/gilli-danda-field-v2.jpg",
    accent: "#d89d4b",
    rules: [
      {
        title: "Lift",
        body: "Charge the lift to pop the gilli into the strike zone."
      },
      {
        title: "Strike",
        body: "Hit when power and angle align. Better timing sends it farther."
      },
      {
        title: "Score",
        body: "Three attempts make a run. Highest total distance wins."
      }
    ],
    tutorial: sharedTutorial,
    seo: {
      title: "Gilli Danda Digital Game | Play Online",
      description:
        "Play a mobile-friendly Gilli Danda timing game with lift, strike, score runs, and tutorial mode.",
      keywords: ["Gilli Danda online", "Indian outdoor game", "timing arcade game"]
    }
  },
  {
    id: "kanche",
    slug: "kanche-marbles",
    title: "Kanche",
    alternateNames: ["Goti", "Goli", "Golli Gundu", "Lakhoti", "Marbles"],
    shortDescription: "Aim low, flick clean, watch the circle break.",
    longDescription:
      "A roadmap physics game for flick aiming, marble collisions, and quick mobile rounds.",
    culturalNote:
      "Marble games vary widely by street and schoolyard. SusNoodle will support local rule notes.",
    minPlayers: 1,
    maxPlayers: 4,
    estimatedMinutes: 5,
    difficulty: "medium",
    categories: ["arcade", "family"],
    regions: ["Pan-India"],
    modes: ["tutorial"],
    status: "coming-soon",
    heroAsset: "/assets/games/roadmap-table.jpg",
    thumbnailAsset: "/assets/games/roadmap-table.jpg",
    accent: "#3ca2d4",
    rules: [
      {
        title: "Roadmap",
        body: "Physics testing comes after the first game engine contracts settle."
      }
    ],
    tutorial: sharedTutorial,
    seo: {
      title: "Kanche Marbles Game Online Roadmap | SusNoodle",
      description: "Explore the planned Kanche / Goti marbles physics game on SusNoodle.",
      keywords: ["Kanche game", "Goti marbles", "Indian childhood games online"]
    }
  },
  {
    id: "shatranj",
    slug: "shatranj",
    title: "Shatranj",
    alternateNames: ["Chatrang", "Ancient Chess", "Chaturanga Successor"],
    shortDescription: "A slower, sharper chess ancestor for patient players.",
    longDescription:
      "A roadmap strategy module inspired by Shatranj, with rule differences explained before play.",
    culturalNote:
      "Shatranj is historically linked with Chaturanga through Persian and South Asian chess history. The build will cite rules before claiming exact lineage.",
    minPlayers: 2,
    maxPlayers: 2,
    estimatedMinutes: 18,
    difficulty: "hard",
    categories: ["strategy", "board"],
    regions: ["India", "Persia", "South Asia"],
    modes: ["tutorial"],
    status: "coming-soon",
    heroAsset: "/assets/games/roadmap-table.jpg",
    thumbnailAsset: "/assets/games/roadmap-table.jpg",
    accent: "#8d78d8",
    rules: [
      {
        title: "Roadmap",
        body: "The first playable version will teach piece differences from modern chess before ranked play."
      }
    ],
    tutorial: sharedTutorial,
    seo: {
      title: "Shatranj Online Roadmap | Ancient Chess Strategy Game",
      description:
        "Explore the planned Shatranj module, a premium ancient chess-style strategy game with careful rule notes.",
      keywords: ["Shatranj", "ancient chess", "Chaturanga successor", "Indian strategy board game"]
    }
  },
  {
    id: "navakankari",
    slug: "navakankari",
    title: "Navakankari",
    alternateNames: ["Nava-Kankari", "Nine Men's Morris", "Nine Pebbles", "Mühle"],
    shortDescription: "Place, mill, block, and fly in quick strategy bursts.",
    longDescription:
      "A roadmap abstract strategy game based on nine-pebble mill play, tuned for short mobile sessions.",
    culturalNote:
      "Navakankari is commonly mapped to Nine Men's Morris-style play. The launch page keeps regional names searchable without claiming every board variant is identical.",
    minPlayers: 2,
    maxPlayers: 2,
    estimatedMinutes: 7,
    difficulty: "medium",
    categories: ["strategy", "board"],
    regions: ["Karnataka", "India", "Global variants"],
    modes: ["tutorial"],
    status: "coming-soon",
    heroAsset: "/assets/games/roadmap-table.jpg",
    thumbnailAsset: "/assets/games/roadmap-table.jpg",
    accent: "#a36fdb",
    rules: [
      {
        title: "Roadmap",
        body: "Place nine pieces, form mills, remove opponent pieces, then move through the board."
      }
    ],
    tutorial: sharedTutorial,
    seo: {
      title: "Navakankari Online | Nine Men's Morris Indian Variant",
      description:
        "Learn about Navakankari, also known as Nine Men's Morris or nine pebbles, planned for SusNoodle.",
      keywords: ["Navakankari", "Nine Men's Morris India", "Nava Kankari", "nine pebbles game"]
    }
  },
  {
    id: "teenpatti",
    slug: "teen-patti",
    title: "Teen Patti",
    alternateNames: ["3 Patti", "Tre Patte", "Flush", "Flash", "Indian Poker"],
    shortDescription: "Three cards, table nerve, no real-money launch hooks.",
    longDescription:
      "A future social card module focused on private rooms, friendly chips, and probability teaching without gambling mechanics.",
    culturalNote:
      "Teen Patti is strongly associated with betting in many contexts. SusNoodle will only ship a no-real-money social version.",
    minPlayers: 3,
    maxPlayers: 7,
    estimatedMinutes: 8,
    difficulty: "medium",
    categories: ["card", "bluffing", "party"],
    regions: ["India", "South Asia"],
    modes: ["tutorial"],
    status: "coming-soon",
    heroAsset: "/assets/games/roadmap-table.jpg",
    thumbnailAsset: "/assets/games/roadmap-table.jpg",
    accent: "#d94e6b",
    rules: [
      {
        title: "Roadmap",
        body: "Friendly chips, private rooms, hand rankings, and clear anti-real-money guardrails."
      }
    ],
    tutorial: sharedTutorial,
    seo: {
      title: "Teen Patti Online Social Mode | 3 Patti, Flush, Flash",
      description:
        "SusNoodle roadmap for Teen Patti, also called 3 Patti, Flush, Flash, and Indian Poker, as a no-real-money social card game.",
      keywords: ["Teen Patti online", "3 Patti", "Flush card game", "Flash card game", "Indian Poker"]
    }
  },
  {
    id: "rummy",
    slug: "indian-rummy",
    title: "Indian Rummy",
    alternateNames: ["13 Card Rummy", "Paplu", "Indian Cherokee Rummy"],
    shortDescription: "Draw, discard, declare. Clean sets only.",
    longDescription:
      "A roadmap 13-card rummy module designed around turn-based modeling, validation, and clear sequence teaching.",
    culturalNote:
      "Rummy has both casual family and money-gaming contexts in India. SusNoodle’s roadmap keeps the launch social and non-wagering.",
    minPlayers: 2,
    maxPlayers: 6,
    estimatedMinutes: 15,
    difficulty: "hard",
    categories: ["card", "strategy", "family"],
    regions: ["India"],
    modes: ["tutorial"],
    status: "coming-soon",
    heroAsset: "/assets/games/roadmap-table.jpg",
    thumbnailAsset: "/assets/games/roadmap-table.jpg",
    accent: "#3980c7",
    rules: [
      {
        title: "Roadmap",
        body: "Draw and discard toward valid sets and sequences, with at least one pure sequence in the default rules."
      }
    ],
    tutorial: sharedTutorial,
    seo: {
      title: "Indian Rummy Online Roadmap | 13 Card Rummy, Paplu",
      description:
        "Explore the planned Indian Rummy module, also called 13 Card Rummy and Paplu, with social play and rule validation.",
      keywords: ["Indian Rummy", "13 Card Rummy", "Paplu", "rummy rules India"]
    }
  },
  {
    id: "seep",
    slug: "seep-sweep",
    title: "Seep",
    alternateNames: ["Sweep", "Seep Card Game", "Shiv"],
    shortDescription: "Build houses, clear the floor, remember everything.",
    longDescription:
      "A roadmap trick-and-capture card game for North Indian nostalgia and team play.",
    culturalNote:
      "Seep/Sweep rules vary by table. The first module will label the chosen house-building and scoring variant.",
    minPlayers: 2,
    maxPlayers: 4,
    estimatedMinutes: 14,
    difficulty: "hard",
    categories: ["card", "strategy"],
    regions: ["Punjab", "North India", "Pakistan"],
    modes: ["tutorial"],
    status: "coming-soon",
    heroAsset: "/assets/games/roadmap-table.jpg",
    thumbnailAsset: "/assets/games/roadmap-table.jpg",
    accent: "#50a676",
    rules: [
      {
        title: "Roadmap",
        body: "Capture cards from a shared layout, build houses, and score valuable cards and sweeps."
      }
    ],
    tutorial: sharedTutorial,
    seo: {
      title: "Seep Card Game Online Roadmap | Sweep Rules",
      description:
        "Learn about SusNoodle’s planned Seep/Sweep card game with house-building, capture play, and multiplayer rooms.",
      keywords: ["Seep card game", "Sweep card game", "Shiv card game", "North Indian card games"]
    }
  },
  {
    id: "court",
    slug: "court-piece",
    title: "Court Piece",
    alternateNames: ["Rang", "Rung", "Hokm", "Coat Piece", "Kot Pees", "Seven Hands"],
    shortDescription: "Call trump. Win seven. Keep the team calm.",
    longDescription:
      "A roadmap team trick-taking card game with room play, trump calling, and partnership scoring.",
    culturalNote:
      "Court Piece/Rang/Hokm is known across South Asia and diaspora communities with several variants.",
    minPlayers: 4,
    maxPlayers: 4,
    estimatedMinutes: 12,
    difficulty: "medium",
    categories: ["card", "strategy", "party"],
    regions: ["India", "Pakistan", "South Asia"],
    modes: ["tutorial"],
    status: "coming-soon",
    heroAsset: "/assets/games/roadmap-table.jpg",
    thumbnailAsset: "/assets/games/roadmap-table.jpg",
    accent: "#ce7f38",
    rules: [
      {
        title: "Roadmap",
        body: "Four players in teams, trump selection, trick play, and seven-trick win conditions."
      }
    ],
    tutorial: sharedTutorial,
    seo: {
      title: "Court Piece Online Roadmap | Rang, Rung, Hokm",
      description:
        "Explore Court Piece, also called Rang, Rung, Hokm, Coat Piece, and Seven Hands, as a planned SusNoodle team card game.",
      keywords: ["Court Piece", "Rang card game", "Rung card game", "Hokm", "Coat Piece"]
    }
  },
  {
    id: "vyapar",
    slug: "vyapar-business",
    title: "Vyapar",
    alternateNames: ["Business", "Indian Monopoly", "Trade Game"],
    shortDescription: "Buy cities, bargain hard, keep the family argument friendly.",
    longDescription:
      "A roadmap economy board module inspired by Indian Business-style boards, built for custom city themes.",
    culturalNote:
      "Business-style boards are familiar in many Indian homes. SusNoodle will avoid trademarked board layouts and ship an original Indian city economy.",
    minPlayers: 2,
    maxPlayers: 6,
    estimatedMinutes: 25,
    difficulty: "medium",
    categories: ["board", "economy", "family"],
    regions: ["India"],
    modes: ["tutorial"],
    status: "coming-soon",
    heroAsset: "/assets/games/roadmap-table.jpg",
    thumbnailAsset: "/assets/games/roadmap-table.jpg",
    accent: "#c6a04b",
    rules: [
      {
        title: "Roadmap",
        body: "Original city routes, rent, trading, and shorter match variants for mobile."
      }
    ],
    tutorial: sharedTutorial,
    seo: {
      title: "Vyapar Business Board Game Roadmap | Indian Monopoly Style",
      description:
        "Explore SusNoodle’s planned Vyapar / Business economy board game with original Indian city theming.",
      keywords: ["Vyapar game", "Business board game India", "Indian Monopoly", "Indian city board game"]
    }
  },
  {
    id: "cowrie",
    slug: "cowrie-dice-lab",
    title: "Cowrie Dice Lab",
    alternateNames: ["Cowrie Throws", "Kavade", "Kauri Shell Dice"],
    shortDescription: "A tactile shell-throw trainer for board-game variants.",
    longDescription:
      "A utility roadmap module for teaching cowrie probability, throw outcomes, and regional randomizer variants.",
    culturalNote:
      "Cowrie shells power several traditional race games including Pachisi, Chaupar, and Ashta Chamma-style variants.",
    minPlayers: 1,
    maxPlayers: 1,
    estimatedMinutes: 2,
    difficulty: "easy",
    categories: ["family", "board"],
    regions: ["India"],
    modes: ["solo", "tutorial"],
    status: "coming-soon",
    heroAsset: "/assets/games/roadmap-table.jpg",
    thumbnailAsset: "/assets/games/roadmap-table.jpg",
    accent: "#f0b35b",
    rules: [
      {
        title: "Roadmap",
        body: "Throw shells, compare house rules, and preview how outcomes affect board movement."
      }
    ],
    tutorial: sharedTutorial,
    seo: {
      title: "Cowrie Dice Lab | Kavade and Kauri Shell Throws",
      description:
        "Learn cowrie shell throw outcomes used in Pachisi, Chaupar, Ashta Chamma, and other Indian board games.",
      keywords: ["cowrie shells game", "kavade", "kauri dice", "Pachisi cowries", "Chowka Bara cowrie"]
    }
  }
];

export const playableSlugs = games
  .filter((game) => game.status === "playable")
  .map((game) => game.slug);

export function getGameBySlug(slug: string) {
  return games.find((game) => game.slug === slug);
}

export function getFeaturedGames() {
  return games.slice(0, 6);
}
