document.addEventListener('DOMContentLoaded', function() {
  const cartItemsContainer = document.getElementById('cart-items');
  const totalAmountContainer = document.getElementById('total-amount');
  const checkoutButton = document.getElementById('checkout-btn');
  checkoutButton.addEventListener('click', redirectToCheckout);
  // Retrieve cart items from localStorage
  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  // If cart is empty, display a message and disable checkout button
  if (cartItems.length === 0) {
    cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    totalAmountContainer.textContent = 'Total: ₹0.00';
    checkoutButton.disabled = true;
    return;
  }

  // Otherwise, display cart items and calculate total amount
  let totalAmount = 0;
  cartItems.forEach(item => {
    const itemElement = document.createElement('div');
    itemElement.classList.add('cart-item');

    const productName = getProductTitleById(item.productId);
    const totalPrice = item.quantity * item.price;

    itemElement.innerHTML = `
      <p><strong>${productName}</strong></p>
      <p>Quantity: ${item.quantity}</p>
      <p>Total Price: ₹${totalPrice.toFixed(2)}</p>
      <button class="remove-btn" data-product-id="${item.productId}">Remove</button>
    `;

    cartItemsContainer.appendChild(itemElement);

    totalAmount += totalPrice;
  });

  // Display total amount
  totalAmountContainer.textContent = `Total: ₹${totalAmount.toFixed(2)}`;

  // Enable checkout button
  checkoutButton.disabled = false;

  // Add event listeners to remove buttons
  const removeButtons = document.querySelectorAll('.remove-btn');
  removeButtons.forEach(button => {
    button.addEventListener('click', removeFromCart);
  });

  function removeFromCart(event) {
    const productIdToRemove = event.target.getAttribute('data-product-id');

    // Update cart items array by filtering out the item to remove
    cartItems = cartItems.filter(item => item.productId !== productIdToRemove);

    // Update localStorage with the new cart items
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    // Refresh the cart page
    location.reload();
  }
});

// Function to get product title by ID (replace with your actual product titles)
function getProductTitleById(productId) {
  switch (productId) {
    case '1':
      return 'Women Shoes';
    case '2':
      return 'Women Belly';
    case '3':
      return "Men's Shoes";
    case '4':
      return "Men's Sports shoes";
    case '5':
      return "Women's Royal Belly";
    case '6':
      return "Men's Shoes Royal";
    default:
      return 'Unknown Product';
  }
}
function redirectToCheckout() {
  window.location.href = 'checkout.html';
}