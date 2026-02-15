import React, { useState } from 'react';
import axios from 'axios';

interface AddBookmarkFormProps {
  onAdd: (bookmark: any) => void;
}

const AddBookmarkForm: React.FC<AddBookmarkFormProps> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !url) return;

    setLoading(true);
    try {
      // Optimistic update could happen here, but we rely on real-time or response
      const res = await axios.post(
        `${API_URL}/api/bookmarks`,
        { title, url },
        { withCredentials: true }
      );
      onAdd(res.data);
      setTitle('');
      setUrl('');
    } catch (err) {
      console.error('Failed to add bookmark', err);
    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="p-6 transition-all duration-300 bg-white border border-white/40 glass-card rounded-3xl hover:shadow-2xl">
      <div className="flex items-center mb-6 gap-4">
        <div className="flex items-center justify-center w-12 h-12 text-white shadow-md bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-800">Add New</h2>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Save a URL</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="group">
          <label className="block mb-2 text-sm font-semibold tracking-wide text-slate-600">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 font-medium transition-all duration-200 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 placeholder-slate-400 group-hover:bg-white"
            placeholder="e.g. My Favorite Blog"
            required
          />
        </div>
        <div className="group">
          <label className="block mb-2 text-sm font-semibold tracking-wide text-slate-600">URL Link</label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full px-4 py-3 font-medium transition-all duration-200 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 placeholder-slate-400 group-hover:bg-white"
            placeholder="https://example.com"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="relative w-full px-4 py-4 font-bold text-white transition-all transform shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:shadow-blue-500/30 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none overflow-hidden group"
        >
          <div className="absolute inset-0 w-full h-full transition-opacity opacity-0 bg-white/20 group-hover:opacity-100"></div>
          <span className="relative flex items-center justify-center">
            {loading ? (
              <>
                <svg className="w-5 h-5 mr-2 animate-spin" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                Saving...
              </>
            ) : 'Save Bookmark'}
          </span>
        </button>
      </form>
    </div>
  );
};

export default AddBookmarkForm;
