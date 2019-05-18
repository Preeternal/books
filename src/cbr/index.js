import http from "http";
import xml2js from "xml2js";
import iconv from "iconv-lite";
import prisma from "../prisma";
import getClient from "../../tests/utils/getClient";
import { createCurrency, updateCurrency } from "../../tests/utils/operations";

const cbr = "";
const dailyUrl = "http://www.cbr.ru/scripts/XML_daily.asp";
const dailyEnUrl = "http://www.cbr.ru/scripts/XML_daily_eng.asp";
const client = getClient();

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
    xmlParser.parseString(decodedXmlBody, async (error, result) => {
      if (result) {
        await prisma.mutation.deleteManyCurrencies();
        const dateArray = result.ValCurs.$.Date.split(".").map(Number);
        const date = new Date(dateArray[2], dateArray[1] - 1, dateArray[0], 12);
        console.log(date.valueOf());
        const date2 = new Date();
        console.log(date2.valueOf());
        console.dir(result.ValCurs.$.Date);
        console.dir(result.ValCurs.Valute.length);
        result.ValCurs.Valute.forEach(async element => {
          // console.log(element.Name[0]);
          // console.log(Number(element.Nominal[0]));
          // console.log(element.CharCode[0]);
          // console.log(
          //   Number(
          //     element.Value[0].match(",") ? element.Value[0].replace(",", ".") : element.Value[0]
          //   )
          // );
          const variables = {
            data: {
              name: element.Name[0],
              nominal: Number(element.Nominal[0]),
              charCode: element.CharCode[0],
              value: Number(
                element.Value[0].match(",") ? element.Value[0].replace(",", ".") : element.Value[0]
              )
            }
          };
          const response = await client.mutate({
            mutation: createCurrency,
            variables
          });
        });
      } else if (error) {
        console.log(error);
      }
    });
  });
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
// https://nodejs.org/de/docs/guides/timers-in-node/
export default cbr;
