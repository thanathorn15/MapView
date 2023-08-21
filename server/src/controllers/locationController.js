const {Location} = require ('../models')

exports.createLocation = async (req, res,next) => {
    try {
  const rs = await Location.create(req.body)
     res.json(rs)
    }catch(err) {
        next(err)
    }
 }