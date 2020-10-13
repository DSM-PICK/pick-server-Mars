const { Sequelize, DataTypes, Model, Op } = require('sequelize');
const { sequelize } = require('../../loaders/database');
const Errors = require('../../errors/repositoriesExceptions');

const Teacher = require('../../repositories').Teacher;

class Activity extends Model {
    static async findByDate(date) {
        const activity_entity = await Activity.findOne({ where: { date: date } });
        if (!activity_entity) {
            throw new Errors.NotFoundDataException;
        }
        return activity_entity.dataValues;
    }

    static async findByYearAndMonth(year, month) {
        const activity_entities = await Activity.findAll({
            where: {
                date: {
                    [Op.lte]: new Date(year, month),
                    [Op.gte]: new Date(new Date(year, month, 1) - 86400000),
                }
            }
        });
        if (!activity_entities) {
            throw new Errors.NotFoundDataException;
        }
        return activity_entities.map((entity) => { return entity.dataValues; });
    }

    static async findBetweenTermWithTeacher(term) {
        const activity_entities = await Activity.findAll({
            include: [{
                model: Teacher,
                as: 'floor2'
            },
            {
                model: Teacher,
                as: 'floor3'
            },
            {
                model: Teacher,
                as: 'floor4'
            },
            ],
            where: {
                date: {
                    [Op.lte]: term.start_date,
                    [Op.gte]: term.end_date,
                }
            }
        });

        if (!activity_entities) {
            throw new Error.NotFoundDataException;
        }

        return activity_entities.map((entity) => { 
            entity = entity.dataValues;
            entity.floor2 = entity.floor2.dataValues;
            entity.floor3 = entity.floor3.dataValues;
            entity.floor4 = entity.floor4.dataValues;
            
            return entity;
        });
    }

    static async updateAutoDetect(activity) {
        return await Activity.update(activity, {
            where: {
                date: new Date(activity.date)
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
        tableName: 'activity'
    });

module.exports = Activity;