import mongoose from 'mongoose';

const influencerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    followers: {
      type: Number,
      required: true,
    },
    engagementRate: {
      type: Number,
      required: true,
    },
    socialMedia: {
      instagram: {
        type: Boolean,
        required: true,
      },
      youtube: {
        type: Boolean,
        required: true,
      },
      twitter: {
        type: Boolean,
        required: true,
      },
      tiktok: {
        type: Boolean,
        required: true,
      },
      facebook: {
        type: Boolean,
        required: true,
      },
    },
    audienceDemographics: {
      ageRange: {
        type: String,
        required: true,
      },
      gender: {
        type: String,
        required: true,
      },
      location: {
        type: String,
        required: true,
      },
    },
    interests: {
      fashion: {
        type: Boolean,
        required: true,
      },
      beauty: {
        type: Boolean,
        required: true,
      },
      fitness: {
        type: Boolean,
        required: true,
      },
      travel: {
        type: Boolean,
        required: true,
      },
      food: {
        type: Boolean,
        required: true,
      },
      gaming: {
        type: Boolean,
        required: true,
      },
      technology: {
        type: Boolean,
        required: true,
      },
      lifestyle: {
        type: Boolean,
        required: true,
      },
    },
    pastCollaborations: {
      type: String,
      required: true,
    },
    videoUrls: {
      type: Array,
      required: true,
    },
    userRef: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Influencer = mongoose.model('Influencer', influencerSchema);

export default Influencer;
