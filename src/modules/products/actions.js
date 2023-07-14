export async function fetchProducts({state,commit,dispatch, rootState}){
    const data = await fetch('./fixtures/products.json');
    const products = await data.json();
    //console.log(products)
    commit('products/setProducts',products ,{ root: true });
}