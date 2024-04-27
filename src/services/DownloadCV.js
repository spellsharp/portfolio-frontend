import CV from "../assets/Shrisharanyan_Vasu_CV.pdf";

function downloadCV() {
  const link = document.createElement("a");
  link.href = CV;
  link.download = "Shrisharanyan_Vasu_CV.pdf";
  link.click();
}

export default downloadCV;
