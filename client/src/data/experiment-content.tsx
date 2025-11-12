import { ReactNode } from 'react';
import { ImageGallery } from '@/components/image-gallery';

// Import Mister Misu images
import fm1 from "@assets/1_1755009695189.png";
import fm2 from "@assets/2_1755009695190.png";
import fm5 from "@assets/01_1755014357426.png";
import fm6 from "@assets/02_1755014357425.png";
import fm7 from "@assets/03_1755014357425.png";
import fm8 from "@assets/04_1755014357427.png";
import fm9 from "@assets/05_1755014357426.png";
import fm10 from "@assets/06_1755014357426.jpg";
import fm11 from "@assets/07_1755014357426.png";

// Import Friday Home assets
import fridayHome1 from "@assets/WCS08751_1755656112838.jpg";
import fridayHome2 from "@assets/WCS08762_1755656112839.jpg";
import fridayHome3 from "@assets/WCS08732_1755656112839.jpg";
import fridayHomePoster from "@assets/Friday-Home_F_1755656751713.jpg";
import fridayHomeAudio from "@assets/Moonlight_1755656112839.mp3";
import girlInGreyAudio from "@assets/girl-in-grey_1755666353648.mp3";
import butterfliesAudio from "@assets/butterflies_1755666353648.mp3";

export interface ExperimentEvent {
  title: string;
  date: string;
  content: string;
  images?: string[];
  additionalAssets?: Array<{ type: string; name: string; url: string }>;
}

export interface ExperimentContent {
  fullDescription?: string;
  events?: ExperimentEvent[];
  playlist?: Array<{ title: string; url: string }>;
  customContent?: ReactNode;
}

export const experimentContentMap: Record<string, ExperimentContent> = {
  'mister-misu-1': {
    fullDescription: "A collection of coffee pop-ups that aim to make specialty coffee more accessible to the masses, exploring how we might talk about tasting and how we might communicate flavours through alternative visuals and storytelling.",
    events: [
      {
        title: "Personifying Coffees",
        images: [fm1, fm2],
        date: "June 2025",
        content: "We leveraged ChatGPT to define personas/personality traits + shape AI prompts to generate images for each coffee we served."
      },
      {
        title: "Flavour Notes Illustrations + Frozen Archives",
        images: [fm5, fm6, fm7, fm8, fm9, fm10, fm11],
        date: "December 2024",
        content: "Inspired by Hydrangea Coffee (a California-based roaster), we experimented with AI image generation to visualize the flavor notes of each coffee, helping guests better imagine what they were tasting. Beyond the Base Menu, I had also been freezing my favorite coffees throughout the year and wanted to share those with my guests. We brewed all of them, creating a unique chance to taste and compare a wide range of coffees side by side. Many first-time tasters said that experiencing so many coffees in one sitting was a fun and memorable way to learn about different flavors and notes."
      }
    ]
  },
  'friday-home-1': {
    fullDescription: "Tony and I had an idea for a band that was about more than just the music. Sure, we drew from our favourites—Daniel Caesar, Theo Katzman, Lizzy McAlpine, John Mayer, Anderson .Paak, and many more. But what we really wanted was to capture a feeling: the kind of night where you stay in with friends, share a cozy dinner, sink into the couch for long conversations, sing a few songs, play games, and suddenly realize it's 4 a.m. This is Friday Home.",
    events: [
      {
        title: "Our First Live Show",
        images: [fridayHomePoster, fridayHome1, fridayHome2, fridayHome3],
        date: "June 11, 2023",
        content: "We performed a house concert for close friends and family, debuting 2 sets of original music.",
        additionalAssets: [
          { type: 'audio', name: 'Moonlight (Live June 11, 2023)', url: fridayHomeAudio }
        ]
      }
    ],
    playlist: [
      { title: "Girl in Grey (Live at Mel's)", url: girlInGreyAudio },
      { title: "Butterflies (Live at Mel's)", url: butterfliesAudio },
      { title: "Moonlight (Live at Mel's)", url: fridayHomeAudio }
    ]
  },
  'boyfriend-material-1': {
    fullDescription: "An AI-powered relationship assistant that helps you become a more thoughtful partner through personalized insights and expert-backed advice. This is a preview of the landing page experience.",
    // Boyfriend Material has a complex custom UI, so we'll just show the description for now
    // The full landing page can be accessed via the route if needed
  },
  'prompt-pulse-1': {
    fullDescription: "An automation tool for AI Prompt Monitoring that sends notifications when key metrics change.",
    // Placeholder content - can be expanded later
  },
  'food-for-thought-1': {
    fullDescription: "A serious game designed to codify and facilitate an innovation process for a Fortune 100 alcoholic beverage company.",
    // Placeholder content - can be expanded later
  },
  'lew-wu-1': {
    fullDescription: "Underground Supper Club",
    // Placeholder content - can be expanded later
  }
};

