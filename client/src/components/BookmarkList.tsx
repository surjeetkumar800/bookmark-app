import React from 'react';
import axios from 'axios';

interface Bookmark {
  _id: string;
  title: string;
  url: string;
  createdAt: string;
}

interface BookmarkListProps {
  bookmarks: Bookmark[];
  onDelete: (id: string) => void;
}

const BookmarkList: React.FC<BookmarkListProps> = ({ bookmarks, onDelete }) => {
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/api/bookmarks/${id}`, { withCredentials: true });
      onDelete(id);
    } catch (err) {
      console.error('Failed to delete bookmark', err);
    }
  };

  const getHostname = (url: string) => {
    try {
      return new URL(url).hostname;
    } catch {
      return url;
    }
  };

  if (bookmarks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-16 text-center transition-all border border-dashed border-slate-300 rounded-3xl bg-slate-50/50 hover:bg-slate-50">
        <div className="p-4 mb-4 bg-white rounded-full shadow-sm">
          <svg className="w-12 h-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
        </div>
        <h3 className="text-xl font-bold text-slate-800">No bookmarks yet</h3>
        <p className="mt-2 text-slate-500">Save your first link to get started!</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
      {bookmarks.map((bookmark) => {
        // Simple favicon fetch
        const faviconUrl = `https://www.google.com/s2/favicons?domain=${bookmark.url}&sz=64`;

        return (
          <div key={bookmark._id} className="relative p-5 transition-all duration-300 bg-white border border-slate-100 shadow-sm rounded-2xl hover:shadow-xl hover:border-blue-100 hover:-translate-y-1 group">
            <div className="flex flex-col h-full justify-between">
              <div className="flex items-start justify-between gap-4 mb-3">
                <img
                  src={faviconUrl}
                  alt=""
                  className="flex-shrink-0 w-12 h-12 p-1.5 transition-transform bg-slate-50 rounded-xl group-hover:scale-110 group-hover:shadow-md"
                  onError={(e) => { (e.target as HTMLImageElement).src = 'https://www.svgrepo.com/show/508699/landscape-placeholder.svg' }}
                />
                <div className="flex gap-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  <a
                    href={bookmark.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-slate-400 transition-colors rounded-lg hover:bg-blue-50 hover:text-blue-600 focus:opacity-100 focus:bg-blue-50 focus:text-blue-600"
                    title="Open Link"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                  </a>
                  <button
                    onClick={() => handleDelete(bookmark._id)}
                    className="p-2 text-slate-400 transition-colors rounded-lg hover:bg-red-50 hover:text-red-600 focus:opacity-100 focus:bg-red-50 focus:text-red-600"
                    title="Delete"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              </div>

              <div className="min-w-0">
                <h3 className="mb-1 text-lg font-bold text-slate-800 truncate transition-colors group-hover:text-blue-600" title={bookmark.title}>
                  {bookmark.title}
                </h3>
                <a
                  href={bookmark.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm font-medium truncate text-slate-400 hover:text-blue-500 hover:underline"
                >
                  {getHostname(bookmark.url)}
                </a>
                <p className="mt-3 text-xs font-semibold tracking-wide text-slate-300 uppercase">
                  {new Date(bookmark.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BookmarkList;
