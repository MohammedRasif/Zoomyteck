import React, { useState } from "react";
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// [Styles remain unchanged...]
const styles = StyleSheet.create({
  page: {
    padding: 40,
  },
  section: {
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: "bold",
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  listItem: {
    fontSize: 12,
    marginLeft: 10,
    marginBottom: 5,
  },
});

// [MyDocument component remains unchanged...]
const MyDocument = ({ coverLetterData, proposalData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>{coverLetterData.title}</Text>
        <Text style={styles.text}>{coverLetterData.companyName}</Text>
        <Text style={styles.text}>{coverLetterData.date}</Text>
        <Text style={styles.text}>{coverLetterData.recipient.organization}</Text>
        <Text style={styles.text}>{coverLetterData.recipient.department}</Text>
        <Text style={styles.text}>{coverLetterData.recipient.location}</Text>
        <Text style={styles.text}>{coverLetterData.subject}</Text>
        {coverLetterData.content.map((paragraph, index) => (
          <Text key={index} style={styles.text}>
            {paragraph}
          </Text>
        ))}
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>{proposalData.title}</Text>
        <Text style={styles.text}>{proposalData.projectTitle}</Text>
        <Text style={styles.text}>{proposalData.solicitation}</Text>
        <Text style={styles.text}>{proposalData.preparedFor}</Text>
        <Text style={styles.text}>{proposalData.preparedBy}</Text>
        <Text style={styles.text}>{proposalData.date}</Text>
        {proposalData.sections.map((section) => (
          <View key={section.id} style={styles.section}>
            <Text style={styles.subtitle}>
              {section.id}. {section.title}
            </Text>
            <Text style={styles.text}>{section.content}</Text>
            {section.subItems && (
              <View>
                {section.subItems.map((item, index) => (
                  <Text key={index} style={styles.listItem}>
                    • {item}
                  </Text>
                ))}
              </View>
            )}
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

const ContractProposal = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState("");

  const [coverLetterData, setCoverLetterData] = useState({
    // [Your existing coverLetterData...]
    title: "Cover Letter",
    companyName: "Your Company Letterhead",
    date: "April 17, 2024",
    recipient: {
      organization: "Federal Bureau of Prisons",
      department: "CLD Contracting Office",
      location: "Washington, D.C.",
    },
    subject: "Subject: Response to Solicitation Number 140C7523Q0000007 - SUD/MH/SOT in Memphis, TN",
    content: [
      "Dear Federal Bureau of Prisons Contracting Officer,",
      "XYZ Healthcare Solutions is pleased to submit this proposal in response to Solicitation Number 140C7523Q0000007 - SUD/MH/SOT in Memphis, TN. We offer a full-service SUD/MH/SOT/AOD solution that will meet the needs of Federal offenders in the Memphis area who are completing the remainder of their health (MH), and/or substance use disorder (SUD) services for Adult in Custody (AICs) in the Memphis, TN area, and are confident that our expertise and dedication will contribute significantly to the program's success.",
      "XYZ Healthcare Solutions has a strong record of comprehensive behavioral health care services, with a focus on evidence-based treatment approaches and compassionate care to diverse populations, including those involved in the criminal justice system. Our team of licensed clinicians and support staff has extensive experience in SUD, MH, and SOT services for justice-involved individuals, and our evidence-based approach ensures that all individuals receive the highest quality of care tailored to their specific needs. We understand the unique challenges that justice-involved individuals face and are committed to support their need to successfully reintegrate into the community.",
      "Our location at 123 Healthcare Ave, Suite 500, Memphis, TN 38801, conveniently situated within a 10-mile radius of Memphis City Hall and within 1/2 mile of public transportation, makes our facility easily accessible to all individuals referred to the solicitation. We are prepared to begin service on October 1, 2024, and are enthusiastic about the opportunity to partner with the Federal Bureau of Prisons to provide exceptional care to AICs in the Memphis community. We look forward to discussing our proposal further.",
      "Sincerely,",
      "Your Name/Title",
      "XYZ Healthcare Solutions",
      "yourname@healthcare.com",
      "+1 800-555-0101",
    ],
  });

  const [proposalData, setProposalData] = useState({
    // [Your existing proposalData...]
    title: "Contract Proposal",
    projectTitle: "Project Title: Substance Abuse and Sex Offender Treatment Services",
    solicitation: "Solicitation Number: 140C7523Q0000007",
    preparedFor: "Prepared for: Federal Bureau of Prisons, CLD Contracting Office",
    preparedBy: "Prepared by: XYZ Healthcare Solutions",
    date: "April 17, 2024",
    sections: [
      {
        id: 1,
        title: "Introduction",
        content:
          "XYZ Healthcare Solutions proposes to provide comprehensive, community-based SUD, MH, and SOT services for male and female AICs in the Memphis, TN area, as outlined in Solicitation Number 140C7523Q0000007. Our proposed solution includes the following scope of services, pricing structure, and contract terms.",
      },
      {
        id: 2,
        title: "Scope of Services",
        content: "XYZ Healthcare Solutions will provide the following services:",
        subItems: [
          "Comprehensive, evidence-based treatment plans addressing SUD, MH, and/or SOT needs.",
          "Group Therapy: Facilitated group sessions promoting peer support and skill development.",
          "Medication-Assisted Treatment (MAT): Medication management and clinical and physical provision of MAT services in collaboration with prescribing physicians.",
          "Individual Therapy: One-on-one counseling sessions tailored to individual needs.",
          "Case Management: Coordination of care, connecting AICs with community resources, and monitoring progress.",
          "Relapse Prevention Planning: Development of individualized strategies to prevent relapse and maintain recovery.",
          "Family Counseling: Optional involvement of family members and significant support to facilitate successful re-entry and reintegration in the justice system.",
          "Transportation Assistance: Coordination of community-based transportation for AICs lacking reliable access.",
          "All services will be delivered within a 10-mile radius of Memphis City Hall, with provision of public transportation, and will adhere to all applicable state and federal regulations.",
        ],
      },
      {
        id: 3,
        title: "Contract Duration",
        content:
          "Base Period Duration: One-year base period (October 1, 2024 – September 30, 2025), with four one-year option periods.",
        subItems: [
          "Payment Terms: [specify payment terms, e.g., Net 30 upon submission of invoices with detailed line service logs.]",
          "Performance Metrics/Key Performance Indicators (KPIs): e.g., client retention rates, treatment completion rates, reduction in substance use/recidivism, etc.",
          "Quality Assurance: Regular program evaluations and outcome assessments.",
          "Confidentiality: Strict adherence to HIPAA and all relevant confidentiality regulations.",
          "Liability Insurance: XYZ Healthcare Solutions maintains appropriate liability and malpractice coverage.",
        ],
      },
      {
        id: 4,
        title: "Pricing Structure",
        content:
          "Provide a detailed pricing structure. This should include per-session rates for individual and group therapy, case management fees, and any other relevant charges. Example:",
        subItems: [
          "Individual Therapy Session: $[Amount]",
          "Group Therapy Session: $[Amount]",
          "Case Management per month: $[Amount]",
          "MAT (per month): $[Amount]",
        ],
      },
      {
        id: 5,
        title: "Conclusion",
        content:
          "XYZ Healthcare Solutions is committed to providing high-quality, efficient, and effective treatment services to AICs in the Memphis, TN area. We are confident that our expertise and dedication will contribute significantly to the success of the Federal Bureau of Prisons' reentry program. We are eager to partner with you and look forward to the opportunity to discuss this proposal further.",
      },
    ],
  });

  // Combine all content into a single string for initial display
  const getCombinedContent = () => {
    return [
      coverLetterData.title,
      coverLetterData.companyName,
      coverLetterData.date,
      coverLetterData.recipient.organization,
      coverLetterData.recipient.department,
      coverLetterData.recipient.location,
      coverLetterData.subject,
      ...coverLetterData.content,
      "",
      proposalData.title,
      proposalData.projectTitle,
      proposalData.solicitation,
      proposalData.preparedFor,
      proposalData.preparedBy,
      proposalData.date,
      ...proposalData.sections.map(
        (section) =>
          `${section.id}. ${section.title}\n${section.content}${
            section.subItems ? '\n' + section.subItems.map((item) => `• ${item}`).join('\n') : ''
          }`
      ),
    ].join('\n');
  };

  const handleEditToggle = () => {
    if (isEditing) {
      // Save logic when toggling from edit to view mode
      const lines = editedContent.split('\n').filter(line => line.trim() !== '');
      
      // Update cover letter data
      setCoverLetterData({
        title: lines[0],
        companyName: lines[1],
        date: lines[2],
        recipient: {
          organization: lines[3],
          department: lines[4],
          location: lines[5],
        },
        subject: lines[6],
        content: lines.slice(7, lines.indexOf('') > -1 ? lines.indexOf('') : lines.length),
      });

      // Update proposal data
      const proposalStartIndex = lines.indexOf('') + 1;
      const proposalLines = lines.slice(proposalStartIndex);
      setProposalData(prev => ({
        title: proposalLines[0],
        projectTitle: proposalLines[1],
        solicitation: proposalLines[2],
        preparedFor: proposalLines[3],
        preparedBy: proposalLines[4],
        date: proposalLines[5],
        sections: prev.sections.map((section, index) => {
          const sectionStart = 6 + (index * 3); // Adjust based on section structure
          const sectionLines = proposalLines.slice(sectionStart);
          return {
            ...section,
            title: sectionLines[0]?.split('. ')[1] || section.title,
            content: sectionLines[1] || section.content,
            subItems: sectionLines.slice(2).filter(line => line.startsWith('• ')).map(line => line.substring(2)) || section.subItems,
          };
        }),
      }));
    } else {
      // Set initial content when entering edit mode
      setEditedContent(getCombinedContent());
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="bg-black text-white p-4 font-sans container mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold">Contract Proposal</h1>
        <div className="flex space-x-2">
          <PDFDownloadLink
            document={<MyDocument coverLetterData={coverLetterData} proposalData={proposalData} />}
            fileName="contract_proposal.pdf"
          >
            {({ loading }) => (
              <button className="flex items-center px-3 py-2 rounded text-sm border border-gray-300 hover:bg-white hover:text-black cursor-pointer">
                <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {loading ? "Loading..." : "Download"}
              </button>
            )}
          </PDFDownloadLink>
          <button
            className="flex items-center px-3 py-2 rounded text-sm border border-gray-500 hover:bg-white hover:text-black cursor-pointer"
            onClick={handleEditToggle}
          >
            <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {isEditing ? "Save" : "Edit Proposal"}
          </button>
        </div>
      </div>

      <div className="border border-gray-700 rounded-lg p-4 mb-4">
        {isEditing ? (
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="w-full h-[60vh] p-2 bg-transparent text-white border border-gray-500 rounded resize-none focus:outline-none"
            placeholder="Edit your proposal here..."
          />
        ) : (
          <>
            <div className="mb-6">
              <h2 className="font-bold mb-2">{coverLetterData.title}</h2>
              <p className="text-sm">{coverLetterData.companyName}</p>
              <p className="text-sm">{coverLetterData.date}</p>
              <p className="text-sm">{coverLetterData.recipient.organization}</p>
              <p className="text-sm">{coverLetterData.recipient.department}</p>
              <p className="text-sm">{coverLetterData.recipient.location}</p>
              <p className="text-sm mb-2">{coverLetterData.subject}</p>
              {coverLetterData.content.map((paragraph, index) => (
                <p key={index} className="text-sm mb-2">
                  {paragraph}
                </p>
              ))}
            </div>
            <div>
              <h2 className="font-bold mb-2">{proposalData.title}</h2>
              <p className="text-sm">{proposalData.projectTitle}</p>
              <p className="text-sm">{proposalData.solicitation}</p>
              <p className="text-sm">{proposalData.preparedFor}</p>
              <p className="text-sm">{proposalData.preparedBy}</p>
              <p className="text-sm mb-4">{proposalData.date}</p>
              {proposalData.sections.map((section) => (
                <div key={section.id} className="mb-4">
                  <h3 className="font-bold text-sm mb-1">
                    {section.id}. {section.title}
                  </h3>
                  <p className="text-sm mb-2">{section.content}</p>
                  {section.subItems && (
                    <ul className="list-disc pl-6 mb-2">
                      {section.subItems.map((item, index) => (
                        <li key={index} className="text-sm mb-1">
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="flex space-x-2">
        <button className="flex items-center px-3 py-1 rounded text-sm border border-gray-500 hover:bg-gray-800 transition">
          <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back
        </button>
        <button className="flex items-center px-3 py-1 rounded text-sm bg-blue-600 text-white hover:bg-blue-700 transition">
          <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Submit Proposal
        </button>
      </div>
    </div>
  );
};

export default ContractProposal;