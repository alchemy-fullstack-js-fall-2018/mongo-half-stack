const uuid = require('uuid/v4');

module.exports = class Job {
    constructor(title, desc, salary) {
        this.id = uuid();
        this.title = title;
        this.desc = desc;
        this.salary = salary;
    }
};
