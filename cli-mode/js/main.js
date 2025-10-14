//# main.js v2.0

// Global variable to temporarily hold the last input for the 'Tab' double-press check
let lastAutocompleteInput = '';

// Terminal mode elements
const terminalOutput = document.getElementById('terminal-output');

// Input elements (declared here, assigned in initializeTerminal)
let terminalInput;
let activeInputLine;
let activePromptText;

// Configuration
const typingSpeed = 20;        // typing speed for results
const history = [];            // hold history of commands executed
let historyIndex = -1;         // Index of the current history index in the array
const maxHistory = 60;         // specifies max history commands
let possibleCompletions = [];  // Holds the array of matching commands
let completionIndex = -1;     // Index of the current suggestion in the array (-1 means LCP/initial state)
let baseInputForCompletion = ''; // Stores the input when the first Tab was pressed (e.g., 'he')


// Shell Identity Configuration
const userName = 'Hope';
const hostName = 'Krishna';
let currentDirectory = '~';

// Function for ASCII Art Content
function getAsciiArt() {
     return `
   #       ######                                   #     #
  # #      #     #   ##   #   #     ####  ######    #     #  ####  #####  ######
 #   #     #     #  #  #   # #     #    # #         #     # #    # #    # #
#     #    ######  #    #   #      #    # #####     ####### #    # #    # #####
#######    #   #   ######   #      #    # #         #     # #    # #####  #
#     #    #    #  #    #   #      #    # #         #     # #    # #      #
#     #    #     # #    #   #       ####  #         #     #  ####  #      ######
================================================================================
              [[ SudoHopeX Terminal Interface Website ]]\n`;
}

// Prompt generation (first line only)
function generatePrompt() {
    // Structure: ┌──(USER@HOST)-[PATH]
    //            └─$ //command
    return `┌──(<span class="cli-prompt-user">${userName}</span>@<span class="cli-prompt-host">${hostName}</span>)-[<span class="cli-warning">${currentDirectory}</span>]`;
}

// --- Initialization ---
function initializeTerminal() {

    // 1. Clone input elements from the hidden template and append to output
    const inputTemplate = document.getElementById('input-template').querySelector('#active-input-line');
    activeInputLine = inputTemplate.cloneNode(true);

    // Append the active input line to the bottom of the scrollable output area
    terminalOutput.appendChild(activeInputLine);

    // 2. Re-assign the variables based on the elements now in the DOM
    activePromptText = activeInputLine.querySelector('#active-prompt-text');
    terminalInput = activeInputLine.querySelector('#terminal-input');

    // 3. Set initial colored prompt
    activePromptText.innerHTML = generatePrompt();

    // 4. Insert the ASCII art *before* the active input line
    const asciiHtml = `<div id="asciiArt" style="white-space:pre-wrap; color:#00ff00; font-size:10px; margin-bottom:4px;">${getAsciiArt()}</div>`;
    terminalOutput.insertAdjacentHTML('afterbegin', asciiHtml);

    const welcomeMessage = `
Welcome to the Terminal mode Portfolio of <span class="cli-prompt-user">${hostName}</span>!.

For a list of available Commands, type '<span class="cli-success">help</span>'
\n`;
    // 5. Start typing the welcome message
    typeText(welcomeMessage, () => {
        terminalInput.focus();
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    });

    // Re-attach event listeners now that terminalInput is defined
    setupEventListeners();
}

// Typing animation function
function typeText(text, callback = () => {}) {
    let i = 0;
    let currentContent = '';

    // Create a temporary element to hold the animated text
    const tempOutputElement = document.createElement('div');
    tempOutputElement.style.whiteSpace = 'pre-wrap';

    // Insert the temporary element just before the active input line
    terminalOutput.insertBefore(tempOutputElement, activeInputLine);

    const typeInterval = setInterval(() => {
        if (i < text.length) {
            currentContent += text.charAt(i);
            tempOutputElement.innerHTML = currentContent;
            i++;
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
        } else {
            clearInterval(typeInterval);
            callback();
        }
    }, typingSpeed);
}

