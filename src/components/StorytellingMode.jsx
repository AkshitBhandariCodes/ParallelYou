"use client"

import { useState, useRef } from "react"
import { BookOpen, Sparkles, RefreshCw, Download, Share2, ChevronDown, ChevronUp } from "lucide-react"

const StorytellingMode = () => {
  const [story, setStory] = useState({
    title: "Echoes of Tomorrow",
    genre: "Cyberpunk Sci-Fi",
    chapters: [
      {
        id: 1,
        title: "Digital Awakening",
        content: `The neon lights of Neo-Tokyo flickered against the rain-slicked streets as ${localStorage.getItem("userName") || "Alex"} made their way through the crowded market district. Holographic advertisements cast an eerie blue glow across their face, reflecting off the neural implant visible at their temple.

"Another power surge," ${localStorage.getItem("userName") || "Alex"} muttered, feeling the familiar tingle of their augmentations recalibrating. The city had been experiencing strange technological phenomena ever since the Quantum Network went online last month.

As if on cue, every screen in the vicinity flickered simultaneously. For a split second, ${localStorage.getItem("userName") || "Alex"} could have sworn they saw their own face staring back at them—but different somehow. More confident. More knowing.

Their comm-link buzzed. An anonymous message: "I've been waiting for you to notice. We need to talk. About the other you."`,
        isExpanded: true,
      },
      {
        id: 2,
        title: "The Mirror Self",
        content: `"Who are you?" ${localStorage.getItem("userName") || "Alex"} demanded, speaking into their comm-link as they ducked into a quiet alley away from the crowd.

"I'm you," the voice replied, distorted yet unmistakably familiar. "Or rather, I'm what you could become. A version of you that made different choices."

${localStorage.getItem("userName") || "Alex"} scoffed. "Parallel universes? That's theoretical physics, not reality."

"The Quantum Network changed that. It's not just connecting devices—it's connecting realities. Thin places where universes touch."

A holographic image materialized from ${localStorage.getItem("userName") || "Alex"}'s comm-link: their own face, but with subtle differences. Eyes that had seen different worlds. A scar that they themselves didn't have.

"The corporation knows," their doppelgänger continued. "They've been using the network to study alternate realities, to predict outcomes, to manipulate timelines. And they've discovered something that terrifies them."

"What?" ${localStorage.getItem("userName") || "Alex"} asked, heart racing.

"In every reality where they succeed, humanity fails. I've seen it. And now they're hunting anyone who knows."`,
        isExpanded: false,
      },
      {
        id: 3,
        title: "Convergence Point",
        content: `The rain intensified as ${localStorage.getItem("userName") || "Alex"} made their way to the rendezvous point—an abandoned quantum research lab on the outskirts of the city. The building stood like a technological graveyard, its once-gleaming surfaces now dull and weathered.

Inside, screens flickered to life as they entered, displaying data streams and parallel timelines. And there, in the center of the room, stood three more versions of themselves from different realities.

"Welcome to the Convergence," said one, a version with mechanical arms and circuitry visible beneath translucent skin. "We don't have much time."

Another version, dressed in what looked like military gear, stepped forward. "In my reality, the corporation succeeded. There's nothing left."

The third, barely more than a holographic presence, spoke with an echoing voice. "In mine, we found a way to fight back. To use the quantum network against them."

${localStorage.getItem("userName") || "Alex"} looked between their alternate selves, the impossible reality of the situation sinking in. "What do we do?"

The first doppelgänger smiled. "We have something they don't. Multiple perspectives. Multiple skills. Multiple chances."

"And," added the military version, placing a device on the central console, "we have the quantum key. With it, we can send a message back through every timeline, to every version of ourselves."

"A message that will change everything," the holographic one finished.

${localStorage.getItem("userName") || "Alex"} felt a strange sense of purpose wash over them. "Then let's get started."`,
        isExpanded: false,
      },
    ],
    worldBuilding: {
      setting: "Neo-Tokyo, 2087",
      keyElements: [
        "Quantum Network: A revolutionary technology connecting devices worldwide, but with unexpected side effects on reality itself.",
        "Neural Implants: Common augmentations that enhance human capabilities and connect directly to the Quantum Network.",
        "The Corporation: Omnipresent entity that controls the Quantum Network and has discovered the ability to view parallel realities.",
        "Reality Convergence: Phenomenon where parallel universes temporarily overlap, allowing interaction between alternate versions of the same person.",
      ],
    },
  })

  const [isGenerating, setIsGenerating] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)
  const [showWorldBuilding, setShowWorldBuilding] = useState(false)
  const storyRef = useRef(null)
  const scrollRef = useRef(null)

  const toggleChapter = (id) => {
    setStory({
      ...story,
      chapters: story.chapters.map((chapter) =>
        chapter.id === id ? { ...chapter, isExpanded: !chapter.isExpanded } : chapter,
      ),
    })
  }

  const generateNewChapter = () => {
    setIsGenerating(true)

    // Simulate generating a new chapter
    setTimeout(() => {
      const newChapter = {
        id: story.chapters.length + 1,
        title: "Digital Resistance",
        content: `The quantum key pulsed with an otherworldly glow as ${localStorage.getItem("userName") || "Alex"} connected it to the central node. Data streams erupted around them, forming a three-dimensional map of interconnected realities.

"Once we activate this," the military version warned, "there's no going back. The Corporation will know exactly where we are."

${localStorage.getItem("userName") || "Alex"} nodded, fingers hovering over the activation sequence. "How long will we have?"

"Minutes at most," the cybernetic version replied, eyes flickering with data. "But if we succeed, time becomes... flexible."

The holographic version placed a translucent hand over ${localStorage.getItem("userName") || "Alex"}'s. "In my reality, we call this the Bifurcation Point. The moment where all possible futures diverge."

With a deep breath, ${localStorage.getItem("userName") || "Alex"} initiated the sequence. The quantum key fragmented, sending particles across the network—across realities.

Alarms blared. Security protocols engaged.

"They're coming," the military version announced, drawing a weapon. "I'll buy us time."

The cybernetic version connected directly to the system. "I'll guide the signal through the network."

The holographic version began to fade. "And I'll ensure the message reaches every version of us."

Left alone at the console, ${localStorage.getItem("userName") || "Alex"} watched as the message began to propagate: a complex code that would reveal the Corporation's plans and provide a defense against them.

Outside, the sound of approaching security forces grew louder. But on the screens, thousands of alternate realities lit up as the message found its mark.

"We did it," ${localStorage.getItem("userName") || "Alex"} whispered, just as the doors burst open.`,
        isExpanded: true,
      }

      setStory({
        ...story,
        chapters: [...story.chapters, newChapter],
      })

      setIsGenerating(false)
    }, 3000)
  }

  const startScrollingEffect = () => {
    if (isScrolling) return

    setIsScrolling(true)

    const scrollElement = scrollRef.current
    if (!scrollElement) return

    const scrollHeight = scrollElement.scrollHeight
    const duration = scrollHeight * 25 // Adjust speed here

    let startTime
    let requestId

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime

      const progress = Math.min(elapsed / duration, 1)
      scrollElement.scrollTop = progress * scrollHeight

      if (progress < 1) {
        requestId = requestAnimationFrame(step)
      } else {
        setIsScrolling(false)
      }
    }

    requestId = requestAnimationFrame(step)

    return () => {
      if (requestId) {
        cancelAnimationFrame(requestId)
        setIsScrolling(false)
      }
    }
  }

  const stopScrollingEffect = () => {
    setIsScrolling(false)
  }

  return (
    <div className="min-h-full bg-gray-900 text-gray-100">
      {/* Header */}
      <div className="border-b border-gray-800 p-6 bg-gray-900">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="p-2 bg-indigo-900 rounded-lg mr-3">
              <BookOpen className="h-6 w-6 text-indigo-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-indigo-400">{story.title}</h2>
              <p className="text-gray-400 mt-1">A personalized {story.genre} story based on your digital twin</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors">
              <Download className="h-5 w-5 text-gray-400" />
            </button>
            <button className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors">
              <Share2 className="h-5 w-5 text-gray-400" />
            </button>
            <button
              className="px-4 py-2 bg-indigo-700 hover:bg-indigo-600 text-white rounded-lg transition-colors flex items-center"
              onClick={generateNewChapter}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate Next Chapter
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Story Content */}
        <div className="lg:col-span-2">
          <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
            <div className="p-4 border-b border-gray-700 flex justify-between items-center">
              <h3 className="text-lg font-medium text-white">Story Narrative</h3>
              <div className="flex space-x-2">
                <button
                  className={`p-2 rounded-lg ${isScrolling ? "bg-indigo-700 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"} transition-colors`}
                  onClick={isScrolling ? stopScrollingEffect : startScrollingEffect}
                >
                  {isScrolling ? "Stop Scrolling" : "Auto-Scroll"}
                </button>
              </div>
            </div>
            <div
              ref={scrollRef}
              className="p-6 max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900"
            >
              <div ref={storyRef} className="space-y-8">
                {story.chapters.map((chapter) => (
                  <div key={chapter.id} className="space-y-4">
                    <div
                      className="flex justify-between items-center cursor-pointer"
                      onClick={() => toggleChapter(chapter.id)}
                    >
                      <h4 className="text-xl font-bold text-indigo-400">
                        Chapter {chapter.id}: {chapter.title}
                      </h4>
                      {chapter.isExpanded ? (
                        <ChevronUp className="h-5 w-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                    {chapter.isExpanded && (
                      <div className="text-gray-300 leading-relaxed whitespace-pre-line">{chapter.content}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* World Building */}
        <div className="lg:col-span-1">
          <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
            <div
              className="p-4 border-b border-gray-700 flex justify-between items-center cursor-pointer"
              onClick={() => setShowWorldBuilding(!showWorldBuilding)}
            >
              <h3 className="text-lg font-medium text-white">World Building</h3>
              {showWorldBuilding ? (
                <ChevronUp className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              )}
            </div>
            {showWorldBuilding && (
              <div className="p-6 space-y-6">
                <div>
                  <h4 className="text-indigo-400 font-medium mb-2">Setting</h4>
                  <p className="text-gray-300">{story.worldBuilding.setting}</p>
                </div>
                <div>
                  <h4 className="text-indigo-400 font-medium mb-2">Key Elements</h4>
                  <ul className="space-y-3">
                    {story.worldBuilding.keyElements.map((element, index) => (
                      <li key={index} className="text-gray-300 flex">
                        <span className="text-indigo-400 mr-2">•</span>
                        <span>{element}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-gray-900 rounded-lg p-4 border border-indigo-900/30">
                  <div className="flex items-center mb-2">
                    <Sparkles className="h-4 w-4 text-indigo-400 mr-2" />
                    <h4 className="text-indigo-400 font-medium">AI-Generated Visualization</h4>
                  </div>
                  <p className="text-gray-400 text-sm mb-3">
                    A visual representation of the story world based on the narrative
                  </p>
                  <div className="aspect-video bg-gray-700 rounded-lg overflow-hidden flex items-center justify-center">
                    <img
                      src="/placeholder.svg?height=300&width=500"
                      alt="AI-generated visualization of Neo-Tokyo"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 bg-gradient-to-r from-indigo-900 to-purple-900 rounded-xl p-6">
            <div className="flex items-start">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white">Personalize Your Story</h3>
                <p className="mt-1 text-gray-300">Customize the narrative based on your preferences and personality</p>
              </div>
              <button className="px-4 py-2 bg-white text-indigo-900 rounded-lg hover:bg-gray-100 transition-colors font-medium">
                Customize
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StorytellingMode

