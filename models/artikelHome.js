module.exports=(sequelize, Datatypes)=>{
    const Artikel = sequelize.define('Artikel', {
        id:{
            type:Datatypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull:false
          },
          img:{
            type:Datatypes.STRING,
            allowNull:false
          },
          judul:{
            type:Datatypes.STRING,
          },
          deskripsi:{
            type:Datatypes.TEXT,
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
        tableName: 'artikels'
    });
    return Artikel;
}