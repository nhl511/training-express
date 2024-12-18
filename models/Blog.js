const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Blog = sequelize.define('blog', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                len: [1, 255]
            }
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
            onDelete: 'CASCADE',
        }
    },{
        tableName: 'blogs',
    })
    return Blog
}