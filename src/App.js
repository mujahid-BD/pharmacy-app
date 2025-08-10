const { useState, useEffect } = React;

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [isLoading, setIsLoading] = useState(true);
  const [pharmacyInfo, setPharmacyInfo] = useState({
    name: '', owner: '', license: '', address: '', phone: '', email: '', password: ''
  });
  const [loginCredentials, setLoginCredentials] = useState(null);
  const [loginError, setLoginError] = useState('');
  const [medicines, setMedicines] = useState([
    { id: 1, name: 'প্যারাসিটামল', generic: 'Paracetamol', company: 'Square', stock: 100, expiry: '2025-12-31', purchasePrice: 0.8, salePrice: 1.2, formulation: 'Tablet', power: '500mg', purchaseDate: '2025-01-10', invoiceNumber: 'INV001', purchaseQuantity: 100 },
    { id: 2, name: 'নাপা', generic: 'Paracetamol', company: 'Beximco', stock: 5, expiry: '2025-06-30', purchasePrice: 0.9, salePrice: 1.5, formulation: 'Tablet', power: '500mg', purchaseDate: '2025-01-15', invoiceNumber: 'INV002', purchaseQuantity: 50 },
    { id: 3, name: 'অ্যাট্রোপিন', generic: 'Atropine Sulfate', company: 'S.N. Pharmaceutical', stock: 20, expiry: '2025-08-20', purchasePrice: 2.0, salePrice: 2.52, formulation: 'Injection', power: '0.6mg/ml', purchaseDate: '2025-02-01', invoiceNumber: 'INV003', purchaseQuantity: 30 },
    { id: 4, name: 'অ্যামোক্সিসিলিন', generic: 'Amoxicillin', company: 'Renata', stock: 8, expiry: '2025-09-15', purchasePrice: 3.0, salePrice: 4.0, formulation: 'Capsule', power: '250mg', purchaseDate: '2025-02-10', invoiceNumber: 'INV004', purchaseQuantity: 20 }
  ]);
  const [sales, setSales] = useState([
    { id: 1, medicineName: 'প্যারাসিটামল', quantity: 10, date: '2025-08-01', totalPrice: 12, profit: 4 },
    { id: 2, medicineName: 'নাপা', quantity: 5, date: '2025-08-02', totalPrice: 7.5, profit: 3 },
    { id: 3, medicineName: 'অ্যাট্রোপিন', quantity: 2, date: '2025-07-15', totalPrice: 5.04, profit: 1.04 },
    { id: 4, medicineName: 'অ্যামোক্সিসিলিন', quantity: 3, date: '2025-08-05', totalPrice: 12, profit: 3 }
  ]);
  const [orderItems, setOrderItems] = useState([]);
  const [orderDate, setOrderDate] = useState('');
  const [inventorySearch, setInventorySearch] = useState('');
  const [salesSearch, setSalesSearch] = useState('');
  const [salesDateRange, setSalesDateRange] = useState({ start: '', end: '' });
  const [profitSearch, setProfitSearch] = useState('');
  const [profitDateRange, setProfitDateRange] = useState({ start: '', end: '' });
  const [selectedSalesDate, setSelectedSalesDate] = useState('');
  const [purchaseReportFilter, setPurchaseReportFilter] = useState({ month: '', year: '' });
  const [isAdmin, setIsAdmin] = useState(false);
  const [username, setUsername] = useState('');
  const [plan, setPlan] = useState('free'); // Added plan state to fix setPlan error

  useEffect(() => {
    if (typeof AOS !== 'undefined') {
      AOS.init();
    }
    setTimeout(() => setIsLoading(false), 2000);
    document.documentElement.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setLoginCredentials({ email: pharmacyInfo.email, password: pharmacyInfo.password });
    setIsLoggedIn(true);
    setIsRegistering(false);
    setCurrentPage('dashboard');
    setLoginError('');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const isAdminLogin = e.target.adminLogin?.checked;

    if (isAdminLogin) {
      if (handleAdminLogin(email, password)) {
        setIsAdmin(true);
        setCurrentPage('admin-dashboard');
        setLoginError('');
        setIsLoggedIn(true); // Ensure isLoggedIn is set for admin
      } else {
        setLoginError('অ্যাডমিন ইউজারনেম বা পাসওয়ার্ড ভুল!');
      }
    } else {
      if (loginCredentials && loginCredentials.email === email && loginCredentials.password === password) {
        setIsLoggedIn(true);
        setCurrentPage('dashboard');
        setLoginError('');
      } else {
        setLoginError('ইমেইল বা পাসওয়ার্ড ভুল। একাউন্ট নেই? রেজিস্টার করুন।');
      }
    }
  };

  const handleInputChange = (e) => {
    setPharmacyInfo({ ...pharmacyInfo, [e.target.name]: e.target.value });
  };

  const handleAdminLogin = (username, password) => {
    return username === 'admin' && password === 'admin123';
  };

  return (
    <div className={`min-h-screen bg-gray-100 dark:bg-gray-900 flex ${theme}`}>
      {isLoggedIn && (
        <div className="w-64 bg-gray-800 dark:bg-gray-900 text-white h-screen p-4 fixed">
          <h2 className="text-xl font-bold mb-6 text-white dark:text-gray-100">ফার্মেসি অ্যাপ</h2>
          <nav className="space-y-2">
            <button
              onClick={() => setCurrentPage('dashboard')}
              className={`w-full text-left p-2 rounded-md ${currentPage === 'dashboard' ? 'bg-blue-600' : 'hover:bg-gray-700 dark:hover:bg-gray-800'}`}
            >
              হোম
            </button>
            <button
              onClick={() => { setCurrentPage('inventory'); setInventorySearch(''); }}
              className={`w-full text-left p-2 rounded-md ${currentPage === 'inventory' ? 'bg-blue-600' : 'hover:bg-gray-700 dark:hover:bg-gray-800'}`}
            >
              ইনভেন্টরি ম্যানেজমেন্ট
            </button>
            <button
              onClick={() => setCurrentPage('add-medicine')}
              className={`w-full text-left p-2 rounded-md ${currentPage === 'add-medicine' ? 'bg-blue-600' : 'hover:bg-gray-700 dark:hover:bg-gray-800'}`}
            >
              নতুন ওষুধ যোগ করুন
            </button>
            <button
              onClick={() => setCurrentPage('new-sale')}
              className={`w-full text-left p-2 rounded-md ${currentPage === 'new-sale' ? 'bg-blue-600' : 'hover:bg-gray-700 dark:hover:bg-gray-800'}`}
            >
              নতুন বিক্রয়
            </button>
            <button
              onClick={() => setCurrentPage('sales-report')}
              className={`w-full text-left p-2 rounded-md ${currentPage === 'sales-report' ? 'bg-blue-600' : 'hover:bg-gray-700 dark:hover:bg-gray-800'}`}
            >
              বিক্রয় রিপোর্ট
            </button>
            <button
              onClick={() => setCurrentPage('profit-loss')}
              className={`w-full text-left p-2 rounded-md ${currentPage === 'profit-loss' ? 'bg-blue-600' : 'hover:bg-gray-700 dark:hover:bg-gray-800'}`}
            >
              লাভ/ক্ষতি রিপোর্ট
            </button>
            <button
              onClick={() => setCurrentPage('purchase-report')}
              className={`w-full text-left p-2 rounded-md ${currentPage === 'purchase-report' ? 'bg-blue-600' : 'hover:bg-gray-700 dark:hover:bg-gray-800'}`}
            >
              ক্রয় রিপোর্ট
            </button>
            <button
              onClick={() => setCurrentPage('profile')}
              className={`w-full text-left p-2 rounded-md ${currentPage === 'profile' ? 'bg-blue-600' : 'hover:bg-gray-700 dark:hover:bg-gray-800'}`}
            >
              প্রোফাইল
            </button>
            <button
              onClick={() => setCurrentPage('subscription')}
              className={`w-full text-left p-2 rounded-md ${currentPage === 'subscription' ? 'bg-blue-600' : 'hover:bg-gray-700 dark:hover:bg-gray-800'}`}
            >
              সাবস্ক্রিপশন
            </button>
            {isAdmin && (
              <button
                onClick={() => setCurrentPage('admin')}
                className={`w-full text-left p-2 rounded-md ${currentPage === 'admin' ? 'bg-blue-600' : 'hover:bg-gray-700 dark:hover:bg-gray-800'}`}
              >
                অ্যাডমিন প্যানেল
              </button>
            )}
            <button
              onClick={() => { setIsLoggedIn(false); setIsAdmin(false); setCurrentPage('dashboard'); }}
              className="w-full text-left p-2 rounded-md hover:bg-red-700 dark:hover:bg-red-800"
            >
              লগআউট
            </button>
          </nav>
        </div>
      )}

      <div className={`flex-1 ${isLoggedIn ? 'ml-64' : ''} flex justify-center items-center`}>
        {!isLoggedIn ? (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md">
            {isRegistering ? (
              <>
                <h2 className="text-2xl font-semibold mb-4 text-center text-black dark:text-gray-100">ফার্মেসি রেজিস্ট্রেশন</h2>
                <form onSubmit={handleRegister} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-100">ফার্মেসির নাম</label>
                    <input type="text" name="name" value={pharmacyInfo.name} onChange={handleInputChange} className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-100">মালিকের নাম</label>
                    <input type="text" name="owner" value={pharmacyInfo.owner} onChange={handleInputChange} className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-100">লাইসেন্স নম্বর</label>
                    <input type="text" name="license" value={pharmacyInfo.license} onChange={handleInputChange} className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-100">ঠিকানা</label>
                    <input type="text" name="address" value={pharmacyInfo.address} onChange={handleInputChange} className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-100">ফোন নম্বর</label>
                    <input type="tel" name="phone" value={pharmacyInfo.phone} onChange={handleInputChange} className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-100">ইমেইল</label>
                    <input type="email" name="email" value={pharmacyInfo.email} onChange={handleInputChange} className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-100">পাসওয়ার্ড</label>
                    <input type="password" name="password" value={pharmacyInfo.password} onChange={handleInputChange} className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100" required />
                  </div>
                  <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 dark:hover:bg-blue-800">
                    রেজিস্টার করুন
                  </button>
                </form>
                <p className="mt-4 text-center text-black dark:text-gray-100">
                  ইতিমধ্যে একাউন্ট আছে?{' '}
                  <button onClick={() => setIsRegistering(false)} className="text-blue-600 dark:text-blue-400 hover:underline">
                    লগইন করুন
                  </button>
                </p>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-semibold mb-4 text-center text-black dark:text-gray-100">লগইন</h2>
                {loginError && <p className="text-red-600 dark:text-red-400 text-center mb-4">{loginError}</p>}
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-100">ইমেইল/ইউজারনেম</label>
                    <input type="text" name="email" value={username} onChange={(e) => setUsername(e.target.value)} className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-100">পাসওয়ার্ড</label>
                    <input type="password" name="password" className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100" required />
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" name="adminLogin" id="adminLogin" className="mr-2" />
                    <label htmlFor="adminLogin" className="text-sm text-gray-700 dark:text-gray-100">আমি অ্যাডমিন</label>
                  </div>
                  <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 dark:hover:bg-blue-800">
                    লগইন
                  </button>
                </form>
                <p className="mt-4 text-center text-black dark:text-gray-100">
                  নতুন ফার্মেসি মালিক?{' '}
                  <button onClick={() => setIsRegistering(true)} className="text-blue-600 dark:text-blue-400 hover:underline">
                    রেজিস্টার করুন
                  </button>
                </p>
              </>
            )}
          </div>
        ) : (
          <div className="p-6 w-full max-w-5xl">
            {currentPage === 'dashboard' && !isAdmin && (
              <Dashboard
                pharmacyInfo={pharmacyInfo}
                medicines={medicines}
                sales={sales}
                setCurrentPage={setCurrentPage}
                setInventorySearch={setInventorySearch}
                isLoading={isLoading}
                toggleTheme={toggleTheme}
                theme={theme}
              />
            )}
            {currentPage === 'inventory' && !isAdmin && (
              <Inventory
                medicines={medicines}
                inventorySearch={inventorySearch}
                setInventorySearch={setInventorySearch}
              />
            )}
            {currentPage === 'add-medicine' && !isAdmin && (
              <AddMedicine
                medicines={medicines}
                setMedicines={setMedicines}
                setCurrentPage={setCurrentPage}
              />
            )}
            {currentPage === 'new-sale' && !isAdmin && (
              <NewSale
                medicines={medicines}
                sales={sales}
                setSales={setSales}
                orderItems={orderItems}
                setOrderItems={setOrderItems}
                orderDate={orderDate}
                setOrderDate={setOrderDate}
              />
            )}
            {currentPage === 'sales-report' && !isAdmin && (
              <SalesReport
                sales={sales}
                salesSearch={salesSearch}
                setSalesSearch={setSalesSearch}
                salesDateRange={salesDateRange}
                setSalesDateRange={setSalesDateRange}
                selectedSalesDate={selectedSalesDate}
                setSelectedSalesDate={setSelectedSalesDate}
                theme={theme}
              />
            )}
            {currentPage === 'profit-loss' && !isAdmin && (
              <ProfitLoss
                sales={sales}
                profitSearch={profitSearch}
                setProfitSearch={setProfitSearch}
                profitDateRange={profitDateRange}
                setProfitDateRange={setProfitDateRange}
              />
            )}
            {currentPage === 'purchase-report' && !isAdmin && (
              <PurchaseReport
                medicines={medicines}
                purchaseReportFilter={purchaseReportFilter}
                setPurchaseReportFilter={setPurchaseReportFilter}
                theme={theme}
              />
            )}
            {currentPage === 'profile' && !isAdmin && (
              <Profile
                pharmacyInfo={pharmacyInfo}
                setPharmacyInfo={setPharmacyInfo}
                setCurrentPage={setCurrentPage}
              />
            )}
            {currentPage === 'subscription' && !isAdmin && (
              <Subscription
                setPlan={setPlan} // Updated to use defined setPlan
                theme={theme}
              />
            )}
            {currentPage === 'admin' && isAdmin && (
              <AdminPanel
                setPlan={setPlan} // Updated to use defined setPlan
                isAdmin={isAdmin}
                setIsAdmin={setIsAdmin}
              />
            )}
            {currentPage === 'admin-dashboard' && isAdmin && (
              <AdminDashboard
                pharmacyInfo={pharmacyInfo}
                medicines={medicines}
                sales={sales}
                setCurrentPage={setCurrentPage}
                theme={theme}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};