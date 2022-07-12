import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload');
    },
    filename: function (req, file, cb) {
        let extArray = file.mimetype.split('/');
        let extension = extArray[extArray.length - 1];
        cb(null, file.originalname + '-' + Date.now() + '.' + extension);
    },
});
const fileFilter = (req, file, cb) => {
    if (
        file.minetype === 'image/jpeg' ||
        file.minetype === 'image/png' ||
        file.minetype === 'image/png'
    ) {
        //apcep a file
        cb(null, true);
    } else {
        //reject a file
        cb(new Error('Dinh dang khong hop le'), false);
    }
};
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
});

export default upload;
