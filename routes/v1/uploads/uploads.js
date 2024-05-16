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
    const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

    const extname = filetypes.test(
        path.extname(file.originalname).toLowerCase()
    );

    const mimetype = mimetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb(new Error("Images only!"), false);
    }
}

const upload = multer({
    storage,
    checkFileType,
});

const uploadSingleImage = upload.single("image");

router.post("/", (req, res) => {
    uploadSingleImage(req, res, function (err) {
        if (err) {
            return res.status(400).send({ message: err.message });
        }

        let imgPath = req.file.path;
        const replaceSlash = "\\";
        imgPath.replace(replaceSlash, `/`);
        res.send({
            success: true,
            message: "Image uploaded successfully",
            image: imgPath,
        });
        
    })
});

export default router;
