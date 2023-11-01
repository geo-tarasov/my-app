const cron = require('node-cron');
const tokenService = require('../../service/token-service');

module.exports = () => {
  cron.schedule('* */1 * * * *', async () => {
    await tokenService.clearDb();
  });
}