import{g as m,s as h,u as n,a as l,b as g}from"./utils-BZuxY1Lt.js";import{E as I}from"./ExternalServices-bTa7vZnK.js";class P{constructor(t,d){this.productId=t,this.product={},this.dataSource=d}async init(){this.product=await this.dataSource.findProductById(this.productId),this.renderProductDetails(),document.getElementById("addToCart").addEventListener("click",this.addProductToCart.bind(this))}addProductToCart(){const t=m("so-cart")||[],d=t.findIndex(r=>r.Id===this.product.Id);if(d!==-1){const r=t[d];r.quantity=(r.quantity||1)+1}else{const r={...this.product,quantity:1};t.push(r)}h("so-cart",t),n(),l(`${this.product.NameWithoutBrand} added to cart!`,!1)}renderProductDetails(){var o,s,e,i,c,u;const t=document.querySelector(".product-detail");if(!this.product){t.innerHTML="<p>Product not found</p>";return}const d=((o=this.product.Images)==null?void 0:o.PrimarySmall)||((s=this.product.Images)==null?void 0:s.PrimaryMedium)||this.product.Image||"/images/placeholder.png",r=((e=this.product.Images)==null?void 0:e.PrimaryMedium)||((i=this.product.Images)==null?void 0:i.PrimaryLarge)||this.product.Image||"/images/placeholder.png",p=((c=this.product.Images)==null?void 0:c.PrimaryLarge)||((u=this.product.Images)==null?void 0:u.PrimaryMedium)||this.product.Image||"/images/placeholder.png",a=this.product.Colors&&this.product.Colors.length>0?this.product.Colors[0].ColorName:"";t.innerHTML=`
      <h3>${this.product.Brand.Name}</h3>
      <h2 class="divider">${this.product.NameWithoutBrand}</h2>

      <img
        class="divider"
        src="${r}"
        srcset="
          ${d} 400w,
          ${r} 800w,
          ${p} 1200w
        "
        sizes="
          (max-width: 600px) 90vw,
          (max-width: 900px) 50vw,
          40vw
        "
        alt="${this.product.Name}"
      />

      <p class="product-card__price">$${this.product.FinalPrice.toFixed(2)}</p>

      ${a?`<p class="product__color">${a}</p>`:""}

      <p class="product__description">${this.product.DescriptionHtmlSimple}</p>

      <div class="product-detail__add">
        <button id="addToCart" data-id="${this.product.Id}">Add to Cart</button>
      </div>
    `}}const $=g("product"),y=new I,w=new P($,y);w.init();n();
