document.addEventListener('DOMContentLoaded', function() {
    // Retrieve total amount container
    const totalAmountContainer = document.getElementById('total-amount');
  
    // Retrieve cart items from localStorage
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  
    // Calculate total amount
    let totalAmount = 0;
    cartItems.forEach(item => {
      totalAmount += item.quantity * item.price;
    });
  
    // Display total amount
    totalAmountContainer.textContent = `Amount to Pay: ₹${totalAmount.toFixed(2)}`;
  });
  
  // Stripe initialization (Make sure to include Stripe.js script before this code)
  const stripe = Stripe('pk_test_51P1E0RSJ75CUpuIuITEEgfrX2EAYf84bFNMzG12lwULOUeZdxdHBShEP3don7yOiftA4CaVOEQkbZAhhGJU1llPa00BhRo9Ryp');
  const elements = stripe.elements();

  // Set up Stripe Elements styles
  const style = {
    base: {
      fontSize: '16px',
      color: '#32325d',
    },
  };

  // Create an instance of the card Element
  const card = elements.create('card', { style });

  // Mount the card Element to the card-element div
  card.mount('#card-element');
  
  // Handle form submission
  const form = document.getElementById('payment-form');
  
  form.addEventListener('submit', async function(event) {
    event.preventDefault();
  
    // Create an instance of Stripe Elements and pass it to createToken method
    const card = elements.create('card');
    const {token, error} = await stripe.createToken(card);
  
    if (error) {
      // Inform the user if there was an error
      const errorElement = document.getElementById('card-errors');
      errorElement.textContent = error.message;
    } else {
      // Send the token to your server using AJAX or fetch
      stripeTokenHandler(token);
    }
  });
  
  function stripeTokenHandler(token) {
    // Send the token to your server using AJAX or fetch
    fetch('/process-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({token: token.id})
    })
    .then(response => {
      // Handle server response
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Handle payment success or failure
      console.log(data);
    })
    .catch(error => {
      console.error('There was an error!', error);
    });
  }
  