import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    realUrl: { 
      type: String, 
      required: true 
    },

    shortUrl: { 
      type: String, 
      required: true,
      unique: true 
    },

    customUrl: { 
      type: String,
      unique: true, 
      sparse: true  
    },

    clicks: { 
      type: Number, 
      default: 0 
    }
  },
  {
    timestamps: true,
  }
);

const UrlModel = mongoose.models.Url || mongoose.model("Url", urlSchema);

export default UrlModel;