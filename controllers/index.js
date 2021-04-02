const express = require("express");

const router = express.Router();

// getSellers(page,perPage)
router.get("/sellers", (req, res) => {
    res.send('Hello World!')
  }
);

module.exports = router;