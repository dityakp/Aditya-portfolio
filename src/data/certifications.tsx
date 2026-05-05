export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
  link?: string;
  description: string;
}

export const certificationsData: Certification[] = [
  {
    id: "oracle-oci-foundations-2025",
    name: "Oracle Cloud Infrastructure 2025 Certified Foundations Associate",
    issuer: "Oracle",
    date: "2025",
    link: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=A2BDDF5C5A249AB3DFFBEF9ADE348FD37A099770ECB1BE869E7C7B6CCDA19BBA",
    description: "Validated foundational knowledge of core cloud computing concepts and Oracle Cloud Infrastructure services, including networking, security, architecture, and cloud operations."
  },
  {
    id: "aws-knowledge-badges",
    name: "AWS Knowledge Badges (Compute, Storage, Security, IAM)",
    issuer: "Amazon Web Services (AWS)",
    date: "2024 - Present",
    link: "https://www.credly.com/users/aditya-kumar-prasad.5a0168ce/badges#credly",
    description: "Earned comprehensive AWS knowledge badges demonstrating proficiency across core cloud domains: EC2/Serverless Compute, S3/Block Storage solutions, Identity & Access Management (IAM), and Cloud Security best practices."
  }
];
