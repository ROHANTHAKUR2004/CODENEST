import fs from "fs/promises"

export const handleEditorSocketEvents = (socket, editorNamespace) => {  
    
  // write file
  socket.on("writeFile", async ({data, pathToFileorFlder}) => {
    try {
        const res =  await fs.writeFile(pathToFileorFlder , data);
        editorNamespace.emit("writeFileSuccess", {
            data : "File write succesfully",
            path : pathToFileorFlder,
        });
    } catch (error) {
        console.log("error wrting the file ", error);
        socket.emit('error', {
            data : " error writitng the file"
        });
    }    
  });

  // Create file
   socket.on('createFile', async ({pathToFileorFlder}) => {
              const isFileAlreadyPresent = await fs.stat(pathToFileorFlder);
              if(isFileAlreadyPresent){
                   socket.emit('error', {
                    data : 'file already exits'
                   });
                   return;   
              }
         
            try {
                const res = await fs.writeFile(pathToFileorFlder, '');
                socket.emit('createFileSuccess', {
                    data : "File Created succesfully"
                });
                
            } catch (error) {
                console.log("error creating the file ", error);
             socket.emit('error', {
              data : " error creating the file"
             });
            }    
   })


    // readfile

    socket.on("readFile", async ({pathToFileorFlder}) => {
          try {
             const res =  await fs.readFile(pathToFileorFlder);
             socket.emit("readFileSuccess", {
                value : res.toString(),
                path : pathToFileorFlder
            });
          } catch (error) {
            console.log("error reading the file ", error);
            socket.emit('error', {
             data : " error reading the file"
            });
          }
    });


    // Deletefile 

    socket.on('deleteFile', async ({pathToFileorFlder}) => {
        try {
            const res = await fs.unlink(pathToFileorFlder);
            socket.emit('deleteFileSuccess', {
                data : 'file deleted succesfully'
            });
        } catch (error) {
            console.log("error while deleting  the file ", error);
            socket.emit('error', {
             data : " error while deleting the file "
            });
        }
    })

    // Rename file or folder
    socket.on('rename', async ({ oldPath, newPath }) => {
        try {
          // Renaming file or folder
          await fs.rename(oldPath, newPath);
          socket.emit('renameSuccess', {
            message: `Successfully renamed from ${oldPath} to ${newPath}`,
          });
        } catch (error) {
          console.log("Error renaming the file/folder:", error);
          socket.emit('error', {
            message: "Error renaming the file/folder",
            error: error.message, // Include error details
          });
        }
      });
      

    // CreateFolder

    socket.on('createFolder', async ({pathToFileorFlder}) => {
        try {
            const res = await fs.mkdir(pathToFileorFlder);
            socket.emit('createFolderSuccess', {
                data : 'folder created succesfully'
            });
        } catch (error) {
            console.log("error while creating the folder", error);
            socket.emit('error', {
             data : " error while creating the folder"
            });
        }
    })


    // DeleteFolder

    socket.on('deleteFolder', async ({pathToFileorFlder}) => {
        try {
            const res = await  fs.rmdir(pathToFileorFlder , {recursive : true});
            socket.emit('deleteFolderSuccess', {
                data : 'folder Deleted succesfully'
            });
        } catch (error) {
            console.log("error while Deleting  the folder", error);
            socket.emit('error', {
             data : " error while Deleting the folder"
            });
        }
    })

 

}