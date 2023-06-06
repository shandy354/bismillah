'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('tanamans', { 
      id:{
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull:false
      },
      name:{
        type:Sequelize.STRING,
        allowNull:false
      },
      kategori:{
        type:Sequelize.STRING,
        allowNull:false
      },
      lokasi:{
        type:Sequelize.STRING,
      },
      deskripsi:{
        type:Sequelize.TEXT,
      },
      img:{
        type:Sequelize.STRING,
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
    await queryInterface.dropTable('tanamans');
  }
};
