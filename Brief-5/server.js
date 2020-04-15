const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const fs = require('fs')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "public")))

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/Gallerie.html'))
})

app.get('/inscription', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/page-inscription.html'))
})

// Client / Create
app.post('/register', (req, res) => {
    var Data = fs.readFileSync('Client.json', 'utf-8');
    var arrayOfObjects = JSON.parse(Data);

    var cin = arrayOfObjects.length + 1;
    var utilisateur = {
        Cin: cin,
        Nom: req.body.nom,
        Prenom: req.body.prenom,
        Email: req.body.email,
        Password: req.body.password,
        Telephone: req.body.telephone
    }

    arrayOfObjects.push(utilisateur)
    fs.writeFileSync('Client.json', JSON.stringify(arrayOfObjects, null, 2))

    res.json('Vous avez inscrit avec succés');

});

// Client / Update
app.post('/modifier_compte', (req, res) => {
    var Data = fs.readFileSync('Client.json', 'utf-8');
    var arrayOfObjects = JSON.parse(Data);

    var cin = parseInt(req.body.cin);
    var utilisateur = {
        Cin: cin,
        Nom: req.body.nom,
        Prenom: req.body.prenom,
        Email: req.body.email,
        Password: req.body.password,
        Telephone: req.body.telephone
    }

    arrayOfObjects[cin - 1] = utilisateur;
    fs.writeFileSync('Client.json', JSON.stringify(arrayOfObjects, null, 2))

    res.json('Vous avez modifier votre données avec succés');
});

// Client / Delete
app.post('/supprimer_compte', (req, res) => {
    var Data = fs.readFileSync('Client.json', 'utf-8');
    var arrayOfObjects = JSON.parse(Data);

    var cin = req.body.cin;

    arrayOfObjects.splice(cin - 1, 1);
    fs.writeFileSync('Client.json', JSON.stringify(arrayOfObjects, null, 2))

    res.json('Vous avez supprimer votre compte avec succés');

});


app.get('/reservation', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/page-reservation.html'))
})

// Reservation / Create
app.post('/reserver', (req, res) => {
    var Data = fs.readFileSync('Reservation.json', 'utf-8');
    var arrayOfObjects = JSON.parse(Data)
    var resID = arrayOfObjects.length + 1;
    var cin = parseInt(req.body.cin);

    var reservation = {
        ResID: resID,
        Cin: cin,
        Nom: req.body.nom,
        Prenom: req.body.prenom,
        Email: req.body.email,
        Telephone: req.body.telephone,
        DateNaissance: req.body.naissance,
        DateDebut: req.body.dateDebut,
        DateFin: req.body.dateFin,
        NombrePersonne: req.body.nombrePersonne
    }

    arrayOfObjects.push(reservation)
    fs.writeFileSync('Reservation.json', JSON.stringify(arrayOfObjects, null, 2))

    res.json('Vous avez bien réserver');
})


// Reservation / Update
app.post('/modifier_reservation', (req, res) => {
    var Data = fs.readFileSync('Reservation.json', 'utf-8');
    var arrayOfObjects = JSON.parse(Data);

    var resID = req.body.resID;
    var cin = parseInt(req.body.cin);
    var reservation = {
        ResID: resID,
        Cin: cin,
        Nom: req.body.nom,
        Prenom: req.body.prenom,
        Email: req.body.email,
        Telephone: req.body.telephone,
        DateNaissance: req.body.naissance,
        DateDebut: req.body.dateDebut,
        DateFin: req.body.dateFin,
        NombrePersonne: req.body.nombrePersonne
    }

    arrayOfObjects[resID - 1] = reservation;
    fs.writeFileSync('Reservation.json', JSON.stringify(arrayOfObjects, null, 2))

    res.json('Vous avez modifier votre reservation avec succés');
});

// Reservation / Delete
app.post('/supprimer_reservation', (req, res) => {
    var Data = fs.readFileSync('Reservation.json', 'utf-8');
    var arrayOfObjects = JSON.parse(Data);

    var resID = req.body.resID;

    arrayOfObjects.splice(resID - 1, 1);
    fs.writeFileSync('Reservation.json', JSON.stringify(arrayOfObjects, null, 2))

    res.json('Vous avez supprimer votre reservation avec success');

});

// Partie login
app.get('/signin', function (req, res) {
    res.sendFile(path.resolve(__dirname, "public/signin.html"));
});

app.post('/signin', function (req, res) {
    var email = req.body.email;
    var password = req.body.password;
    var Data = fs.readFileSync('Client.json', 'utf-8');
    var arrayOfObjects = JSON.parse(Data);
    var cin = -1;

    arrayOfObjects.forEach(client => {
        if (email == client.Email && password == client.Password) {
            cin = client.Cin;
        }
    });

    if (cin != -1) {
        var reservations = fs.readFileSync('Reservation.json', 'utf-8');
        var arrayOfReservations = JSON.parse(reservations);
        var clientReservations = [];

        arrayOfReservations.forEach(reservation => {
            if (cin == reservation.Cin) {
                clientReservations.push(reservation.ResID);
            }
        });

        res.render('reponse', { message: 'Vous avez authentifier avec success', cin: cin, reservations: JSON.stringify(clientReservations) })
    } else {
        res.render('reponse', { message: 'Votre email ou mot de passe est incorrect', cin: cin, reservations: JSON.stringify(clientReservations) })
    }

})

app.listen(4000, function () {
    console.log('Hello')
})