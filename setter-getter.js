const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const zlib = require("zlib");

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
        allowNull: false,
        set(value){
            const salt = bcrypt.genSaltSync(12);
            const hash = bcrypt.hashSync(value, salt);
            this.setDataValue('password', hash);
        }
    },
    desciption: {
        type: Sequelize.DataTypes.STRING,
        set(value){
            const compressed = zlib.deflateSync(value).toString('base64');
            this.setDataValue('desciption', compressed);
        },
        get(){
            const value = this.getDataValue('desciption');
            const uncompressed = zlib.inflateSync(Buffer.from(value, 'base64'));
            return uncompressed.toString();
        }
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
    // return User.create({
    //     email: 'test@gmail.com',
    //     password: '123456',
    //     desciption: 'hasan mia'
    // })
    return User.findAll();
})
.then( (data) => {
    // console.log(data);
    data.forEach( (user) => {
        console.log(user.toJSON())
    })
})
.catch((err) => {
    console.log(err);
});

