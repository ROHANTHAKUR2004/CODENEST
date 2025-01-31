import Docker from 'dockerode'
const docker = new Docker();

export const handlecontainercreate = async(projectId, socket) =>{

  console.log("project id recevidfe in container create connection", projectId);

    try {
        const container = await docker.createContainer({
            Image : 'codenest',
            AttachStdin : true,
            AttachStdout : true,
            AttachStderr : true,
            Cmd : ['/bin/bash'],
            Tty : true,
            User : "codenest",
            ExposedPorts : {
                "5173/tcp" : {}
            }, 
            Env : ["HOST=0.0.0.0"],
            HostConfig : {
                  Binds : [
                    `${process.cwd()}/projects/${projectId}:/home/codenest/app`
                  ],
                  PortBindings:{
                    "5173/tcp" : [
                        {
                            "HostPort" : "0"
                        }
                    ]
                  }
            }
         })

        console.log("Container created", container.id);
        await container.start();
        console.log("contaoner started succesfully")

         

    } catch (error) {
        console.log("Erorr while creating cratoner", error)
    }
}