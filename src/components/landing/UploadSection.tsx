"use client";

import React, { useCallback, useState } from "react";
import Image from "next/image";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { FileIcon, FileText, FileType, Sparkles, X } from "lucide-react";
import { motion } from "motion/react";
import { FileRejection, useDropzone } from "react-dropzone";
import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";
import { div, li } from "motion/react-client";
import toast from "react-hot-toast";

const UploadSection = () => {
  type FileWithPreview = File & { preview: string };

  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [rejectedFiles, setRejectedFiles] = useState<FileRejection[]>([]);

  //Function to get file icon based on file type
  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith("image/")) return null; // Show image preview
    if (fileType === "application/pdf")
      return <FileText className="size-10 text-red-500" />;
    if (fileType === "text/plain")
      return <FileType className="size-10 text-blue-500" />;
    if (
      fileType === "application/msword" ||
      fileType ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      return <FileText className="size-10 text-blue-600" />;
    }
    return <FileIcon className="size-10 text-gray-500" />;
  };

  const onDropAccepted = useCallback(
    (acceptedFiles: File[]) => {
      //Do something with the files

      if (acceptedFiles.length > 0) {
        const totalFiles = files.length + acceptedFiles.length;

        if (totalFiles > 5) {
          toast.error(
            `You can only upload a maximum of 5 files total. You currently have ${files.length} file(s).`
          );
          return;
        }

        setFiles((prevFiles) => [
          ...prevFiles,
          ...acceptedFiles.map((file) =>
            Object.assign(file, { preview: URL.createObjectURL(file) })
          ),
        ]);
      }
    },
    [files.length]
  );

  const onDropRejected = useCallback((fileRejections: FileRejection[]) => {
    if (fileRejections.length > 0) {
      setRejectedFiles((prevRejectedFiles) => [
        ...prevRejectedFiles,
        ...fileRejections,
      ]);
    }

    if (fileRejections.length > 0) {
      const tooManyFiles = fileRejections.find(
        (fileRejections) => fileRejections.errors[0].code === "too-many-files"
      );

      if (tooManyFiles) {
        toast.error("You can only upload 5 files at a time");
      }
    }

    if (fileRejections.length > 0) {
      const fileSizeTooLarge = fileRejections.find(
        (fileRejections) => fileRejections.errors[0].code === "file-too-large"
      );

      if (fileSizeTooLarge) {
        toast.error("The file size is too large");
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDropAccepted,
    onDropRejected,
    maxSize: 1024 * 1024 * 5,
    maxFiles: 5,
    accept: {
      "image/*": [],
      "application/pdf": [".pdf"],
      "text/plain": [".txt"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
    noKeyboard: true,
    noClick: true,
  });

  const removeFile = (name:any) => {
    setFiles((files) => files.filter((file) => file.name !== name));
  };

  return (
    <>
      {/* Heading */}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.1 }}
        viewport={{ once: true }}
      >
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="flex flex-col justify-center items-center text-center gap-10">
            <Badge
              variant="secondary"
              className="rounded-full relative py-2 px-6 bg-slate-900 border-[1.5px] border-gray-500 shadow-white/80 text-white"
            >
              <Sparkles className="h-8 w-8 mr-2 animate-pulse" />
              <span>Use AI Mode to enhance exprience</span>
            </Badge>
            <h1 className="text-5xl sm:text-6xl font-bold">Start Uploading</h1>
            <p className="text-xl font-semibold">
            Get vulnerability report, warnings and suggestions instantly. 
            </p>
          </div>
        </div>
      </motion.div>

      {/*File Drop Zone */}

      <div className="flex flex-col justify-center items-center">
        <Card
          {...getRootProps()}
          className={cn(
            "bg-slate-900 relative border transition-colors duration-200 ease-in-out w-3xl h-52",
            {
              "border-white": isDragActive,
              "border-white/70 border-dashed": !isDragActive,
            }
          )}
        >
          <CardContent className="flex flex-col justify-center items-center h-full w-full">
            <input {...getInputProps()} />
            {isDragActive ? (
              <p className="text-center text-white">Drop the files here ...</p>
            ) : (
              <div className="flex flex-col justify-center gap-4">
                <p className="text-white">
                  Upload or Drag files here
                </p>
                <Button
                  className="rounded-full bg-slate-950 hover:cursor-pointer hover:bg-black/60 transition-all duration-300"
                  type="button"
                  onClick={open}
                >
                  Select Files
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Preview Section */}

        {files.length > 0 ? (
          <h3 className="text-lg font-semibold mb-5 text-white/70 mt-10 border-b">
            Your Uploaded Files
          </h3>
        ) : (
          <br />
        )}

        <div className="flex flex-col justify-center items-center w-full mb-20 pb-10">
          <ul className="mt-6 grid grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-10 justify-items-center">
            {files.map(file => (
              <li key={file.name} className="relative pb-8">
                <div
                  className={cn(
                    "relative rounded-md w-32 h-32 shadow-lg",
                    file.type.startsWith("image/")
                      ? "bg-transparent"
                      : "bg-neutral-500 flex items-center justify-center"
                  )}
                >
                  {file.type.startsWith("image/") ? (
                    <Image
                      src={file.preview}
                      alt={file.name}
                      fill
                      onLoad={() => {
                        URL.revokeObjectURL(file.preview);
                      }}
                      className="object-cover rounded-md"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center">
                      {getFileIcon(file.type)}
                    </div>
                  )}
                  <Button
                    size="icon"
                    className="absolute group -top-2 -right-2 size-6 border border-red-400 bg-red-400 hover:bg-white hover:cursor-pointer transition-colors duration-200 rounded-full z-10"
                    onClick={() => removeFile(file.name)}
                  >
                    <X className="h-4 w-4 group-hover:text-black/80 transition-colors duration-200" />
                  </Button>
                </div>
                <p className="w-32 wrap-break-word text-center text-[12px] mt-2 text-neutral-300 font-medium">
                  {file.name}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default UploadSection;
