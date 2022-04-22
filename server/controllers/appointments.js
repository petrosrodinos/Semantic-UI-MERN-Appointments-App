const Appointment = require("../models/appointment");

const createAppointment = async (req, res, next) => {
  try {
    const { date, timeId, businessId, time } = req.body;
    const appointment = new Appointment({
      date,
      timeId,
      businessId,
      clientId: req.userId,
      time,
    });

    await appointment.save();

    return res.status(200).json({ message: "OK" });
  } catch (error) {
    return res
      .status(400)
      .send({ message: "Could not create your appointment" });
  }
};

const fetchAppointments = async (req, res, next) => {
  try {
    const params =
      req.query.type === "user"
        ? { clientId: req.userId }
        : { businessId: req.businessId };

    const populate = req.query.type === "user" ? "businessId" : "clientId";

    const appointments = await Appointment.find(params, "-timeId").populate(
      populate,
      "name phone -_id"
    );

    return res.status(200).json({ message: appointments });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .send({ message: "Could not find your appointments" });
  }
};

const changeAppointmentStatus = async (req, res, next) => {
  try {
    const { status, role } = req.body;

    let populate = role === "user" ? "businessId" : "clientId";

    console.log(populate);

    const appointment = await Appointment.findById(req.params.id).populate(
      populate,
      "name phone"
    );

    if (!appointment) {
      return res
        .status(400)
        .send({ message: "Something went wrong please try again" });
    }

    if (
      !role ||
      (String(role) === "user" &&
        String(req.userId) !== String(appointment.clientId._id))
    ) {
      return res.status(401).send({
        message: "You are not authorized to change this appointment.",
      });
    }

    if (
      !role ||
      (String(role) === "business" &&
        String(req.businessId) !== String(appointment.businessId._id))
    ) {
      return res
        .status(401)
        .send({ message: "You are not authorized to change this appointment" });
    }

    appointment.status = status;

    await appointment.save();

    return res.status(200).json({ message: appointment });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .send({ message: "Could not change your appointment status" });
  }
};

exports.createAppointment = createAppointment;
exports.fetchAppointments = fetchAppointments;
exports.changeAppointmentStatus = changeAppointmentStatus;
