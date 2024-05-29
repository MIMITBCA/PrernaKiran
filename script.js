document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
  
    addToCartButtons.forEach(button => {
      button.addEventListener('click', addToCart);
    });
  
    function addToCart(event) {
      const productId = event.target.getAttribute('data-product-id');
      const price = parseFloat(event.target.getAttribute('data-price'));
    
      // Retrieve existing cart items from localStorage
      let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    
      // Check if the product is already in the cart
      const existingItemIndex = cartItems.findIndex(item => item.productId === productId);
    
      if (existingItemIndex !== -1) {
          // If the product is already in the cart, update its quantity
          cartItems[existingItemIndex].quantity++;
      } else {
          // If the product is not in the cart, add it
          cartItems.push({ productId, quantity: 1, price });
      }
    
      // Store updated cart items in localStorage
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    
      // Redirect to the cart page
      window.location.href = 'cart.html';
  }
  
    
  });
  