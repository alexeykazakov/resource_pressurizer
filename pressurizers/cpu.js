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
    // Run for 10 minutes
    for(let stop = Date.now(); stop - start < 600000; stop = Date.now()) {
        if(isPrimeSync(i)) {
            logger.info(`Elapsed time: ${stop-start}`);
            const msg = `${i} is prime\n`;
            logger.info(msg);
            await fs.promises.appendFile(outputFilename, msg)
                .catch(e => {
                    logger.error(e.message)
                });
            // Pause for 1ms second
            await new Promise(resolve => setTimeout(resolve, 1));
        }
        i++;
    }
}

module.exports = {pressureCpu: pressurizeCpu}