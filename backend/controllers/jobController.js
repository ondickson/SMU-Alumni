import JobPost from "../models/JobPost.js";

// export const getJobs = async (req, res) => {
//   try {
//     const jobs = await JobPost.find();
//     res.status(200).json(jobs);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching jobs", error });
//   }
// };
export const getJobs = async (req, res) => {
    try {
      const search = req.query.search || "";
      const jobs = await JobPost.find({
        $or: [
          { title: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
          { location: { $regex: search, $options: "i" } },
        ],
      });
  
      res.status(200).json(jobs);
    } catch (error) {
      res.status(500).json({ message: "Error fetching jobs", error });
    }
  };
  
export const addJob = async (req, res) => {
  try {
    const { title, description, salary, location, image } = req.body;
    const newJob = new JobPost({ title, description, salary, location, image });
    await newJob.save();
    res.status(201).json(newJob);
  } catch (error) {
    res.status(500).json({ message: "Error adding job", error });
  }
};
