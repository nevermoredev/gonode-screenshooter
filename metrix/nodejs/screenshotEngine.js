const puppeteer = require('puppeteer');


function screenshot(id,url){
    
    

    (async () => {
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

        console.log(id+"dsadas",url+"dsadasdsa");

        await browser.close();
    })();

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
}

module.exports.screenshot = screenshot;