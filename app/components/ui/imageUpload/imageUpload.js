import useFormContext from "@/hooks/creatorProfile/useFormContext";
import Image from "next/image";
import { useState } from "react";

const ImageUpload = () => {
  const [isDragging, setIsDragging] = useState(false);
  const { formData, errors, isLoading, imageSrc, handleChange } =
    useFormContext();

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

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      const event = {
        target: {
          name: "imageUpload",
          type: "file",
          files: [file],
        },
      };
      handleChange(event);
    }
  };

  return (
    <section className="relative rounded-lg p-4 flex flex-col bg-black/40 dark:bg-white/50 backdrop-blur-md">
      <article
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative border px-2 lg:w-[15vw] lg:h-[40vh] 
        xl:w-[15vw] xl:h-[40vh] 
        md:w-[15vw] md:h-[40vh] 
        w-full h-[65vh] grid grid-cols-1 items-center ${
          imageSrc ? "border-none p-0" : ""
        } ${
          isDragging
            ? "border-blue-400"
            : "border-dashed border-black/75 dark:border-white/80"
        } rounded-lg cursor-pointer`}
      >
        <input
          name="imageUpload"
          id="upload"
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleChange}
          aria-label="File Upload"
        />

        <label htmlFor="upload" className="cursor-pointer">
          {isLoading ? (
            <div className="text-center text-sm dark:text-white text-black">
              Loading...
            </div>
          ) : imageSrc ? (
            <div className="lg:w-full xl:w-full md:w-full h-full w-[100vw]">
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
              <span className="gap-y-3 flex items-center flex-col xl:pt-16 md:pt-16 lg:pt-16 pt-4">
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
              <span className="lg:mt-24 xl:mt-24 md:mt-24 mt-12">
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
        {errors.imageUpload && (
          <p className="text-xs text-red-500 text-center">
            {errors.imageUpload}
          </p>
        )}
      </article>
    </section>
  );
};

export default ImageUpload;
