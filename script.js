let prices = {};

function openProduct(name,cat,desc,img,priceData){
  localStorage.setItem("pName",name);
  localStorage.setItem("pCat",cat);
  localStorage.setItem("pDesc",desc);
  localStorage.setItem("pImg",img);
  localStorage.setItem("prices",JSON.stringify(priceData));

  prices = priceData;
  localStorage.setItem("selectedKey","1");
  localStorage.setItem("selectedPrice",priceData["1"]);

  location.href="product.html";
}

function selectOption(key,el){
  prices = JSON.parse(localStorage.getItem("prices"));
  const price = prices[key];

  let oldPrice = price * 2;
  let stock = 8;
  let label = "1 Bulan";
  let activation = "Via invite / email dari admin";

  if(key==="2"){ stock=5; label="2 Bulan"; }
  if(key==="life"){
    stock=3; label="Lifetime";
    oldPrice = price + 15000;
    activation = "Via invite (tanpa email)";
  }

  localStorage.setItem("selectedKey",label);
  localStorage.setItem("selectedPrice",price);

  pLabel.innerText="Paket "+label;
  pPrice.innerText="Rp "+price.toLocaleString("id-ID");
  oldPriceEl.innerText="Rp "+oldPrice.toLocaleString("id-ID");
  saveText.innerText="Hemat "+Math.round((1-price/oldPrice)*100)+"%";
  stockText.innerText="Stok tersisa: "+stock+" akun";
  activationText.innerText="Aktivasi: "+activation;

  document.querySelectorAll(".opt").forEach(b=>b.classList.remove("active"));
  el.classList.add("active");
}

if(document.getElementById("pName")){
  pName.innerText=localStorage.getItem("pName");
  pCat.innerText=localStorage.getItem("pCat");
  pDesc.innerText=localStorage.getItem("pDesc");
  pImage.src=localStorage.getItem("pImg");

  prices = JSON.parse(localStorage.getItem("prices"));

  setTimeout(()=>{
    selectOption("1",document.querySelector(".opt"));
  },50);
}

function buyNow(){
  localStorage.setItem(
    "product",
    localStorage.getItem("pName")+" ("+localStorage.getItem("selectedKey")+")"
  );
  location.href="payment.html";
}

if(document.getElementById("payProduct")){
  payProduct.innerText=localStorage.getItem("product");
  payPrice.innerText="Rp "+Number(localStorage.getItem("selectedPrice")).toLocaleString("id-ID");
}

function confirmPay(){
  const msg=`Halo Admin Vian Shop 👋
Produk: ${localStorage.getItem("product")}
Harga: Rp ${Number(localStorage.getItem("selectedPrice")).toLocaleString("id-ID")}
Invoice: VS-${Math.floor(Math.random()*900000+100000)}`;

  location.href="https://wa.me/628885988556?text="+encodeURIComponent(msg);
}