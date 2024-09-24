import React from 'react';
import { Check, X } from 'lucide-react';
import { usePlan } from '../../context/PlanContext';
import { PlanPrice, FeatureList, FeatureItem, IconWrapper, Button, PlanCard, PlanTitle, PlanSubtitle, PlanContainer } from './PremiumPlans.styles';

const plans = [
  {
    title: "Basic Plan",
    price: "₹15,000/year",
    color: "#27ae60",
    features: [
      { name: "Profile Creation and Job Application", included: true },
      { name: "Basic Job Notifications", included: true },
      { name: "Document Upload & Storage (2GB)", included: true },
      { name: "Access to Job Listings (20 jobs/month)", included: true },
      { name: "Skill Matrix for Candidates", included: true },
      { name: "Simple Analytics for Recruiters", included: true },
      { name: "Email Support", included: true },
      { name: "Skill Certification & Ranking", included: false },
      { name: "Advanced Job Matching Algorithm", included: false },
      { name: "Job Tracking Dashboard", included: false },
    ]
  },
  {
    title: "Premium Plan",
    price: "₹30,000/year",
    color: "#f1c40f",
    features: [
      { name: "All Basic Plan Features", included: true },
      { name: "Skill Certification & Ranking", included: true },
      { name: "Advanced Job Matching Algorithm", included: true },
      { name: "Job Tracking Dashboard", included: true },
      { name: "Increased Document Storage (5GB)", included: true },
      { name: "Bulk Candidate Import and Export", included: true },
      { name: "Enhanced Candidate Search", included: true },
      { name: "Document Verification", included: true },
      { name: "Email & Chat Support", included: true },
      { name: "Skill & Profile Enhancement Services", included: false },
      { name: "Priority Job Applications", included: false },
    ]
  },
  {
    title: "VIP Plan",
    price: "₹50,000/year",
    color: "#e74c3c",
    features: [
      { name: "All Premium Plan Features", included: true },
      { name: "Skill & Profile Enhancement Services", included: true },
      { name: "Priority Job Applications", included: true },
      { name: "Unlimited Job Applications", included: true },
      { name: "Interview Scheduling", included: true },
      { name: "Video Portfolio Uploads", included: true },
      { name: "AI-Powered Candidate Matching", included: true },
      { name: "Advanced Bulk Shortlisting", included: true },
      { name: "Video Screening & Interviews", included: true },
      { name: "Priority Support with Dedicated Account Manager", included: true }
    ]
  }
];

const PremiumPlans = () => {
  const { currentPlan, buyPlan } = usePlan();
  
  const getPlansToShow = () => {
    if (!currentPlan) return plans;
    return plans.filter(plan => plan.title !== currentPlan);
  };

  const plansToShow = getPlansToShow();

  return (
  <>
    <PlanContainer>
      {plansToShow.map((plan, index) => (
        <PlanCard key={index} color={plan.color}>
          <PlanTitle>{plan.title}</PlanTitle>
          <PlanSubtitle>PER YEAR</PlanSubtitle>
          <PlanPrice>{plan.price}</PlanPrice>
          <FeatureList>
            {plan.features.map((feature, featureIndex) => (
              <FeatureItem key={featureIndex}>
                <IconWrapper included={feature.included}>
                  {feature.included ? <Check size={16} /> : <X size={16} />}
                </IconWrapper>
                {feature.name}
              </FeatureItem>
            ))}
          </FeatureList>
          <Button color={plan.color} onClick={() => buyPlan(plan.title)}>
            Buy Now
          </Button>
        </PlanCard>
      ))}
    </PlanContainer>
  </>
  );
};

export default PremiumPlans;






// import React from 'react';
// import { Check, X } from 'lucide-react';
// import { usePlan } from '../../context/PlanContext';
// import { PlanPrice, FeatureList, FeatureItem, IconWrapper, Button, PlanCard, PlanTitle, PlanSubtitle, PlanContainer } from './PremiumPlans.styles';

// const plans = [
//   {
//     title: "Basic Plan",
//     price: "₹15,000/year",
//     color: "#27ae60",
//     features: [
//       { name: "Profile Creation and Job Application", included: true },
//       { name: "Basic Job Notifications", included: true },
//       { name: "Document Upload & Storage (2GB)", included: true },
//       { name: "Access to Job Listings (20 jobs/month)", included: true },
//       { name: "Skill Matrix for Candidates", included: true },
//       { name: "Simple Analytics for Recruiters", included: true },
//       { name: "Email Support", included: true },
//       { name: "Skill Certification & Ranking", included: false },
//       { name: "Advanced Job Matching Algorithm", included: false },
//       { name: "Job Tracking Dashboard", included: false },
//     ]
//   },
//   {
//     title: "Premium Plan",
//     price: "₹30,000/year",
//     color: "#f1c40f",
//     features: [
//       { name: "All Basic Plan Features", included: true },
//       { name: "Skill Certification & Ranking", included: true },
//       { name: "Advanced Job Matching Algorithm", included: true },
//       { name: "Job Tracking Dashboard", included: true },
//       { name: "Increased Document Storage (5GB)", included: true },
//       { name: "Bulk Candidate Import and Export", included: true },
//       { name: "Enhanced Candidate Search", included: true },
//       { name: "Document Verification", included: true },
//       { name: "Email & Chat Support", included: true },
//       { name: "Skill & Profile Enhancement Services", included: false },
//       { name: "Priority Job Applications", included: false },
//     ]
//   },
//   {
//     title: "VIP Plan",
//     price: "₹50,000/year",
//     color: "#e74c3c",
//     features: [
//       { name: "All Premium Plan Features", included: true },
//       { name: "Skill & Profile Enhancement Services", included: true },
//       { name: "Priority Job Applications", included: true },
//       { name: "Unlimited Job Applications", included: true },
//       { name: "Interview Scheduling", included: true },
//       { name: "Video Portfolio Uploads", included: true },
//       { name: "AI-Powered Candidate Matching", included: true },
//       { name: "Advanced Bulk Shortlisting", included: true },
//       { name: "Video Screening & Interviews", included: true },
//       { name: "Priority Support with Dedicated Account Manager", included: true }
//     ]
//   }
// ];

// const PremiumPlans = () => {
//   const { currentPlan, buyPlan } = usePlan();
  
//   return (
//     <PlanContainer>
//       {plans.map((plan, index) => (
//         <PlanCard key={index} color={plan.color}>
//           <PlanTitle>{plan.title}</PlanTitle>
//           <PlanSubtitle>PER YEAR</PlanSubtitle>
//           <PlanPrice>{plan.price}</PlanPrice>
//           <FeatureList>
//             {plan.features.map((feature, featureIndex) => (
//               <FeatureItem key={featureIndex}>
//                 <IconWrapper included={feature.included}>
//                   {feature.included ? <Check size={16} /> : <X size={16} />}
//                 </IconWrapper>
//                 {feature.name}
//               </FeatureItem>
//             ))}
//           </FeatureList>
//           {currentPlan === plan.title ? (
//             <Button color={plan.color} disabled>
//               Current Plan
//             </Button>
//           ) : (
//             <Button color={plan.color} onClick={() => buyPlan(plan.title)}>
//               Buy Now
//             </Button>
//           )}
//         </PlanCard>
//       ))}
//     </PlanContainer>
//   );
// };


// export default PremiumPlans;