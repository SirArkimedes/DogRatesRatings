var fs = require('fs');

// Load array of JSON tweets.
var tweets = JSON.parse(fs.readFileSync('Tweets.json', 'utf8'));
var filteredTweets = tweets.filter(function (object,n) {
  return object.text.includes("This is ");
})

// Get the individual ratings.
var ratings = [];
for (var i = 0; i < filteredTweets.length; i++) {
  var matched = filteredTweets[i].text.match(/[0-9][0-9][\/][0-9][0-9]/g);

  // Some are null, since they are RTs and don't match the regex.
  if (matched != null) {
    var fields = matched[0].split(/\//g);
    ratings.push(fields[0]);
  }
}

console.log(ratings);
fs.writeFile("Results.csv", ratings, function(error) {
    if (error) {
        return console.log(error);
    }

    console.log("The file was saved!");
});
