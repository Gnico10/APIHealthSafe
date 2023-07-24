
import tipoindicaciongeneral from "../../models/tipoindicaciongeneral";

const loadTipoIndicacionGenerales = async() => {
    // List of TipoIndicacionGenerales
    const desctipoindicaciongeneral : string[] = [
        'Certifcado',
        'Indicación General',
        'Laboratorio',
        'Pedido Estudio Médico',
        'Pedido Práctica Médica',
    ];

    // Create tipoinficaciongenerales in database
    desctipoindicaciongeneral.map(async (desc) => {
        await tipoindicaciongeneral.findOrCreate({
            where: {
                descripcion: desc
            }
        });
    });
}

export default loadTipoIndicacionGenerales;