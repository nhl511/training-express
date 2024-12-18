'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
 up: async (queryInterface, Sequelize) => {
   await queryInterface.createTable("users",{
     id: {
       type: Sequelize.UUID,
       primaryKey: true,
       defaultValue: Sequelize.UUIDV4,
     },
     username: {
       type: Sequelize.STRING,
       allowNull: false,
       unique: true,
       validate: {
         len: [3, 15]
       }
     },
     password: {
       type: Sequelize.STRING,
       allowNull: false,
     },
     firstName: {
       type: Sequelize.STRING,
       allowNull: false,
       validate: {
         len: [1, 20]
       }
     },
     lastName: {
       type: Sequelize.STRING,
       allowNull: false,
       validate: {
         len: [1, 40]
       }
     },
     isAdmin: {
       type: Sequelize.BOOLEAN,
       defaultValue: false
     },
     createdAt: {
       allowNull: false,
       type: Sequelize.DATE,
     },
     updatedAt: {
       allowNull: false,
       type: Sequelize.DATE,
     },
   })
 },
  down: async (queryInterface, Sequelize) => {
   await queryInterface.dropTable("users");
  }
};
