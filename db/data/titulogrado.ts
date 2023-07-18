import TituloGrado from "../../models/titulogrado";

const loadTituloGrado = async() => {
    // List of TituloGrado
    const desctitulogrado : string[] = [
        'Medicina general',
        'Pediatría',
        'Ginecología',
        'Urología',
        'Cirugía general',
        'Cirugía ortopédica',
        'Oftalmología',
        'Otorrinolaringología',
        'Dermatología',
        'Oncología'
    ];

    // Create TiposMatricula in database
    desctitulogrado.map(async (desc, index) => {
        await TituloGrado.findOrCreate({
            where: {
                descripcion: desc
            },
            defaults: {
                idtitulogrado: index + 1,
                descripcion: desc
            }
        });
    });
}

export default loadTituloGrado;