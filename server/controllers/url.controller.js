import UrlModel from "../models/Url.model";

export const addUrl = async (req, res) => {
  try {
    const { realUrl, shortUrl, customUrl } = req.body;

    // ✅ Validation
    if (!realUrl || (!shortUrl && !customUrl)) {
      return res.status(400).json({
        success: false,
        message: "Real URL and (Short URL or Custom URL) are required!",
      });
    }

    // ✅ Check duplicate shortUrl
    const existingShort = await UrlModel.findOne({ shortUrl });
    if (existingShort) {
      return res.status(409).json({
        success: false,
        message: "Short URL already exists!",
      });
    }

    // ✅ Check duplicate customUrl (if provided)
    if (customUrl) {
      const existingCustom = await UrlModel.findOne({ customUrl });
      if (existingCustom) {
        return res.status(409).json({
          success: false,
          message: "Custom URL already taken!",
        });
      }
    }

    // ✅ Create URL
    const newUrl = new UrlModel({
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