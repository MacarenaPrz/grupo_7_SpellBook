let {products} = require('../dataBase/dataBase.js');

module.exports={
    index: (req, res) => { res.render('index')},
    product: (req, res) => { res.render('products/productDetail')},
    cart: (req, res) => { res.render('products/shoppingCart')},
    books: (req, res) => { res.render('products/books')},
    novelties: (req, res) => { 
        let booksNovelties = products.slice(products.length-4);
      /*   res.send(booksNovelties) */
        res.render('products/novelties', {
            booksNovelties : booksNovelties
        })},
    aboutUs: (req, res) => { res.render('aboutUs')},

}