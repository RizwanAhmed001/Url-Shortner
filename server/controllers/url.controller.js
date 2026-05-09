import UrlModel from "../models/Url.model.js";

export const addUrl = async (req, res) => {
  try {
    const user = req.user;

    if(!user){
      return res.status(401).json({success: false, message: "Not Authorized!"})
    }

    const { realUrl, shortUrl, customUrl } = req.body;

    if (!realUrl || (!shortUrl && !customUrl)) {
      return res.status(400).json({
        success: false,
        message: "Real URL and (Short URL or Custom URL) are required!",
      });
    }

    const existingShort = await UrlModel.findOne({ shortUrl });
    if (existingShort) {
      return res.status(409).json({
        success: false,
        message: "Short URL already exists!",
      });
    }

    if (customUrl) {
      const existingCustom = await UrlModel.findOne({ customUrl });
      if (existingCustom) {
        return res.status(409).json({
          success: false,
          message: "Custom URL already taken!",
        });
      }
    }

    const newUrl = new UrlModel({
      userId: user,
      realUrl,
      shortUrl,
      customUrl,
    });

    await newUrl.save();

    return res.status(201).json({
      success: true,
      message: "New URL added successfully!",
      data: newUrl,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const allUserUrls = async (req, res) => {
  try {
    const userId = req.user;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized!",
      });
    }

    const userUrls = await UrlModel.find({ userId })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "All Url Of Particular User",
      urls: userUrls,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const redirectUrl = async (req, res) => {
  try {
    const { shortCode } = req.params;

    const url = await UrlModel.findOne({
      $or: [
        { shortUrl: shortCode },
        { customUrl: shortCode }
      ]
    });

    if (!url) {
      return res.status(404).send("URL not found");
    }

    // 🔥 REDIRECT
    return res.redirect(url.realUrl);

  } catch (error) {
    return res.status(500).send("Server error");
  }
};