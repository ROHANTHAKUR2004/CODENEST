import {createprojectService,
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

