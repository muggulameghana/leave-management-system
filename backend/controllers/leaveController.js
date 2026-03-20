const Leave = require("../models/Leave");
const applyLeave = async (req, res) => {
  try {
    const { leaveType, startDate, endDate, reason } = req.body;
    if (!leaveType || !startDate || !endDate || !reason) return res.status(400).json({ message: "All fields required" });
    const leave = await Leave.create({ userId: req.user._id, leaveType, startDate, endDate, reason });
    res.status(201).json({ message: "Leave applied successfully", leave });
  } catch (e) { res.status(500).json({ message: e.message }); }
};
const getLeaves = async (req, res) => {
  try {
    const leaves = req.user.role === "employer"
      ? await Leave.find().populate("userId", "name email role").sort({ createdAt: -1 })
      : await Leave.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json({ count: leaves.length, leaves });
  } catch (e) { res.status(500).json({ message: e.message }); }
};
const updateStatus = async (req, res, status) => {
  try {
    const leave = await Leave.findById(req.params.id);
    if (!leave) return res.status(404).json({ message: "Leave not found" });
    if (leave.status !== "Pending") return res.status(400).json({ message: "Leave already " + leave.status });
    leave.status = status;
    await leave.save();
    res.json({ message: "Leave " + status.toLowerCase() + " successfully", leave });
  } catch (e) { res.status(500).json({ message: e.message }); }
};
const approveLeave = (req, res) => updateStatus(req, res, "Approved");
const rejectLeave  = (req, res) => updateStatus(req, res, "Rejected");
module.exports = { applyLeave, getLeaves, approveLeave, rejectLeave };
