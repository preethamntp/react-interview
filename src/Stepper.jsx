import React, { useState } from "react";

function Stepper({ componentList }) {
  const n = componentList.length;
  const [step, setStep] = useState(0);

  const onPreviousClick = () => {
    if (step > 0) setStep(step - 1);
  };
  const onNextClick = () => {
    if (step < n - 1) setStep(step + 1);
  };

  console.log(step);

  const StepElements = ({ currentStep }) => {
    const elements = [];
    for (let i = 0; i < n; i++) {
      elements.push(
        <span id="step" className={currentStep >= i ? "active" : ""}>
          {i + 1}
        </span>
      );
    }
    return elements;
  };

  return (
    <div>
      <div id="step-wrapper">
        <StepElements currentStep={step} />
      </div>
      <div id="progress" style={{ width: `${(step / (n - 1)) * 90}%` }}></div>
      <div>{componentList[step]}</div>
      <div>
        <button onClick={onPreviousClick}>Previous</button>
        <button onClick={onNextClick}>Next</button>
      </div>
    </div>
  );
}

export default Stepper;
