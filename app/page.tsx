"use client";

import { useCallback } from "react";

import useStore from "./components/store.js";

import FileUpload from "./components/FileUpload.jsx";
import Scene from "./components/Scene.jsx";

export default function Home() {
  const addMultipleFilesToStore = useStore((state) => state.addMultipleFilesToStore);
  const buffers = useStore((state) => state.buffers);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const readerResults = await Promise.all(
      acceptedFiles.map((file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = () => reject(reader);
          reader.readAsArrayBuffer(file);
        });
      })
    );

    addMultipleFilesToStore(
      readerResults,
      acceptedFiles.map(({ name }) =>
          name.replace(/ /g, "_").replace(/\.glb|gltf/g, "")
      )
    );
  }, [addMultipleFilesToStore]);

  return (
    // <main className="flex min-h-screen flex-col items-center justify-between p-24">
    // </main>

    <div className="flex flex-col items-center justify-center h-screen">
      <main
        className="flex flex-col items-center justify-center flex-1"
        style={{ height: "calc(100vh - 56px)" }}
      >
        {buffers.length > 0 ? <Scene /> : <FileUpload onDrop={onDrop} />}
      </main>
      {/* <SEO />
            <Toaster />
            <Footer /> */}
    </div>
  );
}
