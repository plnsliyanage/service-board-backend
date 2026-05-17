import JobRequest from "../models/JobRequest.js";

/**
 * GET ALL JOBS
 */
export const getJobs = async (req, res) => {
   try {

      const { category, status } = req.query;

      let filter = {};

      if (category) filter.category = category;
      if (status) filter.status = status;

      const jobs = await JobRequest.find(filter);

      res.json(jobs);

   } catch (err) {
      res.status(500).json({ message: err.message });
   }
};

/**
 * GET SINGLE JOB
 */
export const getJobById = async (req, res) => {
   try {

      const job = await JobRequest.findById(req.params.id);

      if (!job) {
         return res.status(404).json({ message: "Job not found" });
      }

      res.json(job);

   } catch (err) {
      res.status(500).json({ message: err.message });
   }
};

/**
 * CREATE JOB
 */
export const createJob = async (req, res) => {
   try {

      const {
         title,
         description,
         category,
         location,
         contactName,
         contactEmail,
         status
      } = req.body;

      // 1. Required fields validation
      if (!title || !description) {
         return res.status(400).json({
            message: "Title and Description required"
         });
      }

      // 2. Email validation (only if email is provided)
      if (contactEmail) {
         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

         if (!emailRegex.test(contactEmail)) {
            return res.status(400).json({
               message: "Invalid email format"
            });
         }
      }

      // 3. Create job object manually (better control)
      const newJob = new JobRequest({
         title,
         description,
         category: category || "",
         location: location || "",
         contactName: contactName || "",
         contactEmail: contactEmail || "",
         status: status || "Open" // default if frontend doesn't send
      });

      // 4. Save to MongoDB
      const savedJob = await newJob.save();

      // 5. Response
      res.status(201).json(savedJob);

   } catch (err) {
      res.status(500).json({
         message: err.message
      });
   }
};

/**
 * UPDATE STATUS ONLY
 */
export const updateJobStatus = async (req, res) => {
   try {

      const { status } = req.body;

      const allowed = ["Open", "In Progress", "Closed"];

      if (!allowed.includes(status)) {
         return res.status(400).json({ message: "Invalid status" });
      }

      const job = await JobRequest.findByIdAndUpdate(
         req.params.id,
         { status },
         { new: true }
      );

      if (!job) {
         return res.status(404).json({ message: "Job not found" });
      }

      res.json(job);

   } catch (err) {
      res.status(500).json({ message: err.message });
   }
};

/**
 * DELETE JOB
 */
export const deleteJob = async (req, res) => {
   try {

      const job = await JobRequest.findByIdAndDelete(req.params.id);

      if (!job) {
         return res.status(404).json({ message: "Job not found" });
      }

      res.json({ message: "Job deleted successfully" });

   } catch (err) {
      res.status(500).json({ message: err.message });
   }
};