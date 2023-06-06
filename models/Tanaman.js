module.exports=(sequelize, Datatypes)=>{
    const Tanaman = sequelize.define('Tanaman', {
        id:{
            type:Datatypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull:false
          },
          name:{
            type:Datatypes.STRING,
            allowNull:false
          },
          kategori:{
            type:Datatypes.STRING,
            allowNull:false
          },
          lokasi:{
            type:Datatypes.STRING,
          },
          deskripsi:{
            type:Datatypes.TEXT,
          },
          img:{
            type:Datatypes.STRING,
          },
          createdAt:{
            type:Datatypes.DATE,
            allowNull:false
          },
          updatedAt:{
            type:Datatypes.DATE,
            allowNull:false
          }
    },{
        tableName: 'tanamans'
    });
    return Tanaman;
}