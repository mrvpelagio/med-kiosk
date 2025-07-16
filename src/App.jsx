import { useState } from 'react';
import PaymentInterface from './PaymentInterface';

const categories = [
  { id: 'pain-fever', name: 'Pain & Fever', icon: '🤒' },
  { id: 'cough-cold', name: 'Cough & Cold', icon: '🤧' },
  { id: 'stomach', name: 'Stomach & Digestion', icon: '🤢' },
  { id: 'allergy', name: 'Allergy & Itch Relief', icon: '🤧' },
  { id: 'vitamins', name: 'Vitamins & Supplements', icon: '💊' },
  { id: 'first-aid', name: 'First Aid', icon: '🩹' },
];

const products = {
  'pain-fever': [
    { id: 1, name: 'Biogesic', desc: 'Paracetamol 500mg Tablet for headache & fever', price: 7.0, image: '🟡', stock: 25 },
    { id: 2, name: 'Advil', desc: 'Ibuprofen 200mg Capsule', price: 12.0, image: '🔴', stock: 18 },
    { id: 3, name: 'Aspirin', desc: 'Acetylsalicylic Acid 325mg', price: 8.5, image: '⚪', stock: 30 },
    { id: 4, name: 'Tylenol', desc: 'Paracetamol 500mg Extra Strength', price: 15.0, image: '🔵', stock: 12 },
  ],
  'cough-cold': [
    { id: 5, name: 'Robitussin', desc: 'Cough Syrup 100ml', price: 18.0, image: '🟤', stock: 15 },
    { id: 6, name: 'Strepsils', desc: 'Throat Lozenges 12 pieces', price: 10.0, image: '🟢', stock: 22 },
    { id: 7, name: 'Neozep', desc: 'Cold Relief Capsules', price: 9.5, image: '🟡', stock: 20 },
  ],
  'stomach': [
    { id: 8, name: 'Pepto-Bismol', desc: 'Stomach Relief 120ml', price: 14.0, image: '🩷', stock: 16 },
    { id: 9, name: 'Imodium', desc: 'Anti-diarrheal Capsules', price: 11.0, image: '🔵', stock: 19 },
    { id: 10, name: 'Tums', desc: 'Antacid Tablets 12 pieces', price: 8.0, image: '⚪', stock: 25 },
  ],
  'allergy': [
    { id: 11, name: 'Benadryl', desc: 'Antihistamine 25mg Tablets', price: 13.0, image: '🟣', stock: 14 },
    { id: 12, name: 'Claritin', desc: 'Loratadine 10mg Non-drowsy', price: 16.0, image: '🔵', stock: 18 },
  ],
  'vitamins': [
    { id: 13, name: 'Vitamin C', desc: '500mg Immune Support', price: 12.0, image: '🟠', stock: 30 },
    { id: 14, name: 'Centrum', desc: 'Multivitamin 30 tablets', price: 25.0, image: '🟡', stock: 12 },
    { id: 15, name: 'Calcium', desc: 'Calcium + Vitamin D3', price: 18.0, image: '⚪', stock: 20 },
  ],
  'first-aid': [
    { id: 16, name: 'Band-Aid', desc: 'Adhesive Bandages 20 pieces', price: 6.0, image: '🩹', stock: 40 },
    { id: 17, name: 'Betadine', desc: 'Antiseptic Solution 15ml', price: 8.0, image: '🟤', stock: 25 },
    { id: 18, name: 'Alcohol', desc: 'Isopropyl Alcohol 70% 60ml', price: 5.0, image: '🔵', stock: 35 },
  ],
};

