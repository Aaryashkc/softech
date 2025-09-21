import Blogs from "../model/blogs.model.js";
import { v2 as cloudinary } from "cloudinary";

// Create blog
export const createBlog = async (req, res) => {
  try {
    const { title, subTitle, content, titleImage, secondImage, tags, category, author } = req.body;

    let titleImageUrl = null;
    let secondImageUrl = null;

    if (titleImage) {
      const uploadedResponse = await cloudinary.uploader.upload(titleImage, {
        folder: "blogs",
      });
      titleImageUrl = uploadedResponse.secure_url;
    }

    if (secondImage) {
      const uploadedResponse = await cloudinary.uploader.upload(secondImage, {
        folder: "blogs",
      });
      secondImageUrl = uploadedResponse.secure_url;
    }

    const newBlog = new Blogs({
      title,
      subTitle,
      content,
      titleImage: titleImageUrl,
      secondImage: secondImageUrl,
      tags,
      category,
      author,
    });

    await newBlog.save();
    res.status(201).json({ message: "Blog created successfully", newBlog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error in blog creation", error: error.message });
  }
};

// Get all blogs
export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blogs.find().populate("author").sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error in fetching blogs" });
  }
};

// Get single blog by ID or slug
export const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Fetching blog with ID/slug: ${id}`);
    
    // Check if it's a valid ObjectId, otherwise treat as slug
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(id);
    let blog;
    
    if (isObjectId) {
      blog = await Blogs.findById(id).populate("author");
    } else {
      blog = await Blogs.findOne({ slug: id }).populate("author");
    }
    
    if (!blog) {
      console.log(`Blog not found for ID/slug: ${id}`);
      return res.status(404).json({ message: "Blog not found" });
    }

    console.log(`Blog found: ${blog.title}, Current views: ${blog.views}`);
    
    // increase view count
    blog.views += 1;
    await blog.save();
    
    console.log(`Blog views updated to: ${blog.views}`);

    res.status(200).json(blog);
  } catch (error) {
    console.error('Error in getBlogById:', error);
    res.status(500).json({ message: "Server error in fetching blog" });
  }
};

// Update blog
export const updateBlog = async (req, res) => {
  try {
    const { title, subTitle, content, titleImage, secondImage, tags, category } = req.body;

    let updateData = { title, subTitle, content, tags, category };

    if (titleImage) {
      const uploadedResponse = await cloudinary.uploader.upload(titleImage, {
        folder: "blogs",
      });
      updateData.titleImage = uploadedResponse.secure_url;
    }

    if (secondImage) {
      const uploadedResponse = await cloudinary.uploader.upload(secondImage, {
        folder: "blogs",
      });
      updateData.secondImage = uploadedResponse.secure_url;
    }

    const updatedBlog = await Blogs.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({ message: "Blog updated successfully", updatedBlog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error in updating blog", error: error.message });
  }
};

// Delete blog
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blogs.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    if (blog.titleImage) {
      const imageId = blog.titleImage.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`blogs/${imageId}`);
    }

    if (blog.secondImage) {
      const imageId = blog.secondImage.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`blogs/${imageId}`);
    }

    await Blogs.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error in deleting blog", error: error.message });
  }
};
