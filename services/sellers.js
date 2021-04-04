const Seller = require('../models/seller')
const timeSlots = require("../services/timeSlots")
const errorHandler = require('../utils/errorHandler')

const getSellers = (page, perPage, q) => {
    const query = q ? { "fullName": { $regex: `.*${q}.*` } } : {}
    const skip = page * perPage
    const limit = +perPage
    const response = Seller
        .find(query)
        .skip(skip)
        .limit(limit)
        .catch(error => {
            errorHandler(error, '[sellers] error in services/sellers getSellers')
        })
    return response
}

const getSellerById = async (sellerId, date) => {
    const sellerResponse = await Seller.findById(
        sellerId
    ).catch(error => {
        errorHandler(error, '[sellers] error in services/sellers getSellerById')
    })

    const timeSlotsResponse = await timeSlots.getTimeSlotsByIds(sellerResponse.timeSlots, date)
    const response = {...sellerResponse.toObject(), timeSlots: timeSlotsResponse}

    return response
}

const addSeller = (fullName) => {
    const response = Seller
        .create({ fullName }).catch(error => {
            errorHandler(error, '[sellers] error in services/sellers addSeller')
        })

    return response
}

module.exports = {
    getSellers,
    getSellerById,
    addSeller
};