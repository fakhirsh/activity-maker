import React, { useState } from 'react'

import AceEditor from 'react-ace';

// Import theme, language mode for Python
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/mode-python'; // Import Python mode
import 'ace-builds/src-noconflict/theme-github'; // Import the GitHub theme
import 'ace-builds/src-noconflict/theme-xcode'; // Import the GitHub theme

const SubmitItem = ({key, content}) => {
  
  const [code, setCode] = useState('');

  return (
    <div>
       <AceEditor
            mode="python"
            theme="xcode"
            value={code}
            onChange={setCode}
            name="UNIQUE_ID_OF_DIV"
            editorProps={{ $blockScrolling: true }}
            width="100%" // Set width
            height="150px" // Set height to control the size
            style={{ border: '1px solid #ccc' }} // Adds a light gray border around the Ace Editor   
        />
        <div className='flex'>
            <button 
                className='bg-blue-500 text-white px-4 py-2 rounded-md mt-2 hover:bg-blue-600 transition-colors duration-300 ease-in-out'
                onClick={()=>{}}
                >Submit</button>
        </div>

    </div>
  )
}

export default SubmitItem