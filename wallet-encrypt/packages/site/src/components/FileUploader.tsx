import React, { useState, DragEvent, ChangeEvent } from "react";

interface FileUploaderProps {
  onFilesSelected?: (files: File[]) => void;
}

export const FileUploader: React.FC<FileUploaderProps> = ({ onFilesSelected }) => {
  const [files, setFiles] = useState<File[]>([]);

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    setFiles(droppedFiles);
    onFilesSelected?.(droppedFiles);
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files ? Array.from(event.target.files) : [];
    setFiles(selectedFiles);
    onFilesSelected?.(selectedFiles);
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      style={{
        border: "2px dashed #4a90e2",
        padding: "32px",
        textAlign: "center",
        borderRadius: "12px",
        background: "#fafbfc",
        color: "#333",
        margin: "2rem auto",
        maxWidth: "400px",
      }}
    >
      <p style={{ margin: 0, fontWeight: 500 }}>
        Drag and drop files here, or click to select
      </p>
      <input
        type="file"
        multiple
        style={{ display: "none" }}
        id="fileInput"
        onChange={handleFileChange}
      />
      <label htmlFor="fileInput" style={{ cursor: "pointer", color: "#4a90e2" }}>
        <div style={{ marginTop: "1rem" }}>Browse Files</div>
      </label>
      {files.length > 0 && (
        <ul style={{ marginTop: "1rem", padding: 0, listStyle: "none" }}>
          {files.map((file, idx) => (
            <li key={idx}>
              {file.name} ({(file.size / 1024).toFixed(2)} KB)
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

