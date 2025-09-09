export interface Project {
  title: string;
  description: string;
  tech: string[];
  videoUrl?: string;
  liveDemo?: string;
  coreFeatures?: string[];
  youtubeId?: string;  
  sourceCode?: string;
}

export const projects: Project[] = [
  {
      title: "🏫 Youth Centre App + AI stats + AI Chatbot",
      description: "A full-stack youth centre web application",
      coreFeatures: [
        "✅ User registration & login with role-based authentication",
        "✅ Check-in system for users",
        "✅ Admin panel with content management",
        "✅ News feed management (create, edit, delete posts)",
        "✅ Hero slider (upload and manage slides)",
        "✅ Activity voting system",
        "✅ Multiplayer quiz with Socket.io",
        "✅ AI-powered statistics with charts",
        "✅ AI chatbot for instant support and insights",
      ],
      tech: [
        "TypeScript",
        "Next.js",
        "React",
        "Tailwind CSS",
        "Material UI",
        "MongoDB + Mongoose",
        "JWT Authentication",
        "Socket.io (multiplayer quiz)",
        "Recharts",
        "OpenAI API (Chatbot + statistics-AI)",
        "REST API routes",
        "OOP structure",
        "Admin panel",
        "Role-based access control",
      ],
      // videoUrl: "/assets/youth-centre-demo.mp4",
      youtubeId: "GamgzJs4tzo",
      sourceCode: "ask",
    },

    {
    title: "👟 E-commerce + AI stats + AI Chatbot",
    description: "Perfume webstore with AI statistics and AI chatbot.",
        coreFeatures: [
      "✅ Products & Variants",
      "✅ Checkout & Payment via Stripe",
      "✅ Order Management for Admin",
      "✅ Statistics with Graphs & AI",
      "✅ AI-powered Chatbot",
      "✅ Easy to add other payments like Klarna and swish",
    ],
    tech: [
      "Javascript",
      "Next.js",
      "React",
      "Tailwind CSS",
      "Stripe & Stripe CLI",
      "Material UI",
      "MongoDB + Mongoose",
      "NextAuth (Auth system)",
      "Recharts / Chart.js",
      "OpenAI API (Chatbot + statistics-AI)",
      "API routes (REST)",
      "OOP",
      "Adminpanel",
      "inventory management",
      "User management",
      "product management",
    ],
    // videoUrl: "/assets/ecomerse-demo.mp4",
    youtubeId: "KgEwT11yUOQ",
    sourceCode: "ask"
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
    "Python",
    "JavaScript",
    "Whisper",
    "OpenAI",
    "ElevenLabs",
    "Flask",
    "MongoDB",
    "GridFS",
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
    "Jinja",
  ],
  // videoUrl: "/assets/transcript-demo.mp4",
  youtubeId: "-npB2RgsW1E",
  sourceCode: "ask"
},

{
  title: "🧾 AI Receipt Analysis",
  description: "OCR + AI automatically summarizes receipts.",
  coreFeatures: [
"✅ Capture receipt image with the in-app camera",
"✅ Upload receipt image to backend via POST /analyze-receipt",
"✅ AI analysis (OCR + GPT-4) to extract and structure receipt data",
"✅ Display results in the app: store, date, and list of products with prices",
"✅ Error handling with clear feedback if upload or analysis fails",
],
  tech: [
    "JavaScript",
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
    "dotenv",
    "CORS",
  ],
  // videoUrl: "/assets/kvitto-demo.mp4",
  youtubeId: "onzdu8CxDmo",
  sourceCode: "https://github.com/PeterMolen/AI-Receipt-Analysis"
},


];
