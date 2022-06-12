class errorHandler
{
    async error404(req, res) {
        return res.status(404).json({
            message : 'Your Request Not Found',
            success : false
        })
    }
}
module.exports = new errorHandler();