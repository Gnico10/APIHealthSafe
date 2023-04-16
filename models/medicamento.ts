import { DataTypes } from "sequelize";
import sequelize from "../db/connection";
import { Model, Optional } from "sequelize/types";
import iMedicamento from '../interfaces/iMedicamento';

import indicacionMedicamento from '../models/indicacionMedicamento';



const medicamento = sequelize.define<iMedicamento>('Medicamento',
    {
        idMedicamento: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        monodroga: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        presentacion: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        cantidad: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        idDiagnostico: {
            type: DataTypes.TEXT,
            allowNull: false,
        },

        
    },
    {
        tableName: 'medicamentos'
    }
);

medicamento.belongsTo(indicacionMedicamento, {
    foreignKey: 'idIndicacionMedicamento',
    as: 'indicacionMedicamento',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
});

medicamento.prototype.setIndicacion = async function(indicacion: typeof indicacionMedicamento): Promise<void> {

     // Aquí deberías implementar la lógica para asociar la indicación al medicamento
    // Puedes utilizar los métodos de Sequelize para crear la indicación y asociarla al medicamento
    // Por ejemplo:
 const nuevaIndicacion = await indicacionMedicamento.create({  dosis: indicacion, frecuencia: indicacion });
     await this.addIndicacion(nuevaIndicacion);
    // o
    await this.createIndicacion({ dosis: indicacion, frecuencia: indicacion });
    await this.setIndicacionMedicamento(indicacion);
};

export default  medicamento;
