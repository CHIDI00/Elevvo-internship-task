import { Progress } from "@radix-ui/react-progress";
import { Calendar, DollarSign } from "lucide-react";

export const ProjectCard = ({ project }) => {
  const getStatusVariant = (status) => {
    switch (status) {
      case "active":
        return "bg-blue-200  rounded-full";
      case "completed":
        return "bg-green-200 rounded-full ";
      case "pending":
        return "bg-orange-200 rounded-full ";
      default:
        return "default";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "text-blue-600";
      case "completed":
        return "text-green-600";
      case "pending":
        return "text-red-600";
      default:
        return "";
    }
  };

  return (
    <div className="bg-gradient-to-b from-white via-purple-50 to-purple-100 dark:bg-gradient-to-b dark:from-[#0b111f] dark:to-[#0e1628] border border-gray-200 dark:border-[#252525] shadow-sm hover:shadow-lg transition-smooth duration-300 rounded-lg group">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="space-y-1">
            <h3 className="font-semibold text-lg dark:text-white group-hover:text-gray-300 transition-smooth">
              {project.name}
            </h3>
            <p className="text-sm dark:text-white">{project.client}</p>
          </div>
          <div
            className={`text-sm capitalize px-3 py-1 ${getStatusColor(
              project.status
            )} ${getStatusVariant(project.status)}`}
          >
            {project.status}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="dark:text-white">Progress</span>
              <span className="font-medium dark:text-white">
                {project.progress}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full overflow-hidden h-2">
              <div
                className="bg-purple-700 h-full w-full flex-1 transition-all"
                style={{
                  transform: `translateX(-${100 - (project.progress || 0)}%)`,
                }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 dark:text-white">
              <Calendar className="h-4 w-4" />
              <span>{project.deadline}</span>
            </div>
            <div className="flex items-center gap-1 font-medium dark:text-white">
              <DollarSign className="h-4 w-4" />
              <span>{project.budget}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
