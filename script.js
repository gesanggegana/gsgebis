localStorage.removeItem("cart");

// Daftar produk dengan deskripsi
const products = [
  {
    id: 1,
    name: "Kopi",
    category: "Perkebunan",
    price: 50000,
    image: "https://eksporpetani.com/wp-content/uploads/2021/11/072798500_1427804958-arabica.jpg",
    desc: "Kopi arabika berkualitas tinggi hasil panen petani lokal."
  },
  {
    id: 2,
    name: "Ikan Tuna Medium",
    category: "Kelautan",
    price: 115000,
    image: "https://kontainerindonesia.co.id/blog/wp-content/uploads/2023/07/6-Cara-Ekspor-Ikan-Tuna-ke-Jepang.jpeg",
    desc: "Ikan tuna segar ukuran medium, siap ekspor kualitas ekspor Jepang."
  },
  {
    id: 3,
    name: "Kayu Mahogany",
    category: "Kehutanan",
    price: 4200000,
    image: "https://media.istockphoto.com/id/1771834282/photo/pile-of-logs.jpg?s=612x612&w=0&k=20&c=nTrhqgxL-8hajWO2ud6XwSu9l5U8imoYKoKLqcl73Ko=",
    desc: "Kayu Mahogany kualitas ekspor, cocok untuk furnitur dan konstruksi."
  },
  {
    id: 4,
    name: "Vanili",
    category: "Perkebunan",
    price: 750000,
    image: "https://ntbsatu.com/wp-content/uploads/2022/11/Vanili-dan-Budidayanya-1.png",
    desc: "Vanili kering grade A, hasil olahan perkebunan organik."
  },
  {
    id: 5,
    name: "Keranjang Bambu",
    category: "Kerajinan Tangan",
    price: 300000,
    image: "https://asiacommerce.id/wp-content/uploads/2024/02/ekspor-kerajinan-bambu-pvproductions.jpg",
    desc: "Keranjang bambu handmade, cocok untuk dekorasi dan penyimpanan."
  },
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(id) {
  const product = products.find(p => p.id === id);
  const index = cart.findIndex(item => item.id === id);

  if (index !== -1) {
    cart[index].quantity += 1;
  } else {
    const productToAdd = { ...product, quantity: 1 };
    cart.push(productToAdd);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");

  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} x${item.quantity} - Rp${(item.price * item.quantity).toLocaleString()}`;
    cartItems.appendChild(li);
    total += item.price * item.quantity;
  });

  cartTotal.textContent = `Rp${total.toLocaleString()}`;
}

function renderProducts(filter = "Semua") {
  const grid = document.getElementById("productGrid");
  grid.innerHTML = "";

  const filtered = filter === "Semua" ? products : products.filter(p => p.category === filter);

  filtered.forEach(product => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <a href="product.html?name=${encodeURIComponent(product.name)}&price=${encodeURIComponent(product.price)}&image=${encodeURIComponent(product.image)}&desc=${encodeURIComponent(product.desc)}" style="text-decoration:none; color:inherit;">
        <img src="${product.image}" alt="${product.name}" />
        <h4>${product.name}</h4>
        <p>Rp${product.price.toLocaleString()}</p>
      </a>
      <button onclick="addToCart(${product.id})">+ Keranjang</button>
    `;
    grid.appendChild(div);
  });
}

function toggleCart() {
  document.getElementById("cartSidebar").classList.toggle("show");
}

function filterCategory(cat) {
  renderProducts(cat);
}

document.getElementById("searchInput").addEventListener("keyup", function () {
  const q = this.value.toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(q));
  const grid = document.getElementById("productGrid");
  grid.innerHTML = "";

  filtered.forEach(product => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <a href="product.html?name=${encodeURIComponent(product.name)}&price=${encodeURIComponent(product.price)}&image=${encodeURIComponent(product.image)}&desc=${encodeURIComponent(product.desc)}">
        <img src="${product.image}" alt="${product.name}" />
        <h4>${product.name}</h4>
        <p>Rp${product.price.toLocaleString()}</p>
      </a>
      <button onclick="addToCart(${product.id})">+ Keranjang</button>
    `;
    grid.appendChild(div);
  });
});

// Saat halaman dimuat, render produk dan perbarui keranjang
window.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  updateCart();
});
