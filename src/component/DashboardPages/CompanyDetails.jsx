const CompanyDetails = () => {
    return (
      <div className="bg-gray-100 dark:bg-[#252424] p-10 border-t border-gray-300 dark:border-gray-700 h-full">
        <h1 className="text-4xl font-[500] text-black dark:text-white">Company Details</h1>
  
        <div>
          <div className="flex items-center space-x-10">
            <div className="mt-5">
              <h1 className="text-[18px] font-[400] text-gray-900 dark:text-gray-200">Company Name</h1>
              <input
                type="text"
                placeholder="Enter company name"
                name=""
                id=""
                className="border-[2px] border-gray-500 dark:border-gray-400 rounded-md py-[9px] w-[50vh] mt-2 pl-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
              />
            </div>
            <div className="mt-4">
              <h1 className="text-[18px] font-[400] text-gray-900 dark:text-gray-200">Company Email</h1>
              <input
                type="text"
                name=""
                placeholder="Enter company email"
                id=""
                className="border-[2px] border-gray-500 dark:border-gray-400 rounded-md py-[9px] w-[50vh] mt-2 pl-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
              />
            </div>
          </div>
  
          <div className="flex items-center space-x-10">
            <div className="mt-5">
              <h1 className="text-[18px] font-[400] text-gray-900 dark:text-gray-200">Company Website</h1>
              <input
                type="text"
                name=""
                id=""
                placeholder="Enter company website"
                className="border-[2px] border-gray-500 dark:border-gray-400 rounded-md py-[9px] w-[50vh] mt-2 pl-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
              />
            </div>
            <div className="mt-4">
              <h1 className="text-[18px] font-[400] text-gray-900 dark:text-gray-200">Company Phone</h1>
              <input
                type="text"
                name=""
                id=""
                placeholder="Enter company phone"
                className="border-[2px] border-gray-500 dark:border-gray-400 rounded-md py-[9px] w-[50vh] mt-2 pl-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
              />
            </div>
          </div>
  
          <div className="mt-5">
            <h1 className="text-[18px] font-[400] text-gray-900 dark:text-gray-200">Company Type</h1>
            <input
              type="text"
              name=""
              id=""
              placeholder="Enter company type"
              className="border-[2px] border-gray-500 dark:border-gray-400 rounded-md py-[9px] w-[50vh] mt-2 pl-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
            />
          </div>
  
          <div className="mt-5">
            <h1 className="text-[18px] font-[400] text-gray-900 dark:text-gray-200">Description</h1>
            <textarea
              name="description"
              id="description"
              className="border-[2px] w-[50vh] border-gray-500 dark:border-gray-400 rounded-md py-[9px] mt-2 pl-2 resize bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
              rows="4"
              placeholder="Enter company description..."
            />
          </div>
  
          <button className="bg-[#000524] dark:bg-gray-800 hover:bg-gray-800 dark:hover:bg-gray-700 px-10 py-3 rounded-md font-[500] text-xl mt-5 text-white">
            Submit Information
          </button>
        </div>
      </div>
    );
  };
  
  export default CompanyDetails;