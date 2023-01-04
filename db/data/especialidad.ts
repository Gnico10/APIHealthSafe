import especialidad from "../../models/especialidad";

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
    descespe.map(async (desc) => {
        await especialidad.create({
            descripcion: desc
        });
    });
}

export default loadEspecialidades;