const {logger} = require('../logger');
const axios = require('axios');
const fs = require('fs');
const process = require('process');

const start = Date.now();


const pressurizeNetwork = async ()=> {
    const outputFilename = 'outputNetwork.txt'
    async function callApi() {
        const url = `https://api.publicapis.org/entries`;
        const config = {
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json'
            }
        }
        logger.info(`Getting data from ${url} at: ${Date.now()}`);
        //Go get a joke
        const response = await axios({
            url: url,
            method: 'get',
            headers: config.headers
        }).catch(e => {
            logger.error(e.message);
        });
        let msg =`No data received from ${url}`
        try {
            if (response.data) {
                msg = `Received from ${url}: ${JSON.stringify(response.data)}`
            }
        } catch (e) {
            logger.error(e.message)
        }
        logger.info(msg)
        await fs.promises.appendFile(outputFilename, msg)
            .catch(e => {
                logger.error(e.message)
            })
    }
    // Run for 10 minutes
    for(let stop=Date.now();stop-start < 600000;stop = Date.now()){
        await callApi();
        // Pause for 50ms second between requests
        await new Promise(resolve => setTimeout(resolve, 50));
    }
}


module.exports = {pressureNetwork: pressurizeNetwork};