const styles = {
  cartDrawer: {
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  height: '75vh', // reduced from 70vh
  backgroundColor: 'white',
  borderTopLeftRadius: '16px',
  borderTopRightRadius: '16px',
  boxShadow: '0 -4px 12px rgba(0,0,0,0.1)',
  padding: '24px',
  zIndex: 1000,
  transition: 'transform 0.3s ease-in-out',
  display: 'flex',
  flexDirection: 'column',
},
cartDrawerVisible: {
  transform: 'translateY(0%)'
},
cartDrawerHidden: {
  transform: 'translateY(100%)'
},
  closeDrawerButton: {
    background: 'none',
    border: 'none',
    fontSize: '20px',
    fontWeight: 'bold',
    cursor: 'pointer',
    color: '#6b7280'
  },
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
    fontFamily: 'Arial, sans-serif'
  },
  header: {
    backgroundColor: '#2563eb',
    color: 'white',
    padding: '16px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
  },
  headerContent: {
    maxWidth: '1024px',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  headerTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    margin: 0
  },
  cartButton: {
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '8px',
    fontWeight: '600',
    cursor: 'pointer',
    position: 'relative',
    transition: 'background-color 0.2s'
  },
  cartBadge: {
    position: 'absolute',
    top: '-8px',
    right: '-8px',
    backgroundColor: '#ef4444',
    color: 'white',
    fontSize: '12px',
    borderRadius: '50%',
    width: '24px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  content: {
    padding: '24px'
  },
  title: {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#1e40af',
    marginBottom: '24px',
    textAlign: 'center'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '16px',
    maxWidth: '1024px',
    margin: '0 auto'
  },
  categoryButton: {
    backgroundColor: 'white',
    border: '2px solid #bfdbfe',
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    cursor: 'pointer',
    transition: 'all 0.2s',
    textAlign: 'center'
  },
  categoryIcon: {
    fontSize: '48px',
    marginBottom: '12px',
    display: 'block'
  },
  categoryName: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1e40af'
  },
  backButton: {
    backgroundColor: '#e5e7eb',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '8px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  },
  productButton: {
    backgroundColor: 'white',
    border: '2px solid #bfdbfe',
    padding: '16px',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    cursor: 'pointer',
    transition: 'all 0.2s',
    textAlign: 'center'
  },
  productIcon: {
    fontSize: '48px',
    marginBottom: '12px',
    display: 'block'
  },
  productName: {
    fontWeight: 'bold',
    color: '#1e40af',
    marginBottom: '4px'
  },
  productDesc: {
    fontSize: '14px',
    color: '#6b7280',
    marginBottom: '8px',
    height: '40px',
    overflow: 'hidden'
  },
  productPrice: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#2563eb'
  },
  productStock: {
    fontSize: '12px',
    color: '#6b7280',
    marginTop: '4px'
  },
  productDetail: {
    backgroundColor: 'white',
    border: '2px solid #bfdbfe',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    padding: '24px',
    maxWidth: '512px',
    margin: '0 auto'
  },
  productDetailIcon: {
    fontSize: '96px',
    marginBottom: '16px',
    display: 'block',
    textAlign: 'center'
  },
  productDetailName: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#1e40af',
    marginBottom: '8px',
    textAlign: 'center'
  },
  productDetailDesc: {
    color: '#6b7280',
    marginBottom: '16px',
    textAlign: 'center'
  },
  productDetailPrice: {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: '8px',
    textAlign: 'center'
  },
  quantityControls: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
    marginBottom: '24px'
  },
  quantityButton: {
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    fontSize: '20px',
    fontWeight: 'bold',
    padding: '8px 16px',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  },
  quantityDisplay: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#1e40af',
    margin: '0 16px'
  },
  buttonGroup: {
    display: 'flex',
    gap: '16px'
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#e5e7eb',
    color: '#374151',
    border: 'none',
    fontWeight: '600',
    padding: '12px 24px',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  },
  addButton: {
    flex: 1,
    backgroundColor: '#10b981',
    color: 'white',
    border: 'none',
    fontWeight: '600',
    padding: '12px 24px',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  },
  cartItem: {
    backgroundColor: 'white',
    border: '2px solid #bfdbfe',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    padding: '16px',
    marginBottom: '16px'
  },
  cartItemContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  cartItemLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  cartItemIcon: {
    fontSize: '36px'
  },
  cartItemName: {
    fontWeight: 'bold',
    color: '#1e40af'
  },
  cartItemQty: {
    fontSize: '14px',
    color: '#6b7280'
  },
  cartItemPrice: {
    fontWeight: 'bold',
    color: '#2563eb'
  },
  removeButton: {
    color: '#ef4444',
    background: 'none',
    border: 'none',
    fontSize: '14px',
    cursor: 'pointer',
    marginTop: '4px'
  },
  cartTotal: {
    backgroundColor: '#eff6ff',
    border: '2px solid #93c5fd',
    borderRadius: '12px',
    padding: '16px',
    marginBottom: '24px'
  },
  cartTotalContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  cartTotalLabel: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1e40af'
  },
  cartTotalPrice: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#2563eb'
  },
  clearButton: {
    flex: 1,
    backgroundColor: '#ef4444',
    color: 'white',
    border: 'none',
    fontWeight: '600',
    padding: '12px 24px',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  },
  proceedButton: {
    flex: 1,
    backgroundColor: '#10b981',
    color: 'white',
    border: 'none',
    fontWeight: '600',
    padding: '12px 24px',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  },
  footer: {
    backgroundColor: '#1e40af',
    color: 'white',
    padding: '16px',
    textAlign: 'center'
  },
  footerText: {
    fontSize: '14px',
    margin: 0
  },
  emptyCart: {
    textAlign: 'center',
    padding: '48px 0'
  },
  emptyCartIcon: {
    fontSize: '72px',
    marginBottom: '16px'
  },
  emptyCartText: {
    fontSize: '20px',
    color: '#6b7280'
  },
  headerNav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '24px'
  },
  pageTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#1e40af'
  },
  spacer: {
    width: '80px'
  },
  viewCartButton: {
  position: 'fixed',
  bottom: '16px',
  left: '50%',
  transform: 'translateX(-50%)',
  backgroundColor: '#10b981',
  color: 'white',
  padding: '12px 24px',
  borderRadius: '24px',
  fontWeight: '600',
  fontSize: '16px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
  border: 'none',
  cursor: 'pointer',
  zIndex: 900
},
  cartDrawerHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px'
  }
};

