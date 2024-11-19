import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Task = sequelize.define(
    'Task',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [1, 255],
            }, 
        },
        completed: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false, 
        },
    },
    {
        timestamps: true,
        indexes: [
            {
                fields: ['user_id'],
            },
        ],
    }
);

export default Task;