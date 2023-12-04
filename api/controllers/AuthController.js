module.exports = {
  auth: async function (req, res) {
    try {
      const { userCode, password } = req.body;

      if (!userCode || !password) {
        return res.badRequest('Kode User and password are required');
      }

      const user = await User.findOne({ idUser: userCode, password: password });

      if (!user) {
        return res.badRequest('Invalid user and password');
      }

      // Jika semuanya valid, kirimkan data pengguna sebagai respons
      return res.json(user);
    } catch (error) {
      return res.serverError(error);
    }
  },
};