export default function OTCVendingMachine() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('categories');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const [showPayment, setShowPayment] = useState(false)
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCurrentScreen('products');
  };

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setCurrentScreen('product-detail');
  };

  const handleAddToCart = () => {
    const existingItem = cart.find(item => item.id === selectedProduct.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === selectedProduct.id 
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      setCart([...cart, { ...selectedProduct, quantity }]);
    }
    setCurrentScreen('products');
    setSelectedProduct(null);
  };

  const handleRemoveFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const CategoriesScreen = () => (
    <div style={styles.content}>
      <h2 style={styles.title}>Choose Medicine Category</h2>
      <div style={styles.grid}>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategorySelect(category)}
            style={styles.categoryButton}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#eff6ff';
              e.target.style.borderColor = '#60a5fa';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'white';
              e.target.style.borderColor = '#bfdbfe';
            }}
          >
            <span style={styles.categoryIcon}>{category.icon}</span>
            <div style={styles.categoryName}>{category.name}</div>
          </button>
        ))}
      </div>
    </div>
  );

  const ProductsScreen = () => (
    <div style={styles.content}>
      <div style={styles.headerNav}>
        <button
          onClick={() => setCurrentScreen('categories')}
          style={styles.backButton}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#d1d5db'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#e5e7eb'}
        >
          ← Back
        </button>
        <h2 style={styles.pageTitle}>{selectedCategory?.name}</h2>
        <div style={styles.spacer}></div>
      </div>
      
      <div style={styles.grid}>
        {(products[selectedCategory?.id] || []).map((product) => (
          <button
            key={product.id}
            onClick={() => handleProductSelect(product)}
            style={styles.productButton}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#eff6ff';
              e.target.style.borderColor = '#60a5fa';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'white';
              e.target.style.borderColor = '#bfdbfe';
            }}
          >
            <span style={styles.productIcon}>{product.image}</span>
            <div style={styles.productName}>{product.name}</div>
            <div style={styles.productDesc}>{product.desc}</div>
            <div style={styles.productPrice}>₱{product.price.toFixed(2)}</div>
            <div style={styles.productStock}>Stock: {product.stock}</div>
          </button>
        ))}
      </div>
    </div>
  );

  const ProductDetailScreen = () => (
    <div style={styles.content}>
      <div style={styles.headerNav}>
        <button
          onClick={() => setCurrentScreen('products')}
          style={styles.backButton}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#d1d5db'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#e5e7eb'}
        >
          ← Back
        </button>
        <h2 style={styles.pageTitle}>Product Details</h2>
        <div style={styles.spacer}></div>
      </div>

      <div style={styles.productDetail}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <span style={styles.productDetailIcon}>{selectedProduct.image}</span>
          <h3 style={styles.productDetailName}>{selectedProduct.name}</h3>
          <p style={styles.productDetailDesc}>{selectedProduct.desc}</p>
          <div style={styles.productDetailPrice}>₱{selectedProduct.price.toFixed(2)}</div>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>Stock: {selectedProduct.stock} available</div>
        </div>

        <div style={styles.quantityControls}>
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            style={styles.quantityButton}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#2563eb'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#3b82f6'}
          >
            -
          </button>
          <span style={styles.quantityDisplay}>{quantity}</span>
          <button
            onClick={() => setQuantity(Math.min(selectedProduct.stock, quantity + 1))}
            style={styles.quantityButton}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#2563eb'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#3b82f6'}
          >
            +
          </button>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
          <div style={{ fontSize: '18px', fontWeight: '600', color: '#1e40af' }}>
            Total: ₱{(selectedProduct.price * quantity).toFixed(2)}
          </div>
        </div>

        <div style={styles.buttonGroup}>
          <button
            onClick={() => setCurrentScreen('products')}
            style={styles.cancelButton}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#d1d5db'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#e5e7eb'}
          >
            Cancel
          </button>
          <button
            onClick={handleAddToCart}
            style={styles.addButton}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#059669'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#10b981'}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );

  const CartScreen = () => (
    <div style={styles.content}>
      <div style={styles.headerNav}>
        <button
          onClick={() => setCurrentScreen('categories')}
          style={styles.backButton}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#d1d5db'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#e5e7eb'}
        >
          ← Continue Shopping
        </button>
        <h2 style={styles.pageTitle}>Your Cart</h2>
        <div style={styles.spacer}></div>
      </div>

      {cart.length === 0 ? (
        <div style={styles.emptyCart}>
          <div style={styles.emptyCartIcon}>🛒</div>
          <p style={styles.emptyCartText}>Your cart is empty</p>
        </div>
      ) : (
        <div style={{ maxWidth: '512px', margin: '0 auto' }}>
          {cart.map((item) => (
            <div key={item.id} style={styles.cartItem}>
              <div style={styles.cartItemContent}>
                <div style={styles.cartItemLeft}>
                  <span style={styles.cartItemIcon}>{item.image}</span>
                  <div>
                    <div style={styles.cartItemName}>{item.name}</div>
                    <div style={styles.cartItemQty}>Qty: {item.quantity}</div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={styles.cartItemPrice}>₱{(item.price * item.quantity).toFixed(2)}</div>
                  <button
                    onClick={() => handleRemoveFromCart(item.id)}
                    style={styles.removeButton}
                    onMouseEnter={(e) => e.target.style.color = '#dc2626'}
                    onMouseLeave={(e) => e.target.style.color = '#ef4444'}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          <div style={styles.cartTotal}>
            <div style={styles.cartTotalContent}>
              <span style={styles.cartTotalLabel}>Total ({totalItems} items)</span>
              <span style={styles.cartTotalPrice}>₱{totalPrice.toFixed(2)}</span>
            </div>
          </div>

          <div style={styles.buttonGroup}>
            <button
              onClick={() => setCart([])}
              style={styles.clearButton}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#dc2626'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#ef4444'}
            >
              Clear Cart
            </button>
            <button
              onClick={() => setShowPayment(true)}
              style={styles.proceedButton}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#059669'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#10b981'}
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return (
  <div style={styles.container}>
    <div style={styles.header}>
      <div style={styles.headerContent}>
        <h1 style={styles.headerTitle}>OTC Vending Machine</h1>
        <button
          onClick={() => setIsCartOpen(true)}
          style={styles.cartButton}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#60a5fa'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#3b82f6'}
        >
          🛒 Cart
          {totalItems > 0 && (
            <span style={styles.cartBadge}>
              {totalItems}
            </span>
          )}
        </button>
      </div>
    </div>

    <div style={{ minHeight: '100vh' }}>
      {currentScreen === 'categories' && <CategoriesScreen />}
      {currentScreen === 'products' && <ProductsScreen />}
      {currentScreen === 'product-detail' && <ProductDetailScreen />}
    </div>

    {/* Pull-up Cart Drawer */}
    <div
      style={{
        ...styles.cartDrawer,
        ...(isCartOpen ? styles.cartDrawerVisible : styles.cartDrawerHidden)
      }}
    >
      <div style={styles.cartDrawerHeader}>
        <h2>Your Cart</h2>
        <button
          onClick={() => setIsCartOpen(false)}
          style={styles.closeDrawerButton}
        >
          ✕
        </button>
      </div>
      

      {cart.length === 0 ? (
        <div style={styles.emptyCart}>
          <div style={styles.emptyCartIcon}>🛒</div>
          <p style={styles.emptyCartText}>Your cart is empty</p>
        </div>
      ) : (
        <div style={{ maxWidth: '512px', margin: '0 auto' }}>
          {cart.map((item) => (
            <div key={item.id} style={styles.cartItem}>
              <div style={styles.cartItemContent}>
                <div style={styles.cartItemLeft}>
                  <span style={styles.cartItemIcon}>{item.image}</span>
                  <div>
                    <div style={styles.cartItemName}>{item.name}</div>
                    <div style={styles.cartItemQty}>Qty: {item.quantity}</div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={styles.cartItemPrice}>₱{(item.price * item.quantity).toFixed(2)}</div>
                  <button
                    onClick={() => handleRemoveFromCart(item.id)}
                    style={styles.removeButton}
                    onMouseEnter={(e) => e.target.style.color = '#dc2626'}
                    onMouseLeave={(e) => e.target.style.color = '#ef4444'}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div style={styles.cartTotal}>
            <div style={styles.cartTotalContent}>
              <span style={styles.cartTotalLabel}>Total ({totalItems} items)</span>
              <span style={styles.cartTotalPrice}>₱{totalPrice.toFixed(2)}</span>
            </div>
          </div>

          <div style={styles.buttonGroup}>
            <button
              onClick={() => setCart([])}
              style={styles.clearButton}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#dc2626'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#ef4444'}
            >
              Clear Cart
            </button>
            <button
              onClick={() => {
                setShowPayment(true);
                setIsCartOpen(false);
              }}
              style={styles.proceedButton}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#059669'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#10b981'}
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      )}
    </div>
        {totalItems > 0 && !isCartOpen && (
      <button
        style={styles.viewCartButton}
        onClick={() => setIsCartOpen(true)}
      >
        🛒 View Cart ({totalItems})
      </button>
    )}

    <div style={styles.footer}>
      <p style={styles.footerText}>For medical emergencies, please contact your healthcare provider immediately.</p>
    </div>

    {showPayment && (
  <>
    {console.log('🔍 totalPrice =', totalPrice, '| totalItems =', totalItems)}
    <PaymentInterface
      totalPrice={totalPrice}
      totalItems={totalItems}
      onClose={() => setShowPayment(false)}
      onPaymentComplete={() => {
        alert('Payment successful! Thank you for your purchase!');
        setCart([]);
        setIsCartOpen(false);
        setShowPayment(false);
      }}
    />
  </>
)}
  </div>
  
);
}