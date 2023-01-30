import Localidad from "../../models/localidad";

const loadLocalidades = async() => {
    // List of localidades
    const listlocalidades = [
        {
            codpostal: '4242',
            descripcion: '25 De Mayo'
        },
        {
            codpostal: '4242',
            descripcion: '9 De Julio'
        },
        {
            codpostal: '4178',
            descripcion: 'Abra Rica'
        },
        {
            codpostal: '4134',
            descripcion: 'Acheral'
        },
        {
            codpostal: '4107',
            descripcion: 'Aconquija'
        },
        {
            codpostal: '4113',
            descripcion: 'Acostilla'
        },
        {
            codpostal: '4115',
            descripcion: 'Agua Azul'
        },
        {
            codpostal: '4132',
            descripcion: 'Agua Blanca'
        },
        {
            codpostal: '4115',
            descripcion: 'Agua Dulce'
        },
        {
            codpostal: '4101',
            descripcion: 'Agua Negra'
        },
        {
            codpostal: '4124',
            descripcion: 'Agua Rosada'
        },
        {
            codpostal: '4141',
            descripcion: 'Agua Salada'
        },
        {
            codpostal: '4111',
            descripcion: 'Aguada'
        },
        {
            codpostal: '4101',
            descripcion: 'Aguadita'
        },
        {
            codpostal: '4000',
            descripcion: 'Aguas Corrientes'
        },
        {
            codpostal: '4152',
            descripcion: 'Aguilares'
        },
        {
            codpostal: '4115',
            descripcion: 'Ahi Veremos'
        },
        {
            codpostal: '4117',
            descripcion: 'Alabama'
        },
        {
            codpostal: '4178',
            descripcion: 'Alderetes'
        },
        {
            codpostal: '4137',
            descripcion: 'Alisos'
        },
        {
            codpostal: '4122',
            descripcion: 'Alizal'
        },
        {
            codpostal: '4161',
            descripcion: 'Alongo'
        },
        {
            codpostal: '4149',
            descripcion: 'Alpachiri'
        },
        {
            codpostal: '4101',
            descripcion: 'Alta Gracia-Burruyacu'
        },
        {
            codpostal: '4107',
            descripcion: 'Alto De Anfama'
        },
        {
            codpostal: '4174',
            descripcion: 'Alto De Las Lechuzas'
        },
        {
            codpostal: '4117',
            descripcion: 'Alto De Medina'
        },
        {
            codpostal: '4159',
            descripcion: 'Alto El Puesto'
        },
        {
            codpostal: '4000',
            descripcion: 'Alto La Polvora'
        },
        {
            codpostal: '4152',
            descripcion: 'Alto Las Flores'
        },
        {
            codpostal: '4109',
            descripcion: 'Alto Nuestra Senora Del Valle'
        },
        {
            codpostal: '4153',
            descripcion: 'Alto Verde'
        },
        {
            codpostal: '4122',
            descripcion: 'Alurralde'
        },
        {
            codpostal: '4137',
            descripcion: 'Amaicha'
        },
        {
            codpostal: '4168',
            descripcion: 'Amaicha Del Llano'
        },
        {
            codpostal: '4137',
            descripcion: 'Amaicha Del Valle'
        },
        {
            codpostal: '4144',
            descripcion: 'Amberes'
        },
        {
            codpostal: '4176',
            descripcion: 'Amimpa'
        },
        {
            codpostal: '4174',
            descripcion: 'Ampata'
        },
        {
            codpostal: '4174',
            descripcion: 'Ampatilla'
        },
        {
            codpostal: '4178',
            descripcion: 'Amumpa'
        },
        {
            codpostal: '4105',
            descripcion: 'Ancajuli'
        },
        {
            codpostal: '4141',
            descripcion: 'Anchillos'
        },
        {
            codpostal: '4105',
            descripcion: 'Anfana'
        },
        {
            codpostal: '4117',
            descripcion: 'Angostura'
        },
        {
            codpostal: '4176',
            descripcion: 'Animas'
        },
        {
            codpostal: '4141',
            descripcion: 'Anjuana'
        },
        {
            codpostal: '4187',
            descripcion: 'Anta Chica'
        },
        {
            codpostal: '4119',
            descripcion: 'Antillas'
        },
        {
            codpostal: '4142',
            descripcion: 'Aragones'
        },
        {
            codpostal: '4142',
            descripcion: 'Aran'
        },
        {
            codpostal: '4178',
            descripcion: 'Araoz'
        },
        {
            codpostal: '4178',
            descripcion: 'Arbol Solo'
        },
        {
            codpostal: '4176',
            descripcion: 'Arboles Grandes'
        },
        {
            codpostal: '4147',
            descripcion: 'Arcadia'
        },
        {
            codpostal: '4124',
            descripcion: 'Arenal'
        },
        {
            codpostal: '4134',
            descripcion: 'Arenilla'
        },
        {
            codpostal: '4174',
            descripcion: 'Arocas'
        },
        {
            codpostal: '4174',
            descripcion: 'Arroyo'
        },
        {
            codpostal: '4174',
            descripcion: 'Arroyo Atahona'
        },
        {
            codpostal: '4152',
            descripcion: 'Arroyo Barriento'
        },
        {
            codpostal: '4132',
            descripcion: 'Arroyo De La Cruz'
        },
        {
            codpostal: '4157',
            descripcion: 'Arroyo Mal Paso'
        },
        {
            codpostal: '4101',
            descripcion: 'Aserradero'
        },
        {
            codpostal: '4174',
            descripcion: 'Atahona'
        },
        {
            codpostal: '4113',
            descripcion: 'Avestilla'
        },
        {
            codpostal: '4164',
            descripcion: 'Bajastine'
        },
        {
            codpostal: '4000',
            descripcion: 'Bajo De La Polvora'
        },
        {
            codpostal: '4151',
            descripcion: 'Bajo De Los Sueldos'
        },
        {
            codpostal: '4111',
            descripcion: 'Bajo Grande'
        },
        {
            codpostal: '4166',
            descripcion: 'Balderrama'
        },
        {
            codpostal: '4111',
            descripcion: 'Banado Del Valle'
        },
        {
            codpostal: '4137',
            descripcion: 'Banda'
        },
        {
            codpostal: '4174',
            descripcion: 'Banda De Palominos'
        },
        {
            codpostal: '4109',
            descripcion: 'Banda Del Rio Sali'
        },
        {
            codpostal: '4124',
            descripcion: 'Barborin'
        },
        {
            codpostal: '4176',
            descripcion: 'Barrancas'
        },
        {
            codpostal: '4115',
            descripcion: 'Barrealito'
        },
        {
            codpostal: '4000',
            descripcion: 'Barrio Agua Y Energia'
        },
        {
            codpostal: '4000',
            descripcion: 'Barrio Belgrano'
        },
        {
            codpostal: '4107',
            descripcion: 'Barrio Casino'
        },
        {
            codpostal: '4101',
            descripcion: 'Barrio Diagonal'
        },
        {
            codpostal: '4000',
            descripcion: 'Barrio El Bosque'
        },
        {
            codpostal: '4000',
            descripcion: 'Barrio El Parque'
        },
        {
            codpostal: '4000',
            descripcion: 'Barrio Esteban Echeverria'
        },
        {
            codpostal: '4000',
            descripcion: 'Barrio Floresta'
        },
        {
            codpostal: '4000',
            descripcion: 'Barrio Hipolito Yrigoyen'
        },
        {
            codpostal: '4000',
            descripcion: 'Barrio Juan Bautista Alberdi'
        },
        {
            codpostal: '4000',
            descripcion: 'Barrio Los Pinos'
        },
        {
            codpostal: '4000',
            descripcion: 'Barrio Marconi'
        },
        {
            codpostal: '4105',
            descripcion: 'Barrio Miguel Lillo'
        },
        {
            codpostal: '4000',
            descripcion: 'Barrio Nicolas Avellaneda'
        },
        {
            codpostal: '4000',
            descripcion: 'Barrio Obispo Piedra Buena'
        },
        {
            codpostal: '4000',
            descripcion: 'Barrio Oeste'
        },
        {
            codpostal: '4105',
            descripcion: 'Barrio Parodi'
        },
        {
            codpostal: '4101',
            descripcion: 'Barrio Rivadavia'
        },
        {
            codpostal: '4000',
            descripcion: 'Barrio San Bernardo'
        },
        {
            codpostal: '4000',
            descripcion: 'Barrio Villa Alem'
        },
        {
            codpostal: '4149',
            descripcion: 'Belicha Huaico'
        },
        {
            codpostal: '4168',
            descripcion: 'Bella Vista'
        },
        {
            codpostal: '4242',
            descripcion: 'Beltran'
        },
        {
            codpostal: '4119',
            descripcion: 'Benjamin Araoz'
        },
        {
            codpostal: '4122',
            descripcion: 'Benjamin Paz'
        },
        {
            codpostal: '4111',
            descripcion: 'Bilca Pozo'
        },
        {
            codpostal: '4178',
            descripcion: 'Blanco Pozo'
        },
        {
            codpostal: '4178',
            descripcion: 'Boca Del Tigre'
        },
        {
            codpostal: '4124',
            descripcion: 'Brete'
        },
        {
            codpostal: '4132',
            descripcion: 'Buen Retiro'
        },
        {
            codpostal: '4115',
            descripcion: 'Buena Vista'
        },
        {
            codpostal: '4119',
            descripcion: 'Burruyacu'
        },
        {
            codpostal: '4113',
            descripcion: 'Cachi Huasi'
        },
        {
            codpostal: '4113',
            descripcion: 'Cachi Yaco'
        },
        {
            codpostal: '4162',
            descripcion: 'Cajas Viejas'
        },
        {
            codpostal: '4141',
            descripcion: 'Calvimonte'
        },
        {
            codpostal: '4115',
            descripcion: 'Camas Amontonadas'
        },
        {
            codpostal: '4107',
            descripcion: 'Camino Del Peru'
        },
        {
            codpostal: '4111',
            descripcion: 'Campana'
        },
        {
            codpostal: '4115',
            descripcion: 'Campo Azul'
        },
        {
            codpostal: '4159',
            descripcion: 'Campo Bello'
        },
        {
            codpostal: '4178',
            descripcion: 'Campo El Luisito'
        },
        {
            codpostal: '4159',
            descripcion: 'Campo Grande'
        },
        {
            codpostal: '4161',
            descripcion: 'Campo La Cruz'
        },
        {
            codpostal: '4178',
            descripcion: 'Campo La Flor'
        },
        {
            codpostal: '4168',
            descripcion: 'Campo Redondo'
        },
        {
            codpostal: '4172',
            descripcion: 'Campo Volante'
        },
        {
            codpostal: '4129',
            descripcion: 'Canada'
        },
        {
            codpostal: '4119',
            descripcion: 'Canada Alegre'
        },
        {
            codpostal: '4117',
            descripcion: 'Canada De Alzogaray'
        },
        {
            codpostal: '4119',
            descripcion: 'Canada De Los Negros'
        },
        {
            codpostal: '4101',
            descripcion: 'Canada De Los Nogales'
        },
        {
            codpostal: '4178',
            descripcion: 'Canada De Vicios'
        },
        {
            codpostal: '4129',
            descripcion: 'Canada De Yerba Buena'
        },
        {
            codpostal: '4101',
            descripcion: 'Canada Honda'
        },
        {
            codpostal: '4101',
            descripcion: 'Canada Larga'
        },
        {
            codpostal: '4176',
            descripcion: 'Canadas'
        },
        {
            codpostal: '4111',
            descripcion: 'Candelillal'
        },
        {
            codpostal: '4178',
            descripcion: 'Canete'
        },
        {
            codpostal: '4142',
            descripcion: 'Capitan Caceres'
        },
        {
            codpostal: '4137',
            descripcion: 'Carapunco'
        },
        {
            codpostal: '4111',
            descripcion: 'Carbon Pozo'
        },
        {
            codpostal: '4117',
            descripcion: 'Carolinas Bajas'
        },
        {
            codpostal: '4146',
            descripcion: 'Carreta Quemada'
        },
        {
            codpostal: '4132',
            descripcion: 'Carrichango'
        },
        {
            codpostal: '4122',
            descripcion: 'Casa De Alto'
        },
        {
            codpostal: '4158',
            descripcion: 'Casa De Piedras'
        },
        {
            codpostal: '4178',
            descripcion: 'Casa Rosada'
        },
        {
            codpostal: '4162',
            descripcion: 'Casa Vieja'
        },
        {
            codpostal: '4137',
            descripcion: 'Casas Viejas'
        },
        {
            codpostal: '4135',
            descripcion: 'Caspichango'
        },
        {
            codpostal: '4172',
            descripcion: 'Castillas'
        },
        {
            codpostal: '4187',
            descripcion: 'Ceja Pozo'
        },
        {
            codpostal: '4174',
            descripcion: 'Cejas De Aroca'
        },
        {
            codpostal: '4179',
            descripcion: 'Cejas De Benachillos'
        },
        {
            codpostal: '4155',
            descripcion: 'Cevil Grande'
        },
        {
            codpostal: '4178',
            descripcion: 'Cevil Pozo'
        },
        {
            codpostal: '4105',
            descripcion: 'Cevil Redondo'
        },
        {
            codpostal: '4157',
            descripcion: 'Cevil Solo'
        },
        {
            codpostal: '4111',
            descripcion: 'Cevilarcito'
        },
        {
            codpostal: '4117',
            descripcion: 'Chabela'
        },
        {
            codpostal: '4000',
            descripcion: 'Chacras Al Oeste'
        },
        {
            codpostal: '4142',
            descripcion: 'Chalchacito'
        },
        {
            codpostal: '4111',
            descripcion: 'Chanar Pago'
        },
        {
            codpostal: '4117',
            descripcion: 'Chanar Taqueno'
        },
        {
            codpostal: '4117',
            descripcion: 'Chanar Via'
        },
        {
            codpostal: '4117',
            descripcion: 'Chanar Viejo'
        },
        {
            codpostal: '4242',
            descripcion: 'Chanaritos'
        },
        {
            codpostal: '4105',
            descripcion: 'Chasquivil'
        },
        {
            codpostal: '4155',
            descripcion: 'Chavarria'
        },
        {
            codpostal: '4174',
            descripcion: 'Chicligasta'
        },
        {
            codpostal: '4242',
            descripcion: 'Chilca'
        },
        {
            codpostal: '4111',
            descripcion: 'Chilcal'
        },
        {
            codpostal: '4172',
            descripcion: 'Chilcar'
        },
        {
            codpostal: '4119',
            descripcion: 'Chilcas'
        },
        {
            codpostal: '4122',
            descripcion: 'Choromoro'
        },
        {
            codpostal: '4101',
            descripcion: 'Chorrillos'
        },
        {
            codpostal: '4124',
            descripcion: 'Chulca'
        },
        {
            codpostal: '4119',
            descripcion: 'Churqui'
        },
        {
            codpostal: '4122',
            descripcion: 'Chuscha'
        },
        {
            codpostal: '4174',
            descripcion: 'Ciudacita'
        },
        {
            codpostal: '4149',
            descripcion: 'Cochuna'
        },
        {
            codpostal: '4242',
            descripcion: 'Coco'
        },
        {
            codpostal: '4178',
            descripcion: 'Cohigac'
        },
        {
            codpostal: '4141',
            descripcion: 'Colalao Del Valle'
        },
        {
            codpostal: '4182',
            descripcion: 'Colmena Lolita'
        },
        {
            codpostal: '4111',
            descripcion: 'Colombres'
        },
        {
            codpostal: '4111',
            descripcion: 'Colonia Agricola'
        },
        {
            codpostal: '4111',
            descripcion: 'Colonia Argentina'
        },
        {
            codpostal: '4168',
            descripcion: 'Colonia El Sunchal'
        },
        {
            codpostal: '4147',
            descripcion: 'Colonia Fara'
        },
        {
            codpostal: '4151',
            descripcion: 'Colonia Humaita Primera'
        },
        {
            codpostal: '4147',
            descripcion: 'Colonia Juan Jose Iramain'
        },
        {
            codpostal: '4182',
            descripcion: 'Colonia Lolita'
        },
        {
            codpostal: '4101',
            descripcion: 'Colonia Los Hills'
        },
        {
            codpostal: '4129',
            descripcion: 'Colonia Maria Elena'
        },
        {
            codpostal: '4152',
            descripcion: 'Colonia Marull'
        },
        {
            codpostal: '4152',
            descripcion: 'Colonia Naschi'
        },
        {
            codpostal: '4119',
            descripcion: 'Colonia No2'
        },
        {
            codpostal: '4147',
            descripcion: 'Colonia Pedro Leon Cornet'
        },
        {
            codpostal: '4117',
            descripcion: 'Colonia Roca'
        },
        {
            codpostal: '4101',
            descripcion: 'Colonia San Ramon'
        },
        {
            codpostal: '4142',
            descripcion: 'Colonia Santa Catalina'
        },
        {
            codpostal: '4132',
            descripcion: 'Colonia Santa Clara'
        },
        {
            codpostal: '4101',
            descripcion: 'Colonia Sarmiento'
        },
        {
            codpostal: '4103',
            descripcion: 'Comuna La Esperanza'
        },
        {
            codpostal: '4146',
            descripcion: 'Concepcion'
        },
        {
            codpostal: '4115',
            descripcion: 'Condor Huasi'
        },
        {
            codpostal: '4174',
            descripcion: 'Consimo'
        },
        {
            codpostal: '4124',
            descripcion: 'Corral Viejo'
        },
        {
            codpostal: '4111',
            descripcion: 'Cortaderal'
        },
        {
            codpostal: '4111',
            descripcion: 'Cortaderas'
        },
        {
            codpostal: '4119',
            descripcion: 'Cossio'
        },
        {
            codpostal: '4111',
            descripcion: 'Costa Arroyo Esquina'
        },
        {
            codpostal: '4149',
            descripcion: 'Costa Del Rio Seco'
        },
        {
            codpostal: '4142',
            descripcion: 'Costilla'
        },
        {
            codpostal: '4122',
            descripcion: 'Criollas'
        },
        {
            codpostal: '4119',
            descripcion: 'Cruz De Abajo'
        },
        {
            codpostal: '4178',
            descripcion: 'Cruz Del Norte'
        },
        {
            codpostal: '4107',
            descripcion: 'Cuatro Gatos'
        },
        {
            codpostal: '4105',
            descripcion: 'Cuatro Sauces'
        },
        {
            codpostal: '4101',
            descripcion: 'Cuchillas'
        },
        {
            codpostal: '4153',
            descripcion: 'Cuesta De La Chilca'
        },
        {
            codpostal: '4105',
            descripcion: 'Curva De Los Vega'
        },
        {
            codpostal: '4117',
            descripcion: 'Delfin Gallo'
        },
        {
            codpostal: '4122',
            descripcion: 'Desmonte'
        },
        {
            codpostal: '4161',
            descripcion: 'Dolavon'
        },
        {
            codpostal: '4161',
            descripcion: 'Domingo Millan'
        },
        {
            codpostal: '4161',
            descripcion: 'Donato Alvarez'
        },
        {
            codpostal: '4242',
            descripcion: 'Durazno'
        },
        {
            codpostal: '4135',
            descripcion: 'Duraznos Blancos'
        },
        {
            codpostal: '4141',
            descripcion: 'El Arbolar'
        },
        {
            codpostal: '4187',
            descripcion: 'El Arbolito'
        },
        {
            codpostal: '4117',
            descripcion: 'El Aserradero'
        },
        {
            codpostal: '4187',
            descripcion: 'El Bachi'
        },
        {
            codpostal: '4178',
            descripcion: 'El Bagual'
        },
        {
            codpostal: '4164',
            descripcion: 'El Bajo'
        },
        {
            codpostal: '4141',
            descripcion: 'El Banado'
        },
        {
            codpostal: '4119',
            descripcion: 'El Barco'
        },
        {
            codpostal: '4119',
            descripcion: 'El Barrialito'
        },
        {
            codpostal: '4124',
            descripcion: 'El Boyero'
        },
        {
            codpostal: '4111',
            descripcion: 'El Bracho'
        },
        {
            codpostal: '4126',
            descripcion: 'El Brete'
        },
        {
            codpostal: '4122',
            descripcion: 'El Cadillal'
        },
        {
            codpostal: '4119',
            descripcion: 'El Cajon'
        },
        {
            codpostal: '4113',
            descripcion: 'El Carmen'
        },
        {
            codpostal: '4141',
            descripcion: 'El Carrizal'
        },
        {
            codpostal: '4105',
            descripcion: 'El Catorce'
        },
        {
            codpostal: '4122',
            descripcion: 'El Cedro'
        },
        {
            codpostal: '4105',
            descripcion: 'El Ceibal'
        },
        {
            codpostal: '4142',
            descripcion: 'El Cercado'
        },
        {
            codpostal: '4111',
            descripcion: 'El Cevilar'
        },
        {
            codpostal: '4117',
            descripcion: 'El Chanar'
        },
        {
            codpostal: '4115',
            descripcion: 'El Chilcal'
        },
        {
            codpostal: '4124',
            descripcion: 'El Chorro'
        },
        {
            codpostal: '4142',
            descripcion: 'El Churquis'
        },
        {
            codpostal: '4119',
            descripcion: 'El Cinquial'
        },
        {
            codpostal: '4117',
            descripcion: 'El Cochuchal'
        },
        {
            codpostal: '4101',
            descripcion: 'El Colmenal'
        },
        {
            codpostal: '4158',
            descripcion: 'El Corralito'
        },
        {
            codpostal: '4111',
            descripcion: 'El Cortaderal'
        },
        {
            codpostal: '4132',
            descripcion: 'El Cruce'
        },
        {
            codpostal: '4103',
            descripcion: 'El Cuarteadero'
        },
        {
            codpostal: '4103',
            descripcion: 'El Duraznito'
        },
        {
            codpostal: '4113',
            descripcion: 'El Durazno'
        },
        {
            codpostal: '4117',
            descripcion: 'El Espinillo'
        },
        {
            codpostal: '4113',
            descripcion: 'El Guardamonte'
        },
        {
            codpostal: '4178',
            descripcion: 'El Guayacan'
        },
        {
            codpostal: '4142',
            descripcion: 'El Huaico'
        },
        {
            codpostal: '4172',
            descripcion: 'El Jardin'
        },
        {
            codpostal: '4178',
            descripcion: 'El Melon'
        },
        {
            codpostal: '4151',
            descripcion: 'El Milagro'
        },
        {
            codpostal: '4124',
            descripcion: 'El Mistol'
        },
        {
            codpostal: '4174',
            descripcion: 'El Mistolar'
        },
        {
            codpostal: '4117',
            descripcion: 'El Mojon'
        },
        {
            codpostal: '4149',
            descripcion: 'El Molino'
        },
        {
            codpostal: '4115',
            descripcion: 'El Mollar'
        },
        {
            codpostal: '4168',
            descripcion: 'El Moyar'
        },
        {
            codpostal: '4101',
            descripcion: 'El Mutul'
        },
        {
            codpostal: '4115',
            descripcion: 'El Naranjito'
        },
        {
            codpostal: '4113',
            descripcion: 'El Naranjo'
        },
        {
            codpostal: '4151',
            descripcion: 'El Nogal'
        },
        {
            codpostal: '4135',
            descripcion: 'El Nogalar'
        },
        {
            codpostal: '4105',
            descripcion: 'El Nogalito'
        },
        {
            codpostal: '4119',
            descripcion: 'El Obraje'
        },
        {
            codpostal: '4117',
            descripcion: 'El Ojo'
        },
        {
            codpostal: '4151',
            descripcion: 'El Pacara'
        },
        {
            codpostal: '4186',
            descripcion: 'El Palomar'
        },
        {
            codpostal: '4117',
            descripcion: 'El Paraiso'
        },
        {
            codpostal: '4141',
            descripcion: 'El Paso'
        },
        {
            codpostal: '4115',
            descripcion: 'El Pavon'
        },
        {
            codpostal: '4161',
            descripcion: 'El Polear'
        },
        {
            codpostal: '4117',
            descripcion: 'El Portezuelo'
        },
        {
            codpostal: '4151',
            descripcion: 'El Porvenir'
        },
        {
            codpostal: '4149',
            descripcion: 'El Potrerillo'
        },
        {
            codpostal: '4146',
            descripcion: 'El Potrero'
        },
        {
            codpostal: '4178',
            descripcion: 'El Puerto'
        },
        {
            codpostal: '4119',
            descripcion: 'El Puestito'
        },
        {
            codpostal: '4149',
            descripcion: 'El Puesto'
        },
        {
            codpostal: '4187',
            descripcion: 'El Puesto Del Medio'
        },
        {
            codpostal: '4124',
            descripcion: 'El Quebrachal'
        },
        {
            codpostal: '4142',
            descripcion: 'El Quebrachito'
        },
        {
            codpostal: '4178',
            descripcion: 'El Quimil'
        },
        {
            codpostal: '4157',
            descripcion: 'El Rincon'
        },
        {
            codpostal: '4119',
            descripcion: 'El Rodeo'
        },
        {
            codpostal: '4113',
            descripcion: 'El Rosario'
        },
        {
            codpostal: '4151',
            descripcion: 'El Sauzal'
        },
        {
            codpostal: '4142',
            descripcion: 'El Sesteadero'
        },
        {
            codpostal: '4105',
            descripcion: 'El Siambon'
        },
        {
            codpostal: '4117',
            descripcion: 'El Sunchal'
        },
        {
            codpostal: '4115',
            descripcion: 'El Suncho'
        },
        {
            codpostal: '4119',
            descripcion: 'El Tajamar'
        },
        {
            codpostal: '4101',
            descripcion: 'El Timbo'
        },
        {
            codpostal: '4103',
            descripcion: 'El Tiro Argentino'
        },
        {
            codpostal: '4174',
            descripcion: 'El Tobar'
        },
        {
            codpostal: '4242',
            descripcion: 'El Tostado'
        },
        {
            codpostal: '4157',
            descripcion: 'El Tuscal'
        },
        {
            codpostal: '4103',
            descripcion: 'El Zanjon'
        },
        {
            codpostal: '4119',
            descripcion: 'El Zapallar'
        },
        {
            codpostal: '4101',
            descripcion: 'Embalse El Cadillal'
        },
        {
            codpostal: '4178',
            descripcion: 'Empalme Agua Dulce'
        },
        {
            codpostal: '4242',
            descripcion: 'Encrucijada'
        },
        {
            codpostal: '4174',
            descripcion: 'Ensenada'
        },
        {
            codpostal: '4113',
            descripcion: 'Entre Rios'
        },
        {
            codpostal: '4158',
            descripcion: 'Escaba'
        },
        {
            codpostal: '4159',
            descripcion: 'Escobas'
        },
        {
            codpostal: '4187',
            descripcion: 'Esperanza'
        },
        {
            codpostal: '4137',
            descripcion: 'Espinal'
        },
        {
            codpostal: '4111',
            descripcion: 'Esquina'
        },
        {
            codpostal: '4111',
            descripcion: 'Esquina Del Llano'
        },
        {
            codpostal: '4137',
            descripcion: 'Esquina Del Valle'
        },
        {
            codpostal: '4101',
            descripcion: 'Estacion Experimental Agricola'
        },
        {
            codpostal: '4101',
            descripcion: 'Estacion Superior Agricola'
        },
        {
            codpostal: '4157',
            descripcion: 'Falda De Arcadia'
        },
        {
            codpostal: '4132',
            descripcion: 'Famailla'
        },
        {
            codpostal: '4115',
            descripcion: 'Favorina'
        },
        {
            codpostal: '4178',
            descripcion: 'Favorita'
        },
        {
            codpostal: '4111',
            descripcion: 'Finca Elisa'
        },
        {
            codpostal: '4151',
            descripcion: 'Finca Entre Rios'
        },
        {
            codpostal: '4117',
            descripcion: 'Finca Lopez'
        },
        {
            codpostal: '4182',
            descripcion: 'Finca Mayo'
        },
        {
            codpostal: '4132',
            descripcion: 'Finca Pereyra'
        },
        {
            codpostal: '4168',
            descripcion: 'Finca Tulio'
        },
        {
            codpostal: '4111',
            descripcion: 'Fronteritas'
        },
        {
            codpostal: '4149',
            descripcion: 'Gastone'
        },
        {
            codpostal: '4147',
            descripcion: 'Gastonilla'
        },
        {
            codpostal: '4187',
            descripcion: 'Gobernador Garmendia'
        },
        {
            codpostal: '4111',
            descripcion: 'Gobernador Nougues'
        },
        {
            codpostal: '4187',
            descripcion: 'Gobernador Piedrabuena'
        },
        {
            codpostal: '4113',
            descripcion: 'Gomez Chico'
        },
        {
            codpostal: '4122',
            descripcion: 'Gonzalo'
        },
        {
            codpostal: '4159',
            descripcion: 'Graneros'
        },
        {
            codpostal: '4101',
            descripcion: 'Granja Modelo'
        },
        {
            codpostal: '4124',
            descripcion: 'Gualincha'
        },
        {
            codpostal: '4178',
            descripcion: 'Guanaco Muerto'
        },
        {
            codpostal: '4171',
            descripcion: 'Guemes'
        },
        {
            codpostal: '4117',
            descripcion: 'Guzman'
        },
        {
            codpostal: '4122',
            descripcion: 'Higuera'
        },
        {
            codpostal: '4107',
            descripcion: 'Higueritas'
        },
        {
            codpostal: '4105',
            descripcion: 'Hoyada'
        },
        {
            codpostal: '4142',
            descripcion: 'Huasa Pampa'
        },
        {
            codpostal: '4163',
            descripcion: 'Huasa Pampa Norte'
        },
        {
            codpostal: '4152',
            descripcion: 'Huasa Rincon'
        },
        {
            codpostal: '4122',
            descripcion: 'Huasamayo'
        },
        {
            codpostal: '4151',
            descripcion: 'Humaita No1'
        },
        {
            codpostal: '4151',
            descripcion: 'Humaita No2'
        },
        {
            codpostal: '4174',
            descripcion: 'Ichipuca'
        },
        {
            codpostal: '4107',
            descripcion: 'Iglesias'
        },
        {
            codpostal: '4142',
            descripcion: 'Iguana'
        },
        {
            codpostal: '4146',
            descripcion: 'Iltico'
        },
        {
            codpostal: '4137',
            descripcion: 'Infiernillo'
        },
        {
            codpostal: '4174',
            descripcion: 'Ingas'
        },
        {
            codpostal: '4105',
            descripcion: 'Ingenio Amalia'
        },
        {
            codpostal: '4158',
            descripcion: 'Ingenio Bella Vista'
        },
        {
            codpostal: '4109',
            descripcion: 'Ingenio Concepcion'
        },
        {
            codpostal: '4184',
            descripcion: 'Ingenio Cruz Alta'
        },
        {
            codpostal: '4146',
            descripcion: 'Ingenio La Corona'
        },
        {
            codpostal: '4117',
            descripcion: 'Ingenio La Florida'
        },
        {
            codpostal: '4145',
            descripcion: 'Ingenio La Providencia'
        },
        {
            codpostal: '4151',
            descripcion: 'Ingenio La Trinidad'
        },
        {
            codpostal: '4111',
            descripcion: 'Ingenio Leales'
        },
        {
            codpostal: '4000',
            descripcion: 'Ingenio Manantial'
        },
        {
            codpostal: '4158',
            descripcion: 'Ingenio Marapa'
        },
        {
            codpostal: '4132',
            descripcion: 'Ingenio Nueva Baviera'
        },
        {
            codpostal: '4142',
            descripcion: 'Ingenio Nunorco'
        },
        {
            codpostal: '4109',
            descripcion: 'Ingenio San Juan'
        },
        {
            codpostal: '4129',
            descripcion: 'Ingenio San Pablo'
        },
        {
            codpostal: '4155',
            descripcion: 'Ingenio Santa Ana'
        },
        {
            codpostal: '4157',
            descripcion: 'Ingenio Santa Barbara'
        },
        {
            codpostal: '4135',
            descripcion: 'Ingenio Santa Lucia'
        },
        {
            codpostal: '4143',
            descripcion: 'Ingenio Santa Rosa'
        },
        {
            codpostal: '4132',
            descripcion: 'Invernada'
        },
        {
            codpostal: '4142',
            descripcion: 'Isla San Jose'
        },
        {
            codpostal: '4119',
            descripcion: 'Jaguel'
        },
        {
            codpostal: '4149',
            descripcion: 'Jaya'
        },
        {
            codpostal: '4158',
            descripcion: 'Juan Bautista Alberdi'
        },
        {
            codpostal: '4111',
            descripcion: 'Juan Posse'
        },
        {
            codpostal: '4141',
            descripcion: 'Julipao'
        },
        {
            codpostal: '4122',
            descripcion: 'Junta'
        },
        {
            codpostal: '4115',
            descripcion: 'Jusco Pozo'
        },
        {
            codpostal: '4161',
            descripcion: 'Kilometro 10'
        },
        {
            codpostal: '4132',
            descripcion: 'Kilometro 102'
        },
        {
            codpostal: '4174',
            descripcion: 'Kilometro 1185'
        },
        {
            codpostal: '4174',
            descripcion: 'Kilometro 1194'
        },
        {
            codpostal: '4176',
            descripcion: 'Kilometro 12'
        },
        {
            codpostal: '4174',
            descripcion: 'Kilometro 1207'
        },
        {
            codpostal: '4172',
            descripcion: 'Kilometro 1213'
        },
        {
            codpostal: '4166',
            descripcion: 'Kilometro 1220'
        },
        {
            codpostal: '4166',
            descripcion: 'Kilometro 1235'
        },
        {
            codpostal: '4168',
            descripcion: 'Kilometro 1240'
        },
        {
            codpostal: '4168',
            descripcion: 'Kilometro 1244'
        },
        {
            codpostal: '4166',
            descripcion: 'Kilometro 1248'
        },
        {
            codpostal: '4166',
            descripcion: 'Kilometro 1256'
        },
        {
            codpostal: '4162',
            descripcion: 'Kilometro 19'
        },
        {
            codpostal: '4159',
            descripcion: 'Kilometro 29'
        },
        {
            codpostal: '4158',
            descripcion: 'Kilometro 36'
        },
        {
            codpostal: '4119',
            descripcion: 'Kilometro 37'
        },
        {
            codpostal: '4158',
            descripcion: 'Kilometro 46'
        },
        {
            codpostal: '4166',
            descripcion: 'Kilometro 5'
        },
        {
            codpostal: '4155',
            descripcion: 'Kilometro 55'
        },
        {
            codpostal: '4146',
            descripcion: 'Kilometro 66'
        },
        {
            codpostal: '4105',
            descripcion: 'Kilometro 792'
        },
        {
            codpostal: '4111',
            descripcion: 'Kilometro 794'
        },
        {
            codpostal: '4105',
            descripcion: 'Kilometro 808'
        },
        {
            codpostal: '4000',
            descripcion: 'Kilometro 810'
        },
        {
            codpostal: '4134',
            descripcion: 'Kilometro 99'
        },
        {
            codpostal: '4101',
            descripcion: 'La Aguadita'
        },
        {
            codpostal: '4137',
            descripcion: 'La Angostura'
        },
        {
            codpostal: '4119',
            descripcion: 'La Argentina'
        },
        {
            codpostal: '4119',
            descripcion: 'La Banda'
        },
        {
            codpostal: '4128',
            descripcion: 'La Bolsa'
        },
        {
            codpostal: '4176',
            descripcion: 'La Brama'
        },
        {
            codpostal: '4158',
            descripcion: 'La Calera'
        },
        {
            codpostal: '4107',
            descripcion: 'La Canada'
        },
        {
            codpostal: '4128',
            descripcion: 'La Capilla'
        },
        {
            codpostal: '4242',
            descripcion: 'La Chilca'
        },
        {
            codpostal: '4101',
            descripcion: 'La Cienaga'
        },
        {
            codpostal: '4162',
            descripcion: 'La Cocha'
        },
        {
            codpostal: '4119',
            descripcion: 'La Cruz'
        },
        {
            codpostal: '4126',
            descripcion: 'La Cuesta'
        },
        {
            codpostal: '4124',
            descripcion: 'La Dorita'
        },
        {
            codpostal: '4111',
            descripcion: 'La Empatada'
        },
        {
            codpostal: '4111',
            descripcion: 'La Encantada'
        },
        {
            codpostal: '4151',
            descripcion: 'La Esperanza'
        },
        {
            codpostal: '4103',
            descripcion: 'La Falda'
        },
        {
            codpostal: '4178',
            descripcion: 'La Favorita'
        },
        {
            codpostal: '4178',
            descripcion: 'La Flor'
        },
        {
            codpostal: '4115',
            descripcion: 'La Florida'
        },
        {
            codpostal: '4111',
            descripcion: 'La Fronterita'
        },
        {
            codpostal: '4174',
            descripcion: 'La Grama'
        },
        {
            codpostal: '4122',
            descripcion: 'La Higuera'
        },
        {
            codpostal: '4142',
            descripcion: 'La Iguana'
        },
        {
            codpostal: '4163',
            descripcion: 'La Lagunilla'
        },
        {
            codpostal: '4137',
            descripcion: 'La Lagunita'
        },
        {
            codpostal: '4186',
            descripcion: 'La Libertad'
        },
        {
            codpostal: '4176',
            descripcion: 'La Madrid'
        },
        {
            codpostal: '4124',
            descripcion: 'La Maravilla'
        },
        {
            codpostal: '4103',
            descripcion: 'La Picada'
        },
        {
            codpostal: '4164',
            descripcion: 'La Posta'
        },
        {
            codpostal: '4101',
            descripcion: 'La Puerta'
        },
        {
            codpostal: '4158',
            descripcion: 'La Puerta De Marapa'
        },
        {
            codpostal: '4129',
            descripcion: 'La Quebrada'
        },
        {
            codpostal: '4119',
            descripcion: 'La Ramada'
        },
        {
            codpostal: '4119',
            descripcion: 'La Ramada De Abajo'
        },
        {
            codpostal: '4135',
            descripcion: 'La Ramadita'
        },
        {
            codpostal: '4129',
            descripcion: 'La Reduccion'
        },
        {
            codpostal: '4107',
            descripcion: 'La Rinconada'
        },
        {
            codpostal: '4119',
            descripcion: 'La Sala'
        },
        {
            codpostal: '4178',
            descripcion: 'La Tala'
        },
        {
            codpostal: '4157',
            descripcion: 'La Tapia'
        },
        {
            codpostal: '4257',
            descripcion: 'La Tipa'
        },
        {
            codpostal: '4103',
            descripcion: 'La Toma'
        },
        {
            codpostal: '4151',
            descripcion: 'La Trinidad'
        },
        {
            codpostal: '4149',
            descripcion: 'La Tuna'
        },
        {
            codpostal: '4142',
            descripcion: 'La Zanja'
        },
        {
            codpostal: '4103',
            descripcion: 'Lacavera'
        },
        {
            codpostal: '4242',
            descripcion: 'Lachico'
        },
        {
            codpostal: '4174',
            descripcion: 'Lagarte'
        },
        {
            codpostal: '4115',
            descripcion: 'Laguna Blanca'
        },
        {
            codpostal: '4119',
            descripcion: 'Laguna De Robles'
        },
        {
            codpostal: '4186',
            descripcion: 'Lapachitos'
        },
        {
            codpostal: '4137',
            descripcion: 'Lara'
        },
        {
            codpostal: '4187',
            descripcion: 'Las Abras'
        },
        {
            codpostal: '4113',
            descripcion: 'Las Acostillas'
        },
        {
            codpostal: '4149',
            descripcion: 'Las Animas'
        },
        {
            codpostal: '4124',
            descripcion: 'Las Arcas'
        },
        {
            codpostal: '4132',
            descripcion: 'Las Banderitas'
        },
        {
            codpostal: '4137',
            descripcion: 'Las Bolsas'
        },
        {
            codpostal: '4142',
            descripcion: 'Las Brisas'
        },
        {
            codpostal: '4113',
            descripcion: 'Las Canadas'
        },
        {
            codpostal: '4141',
            descripcion: 'Las Canas'
        },
        {
            codpostal: '4103',
            descripcion: 'Las Canitas'
        },
        {
            codpostal: '4137',
            descripcion: 'Las Carreras'
        },
        {
            codpostal: '4162',
            descripcion: 'Las Cejas'
        },
        {
            codpostal: '4115',
            descripcion: 'Las Celayas'
        },
        {
            codpostal: '4135',
            descripcion: 'Las Cienagas'
        },
        {
            codpostal: '4195',
            descripcion: 'Las Colas'
        },
        {
            codpostal: '4115',
            descripcion: 'Las Colonias'
        },
        {
            codpostal: '4153',
            descripcion: 'Las Cortaderas'
        },
        {
            codpostal: '4122',
            descripcion: 'Las Criollas'
        },
        {
            codpostal: '4115',
            descripcion: 'Las Encrucijadas'
        },
        {
            codpostal: '4147',
            descripcion: 'Las Faldas'
        },
        {
            codpostal: '4144',
            descripcion: 'Las Hugueritas'
        },
        {
            codpostal: '4149',
            descripcion: 'Las Leguas'
        },
        {
            codpostal: '4176',
            descripcion: 'Las Lomas'
        },
        {
            codpostal: '4176',
            descripcion: 'Las Lomitas'
        },
        {
            codpostal: '4107',
            descripcion: 'Las Mellizas'
        },
        {
            codpostal: '4111',
            descripcion: 'Las Mercedes'
        },
        {
            codpostal: '4132',
            descripcion: 'Las Mesadas'
        },
        {
            codpostal: '4128',
            descripcion: 'Las Moreras'
        },
        {
            codpostal: '4103',
            descripcion: 'Las Moritas'
        },
        {
            codpostal: '4115',
            descripcion: 'Las Palmitas'
        },
        {
            codpostal: '4178',
            descripcion: 'Las Palomitas'
        },
        {
            codpostal: '4119',
            descripcion: 'Las Pechosas'
        },
        {
            codpostal: '4178',
            descripcion: 'Las Piedritas'
        },
        {
            codpostal: '4101',
            descripcion: 'Las Salinas'
        },
        {
            codpostal: '4129',
            descripcion: 'Las Tablas'
        },
        {
            codpostal: '4124',
            descripcion: 'Las Tacanas'
        },
        {
            codpostal: '4101',
            descripcion: 'Las Talitas'
        },
        {
            codpostal: '4105',
            descripcion: 'Las Tipas'
        },
        {
            codpostal: '4124',
            descripcion: 'Las Tipas De Colalao'
        },
        {
            codpostal: '4149',
            descripcion: 'Las Tunas'
        },
        {
            codpostal: '4119',
            descripcion: 'Las Zanjas'
        },
        {
            codpostal: '4115',
            descripcion: 'Las Zorras'
        },
        {
            codpostal: '4111',
            descripcion: 'Lastenia'
        },
        {
            codpostal: '4124',
            descripcion: 'Laurel Yaco'
        },
        {
            codpostal: '4132',
            descripcion: 'Laureles'
        },
        {
            codpostal: '4174',
            descripcion: 'Lazarte'
        },
        {
            codpostal: '4113',
            descripcion: 'Leales'
        },
        {
            codpostal: '4101',
            descripcion: 'Leo Huasi'
        },
        {
            codpostal: '4124',
            descripcion: 'Leocadio Paz'
        },
        {
            codpostal: '4143',
            descripcion: 'Leon Rouges'
        },
        {
            codpostal: '4182',
            descripcion: 'Lolita'
        },
        {
            codpostal: '4141',
            descripcion: 'Loma Colorada'
        },
        {
            codpostal: '4122',
            descripcion: 'Loma Del Medio'
        },
        {
            codpostal: '4119',
            descripcion: 'Loma Grande'
        },
        {
            codpostal: '4111',
            descripcion: 'Loma Verde'
        },
        {
            codpostal: '5157',
            descripcion: 'Los Agudos'
        },
        {
            codpostal: '4174',
            descripcion: 'Los Agueros'
        },
        {
            codpostal: '4105',
            descripcion: 'Los Aguirre'
        },
        {
            codpostal: '4105',
            descripcion: 'Los Alcaraces'
        },
        {
            codpostal: '4158',
            descripcion: 'Los Alisos'
        },
        {
            codpostal: '4178',
            descripcion: 'Los Angeles'
        },
        {
            codpostal: '4151',
            descripcion: 'Los Arrietas'
        },
        {
            codpostal: '4158',
            descripcion: 'Los Arroyo'
        },
        {
            codpostal: '4151',
            descripcion: 'Los Bajos'
        },
        {
            codpostal: '4113',
            descripcion: 'Los Britos'
        },
        {
            codpostal: '4152',
            descripcion: 'Los Callejones'
        },
        {
            codpostal: '4111',
            descripcion: 'Los Camperos'
        },
        {
            codpostal: '4176',
            descripcion: 'Los Cercos'
        },
        {
            codpostal: '4137',
            descripcion: 'Los Cerreros'
        },
        {
            codpostal: '4141',
            descripcion: 'Los Chanares'
        },
        {
            codpostal: '4111',
            descripcion: 'Los Chanaritos'
        },
        {
            codpostal: '4119',
            descripcion: 'Los Chorrillos'
        },
        {
            codpostal: '4137',
            descripcion: 'Los Colorados'
        },
        {
            codpostal: '4157',
            descripcion: 'Los Cordoba'
        },
        {
            codpostal: '4137',
            descripcion: 'Los Cordones'
        },
        {
            codpostal: '4137',
            descripcion: 'Los Corpitos'
        },
        {
            codpostal: '4113',
            descripcion: 'Los Crespos'
        },
        {
            codpostal: '4137',
            descripcion: 'Los Cuartos'
        },
        {
            codpostal: '4159',
            descripcion: 'Los Diez'
        },
        {
            codpostal: '4103',
            descripcion: 'Los Estanques'
        },
        {
            codpostal: '4157',
            descripcion: 'Los Galpones'
        },
        {
            codpostal: '4117',
            descripcion: 'Los Godos'
        },
        {
            codpostal: '4186',
            descripcion: 'Los Godoy'
        },
        {
            codpostal: '4113',
            descripcion: 'Los Gomez'
        },
        {
            codpostal: '4119',
            descripcion: 'Los Gonzales'
        },
        {
            codpostal: '4159',
            descripcion: 'Los Gramajos'
        },
        {
            codpostal: '4158',
            descripcion: 'Los Guayacanes'
        },
        {
            codpostal: '4151',
            descripcion: 'Los Gucheas'
        },
        {
            codpostal: '4172',
            descripcion: 'Los Guemes'
        },
        {
            codpostal: '4178',
            descripcion: 'Los Gutierrez'
        },
        {
            codpostal: '4186',
            descripcion: 'Los Hardoy'
        },
        {
            codpostal: '4113',
            descripcion: 'Los Herreras'
        },
        {
            codpostal: '4101',
            descripcion: 'Los Hilos'
        },
        {
            codpostal: '4113',
            descripcion: 'Los Juarez'
        },
        {
            codpostal: '4132',
            descripcion: 'Los Laureles'
        },
        {
            codpostal: '4174',
            descripcion: 'Los Lescanos'
        },
        {
            codpostal: '4155',
            descripcion: 'Los Lunas'
        },
        {
            codpostal: '4174',
            descripcion: 'Los Mendozas'
        },
        {
            codpostal: '4242',
            descripcion: 'Los Molles'
        },
        {
            codpostal: '4101',
            descripcion: 'Los Nogales'
        },
        {
            codpostal: '4143',
            descripcion: 'Los Noyes'
        },
        {
            codpostal: '4176',
            descripcion: 'Los Paraisos'
        },
        {
            codpostal: '4178',
            descripcion: 'Los Pereyra'
        },
        {
            codpostal: '4117',
            descripcion: 'Los Perez'
        },
        {
            codpostal: '4162',
            descripcion: 'Los Pizarro'
        },
        {
            codpostal: '4105',
            descripcion: 'Los Planchones'
        },
        {
            codpostal: '4111',
            descripcion: 'Los Porceles'
        },
        {
            codpostal: '4115',
            descripcion: 'Los Puestos'
        },
        {
            codpostal: '4113',
            descripcion: 'Los Quemados'
        },
        {
            codpostal: '4182',
            descripcion: 'Los Ralos'
        },
        {
            codpostal: '4143',
            descripcion: 'Los Reyes'
        },
        {
            codpostal: '4157',
            descripcion: 'Los Rios'
        },
        {
            codpostal: '4157',
            descripcion: 'Los Rizos'
        },
        {
            codpostal: '4142',
            descripcion: 'Los Robles'
        },
        {
            codpostal: '4135',
            descripcion: 'Los Rodriguez'
        },
        {
            codpostal: '4143',
            descripcion: 'Los Rojos'
        },
        {
            codpostal: '4113',
            descripcion: 'Los Romanos'
        },
        {
            codpostal: '4157',
            descripcion: 'Los Sarmientos'
        },
        {
            codpostal: '4176',
            descripcion: 'Los Sauces'
        },
        {
            codpostal: '4142',
            descripcion: 'Los Sosa'
        },
        {
            codpostal: '4111',
            descripcion: 'Los Sueldos'
        },
        {
            codpostal: '4147',
            descripcion: 'Los Timbres'
        },
        {
            codpostal: '4174',
            descripcion: 'Los Trejos'
        },
        {
            codpostal: '4109',
            descripcion: 'Los Vallistos'
        },
        {
            codpostal: '4105',
            descripcion: 'Los Vazquez'
        },
        {
            codpostal: '4146',
            descripcion: 'Los Vega'
        },
        {
            codpostal: '4111',
            descripcion: 'Los Villagra'
        },
        {
            codpostal: '4115',
            descripcion: 'Los Villegas'
        },
        {
            codpostal: '4137',
            descripcion: 'Los Zazos'
        },
        {
            codpostal: '4115',
            descripcion: 'Los Zelayas'
        },
        {
            codpostal: '4117',
            descripcion: 'Luisiana'
        },
        {
            codpostal: '4117',
            descripcion: 'Lujan'
        },
        {
            codpostal: '4128',
            descripcion: 'Lules'
        },
        {
            codpostal: '4113',
            descripcion: 'Lunarejos'
        },
        {
            codpostal: '4172',
            descripcion: 'Macio'
        },
        {
            codpostal: '4117',
            descripcion: 'Macomita'
        },
        {
            codpostal: '4157',
            descripcion: 'Mal Paso'
        },
        {
            codpostal: '4129',
            descripcion: 'Malvinas'
        },
        {
            codpostal: '4141',
            descripcion: 'Managua'
        },
        {
            codpostal: '4105',
            descripcion: 'Manantial'
        },
        {
            codpostal: '4105',
            descripcion: 'Manantial De Ovanta'
        },
        {
            codpostal: '4124',
            descripcion: 'Manantiales'
        },
        {
            codpostal: '4115',
            descripcion: 'Mancopa'
        },
        {
            codpostal: '4156',
            descripcion: 'Manuel Garcia Fernandez'
        },
        {
            codpostal: '4156',
            descripcion: 'Manuela Pedraza'
        },
        {
            codpostal: '4158',
            descripcion: 'Marapa'
        },
        {
            codpostal: '4107',
            descripcion: 'Marcos Paz'
        },
        {
            codpostal: '4157',
            descripcion: 'Maria Blanca'
        },
        {
            codpostal: '4168',
            descripcion: 'Maria Elena'
        },
        {
            codpostal: '4174',
            descripcion: 'Maria Luisa'
        },
        {
            codpostal: '4117',
            descripcion: 'Marino'
        },
        {
            codpostal: '4172',
            descripcion: 'Mascio Pilco'
        },
        {
            codpostal: '4172',
            descripcion: 'Mascio Sud'
        },
        {
            codpostal: '4122',
            descripcion: 'Mato Yaco'
        },
        {
            codpostal: '4101',
            descripcion: 'Matul'
        },
        {
            codpostal: '4182',
            descripcion: 'Mayo'
        },
        {
            codpostal: '4101',
            descripcion: 'Medina'
        },
        {
            codpostal: '4151',
            descripcion: 'Medinas'
        },
        {
            codpostal: '4146',
            descripcion: 'Membrillo'
        },
        {
            codpostal: '4000',
            descripcion: 'Mercado Norte'
        },
        {
            codpostal: '4128',
            descripcion: 'Mercedes'
        },
        {
            codpostal: '4113',
            descripcion: 'Miguel Lillo'
        },
        {
            codpostal: '4151',
            descripcion: 'Milagro'
        },
        {
            codpostal: '4124',
            descripcion: 'Miranda'
        },
        {
            codpostal: '4162',
            descripcion: 'Mistol'
        },
        {
            codpostal: '4115',
            descripcion: 'Mixta'
        },
        {
            codpostal: '4115',
            descripcion: 'Mojon'
        },
        {
            codpostal: '4151',
            descripcion: 'Molinos'
        },
        {
            codpostal: '4242',
            descripcion: 'Molles'
        },
        {
            codpostal: '4115',
            descripcion: 'Monte Bello'
        },
        {
            codpostal: '4187',
            descripcion: 'Monte Cristo'
        },
        {
            codpostal: '4133',
            descripcion: 'Monte Grande'
        },
        {
            codpostal: '4117',
            descripcion: 'Monte Largo'
        },
        {
            codpostal: '4152',
            descripcion: 'Monte Redondo'
        },
        {
            codpostal: '4152',
            descripcion: 'Monte Rico'
        },
        {
            codpostal: '4174',
            descripcion: 'Monteagudo'
        },
        {
            codpostal: '4142',
            descripcion: 'Monteros'
        },
        {
            codpostal: '4242',
            descripcion: 'Montuoso'
        },
        {
            codpostal: '4242',
            descripcion: 'Moron'
        },
        {
            codpostal: '4172',
            descripcion: 'Mothe'
        },
        {
            codpostal: '4117',
            descripcion: 'Moya'
        },
        {
            codpostal: '4115',
            descripcion: 'Moyar'
        },
        {
            codpostal: '4178',
            descripcion: 'Mujer Muerta'
        },
        {
            codpostal: '4152',
            descripcion: 'Multiflores'
        },
        {
            codpostal: '4000',
            descripcion: 'Munecas'
        },
        {
            codpostal: '4158',
            descripcion: 'Naranjo Esquina'
        },
        {
            codpostal: '4152',
            descripcion: 'Nasche'
        },
        {
            codpostal: '4135',
            descripcion: 'Negro Potrero'
        },
        {
            codpostal: '4101',
            descripcion: 'Nio'
        },
        {
            codpostal: '4174',
            descripcion: 'Niogasta'
        },
        {
            codpostal: '4113',
            descripcion: 'Noario'
        },
        {
            codpostal: '4137',
            descripcion: 'Nogalita'
        },
        {
            codpostal: '4101',
            descripcion: 'Nogalito'
        },
        {
            codpostal: '4122',
            descripcion: 'Noreo'
        },
        {
            codpostal: '4103',
            descripcion: 'Nueva Espana'
        },
        {
            codpostal: '4103',
            descripcion: 'Nueva Esperanza'
        },
        {
            codpostal: '4101',
            descripcion: 'Nueva Rosa'
        },
        {
            codpostal: '4157',
            descripcion: 'Nueva Trinidad'
        },
        {
            codpostal: '4117',
            descripcion: 'Nuevo Pueblo La Florida'
        },
        {
            codpostal: '4109',
            descripcion: 'Nuevos Mataderos'
        },
        {
            codpostal: '4129',
            descripcion: 'Obraje'
        },
        {
            codpostal: '4101',
            descripcion: 'Ojo'
        },
        {
            codpostal: '4107',
            descripcion: 'Ojo De Agua'
        },
        {
            codpostal: '4115',
            descripcion: 'Oran'
        },
        {
            codpostal: '4101',
            descripcion: 'Ovejeria'
        },
        {
            codpostal: '4111',
            descripcion: 'Pacara'
        },
        {
            codpostal: '4119',
            descripcion: 'Pacara Marcado'
        },
        {
            codpostal: '4111',
            descripcion: 'Pacara Pintado'
        },
        {
            codpostal: '4133',
            descripcion: 'Padilla'
        },
        {
            codpostal: '4242',
            descripcion: 'Paez'
        },
        {
            codpostal: '4187',
            descripcion: 'Paja Colorada'
        },
        {
            codpostal: '4111',
            descripcion: 'Pala Pala'
        },
        {
            codpostal: '4176',
            descripcion: 'Palampa'
        },
        {
            codpostal: '4178',
            descripcion: 'Palmas Redondas'
        },
        {
            codpostal: '4115',
            descripcion: 'Palmitas'
        },
        {
            codpostal: '4161',
            descripcion: 'Palo Blanco'
        },
        {
            codpostal: '4242',
            descripcion: 'Paloma'
        },
        {
            codpostal: '4174',
            descripcion: 'Palomas'
        },
        {
            codpostal: '4119',
            descripcion: 'Palomitas'
        },
        {
            codpostal: '4117',
            descripcion: 'Palta'
        },
        {
            codpostal: '4159',
            descripcion: 'Pampa Larga'
        },
        {
            codpostal: '4172',
            descripcion: 'Pampa Mayo'
        },
        {
            codpostal: '4242',
            descripcion: 'Pampa Pozo'
        },
        {
            codpostal: '4105',
            descripcion: 'Parada Ohuanta'
        },
        {
            codpostal: '4117',
            descripcion: 'Paraiso'
        },
        {
            codpostal: '4187',
            descripcion: 'Paso De La Patria'
        },
        {
            codpostal: '4176',
            descripcion: 'Paso Grande'
        },
        {
            codpostal: '4117',
            descripcion: 'Pedro G. Mendez'
        },
        {
            codpostal: '4141',
            descripcion: 'Pichao'
        },
        {
            codpostal: '4124',
            descripcion: 'Pie De La Cuesta'
        },
        {
            codpostal: '4107',
            descripcion: 'Pie Del Aconquija'
        },
        {
            codpostal: '4119',
            descripcion: 'Piedra Blanca'
        },
        {
            codpostal: '4137',
            descripcion: 'Piedras Blancas'
        },
        {
            codpostal: '4142',
            descripcion: 'Pilco'
        },
        {
            codpostal: '4124',
            descripcion: 'Pingollar'
        },
        {
            codpostal: '4115',
            descripcion: 'Pirhuas'
        },
        {
            codpostal: '4000',
            descripcion: 'Pocitos'
        },
        {
            codpostal: '4111',
            descripcion: 'Polito'
        },
        {
            codpostal: '4178',
            descripcion: 'Porvenir'
        },
        {
            codpostal: '4115',
            descripcion: 'Posse'
        },
        {
            codpostal: '4157',
            descripcion: 'Posta'
        },
        {
            codpostal: '4122',
            descripcion: 'Posta Vieja'
        },
        {
            codpostal: '4101',
            descripcion: 'Potrerillo'
        },
        {
            codpostal: '4129',
            descripcion: 'Potrero'
        },
        {
            codpostal: '4128',
            descripcion: 'Potrero De Las Tablas'
        },
        {
            codpostal: '4168',
            descripcion: 'Potrero Grande'
        },
        {
            codpostal: '4122',
            descripcion: 'Potro Yaco'
        },
        {
            codpostal: '4162',
            descripcion: 'Pozo Cavado'
        },
        {
            codpostal: '4119',
            descripcion: 'Pozo Del Algarrobo'
        },
        {
            codpostal: '4111',
            descripcion: 'Pozo Del Alto'
        },
        {
            codpostal: '4195',
            descripcion: 'Pozo Grande'
        },
        {
            codpostal: '4117',
            descripcion: 'Pozo Hondo'
        },
        {
            codpostal: '4186',
            descripcion: 'Pozo Lapacho'
        },
        {
            codpostal: '4195',
            descripcion: 'Pozo Largo'
        },
        {
            codpostal: '4103',
            descripcion: 'Pueblo Obrero'
        },
        {
            codpostal: '4184',
            descripcion: 'Pueblo Viejo'
        },
        {
            codpostal: '4166',
            descripcion: 'Puente El Manantial'
        },
        {
            codpostal: '4109',
            descripcion: 'Puente Rio Sali'
        },
        {
            codpostal: '4187',
            descripcion: 'Puerta Alegre'
        },
        {
            codpostal: '4101',
            descripcion: 'Puerta De Palavecino'
        },
        {
            codpostal: '4164',
            descripcion: 'Puerta Grande'
        },
        {
            codpostal: '4207',
            descripcion: 'Puerta San Javier'
        },
        {
            codpostal: '4101',
            descripcion: 'Puerta Vieja'
        },
        {
            codpostal: '4122',
            descripcion: 'Puertas'
        },
        {
            codpostal: '4168',
            descripcion: 'Puertas Grandes'
        },
        {
            codpostal: '4106',
            descripcion: 'Puerto Cochucho'
        },
        {
            codpostal: '4242',
            descripcion: 'Puesto 9 De Julio'
        },
        {
            codpostal: '4111',
            descripcion: 'Puesto Chico'
        },
        {
            codpostal: '4117',
            descripcion: 'Puesto De Avila'
        },
        {
            codpostal: '4176',
            descripcion: 'Puesto De Galvanes'
        },
        {
            codpostal: '4143',
            descripcion: 'Puesto De Los Valdes'
        },
        {
            codpostal: '4119',
            descripcion: 'Puesto De Uncos'
        },
        {
            codpostal: '4122',
            descripcion: 'Puesto Grande'
        },
        {
            codpostal: '4242',
            descripcion: 'Puesto Los Avilas'
        },
        {
            codpostal: '4242',
            descripcion: 'Puesto Los Perez'
        },
        {
            codpostal: '4163',
            descripcion: 'Puesto Nuevo'
        },
        {
            codpostal: '4119',
            descripcion: 'Puesto Villagra'
        },
        {
            codpostal: '4115',
            descripcion: 'Puma Pozo'
        },
        {
            codpostal: '4115',
            descripcion: 'Punta De Rieles'
        },
        {
            codpostal: '4129',
            descripcion: 'Punta Del Monte'
        },
        {
            codpostal: '4242',
            descripcion: 'Quebrachito'
        },
        {
            codpostal: '4129',
            descripcion: 'Quebrada De Lules'
        },
        {
            codpostal: '4111',
            descripcion: 'Quilmes'
        },
        {
            codpostal: '4178',
            descripcion: 'Quimil'
        },
        {
            codpostal: '4176',
            descripcion: 'Quisca'
        },
        {
            codpostal: '4141',
            descripcion: 'Quisca Chica'
        },
        {
            codpostal: '4105',
            descripcion: 'Raco'
        },
        {
            codpostal: '4242',
            descripcion: 'Ramadistas'
        },
        {
            codpostal: '4242',
            descripcion: 'Ramos'
        },
        {
            codpostal: '4178',
            descripcion: 'Ranchillos'
        },
        {
            codpostal: '4178',
            descripcion: 'Ranchillos Viejos'
        },
        {
            codpostal: '4119',
            descripcion: 'Requelme'
        },
        {
            codpostal: '4111',
            descripcion: 'Retiro'
        },
        {
            codpostal: '4126',
            descripcion: 'Riarte'
        },
        {
            codpostal: '4174',
            descripcion: 'Riegasta'
        },
        {
            codpostal: '4103',
            descripcion: 'Rincon'
        },
        {
            codpostal: '4166',
            descripcion: 'Rincon De Balderrama'
        },
        {
            codpostal: '4152',
            descripcion: 'Rincon Huasa'
        },
        {
            codpostal: '4174',
            descripcion: 'Rinconada'
        },
        {
            codpostal: '4137',
            descripcion: 'Rio Blanco'
        },
        {
            codpostal: '4153',
            descripcion: 'Rio Chico'
        },
        {
            codpostal: '4166',
            descripcion: 'Rio Colorado'
        },
        {
            codpostal: '4119',
            descripcion: 'Rio Del Nio'
        },
        {
            codpostal: '4176',
            descripcion: 'Rio Hondito'
        },
        {
            codpostal: '4101',
            descripcion: 'Rio Loro'
        },
        {
            codpostal: '4166',
            descripcion: 'Rio Lules'
        },
        {
            codpostal: '4145',
            descripcion: 'Rio Seco'
        },
        {
            codpostal: '4122',
            descripcion: 'Rio Vipos'
        },
        {
            codpostal: '4122',
            descripcion: 'Rodeo De Algarrobo'
        },
        {
            codpostal: '4122',
            descripcion: 'Rodeo Grande'
        },
        {
            codpostal: '4119',
            descripcion: 'Rodeo Toro'
        },
        {
            codpostal: '4111',
            descripcion: 'Roma'
        },
        {
            codpostal: '4163',
            descripcion: 'Romarello'
        },
        {
            codpostal: '4115',
            descripcion: 'Romera Pozo'
        },
        {
            codpostal: '4187',
            descripcion: 'Rosario'
        },
        {
            codpostal: '4111',
            descripcion: 'Rosario Oeste'
        },
        {
            codpostal: '4176',
            descripcion: 'Rumi Cocha'
        },
        {
            codpostal: '4164',
            descripcion: 'Rumi Punco'
        },
        {
            codpostal: '4242',
            descripcion: 'Rumi Yura'
        },
        {
            codpostal: '4161',
            descripcion: 'Sacrificio'
        },
        {
            codpostal: '4242',
            descripcion: 'Sala Vieja'
        },
        {
            codpostal: '4146',
            descripcion: 'Saladillo'
        },
        {
            codpostal: '4122',
            descripcion: 'Salamanca'
        },
        {
            codpostal: '4137',
            descripcion: 'Salas'
        },
        {
            codpostal: '4122',
            descripcion: 'Salinas'
        },
        {
            codpostal: '4186',
            descripcion: 'San Agustin'
        },
        {
            codpostal: '4105',
            descripcion: 'San Alberto'
        },
        {
            codpostal: '4111',
            descripcion: 'San Andres'
        },
        {
            codpostal: '4115',
            descripcion: 'San Antonio'
        },
        {
            codpostal: '4174',
            descripcion: 'San Antonio De Padua'
        },
        {
            codpostal: '4176',
            descripcion: 'San Antonio De Quisca'
        },
        {
            codpostal: '4187',
            descripcion: 'San Arturo'
        },
        {
            codpostal: '4186',
            descripcion: 'San Carlos'
        },
        {
            codpostal: '4119',
            descripcion: 'San Eusebio'
        },
        {
            codpostal: '4187',
            descripcion: 'San Federico'
        },
        {
            codpostal: '4105',
            descripcion: 'San Felipe'
        },
        {
            codpostal: '4124',
            descripcion: 'San Fernando'
        },
        {
            codpostal: '4162',
            descripcion: 'San Francisco'
        },
        {
            codpostal: '4134',
            descripcion: 'San Gabriel'
        },
        {
            codpostal: '4132',
            descripcion: 'San Gabriel Del Monte'
        },
        {
            codpostal: '4242',
            descripcion: 'San German'
        },
        {
            codpostal: '4162',
            descripcion: 'San Ignacio'
        },
        {
            codpostal: '4124',
            descripcion: 'San Isidro'
        },
        {
            codpostal: '4108',
            descripcion: 'San Javier'
        },
        {
            codpostal: '4129',
            descripcion: 'San Jenaro'
        },
        {
            codpostal: '4124',
            descripcion: 'San Jose'
        },
        {
            codpostal: '4132',
            descripcion: 'San Jose De Buena Vista'
        },
        {
            codpostal: '4137',
            descripcion: 'San Jose De Chasquivil'
        },
        {
            codpostal: '4134',
            descripcion: 'San Jose De Flores'
        },
        {
            codpostal: '4113',
            descripcion: 'San Jose De Leales'
        },
        {
            codpostal: '4128',
            descripcion: 'San Jose De Lules'
        },
        {
            codpostal: '4117',
            descripcion: 'San Jose De Macomita'
        },
        {
            codpostal: '4242',
            descripcion: 'San Juancito'
        },
        {
            codpostal: '4122',
            descripcion: 'San Julian'
        },
        {
            codpostal: '4132',
            descripcion: 'San Luis'
        },
        {
            codpostal: '4119',
            descripcion: 'San Miguel'
        },
        {
            codpostal: '4000',
            descripcion: 'San Miguel De Tucuman'
        },
        {
            codpostal: '4178',
            descripcion: 'San Miguelito'
        },
        {
            codpostal: '4111',
            descripcion: 'San Nicolas'
        },
        {
            codpostal: '4129',
            descripcion: 'San Pablo'
        },
        {
            codpostal: '4119',
            descripcion: 'San Patricio'
        },
        {
            codpostal: '4117',
            descripcion: 'San Pedro'
        },
        {
            codpostal: '4124',
            descripcion: 'San Pedro De Colalao'
        },
        {
            codpostal: '4172',
            descripcion: 'San Pedro Martir'
        },
        {
            codpostal: '4182',
            descripcion: 'San Pereyra'
        },
        {
            codpostal: '4149',
            descripcion: 'San Ramon'
        },
        {
            codpostal: '4149',
            descripcion: 'San Ramon Chicligasta'
        },
        {
            codpostal: '4122',
            descripcion: 'San Vicente'
        },
        {
            codpostal: '4115',
            descripcion: 'Sandis'
        },
        {
            codpostal: '4174',
            descripcion: 'Sandovales'
        },
        {
            codpostal: '4105',
            descripcion: 'Santa Barbara'
        },
        {
            codpostal: '4142',
            descripcion: 'Santa Catalina'
        },
        {
            codpostal: '4168',
            descripcion: 'Santa Clara Sud'
        },
        {
            codpostal: '4149',
            descripcion: 'Santa Cruz'
        },
        {
            codpostal: '4135',
            descripcion: 'Santa Elena'
        },
        {
            codpostal: '4111',
            descripcion: 'Santa Felisa'
        },
        {
            codpostal: '4152',
            descripcion: 'Santa Isabel'
        },
        {
            codpostal: '4186',
            descripcion: 'Santa Luisa'
        },
        {
            codpostal: '4135',
            descripcion: 'Santa Monica'
        },
        {
            codpostal: '4119',
            descripcion: 'Santa Rosa'
        },
        {
            codpostal: '4111',
            descripcion: 'Santa Rosa De Leales'
        },
        {
            codpostal: '4117',
            descripcion: 'Santa Teresa'
        },
        {
            codpostal: '4128',
            descripcion: 'Santillan'
        },
        {
            codpostal: '4144',
            descripcion: 'Sargento Moya'
        },
        {
            codpostal: '4242',
            descripcion: 'Sauce Gaucho'
        },
        {
            codpostal: '4132',
            descripcion: 'Sauce Huacho'
        },
        {
            codpostal: '4162',
            descripcion: 'Sauce Seco'
        },
        {
            codpostal: '4122',
            descripcion: 'Sauce Yacu'
        },
        {
            codpostal: '4124',
            descripcion: 'Sauzal'
        },
        {
            codpostal: '4122',
            descripcion: 'Sepultura'
        },
        {
            codpostal: '4242',
            descripcion: 'Sesteadero'
        },
        {
            codpostal: '4195',
            descripcion: 'Siete De Abril'
        },
        {
            codpostal: '4242',
            descripcion: 'Simbol'
        },
        {
            codpostal: '4122',
            descripcion: 'Simbolar'
        },
        {
            codpostal: '4172',
            descripcion: 'Simoca'
        },
        {
            codpostal: '4119',
            descripcion: 'Sinqueal'
        },
        {
            codpostal: '4276',
            descripcion: 'Sol De Mayo'
        },
        {
            codpostal: '4142',
            descripcion: 'Soldado Maldonado'
        },
        {
            codpostal: '4115',
            descripcion: 'Soledad'
        },
        {
            codpostal: '4174',
            descripcion: 'Sud De Lazarte'
        },
        {
            codpostal: '4174',
            descripcion: 'Sud De Sandovales'
        },
        {
            codpostal: '4111',
            descripcion: 'Sueldos'
        },
        {
            codpostal: '4101',
            descripcion: 'Sunchal'
        },
        {
            codpostal: '4178',
            descripcion: 'Superintendente Ledesma'
        },
        {
            codpostal: '4174',
            descripcion: 'Suriyaco'
        },
        {
            codpostal: '4195',
            descripcion: 'Suriyacu'
        },
        {
            codpostal: '4124',
            descripcion: 'Tacanas'
        },
        {
            codpostal: '4117',
            descripcion: 'Taco'
        },
        {
            codpostal: '4242',
            descripcion: 'Taco Ralo'
        },
        {
            codpostal: '4159',
            descripcion: 'Taco Rodeo'
        },
        {
            codpostal: '4124',
            descripcion: 'Taco Yana'
        },
        {
            codpostal: '4127',
            descripcion: 'Tafi Del Valle'
        },
        {
            codpostal: '4103',
            descripcion: 'Tafi Viejo'
        },
        {
            codpostal: '4103',
            descripcion: 'Taficito'
        },
        {
            codpostal: '4195',
            descripcion: 'Tala Bajada'
        },
        {
            codpostal: '4176',
            descripcion: 'Tala Caida'
        },
        {
            codpostal: '4141',
            descripcion: 'Tala Paso'
        },
        {
            codpostal: '4119',
            descripcion: 'Tala Pozo'
        },
        {
            codpostal: '4122',
            descripcion: 'Tala Yaco'
        },
        {
            codpostal: '4158',
            descripcion: 'Talamuyo'
        },
        {
            codpostal: '4424',
            descripcion: 'Talitas'
        },
        {
            codpostal: '4103',
            descripcion: 'Talleres Nacionales'
        },
        {
            codpostal: '4117',
            descripcion: 'Tambor De Tacuari'
        },
        {
            codpostal: '4122',
            descripcion: 'Tapia'
        },
        {
            codpostal: '4117',
            descripcion: 'Taquello'
        },
        {
            codpostal: '4119',
            descripcion: 'Taruca Pampa'
        },
        {
            codpostal: '4132',
            descripcion: 'Teniente Berdina'
        },
        {
            codpostal: '4122',
            descripcion: 'Ticucho'
        },
        {
            codpostal: '4101',
            descripcion: 'Timbo Nuevo'
        },
        {
            codpostal: '4101',
            descripcion: 'Timbo Viejo'
        },
        {
            codpostal: '4187',
            descripcion: 'Tinajeros'
        },
        {
            codpostal: '4141',
            descripcion: 'Tio Franco'
        },
        {
            codpostal: '4137',
            descripcion: 'Tio Punco'
        },
        {
            codpostal: '4124',
            descripcion: 'Toco Llana'
        },
        {
            codpostal: '4124',
            descripcion: 'Toco Loro'
        },
        {
            codpostal: '4242',
            descripcion: 'Toro Muerto'
        },
        {
            codpostal: '4242',
            descripcion: 'Tostado'
        },
        {
            codpostal: '4119',
            descripcion: 'Totoral'
        },
        {
            codpostal: '4141',
            descripcion: 'Totoritas'
        },
        {
            codpostal: '4124',
            descripcion: 'Trancas'
        },
        {
            codpostal: '4101',
            descripcion: 'Tranquitas'
        },
        {
            codpostal: '4174',
            descripcion: 'Trejos'
        },
        {
            codpostal: '4132',
            descripcion: 'Tres Almacenes'
        },
        {
            codpostal: '4178',
            descripcion: 'Tres Pozos'
        },
        {
            codpostal: '4101',
            descripcion: 'Tres Sargentos'
        },
        {
            codpostal: '4151',
            descripcion: 'Trinidad'
        },
        {
            codpostal: '4000',
            descripcion: 'Tucuman'
        },
        {
            codpostal: '4122',
            descripcion: 'Tuna Sola'
        },
        {
            codpostal: '4113',
            descripcion: 'Tusca Pozo'
        },
        {
            codpostal: '4155',
            descripcion: 'Tuscal'
        },
        {
            codpostal: '4186',
            descripcion: 'Tuscal Redondo'
        },
        {
            codpostal: '4113',
            descripcion: 'Tusquitas'
        },
        {
            codpostal: '4187',
            descripcion: 'Urizar'
        },
        {
            codpostal: '4113',
            descripcion: 'Uturungu'
        },
        {
            codpostal: '4187',
            descripcion: 'Uturuno'
        },
        {
            codpostal: '4101',
            descripcion: 'Vacahuasi'
        },
        {
            codpostal: '4149',
            descripcion: 'Valenzuela'
        },
        {
            codpostal: '4122',
            descripcion: 'Vesubio'
        },
        {
            codpostal: '4122',
            descripcion: 'Viaducto Del Toro'
        },
        {
            codpostal: '4115',
            descripcion: 'Vielos'
        },
        {
            codpostal: '4115',
            descripcion: 'Vilca Pozo'
        },
        {
            codpostal: '4158',
            descripcion: 'Villa Alberdi'
        },
        {
            codpostal: '4146',
            descripcion: 'Villa Alvear'
        },
        {
            codpostal: '4000',
            descripcion: 'Villa Amalia'
        },
        {
            codpostal: '4105',
            descripcion: 'Villa Angelina'
        },
        {
            codpostal: '4158',
            descripcion: 'Villa Belgrano'
        },
        {
            codpostal: '4105',
            descripcion: 'Villa Carmela'
        },
        {
            codpostal: '4147',
            descripcion: 'Villa Carolina'
        },
        {
            codpostal: '4155',
            descripcion: 'Villa Clodomiro Hileret'
        },
        {
            codpostal: '4103',
            descripcion: 'Villa Colmena'
        },
        {
            codpostal: '4101',
            descripcion: 'Villa De Los Britos'
        },
        {
            codpostal: '4111',
            descripcion: 'Villa De Sueldos'
        },
        {
            codpostal: '4187',
            descripcion: 'Villa Desierto Del Luz'
        },
        {
            codpostal: '4187',
            descripcion: 'Villa El Bache'
        },
        {
            codpostal: '4187',
            descripcion: 'Villa El Retiro'
        },
        {
            codpostal: '4111',
            descripcion: 'Villa Fiad'
        },
        {
            codpostal: '4187',
            descripcion: 'Villa La Soledad'
        },
        {
            codpostal: '4151',
            descripcion: 'Villa La Tuna'
        },
        {
            codpostal: '4000',
            descripcion: 'Villa Lujan'
        },
        {
            codpostal: '4107',
            descripcion: 'Villa Marcos Paz'
        },
        {
            codpostal: '4187',
            descripcion: 'Villa Maria'
        },
        {
            codpostal: '4101',
            descripcion: 'Villa Mariano Moreno'
        },
        {
            codpostal: '4103',
            descripcion: 'Villa Mitre'
        },
        {
            codpostal: '4187',
            descripcion: 'Villa Monte Cristo'
        },
        {
            codpostal: '4105',
            descripcion: 'Villa Nogues'
        },
        {
            codpostal: '4142',
            descripcion: 'Villa Nueva'
        },
        {
            codpostal: '4101',
            descripcion: 'Villa Nueva Italia'
        },
        {
            codpostal: '4000',
            descripcion: 'Villa Nueve De Julio'
        },
        {
            codpostal: '4101',
            descripcion: 'Villa Padre Monti'
        },
        {
            codpostal: '4176',
            descripcion: 'Villa Pujio'
        },
        {
            codpostal: '4144',
            descripcion: 'Villa Quinteros'
        },
        {
            codpostal: '4101',
            descripcion: 'Villa Rosa'
        },
        {
            codpostal: '4187',
            descripcion: 'Villa San Antonio'
        },
        {
            codpostal: '4000',
            descripcion: 'Villa San Cayetano'
        },
        {
            codpostal: '4187',
            descripcion: 'Villa Santa Rosa'
        },
        {
            codpostal: '4157',
            descripcion: 'Villa Sarmiento'
        },
        {
            codpostal: '4182',
            descripcion: 'Villa Tercera'
        },
        {
            codpostal: '4000',
            descripcion: 'Villa Urquiza'
        },
        {
            codpostal: '4000',
            descripcion: 'Villa Zenon J. Santillan'
        },
        {
            codpostal: '4178',
            descripcion: 'Villagra'
        },
        {
            codpostal: '4242',
            descripcion: 'Viltran'
        },
        {
            codpostal: '4122',
            descripcion: 'Vipos'
        },
        {
            codpostal: '4186',
            descripcion: 'Virginia'
        },
        {
            codpostal: '4122',
            descripcion: 'Yaco'
        },
        {
            codpostal: '4142',
            descripcion: 'Yacuchina'
        },
        {
            codpostal: '4174',
            descripcion: 'Yacuchiri'
        },
        {
            codpostal: '4174',
            descripcion: 'Yalapa'
        },
        {
            codpostal: '4158',
            descripcion: 'Yaminas'
        },
        {
            codpostal: '4242',
            descripcion: 'Yapachin'
        },
        {
            codpostal: '4158',
            descripcion: 'Yaquillo'
        },
        {
            codpostal: '4141',
            descripcion: 'Yasyamayo'
        },
        {
            codpostal: '4113',
            descripcion: 'Yatapayana'
        },
        {
            codpostal: '4107',
            descripcion: 'Yerba Buena'
        },
        {
            codpostal: '4159',
            descripcion: 'Ympas'
        },
        {
            codpostal: '4142',
            descripcion: 'Yonopongo'
        },
        {
            codpostal: '4124',
            descripcion: 'Yuchaco'
        },
        {
            codpostal: '4151',
            descripcion: 'Yucumanita'
        },
        {
            codpostal: '4242',
            descripcion: 'Yumillura'
        },
        {
            codpostal: '4172',
            descripcion: 'Zanjon Mascio'
        },
        {
            codpostal: '4159',
            descripcion: 'Zapallar'
        },
        {
            codpostal: '4124',
            descripcion: 'Zarate'
        },
        {
            codpostal: '4137',
            descripcion: 'Zurita'
        }
    ];

    // Create localidades in database
    listlocalidades.map(async (locali) => {
        await Localidad.findOrCreate({
            where: {
                codpostal: locali.codpostal,
                descripcion: locali.descripcion
            }
        });
    });
}

export default loadLocalidades;