/* eslint-disable no-console */
import https from "https";
import xml2js from "xml2js";
import iconv from "iconv-lite";
import prisma from "../prisma";
// import url from "url";

const dailyUrl = "https://www.cbr.ru/scripts/XML_daily.asp";
const dailyEnUrl = "https://www.cbr.ru/scripts/XML_daily_eng.asp";

const xmlParser = new xml2js.Parser();

const cbr = () => {
  const dailyUrlRequest = https.get(dailyUrl, response => {
    const { statusCode } = response;
    const contentType = response.headers["content-type"];

    let error;
    if (statusCode !== 200) {
      error = new Error("Request Failed.\n" + `Status Code: ${statusCode}`);
    } else if (!/^application\/xml/.test(contentType)) {
      error = new Error(
        "Invalid content-type.\n" + `Expected application/xml but received ${contentType}`
      );
    }

    // if (statusCode > 300 && statusCode < 400 && response.headers.location) {
    //   console.log(response.headers.location);
    //   // The location for some (most) redirects will only contain the path,  not the hostname;
    //   // detect this and add the host to the path.
    //   if (url.parse(response.headers.location).hostname) {
    //     console.log("Hostname included; make request to res.headers.location");
    //   } else {
    //     console.log(
    //       "Hostname not included; get host from requested URL (url.parse()) and prepend to location."
    //     );
    //     console.log(url.parse(`https://www.cbr.ru${response.headers.location}`));
    //   }
    //   // Otherwise no redirect; capture the response as normal
    // }

    if (error) {
      console.error(error.message);
      // Consume response data to free up memory
      response.resume();
      return;
    }

    // save the data
    const xmlChunks = [];
    response.on("data", chunk => {
      xmlChunks.push(chunk);
    });
    response.on("end", () => {
      const decodedXmlBody = iconv.decode(Buffer.concat(xmlChunks), "windows-1251");
      // parse xml
      // console.log(decodedXmlBody);
      xmlParser.parseString(decodedXmlBody, async (error, result) => {
        if (result) {
          // const dateArray = result.ValCurs.$.Date.split(".").map(Number);
          // const date = new Date(dateArray[2], dateArray[1] - 1, dateArray[0], 12);
          // console.log(date.valueOf());
          // const date2 = new Date();
          // console.log(date2.valueOf());
          // console.dir(result.ValCurs.$.Date);
          // console.log(new Date());
          // console.dir(result.ValCurs.Valute.length);
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
                  element.Value[0].match(",")
                    ? element.Value[0].replace(",", ".")
                    : element.Value[0]
                )
              },
              update: {
                name: element.Name[0],
                nominal: Number(element.Nominal[0]),
                charCode: element.CharCode[0],
                value: Number(
                  element.Value[0].match(",")
                    ? element.Value[0].replace(",", ".")
                    : element.Value[0]
                )
              }
            });
          });

          const enTrue = await prisma.query.currency({
            where: {
              nameEng: "Belarussian Ruble"
            }
          });

          if (!enTrue || result.ValCurs.Valute.length !== 34) {
            const dailyEnUrlRequest = https.get(dailyEnUrl, response => {
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
};

export default cbr;
