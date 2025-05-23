


import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { useDarkMood } from "../../context/ThemeContext";
import { usePaymentCheckoutMutation, useSubscriptioncartQuery } from "../../Redux/feature/ApiSlice";

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState("monthly");
  const { darkMode } = useDarkMood();

  const { data: subscriptioncart } = useSubscriptioncartQuery();
  console.log("payment cart", subscriptioncart);
  const [paymentCheckout, { isLoading }] = usePaymentCheckoutMutation();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

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
  };


  const hanglePaymentCheck = async (plan_id) => {
    console.log(plan_id)

    try {
      const resoonse = await paymentCheckout(plan_id).unwrap();
      console.log("payment response", resoonse);
      window.location.href = resoonse?.url;



    } catch (error) {
      console.log("Error during payment checkout:", error);
      
    }
  }


  // Filter plans based on the selected billing cycle
  const activePlans = subscriptioncart?.filter(
    (plan) => plan.billing_cycle === billingCycle
  ) || [];

  return (
    <div
      id="pricing"
      className={`w-full py-16 px-4 sm:px-6 md:px-8 lg:px-10 ${
        darkMode
          ? "bg-black text-white"
          : "bg-gradient-to-r from-[#EAEFFB] via-[#F5F3E6] to-[#EAEFFB] text-black"
      }`}
    >
      <h1
        className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center bg-gradient-to-r ${
          darkMode ? "from-white to-gray-500" : "from-black to-gray-100"
        } text-transparent bg-clip-text font-bold pb-4 sm:pb-6 md:pb-8 lg:pb-10`}
      >
        Simple, Transparent Pricing
      </h1>

      <div className="max-w-4xl mx-auto">
        {/* Toggle Button */}
        <div className="flex justify-center mb-12">
          <div className={`p-1 rounded-full inline-flex ${darkMode ? "bg-zinc-900" : "bg-gray-300"}`}>
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-6 py-2 rounded-full text-sm font-medium cursor-pointer ${
                billingCycle === "monthly" ? "bg-white text-black" : "text-gray-500"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`px-6 py-2 rounded-full text-sm font-medium cursor-pointer ${
                billingCycle === "yearly" ? "bg-white text-black" : "text-gray-500"
              }`}
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
                className={`border rounded-lg overflow-hidden h-[550px] hover:scale-105 ${
                  darkMode
                    ? "border-gray-800 bg-gradient-to-b from-zinc-900 to-black"
                    : "border-gray-200 bg-gradient-to-b from-gray-100 to-white"
                }`}
              >
                <div className="p-6 relative">
                  {plan.popular && (
                    <div
                      className={`absolute top-4 right-4 text-xs font-semibold px-2 py-1 rounded-md ${
                        darkMode ? "bg-gray-700" : "bg-gray-300"
                      }`}
                    >
                      Most Popular
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-center lg:mt-5">{plan.name}</h3>
                  <p
                    className={`text-sm text-center mb-4 ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {plan.description}
                  </p>
                  <div className="flex items-center justify-center lg:mt-5">
                    <span className="text-3xl font-bold">${plan.price}</span>
                    <span
                      className={`ml-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                    >
                      per {billingCycle === "monthly" ? "month" : "year"}
                    </span>
                  </div>
                  <div
                    className={`border-t my-4 ${darkMode ? "border-gray-800" : "border-gray-300"}`}
                  ></div>
                </div>

                <div className="px-6 pb-6 lg:mt-10">
                  <ul className="space-y-5">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                        <span
                          className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="px-6 pb-6 pt-5">
                  <button
                    className="w-full py-3 px-4 rounded-lg font-medium hover:scale-105 border border-gray-400 text-black hover:bg-black hover:text-white cursor-pointer dark:bg-none dark:text-white dark:border dark:border-gray-400 dark:hover:bg-gray-300 dark:hover:text-black"
                    disabled={isLoading}
                    onClick={()=>hanglePaymentCheck(plan?.id)}>
                    {isLoading ? "Processing...": "Get Started"}
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Pricing;