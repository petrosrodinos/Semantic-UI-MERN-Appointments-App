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
      req.query.type === "profile"
        ? { clientId: req.userId }
        : { businessId: req.businessId };

    const populate = req.query.type === "profile" ? "businessId" : "clientId";

    const exlude =
      req.query.type === "profile"
        ? "name phone date time -_id"
        : "name phone date time -_id";

    const appointments = await Appointment.find(params, exlude).populate(
      populate,
      exlude
    );

    return res.status(200).json({ message: appointments });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .send({ message: "Could not create your appointment" });
  }
};

exports.createAppointment = createAppointment;
exports.fetchAppointments = fetchAppointments;
