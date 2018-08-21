var request = require('sync-request');

module.exports = {
  getNEMServer: function() {
    let res = request('GET', 'https://nodeexplorer.com/api_openapi_version');
    let nodes = JSON.parse(res.body.toString()).nodes;
    let i = Math.floor((Math.random()*nodes.length) + 1);
    console.log("using NEM Server "+nodes[i]+" which is number "+i+" of "+nodes.length+" available NEM servers");
    return nodes[i];
  }
}
