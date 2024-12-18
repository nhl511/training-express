const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const User = sequelize.define('user', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: [3, 15]
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 20]
            }
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 40]
            }
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },{
        tableName: 'users',
    })
    return User
}