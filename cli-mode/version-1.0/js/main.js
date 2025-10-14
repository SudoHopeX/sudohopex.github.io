// Terminal mode
const terminalOverlay = document.getElementById('terminal-overlay');
const terminalOutput = document.getElementById('terminal-output');
const terminalInput = document.getElementById('terminal-input');

const welcomeMessage = `
Welcome to the Terminal mode Portfolio of Krishna Dwivedi!
For a list of available Commands, type 'help'

`;

 terminalOverlay.style.display = 'flex';
 terminalInput.focus();
 terminalOutput.textcontent = '';
 terminalOutput.textContent = welcomeMessage;

function printOutput(text, animate = true) {
 if (animate) {
   typeText(text, terminalOutput);
 } else {
   asciiArt.style.display = 'none';
   terminalOutput.textContent += text + '\n';
   terminalOutput.scrollTop = terminalOutput.scrollHeight;
 }
}

// Typing animation function
function typeText(text, element) {
 let i = 0;
 const typeInterval = setInterval(() => {
   if (i < text.length) {
     element.textContent += text.charAt(i);
     i++;
     element.scrollTop = element.scrollHeight;
   } else {
     element.textContent += '\n';
     clearInterval(typeInterval);
   }
 }, 40); // Adjust speed by changing the interval
}

// Autocompletion feature
let autocompleteAction = true;
const commandsList = [
 'help', 'about', 'skills', 'projects','qualification', 'contact', 'clear', 'exit',
 'whoishe', 'email', 'linkedin', 'github', 'cc-course', 'location', 'hobby', 'quote',
 'status', 'theme', 'i love you', 'hello', 'joke', 'game', 'resume', 'pwd',
 'whoami', 'autocomplete-d', 'autocomplete-e', 'home', 'experience', 'openpuffi', 
 'hashstorm'
];

function autocomplete(input) {
 const matches = commandsList.filter(cmd => cmd.startsWith(input.toLowerCase()));
 if (matches.length > 0 && input !== '') {
   terminalInput.value = matches[0];
   terminalInput.setSelectionRange(input.length, matches[0].length);
 }
}

terminalInput.addEventListener('input', (e) => {
 if (autocompleteAction == true){
   autocomplete(e.target.value);
 }
});

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

