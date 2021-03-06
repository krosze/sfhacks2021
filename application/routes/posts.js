var express = require('express');
var router = express.Router();
var sharp = require('sharp');
var multer = require('multer');
var crypto = require('crypto');
var PostModel = require("../models/Posts");

const PostError = require('../helpers/error/PostError');
const { errorPrint } = require('../helpers/debug/debugprinters');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/images/uploads");
    },
    filename: function (req, file, cb) {
        let fileExt = file.mimetype.split('/')[1];
        let randomName = crypto.randomBytes(22).toString("hex");
        cb(null, `${randomName}.${fileExt}`);
    }
});

var uploader = multer({ storage: storage });


router.post('/createPost', uploader.single("uploadImage"), (req, res, next) => {
    let fileUploaded = req.file.path;
    let fileAsThumbnail = `thumbail-${req.file.filename}`;
    let destinationOfThumbnail = req.file.destination + "/" + fileAsThumbnail;
    let title = req.body.title;
    let description = req.body.desc;
    let fk_userId = req.session.loggedUserId;

    sharp(fileUploaded)
        .resize(200)
        .toFile(destinationOfThumbnail)
        .then(() => {
            return PostModel.create(
                title,
                description,
                fileUploaded,
                destinationOfThumbnail,
                fk_userId);
        })
        .then((postWasCreated) => {
            if (postWasCreated) {
                req.flash('success', 'Your post was created');
                res.redirect('/');
            } else {
                throw new PostError('Post could not be created :(', '/postImage', 200);
            }
        })
        .catch((err) => {
            if (err instanceof PostError) {
                errorPrint(err.getMessage());
                req.flash('error', err.getMessage());
                res.status(err.getStatus());
                res.redirect(err.getRedirectURL());
            } else {
                next(err);
            }
        })
});

//localhost:3000/posts/search?search=value
router.get('/search', async (req, res, next) => {
    try {
        let searchTerm = req.query.search;
        if (!searchTerm) {
            res.send({
                message: "No search term given",
                results: [],
            });
        } else {
            let results = await PostModel.search(searchTerm);
            if (results.length) {
                res.send({
                    message: `${results.length} results found`,
                    results: results
                });
            } else {
                let results = await PostModel.getMRecentPosts(8);
                res.send({
                    message: "No results where found for your search but here are the 8 most recent posts",
                    results: results,
                });
            }
        }
    } catch (err) {
        next(err);
    }
});
module.exports = router;