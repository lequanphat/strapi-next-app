"use client";
import MentionEditor from "@/app/components/mention-editor/MentionEditor";
import React, { useState } from "react";

const Page = () => {
  const [content, setContent] = useState("");

  const [displayContent, setDisplayContent] = useState("");

  const [mentionIds, setMentionIds] = useState<any[]>([]);

  // handle
  const handleSubmit = () => {
    setDisplayContent(content);
  };

  const handleClose = () => {
    setContent("");
  };

  const handleExtractMention = (htmlString: string) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlString;
    const spans = tempDiv.querySelectorAll("span[data-id]");
    const ids = Array.from(spans).map((span) => span.getAttribute("data-id"));
    return ids;
  };

  const handleExtract = () => {
    setMentionIds(handleExtractMention(content));
  };

  const handleClear = () => {
    setDisplayContent("");
    setMentionIds([]);
  };

  return (
    <div className="p-16">
      <div>
        <MentionEditor
          content={content}
          setContent={setContent}
          placeholder="Type @ to mention other people..."
        />
      </div>
      <div className="flex justify-end my-4 gap-4">
        <button className="btn" onClick={handleClose}>
          Cancel
        </button>
        <button className="btn btn-primary" onClick={handleSubmit}>
          Submit
        </button>
      </div>
      {displayContent && (
        <>
          <div className="py-2">
            <h1>Text Content</h1>
            {displayContent}
          </div>
          <hr />
          <div className="py-2">
            <h1>Preview</h1>
            <div dangerouslySetInnerHTML={{ __html: displayContent }} />
          </div>

          <div className="flex justify-end my-4 gap-4">
            <button className="btn" onClick={handleClear}>
              Clear
            </button>
            <button className="btn btn-primary" onClick={handleExtract}>
              Extract
            </button>
          </div>
          <div>
            <div>
              <h1>Mentioned IDs</h1>
              <pre>{JSON.stringify(mentionIds, null, 2)}</pre>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default Page;
