const Sequelize = require('sequelize');

const sequelize = new Sequelize('sequelize', 'root', '', {
    dialect: 'mysql'
});

const User = sequelize.define('user', {
    email: {
        type: Sequelize.DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 10
    }
},{
    tableName: 'users',
});

console.log(sequelize.models.user)

sequelize.sync({ force: true}).then( () => {
    console.log('Databae are synced');
})
.catch((err) => {
    console.log(err);
});

