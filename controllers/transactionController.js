const nemSdk = require('nem-sdk').default;
const request = require('request-promise');

async function processTransaction(address, nemServer, updateUrl) {
  const errors = [];
  if (!address || !nemServer || !updateUrl) {
    errors.push('Invalid input parameters');
    return errors;
  }

  let url;
  try {
    url = `http://${nemServer}/account/transfers/incoming?address=${address}`;
  } catch (error) {
    errors.push(`Error constructing URL: ${error}`);
    return errors;
  }

  const options = { uri: url, json: true };

  try {
    const body = await request(options);
    if (body && body.data.length > 0) {
      for (const txn of body.data) {
        const senderAddress = nemSdk.model.address.toAddress(txn.transaction.signer, 104);
        const data = {
          wallet_address: senderAddress,
          tx_id: txn.meta.id,
          tx_hash: txn.meta.hash.data,
          amount: txn.transaction.amount,
          currency: 'NEM'
        };

        try {
          const response = await request.post({
            url: updateUrl,
            method: "POST",
            json: true,
            body: data
          });

          if (response.statusCode !== 200) {
            errors.push(`Error ${response.statusCode} while updating wallet ${senderAddress}`);
          }
        } catch (error) {
          errors.push(`Error processing wallet updates ${error}`);
        }
      }
    } else {
      console.log(`No transactions for address ${address} at ts ${new Date()}`);
    }
  } catch (error) {
    errors.push(`Error processing wallet updates ${error}`);
  }

  return errors;
}
module.exports = { processTransaction };
