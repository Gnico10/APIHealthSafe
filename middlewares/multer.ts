import express from 'express';
import multer from 'multer';

const app = express();

// Configurar el almacenamiento de multer
const storage = multer.diskStorage({});

// Configurar el middleware multer con el almacenamiento
const upload = multer({ storage });
