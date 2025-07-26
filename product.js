// Ambil parameter dari URL
const params = new URLSearchParams(window.location.search);
const name = params.get('name') || 'Produk Default';
const price = params.get('price') || 0;
const image = params.get('image') || 'https://via.placeholder.com/400x400?text=Produk';
const desc = params.get('desc') || 'Produk berkualitas tinggi, cocok untuk kebutuhan Anda.';

// Tampilkan data produk di halaman
document.getElementById("product-name").textContent = name;
document.getElementById("product-price").textContent = "Rp" + Number(price).toLocaleString();
document.getElementById("product-desc").textContent = desc;
document.getElementById("product-image").src = image;

// Tambahkan ke keranjang (opsional)
document.querySelector(".detail-info button").addEventListener("click", () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push({ name, price, image, quantity: 1 });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Produk ditambahkan ke keranjang!");
});

console.log("Detail produk:", {
  name: params.get('name'),
  price: params.get('price'),
  image: params.get('image'),
  desc: params.get('desc')
});
