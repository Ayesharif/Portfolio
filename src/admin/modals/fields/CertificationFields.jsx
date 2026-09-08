import ImageUploader from "../../components/ImageUploader";

export default function CertificationFields({ editingItem, setEditingItem }) {
  const { data } = editingItem;

  const certImages = Array.isArray(data.images) && data.images.length > 0
    ? data.images
    : (data.image ? [data.image] : []);

  const handleImagesChange = (newImages) => {
    setEditingItem({
      ...editingItem,
      data: {
        ...data,
        images: newImages,
        image: newImages.includes(data.image) ? data.image : (newImages[0] || "")
      }
    });
  };

  const handleCoverChange = (newCover) => {
    setEditingItem({
      ...editingItem,
      data: {
        ...data,
        image: newCover
      }
    });
  };

  return (
    <>
      <div>
        <label className="block text-xs font-mono text-slate-300 mb-1">Certificate Title</label>
        <input
          type="text"
          required
          value={data.title}
          onChange={(e) =>
            setEditingItem({ ...editingItem, data: { ...data, title: e.target.value } })
          }
          className="w-full px-3 py-2 rounded-xl glass-input text-xs"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-mono text-slate-300 mb-1">Issuing Organization</label>
          <input
            type="text"
            required
            value={data.issuer}
            onChange={(e) =>
              setEditingItem({ ...editingItem, data: { ...data, issuer: e.target.value } })
            }
            className="w-full px-3 py-2 rounded-xl glass-input text-xs"
          />
        </div>
        <div>
          <label className="block text-xs font-mono text-slate-300 mb-1">Issue Year</label>
          <input
            type="text"
            value={data.date}
            onChange={(e) =>
              setEditingItem({ ...editingItem, data: { ...data, date: e.target.value } })
            }
            className="w-full px-3 py-2 rounded-xl glass-input text-xs"
          />
        </div>
      </div>

      <ImageUploader
        label="Certificate Image / Badge"
        images={certImages}
        coverImage={data.image}
        onChange={handleImagesChange}
        onCoverChange={handleCoverChange}
        multiple={true}
        folder="portfolio/certifications"
      />

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-mono text-slate-300 mb-1">Credential ID</label>
          <input
            type="text"
            value={data.credentialId || ""}
            onChange={(e) =>
              setEditingItem({ ...editingItem, data: { ...data, credentialId: e.target.value } })
            }
            className="w-full px-3 py-2 rounded-xl glass-input text-xs"
          />
        </div>
        <div>
          <label className="block text-xs font-mono text-slate-300 mb-1">Credential URL</label>
          <input
            type="url"
            value={data.credentialUrl || ""}
            onChange={(e) =>
              setEditingItem({ ...editingItem, data: { ...data, credentialUrl: e.target.value } })
            }
            className="w-full px-3 py-2 rounded-xl glass-input text-xs"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-mono text-slate-300 mb-1">Description</label>
        <textarea
          rows="2"
          value={data.description || ""}
          onChange={(e) =>
            setEditingItem({ ...editingItem, data: { ...data, description: e.target.value } })
          }
          className="w-full px-3 py-2 rounded-xl glass-input text-xs resize-none"
        ></textarea>
      </div>
    </>
  );
}
