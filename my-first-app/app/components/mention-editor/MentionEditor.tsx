"use client";
import React, { useState, useRef, useEffect, useMemo } from "react";
import JoditEditor from "jodit-react";
import Tribute from "tributejs";
import "tributejs/dist/tribute.css";
import { faker } from "@faker-js/faker";

const MentionEditor = ({
  content,
  setContent,
  placeholder,
}: {
  content: string;
  setContent: (content: string) => void;
  placeholder: string;
}) => {
  const editorRef = useRef(null);
  const config = useMemo(() => {
    return {
      placeholder,
      useSearch: false,
      uploader: {
        insertImageAsBase64URI: true,
      },
      showCharsCounter: false,
      toolbarAdaptive: false,
      showWordsCounter: false,
      showXPathInStatusbar: false,
      askBeforePasteHTML: false,
      askBeforePasteFromWord: false,
      buttons:
        "bold,italic,underline,strikethrough,ul,ol,fontsize,image,video,indent,outdent,undo,redo",
    };
  }, [placeholder]);

  const users = useMemo(() => {
    return Array.from({ length: 10 }, () => ({
      avatar: faker.image.avatar(),
      name: faker.internet.userName(),
      email: faker.internet.email(),
      id: faker.string.uuid(),
    }));
  }, []);
  useEffect(() => {
    if (editorRef.current) {
      const editor = editorRef.current;
      if (editor) {
        const tribute = new Tribute({
          values: users,
          menuItemTemplate: MenuItemTemplate,
          selectTemplate: SelectedItem,
          noMatchTemplate: NoMatchTemplate,
        });
        const editor_area = document.querySelector(".jodit-wysiwyg");
        tribute.attach(editor_area);
      }
    }
  }, [editorRef]);

  return (
    <JoditEditor
      ref={editorRef}
      value={content}
      config={config}
      onBlur={(newContent) => setContent(newContent)}
      onChange={(newContent) => {}}
    />
  );
};

const MenuItemTemplate = (item: any) => {
  return `<div style="display: flex; align-items: center; padding: 5px;">
                      <img src="${item.original.avatar}" alt="avatar" style="border-radius: 50%; width: 40px; height: 40px; margin-right: 10px;" />
                      <div>
                        <strong>${item.original.name}</strong><br />
                        <small>${item.original.email}</small>
                      </div>
                    </div>`;
};

const SelectedItem = (item: any) => {
  return `<span contenteditable="false" style="color: blue; font-weight: bold;" data-id=${item.original.id}>@${item.original.name}</span>&nbsp;`;
};

const NoMatchTemplate = () => {
  return "No results found!";
};
export default MentionEditor;
