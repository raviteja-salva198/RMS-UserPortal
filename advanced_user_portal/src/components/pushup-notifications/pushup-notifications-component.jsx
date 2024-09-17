import React, { useState, useRef, useEffect } from "react";
import {
  Container,
  Heading,
  Section,
  SectionHeading,
  StatusButton,
  NotificationItem,
  ProfileSettings,
  PreferenceLabel,
  ConfirmationMessage,
  SendButton,
  BellIcon,
  NotificationCount,
  Sidebar,
  SidebarHeading,
  InputField,
  ErrorMessage,
  FilterButton,
  CloseIcon,
  RemoveIcon,
  ClearAllButton,
} from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faTimes,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const PushNotification = () => {
  const [notifications, setNotifications] = useState([]);
  const [preferences, setPreferences] = useState({
    email: false,
    sms: false,
    whatsapp: false,
  });
  const [preferenceValues, setPreferenceValues] = useState({
    email: "",
    sms: "",
    whatsapp: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    sms: "",
    whatsapp: "",
  });
  const [deliveryConfirmation, setDeliveryConfirmation] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [filter, setFilter] = useState(null);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setShowSidebar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleStatusChange = (newStatus, type) => {
    const notification = {
      id: Date.now(),
      position: "Software Developer",
      company: "Tech Corp",
      status: newStatus,
      type,
      date: new Date().toLocaleString(),
    };

    setNotifications((prev) => [...prev, notification]);
    setDeliveryConfirmation(`Notification sent for status: ${newStatus}`);
  };

  const handlePreferenceChange = (e) => {
    const { name, checked } = e.target;
    setPreferences((prev) => ({ ...prev, [name]: checked }));
  };

  const handlePreferenceValueChange = (e) => {
    const { name, value } = e.target;
    setPreferenceValues((prev) => ({ ...prev, [name]: value }));
    validateInput(name, value);
  };

  const validateInput = (name, value) => {
    let error = "";
    if (name === "email") {
      if (!value.includes("@")) {
        error = "Please enter a valid email address";
      }
    } else if (name === "sms") {
      if (!/^\+91\d{10}$/.test(value)) {
        error =
          "Please enter a valid mobile number starting with +91 and followed by 10 digits";
      }
    } else if (name === "whatsapp") {
      if (!/^91\d{10}$/.test(value)) {
        error =
          "Please enter a valid 10-digit mobile number for WhatsApp starting with 91";
      }
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSendPreferences = async () => {
    let hasError = false;
    Object.keys(preferences).forEach((key) => {
      if (preferences[key] && !preferenceValues[key]) {
        setErrors((prev) => ({
          ...prev,
          [key]: `Please enter your ${key === "sms" ? "mobile number" : key}`,
        }));
        hasError = true;
      }
    });

    if (hasError) {
      setDeliveryConfirmation("Please fill in all selected preferences");
    } else if (Object.values(errors).some((error) => error !== "")) {
      setDeliveryConfirmation("Please correct the errors before sending");
    } else {
      setDeliveryConfirmation("Preferences updated successfully");

      const message = `
        Job Position: N/A
        Company: User Preferences
        Status: Email updated to ${preferenceValues.email}
        Type: Preferences
        Date: ${new Date().toLocaleString()}
      `;

      if (preferences.email) {
        setNotifications((prev) => [
          ...prev,
          {
            id: Date.now(),
            position: "N/A",
            company: "User Preferences",
            status: `Email updated to ${preferenceValues.email}`,
            type: "Preferences",
            date: new Date().toLocaleString(),
          },
        ]);
      }

      // Send request to backend
      const payload = {
        email: preferences.email ? preferenceValues.email : null,
        sms: preferences.sms ? preferenceValues.sms : null,
        whatsapp: preferences.whatsapp ? preferenceValues.whatsapp : null,
        message: message,
      };

      try {
        await axios.post(
          "https://notificationalert-backend-2.onrender.com/sendNotifications",
          payload
        );
        console.log("Notifications sent successfully");
      } catch (error) {
        console.error("Error sending notifications:", error);
      }
    }
  };

  const removeNotification = (id) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const filteredNotifications = filter
    ? notifications.filter(
        (notification) =>
          notification.status === filter || notification.type === filter
      )
    : notifications;

  return (
    <>
      <Container>
        <BellIcon onClick={() => setShowSidebar(!showSidebar)}>
          <FontAwesomeIcon icon={faBell} size={24} />
          {notifications.length > 0 && (
            <NotificationCount>{notifications.length}</NotificationCount>
          )}
        </BellIcon>
        <Heading>Application Status Notifications</Heading>

        <Section>
          <SectionHeading>Change Application Status</SectionHeading>
          <StatusButton
            onClick={() => handleStatusChange("Under Review", "Job Alert")}
          >
            Under Review
          </StatusButton>
          <StatusButton
            onClick={() =>
              handleStatusChange("Interview Scheduled", "Job Alert")
            }
          >
            Interview Scheduled
          </StatusButton>
          <StatusButton
            onClick={() => handleStatusChange("Offer Extended", "Job Alert")}
          >
            Offer Extended
          </StatusButton>
          <StatusButton
            onClick={() => handleStatusChange("Rejected", "Job Alert")}
          >
            Rejected
          </StatusButton>
        </Section>

        {deliveryConfirmation && (
          <ConfirmationMessage>{deliveryConfirmation}</ConfirmationMessage>
        )}

        <ProfileSettings>
          <SectionHeading>Notification Preferences</SectionHeading>
          <PreferenceLabel>
            <input
              type="checkbox"
              name="email"
              checked={preferences.email}
              onChange={handlePreferenceChange}
            />
            Email
          </PreferenceLabel>
          {preferences.email && (
            <>
              <InputField
                type="text"
                name="email"
                value={preferenceValues.email}
                onChange={handlePreferenceValueChange}
                placeholder="Please enter your email"
              />
              {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
            </>
          )}
          <PreferenceLabel>
            <input
              type="checkbox"
              name="sms"
              checked={preferences.sms}
              onChange={handlePreferenceChange}
            />
            SMS
          </PreferenceLabel>
          {preferences.sms && (
            <>
              <InputField
                type="text"
                name="sms"
                value={preferenceValues.sms}
                onChange={handlePreferenceValueChange}
                placeholder="Please enter your Mobile Number"
              />
              {errors.sms && <ErrorMessage>{errors.sms}</ErrorMessage>}
            </>
          )}
          <PreferenceLabel>
            <input
              type="checkbox"
              name="whatsapp"
              checked={preferences.whatsapp}
              onChange={handlePreferenceChange}
            />
            WhatsApp
          </PreferenceLabel>
          {preferences.whatsapp && (
            <>
              <InputField
                type="text"
                name="whatsapp"
                value={preferenceValues.whatsapp}
                onChange={handlePreferenceValueChange}
                placeholder="Please enter your WhatsApp Number"
              />
              {errors.whatsapp && (
                <ErrorMessage>{errors.whatsapp}</ErrorMessage>
              )}
            </>
          )}
          <SendButton onClick={handleSendPreferences}>Send</SendButton>
        </ProfileSettings>
      </Container>

      <Sidebar
        show={showSidebar}
        ref={sidebarRef}
        onClick={() => setShowSidebar(false)}
      >
        <div onClick={(e) => e.stopPropagation()}>
          <CloseIcon onClick={() => setShowSidebar(false)}>
            <FontAwesomeIcon icon={faTimes} size={24} />
          </CloseIcon>
          <SidebarHeading>Notification History</SidebarHeading>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <FilterButton
              onClick={() => setFilter("Job Alert")}
              className={filter === "Job Alert" ? "active" : ""}
              style={{ flex: 1, marginRight: "5px" }}
            >
              Job Alerts
            </FilterButton>
            <FilterButton
              onClick={() => setFilter("Application Status")}
              className={filter === "Application Status" ? "active" : ""}
              style={{ flex: 1, marginRight: "5px" }}
            >
              Application Status
            </FilterButton>
            <FilterButton
              onClick={() => setFilter("Exam Notification")}
              className={filter === "Exam Notification" ? "active" : ""}
              style={{ flex: 1 }}
            >
              Exam Notifications
            </FilterButton>
          </div>
          <div>
            <select
              value={filter || ""}
              onChange={(e) => setFilter(e.target.value || null)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            >
              <option value="">All</option>
              <option value="Under Review">Under Review</option>
              <option value="Interview Scheduled">Interview Scheduled</option>
              <option value="Offer Extended">Offer Extended</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
          <ClearAllButton onClick={clearAllNotifications}>
            Clear All
          </ClearAllButton>
          {filteredNotifications.map((notification) => (
            <NotificationItem key={notification.id} type={notification.type}>
              <RemoveIcon
                icon={faTimesCircle}
                onClick={() => removeNotification(notification.id)}
              />
              <p>Job Position: {notification.position}</p>
              <p>Company: {notification.company}</p>
              <p>Status: {notification.status}</p>
              <p>Type: {notification.type}</p>
              <p>Date: {notification.date}</p>
            </NotificationItem>
          ))}
        </div>
      </Sidebar>
    </>
  );
};

export default PushNotification;
