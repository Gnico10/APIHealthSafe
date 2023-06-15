import Localidad from "../../models/localidad";

const loadLocalidades = async() => {
    // List of localidades
    const listlocalidades = [
        {
            codpostal: '4000',
            descripcion: 'San Miguel de Tucumán'
        },
        {
            codpostal: '4006',
            descripcion: 'Yerba Buena'
        },
        {
            codpostal: '4101',
            descripcion: 'Alderetes'
        },
        {
            codpostal: '4114',
            descripcion: 'Banda del Río Salí'
        },
        {
            codpostal: '4107',
            descripcion: 'Bella Vista'
        },
        {
            codpostal: '4137',
            descripcion: 'Burruyacú'
        },
        {
            codpostal: '4103',
            descripcion: 'Famaillá'
        },
        {
            codpostal: '4122',
            descripcion: 'Lules'
        },
        {
            codpostal: '4144',
            descripcion: 'Monteros'
        },
        {
            codpostal: '4124',
            descripcion: 'Tafí del Valle'
        },
        {
            codpostal: '4105',
            descripcion: 'Tafí Viejo'
        },
    ];

    // Create localidades in database
    listlocalidades.map(async (locali) => {
        await Localidad.findOrCreate({
            where: {
                codpostal: locali.codpostal,
                descripcion: locali.descripcion
            }
        });
    });
}

export default loadLocalidades;