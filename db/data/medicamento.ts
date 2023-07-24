import Medicamento from "../../models/medicamento";

const loadMedicamentos = async() => {
    // List of medicamentos
    const listmedicamentos = [
        {
            nombre: "Paracetamol",
            monodroga: "Paracetamol",
            presentacion: "Tabletas de 500 mg"
        },
        {
            nombre: "Ibuprofeno",
            monodroga: "Ibuprofeno",
            presentacion: "Tabletas de 400 mg"
        },
        {
            nombre: "Amoxicilina",
            monodroga: "Amoxicilina",
            presentacion: "Cápsulas de 500 mg"
        },
        {
            nombre: "Omeprazol",
            monodroga: "Omeprazol",
            presentacion: "Cápsulas de 20 mg"
        },
        {
            nombre: "Loratadina",
            monodroga: "Loratadina",
            presentacion: "Tabletas de 10 mg"
        }
    ];
    // Create  in database
    listmedicamentos.map(async (medic) => {
        await Medicamento.findOrCreate({
            where: {
                nombre: medic.nombre,
                monodroga: medic.monodroga,
                presentacion: medic.presentacion
            },
        });
    });
}

export default loadMedicamentos;