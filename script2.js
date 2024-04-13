const subjects = {
    "Mechanics": ["Chapter 1", "Chapter 2", "Chapter 3"],
    "Physics": ["Chapter 1", "Chapter 2", "Chapter 3"],
    "SME": ["Chapter 1", "Chapter 2", "Chapter 3"],
    "M1": ["Chapter 1", "Chapter 2", "Chapter 3"],
    "M2": ["Chapter 1", "Chapter 2", "Chapter 3"],
    "BEE": ["Chapter 1", "Chapter 2", "Chapter 3"],
    "BXE": ["Chapter 1", "Chapter 2", "Chapter 3"]
};

let selectedSubject = "";
let selectedChapter = "";

function sendMessage(message, sender) {
    var chatBox = document.getElementById("chat-box");

    // Create a message container
    var messageContainer = document.createElement("div");
    messageContainer.classList.add("chat-message-container");

    // Display sender's message
    var messageElement = document.createElement("div");
    messageElement.textContent = message;
    messageElement.classList.add("chat-message", sender);
    messageContainer.appendChild(messageElement);

    // Display message container in the chat box
    chatBox.appendChild(messageContainer);

    // Scroll to bottom of chat box
    chatBox.scrollTop = chatBox.scrollHeight;

    // Clear user input
    document.getElementById("user-input").value = "";

    // Set focus on the chat input
    document.getElementById("user-input").focus();
}

function displayStudyMaterials() {
    sendMessage("Here are the study materials for " + selectedChapter + " in " + selectedSubject + ":", "bot");
    sendMessage("Download the written notes: <a href='/path/to/your/written_notes.pdf' download>Download PDF</a>", "bot");
    sendMessage("Check out the video lectures:" <a href='https://www.youtube.com/embed/VIDEO_ID' target='_blank'>Watch Video Lectures</a>, "bot");
}

function processUserInput(userInput) {
    userInput = userInput.toLowerCase();

    if (selectedSubject && selectedChapter) {
        if (userInput.includes("bye") || userInput.includes("thanks")) {
            sendMessage("Happy to help! Let me know if there is anything else I can help you with.", "bot");
            selectedSubject = "";
            selectedChapter = "";
        } else {
            displayStudyMaterials();
        }
        return;
    }

    if (selectedSubject) {
        // Check if user input is a number corresponding to a chapter
        var selectedChapterIndex = parseInt(userInput);
        if (!isNaN(selectedChapterIndex) && selectedChapterIndex > 0 && selectedChapterIndex <= subjects[selectedSubject].length) {
            selectedChapter = subjects[selectedSubject][selectedChapterIndex - 1];
            sendMessage("You've selected " + selectedChapter + ". Please wait while we fetch the study materials...", "bot");
            setTimeout(displayStudyMaterials, 1000); // Display study materials after a short delay
            return;
        }
    }

    // Check if user input matches subjects
    for (var subject in subjects) {
        if (userInput.includes(subject.toLowerCase())) {
            selectedSubject = subject;
            sendMessage("Great! You've selected " + subject + ". Here are the chapters:", "bot");
            // Display chapters
            var chapters = subjects[subject];
            chapters.forEach(function(chapter, index) {
                sendMessage((index + 1) + ". " + chapter, "bot");
            });

            // Provide instructions to select chapter
            sendMessage("Please enter the number of the chapter you want to select.", "bot");
            return;
        }
    }

    // Check for greetings
    if (userInput.includes("hello") || userInput.includes("hi")) {
        sendMessage("Hello! How can I assist you today?", "bot");
        return;
    }

    // Check for farewells
    if (userInput.includes("bye") || userInput.includes("thanks")) {
        sendMessage("Happy to help. Let me know if there is anything else I can help you with.", "bot");
        return;
    }

    // If no subject match found, display list of subjects
    var subjectListMessage = "I'm sorry, I couldn't understand. Please select a subject.\n\nWelcome to Study Bot! Please select a subject from the following list:";
    for (var subject in subjects) {
        subjectListMessage += "\n- " + subject;
    }
    sendMessage(subjectListMessage, "bot");
}

// Display welcome message with list of subjects
var welcomeMessage = "Welcome to Rancho The Bot! Please select a subject from the following list:";
for (var subject in subjects) {
    welcomeMessage += "\n- " + subject;
}
sendMessage(welcomeMessage, "bot");

// Trigger processUserInput function when Enter key is pressed in the chat box
document.getElementById("user-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        var userInput = document.getElementById("user-input").value;
        sendMessage(userInput, "user");
        processUserInput(userInput);
    }
});
