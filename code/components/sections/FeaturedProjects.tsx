"use client";

import { useEffect, useState } from "react";
import { getGitHubRepos } from "@/services/githubService";
import Image from "next/image";
import { Language, translations } from "@/services/translations";
import LoadingCards from "../LoadingCards";

interface Project {
  id: number;
  name: string;
  description: string;
  html_url: string;
  language: string;
  stargazers_count: number;
}

const FeaturedProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const [language, setLanguage] = useState<Language>("en");

  const projectImages = {
    remediar: "/images/projects/remediar.png",
    portfolio: "/images/projects/portfolio.png",
    "recipes-and-flavors": "/images/projects/recipes_and_flavors.png",
    "relatorio-fotografico": "/images/projects/relatorio-fotografico.png"
  };

  useEffect(() => {
    const savedLanguage =
      (localStorage.getItem("language") as Language) || "en";
    setLanguage(savedLanguage);
  }, []);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const reposData = await getGitHubRepos();
        setProjects(reposData);
      } catch (error) {
        setError("Failed to fetch repositories");
      } finally {
        setLoading(false);
      }
    };
    fetchRepos();
  }, []);

  useEffect(() => {
    const cards = document.querySelectorAll(".tilt-card");
    const glowElements = document.querySelectorAll(".glow");
    const contentElements = document.querySelectorAll(".tilt-card-content");

    cards.forEach((card, index) => {
      const glow = glowElements[index] as HTMLElement;
      const content = contentElements[index] as HTMLElement;

      card.addEventListener("mousemove", (e) => {
        const mouseEvent = e as MouseEvent;

        const rect = card.getBoundingClientRect();
        const x = mouseEvent.clientX - rect.left;
        const y = mouseEvent.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const percentX = (x - centerX) / centerX;
        const percentY = -((y - centerY) / centerY);

        (card as HTMLElement).style.transform = `perspective(1000px) rotateY(${
          percentX * 10
        }deg) rotateX(${percentY * 10}deg)`;
        content.style.transform = `translateZ(50px)`;
        glow.style.opacity = "1";
        glow.style.backgroundImage = `
          radial-gradient(
            circle at 
            ${x}px ${y}px, 
            #ffffff44,
            #0000000f
          )
        `;
      });

      card.addEventListener("mouseleave", () => {
        (card as HTMLElement).style.transform =
          "perspective(1000px) rotateY(0deg) rotateX(0deg)";
        content.style.transform = "translateZ(0px)";
        glow.style.opacity = "0";
      });
    });
  }, [projects]);

  if (loading) return <LoadingCards />;
  if (error) return <LoadingCards />;

  return (
    <div className="cards grid grid-cols-1 sm:grid-cols-2 gap-6">
      {projects.map((project) => (
        <div
          key={project.id}
          className="tilt-card bg-black dark:bg-slate-50 rounded-2xl shadow-2xl shadow-black dark:shadow-slate-400 relative cursor-pointer transition-all duration-300 ease-out hover:scale-105"
        >
          <div className="glow opacity-0 transition-opacity duration-300"></div>
          <div className="tilt-card-content p-6 flex flex-col h-full justify-between relative z-10">
            <div className="text-slate-50 dark:text-black">
              <Image
                className="w-full rounded-xl mb-2"
                src={projectImages[project.name as keyof typeof projectImages] || "/images/projects/default.png"}
                layout="responsive"
                width={1920}
                height={1080}
                alt={`${project.name} image`}
                quality={100}
              />
              <h2 className="text-2xl font-bold mb-2">{project.name}</h2>
              <p className="mb-2">
                {project.description || "No description available."}
              </p>
            </div>
            <div className="space-y-4">
              <div className="bg-slate-50 dark:bg-gray-300 bg-opacity-20 rounded-lg p-3">
                <div className="text-xs text-gray-200 dark:text-gray-500 uppercase">
                  Main Language
                </div>
                <div className="text-lg font-bold text-slate-50 dark:text-black">
                  {project.language || "Unknown"}
                </div>
              </div>
              <button
                className="w-full py-2 bg-slate-50 dark:bg-black text-black dark:text-slate-50 rounded-lg font-semibold transform transition hover:scale-105 active:scale-95"
                onClick={() => window.open(project.html_url, "_blank")}
              >
                {translations[language].viewRepo}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedProjects;
