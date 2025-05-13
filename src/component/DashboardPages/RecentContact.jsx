import { useState } from "react";
import { Search, FileText, Calendar, FileOutput } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useGetContactListQuery } from "../../Redux/feature/ApiSlice";
import { CircleLoader } from "react-spinners";

const RecentContact = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch contracts using the query hook
  const { data: contracts, isLoading, isError, error } = useGetContactListQuery();

  // Log the fetched data for debugging
  console.log(contracts, "Fetched contracts");

  // Filter contracts based on search query
  const filteredContracts = contracts?.filter((contract) =>
    contract.noticeId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen p-6 dark:bg-black">
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

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-8">
            <CircleLoader
              color={document.documentElement.classList.contains("dark") ? "#FFFFFF" : "#4B5563"}
              size={150}
              cssOverride={{
                display: "block",
                margin: "0 auto",
              }}
            />
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="text-center text-red-600 dark:text-red-400 py-8">
            Error fetching contracts: {error?.message || "Something went wrong"}
          </div>
        )}

        {/* Contract Cards */}
        {!isLoading && !isError && (
          <div className="space-y-4">
            {filteredContracts?.length > 0 ? (
              filteredContracts.map((contract, index) => (
                <div
                  key={index}
                  className="border border-zinc-300 dark:border-zinc-800 rounded-lg p-4 text-black dark:text-white bg-white dark:bg-black"
                >
                  <div className="grid grid-cols-1 gap-3">
                    {/* Title */}
                    <div className="flex items-start">
                      <FileOutput className="h-5 w-5 mr-2 mt-0.5 text-gray-400 flex-shrink-0" />
                      <div>
                        <span className="text-gray-600 dark:text-gray-400 mr-2">Title:</span>
                        <span>{contract?.Title}</span>
                      </div>
                    </div>

                    {/* Notice ID */}
                    <div className="flex items-start">
                      <FileText className="h-5 w-5 mr-2 mt-0.5 text-gray-400 flex-shrink-0" />
                      <div>
                        <span className="text-gray-600 dark:text-gray-400 mr-2">Notice ID:</span>
                        <span>{contract?.noticeId}</span>
                      </div>
                    </div>

                    {/* Solicitation Number */}
                    <div className="flex items-start">
                      <FileText className="h-5 w-5 mr-2 mt-0.5 text-gray-400 flex-shrink-0" />
                      <div>
                        <span className="text-gray-600 dark:text-gray-400 mr-2">Solicitation Number:</span>
                        <span>{contract?.["Solicitation Number"]}</span>
                      </div>
                    </div>

                    {/* Posted Date */}
                    <div className="flex items-start">
                      <Calendar className="h-5 w-5 mr-2 mt-0.5 text-gray-400 flex-shrink-0" />
                      <div>
                        <span className="text-gray-600 dark:text-gray-400 mr-2">Posted Date:</span>
                        <span>{contract?.["Posted Date"]}</span>
                      </div>
                    </div>

                    {/* Response Deadline */}
                    <div className="flex items-start">
                      <Calendar className="h-5 w-5 mr-2 mt-0.5 text-gray-400 flex-shrink-0" />
                      <div>
                        <span className="text-gray-600 dark:text-gray-400 mr-2">Response Deadline:</span>
                        <span>{contract?.["Response Deadline"]}</span>
                      </div>
                    </div>
                  </div>

                  {/* View Button */}
                  <NavLink to={`/dashboard/general_information/${contract.noticeId}`}>
                    <div className="flex justify-end mt-4">
                      <button className="bg-gray-300 text-black dark:bg-white hover:bg-gray-400 dark:text-black px-4 py-1 cursor-pointer rounded-md dark:hover:bg-gray-200 transition">
                        View
                      </button>
                    </div>
                  </NavLink>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-600 dark:text-gray-400 py-8">
                No contracts found matching your search.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentContact;