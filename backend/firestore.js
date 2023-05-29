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
        res.send({ message: type })
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
            }).catch((error) => {
                console.error("error adding document: ", error);
            })
        }
    })

}
