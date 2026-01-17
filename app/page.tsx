export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              CodeQuest
            </h1>
            <p className="text-2xl text-gray-300">
              Master competitive programming through real-time battles and AI-powered coaching
            </p>
          </div>

          {/* Description */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 space-y-4">
            <h2 className="text-2xl font-bold text-cyan-400">Project Overview</h2>
            <p className="text-gray-300 leading-relaxed">
              CodeQuest is a full-stack competitive programming platform featuring real-time multiplayer battles,
              ELO-based rankings, AI-powered tutoring, and gamification. The frontend has been redesigned with modern
              aesthetics, smooth animations, and enhanced accessibility.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <h3 className="text-cyan-400 font-bold mb-2">Frontend</h3>
                <p className="text-sm text-gray-400">React + Vite + Tailwind CSS</p>
                <p className="text-sm text-gray-400 mt-2">Modern, polished UI with Framer Motion animations</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <h3 className="text-cyan-400 font-bold mb-2">Backend</h3>
                <p className="text-sm text-gray-400">Node.js + Express + MongoDB</p>
                <p className="text-sm text-gray-400 mt-2">Real-time features with Socket.io</p>
              </div>
            </div>
          </div>

          {/* Key Features */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Redesigned Features</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { title: "1v1 Duels", desc: "Real-time competitive matches" },
                { title: "AI Tutor", desc: "Personalized feedback & hints" },
                { title: "Leaderboards", desc: "Global and college rankings" },
                { title: "Gamification", desc: "XP, coins, badges & streaks" },
                { title: "Smooth Animations", desc: "Framer Motion micro-interactions" },
                { title: "Accessible Design", desc: "WCAG AA compliant" },
              ].map((feature, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition">
                  <h3 className="font-bold text-cyan-400">{feature.title}</h3>
                  <p className="text-sm text-gray-400 mt-1">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Project Structure */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 text-left space-y-4">
            <h3 className="text-xl font-bold text-cyan-400">Project Structure</h3>
            <pre className="text-sm text-gray-300 overflow-x-auto">
              {`CodeQuest/
├── frontend/              # React + Vite app
│   ├── src/
│   │   ├── pages/        # All redesigned pages
│   │   ├── components/   # Navbar, PageTransition, etc.
│   │   ├── contexts/     # Auth, Socket contexts
│   │   ├── utils/        # Animation tokens & helpers
│   │   └── hooks/        # Custom hooks
│   ├── tailwind.config.js # Enhanced color palette
│   └── index.html        # Entry point
├── config/               # Backend config
├── routes/               # Express routes
├── models/               # MongoDB schemas
├── services/             # Business logic
└── server.js             # Express app`}
            </pre>
          </div>

          {/* Documentation Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Documentation</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <a
                href="/REDESIGN_NOTES.md"
                className="bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-400/50 text-cyan-400 rounded-lg p-4 transition font-semibold"
              >
                Design System
              </a>
              <a
                href="/frontend/ACCESSIBILITY.md"
                className="bg-blue-500/10 hover:bg-blue-500/20 border border-blue-400/50 text-blue-400 rounded-lg p-4 transition font-semibold"
              >
                Accessibility
              </a>
              <a
                href="/FEATURES.md"
                className="bg-purple-500/10 hover:bg-purple-500/20 border border-purple-400/50 text-purple-400 rounded-lg p-4 transition font-semibold"
              >
                Features
              </a>
            </div>
          </div>

          {/* Implementation Notes */}
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-6 space-y-3">
            <h3 className="font-bold text-amber-400">Setup Instructions</h3>
            <div className="text-left space-y-2 text-sm text-gray-300">
              <p>
                1. Navigate to the <code className="bg-black/30 px-2 py-1 rounded">frontend</code> directory
              </p>
              <p>
                2. Run <code className="bg-black/30 px-2 py-1 rounded">npm install</code>
              </p>
              <p>
                3. Run <code className="bg-black/30 px-2 py-1 rounded">npm run dev</code> to start Vite dev server
              </p>
              <p>
                4. Open <code className="bg-black/30 px-2 py-1 rounded">http://localhost:5173</code>
              </p>
              <p className="mt-4">For the backend, start the Express server separately (see START_SERVERS.md)</p>
            </div>
          </div>

          {/* Key Improvements */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Key Improvements</h2>
            <ul className="text-left space-y-2 text-gray-300 max-w-2xl mx-auto">
              <li className="flex gap-3">
                <span className="text-cyan-400 font-bold">✓</span>
                <span>
                  <strong>Modern Design:</strong> Glassmorphism with soft gradients and subtle shadows
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-cyan-400 font-bold">✓</span>
                <span>
                  <strong>Smooth Animations:</strong> Framer Motion for page transitions and micro-interactions
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-cyan-400 font-bold">✓</span>
                <span>
                  <strong>Accessibility:</strong> WCAG AA compliant with keyboard navigation and ARIA labels
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-cyan-400 font-bold">✓</span>
                <span>
                  <strong>Responsive:</strong> Mobile-first design works from 320px to 2560px
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-cyan-400 font-bold">✓</span>
                <span>
                  <strong>Performance:</strong> GPU-accelerated animations, optimized re-renders
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-cyan-400 font-bold">✓</span>
                <span>
                  <strong>Enhanced UX:</strong> Match found countdown, navigation guards, smooth modals
                </span>
              </li>
            </ul>
          </div>

          {/* Footer */}
          <div className="pt-8 border-t border-white/10 text-gray-400 text-sm">
            <p>CodeQuest Frontend Redesign - Production Ready</p>
            <p className="mt-2">Built with React, Vite, Tailwind CSS, and Framer Motion</p>
          </div>
        </div>
      </div>
    </div>
  )
}
