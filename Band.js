const {Sequelize, sequelize} = require('./db');

const Band = sequelize.define('band', {
    name: Sequelize.STRING,
    genre : Sequelize.STRING,
    showCount: Sequelize.INTEGER
});

module.exports = {
    Band
};