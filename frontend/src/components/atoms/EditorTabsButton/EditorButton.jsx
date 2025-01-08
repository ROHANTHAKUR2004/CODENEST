import { useActiveFileTabStore } from '../../../store/activeFiletabStore';
import './EditorButton.css'
export const EditorButton = () =>{

     const {activeFileTab } = useActiveFileTabStore();
        
        const filePath =  activeFileTab?.path;
        const match = filePath?.match(/[^\\]+$/);
        const fileName = match ? match[0] : 'untilted';
       
     return (
        <button 
        className="editor-button"
        style={{
            color :  'white',
            backgroundColor :  'black',
            borderTop: '3px solid #00FF00' 
        }}
        >
            {fileName }
        </button>
    )

}