import loadEspecialidades from "./data/especialidad";
import loadRoles from "./data/rol";
import loadPaises from "./data/pais";
import loadTipoMatricula from "./data/tipomatricula";
import loadUniversidades from "./data/universidad";

const load = async() => {
    loadEspecialidades();
    loadRoles();
    loadPaises();
    loadTipoMatricula();
    loadUniversidades();
}

export default load;