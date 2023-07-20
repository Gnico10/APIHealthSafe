import TituloGrado from "../../models/titulogrado";

const loadTituloGrado = async() => {
    // List of TituloGrado
    const desctitulogrado : string[] = [
        'Kinesiólogo',
        'Licenciado en Fonoaudiología',
        'Licenciado en Nutrición',
        'Licenciado en Psicología',
        'Licenciado en Psicopedagogía',
        'Médico',
        'Médico Cirujano',
        'Nutricionista',
        'Odontólogo',
        'Psicólogo',
        'Puericultor',
        'Terapeuta',
        'Terapista ocupacional'
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