import React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const StepsContainer = ({
  activeStep,
  setActiveStep,
  steps,
  renderStep,
  onFinish,
}) => {
  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      onFinish();
      return;
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep} sx={{ marginBottom: 3 }}>
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel>{step.label}</StepLabel>
          </Step>
        ))}
      </Stepper>
        <React.Fragment>
          {renderStep(activeStep)}

          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            {activeStep > 0 ? (<Button
              variant="contained"
              color="primary"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>) : null}

            <Box sx={{ flex: "1 1 auto" }} />

            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              disabled={!steps[activeStep].limitations}
              sx={{ ml: 1 }}
            >
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </React.Fragment>
    </Box>
  );
};

export default StepsContainer;
