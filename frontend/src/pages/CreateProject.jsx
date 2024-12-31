
import { useCreateProject } from "../hooks/apis/mutations/useCreateProject";
import "./CreateProject.css"; 

export const Createproject = () => {
  const { createProjectMutuation, isPending, isSuccess } = useCreateProject();

  async function handleCreateProject() {
    console.log("triggerapi");
    try {
      await createProjectMutuation();
      console.log("move to editor");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container">
      <div className="gradient-bg"></div>
      <div className="card">
        <h1 className="card-title">Create Your Project</h1>
        <p className="card-description">
          Start building your next big idea. Click the button below to create a new project and move to the editor.
        </p>
        <button
          onClick={handleCreateProject}
          className="btn"
          disabled={isPending}
        >
          {isPending ? "Creating..." : "Create Project"}
        </button>
        {isPending && <p className="status pending">Creating your project...</p>}
        {isSuccess && <p className="status success">Project Created Successfully!</p>}
      </div>
    </div>
  );
};

export default Createproject;


