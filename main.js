const scheduleButton = document.getElementById("scheduleButton");
const testButton = document.getElementById("testButton");
const topicInput = document.getElementById("topicInput");
const responseMessage = document.getElementById("responseMessage");
let loadingBar;

scheduleButton.addEventListener("click", async () => {
    const topic = topicInput.value.trim(); 

    if (!topic) {
        responseMessage.textContent = "Please enter a topic!";
        responseMessage.style.color = "red";
    } else {
        responseMessage.textContent = "";
        responseMessage.textContent = "Processing... Please wait.";
        responseMessage.style.color = "#f77062";
        createLoadingBar();

        try {
            const response = await fetch("https://steep-ariella-naveenaracha-4f98ab43.koyeb.app/schedule_class", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ topic }), 
            });

            if (!response.ok) {
                const errorData = await response.json();
                responseMessage.textContent = errorData.message || "An error occurred.";
                responseMessage.style.color = "red";
                return;
            }
            const data = await response.json();
            console.log(data);

            localStorage.setItem("questions", JSON.stringify(data.questions));
           

            responseMessage.textContent = "Class scheduled and questions generated!";
            responseMessage.style.color = "green";

            testButton.classList.remove("hidden");
            scheduleButton.classList.add("hidden");
            testButton.disabled = false;

        } catch (error) {
            console.error("Error communicating with the API:", error);
            responseMessage.textContent = "Failed to schedule the class. Please try again later.";
            responseMessage.style.color = "red";
        }

        setTimeout(() => {
            removeLoadingBar();
        }, 10000); 
    }
});

function createLoadingBar() {
    loadingBar = document.createElement("div");
    loadingBar.className = "loading-bar-container";
    loadingBar.innerHTML = `<div class="loading-bar"></div>`;
    document.querySelector(".container").appendChild(loadingBar);
}

function removeLoadingBar() {
    if (loadingBar) {
        loadingBar.remove();
    }
}

testButton.addEventListener("click", async () => {
    window.location.href = "questions.html";
});
