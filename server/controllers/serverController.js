'use strict'

/** Model Required */
const CameraModel = require('../models/cameras');

/** Controller Function */
async function serverController (req, res, next) {
    
    try {
        const dataService = await CameraModel.create({
            microservice_reference: req.body.ref,
            name: req.body.name,
            event: req.body.event,
            event_id: req.body.eventId,
            socket_id: req.body.requestId,
            in: req.body.countersData[0].in,
            out: req.body.countersData[0].out
        });

        res.status(200).json({
            data: dataService,
            message: 'Database register create successfully'
        });
    } catch (error) {
        res.status(400).json({
            data: error
        });   
    }
};

async function testController (req, res, next) {
    res.render('index', { title: 'Juliana' });
}

/** Aux Functions */
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
    testController,
    randomValue
}