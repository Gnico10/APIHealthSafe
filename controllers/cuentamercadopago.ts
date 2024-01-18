import {Request, Response} from "express";
import Profesional from "../models/profesional";
import CuentaMercadoPago from '../models/cuentamercadopago';

export const postCuentaMercadoPago = async (req: Request, res: Response) => {
    const { idprofesional } = req.params;
    const {accesstoken, tokentype, expiresin, userid, refreshtoken, publickey, updatedat} = req.body;
    try {

        const profesional = await Profesional.findByPk(idprofesional);

        if (!profesional) {
            return res.status(404).json({
                msg: `No existe un profesional con id = ${idprofesional}`
            });
        }

        const cuentaMercadoPagoProfesional = await CuentaMercadoPago.findOne({
            where: { idprofesional:  idprofesional}
        });

        if (cuentaMercadoPagoProfesional) {
            return res.status(404).json({
                msg: `El profesional con id = ${idprofesional} ya tiene una cuenta de mercado pago creada. Tienes que actualizar su access token`
            });
        }

        const cuentamercadopago = await CuentaMercadoPago.create({
            accesstoken: accesstoken,
            tokentype: tokentype,
            expiresin: expiresin,
            userid: userid,
            refreshtoken: refreshtoken,
            publickey: publickey,
            updatedat: updatedat,
            idprofesional: idprofesional
        });

        const cuentamercadopagoDB = await CuentaMercadoPago.findByPk(cuentamercadopago.idcuentamercadopago);

        res.json({
            msg: `Cuenta de mercado pago dada de alta al profesional con ID: ${idprofesional}`,
            cuentamercadopago: cuentamercadopagoDB
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error Interno. No se pudo dar de alta la cuenta de mercado pago'
        });
    }
}

export const getCuentaMercadoPago = async (req: Request, res: Response) => {
    const { idprofesional } = req.params;

    try {

        const profesional = await Profesional.findByPk(idprofesional);

        if (!profesional) {
            return res.status(404).json({
                msg: `No existe un profesional con id = ${idprofesional}`
            });
        }

        const cuentamercadopagoDB = await CuentaMercadoPago.findOne({
            where: { idprofesional:  idprofesional}
        });

        res.json({
            msg: `Cuenta de mercado pago del profesional con ID: ${idprofesional}`,
            cuentamercadopago: cuentamercadopagoDB
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error Interno. No se pudo consultar la cuenta de mercado pago'
        });
    }
}

export const putCuentaMercadoPago = async (req: Request, res: Response) => {
    const { idcuentamercadopago } = req.params;
    const {accesstoken, tokentype, expiresin, userid, refreshtoken, publickey, updatedat} = req.body;

    try {

        const cuentamercadopago = await CuentaMercadoPago.findByPk(idcuentamercadopago);

        if (!cuentamercadopago) {
            return res.status(404).json({
                msg: `No existe una cuenta de mercado pago con = ${idcuentamercadopago}`
            });
        }

          await cuentamercadopago!.update({
            accesstoken: accesstoken,
            tokentype: tokentype,
            expiresin: expiresin,
            userid: userid,
            refreshtoken: refreshtoken,
            publickey: publickey,
            updatedat: updatedat,
            idprofesional: cuentamercadopago.idprofesional
          });

        const cuentamercadopagoDB = await CuentaMercadoPago.findByPk(idcuentamercadopago);
      
        res.json({
         msg: 'Cuenta de mercado pago actualizada con éxito',
         cuentamercadopago: cuentamercadopagoDB,
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error Interno. No se pudo actualizar los datos de la cuenta de mercado pago'
        });
    }
}