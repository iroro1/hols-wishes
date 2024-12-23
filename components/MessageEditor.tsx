// components/MessageEditor.tsx
import React, { useState } from "react";
import { Editor, EditorState, RichUtils } from "draft-js";

const MessageEditor = ({ onMessageChange }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  // Handler to update editor state
  const handleEditorChange = (state) => {
    setEditorState(state);
    onMessageChange(state.getCurrentContent().getPlainText()); // Send plain text to parent
  };

  // Handler to toggle text formatting (e.g., bold, italic)
  const handleBoldClick = () => {
    const newState = RichUtils.toggleInlineStyle(editorState, "BOLD");
    setEditorState(newState);
  };

  const handleItalicClick = () => {
    const newState = RichUtils.toggleInlineStyle(editorState, "ITALIC");
    setEditorState(newState);
  };

  return (
    <div>
      {/* Toolbar for bold and italic */}
      <div>
        <button onClick={handleBoldClick}>Bold</button>
        <button onClick={handleItalicClick}>Italic</button>
      </div>

      {/* Draft.js editor */}
      <Editor
        editorState={editorState}
        onChange={handleEditorChange}
        placeholder="Write your message here..."
      />
    </div>
  );
};

export default MessageEditor;
