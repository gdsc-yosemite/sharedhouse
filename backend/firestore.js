/** Firestore */
module.exports = function(app, admin){

    let db = admin.firestore();

    app.get('/firestore', (req, res) => {
        res.json({ message: "HI" })
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
                contact: data.contact_info,
            }).then((docRef) => {
                console.log("Docment written with ID: ", docRef.id);
            }).catch((error) => {
                console.error("error adding document: ", error);
            })
        }
    })

}
