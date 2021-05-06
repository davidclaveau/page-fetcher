const request = require('request');
const fs = require('fs');

const args = process.argv.slice(2);
const website = args[0];
const path = args [1];

// Check the file to write to is `./` and `.html`
const extension = path.slice(-5);
const relPath = path.slice(0, 2);
const fileName = path.slice(2);

if (relPath !== './' || extension !== '.html') {
  console.log('Incorrect file name');
  return;
}

fs.access(path, fs.F_OK, (err) => {
  if (err) {
    console.log(`Creating a new file called ${fileName}`);

    request(website, (error, response, body) => {
      fs.writeFile(path, body, err => {
        if (err) {
          console.error(err);
          return;
        }
      });
      if (response.statusCode !== 200) {
        console.log("Non 200 response.\nTerminating app.");
        return;
      }
    });

  } else {
    console.log("File exists and I haven't completed the stretch yet.\nTerminating app.");
  }

});
