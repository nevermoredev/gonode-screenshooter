const puppeteer = require('puppeteer');
const http = require('http');
var fs = require('fs');
var request = require('request');
const axios = require('axios');
const url = require('url');
var path = require('path');
var appDir = path.dirname(require.main.filename);


function serverUp(){
    http.createServer((request,response)=>{
        let RequestValue =  url.parse(request.url,url);
        
        if(RequestValue.query.id != null && RequestValue.query.url != null){
            var id  = RequestValue.query.id;
            var urlNow = RequestValue.query.url;

            screenshot(id,urlNow);
            

           
        }
        
    }).listen(26001);

    
 }


async function screenshot(id,url){

        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(''+url+'');
        await page.setViewport({
            width: 1920,
            height: 1080
        });

        await autoScroll(page);

        file_screenshot =  await page.screenshot({
            path: 'tmp/'+id+'.jpeg',
            fullPage: true
        });

        moveFile(appDir+'/tmp/'+id+'.jpeg');

        console.log(id+"dsadas",url+"dsadasdsa");

        await browser.close();

}
async function autoScroll(page){
    await page.evaluate(async () => {
        var scrollHeight = 5000;
        await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                
                window.scrollBy(0, distance);
                totalHeight += distance;

                if(totalHeight >= scrollHeight){
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });
}

  function moveFile(file){

    request.post({
        url: 'http://localhost:26002',
        image: {
            file: fs.createReadStream(file),
            channels: 'sample',
            title: 'sampletitle',
        }
 });

};

serverUp();