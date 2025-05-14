

import { useState, useRef, useEffect } from "react";
import { MoreVertical, FileText, Edit, Trash2, X } from "lucide-react";
import {
  useGetDraftProposalQuery,
  useGetProposalListQuery,
  useDeleteDraftProposalMutation, 
} from "../../Redux/feature/ApiSlice";
import { Link } from "react-router-dom";

const AllApplication = () => {
  const [activeTab, setActiveTab] = useState("drafted");
  const [showDropdown, setShowDropdown] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null); 
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");

  const { data: draftData, isLoading: isDraftLoading } = useGetDraftProposalQuery();
  const { data: proposalData, isLoading: isSubmittedLoading } = useGetProposalListQuery();
  const [deleteDraftProposal, { isLoading: isDeleting }] = useDeleteDraftProposalMutation(); 

  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const currentProposals =
    activeTab === "drafted" ? draftData || [] : proposalData || [];

  // const handleRename = (item) => {
  //   setSelectedItem(item);
  //   setEditedTitle(item.title);
  //   setIsEditing(true);
  //   setShowDropdown(null);
  // };

  // const handleSaveRename = () => {
  //   setIsEditing(false);
  //   setSelectedItem(null);
  // };

  const handleDelete = (proposalId) => {
    setSelectedItem(proposalId); 
    setShowDeleteModal(true);
    setShowDropdown(null);
  };

  const confirmDelete = async (proposalId) => {
    try {
      await deleteDraftProposal(proposalId).unwrap(); 
      setShowDeleteModal(false);
      setSelectedItem(null);
    } catch (error) {
      console.error("Failed to delete proposal:", error);
    }
  };

  const isLoading = activeTab === "drafted" ? isDraftLoading : isSubmittedLoading;

  return (
    <div className="container mx-auto pt-8 dark:bg-black text-black dark:text-white">
      {/* Tabs */}
      <div className="flex mb-4">
        <button
          className={`px-4 py-2 rounded-md mr-2 transition-colors cursor-pointer ${
            activeTab === "drafted"
              ? "bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
              : "bg-transparent border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          }`}
          onClick={() => setActiveTab("drafted")}
        >
          Drafted Proposal
        </button>
        <button
          className={`px-4 py-2 rounded-md transition-colors cursor-pointer ${
            activeTab === "submitted"
              ? "bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
              : "bg-transparent border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          }`}
          onClick={() => setActiveTab("submitted")}
        >
          Submitted Proposal
        </button>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="text-center py-10 text-gray-500 dark:text-gray-400">
          Loading proposals...
        </div>
      )}

      {/* No data */}
      {!isLoading && currentProposals.length === 0 && (
        <div className="text-center py-10 text-gray-500 dark:text-gray-400">
          No {activeTab} proposals found.
        </div>
      )}

      {/* Proposals */}
      <div className="space-y-2">
        {!isLoading &&
          currentProposals.map((proposal) => (
            <div
              key={proposal.id}
              className={`flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg ${
                activeTab === "submitted"
                  ? "bg-green-400 dark:bg-green-800"
                  : "bg-white dark:bg-[#0B0B0C]"
              }`}
            >
              <div className="flex items-center flex-grow">
                <div className="mr-3 bg-gray-100 dark:bg-black border p-2 rounded-full">
                  <FileText size={18} className="text-gray-600 dark:text-gray-300" />
                </div>
                <div className="flex-grow">
                  {isEditing && selectedItem?.id === proposal.id ? (
                    <div className="flex items-center w-full">
                      <input
                        ref={inputRef}
                        type="text"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSaveRename()}
                        className="w-full bg-gray-100 dark:bg-black text-black dark:text-white p-1 rounded mr-2 border border-gray-300 dark:border-gray-600"
                      />
                      <button
                        onClick={handleSaveRename}
                        className="px-3 py-2 bg-green-600 text-white text-[15px] rounded hover:bg-green-700 dark:hover:bg-green-500 cursor-pointer"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <>
                      <h3 className="font-medium">{proposal.title || "Untitled Proposal"}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Date: {new Date(proposal.created_at).toLocaleDateString()}
                      </p>
                    </>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Link to={`/dashboard/contract_proposal/${proposal.id}`}>
                  <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full cursor-pointer">
                    <FileText size={18} className="text-gray-600 dark:text-gray-300" />
                  </button>
                </Link>
                <div className="relative">
                  <button
                    className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full cursor-pointer"
                    onClick={() =>
                      setShowDropdown(showDropdown === proposal.id ? null : proposal.id)
                    }
                  >
                    <MoreVertical size={18} className="text-gray-600 dark:text-gray-300" />
                  </button>

                  {showDropdown === proposal.id && (
                    <div
                      ref={dropdownRef}
                      className="absolute right-0 mt-2 w-36 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 border border-gray-200 dark:border-gray-700"
                    >
                    
                      <button
                        className="flex items-center w-full px-4 py-2 text-sm text-left text-red-500 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                        onClick={() => handleDelete(proposal.id)}
                      >
                        <Trash2 size={16} className="mr-2" />
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-opacity-50 dark:bg-opacity-70 backdrop-blur-[2px] shadow-xl"></div>
          <div className="bg-white dark:bg-[#0B0B0C] p-6 rounded-lg z-10 max-w-md w-full border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Confirm Delete
              </h3>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full cursor-pointer"
              >
                <X size={20} className="text-gray-600 dark:text-gray-300" />
              </button>
            </div>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Are you sure you want to delete this proposal? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => confirmDelete(selectedItem)}
                disabled={isDeleting}
                className={`px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 dark:hover:bg-red-500 cursor-pointer ${
                  isDeleting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllApplication;