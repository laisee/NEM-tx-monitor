// For testing purposes, we'll use a mock NEM server
module.exports = {
  getNEMServer: function() {
    // Return a mock NEM server for testing
    const mockServers = ['alice2.nem.ninja:7890', 'alice3.nem.ninja:7890', 'alice4.nem.ninja:7890'];
    let i = Math.floor(Math.random() * mockServers.length);
    console.log("using NEM Server "+mockServers[i]+" which is number "+i+" of "+mockServers.length+" available NEM servers");
    return mockServers[i];
  }
}
