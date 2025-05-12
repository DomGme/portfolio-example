"use client";
// Projects page with toggle for card grid and accordion list view.
// Now includes Framer Motion for animated cards.

// You can later replace the placeholder data with real project info.

import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

// Example project data with tech stack and link
const projects = [
  {
    title: "Project 1",
    description: "A brief description of project 1 and its key features",
    image: "/portfolio.webp",
    tech: ["Next.js", "React", "TypeScript"],
    link: "#",
  },
  {
    title: "Project 2",
    description: "A brief description of project 2 and what makes it special",
    image: "/placeholder-ecommerce.png",
    tech: ["Tailwind", "Node.js", "MongoDB"],
    link: "#",
  },
  // Add more projects as needed
];

export default function ProjectsPage() {
  // State for toggling between card and list view
  const [view, setView] = useState<'card' | 'list'>('card');
  // State for which accordion item is open
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  // Hide image if it fails to load
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.style.display = "none";
  };

  // Toggle handler for accordion
  const handleAccordionToggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  // Framer Motion variants for card animation
  const cardVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
    whileHover: { scale: 1.03, boxShadow: "0 8px 32px 0 rgba(96,125,139,0.10)" },
  };

  return (
    <main className="min-h-screen bg-[#F8F8F8] p-6">
      {/* Page heading and intro */}
      <div className="max-w-4xl mx-auto mb-10">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#2E2E2E] mb-4 text-center">
          My Projects
        </h1>
        <p className="text-[#607D8B] text-lg text-center max-w-2xl mx-auto mb-4">
          Here are some of the projects I&apos;ve worked on. Each project represents different skills and technologies I&apos;ve learned along my journey.
        </p>
        {/* Toggle button */}
        <div className="flex justify-center gap-2 mt-4">
          <button
            className={`px-4 py-2 rounded-l-lg border border-[#E1E1E1] font-semibold transition-colors duration-200 ${view === 'card' ? 'bg-[#607D8B] text-[#F8F8F8]' : 'bg-[#F8F8F8] text-[#607D8B] hover:bg-[#E1E1E1]'}`}
            onClick={() => setView('card')}
            aria-pressed={view === 'card'}
          >
            Card View
          </button>
          <button
            className={`px-4 py-2 rounded-r-lg border border-l-0 border-[#E1E1E1] font-semibold transition-colors duration-200 ${view === 'list' ? 'bg-[#607D8B] text-[#F8F8F8]' : 'bg-[#F8F8F8] text-[#607D8B] hover:bg-[#E1E1E1]'}`}
            onClick={() => setView('list')}
            aria-pressed={view === 'list'}
          >
            List View
          </button>
        </div>
      </div>
      {/* Card Grid View with Framer Motion */}
      {view === 'card' && (
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              initial="initial"
              animate="animate"
              whileHover="whileHover"
              // Stagger the animation for each card
              transition={{ delay: idx * 0.08 }}
            >
              <Card
                className="bg-white border border-[#E1E1E1] rounded-2xl shadow-lg p-8 flex flex-col justify-between min-h-[320px]"
              >
                <CardContent className="p-0 flex flex-col gap-4">
                  <div className="w-full h-28 bg-[#E1E1E1] rounded-lg flex items-center justify-center overflow-hidden mb-4">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="object-cover w-full h-full"
                      style={{ maxHeight: '112px' }}
                      onError={handleImageError}
                    />
                  </div>
                  <CardTitle className="text-2xl md:text-3xl font-bold text-[#2E2E2E] mb-1 text-left">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-[#607D8B] text-base mb-2 text-left">
                    {project.description}
                  </CardDescription>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="bg-[#D6ECF3] text-[#607D8B] rounded-full px-3 py-1 text-xs font-semibold"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="p-0 mt-2">
                  <a
                    href={project.link}
                    className="text-[#607D8B] font-semibold flex items-center gap-1 hover:underline transition-colors duration-200 text-left"
                  >
                    View Project
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="#607D8B"
                      className="w-4 h-4"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
      {/* Accordion List View using Shadcn Accordion - minimal style */}
      {view === 'list' && (
        <Accordion type="single" collapsible className="max-w-3xl mx-auto border border-[#E1E1E1] rounded-lg bg-transparent divide-y divide-[#E1E1E1] shadow-none">
          {projects.map((project, idx) => (
            <AccordionItem key={idx} value={`item-${idx}`} className="border-0 bg-transparent shadow-none">
              <AccordionTrigger className="text-xl font-bold text-[#2E2E2E] font-serif px-4 py-4 bg-transparent hover:bg-[#F8F8F8] text-left">
                {project.title}
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="flex flex-col md:flex-row gap-4 items-start">
                  {/* Project image (optional) */}
                  <div className="w-32 h-20 bg-[#E1E1E1] rounded-lg flex items-center justify-center overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="object-cover w-full h-full"
                      style={{ maxHeight: '80px' }}
                      onError={handleImageError}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="text-[#607D8B] text-base mb-2">{project.description}</div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {project.tech.map((tech, i) => (
                        <span
                          key={i}
                          className="bg-[#D6ECF3] text-[#607D8B] rounded-full px-3 py-1 text-xs font-semibold"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <a
                      href={project.link}
                      className="text-[#607D8B] font-semibold flex items-center gap-1 hover:underline transition-colors duration-200 text-left"
                    >
                      View Project
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="#607D8B"
                        className="w-4 h-4"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </main>
  );
} 