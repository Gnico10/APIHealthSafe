import TipoMatricula from "../../models/tipomatricula";

const loadTipoMatricula = async() => {
    // List of TipoMatricula
    const desctipomatricula : string[] = [
        'Maitricula Nacional', 
        'Matricula Provincial'
    ];

    // Create TiposMatricula in database
    desctipomatricula.map(async (desc) => {
        await TipoMatricula.findOrCreate({
            where: {
                descripcion: desc
            }
        });
    });
}

export default loadTipoMatricula;