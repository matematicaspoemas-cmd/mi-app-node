const multer = require('multer')
const path = require('path')

// STORAGE

const storage = multer.diskStorage({

  destination: function(req, file, cb){

    cb(null, 'uploads/images')

  },

  filename: function(req, file, cb){

    const ext = path.extname(file.originalname)

    const nombreArchivo =
      req.user.id +
      "_" +
      req.user.nombre.replace(/\s+/g, '_') +
      ext

    cb(null, nombreArchivo)

  }

})

// FILTRO

const fileFilter = (req, file, cb) => {

  if(file.mimetype.startsWith('image/')){
    cb(null, true)
  } else {
    cb(new Error('Solo imágenes'))
  }

}

const upload = multer({

  storage,
  fileFilter

})

module.exports = upload