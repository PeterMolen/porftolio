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
  title: "Foodaify — AI, food ordering & restaurant platform",
  description:
    "A scalable AI-first B2B/B2C SaaS, a complete, database-driven food ordering system for restaurants featuring the AI assistant (AIVA), foodaify Phone, traditional checkout, OCR-powered menu scanning, geolocation-based restaurant search, real-time order management, and a powerful admin dashboard.",

  coreFeatures: [
    "✅ Customer can choose Classic Checkout, Orderbot checkout or call the restaurant through us",
    "✅ Classic checkout with cart management and product combinations",
    "✅ Foodaify phone — Live WebSocket communication",
    "✅ Foodaify phone — Add notes while talking",
    "✅ Stripe payments (cards + Klarna via Stripe integration)",
    "✅ Role-based access (customer, restaurant_owner, admin) in both frontend and backend",
    "✅ Real-time order management (pending / paid / processing / done / cancelled)",
    "✅ Admin can extend delivery time; customer sees updates instantly in their profile",
    "✅ Customer profile with order history, status tracking, delivery address & receipts",
    "✅ OCR-based menu scanning (PDF/IMG ➝ structured menu) with validation",
    "✅ Geolocation: find restaurants within a specified radius from user address",
    "✅ Dynamic open/close state — sections automatically disable after closing hours",
    "✅ Distance validation: alerts if user’s address is outside delivery range",
    "✅ Separate pickup/delivery logic per restaurant with time window control",
    "✅ Restaurant owners can onboard easily, manage menus, and invite admins",
    "✅ Restaurant dashboard with live analytics, order management & menu tools",
    "✅ Analytics & insights powered by Groq/OpenAI — trending dishes, peak hours, avg. receipts",
    "✅ Fully dynamic and data-driven through MongoDB (no hardcoded content)",
    "✅ Secure JWT authentication with both backend & frontend validation",
    "✅ Implemented full authentication system (Email/Password + Google OAuth)",
    "✅ Includes register, login, forgot/reset password, and JWT-based sessions.",
    "✅ RESTful API design with structured routes, webhooks, and activity logging"
  ],

  tech: [
    "Backend: Python (FastAPI), Motor (MongoDB driver), Pydantic",
    "Database: MongoDB",
    "Frontend: Next.js + React, Tailwind CSS",
    "Payments: Stripe (cards + Klarna via Stripe)",
    "AI/LLM: OpenAI + Groq (analytics & AIVA intelligence)",
    "OCR/Parsing: OpenCV, Tesseract, PyMuPDF",
    "Geolocation: geopy (distance & coordinates)",
    "Auth: JWT (role-based access control)",
    "Realtime: WebSockets / Server-Sent Events (live order updates)",
    "Email: SendGrid (receipts & notifications)",
    "Build/Dev: Uvicorn, Watchfiles",
    "REST API routes, OOP structure, modular service-layer architecture"
  ],

  youtubeId: "VjqMXal_aEY",
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
//"https://github.com/PeterMolen/AI-Receipt-Analysis" // om jag vill visa sour code
},
    {
  title: "AI-powered Customer Support System (upcoming)",
  description: "An AI-driven full-stack customer support platform to automate FAQs, classify tickets, and escalate complex issues to human agents.",
  coreFeatures: [
    "✅ Automated FAQ responses trained on company knowledge base",
    "✅ Ticket classification (billing, technical, product, complaints)",
    "✅ Escalation system with AI confidence scoring",
    "✅ Dashboard for support team to manage tickets & AI suggestions",
    "✅ User role-based access (admin, support agent)",
    "✅ Logs & history of AI and human responses",
    "✅ Analytics & insights on ticket trends",
    "✅ Multi-channel integration (Email, Chat, Slack, WhatsApp)",
    "✅ Continuous learning loop from human edits"
  ],
  tech: [
    "Python (Flask / FastAPI for backend AI API)",
    "Javascript (Next.js) + React (frontend)",
    "LLM ((Large Language Models)",
    "NLP Natural Language Processing.",
    "Data Import via CSV/JSON",
    "Tailwind CSS, Daisy",
    "MongoDB + Mongoose",
    "JWT Authentication & role-based access control",
    "Socket.io (for live chat integration)",
    "Recharts (analytics & dashboards)",
    "REST API routes",
    "OOP structure",
    "Edit chat theme your self",
    "Admin panel for managing FAQ, settings"
  ],
  // videoUrl: "/assets/support-bot-demo.mp4",
  // youtubeId: "GamgzJs4tzo",
  // sourceCode: "Ask"
},
];
