import React, { useState } from "react";
import axios from "axios";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Spinner, Table } from 'react-bootstrap';


interface User {
  name: { first: string; last: string };
  gender: string;
  dob: { age: number };
  email: string;
  phone: string;
  location: { city: string; country: string; postcode: string | number };
}

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleProjectClick = async (url: string) => {
    setLoading(true);
    try {
      const response = await axios.get(url);
      const fetchedData: User[] = response.data.results || response.data;
      navigate("/Datapage", { state: { fetchedData } });
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  const handleDateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("The date has been submitted");
  };

  return (
    <div className="app-container">
      <header className="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">
        <a href="/" className="d-flex align-items-center link-body-emphasis text-decoration-none">
          <div style={{ backgroundColor: "wheat" }}></div>
        </a>
        <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
          <form onSubmit={handleDateSubmit}>
            <label htmlFor="date" style={{ color: "ghostwhite" }}>Choose a date:</label>
            <input type="date" id="date" name="date" />
            <input className="datee" type="submit" />
          </form>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<MainPage onProjectClick={handleProjectClick} />} />
        <Route path="/Datapage" element={<DataPage />} />
      </Routes>

      {loading && (
        <div className="overlay">
          <div className="spinner-container">
            <Spinner animation="border" role="status" variant="light">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        </div>
      )}
    </div>
  );
};

interface MainPageProps {
  onProjectClick: (url: string) => void;
}

const MainPage: React.FC<MainPageProps> = ({ onProjectClick }) => (
  <div>
    <div className="pricing-header p-3 pb-md-4 mx-auto text-center text-dark" >
  <h1 className="display-4 fw-normal">
    <b><u>Taqanal Energy</u></b>
  </h1>
  <p className="fs-5">
    Taqanal Energy is powering the shift from fossil fuels and internal combustion engines through its Intelligent Energy Storage Management System which integrates the power of embedded intelligence in the battery with cloud applications.
  </p>
</div>


    <div className="row row-cols-1 row-cols-md-3 mb-3 text-center">
    
      <ProjectCard
        title="Project 1"
        description="Smart Battery"
        details={[
          "Accurate Range Prediction",
          "Efficient Energy Management",
          "Proactive Maintenance Alerts",
          "Battery Health Monitoring",
        ]}
        onClick={() => onProjectClick('https://randomuser.me/api?results=12')}
      />

   
      <ProjectCard
        title="Project 2"
        description="Battery Swapping"
        details={[
          "Real-time Data Analytics",
          "Energy Usage Optimization",
          "Smart Home Integration",
          "Predictive Maintenance",
        ]}
        onClick={() => onProjectClick('https://randomuser.me/api?results=8')}
      />

      <ProjectCard
        title="Project 3"
        description="EV Charging Network"
        details={[
          "Seamless Integration",
          "Wide Network Coverage",
          "AI-driven Optimization",
          "Renewable Energy Sources",
        ]}
        onClick={() => onProjectClick('https://randomuser.me/api?results=5')}
      />
    </div>
  </div>
);


interface ProjectCardProps {
  title: string;
  description: string;
  details: string[];
  onClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, details, onClick }) => (
  <div className="col">
    <div className="card mb-4 rounded-3 shadow-sm border-primary">
      <div className="card-header py-3 text-bg-primary border-primary">
        <h4 className="my-0 fw-normal">{title}</h4>
      </div>
      <div className="card-body">
        <h1 className="card-title pricing-card-title">{description}</h1>
        <ul className="list-unstyled mt-3 mb-4">
          {details.map((detail, index) => <li key={index}>{detail}</li>)}
        </ul>
        <button type="button" className="w-100 btn btn-lg btn-primary" onClick={onClick}>Know About It</button>
      </div>
    </div>
  </div>
);

const DataPage: React.FC = () => {
  const location = useLocation();
  const { fetchedData } = location.state || {};

  return (
    <div style={{ backgroundColor: "white", padding: "20px" }}>
      <h2>Fetched Data</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Location</th>
            <th>Postcode</th>
          </tr>
        </thead>
        <tbody>
          {fetchedData && fetchedData.map((user: User, index: number) => (
            <tr key={index}>
              <td>{user.name.first} {user.name.last}</td>
              <td>{user.gender}</td>
              <td>{user.dob.age}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.location.city}, {user.location.country}</td>
              <td>{user.location.postcode}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default App;
