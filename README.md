# St. Vincent's Preschool Website

A responsive website for St. Vincent's Preschool & Daycare in Chanda Nagar, Hyderabad.

## Features

- **Responsive Design**: Works on all devices
- **Interactive Elements**: 
  - Image sliders
  - Testimonial carousel
  - Drawing canvas
  - FAQ accordion
- **Form Handling**: Contact forms powered by Formspree
- **Modern UI**: Custom crayon-style design with Tailwind CSS

## Setup Instructions

### 1. Formspree Configuration

To enable form submissions:

1. Go to [Formspree.io](https://formspree.io/) and create a free account
2. Create a new form and note your Form ID
3. In `scripts.js`, update the `FORMSPREE_ENDPOINT` constant:
   ```javascript
   const FORMSPREE_ENDPOINT = 'https://formspree.io/f/your-actual-form-id';
