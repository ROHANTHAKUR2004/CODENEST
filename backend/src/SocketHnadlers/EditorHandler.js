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

socket.on("createFile", async ({ pathToFileorFlder }) => {
    try {
        // Check if the file already exists
        try {
            await fs.access(pathToFileorFlder); // Throws if file doesn't exist
            socket.emit('error', {
                data: 'File already exists',
            });
            return;
        } catch (accessError) {
            if (accessError.code !== 'ENOENT') {
                throw accessError; // Re-throw unexpected errors
            }
        }

        // Create the file
        await fs.writeFile(pathToFileorFlder, '');
        console.log("File created successfully");
        socket.emit("createFileSuccess", {
            data: "File created successfully",
        });
    } catch (error) {
        console.error("Error creating the file:", error);
        socket.emit('error', {
            data: "Error creating the file",
            error: error.message,
        });
    }
});

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

    socket.on("deleteFile", async ({pathToFileorFlder}) => {
        try {
            const res = await fs.unlink(pathToFileorFlder);
            socket.emit("deleteFileSuccess", {
                data : 'file deleted succesfully'
            });
        } catch (error) {
            console.log("error while deleting  the file ", error);
            socket.emit("error", {
             data : " error while deleting the file "
            });
        }
    })

    // Rename file or folder
    socket.on("rename", async ({ oldPath, newPath }) => {
      console.log("renaming backend")
      console.log("Old Path:", oldPath);
      console.log("New Path:", newPath);
        try {
          await fs.rename(oldPath, newPath);
          socket.emit("renameSuccess", {
            message: `Successfully renamed from ${oldPath} to ${newPath}`,
          });
        } catch (error) {
          console.log("Error renaming the file/folder:", error);
          socket.emit('error', {
            message: "Error renaming the file/folder",
            error: error.message, 
          });
        }
      });
      

    // CreateFolder

    socket.on("createFolder", async ({pathToFileorFlder}) => {
        console.log('folder creating')
        try {
            const res = await fs.mkdir(pathToFileorFlder);
            socket.emit("createFolderSuccess", {
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

    socket.on("deleteFolder", async ({pathToFileorFlder}) => {
          console.log("folder deleting")
        try {
            const res = await fs.rmdir(pathToFileorFlder , {recursive : true});
             console.log("folder deleting ", res);
            socket.emit("deleteFolderSuccess", {
                data : 'folder Deleted succesfully'
            });
        } catch (error) {
            console.log("error while Deleting  the folder", error);
            socket.emit('error', {
             data : " error while Deleting the folder"
            });
        }
    })


    // port 
    

 

}