const puppeteer = require("puppeteer");
const fs = require("fs");
const express = require("express");
const app = express()
const port = 3000

async function generateCertificate(USER){
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  let html = fs.readFileSync("index.html", "utf-8");
  html = html.replace("$NAME",USER.name).replace("$ROLE",USER.role).replace("$SCORE",USER.score).replace("$DATE",USER.date);
  await page.setContent(html, { waitUntil: "domcontentloaded" });
  await page.emulateMediaType("screen");
  const pdf = await page.pdf({
    // path: `result_new.pdf`,
    // margin: { bottom: "20px", top:"20px",right:"20px",'bottom':"20px"},
    printBackground: false,
    preferCSSPageSize: true,
    format: "A4",
    landscape: true
  });
  await browser.close();
  return pdf;
}

app.get('/', async (req, res) => {
  // return pdf file 
  
  let pdf = await generateCertificate({
    name: "Himanshu Kumar",
    role: "Developer",
    score: Math.random(),
    date: "12 December 2022"
  });
  res.type("pdf")
  res.send(pdf);
}
)

app.listen(port, () => {
  console.log(`Certificate app listening at http://localhost:${port}`)
})