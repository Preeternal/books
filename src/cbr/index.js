import http from "http";
import xml2js from "xml2js";
import iconv from "iconv-lite";

const dailyUrl = "http://www.cbr.ru/scripts/XML_daily.asp";
const dailyEnUrl = "http://www.cbr.ru/scripts/XML_daily_eng.asp";

const xmlParser = new xml2js.Parser();
const dailyUrlRequest = http.get(dailyUrl, response => {
  // save the data
  const xmlChunks = [];
  response.on("data", chunk => {
    xmlChunks.push(chunk);
  });
  response.on("end", () => {
    const decodedXmlBody = iconv.decode(Buffer.concat(xmlChunks), "windows-1251");
    // console.log(decodedXmlBody);
    // parse xml
    xmlParser.parseString(decodedXmlBody, (err, result) => {
      if (result) {
        // console.dir(result.ValCurs.Valute[0].Value[0]);
        // console.dir(result.ValCurs.Valute.length);
        // console.log(result.ValCurs.Valute[0].Name[0]);
        result.ValCurs.Valute.forEach(function(element) {
          console.log(element.Name);
        });
      } else if (err) {
        console.log(err);
      }
    });
  });
  // or you can pipe the data to a parser
  // response.pipe(dest);
});

dailyUrlRequest.on("error", error => {
  // debug error
  console.log(error);
});

// const dailyUrlEnRequest = http.get(dailyEnUrl, response => {
//   // save the data
//   let xml = "";
//   response.on("data", chunk => {
//     xml += chunk.toString("utf8");
//   });
//   response.on("end", () => {
//     // parse xml
//     parser.parseString(xml, (err, result) => {
//       // console.dir(result.ValCurs.Valute[0].Value[0]);
//       console.dir(result.ValCurs.Valute.length);
//       console.log(result.ValCurs.Valute[0].Name[0]);
//       const currencyName = result.ValCurs.Valute[0].Name[0];
//       const buf = iconv.encode(currencyName, "windows-1251");
//       const str = iconv.decode(Buffer.from(buf), "utf8");
//       // const str = buf.toString("utf8");
//       console.log(buf);
//       console.log(str);
//     });
//   });
// or you can pipe the data to a parser
// response.pipe(dest);
//});

// dailyUrlEnRequest.on("error", error => {
//   // debug error
// });

const cbr = "";
// https://nodejs.org/de/docs/guides/timers-in-node/
export default cbr;
