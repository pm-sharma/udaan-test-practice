const express = require("express");
const User = require("../models/user");
const router = new express.Router();

router.post("/users", async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.status(201).send({ user });
    } catch (e) {
        res.status(400).send(e);
    }
});

// router.get("/users", async (req, res) => {
//     try {
//         const users = await User.find({});
//         res.status(200).send(users);
//     } catch (e) {
//         res.status(400).send(e)
//     }
// });

// deleteUser
router.post("/users/delete", async (req, res) => {
    const userEmail = req.body.email;
    console.log(req.body);
    const user = await User.findOne({ email: userEmail });
    await user.remove();
    // users = await User.dropUser({email})

    res.render("deleteUser.hbs", {
        userEmail,
    });
});

// UpdateUser
router.post("/users/update", async (req, res) => {
    const userEmail = req.body.email;
    const newName = req.body.name;
    console.log(req.body);
    const user = await User.findOne({ email: userEmail });
    if (user) {
        user["name"] = newName;
        user.save();
        res.render("update-user.hbs", {
            userEmail,
        });
    } else {
        res.render("update-user.hbs", {
            "Not Updated": "No such Email",
        });
    }
});

// For postman
router.get("/users/get", async (req, res) => {
    users = await User.find({});

    res.send(users);
});

///////////////////////////////INDEX PAGE RENDERING//////////////////////////////////////////////////////////////////////////
router.get("", (req, res) => {
    res.render("index", {
        title: "UDAAN Prep",
        name: "PS",
    });
    // res.send('Working!')
});
///////////////////////////////INDEX PAGE RENDERING//////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////TEMPLATE REDERING APIs//////////////////////////////////////////////////////////////

// render add template
router.get("/add-user", (req, res) => {
    res.render("add-user.hbs");
});

// render fetch template
router.get("/get-users", async (req, res) => {
    users = await User.find({});

    res.render("get-users.hbs", {
        users,
    });
});

// render update template
router.get("/update-user", (req, res) => {
    res.render("update-user.hbs");
});

// render delete template
router.get("/delete-user", async (req, res) => {

    res.render('deleteUser.hbs')
})

///////////////////////////////////////////TEMPLATE REDERING APIs//////////////////////////////////////////////////////////////

module.exports = router;