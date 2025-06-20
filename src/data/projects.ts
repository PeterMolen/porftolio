export interface Project {
  title: string;
  description: string;
  tech: string[];
  github: string;
  videoUrl?: string;
  liveDemo?: string;
  coreFeatures?: string[];
}


export const projects: Project[] = [
  {
    title: "🧾 AI Receipt Analysis",
    description: "OCR + AI automatically summarizes receipts.",
    tech: [
      "React Native",
      "Expo Go",
      "Express",
      "Node.js",
      "MongoDB",
      "Mongoose",
      "GridFS",
      "Ngrok",
      "Multer",
      "OpenAI API",
      "Tesseract.js",
      "HTML",
      "CSS",
      "JavaScript",
      "dotenv",
      "CORS",
    ],
    github: "https://github.com/dittrepo/kvitto-app",
    videoUrl: "/assets/kvitto-demo.mp4",
  },
  {
    title: "🧠 AI Transcription & Editing Tool",
    description: "AI transcription tool for podcasts.",
    coreFeatures: [
    "✅ AI-powered transcription – Converts audio and video to text with speaker recognition",
    "✅ AI-driven audio enhancement – Removes noise, improves clarity, and balances audio levels",
    "✅ AI-powered audio & video cutting – Automated and manual editing options",
    "✅ Automatic detection of filler words & long pauses – Removes unnecessary parts from audio",
    "✅ AI-generated show notes & marketing snippets – Creates summaries and highlights",
    "✅ Export edited files in multiple formats – Download optimized versions",
    ],

    tech: [
      "Whisper",
      "OpenAI",
      "ElevenLabs",
      "Flask",
      "MongoDB",
      "GridFS",
      "Python",
      "Miniconda",
      "FFmpeg",
      "Pydub",
      "MoviePy",
      "Librosa",
      "TorchAudio",
      "Matplotlib",
      "NumPy",
      "Streamlit",
      "HTML",
      "CSS",
      "JavaScript",
      "Jinja",
    ],
    github: "https://github.com/dittrepo/transcription-app",
    videoUrl: "/assets/transcript-demo.mp4",
  },
  {
    title: "👟 E-commerce + AI Chattbot",
    description: "Skobutik med AI-rekommendationer via chatbot.",
    tech: ["React",
         "LangChain", 
         "Express", 
         "OpenAI API",
        "MongoDB",
        "GridFS",
        "Python",
        "Miniconda",
        "FFmpeg",
        "Pydub",
        "MoviePy",
        "Librosa",
        "TorchAudio",
        "Matplotlib",
        "NumPy",
        "Streamlit",
        "HTML",
        "CSS",
        "JavaScript",
        "Jinja",
        ],
    github: "https://github.com/dittrepo/shoe-ai-shop",
    videoUrl: "/assets/ecomerse-demo.mp4",
  },
];
