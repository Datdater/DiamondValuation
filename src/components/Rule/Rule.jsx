import React from "react";
import {
  Box,
  Container,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

// Function to wrap "H&TDiamond" with a span for styling
const highlightHTDiamond = (text) => {
  const parts = text.split(/(H&TDiamond)/g);
  return parts.map((part, index) =>
    part === "H&TDiamond" ? (
      <span key={index} style={{ color: "#3e6272", fontWeight: "bold" }}>
        H&TDiamond
      </span>
    ) : (
      part
    ),
  );
};

const rules = [
  {
    title: "1. GENERAL RULES",
    items: [
      "1.1. Customers conducting transactions at H&TDiamond must provide complete and accurate information on the INSPECTION REQUEST FORM located at the transaction counter. H&TDiamond will issue an INSPECTION RECEIPT based on the INSPECTION REQUEST FORM. The information includes: Customer's Name, Address, Phone Number, ID Number, Email, Service Request. In case of Re-sealing or Reissuing an Inspection Certificate, Customers need to provide the Number of the Inspection Sample (which may include the old Seal or Inspection Certificate).",
      "1.2. H&TDiamond is not legally responsible for the authenticity of the information provided by the Customer.",
      "1.3. The INSPECTION RECEIPT (IR) is considered as the INSPECTION SERVICE CONTRACT (ISC) between H&TDiamond and the Customer. The IR is printed in two copies, one for H&TDiamond and one for the Customer.",
      "1.4. In case the Customer changes the ISC, they must notify H&TDiamond by phone within 1 hour from sending the Sample (not applicable for urgent inspection requests). After this time, the Customer cannot change any details on the ISC.",
      "1.5. The IR only confirms the NUMBER of Inspection Samples. Information about weight, size, color, cut shape, sample name provided by the Customer is for reference and identification purposes only.",
      "1.6. H&TDiamond does not determine the actual nature of the Inspection Sample, whether it is a natural, synthetic, or treated stone at the time of receiving the Inspection Sample.",
      "1.7. The IR is valid for 30 days from the date of sending the Inspection Sample. After 30 days, if the Customer has not received the result and the Inspection Sample, H&TDiamond will call to extend the time for the Customer for another 15 days. If within this period the Customer still does not collect the sample or if H&TDiamond cannot contact the Customer, H&TDiamond will seal the Inspection Samples and resolve it according to the Company's regulations.",
      "1.8. In case of obstacles or changes during the inspection, H&TDiamond will notify and discuss with the Customer to find the best solution.",
      "1.9. H&TDiamond conducts the inspection independently and has the right to refuse the inspection request if the Customer does not provide complete information on the INSPECTION REQUEST FORM or if it does not meet technical and professional requirements.",
      "1.10. H&TDiamond's Inspection Certificate is not a warranty certificate and does not appraise the attached Inspection Sample.",
      "1.11. H&TDiamond does not represent or guarantee the Inspection Certificate as it only describes the characteristics and technical parameters of the Inspection Sample after inspection according to the standards and equipment available at H&TDiamond at the time of inspection. Future inspection results may vary depending on:",
      "• Timing, method, and Inspector conducting the inspection.",
      "• Technological and equipment improvements that help Inspectors detect additional elements of the Sample that H&TDiamond could not previously detect.",
      "1.12. The use of H&TDiamond's brand, logo, or any content of the Inspection Certificate for other purposes such as advertising, promotion, etc., must be approved by H&TDiamond.",
      "1.13. H&TDiamond is not legally responsible for any disputes, damage, or loss arising from errors on the Inspection Certificate and in the circulation of the Inspection Certificate.",
      "1.14. Re-sealing Rules:",
      "• H&TDiamond will re-seal Inspection Samples after verifying the technical parameters. If there are discrepancies or issues during the use of the Sample by the Customer (cracks, chips, edges, bottom chips, cutting, polishing, etc.), H&TDiamond will NOT re-seal and will return the Inspection Sample to the Customer.",
      "• If the old seal provided by H&TDiamond is intact, H&TDiamond will open the old seal and re-seal according to the Customer's request.",
      "• If the old seal provided by H&TDiamond is not intact (showing signs of cracks, etc.) and the Customer still wants to re-seal, the Sample must be inspected and a condition report made in the presence of H&TDiamond and the Customer. The old seal must be opened by the Customer. Any future risks or claims in this case are not the responsibility of H&TDiamond.",
      "• If the Sample is still in the Customer's sealed packaging, the Customer must open the seal before submitting the Sample to H&TDiamond.",
      "1.15. Rules for returning inspection results and Samples:",
      "• H&TDiamond will return the inspection results and Samples when:",
      "(1) The Customer presents the IR.",
      "(2) The person receiving is the named person on the IR.",
      "• If there is a change in the person receiving the results and Samples, the following rules apply:",
      "(1) The Customer must notify H&TDiamond by phone.",
      "(2) The new recipient must provide the following information: name, address, phone number, ID/Passport number.",
      "(3) A letter of authorization with the sender's signature must be provided.",
      "Units within the PNJ Group must notify H&TDiamond in advance when changing the responsible transaction personnel (directly, by phone, or introduction letter).",
      "• If the Customer loses the IR, the following rules apply:",
      "(1) The Customer must notify H&TDiamond as soon as possible.",
      "(2) The results and Samples will be retained and only returned when the IR expires after 3 days.",
      "(3) The Customer must sign a commitment letter according to H&TDiamond's template.",
      "(4) The Customer must provide a copy of the ID/Passport and a confirmation letter from the business (if the Customer is a business).",
      "Units within the PNJ Group must have a confirmation letter from the Unit Manager when losing the IR.",
      "• H&TDiamond has the right to refuse to return the results and Samples if there are risk factors.",
      "1.16. By signing the IR, the Customer is deemed to have read and agreed to the general inspection service rules stated in this document, unless otherwise agreed in writing between the two parties.",
    ],
  },
  {
    title: "2. CUSTOMER COMMITMENTS",
    items: [
      "Customers are responsible for checking the correct number of Inspection Samples, the quality of seals, the number, and quality of Inspection Certificates (if any) before leaving the transaction counter. Any complaints related to these issues after leaving the counter will not be resolved.",
    ],
  },
  {
    title: "3. H&TDiamond COMMITMENTS",
    items: [
      "H&TDiamond commits to performing the agreed inspection content with the Customer based on existing knowledge, technical capabilities, and expertise to provide the best inspection service to the Customer with full responsibility according to current regulations.",
      "H&TDiamond commits to keeping all personal information and inspection results of the Customer confidential and will not disclose information to any third party without the Customer's written consent, except as required by law.",
    ],
  },
];

const RulePage = () => {
  return (
    <Container>
      <Box mt={4}>
        <Typography
          variant="h4"
          component="h1"
          fontWeight="bold"
          textAlign="center"
          gutterBottom
        >
          GENERAL RULES FOR INSPECTION SERVICES -{" "}
          <span style={{ color: "#3e6272" }}>H&TDiamond</span>
        </Typography>
        {rules.map((section, index) => (
          <Box key={index} mb={4}>
            <Typography
              variant="h6"
              component="h2"
              fontWeight="bold"
              gutterBottom
            >
              {section.title}
            </Typography>
            <List>
              {section.items.map((item, idx) => (
                <ListItem
                  key={idx}
                  sx={{
                    pl: item.startsWith("•")
                      ? 6
                      : item.match(/^\d+\.\d+/)
                        ? 4
                        : item.match(/^\(\d+\)/)
                          ? 8
                          : 2,
                  }}
                >
                  <ListItemText primary={highlightHTDiamond(item)} />
                </ListItem>
              ))}
            </List>
            {index < rules.length - 1 && <Divider />}
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default RulePage;
