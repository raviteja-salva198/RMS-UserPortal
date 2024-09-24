import React, { useState, useEffect } from "react";
import { Bell, X, Trash2 } from "lucide-react";
import jobRoles from "./jobroles.json";
import { AlertItemTitle, AlertItemInfo, ClearAllButton, RemoveButton, Container, FormBellContainer, FormError, FormGroup, FormTitle, AlertItem, AlertsList, AlertsPopupHeader, NoAlertsMessage, NotificationBadge, StyledButton, StyledInput, StyledSelect, Label, BellIconContainer, AlertsPopup, ClosePopupButton, PopupAlertItem, JobAlertsContainer, SetPreferencesForm, InputFieldsContainer } from "./style";

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
    const newNotifications = jobs.filter(job => 
      alerts.some(alert => 
        (alert.role && job.jobRole.toLowerCase().includes(alert.role.toLowerCase())) ||
        (alert.companyName && job.companyName.toLowerCase().includes(alert.companyName.toLowerCase()))
      )
    ).map(job => `${job.companyName} posted a new ${job.jobRole} position (${job.employmentType}) in ${job.location}`);

    setNotifications(prevNotifications => [...new Set([...prevNotifications, ...newNotifications])]);
  };

  const handleSetPreferences = () => {
    if (Object.values(preferences).every(val => !val)) {
      setFormError("Please fill in at least one field");
      return;
    }
    setFormError("");
    const newAlert = { id: Date.now(), ...preferences };
    setAlerts(prevAlerts => [newAlert, ...prevAlerts]);
    setPreferences({ role: "", location: "", employmentType: "", companyName: "" });
  };

  const removeAlert = (id) => {
    setAlerts(prevAlerts => prevAlerts.filter(alert => alert.id !== id));
  };

  const clearAllAlerts = () => setAlerts([]);
  const clearAllNotifications = () => setNotifications([]);

  const roleOptions = jobRoles.map((role) => ({ value: role, label: role }));

  return (
    <Container>
      <FormBellContainer>
        <SetPreferencesForm>
          <FormTitle>Set Job Alerts</FormTitle>
          <form onSubmit={(e) => { e.preventDefault(); handleSetPreferences(); }}>
            <InputFieldsContainer>
              <FormGroup>
                <Label htmlFor="role">Preferred Role</Label>
                <StyledSelect
                  id="role"
                  value={roleOptions.find(option => option.value === preferences.role)}
                  onChange={(selectedOption) => setPreferences({ ...preferences, role: selectedOption.value })}
                  options={roleOptions}
                  placeholder="Select a role"
                  classNamePrefix="react-select"
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="companyName">Company Name</Label>
                <StyledInput
                  id="companyName"
                  type="text"
                  value={preferences.companyName}
                  onChange={(e) => setPreferences({ ...preferences, companyName: e.target.value })}
                  placeholder="Enter company name"
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="location">Location Type</Label>
                <StyledSelect
                  id="location"
                  value={{ value: preferences.location, label: preferences.location }}
                  onChange={(selectedOption) => setPreferences({ ...preferences, location: selectedOption.value })}
                  options={[
                    { value: "Hybrid", label: "Hybrid" },
                    { value: "On-site", label: "On-site" },
                    { value: "Remote", label: "Remote" },
                  ]}
                  placeholder="Select a location type"
                  classNamePrefix="react-select"
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="employmentType">Employment Type</Label>
                <StyledSelect
                  id="employmentType"
                  value={{ value: preferences.employmentType, label: preferences.employmentType }}
                  onChange={(selectedOption) => setPreferences({ ...preferences, employmentType: selectedOption.value })}
                  options={[
                    { value: "Full-time", label: "Full-time" },
                    { value: "Part-time", label: "Part-time" },
                    { value: "Flexible", label: "Flexible" },
                    { value: "Contract", label: "Contract" },
                  ]}
                  placeholder="Select employment type"
                  classNamePrefix="react-select"
                />
              </FormGroup>
            </InputFieldsContainer>
            {formError && <FormError>{formError}</FormError>}
            <StyledButton type="submit">Set Alert</StyledButton>
          </form>
        </SetPreferencesForm>

        <BellIconContainer>
          <Bell size={24} onClick={() => setShowAlerts(!showAlerts)} />
          {notifications.length > 0 && (
            <NotificationBadge>{notifications.length}</NotificationBadge>
          )}
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
                  <NoAlertsMessage>No new job notifications</NoAlertsMessage>
                ) : (
                  notifications.map((notification, index) => (
                    <PopupAlertItem key={index}>{notification}</PopupAlertItem>
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
        </BellIconContainer>
      </FormBellContainer>

      <JobAlertsContainer>
        <FormTitle>Job Alerts</FormTitle>
        {alerts.length === 0 ? (
          <NoAlertsMessage>No Job Alerts Here</NoAlertsMessage>
        ) : (
          alerts.map((alert) => (
            <AlertItem key={alert.id}>
              <AlertItemTitle>{alert.role || "Any Role"}</AlertItemTitle>
              <AlertItemInfo>Company: {alert.companyName || "Any"}</AlertItemInfo>
              <AlertItemInfo>Location: {alert.location || "Any"}</AlertItemInfo>
              <AlertItemInfo>Employment Type: {alert.employmentType || "Any"}</AlertItemInfo>
              <RemoveButton onClick={() => removeAlert(alert.id)}>
                <Trash2 size={16} style={{ marginRight: '0.5rem' }} />
                Remove
              </RemoveButton>
            </AlertItem>
          ))
        )}
        {alerts.length > 0 && (
          <ClearAllButton onClick={clearAllAlerts}>Clear All Alerts</ClearAllButton>
        )}
      </JobAlertsContainer>
    </Container>
  );
};

export default JobalertsComponent;









// import React, { useState, useEffect } from "react";
// import Select from "react-select";
// import { Bell, X } from "lucide-react";
// import jobRoles from "./jobroles.json";
// import {
//   Container,
//   FormBellContainer,
//   SetPreferencesForm,
//   FormGroup,
//   InputFieldsContainer,
//   BellIconContainer,
//   AlertsPopup,
//   AlertsPopupHeader,
//   ClosePopupButton,
//   AlertsList,
//   PopupAlertItem,
//   ClearAllButton,
//   JobAlertsContainer,
//   AlertItem,
//   StyledButton,
//   StyledInput,
//   StyledSelect,
//   NotificationBadge,
//   FormError,
//   NoAlertsMessage
// } from './style';

// const roleOptions = jobRoles.map((role) => ({ value: role, label: role }));

// const JobalertsComponent = () => {
//   const [alerts, setAlerts] = useState([]);
//   const [preferences, setPreferences] = useState({
//     role: "",
//     location: "",
//     employmentType: "",
//     companyName: "",
//   });
//   const [showAlerts, setShowAlerts] = useState(false);
//   const [formError, setFormError] = useState("");
//   const [notifications, setNotifications] = useState([]);
//   const [postedJobs, setPostedJobs] = useState([]);

//   useEffect(() => {
//     const storedAlerts = JSON.parse(localStorage.getItem("jobAlerts")) || [];
//     setAlerts(storedAlerts);
//     fetchPostedJobs();
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("jobAlerts", JSON.stringify(alerts));
//     if (postedJobs.length > 0) {
//       checkForNewJobs(postedJobs);
//     }
//   }, [alerts, postedJobs]);

//   const fetchPostedJobs = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/jobs/alljobs");
//       const jobs = await response.json();
//       setPostedJobs(jobs);
//     } catch (error) {
//       console.error("Error fetching posted jobs:", error);
//     }
//   };

//   const checkForNewJobs = (jobs) => {
//     const newNotifications = jobs.filter(job => 
//       alerts.some(alert => 
//         (alert.role && job.jobRole.toLowerCase().includes(alert.role.toLowerCase())) ||
//         (alert.companyName && job.companyName.toLowerCase().includes(alert.companyName.toLowerCase()))
//       )
//     ).map(job => `${job.companyName} posted a new ${job.jobRole} position (${job.employmentType}) in ${job.location}`);

//     setNotifications(prevNotifications => [...new Set([...prevNotifications, ...newNotifications])]);
//   };

//   const handleSetPreferences = () => {
//     if (Object.values(preferences).every(val => !val)) {
//       setFormError("Please fill in at least one field");
//       return;
//     }
//     setFormError("");
//     const newAlert = { id: Date.now(), ...preferences };
//     setAlerts(prevAlerts => [newAlert, ...prevAlerts]);
//     setPreferences({ role: "", location: "", employmentType: "", companyName: "" });
//   };

//   const removeAlert = (id) => {
//     setAlerts(prevAlerts => prevAlerts.filter(alert => alert.id !== id));
//   };

//   const clearAllAlerts = () => setAlerts([]);
//   const clearAllNotifications = () => setNotifications([]);

//   return (
//     <Container>
//       <FormBellContainer>
//         <SetPreferencesForm>
//           <h2>Set Job Alerts</h2>
//           <form onSubmit={(e) => { e.preventDefault(); handleSetPreferences(); }}>
//             <InputFieldsContainer>
//               <FormGroup>
//                 <label htmlFor="role">Preferred Role</label>
//                 <Select
//                   id="role"
//                   value={roleOptions.find(option => option.value === preferences.role)}
//                   onChange={(selectedOption) => setPreferences({ ...preferences, role: selectedOption.value })}
//                   options={roleOptions}
//                   placeholder="Select a role"
//                 />
//               </FormGroup>
//               <FormGroup>
//                 <label htmlFor="companyName">Company Name</label>
//                 <StyledInput
//                   id="companyName"
//                   type="text"
//                   value={preferences.companyName}
//                   onChange={(e) => setPreferences({ ...preferences, companyName: e.target.value })}
//                   placeholder="Enter company name"
//                 />
//               </FormGroup>
//               <FormGroup>
//                 <label htmlFor="location">Location Type</label>
//                 <StyledSelect
//                   id="location"
//                   value={preferences.location}
//                   onChange={(e) => setPreferences({ ...preferences, location: e.target.value })}
//                 >
//                   <option value="">Select a location type</option>
//                   <option value="Hybrid">Hybrid</option>
//                   <option value="On-site">On-site</option>
//                   <option value="Remote">Remote</option>
//                 </StyledSelect>
//               </FormGroup>
//               <FormGroup>
//                 <label htmlFor="employmentType">Employment Type</label>
//                 <StyledSelect
//                   id="employmentType"
//                   value={preferences.employmentType}
//                   onChange={(e) => setPreferences({ ...preferences, employmentType: e.target.value })}
//                 >
//                   <option value="">Select employment type</option>
//                   <option value="Full-time">Full-time</option>
//                   <option value="Part-time">Part-time</option>
//                   <option value="Flexible">Flexible</option>
//                   <option value="Contract">Contract</option>
//                 </StyledSelect>
//               </FormGroup>
//               {formError && <FormError>{formError}</FormError>}
//               <StyledButton type="submit">Set Alert</StyledButton>
//             </InputFieldsContainer>
//           </form>
//         </SetPreferencesForm>

//         <BellIconContainer>
//           <Bell size={24} onClick={() => setShowAlerts(!showAlerts)} />
//           {notifications.length > 0 && (
//             <NotificationBadge>{notifications.length}</NotificationBadge>
//           )}
//         </BellIconContainer>
//         {showAlerts && (
//           <AlertsPopup>
//             <AlertsPopupHeader>
//               <h3>Notifications</h3>
//               <ClosePopupButton onClick={() => setShowAlerts(false)}>
//                 <X size={18} />
//               </ClosePopupButton>
//             </AlertsPopupHeader>
//             <AlertsList>
//               {notifications.length === 0 ? (
//                 <NoAlertsMessage>No new job notifications</NoAlertsMessage>
//               ) : (
//                 notifications.map((notification, index) => (
//                   <PopupAlertItem key={index}>{notification}</PopupAlertItem>
//                 ))
//               )}
//             </AlertsList>
//             {notifications.length > 0 && (
//               <ClearAllButton onClick={clearAllNotifications}>
//                 Clear All
//               </ClearAllButton>
//             )}
//           </AlertsPopup>
//         )}
//       </FormBellContainer>

//       <JobAlertsContainer>
//         <h2>Job Alerts</h2>
//         {alerts.length === 0 ? (
//           <NoAlertsMessage>No Job Alerts Here</NoAlertsMessage>
//         ) : (
//           alerts.map((alert) => (
//             <AlertItem key={alert.id}>
//               <h3>{alert.role || "Any Role"}</h3>
//               <p>Company: {alert.companyName || "Any"}</p>
//               <p>Location: {alert.location || "Any"}</p>
//               <p>Employment Type: {alert.employmentType || "Any"}</p>
//               <StyledButton onClick={() => removeAlert(alert.id)}>Remove</StyledButton>
//             </AlertItem>
//           ))
//         )}
//         {alerts.length > 0 && (
//           <ClearAllButton onClick={clearAllAlerts}>Clear All Alerts</ClearAllButton>
//         )}
//       </JobAlertsContainer>
//     </Container>
//   );
// };

// export default JobalertsComponent;