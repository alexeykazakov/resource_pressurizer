const {logger} = require("../logger");
const fs = require('fs');
const process = require('process');

const isPrimeSync = (num) => {
    for(let i = 2, s = Math.sqrt(num); i <= s; i++)
        if(num % i === 0) return false;
    return num > 1;
}

const outputFilename = 'outputCpu.txt'
const start = Date.now();

const pressurizeCpu = async () => {
    let i = 0;
    // Run for 5 minutes
    for(let stop = Date.now(); stop - start < 300000; stop = Date.now()) {
        // Check every 100th number
        if(i % 100 === 0 && isPrimeSync(i)) {
            logger.info(`Elapsed time: ${stop-start}`);
            const msg = `${i} is prime\n`;
            logger.info(msg);
            await fs.promises.appendFile(outputFilename, msg)
                .catch(e => {
                    logger.error(e.message)
                });
        }
        i++;
        // Add a 10ms pause every 100 iterations
        if(i % 100 === 0) {
            await new Promise(resolve => setTimeout(resolve, 10));
        }
    }
}

module.exports = {pressureCpu: pressurizeCpu}