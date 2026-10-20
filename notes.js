
const fs = require("fs");
const path = require("path");

// Get the command and note from the terminal
const command = process.argv[2];
const text = process.argv.slice(3).join(" ");

// Location of our JSON file
const file = path.join(__dirname, "notes.json");

// Read saved notes, or start with an empty list
function readNotes() {
    if (!fs.existsSync(file)) {
        return [];
    }

    const data = fs.readFileSync(file, "utf8");
    return JSON.parse(data);
}

// Save notes into the JSON file
function saveNotes(notes) {
    const data = JSON.stringify(notes, null, 2);
    fs.writeFileSync(file, data);
}

// Perform the requested command
try {
    const notes = readNotes();

    if (command === "add") {
        if (!text.trim()) {
            console.log("Please provide a note to add.");
        } else {
            notes.push(text);
            saveNotes(notes);
            console.log("Note added successfully!");
        }
    } else if (command === "list") {
        if (notes.length === 0) {
            console.log("No notes found.");
        } else {
            console.log("Your notes:");

            notes.forEach((note, index) => {
                console.log(`${index + 1}. ${note}`);
            });
        }
    } else if (command === "clear") {
        saveNotes([]);
        console.log("All notes cleared!");
    } else {
        console.log(
            'Wrong command. Use: add "your note", list, or clear.'
        );
    }
} catch (error) {
    console.log("Error reading or saving notes:", error.message);
}
