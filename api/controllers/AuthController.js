const jwt = require('jsonwebtoken');
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
        password: user.password,
        exp: Math.floor(Date.now() / 1000) + 5,
      };

      const secretKey = process.env.ESIGN_SECRET_KEY;

      // Hasilkan token JWT dari payload dan secret key
      const token = jwt.sign(payload, secretKey);
      user.accessToken = token;
      user.email = 'admin.rsuktgpriok@gmail.com';
      user.name = 'admin';
      user.avatar = 'assets/images/avatars/brian-hughes.jpg';
      // Jika semuanya valid, kirimkan data pengguna sebagai respons
      return res.json(user);
    } catch (error) {
      return res.serverError(error);
    }
  },

  authWithToken: async function (req, res) {
    // Ambil token dari header permintaan
    const tokenWithBearer  = req.headers.authorization;

    // Jika token tidak ada, kembalikan kesalahan
    if (!tokenWithBearer) {
      return res.badRequest('Token not provided');
    }

    const [, token] = tokenWithBearer.split(' ');

    const secretKey = process.env.ESIGN_SECRET_KEY;

    // Verify token dan dapatkan payload langsung
    const payload = jwt.verify(token, secretKey);
    // Token masih berlaku, lanjutkan dengan login
    const userId = payload.idUser;
    const password = payload.password;
    const user = await User.findOne({ idUser: userId, password: password });

    if (!user) {
      return res.badRequest('User not found');
    }

    user.accessToken = token;
    user.email = 'admin.rsuktgpriok@gmail.com';
    user.name = 'admin';
    user.avatar = 'assets/images/avatars/brian-hughes.jpg';

    // Jika semuanya valid, kirimkan data pengguna sebagai respons
    return res.json(user);
}
};
