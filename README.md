# Fullhaus Assessment

This app imitates the design present on <https://www.figma.com/file/hRjZAz4FWcf35alPUl5Bjs/FE_Tech_Challenge-2_Alfred>

## Frameworks/library used

- Redux Toolkit: allows quick and easy setup for Redux. Uses the Immer library, which allows direct mutation to state without issues
- Jest: For assertion testing
- Axios: for rest operations to access Fullhaus api
- TypeScript: for static typing
- Create React App with Redux Toolkit template - for quick setup
- Prettier: for automating code formatting
- react-router-dom
- sass
- react-icons

## Cart Page and Add Cart

On Figma, there doesn't appear to be quantity amounts on the products.
Allow for only one orders at a time when adding to cart.

## Changes Made to the Design

- Added quantity and unit price of product in the cart page

## (Potential?) Issues

- The brand or product name may be too long and ruin the ui

  - possible to solve with elipses/css text shortener

- The cart holds product id instead of product information

  - I was thinking that there may be cases where the information on the client side is outdated, such as price. The products may be fetched from the server with the product ids from the cart
  - The cart and patio page uses the same state (products) to display data. This is an issue for cart as a user can go to a different category/page, which will result in the cart having no access to the old product information.
    - This can be easily fixed by having a store for fetched cart data

- At the moment, the background image of the patio furniture page is hardcoded to the one on figma

- Testing for the presence of required components

- Testing for products slice

## Potential Improvements

- set specific quantity in product page or cart drawer

- view product information

- close cart when clicked away

- complete responsiveness design
