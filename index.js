const puppeteer = require("puppeteer");
const fs = require("fs");
async function generateCertificate(USER){

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  let html = fs.readFileSync("index.html", "utf-8");
  html = html.replace("$NAME",USER.name).replace("$ROLE",USER.role).replace("$SCORE",USER.score).replace("$DATE",USER.date);
  await page.setContent(html, { waitUntil: "domcontentloaded" });
  await page.emulateMediaType("screen");
  const pdf = await page.pdf({
    path: `result_new.pdf`,
    // margin: { bottom: "20px", top:"20px",right:"20px",'bottom':"20px"},
    printBackground: false,
    preferCSSPageSize: true,
    format: "A4",
    landscape: true
  });

  await browser.close();
}
generateCertificate({
  name: "Himanshu Kumar",
  role: "Developer",
  score: "100",
  date: "12 December 2022"
})