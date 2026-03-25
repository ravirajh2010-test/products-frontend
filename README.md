# Products Frontend

React + TypeScript frontend application for consuming the Products REST API.

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **React Router** - Navigation
- **Axios** - HTTP client
- **Lucide React** - Icons

## Features

- ✅ User Authentication (Login/Register)
- ✅ Product Listing with Pagination
- ✅ Product Filtering (category, search, price range)
- ✅ Product Detail View
- ✅ Shopping Cart
- ✅ Checkout Page
- ✅ Admin Create Product
- ✅ Responsive Design (Tailwind CSS)

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure API

Edit `src/api/client.ts` and update the API base URL if needed:

```typescript
const API_BASE = 'http://localhost:8000/api/v1';
```

### 3. Start Development Server

```bash
npm run dev
```

The app will be available at http://localhost:3000

### 4. Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── Auth/              # Login & Register forms
│   ├── Products/          # Product list, card, detail
│   ├── Cart/              # Cart sidebar & checkout
│   └── Admin/             # Product management
├── pages/                 # Page layouts
├── store/                 # Zustand stores
├── api/                   # API client
├── types/                 # TypeScript types
├── App.tsx               # Main routing
└── main.tsx              # Entry point
```

## API Integration

The frontend connects to the FastAPI backend at `http://localhost:8000/api/v1`.

### Endpoints Used

- `GET /products` - List products
- `GET /products/:id` - Get product details
- `POST /products` - Create product (admin)
- `PUT /products/:id` - Update product (admin)
- `DELETE /products/:id` - Delete product (admin)

## State Management (Zustand)

### authStore
- User authentication state
- Admin token management

### cartStore
- Shopping cart items
- Total price calculation

### productStore
- Products list
- Selected product
- Loading/error states

## Pages

| Route | Component | Description |
|-------|-----------|-------------|
| `/login` | LoginPage | User login |
| `/register` | RegisterPage | User registration |
| `/products` | ProductsPage | Product listing |
| `/product/:id` | ProductDetailPage | Product details |
| `/checkout` | CheckoutPage | Order checkout |
| `/admin/create-product` | CreateProduct | Admin: Create product |

## Features Walkthrough

### Authentication
- Login with email (mock)
- Register new account
- Admin mode toggle
- Logout functionality

### Shopping
- Browse products with pagination
- Filter by category, name, price
- View product details
- Add to cart
- Checkout with order summary

### Admin
- Create new products
- Set discount & pricing
- Manage stock

## Notes

- Mock authentication is used (no backend integration)
- Orders are logged locally (no persistence)
- Image URLs must be valid URLs (thumbnails)

## Future Enhancements

- [ ] Edit/Delete products in admin panel
- [ ] User profile & order history
- [ ] Payment gateway integration
- [ ] Product reviews & ratings
- [ ] Wishlist feature
- [ ] Search autocomplete
# products-frontend
