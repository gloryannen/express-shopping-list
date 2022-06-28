const express = require ('express');
const ExpressError = require('./expressError');
const router =  new express.Router();
const items = require('./fakeDb')

/** Get list of items */
router.get('/', (req, res)=> {
    res.status(200).json({items})
})

/** Post an item */
router.post('/', (req, res, next)=>{
    try{
        let newItem = {name: req.body.name, price: req.body.price};
        items.push(newItem);
        return res.status(201).json({'added':{newItem}})

    }catch(e){
        return next(e)
    }
})

/** Get an item by its name */
router.get('/:name', (req, res, next)=>{
    let foundItem = items.find((i) => i.name === req.params.name);
    if (!foundItem) throw new ExpressError("invalid username", 404)
	return res.status(200).json({ items: foundItem });
})

/** Updates an item */
router.patch('/:name', (req, res, next) =>{
    let foundItem = items.find((item) => item.name === req.params.name);
	foundItem.name = req.body.name;
	foundItem.price = req.body.price;
	return res.status(201).json({'updated':{items: foundItem}});
})

/** Deletes an item */
router.delete('/:name', (req, res, next) => {
    let foundItem = items.findIndex((item) => item.name === req.params.name);
	items.splice(foundItem, 1);
	return res.json({ msg: 'Deleted' });
})

module.exports = router;