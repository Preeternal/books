// const request = new XMLHttpRequest();
// request.open("GET", "http://www.cbr.ru/scripts/XML_daily_eng.asp", false);
// request.send();
// const cbr = request.responseXML;

import url from "url";
import http from "http";

const myURL = url.parse("http://www.cbr.ru/scripts/XML_daily_eng.asp");
const cbr = myURL;

console.log(cbr);

const req = http.get("http://www.cbr.ru/scripts/XML_daily_eng.asp", function(res) {
  // save the data
  console.log(res);
  var xml = "";
  res.on("data", function(chunk) {
    xml += chunk;
  });

  res.on("end", function() {
    // parse xml
  });

  // or you can pipe the data to a parser
  // res.pipe(dest);
});

req.on("error", function(err) {
  // debug error
});

export default cbr;
