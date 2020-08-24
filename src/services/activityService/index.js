class ActivityService {

    async getThisDateActivity(str_date) {
        if(isValidDate(str_date) == false) {
            throw new InvalidDateException;
        }



    }

}

function isValidDate(str) {
	if  ( !/([0-9]{4})-([0-9]{2})-([0-9]{2})/.test(str) )  {
		return false;
	}
	
	var splited_date = str.split('-');
	var max_day = new Date(new Date(splited_date[0], splited_date[1], 1) - 86400000).getDate();
	
	if  ( splited_date[1] < 1 || splited_date[1] > 12  )  {
		return false;
	}
	if  ( splited_date[2] > max_day )  {
		return false;
	}
	return true;
}

class InvalidDateException extends Error {
    constructor() {
        super('Given date is not valid');
    }
}

class NotFoundDataException extends Error{
    constructor() {
        super('Couldn\'t found data in given date');
    }
}
module.exports = {
    ActivityService,
    Exceptions: {
        InvalidDateException,
        NotFoundDataException
    }
};