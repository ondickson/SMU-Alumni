import React, { useState } from 'react';
import SidebarMenu from "../Sidebar"; 

function JobPost() {
  const [jobTitle, setJobTitle] = useState('');
  const [description, setDescription] = useState('');
  const [salary, setSalary] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const jobData = { jobTitle, description, salary, location, image };
    console.log('Job Posted:', jobData);
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
         <SidebarMenu />
      <h2 className="text-xl font-semibold mb-4">Post a Job</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Job Title"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          className="w-full p-2 border rounded mb-3"
          required
        />
        <textarea
          placeholder="Job Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded mb-3"
          required
        />
        <input
          type="text"
          placeholder="Salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          className="w-full p-2 border rounded mb-3"
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-2 border rounded mb-3"
          required
        />
        <input
          type="file"
          onChange={handleImageChange}
          className="w-full p-2 border rounded mb-3"
        />
        {image && <img src={image} alt="Job Preview" className="w-full h-40 object-cover rounded mb-3" />}
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Post Job
        </button>
      </form>
    </div>
  );
}
export default JobPost;