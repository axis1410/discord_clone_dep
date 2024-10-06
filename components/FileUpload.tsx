import { UploadDropzone } from "@/lib/uploadthing";
import { X } from "lucide-react";
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
