const sizingValues = [
  {
    key: "Source Lines of Code",
    value: "SLOC",
  },
  {
    key: "Function Points",
    value: "FP",
  },
];

const softwareSize = [
  {
    title: "Sizing Method",
    value: sizingValues,
  },
];

const languageFactor = [
  {
    title: "Language",
    values: [
      {
        key: "C",
        value: "C",
      },
      {
        key: "Basic",
        value: "basic",
      },
      {
        key: "Database - Default",
        value: "databaseDefault",
      },
      {
        key: "Java",
        value: "java",
      },
      {
        key: "PERL",
        value: "PERL",
      },
      {
        key: "3rd Generation Language",
        value: "thirdGeneration",
      },
    ],
  },
];

const levelValues = [
  {
    key: "Norminal",
    value: "norminal",
    isDefault: true,
  },
  {
    key: "Very Low",
    value: "veryLow",
  },
  {
    key: "Low",
    value: "low",
  },
  {
    key: "High",
    value: "high",
  },
  {
    key: "Very high",
    value: "veryHigh",
  },
  {
    key: "Extra High",
    value: "extraHigh",
  },
];

const softwareScaleDrivers = [
  {
    title: "Precedentedness",
    name: "PREC",
    value: levelValues,
  },
  {
    title: "Development Flexibility",
    name: "FLEX",
    value: levelValues,
  },
  {
    title: "Architecture / Risk Resolution",
    name: "RESL",
    value: levelValues,
  },
  {
    title: "Team Cohesion",
    name: "TEAM",
    value: levelValues,
  },
  {
    title: "Process Maturity",
    name: "PMAT",
    value: levelValues,
  },
];

const softwareCostDriversProduct = [
  {
    title: "Required Software Reliability",
    name: "RELY",
    value: levelValues,
  },
  {
    title: "Data Base Size",
    name: "DATA",
    value: levelValues,
  },
  {
    title: "Product Complexity",
    name: "CPLX",
    value: levelValues,
  },
  {
    title: "Developed for Reusability",
    name: "RUSE",
    value: levelValues,
  },
  {
    title: "Documentation Match to Lifecycle Needs",
    name: "DOCU",
    value: levelValues,
  },
];

const personnel = [
  {
    title: "Analyst Capability",
    name: "ACAP",
    value: levelValues,
  },
  {
    title: "Programmer Capability",
    name: "PCAP",
    value: levelValues,
  },
  {
    title: "Personnel Continuity",
    name: "PCON",
    value: levelValues,
  },
  {
    title: "Application Experience",
    name: "AEXP",
    value: levelValues,
  },
  {
    title: "Platform Experience",
    name: "PEXP",
    value: levelValues,
  },
  {
    title: "Language and Toolset Experience",
    name: "LTEX",
    value: levelValues,
  },
];

const platform = [
  {
    title: "Time Constraint",
    name: "TIME",
    value: levelValues,
  },
  {
    title: "Storage Constraint",
    name: "STOR",
    value: levelValues,
  },
  {
    title: "Platform Volatility",
    name: "PVOL",
    value: levelValues,
  },
];

const project = [
  {
    title: "Use of Software Tools",
    name: "TOOL",
    value: levelValues,
  },
  {
    title: "Multisite Development",
    name: "SITE",
    value: levelValues,
  },
  {
    title: "Required Development Schedule",
    name: "SCED",
    value: levelValues,
  },
];
export {
  levelValues,
  languageFactor,
  softwareScaleDrivers,
  personnel,
  platform,
  project,
  softwareCostDriversProduct,
  softwareSize,
};
