// Models
const { User } = require('./user.model');
const { Tienda } = require('./tienda.model');
const { Casos } = require('./casos.model');

const initModels = () => {
    // 1. User -> Casos
    User.hasMany(Casos, {
        foreignKey: 'idUsuario',
        sourceKey: 'id_usuario'
    });
    Casos.belongsTo(User, {
        foreignKey: 'idUsuario',
        targetKey: 'id_usuario'
    });

    // 2. Tienda -> Casos
    Tienda.hasMany(Casos, {
        foreignKey: 'idTienda',
        sourceKey: 'id_tienda'
    });
    Casos.belongsTo(Tienda, {
        foreignKey: 'idTienda',
        targetKey: 'id_tienda'
    });
};

module.exports = { initModels };
