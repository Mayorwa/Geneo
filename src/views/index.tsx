import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/Icon.tsx";
import Button from "@/components/ui/Button/Button.tsx";
import Loader from "@/components/ui/Loader.tsx";
import { useLineage } from "@/context/LineageContext.tsx";

const IndexPage: React.FC = () => {
    const [isDragging, setIsDragging] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { loadFromGedcom, isLoading } = useLineage();
    const navigate = useNavigate();

    const ALLOWED_EXTENSIONS = ["ged"];

    const isValidFileType = (file: File) => {
        const extension = file.name.split(".").pop()?.toLowerCase();
        return extension && ALLOWED_EXTENSIONS.includes(extension);
    };

    const handleFileUpload = async (file: File) => {
        setError(null);

        if (!isValidFileType(file)) {
            setError("Only GEDCOM (.ged) files are allowed.");
            return;
        }

        if (file.size > 15 * 1024 * 1024) {
            setError("File must be smaller than 15MB.");
            return;
        }

        try {
            await loadFromGedcom(file);
            navigate("/tree");
        } catch (err) {
            const message = err instanceof Error ? err.message : "Failed to parse the GEDCOM file.";
            setError(message);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file: File | undefined = e.target.files?.[0];
        if (file) handleFileUpload(file);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file) handleFileUpload(file);
    };

    return (
        <>
            <main className="mt-24">
                <div className={`w-1/3 mx-auto py-9 rounded gap-3 grid border-[1.6px] border-dashed 
                ${isDragging
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300"}`}
                    onDragOver={(e) => {
                        e.preventDefault();
                        setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}>
                    <div className="grid gap-1">
                        {isLoading
                            ? <Loader />
                            : <Icon name="upload" width="40px" height="40px" className="mx-auto" />
                        }
                        <h2 className="text-center text-gray-400 text-sm leading-4">
                            File smaller than 15MB. Supported Formats: GEDCOM (.GED)
                        </h2>
                    </div>
                    <div className="grid gap-2">
                        <h4 className="text-center text-gray-900 font-medium leading-snug">
                            {isLoading ? "Parsing your family tree…" : "Drag & Drop your file here or"}
                        </h4>
                        {!isLoading && (
                            <div className="flex items-center justify-center">
                                <label htmlFor="inputFile">
                                    <input id="inputFile" type="file" className="hidden" accept=".ged" onChange={handleInputChange} />
                                    <Button btnClass="w-fit" name="nextButton" onClick={() => { document.getElementById("inputFile")?.click() }}>Select File</Button>
                                </label>
                            </div>
                        )}
                    </div>
                    {error && (
                        <p className="text-center text-red-500 text-sm px-4">{error}</p>
                    )}
                </div>
            </main>
        </>
    );
};

export default IndexPage;