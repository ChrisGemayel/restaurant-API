const express = require('express');
const MenuRouter = express.Router();

const Menu = require('./models/Menu');

MenuRouter.route('/create').post(function (req, res) {
	const menuItem = new Menu(req.body);
	console.log(menuItem);
	menuItem.save()
	 .then(menuItem => {
		res.json('Menu Item added successfully');
	 })
	 .catch(err => {
		res.status(400).send("unable to save to the database");
	 });
});

MenuRouter.route('/').post(function (req, res) {
	const myid = new Menu(req.body)
	Menu.find({_id : myid._id}, (err, menuItem) => {
        console.log("specific menu item fetched:", menuItem);
		res.json(menuItem)
		})
});

MenuRouter.route('/getall').get(function (req, res) {
    Menu.find({}, (err, menuItem) => {
        console.log("fetched all menu items", menuItem);
        res.json(menuItem)
    })
});

module.exports = MenuRouter;