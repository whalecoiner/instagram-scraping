const fetch = require('node-fetch')

module.exports = () =>
  new Promise((resolve, reject) => {
    fetch("http://spys.me/proxy.txt")
      .then(res => res.text())
      .then(ipport => {
        const regex = /[0-9]+(?:\.[0-9]+){3}:[0-9]+/gm;
        const allIP = []

        while ((m = regex.exec(ipport)) !== null) {
          if (m.index === regex.lastIndex) {
            regex.lastIndex++
          }

          m.map(ip => {
            allIP.push(ip);
          });
        }

        resolve(allIP)
      })
  })
