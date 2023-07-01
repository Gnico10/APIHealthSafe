import Modalidad from "../../models/modalidad";

const loadModalidades = async() => {
    // List of Modalidades
    const descrmodalidades : string[] = [
        'Presencial', 
        'Virtual',
    ];

    // Create modalidades in database
    descrmodalidades.map(async (desc, index) => {
        await Modalidad.findOrCreate({
            where: { descripcion: desc },
            defaults: {
                idmodalidad: index + 1,
                descripcion: desc
            }
        });
    });
}

export default loadModalidades;