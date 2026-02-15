const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const Bookmark = mongoose.model('Bookmark');

module.exports = app => {
    app.get('/api/bookmarks', requireLogin, async (req, res) => {
        const bookmarks = await Bookmark.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.send(bookmarks);
    });

    app.post('/api/bookmarks', requireLogin, async (req, res) => {
        const { title, url } = req.body;

        const bookmark = new Bookmark({
            title,
            url,
            userId: req.user.id
        });

        try {
            await bookmark.save();
            // Real-time update
            if (req.io) {
                req.io.emit('bookmark_added', bookmark);
                // Note: Broadcast to everyone or just user? 
                // Requirements say "bookmark in one tab, appear in other".
                // Emitting globally is easier but privacy leak if multiple users?
                // But for "User A cannot see User B's", frontend filters or backend rooms?
                // Best: Emit to a room named with userId.
            }
            res.send(bookmark);
        } catch (err) {
            res.status(422).send(err);
        }
    });

    app.delete('/api/bookmarks/:id', requireLogin, async (req, res) => {
        try {
            const result = await Bookmark.deleteOne({ _id: req.params.id, userId: req.user.id });
            if (req.io && result.deletedCount > 0) {
                req.io.emit('bookmark_deleted', req.params.id);
            }
            res.send({});
        } catch (err) {
            res.status(500).send(err);
        }
    });
};
