import { useState } from "react";
import { AiOutlineFileSearch } from "react-icons/ai";
import { BiSolidShare } from "react-icons/bi";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import {
  useGetGeneralInformationQuery,
  useSubmitgenarateProposalMutation,
  useSubmitRequirementsAnalysisMutation,
} from "../../Redux/feature/ApiSlice";
import { FileText, Calendar, FileOutput } from "lucide-react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw"; // Import rehype-raw for HTML parsing
import { CircleLoader } from "react-spinners";


// Helper function to decode HTML entities
const decodeHtml = (html) => {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

const GeneralInformation = () => {
  const { noticeId } = useParams();
  console.log(noticeId, "URL noticeId"); // Debug noticeId
  const { data: contract, isLoading, isError, error } = useGetGeneralInformationQuery(noticeId);
  const [submitRequirementsAnalysis] = useSubmitRequirementsAnalysisMutation();
  const [submitGenerateProposal] = useSubmitgenarateProposalMutation();
  console.log(contract, "Fetched contract details"); // Debug API response

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProposalPopupOpen, setIsProposalPopupOpen] = useState(false);
  const [proposalInput, setProposalInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state for Analyze button
  const [isProposalSubmitting, setIsProposalSubmitting] = useState(false); // Loading state for Submit Proposal button

  // Dynamic general information based on fetched contract data
  const generalInfo = contract
    ? {
        leftColumn: [
          { id: 1, icon: "document", label: "Notice ID:", value: contract.notice_id || contract.noticeId || "N/A" },
          { id: 2, icon: "contract", label: "Title:", value: contract.title || contract.Title || "N/A" },
          {
            id: 3,
            icon: "calendar",
            label: "Response Deadline:",
            value: contract.responseDeadLine || "N/A",
          },
        ],
        rightColumn: [
          { id: 1, icon: "calendar", label: "Posted Date:", value: contract.archiveDate || contract["Posted Date"] || "N/A" },
          {
            id: 2,
            icon: "document",
            label: "Solicitation Number:",
            value: contract.solicitationNumber || "N/A",
          },
        ],
      }
    : { leftColumn: [], rightColumn: [] };

  // Use description from API if available, decode HTML entities
  const description = contract?.description || contract?.Description
    ? decodeHtml(contract.description || contract.Description)
    : "No description available for this contract.";

  // Modal content (unchanged)
  const modalContent = {
    title: "Analysis",
    overview: [
      {
        title: "The Federal Bureau of Prisons (BOP) requires a provider...",
        details: ["GEOGRAPHIC LOCATION: Services must be delivered within a 10-mile radius..."],
      },
    ],
    coverLetterRecommendations: [
      {
        title: "RECOMMENDATIONS FOR THE COVER LETTER:",
        items: ["1. Introduction: Begin by directly addressing the BOP’s need..."],
      },
    ],
    proposalRecommendations: [
      {
        title: "RECOMMENDATIONS FOR THE SUMMARY:",
        items: ["1. Project Scope and Deliverables: Clearly define the services..."],
      },
    ],
  };

  const renderIcon = (iconType) => {
    switch (iconType) {
      case "document":
        return <FileText className="w-4 h-4 mr-2 text-gray-400" />;
      case "contract":
        return <FileOutput className="w-4 h-4 mr-2 text-gray-400" />;
      case "calendar":
        return <Calendar className="w-4 h-4 mr-2 text-gray-400" />;
      default:
        return null;
    }
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleOpenProposalPopup = () => {
    setIsModalOpen(false);
    setIsProposalPopupOpen(true);
  };
  const handleCloseProposalPopup = () => setIsProposalPopupOpen(false);

  const [modalData, setModalData] = useState({});
  const [proposalData, setProposalData] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Start loading
    try {
      const data = { notice_id: noticeId };
      const response = await submitRequirementsAnalysis(data).unwrap(); // Call the mutation
      console.log("res", response);
      setModalData(response);
      handleOpenModal();
    } catch (err) {
      console.error("Failed to submit requirements analysis:", err);
    } finally {
      setIsSubmitting(false); // Stop loading regardless of success or failure
    }
  };

  const navigate = useNavigate();

  const handleSubmitProposal = async (e) => {
    e.preventDefault();
    setIsProposalSubmitting(true); // Start loading
    try {
      const data = {
        notice_id: noticeId,
        description: contract?.description || "",
        amount: proposalInput,
      };
      const response = await submitGenerateProposal(data).unwrap(); // Call the mutation
      console.log("Proposal Response:", response); // Log for debugging
      setProposalData(response); // Store response in state
      setProposalInput(""); // Clear input
      setIsProposalPopupOpen(false); // Close popup
      navigate(`/dashboard/contract_proposal/${response.proposal_id}`, {
        state: { proposalData: response }, // Pass response to new route
      });
    } catch (err) {
      console.error("Failed to submit proposal:", err);
      // Display user-friendly error message
      const errorMessage = err.data?.message || "Failed to submit proposal. Please try again.";
    } finally {
      setIsProposalSubmitting(false); // Stop loading regardless of success or failure
    }
  };

  return (
    <div className="relative dark:bg-black text-black dark:text-white p-4 font-sans container mx-auto">
      <div className={`${isModalOpen || isProposalPopupOpen ? "blur-sm" : ""} transition duration-300`}>
        <h1 className="text-3xl font-bold text-black dark:text-white mb-8">General Information</h1>

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
            Error fetching contract details: {error?.message || "Something went wrong"}
          </div>
        )}

        {/* No Data State */}
        {!isLoading && !isError && !contract && (
          <div className="text-center text-gray-600 dark:text-gray-400 py-8">
            No contract data available.
          </div>
        )}

        {/* Contract Details */}
        {!isLoading && !isError && contract && (
          <>
            <div className="flex items-center space-x-20">
              <div className="space-y-2">
                {generalInfo.leftColumn.map((item) => (
                  <div key={item.id} className="flex items-start">
                    <div className="flex items-center">
                      {renderIcon(item.icon)}
                      <span>{item.label}</span>
                    </div>
                    <span className="text-md ml-2 text-gray-600 dark:text-gray-400">{item.value}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                {generalInfo.rightColumn.map((item) => (
                  <div key={item.id} className="flex items-start">
                    <div className="flex items-center">
                      {renderIcon(item.icon)}
                      <span>{item.label}</span>
                    </div>
                    <span className="text-md ml-2 text-gray-600 dark:text-gray-400">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-4 mt-10">
              <h2 className="text-3xl font-bold text-black dark:text-white mb-8">Description</h2>
              <Markdown rehypePlugins={[rehypeRaw]}>{description}</Markdown>
            </div>
          </>
        )}

        <div className="flex items-center space-x-3">
          <NavLink to="/dashboard/recent_contract">
            <button className="border border-gray-600 text-[16px] font-[500] px-4 py-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer transition flex items-center justify-center h-[40px] min-w-[100px]">
              <div className="flex items-center space-x-1">
                <h1>Back</h1>
                <BiSolidShare className="mt-1" />
              </div>
            </button>
          </NavLink>
          <div className="relative inline-block">
            <button
              onClick={handleSubmit}
              className="border border-gray-600 text-[16px] font-[500] px-10 py-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer transition flex items-center justify-center min-w-[140px] h-[40px]"
              disabled={isSubmitting}
            >
              {!isSubmitting && (
                <div className="flex items-center space-x-1">
                  <h1>Analyze</h1>
                  <AiOutlineFileSearch />
                </div>
              )}
              {isSubmitting && (
                <CircleLoader
                  color={document.documentElement.classList.contains("dark") ? "#FFFFFF" : "#4B5563"}
                  size={25}
                  cssOverride={{
                    display: "block",
                    margin: "0 auto", // Center horizontally
                    verticalAlign: "middle", // Ensure vertical centering
                  }}
                />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Analysis Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-60">
          <div className="absolute inset-0 bg-opacity-50 backdrop-blur-[2px]" onClick={handleCloseModal}></div>
          <div
            className="relative bg-white dark:bg-zinc-800 text-black dark:text-white p-6 rounded-lg shadow-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            style={{ animation: "fadeIn 1s forwards" }}
          >
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-black dark:hover:text-white cursor-pointer"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-2xl font-bold mb-4">{modalContent.title}</h2>
            <Markdown rehypePlugins={[rehypeRaw]}>{modalData}</Markdown>
            <NavLink to="#" onClick={(e) => { e.preventDefault(); handleOpenProposalPopup(); }}>
              <button className="mt-4 border border-gray-600 text-[16px] font-[500] px-4 py-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer transition">
                Generate Proposal
              </button>
            </NavLink>
          </div>
        </div>
      )}

      {/* Proposal Popup */}
      {isProposalPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-60">
          <div className="absolute inset-0 bg-opacity-50 backdrop-blur-[5px]" onClick={handleCloseProposalPopup}></div>
          <div className="relative bg-white dark:bg-zinc-800 text-black dark:text-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <button
              onClick={handleCloseProposalPopup}
              className="absolute top-0 right-0 text-gray-400 hover:text-black dark:hover:text-white cursor-pointer p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-xl font-bold mb-4">Generate Proposal</h2>
            <form onSubmit={handleSubmitProposal}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Proposal amount</label>
                <div className="relative w-full">
                  <span className="absolute inset-y-0 left-3 flex items-center text-gray-500 dark:text-white">$</span>
                  <input
                    type="text"
                    value={proposalInput}
                    onChange={(e) => setProposalInput(e.target.value)}
                    className="w-full p-2 pl-6 border border-gray-300 rounded-lg text-black dark:text-white bg-white dark:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter proposal amount"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full border border-gray-600 text-[16px] font-[500] px-4 py-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer transition flex items-center justify-center"
                disabled={isProposalSubmitting}
              >
                {!isProposalSubmitting && <span>Submit Proposal</span>}
                {isProposalSubmitting && (
                  <CircleLoader
                    color={document.documentElement.classList.contains("dark") ? "#FFFFFF" : "#4B5563"}
                    size={25}
                    cssOverride={{
                      display: "block",
                    }}
                  />
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GeneralInformation;