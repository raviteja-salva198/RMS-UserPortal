import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Bell, X } from "lucide-react";
import jobRoles from "./jobroles.json";
import { Container, FormBellContainer, SetPreferencesForm, FormGroup, InputFieldsContainer, BellIconContainer, AlertsPopup, AlertsPopupHeader, ClosePopupButton, AlertsList, PopupAlertItem, ClearAllButton, JobAlertsContainer, AlertItem } from './style';
//the changes
const roleOptions = jobRoles.map((role) => ({ value: role, label: role }));

const JobalertsComponent = () => {
  const [alerts, setAlerts] = useState([]);
  const [preferences, setPreferences] = useState({
    role: "",
    location: "",
    employmentType: "",
    companyName: "",
  });
  const [showAlerts, setShowAlerts] = useState(false);
  const [formError, setFormError] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [postedJobs, setPostedJobs] = useState([]);
  useEffect(() => {
    const storedAlerts = JSON.parse(localStorage.getItem("jobAlerts")) || [];
    setAlerts(storedAlerts);
    fetchPostedJobs();
  }, []);

  useEffect(() => {
    localStorage.setItem("jobAlerts", JSON.stringify(alerts));
    if (postedJobs.length > 0) {
      checkForNewJobs(postedJobs);
    }
  }, [alerts, postedJobs]);

  const fetchPostedJobs = async () => {
    try {
      const response = await fetch("http://localhost:5000/jobs/alljobs");
      const jobs = await response.json();
      setPostedJobs(jobs);
    } catch (error) {
      console.error("Error fetching posted jobs:", error);
    }
  };
  const checkForNewJobs = (jobs) => {
    const newNotifications = [];
    alerts.forEach((alert) => {
      jobs.forEach((job) => {
        if (
          (alert.role &&
            job.jobRole.toLowerCase().includes(alert.role.toLowerCase())) ||
          (alert.companyName &&
            job.companyName
              .toLowerCase()
              .includes(alert.companyName.toLowerCase()))
        ) {
          newNotifications.push(
            `${job.companyName} posted a new ${job.jobRole} position (${job.employmentType}) in ${job.location}`
          );
        }
      });
    });
    setNotifications((prevNotifications) => [
      ...new Set([...prevNotifications, ...newNotifications]),
    ]);
  };

  const handleSetPreferences = () => {
    if (
      !preferences.role &&
      !preferences.location &&
      !preferences.employmentType &&
      !preferences.companyName
    ) {
      setFormError("Please fill in at least one field");
      return;
    }
    setFormError("");
    const newAlert = {
      id: Date.now(),
      ...preferences,
    };
    setAlerts((prevAlerts) => [newAlert, ...prevAlerts]);
    setPreferences({
      role: "",
      location: "",
      employmentType: "",
      companyName: "",
    });
  };

  const removeAlert = (id) => {
    setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== id));
  };

  const clearAllAlerts = () => {
    setAlerts([]);
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  return (
    <Container>
      <FormBellContainer>
        <SetPreferencesForm>
          <h2>Set Job Alerts</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSetPreferences();
            }}
          >
            <InputFieldsContainer>
              <FormGroup>
                <label htmlFor="role">Preferred Role</label>
                <Select
                  id="role"
                  value={roleOptions.find(
                    (option) => option.value === preferences.role
                  )}
                  onChange={(selectedOption) =>
                    setPreferences({ ...preferences, role: selectedOption.value })
                  }
                  options={roleOptions}
                  placeholder="Select a role"
                />
              </FormGroup>
              <FormGroup>
                <label htmlFor="companyName">Company Name</label>
                <input
                  id="companyName"
                  type="text"
                  value={preferences.companyName}
                  onChange={(e) =>
                    setPreferences({
                      ...preferences,
                      companyName: e.target.value,
                    })
                  }
                  placeholder="Enter company name"
                />
              </FormGroup>
              <FormGroup>
                <label htmlFor="location">Location Type</label>
                <select
                  id="location"
                  value={preferences.location}
                  onChange={(e) =>
                    setPreferences({ ...preferences, location: e.target.value })
                  }
                >
                  <option value="">Select a location type</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="On-site">On-site</option>
                  <option value="Remote">Remote</option>
                </select>
              </FormGroup>
              <FormGroup>
                <label htmlFor="employmentType">Employment Type</label>
                <select
                  id="employmentType"
                  value={preferences.employmentType}
                  onChange={(e) =>
                    setPreferences({
                      ...preferences,
                      employmentType: e.target.value,
                    })
                  }
                >
                  <option value="">Select employment type</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Flexible">Flexible</option>
                  <option value="Contract">Contract</option>
                </select>
              </FormGroup>

              {formError && <p>{formError}</p>}
              <button type="submit">Set Alert</button>
            </InputFieldsContainer>
          </form>
        </SetPreferencesForm>

        <BellIconContainer>
          <Bell
            size={24}
            onClick={() => setShowAlerts(!showAlerts)}
          />
          {notifications.length > 0 && (
            <span>{notifications.length}</span>
          )}
        </BellIconContainer>
        {showAlerts && (
          <AlertsPopup>
            <AlertsPopupHeader>
              <h3>Notifications</h3>
              <ClosePopupButton onClick={() => setShowAlerts(false)}>
                <X size={18} />
              </ClosePopupButton>
            </AlertsPopupHeader>
            <AlertsList>
              {notifications.length === 0 ? (
                <p>No new job notifications</p>
              ) : (
                notifications.map((notification, index) => (
                  <PopupAlertItem key={index}>
                    <p>{notification}</p>
                  </PopupAlertItem>
                ))
              )}
            </AlertsList>
            {notifications.length > 0 && (
              <ClearAllButton onClick={clearAllNotifications}>
                Clear All
              </ClearAllButton>
            )}
          </AlertsPopup>
        )}
      </FormBellContainer>

      <JobAlertsContainer>
        <h2>Job Alerts</h2>
        {alerts.length === 0 ? (
          <p>No Job Alerts Here</p>
        ) : (
          alerts.map((alert) => (
            <AlertItem key={alert.id}>
              <h3>{alert.role || "Any Role"}</h3>
              <p>Company: {alert.companyName || "Any"}</p>
              <p>Location: {alert.location || "Any"}</p>
              <p>Employment Type: {alert.employmentType || "Any"}</p>
              <button onClick={() => removeAlert(alert.id)}>Remove</button>
            </AlertItem>
          ))
        )}
      </JobAlertsContainer>
    </Container>
  );
};

export default JobalertsComponent;