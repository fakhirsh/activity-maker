import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// Choose a style or import your own
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeItem = ({key, content}) => {
  return (
    // <SyntaxHighlighter key={index} language={item.language} style={solarizedlight}>
    <SyntaxHighlighter key={key} language="python" style={solarizedlight}>
      {content}
    </SyntaxHighlighter>
  )
}

export default CodeItem