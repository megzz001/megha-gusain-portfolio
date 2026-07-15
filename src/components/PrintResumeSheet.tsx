import { ME_INFO, PROJECTS, EXPERIENCE, CERTIFICATIONS, SKILL_CATEGORIES } from '../data';

export default function PrintResumeSheet() {
  const coursework = [
    "Data Structures & Algorithms",
    "Database Management Systems",
    "Object-Oriented Programming",
    "Operating Systems",
    "Computer Networks",
    "Software Engineering",
    "Cloud Computing"
  ];

  return (
    <div className="hidden print:block w-full max-w-[800px] mx-auto p-8 bg-white text-black text-xs font-sans leading-relaxed" id="printable-resume-sheet">
      {/* Header section */}
      <div className="text-center space-y-2 pb-4 border-b border-gray-300">
        <h1 className="text-2xl font-bold uppercase tracking-wide">{ME_INFO.name}</h1>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-[10px] text-gray-600">
          <span>{ME_INFO.phone}</span>
          <span>&bull;</span>
          <span>{ME_INFO.email}</span>
          <span>&bull;</span>
          <span className="font-mono">{ME_INFO.linkedin.replace("https://", "")}</span>
          <span>&bull;</span>
          <span className="font-mono">{ME_INFO.github.replace("https://", "")}</span>
          <span>&bull;</span>
          <span className="font-mono">{ME_INFO.leetcode.replace("https://", "")}</span>
        </div>
      </div>

      {/* Objective section */}
      <div className="py-4 space-y-1">
        <h2 className="text-xs font-bold uppercase tracking-wider border-b border-gray-400 pb-0.5">Objective</h2>
        <p className="text-[11px] text-gray-800 text-justify leading-relaxed">{ME_INFO.objective}</p>
      </div>

      {/* Education section */}
      <div className="py-2 space-y-2">
        <h2 className="text-xs font-bold uppercase tracking-wider border-b border-gray-400 pb-0.5">Education</h2>
        
        {EXPERIENCE.map((edu) => (
          <div key={edu.id} className="space-y-1">
            <div className="flex justify-between items-start font-semibold text-[11px]">
              <div>
                <span>{edu.company}</span>
                <span className="text-gray-500 font-normal">, {edu.location}</span>
              </div>
              <span className="font-normal text-gray-600">{edu.period}</span>
            </div>
            <div className="flex justify-between items-center text-[10px] italic">
              <span>{edu.role}</span>
              {edu.id === "edu-cu" && <span className="font-bold not-italic">CGPA: 7.59</span>}
              {edu.id === "edu-ggmsss" && <span className="font-bold not-italic">87%</span>}
            </div>
          </div>
        ))}
      </div>

      {/* Skills section */}
      <div className="py-2 space-y-1.5">
        <h2 className="text-xs font-bold uppercase tracking-wider border-b border-gray-400 pb-0.5">Skills</h2>
        <div className="space-y-1 text-[11px]">
          {SKILL_CATEGORIES.map((cat) => (
            <div key={cat.category} className="grid grid-cols-12 gap-2">
              <span className="col-span-3 font-semibold text-gray-700">{cat.category}:</span>
              <span className="col-span-9 text-gray-800">
                {cat.items.map(item => item.name).join(", ")}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Projects section */}
      <div className="py-2 space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider border-b border-gray-400 pb-0.5">Projects</h2>
        
        {PROJECTS.map((proj) => (
          <div key={proj.id} className="space-y-1">
            <div className="flex justify-between items-start font-semibold text-[11px]">
              <div>
                <span>{proj.title}</span>
                <span className="text-gray-500 font-normal"> &mdash; {proj.tech.slice(0, 3).join(", ")}</span>
              </div>
              <span className="font-normal text-gray-600">{proj.period}</span>
            </div>
            <ul className="list-disc list-inside pl-2 space-y-0.5 text-[10px] text-gray-800">
              {proj.highlights.map((bullet, idx) => (
                <li key={idx} className="text-justify leading-relaxed">{bullet}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Certifications section */}
      <div className="py-2 space-y-1">
        <h2 className="text-xs font-bold uppercase tracking-wider border-b border-gray-400 pb-0.5">Certifications</h2>
        <ul className="list-disc list-inside pl-2 space-y-0.5 text-[10px] text-gray-800">
          {CERTIFICATIONS.map((cert) => (
            <li key={cert.id}>
              <span className="font-semibold">{cert.title}</span> &mdash; {cert.issuer} ({cert.date})
            </li>
          ))}
        </ul>
      </div>

      {/* Coursework section */}
      <div className="py-2 space-y-1">
        <h2 className="text-xs font-bold uppercase tracking-wider border-b border-gray-400 pb-0.5">Relevant Coursework</h2>
        <p className="text-[10px] text-gray-800 leading-relaxed">
          {coursework.join(", ")}
        </p>
      </div>

      {/* Additional info section */}
      <div className="py-2 space-y-1">
        <h2 className="text-xs font-bold uppercase tracking-wider border-b border-gray-400 pb-0.5">Additional Information</h2>
        <ul className="list-disc list-inside pl-2 space-y-0.5 text-[10px] text-gray-800">
          {ME_INFO.additionalInfo.map((info, idx) => (
            <li key={idx}>{info}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
