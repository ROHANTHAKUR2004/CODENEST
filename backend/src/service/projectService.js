import uuid4 from "uuid4";
import fs from 'fs/promises';
import { execPromisifiied } from "../utils/exceUtility.js";
import path from "path";
import directoryTree from "directory-tree";

export const createprojectService = async () => {
    const projectId = uuid4();
        await fs.mkdir(`./projects/${projectId}`);
        const response = await execPromisifiied('npm create vite@latest  newproject -- --template react', {
            cwd : `./projects/${projectId}`
        })
    
        return projectId ;
}


export const getprojectDirectoryService = async (projectId) => {
    const Projectpath = path.resolve(`./projects/${projectId}`);
     const tree = directoryTree(Projectpath);
     return tree;
}