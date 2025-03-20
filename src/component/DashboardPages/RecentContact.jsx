import { useState } from "react";
import { Search, FileText, Calendar, Clock, FileOutput } from "lucide-react";
import { NavLink } from "react-router-dom";

const RecentContact = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const contracts = [
    {
      id: "TSBCTS24Q00000007",
      type: "Presolicitation (Original)",
      inactiveDate: "Apr 19, 2025",
      inactivePolicy: "2024-04-05",
      responseDate: "Apr 19, 2024 12:00 PM EDT",
      publishedDate: "Apr 05, 2024 12:24 PM EDT",
    },
    {
      id: "TSBCTS24Q00000008",
      type: "Solicitation",
      inactiveDate: "May 10, 2025",
      inactivePolicy: "2024-05-01",
      responseDate: "May 10, 2024 02:00 PM EDT",
      publishedDate: "May 01, 2024 09:30 AM EDT",
    },
    {
      id: "TSBCTS24Q00000009",
      type: "Award Notice",
      inactiveDate: "Jun 15, 2025",
      inactivePolicy: "2024-06-05",
      responseDate: "Jun 15, 2024 11:00 AM EDT",
      publishedDate: "Jun 05, 2024 10:00 AM EDT",
    },
    {
      id: "TSBCTS24Q00000010",
      type: "Combined Synopsis/Solicitation",
      inactiveDate: "Jul 20, 2025",
      inactivePolicy: "2024-07-10",
      responseDate: "Jul 20, 2024 03:30 PM EDT",
      publishedDate: "Jul 10, 2024 01:15 PM EDT",
    },
    {
      id: "TSBCTS24Q00000011",
      type: "Sources Sought",
      inactiveDate: "Aug 25, 2025",
      inactivePolicy: "2024-08-15",
      responseDate: "Aug 25, 2024 09:45 AM EDT",
      publishedDate: "Aug 15, 2024 08:00 AM EDT",
    },
  ];

  const filteredContracts = contracts.filter((contract) =>
    contract.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen p-6 dark:bg-black bg-white">
      <div className="container mx-auto">
        {/* Search Field */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by Notice ID..."
            className="border border-zinc-700 dark:border-zinc-800 text-black dark:text-white rounded-md pl-10 pr-4 py-3 w-[500px] focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-zinc-900"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Heading */}
        <h1 className="text-black dark:text-white text-2xl font-bold mb-6 flex items-center">
          <FileText className="mr-2" size={24} /> Recent Contract
        </h1>

        {/* Contract Cards */}
        <div className="space-y-4">
          {filteredContracts.length > 0 ? (
            filteredContracts.map((contract, index) => (
              <div
                key={index}
                className="border border-zinc-300 dark:border-zinc-800 rounded-lg p-4 text-black dark:text-white bg-white dark:bg-black"
              >
                <div className="grid grid-cols-1 gap-3">
                  {/* Notice ID */}
                  <div className="flex items-start">
                    <FileText className="h-5 w-5 mr-2 mt-0.5 text-gray-400 flex-shrink-0" />
                    <div>
                      <span className="text-gray-600 dark:text-gray-400 mr-2">Notice ID:</span>
                      <span>{contract.id}</span>
                    </div>
                  </div>

                  {/* Contract Opportunity Type */}
                  <div className="flex items-start">
                    <FileOutput className="h-5 w-5 mr-2 mt-0.5 text-gray-400 flex-shrink-0" />
                    <div>
                      <span className="text-gray-600 dark:text-gray-400 mr-2">Contract Opportunity Type:</span>
                      <span>{contract.type}</span>
                    </div>
                  </div>

                  {/* Original Inactive Date */}
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 mr-2 mt-0.5 text-gray-400 flex-shrink-0" />
                    <div>
                      <span className="text-gray-600 dark:text-gray-400 mr-2">Original Inactive Date:</span>
                      <span>{contract.inactiveDate}</span>
                    </div>
                  </div>

                  {/* Inactive Policy */}
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 mr-2 mt-0.5 text-gray-400 flex-shrink-0" />
                    <div>
                      <span className="text-gray-600 dark:text-gray-400 mr-2">Inactive Policy:</span>
                      <span>{contract.inactivePolicy}</span>
                    </div>
                  </div>

                  {/* Original Response Date */}
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 mr-2 mt-0.5 text-gray-400 flex-shrink-0" />
                    <div>
                      <span className="text-gray-600 dark:text-gray-400 mr-2">Original Response Date:</span>
                      <span>{contract.responseDate}</span>
                    </div>
                  </div>

                  {/* Original Published Date */}
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 mr-2 mt-0.5 text-gray-400 flex-shrink-0" />
                    <div>
                      <span className="text-gray-600 dark:text-gray-400 mr-2">Original Published Date:</span>
                      <span>{contract.publishedDate}</span>
                    </div>
                  </div>
                </div>

                {/* View Button */}
                <NavLink to="/dashboard/general_information"><div className="flex justify-end mt-4 ">
                  <button className="bg-gray-300 text-black dark:bg-white hover:bg-gray-400 dark:text-black  px-4 py-1 cursor-pointer rounded-md  dark:hover:bg-gray-200 transition">
                    View
                  </button>
                </div></NavLink>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-600 dark:text-gray-400 py-8">
              No contracts found matching your search.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentContact;