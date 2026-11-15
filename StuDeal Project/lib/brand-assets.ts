export interface BrandAccent {
  from: string;
  to: string;
  glow: string;
  monogram: string;
  ink: string;
}

export interface BrandAsset {
  slug: string;
  name: string;
  logoSrc: string | null;
  alt: string;
  initials: string;
  accent: BrandAccent;
}

const DEFAULT_ACCENT: BrandAccent = {
  from: "#e9e6ff",
  to: "#f7f5ff",
  glow: "rgba(91, 61, 245, 0.28)",
  monogram: "#5b3df5",
  ink: "#ffffff"
};

export const BRAND_ASSETS: Record<string, BrandAsset> = {
  "galaxy-cinema": {
    slug: "galaxy-cinema",
    name: "Galaxy Cinema",
    logoSrc: "/brand/logos/galaxy.png",
    alt: "Logo Galaxy Cinema",
    initials: "GC",
    accent: {
      from: "#dbe7ff",
      to: "#efe8ff",
      glow: "rgba(37, 99, 235, 0.3)",
      monogram: "#1e40af",
      ink: "#ffffff"
    }
  },
  cgv: {
    slug: "cgv",
    name: "CGV Cinemas Vietnam",
    logoSrc: "/brand/logos/cgv.svg",
    alt: "Logo CGV Cinemas",
    initials: "CGV",
    accent: {
      from: "#ffe0e2",
      to: "#fff1e6",
      glow: "rgba(220, 38, 38, 0.28)",
      monogram: "#b91c1c",
      ink: "#ffffff"
    }
  },
  "bhd-star": {
    slug: "bhd-star",
    name: "BHD Star Cineplex",
    logoSrc: "/brand/logos/bhdstar.png",
    alt: "Logo BHD Star",
    initials: "BHD",
    accent: {
      from: "#ffe9f0",
      to: "#fff3e6",
      glow: "rgba(225, 29, 72, 0.26)",
      monogram: "#be123c",
      ink: "#ffffff"
    }
  },
  "beta-cinemas": {
    slug: "beta-cinemas",
    name: "Beta Cinemas",
    logoSrc: "/brand/logos/beta-cinemas.png",
    alt: "Logo Beta Cinemas",
    initials: "BC",
    accent: {
      from: "#fff1d6",
      to: "#ffe8ea",
      glow: "rgba(217, 119, 6, 0.26)",
      monogram: "#b45309",
      ink: "#ffffff"
    }
  },
  "highlands-coffee": {
    slug: "highlands-coffee",
    name: "Highlands Coffee",
    logoSrc: "/brand/logos/highlands.svg",
    alt: "Logo Highlands Coffee",
    initials: "HC",
    accent: {
      from: "#f4e4d4",
      to: "#f7f0e4",
      glow: "rgba(178, 41, 46, 0.22)",
      monogram: "#8f1f24",
      ink: "#ffffff"
    }
  },
  apple: {
    slug: "apple",
    name: "Apple",
    logoSrc: "/brand/logos/apple.svg",
    alt: "Logo Apple",
    initials: "AP",
    accent: {
      from: "#eceef2",
      to: "#fafbfd",
      glow: "rgba(16, 24, 40, 0.18)",
      monogram: "#101828",
      ink: "#ffffff"
    }
  },
  github: {
    slug: "github",
    name: "GitHub",
    logoSrc: "/brand/logos/github.svg",
    alt: "Logo GitHub",
    initials: "GH",
    accent: {
      from: "#e8eaee",
      to: "#f7f8fa",
      glow: "rgba(36, 41, 46, 0.2)",
      monogram: "#24292f",
      ink: "#ffffff"
    }
  },
  "microsoft-azure": {
    slug: "microsoft-azure",
    name: "Microsoft Azure",
    logoSrc: "/brand/logos/microsoft-azure.svg",
    alt: "Logo Microsoft Azure",
    initials: "AZ",
    accent: {
      from: "#d9ecff",
      to: "#e8e2ff",
      glow: "rgba(0, 120, 212, 0.28)",
      monogram: "#0078d4",
      ink: "#ffffff"
    }
  },
  datacamp: {
    slug: "datacamp",
    name: "DataCamp",
    logoSrc: "/brand/logos/datacamp.svg",
    alt: "Logo DataCamp",
    initials: "DC",
    accent: {
      from: "#d9f7ea",
      to: "#eaf7ef",
      glow: "rgba(3, 165, 110, 0.25)",
      monogram: "#0b7a5a",
      ink: "#ffffff"
    }
  },
  jetbrains: {
    slug: "jetbrains",
    name: "JetBrains",
    logoSrc: "/brand/logos/jetbrains.svg",
    alt: "Logo JetBrains",
    initials: "JB",
    accent: {
      from: "#ffe6d9",
      to: "#ffe0ea",
      glow: "rgba(255, 49, 140, 0.26)",
      monogram: "#d81b7a",
      ink: "#ffffff"
    }
  },
  "1password": {
    slug: "1password",
    name: "1Password",
    logoSrc: "/brand/logos/1password.svg",
    alt: "Logo 1Password",
    initials: "1P",
    accent: {
      from: "#dbe7ff",
      to: "#edf3ff",
      glow: "rgba(5, 87, 255, 0.26)",
      monogram: "#0557ff",
      ink: "#ffffff"
    }
  },
  autodesk: {
    slug: "autodesk",
    name: "Autodesk",
    logoSrc: "/brand/logos/autodesk.svg",
    alt: "Logo Autodesk",
    initials: "AD",
    accent: {
      from: "#e0efff",
      to: "#eef0ff",
      glow: "rgba(6, 150, 215, 0.25)",
      monogram: "#0b6fae",
      ink: "#ffffff"
    }
  },
  termius: {
    slug: "termius",
    name: "Termius",
    logoSrc: "/brand/logos/termius.svg",
    alt: "Logo Termius",
    initials: "TM",
    accent: {
      from: "#e3e6ff",
      to: "#eee8ff",
      glow: "rgba(79, 70, 229, 0.26)",
      monogram: "#4338ca",
      ink: "#ffffff"
    }
  },
  figma: {
    slug: "figma",
    name: "Figma",
    logoSrc: "/brand/logos/figma.svg",
    alt: "Logo Figma",
    initials: "FG",
    accent: {
      from: "#ffe1e8",
      to: "#fff0e6",
      glow: "rgba(242, 78, 30, 0.24)",
      monogram: "#a259ff",
      ink: "#ffffff"
    }
  },
  notion: {
    slug: "notion",
    name: "Notion",
    logoSrc: "/brand/logos/notion.svg",
    alt: "Logo Notion",
    initials: "NT",
    accent: {
      from: "#eceef2",
      to: "#fbfbfc",
      glow: "rgba(17, 24, 39, 0.16)",
      monogram: "#111827",
      ink: "#ffffff"
    }
  },
  canva: {
    slug: "canva",
    name: "Canva",
    logoSrc: "/brand/logos/canva.png",
    alt: "Logo Canva",
    initials: "CV",
    accent: {
      from: "#e3f3ff",
      to: "#f0e9ff",
      glow: "rgba(0, 190, 220, 0.24)",
      monogram: "#00b8d4",
      ink: "#ffffff"
    }
  },
  adobe: {
    slug: "adobe",
    name: "Adobe",
    logoSrc: "/brand/logos/adobe.svg",
    alt: "Logo Adobe",
    initials: "AD",
    accent: {
      from: "#ffe0e0",
      to: "#fff4e0",
      glow: "rgba(230, 41, 41, 0.24)",
      monogram: "#b91c1c",
      ink: "#ffffff"
    }
  },
  mongodb: {
    slug: "mongodb",
    name: "MongoDB",
    logoSrc: "/brand/logos/mongodb.svg",
    alt: "Logo MongoDB",
    initials: "MDB",
    accent: {
      from: "#e4f7e0",
      to: "#f2fbf1",
      glow: "rgba(0, 132, 61, 0.22)",
      monogram: "#00684a",
      ink: "#ffffff"
    }
  },
  heroku: {
    slug: "heroku",
    name: "Heroku",
    logoSrc: "/brand/logos/heroku.svg",
    alt: "Logo Heroku",
    initials: "HK",
    accent: {
      from: "#e2e8ff",
      to: "#f0f4ff",
      glow: "rgba(79, 70, 229, 0.24)",
      monogram: "#4f46e5",
      ink: "#ffffff"
    }
  },
  google: {
    slug: "google",
    name: "Google",
    logoSrc: "/brand/logos/google.svg",
    alt: "Logo Google",
    initials: "G",
    accent: {
      from: "#e6f0ff",
      to: "#fff0f3",
      glow: "rgba(66, 133, 244, 0.26)",
      monogram: "#1a73e8",
      ink: "#ffffff"
    }
  },
  pluralsight: {
    slug: "pluralsight",
    name: "Pluralsight",
    logoSrc: "/brand/logos/pluralsight.svg",
    alt: "Logo Pluralsight",
    initials: "PS",
    accent: {
      from: "#ffe8e8",
      to: "#fff0f6",
      glow: "rgba(244, 63, 94, 0.24)",
      monogram: "#e11d48",
      ink: "#ffffff"
    }
  },
  udemy: {
    slug: "udemy",
    name: "Udemy",
    logoSrc: "/brand/logos/udemy.svg",
    alt: "Logo Udemy",
    initials: "UD",
    accent: {
      from: "#ffe0e6",
      to: "#fff4ea",
      glow: "rgba(229, 9, 20, 0.24)",
      monogram: "#a435f0",
      ink: "#ffffff"
    }
  },
  shopee: {
    slug: "shopee",
    name: "Shopee",
    logoSrc: "/brand/logos/shopee.svg",
    alt: "Logo Shopee",
    initials: "SH",
    accent: {
      from: "#ffe3ea",
      to: "#fff0e6",
      glow: "rgba(238, 77, 45, 0.26)",
      monogram: "#ee4d2d",
      ink: "#ffffff"
    }
  },
  momo: {
    slug: "momo",
    name: "MoMo",
    logoSrc: "/brand/logos/momo.png",
    alt: "Logo MoMo",
    initials: "MM",
    accent: {
      from: "#e2f0ff",
      to: "#f2eaff",
      glow: "rgba(82, 45, 209, 0.26)",
      monogram: "#522dd1",
      ink: "#ffffff"
    }
  },
  "hcmc-bus": {
    slug: "hcmc-bus",
    name: "Xe buýt TP. Hồ Chí Minh",
    logoSrc: null,
    alt: "Xe buýt TP. Hồ Chí Minh",
    initials: "XB",
    accent: {
      from: "#dcf2ff",
      to: "#e9f3ff",
      glow: "rgba(14, 165, 233, 0.24)",
      monogram: "#0369a1",
      ink: "#ffffff"
    }
  },
  dcine: {
    slug: "dcine",
    name: "DCINE",
    logoSrc: null,
    alt: "Logo DCINE",
    initials: "DC",
    accent: {
      from: "#e0f2fe",
      to: "#eef0ff",
      glow: "rgba(2, 132, 199, 0.24)",
      monogram: "#0369a1",
      ink: "#ffffff"
    }
  },
  cellphones: {
    slug: "cellphones",
    name: "CellphoneS",
    logoSrc: "/brand/logos/cellphones.png",
    alt: "Logo CellphoneS",
    initials: "CS",
    accent: {
      from: "#ffe3ea",
      to: "#fff0e0",
      glow: "rgba(225, 29, 72, 0.24)",
      monogram: "#be123c",
      ink: "#ffffff"
    }
  }
};

export function initialsFromName(name: string): string {
  const words = name
    .replace(/[^A-Za-z0-9\u00c0-\u024f\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);

  if (!words.length) {
    return "S";
  }

  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  }

  return `${words[0][0]}${words[1][0]}`.toUpperCase();
}

export function getBrandAsset(
  slug: string,
  name: string,
  brandSlug?: string | null
): BrandAsset {
  const known = BRAND_ASSETS[brandSlug ?? ""] ?? BRAND_ASSETS[slug];

  if (known) {
    return known;
  }

  return {
    slug,
    name,
    logoSrc: null,
    alt: `Logo ${name}`,
    initials: initialsFromName(name),
    accent: DEFAULT_ACCENT
  };
}
