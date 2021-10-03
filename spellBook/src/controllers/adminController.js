const {products, writeProductsJSON} = require('../dataBase/dataBase');
const db = require('../dataBase/models');

module.exports={
    admin: (req, res) => {
       const products = db.Book.findAll()
       const recommended_age = db.RecommendedAges.findAll()
        const authors = db.Authors.findAll()

        Promise.all([
            products,
            recommended_age,
            authors
        ])

        .then(([products, recommended_age, authors] )=> {
            res.render('admin/admin', {             
                products,
                recommended_age,
                authors
        })
      
    })}, 
     newProduct: (req, res) => {
        let {titulo,
            autor, 
			cantidad, 
			precio,
			descripcion,
            recommended_age,
            publisher,
            language,
            publication_year,
            pages
         } = req.body;

         db.Book.create({
            title: titulo,
            author_id: autor, 
			stock: cantidad, 
			price: precio,
			description: descripcion,
            recommended_age_id : recommended_age,
            publisher,
            language,
            publication_year,
            pages,
            image: req.file?req.file.filename:"default-image.jpg"
         })
         .then(()=>{
             res.redirect('/admin/addProduct')
         })

         .catch(err => console.log(err));

                
    },
    editView:(req, res)=>{
        db.Book.findByPk(req.params.id) 
        .then(book=>{
          return res.render("admin/editForm",{
                idBook : book    
            })

        })
        
    },
    editProduct:(req, res)=>{
        let {titulo,
            autor, 
			cantidad, 
			precio,
			descripcion,
            recommended_age,
            publisher,
            language,
            publication_year,
            pages
         } = req.body;

            db.Book.update({
            title: titulo,
            author_id: autor, 
			stock: cantidad, 
			price: precio,
			description: descripcion,
            recommended_age_id : recommended_age,
            publisher,
            language,
            publication_year,
            pages,
            image: req.file?req.file.filename:"default-image.jpg"
            },
            {
                where: {
                    id: req.params.id
                }
            })
            .then(()=>{
                res.redirect('/product')
            })


    },
    deleteProduct: (req, res) =>{
        db.Book.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(()=>{
            res.redirect('/product')
        })

        // products.forEach(product =>{
        //     if(product.id == +req.params.id){
        //         let eraseProduct = products.indexOf(product)
        //         products.splice(eraseProduct, 1)
               
        //     }
       // })

       
        // writeProductsJSON(products);
    
        // res.redirect('/admin/addProduct');


    } 

}