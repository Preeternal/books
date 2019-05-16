import url from "url";
import http from "http";
import xml2js from "xml2js";

const myURL = url.parse("http://www.cbr.ru/scripts/XML_daily_eng.asp");
// console.log(myURL);

var parser = new xml2js.Parser();
const request = http.get("http://www.cbr.ru/scripts/XML_daily_eng.asp", response => {
  // save the data
  let xml = "";
  response.on("data", chunk => {
    xml += chunk;
  });
  response.on("end", () => {
    // parse xml
    parser.parseString(xml, (err, result) => {
      console.dir(result.ValCurs.Valute[0].Value[0]);
    });
  });
  // or you can pipe the data to a parser
  // response.pipe(dest);
});

request.on("error", error => {
  // debug error
});

const cbr = "";
// https://nodejs.org/de/docs/guides/timers-in-node/
export default cbr;
