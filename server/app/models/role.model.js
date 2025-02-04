import mongoose from "mongoose";

const { Schema } = mongoose;

const RoleSchema = new Schema(
  {
    name: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

RoleSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

export default mongoose.model("RoleModel", RoleSchema);
