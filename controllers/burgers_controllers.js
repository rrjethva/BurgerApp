var express = require("express");

var router = express.Router();

var burgers = require("../models/burgers");

router.get("/", function (req, res) {
    burgers.all(function (data) {
        var hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

router.post("/api/burgers", function (req, res) {
    console.log(res.body);
    burgers.create([
        "name", "devoured"
    ], [
        req.body.name, req.body.devoured
    ], function (result) {
        console.log(result)
        res.json({ id: result.insertId });
    });
});

router.put("/api/burgers/:id", function (req, res) {
    var condition = "id = " + req.params.id;
    console.log("condition", condition);

    burgers.update(
        {
            devoured: req.body.devoured
        },
        condition,
        function (result) {
            if (result.changedRows === 0) {
                return res.status(404).end();
            }
            res.status(200).end();
        }
    );
});

module.exports = router;