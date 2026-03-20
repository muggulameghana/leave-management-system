const express = require("express");
const router = express.Router();
const { applyLeave, getLeaves, approveLeave, rejectLeave } = require("../controllers/leaveController");
const { protect, employerOnly } = require("../middleware/authMiddleware");
router.post("/", protect, applyLeave);
router.get("/", protect, getLeaves);
router.patch("/:id/approve", protect, employerOnly, approveLeave);
router.patch("/:id/reject", protect, employerOnly, rejectLeave);
module.exports = router;
