import React, { useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";

const PostJob = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [salaryFrom, setSalaryFrom] = useState("");
  const [salaryTo, setSalaryTo] = useState("");
  const [fixedSalary, setFixedSalary] = useState("");
  const [salaryType, setSalaryType] = useState("default");

  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  const handleJobPost = async (e) => {
    e.preventDefault();
    if (salaryType === "Fixed Salary") {
      setSalaryFrom("");
      setSalaryTo("");
    } else if (salaryType === "Ranged Salary") {
      setFixedSalary("");
    } else {
      setSalaryFrom("");
      setSalaryTo("");
      setFixedSalary("");
    }
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/job/post",
        {
          title,
          description,
          category,
          country,
          city,
          location,
          fixedSalary: salaryType === "Fixed Salary" ? fixedSalary : undefined,
          salaryFrom: salaryType === "Ranged Salary" ? salaryFrom : undefined,
          salaryTo: salaryType === "Ranged Salary" ? salaryTo : undefined,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (!isAuthorized || (user && user.role !== "Employer")) {
    navigateTo("/");
  }

  return (
    <div className="job-post page">
      <div className="container">
        <h3>Post New Job</h3>
        <form onSubmit={handleJobPost}>
          <div className="form-group">
            <label>Job Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Job Title"
              required
            />
          </div>
          <div className="form-group">
            <label>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              <option value="Graphics & Design">Graphics & Design</option>
              <option value="Mobile App Development">Mobile App Development</option>
              <option value="Web Development">Web Development</option>
              <option value="Data Entry">Data Entry</option>
              <option value="Video and Photography">Video and Photography</option>
              <option value="Labour & Employment">Labour & Employment</option>
            </select>
          </div>
          <div className="form-group">
            <label>Country</label>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Country"
              required
            />
          </div>
          <div className="form-group">
            <label>City</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
              required
            />
          </div>
          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
              required
            />
          </div>
          <div className="form-group">
            <label>Salary Type</label>
            <select
              value={salaryType}
              onChange={(e) => setSalaryType(e.target.value)}
              required
            >
              <option value="default">Select Salary Type</option>
              <option value="Fixed Salary">Fixed Salary</option>
              <option value="Ranged Salary">Ranged Salary</option>
            </select>
          </div>
          {salaryType === "Fixed Salary" && (
            <div className="form-group">
              <label>Fixed Salary</label>
              <input
                type="number"
                placeholder="Enter Fixed Salary"
                value={fixedSalary}
                onChange={(e) => setFixedSalary(e.target.value)}
                required
              />
            </div>
          )}
          {salaryType === "Ranged Salary" && (
            <div className="form-group">
              <label>Salary From</label>
              <input
                type="number"
                placeholder="Salary From"
                value={salaryFrom}
                onChange={(e) => setSalaryFrom(e.target.value)}
                required
              />
              <label>Salary To</label>
              <input
                type="number"
                placeholder="Salary To"
                value={salaryTo}
                onChange={(e) => setSalaryTo(e.target.value)}
                required
              />
            </div>
          )}
          <div className="form-group">
            <label>Job Description</label>
            <textarea
              rows="10"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Job Description"
              required
            />
          </div>
          <button type="submit" className="submit-button">Create Job</button>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
