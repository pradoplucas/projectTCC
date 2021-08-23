const Event = require('../../app/models/Event.model');
const eventsJSON = require('./events.json')

// fs.readFile('./events.json', 'utf8', (err, data) => {
//     console.log(data)
// });
let countS = 0;
let countE = 0;


eventsJSON.forEach(eventOne => {


    new Event(eventOne).save().then(() => {
        countS++;
    }).catch((err) => {
        countE++;
    });
    
});

console.log('Success: ' + countS + '\nError: ' + countE);