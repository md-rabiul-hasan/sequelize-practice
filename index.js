const Sequelize = require('sequelize');

const sequelize = new Sequelize('sequelize', 'root', '', {
    dialect: 'mysql'
});

const User = sequelize.define('user', {
    email: {
        type: Sequelize.DataTypes.STRING,
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

sequelize.sync().then( () => {
//    return User.findAll({
//     attributes: [
//         'email',
//         [sequelize.fn('sum', sequelize.col('age')), 'total_age']
//     ],
//     group: 'email'
//    });
    
    return User.sum( 'age', {
        where: {age: 10}
    });
})
.then( (data) => {
    console.log(data);
    // data.forEach( (user) => {
    //     console.log(user.toJSON())
    // })
})
.catch((err) => {
    console.log(err);
});

