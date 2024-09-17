import React from 'react';
import styled from 'styled-components';

const NotificationsContainer = styled.div`
  padding: 2rem;
  min-height: 100vh;
`;

const NotificationItem = styled.div`
  background-color: #f1f1f1;
  border-radius: 4px;
  padding: 1rem;
  margin-bottom: 1rem;
`;

const Notifications = () => {
  // This is just dummy data. In a real application, you would fetch this from an API
  const notifications = [
    { id: 1, message: "New job matching your skills!" },
    { id: 2, message: "Your skill ranking has improved!" },
    { id: 3, message: "New exclusive job opportunity available!" },
  ];

  return (
    <NotificationsContainer>
      <h2>Notifications</h2>
      {notifications.map((notification) => (
        <NotificationItem key={notification.id}>
          {notification.message}
        </NotificationItem>
      ))}
    </NotificationsContainer>
  );
};

export default Notifications;