import { FC } from "react";
import { useDropzone } from "react-dropzone";
import useStore from "../utils/store";

export const FileUpload: FC<{
    small?: boolean;
    onDrop: (acceptedFiles: File[]) => void;
}> = ({ small = false, onDrop }) => {
    const { getRootProps, getInputProps, isDragActive, fileRejections } =
        useDropzone({
            onDrop,
            maxFiles: 20,
            accept: {
                "model/gltf-binary": [".gltf", ".glb"],
            },
        });

    const sameFiles = useStore((state) => state.sameFiles);

    return (
        <>
            <div
                {...getRootProps()}
                className={`${small
                        ? "fixed left-2 top-14 z-50 flex h-40 w-64 items-center justify-center rounded-xl bg-white bg-opacity-30 text-center " +
                        (isDragActive ? "drag-active" : "")
                        : "flex h-full w-screen flex-col items-center justify-center text-center " +
                        (isDragActive ? "drag-active" : "")
                    }`}
            >
                <input {...getInputProps()} />

                {isDragActive ? (
                    <p>Drop the files here...</p>
                ) : (
                    <p>Drag and drop a .gltf or .glb file here</p>
                )}

                {fileRejections.length > 0 && (
                    <p className="block pt-4 text-center text-xl text-red-300">
                        Only .gltf or .glb files are accepted
                    </p>
                )}

                {sameFiles && (
                    <p className="block pt-4 text-center text-xl text-red-300">
                        Duplicate file
                    </p>
                )}
            </div>
        </>
    );
};
