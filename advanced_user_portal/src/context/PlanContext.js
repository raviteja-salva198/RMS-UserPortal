import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

const PlanContext = createContext();

export const PlanProvider = ({ children }) => {
  const [currentPlan, setCurrentPlan] = useState(null);
  const token = Cookies.get('token');
  const decoded = token ? jwtDecode(token) : null;
  const userId = decoded ? decoded.id : null;

  useEffect(() => {
    const fetchCurrentPlan = async () => {
      if (!userId) return;
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASEURL}/plans/current-plan/${userId}`);
        setCurrentPlan(response.data.planName);
      } catch (err) {
        console.error('Error fetching current plan:', err);
      }
    };

    fetchCurrentPlan();
  }, [userId]);

  const buyPlan = async (planName) => {
    if (!userId) return;
    try {
      await axios.post(`${process.env.REACT_APP_BASEURL}/plans/buy-plan/${userId}`, { planName, email: "ravitejasalva@gmail.com" });
      setCurrentPlan(planName);
    } catch (err) {
      console.error('Error buying plan:', err);
    }
  };

  return (
    <PlanContext.Provider value={{ currentPlan, buyPlan }}>
      {children}
    </PlanContext.Provider>
  );
};

export const usePlan = () => {
  const context = useContext(PlanContext);
  if (context === undefined) {
    throw new Error('usePlan must be used within a PlanProvider');
  }
  return context;
};