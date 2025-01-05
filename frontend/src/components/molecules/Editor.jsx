import { Editor } from "@monaco-editor/react"
import { useEffect, useState } from "react"

export const EditorComponent = () =>{

  const [editorstate, seteditorstate] = useState({
    theme : null
  })

  async function downloadtheme() {
     const res = await fetch('/Dracula.json');
     const data = await res.json();
     seteditorstate({...editorstate, theme : data})
  }

  function settheme(editor, monaco) {
        monaco.editor.defineTheme('dracula', editorstate.theme);
        monaco.editor.setTheme('dracula');
  }
    useEffect(() =>{
         downloadtheme();
    },[])

    return(
        <>
          {editorstate.theme && <Editor
            height={'80vh'}
            width={'100%'}
            language='javascript'
            defaultValue="Code Here"
            options={
                {
                    fontSize : 18,
                    fontFamily : 'monospace'
                }
            }
            onMount={settheme}
          />}
        </>
    )
}