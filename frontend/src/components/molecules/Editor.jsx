import { Editor } from "@monaco-editor/react"
import { useEffect, useState } from "react"
 import { useEditorSocketStore } from "../../store/EditorSocket"
 import { useActiveFileTabStore } from "../../store/activeFiletabStore"

export const EditorComponent = () =>{

  const [editorstate, seteditorstate] = useState({
    theme : null
  })

   const { editorsocket} = useEditorSocketStore();
   const {activeFileTab, setactiveFiletab } = useActiveFileTabStore();
    
  async function downloadtheme() {
     const res = await fetch('/Dracula.json');
     const data = await res.json();
     seteditorstate({...editorstate, theme : data})
  }

  function settheme(editor, monaco) {
        monaco.editor.defineTheme('dracula', editorstate.theme);
        monaco.editor.setTheme('dracula');
  }

    editorsocket?.on("readFileSuccess", (data) => {
           setactiveFiletab(data.path, data.value, )
   })

    useEffect(() =>{
         downloadtheme();

    },[])


    
    return(
        <>
          {editorstate.theme && <Editor
            height={'80vh'}
            width={'100%'}
            defaultLanguage="code here"
            language={undefined}
             options={
                {
                    fontSize : 18,
                    fontFamily : 'monospace'
                }
            }
            value={activeFileTab?.value ? activeFileTab.value : "code here" }
            onMount={settheme}
          />}
        </>
    )
}