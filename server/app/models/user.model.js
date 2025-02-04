import mongoose from "mongoose";

const { Schema } = mongoose;

/**
 * User Schema
 * @description Schema definition for the User model
 */
const UserSchema = new Schema(
  {
    /**
     * User's first name
     * @type {String}
     * @required
     */
    firstName: {
      type: String,
      required: [true, "first name is required!"],
      trim: true,
      minlength: [2, "first name is too short!"],
      maxlength: [28, "first name is too long!"],
    },
    /**
     * User's last name
     * @type {String}
     * @required
     */
    lastName: {
      type: String,
      required: [true, "last name is required!"],
      trim: true,
      minlength: [2, "last name is too short!"],
      maxlength: [28, "last name is too long!"],
    },
    /**
     * User's email address
     * @type {String}
     * @required
     */
    email: {
      type: String,
      required: [true, "Email not provided!"],
      trim: true,
      minlength: [2, "Email is too short!"],
    },
    /**
     * User's password (hashed)
     * @type {String}
     * @required
     */
    password: {
      type: String,
      required: [true, "Password is required!"],
      trim: true,
      minlength: [8, "Password is too short!"],
    },
    /**
     * User's role reference
     * @type {ObjectId}
     * @ref RoleModel
     * @required
     */
    role: {
      type: Schema.Types.ObjectId,
      ref: "RoleModel",
      required: [true, "Please specify user role"],
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Transform the document before returning to client
 * @returns {Object} - Modified user object without __v and with id instead of _id
 */
UserSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

export default mongoose.model("UserModel", UserSchema);
