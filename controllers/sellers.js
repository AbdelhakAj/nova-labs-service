
const express = require("express")
const { check, validationResult } = require('express-validator')

const sellers = require("../services/sellers")

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
        const {
            fullName
        } = req.body

        const response = await sellers.addSeller(fullName).catch(error => res.status(500).json({ error }))
        res.send(response)
    }
);

module.exports = router;