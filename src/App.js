import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";
import { emmetHTML } from "emmet-monaco-es";
import { DefaultValue } from "./DefaultValue";

function App() {
  /**
   * Holds the setTimeout handle so it can be cancelled
   */
  var handleRef = useRef();

  /**
   * Holds the iframe element
   */
  var iframeRef = useRef();

  /**
   * Updates the iframe to the latest source code
   * @param {string} html
   */
  function setLiveView(html) {
    var iframe = iframeRef.current;
    if (iframe) {
      var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

      // Set the innerHTML tag to the value from the editor
      iframeDoc.body.innerHTML = html;

      // Get the <script> tags and eval them directly on the iframe
      var scripts = iframeDoc.body.querySelectorAll("script");

      if (iframe.contentWindow) {
        Array.from(scripts).forEach((script) => {
          iframe.contentWindow.eval(script.innerText);
        });
      }
    }
  }

  /**
   * This function is called whenever the editor's value is changed.
   * @param {string} value
   * @param {*} event
   */
  function handleEditorChange(value, event) {
    // Put a 1 second delay before running changes
    if (handleRef.current) {
      clearTimeout(handleRef.current);
    }

    handleRef.current = setTimeout(() => {
      setLiveView(value);
    }, 1000);
  }

  /**
   * On mount, initialize the live view to the default value
   */
  useEffect(() => {
    setTimeout(() => {
      setLiveView(DefaultValue);
    }, 100);
  }, []);

  return (
    <div className="root-container">
      <div className="flex-container">
        <div className="editor-container">
          <Editor
            height="100vh"
            defaultLanguage="html"
            defaultValue={DefaultValue}
            onMount={(editor, monaco) => {
              // Support emmet
              emmetHTML(monaco);
            }}
            onChange={handleEditorChange}
            options={{
              minimap: {
                enabled: false,
              },
            }}
          />
        </div>
        <div className="view-container">
          <iframe ref={iframeRef} frameBorder="0" className="iframe">
            Browser not compatible.
          </iframe>
        </div>
      </div>
    </div>
  );
}

export default App;
