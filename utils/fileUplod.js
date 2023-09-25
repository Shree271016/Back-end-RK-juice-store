const multer = require ('multer')
// file system
const fs = require('fs')
// path file ko location access grna
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let file_destination = 'public/uploads'
        if (!fs.existsSync(file_destination)) {
            fs.mkdirSync(file_destination, { recursive: true })
        }
        cb(null, file_destination)
    },
    filename: function (req, file, cb) {
        
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix +path.extname(file.originalname))
    }
})
    const imaageFilter = (req,file,cb)=>{
        if (!file.originalname.match(/\.(jpg|JPG|png|PNG|gif|GIF|jepg|JPEG|svg|SVG|jfif|JFIF)/)){
            return cb (new Error ("invalid image file"),false)
        }
        return cb (null,true)
    
  }
  const upload = multer({ storage: storage,
    fileFilter:imaageFilter,
    limits:{
        fileSize:2000000
    }
 })
 module.exports=upload