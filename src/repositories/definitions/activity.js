const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('../../loaders/database');
const Errors = require('../../errors/repositoriesExceptions');

class Activity extends Model {
    static async findByDate(date) {
        const activity_entity = await Activity.findOne({where: {date: date}});
        if(activity_entity == null) {
            throw new Errors.NotFoundDataException;
        }
        return activity_entity.dataValues;
    }

    static async findByYearAndMonth(year, month) {
        const activity_entities = await Activity.findAll({where: {
            date: {
                [Op.lte]: new Date(year, month),
                [Op.gte]: new Date(new Date(year, month, 1) - 86400000),
            }
        }});
        if(activity_entities == null) {
            throw new Errors.NotFoundDataException;
        }
        return activity_entities.map((entity) => { return entity.dataValues;});
    }

    static async updateAutoDetect(activity) {
        return await Activity.update(activity, {
            where: {
                id: activity.id
            }
        });
    }

}

Activity.init({
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        primaryKey: true
    },
    schedule: {
        type: DataTypes.STRING(28),
        allowNull: false
    },
    second_floor_teacher_id: {
        type: DataTypes.STRING(16)
    },
    third_floor_teacher_id: {
        type: DataTypes.STRING(16)
    },
    forth_floor_teacher_id: {
        type: DataTypes.STRING(16)
    },
},
{ 
    sequelize,
    tableName: 'activity' });

module.exports = Activity;