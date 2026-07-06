import React from 'react';
import Editor from '@monaco-editor/react';

interface CodeEditorProps {
  code: string;
  onChange: (val: string) => void;
  language: string;
  theme: string;
  fontSize: number;
  wordWrap: boolean;
  isMinimapEnabled?: boolean;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  onChange,
  language,
  theme,
  fontSize,
  wordWrap,
  isMinimapEnabled = true,
}) => {
  // Monaco accepts language mappings
  const getMonacoLanguage = (lang: string): string => {
    const mappings: Record<string, string> = {
      typescript: 'typescript',
      javascript: 'javascript',
      python: 'python',
      go: 'go',
      rust: 'rust',
      java: 'java',
      cpp: 'cpp',
      c: 'c',
      swift: 'swift',
      kotlin: 'kotlin',
      php: 'php',
      sql: 'sql',
      html: 'html',
      css: 'css',
      json: 'json',
      markdown: 'markdown',
    };
    return mappings[lang.toLowerCase()] || lang.toLowerCase();
  };

  const handleEditorChange = (value?: string) => {
    onChange(value || '');
  };

  return (
    <div className="h-full w-full bg-zinc-950 flex flex-col min-h-[400px]">
      <Editor
        height="100%"
        width="100%"
        language={getMonacoLanguage(language)}
        value={code}
        onChange={handleEditorChange}
        theme={theme === 'vs-dark' ? 'vs-dark' : 'light'}
        options={{
          fontSize: fontSize,
          wordWrap: wordWrap ? 'on' : 'off',
          minimap: { enabled: isMinimapEnabled },
          lineNumbers: 'on',
          roundedSelection: false,
          scrollBeyondLastLine: false,
          readOnly: false,
          cursorStyle: 'line',
          automaticLayout: true,
          fontFamily: 'JetBrains Mono, Menlo, Monaco, Consolas, Courier New, monospace',
          tabSize: 2,
          bracketPairColorization: { enabled: true },
          folding: true,
          autoIndent: 'advanced',
        }}
        loading={
          <div className="flex h-full w-full items-center justify-center bg-zinc-950 text-xs font-mono text-zinc-500">
            Initializing Monaco Editor...
          </div>
        }
      />
    </div>
  );
};
