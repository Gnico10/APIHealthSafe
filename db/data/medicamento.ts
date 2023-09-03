import Medicamento from "../../models/medicamento";

const loadMedicamentos = async() => {
    // List of medicamentos
    const listmedicamentos = [
        {
            nombre: "Paracetamol",
            monodroga: "Paracetamol",
        },
        {
            nombre: "Ibuprofeno",
            monodroga: "Ibuprofeno",
        },
        {
            nombre: "Amoxicilina",
            monodroga: "Amoxicilina",
        },
        {
            nombre: "Omeprazol",
            monodroga: "Omeprazol",
        },
        {
            nombre: "Loratadina",
            monodroga: "Loratadina",
        }
    ];
    // Create  in database
    listmedicamentos.map(async (medic) => {
        await Medicamento.findOrCreate({
            where: {
                nombre: medic.nombre,
                monodroga: medic.monodroga
            },
        });
    });
}

export default loadMedicamentos;