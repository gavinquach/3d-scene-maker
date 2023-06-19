import { useDropzone } from "react-dropzone";
import useStore from "../utils/store";

const FileUpload = ({ small = false, onDrop }) => {
    const { getRootProps, getInputProps, isDragActive, fileRejections } =
        useDropzone({
            onDrop: onDrop,
            maxFiles: 20,
            accept: {
                "model/gltf-binary": [".gltf", ".glb"],
            },
        });

    const sameFile = useStore((state) => state.sameFile);
    const files = useStore((state) => state.files);

    return (
        <>
            <div
                {...getRootProps()}
                className={
                    small
                        ? `fixed top-14 left-2 z-50 h-40 w-64 flex items-center justify-center text-center bg-white bg-opacity-30 rounded-xl ${isDragActive ? "drag-active" : ""
                        }`
                        : `h-full w-screen flex flex-col items-center justify-center text-center ${isDragActive && "drag-active"
                        }`
                }
            >
                <input {...getInputProps()} />

                {files.length < 1 && <p className="text-5xl mb-8">Scene is empty! </p>}

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

                {sameFile && (
                    <p className="block text-center text-xl pt-4 text-red-300">
                        Duplicate file
                    </p>
                )}
            </div>
        </>
    );
};

export default FileUpload;
