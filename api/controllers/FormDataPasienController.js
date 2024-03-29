const fs = require('fs')
const path = require('path')
const sharp = require('sharp')
const uuid = require('uuid')
const imageType = require('image-type')

module.exports = {
  find: async function (req, res) {
    try {
      const formDataPasien = await FormDataPasien.find({ isDeleted: false })

      if (!formDataPasien) {
        return res.notFound('Form Data Pasien not found')
      }

      return res.json(formDataPasien)
    } catch (error) {
      return res.serverError(error)
    }
  },

  findById: async function (req, res) {
    try {
      const formDataPasienId = req.param('id')
      const formDataPasien = await FormDataPasien.find({
        noRawat: formDataPasienId,
        isDeleted: false,
      })

      if (!formDataPasien) {
        return res.notFound('Form Data Pasien not found')
      }

      return res.json(formDataPasien)
    } catch (error) {
      return res.serverError(error)
    }
  },

  findByIdAndFormulir: async function (req, res) {
    try {
      const formDataPasienId = req.param('id')
      const formDataPasienFormulirId = req.param('formulirId')
      const formDataPasien = await FormDataPasien.findOne({
        noRawat: formDataPasienId,
        formulir: formDataPasienFormulirId,
        isDeleted: false,
      })

      if (!formDataPasien) {
        return res.notFound('Form Data Pasien not found')
      }

      return res.json(formDataPasien)
    } catch (error) {
      return res.serverError(error)
    }
  },

  store: async function (req, res) {
    try {
      // untuk attribute model atau data gambar ttd digital di pindah di bagian halaman review form
      // const formData = req.body;
      // const base64Data = formData.dataJson.signature;
      // const imageBuffer = Buffer.from(
      //   base64Data.replace(/^data:image\/\w+;base64,/, ''),
      //   'base64'
      // );

      // // Menambahkan ekstensi gambar berdasarkan deteksi tipe
      // const detectedType = imageType(imageBuffer);
      // const imageExtension = detectedType ? detectedType.ext : 'jpg';
      // console.log('Detected Image Type:', detectedType);

      // // Menambahkan format gambar ke nama file
      // const timestamp = new Date().toISOString().replace(/[-T:]/g, '');
      // const fileName = `${timestamp}_${uuid.v4()}.${imageExtension}`;

      // const imagePath = path.join(__dirname, '../../assets/images/signature', fileName);

      // // Menggunakan ekstensi yang sesuai dengan format yang diinginkan
      // await sharp(imageBuffer)[imageExtension]().toFile(imagePath);

      // formData.dataJson.signatureFileName = fileName;
      // // Mendapatkan informasi protokol, host, dan port dari permintaan (request)
      // const protocol = req.protocol;
      // const host = req.hostname;
      // const port = req.port || '';

      // // Menentukan URL gambar secara dinamis
      // const imageUrl = `${protocol}://${host}${port ? `:${port}` : ''}/assets/images/signature/${fileName}`;
      // formData.dataJson.signatureUrl = imageUrl;

      const { noRawat, formulir } = req.body;

      const existingData = await FormDataPasien.find({ noRawat, formulir, isDeleted: false });
      if (existingData.length > 0) {
        return res.status(400).json({ error: 'Data with noRawat and formulir already exists.' });
      }

      const formDataPasien = await FormDataPasien.create(req.body).fetch();

      if (!formDataPasien) {
        return res.notFound('Form Data Pasien not created');
      }

      return res.json({
        message: 'Form Data Pasien created successfully',
        result: formDataPasien,
      });
    } catch (err) {
      if (err.code === 'E_UNIQUE') {
        return res.status(400).json({ error: 'Unique constraint violated.' });
      } else if (err.code === 'E_REQUIRED') {
        return res.status(400).json({ error: 'Required field missing.' });
      } else {
        // Handle other errors
        console.error('Error:', err.message);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  },

  update: async function (req, res) {
    try {
      const keys = Object.keys(req.body)
      const formDataPasienId = req.param('id')
      const updatedData = keys.reduce((acc, key) => {
        acc[key] = req.body[key]
        return acc
      }, {})

      const formDataPasien = await FormDataPasien.update(
        { id: formDataPasienId },
        updatedData
      ).fetch()

      if (!formDataPasien || formDataPasien.length === 0) {
        return res.notFound('Form Data Pasien not found')
      }

      return res.json({
        message: 'Form Data Pasien updated successfully',
        result: formDataPasien[0],
      })
    } catch (err) {
      if (err.code === 'E_UNIQUE') {
        return res.status(400).json({ error: 'Unique constraint violated.' })
      } else if (err.code === 'E_REQUIRED') {
        return res.status(400).json({ error: 'Required field missing.' })
      } else {
        // Handle other errors
        return res.status(500).json({ error: 'Internal Server Error' })
      }
    }
  },

  softDelete: async function (req, res) {
    try {
      const formDataPasienId = req.params.id
      if (!formDataPasienId) {
        return res.badRequest('Form Data Pasien ID is required')
      }

      const formDataPasien = await FormDataPasien.update({
        id: formDataPasienId,
      })
        .set({
          deletedBy: 'guest',
          deletedAt: new Date(),
          isDeleted: true,
          staus: 'trash',
        })
        .fetch()

      if (!formDataPasien || formDataPasien.length === 0) {
        return res.notFound('Form Data Pasien not found')
      }

      return res.json({
        message: 'Form Data Pasien deleted successfully',
        result: formDataPasien[0],
      })
    } catch (error) {
      return res.serverError(error)
    }
  },

  destroy: async function (req, res) {
    try {
      const formDataPasien = await FormDataPasien.destroy({}).fetch()

      if (!formDataPasien || formDataPasien.length === 0) {
        return res.notFound('Form Data Pasien not found')
      }

      return res.json({
        message: 'Form Data Pasien deleted successfully',
        result: formDataPasien[0],
      })
    } catch (error) {
      return res.serverError(error)
    }
  },

  destroyById: async function (req, res) {
    try {
      const formDataPasienId = req.params.id
      const formDataPasien = await FormDataPasien.destroy({
        id: formDataPasienId,
      }).fetch()

      if (!formDataPasien || formDataPasien.length === 0) {
        return res.notFound('Form Data Pasien not found')
      }

      return res.json({
        message: 'Form Data Pasien deleted successfully',
        result: formDataPasien[0],
      })
    } catch (error) {
      return res.serverError(error)
    }
  },
}
