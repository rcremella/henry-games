const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
  // Defino el modelo de generos
  sequelize.define(
    "genres",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING,
        // allowNull: false,
      },
      image_background: {
        type: DataTypes.STRING,
        // allowNull: false,
      },
    },
    { timestamps: false }
  );
};
