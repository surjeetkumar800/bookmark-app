import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import { useAuth } from '../context/AuthContext';
import AddBookmarkForm from './AddBookmarkForm';
import BookmarkList from './BookmarkList';

interface Bookmark {
    _id: string;
    title: string;
    url: string;
    createdAt: string;
    userId: string;
}

const Dashboard: React.FC = () => {
    const { user, logout } = useAuth();
    const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
    const [socket, setSocket] = useState<any>(null);

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    useEffect(() => {
        // Fetch initial bookmarks
        axios.get(`${API_URL}/api/bookmarks`, { withCredentials: true })
            .then(res => setBookmarks(res.data))
            .catch(err => console.error('Failed to load bookmarks', err));

        // Connect Socket
        const newSocket = io(API_URL);
        setSocket(newSocket);

        return () => {
            newSocket.close();
        };
    }, []);

    useEffect(() => {
        if (!socket) return;

        socket.on('bookmark_added', (newBookmark: Bookmark) => {
            // Only add if it belongs to current user (for privacy in real-time if filtering on client)
            // But ideally backend checks room. Here we check userId locally as fail-safe or convenience
            // Note: In a real app we'd use rooms. Here we just check userId.
            // Wait, models have userId.
            if (newBookmark.userId === user?._id) {
                setBookmarks(prev => {
                    if (prev.find(b => b._id === newBookmark._id)) return prev;
                    return [newBookmark, ...prev];
                });
            }
        });

        socket.on('bookmark_deleted', (id: string) => {
            setBookmarks(prev => prev.filter(b => b._id !== id));
        });

        return () => {
            socket.off('bookmark_added');
            socket.off('bookmark_deleted');
        };
    }, [socket, user]);

    const handleAdd = (bookmark: Bookmark) => {
        // We might get double update if we add to state here AND socket emits.
        // Usually, if we optimistically update, we handle it.
        // If we rely on socket, we don't update here.
        // But socket broadcast might be delayed.
        // Simple approach: Add here, and dedup if needed, OR just rely on socket.
        // Let's rely on socket for "real-time" demo feel, or just add it.
        // If I add it here, and socket also comes in, I'll have duplicates if I don't check ID.
        // Let's just NOT add it here and let the socket/response handle it?
        // Actually, AddBookmarkForm receives response.
        // If I update state in onAdd, I see it instantly.
        // Socket comes in -> check if exists?

        // Better: onAdd updates state. Socket handler checks uniqueness.
        setBookmarks(prev => {
            if (prev.find(b => b._id === bookmark._id)) return prev;
            return [bookmark, ...prev];
        });
    };

    const handleDelete = (id: string) => {
        setBookmarks(prev => prev.filter(b => b._id !== id));
    };

    return (
        <div className="min-h-screen bg-slate-50 selection:bg-blue-100 selection:text-blue-900">
            {/* Header */}
            <nav className="sticky top-0 z-50 transition-all duration-300 border-b border-white/20 glass">
                <div className="container px-4 mx-auto">
                    <div className="flex items-center justify-between h-20">
                        <div className="flex items-center gap-3 group cursor-pointer">
                            <div className="flex items-center justify-center w-10 h-10 transition-transform duration-300 shadow-lg bg-gradient-to-tr from-blue-600 to-purple-600 rounded-xl group-hover:rotate-12">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
                            </div>
                            <h1 className="text-2xl font-bold tracking-tight text-slate-800">
                                Smart<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Marks</span>
                            </h1>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="hidden text-right md:block">
                                <p className="font-semibold text-slate-800">{user?.displayName}</p>
                                <p className="text-xs font-medium text-slate-500">{user?.email}</p>
                            </div>
                            <div className="relative group">
                                {user?.image ? (
                                    <img src={user.image} alt={user.displayName} className="w-12 h-12 transition-transform duration-300 border-2 border-white shadow-md rounded-full ring-2 ring-blue-100 group-hover:scale-105" />
                                ) : (
                                    <div className="flex items-center justify-center w-12 h-12 text-lg font-bold text-white shadow-md bg-gradient-to-br from-blue-400 to-purple-500 rounded-full">
                                        {user?.email?.charAt(0).toUpperCase()}
                                    </div>
                                )}
                                <div className="absolute right-0 w-48 py-2 mt-2 origin-top-right transition-all duration-200 transform scale-95 opacity-0 bg-white border shadow-xl rounded-xl border-slate-100 group-hover:opacity-100 group-hover:scale-100 focus-within:opacity-100 focus-within:scale-100 pointer-events-none group-hover:pointer-events-auto">
                                    <button
                                        onClick={logout}
                                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 transition-colors hover:bg-red-50"
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                                        Sign out
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="container max-w-6xl px-4 py-12 mx-auto">
                <div className="mb-12 text-center md:text-left">
                    <h2 className="text-4xl font-extrabold text-slate-900">
                        Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Collection</span>
                    </h2>
                    <p className="mt-2 text-lg text-slate-600">Manage your favorite links with real-time sync.</p>
                </div>

                <div className="grid gap-8 lg:grid-cols-12">
                    {/* Left Column: Form */}
                    <div className="lg:col-span-4 xl:col-span-3">
                        <div className="sticky top-28">
                            <AddBookmarkForm onAdd={handleAdd} />
                        </div>
                    </div>

                    {/* Right Column: List */}
                    <div className="lg:col-span-8 xl:col-span-9">
                        <BookmarkList bookmarks={bookmarks} onDelete={handleDelete} />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
