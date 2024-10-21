
const subTotal1 = document.querySelector(".sub-total1");
const total = document.querySelector(".sub-total2");
const products = document.querySelector("#item");
const deleteBtn = document.querySelector(".delete")

// Data fetching logic
async function fetchData() {
  const res = await fetch(
    "https://cdn.shopify.com/s/files/1/0883/2188/4479/files/apiCartData.json?v=1728384889"
  );
  const json = await res.json();

  // storing it to localStorage
  localStorage.setItem("apiData", JSON.stringify(json));
}
fetchData();

function displayData() {
  const data = JSON.parse(localStorage.getItem("apiData"));


  data.items.map((item) => {
    let product = document.createElement("div");
    product.classList.add("cart-left-content");
    let imgContainer = document.createElement("div");
    imgContainer.classList.add("data-img");
    let image = document.createElement("img");
    image.setAttribute("src", item.image);
    imgContainer.appendChild(image);
    product.appendChild(imgContainer);

    let title = document.createElement("p");
    title.classList.add("name")
    title.innerHTML = item.product_title;
    product.appendChild(title);

    let price = document.createElement("p");
    price.classList.add("price")
    let formattedPrice = item.final_price / 100;
    price.innerHTML = formattedPrice.toLocaleString("en-IN", {
      maximumFractionDigits: 2,
      style: "currency",
      currency: "INR",
    });
    product.appendChild(price);

    let input = document.createElement("input")
    input.setAttribute("type", "number")
    input.setAttribute("min", "1")
    input.setAttribute("value", "1")
    input.classList.add("quantity")

    product.appendChild(input)

    let subTotal = document.createElement("p");
    subTotal.classList.add("sub-total")
    subTotal.innerHTML = formattedPrice.toLocaleString("en-IN", {
      maximumFractionDigits: 2,
      style: "currency",
      currency: "INR",
    });
    product.appendChild(subTotal);

    let button = document.createElement("button")
    button.innerHTML = `<i class="ri-delete-bin-line"></i>`
    button.classList.add("delete")
    product.appendChild(button)

    products.appendChild(product);

    subTotal1.innerHTML = subTotal.innerHTML;
      total.innerHTML = subTotal.innerHTML;

    input.addEventListener("input", (e) => {
      let qty = e.target.value;
      let formattedSubTotal = formattedPrice * qty;
      subTotal.innerHTML = formattedSubTotal.toLocaleString("en-IN", {
        maximumFractionDigits: 2,
        style: "currency",
        currency: "INR",
      });
      subTotal1.innerHTML = subTotal.innerHTML;
      total.innerHTML = subTotal.innerHTML;
    });

    button.addEventListener("click", () => {
      product.style.display = "none"
      subTotal1.innerHTML = 0;
      total.innerHTML = 0;
    })
  });
}



displayData();

