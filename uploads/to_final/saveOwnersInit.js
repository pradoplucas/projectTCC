const Person = require('../../app/models/Person.model');
const ownersJSON = require('./owners.json')

// fs.readFile('./events.json', 'utf8', (err, data) => {
//     console.log(data)
// });
let countS = 0;
let countE = 0;


ownersJSON.forEach(ownerOne => {


    new Person(ownerOne).save().then(() => {
        countS++;
        console.log(countS);
    }).catch((err) => {
        countE++;
        console.log(countE);
    });
    
});