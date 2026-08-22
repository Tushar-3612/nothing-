export const site = {
  title: "A Little Birthday Surprise",
  recipientName: "Arpita",
};

export const hero = {
  eyebrow: "happy birthday",
  title: "I wanted to make your day a little more special",
  subtitle:
    "So I made you something instead of just saying it. Scroll, tap, and explore — it's all for you.",
  cta: "Begin the surprise",
  scrollHint: "scroll to start",
};

export const wishes = [
  {
    id: "smile",
    emoji: "⭐",
    title: "Reasons to smile",
    text: "May this year bring you countless reasons to smile.",
  },
  {
    id: "amazing",
    emoji: "🌸",
    title: "Keep being you",
    text: "Keep being the amazing person you are.",
  },
  {
    id: "dreams",
    emoji: "🦋",
    title: "New dreams",
    text: "May you discover new places, new dreams and new memories.",
  },
  {
    id: "moments",
    emoji: "🎀",
    title: "Little moments",
    text: "Here's to another year of little moments that become great memories.",
  },
  {
    id: "kinder",
    emoji: "🎁",
    title: "A kinder year",
    text: "Hope this year is kinder, brighter and happier than the last.",
  },
];

export const letter = {
  greeting: "Hey you,",
  body: [
    "I didn't make this to be grand or clever. I just wanted your birthday to feel a little more like you — warm, a bit playful, and full of good things.",
    "Thank you for being the kind of friend who's easy to celebrate. I hope today reminds you how much the little things about you matter.",
    "That's all. Go enjoy your day — you've earned a good one.",
  ],
  signoff: "With a happy heart,",
  signature: "your friend",
};

export const closing = {
  title: "However your day goes",
  subtitle: "I hope it's a little brighter because you're in it.",
  finalLine: "Happy birthday, really.",
};

// The birthday wish shown inside the popup after the cake is cut.
// Each entry is one stanza; they are typed out one after another.
export const wishMessage = [
  "May Ganpati Bappa always keep your path filled with good beginnings,\nand may Mahadev give you the strength to keep walking it with courage.",
  "May you always have the calm to face the difficult days,\nthe confidence to believe in yourself,\nand the happiness to enjoy all the little moments along the way.",
  "You've already come so far,\nand I hope this year brings you many more reasons to be proud of yourself.",
  "Keep your hopes high,\nkeep your heart calm,\nand keep going after the things you believe in.",
  "Some beautiful things are still waiting for you. ✨",
];

// Subtle, private encouragement. Says nothing about work, interviews or dates.
export const journeyWish = {
  heading: "For the journey ahead ✨",
  lines: [
    "May the place you're learning and growing in",
    "bring you people who inspire you,",
    "challenges that make you stronger,",
    "and opportunities that remind you of what you're capable of.",
    "",
    "Keep learning.",
    "Keep building.",
    "Keep believing in yourself.",
    "",
    "You've got this.",
  ],
};

// Calm bridge from the wish into the gifts section.
export const giftTransition = {
  line: "And... I saved a few things for you. 🎁",
  sub: "Three little gifts. Nothing too complicated. Just a few things I thought you might like.",
  button: "Open Your Gifts →",
};

// Your Gifts — each gift can render a list of links, an optional code/domain
// box, a small note, and a subtle delay message.
export const gifts = [
  {
    id: "interview-pass",
    label: "GIFT 01",
    title: "Unlimited Interview Practice 🎁",
    lines: [
      "You normally get one trial.",
      "For you, it's unlimited. ✨",
      "",
      "Use this domain to access unlimited interview practice:",
    ],
    code: "@prephire.com",
    note: "Use this domain/email access when using the platform.",
    delay: "In 2 days, I'll share it with you. ✨",
    button: "Start Practicing →",
    placeholderButton: "Use @prephire.com to practice",
    urlKey: "interviewPlatformUrl",
  },
  {
    id: "openrouter",
    label: "GIFT 02",
    title: "Your Little Coding Superpower ⚡",
    lines: [
      "A little something to make experimenting with AI and coding easier.",
      "",
      "Use this website to explore OpenRouter's available free models and create your own API key.",
    ],
    links: [
      {
        label: "Get Your Free API Key →",
        url: "https://openrouter.ai/docs/quickstart",
      },
    ],
    note: "API access and limits depend on the provider's current free availability and terms.",
  },
  {
    id: "udemy",
    label: "GIFT 03",
    title: "Something New To Learn 📚",
    lines: [
      "I found two courses you can use to learn something new.",
      "",
      "Use either of these links to purchase the available free Udemy course.",
    ],
    links: [
      {
        label: "Course Option 01 →",
        url: "https://www.udemy.com/share/109ExE3@GhG9DkLft6bno_W7x23lqQG_Jbq6a0MJxOyQCDRmf89A99LYcNcmF2wd1hPtfnaI3g==/",
      },
      {
        label: "Course Option 02 →",
        url: "https://www.udemy.com/share/103qFy3@ivkWXaF79_rIZszz_PA7eboTaJXyi8DVlJkWlx0_tkllXSC6djHx3WE-swHId_E7TQ==/",
      },
    ],
    note: "Availability and pricing are controlled by Udemy and may change.",
  },
];
