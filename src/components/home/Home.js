import React, { useState, useEffect } from "react";
import "./Home.css";
import RumourCard from "../rumourCard/RumourCard";

const Home = () => {
  const [rumors, setRumors] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    sign: "",
    description: "",
    region: "",
    zone: "",
    woreda: "",
    kebele: "",
    number_of_case: "",
    number_of_death: "",
    reporting_date: "",
  });

  // Fetch rumors from the backend API
  useEffect(() => {
    const fetchRumors = async () => {
      try {
        const response = await fetch("http://localhost:5000/rumors/"); // Replace with your API URL
        const data = await response.json();
        setRumors(data);
      } catch (error) {
        console.error("Error fetching rumors:", error);
      }
    };

    fetchRumors();
  }, []);

  const handleCreateRumor = () => {
    setIsEditing(false);
    setFormData({
      name: "",
      sign: "",
      description: "",
      region: "",
      zone: "",
      woreda: "",
      kebele: "",
      number_of_case: "",
      number_of_death: "",
      reporting_date: "",
    });
    setIsModalOpen(true);
  };

  const handleEditRumor = (rumor) => {
    setIsEditing(true);
    setFormData(rumor);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isEditing
        ? `http://localhost:5000/rumors/${formData._id}`
        : "http://localhost:5000/rumors/";
      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedRumor = await response.json();
        if (isEditing) {
          setRumors((prevRumors) =>
            prevRumors.map((rumor) =>
              rumor._id === updatedRumor.data._id ? updatedRumor.data : rumor
            )
          );
        } else {
          setRumors([...rumors, updatedRumor.data]);
        }
        setIsModalOpen(false);
        setFormData({
          name: "",
          sign: "",
          description: "",
          region: "",
          zone: "",
          woreda: "",
          kebele: "",
          number_of_case: "",
          number_of_death: "",
          reporting_date: "",
        });
      } else {
        console.error("Failed to submit form");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleDeleteRumor = (id) => {
    setRumors((prevRumors) => prevRumors.filter((rumor) => rumor._id !== id));
  };

  return (
    <div className="App">
      <div className="header">
        <h2>Rumors</h2>
        <button className="create-rumor-button" onClick={handleCreateRumor}>
          Create New Rumor
        </button>
      </div>
      <div className="rumors-container">
        {rumors.map((rumor) => (
          <RumourCard
            key={rumor._id}
            rumor={rumor}
            onEdit={() => handleEditRumor(rumor)}
            onDelete={handleDeleteRumor}
          />
        ))}
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={handleCloseModal}>
              &times;
            </span>
            <h3>{isEditing ? "Edit Rumor" : "Create New Rumor"}</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="sign"
                placeholder="Signs"
                value={formData.sign}
                onChange={handleInputChange}
                required
              />
              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="region"
                placeholder="Region"
                value={formData.region}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="zone"
                placeholder="Zone"
                value={formData.zone}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="woreda"
                placeholder="Woreda"
                value={formData.woreda}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="kebele"
                placeholder="Kebele"
                value={formData.kebele}
                onChange={handleInputChange}
                required
              />
              <input
                type="number"
                name="number_of_case"
                placeholder="Number of Cases"
                value={formData.number_of_case}
                onChange={handleInputChange}
                required
              />
              <input
                type="number"
                name="number_of_death"
                placeholder="Number of Deaths"
                value={formData.number_of_death}
                onChange={handleInputChange}
                required
              />
              <input
                type="date"
                name="reporting_date"
                value={formData.reporting_date}
                onChange={handleInputChange}
                required
              />
              <button type="submit">{isEditing ? "Update" : "Submit"}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
