import loadEspecialidades from "./data/especialidad";
import loadRoles from "./data/rol";
import loadPaises from "./data/pais";
import loadTipoMatricula from "./data/tipomatricula";
import loadUniversidades from "./data/universidad";
import loadColegiosMedicos from "./data/colegiomedico";

const load = async() => {
    loadEspecialidades();
    loadRoles();
    loadPaises();
    loadTipoMatricula();
    loadUniversidades();
    loadColegiosMedicos();
}

export default load;