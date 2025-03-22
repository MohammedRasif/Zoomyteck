const Subscription = () => {
    return (
      <div className="bg-white dark:bg-black min-h-screen container mx-auto pt-8">
        {/* Heading */}
        <h1 className="text-3xl font-semibold text-black dark:text-white mb-8">
          Manage Subscription
        </h1>
  
        {/* Subscription Pack Name */}
        <div className="bg-white dark:bg-black border border-gray-300 dark:border-gray-800 py-6 px-12 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-medium text-black dark:text-white">
            Subscription Pack Name
          </h2>
        </div>
  
        {/* Bill Info */}
        <div className="bg-white dark:bg-black border border-gray-300 dark:border-gray-800 py-6 px-12 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-black dark:text-white mb-4">
            Bill Info
          </h2>
          <div className="space-y-4 mt-10">
            <h3 className="text-md font-medium text-black dark:text-white">
              Name: <span className="text-gray-600 dark:text-gray-400">John Doe</span>
            </h3>
            <h3 className="text-md font-medium text-black dark:text-white">
              Email: <span className="text-gray-600 dark:text-gray-400">john@example.com</span>
            </h3>
            <h3 className="text-md font-medium text-black dark:text-white">
              Purchase Date:{" "}
              <span className="text-gray-600 dark:text-gray-400">March 15, 2025</span>
            </h3>
            <h3 className="text-md font-medium text-black dark:text-white">
              Expiry Date:{" "}
              <span className="text-gray-600 dark:text-gray-400">March 15, 2026</span>
            </h3>
          </div>
        </div>
  
        {/* Cancel Subscription Button */}
        <button className="mt-6 text-xl bg-black dark:bg-white text-white dark:text-black rounded-md px-6 py-2 hover:bg-gray-800 dark:hover:bg-gray-300 cursor-pointer font-[500] transition duration-300">
          Cancel Subscription
        </button>
      </div>
    );
  };
  
  export default Subscription;