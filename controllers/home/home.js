const { Images } = require("../../db/config");
const query = { width: { $gt: 6000 } };

//get search data with indexing and using aggregate
const home1 = async (req, res) => {
  const { page = 1, limit = 20, search = "" } = req.query;
  try {
    console.time("----images_with_aggregate_and_indexing----");
    const images = await Images.aggregate([
      {
        $match: { author: { $regex: search, $options: "i" } },
      },
      {
        $lookup: {
          from: "users",
          localField: "owner",
          foreignField: "_id",
          as: "landlord",
        },
      },
      {
        $project: {
          "landlord.password": 0,
        },
      },
    ])
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    console.timeEnd("----images_with_aggregate_and_indexing----");
    const count = await Images.countDocuments();

    res.status(200).json({
      success: true,
      images,
      count,
      length: images.length,
      totalPage: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(201).json({
      success: false,
      message: "Something went wrong!",
      error: error.message,
    });
  }
};

// get data with indexing using populate and find
const home2 = async (req, res) => {
  const { page = 1, limit = 20, search = "" } = req.query;
  try {
    console.time("----images_with_populate_and_indexing----");
    const images = await Images.find(
      {
        $or: [
          {
            $text: { $search: `\"${search}\"` },
          },
          { author: { $regex: search, $options: "i" } },
        ],
      },
      { score: { $meta: "textScore" } }
    )
      .sort({ score: { $meta: "textScore" } })
      // .limit(limit * 1)
      // .skip((page - 1) * limit)
      .lean()
      .setOptions({ explain: "executionStats" })
      .exec();
    console.timeEnd("----images_with_populate_and_indexing----");
    const count = await Images.countDocuments();

    res.status(200).json({
      success: true,
      images,
      count,
      resLength: images.length,
      totalPage: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Something went wrong!",
      error: error.message,
    });
  }
};

module.exports = {
  home1,
  home2,
};
