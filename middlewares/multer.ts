import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Define la carpeta donde se almacenarán los archivos
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    // Define el nombre del archivo en función de tus necesidades
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

export default upload;