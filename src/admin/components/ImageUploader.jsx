import React, { useState, useRef } from "react";
import { 
  UploadCloud, 
  Trash2, 
  Star, 
  Image as ImageIcon, 
  Loader2, 
  Plus, 
  Link as LinkIcon,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { uploadAPI } from "../../services/api";

/**
 * Modern Cloudinary image uploader component
 * Supports single and multiple image uploads, cover selection, and manual URL input.
 */
export default function ImageUploader({
  images = [],
  coverImage = "",
  onChange,
  onCoverChange,
  multiple = true,
  folder = "portfolio",
  label = "Upload Image(s)"
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [manualUrl, setManualUrl] = useState("");
  const fileInputRef = useRef(null);

  // Normalize images array
  const imageList = Array.isArray(images) 
    ? images.filter(Boolean) 
    : (images ? [images] : []);

  const activeCover = coverImage || (imageList.length > 0 ? imageList[0] : "");

  const handleFiles = async (files) => {
    if (!files || files.length === 0) return;
    setUploadError("");
    setIsUploading(true);

    try {
      if (multiple && files.length > 1) {
        const res = await uploadAPI.uploadMultiple(files, folder);
        if (res.success && res.urls) {
          const updated = [...imageList, ...res.urls];
          onChange(updated);
          if (!activeCover && res.urls[0] && onCoverChange) {
            onCoverChange(res.urls[0]);
          }
        }
      } else {
        // Single file upload
        const file = files[0];
        const res = await uploadAPI.uploadSingle(file, folder);
        if (res.success && res.url) {
          if (multiple) {
            const updated = [...imageList, res.url];
            onChange(updated);
            if (!activeCover && onCoverChange) {
              onCoverChange(res.url);
            }
          } else {
            onChange([res.url]);
            if (onCoverChange) onCoverChange(res.url);
          }
        }
      }
    } catch (err) {
      console.error("Upload error:", err);
      setUploadError(err.message || "Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleFileInputChange = (e) => {
    handleFiles(e.target.files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleRemoveImage = (indexToRemove) => {
    const removedUrl = imageList[indexToRemove];
    const updated = imageList.filter((_, idx) => idx !== indexToRemove);
    onChange(updated);

    if (activeCover === removedUrl && onCoverChange) {
      onCoverChange(updated[0] || "");
    }
  };

  const handleSetCover = (url) => {
    if (onCoverChange) {
      onCoverChange(url);
    }
  };

  const handleAddManualUrl = (e) => {
    e.preventDefault();
    if (!manualUrl.trim()) return;
    const url = manualUrl.trim();
    if (multiple) {
      const updated = [...imageList, url];
      onChange(updated);
      if (!activeCover && onCoverChange) onCoverChange(url);
    } else {
      onChange([url]);
      if (onCoverChange) onCoverChange(url);
    }
    setManualUrl("");
    setShowUrlInput(false);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-mono text-slate-300">
          {label} {multiple ? "(Single or Multiple)" : ""}
        </label>
        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="text-[11px] font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
        >
          <LinkIcon size={12} />
          <span>{showUrlInput ? "Hide URL input" : "Paste URL"}</span>
        </button>
      </div>

      {/* Manual URL Input Toggle */}
      {showUrlInput && (
        <div className="flex gap-2 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
          <input
            type="url"
            placeholder="https://example.com/image.jpg"
            value={manualUrl}
            onChange={(e) => setManualUrl(e.target.value)}
            className="flex-1 px-3 py-1.5 rounded-lg glass-input text-xs"
          />
          <button
            type="button"
            onClick={handleAddManualUrl}
            className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs"
          >
            Add
          </button>
        </div>
      )}

      {/* Drag & Drop Upload Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !isUploading && fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition-all duration-200 ${
          isDragging
            ? "border-cyan-400 bg-cyan-500/10 scale-[1.01]"
            : "border-slate-700/80 bg-slate-950/40 hover:border-cyan-500/50 hover:bg-slate-900/60"
        } ${isUploading ? "pointer-events-none opacity-80" : ""}`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png, image/jpeg, image/jpg, image/webp, image/svg+xml, image/gif"
          multiple={multiple}
          onChange={handleFileInputChange}
          className="hidden"
        />

        <div className="flex flex-col items-center justify-center gap-2">
          {isUploading ? (
            <>
              <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
              <p className="text-xs font-mono text-cyan-300">
                Uploading to Cloudinary...
              </p>
              <p className="text-[11px] text-slate-500">Please wait a moment</p>
            </>
          ) : (
            <>
              <div className="w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition">
                <UploadCloud size={20} />
              </div>
              <div className="space-y-0.5">
                <p className="text-xs font-medium text-slate-200">
                  <span className="text-cyan-400 font-bold hover:underline">Click to browse</span> or drag and drop images
                </p>
                <p className="text-[11px] text-slate-500 font-mono">
                  PNG, JPG, WebP, SVG • Max 10MB {multiple ? "• Multi-select enabled" : ""}
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Error notification */}
      {uploadError && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
          <AlertCircle size={14} className="shrink-0" />
          <span>{uploadError}</span>
        </div>
      )}

      {/* Uploaded Thumbnails Preview Grid */}
      {imageList.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>Uploaded Images ({imageList.length})</span>
            {multiple && <span className="text-slate-500">★ Click star to set cover image</span>}
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {imageList.map((url, idx) => {
              const isCover = url === activeCover;
              return (
                <div
                  key={idx}
                  className={`relative group rounded-xl overflow-hidden border aspect-video bg-slate-950 flex items-center justify-center transition-all ${
                    isCover
                      ? "border-cyan-400 ring-2 ring-cyan-500/30 shadow-lg shadow-cyan-950/40"
                      : "border-slate-800 hover:border-slate-600"
                  }`}
                >
                  <img
                    src={url}
                    alt={`Preview ${idx + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=300&auto=format&fit=crop";
                    }}
                  />

                  {/* Cover badge */}
                  {isCover && (
                    <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded-md bg-cyan-500 text-slate-950 text-[9px] font-mono font-bold flex items-center gap-0.5 shadow-md">
                      <Star size={9} fill="currentColor" />
                      <span>Cover</span>
                    </div>
                  )}

                  {/* Hover Actions Overlay */}
                  <div className="absolute inset-0 bg-slate-950/75 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5">
                    {multiple && !isCover && onCoverChange && (
                      <button
                        type="button"
                        onClick={() => handleSetCover(url)}
                        title="Set as cover image"
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-cyan-500 text-slate-300 hover:text-slate-950 transition cursor-pointer"
                      >
                        <Star size={13} />
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      title="Remove image"
                      className="p-1.5 rounded-lg bg-red-500/20 hover:bg-red-500 text-red-300 hover:text-white transition cursor-pointer"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
