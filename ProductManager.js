import http, { request } from 'http'

class productManager {
  constructor() {
    this.products = [];
  }

  getProducts = () => {
    return this.products;
  };
  addProducts = (title, description, price, imagen, code, (stock = 25)) => {
    const producto ={
        
    }
  }
  function buscarProducts (id){
    return productManager.find(producto => producto.id === id);
  }
  let buscadoProducts = buscarProducts(2);
  console.log(buscadoProducts)
}

let products = []
let idContador = 0
function addProducts(obj) {
  obj.id = idContador
  idContador++
  products.push(obj)
}
const servidor = http.createServer((request) =>{
  response.end('mi primer hola mundo')
})
