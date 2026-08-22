export const config = {
  name: "Arpita",
  recipientName: "Arpita",
  birthday: "August 22",
  birthDate: "2003-08-22",

  interview: {
    date: "2026-09-03",
    label: "3 September",
  },

  // Configurable gift links. Leave empty ("") to show a safe placeholder
  // state instead of a broken link. Fill these in when the real URLs exist.
  interviewPlatformUrl: "",
  dataAnalyticsCourseUrl: "",
  thirdGiftTitle: "",
  thirdGiftDescription: "",
  thirdGiftUrl: "",

  intro: {
   greeting: "Hey {name} 🎀",
line: "Today is all about you — so I saved a little something to make your day a little brighter. ✨",
cta: "Open What i made For u →"}
, 

  colors: {
    bgTop: "#fff7f4",
    bgMid: "#fdeef3",
    bgBottom: "#f7e9f4",
    accent: "#e07ba0",
    accentSoft: "#f4a9c3",
    lilac: "#c9a9e9",
    peach: "#ffd6c2",
    gold: "#f3c98b",
    text: "#4a3b47",
    textSoft: "#6d5566",
    white: "#ffffff",
  },
};

export function resolveGreeting(template, name) {
  return template.replace("{name}", name);
}
