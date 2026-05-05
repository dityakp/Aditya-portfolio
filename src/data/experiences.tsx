import React from 'react';
import { Cloud, Server, Lock, FileText, Award, Calendar, FileBadge } from 'lucide-react';

export const experiencesData = [
  {
    id: "pearlthoughts",
    role: "DevOps Engineer Intern (Winter Cohort)",
    company: "Pearl Thoughts Pvt. Ltd",
    date: "Dec 2025 — Feb 2026",
    appointmentDate: "December 3, 2025",
    desc: "Collaborated directly with the Founder and engineering team to align infrastructure strategy with product requirements. Engineered containerized application deployments on AWS ECS Fargate using Docker. Defined Infrastructure as Code using Terraform. Designed CI/CD automation workflows using GitHub Actions to streamline build and deployment lifecycle. Executed Blue/Green deployment strategy via AWS CodeDeploy. Implemented centralized logging and monitoring using AWS CloudWatch.",
    tags: ["Docker", "AWS ECS Fargate", "GitHub Actions", "Terraform", "AWS CodeDeploy", "AWS CloudWatch"],
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
    company: "Criminal Investigation Department",
    date: "Jul 2025 — Aug 2025",
    appointmentDate: "July 28, 2025",
    desc: "Performed system and network log analysis to support incident investigation workflows. Examined network traffic (TCP/IP, DNS, HTTP/HTTPS) for anomaly detection. Documented escalation procedures and incident response processes. Strengthened troubleshooting and analytical reasoning capabilities.",
    tags: ["Cyber Forensics", "Log Analysis", "Network Traffic Analysis", "Anomaly Detection", "Incident Response"],
    proofs: [
      { name: "Official Appointment Letter", icon: <FileText size={20} />, docPath: "/documents/cid-jharkhand/cid_offer.pdf" },
      { name: "CID Commendation Letter", icon: <Award size={20} />, docPath: "/documents/cid-jharkhand/CID Internship Certificate.pdf" }
    ],
    certificates: [],
    impact: "Assisted in blockage of IMEI numbers of stolen phones by accessing the Central Cyber Portal."
  },
  {
    id: "bccl",
    role: "DevOps Engineer Intern",
    company: "Bharat Coking Coal Limited",
    date: "Jun 2025 — Jul 2025",
    appointmentDate: "June 25, 2025",
    desc: "Participated in meetings with IT supervisors to gather infrastructure and deployment requirements. Deployed a cloud-based attendance management system on Ubuntu AWS EC2. Built Jenkins CI/CD pipelines to automate testing and deployment stages. Configured Linux server environment, firewall policies, and service monitoring controls.",
    tags: ["AWS EC2", "Jenkins CI/CD", "Docker", "Linux Administration", "Firewall Policies", "Ubuntu"],
    proofs: [
      { name: "Internship Offer Letter", icon: <FileText size={20} />, docPath: "/documents/bccl/bccl_offer.pdf" },
      { name: "Experience Certificate", icon: <FileBadge size={20} />, docPath: "/documents/bccl/bccl_certificate.pdf" }
    ],
    certificates: [],
    impact: "Automated manual deployments, reducing system provisioning time from 2 days to 3 hours."
  }
];
