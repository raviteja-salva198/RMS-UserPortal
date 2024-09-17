import React, { useState } from "react";
import axios from "axios";
import Select from "react-select";
import  {
    GlobalStyle,
    Container,
    Title,
    Form,
    FormGroup,
    Label,
    Input,
    SelectContainer,
    Select as StyledSelect,
    Button,
    JobList,
    JobItem,
    JobTitle,
    JobDetail
  } from "./StyledComponets";

const JobMatcher = () => {
  const [skills, setSkills] = useState([]);
  const [experience, setExperience] = useState("");
  const [locations, setLocations] = useState([]);
  const [salary, setSalary] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [availabilities, setAvailabilities] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const skillOptions = [
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "javascript", label: "JavaScript" },
    { value: "html", label: "HTML" },
    { value: "css", label: "CSS" },
    { value: "r", label: "R" },
    { value: "sql", label: "SQL" },
    { value: "machine_learning", label: "Machine Learning" },
    { value: "data_analysis", label: "Data Analysis" },
    { value: "web_development", label: "Web Development" },
    { value: "technical_support", label: "Technical Support" },
    { value: "ui_ux_design", label: "UI/UX Design" },
    { value: "database_management", label: "Database Management" },
    { value: "testing", label: "Testing" },
    { value: "linux", label: "Linux" },
    { value: "windows", label: "Windows" },
    { value: "troubleshooting", label: "Troubleshooting" },
    { value: "aws", label: "AWS" },
    { value: "networking", label: "Networking" },
    { value: "product_management", label: "Product Management" },
    { value: "unity", label: "Unity" },
    { value: "business_analysis", label: "Business Analysis" },
    { value: "digital_marketing", label: "Digital Marketing" },
    { value: "technical_writing", label: "Technical Writing" },
    { value: "salesforce", label: "Salesforce" },
    { value: "docker", label: "Docker" },
    { value: "azure", label: "Azure" },
    { value: "bi_tools", label: "BI Tools" },
    { value: "systems_analysis", label: "Systems Analysis" },
    { value: "cloud_computing", label: "Cloud Computing" },
    { value: "cyber_security", label: "Cyber Security" },
    { value: "devops", label: "DevOps" },
    { value: "nodejs", label: "Node.js" },
    { value: "express", label: "Express" },
    { value: "mongodb", label: "MongoDB" },
    { value: "excel", label: "Excel" },
    { value: "tableau", label: "Tableau" },
    { value: "tensorflow", label: "TensorFlow" },
    { value: "kubernetes", label: "Kubernetes" },
    { value: "adobe_xd", label: "Adobe XD" },
    { value: "figma", label: "Figma" },
    { value: "sketch", label: "Sketch" },
    { value: "seo", label: "SEO" },
    { value: "sem", label: "SEM" },
    { value: "content_marketing", label: "Content Marketing" },
    { value: "recruitment", label: "Recruitment" },
    { value: "onboarding", label: "Onboarding" },
    { value: "employee_relations", label: "Employee Relations" },
    { value: "sales", label: "Sales" },
    { value: "negotiation", label: "Negotiation" },
    { value: "crm", label: "CRM" },
    { value: "photoshop", label: "Photoshop" },
    { value: "illustrator", label: "Illustrator" },
    { value: "indesign", label: "InDesign" },
    { value: "writing", label: "Writing" },
    { value: "editing", label: "Editing" },
    { value: "financial_analysis", label: "Financial Analysis" },
    { value: "forecasting", label: "Forecasting" },
    { value: "network_security", label: "Network Security" },
    { value: "penetration_testing", label: "Penetration Testing" },
    { value: "risk_management", label: "Risk Management" },
    { value: "pmp", label: "PMP" },
    { value: "agile", label: "Agile" },
    { value: "scrum", label: "Scrum" },
    { value: "manual_testing", label: "Manual Testing" },
    { value: "automation_testing", label: "Automation Testing" },
    { value: "selenium", label: "Selenium" },
    { value: "research", label: "Research" },
    { value: "statistics", label: "Statistics" },
    { value: "kotlin", label: "Kotlin" },
    { value: "swift", label: "Swift" },
    { value: "react_native", label: "React Native" },
    { value: "routing_switching", label: "Routing & Switching" },
    { value: "requirements_gathering", label: "Requirements Gathering" },
    { value: "systems_design", label: "Systems Design" },
    { value: "deep_learning", label: "Deep Learning" },
    { value: "game_design", label: "Game Design" },
    { value: "logistics", label: "Logistics" },
    { value: "supply_chain", label: "Supply Chain" },
    { value: "project_management", label: "Project Management" },
    { value: "healthcare_analysis", label: "Healthcare Analysis" },
    { value: "reporting", label: "Reporting" },
    { value: "circuit_design", label: "Circuit Design" },
    { value: "pcb", label: "PCB" },
    { value: "cad", label: "CAD" },
    { value: "solidworks", label: "SolidWorks" },
    { value: "construction_management", label: "Construction Management" },
    { value: "autocad", label: "AutoCAD" },
    { value: "sustainability", label: "Sustainability" },
    { value: "waste_management", label: "Waste Management" },
    { value: "process_engineering", label: "Process Engineering" },
    { value: "chemistry", label: "Chemistry" },
    { value: "biomedical_engineering", label: "Biomedical Engineering" },
    { value: "medical_devices", label: "Medical Devices" },
    { value: "gis", label: "GIS" },
    { value: "coordination", label: "Coordination" },
    { value: "customer_service", label: "Customer Service" },
    { value: "communication", label: "Communication" },
    { value: "problem_solving", label: "Problem Solving" },
    { value: "sourcing", label: "Sourcing" },
    { value: "interviewing", label: "Interviewing" },
    { value: "event_planning", label: "Event Planning" },
    { value: "3d_modeling", label: "3D Modeling" },
  ];

  const locationOptions = [
    { value: "New York", label: "New York" },
    { value: "San Francisco", label: "San Francisco" },
    { value: "Remote", label: "Remote" },
    { value: "Chicago", label: "Chicago" },
    { value: "Boston", label: "Boston" },
    { value: "Austin", label: "Austin" },
    { value: "Seattle", label: "Seattle" },
    { value: "Los Angeles", label: "Los Angeles" },
    { value: "San Diego", label: "San Diego" },
    { value: "Philadelphia", label: "Philadelphia" },
    { value: "Dallas", label: "Dallas" },
    { value: "Denver", label: "Denver" },
    { value: "Washington DC", label: "Washington DC" },
    { value: "Atlanta", label: "Atlanta" },
    { value: "Miami", label: "Miami" },
    { value: "Houston", label: "Houston" },
    { value: "San Jose", label: "San Jose" },
    { value: "Cleveland", label: "Cleveland" },
    { value: "Orlando", label: "Orlando" },
    { value: "Charlotte", label: "Charlotte" },
    { value: "Minneapolis", label: "Minneapolis" },
    { value: "Detroit", label: "Detroit" },
    { value: "Indianapolis", label: "Indianapolis" },
    { value: "Pittsburgh", label: "Pittsburgh" },
    { value: "St. Louis", label: "St. Louis" },
    { value: "Baltimore", label: "Baltimore" },
    { value: "Nashville", label: "Nashville" },
    { value: "Kansas City", label: "Kansas City" },
    { value: "Columbus", label: "Columbus" },
    { value: "Salt Lake City", label: "Salt Lake City" },
    { value: "Portland", label: "Portland" },
    { value: "San Antonio", label: "San Antonio" },
    { value: "Sacramento", label: "Sacramento" },
    { value: "San Bernardino", label: "San Bernardino" },
    { value: "Cincinnati", label: "Cincinnati" },
    { value: "Jacksonville", label: "Jacksonville" },
    { value: "Tampa", label: "Tampa" },
    { value: "Raleigh", label: "Raleigh" },
    { value: "Omaha", label: "Omaha" },
    { value: "Louisville", label: "Louisville" },
    { value: "Milwaukee", label: "Milwaukee" },
    { value: "Birmingham", label: "Birmingham" },
    { value: "Tulsa", label: "Tulsa" },
    { value: "Memphis", label: "Memphis" },
    { value: "Richmond", label: "Richmond" },
    { value: "Buffalo", label: "Buffalo" },
    { value: "Phoenix", label: "Phoenix" },
    { value: "Washington, D.C.", label: "Washington, D.C." },
  ];

  const availabilityOptions = [
    { value: "Immediately", label: "Immediately" },
    { value: "1-2 Weeks", label: "1-2 Weeks" },
    { value: "1 Month", label: "1 Month" },
    { value: "Flexible", label: "Flexible" },
    { value: "Not Available", label: "Not Available" },
    { value: "2 Weeks", label: "2 Weeks" },
  ];

  const formatSalary = (salary, currency) => {
    const symbol = currency === "USD" ? "$" : "₹";
    return `${symbol}${salary}`;
  };

  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value);
  };

  const convertCurrency = (amount, toCurrency) => {
    const exchangeRate = 0.012; // Example exchange rate from INR to USD
    return toCurrency === "USD" ? amount * exchangeRate : amount / exchangeRate;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    const salaryInUSD =
      currency === "USD" ? parseInt(salary) : convertCurrency(parseInt(salary), "USD");
  
    const jobPreferences = {
      skills: skills.map((skill) => skill.value).join(" "),
      experience: parseInt(experience),
      location: locations.map((location) => location.value),
      salary: salaryInUSD,
      availability: availabilities.map((availability) => availability.value),
    };
  
    try {
      const response = await axios.post(
        "https://agh-jobs-ai-model.onrender.com/api/predict",
        jobPreferences,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      // Attach the selected currency to each job for later use in formatting
      const jobsWithCurrency = response.data.map((job) => ({
        ...job,
        currency: currency,
      }));
  
      setJobs(jobsWithCurrency);
    } catch (error) {
      console.error("Error fetching job matches:", error);
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <Container>
      <GlobalStyle />
      <Title>Job Matcher</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="skills">Skills</Label>
          <Select
            id="skills"
            isMulti
            options={skillOptions}
            value={skills}
            onChange={setSkills}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="experience">Years of Experience</Label>
          <Input
            type="number"
            id="experience"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="location">Preferred Locations</Label>
          <Select
            id="location"
            isMulti
            options={locationOptions}
            value={locations}
            onChange={setLocations}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="salary">Expected Salary</Label>
          <Input
            type="number"
            id="salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <SelectContainer>
            <Label htmlFor="currency">Currency</Label>
            <StyledSelect id="currency" value={currency} onChange={handleCurrencyChange}>
              <option value="USD">$</option>
              <option value="INR">₹</option>
            </StyledSelect>
          </SelectContainer>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="availability">Availability</Label>
          <Select
            id="availability"
            isMulti
            options={availabilityOptions}
            value={availabilities}
            onChange={setAvailabilities}
          />
        </FormGroup>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Find Jobs"}
        </Button>
      </Form>
      <JobList>
        <Title>Job Matches</Title>
        {jobs.length > 0 ? (
            jobs.map((job, index) => (
            <JobItem key={index}>
                <JobTitle>{job.job.title}</JobTitle>
                <JobDetail>
                Location:{" "}
                {Array.isArray(job.job.location)
                    ? job.job.location.join(", ")
                    : job.job.location}
                </JobDetail>
                <JobDetail>Experience: {job.job.experience} years</JobDetail>
                <JobDetail>
                Salary: {formatSalary(job.job.salary, job.currency)}
                </JobDetail>
                <JobDetail>
                Skills:{" "}
                {Array.isArray(job.job.skills)
                    ? job.job.skills.join(", ")
                    : job.job.skills}
                </JobDetail>
                <JobDetail>
                Availability:{" "}
                {Array.isArray(job.job.availability)
                    ? job.job.availability.join(", ")
                    : job.job.availability}
                </JobDetail>
            </JobItem>
            ))
        ) : (
            <p>No job matches found.</p>
        )}
        </JobList>
    </Container>
  );
};

export default JobMatcher;
