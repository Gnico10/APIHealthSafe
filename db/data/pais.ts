import pais from "../../models/pais";

const loadPaises = async() => {
    // List of Paises
    const descrpaises : string[] = [
        'Argentina', 
        'Chile',
        'Bolivia',
        'Paraguay',
        'Uruguay',
        'Brasil'
    ];

    // Create Paises in database
    descrpaises.map(async (desc) => {
        await pais.findOrCreate({
            where: { descripcion: desc }
        });
    });
}

export default loadPaises;