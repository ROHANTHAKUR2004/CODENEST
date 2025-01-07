import { FaCss3, FaHtml5, FaJs } from "react-icons/fa"
import { GiTiara } from "react-icons/gi";
import { GrReactjs } from "react-icons/gr"
import { Md10K } from "react-icons/md";
import { SiJson } from "react-icons/si";
import { TbSvg } from "react-icons/tb";

export const  Fileicon = ({ extension}) => {
     console.log("extension", extension);
     const Iconmapper = {
        "js" :  <FaJs color="yellow" style={{height: '20px' , width: '20px'}}/>,
        "jsx" : <GrReactjs color="#61dbfa" style={{height: '20px' , width: '20px'}}/>,
        "css" : <FaCss3 color="#3c99dc" style={{height: '20px' , width: '20px'}}/>,
        "html": <FaHtml5 color="#e34c36" style={{height: '20px' , width: '20px'}}/>,
        "svg" : <TbSvg color="#e34c" style={{height: '15px' , width: '15px'}}/>,
        "json" : <SiJson color="#e34c" style={{height: '15px' , width: '15px'}}/>,
        "md" : <Md10K color="#e34c" style={{height: '15px' , width: '15px'}}/>,
        "gitignore" : <GiTiara color="#e34c" style={{height: '20px' , width: '20px'}}/>
      }

  return (
    <>
      {Iconmapper[extension]}
    </>
   
  )
}

