const btn = document.getElementById("toggleButton");
const heading = document.getElementById("heading1");
btn.addEventListener("click", ()=> {
    const isDarkMode = document.body.classList.toggle("dark");
    btn.textContent = isDarkMode ? "Toggle to Light Mode": "Toggle To Dark Mode";
    heading.textContent = isDarkMode ? "Toggle To Light Mode": "Toggle To Dark Mode";
    heading.style.fontFamily = isDarkMode ? "'Georgia', serif":"'Arial',san-serif"
});
