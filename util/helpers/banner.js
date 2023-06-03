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

function logBanner () {
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




export default logBanner;