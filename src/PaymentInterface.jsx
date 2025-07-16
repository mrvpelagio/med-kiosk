import { useState } from 'react';

const PaymentInterface = ({ totalPrice, totalItems, onClose, onPaymentComplete, cart }) => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cashAmount, setCashAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDispensing, setIsDispensing] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [tipIndex, setTipIndex] = useState(0);

  const tips = [
    "💧 Stay hydrated while taking medicine.",
    "📅 Don’t forget to take your next dose on time!",
    "🛏️ Rest well for faster recovery."
  ];

  const handlePayment = () => {
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsDispensing(true);

      let tipCycle = 0;
      const tipInterval = setInterval(() => {
        setTipIndex((prev) => (prev + 1) % tips.length);
        tipCycle++;
        if (tipCycle >= 3) clearInterval(tipInterval);
      }, 1000);

      setTimeout(() => {
        setIsDispensing(false);
        onPaymentComplete();
      }, 3000);
    }, 2000);
  };

  const change = cashAmount ? parseFloat(cashAmount) - totalPrice : 0;

  const isPaymentValid = () => {
    if (!paymentMethod) return false;
    if (paymentMethod === 'cash') {
      return cashAmount && parseFloat(cashAmount) >= totalPrice;
    }
    return true;
  };

  return (
    <>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      <div style={styles.overlay}>
        <div style={styles.modal}>
          {(isProcessing || isDispensing) && (
            <div style={styles.processingOverlay}>
              <div style={styles.spinner}></div>
              <p style={{ marginTop: '16px', color: '#374151', fontWeight: 600 }}>
                {isProcessing
                  ? 'Processing payment...'
                  : 'Payment received. Dispensing medicine...'}
              </p>
              {isDispensing && (
                <p style={{ marginTop: '8px', color: '#6b7280', fontSize: '14px' }}>
                  {tips[tipIndex]}
                </p>
              )}
            </div>
          )}

          <div style={styles.header}>
            <h2 style={styles.title}>Payment</h2>
            <button onClick={onClose} style={styles.closeButton} disabled={isProcessing || isDispensing}>✕</button>
          </div>

          <div style={styles.summary}>
            <div style={{ marginBottom: '12px', fontWeight: '600', color: '#1e40af' }}>Items Summary:</div>
            {cart && cart.map((item, index) => (
              <div key={index} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span>{item.name} x {item.quantity}</span>
                <span>₱{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div style={styles.summaryRow}>
              <span>Tax</span>
              <span>₱0.00</span>
            </div>
            <div style={styles.totalRow}>
              <span>Total</span>
              <span>₱{totalPrice.toFixed(2)}</span>
            </div>
          </div>

          <div style={styles.paymentMethods}>
            <div style={styles.methodTitle}>Choose Payment Method</div>
            {['cash', 'gcash', 'card'].map((id) => (
              <button
                key={id}
                onClick={() => {
                  setPaymentMethod(id);
                  setShowQR(id === 'gcash');
                }}
                style={{
                  ...styles.methodButton,
                  ...(paymentMethod === id ? styles.methodButtonActive : {}),
                }}
                disabled={isProcessing || isDispensing}
              >
                <span style={styles.methodIcon}>{id === 'cash' ? '💵' : id === 'gcash' ? '📱' : '💳'}</span>
                <div>
                  <div style={{ fontWeight: '600', marginBottom: '4px' }}>{
                    id === 'cash' ? 'Cash Payment' : id === 'gcash' ? 'GCash' : 'Credit/Debit Card'
                  }</div>
                  <div style={styles.methodText}>{
                    id === 'cash'
                      ? 'Pay with physical cash'
                      : id === 'gcash'
                      ? 'Scan QR code to pay'
                      : 'Insert or tap your card'
                  }</div>
                </div>
              </button>
            ))}
          </div>

          {paymentMethod === 'cash' && (
            <div style={styles.cashInput}>
              <label style={styles.inputLabel}>Enter Cash Amount</label>
              <input
                type="number"
                placeholder="0.00"
                value={cashAmount}
                onChange={(e) => setCashAmount(e.target.value)}
                style={styles.input}
                disabled={isProcessing || isDispensing}
              />
              {cashAmount && (
                <div style={styles.changeInfo}>
                  <span>Change:</span>
                  <span style={{ color: change >= 0 ? '#10b981' : '#ef4444', fontWeight: '600' }}>
                    ₱{Math.max(0, change).toFixed(2)}
                  </span>
                </div>
              )}
            </div>
          )}

          {showQR && paymentMethod === 'gcash' && (
            <div style={styles.qrCode}>
              <div style={styles.qrImage}><span>📱</span></div>
              <div style={styles.qrText}>Scan this QR code with your GCash app</div>
              <div style={{ fontWeight: '600', color: '#1e40af' }}>Amount: ₱{totalPrice.toFixed(2)}</div>
            </div>
          )}

          {paymentMethod === 'card' && (
            <div style={styles.qrCode}>
              <div style={styles.qrImage}><span>💳</span></div>
              <div style={styles.qrText}>Insert your card or tap for contactless payment</div>
              <div style={{ fontWeight: '600', color: '#1e40af' }}>Amount: ₱{totalPrice.toFixed(2)}</div>
            </div>
          )}

          <div style={styles.actionButtons}>
            <button onClick={onClose} style={styles.cancelButton} disabled={isProcessing || isDispensing}>
              Cancel
            </button>
            <button
              onClick={handlePayment}
              style={{
                ...styles.payButton,
                ...((!isPaymentValid() || isProcessing || isDispensing) ? styles.payButtonDisabled : {}),
              }}
              disabled={!isPaymentValid() || isProcessing || isDispensing}
            >
              {isProcessing || isDispensing ? 'Please wait...' : 'Pay Now'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};


 const styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000,
    },
    modal: {
      backgroundColor: 'white',
      borderRadius: '16px',
      padding: '24px',
      width: '90%',
      maxWidth: '400px',
      maxHeight: '90vh',
      overflow: 'auto',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
      paddingBottom: '16px',
      borderBottom: '1px solid #e5e7eb',
    },
    title: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#1e40af',
      margin: 0,
    },
    closeButton: {
      background: 'none',
      border: 'none',
      fontSize: '20px',
      color: '#6b7280',
      cursor: 'pointer',
      padding: '4px',
    },
    summary: {
      backgroundColor: '#f3f4f6',
      padding: '16px',
      borderRadius: '8px',
      marginBottom: '20px',
    },
    summaryRow: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '8px',
    },
    totalRow: {
      display: 'flex',
      justifyContent: 'space-between',
      fontWeight: 'bold',
      fontSize: '18px',
      color: '#1e40af',
      paddingTop: '8px',
      borderTop: '1px solid #d1d5db',
    },
    paymentMethods: {
      marginBottom: '20px',
    },
    methodTitle: {
      fontSize: '16px',
      fontWeight: '600',
      color: '#374151',
      marginBottom: '12px',
    },
    methodButton: {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      padding: '16px',
      marginBottom: '8px',
      border: '2px solid #e5e7eb',
      borderRadius: '8px',
      backgroundColor: 'white',
      cursor: 'pointer',
      transition: 'all 0.2s',
    },
    methodButtonActive: {
      borderColor: '#3b82f6',
      backgroundColor: '#eff6ff',
    },
    methodIcon: {
      fontSize: '24px',
      marginRight: '12px',
    },
    methodText: {
      fontSize: '14px',
      color: '#374151',
    },
    cashInput: {
      marginTop: '16px',
      padding: '16px',
      backgroundColor: '#f9fafb',
      borderRadius: '8px',
      border: '1px solid #d1d5db',
    },
    inputLabel: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#374151',
      marginBottom: '8px',
      display: 'block',
    },
    input: {
      width: '100%',
      padding: '12px',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      fontSize: '16px',
      marginBottom: '12px',
    },
    changeInfo: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '14px',
      color: '#6b7280',
    },
    qrCode: {
      textAlign: 'center',
      padding: '20px',
      backgroundColor: '#f9fafb',
      borderRadius: '8px',
      marginTop: '16px',
    },
    qrImage: {
      width: '200px',
      height: '200px',
      backgroundColor: '#e5e7eb',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 16px',
      borderRadius: '8px',
      fontSize: '48px',
    },
    qrText: {
      fontSize: '14px',
      color: '#6b7280',
      marginBottom: '8px',
    },
    actionButtons: {
      display: 'flex',
      gap: '12px',
      marginTop: '24px',
    },
    cancelButton: {
      flex: 1,
      padding: '12px 24px',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      backgroundColor: 'white',
      color: '#374151',
      fontWeight: '600',
      cursor: 'pointer',
    },
    payButton: {
      flex: 1,
      padding: '12px 24px',
      border: 'none',
      borderRadius: '8px',
      backgroundColor: '#10b981',
      color: 'white',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
    },
    payButtonDisabled: {
      backgroundColor: '#9ca3af',
      cursor: 'not-allowed',
    },
    processingOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '16px',
    },
    spinner: {
      width: '40px',
      height: '40px',
      border: '4px solid #e5e7eb',
      borderTop: '4px solid #3b82f6',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
    },
  };
export default PaymentInterface;