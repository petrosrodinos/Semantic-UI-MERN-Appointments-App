const express = require("express");
const appointmentsController = require("../controllers/appointments");
const { protect } = require("../middleware/check-auth");

const router = express.Router();

router.post("/appointment", protect, appointmentsController.createAppointment);
router.get("/appointment", protect, appointmentsController.fetchAppointments);
router.patch(
  "/appointment/:id",
  protect,
  appointmentsController.changeAppointmentStatus
);

module.exports = router;
