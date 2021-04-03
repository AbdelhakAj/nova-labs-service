const Seller = require('../models/seller')
const errorHandler = require('../utils/errorHandler')

const getSellers = (page, perPage, q) => {
    const query = q ? {"fullName" : {$regex : `.*${q}.*`}} : {}
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

const addSeller = (fullName) => {
    return Seller
    .create({fullName}).catch(error => {
        errorHandler(error, '[sellers] error in services/sellers addSeller')
    })
}

module.exports = {
    getSellers,
    addSeller
};