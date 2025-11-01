import mongoose from 'mongoose';

const engagementSchema = new mongoose.Schema({
  postId: String,
  likes: Number,
  comments: Number,
  timestamp: Date,
});

const analyticsSchema = new mongoose.Schema({
  followerGrowth: [Number],
  engagement: [engagementSchema],
  bestTimeToPost: String,
});

const Analytics = mongoose.model('Analytics', analyticsSchema);
export default Analytics;
