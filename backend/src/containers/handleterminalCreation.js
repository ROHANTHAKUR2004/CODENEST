export const handleterminalCreation = (container ,ws) => {
      container.exec({
        Cmd: ["/bin/bash"],
        AttachStdin: true,
        AttachStdout: true,
        AttachStderr: true,
        Tty: true,
        User: "codenest",
      },(err, exec) =>{
        if(err) {
            console.log("Error while creating exec", err);
            return;
        }

        exec.start({
            hijack : true,

        }, (err, stream) => {
            if(err) {
                console.log("Error while starting exec", err);
                return;
            }
            
            // step 1 streaming processing
              processstreamoutput(stream,ws);
            //step 2 stream writitng
             ws.on("message", (data) => {
                console.log("writing data", data);
                stream.write(data);
             })

            

        })



      }
    )
}



function processstreamoutput(stream , ws) {
      let nextDatatype = null;
      let nextdatalength = null;
      let buffer = Buffer.from("");

      function processstreamdata(data){
        if(data) {
            buffer = Buffer.concat([buffer, data]); 
        }

        if(!nextDatatype){
             if(buffer.length >= 8){
                const header = bufferSlicer(8);

                nextDatatype =  header.readUInt32BE(0);
                nextdatalength =  header.readUInt32BE(4);

                processstreamdata();   
            }
        }
        else {

            if(buffer.length >= nextdatalength){
                const content = bufferSlicer(nextdatalength);

                ws.send(content);

                nextDatatype = null;
                nextdatalength = null;
                processstreamdata();

            }




        }
      }

      function bufferSlicer(end){
        const output = buffer.slice(0, end); 
        buffer = Buffer.from(buffer.slice(end, buffer.length));
        return output;
      }


      stream.on("data", processstreamdata)
}