import http from "http";
import xml2js from "xml2js";
import iconv from "iconv-lite";
import prisma from "../prisma";

const cbr = "";
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
    // parse xml
    xmlParser.parseString(decodedXmlBody, async (error, result) => {
      if (result) {
        const dateArray = result.ValCurs.$.Date.split(".").map(Number);
        const date = new Date(dateArray[2], dateArray[1] - 1, dateArray[0], 12);
        console.log(date.valueOf());
        const date2 = new Date();
        console.log(date2.valueOf());
        console.dir(result.ValCurs.$.Date);
        console.dir(result.ValCurs.Valute.length);
        result.ValCurs.Valute.forEach(async element => {
          await prisma.mutation.upsertCurrency({
            where: {
              charCode: element.CharCode[0]
            },
            create: {
              name: element.Name[0],
              nominal: Number(element.Nominal[0]),
              charCode: element.CharCode[0],
              value: Number(
                element.Value[0].match(",") ? element.Value[0].replace(",", ".") : element.Value[0]
              )
            },
            update: {
              name: element.Name[0],
              nominal: Number(element.Nominal[0]),
              charCode: element.CharCode[0],
              value: Number(
                element.Value[0].match(",") ? element.Value[0].replace(",", ".") : element.Value[0]
              )
            }
          });
        });

        const enTrue = await prisma.query.currency({
          where: {
            nameEng: "Belarussian Ruble"
          }
        });

        if (!enTrue) {
          const dailyEnUrlRequest = http.get(dailyEnUrl, response => {
            const xmlChunks = [];
            response.on("data", chunk => {
              xmlChunks.push(chunk);
            });
            response.on("end", () => {
              const decodedXmlBody = iconv.decode(Buffer.concat(xmlChunks), "windows-1251");
              xmlParser.parseString(decodedXmlBody, (error, result) => {
                if (result) {
                  result.ValCurs.Valute.forEach(async element => {
                    await prisma.mutation.updateCurrency({
                      where: {
                        charCode: element.CharCode[0]
                      },
                      data: {
                        nameEng: element.Name[0]
                      }
                    });
                  });
                } else if (error) {
                  console.log(error);
                }
              });
            });
          });
          dailyEnUrlRequest.on("error", error => {
            console.log(error);
          });
        }
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

// https://nodejs.org/de/docs/guides/timers-in-node/
export default cbr;
