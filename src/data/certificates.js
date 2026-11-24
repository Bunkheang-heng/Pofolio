export const resumeUrl = "/assets/resume.pdf";

export const certificateCategories = [
  "All",
  "Security & CTF",
  "AI & Cloud",
  "Hackathons & Honors",
  "Software & Management",
];

export const certificates = [
  {
    name: "AWS Academy Cloud Foundations",
    note: "AWS Academy · 2024",
    category: "AI & Cloud",
    file: "AWS_Academy_Graduate___AWS_Academy_Cloud_Foundations_Badge20240713-7-av9ujm.pdf",
  },
  {
    name: "Pan-SEA AI Developer Challenge",
    note: "Certificate of completion · 2025",
    category: "AI & Cloud",
    file: "BUNKHEANG-HENG--rean-ff53.pdf",
  },
  {
    name: "ASEAN Cyber Shield Excellence",
    note: "Outstanding student · 2024",
    category: "Hackathons & Honors",
    file: "Certificate of Excellence_HENG BUNKHEANG.pdf",
  },
  {
    name: "Clean Energy Hackathon",
    note: "EnergyLab Cambodia · 2023",
    category: "Hackathons & Honors",
    file: "certificate1.jpg",
  },
  {
    name: "Ideathon Cambodia Season 2",
    note: "Competition finalist · 2023",
    category: "Hackathons & Honors",
    file: "certificate2.jpg",
  },
  {
    name: "Incident Response",
    note: "Cybersecurity discipline · ACS",
    category: "Security & CTF",
    file: "Incident_Response_certificate.pdf",
  },
  {
    name: "Digital Forensics",
    note: "Cybersecurity discipline · ACS",
    category: "Security & CTF",
    file: "Digital_Forensic_certificate.pdf",
  },
  {
    name: "Malware Development & Analysis",
    note: "Cybersecurity discipline · ACS",
    category: "Security & CTF",
    file: "Malware_Dev_Analysis_certificate.pdf",
  },
  {
    name: "Real-world Web Exploitation",
    note: "Cybersecurity discipline · ACS",
    category: "Security & CTF",
    file: "Real-world_Web_Exploitation_certificate.pdf",
  },
  {
    name: "Real-world System Exploitation",
    note: "Cybersecurity discipline · ACS",
    category: "Security & CTF",
    file: "Real-world_System_Exploitation_certificate.pdf",
  },
  {
    name: "Web Hacking & Penetration Testing",
    note: "EC-Council · 2025",
    category: "Security & CTF",
    file: "7b4c45b8-8c95-4e11-8780-180d6ea29c36.png",
  },
  {
    name: "Kali Linux Penetration Testing",
    note: "EC-Council · 2025",
    category: "Security & CTF",
    file: "cfa26f29-542d-4775-9ea2-3668a3f8f091.png",
  },
  {
    name: "C Programming",
    note: "Core systems course certificate",
    category: "Software & Management",
    file: "C_Programming_Certificate.pdf",
  },
  {
    name: "Foundations of Project Management",
    note: "Google · Coursera · 2024",
    category: "Software & Management",
    file: "ProjectMangement.pdf",
  },
  {
    name: "Masterclass 2025",
    note: "Professional course · 31 Aug 2025",
    category: "Software & Management",
    file: "certificate.pdf",
  },
  {
    name: "Basic Certificate",
    note: "Foundational software certificate",
    category: "Software & Management",
    file: "basic_certificate.pdf",
  },
  {
    name: "Additional Engineering Certificate",
    note: "Development credential · 2023",
    category: "Software & Management",
    file: "certificate-1687351461466.pdf",
  },
];

export function certificateImage(file) {
  if (/\.(png|jpe?g|webp)$/i.test(file)) {
    return `/certificate/${encodeURIComponent(file)}`;
  }
  const stem = file.replace(/\.pdf$/i, "");
  return `/certificate/preview/${encodeURIComponent(stem)}.jpg`;
}
