
const express = require("express")
const { check, validationResult } = require('express-validator')

const sellers = require("../services/sellers")
const timeSlots = require("../services/timeSlots")

const router = express.Router()

// getSellers(page,perPage,q)
router.get("/",
    [
        check('page', 'page should be a number with minimum of 1')
            .isInt({ min: 0 }),
        check('perPage', 'perPage should be a number with minimum of 1')
            .isInt({ min: 1 }),
        check('q', 'q should be a string with minimum of 1')
            .optional().isString({ min: 1 }),
    ],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const { page, perPage, q } = req.query

        const response = await sellers.getSellers(page, perPage, q).catch(error => res.status(500).json({ errors: error.toString() }))
        res.send(response)
    }
);

// getSellerById(sellerId)
router.get("/:sellerId",
    [
        check('sellerId', 'sellerId is required')
            .exists()
    ],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const { sellerId } = req.params
        const { date } = req.query

        const response = await sellers.getSellerById(sellerId, date).catch(error => res.status(500).json({ errors: error.toString() }))
        res.send(response)
    }
);

// addSellers(body)
router.post("/",
    [
        check('fullName', 'fullName should be a string with minimum length of 1')
            .isString({ min: 1 })
    ],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const { fullName } = req.body

        const response = await sellers.addSeller(fullName).catch(error => res.status(500).json({ error }))
        res.send(response)
    }
);

// addTimeSlotToSeller(sellerId, body)
router.post("/:sellerId/timeslots",
    [
        check('date', 'date should be a valid Date')
            .isISO8601(),
        check('start', 'start should be a String')
            .isString(),
        check('end', 'end should be a String')
            .isString()
    ],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const { date, start, end } = req.body
        const { sellerId } = req.params

        const response = await timeSlots.addTimeSlotToSeller(sellerId, { date, start, end }).catch(error => res.status(500).json({ error }))
        res.send(response)
    }
);

// updateTimeSlotBySeller(sellerId, timeSlotsId, isBooked)
router.put("/:sellerId/timeslots/:timeSlotsId",
    [
        check('isBooked', 'isBooked should be Boolean')
            .isBoolean(),
    ],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const { isBooked } = req.body
        const { sellerId, timeSlotsId } = req.params

        const response = await timeSlots.updateTimeSlotBySeller(sellerId, timeSlotsId, isBooked).catch(error => res.status(500).json({ error }))
        res.send(response)
    }
);

module.exports = router;