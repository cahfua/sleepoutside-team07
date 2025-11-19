import{g as d,s as c,u as r,a}from"./utils-BcWnTT7J.js";import{P as s}from"./ProductData-CbvbBcly.js";class i{constructor(t,o){this.productId=t,this.product={},this.dataSource=o}async init(){this.product=await this.dataSource.findProductById(this.productId),this.renderProductDetails(),document.getElementById("addToCart").addEventListener("click",this.addProductToCart.bind(this))}addProductToCart(){const t=d("so-cart")||[];t.push(this.product),c("so-cart",t),r()}renderProductDetails(){const t=document.querySelector(".product-detail");if(!this.product){t.innerHTML="<p>Product not found</p>";return}const o=this.product.Colors&&this.product.Colors.length>0?this.product.Colors[0].ColorName:"";t.innerHTML=`
      <h3>${this.product.Brand.Name}</h3>
      <h2 class="divider">${this.product.NameWithoutBrand}</h2>
      <img
        class="divider"
        src="${this.product.Image}"
        alt="${this.product.Name}"
      />
      <p class="product-card__price">$${this.product.FinalPrice.toFixed(2)}</p>
      ${o?`<p class="product__color">${o}</p>`:""}
      <p class="product__description">${this.product.DescriptionHtmlSimple}</p>
      <div class="product-detail__add">
        <button id="addToCart" data-id="${this.product.Id}">Add to Cart</button>
      </div>
    `}}const e=a("product"),u=new s("tents"),p=new i(e,u);p.init();r();
