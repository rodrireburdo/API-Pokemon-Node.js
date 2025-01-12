import mongoose from 'mongoose';
let password = 'admin';
let databaseName = 'db';

let uri = `base de datos de mongo`;

mongoose.connect(uri)
    .then(() => console.log('Conexión exitosa a MongoDB Atlas'))
    .catch((error) => console.error('Error conectando a MongoDB Atlas:', error));

const Cat = mongoose.model('Cat', { name: String });

const kitty = new Cat({ name: 'Zildjian' });
kitty.save().then(() => console.log('meow'));