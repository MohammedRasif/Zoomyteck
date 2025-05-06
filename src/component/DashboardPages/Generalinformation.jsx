import { useState } from "react";
import { AiOutlineFileSearch } from "react-icons/ai";
import { BiSolidShare } from "react-icons/bi";
import { NavLink } from "react-router-dom";

const GeneralInformation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProposalPopupOpen, setIsProposalPopupOpen] = useState(false);
  const [proposalInput, setProposalInput] = useState("");

  // General information data object
  const generalInfo = {
    leftColumn: [
      { id: 1, icon: "document", label: "Notice ID:", value: "140C7523Q0000007" },
      { id: 2, icon: "contract", label: "Contract Opportunity Type:", value: "Presolicitation (Original)" },
      { id: 3, icon: "calendar", label: "Response Date:", value: "Jul 13, 2023" },
    ],
    rightColumn: [
      { id: 1, icon: "calendar", label: "Original Response Date:", value: "Jul 13, 2023 12:00 PM EDT" },
      { id: 2, icon: "calendar", label: "Original Published Date:", value: "Jun 05, 2023 12:24 PM EDT" },
      { id: 3, icon: "info", label: "Inactive Policy:", value: "15-30-60" },
    ],
  };

  // Description paragraphs
  const descriptionParagraphs = [
    "The Federal Bureau of Prisons, CLD Contracting Office in Washington, D.C., is seeking qualified providers for community-based residential treatment services for Federal offenders...The Federal Bureau of Prisons, CLD Contracting Office in Washington, D.C., is seeking qualified providers for community-based residential treatment services for Federal offenders...The Federal Bureau of Prisons, CLD Contracting Office in Washington, D.C., is seeking qualified providers for community-based residential treatment services for Federal offenders...",
    // (Keeping the rest of the paragraphs as they are for brevity)
  ];

  // Modal content (shortened for brevity)
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

  // Function to render the appropriate icon
  const renderIcon = (iconType) => {
    switch (iconType) {
      case "document":
        return <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">...</svg>;
      case "contract":
        return <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">...</svg>;
      case "calendar":
        return <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">...</svg>;
      case "info":
        return <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">...</svg>;
      default:
        return null;
    }
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  // Modified to close the Analysis modal when opening the Proposal popup
  const handleOpenProposalPopup = () => {
    setIsModalOpen(false); // Close the Analysis modal
    setIsProposalPopupOpen(true); // Open the Proposal popup
  };

  const handleCloseProposalPopup = () => setIsProposalPopupOpen(false);

  const handleSubmitProposal = (e) => {
    e.preventDefault();
    console.log("Proposal submitted:", proposalInput);
    setProposalInput(""); // Clear input after submission
    setIsProposalPopupOpen(false); // Close popup after submission
  };

  return (
    <div className="relative  dark:bg-black text-black dark:text-white p-4 font-sans container mx-auto">
      {/* Main Content */}
      <div className={`${isModalOpen ? "blur-sm" : ""} transition duration-300`}>
        <h1 className="text-3xl font-bold text-black dark:text-white mb-8">General Information</h1>
        <div className="flex items-center space-x-20">
          <div className="space-y-2">
            {generalInfo.leftColumn.map((item) => (
              <div key={item.id} className="flex items-start">
                <div className="flex items-center">{renderIcon(item.icon)}<span>{item.label}</span></div>
                <span className="text-md ml-2 text-gray-600 dark:text-gray-400">{item.value}</span>
              </div>
            ))}
          </div>
          <div className="space-y-2">
            {generalInfo.rightColumn.map((item) => (
              <div key={item.id} className="flex items-start">
                <div className="flex items-center">{renderIcon(item.icon)}<span>{item.label}</span></div>
                <span className="text-md ml-2 text-gray-600 dark:text-gray-400">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-4 mt-10">
          <h2 className="text-3xl font-bold text-black dark:text-white mb-8">Description</h2>
          {descriptionParagraphs.map((paragraph, index) => (
            <p key={index} className={`text-sm leading-relaxed text-black dark:text-white ${index > 0 ? "mt-3" : ""}`}>
              {paragraph}
            </p>
          ))}
        </div>
        <div className="space-x-3">
          <NavLink to="/dashboard/recent_contract">
            <button className="border border-gray-600 text-[16px] font-[500] px-4 py-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer transition">
              <div className="flex items-center space-x-1"><h1>Back</h1><BiSolidShare className="mt-1" /></div>
            </button>
          </NavLink>
          <button onClick={handleOpenModal} className="border border-gray-600 text-[16px] font-[500] px-4 py-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer transition">
            <div className="flex items-center space-x-1"><h1>Analyze</h1><AiOutlineFileSearch /></div>
          </button>
        </div>
      </div>

      {/* Analysis Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-60">
          <div className="absolute inset-0 bg-opacity-50 backdrop-blur-[2px]" onClick={handleCloseModal}></div>
          <div className="relative bg-white dark:bg-zinc-800 text-black dark:text-white p-6 rounded-lg shadow-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto  " style={{ animation: "fadeIn 1s forwards" }}>
            <button onClick={handleCloseModal} className="absolute top-4 right-4 text-gray-400 hover:text-black dark:hover:text-white cursor-pointer">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-2xl font-bold mb-4">{modalContent.title}</h2>
            {modalContent.overview.map((section, index) => (
              <div key={index} className="mb-6">
                <p className="text-sm leading-relaxed">{section.title}</p>
                <ul className="mt-2 space-y-2">{section.details.map((detail, idx) => <li key={idx} className="text-sm leading-relaxed">{detail}</li>)}</ul>
              </div>
            ))}
            {modalContent.coverLetterRecommendations.map((section, index) => (
              <div key={index} className="mb-6">
                <h3 className="text-lg font-semibold mb-2">{section.title}</h3>
                <ul className="space-y-2">{section.items.map((item, idx) => <li key={idx} className="text-sm leading-relaxed">{item}</li>)}</ul>
              </div>
            ))}
            {modalContent.proposalRecommendations.map((section, index) => (
              <div key={index} className="mb-6">
                <h3 className="text-lg font-semibold mb-2">{section.title}</h3>
                <ul className="space-y-2">{section.items.map((item, idx) => <li key={idx} className="text-sm leading-relaxed">{item}</li>)}</ul>
              </div>
            ))}
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
            <button onClick={handleCloseProposalPopup} className="absolute top-0 right-0 text-gray-400 hover:text-black dark:hover:text-white cursor-pointer p-2">
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
              <NavLink to="/dashboard/contract_proposal">
                <button
                  type="submit"
                  className="w-full border border-gray-600 text-[16px] font-[500] px-4 py-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer transition"
                >
                  Submit Proposal
                </button>
              </NavLink>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GeneralInformation;