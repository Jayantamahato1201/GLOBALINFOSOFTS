import React, { useState, useEffect, useRef } from 'react';
import {
  Image as ImageIcon,
  UploadCloud,
  Copy,
  Check,
  Trash2,
  ExternalLink,
  Search,
  Filter,
  File,
  AlertCircle
} from 'lucide-react';
import { useAdminAuth } from '../AdminAuthContext';
import { CmsMediaItem } from '../cmsTypes';
import { ConfirmModal } from '../components/ConfirmModal';

export const MediaLibrary: React.FC = () => {
  const { apiFetch, showToast, canDelete } = useAdminAuth();
  const [mediaList, setMediaList] = useState<CmsMediaItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<CmsMediaItem | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadMedia = async () => {
    try {
      const data = await apiFetch('/api/media');
      setMediaList(data || []);
    } catch (err) {
      console.error('Failed to load media list:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMedia();
  }, []);

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];

    // Read as Base64 Data URL so it is permanently persisted inside our CMS datastore without external cloud dependencies
    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const base64Url = reader.result as string;
        const newMedia = await apiFetch('/api/media/upload', {
          method: 'POST',
          body: JSON.stringify({
            name: file.name,
            originalName: file.name,
            mimeType: file.type || 'image/jpeg',
            size: file.size,
            dataUrl: base64Url
          })
        });

        setMediaList((prev) => [newMedia, ...prev]);
        showToast(`Asset "${file.name}" uploaded successfully.`);
      } catch (err: any) {
        showToast(err.message, 'error');
      } finally {
        setIsUploading(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCopyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    showToast('Media URL copied to clipboard!', 'info');
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await apiFetch(`/api/media/${deleteTarget.id}`, { method: 'DELETE' });
      setMediaList((prev) => prev.filter((m) => m.id !== deleteTarget.id));
      showToast('Media asset removed.');
      setDeleteTarget(null);
    } catch (err: any) {
      showToast(err.message, 'error');
    }
  };

  const filteredMedia = mediaList.filter((m) =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.mimeType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatBytes = (bytes: number) => {
    if (!bytes) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900 border border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-teal-400" />
            Media & Asset Storage Library
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Store, preview, and copy URLs for logos, screenshots, portfolio case studies, and blog headers.
          </p>
        </div>

        <div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => handleFileUpload(e.target.files)}
            accept="image/*"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition shadow-lg shadow-teal-950/40 disabled:opacity-50"
          >
            <UploadCloud className="w-4 h-4" />
            {isUploading ? 'Uploading Media...' : 'Upload Image / File'}
          </button>
        </div>
      </div>

      {/* Drag & Drop Upload Dropzone Area */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleFileUpload(e.dataTransfer.files);
        }}
        onClick={() => fileInputRef.current?.click()}
        className="p-8 border-2 border-dashed border-slate-800 hover:border-teal-500/50 rounded-2xl bg-slate-900/50 text-center cursor-pointer transition group"
      >
        <div className="w-12 h-12 mx-auto rounded-xl bg-slate-800 group-hover:bg-teal-500/10 flex items-center justify-center text-slate-400 group-hover:text-teal-400 mb-3 transition">
          <UploadCloud className="w-6 h-6" />
        </div>
        <p className="text-sm font-semibold text-white">
          Drop image files here or click to browse
        </p>
        <p className="text-xs text-slate-500 mt-1">
          Supports PNG, JPG, WEBP, SVG, and GIF up to 5MB. Real-time media repository.
        </p>
      </div>

      {/* Search Filter Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search media files..."
            className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
          />
        </div>

        <span className="text-xs text-slate-400 font-mono">
          {filteredMedia.length} assets indexed
        </span>
      </div>

      {/* Assets Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {isLoading ? (
          <div className="col-span-full p-12 text-center text-slate-500 text-xs">
            Loading media catalog...
          </div>
        ) : filteredMedia.length === 0 ? (
          <div className="col-span-full p-12 text-center text-slate-500 text-xs border border-dashed border-slate-800 rounded-2xl">
            No media files found.
          </div>
        ) : (
          filteredMedia.map((media) => (
            <div
              key={media.id}
              className="rounded-xl bg-slate-900 border border-slate-800 overflow-hidden flex flex-col justify-between group hover:border-slate-700 transition"
            >
              {/* Asset Preview Thumbnail */}
              <div className="h-32 w-full bg-slate-950 relative overflow-hidden flex items-center justify-center p-2">
                <img
                  src={media.url}
                  alt={media.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition duration-300"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>

              {/* Asset Metadata & Actions */}
              <div className="p-3 bg-slate-900 space-y-1">
                <p className="text-xs font-semibold text-white truncate" title={media.name}>
                  {media.name}
                </p>
                <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
                  <span>{formatBytes(media.size)}</span>
                  <span>{new Date(media.createdAt).toLocaleDateString()}</span>
                </div>

                <div className="flex items-center gap-1 pt-2 border-t border-slate-800">
                  <button
                    onClick={() => handleCopyUrl(media.url, media.id)}
                    title="Copy Image URL"
                    className={`flex-1 py-1.5 px-2 rounded text-[11px] font-medium flex items-center justify-center gap-1 transition ${
                      copiedId === media.id
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                    }`}
                  >
                    {copiedId === media.id ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy URL</span>
                      </>
                    )}
                  </button>

                  <a
                    href={media.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
                    title="Open full size"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  {canDelete && (
                    <button
                      onClick={() => setDeleteTarget(media)}
                      className="p-1.5 rounded bg-slate-800 hover:bg-rose-950/40 text-slate-500 hover:text-rose-400 transition"
                      title="Delete asset"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={!!deleteTarget}
        title="Delete Media Asset?"
        message={`Are you sure you want to permanently delete "${deleteTarget?.name}"?`}
        confirmLabel="Delete Asset"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};
