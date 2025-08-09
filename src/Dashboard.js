const Dashboard = ({ pharmacyInfo, medicines, sales, setCurrentPage, setInventorySearch, isLoading, toggleTheme, theme }) => {
  const getExpiryStatus = getExpiryStatusUtil;

  return (
    <div className="p-6 w-full max-w-5xl flex">
      <div className="w-64 bg-gray-800 dark:bg-gray-900 text-white p-4 rounded-lg shadow-md mr-6">
        <h2 className="text-xl font-bold mb-6 text-white dark:text-gray-100">নেভিগেশন</h2>
        <nav className="space-y-2">
          <button
            onClick={() => setCurrentPage('dashboard')}
            className="w-full text-left p-2 rounded-md hover:bg-blue-600 dark:hover:bg-blue-800 text-white"
          >
            হোম
          </button>
          <button
            onClick={() => { setCurrentPage('inventory'); setInventorySearch(''); }}
            className="w-full text-left p-2 rounded-md hover:bg-blue-600 dark:hover:bg-blue-800 text-white"
          >
            ইনভেন্টরি ম্যানেজমেন্ট
          </button>
          <button
            onClick={() => setCurrentPage('add-medicine')}
            className="w-full text-left p-2 rounded-md hover:bg-blue-600 dark:hover:bg-blue-800 text-white"
          >
            নতুন ওষুধ যোগ করুন
          </button>
          <button
            onClick={() => setCurrentPage('new-sale')}
            className="w-full text-left p-2 rounded-md hover:bg-blue-600 dark:hover:bg-blue-800 text-white"
          >
            নতুন বিক্রয়
          </button>
          <button
            onClick={() => setCurrentPage('sales-report')}
            className="w-full text-left p-2 rounded-md hover:bg-blue-600 dark:hover:bg-blue-800 text-white"
          >
            বিক্রয় রিপোর্ট
          </button>
          <button
            onClick={() => setCurrentPage('profit-loss')}
            className="w-full text-left p-2 rounded-md hover:bg-blue-600 dark:hover:bg-blue-800 text-white"
          >
            লাভ/ক্ষতি রিপোর্ট
          </button>
          <button
            onClick={() => setCurrentPage('purchase-report')}
            className="w-full text-left p-2 rounded-md hover:bg-blue-600 dark:hover:bg-blue-800 text-white"
          >
            ক্রয় রিপোর্ট
          </button>
          <button
            onClick={() => setCurrentPage('profile')}
            className="w-full text-left p-2 rounded-md hover:bg-blue-600 dark:hover:bg-blue-800 text-white"
          >
            প্রোফাইল
          </button>
          <button
            onClick={() => setCurrentPage('subscription')}
            className="w-full text-left p-2 rounded-md hover:bg-blue-600 dark:hover:bg-blue-800 text-white"
          >
            সাবস্ক্রিপশন
          </button>
          <button
            onClick={() => setCurrentPage('admin')}
            className="w-full text-left p-2 rounded-md hover:bg-blue-600 dark:hover:bg-blue-800 text-white"
          >
            অ্যাডমিন প্যানেল
          </button>
        </nav>
      </div>
      <div className="flex-1">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-center text-black dark:text-gray-100">
                  স্বাগতম, {pharmacyInfo.owner || 'ব্যবহারকারী'}!
                </h2>
                <button
                  onClick={toggleTheme}
                  className="bg-gray-200 dark:bg-gray-700 p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-200"
                  aria-label="থিম পরিবর্তন করুন"
                >
                  <i className={`fas ${theme === 'light' ? 'fa-moon' : 'fa-sun'} text-lg text-black dark:text-gray-100`}></i>
                </button>
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2 text-center text-black dark:text-gray-100">
                  ফার্মেসির তথ্য
                </h3>
                <p className="text-center text-black dark:text-gray-100">ফার্মেসির নাম: {pharmacyInfo.name || 'নির্ধারিত নয়'}</p>
                <p className="text-center text-black dark:text-gray-100">লাইসেন্স নম্বর: {pharmacyInfo.license || 'নির্ধারিত নয়'}</p>
                <p className="text-center text-black dark:text-gray-100">ঠিকানা: {pharmacyInfo.address || 'নির্ধারিত নয়'}</p>
                <p className="text-center text-black dark:text-gray-100">ফোন: {pharmacyInfo.phone || 'নির্ধারিত নয়'}</p>
                <p className="text-center text-black dark:text-gray-100">ইমেইল: {pharmacyInfo.email || 'নির্ধারিত নয়'}</p>
              </div>
              <div className="mb-6">
                <input
                  type="text"
                  placeholder="ওষুধ সার্চ করুন (নাম, জেনেরিক, কোম্পানি)"
                  onChange={(e) => setInventorySearch(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      setCurrentPage('inventory');
                    }
                  }}
                  className="w-full p-2 border rounded-md text-black dark:text-gray-100 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div className="mb-6 overflow-x-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <div
                    className="p-4 bg-red-200 dark:bg-red-800 border border-gray-300 dark:border-gray-600 rounded-md text-center min-w-[150px] hover:shadow-lg hover:scale-105 transition-transform duration-200 animate-fade-in"
                    data-aos="fade-up"
                    data-aos-delay="100"
                  >
                    <i className="fas fa-exclamation-triangle text-red-600 dark:text-red-400 text-2xl mb-2"></i>
                    <h4 className="text-lg font-semibold text-red-600 dark:text-red-400">কম স্টকের ওষুধ</h4>
                    <p className="text-red-600 dark:text-red-400 text-base">{medicines.filter(m => m.stock <= 10).length}টি</p>
                    <button
                      onClick={() => { setCurrentPage('inventory'); setInventorySearch('low stock'); }}
                      className="mt-2 bg-blue-600 text-white rounded-full px-4 py-2 hover:bg-blue-700 hover:shadow-md transition-all duration-200"
                    >
                      বিস্তারিত দেখুন
                    </button>
                  </div>
                  <div
                    className="p-4 bg-yellow-200 dark:bg-yellow-800 border border-gray-300 dark:border-gray-600 rounded-md text-center min-w-[150px] hover:shadow-lg hover:scale-105 transition-transform duration-200 animate-fade-in"
                    data-aos="fade-up"
                    data-aos-delay="200"
                  >
                    <i className="fas fa-clock text-yellow-600 dark:text-yellow-400 text-2xl mb-2"></i>
                    <h4 className="text-lg font-semibold text-yellow-600 dark:text-yellow-400">মেয়াদোত্তীর্ণ/আসন্ন মেয়াদোত্তীর্ণ</h4>
                    <p className="text-yellow-600 dark:text-yellow-400 text-base">{medicines.filter(m => getExpiryStatus(m.expiry) !== 'valid').length}টি</p>
                    <button
                      onClick={() => { setCurrentPage('inventory'); setInventorySearch('expired'); }}
                      className="mt-2 bg-blue-600 text-white rounded-full px-4 py-2 hover:bg-blue-700 hover:shadow-md transition-all duration-200"
                    >
                      বিস্তারিত দেখুন
                    </button>
                  </div>
                  <div
                    className="p-4 bg-blue-200 dark:bg-blue-800 border border-gray-300 dark:border-gray-600 rounded-md text-center min-w-[150px] hover:shadow-lg hover:scale-105 transition-transform duration-200 animate-fade-in"
                    data-aos="fade-up"
                    data-aos-delay="300"
                  >
                    <i className="fas fa-chart-line text-blue-600 dark:text-blue-400 text-2xl mb-2"></i>
                    <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400">সাম্প্রতিক বিক্রয়</h4>
                    <p className="text-blue-600 dark:text-blue-400 text-base">{sales.slice(-5).length}টি</p>
                    <button
                      onClick={() => setCurrentPage('sales-report')}
                      className="mt-2 bg-blue-600 text-white rounded-full px-4 py-2 hover:bg-blue-700 hover:shadow-md transition-all duration-200"
                    >
                      বিস্তারিত দেখুন
                    </button>
                  </div>
                  <div
                    className="p-4 bg-green-200 dark:bg-green-800 border border-gray-300 dark:border-gray-600 rounded-md text-center min-w-[150px] hover:shadow-lg hover:scale-105 transition-transform duration-200 animate-fade-in"
                    data-aos="fade-up"
                    data-aos-delay="400"
                  >
                    <i className="fas fa-capsules text-green-600 dark:text-green-400 text-2xl mb-2"></i>
                    <h4 className="text-lg font-semibold text-green-600 dark:text-green-400">মোট ওষুধ</h4>
                    <p className="text-green-600 dark:text-green-400 text-base">{medicines.length}টি</p>
                    <button
                      onClick={() => { setCurrentPage('inventory'); setInventorySearch(''); }}
                      className="mt-2 bg-blue-600 text-white rounded-full px-4 py-2 hover:bg-blue-700 hover:shadow-md transition-all duration-200"
                    >
                      বিস্তারিত দেখুন
                    </button>
                  </div>
                </div>
              </div>
              <div className="mb-6 p-4 bg-blue-100 dark:bg-blue-900 rounded-md">
                <p className="text-blue-800 dark:text-blue-200 text-center">আপনার ৩০ দিনের ফ্রি ট্রায়াল চলছে। বাকি আছে: ২৮ দিন।</p>
                <button
                  onClick={() => setCurrentPage('subscription')}
                  className="mt-2 text-blue-600 dark:text-blue-400 hover:underline block mx-auto"
                >
                  প্ল্যান আপগ্রেড করুন
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};