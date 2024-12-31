import util from 'util';
import child_process from 'child_process';
import fs from 'fs/promises';
import uuid4 from 'uuid4';

const execPromisifiied = util.promisify(child_process.exec);

export const createproject = async (req, res) => {
    
    const projectId = uuid4();
    await fs.mkdir(`./projects/${projectId}`);


    const response = await execPromisifiied('npm create vite@latest  newproject -- --template react', {
        cwd : `./projects/${projectId}`
    })



    return res.json({message : 'React Project is created', data : projectId})

}