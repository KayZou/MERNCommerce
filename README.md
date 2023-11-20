# MERN E-Commerce Web Application

This MERN stack e-commerce web application provides a seamless online shopping experience for users. It is built using React for the frontend, Bootstrap for styling, Redux Toolkit for state management, and Express for the backend. The application allows users to browse a wide range of products, add them to their cart, place orders, and view detailed information about specific products.

## Features:

1. **User Authentication:**
   - Users can register and log in securely.
   - JWT (JSON Web Tokens) are used for token-based authentication.
   - Users can update their account information.

2. **Product Management:**
   - Users can view a list of products with details.
   - Products are categorized and can be filtered for easy navigation.
   - Admins have the ability to create, delete, and edit products.

3. **Shopping Cart:**
   - Users can add products to their cart.
   - The cart keeps track of added items, and users can adjust quantities or remove items.
   - Users can proceed to checkout to place an order.

4. **Order Management:**
   - Users can view their order history.
   - Confirmation emails are sent to users upon successful order placement.
   - Admins have access to a dashboard to manage orders.

5. **User and Admin Dashboards:**
   - Users and admins have dedicated dashboards for managing their accounts and products, respectively.
   - Admins can also manage user accounts.

6. **Security:**
   - JWT tokens are securely passed using HTTP cookies for enhanced security.
   - Passwords are hashed and stored securely.
