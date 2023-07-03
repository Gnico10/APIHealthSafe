import Rol from "../../models/rol";

const loadRoles = async() => {
    // List of Roles
    const descroles : string[] = [
        'Paciente', 
        'Profesional'
    ];

    // Create Roles in database
    descroles.map(async (desc, index) => {
        await Rol.findOrCreate({
            where: {
                descripcion: desc
            },
            defaults: {
                idrol: index + 1,
                descripcion: desc
            }
        });
    });
}

export default loadRoles;