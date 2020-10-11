const { Sequelize, DataTypes, Model, ForeignKeyConstraintError, Op } = require('sequelize');
const { sequelize } = require('../../loaders/database');
const Exceptions = require('../../errors/repositoriesExceptions');

class PreAbsence extends Model {

    static async findPriorAbsenceByDate(date) {
        const absence_entities = await PriorAbsence.findAll({
            where: {
                start_date: {
                    [Op.gte]: date,
                },
                end_date: {
                    [Op.lte]: date,
                },
            }
        });
        if (!absence_entities) {
            throw new Exceptions.NotFoundDataException;
        }

        const result = absence_entities.map((entity) => {
            const pre_absence = entity.dataValues;
            pre_absence.start_date = new Date(pre_absence.start_date);
            pre_absence.end_date = new Date(pre_absence.end_date);
            return pre_absence;
        });
        return result;
    }

    static async createPriorAbsence(teacher_id, student_num, term, state) {
        try {
            await PriorAbsence.create({
                teacher_id: teacher_id,
                start_date: term.start_date,
                end_date: term.end_date,
                student_num: student_num,
                start_period: term.start_period,
                end_period: term.end_period,
                state: state,
            });
        }
        catch (e) {
            console.log(e);
            if (e instanceof ForeignKeyConstraintError) {
                throw new Exceptions.NotFoundDataException;
            }
        }
    }

    static async deletePreAbsenceById(id) {
        let num_of_destroyed;
        try {
            num_of_destroyed = await PriorAbsence.destroy({
                where: {
                    id: id
                }
            });   
        } catch (e) {
            throw e;
        }
        if(num_of_destroyed <= 0) {
            throw new Exceptions.NotFoundDataException;
        }
    }


}


PreAbsence.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
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
    },
    state: {
        type: DataTypes.CHAR(4),
        allowNull: false,
    }
},
    {
        sequelize,
        tableName: 'pre_absence'
    });

module.exports = PreAbsence;