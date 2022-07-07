const {Sequelize, sequelize} = require('./db');

const Musician = sequelize.define('musician', {
    name: Sequelize.STRING,
    instrument : Sequelize.STRING
});

module.exports = {
    Musician
};