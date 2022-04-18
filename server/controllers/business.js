const Business = require("../models/business");
const Comment = require("../models/comment");
const cloudinary = require("../utils/cloudinary");
const User = require("../models/user");
const Appointment = require("../models/appointment");

const uploader = async (path) => await cloudinary.uploads(path);

const createBusiness = async (req, res, next) => {
  //const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return next(
  //     new HttpError("Invalid inputs passed, please check your data.", 422)
  //   );
  // }

  //const userId = req.params.uid;

  const {
    name,
    email,
    ownername,
    phone,
    city,
    area,
    address,
    type,
    userId,
    images,
    description,
    hours,
  } = req.body;

  let existingUser;
  let existingBusiness;

  try {
    existingUser = await User.findById(userId);
    existingBusiness = await Business.find({ userId: userId });
  } catch (err) {
    return res.status(400).send({ message: "Could not find user" });
  }

  if (!existingUser) {
    return res.status(400).send({ message: "Could not find user" });
  }

  if (!existingUser.business.hasBusiness) {
    return res.status(400).send({ message: "You dont have a business" });
  }

  // if (existingBusiness) {
  //   const error = new HttpError("You have already created your business", 500);
  //   console.log(existingBusiness);
  //   return next(error);
  // }

  const imagesArray = [];
  for (const image of images) {
    const imageUrl = await uploader(image);
    imagesArray.push(imageUrl);
  }

  const createdBusiness = new Business({
    userId,
    name,
    email,
    ownername,
    phone,
    city,
    area,
    address,
    type,
    description,
    hours,
    images: imagesArray,
  });

  try {
    await createdBusiness.save();
    existingUser.business.businessId = createdBusiness._id;
    await existingUser.save();
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .send({ message: "Could not create your business please try later" });
  }

  res.status(200).json({ message: "OK" });
};

const fetchBusinesses = async (req, res, next) => {
  try {
    const businesses = await Business.find({});
    return res.status(200).json({ businesses: businesses });
  } catch (error) {
    return res.status(400).send({ message: "Could not find any business" });
  }
};

const fetchBusiness = async (req, res, next) => {
  try {
    const business = await Business.findById(req.params.id);
    return res.status(200).json({ business: business });
  } catch (error) {
    return res.status(400).send({ message: "Could not find any business" });
  }
};

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

    return res.status(200).json({ message: "OK" });
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

exports.createBusiness = createBusiness;
exports.fetchBusinesses = fetchBusinesses;
exports.fetchBusiness = fetchBusiness;
exports.createComment = createComment;
exports.fetchComments = fetchComments;
