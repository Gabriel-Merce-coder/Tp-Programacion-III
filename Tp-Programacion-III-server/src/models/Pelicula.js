import {DataTypes} from 'sequelize'
import {sequelize} from '../database/db.js'


export const Pelicula = sequelize.define("Pelicula",{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title:{
        type: DataTypes.STRING,
        allowNull: false
    },
    genero:{
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    reparto:{
        type: DataTypes.STRING,
        allowNull: false
    },
    duracion:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    calificacion:{
        type: DataTypes.FLOAT,
        allowNull: false
    },
    imageUrl:{
        type: DataTypes.STRING,
        allowNull: false
    }   
}, {timestamps: false})