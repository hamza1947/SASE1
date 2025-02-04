import mongoose from "mongoose";

const { Schema } = mongoose;

const PostSchema = new Schema(
  {
    title: {
      type: String,
    },
    content: {
      type: String,
    },
    user: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

PostSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

export default mongoose.model("PostModel", PostSchema);
