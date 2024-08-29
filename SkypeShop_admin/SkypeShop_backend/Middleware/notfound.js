const notfound = (req, res) => {
    res.status(404).send('Resource Not Found')
}

module.exports = notfound