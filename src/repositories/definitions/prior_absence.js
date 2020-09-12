const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('../../loaders/database');
const Exceptions = require('../../errors/repositoriesExceptions');

class PriorAbsence extends Model {

    async findPriorAbsenceByDate(date) {
        const absence_entities = await PriorAbsence.findAll({
            where: {
                start_period: {
                    [Op.gte]: date,
                },
                end_period: {
                    [Op.lte]: date,
                },
            }
        });
        if(absence_entities == null) {
            throw new Exceptions.NotFoundDataException;
        }

        return absence_entities.map((entity) => { return entity.dataValues; });
    }


}


PriorAbsence.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    teacher_id: {
        type: DataTypes.STRING(16),
        allowNull: false,
    },
    start_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    end_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    student_num: {
        type: DataTypes.CHAR(4),
        allowNull: false,
    },
    start_period: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
    },
    end_period: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
    }
},
{ 
    sequelize,
    tableName: 'prior_absence' });

module.exports = PriorAbsence;