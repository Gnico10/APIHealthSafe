import Modalidad from "../../models/modalidad";

const loadModalidades = async() => {
    // List of Modalidades
    const descrmodalidades : string[] = [
        'Presencial', 
        'Virtual',
    ];

    // Create modalidades in database
    descrmodalidades.map(async (desc) => {
        await Modalidad.findOrCreate({
            where: { descripcion: desc }
        });
    });
}

export default loadModalidades;