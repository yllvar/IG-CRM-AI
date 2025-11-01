import mongoose from "mongoose";

const contentIdeaSchema = new mongoose.Schema({
  topic: String,
  niche: String,
  idea: String,
  caption : String,
  hashtags: String,
  hook: String,
  createdAt: { type: Date, default: Date.now },
});

const ContentIdea = mongoose.model("ContentIdea", contentIdeaSchema);

export default ContentIdea;