function fetchDetails(command) {
 command = command.toLowerCase().trim();
 switch (command) {
   case 'help':
   return '\nCommands and their Descriptions:\n' +
           'about           -> about me ;)\n' +
           'autocomplete-d  -> diable command autocomplete\n'+
           'cc-course       -> Go to CC practice quiz\n' +
           'clear           -> Clear terminal\n' +
           'contact         -> Show my contact info\n' +
           'resume          -> Request 2 Download my resume\n' +
           'qualification   -> See my educational qualifications\n' +
           'experience      -> Know Experience\n'+
           'email           -> Send me an email\n' +
           'home            -> Leave terminal mode & redirect to home\n' +
           'game            -> Play a riddle game\n' +
           'github          -> Redirect to GitHub\n' +
           'hello           -> Greetings\n' +
           'help            -> Show this help\n' +
           'hobby           -> Know my hobby\n' +
           'i love you      -> Special message\n' +
           'joke            -> Hear a joke\n' +
           'linkedin        -> Go to LinkedIn to connect\n' +
           'location        -> Get owner residing location\n' +
           'projects        -> List my creative projects\n' +
           'pwd             -> Print working directory\n' +
           'skills          -> List skills\n' +
           'theme           -> Toggle theme\n' +
           'whoishe         -> See dear\'s info\n' +
           'whoami          -> Show current username'+
           '\n\nUtilities:\n'+
           'ctrl + l      =>  clear terminal\n'+
           'autocomplete  =>  enabled [default]';
   case 'sudo hope':
     return asciiArt + welcomeMessage;
   case 'autocomplete-d':
       autocompleteAction = false;
     return 'autocomplete is diabled, to enable it again type `autocomplete-e`.';
     case 'autocomplete-e':
       autocompleteAction = true;
     return 'autocomplete is enabled, to disable it again type `autocomplete-d`.';
   case 'about':
     return 'Krishna is passionate aspiring cybersecurity expert with a focus on information security and ethical hacking.';
   case 'contact':
     return 'Email: sud0hope[dot]techie@gmail[at]com\nLinkedIn: linkedin.com/in/dkrishna0124\nGitHub: github.com/SudoHopeX\nCredly: https://www.credly.com/users/krishna-dwivedi.a2ae4587';
   case 'clear':
     terminalOutput.textContent = '';
     return '';
   case 'experience':
     return 'Ethical Hacker Internship at Inlighntech pvt. ltd.';
   case 'qualification':
     return 'ISC2 Certified in Cybersecurity Cert.\nIBM’s Cyber Security Fundamentals Cert.\nBachelor❜s in Technology with CSE(Computer Science Engineering)\nHarvard❜s Aspire graduate under ALP(Aspire Leadership Program) Cohort 3, 2024';
   case 'email':
     window.open('mailto:sud0hope.techie@gmail.com', '_blank');
     return 'Opened email client in a new tab...'+
             'or mail at: sud0hope[dot]techie[at]gmail.com';
   case 'home':
     window.location.replace('/');
     return 'Terminal mode exiting. See you dear!';
   case 'projects':
     return '[^] HashStorm - An automated Hash identifier & cracker built using python (type `hashstorm` to read documentation).\n'
            +'[^] OpenPuffi - A bashScript to automate OpenPuff Steganography tool & Wine 32-bit installation to run window based tools on linux like openpuff (type `openpuffi` to redirect there).\n'
            +'[^] ISC2 CC Practive Quiz - Crafted an FREE ISC2 Certified in Cybersecurity practive quiz to practive 4 cc exam (type `cc-course` to redirect there).\n'
            +'[^] Keylogger using Python - Coded a Keylogger to capture Keyboard chars and send them to a webserver (type `keylogger` to read writeup).\n';
   case 'skills':
     return '- Penetration Testing\n- Ethical Hacking\n- Vulnerability Assessment\n- Python Scripting\n- Cyber Awareness Advocacy';
   case 'whoishe':
     return 'A Human being! 😊\nI\'m Krishna Dwivedi, an aspiring cybersecurity expert (Ethical Hacker and InfoSec Analyst) and yours friendly guide in this digital space.';
   case 'linkedin':
     window.open('https://www.linkedin.com/in/dkrishna0124', '_blank', 'noopener,noreferrer');
     return 'Connect with me on LinkedIn opened on new tab';
   case 'github':
     window.open('https://github.com/sudohopex', '_blank', 'noopener,noreferrer');
     return 'Opening GitHub in a new tab...';
   case 'cc-course':
     window.open('https://sudohopex.github.io/cc-practice-quiz/', '_blank', 'noopener,noreferrer');
     return 'Explore my ISC2 certified in cybersecurity practice quiz opened in new tab.';
  case 'hashstorm':
      window.open('https://sudohopex.github.io/pages/project-docs/hs.nksdnifadnifad.html', '_blank', 'noopener,noreferrer');
      return 'Redirected to HashStorm Documentation. If not search: https://sudohopex.github.io/pages/project-docs/hs.nksdnifadnifad.html';
  case 'openpuffi':
     window.open('https://sudohopex.github.io/pages/project-docs/openpuff.ioahdfaisdnfkandf.html', '_blank', 'noopener,noreferrer');
     return 'Redirected to OpenPuffi Documentation. If not Visit: https://sudohopex.github.io/pages/project-docs/openpuff.ioahdfaisdnfkandf.html';
   case 'keylogger':
     window.open('https://sudohopex.github.io/pages/comingsoon.html');
     return 'Redirected to Keylogger. If not search: https://sudohopex.github.io/pages/comingsoon.html';
   case 'location':
     return 'I am in Your System, right now..\n Belongs to Uttar Pradesh (aka UP), INDIA.';
   case 'hobby':
     return 'In my free time, I enjoy:\n- Coding personal projects\n- Reading cybersecurity blogs\n- Reading Books \n- Watching Hacking Documentaries\n- Exploring new tech gadgets';
   case 'quote':
     return 'विचारों का थहर जाना ही आनंद है | विचाराणां स्थैर्यं एव आनन्दः अस्ति | The stillness of thoughts is bliss.';
   case 'status':
     return 'Current Status: Actively seeking cybersecurity opportunities and exploring something new almost daily!';
   case 'theme':
     document.body.classList.toggle('light-theme');
     const terminalOverlay = document.getElementById('terminal-overlay');
     if (document.body.classList.contains('light-theme')) {
         if (terminalOverlay) {
             terminalOverlay.style.background = 'rgba(240, 240, 245, 0.95)';
             terminalOverlay.style.color = '#2c3e50';
         }
         return 'Theme switched to Light Mode!';
     } else {
         if (terminalOverlay) {
             terminalOverlay.style.background = 'rgba(10, 15, 26, 0.95)';
             terminalOverlay.style.color = '#7f5af0';
         }
         return 'Theme switched to Dark Mode!';
     }
   case 'i love you':
     return '💻 BUT ! L0V3 HACKING too much 😁 💻\n' +
            'H - Hack the planet!\n' +
            'A - Always learning!\n' +
            'C - Code is power!\n' +
            'K - Keep exploring!\n' +
            'I - Innovate daily!\n' +
            'N - Never stop!\n' +
            'G - Grow through challenges!\n' +
            '*************************';
   case 'hello':
     return 'Namaste! How can I serve you ?\n'+
            'For a list of available Commands, type `help`';
   case 'joke':
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
     return jokes[Math.floor(Math.random() * jokes.length)];
   case 'game':
     if (!riddleActive) {
       riddleActive = true;
       currentRiddleIndex = Math.floor(Math.random() * riddles.length);
       return 'Let\'s play a riddle game! Here\'s your riddle:\n' + riddles[currentRiddleIndex].question + '\nType your answer or "skip" to move to another riddle.';
     } else {
       return 'You are already in a game. Answer the current riddle or type "skip" to get a new one.';
     }
   case 'resume':  terminalOutput.textcontent = '';
       return 'Breach Failure! Resume download not allowed due to privacy, You can request on `https://sudohopex.github.io/message-popup.html` or mail at `sud0hope[dot]techie[at]gmail.com`';
   case 'pwd':
     return 'home/^_~';
   case 'whoami':
     return 'Hope';
   default:
     if (riddleActive) {
       if (command === 'skip') {
         currentRiddleIndex = Math.floor(Math.random() * riddles.length);
         return 'Skipping to a new riddle:\n' + riddles[currentRiddleIndex].question + '\nType your answer or "skip" again.';
       } else if (command === riddles[currentRiddleIndex].answer.toLowerCase()) {
         riddleActive = false;
         return 'Hacked! You breached the Riddle! Type "game" to play again.';
       } else {
         return 'Breach failure! Try again or type "skip" for a new riddle.';
       }
     }
     return 'Breach failure! Type "help" for a list of available commands.';
 }
}

document.addEventListener('keydown', function(event) {
if (event.ctrlKey && (event.key === 'l' || event.key === 'L')) {
   event.preventDefault();
   asciiArt.style.display = 'none';
   terminalOutput.textContent = '';
}

});

terminalInput.addEventListener('keydown', (e) => {
 if (e.key === 'Enter') {
   const cmd = terminalInput.value;
   printOutput('\n┌──(Hope㉿Krishna)-[^_~]\n└─$ ' + cmd, false);
   const response = fetchDetails(cmd);
  
  if (cmd.toLowerCase().trim() == 'help' || cmd.toLowerCase().trim() == 'sudo hope') {
     animate = false;
  } else {
     animate = true;
  }
   if (response) printOutput(response, animate);
   asciiArt.style.display = 'none';
   terminalInput.value = '';
 }
});
