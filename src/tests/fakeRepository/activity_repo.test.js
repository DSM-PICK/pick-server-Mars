const assert = require('assert');
const repo = require('../fakes/fakeActivityRepository');
const { NotFoundDataException } = require('../../errors/repositoriesExceptions');
const { getLastDateOfLastYear, newToday, newDateNDayAwayFromToday, getFirstDateOfNextYear } = require('../../utils');

const entities = [
    {
        date: getLastDateOfLastYear(),
        schedule: "club",
        second_floor_teacher_id: 'Kim',
        third_floor_teacher_id: 'Ahn',
        forth_floor_teacher_id: 'Ahn'
    },
    {
        date: new Date(newToday().getUTCFullYear() + '-08-11'),
        schedule: 'club',
        second_floor_teacher_id: 'Kim',
        third_floor_teacher_id: 'Ahn',
        forth_floor_teacher_id: 'Jwa'
    },
    {
        date: new Date(newToday().getUTCFullYear() + '-08-12'),
        schedule: 'club',
        second_floor_teacher_id: 'Son',
        third_floor_teacher_id: 'Yoo',
        forth_floor_teacher_id: 'Lee'
    },{
        date: new Date(newToday().getUTCFullYear() + '-08-13'),
        schedule: 'club',
        second_floor_teacher_id: 'Son',
        third_floor_teacher_id: 'Yoo',
        forth_floor_teacher_id: 'Lee'
    },
    {
        date: getFirstDateOfNextYear(),
        schedule: "club",
        second_floor_teacher_id: 'Kim',
        third_floor_teacher_id: 'Ahn',
        forth_floor_teacher_id: 'Ahn'
    }
];


describe('Activity Repository test', () => {
    describe('findByDate', () => {
        it('success', async () => {
            try{
                const result = await repo.findByDate(new Date(newToday().getUTCFullYear() + '-08-11'));
                assert.deepStrictEqual(result, entities[1]);
            }
            catch(e) {
                assert.fail(e.message);
            }
        });
        it('not found', async () => {
            await assert.rejects(repo.findByDate(new Date('2025-08-24')), NotFoundDataException);
        });
    });

    describe('findByYearAndMonth', () => {
        it('success', async () => {
            try{
                const result = await repo.findByYearAndMonth(newToday().getUTCFullYear(), 8);
                assert.deepStrictEqual(result, [entities[1],entities[2],entities[3]]);
            }
            catch(e) {
                assert.fail(e.message);
            }
        });
    });
});