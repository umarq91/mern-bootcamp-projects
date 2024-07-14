import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";
import './Jobs.css'; // Ensure you have a separate CSS file for custom styling

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (isAuthorized) {
      fetchJobs();
    } else {
      navigateTo("/");
    }
  }, [isAuthorized]);

  const fetchJobs = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/v1/job/getall", {
        withCredentials: true,
      });
      setJobs(response.data.jobs);
      setFilteredJobs(response.data.jobs);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = jobs.filter(job => 
      job.title.toLowerCase().includes(term) ||
      job.category.toLowerCase().includes(term) ||
      job.city.toLowerCase().includes(term) ||
      job.country.toLowerCase().includes(term) ||
      (job.fixedSalary && job.fixedSalary.toString().includes(term)) ||
      (job.salaryFrom && job.salaryFrom.toString().includes(term)) ||
      (job.salaryTo && job.salaryTo.toString().includes(term))
    );

    setFilteredJobs(filtered);
  };

  return (
    <section className="jobs page">
      <div className="container">
        <h1>ALL AVAILABLE JOBS</h1>
        <input 
          type="text" 
          className="search-bar" 
          placeholder="Search jobs..." 
          value={searchTerm} 
          onChange={handleSearch} 
        />
        <p className="result-count">{filteredJobs.length} {filteredJobs.length === 1 ? "job" : "jobs"} found</p>
        <div className="banner">
          {filteredJobs.map((job) => (
            <div className="card job-card" key={job._id}>
              <div className="card-header">
                <h2 className="job-title">{job.title}</h2>
                <p className="job-category">{job.category}</p>
              </div>
              <div className="card-body">
                <p className="job-location">
                  <strong>Location:</strong> {job.city}, {job.country}
                </p>
                <p className="job-salary">
                  <strong>Salary:</strong> {job.fixedSalary 
                    ? `PKR ${job.fixedSalary}` 
                    : `PKR ${job.salaryFrom} - PKR ${job.salaryTo}`}
                </p>
                <p className="job-description">{job.description.slice(0, 100)}...</p>
              </div>
              <div className="card-footer">
                <Link to={`/job/${job._id}`} className="btn btn-primary">Job Details</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Jobs;
