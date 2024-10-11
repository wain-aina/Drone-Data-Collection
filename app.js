const puppeteer = require('puppeteer');
const json2csv = require('json-2-csv');
const fs = require('fs');

const sites = [
    'https://www.amazon.com/DJI-Combo-Immersive-Multifunctional-Lightweight-Transmission/dp/B0C1GVJ5SB?ref_=ast_sto_dp&th=1&psc=1'
]

for (const site of sites){
    (async () => {

        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.goto(site);

        await page.setViewport({width: 1080, height: 1024});

        const droneSpecs = await page.evaluate(() => {

            const specsArray = [];

            specsArray.push({
                
                "Part Image": document.querySelector("#landingImage").src,
                "Part Name": document.querySelector("#productTitle").innerText,
                "Information": document.querySelector("#feature-bullets > ul > li:nth-child(3) > span").innerText,

            })

            return specsArray;
            
        })

        //console.log(droneSpecs)
        
        let options = {
            arrayIndexsAsKeys: false,
            header: false
        }

        const csv = json2csv.json2csv(droneSpecs, options);

        fs.appendFileSync('accessories/mini.csv', csv)

        await browser.close();

    })();
}