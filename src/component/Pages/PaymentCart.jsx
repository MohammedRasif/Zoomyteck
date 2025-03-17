"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check } from "lucide-react"
import { useDarkMood } from "../../context/ThemeContext"

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState("monthly")
  const { darkMode } = useDarkMood()

  const monthlyPlans = [
    {
      name: "Starter",
      description: "For small businesses and freelancers",
      price: 34,
      features: [
        "Up to 10 proposals per month",
        "Basic AI proposal generation",
        "E-commerce Integration",
        "Contract search & filtering",
        "1 team member",
      ],
      popular: false,
    },
    {
      name: "Professional",
      description: "Take Your Business to the Next Level",
      price: 56,
      features: [
        "Up to 10 proposals per month",
        "Basic AI proposal generation",
        "E-commerce Integration",
        "Contract search & filtering",
        "1 team member",
      ],
      popular: true,
    },
  ]

  const yearlyPlans = [
    {
      name: "Starter",
      description: "For small businesses and freelancers",
      price: 340,
      features: [
        "Up to 120 proposals per year",
        "Basic AI proposal generation",
        "E-commerce Integration",
        "Contract search & filtering",
        "1 team member",
      ],
      popular: false,
    },
    {
      name: "Professional",
      description: "Take Your Business to the Next Level",
      price: 560,
      features: [
        "Up to 120 proposals per year",
        "Advanced AI proposal generation",
        "E-commerce Integration",
        "Contract search & filtering",
        "3 team members",
      ],
      popular: true,
    },
  ]

  const activePlans = billingCycle === "monthly" ? monthlyPlans : yearlyPlans

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 24,
      },
    },
  }

  return (
    <div className="w-full bg-black text-white py-16 px-4 sm:px-6 md:px-8 lg:px-10">
      <div className="max-w-4xl mx-auto">
        {/* Toggle Button */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-800 p-1 rounded-full inline-flex">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${billingCycle === "monthly" ? "bg-white text-black" : "text-gray-300"}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${billingCycle === "yearly" ? "bg-white text-black" : "text-gray-300"}`}
            >
              Yearly
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={billingCycle}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto"
          >
            {activePlans.map((plan, index) => (
              <motion.div
                key={`${plan.name}-${index}`}
                variants={cardVariants}
                className="border border-gray-800 rounded-lg overflow-hidden h-[550px] transform transition-transform duration-200 hover:scale-105"
              >
                {/* Card Header */}
                <div className="p-6 relative">
                  {plan.popular && (
                    <div className="absolute top-4 right-4 bg-gray-700 text-xs font-semibold px-2 py-1 rounded-md">
                      Most Popular
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-center lg:mt-5">{plan.name}</h3>
                  <p className="text-gray-400 text-sm text-center mb-4">{plan.description}</p>
                  <div className="flex items-center justify-center lg:mt-5">
                    <span className="text-3xl font-bold">${plan.price}</span>
                    <span className="text-gray-400 ml-2">per {billingCycle === "monthly" ? "month" : "year"}</span>
                  </div>
                  <div className="border-t border-gray-800 my-4"></div>
                </div>

                {/* Features List */}
                <div className="px-6 pb-6 lg:mt-16">
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <div className="px-6 pb-6">
                  <button
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-transform duration-200 transform hover:scale-105 ${plan.popular ? "bg-white text-black hover:bg-gray-200" : "border border-white text-white hover:bg-gray-800"}`}
                  >
                    Get Started
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Pricing
