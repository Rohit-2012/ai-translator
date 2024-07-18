import { IconPaperclip } from "@tabler/icons-react";
import { ChangeEvent } from "react";

const FileUpload = ({handleFileUpload}:{handleFileUpload:  (e: ChangeEvent<HTMLInputElement>) => void}) => {
    return (
        <label htmlFor="file-upload" className="cursor-pointer">
            <IconPaperclip size={21} />
            <input id="file-upload" type="file" onChange={handleFileUpload} className="hidden" />
        </label>
    );
}

export default FileUpload;