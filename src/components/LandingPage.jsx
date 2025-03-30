"use client"
import { useNavigate } from "react-router-dom"
import { ChevronRight, Sparkles, Zap, Globe } from "lucide-react"

const LandingPage = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-gray-900 to-gray-900 z-0"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=800')] bg-center opacity-5 z-0"></div>

        <div className="max-w-4xl w-full text-center relative z-10">
          <div className="inline-block mb-6 px-4 py-1.5 bg-gray-800/50 rounded-full border border-gray-700 backdrop-blur-sm">
            <span className="text-sm font-medium text-gray-300 flex items-center justify-center">
              <Sparkles className="h-4 w-4 mr-2 text-cyan-400" />
              Discover your alternate universe self
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">
            Meet Your AI Doppelgänger from Another Universe!
          </h1>

          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Explore a version of yourself from a parallel dimension. Discover their story, appearance, and even chat
            with them in real-time.
          </p>

          <button
            onClick={() => navigate("/create")}
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-medium text-lg shadow-lg shadow-purple-500/25 hover:shadow-purple-500/50 transition-all duration-300 flex items-center justify-center mx-auto group"
          >
            Discover Your Parallel Self
            <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
            Explore the Multiverse of You
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-cyan-500/50 transition-all duration-300">
              <div className="h-12 w-12 rounded-lg bg-cyan-500/20 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-cyan-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">AI-Generated Identity</h3>
              <p className="text-gray-300">
                Advanced AI creates a unique alternate version of you with its own appearance, backstory, and
                personality.
              </p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
              <div className="h-12 w-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Parallel Universe</h3>
              <p className="text-gray-300">
                Discover how your life might have unfolded in a different reality with alternate choices and
                circumstances.
              </p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-pink-500/50 transition-all duration-300">
              <div className="h-12 w-12 rounded-lg bg-pink-500/20 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-pink-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Interactive Conversations</h3>
              <p className="text-gray-300">
                Chat with your doppelgänger in real-time and hear their voice through advanced AI speech synthesis.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LandingPage

