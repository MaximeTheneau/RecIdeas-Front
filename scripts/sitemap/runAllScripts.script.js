const fs = require('fs');
const { exec } = require('child_process');

const runAllScripts = () => {
  const scriptFolder = './scripts/sitemap/';

  fs.readdir(scriptFolder, (err, files) => {
    if (err) {
      console.error('Error reading the scripts folder:', err);
      return;
    }

    // Filter files with the .script.js extension
    const scriptRegex = /\.script\.js$/;
    const scriptFiles = files.filter((file) =>
      // Exclude the runAllScripts.js file itself
      scriptRegex.test(file) && file !== 'runAllScripts.script.js');

    // Execute each matching file
    scriptFiles.forEach((file) => {
      exec(`node ${scriptFolder}${file}`, (err, stdout, stderr) => {
        if (err) {
          console.error(`Error executing ${file}: ${err}`);
          return;
        }
        console.log(`Execution of ${file} completed.`);
        console.log(stdout);
      });
    });
  });
};

runAllScripts();
