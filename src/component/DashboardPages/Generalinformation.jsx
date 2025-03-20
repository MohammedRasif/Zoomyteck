import { useState } from "react";
import { AiOutlineFileSearch } from "react-icons/ai";
import { BiSolidShare } from "react-icons/bi";
import { NavLink } from "react-router-dom";

const GeneralInformation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // General information data object
  const generalInfo = {
    leftColumn: [
      {
        id: 1,
        icon: "document",
        label: "Notice ID:",
        value: "140C7523Q0000007",
      },
      {
        id: 2,
        icon: "contract",
        label: "Contract Opportunity Type:",
        value: "Presolicitation (Original)",
      },
      {
        id: 3,
        icon: "calendar",
        label: "Response Date:",
        value: "Jul 13, 2023",
      },
    ],
    rightColumn: [
      {
        id: 1,
        icon: "calendar",
        label: "Original Response Date:",
        value: "Jul 13, 2023 12:00 PM EDT",
      },
      {
        id: 2,
        icon: "calendar",
        label: "Original Published Date:",
        value: "Jun 05, 2023 12:24 PM EDT",
      },
      {
        id: 3,
        icon: "info",
        label: "Inactive Policy:",
        value: "15-30-60",
      },
    ],
  };

  // Description paragraphs
  const descriptionParagraphs = [
    "The Federal Bureau of Prisons, CLD Contracting Office in Washington, D.C., is seeking qualified providers for community-based residential treatment services for Federal offenders. The services will be provided to Federal offenders who are completing the remainder of their sentences in Residential Reentry Centers (RRCs) on home confinement, or under Federal Location Monitoring (FLM). The contract will cover a variety of residential treatment programs, including substance use disorder treatment, mental health treatment, and sex offender treatment. The program will be provided within a 50-mile radius of Memphis City Hall and be accessible via community-based transportation.",
    "The contract will have a base period of October 1, 2023 to September 30, 2024, with four optional one-year extensions, potentially extending the contract through September 30, 2028. The contractor will provide comprehensive, residential treatment services including psychiatric evaluations, medication administration, and case management. Specific units of service are guaranteed for each treatment category, ensuring a minimum level of service.",
    "The contractor will provide a range of services including psychiatric evaluations, medication management, individual and group therapy, and assessments. Mental health services will encompass psychiatric evaluations, crisis intervention, individual and group therapy, medication monitoring, and parenting-relationship counseling. The sex offender treatment program will provide intake assessments, counseling, and treatment planning. These services must follow evidence-based models and adhere to national standards recognized by the Bureau of Prisons.",
    "Providers must demonstrate a minimum of three years operational experience with materially comparable medical guidelines. Organizations interested in this opportunity must submit their proposals by the response date indicated above. All questions related to this contract should be directed to the contracting officer.",
  ];

  // Modal content (from the image)
  const modalContent = {
    title: "Analysis",
    overview: [
      {
        title: "The Federal Bureau of Prisons (BOP) requires a provider to deliver community-based outpatient substance use disorder, mental health, and sex offender treatment services to male & female Adult in Custody (AICs) in the Memphis, TN area. Key requirements and constraints include:",
        details: [
          "GEOGRAPHIC LOCATION: Services must be delivered within a 10-mile radius of Memphis City Hall, within 1/2 mile of public transportation, and within Tennessee.",
          "CLIENT POPULATION: Male and female AICs residing in the RRC, on home confinement, on Federal Location Monitoring (FLM), or reporting to a Day Reporting Center.",
          "SERVICE TYPES: Substance use disorder treatment, mental health treatment, and sex offender treatment. All must be outpatient services.",
          "CONTRACT DURATION: One-year base period (October 1, 2024 – September 30, 2025) with four one-year option periods, potentially extending to September 30, 2029.",
          "COMPLIANCE: Adherence to all relevant federal, state, and local regulations concerning the provision of these sensitive services. This likely includes HIPAA compliance, licensing, and potential accreditation standards.",
        ],
      },
    ],
    coverLetterRecommendations: [
      {
        title: "RECOMMENDATIONS FOR THE COVER LETTER:",
        items: [
          "1. Introduction: Begin by directly addressing the BOP’s need, clearly stating your organization’s understanding of the required proposals and services for the Residential Reentry Center (RRC) and Federal Location Monitoring (FLM) programs in Memphis, TN (e.g., correctional facilities, parole).",
          "2. Relevant Experience: Showcase successful projects involving community-based treatment for substance use disorder, mental health, and sex offender populations. Quantify your successes (e.g., 'Reduced recidivism rates by X%.' 'Served Y number of clients successfully'). Mention experience working with the federal government, if applicable.",
          "3. Demonstrating Ability to Meet Requirements: Specifically address the geographic limitations and transportation/access requirements. Highlight your expertise in each required treatment modality. Explain how your facilities and transportation plans meet these needs.",
          "4. Expressing Interest and Fit: Concisely demonstrate your organization’s commitment to providing high-quality, evidence-based care. Express your understanding of the sensitive nature of the work and your organization’s commitment to client confidentiality and success. Emphasize your ability to meet the contract timeline and option years.",
        ],
      },
    ],
    proposalRecommendations: [
      {
        title: "RECOMMENDATIONS FOR THE COVER LETTER:",
        items: [
          "1. Project Scope and Deliverables: Clearly define the services to be provided for each treatment modality, including specific treatment plans, assessment tools, and measurable outcomes. Detail the staffing plan, ensuring sufficient qualified personnel to meet the projected client load.",
          "2. Timelines, Performance Periods, and Milestones: Provide a detailed project schedule outlining key milestones for each year (base year + option years). This should include implementation, training, ongoing service delivery, reporting, and evaluation.",
          "3. Payment Terms and Budget Recommendations: Present a detailed budget breakdown, clearly outlining all costs (staffing, rent, supplies, administration, etc.). Propose fair and competitive payment terms aligned with the scope of work and the potential duration of the contract.",
          "4. Qualifications and Experience: Provide extensive documentation of your organization’s qualifications, including licenses, accreditations, and relevant certifications. Include resumes of key personnel, demonstrating their expertise and experience. Highlight successful completion of similar projects, quantifying results whenever possible.",
          "5. Compliance Requirements: Detail your adherence to HIPAA, state, and federal regulations governing mental health and substance use disorder treatment, and any relevant sex offender treatment regulations. Demonstrate your understanding of accessibility requirements for clients with disabilities.",
          "6. Key Evaluation Criteria: Anticipate the BOP’s evaluation criteria and address them directly in your proposal. For instance, if recidivism rates are likely a key metric, present data showing your organization’s track record in reducing recidivism. Emphasize your experience in data collection and reporting to comply with government reporting.",
        ],
      },
    ],
  };

  // Function to render the appropriate icon
  const renderIcon = (iconType) => {
    switch (iconType) {
      case "document":
        return (
          <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M9 12H15M9 16H15M9 8H15M5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      case "contract":
        return (
          <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      case "calendar":
        return (
          <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M8 7V3M16 7V3M7 11H17M5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      case "info":
        return (
          <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 15V17M12 7V13M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  // Function to open the modal with a 3-second transition
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="relative bg-white dark:bg-black text-black dark:text-white p-4 font-sans container mx-auto">
      {/* Main Content */}
      <div className={`${isModalOpen ? "blur-sm" : ""} transition-all duration-300`}>
        {/* Header */}
        <h1 className="text-3xl font-bold text-black dark:text-white mb-8">
          General Information
        </h1>

        {/* Information Grid */}
        <div className="flex items-center space-x-20">
          {/* Left Column */}
          <div className="space-y-2">
            {generalInfo.leftColumn.map((item) => (
              <div key={item.id} className="flex items-start">
                <div className="flex items-center">
                  {renderIcon(item.icon)}
                  <span className="text-md text-black dark:text-white">{item.label}</span>
                </div>
                <span className="text-md ml-2 text-gray-600 dark:text-gray-400">{item.value}</span>
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div className="space-y-2">
            {generalInfo.rightColumn.map((item) => (
              <div key={item.id} className="flex items-start">
                <div className="flex items-center">
                  {renderIcon(item.icon)}
                  <span className="text-md text-black dark:text-white">{item.label}</span>
                </div>
                <span className="text-md ml-2 text-gray-600 dark:text-gray-400">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Description Section */}
        <div className="mb-4 mt-10">
          <h2 className="text-3xl font-bold text-black dark:text-white mb-8">Description</h2>
          {descriptionParagraphs.map((paragraph, index) => (
            <p key={index} className={`text-sm leading-relaxed text-black dark:text-white ${index > 0 ? "mt-3" : ""}`}>
              {paragraph}
            </p>
          ))}
        </div>

        {/* Buttons */}
        <div className="space-x-3">
          <NavLink to="/dashboard/recent_contract">
            <button className="border border-gray-600 text-[16px] font-[500] px-4 py-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer transition">
              <div className="flex items-center space-x-1">
                <h1>Back</h1>
                <BiSolidShare className="mt-1" />
              </div>
            </button>
          </NavLink>
          <button
            onClick={handleOpenModal}
            className="border border-gray-600 text-[16px] font-[500] px-4 py-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer transition"
          >
            <div className="flex items-center space-x-1">
              <h1>Analyze</h1>
              <AiOutlineFileSearch />
            </div>
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Overlay with blur effect */}
          <div
            className="absolute inset-0  bg-opacity-50 backdrop-blur-[2px]"
            onClick={handleCloseModal}
          ></div>

          {/* Modal Content */}
          <div
            className="relative bg-white dark:bg-black text-black dark:text-white p-6 rounded-lg shadow-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto transition-all duration-3000 opacity-0"
            style={{ animation: "fadeIn 3s forwards" }}
          >
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-black dark:hover:text-white"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Modal Title */}
            <h2 className="text-2xl font-bold mb-4">{modalContent.title}</h2>

            {/* Overview Section */}
            {modalContent.overview.map((section, index) => (
              <div key={index} className="mb-6">
                <p className="text-sm leading-relaxed text-black dark:text-white">{section.title}</p>
                <ul className="mt-2 space-y-2">
                  {section.details.map((detail, idx) => (
                    <li key={idx} className="text-sm leading-relaxed text-black dark:text-white">
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Cover Letter Recommendations */}
            {modalContent.coverLetterRecommendations.map((section, index) => (
              <div key={index} className="mb-6">
                <h3 className="text-lg font-semibold mb-2 text-black dark:text-white">{section.title}</h3>
                <ul className="space-y-2">
                  {section.items.map((item, idx) => (
                    <li key={idx} className="text-sm leading-relaxed text-black dark:text-white">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Proposal Recommendations */}
            {modalContent.proposalRecommendations.map((section, index) => (
              <div key={index} className="mb-6">
                <h3 className="text-lg font-semibold mb-2 text-black dark:text-white">{section.title}</h3>
                <ul className="space-y-2">
                  {section.items.map((item, idx) => (
                    <li key={idx} className="text-sm leading-relaxed text-black dark:text-white">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Generate Proposal Button */}
            <NavLink to="/dashboard/contract_proposal">
              <button className="mt-4 border border-gray-600 text-[16px] font-[500] px-4 py-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer transition">
                Generate Proposal
              </button>
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default GeneralInformation;