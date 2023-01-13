import universidad from "../../models/universidad";

const loadUniversidades = async() => {
    // List of universidades
    const listuniversidades = [
        {
            nombre: 'Universidad 1'
        },
        {
            nombre: 'Universidad 2'
        },
        {
            nombre: 'Universidad 3'
        }
    ];

    // Create Universidades in database
    listuniversidades.map(async (univer) => {
        await universidad.findOrCreate({
            where: {
                nombre: univer.nombre,
            },
            defaults: {
                idpais: 1
            }
        });
    });
}

export default loadUniversidades;