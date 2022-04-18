const Comment = require("../models/comment");
const Appointment = require("../models/appointment");

const createComment = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { ucomment, rating, businessId } = req.body;
    let userMadeAppointment;

    userMadeAppointment = await Appointment.find({
      clientId: userId,
      businessId: businessId,
    });

    if (userMadeAppointment.length <= 0) {
      return res.status(401).json({
        message: "You have to book an appointment to leave a comment",
      });
    }

    const comment = new Comment({
      comment: ucomment,
      rating,
      clientId: userId,
      businessId,
    });

    await comment.save();

    return res.status(200).json({ comment: comment });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: "Could not create your comment" });
  }
};

const fetchComments = async (req, res, next) => {
  try {
    const businessId = req.params.id;
    const comments = await Comment.find({ businessId: businessId }).populate(
      "clientId",
      "name -_id"
    );
    return res.status(200).json({ comments: comments });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: "Could not find any comments" });
  }
};

const fetchUserComments = async (req, res, next) => {
  try {
    const userId = req.params.id;

    const comments = await Comment.find({ clientId: userId }).populate(
      "businessId",
      "name"
    );
    return res.status(200).json({ comments: comments });
  } catch (error) {
    console.log(error);
    return res.status(404).send({ message: "Could not find any comments" });
  }
};

const deleteComment = async (req, res, next) => {
  try {
    const commentId = req.params.id;

    const comment = await Comment.findByIdAndDelete(commentId);
    return res.status(200).json({ id: comment._id });
  } catch (error) {
    console.log(error);
    return res.status(404).send({ message: "Could not find any comments" });
  }
};

exports.fetchUserComments = fetchUserComments;
exports.createComment = createComment;
exports.fetchComments = fetchComments;
exports.deleteComment = deleteComment;
