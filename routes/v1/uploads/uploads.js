import express from "express"
import path from "path"
import multer from "multer"

const router = express.Router();

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, "uploads/")
    },
    filename(req, file, cb) {
        cb(null, `${fle.filename}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

function checkFileType(file,cb) {
    const filetypes = /jpg|jpeg|png/;

    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    const mimetype = filetypes.test(file.mimetype);

    if (extname&&mimetype) {
        return cb(null, true);
    } else {
        cd("Only images can be uploaded!");
    }
}

const upload = multer({
    storage
});

router.post("/", upload.single("image"), (req, res) => {
    res.send({
        success:true,
        message: "Image uploaded successfully",
        image:`/${req.file.path}`
    })
})

export default router