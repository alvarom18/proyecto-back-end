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
