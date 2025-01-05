import './EditorButton.css'
export const EditorButton = ({isActive}) =>{


    function handleclick(){
  // todo
    }
    return (
        <button 
        onClick={handleclick}
        className="editor-button"
        style={{
            color : isActive ? 'white' : '#959eba',
            backgroundColor : isActive ? 'black' : '#4a4859',
            borderTop: isActive ? '3px solid green' : '',
        }}
        >
            files.js
        </button>
    )

}