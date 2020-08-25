const express = require("express");

const Tracking = require("../models/tracking");

const router = express.Router();

router.post(
    "",
    (req, res, next) => {
        console.log(req.body);
        const tracking = new Tracking({
            trackingNo: req.body.trackingNo,
            status: req.body.status,
            shipto: req.body.shipto,
            // unloadingPoint: req.body.unloadingPoint,
            // recipient: req.body.recipientk,
            po: req.body.po,
            vendor: req.body.vendor
                //createdBy: "Gap",
                //createdTimeStamp: "Today"
        });
        tracking.save().then(createdTracking => {
            res.status(201).json({
                message: "Tracking added successfully",
                post: {
                    ...createdTracking,
                    // create mongo ID in database 
                    id: createdTracking._id

                }
            });
        });
    }
);

module.exports = router;

// router.put(
//   "/:id",
//   multer({ storage: storage }).single("image"),
//   (req, res, next) => {
//     let imagePath = req.body.imagePath;
//     if (req.file) {
//       const url = req.protocol + "://" + req.get("host");
//       imagePath = url + "/images/" + req.file.filename
//     }
//     const post = new Post({
//       _id: req.body.id,
//       title: req.body.title,
//       content: req.body.content,
//       imagePath: imagePath
//     });
//     console.log(post);
//     Post.updateOne({ _id: req.params.id }, post).then(result => {
//       res.status(200).json({ message: "Update successful!" });
//     });
//   }
// );

// router.get("", (req, res, next) => {
//   Post.find().then(documents => {
//     res.status(200).json({
//       message: "Posts fetched successfully!",
//       posts: documents
//     });
//   });
// });

// router.get("/:id", (req, res, next) => {
//   Post.findById(req.params.id).then(post => {
//     if (post) {
//       res.status(200).json(post);
//     } else {
//       res.status(404).json({ message: "Post not found!" });
//     }
//   });
// });

// router.delete("/:id", (req, res, next) => {
//   Post.deleteOne({ _id: req.params.id }).then(result => {
//     console.log(result);
//     res.status(200).json({ message: "Post deleted!" });
//   });
// });