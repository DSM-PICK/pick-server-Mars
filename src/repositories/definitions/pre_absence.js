const { Sequelize, DataTypes, Model, ForeignKeyConstraintError, Op } = require('sequelize');
const { sequelize } = require('../../loaders/database');
const Exceptions = require('../../errors/servicesExceptions');
const ServiceDate = require('../../utils/time');
const Student = require('./student');
const Teacher = require('./teacher');

class PreAbsence extends Model {
    static async findByTerm(term) {
        const absence_entities = await PreAbsence.findAll({
            include: [{model: Student, as: 'student'}],
            where: Sequelize.or(
                Sequelize.or(
                    Sequelize.and(
                        { start_date: { [Op.lte]: term.end_date.toJSDate() } },
                        { start_date: { [Op.gte]: term.start_date.toJSDate() } }
                    ),
                    Sequelize.and(
                        { end_date: { [Op.lte]: term.end_date.toJSDate() } },
                        { end_date: { [Op.gte]: term.start_date.toJSDate() } }
                    ),
                ),
                Sequelize.or(
                    Sequelize.and(
                        { start_date: { [Op.gte]: term.start_date.toJSDate() } },
                        { end_date: { [Op.lte]: term.start_date.toJSDate() } }
                    ),
                    Sequelize.and(
                        { start_date: { [Op.gte]: term.end_date.toJSDate() } },
                        { end_date: { [Op.lte]: term.end_date.toJSDate() } }
                    ),
                ),
            )
        });
        if (!absence_entities) {
            throw new Exceptions.NotFoundDataException;
        }

        const result = absence_entities.map((entity) => {
            const pre_absence = entity.dataValues;
            let result = {};
            result.id = pre_absence.id;
            result.student_num = pre_absence.student_num;
            result.start_period = pre_absence.start_period;
            result.end_period = pre_absence.end_period;
            result.state = pre_absence.state;
            result.name = pre_absence.student.name;
            result.start_date = new ServiceDate(pre_absence.start_date);
            result.end_date = new ServiceDate(pre_absence.end_date);

            return result;
        });
        return result;
    }

    static async findAllPreAbsence() {
        const absence_entities = await PreAbsence.findAll({
            include: [{model: Student, as: 'student'}, {model: Teacher, as: 'teacher'}],
            order: [['start_date', 'DESC']]
        });
        if (!absence_entities) {
            throw new Exceptions.NotFoundDataException;
        }

        const result = absence_entities;
        return result;
    }
    static async findPreAbsenceByDate(date) {
        const absence_entities = await PreAbsence.findAll({
            include: [{model: Student, as: 'student'}, {model: Teacher, as: 'teacher'}],
            where: {
                start_date: {
                    [Op.lte]: date.toJSDate(),
                },
                end_date: {
                    [Op.gte]: date.toJSDate(),
                },
            }
        });
        if (!absence_entities) {
            throw new Exceptions.NotFoundDataException;
        }
        const result = absence_entities;
        return result;
    }

    static async createPreAbsence(teacher_id, student_num, term, state, reason, memo) {
        try {
            await PreAbsence.create({
                teacher_id: teacher_id,
                start_date: term.start_date.toJSDate(),
                end_date: term.end_date.toJSDate(),
                student_num: student_num,
                start_period: term.start_period,
                end_period: term.end_period,
                state: state,
                remarks: reason,
                memo: memo
            });
        }
        catch (e) {
            if (e instanceof ForeignKeyConstraintError) {
                throw new Exceptions.NotFoundDataException;
            }
            else{
                throw e;
            }
        }
    }
    static async modifyPreAbsence(pre_absence_id, teacher_id, student_num, term, state, reason, memo) {
        try {
            await PreAbsence.update({
                teacher_id: teacher_id,
                start_date: term.start_date.toJSDate(),
                end_date: term.end_date.toJSDate(),
                student_num: student_num,
                start_period: term.start_period,
                end_period: term.end_period,
                state: state,
                remarks: reason,
                memo: memo
            }, {
                where: {
                    id: pre_absence_id
                }
            });
        }
        catch (e) {
            console.log(e);
            if (e instanceof ForeignKeyConstraintError) {
                throw new Exceptions.NotFoundDataException;
            }
            else {
                throw e;
            }
        }
    }

    static async deletePreAbsenceById(id) {
        let num_of_destroyed;
        try {
            num_of_destroyed = await PreAbsence.destroy({
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

    static async findById(id) {
        const absence_entities = await PreAbsence.findAll({
            where: {
                id: id
            }
        });
        if (!absence_entities) {
            throw new Exceptions.NotFoundDataException;
        }

        const result = absence_entities.map((entity) => {
            const pre_absence = entity.dataValues;
            pre_absence.start_date = new ServiceDate(pre_absence.start_date);
            pre_absence.end_date = new ServiceDate(pre_absence.end_date);
            return pre_absence;
        });
        return result;
    }

    toJSON() {
        return {
            id: this.id,
            stdnum: this.student_num,
            name: this.student.name,
            start_date: this.start_date,
            start_period: this.start_period,
            end_date: this.end_date,
            end_period: this.end_period,
            state: this.state,
            teacher: this.teacher.name,
            reason: this.remarks,
            memo: this.memo
        }
    }

    getStartDate() {
        return new ServiceDate(this.start_date);
    }

    getEndDate() {
        return new ServiceDate(this.end_date);
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
    },
    remarks: {
        type: DataTypes.STRING(400),
    },
    memo: {
        type: DataTypes.STRING(80)
    }
},
    {
        sequelize,
        tableName: 'pre_absence'
    });

module.exports = PreAbsence;
