import React from 'react'
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';

const MarkdownItem = ({key, content }) => {
  return (
    <ReactMarkdown 
          key={key}
          children={content}
          remarkPlugins={[remarkMath]}
          rehypePlugins={[rehypeRaw, rehypeKatex]}
      />
  )
}

export default MarkdownItem