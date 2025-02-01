
const backToBottom = document.getElementById("backToBottom");

backToBottom.addEventListener("click", () => {
    window.scrollTo({ top:0, behavior: "smooth" });
});
