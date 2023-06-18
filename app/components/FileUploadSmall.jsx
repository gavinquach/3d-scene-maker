import { useDropzone } from "react-dropzone";

const FileUploadBox = ({ onDrop }) => {
    const { getRootProps, getInputProps, isDragActive, fileRejections } =
        useDropzone({
            onDrop,
            maxFiles: 20,
            accept: ".gltf, .glb",
        });

    return (
        <div
            {...getRootProps()}
            className={`fixed top-14 left-2 z-50 h-40 w-64 flex items-center justify-center text-center bg-white bg-opacity-30 rounded-xl ${isDragActive ? "drag-active" : ""
                }`}
        >
            <input {...getInputProps()} />
            {isDragActive ? (
                <p>Drop the files here...</p>
            ) : (
                <p>Drag and drop a .gltf or .glb file here</p>
            )}

            {fileRejections.length > 0 && (
                <p className="block text-center text-xl pt-4 text-red-300">
                    Only .gltf or .glb files are accepted
                </p>
            )}
        </div>
    );
};

export default FileUploadBox;
