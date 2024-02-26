import useFormContext from "@/hooks/creatorProfile/useFormContext";
import ImageUpload from "../../ui/imageUpload/imageUpload";

function UploadContent() {
  const { formData, handleChange, errors } = useFormContext();
  const inputClass =
    "border-none focus:ring-0 px-3 py-4 bg-transparent placeholder:text-black/50 placeholder:text-2xl lg:placeholder:text-3xl xl:placeholder:text-3xl md:lg:placeholder:text-3xl focus-visible:text-black";
  return (
    <div className="flex flex-col lg:flex-row md:flex-row xl:flex-row items-center justify-center lg:justify-between xl:justify-between md:justify-between space-y-4 lg-space-y-0 md-space-y-0 xl-space-y-0">
      <ImageUpload />
      <div className="grid grid-cols-1 gap-y-4 lg:gap-y-12 my-auto lg:grid-row-3 xl:grid-rows-3 md:grid-rows-3 w-full max-w-lg">
        <div>
          <label htmlFor="uploadTitle" className="sr-only" />
          <input
            type="text"
            name="uploadTitle"
            value={formData.uploadTitle}
            onChange={handleChange}
            className={inputClass}
            placeholder="Add your title"
          />

          {errors.uploadTitle && (
            <p className="text-red-500 text-sm">{errors.uploadTitle}</p>
          )}
        </div>

        <div className="">
          <label htmlFor="imageDescription" className="sr-only" />
          <textarea
            type="text"
            name="imageDescription"
            value={formData.imageDescription}
            onChange={handleChange}
            className="appearance-none border-none w-full focus:ring-0 py-4 px-2 bg-white bg-opacity-25 placeholder:text-black/50 focus-visible:text-black leading-tight resize-none text-xs lg:text-sm md:text-sm xl:text-sm"
            placeholder={`Give us glimpse into your style universe - share a few words about this content`}
          />

          {errors.altText && (
            <p className="text-red-500 text-sm">{errors.imageDescription}</p>
          )}
        </div>
        <div>
          <label htmlFor="altText" className="sr-only" />
          <input
            type="text"
            name="altText"
            value={formData.altText}
            onChange={handleChange}
            className={inputClass}
            placeholder="Add Alt text"
          />

          {errors.altText && (
            <p className="text-red-500 text-sm">{errors.altText}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default UploadContent;
