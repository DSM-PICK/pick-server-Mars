const assert = require('assert');
const repo = require('../fakes/fakeActivityRepository');
const { NotFoundDataException } = require('../../errors/repositoriesExceptions');

const entities = [
    {
        date: "2019-12-24",
        schedule: "club",
        second_floor_teacher_id: 'Kim',
        third_floor_teacher_id: 'Ahn',
        forth_floor_teacher_id: 'Ahn'
    },
    {
        date: '2020-08-24',
        schedule: 'club',
        second_floor_teacher_id: 'Kim',
        third_floor_teacher_id: 'Ahn',
        forth_floor_teacher_id: 'Jwa'
    },
    {
        date: '2020-09-12',
        schedule: 'club',
        second_floor_teacher_id: 'Son',
        third_floor_teacher_id: 'Lee',
        forth_floor_teacher_id: 'Yoo'
    },
    {
        date: "2021-01-24",
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
                const result = await repo.findByDate(new Date('2020-08-24'));
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
});