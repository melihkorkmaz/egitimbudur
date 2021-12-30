import dynamic from 'next/dynamic';
import { useState } from 'react';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

interface RichTextEditorProps {
  value?: string;
  onChange: (value: string) => void;
}

export const RichTextEditor = ({
  value='',
  onChange
}: RichTextEditorProps) => {
  return (
    <div className="mb-12">
      <ReactQuill style={{height: '200px'}} value={value} onChange={onChange}/>
    </div>
  )
}