const Sequelize = require('sequelize');
const { DataTypes, Op } = Sequelize


const sequelize = new Sequelize('sequelize', 'root', '', {
    dialect: 'mysql'
});

const Student = sequelize.define('student', {
    student_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [4,20]
        }
    },
    favourite_class: {
        type: DataTypes.STRING,
        defaultValue: 'CSE'
    },
    school_year: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    subscribe_to_writecodes: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
},{
    tableName: 'students'
});


Student.sync().then(() => {
    // return Student.findAll({
    //     attributes: ['name'],        
    //     where: {
    //         [Op.or] : {
    //             favourite_class: 'EEE',
    //             subscribe_to_writecodes: true
    //         }            
    //     }
        
    // });

      return Student.findAll({
        attributes: [
            'school_year',
            [sequelize.fn('count', sequelize.col('school_year')), 'total_student']
        ],
        group: 'school_year'
    });
}).then( (data) => {
    data.forEach( (student) => {
        console.log(student.toJSON());
    })
})
.catch( (err) => {
    console.log(err)
})