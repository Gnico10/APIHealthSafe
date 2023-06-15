import { Request, Response } from 'express';
import { generarJWT } from '../helpers/generarJWT';
import Usuario from '../models/usuario';
import bcryptjs from 'bcryptjs';
import Rol from '../models/rol';
//import cloudinary from '../cloudinaryConfig';
import upload from '../middlewares/multer';
import cloudinary from '../cloudinaryConfig';
import usuario from '../models/usuario';
  
export const getUsuarios = async (req: Request, res: Response) => {
  try {
    const usuarios = await Usuario.findAll({
      include: [
        {
          model: Rol,
          as: 'rol',
        },
      ],
    });
    res.json({ usuarios });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Error interno. No se pudieron obtener los usuarios',
    });
  }
};

export const getUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const usuario = await Usuario.findByPk(id, {
      include: [
        {
          model: Rol,
          as: 'rol',
        },
      ],
    });

    if (usuario) {
      res.json(usuario);
    } else {
      res.status(404).json({
        msg: `No existe un usuario con Id : ${id}`,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Error interno. No se pudo obtener el usuario',
    });
  }
};

export const postUsuario = async (req: Request, res: Response) => {
    const { body, files } = req;
    // Acceder a los atributos necesarios desde req.body
    const correo = body.correo;
    const dni = body.dni;
    const nombre = body.nombre;
    const apellido = body.apellido;
    const idrol = body.idrol;
    const fechanacimiento = body.fechanacimiento;
    const sexo = body.sexo;
    const imagenes = files ? files.values : {}
    // ... otros atributos
    console.log(files)
    const cargarImagen = (file: Express.Multer.File) => {
        return new Promise<string>((resolve, reject) => {
          cloudinary.uploader.upload(file.path, (error, result) => {
            if (error) {
              console.error(error);
              reject('Error al cargar la imagen');
            } else {
              if (result && result.secure_url) {
                resolve(result.secure_url);
              } else {
                reject(error);
              }
            }
          })
        });
    };

    try {
        // Validaciones
        const regex_email = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!regex_email.test(body.correo)) {
            return res.status(400).json({
                msg: `El Correo = ${body.correo} no es válido.`
            });
        }
      
      const existeUsuario = await Usuario.findOne({
        where: {
          correo: correo,
        },
      });
  
      if (existeUsuario) {
        return res.status(400).json({
          msg: `El usuario con el correo "${correo}" ya existe`,
        });
      };
      
      const salt = await bcryptjs.genSalt();
      const contrasena = bcryptjs.hashSync(body.contrasena, salt);      
      
      const newUsuario = Usuario.build({
        correo: correo,
        contrasena: contrasena,
        dni: dni,
        nombre: nombre,
        apellido:apellido,
        idrol: idrol,
        fechanacimiento:fechanacimiento,
        sexo:sexo,
        // ... otros atributos
      });

      const procesarArchivo = async (file: Express.Multer.File) => {
        const image = await cargarImagen(file);
        switch (file.fieldname) {
          case 'imgperfil':
            newUsuario.imgperfil = image;
            break;
          case 'imgdnifrente':
            newUsuario.imgdnifrente = image;
            break;
          case 'imgdnidorso':
            newUsuario.imgdnidorso = image;
          default:
            break;
        }
      };

      if (files) {
        if (Array.isArray(files)) {
            files.forEach((file) => {
              console.log(file.fieldname);
              try {
                procesarArchivo(file);
              } catch (error) {
                console.error(error);
              }
            });
          } else {
            Object.values(files).forEach((fileArray) => {
              fileArray.forEach((file) => {
                console.log(file.fieldname);
                try {
                    procesarArchivo(file);
                } catch (error) {
                  console.error(error);
                }
              });
            });
          }
      }
  
      // Creación de instancia en la base de datos  
      await newUsuario.save();
  
      const usuario = await Usuario.findOne({
        where: {
          correo: correo,
        },
        include: [
          {
            model: Rol,
            as: 'rol',
          },
        ],
      });
  
      res.json({
        msg: 'Usuario dado de alta',
        usuario,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: 'Error interno. No se pudo crear el usuario',
      });
    }
  };
  
     
export const putUsuario = async (req: Request, res: Response) => {
  const { correo, contrasena } = req.body;

  try {
    const usuario = await Usuario.findOne({
      where: { correo },
    });
    if (!usuario) {
      return res.status(404).json({
        msg: `No existe un usuario con el Correo : ${correo}`,
      });
    }

    const salt = await bcryptjs.genSalt();
    let nuevacontrasena = bcryptjs.hashSync(contrasena, salt);
    await usuario.update({
      contrasena: nuevacontrasena,
    });

    res.json({
      msg: 'Usuario actualizado con éxito',
      usuario,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Error interno. No se pudo actualizar el usuario',
    });
  }
};

export const deleteUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({
        msg: `No existe un usuario con el id : ${id}`,
      });
    }

    await usuario.destroy();

    res.json({
      msg: 'El usuario fue eliminado con éxito',
      usuario,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Error interno. No se pudo eliminar el usuario',
    });
  }
};
