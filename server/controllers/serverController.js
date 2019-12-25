'use strict'

/** Controller Function */
async function serverController (req, res, next) {
    
    console.log(req.body);
    
    res.status(200).json({
        data: 'Request received from client'
    });
};

/** Aux Function */
function randomValue(payload, events) {
    let eventIndex = null;

    if (payload.event === 'count') {
        events.find((element, index) => {
            if (element.name == payload.name) {
                eventIndex = index;
                return true
            }
        });

        if ((typeof eventIndex !== null) || eventIndex < 0) {
            if ((Math.floor(Math.random() * 9) + 1) >= 5) {
                events[eventIndex].in += 1;
            }
            events[eventIndex].out += 1;
        }
    }
}

module.exports = {
    serverController,
    randomValue
}