import React, { useState } from "react";

const RumourCard = ({ rumor, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ ...rumor });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/rumors/${rumor._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editData),
        }
      );
      if (response.ok) {
        const updatedRumor = await response.json();
        onEdit(updatedRumor); // Notify parent about the update
        setIsEditing(false);
      } else {
        console.error("Failed to update rumor");
      }
    } catch (error) {
      console.error("Error updating rumor:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/rumors/${rumor._id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        onDelete(rumor._id); // Notify parent about the deletion
      } else {
        console.error("Failed to delete rumor");
      }
    } catch (error) {
      console.error("Error deleting rumor:", error);
    }
  };

  return (
    <div className="rumor-card">
      {isEditing ? (
        <>
          <input
            type="text"
            name="name"
            value={editData.name}
            onChange={handleInputChange}
          />
          <textarea
            name="description"
            value={editData.description}
            onChange={handleInputChange}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <h3>{rumor.name}</h3>
          <p>
            <strong>Region:</strong> {rumor.region}
          </p>
          <p>
            <strong>Zone:</strong> {rumor.zone}
          </p>
          <p>
            <strong>Woreda:</strong> {rumor.woreda}
          </p>
          <p>
            <strong>Kebele:</strong> {rumor.kebele}
          </p>
          <p>
            <strong>Signs:</strong> {rumor.sign}
          </p>
          <p>
            <strong>Description:</strong> {rumor.description}
          </p>
          <p>
            <strong>Cases:</strong> {rumor.number_of_case}
          </p>
          <p>
            <strong>Deaths:</strong> {rumor.number_of_death}
          </p>
          <p>
            <strong>Reporting Date:</strong>{" "}
            {new Date(rumor.reporting_date).toLocaleDateString()}
          </p>
          <button onClick={() => onEdit(rumor)}>Edit</button>{" "}
          {/* Pass the rumor to onEdit */}
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
    </div>
  );
};

export default RumourCard;
