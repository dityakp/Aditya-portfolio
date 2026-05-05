import React from 'react';
import { Cloud, Server, Lock, FileText, Award, Calendar, FileBadge } from 'lucide-react';

export const experiencesData = [
  {
    id: "pearlthoughts",
    role: "DevOps Engineer Intern",
    company: "PearlThoughts Pvt. Ltd",
    date: "Dec 2025 — Feb 2026",
    appointmentDate: "December 1, 2025",
    desc: "Containerized Strapi apps via Docker & AWS ECS Fargate. Built CI/CD pipelines with GitHub Actions. Provisioned infrastructure with Terraform. Implemented Blue/Green deployments via CodeDeploy.",
    tags: ["Docker", "AWS ECS", "GitHub Actions", "Terraform", "CodeDeploy"],
    proofs: [
      { name: "Offer Letter", icon: <FileText size={20} />, docPath: "/documents/pearlthoughts/PT_Offer_letter.pdf" },
      { name: "Internship Completion Certificate", icon: <FileBadge size={20} />, docPath: "/documents/pearlthoughts/PearlThoughts Internship.pdf" }
    ],
    certificates: [],
    impact: "Reduced deployment time by 40% and achieved zero-downtime rolling updates."
  },
  {
    id: "cid-jharkhand",
    role: "Cyber Security Intern",
    company: "CID, Jharkhand Police",
    date: "Jul — Aug 2025",
    appointmentDate: "July 15, 2025",
    desc: "Assisted in cybercrime investigation support. Handled digital evidence and cyber forensics workflows. Conducted log analysis, IP tracing, and analyzed system-level indicators.",
    tags: ["Cyber Forensics", "Log Analysis", "IP Tracing", "Digital Evidence", "Security Auditing"],
    proofs: [
      { name: "Official Appointment Letter", icon: <FileText size={20} />, docPath: "/documents/cid-jharkhand/cid_offer.pdf" },
      { name: "CID Commendation Letter", icon: <Award size={20} />, docPath: "/documents/cid-jharkhand/CID Internship Certificate.pdf" }
    ],
    certificates: [],
    impact: "Assisted in 15+ live cybercrime investigations, recovering crucial digital footprint data."
  },
  {
    id: "bccl",
    role: "DevOps Engineer Intern",
    company: "Bharat Coking Coal Limited",
    date: "Jun — Jul 2025",
    appointmentDate: "June 1, 2025",
    desc: "Designed secure modules improving system security by 30%. Implemented CI/CD pipelines and automated deployment workflows on AWS EC2.",
    tags: ["AWS EC2", "CI/CD", "Security Modules", "Automation", "Linux Administration"],
    proofs: [
      { name: "Internship Offer Letter", icon: <FileText size={20} />, docPath: "/documents/bccl/bccl_offer.pdf" },
      { name: "Experience Certificate", icon: <FileBadge size={20} />, docPath: "/documents/bccl/bccl_certificate.pdf" }
    ],
    certificates: [],
    impact: "Automated manual deployments, reducing system provisioning time from 2 days to 3 hours."
  }
];
