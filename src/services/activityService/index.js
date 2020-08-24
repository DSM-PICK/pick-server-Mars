class ActivityService {

}


const InvalidDateException = new Error('Given date is not valid');
const NotFoundDataException = new Error('Couldn\'t found data in given date');

module.exports = {
    ActivityService,
    Exceptions: {
        InvalidDateException,
        NotFoundDataException
    }
};