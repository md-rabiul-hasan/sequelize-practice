const Sequelize = require('sequelize');
const { DataTypes, Op} = Sequelize;

const sequelize = new Sequelize('sequelize', 'root', '', {
    dialect: 'mysql'
});

const Country = sequelize.define('country', {
    countryName: {
        type: DataTypes.STRING,
        unique: true
    }
},{
    timestamp: false
});

const Capital = sequelize.define('capital', {
    capitalName: {
        type: DataTypes.STRING,
        unique: true
    }
},{
    timestamp: false
});

Country.hasOne(Capital);

sequelize.sync({ alter: true}).then( () => {
    Country.bulkCreate(
        { countryName: 'USA' },
        { countryName: 'Bangladesh' },
    )
})
.catch( (err) => {
    console.log(err);
})