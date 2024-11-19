import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const User = sequelize.define(
    'User', 
    {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }}, 
{
    timestamps: true,
    tableName: 'users'
});


export default User;