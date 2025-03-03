const getUserController = async (req, res) => {
    res.status(200).send("User data");
};

module.exports = { getUserController };
