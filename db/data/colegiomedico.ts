import ColegioMedico from "../../models/colegiomedico";

const loadColegiosMedicos = async() => {
    // List of colegiosmedicos
    const listcolegiosmedicos = [
        {
            nombre: 'Colegio 1'
        },
        {
            nombre: 'Colegio 2'
        },
        {
            nombre: 'Colegio 3'
        }
    ];

    // Create colegiosmedicos in database
    listcolegiosmedicos.map(async (colegio) => {
        await ColegioMedico.findOrCreate({
            where: {
                nombre: colegio.nombre,
            },
            defaults: {
                idpais: 1
            }
        });
    });
}

export default loadColegiosMedicos;