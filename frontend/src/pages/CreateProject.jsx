import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateProject } from "../hooks/apis/mutations/useCreateProject";
import { getAllProjects } from "../apis/projects";
import { FaPlusCircle, FaFolder } from "react-icons/fa";
import "./CreateProject.css";

export const Createproject = () => {
  const { createProjectMutuation, isPending, isSuccess } = useCreateProject();
  const [projectList, setProjectList] = useState([]);

  const navigate = useNavigate();

  async function handleCreateProject() {
    console.log("triggerapi");
    try {
      const response = await createProjectMutuation();
      console.log("move to editor");
      navigate(`/project/${response.data}`);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projects = await getAllProjects();
        setProjectList(projects || []);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
  }, []);

  const handleNavigateToProject = (projectId) => {
    navigate(`/project/${projectId}`);
  };

  return (
    <div className="container">
      <div className="gradient-bg"></div>

      <div className="wrapper">
        <div className="card">
          <h1 className="card-title">
            <span className="react-logo">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
                alt="React Logo"
                className="react-icon"
              />
            </span>
            Create Your Project
          </h1>
          <p className="card-description">
            Start building your next big idea.
          </p>
          <button
            onClick={handleCreateProject}
            className="btn"
            disabled={isPending}
            aria-label="Create a new project"
          >
            {isPending ? "Creating..." : <><FaPlusCircle /> Create Project</>}
          </button>
          {isPending && <p className="status pending">Creating your project...</p>}
          {isSuccess && <p className="status success">Project Created Successfully!</p>}
        </div>


        <div className="project-list">
          <h2> Previous Project List</h2>
          <ul>
            {projectList.length > 0 ? (
              projectList.map((projectId, index) => (
                <li
                  key={index}
                  className="project-item"
                  onClick={() => handleNavigateToProject(projectId)}
                  aria-label={`Navigate to project with ID ${projectId}`}
                >
                  <FaFolder /> Project ID: {projectId}
                </li>
              ))
            ) : (
              <div className="no-projects-message">No projects found</div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Createproject;
