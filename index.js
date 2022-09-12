const Sequelize = require('sequelize');

const sequelize = new Sequelize('sequelize', 'root', '', {
    dialect: 'mysql'
});

sequelize.authenticate().then( () => {
    console.log('Connected to database');
})
.catch((err) => {
    console.log(err);
});

console.log("trying to connect to database");