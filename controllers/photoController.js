const Photo = require('../models/Photo');
const fs  = require('fs')
const path = require('path');



exports.getAllPhotos = async (req, res) => {
  const page = req.query.page || 1; // index.ejs içerisindeki ul listesindeki yerde a etiketleriyle sayıya tıklandığında bir url oluşuyor. req.query.page sayesinde o url'yi alıyoruz.
  const photosPerPage = 2;
  
  const totalPhotos = await Photo.find().countDocuments();
  
  const photos = await Photo.find({}).sort('-dateCreated').skip((page - 1) * photosPerPage).limit(photosPerPage)  
  res.render('index', {
    photos:photos, // burdaki (sağ taraftaki) photos yukarıdaki değişkenden geliyor. ilk baştaki ise bizim adlandırmamız.
    current: page, 
    pages: Math.ceil(totalPhotos / photosPerPage)
  });
};



exports.getPhoto = async (req, res) => {
  const photo = await Photo.findById(req.params.id);
  res.render('photo', {
    photo,
  });
};
// bu kısım her bir fotoğrafın ayrı ayrı gösterildiği kısım. photo.ejs sayfasına bakarsan orada hep photo._id veya photo.title gibi ifadeler kullandık. işte oradaki photo bu.

exports.createPhoto = async (req, res) => {
  const uploadDir = 'public/uploads';

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  let uploadedImage = req.files.image; // req.files.image yazdığımızda bize çeşitli değerler verir. dosyanın name'i, mimetype'ı, size'ı gibi.
  // form'da fotoğraf yüklediğimiz alanın 'name' değeri 'image' olduğu için '.image' yazdık.
7
  let uploadPath = __dirname + '/../public/uploads/' + uploadedImage.name;

  uploadedImage.mv(uploadPath, async () => {
    // move() fonksiyonu. ilk parametre resmin nereye yükleneceğini belirtir. ikincisinde veri tabanına resimle ilgli bilgileri ekliyoruz.
    await Photo.create({
      ...req.body, // ... sayesinde req.body içerisinde olan tüm anahtar-değer çiftlerini aldık. yani burada tekrar belirtmemize gerek yok. değişken gibi düşün.
      image: '/uploads/' + uploadedImage.name,
    });
    res.redirect('/');
  });
};



exports.updatePhoto = async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  photo.title = req.body.title;
  photo.description = req.body.description;
  await photo.save();

  res.redirect(`/photos/${req.params.id}`); // güncelleme işleminden sonra güncellenen fotoğrafın olduğu sayfayı açmasını istiyoruz.
};


exports.deletePhoto = async (req, res) => {
  const photo       = await Photo.findOne({ _id: req.params.id });
  let deletedImage  = __dirname + '/../public' + photo.image; // 'photo.image' veritabanında her fotoğrafın sahip olduğu ismi aslında. / ile başlıyor hepsi.
  fs.unlinkSync(deletedImage);

  await Photo.findByIdAndDelete(req.params.id);
  res.redirect('/');
};
