import TipoMatricula from "../../models/tipomatricula";

const loadTipoMatricula = async() => {
    // List of TipoMatricula
    const desctipomatricula : string[] = [
        'Matricula Nacional', 
        'Matricula Provincial'
    ];

    // Create TiposMatricula in database
    desctipomatricula.map(async (desc, index) => {
        await TipoMatricula.findOrCreate({
            where: {
                descripcion: desc
            },
            defaults: {
                idtipomatricula: index + 1,
                descripcion: desc
            }
        });
    });
}

export default loadTipoMatricula;