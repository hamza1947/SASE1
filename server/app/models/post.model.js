import mongoose from "mongoose";

const { Schema } = mongoose;

/**
 * Post Schema
 * @description Schema definition for the Post model that stores user posts
 */
const PostSchema = new Schema(
  {
    /**
     * Post title
     * @type {String}
     * @description The title of the post
     */
    title: {
      type: String,
    },
    /**
     * Post content
     * @type {String}
     * @description The main content/body of the post
     */
    content: {
      type: String,
    },
    /**
     * Post author
     * @type {String}
     * @description The user who created the post
     */
    user: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Transform the document before returning to client
 * @returns {Object} - Modified post object without __v and with id instead of _id
 */
PostSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

export default mongoose.model("PostModel", PostSchema);
