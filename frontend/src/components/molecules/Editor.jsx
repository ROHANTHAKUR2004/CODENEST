import { Editor } from "@monaco-editor/react"
import { useEffect, useState } from "react"

 import { useActiveFileTabStore } from "../../store/activeFiletabStore"
import { useEditorSocketStore } from "../../store/EditorSocket"
import { extensiontofiletype } from "../../utils/extensiontofiletype"

export const EditorComponent = () =>{

  
  const [editorstate, seteditorstate] = useState({
    theme : null
  })

   const {activeFileTab } = useActiveFileTabStore();

   const {editorsocket} = useEditorSocketStore();
    
  async function downloadtheme() {
     const res = await fetch('/Dracula.json');
     const data = await res.json();
     seteditorstate({...editorstate, theme : data})
  }

  function settheme(editor, monaco) {
        monaco.editor.defineTheme('dracula', editorstate.theme);
        monaco.editor.setTheme('dracula');
  }



  let timerId = null;

  function handlechange(value){
     if(timerId != null){
       clearTimeout(timerId);
     }
     timerId = setTimeout(() => {
      const editorcontent = value;
      console.log("sending event write file")
      editorsocket.emit("writeFile" , {
        data : editorcontent,
        pathToFileorFlder : activeFileTab.path
      })
     },2000);

      
  }


    useEffect(() =>{
         downloadtheme();
    },[])


    
    return(
        <>
          {editorstate.theme && <Editor
            height={'80vh'}
            width={'100%'}
            defaultLanguage="code here"
            language={extensiontofiletype(activeFileTab?.extension)}
             options={
                {
                    fontSize : 18,
                    fontFamily : 'monospace'
                }
            }
            onChange={handlechange}
            value={activeFileTab?.value ? activeFileTab.value : "code here" }
            onMount={settheme}
          />}
        </>
    )
}