// Function to print a static line of output
function printStaticOutput(text) {
     // Insert the new output just before the active input line
     activeInputLine.insertAdjacentHTML('beforebegin', `<div style="white-space: pre-wrap; padding: 0; margin: 0;">${text}</div>\n`);
     terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

// Main output function - Ensures the prompt/input is at the end
function printOutput(command, response, animate = true ) {

    if (['help', 'sudo hope'].includes(command)) {
        animate = false;
    }

    // 1. Permanently write the executed command line (PROMPT + COMMAND)
    const promptPrefix = activePromptText.innerHTML;
    // Manually add the full prompt for the historical record
    const staticCommandLine = promptPrefix + '\n└─$ ' + command;
    printStaticOutput(staticCommandLine);

    // 2. Clear the active input field
    terminalInput.value = '';

    // 3. Print the response
    if (response) {
        if (animate) {
            typeText(response, () => {
                terminalInput.focus();
                terminalOutput.scrollTop = terminalOutput.scrollHeight;
            });
        } else {
            printStaticOutput(response);
            terminalInput.focus();
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
        }
    } else {
        terminalInput.focus();
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }

    // 4. Update the prompt text for the *next* command
    activePromptText.innerHTML = generatePrompt();
}

// --- Autocompletion and Commands (omitted for brevity) ---
let autocompleteAction = true;
const commandsList = [
    'help', 'about', 'skills', 'projects','qualification', 'contact', 'clear', 'exit',
    'whoishe', 'email', 'linkedin', 'github', 'cc-course', 'location', 'hobby', 'quote',
    'status', 'theme', 'i love you', 'hello', 'joke', 'game', 'resume', 'pwd',
    'whoami', 'autocomplete-d', 'autocomplete-e', 'home', 'experience', 'openpuffi',
    'hashstorm', 'keylogger'
];

// autocompletion fn
function autocomplete(input) {
    if (!autocompleteAction) return;
    const trimmedInput = input.trim();
    const lowerInput = trimmedInput.toLowerCase();

    // --- State Check: Has the user typed something new? ---
    // If the current input does NOT match the base input for completion,
    // or if the base input hasn't been set yet, we reset the state.
    if (!lowerInput.startsWith(baseInputForCompletion) || baseInputForCompletion === '') {

        // 1. New Search: Set the new base input and find fresh matches.
        baseInputForCompletion = lowerInput;
        possibleCompletions = commandsList.filter(cmd => cmd.startsWith(lowerInput)).sort();

        // 2. Reset Index: Set to -1. The logic below will immediately move it to 0.
        completionIndex = -1;
    }

    if (possibleCompletions.length === 0) {
        // No matches found, do nothing, keep current input.
        completionIndex = -1;
        baseInputForCompletion = ''; // Resetting this here allows a new attempt on the next tab.
        return;
    }

    // Handle single match immediately (to skip the list/cycle logic)
    if (possibleCompletions.length === 1) {
        const match = possibleCompletions[0];
        terminalInput.value = match;
        terminalInput.setSelectionRange(lowerInput.length, match.length);
        baseInputForCompletion = match.toLowerCase(); // Treat as fully completed
        return;
    }

    // --- Cycle Logic ---

    // Move to the next index.
    completionIndex++;

    // Check for wrap-around (past the last match)
    if (completionIndex >= possibleCompletions.length) {
        completionIndex = -1; // -1 is our dedicated state for "Print List"
    }

    // --- Action Execution ---

    if (completionIndex === -1) {
        // State -1: Print the list of all matches.

        // 1. Permanently write the current prompt and command line
        const staticCommandLine = activePromptText.innerHTML + '\n└─$ ' + trimmedInput;
        printStaticOutput(staticCommandLine);

        // 2. Format and print the list
        const columns = 4;
        let output = '';
        let tempLine = '';

        for (let i = 0; i < possibleCompletions.length; i++) {
            const rawPadded = possibleCompletions[i].padEnd(20, ' ');
            tempLine += `<span class="cli-data">${rawPadded}</span>`;

            if ((i + 1) % columns === 0 || i === possibleCompletions.length - 1) {
                output += tempLine + '\n';
                tempLine = '';
            }
        }
        printStaticOutput(output.trim());

        // 3. Restore the active prompt and input line, using the base input (e.g., 'he')
        activePromptText.innerHTML = generatePrompt();
        terminalInput.value = baseInputForCompletion;

        // CRITICAL: Reset the index to 0 so the NEXT tab press shows the first match.
        completionIndex = 0;

    } else {
        // State 0 or greater: Cycle to the next suggested match.

        const nextCompletion = possibleCompletions[completionIndex];

        terminalInput.value = nextCompletion;

        // Select the part that the user hasn't finished typing (from the end of the base input)
        const selectionStart = baseInputForCompletion.length;

        terminalInput.setSelectionRange(selectionStart, nextCompletion.length);
    }

    terminalInput.focus();
}

function switch_theme(){
     document.body.classList.toggle('light-theme');
     if (document.body.classList.contains('light-theme')) {
         return '<span class="cli-warning">Theme switched to Light Mode!</span>';
     } else {
         return '<span class="cli-success">Theme switched to Dark Mode!</span>';
     }
}

const riddles = [
 { question: "I sneak into systems without a key, cracking codes is my specialty. What am I?", answer: "a hacker" },
 { question: "I’m a wall that’s not made of brick, I stop bad data with a digital trick. What am I?", answer: "a firewall" },
 { question: "I’m a bug, but not an insect, I mess up your code and make you vexed. What am I?", answer: "a software glitch" },
 { question: "I’m a key, but I don’t open doors, I unlock your data with secret scores. What am I?", answer: "a password" },
 { question: "I’m a fish that doesn’t swim, I hook your info if you’re not grim. What am I?", answer: "phishing" },
 { question: "I’m a script that’s not in a play, I automate hacks in a sneaky way. What am I?", answer: "a bot" },
 { question: "I’m a hat, but not on your head, I hack for good, not for dread. What am I?", answer: "a white hat" },
 { question: "I’m a hat, dark as night, I break into systems for malicious delight. What am I?", answer: "a black hat" },
 { question: "I’m a trap set in an email, click my link and your security will fail. What am I?", answer: "a phishing scam" },
 { question: "I’m a code that’s not for fun, I lock your files till payment’s done. What am I?", answer: "ransomware" },
 { question: "I’m a gate that’s not in a fence, I guard your network with digital sense. What am I?", answer: "a router" },
 { question: "I’m a spy, but not in a trench coat, I steal your data with a sneaky note. What am I?", answer: "spyware" },
 { question: "I’m a loop that never ends, I crash your program and frustrate friends. What am I?", answer: "an infinite loop" },
 { question: "I’m a virus, but not a cold, I corrupt your files, or so I’m told. What am I?", answer: "malware" },
 { question: "I’m a port, but not at sea, hackers scan me to find a key. What am I?", answer: "a network port" },
 { question: "I’m a log, but not made of wood, I track your hacks, for bad or good. What am I?", answer: "a system log" },
 { question: "I’m a shell, but not on the beach, I give hackers command-line reach. What am I?", answer: "a terminal shell" },
 { question: "I’m a brute, but not a bully, I guess passwords until I’m fully. What am I?", answer: "brute force attack" },
 { question: "I’m a packet, but not a gift, I carry data, sometimes with a rift. What am I?", answer: "a data packet" },
 { question: "I’m a worm, but not in the dirt, I spread through networks, causing hurt. What am I?", answer: "a computer worm" },
 { question: "I’m a Trojan, but not from Greece, I sneak in software, peace by peace. What am I?", answer: "a Trojan horse" },
 { question: "I’m a cache, but not a treasure, I store data for quick measure. What am I?", answer: "a memory cache" },
 { question: "I’m a debug, but not a pest, I fix your code to be the best. What am I?", answer: "debugging" },
 { question: "I’m a leak, but not from a pipe, I spill your secrets, byte by byte. What am I?", answer: "a data leak" },
 { question: "I’m a patch, but not for clothes, I fix your software’s security holes. What am I?", answer: "a security patch" },
 { question: "I’m a hash, but not a meal, I encrypt your data with a digital seal. What am I?", answer: "a hash function" },
 { question: "I’m a spoof, but not a joke, I fake identities to provoke. What am I?", answer: "IP spoofing" },
 { question: "I’m a denial, but not a refusal, I flood servers till they’re unusable. What am I?", answer: "a denial of service attack" },
 { question: "I’m a root, but not a plant, I give full access if you can’t. What am I?", answer: "root access" },
 { question: "I’m a script kiddie, not very wise, I use others’ tools for my disguise. What am I?", answer: "an inexperienced hacker" },
 { question: "I’m a backdoor, not at your house, I let hackers in, quiet as a mouse. What am I?", answer: "a hidden entry point" },
 { question: "I’m a cipher, but not a spy, I scramble data so others can’t pry. What am I?", answer: "encryption" },
 { question: "I’m a buffer, but not a cushion, I overflow with malicious intrusion. What am I?", answer: "a buffer overflow" },
 { question: "I’m a ping, but not a sound, I test connections all around. What am I?", answer: "a network ping" },
 { question: "I’m a stack, but not a pile, I overflow and cause denial. What am I?", answer: "a stack overflow" },
 { question: "I’m a cookie, but not to eat, I store your data, isn’t that neat? What am I?", answer: "a browser cookie" },
 { question: "I’m a botnet, not a fishing net, I control many systems with a threat. What am I?", answer: "a network of infected devices" },
 { question: "I’m a sandbox, but not for play, I test bad code in a safe way. What am I?", answer: "a virtual environment" },
 { question: "I’m a zero-day, not a holiday, I exploit flaws before they’re away. What am I?", answer: "a zero-day vulnerability" },
 { question: "I’m a keylogger, not a musician, I record your strokes with precision. What am I?", answer: "a keystroke logger" },
 { question: "I’m a VPN, not a van, I hide your location as best I can. What am I?", answer: "a virtual private network" },
 { question: "I’m a DDoS, not a dance, I overwhelm servers, no chance. What am I?", answer: "a distributed denial of service attack" },
 { question: "I’m a proxy, not a substitute, I mask your path, absolute. What am I?", answer: "a proxy server" },
 { question: "I’m a payload, not a cargo, I deliver harm when I go. What am I?", answer: "malicious code" },
 { question: "I’m a social engineer, not a builder, I trick humans, a sneaky thriller. What am I?", answer: "a social engineering attack" }
];
let currentRiddleIndex = -1;
let riddleActive = false;

const jokes = [
     "Why don't skeletons fight each other? They don't have the guts!",
     "Why did the computer go to school? It wanted to improve its skills!",
     "Why don't programmers like dark mode? Because they can't see the bugs!",
     "What do you call a bear with no teeth? A gummy bear!",
     "Why did the tomato turn red? Because it saw the salad dressing!",
     "Why don't eggs tell jokes? They'd crack each other up!",
     "What do you call a computer that sings? A-Dell!",
     "Why was the math book sad? It had too many problems!",
     "What do you get when you cross a snowman and a vampire? Frostbite!",
     "Why did the programmer break up with their partner? They had too many arguments!",
     "What do you call a dog magician? A labracadabrador!",
     "Why did the cookie go to the hospital? It felt crummy!",
     "Why don't some couples go to the gym? Because some relationships don't work out!",
     "What do you call a factory that makes okay products? A satisfactory!",
     "Why did the JavaScript developer feel sad? Because they didn't know how to 'null' their feelings!",
     "What do you call a boomerang that doesn't come back? A stick!",
     "Why did the scarecrow become a motivational speaker? He was outstanding in his field!",
     "What do you call cheese that isn't yours? Nacho cheese!",
     "Why did the database administrator leave their job? They couldn't get a good connection!"
];

function fetchDetails(command) {
    command = command.toLowerCase().trim();
    let response = '';

    const getLinkResponse = (cmd) => {
        switch (cmd) {
            case 'linkedin': return `Redirected to <span class="cli-link">LinkedIn</span> in a new tab... [URL: https://www.linkedin.com/in/dkrishna0124]`;
            case 'github': return `Redirected to <span class="cli-link">GitHub</span> in a new tab... [URL: https://github.com/sudohopex]`;
            case 'credly': return `Redirected to <span class="cli-link">Credly</span> in a new tab... [URL: https://www.credly.com/users/krishna-dwivedi.a2ae4587]`;
            case 'cc-course': return `Exploring <span class="cli-link">ISC2 CC Practice Quiz</span>... [URL: https://sudohopex.github.io/cc-practice-quiz/]`;
            case 'kaligpt': return `Opening <span class="cli-link">KaliGPT Documentation</span>... [URL: https://sudohopex.github.io/pages/project-docs/kaligpt.kjiodjfianjfkjnsifoifsidfh.html]`;
            case 'hashstorm': return `Opening <span class="cli-link">HashStorm Documentation</span>... [URL: https://sudohopex.github.io/pages/project-docs/hs.nksdnifadnifad.html]`;
            case 'openpuffi': return `Opening <span class="cli-link">OpenPuffi Documentation</span>... [URL: https://sudohopex.github.io/pages/project-docs/openpuff.ioahdfaisdnfkandf.html]`;
            case 'keylogger': return `Opening <span class="cli-link">Keylogger Writeup</span>... [URL: https://sudohopex.github.io/pages/comingsoon.html]`;
            default: return '';
        }
    };

    if (['linkedin', 'github', 'cc-course', 'hashstorm', 'openpuffi', 'keylogger', 'credly', 'kaligpt'].includes(command)) {
        response = getLinkResponse(command);
        const urlMatch = response.match(/https?:\/\/[^\s\[\]]+/);
        if (urlMatch) {
            window.open(urlMatch[0], '_blank', 'noopener,noreferrer');
        }
        return response;
    }

    switch (command) {
        case 'help':
           response = `<span class="cli-warning">Commands and their Descriptions:</span>\n\n` +

                        `<span class="cli-warning">--- Core Portfolio Commands ---</span>\n` +
                        `<span class="cli-data">about</span>           -> About me (your elevator pitch)\n` +
                        `<span class="cli-data">skills</span>          -> List technical skills\n` +
                        `<span class="cli-data">experience</span>      -> Know professional experience\n`+
                        `<span class="cli-data">projects</span>        -> List my creative projects\n` +
                        `<span class="cli-data">qualification</span>   -> See my educational qualifications\n` +
                        `<span class="cli-data">resume</span>          -> Request 2 Download my resume\n\n` +

                        `<span class="cli-warning">--- Contacts ---</span>\n` +
                        `<span class="cli-data">contact</span>         -> Show my contact info (Email, LinkedIn, GitHub)\n` +
                        `<span class="cli-data">email</span>           -> Send me an email (Opens mail client)\n` +
                        `<span class="cli-data">linkedin</span>        -> Go to LinkedIn to connect\n` +
                        `<span class="cli-data">github</span>          -> Redirect to GitHub\n` +
                        `<span class="cli-data">location</span>        -> Get owner residing location\n\n` +

                        `<span class="cli-warning">--- Terminal & Navigation ---</span>\n` +
                        `<span class="cli-data">clear</span>           -> Clear the terminal screen\n` +
                        `<span class="cli-data">home/exit</span>       -> Leave terminal mode & redirect to GUI home\n` +
                        `<span class="cli-data">pwd</span>             -> Print working directory (Shows current path)\n` +
                        `<span class="cli-data">whoami</span>          -> Show current username\n\n`+

                        `<span class="cli-warning">--- Fun & Engagement ---</span>\n` +
                        `<span class="cli-data">hello</span>           -> Greetings\n` +
                        `<span class="cli-data">hobby</span>           -> Know my hobby\n` +
                        `<span class="cli-data">joke</span>            -> Hear a joke\n` +
                        `<span class="cli-data">game</span>            -> Play a riddle game\n` +
                        `<span class="cli-data">whoishe</span>         -> See dear's info (A fun personal touch)\n` +
                        `<span class="cli-data">i love you</span>      -> Special message (The least important, but fun!)\n\n`+

                        `<span class="cli-warning">--- Utilities ---</span>\n`+
                        `<span class="cli-data">theme</span>         =>  Toggle terminal theme (dark/light)\n` +
                        `<span class="cli-data">ctrl + l</span>      =>  clear terminal\n`+
                        `<span class="cli-data">TAB</span>           =>  use autocompletion (switch b/w possible completion)\n`+
                        `<span class="cli-data">autocomplete</span>  =>  ` + (autocompleteAction ? '<span class="cli-success">enabled</span> (to disable autocomplete-d)' : '<span class="cli-error">disabled</span> (to enable autocomplete-e)');
           break;

        case 'clear':
            terminalOutput.innerHTML = '';

            // Re-insert the active input line container at the bottom
            terminalOutput.appendChild(activeInputLine);
            activePromptText.innerHTML = generatePrompt();

            terminalInput.focus();
            break;

        case 'pwd':
            currentDirectory = '~';
            response = `/home/<span class="cli-prompt-user">${userName}</span>/<span class="cli-warning">${currentDirectory}</span>`;
            break;

       case 'whoami':
            response = `<span class="cli-prompt-user">${userName}</span>`;
            break;

       case 'theme':
             response = switch_theme();
             break;

       case 'sudo hope':
             response = getAsciiArt() + "\n" +
                        "Welcome to the Terminal mode Portfolio of <span class=\"cli-host-host\">Krishna (SudoHopeX)</span>!\n\n" +
                        "For a list of available Commands, type '<span class=\"cli-success\">help</span>'";
             break;

       case 'autocomplete-d':
             autocompleteAction = false;
             response = '<span class="cli-error">autocomplete is disabled</span>, to enable it again type <span class="cli-success">`autocomplete-e`</span>.';
             break;

       case 'autocomplete-e':
           autocompleteAction = true;
           response = '<span class="cli-success">autocomplete is enabled</span>, to disable it again type <span class="cli-error">`autocomplete-d`</span>.';
           break;

       case 'about':
         response = '<span class="cli-success">Krishna is passionate aspiring cybersecurity expert with a focus on information security and ethical hacking.</span>';
         break;

       case 'contact':
         response = `[+] Email: <span class="cli-link">sud0hope[dot]techie[at]gmail[dot]com</span> (type 'email' to send me an email)\n`
                  + `[+] LinkedIn: <span class="cli-link">in/dkrishna0124</span> (type 'linkedin' to see profile)\n`
                  + `[+] GitHub: <span class="cli-link">github.com/SudoHopeX</span> (type 'github' to see profile)\n`
                  + `[+] Credly: <span class="cli-link">users/krishna-dwivedi.a2ae4587</span> (type 'credly' to see profile)`;
         break;

       case 'experience':
         response = 'Ethical Hacker Internship at <span class="cli-data">Inlighntech pvt. ltd.</span>';
         break;

       case 'qualification':
         response = `[+] <span class="cli-data">ISC2 Certified in Cybersecurity Cert.</span>\n`
                   + `[+] <span class="cli-data">IBM’s Cyber Security Fundamentals Cert.</span>\n`
                   + `[+] Bachelor❜s in Technology with <span class="cli-data">CSE(Computer Science Engineering)</span>\n`
                   + `[+] Harvard❜s Aspire graduate under <span class="cli-data">ALP(Aspire Leadership Program) Cohort 3, 2024</span>`;
         break;

       case 'email':
         const dot = '.';
         const at = "@";
         const e = `mailto:sud0hope${dot}techie${at}gmail.com`;
         window.open(e, '_blank');
         response = 'Opened email client in a new tab... or mail at: <span class="cli-link">sud0hope[dot]techie[at]gmail[dot]com</span>';
         break;

       case 'home':
       case 'exit':
         window.location.replace('/');
         response = '<span class="cli-warning">Terminal mode exiting. See you dear!</span>';
         break;

       case 'projects':
         response = `[+] <span class="cli-data">Website: for blogs, writeups, tool docs etc. </span> (type <span class="cli-warning">home</span>) [URL: https://sudohopex.github.io/]\n\n`
                + `[+] <span class="cli-data">KaliGPT: An AI assistance built next into your Linux terminal</span> (type <span class="cli-warning">kaligpt</span>) [URL: https://sudohopex.github.io/pages/project-docs/kaligpt.kjiodjfianjfkjnsifoifsidfh.html]\n\n`
                + `[+] <span class="cli-data">HashStorm: An Hash Identifier & Cracker</span> (type <span class="cli-warning">hashstorm</span>) [URL: https://sudohopex.github.io/pages/project-docs/hs.nksdnifadnifad.html]\n\n`
                + `[+] <span class="cli-data">OpenPuffi: Install OpenPuff an steganography tool</span> (type <span class="cli-warning">openpuffi</span>) [URL: https://sudohopex.github.io/pages/project-docs/openpuff.ioahdfaisdnfkandf.html]\n\n`
                + `[+] <span class="cli-data">ISC2 CC Practive Quiz</span> (type <span class="cli-warning">cc-course</span>) [URL: https://sudohopex.github.io/cc-practice-quiz/]\n\n`
                + `[+] <span class="cli-data">Keylogger with server using Python</span> (type <span class="cli-warning">keylogger</span>) [URL: https://sudohopex.github.io/pages/comingsoon.html]\n`;
         break;

       case 'skills':
         response = ` <span class="cli-warning">Primary Skills:</span>\n`
                  + `- <span class="cli-data">Penetration Testing</span>\n`
                  + `- <span class="cli-data">Ethical Hacking</span>\n`
                  + `- <span class="cli-data">Vulnerability Assessment</span>\n`
                  + `- <span class="cli-data">Python Scripting</span>\n`
                  + `- <span class="cli-data">Cyber Awareness Advocacy</span>`;
         break;

       case 'whoishe':
         response = 'A Human being! 😊\nI\'m <span class="cli-prompt-host">Krishna Dwivedi</span>, an aspiring cybersecurity expert (Ethical Hacker and InfoSec Analyst) and yours friendly guide in this digital space.';
         break;

       case 'location':
         response = 'I am in Your System, right now..\n Belongs to <span class="cli-warning">Uttar Pradesh (aka UP), INDIA.</span>';
         break;

       case 'hobby':
         response = 'In my free time, I enjoy:\n- Coding personal projects\n- Reading cybersecurity blogs\n- Reading Books \n- Watching Hacking Documentaries\n- Exploring new tech gadgets';
         break;

       case 'joke':
         response = jokes[Math.floor(Math.random() * jokes.length)];
         break;


       case 'resume':
           response = `<span class="cli-error">Breach Failure!</span> Resume download not allowed due to privacy. You can request on <span class="cli-link">https://sudohopex.github.io/message-popup.html</span> or mail at <span class="cli-link">sud0hope[dot]techie[at]gmail[dot]com</span>`;
           break;

       case 'game':
         if (!riddleActive) {
           riddleActive = true;
           currentRiddleIndex = Math.floor(Math.random() * riddles.length);
           response = `<span class="cli-warning">Let's play a riddle game!</span> Here's your riddle:\n<span class="cli-data">${riddles[currentRiddleIndex].question}</span>\nType your answer or "<span class="cli-success">skip</span>" to move to another riddle.`;
         } else {
           response = 'You are already in a game. Answer the current riddle or type "<span class="cli-success">skip</span>" to get a new one.';
         }
         break;

       case 'i love you':
             response = '💻 BUT <span class="cli-data">! L0V3 HACKING</span> too much 😁 💻\n' +
                        '<span class="cli-warning">H</span> - Hack the planet!\n' +
                        '<span class="cli-warning">A</span> - Always learning!\n' +
                        '<span class="cli-warning">C</span> - Code is power!\n' +
                        '<span class="cli-warning">K</span> - Keep exploring!\n' +
                        '<span class="cli-warning">I</span> - Innovate daily!\n' +
                        '<span class="cli-warning">N</span> - Never stop!\n' +
                        '<span class="cli-warning">G</span> - Grow through challenges!\n\n';
             break;

        case 'hello':
             response = 'Namaste! How can I serve you ?\n'+
                    'For a list of available Commands, type <span class="cli-success">`help`</span>';
             break;

        case 'quote':
            response = 'विचारों का थहर जाना ही आनंद है | विचाराणां स्थैर्यं एव आनन्दः अस्ति | The stillness of thoughts is bliss.';
            break;

        case 'status':
            response = 'Current Status: Actively seeking cybersecurity opportunities and exploring something new almost daily!';
            break;

       default:
            if (riddleActive) {
                   if (command === 'skip') {
                     currentRiddleIndex = Math.floor(Math.random() * riddles.length);
                     response = `Skipping to a new riddle:\n<span class="cli-data">${riddles[currentRiddleIndex].question}</span>\nType your answer or "<span class="cli-success">skip</span>" again.`;
                   } else if (command === riddles[currentRiddleIndex].answer.toLowerCase()) {
                     riddleActive = false;
                     response = '<span class="cli-success">Hacked! You breached the Riddle!</span> Type "<span class="cli-success">game</span>" to play again.';
                   } else {
                     response = '<span class="cli-error">Breach failure!</span> Try again or type "<span class="cli-success">skip</span>" for a new riddle.';
                   }
            } else {
                 response = `<span class="cli-error">Breach failure!</span> Command <span class="cli-data">'${command}'</span> not found. Type "<span class="cli-success">help</span>" for a list of available commands.`;
            }
            break;
    }

    return response;
}

// --- Event Listeners and Execution Flow ---

function setupEventListeners() {
    // History Navigation (UP/DOWN Arrow Keys) and Tab Completion
    terminalInput.addEventListener('keydown', (e) => {
        // History
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (history.length > 0) {
                historyIndex = Math.min(historyIndex + 1, history.length - 1);
                terminalInput.value = history[history.length - 1 - historyIndex];
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex > 0) {
                historyIndex--;
                terminalInput.value = history[history.length - 1 - historyIndex];
            } else if (historyIndex === 0) {
                historyIndex = -1;
                terminalInput.value = '';
            }
        }

        // Tab Completion
        else if (e.key === 'Tab') {
            e.preventDefault();
            autocomplete(terminalInput.value);
        }
    });


    terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const cmd = terminalInput.value.trim();

            // 1. Handle Empty Command
            if (cmd === '') {
                 // Print the prompt with the second line manually added for history
                printStaticOutput(activePromptText.innerHTML + '\n└─$ ');
                terminalInput.value = '';
                terminalInput.focus();
                return;
            }

            // 2. Add to History
            if (cmd !== history[history.length - 1]) {
                history.push(cmd);
                if (history.length > maxHistory) {
                    history.shift();
                }
            }
            historyIndex = -1;
            lastAutocompleteInput = '';

            // 3. Process Command
            const response = fetchDetails(cmd);

            // 4. Output Response
            printOutput(cmd, response, animate = true);

            // 5. Manage ASCII art visibility
            const asciiElement = terminalOutput.querySelector('#asciiArt');
            if (cmd.toLowerCase() === 'sudo hope') {
                 // Sudo hope command will regenerate the ASCII art as part of the response output
            } else {
                 // Hide it for all other commands
                 if (asciiElement) asciiElement.style.display = 'none';
            }
        }
    });

    // Ctrl+L to clear terminal
    document.addEventListener('keydown', function(event) {
        if (event.ctrlKey && (event.key === 'l' || event.key === 'L')) {
            event.preventDefault();
            terminalOutput.innerHTML = '';

            // Re-insert the active input line container at the bottom
            terminalOutput.appendChild(activeInputLine);
            activePromptText.innerHTML = generatePrompt();

            terminalInput.focus();
        }
    });
}

// Run initialization when the DOM is ready
document.addEventListener('DOMContentLoaded', initializeTerminal);
