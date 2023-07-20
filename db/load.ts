import loadEspecialidades from "./data/especialidad";
import loadRoles from "./data/rol";
import loadPaises from "./data/pais";
import loadTipoMatricula from "./data/tipomatricula";
import loadUniversidades from "./data/universidad";
import loadColegiosMedicos from "./data/colegiomedico";
import loadLocalidades from "./data/localidad";
import loadModalidades from "./data/modalidad";
import loadTipoAntecedente from "./data/tipoantecedente";
import loadTituloGrado from "./data/titulogrado";
// import loadProfesional from "./data/profesional";

const load = async() => {
    loadEspecialidades();
    loadRoles();
    loadPaises();
    loadTipoMatricula();
    loadUniversidades();
    loadColegiosMedicos();
    loadLocalidades();
    loadModalidades();
    loadTipoAntecedente();
    loadTituloGrado();
    // loadProfesional();
}

export default load;