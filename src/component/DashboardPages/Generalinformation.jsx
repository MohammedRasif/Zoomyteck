import { AiOutlineFileSearch } from "react-icons/ai"
import { BiSolidShare } from "react-icons/bi"
import { FaShare } from "react-icons/fa"
import { NavLink } from "react-router-dom"

const GeneralInformation = () => {
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
    }
  
    // Description paragraphs
    const descriptionParagraphs = [
      "The Federal Bureau of Prisons, CLD Contracting Office in Washington, D.C., is seeking qualified providers for community-based residential treatment services for Federal offenders. The services will be provided to Federal offenders who are completing the remainder of their sentences in Residential Reentry Centers (RRCs) on home confinement, or under Federal Location Monitoring (FLM). The contract will cover a variety of residential treatment programs, including substance use disorder treatment, mental health treatment, and sex offender treatment. The program will be provided within a 50-mile radius of Memphis City Hall and be accessible via community-based transportation.",
      "The contract will have a base period of October 1, 2023 to September 30, 2024, with four optional one-year extensions, potentially extending the contract through September 30, 2028. The contractor will provide comprehensive, residential treatment services including psychiatric evaluations, medication administration, and case management. Specific units of service are guaranteed for each treatment category, ensuring a minimum level of service.",
      "The contractor will provide a range of services including psychiatric evaluations, medication management, individual and group therapy, and assessments. Mental health services will encompass psychiatric evaluations, crisis intervention, individual and group therapy, medication monitoring, and parenting-relationship counseling. The sex offender treatment program will provide intake assessments, counseling, and treatment planning. These services must follow evidence-based models and adhere to national standards recognized by the Bureau of Prisons.",
      "Providers must demonstrate a minimum of three years operational experience with materially comparable medical guidelines. Organizations interested in this opportunity must submit their proposals by the response date indicated above. All questions related to this contract should be directed to the contracting officer.",
    ]
  
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
          )
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
          )
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
          )
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
          )
        default:
          return null
      }
    }
  
    return (
      <div className="bg-black text-white p-4 font-sans container mx-auto">
       <div className="">
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
                  <span className="text-md">{item.label}</span>
                </div>
                <span className="text-md ml-2 text-gray-400">{item.value}</span>
              </div>
            ))}
          </div>
  
          {/* Right Column */}
          <div className="space-y-2">
            {generalInfo.rightColumn.map((item) => (
              <div key={item.id} className="flex items-start">
                <div className="flex items-center">
                  {renderIcon(item.icon)}
                  <span className="text-md">{item.label}</span>
                </div>
                <span className="text-md ml-2 text-gray-400">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
  
        {/* Description Section */}
        <div className="mb-4 mt-10">
          <h2 className="text-3xl font-bold text-black dark:text-white mb-8">Description</h2>
          {descriptionParagraphs.map((paragraph, index) => (
            <p key={index} className={`text-sm leading-relaxed ${index > 0 ? "mt-3" : ""}`}>
              {paragraph}
            </p>
          ))}
        </div>
       </div>

       <div className="space-x-3">
       <NavLink to="/dashboard/recent_contract">
        <button className="border border-gray-600 text-[16px] font-[500] px-4 py-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer transition ">
            <div className="flex items-center space-x-1">
                <h1>Back</h1>
                <BiSolidShare  className="mt-1"/>

            </div>
        </button>
       </NavLink>
       <button className="border border-gray-600 text-[16px] font-[500] px-4 py-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer transition ">
            <div className="flex items-center space-x-1">
                <h1>Analyze</h1>
                <AiOutlineFileSearch />

            </div>
        </button>
       </div>
      </div>
    )
  }
  
  export default GeneralInformation
  
  