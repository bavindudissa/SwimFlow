import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  Title,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  Title
);

function Progress() {
  const [formData, setFormData] = useState({
    swimmingDistance: '',
    swimmingTime: '',
    caloriesburned: '',
    userId: ''
  });
  const [goalDetails, setGoalDetails] = useState([]);
  const [goalTime, setGoalTime] = useState([])
  const [goalDistance, setDistance] = useState([])
  const [goalCalories, setCalories] = useState([])

  const getData = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await axios.get("http://localhost:3001/api/v1/goal/list/" + userId);
      const data = response.data.data;
  
      const distances = [];
      const times = [];
      const calories = [];
  
      // Iterate through the data array and extract values
      data.forEach(item => {
        distances.push(item.swimmingDistance);
        times.push(item.swimmingTime);
        calories.push(item.caloriesburned);
      });
  
      // Set the extracted values to the corresponding state variables
      setDistance(distances);
      setGoalTime(times);
      setCalories(calories);
      
      setGoalDetails(data); // Assuming you also want to set goalDetails with the entire data array
  
    } catch (error) {
      console.log(error);
    }
  }
  

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      setFormData((prevFormData) => ({ ...prevFormData, userId }));
    }
    getData()
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/v1/goal', formData);
      console.log(response.data);
      setFormData({
        swimmingDistance: '',
        swimmingTime: '',
        caloriesburned: '',
        userId: formData.userId
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Sample labels for demonstration
  const sampleLabels = goalDistance;
  const sampleLabels1 = goalCalories;

  // Sample data for demonstration
  const sampleData = goalTime;
  const sampleData1 = goalDistance;

  const LineChartData = {
    labels: sampleLabels,
    datasets: [
      {
        label: 'Swimming Timing', // Update the label as per your requirement
        data: sampleData,
        fill: false,
        borderColor: "#696cff",
        tension: 0,
      },
    ],
  };

  const LineChartData1 = {
    labels: sampleLabels1,
    datasets: [
      {
        label: 'Burned Calories', // Update the label as per your requirement
        data: sampleData1,
        fill: false,
        borderColor: "#696cff",
        tension: 0,
      },
    ],
  };

  const STChart = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Distance',
          color: "#8592a3",
        },
        grid: {
          color: "#8592a3",
        },
      },
      y: {
        title: {
          display: true,
          text: `Swimming Times`,
          color: "#8592a3",
        },
        grid: {
          label: "Swimming Times",
          color: "#8592a3",
        },
      },
    },
  };

  const BCChart = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Burned Calories',
          color: "#8592a3",
        },
        grid: {
          color: "#8592a3",
        },
      },
      y: {
        title: {
          display: true,
          text: `Distance`,
          color: "#8592a3",
        },
        grid: {
          label: "Distance",
          color: "#8592a3",
        },
      },
    },
  };

  return (
    <div>
      <div className="content-wrapper">
        <div className="container-xxl flex-grow-1 container-p-y">
          <div className="row">
            <div className='col-12'>
            <div className="card mb-4">
              <h5 className="card-header">Progress Details</h5>
              <hr className="my-0" />
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="mb-3 col-md-3">
                      <label htmlFor="swimmingDistance" className="form-label">Swimming Distance (M)</label>
                      <input className="form-control" type="text" id="swimmingDistance" name="swimmingDistance" value={formData.swimmingDistance} onChange={handleChange} />
                    </div>
                    <div className="mb-3 col-md-3">
                      <label htmlFor="swimmingTime" className="form-label">Swimming Time</label>
                      <input className="form-control" type="text" name="swimmingTime" id="swimmingTime" value={formData.swimmingTime} onChange={handleChange} />
                    </div>
                    <div className="mb-3 col-md-3">
                      <label htmlFor="caloriesburned" className="form-label">Calories Burned</label>
                      <input className="form-control" type="text" id="caloriesburned" name="caloriesburned" value={formData.caloriesburned} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="mt-2">
                    <button type="submit" className="btn btn-primary me-2">Save changes</button>
                    <button type="reset" className="btn btn-outline-secondary">Cancel</button>
                  </div>
                </form>
              </div>
            </div>
            </div>
            <div className='col-6'>
                <div className="card mb-4">
                    <div className="card-body">
                        <Line data={LineChartData} options={STChart} />
                    </div>
                </div>
            </div>
            <div className='col-6'>
                <div className="card mb-4">
                    <div className="card-body">
                        <Line data={LineChartData1} options={BCChart} />
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
        <footer className="content-footer footer bg-footer-theme">
                <div className="container-xxl d-flex flex-wrap justify-content-between py-2 flex-md-row flex-column">
                <div className="mb-2 mb-md-0">
                    ©
                    2024
                </div>
                </div>
        </footer>
      <div className="content-backdrop fade" />
    </div>
  );
}

export default Progress;
