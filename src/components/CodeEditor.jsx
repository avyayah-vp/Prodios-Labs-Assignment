// src/components/CodeEditor.js
import React, { useState } from "react";
import { Highlight, themes } from "prism-react-renderer";
import "./CodeEditor.css"; // Import the CSS

const CodeEditor = () => {
  const [code, setCode] = useState(""); // State for the code content
  const [theme, setTheme] = useState(themes.nightOwl); // Set initial theme
  const [language, setLanguage] = useState("javascript"); // Set initial language
  
  // Array of available theme names from 'prism-react-renderer'
  const themeNames = Object.keys(themes);

  // Create an array of language options
  const languages = ["javascript", "python", "java", "csharp", "ruby", "php", "swift", "go", "kotlin", "rust", "typescript"];

  return (
    <>
      <h1>Code Editor</h1>
      <div className="selection">
        <select 
          name="theme" 
          onChange={(event) => {
            setTheme(themes[event.target.value]); // Update the theme
          }}
        >
          {themeNames.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
        <select 
          name="language" 
          onChange={(event) => {
            setLanguage(event.target.value); // Update the language
          }}
        >
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </div>
      <div className="container">
        <textarea
          className="code-input"
          value={code}
          rows={1}
          onChange={(event) => {
            setCode(event.target.value);
          }}
          spellCheck={false}
          autoCorrect="off"
          autoComplete="off"
        />
        <Highlight theme={theme} code={code} language={language}>
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre className={`code-output ${className}`} style={style}>
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  <span className="line-number">{i + 1 + " |"}</span>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </div>
    </>
  );
};

export default CodeEditor;
