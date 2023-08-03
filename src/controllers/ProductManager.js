import {promises as fs } from 'fs';
import {nanoid} from 'nanoid';

class ProductManager{
    constructor(){
        this.path = "./src/models/products.json";
    }
    readProduct = async () => {
        let products = await fs.readFile(this.path, "utf-8");
        return JSON.parse(products);
    };
    
    writeProduct = async (product) =>{
        await fs.writeFile(this.path, JSON.stringify(product))
    };
    exist = async (id) =>{
        let products = await this.readProduct();
        return products.find(prod => prod.id === id)
    };

    addProducts = async (product) =>{
        let productsOld = await this.readProduct();
        product.id = nanoid()        
        let productAll = [...productsOld, product]
        await this.writeProduct(productAll)        
        return "Producto agregado"
    };
    getProducts = async () =>{
        return await this.readProduct()
    };

    getProductsById = async (id) =>{
        let productID = await this.exist(id)
        if(!productID) return "Producto no encontrado"
        return productID
    };
    
    updateProducts = async (id, product) =>{
        let productID = await this.exist(id)
        if(!productID) return "Producto no encontrado"
        await this.deleteProducts(id)
        let productOld = await this.readProduct()
        let products =[{...product, id : id}, ...productOld]
        await this.writeProduct(products)
        return "Producto actualizado"
    }

    deleteProducts = async (id) =>{
        let products = await this.readProduct();
        let existProducts = products.some(prod => prod.id === id)
        if(existProducts){
            let filterProducts = products.filter(prod => prod.id != id)
            await this.writeProduct(filterProducts)
            return "Producto eliminado"
        }
        return "No existe el producto a eliminar"
    }
}

export default ProductManager;



