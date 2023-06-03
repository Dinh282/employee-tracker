import figlet from 'figlet'; // Package to handle ASCII art.

function logBanner2() {
console.log(`
◆----------------------------------------------------------------◆
|     _____                 _                                    |
|    | ____|_ __ ___  _ __ | | ___  _   _  ___  ___              |
|    |  _| | '_ \` _ \\| '_ \\| |/ _ \\| | | |/ _ \\/ _ \\             |   
|    | |___| | | | | | |_) | | (_) | |_| |  __/  __/             |
|    |_____|_| |_| |_| .__/|_|\\___/ \\__, |\\___|\\___|             |
|                    |_|            |___/                        |
|     __  __                                                     | 
|    |  \\/  | __ _ _ __   __ _  __ _  ___ _ __                   | 
|    | |\\/| |/ _\` | '_ \\ / _\` |/ _\` |/ _ \\ '__|                  |
|    | |  | | (_| | | | | (_| | (_| |  __/ |                     |
|    |_|  |_|\\__,_|_| |_|\\__,_|\\__, |\\___|_|                     | 
|                              |___/                             |
|                                                                |
◆----------------------------------------------------------------◆
`)
}

function logBanner3 () {
    console.log(
        figlet.textSync("Employee Manager", {
          font: "Big Money-sw",
          horizontalLayout: "default",
          verticalLayout: "default",
          width: 80,
          whitespaceBreak: true,
        })
      );
}

function logBanner () {
    // addBorderTobanner() takes in 3 params, the text, character for the border, and padding.
    function addBorderToBanner(text, borderCharacter = '-', padding = 2) {

        // figlet.textSync() is called with provided text and object of options
        // to generate ASCII text using figlet Library.
        const figletText = figlet.textSync(text, {
          font: "Big Money-sw",
          horizontalLayout: "default",
          verticalLayout: "default",
          width: 80,
          whitespaceBreak: true,
        });

        // we split the generated figletText into an array at new lines ('\n')
        const textLines = figletText.split('\n');
        //we use Math.max() to find the longest line in the textLones array.
        const maxLength = Math.max(...textLines.map(line => line.length));
        //the horizontalLine of the border is created by repeating the defined character of
        // '-' for the length equal to the maxLength * 2.
        const horizontalLine = '❖' + borderCharacter.repeat(maxLength + padding * 4 ) + '❖';
      
        //we iterate over each textLines, padding each line with spaces on the right to match 
        //maxLength, then we add border chars and padding on left (we rely on padEnd() adn padStart() methods). 
        const borderedFigletText = textLines.map(line => {
          const paddedLine = line.padEnd(maxLength, ' ');
          return `| ${paddedLine.padStart(maxLength + padding * 3, ' ')} |`;
        }).join('\n'); 
      
        return `${horizontalLine}\n${borderedFigletText}\n${horizontalLine}`;
      }
      
      const asciiText = ' Employee Manager ';
      const borderedText = addBorderToBanner(asciiText);
      
      console.log(borderedText);
}



export default logBanner;