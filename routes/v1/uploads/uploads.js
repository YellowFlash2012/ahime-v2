import express from "express";
import path from "path";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, "uploads/");
    },
    filename(req, file, cb) {
        cb(
            null,
            `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
        );
    },
});

function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png|webp/;

    const extname = filetypes.test(
        path.extname(file.originalname).toLowerCase()
    );

    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cd("Only images can be uploaded!");
    }
}

const upload = multer({
    storage,
    checkFileType,
});

router.post("/", upload.single("image"), (req, res) => {
    let imgPath = req.file.path;
    const replaceSlash = "\\";
    imgPath.replace(replaceSlash, `/`);
    res.send({
        success: true,
        message: "Image uploaded successfully",
        image: imgPath,
    });
});

export default router;
