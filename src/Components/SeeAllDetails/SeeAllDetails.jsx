import React, { useEffect, useState } from 'react';
import './seealldetails.css';
import empservice from '../services/Userservice';

const SeeAllDetails = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const employees = await empservice.getallemployee();

        if (employees) {
          setData(employees);
          console.log(employees)
        }
        else {
          console.error("No data found");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);


  return (
    <div id="container">
    <h2 id="heading">Employee Details</h2>
  
    {data.length > 0 ? (
      <div className="card-container">
        {data.map((x, index) => (
          <div className="card" key={x._id}>
            <div className="card-body">
              <p><strong>Sl No. </strong>{index + 1}</p>
              <p><strong>Name:</strong> {x.name}</p>
              <p><strong>Email:</strong> {x.email}</p>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <p>No Match Found...</p>
    )}
  </div>
  
  );
};

export default SeeAllDetails;
