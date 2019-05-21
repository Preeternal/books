import "@babel/polyfill/noConflict";
import cron from "node-cron";
import server from "./server";
import cbr from "./cbr";

server.start({ port: process.env.PORT || 4000 }, () => {
  // eslint-disable-next-line no-console
  console.log("The server is up!");
});

cron.schedule("7 * * * * *", () => {
  // eslint-disable-next-line no-console
  console.log("running cbr");
  cbr();
});
