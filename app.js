const express        = require('express');
const fileUpload     = require('express-fileupload');
const mongoose       = require('mongoose');
const methodOverride = require('method-override');

const ejs = require('ejs');

const photoController = require('./controllers/photoController')
const pageController  = require('./controllers/pageController');

const app = express();

mongoose.connect('mongodb+srv://ahilmi:XqWjHEQGG56fHE0f@firstappwithnode.lffpkvp.mongodb.net/?retryWrites=true&w=majority&appName=firstappwithnode')
.then(() => {
  console.log('DB CONNECTED')
}).catch((err) => {
  console.log(err)
});

// TEMPLATE ENGINES
app.set('view engine', 'ejs'); // Bu ayar yapıldığında, Express .ejs uzantılı dosyaları otomatik olarak tanır ve bunları şablon dosyaları olarak kullanır.

// MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(methodOverride('_method', {
  methods:['POST', 'GET']
}));


// ROUTES
app.get('/', photoController.getAllPhotos);        // bu kısım bütün fotoğrafların olduğu anasayfa kısmı
app.get('/photos/:id', photoController.getPhoto); // :id diyerek URL parametresi belirrtmiş oluyoruz. params.id de URL'den o gelen id'yi alıyor.
app.post('/photos', photoController.createPhoto);
app.put('/photos/:id', photoController.updatePhoto)
app.delete('/photos/:id',  photoController.deletePhoto)



app.get('/about', pageController.getAboutPage);
app.get('/add', pageController.getAddPage);

app.get('/photos/edit/:id', pageController.getEditPage)





const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Sunucu ${port} de başlatıldı.`);
});




// console.log(req.query) desem ve url'den bir sorgu girsem (?user=test&pass=123 gibi) consol'a obje şeklinde yazar.