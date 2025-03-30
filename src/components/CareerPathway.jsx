"use client"

import { useState } from "react"
import { Briefcase, BookOpen, Award, TrendingUp, ChevronRight, ExternalLink } from "lucide-react"

const CareerPathway = () => {
  const [activeTab, setActiveTab] = useState("jobs")

  const skills = [
    { name: "Data Analysis", progress: 65, category: "Technical" },
    { name: "Machine Learning", progress: 42, category: "Technical" },
    { name: "Project Management", progress: 78, category: "Soft Skills" },
    { name: "Public Speaking", progress: 50, category: "Soft Skills" },
    { name: "Python Programming", progress: 85, category: "Technical" },
    { name: "UI/UX Design", progress: 30, category: "Design" },
  ]

  const recommendedJobs = [
    {
      title: "Data Scientist",
      company: "TechCorp Inc.",
      match: 87,
      skills: ["Python", "Machine Learning", "Data Analysis"],
      description: "Apply advanced analytics to solve complex business problems.",
    },
    {
      title: "Product Manager",
      company: "InnovateTech",
      match: 82,
      skills: ["Project Management", "User Research", "Strategy"],
      description: "Lead cross-functional teams to deliver innovative products.",
    },
    {
      title: "UX Researcher",
      company: "DesignHub",
      match: 75,
      skills: ["User Testing", "Data Analysis", "Interviewing"],
      description: "Conduct research to inform product design decisions.",
    },
  ]

  const learningResources = [
    {
      title: "Advanced Machine Learning Specialization",
      platform: "Coursera",
      duration: "3 months",
      level: "Intermediate",
      match: 92,
      image: "/placeholder.svg?height=80&width=120",
    },
    {
      title: "Product Management Certification",
      platform: "Udemy",
      duration: "6 weeks",
      level: "Beginner to Intermediate",
      match: 88,
      image: "/placeholder.svg?height=80&width=120",
    },
    {
      title: "Data Science Bootcamp",
      platform: "LinkedIn Learning",
      duration: "8 weeks",
      level: "Intermediate",
      match: 85,
      image: "/placeholder.svg?height=80&width=120",
    },
  ]

  const renderProgressBar = (progress) => {
    return (
      <div className="w-full bg-gray-800 rounded-full h-2.5">
        <div
          className="h-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    )
  }

  return (
    <div className="min-h-full bg-gray-900 text-gray-100">
      {/* Header */}
      <div className="border-b border-gray-800 p-6">
        <h2 className="text-2xl font-bold text-cyan-400">Career Pathway</h2>
        <p className="text-gray-400 mt-1">AI-powered career guidance based on your digital twin</p>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Summary Card */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold text-white">Career Compatibility Analysis</h3>
              <p className="text-gray-400 mt-1">Based on your skills, interests, and personality profile</p>
            </div>
            <div className="flex items-center bg-gray-900 rounded-lg p-3 border border-cyan-900">
              <div className="mr-3">
                <div className="text-xs text-gray-400">Career Match</div>
                <div className="text-2xl font-bold text-cyan-400">87%</div>
              </div>
              <div className="h-12 w-12 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-800 mb-6">
          <button
            className={`px-4 py-2 font-medium text-sm flex items-center ${
              activeTab === "jobs" ? "text-cyan-400 border-b-2 border-cyan-400" : "text-gray-400 hover:text-gray-300"
            }`}
            onClick={() => setActiveTab("jobs")}
          >
            <Briefcase className="h-4 w-4 mr-2" />
            Recommended Jobs
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm flex items-center ${
              activeTab === "skills" ? "text-cyan-400 border-b-2 border-cyan-400" : "text-gray-400 hover:text-gray-300"
            }`}
            onClick={() => setActiveTab("skills")}
          >
            <Award className="h-4 w-4 mr-2" />
            Skills Analysis
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm flex items-center ${
              activeTab === "learning"
                ? "text-cyan-400 border-b-2 border-cyan-400"
                : "text-gray-400 hover:text-gray-300"
            }`}
            onClick={() => setActiveTab("learning")}
          >
            <BookOpen className="h-4 w-4 mr-2" />
            Learning Resources
          </button>
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {/* Jobs Tab */}
          {activeTab === "jobs" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedJobs.map((job, index) => (
                <div
                  key={index}
                  className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden hover:border-cyan-700 transition-colors"
                >
                  <div className="p-5">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{job.title}</h3>
                        <p className="text-gray-400">{job.company}</p>
                      </div>
                      <div className="bg-gray-900 rounded-lg px-2 py-1 border border-cyan-900">
                        <span className="text-cyan-400 font-medium">{job.match}% Match</span>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm mt-3">{job.description}</p>
                    <div className="mt-4">
                      <div className="text-xs text-gray-400 mb-2">Required Skills</div>
                      <div className="flex flex-wrap gap-2">
                        {job.skills.map((skill, i) => (
                          <span key={i} className="px-2 py-1 bg-gray-700 text-xs rounded-md text-gray-300">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-gray-700 p-4">
                    <button className="w-full py-2 bg-cyan-900 hover:bg-cyan-800 text-cyan-100 rounded-lg transition-colors flex items-center justify-center">
                      <span>View Details</span>
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Skills Tab */}
          {activeTab === "skills" && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <h3 className="text-lg font-semibold text-white mb-4">Your Skills Growth</h3>
                  <div className="space-y-6">
                    {skills.map((skill, index) => (
                      <div key={index}>
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-300">{skill.name}</span>
                          <span className="text-cyan-400 font-medium">{skill.progress}%</span>
                        </div>
                        {renderProgressBar(skill.progress)}
                        <div className="flex justify-between mt-1">
                          <span className="text-xs text-gray-500">{skill.category}</span>
                          {skill.progress > 70 && <span className="text-xs text-green-400">Advanced</span>}
                          {skill.progress > 40 && skill.progress <= 70 && (
                            <span className="text-xs text-yellow-400">Intermediate</span>
                          )}
                          {skill.progress <= 40 && <span className="text-xs text-blue-400">Beginner</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <h3 className="text-lg font-semibold text-white mb-4">Recommended Skill Focus</h3>
                  <div className="space-y-4">
                    <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center mr-3">
                          <BookOpen className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-medium text-white">Machine Learning</h4>
                          <p className="text-xs text-gray-400">High demand in your field</p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="text-xs text-gray-400 mb-1">Current Progress</div>
                        {renderProgressBar(42)}
                      </div>
                      <div className="mt-3 flex justify-between items-center">
                        <span className="text-xs text-gray-400">Estimated time to advance: 3 months</span>
                        <button className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center">
                          View Resources <ChevronRight className="h-3 w-3 ml-1" />
                        </button>
                      </div>
                    </div>

                    <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-pink-500 to-red-500 flex items-center justify-center mr-3">
                          <Award className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-medium text-white">UI/UX Design</h4>
                          <p className="text-xs text-gray-400">Complements your technical skills</p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="text-xs text-gray-400 mb-1">Current Progress</div>
                        {renderProgressBar(30)}
                      </div>
                      <div className="mt-3 flex justify-between items-center">
                        <span className="text-xs text-gray-400">Estimated time to advance: 4 months</span>
                        <button className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center">
                          View Resources <ChevronRight className="h-3 w-3 ml-1" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-gradient-to-r from-cyan-900 to-indigo-900 rounded-xl p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="mb-4 md:mb-0">
                    <h3 className="text-lg font-semibold text-white">Your Parallel You has mastered these skills</h3>
                    <p className="text-gray-300 mt-1">
                      Your digital twin shows you can excel in these areas with focused effort
                    </p>
                  </div>
                  <button className="px-4 py-2 bg-white text-indigo-900 rounded-lg hover:bg-gray-100 transition-colors font-medium">
                    View Detailed Analysis
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Learning Resources Tab */}
          {activeTab === "learning" && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {learningResources.map((resource, index) => (
                  <div
                    key={index}
                    className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden hover:border-cyan-700 transition-colors"
                  >
                    <div className="h-40 bg-gray-700 relative">
                      <img
                        src={resource.image || "/placeholder.svg"}
                        alt={resource.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-gray-900 rounded-lg px-2 py-1 border border-cyan-900">
                        <span className="text-cyan-400 font-medium">{resource.match}% Match</span>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent h-16"></div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center mb-2">
                        <span className="px-2 py-1 bg-cyan-900 text-xs rounded-md text-cyan-100">
                          {resource.platform}
                        </span>
                        <span className="ml-2 text-xs text-gray-400">{resource.duration}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-white">{resource.title}</h3>
                      <p className="text-gray-400 text-sm mt-1">Level: {resource.level}</p>
                    </div>
                    <div className="border-t border-gray-700 p-4 flex justify-between">
                      <button className="py-2 px-4 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors">
                        Save for Later
                      </button>
                      <button className="py-2 px-4 bg-cyan-700 hover:bg-cyan-600 text-white rounded-lg transition-colors flex items-center">
                        <span>Visit</span>
                        <ExternalLink className="h-4 w-4 ml-1" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 col-span-1 md:col-span-3">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="mb-4 md:mb-0">
                      <h3 className="text-lg font-semibold text-white flex items-center">
                        <BookOpen className="h-5 w-5 mr-2 text-cyan-400" />
                        Learning Platforms
                      </h3>
                      <p className="text-gray-400 mt-1">Connect your accounts to track progress across platforms</p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors flex items-center">
                        <span>Coursera</span>
                        <ExternalLink className="h-4 w-4 ml-1" />
                      </button>
                      <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors flex items-center">
                        <span>Udemy</span>
                        <ExternalLink className="h-4 w-4 ml-1" />
                      </button>
                      <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors flex items-center">
                        <span>LinkedIn Learning</span>
                        <ExternalLink className="h-4 w-4 ml-1" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CareerPathway

