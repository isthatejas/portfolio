function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

//FORM VALIDATION AND SUBMISSION_____________________________________________________________
let contactForm = document.getElementById("contact-form");
let messageDiv = document.getElementById("message");
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
function validatePhoneNumber(phone) {
    const regex = /^\d{10}$/;
    return regex.test(phone);
}
contactForm.addEventListener('submit', (e) => {
    e.preventDefault(); // prevents form submission
    let name = contactForm.elements["name"].value;
    let email = contactForm.elements["email"].value;
    let phone = contactForm.elements["phone"].value;
    let message = contactForm.elements["message"].value;

    if (!validateEmail(email)) {
        messageDiv.textContent = "Invalid email address. Try Entering correct Email Address";
        return;
    }
    if (!validatePhoneNumber(phone)) {
        messageDiv.textContent = "Invalid phone number. Please enter 10 digits.";
        return;
    }
    let formData = new FormData(contactForm);
    fetch('https://script.google.com/macros/s/AKfycbyQT5arDnJBlQK5DO6i6e2CUaf-qJJATbNLXj07Y1jiw-Wzz0vIxT0OUhotDUOwpzKfiQ/exec', {
        method: "POST",
        body: formData
    })
        .then(response => {
            if (response.ok) {
                messageDiv.textContent = "Message sent successfully!";
                contactForm.reset(); // Reset the form after successful submission
            } else {
                messageDiv.textContent = "Failed to send message. Please try again.";
            }
        })
        .catch(error => {
            messageDiv.textContent = "Failed to send message. Please try again.";
            console.error('Error:', error);
        });
});

//CHAT BOT ___________________________________________________________________________________
var coll = document.getElementsByClassName("collapsible");

for (let i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
        this.classList.toggle("active");

        var content = this.nextElementSibling;

        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }

    });
}

function getTime() {
    let today = new Date();
    hours = today.getHours();
    minutes = today.getMinutes();

    if (hours < 10) {
        hours = "0" + hours;
    }

    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    let time = hours + ":" + minutes;
    return time;
}

// Gets the first message
function firstBotMessage() {
    let firstMessage = "How's it going?"
    document.getElementById("botStarterMessage").innerHTML = '<p class="botText"><span>' + firstMessage + '</span></p>';
    let time = getTime();
    $("#chat-timestamp").append(time);
    document.getElementById("userInput").scrollIntoView(false);
}

firstBotMessage();

// Retrieves the response
function getHardResponse(userText) {
    let botResponse = getBotResponse(userText);
    let botHtml = '<p class="botText"><span>' + botResponse + '</span></p>';
    $("#chatbox").append(botHtml);

    document.getElementById("chat-bar-bottom").scrollIntoView(true);
}

//Gets the text text from the input box and processes it
function getResponse() {
    let userText = $("#textInput").val();

    if (userText == "") {
        userText = "I love Tejas";
    }

    let userHtml = '<p class="userText"><span>' + userText + '</span></p>';

    $("#textInput").val("");
    $("#chatbox").append(userHtml);
    document.getElementById("chat-bar-bottom").scrollIntoView(true);

    setTimeout(() => {
        getHardResponse(userText);
    }, 1000)

}

// Handles sending text via button clicks
function buttonSendText(sampleText) {
    let userHtml = '<p class="userText"><span>' + sampleText + '</span></p>';

    $("#textInput").val("");
    $("#chatbox").append(userHtml); 
    document.getElementById("chat-bar-bottom").scrollIntoView(true);
}

function sendButton() {
    getResponse();
}

function heartButton() {
    buttonSendText("Heart clicked!")
}

// Press enter to send a message
$("#textInput").keypress(function (e) {
    if (e.which == 13) {
        getResponse();
    }
});
function getBotResponse(input) {
    //rock paper scissors
    if (input == "rock") {
        return "paper";
    } else if (input == "paper") {
        return "scissors";
    } else if (input == "scissors") {
        return "rock";
    }

    // Simple responses
    if (input == "hello" || input =="hi" || input =="hey") {
        return "Hello there! How can I help you today?";
    } else if (input == "goodbye" || input =="bye") {
        return "Talk to you later!";
    } else if (input == "introduce tejas") {
        return  "The owner of this Portfolio - Tejas, is a Network Security Analyst also specializing in software development. The author has created several projects demonstrating his skills mentioned above, Scroll up for more information!";
    } else if (input == "I love Tejas") {
        return  "Tejas loves you too!";
    } else if (input == "summarize skills" || input =="skills" || input =="skillz" || input =="explain skills") {
        return  "Tejas is proficient in a diverse range of skills including HTML, CSS, JavaScript, Python, Linux, C/C++, Data Analysis, Cyber Security, Project Management, and DBMS.";
    } else if (input == "do you respond?" || input =="do you answer?" || input =="do you revert back?" || input =="do you answer back") {
        return  "Yes! feel free to write back in the form down the webpage, and I'll get back to you asap";
    } else if (input == "why do you keep winning?" || input =="why are you always winning?") {
        return  "What can I say, I am the master of this game :)";
    } else if (input == "Heart clicked!") {
        return  "AWWW, The pleasure's all mine!";
    } else {
        return "Hmm, not sure I can answer that question right now. Try asking something else?";
    }
}