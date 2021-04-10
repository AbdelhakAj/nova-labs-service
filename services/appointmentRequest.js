const Seller = require('../models/seller')
const TimeSlot = require('../models/timeSlot')
const AppointmentRequest = require('../models/appointmentRequest')
const errorHandler = require('../utils/errorHandler')


const getRequestsByIds = async (requestsIds, date) => {
    const response = await AppointmentRequest.find({ _id: { $in: requestsIds } })
        .catch(error => {
            errorHandler(error, '[appointmentRequest] error in services/appointmentRequest getRequestsByIds')
        })

    return response
}

const getRequests = async (sellerId, timeSlotsId) => {
    const timeSlot = await TimeSlot.findById(timeSlotsId)
        .catch(error => {
            errorHandler(error, '[appointmentRequest] error in services/appointmentRequest getRequests')
        })

    const response = await AppointmentRequest.find({ _id: { $in: timeSlot.appointmentRequests } })
        .catch(error => {
            errorHandler(error, '[appointmentRequest] error in services/appointmentRequest getRequests')
        })

    return response
}

const addRequestToTimeSlot = async (sellerId, timeSlotsId, body) => {
    // TODO: check if seller exist and is owner of the time slot

    // add requestedBy //////////////
    const request = await AppointmentRequest.create(body).catch(error => {
        errorHandler(error, '[appointmentRequest] error in services/appointmentRequest addRequestToTimeSlot')
    })

    const response = await TimeSlot.findByIdAndUpdate(
        timeSlotsId,
        { $push: { appointmentRequests: { $each: [request._id] } } }
    ).catch(error => {
        errorHandler(error, '[appointmentRequest] error in services/appointmentRequest addRequestToTimeSlot')
    })

    return response
}

const updateRequest = async (sellerId, timeSlotsId, requestId, body) => {
    // TODO: check if seller exist and is owner of the time slot
    const response = await AppointmentRequest.findByIdAndUpdate(requestId, body).catch(error => {
        errorHandler(error, '[appointmentRequest] error in services/appointmentRequest updateRequest')
    })

    return response
}

module.exports = {
    addRequestToTimeSlot,
    updateRequest,
    getRequestsByIds,
    getRequests
};