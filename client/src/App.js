import React, { useState, useEffect } from "react";
import "./App.css";
const App = () => {
  const [markdown, setMarkdown] = useState("");
  const [html, setHtml] = useState("");

  useEffect(() => {
    const convertMarkdown = async () => {
      try {
        const response = await fetch("http://localhost:5000/convert", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ markdown }),
        });
        const html = await response.text();
        setHtml(html);
      } catch (error) {
        console.error("Error converting Markdown:", error);
      }
    };

    if (markdown) {
      convertMarkdown();
    } else {
      setHtml("");
    }
  }, [markdown]);

  const handleMarkdownChange = (event) => {
    setMarkdown(event.target.value);
  };

  return (
    <div className="app">
      <div className="editor">
        <textarea
          placeholder="Enter Markdown"
          value={markdown}
          onChange={handleMarkdownChange}
        ></textarea>
      </div>
      <div className="preview">
        <h2>Live Preview</h2>
        <div dangerouslySetInnerHTML={{ __html: html }}></div>
      </div>
    </div>
  );
};

export default App;
