import mongoose from "mongoose";

const { Schema } = mongoose;

/**
 * Role Schema
 * @description Schema definition for the Role model that defines user permissions
 */
const RoleSchema = new Schema(
  {
    /**
     * Role name
     * @type {String}
     * @description Defines the name of the role (e.g., 'admin', 'user', etc.)
     */
    name: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Transform the document before returning to client
 * @returns {Object} - Modified role object without __v and with id instead of _id
 */
RoleSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

export default mongoose.model("RoleModel", RoleSchema);
