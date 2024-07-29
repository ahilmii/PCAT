const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

// connect DB
mongoose.connect('mongodb://localhost/pcat-test-db');
// create schema

const PhotoSchema = new Schema(
    {
        title: String,
        description: String
    }
)

const Photo = mongoose.model('Photo', PhotoSchema) // Buradaki ilk parametre olan 'Photo' aslında veritabanının içerisindeki klasör olan 'photos' u sağlıyor. Otomatik oluşturuluyor.

// create a photo
/*
Photo.create(
    {
        title:'Photo Title 4 from VS',
        description:'Photo Description 4 from VS'
    }
);
*/

// read a photo

/*
Photo.find({}) // {} içerisi kriter (sorgu) belirtmediğimiz için boş.
  .then(data => {
    console.log(data);
  })
  .catch(err => {
    console.error(err);
  });
*/

const filter = { title: 'photo 1' };
const update = { description: 'gkmk' }


Photo.updateOne(filter, update)
  .then(result => {
    console.log(result); // Güncelleme işlemi hakkında bilgi
  })
  .catch(err => {
    console.error(err);
  });

  
/* 
const filter = { description: 'photo 2 description' };
const update = { size: '150' };
illk başta bu şekilde denemiştim ve hata almıştım. hata alıyorum çünkü yukarıda şema oluştururken 'size' tanımlamadık.
*/

/* 
eğer Schema'nın içerisine 'size' parametresini de eklersem ve güncelleme işlemini de aşağıdaki gibi yaparsam çalışır.

const filter = { title: 'photo 1' };
const update = { size: 500 }
*/
