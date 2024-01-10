import useFormContext from "@/hooks/creatorProfile/useFormContext";
import ImageUpload from "../../ui/imageUpload/imageUpload";

function UploadContent() {
  const { formData, handleChange, errors } = useFormContext();
  const inputClass =
    "border-none focus:ring-0 w-full bg-transparent placeholder:text-black/50 placeholder:text-2xl lg:placeholder:text-3xl xl:placeholder:text-3xl md:lg:placeholder:text-3xl focus-visible:text-black";
  return (
    <div className="flex flex-col lg:flex-row md:flex-row xl:flex-row items-center justify-center gap-x-14 lg:justify-between xl:justify-between md:justify-between gap-y-8">
      <ImageUpload />
      <div className="flex flex-col gap-y-4 lg:space-y-16 xl:space-y-16 md:space-y-16">
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

        <span className="px-2 py-4 bg-white bg-opacity-25 leading-tight lg:max-w-lg  xl:max-w-lg md:max-w-lg text-xs lg:text-sm md:text-sm xl:text-sm">
          Give us glimpse into your style universe - share a few words about
          this content
        </span>

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
