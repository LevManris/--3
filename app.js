document.addEventListener("DOMContentLoaded", () => {
    const productList = document.getElementById("productList");
    const scrollButton = document.getElementById("scrollButton");
    const modal = document.getElementById("productModal");
    const modalProductName = document.getElementById("modalProductName");
    const modalProductPrice = document.getElementById("modalProductPrice");
  
    fetch("https://dummyjson.com/products")
      .then(response => response.json())
      .then(data => {
        // Render product cards
        data.forEach(product => {
          const productCard = createProductCard(product);
          productList.appendChild(productCard);
        });
      })
      .catch(error => console.error("Error fetching data:", error));
  
    scrollButton.addEventListener("click", () => {
      document.querySelector("footer").scrollIntoView({ behavior: "smooth" });
    });
  
    function createProductCard(product) {
      const productCard = document.createElement("div");
      productCard.className = "productCard";
  
      const productImage = document.createElement("img");
      productImage.src = product.image; 
      productImage.alt = product.name;
      productImage.className = "productImage";
  
      const productName = document.createElement("h3");
      productName.textContent = product.name;
  
      const productPrice = document.createElement("p");
      productPrice.textContent = `Price: $${product.price}`;
  
      const starContainer = document.createElement("div");
      starContainer.className = "starContainer";
      const rating = Math.round(product.rating); 
      for (let i = 0; i < 5; i++) {
        const star = document.createElement("span");
        star.className = `fa fa-star${i < rating ? " active" : ""}`;
        starContainer.appendChild(star);
      }
  
      productCard.addEventListener("dblclick", () => {
        productCard.remove();
      });
  
      // Add event listener to show modal on click
      productCard.addEventListener("click", () => {
        modalProductName.textContent = product.name;
        modalProductPrice.textContent = `Price: $${product.price}`;
        modal.style.display = "block";
      });
  
      productCard.appendChild(productImage);
      productCard.appendChild(productName);
      productCard.appendChild(productPrice);
      productCard.appendChild(starContainer);
  
      return productCard;
    }
  
  
    const closeBtn = document.querySelector(".close");
    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });
  
  
    window.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
  });
  