"use client";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import React, { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";

const importNewBlogs = async ({ file }: { file: any }) => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch(
        "http://localhost:1338/api/import-blogs-file",
        {
            method: "POST",
            body: formData,
        }
    )
        .then((response) => response.json())
        .catch((err) => console.error(err));
    return response;
};

const ImportBlogsPage = () => {
    const [selectedFile, setSelectedFile] = useState<any>(null);

    const mutation = useMutation({
        mutationFn: async (file: any) => {
            return await importNewBlogs({ file });
        },
        onSuccess: () => {},
        onError: () => {},
    });

    // handle import excel file
    const handleImport = async () => {
        if (selectedFile) {
            const reader = new FileReader();

            reader.onload = async (event: ProgressEvent<FileReader>) => {
                if (event.target && event.target.result) {
                    const data = new Uint8Array(
                        event.target.result as ArrayBuffer
                    );
                    const workbook = XLSX.read(data, { type: "array" });
                    const firstSheetName = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[firstSheetName];
                    const jsonData = XLSX.utils.sheet_to_json(worksheet);
                    const testData = JSON.stringify({title: "ok"});
                    try {
                        await axios.post(
                            "http://localhost:1338/api/import-blogs-file",
                            testData
                        );
                        alert("Data uploaded successfully!");
                    } catch (error) {
                        console.error("Error uploading data:", error);
                        alert("Failed to upload data");
                    }
                }
            };

            reader.readAsArrayBuffer(selectedFile);
        }
    };
    return (
        <div className="py-16">
            <div className="py-4">
                <Link href="/blogs">Back to Blogs</Link>
            </div>
            <div className="flex items-center justify-center gap-4 ">
                <input
                    type="file"
                    accept=".xls,.xlsx,.csv"
                    className="file-input file-input-bordered file-input-md max-w-xs"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        // @ts-ignore
                        setSelectedFile(e.target.files[0]);
                    }}
                />
                <button className="btn btn-info " onClick={handleImport}>
                    Import
                </button>
            </div>
        </div>
    );
};

export default ImportBlogsPage;
