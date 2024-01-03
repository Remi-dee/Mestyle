import React, { useState } from "react";
import ImageProcessor from "@/lib/ImageProcessor";
import Image from "next/image";

const ImageUpload = () => {
  const [imageSrc, setImageSrc] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleFileInput = async (file) => {
    setIsLoading(true);
    const result = await ImageProcessor.processFile(file);

    if (result.errorMessage) {
      setErrorMessage(result.errorMessage);
      setImageSrc("");
    } else if (result.imageSrc) {
      setImageSrc(result.imageSrc);
      setErrorMessage("");
    }

    setIsLoading(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFileInput(files[0]);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileInput(file);
    }
  };

  return (
    <section className="relative rounded-lg p-4 flex flex-col bg-black/40 dark:bg-white/50 backdrop-blur-md">
      <article
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative border px-2 lg:w-[300px] lg:h-[600px] xl:w-[300px] xl:h-[600px] md:w-[270px] md:h-[570px] w-[250px] h-[500px] grid grid-cols-1 items-center ${
          imageSrc ? "border-none p-0" : ""
        } ${
          isDragging
            ? "border-blue-400"
            : "border-dashed border-black/75 dark:border-white/80"
        } rounded-lg cursor-pointer`}
      >
        <input
          id="upload"
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
          aria-label="File Upload"
        />
        <label htmlFor="upload" className="cursor-pointer">
          {isLoading ? (
            <div className="text-center text-sm dark:text-white text-black">
              Loading...
            </div>
          ) : imageSrc ? (
            <div className="w-full h-full">
              <Image
                src={imageSrc}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
                alt="Uploaded"
                priority
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-black dark:text-white">
              <span className="gap-y-3 flex items-center flex-col pt-16 pb-32">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="41"
                  height="41"
                  viewBox="0 0 41 41"
                  fill="none"
                >
                  <path
                    d="M20.5 0C9.2045 0 0 9.2045 0 20.5C0 31.7955 9.2045 41 20.5 41C31.7955 41 41 31.7955 41 20.5C41 9.2045 31.7955 0 20.5 0ZM28.7 22.0375H22.0375V28.7C22.0375 29.5405 21.3405 30.2375 20.5 30.2375C19.6595 30.2375 18.9625 29.5405 18.9625 28.7V22.0375H12.3C11.4595 22.0375 10.7625 21.3405 10.7625 20.5C10.7625 19.6595 11.4595 18.9625 12.3 18.9625H18.9625V12.3C18.9625 11.4595 19.6595 10.7625 20.5 10.7625C21.3405 10.7625 22.0375 11.4595 22.0375 12.3V18.9625H28.7C29.5405 18.9625 30.2375 19.6595 30.2375 20.5C30.2375 21.3405 29.5405 22.0375 28.7 22.0375Z"
                    fill="white"
                  />
                </svg>

                <p className="text-center">
                  Drag and drop or click to upload your images
                </p>
              </span>
              <span className="mt-24">
                <p className="text-center text-sm">
                  We recommend using a high-quality .jpg file less than 20MB
                </p>

                <p className="text-center text-xs underline mt-3">
                  Polish Your Upload Skills 🎯
                </p>
              </span>
            </div>
          )}
        </label>
        {errorMessage && (
          <p className="text-red-500 text-sm mt-2 max-w-xs text-center">
            {errorMessage}
          </p>
        )}
      </article>
    </section>
  );
};

export default ImageUpload;
