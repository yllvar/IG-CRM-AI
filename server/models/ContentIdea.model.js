import mongoose from "mongoose";

const contentIdeaSchema = new mongoose.Schema({
  topic: { type: String, required: true },
  niche: { type: String, required: true },
  idea: { type: String, required: true },
  caption : { type: String, required: true },
  hashtags: { type: String, required: true },
  hook: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const ContentIdea = mongoose.model("ContentIdea", contentIdeaSchema);

export default ContentIdea;
