"use client"

import { useState } from "react"
import { CheckCircle, Circle, TrendingUp, Calendar, Award, BarChart, Zap, ChevronRight, Plus } from "lucide-react"

const ProductivityDashboard = () => {
  const [habits, setHabits] = useState([
    { id: 1, name: "Morning Meditation", completed: true, streak: 12, target: 15, progress: 80 },
    { id: 2, name: "Read 30 Minutes", completed: false, streak: 5, target: 30, progress: 50 },
    { id: 3, name: "Exercise", completed: true, streak: 8, target: 10, progress: 80 },
    { id: 4, name: "Learn New Skill", completed: false, streak: 3, target: 7, progress: 43 },
    { id: 5, name: "Journal", completed: false, streak: 15, target: 20, progress: 75 },
  ])

  const toggleHabit = (id) => {
    setHabits(habits.map((habit) => (habit.id === id ? { ...habit, completed: !habit.completed } : habit)))
  }

  const completedHabits = habits.filter((habit) => habit.completed).length
  const completionRate = Math.round((completedHabits / habits.length) * 100)

  const renderProgressRing = (progress) => {
    const radius = 30
    const strokeWidth = 6
    const normalizedRadius = radius - strokeWidth / 2
    const circumference = normalizedRadius * 2 * Math.PI
    const strokeDashoffset = circumference - (progress / 100) * circumference

    return (
      <svg height={radius * 2} width={radius * 2} className="transform -rotate-90">
        <circle
          stroke="#1f2937"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke="url(#gradient)"
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference + " " + circumference}
          style={{ strokeDashoffset }}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
      </svg>
    )
  }

  return (
    <div className="min-h-full bg-gray-900 text-gray-100">
      {/* Header */}
      <div className="border-b border-gray-800 p-6">
        <h2 className="text-2xl font-bold text-cyan-400">Productivity Dashboard</h2>
        <p className="text-gray-400 mt-1">Track your habits and build consistency with AI motivation</p>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Today's Progress</p>
                <h3 className="text-2xl font-bold text-white mt-1">{completionRate}%</h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-gray-700 flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-cyan-400" />
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div
                  className="h-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
                  style={{ width: `${completionRate}%` }}
                ></div>
              </div>
              <div className="flex justify-between mt-2 text-xs text-gray-400">
                <span>{completedHabits} completed</span>
                <span>{habits.length} total</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Longest Streak</p>
                <h3 className="text-2xl font-bold text-white mt-1">15 days</h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-gray-700 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-purple-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((day) => (
                  <div key={day} className="w-8 h-8 rounded-md bg-purple-900 flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-purple-400" />
                  </div>
                ))}
              </div>
              <ChevronRight className="h-4 w-4 text-gray-500 mx-1" />
              <span className="text-xs text-gray-400">View all</span>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Weekly Goal</p>
                <h3 className="text-2xl font-bold text-white mt-1">68% Complete</h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-gray-700 flex items-center justify-center">
                <Award className="h-6 w-6 text-yellow-400" />
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div
                  className="h-2.5 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500"
                  style={{ width: "68%" }}
                ></div>
              </div>
              <div className="flex justify-between mt-2 text-xs text-gray-400">
                <span>17/25 habits</span>
                <span>3 days left</span>
              </div>
            </div>
          </div>
        </div>

        {/* Parallel You Motivation Card */}
        <div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-xl p-6 mb-8 border border-blue-800">
          <div className="flex items-center">
            <div className="h-12 w-12 rounded-full bg-blue-800 flex items-center justify-center mr-4">
              <Zap className="h-6 w-6 text-yellow-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Parallel You Motivation Boost</h3>
              <p className="text-blue-200 mt-1">
                Your digital twin has mastered meditation and achieved 30 consecutive days. Keep going!
              </p>
            </div>
          </div>
        </div>

        {/* Habits Tracking */}
        <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 mb-8">
          <div className="p-4 border-b border-gray-700 flex justify-between items-center">
            <h3 className="text-lg font-medium text-white">Daily Habits</h3>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 text-gray-400 mr-2" />
              <span className="text-sm text-gray-400">Today</span>
            </div>
          </div>
          <div className="divide-y divide-gray-700">
            {habits.map((habit) => (
              <div key={habit.id} className="p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <button onClick={() => toggleHabit(habit.id)} className="mr-4 focus:outline-none">
                    {habit.completed ? (
                      <CheckCircle className="h-6 w-6 text-cyan-500" />
                    ) : (
                      <Circle className="h-6 w-6 text-gray-500" />
                    )}
                  </button>
                  <div>
                    <h4 className="font-medium text-white">{habit.name}</h4>
                    <div className="flex items-center mt-1">
                      <TrendingUp className="h-3 w-3 text-purple-400 mr-1" />
                      <span className="text-xs text-gray-400">{habit.streak} day streak</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="mr-4 text-right">
                    <div className="text-sm font-medium text-white">{habit.progress}%</div>
                    <div className="text-xs text-gray-400">
                      {habit.streak}/{habit.target} days
                    </div>
                  </div>
                  <div>{renderProgressRing(habit.progress)}</div>
                </div>
              </div>
            ))}
            <div className="p-4">
              <button className="w-full py-3 border border-dashed border-gray-600 rounded-lg text-gray-400 hover:text-gray-300 hover:border-gray-500 transition-colors flex items-center justify-center">
                <Plus className="h-5 w-5 mr-2" />
                <span>Add New Habit</span>
              </button>
            </div>
          </div>
        </div>

        {/* Weekly Analytics */}
        <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700">
          <div className="p-4 border-b border-gray-700 flex justify-between items-center">
            <h3 className="text-lg font-medium text-white">Weekly Analytics</h3>
            <button className="text-sm text-cyan-400 hover:text-cyan-300 flex items-center">
              <BarChart className="h-4 w-4 mr-1" />
              <span>Detailed Stats</span>
            </button>
          </div>
          <div className="p-6">
            <div className="flex items-end justify-between h-40 mb-4">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => {
                const height = [70, 45, 80, 65, 90, 50, 30][index]
                return (
                  <div key={day} className="flex flex-col items-center">
                    <div
                      className={`w-8 rounded-t-md ${
                        index === 4 ? "bg-gradient-to-t from-cyan-600 to-blue-500" : "bg-gray-700"
                      }`}
                      style={{ height: `${height}%` }}
                    ></div>
                    <div className="mt-2 text-xs text-gray-400">{day}</div>
                  </div>
                )
              })}
            </div>
            <div className="flex justify-between items-center mt-6 p-4 bg-gray-900 rounded-lg">
              <div>
                <div className="text-sm text-gray-400">Best Day</div>
                <div className="text-lg font-medium text-white">Friday</div>
              </div>
              <div>
                <div className="text-sm text-gray-400">Completion Rate</div>
                <div className="text-lg font-medium text-white">90%</div>
              </div>
              <div>
                <div className="text-sm text-gray-400">Total Time</div>
                <div className="text-lg font-medium text-white">3h 45m</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductivityDashboard

