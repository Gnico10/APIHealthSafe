import Especialidad from "../../models/especialidad";

const loadEspecialidades = async() => {
    // List of Especialidades
    const descespe : string[] = [
        'Médico General', 
        'Cardiología', 
        'Dermatología', 
        'Endocrinología', 
        'Gastroenterología', 
        'Ginecología', 
        'Hematología', 
        'Infectología', 
        'Medicina general', 
        'Neumología', 
        'Neurología', 
        'Nutrición', 
        'Oftalmología', 
        'Oncología', 
        'Otorrinolaringología', 
        'Pediatría', 
        'Psiquiatría', 
        'Reumatología', 
        'Urología'
    ];

    // Create Especialidades in database
    descespe.map(async (desc, index) => {
        await Especialidad.findOrCreate({
            where:{
                descripcion: desc
            },
            defaults: {
                idespecialidad: index + 1,
                descripcion: desc
            }
        });
    });
}

export default loadEspecialidades;