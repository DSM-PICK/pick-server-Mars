const assert = require('assert');

const StudentService = require('../../services/studentService');
const StudentRepository = require('../fakes/fakeStudentRepository');
const Exceptions = require('../../errors/servicesExceptions');

describe('test to get expected student by input text', () => {
    const student_service = new StudentService(StudentRepository);
    describe('success', () => {
        it('given complete student number', async () => {
            const results = await student_service.expect_by_input('1111');
            assert.deepEqual(results, ['1111 손정우']);
        });
        it('given incomplete student number', async () => {
            const results = await student_service.expect_by_input('24');
            assert.deepEqual(results, ['2401 김대웅', '2411 손정우', '2417 이진혁']);
        });
        it('given complete student name', async () => {
            const results = await student_service.expect_by_input('손정우');
            assert.deepEqual(results, ['1111 손정우', '2411 손정우']);
        });
        it('given incomplete student name', async () => {
            const results = await student_service.expect_by_input('김');
            assert.deepEqual(results, ['1101 김대웅', '2401 김대웅']);
        });
        it('given complete student number and name', async () => {
            const results = await student_service.expect_by_input('2411 손정우');
            assert.deepEqual(results, ['2411 손정우']);
        });
        it('given incomplete student number and name', async () => {
            const results = await student_service.expect_by_input('2411 손');
            assert.deepEqual(results, ['2411 손정우']);
        });
        it('can\'t find any thing', async () => {
            const results = await student_service.expect_by_input('2455');
            assert.deepEqual(results, []);
        });
    });
    describe('fail', () => {
        it('invalid input', async () => {
            await assert.rejects(student_service.expect_by_input(''),
                Exceptions.InvalidGivenDataException);
        });
    });
});


