const jwt = require('jsonwebtoken')
module.exports = {
  auth: async function (req, res) {
    try {
      const { userCode, password } = req.body

      if (!userCode || !password) {
        return res.badRequest('Kode User and password are required')
      }

      const user = await User.getDatastore().sendNativeQuery(`
              select b.nama, AES_DECRYPT(a.id_user, 'nur') as user,
              AES_DECRYPT(a.password, 'windi') as password
        from user a, petugas b
        where AES_DECRYPT(a.id_user, 'nur')=b.nip
              and b.status='1'
              and AES_DECRYPT(a.id_user, 'nur')=${userCode}
              and AES_DECRYPT(a.password, 'windi')=${password}
        group by b.nip
        union
        select b.nm_dokter as nama, AES_DECRYPT(a.id_user, 'nur') as user,
              AES_DECRYPT(a.password, 'windi') as password
        from user a, dokter b
        where AES_DECRYPT(a.id_user, 'nur')=b.kd_dokter
              and b.status='1'
              and AES_DECRYPT(a.id_user, 'nur')=${userCode}
              and AES_DECRYPT(a.password, 'windi')=${password}
        `)

      if (user.rows.length < 1) {
        return res.badRequest('Invalid user and password')
      }

      // Buat payload untuk token JWT
      const payload = {
        idUser: userCode,
        password: password,
        exp: Math.floor(Date.now() / 1000) + (5 * 60 * 60),
      }

      const secretKey = process.env.ESIGN_SECRET_KEY

      // Hasilkan token JWT dari payload dan secret key
      const token = jwt.sign(payload, secretKey)
      user.accessToken = token
      user.email = 'admin.rsuktgpriok@gmail.com'
      user.name = 'admin'
      user.avatar = 'assets/images/avatars/brian-hughes.jpg'
      // Jika semuanya valid, kirimkan data pengguna sebagai respons
      return res.json(user)
    } catch (error) {
      return res.serverError(error)
    }
  },

  authWithToken: async function (req, res) {
    // Ambil token dari header permintaan
    const tokenWithBearer = req.headers.authorization

    // Jika token tidak ada, kembalikan kesalahan
    if (!tokenWithBearer) {
      return res.badRequest('Token not provided')
    }

    var [, token] = tokenWithBearer.split(' ')

    if(token == undefined){
      token = tokenWithBearer;
    }

    const secretKey = process.env.ESIGN_SECRET_KEY

    // Verify token dan dapatkan payload langsung
    const payload = jwt.verify(token, secretKey)
    // Token masih berlaku, lanjutkan dengan login
    const userId = payload.idUser
    const password = payload.password
    const user = await User.findOne({ idUser: userId, password: password })

    if (!user) {
      return res.badRequest('User not found')
    }

    const newPayload = {
      idUser: user.idUser,
      password: user.password,
      exp: Math.floor(Date.now() / 1000) + (5 * 60 * 60),
    };

    const newToken = jwt.sign(newPayload, secretKey);
    user.accessToken = newToken;

    user.email = 'admin.rsuktgpriok@gmail.com'
    user.name = 'admin'
    user.avatar = 'assets/images/avatars/brian-hughes.jpg'

    // Jika semuanya valid, kirimkan data pengguna sebagai respons
    return res.json(user)
  },
}
