document.addEventListener("DOMContentLoaded", function() {
    console.log("Js file loaded");
    //clickmagick_cmc.log()
    const stepButtons = document.querySelectorAll(".step");
    const quizSteps = document.querySelectorAll(".quiz-step");
    const stepImage = document.getElementById('stepImage');

    let currentStep = 0;

    function showStep(stepIndex) {
        quizSteps.forEach((step, index) => {
            if (index === stepIndex) {
                step.classList.add("active");
                // stepButtons[index].classList.add("active");
            } else {
                step.classList.remove("active");
                // stepButtons[index].classList.remove("active");
            }
        });
    }

    function goToNextStep() {
        if (currentStep < quizSteps.length - 1) {
            currentStep++;
            console.log(currentStep, "currentStep");

            stepImage.src = `https://breatheagain.io/image/step${currentStep + 1}.png`;

            showStep(currentStep);
        } else {
            const url = `https://breatheagain.io/v5?aff_id=22&subid=[cmc_vid]&subid2=Facebook`;
            sendTrackEvent(url);
            // Redirect to the next page after the last question
            window.location.href = "https://unrestrictedbreathing.net/thanks";
        }
    }

    function sendTrackEvent(url) {
        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        }).then(response => {
            if (response.ok) {
                console.log("Event posted successfully!");
            } else {
                console.error("Failed to post event.");
            }
        }).catch(error => {
            console.error("Error:", error);
        });
    }

    quizSteps.forEach((step, index) => {
        const radioInputs = step.querySelectorAll('input[type="radio"]');
        radioInputs.forEach(input => {
            input.addEventListener("change", () => {
                if (input.checked) {
                    goToNextStep();
                }
            });
        });
    });

    showStep(currentStep); // Show the first question and step initially
});
