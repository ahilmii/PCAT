const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const PhotoSchema = new Schema(
    {
        title: String,
        description: String,
        image: String,
        dateCreated: {
            type: Date,
            default: Date.now
        }
    }
)

const Photo = mongoose.model('Photo', PhotoSchema) // Buradaki ilk parametre olan 'Photo' aslında veritabanının içerisindeki klasör olan 'photos' u sağlıyor. Otomatik oluşturuluyor.

module.exports = Photo