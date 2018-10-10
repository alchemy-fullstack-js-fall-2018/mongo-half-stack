module.exports = req => {
    return new Promise((resolve, reject) => {
        
        if(req.method === 'GET' || req.method === 'DELETE') return resolve();
        
        const headers = req.headers || req.getHeaders();
        if(headers['content-type'] !== 'application/json') {
            return reject('Nu ugh NOT TODAY..Only JSON allowed');
        }

        let data = '';
        req.on('data', chunk => {
            data += chunk;
        });

        req.on('end', () => {
            resolve(JSON.parse(data));
        });
    });
};
