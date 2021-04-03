const express = require("express")

const router = express.Router()

router.use("/api/sellers", require("./sellers"));

router.get("*", function (req, res) {
  res.status(404)
  res.send({
    status: 404,
    message: "No service found",
    type: "request"
  });
  console.error("No api rest service found. Request url: " + req.originalUrl);
});

module.exports = router;