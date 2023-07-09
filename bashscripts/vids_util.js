// Node utility to dynamically create json from photos directory

const path = require("path");
const fs = require("fs");
// const directoryPath = path.join(__dirname, "./");

// Family Photos

// const directoryPath = "/home/dre/repos/son/assets/familyphotos/";
//
// //passsing directoryPath and callback function
// fs.readdir(directoryPath, function (err, files) {
//   //handling error
//   if (err) {
//     return console.log("Unable to scan directory: " + err);
//   }
//
//   let output = files
//     .filter((file) => file.includes("jpg"))
//     .map((item) => {
//       return `/home/dre/repos/son/assets/familyphotos/${item}`;
//     });
//   fs.writeFileSync("./data/familyphotos.js", JSON.stringify(output));
//   console.log(output);
// });

//_____________________________________________________________________________________

//  Cool Videos
const videoPath = "/home/dre/repos/son/assets/videos/";
const thumbnailPath = "/home/dre/repos/son/assets/videos/thumbnails";

fs.readdir(videoPath, function (err, files) {
  //handling error
  if (err) {
    return console.log("Unable to scan directory: " + err);
  }

  let filenames;
  let thumbnails;
  let names = [];

  filenames = files
    .filter((file) => file.includes("mp4"))
    .map((item) => {
      names.push(item.split(".")[0]);
      return `require('/home/dre/repos/son/assets/videos/${item}')`;
    });
  // fs.writeFileSync("./data/coolvideos.js", JSON.stringify(output));

  fs.readdir(thumbnailPath, function (err, files) {
    //handling error
    if (err) {
      return console.log("Unable to scan directory: " + err);
    }

    thumbnails = files
      .filter((file) => file.includes("jpg"))
      .map((item) => {
        return `require('/home/dre/repos/son/assets/videos/thumbnails/${item}')`;
      });
    console.log(filenames, thumbnails, names);
    output = [];
    for (let i = 0; i < filenames.length; i++) {
      let entry = {
        name: `${names[i]}`,
        thumbnail: `${thumbnails[i]}`,
        filename: filenames[i],
        id: i,
      };
      output.push(entry);
    }
    console.log(output);

    fs.writeFileSync("../data/coolvideos.js", JSON.stringify(output));
  });
});
