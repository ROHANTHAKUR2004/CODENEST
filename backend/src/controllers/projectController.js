import {createprojectService,
     getAllProjectsService,
     getprojectDirectoryService} from '../service/projectService.js';


export const createproject = async (req, res) => {
    const projectId  = await createprojectService();
    return res.json({message : 'React Project is created', data : projectId})
}

export const getprojecttree = async (req, res) => {

    const tree = await getprojectDirectoryService(req.params.projectId);
    return res.status(200).json({
        data : tree,
        success : true,
        message : "Succesfully get the path"
    })
}

export const getAllProjectsController = async (req, res) => {
    try {
      const projects = await getAllProjectsService();
      return res.status(200).json({
        success: true,
        data: projects,
        message: "Successfully fetched all projects",
      });
    } catch (error) {
      console.error("Error fetching projects:", error);
      return res
        .status(500)
        .json({ message: "Failed to fetch projects", error: error.message });
    }
  };

