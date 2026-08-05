import { motion } from "framer-motion";
import { X } from "lucide-react";

interface ProfilePreviewProps {
  open: boolean;
  photo: string;
  name: string;
  onClose: () => void;
}

export default function ProfilePreview({
  open,
  photo,
  name,
  onClose,
}: ProfilePreviewProps) {
  if (!open) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-10000 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
        className="relative"
      >
        <img
          src={photo}
          alt={`Foto ${name}`}
          className="max-h-[60vh] sm:max-h-[70vh] w-auto max-w-full rounded-2xl border-4 border-white object-cover shadow-2xl"
        />

        <button
          onClick={onClose}
          className="absolute right-2 top-2 rounded-full bg-white p-2 text-slate-800 shadow-lg transition hover:scale-110"
          aria-label="Close photo preview"
        >
          <X className="h-5 w-5 cursor-pointer" />
        </button>
      </motion.div>
    </motion.div>
  );
}
