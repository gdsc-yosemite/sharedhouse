/** Firestore */
module.exports = function(app, admin){

    let db = admin.firestore();

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

    app.post('/firestore', (req, res) => {
        const type = req.body.type
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
                contact: data.contact_info,
            }).then((docRef) => {
                console.log("Docment written with ID: ", docRef.id);
            }).catch((error) => {
                console.error("error adding document: ", error);
            })
        }
    })

}
