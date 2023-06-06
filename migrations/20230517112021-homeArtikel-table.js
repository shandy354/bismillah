'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('artikels', { 
      id:{
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull:false
      },
      img:{
        type:Sequelize.STRING,
        allowNull:false
      },
      judul:{
        type:Sequelize.STRING,
      },
      deskripsi:{
        type:Sequelize.TEXT,
      },
      createdAt:{
        type:Sequelize.DATE,
        allowNull:false
      },
      updatedAt:{
        type:Sequelize.DATE,
        allowNull:false
      }
    });
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('artikels');
  }
};
