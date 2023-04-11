/** Firestore */
module.exports = function(app, admin){

    let db = admin.firestore();

    app.post('/api', (req, res) => {
        const text = req.body.name
        res.send({ message: text })
        db.collection("names").add({
            name: text
        }).then((docRef) => {
            console.log("Docment written with ID: ", docRef.id);
        }).catch((error) => {
            console.error("error adding document: ", error);
        })
    })

}
