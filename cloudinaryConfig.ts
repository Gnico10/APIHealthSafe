import { v2 as cloudinary } from 'cloudinary';

// Configuración de Cloudinary
cloudinary.config({
  cloud_name: 'healthsafeapp',
  api_key: '482359426613345',
  api_secret: 'J4c0Eutop6JrWqaldIsHZRQlb7I'
});

export default cloudinary;