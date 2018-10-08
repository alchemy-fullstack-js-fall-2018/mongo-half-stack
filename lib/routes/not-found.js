module.exports = (req, res) => {
    res.statusCode = 404;
    res.end('{"error":"Unable to find record."}');
};