import models from '../model/models';

const list = (req, res) => {
    // GET ALL Pets
    models.instance.Pet.findAsync({})
        .then((pets) => {
            console.log("List request success: " + JSON.stringify(pets));
            res.status(200).json({
                "desc": "Get request success.",
                "pets": pets});
        })
        .catch((err) => {
            console.log("Get request failure.");
            res.status(400).json({"desc" : "Get request failure.", "err" : err});
        });
}

const create = (req, res) => {
    // POST new Pet
    insertion = new models.instance.Pet({
        name : req.body.name,
        species: req.body.species,
        age : req.body.age,
        status: req.body.status
    });
    insertion.saveAsync()
        .then(() => {
            console.log("Post request success.");
            res.status(200).json({"desc" : "Post request success."});
        })
        .catch((err) => {
            console.log("Post request failure.");
            res.status(400).json({"desc" : "Post request failure.", "err" : err});
        });
}

const show = (req, res) => {
    if (!(req.params.name)) {
        res.status(400).json('Whoops! Please specify the pet name.');
    }
    // GET Pet by name
    models.instance.Pet.findOneAsync({name: req.params.name})
        .then((pet) => {
            console.log("Show request success.");
            res.status(200).json({
                "desc": "Show request success.",
                "name": pet.name,
                "species": pet.species,
                "age": pet.age,
                "status": pet.status
            });
        })
        .catch((err) => {
            console.log("Get request failure.");
            res.status(400).json({"desc" : "Get request failure.", "err" : err});
        });
}

const update = (req, res) => {
    if (!req.params.name) {
        res.status(400).json('Whoops! Please specify the pet name.');
    }

    let updates = {};
    if (req.body.age) {
        updates[age] = req.body.age
    }
    if (req.body.status) {
        updates[status] = req.body.status
    }

    // Update Pet by name 
    models.instance.Pet.update({name: req.params.name},
        updates, {if_exists: true})
        .then(() => {
            console.log("Update request success.");
            res.status(200).json({"desc" : "Update request success."});
        })
        .catch((err) => {
            console.log("Update request failure.");
            res.status(400).json({"desc" : "Update request failure.", "err" : err});
        });
}

const remove = (req, res) => {
    if (!req.params.name) {
        res.status(400).json('Whoops! Please specify the pet name.');
    }
    // DELETE Pet by name
    models.instance.Pet.deleteAsync({name: req.params.name})
        .then(() => {
            console.log("Delete request success.");
            res.status(200).json({"desc" : "Delete request success."});
        })
        .catch((err) => {
            console.log("Delete request failure.");
            res.status(400).json({"desc" : "Delete request failure.", "err" : err});
        })
}

export default { show, create, update, list, remove};