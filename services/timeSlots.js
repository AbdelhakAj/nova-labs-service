const Seller = require('../models/seller')
const TimeSlot = require('../models/timeSlot')
const errorHandler = require('../utils/errorHandler')


const getTimeSlotsByIds = async (timeSlotsIds, date) => {
    // TODO: check if seller exits and is owner of this timeSlot

    const start = new Date(date)
    start.setUTCHours(0)
    start.setMinutes(0)
    start.setSeconds(1)
    const end = new Date(date)
    end.setUTCHours(23)
    end.setMinutes(59)
    end.setSeconds(59)

    const query = date
        ? {
            _id: { $in: timeSlotsIds },
            date: {
                $gte: new Date(start),
                $lt: new Date(end)
            }
        }
        : { _id: { $in: timeSlotsIds } }

    const response = await TimeSlot.find(query)
        .catch(error => {
            errorHandler(error, '[timeSlots] error in services/timeSlots updateTimeSlotBySeller/TimeSlot')
        })

    return response
}

const addTimeSlotToSeller = async (sellerId, body) => {
    const timeSlot = await TimeSlot.create(body).catch(error => {
        errorHandler(error, '[timeSlots] error in services/timeSlots addTimeSlotToSeller/TimeSlot')
    })

    const response = await Seller.findByIdAndUpdate(
        sellerId,
        { $push: { timeSlots: { $each: [timeSlot._id] } } }
    ).catch(error => {
        errorHandler(error, '[timeSlots] error in services/timeSlots addTimeSlotToSeller/Seller')
    })

    return response
}

const updateTimeSlotBySeller = async (sellerId, timeSlotsId, isBooked) => {
    // TODO: finish

    const seller = await Seller.findById(
        sellerId
    ).catch(error => {
        errorHandler(error, '[timeSlots] error in services/timeSlots updateTimeSlotBySeller/Seller')
    })

    console.log('seller =========================', seller)

    const response = await TimeSlot.findByIdAndUpdate(timeSlotsId,
        { isBooked: isBooked }
    ).catch(error => {
        errorHandler(error, '[timeSlots] error in services/timeSlots updateTimeSlotBySeller/TimeSlot')
    })

    return response
}

module.exports = {
    addTimeSlotToSeller,
    updateTimeSlotBySeller,
    getTimeSlotsByIds
};