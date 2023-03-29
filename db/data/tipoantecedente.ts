import TipoAntecedente from "../../models/tipoantecedente";

const loadTipoAntecedente = async() => {
    // List of TipoAntecedente
    const desctipoantecedente : string[] = [
        'Antecedetes Personales',
        'Antecedentes Familiares',
        'Antecedetes Inmunitarios',
        'Antecedentes Quirúrgicos y Traumatológicos',
        'Antecedentes Farmacológicos',
        'Antecedentes Epidemiológicos'
    ];

    // Create TiposMatricula in database
    desctipoantecedente.map(async (desc) => {
        await TipoAntecedente.findOrCreate({
            where: {
                descripcion: desc
            }
        });
    });
}

export default loadTipoAntecedente;