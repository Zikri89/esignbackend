const jwt = require('jwt-simple');
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

      // Buat payload untuk token JWT
      const payload = {
        idUser: user.idUser,
        password: user.password
      };

      const secretKey = process.env.ESIGN_SECRET_KEY;

      // Hasilkan token JWT dari payload dan secret key
      const token = jwt.encode(payload, secretKey);
      user.accessToken = token;
      user.email = 'admin.rsuktgpriok@gmail.com';
      user.name = 'admin';
      user.avatr = 'assets/images/avatars/brian-hughes.jpg';
      // Jika semuanya valid, kirimkan data pengguna sebagai respons
      return res.json(user);
    } catch (error) {
      return res.serverError(error);
    }
  },
};
