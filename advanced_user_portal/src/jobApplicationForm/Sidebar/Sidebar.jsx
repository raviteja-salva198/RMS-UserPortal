import React from "react";
import {
  SidebarContainer,
  StyledDiv,
  SidebarIcon,
  SidebarText,
} from "./sidebarStyle";
import { useNavigate } from "react-router-dom";

const steps = [
  { step: 1, name: "Personal Information" },
  { step: 2, name: "Education" },
  { step: 3, name: "Job Preferences" },
  { step: 4, name: "Work Experience" },
  { step: 5, name: "Additional Information" },
];

const Sidebar = ({ currentFormStep }) => {
  const navigate = useNavigate();
  return (
    <SidebarContainer>
      <div onClick={() => navigate(-1)}>Exit</div>
      {steps.map((step) => (
        <StyledDiv key={step.step}>
          <SidebarIcon className={currentFormStep > step.step && "complete"}>
            {step.step}
          </SidebarIcon>
          <SidebarText>{step.name}</SidebarText>
        </StyledDiv>
      ))}
    </SidebarContainer>
  );
};

export default Sidebar;
