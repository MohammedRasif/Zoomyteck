
import { useEffect, useState } from "react";
import { PDFDownloadLink, Document, Page, Text, StyleSheet } from "@react-pdf/renderer";
import { FaCloudDownloadAlt, FaEdit, FaSave, FaArrowLeft, FaPaperPlane } from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { RiDraftLine } from "react-icons/ri";
import {
  useEditGenerateProposalMutation,
  useGetContractProposalDeatilsQuery,
  useSaveDrafteMutation,
  useSubmitDeatilsMutation,
  useSubmitProposalMutation,
} from "../../Redux/feature/ApiSlice";
import { CircleLoader } from "react-spinners";

// PDF styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  content: {
    fontSize: 12,
    lineHeight: 1.5,
  },
});

// PDF Document Component
const ProposalPDF = ({ title, description }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.content}>{description}</Text>
    </Page>
  </Document>
);

const ContractProposal = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // Popup for Save Proposal
  const [showDraftPopup, setShowDraftPopup] = useState(false); // Popup for Draft success
  const [showSubmitPopup, setShowSubmitPopup] = useState(false); // Popup for Submit success
  const [title] = useState("Contract Proposal");
  const location = useLocation();
  const { proposalData } = location.state || {};
  const [description, setDescription] = useState("");
 const [editGenerateProposal, { isLoading: isSaveLoading, error: saveError }] = useEditGenerateProposalMutation();
  const [saveDraft, { isLoading: isDraftLoading, error: draftError }] = useSaveDrafteMutation();
  const [submitProposal, { isLoading: isSubmitLoading, error: submitError }] = useSubmitProposalMutation();
  const { data: contractProposal } = useGetContractProposalDeatilsQuery();
  const { data: pdf } = useSubmitDeatilsMutation();
  console.log(contractProposal);

  useEffect(() => {
    if (proposalData) {
      setDescription(proposalData.proposal || "");
    }
  }, [proposalData]);

  // Validate base64 string
  const isValidBase64 = (str) => {
    try {
      if (typeof str !== "string") return false;
      // Check if string is base64 (allows padding with =)
      const base64Regex = /^[A-Za-z0-9+/=]+$/;
      if (!base64Regex.test(str)) return false;
      // Try decoding to catch invalid base64
      atob(str);
      return true;
    } catch (e) {
      return false;
    }
  };

  // Handle save/edit toggle and mutation
  const handleSaveProposal = async () => {
    if (isEditing) {
      try {
        const data = {
          proposal_id: proposalData?.proposal_id,
          update_proposal: description,
        };
        const response = await editGenerateProposal(data).unwrap();
        console.log("Edit Proposal Response:", response);
        setDescription(response.update_proposal || response.proposal || description);
        setShowPopup(true);
        setIsEditing(false);
      } catch (err) {
        console.error("Failed to update proposal:", err);
        alert(`Error: ${err.data?.message || "Failed to update proposal. Please try again."}`);
      }
    } else {
      setIsEditing(true);
    }
  };

  // Handle draft button click
  const handleSaveDraft = async () => {
    try {
      const data = {
        proposal_id: proposalData?.proposal_id,
      };
      const response = await saveDraft(data).unwrap();
      console.log("Draft Save Response:", response);
      setShowDraftPopup(true);
    } catch (err) {
      console.error("Failed to save draft:", err);
      alert(`Error: ${err.data?.message || "Failed to save draft. Please try again."}`);
    }
  };

  // Handle submit proposal
  const handleSubmitProposal = async () => {
    if (!proposalData?.proposal_id) {
      alert("Error: Proposal ID is missing.");
      return;
    }

    try {
      const data = {
        proposal_id: proposalData.proposal_id,
        
      };
      const response = await submitProposal(data).unwrap();
      console.log("Submit Proposal Response:", response);

      // Validate PDF if included in response
      if (response.pdf) {
        if (!isValidBase64(response.pdf)) {
          console.error("Invalid Base64 string received:", response.pdf);
          throw new Error("Invalid Base64 string received for PDF");
        }
        // PDF is valid but not needed since backend sends email
        console.log("PDF base64 received but handled by backend email");
      }

      // Show success popup
      setShowSubmitPopup(true);
    } catch (err) {
      console.error("Failed to submit proposal:", err);
      alert(`Error: ${err.data?.message || err.message || "Failed to submit proposal or send email. Please try again."}`);
    }
  };

  // Close popups
  const closePopup = () => {
    setShowPopup(false);
  };

  const closeDraftPopup = () => {
    setShowDraftPopup(false);
  };

  const closeSubmitPopup = () => {
    setShowSubmitPopup(false);
  };

  return (
    <div className={`container mx-auto p-4 dark:bg-black dark:text-white ${showPopup || showDraftPopup || showSubmitPopup ? "" : ""}`}>
      {/* Popup Modal for Save Proposal */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50 backdrop-blur-[3px]">
          <div className="bg-gray-200 dark:bg-zinc-800 p-6 rounded-md shadow-lg dark:text-white">
            <div className="flex justify-center">
              <MdOutlineVerifiedUser className="text-8xl text-green-600" />
            </div>
            <p className="text-[20px]">Your proposal has been updated successfully.</p>
            <button
              onClick={closePopup}
              className="mt-4 bg-back dark:text-white px-4 py-2 rounded hover:bg-gray-300 dark:hover:bg-zinc-800 border border-gray-500 transition w-full cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Popup Modal for Draft Success */}
      {showDraftPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50 backdrop-blur-[3px]">
          <div className="bg-gray-200 dark:bg-zinc-800 p-6 rounded-md shadow-lg dark:text-white">
            <div className="flex justify-center">
              <MdOutlineVerifiedUser className="text-8xl text-green-600" />
            </div>
            <p className="text-[20px]">Draft saved successfully!</p>
            <button
              onClick={closeDraftPopup}
              className="mt-4 bg-back dark:text-white px-4 py-2 rounded hover:bg-gray-300 dark:hover:bg-zinc-800 border border-gray-500 transition w-full cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Popup Modal for Submit Success */}
      {showSubmitPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50 backdrop-blur-[3px]">
          <div className="bg-gray-200 dark:bg-zinc-800 p-6 rounded-md shadow-lg dark:text-white">
            <div className="flex justify-center">
              <MdOutlineVerifiedUser className="text-8xl text-green-600" />
            </div>
            <p className="text-[20px]">Proposal submitted and emailed successfully!</p>
            <button
              onClick={closeSubmitPopup}
              className="mt-4 bg-back dark:text-white px-4 py-2 rounded hover:bg-gray-300 dark:hover:bg-zinc-800 border border-gray-500 transition w-full cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">{title}</h1>
        <div className="flex space-x-2">
          <PDFDownloadLink
            document={<ProposalPDF title={title} description={description} />}
            fileName="contract_proposal.pdf"
          >
            {({ loading }) => (
              <button className="flex items-center bg-blue-500 text-white px-3 py-1 rounded cursor-pointer hover:bg-blue-600 transition">
                <FaCloudDownloadAlt className="mr-2" />
                {loading ? "Loading..." : "Download"}
              </button>
            )}
          </PDFDownloadLink>
          <button
            onClick={handleSaveDraft}
            className="flex items-center border border-gray-300 px-3 py-1 rounded-md dark:text-white dark:hover:bg-gray-700 hover:bg-gray-200 transition space-x-2 cursor-pointer"
            disabled={isDraftLoading}
          >
            {isDraftLoading ? (
              <CircleLoader
                color={document.documentElement.classList.contains("dark") ? "#FFFFFF" : "#4B5563"}
                size={20}
                cssOverride={{
                  display: "block",
                  margin: "0 auto",
                }}
              />
            ) : (
              <>
                <RiDraftLine />
                <span className="mr-2">Draft</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="border border-gray-600 p-4 rounded">
        {isEditing ? (
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full h-[65vh] p-2 border border-gray-400 rounded dark:bg-black dark:text-white focus:outline-none"
          />
        ) : (
          <div className="whitespace-pre-line">{description}</div>
        )}
      </div>

      <div className="mt-5 flex items-center space-x-4">
        <NavLink to="/dashboard/recent_contract">
          <button className="flex items-center border border-gray-400 px-3 py-1 rounded-md dark:text-white dark:hover:bg-gray-700 hover:bg-gray-200 transition cursor-pointer">
            <FaArrowLeft className="mr-2" />
            Back
          </button>
        </NavLink>
        <button
          onClick={handleSaveProposal}
          className="flex items-center border border-gray-400 px-3 py-1 rounded-md dark:text-white dark:hover:bg-gray-700 hover:bg-gray-200 transition cursor-pointer"
          disabled={isSaveLoading}
        >
          {isEditing ? <FaSave className="mr-2" /> : <FaEdit className="mr-2" />}
          {isEditing ? (isSaveLoading ? "Saving..." : "Save Proposal") : "Edit Proposal"}
        </button>
        <button
          onClick={handleSubmitProposal}
          className="flex items-center border border-gray-400 px-3 py-1 rounded-md dark:text-white dark:hover:bg-gray-700 hover:bg-gray-200 transition cursor-pointer min-w-[140px] h-[40px] justify-center"
          disabled={isSubmitLoading}
        >
          {!isSubmitLoading && (
            <div className="flex items-center space-x-2">
              <FaPaperPlane className="mr-2" />
              <span>Submit Proposal</span>
            </div>
          )}
          {isSubmitLoading && (
            <CircleLoader
              color={document.documentElement.classList.contains("dark") ? "#FFFFFF" : "#4B5563"}
              size={20}
              cssOverride={{
                display: "block",
                margin: "0 auto",
                verticalAlign: "middle",
              }}
            />
          )}
        </button>
      </div>
      {saveError && (
        <p className="mt-2 text-red-500">
          Error: {saveError.data?.message || "Failed to update proposal"}
        </p>
      )}
      {draftError && (
        <p className="mt-2 text-red-500">
          Error: {draftError.data?.message || "Failed to save draft"}
        </p>
      )}
      {submitError && (
        <p className="mt-2 text-red-500">
          Error: {submitError.data?.message || "Failed to submit proposal or send email"}
        </p>
      )}
    </div>
  );
};

export default ContractProposal;
