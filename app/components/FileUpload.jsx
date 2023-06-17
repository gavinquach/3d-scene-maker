import { useDropzone } from "react-dropzone";

const FileUpload = ({ onDrop }) => {
    const { getRootProps, getInputProps, isDragActive, fileRejections } =
        useDropzone({
            onDrop,
            maxFiles: 5,
            accept: ".gltf, .glb",
        });

    return (
        <div
            {...getRootProps()}
            className={
                isDragActive
                    ? "h-full w-screen flex flex-col items-center justify-center text-center drag-active"
                    : "h-full w-screen flex flex-col items-center justify-center text-center"
            }
        >
            <input {...getInputProps()} />
            {isDragActive ? (
                <p>Drop the files here...</p>
            ) : (
                <p>Drag and drop a .gltf or .glb file here</p>
            )}

            {fileRejections.length && (
                <p className="block text-center text-xl pt-4 text-red-300">
                    Only .gltf or .glb files are accepted
                </p>
            )}
        </div>
    );
};

export default FileUpload;
