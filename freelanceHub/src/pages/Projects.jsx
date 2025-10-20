import { useState } from "react";
import { ProjectCard } from "../components/dashboard/ProjectCard";
import { projectsData } from "../data/projectsData";
import { Filter } from "lucide-react";

const Projects = () => {
  const [filter, setFilter] = useState("all");

  const filteredProjects =
    filter === "all"
      ? projectsData
      : projectsData.filter((p) => p.status === filter);

  const filters = [
    { label: "All", value: "all" },
    { label: "Active", value: "active" },
    { label: "Completed", value: "completed" },
    { label: "Pending", value: "pending" },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2 dark:text-white">Projects</h1>
          <p className="dark:text-gray-300">
            Manage and track all your client projects.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 dark:text-gray-300" />
          <div className="flex gap-2">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`transition-all duration-300 px-3 text-sm ${
                  filter === f.value
                    ? "bg-purple-700 text-white"
                    : "border border-gray-200 dark:border-[#252525] dark:text-white dark:hover:bg-[#172039] hover:bg-purple-200"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No projects found with the selected filter.
          </p>
        </div>
      )}
    </div>
  );
};

export default Projects;
