const Photo = require('../models/Photo');

exports.getAboutPage = (req, res) => {
  res.render('about');
};

exports.getAddPage = (req, res) => {
  res.render('add');
};

exports.getEditPage = async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  res.render('edit', {
    photo,
  });
};

/* burada sorgu oluşturuyoruz. veritabanındaki kayıtlarımızdan var olan fotoğrafı _id'sine göre buluyor. 
  Yani 'update' butonuna tıkladığımızda ilgili fotoğrafa ait id'yi req.params.id ile alıyoruz. yukarıda 
*/  
