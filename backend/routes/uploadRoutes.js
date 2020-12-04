import express from 'express';
import multer from 'multer';
import path from 'path';


const router = express.Router()

const storage = multer.diskStorage({
    destination(request, file, callback) {
        callback(null, "uploads/")
    },
    filename(request, file, callback) {
        callback(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})

function checkFileType(file, callback) {
    const filetypes = /jpg|jpeg|png/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)

    if (extname && mimetype) {
        callback(null, true)
    } else {
        callback("please, images only")
    }
}

const upload = multer({
    storage,
    fileFilter: function (request, file, callback) {
        checkFileType(file, callback)
    }
})

router.post('/', upload.single('image'), (request, response) => {
    response.send(`/${request.file.path}`)
})

export default router