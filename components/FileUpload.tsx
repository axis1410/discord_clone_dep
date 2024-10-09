import { UploadDropzone } from "@/lib/uploadthing";
import { FileIcon, X } from "lucide-react";
import Image from "next/image";
import { FC } from "react";

interface FileUploadProps {
  endpoint: "messageFile" | "serverImage";
  onChange: (url?: string) => void;
  value: string;
}

export const FileUpload: FC<FileUploadProps> = ({
  endpoint,
  onChange,
  value,
}) => {
  const fileType = value?.split(".").pop();

  if (value && fileType !== "pdf") {
    return (
      <div className="relative w-20 h-20">
        <Image src={value} alt="upload" fill className="rounded-full" />
        <button
          className="absolute top-0 right-0 p-1 text-white rounded-full shadow-sm bg-rose-500"
          onClick={() => onChange("")}
          type="button"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }

  if (value && fileType === "pdf") {
    return (
      <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
        <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-500 dark:text-indigo-400 hover:underline"
        >
          {value}
        </a>
        <button
          className="absolute -top-0 -right-0 p-1 text-white rounded-full shadow-sm bg-rose-500"
          onClick={() => onChange("")}
          type="button"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        console.error(error);
      }}
    />
  );
};
