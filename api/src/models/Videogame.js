const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
  // Defino el modelo de videojuegos
  sequelize.define(
    "videogames",
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        // allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        // allowNull: false,
      },
      released: {
        type: DataTypes.DATEONLY,
      },
      rating: {
        type: DataTypes.STRING,
      },
      background_image: {
        type: DataTypes.STRING,
      },
      platforms: {
        type: DataTypes.STRING,
        // allowNull: false,
      },
      genres: {
        type: DataTypes.STRING,
        // allowNull: false,
      },
    },
    { timestamps: false }
  );
};
