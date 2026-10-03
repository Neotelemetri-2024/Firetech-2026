import { useState } from "react";
import { UploadCloud, FileText, Trash2, Eye, X } from "lucide-react";
import { useTheme } from "../../context/themecontext";

type FileUploadProps = {
  label: string;
  name: string;
  file: File | null;
  accept?: string;
  /** Teks format dan batas ukuran di bawah area unggah; ikuti `accept`. */
  hint?: string;
  required?: boolean;
  previewSize?: "sm" | "lg";
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDelete?: () => void;
};

export default function FileUpload({
  label,
  name,
  file,
  accept = ".jpg,.jpeg,.png,.pdf",
  hint = "JPG, PNG, PDF • Max 5 MB",
  required = false,
  previewSize = "lg",
  onChange,
  onDelete,
}: FileUploadProps) {
  const { darkMode } = useTheme();
  const [showPreview, setShowPreview] = useState(false);

  const isImage = !!file && file.type.startsWith("image/");

  const isPdf = !!file && file.type === "application/pdf";

  return (
    <>
      <div>
        <label
          className={`mb-3 block font-semibold ${
            darkMode ? "text-slate-800" : "text-white"
          }`}
        >
          {label}

          {required && (
            <span className={darkMode ? "text-blue-600" : "text-red-600"}>
              {" "}
              *
            </span>
          )}
        </label>

        {!file ? (
          <label
            className={`
              group
              flex
              h-28
              w-full
              cursor-pointer
              flex-col
              items-center
              justify-center
              rounded-2xl
              border-2
              border-dashed
              transition-all
              duration-300
              ${
                darkMode
                  ? "border-slate-300 bg-white hover:border-blue-600 hover:bg-blue-50"
                  : "border-slate-700 bg-slate-900/40 hover:border-red-600 hover:bg-red-600/10"
              }
            `}
          >
            <input
              type="file"
              name={name}
              accept={accept}
              className="hidden"
              onChange={onChange}
            />

            <UploadCloud
              size={34}
              className={`mb-2 transition-all duration-300 group-hover:-translate-y-1 ${
                darkMode ? "text-blue-600" : "text-red-500"
              }`}
            />

            <span
              className={`text-sm font-medium ${
                darkMode ? "text-slate-700" : "text-slate-300"
              }`}
            >
              Click to upload file
            </span>

            <span
              className={`mt-1 text-xs ${
                darkMode ? "text-slate-500" : "text-slate-500"
              }`}
            >
              {hint}
            </span>
          </label>
        ) : (
          <div
            className={`rounded-2xl border p-4 ${
              darkMode
                ? "border-slate-300 bg-white"
                : "border-slate-700 bg-slate-900/40"
            }`}
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex min-w-0 items-center gap-3">
                <FileText
                  size={22}
                  className={darkMode ? "text-blue-600" : "text-red-500"}
                />

                <div className="min-w-0">
                  <p
                    className={`truncate text-sm font-semibold ${
                      darkMode ? "text-slate-800" : "text-white"
                    }`}
                  >
                    {file.name}
                  </p>

                  <p
                    className={`text-xs ${
                      darkMode ? "text-slate-500" : "text-slate-400"
                    }`}
                  >
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {(isImage || isPdf) && (
                  <button
                    type="button"
                    onClick={() => {
                      if (isPdf) {
                        const pdfUrl = URL.createObjectURL(file);
                        window.open(pdfUrl, "_blank");
                      } else {
                        setShowPreview(true);
                      }
                    }}
                    className="cursor-pointer rounded-xl p-2 text-blue-600 transition hover:bg-blue-500/10"
                  >
                    <Eye size={18} />
                  </button>
                )}

                <button
                  type="button"
                  onClick={onDelete}
                  className="cursor-pointer rounded-xl p-2 text-red-500 transition hover:bg-red-500/10"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            {isImage && (
              <img
                src={URL.createObjectURL(file)}
                alt="Preview"
                onClick={() => setShowPreview(true)}
                className="
                  mt-4
                  h-52
                  w-full
                  cursor-pointer
                  rounded-xl
                  object-cover
                  transition-all
                  duration-300
                  hover:scale-[1.02]
                "
              />
            )}
          </div>
        )}
      </div>

      {/* Modal Preview */}
      {showPreview && isImage && file && (
        <div
          className="
          fixed
          inset-0
          z-9999
          flex
          items-center
          justify-center
          bg-black/80
          backdrop-blur-sm
          p-4
        "
          onClick={() => setShowPreview(false)}
        >
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setShowPreview(false)}
              className="
              absolute
              -right-3
              -top-3
              z-10
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              bg-red-600
              text-white
              shadow-lg
              transition-all
              hover:scale-110
              cursor-pointer
            "
            >
              <X size={18} />
            </button>

            <img
              src={URL.createObjectURL(file)}
              alt="Preview"
              className={`
              rounded-2xl
              object-contain
              shadow-2xl
              ${
                previewSize === "sm"
                  ? "max-h-[65vh] max-w-[65vw]"
                  : "max-h-[90vh] max-w-[90vw]"
              }
            `}
            />
          </div>
        </div>
      )}
    </>
  );
}
