import Docker from 'dockerode'
const docker = new Docker();


export const listcontainer = async () => {
    
     const containers = await  docker.listContainers();
     //console.log("containers list", containers);
     // ports of every container
       containers.forEach((containerinfo) =>{
       console.log("get port of each container", containerinfo.Ports);
     })


}

export const handlecontainercreate = async(projectId, socket, req, tcpsocket, head) =>{

  console.log("project id recevidfe in container create connection", projectId);

    try {

        const existingcontainer =  await docker.listContainers({
          name : projectId
        });
        
        //console.log("EXISTING CONTAINERS", existingcontainer);
        if(existingcontainer.length > 0){
           console.log("containers exist");
            const container = docker.getContainer(existingcontainer[0].Id);
          //  console.log("container removing", container)
            await container.remove({force : true});
            console.log("container delelted");
        }


        const container = await docker.createContainer({
            Image : 'codenest',
            AttachStdin : true,
            AttachStdout : true,
            AttachStderr : true,
            Cmd : ['/bin/bash'],
            name : projectId,
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

        console.log("container started succesfully")


        // socket.handleUpgrade(req , tcpsocket, head, (establishedWConn) => {
        //   console.log("container upgrade");
        //   socket.emit("connection", establishedWConn,req, container);
        // })

        return container;
       

    } catch (error) {
        console.log("Erorr while creating cratoner", error)
    }
}

export async function getcontainerport(containername) {
     const container = await docker.listContainers({
       name : containername
     });

      
     if(container.length > 0){
       const containerinfo = await docker.getContainer(container[0].Id).inspect();
      // console.log("container infromation for port", containerinfo);
        try {
          return containerinfo?.NetworkSettings?.Ports["5173/tcp"][0].HostPort;
        } catch (error) {
            console.log("port not present");
             console.log(error);
        }
     

     }

}