export const projectDetails = [
  {
    id: "netraku",
    title: "Netraku",
    subtitle: "AI Vision Assistant for the Visually Impaired",
    category: "AI & Accessibility",
    date: "2024",
    techStack: ["React", "TensorFlow.js", "PWA", "Web Speech API", "Tailwind CSS"],
    overview:
      "Netraku is a Progressive Web App (PWA) designed to assist visually impaired individuals by providing real-time object detection and currency recognition directly from their mobile browser. It leverages on-device AI to ensure privacy and offline capability.",
    challenges: [
      {
        title: "Real-time Latency on Mobile",
        description:
          "Running computer vision models in the browser on low-end mobile devices caused significant lag, making the app unusable for real-world navigation.",
      },
      {
        title: "Offline Functionality",
        description:
          "Users needed to use the app in areas with poor internet connection, requiring the AI models to be cached and run entirely client-side.",
      },
      {
        title: "Accessible UI/UX",
        description:
          "Designing an interface for users who cannot see the screen required a completely different approach, relying heavily on voice feedback and haptic cues.",
      },
    ],
    solutions: [
      {
        title: "TensorFlow.js Optimization",
        description:
          "Implemented model quantization and WebGL backend acceleration to reduce inference time to under 100ms on average smartphones.",
      },
      {
        title: "PWA Service Workers",
        description:
          "Used advanced caching strategies to store the heavy AI models locally, allowing the app to function fully offline after the first load.",
      },
      {
        title: "Voice-First Interface",
        description:
          "Integrated Web Speech API for continuous audio feedback and implemented a full-screen touch gesture system for easier control without needing precise buttons.",
      },
    ],
    features: [
      "Real-time object detection via camera feed",
      "Indonesian Rupiah currency recognition",
      "Text-to-Speech (TTS) audio feedback",
      "Offline support (PWA)",
      "Dark mode optimized for battery saving",
    ],
    links: {
      demo: "https://netraku.my.id/",
      github: "", // Private repo or empty if not applicable
    },
    images: {
      hero: "/assets/images/netra-preview.png", // Ensure this path matches actual asset
      gallery: [],
    },
  },
];
