import React, { useState } from "react";
// import Header from "../../../components/header/indesx";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import "./modal.css"
export default function index() {
  const [step, setStep] = useState("step1");
  return (
    <div>
      {/* <Header /> */}
      {step === "step1" && <Step1 setStep={setStep} />}
      {step === "step2" && <Step2 setStep={setStep} />}
      {step === "step3" && <Step3 setStep={setStep} />}
    </div>
  );
}
