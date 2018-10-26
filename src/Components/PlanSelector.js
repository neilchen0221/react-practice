import React from "react";
import Plan from "./Plan";

function PlanSelector() {
  return (
    <div className="plans">
      <Plan
        title="Career"
        subtitle="Get hired and get ahead"
        discription={[
          "Stand out and get in touch with hiring managers",
          "See how you compare to other applicants",
          "Learn new skills to advance your career"
        ]}
        style={{ backgroundColor: "#2b7b1e" }}
      />

      <Plan
        title="Career"
        subtitle="Get hired and get ahead"
        discription={[
          "Stand out and get in touch with hiring managers",
          "See how you compare to other applicants",
          "Learn new skills to advance your career"
        ]}
        style={{ backgroundColor: "#1f8ac6" }}
      />
      <Plan
        title="Career"
        subtitle="Get hired and get ahead"
        discription={[
          "Stand out and get in touch with hiring managers",
          "See how you compare to other applicants",
          "Learn new skills to advance your career"
        ]}
        style={{ backgroundColor: "#7a68db" }}
      />
      <Plan
        title="Career"
        subtitle="Get hired and get ahead"
        discription={[
          "Stand out and get in touch with hiring managers",
          "See how you compare to other applicants",
          "Learn new skills to advance your career"
        ]}
        style={{ backgroundColor: "#b54b00" }}
      />
    </div>
  );
}

export default PlanSelector;
