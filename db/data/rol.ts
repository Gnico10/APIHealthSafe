import rol from "../../models/rol";

const loadRoles = async() => {
    // List of Roles
    const descroles : string[] = [
        'Paciente', 
        'Profesional'
    ];

    // Create Roles in database
    descroles.map(async (desc) => {
        await rol.create({
            descripcion: desc
        });
    });
}

export default loadRoles;