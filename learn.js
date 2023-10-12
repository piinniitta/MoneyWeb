const buttons = document.querySelectorAll(".button");
const sections = document.querySelectorAll(".section");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.getAttribute("data-target");
    scrollToSection(target);
  });
});

function scrollToSection(targetId) {
  const targetSection = document.getElementById(targetId);
  targetSection.scrollIntoView({ behavior: "smooth" });
}
