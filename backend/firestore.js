/** Firestore */
module.exports = function(app, admin){

    let db = admin.firestore();
    const auth = admin.auth();

    app.get('/firestore/listings', (req, res) => {
        db.collection('listing').get().then((snapshot) => {
            const data = [];
            snapshot.forEach((doc) => {
                data.push({id: doc.id, ...doc.data() })
                console.log(doc.id, '=>', doc.data());
            });
            res.send(data);
        })
        .catch((err) => {
            console.error('Error getting documents', err);
        });
    })

    app.post('/firestore/delete', (req, res) => {
        const id = req.body.id;
        db.collection("listing").doc(id).delete().then(() => {
            console.log("Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    })

    app.get('/firestore/my-listings', (req, res) => {
        const user_id = req.query.userId;
        console.log("userid: ", user_id);
        db.collection('listing').where("_userId","==", user_id).orderBy('_createdAt').get().then((snapshot) => {
            const data = [];
            snapshot.forEach((doc) => {
                data.push({id: doc.id, ...doc.data() })
                console.log(doc.id, '=>', doc.data());
            });
            console.log("data", data);
            res.send(data);
        })
        .catch((err) => {
            console.error('Error getting documents', err);
        });
    })

    app.post('/firestore', (req, res) => {
        const type = req.body.type
        const user = req.body.curUser
        console.log('type', type);
        const data = req.body.data
        console.log('images', req.body.images);
        res.send({ message: type })
        let id = '';
        if (type == 'listing') {
            db.collection(type).add({
                name: data.listing_title,
                address: data.address,
                location: data.location,
                sqft: data.property_sqft,
                rate: data.listing_price,
                start_date: data.lease_start_date,
                end_date: data.lease_end_date,
                description: data.description,
                contact: data.contact,
                _createdAt: admin.firestore.FieldValue.serverTimestamp(),
                _userId: user,
                images: req.body.images,
            }).then((docRef) => {
                console.log("Docment written with ID: ", docRef.id);
                id = docRef.id
                docRef.update({
                    _id: id
                })
            }).catch((error) => {
                console.error("error adding document: ", error);
            })
        }
    })

    app.get('/firestore/detail', (req, res) => {
        const id = req.query.id;
        var docRef = db.collection('listing').doc(`${id}`);

        docRef.get().then((doc) => {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                res.send(doc.data());
            } else {
                doc.data() // will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        }); 
    })

}
