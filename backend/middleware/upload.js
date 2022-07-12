import multer from 'multer';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'upload');
    },
    filename: function (req, file, cb) {
        let extArray = file.mimetype.split('/');
        let extension = extArray[extArray.length - 1];
        let extOrginnalname = file.originalname.split('.')[0];
        cb(null, extOrginnalname + '-' + Date.now() + '.' + extension);
    },
});

const upload = multer({ storage: storage }).single('file');

export default upload;
