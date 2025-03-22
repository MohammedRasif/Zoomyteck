"use client"

import { useState } from "react"
import { PDFDownloadLink, Document, Page, Text, StyleSheet } from "@react-pdf/renderer"
import { FaCloudDownloadAlt, FaEdit, FaSave, FaArrowLeft, FaPaperPlane } from "react-icons/fa"
import { NavLink } from "react-router-dom"
import { MdOutlineVerifiedUser } from "react-icons/md";

import { RiDraftLine } from "react-icons/ri"

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
})

// PDF Document Component
const ProposalPDF = ({ title, description }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.content}>{description}</Text>
    </Page>
  </Document>
)

const ContractProposal = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [showPopup, setShowPopup] = useState(false) // State for showing the popup
  const [title] = useState("Contract Proposal")
  const [description, setDescription] = useState(
    "This document represents a comprehensive contract proposal submitted to the Federal Bureau of Prisons for providing Substance Use Disorder (SUD) and Medication-Assisted Treatment (MAT) services for individuals in custody. The proposal outlines a structured approach to delivering healthcare services within correctional facilities, specifically targeting the Memphis, TN area under Solicitation Number TBICTS74D0000007.",
  )

  // Handle submit button click
  const handleSubmit = () => {
    setShowPopup(true) // Show the popup
  }

  // Close the popup
  const closePopup = () => {
    setShowPopup(false)
  }

  return (
    <div className={`container mx-auto p-4 dark:bg-black dark:text-white ${showPopup ? "" : ""}`}>
      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50 z-50 backdrop-blur-[3px] ">
          <div className="dar:bg-zinc-900 bg-gray-200 p-6 rounded-md shadow-lg dark:text-white dark:bg-zinc-800">
          <div className="flex justify-center">
          <MdOutlineVerifiedUser className=" text-8xl text-green-600" />
          </div>

            <p className="text-[20px]">Your proposal has been sent successfully.</p>
            <button
              onClick={closePopup}
              className="mt-4 bg-back dark:text-white px-4 py-2 rounded hover:bg-gray-300 dark:hover:bg-zinc-800 border border-gray-500 transition w-full cursor-pointer "
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
          <button className="flex items-center border border-gray-300 px-3 py-1 rounded-md dark:text-white dark:hover:bg-gray-700 hover:bg-gray-200 transition space-x-2 cursor-pointer">
            <RiDraftLine />
            <span className="mr-2">Draft</span>
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
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center border border-gray-400 px-3 py-1 rounded-md dark:text-white dark:hover:bg-gray-700 hover:bg-gray-200 transition cursor-pointer"
        >
          {isEditing ? <FaSave className="mr-2" /> : <FaEdit className="mr-2" />}
          {isEditing ? "Save Proposal" : "Edit Proposal"}
        </button>
        <button
          onClick={handleSubmit}
          className="flex items-center border border-gray-400 px-3 py-1 rounded-md dark:text-white dark:hover:bg-gray-700 hover:bg-gray-200 transition cursor-pointer"
        >
          <FaPaperPlane className="mr-2" />
          Submit Proposal
        </button>
      </div>
    </div>
  )
}

export default ContractProposal