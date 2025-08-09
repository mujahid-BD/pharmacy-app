const Inventory = ({ medicines, inventorySearch, setInventorySearch }) => {
  const getExpiryStatus = getExpiryStatusUtil;

  const filteredMedicines = medicines.filter(m => {
    if (inventorySearch === 'low stock') return m.stock <= 10;
    if (inventorySearch === 'expired') return getExpiryStatus(m.expiry) !== 'valid';
    return (
      m.name.toLowerCase().includes(inventorySearch.toLowerCase()) ||
      m.generic.toLowerCase().includes(inventorySearch.toLowerCase()) ||
      m.company.toLowerCase().includes(inventorySearch.toLowerCase()) ||
      m.formulation.toLowerCase().includes(inventorySearch.toLowerCase())
    );
  });

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center text-black dark:text-gray-100">ইনভেন্টরি ম্যানেজমেন্ট</h2>
      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-md shadow-md">
          <input
            type="text"
            placeholder="নাম, জেনেরিক, কোম্পানি, ফর্মুলেশন, বা 'low stock', 'expired' দিয়ে সার্চ করুন"
            value={inventorySearch}
            onChange={(e) => setInventorySearch(e.target.value)}
            className="flex-1 p-2 border rounded-md dark:bg-gray-600 dark:border-gray-500 dark:text-gray-100"
          />
          <button
            onClick={() => setInventorySearch('')}
            className="bg-gray-600 text-white p-2 rounded-md hover:bg-gray-700 dark:hover:bg-gray-800"
          >
            রিসেট
          </button>
        </div>
        <h3 className="text-xl font-semibold mb-2 text-center text-black dark:text-gray-100">ওষুধের তালিকা</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse mx-auto text-sm">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700">
                <th className="border p-2 text-black dark:text-gray-100">ওষুধের নাম</th>
                <th className="border p-2 text-black dark:text-gray-100">জেনেরিক নাম</th>
                <th className="border p-2 text-black dark:text-gray-100">কোম্পানি</th>
                <th className="border p-2 text-black dark:text-gray-100">ফর্মুলেশন</th>
                <th className="border p-2 text-black dark:text-gray-100">পাওয়ার</th>
                <th className="border p-2 text-black dark:text-gray-100">স্টক</th>
                <th className="border p-2 text-black dark:text-gray-100">ক্রয় মূল্য (টাকা)</th>
                <th className="border p-2 text-black dark:text-gray-100">বিক্রয় মূল্য (টাকা)</th>
                <th className="border p-2 text-black dark:text-gray-100">মেয়াদোত্তীর্ণ তারিখ</th>
                <th className="border p-2 text-black dark:text-gray-100">ক্রয়ের তারিখ</th>
                <th className="border p-2 text-black dark:text-gray-100">ইনভয়েস নম্বর</th>
              </tr>
            </thead>
            <tbody>
              {filteredMedicines.map(medicine => {
                const expiryStatus = getExpiryStatus(medicine.expiry);
                return (
                  <tr key={medicine.id} className={`border ${medicine.stock <= 10 ? 'bg-red-100 dark:bg-red-900' : expiryStatus !== 'valid' ? 'bg-yellow-100 dark:bg-yellow-900' : ''}`}>
                    <td className="border p-2 text-center text-black dark:text-gray-100">{medicine.name}</td>
                    <td className="border p-2 text-center text-black dark:text-gray-100">{medicine.generic}</td>
                    <td className="border p-2 text-center text-black dark:text-gray-100">{medicine.company}</td>
                    <td className="border p-2 text-center text-black dark:text-gray-100">{medicine.formulation}</td>
                    <td className="border p-2 text-center text-black dark:text-gray-100">{medicine.power}</td>
                    <td className="border p-2 text-center text-black dark:text-gray-100">{medicine.stock}{medicine.stock <= 10 && <span className="ml-2 text-red-600 dark:text-red-400">⚠️ কম স্টক</span>}</td>
                    <td className="border p-2 text-center text-black dark:text-gray-100">{medicine.purchasePrice}</td>
                    <td className="border p-2 text-center text-black dark:text-gray-100">{medicine.salePrice}</td>
                    <td className="border p-2 text-center text-black dark:text-gray-100">{medicine.expiry}{expiryStatus === 'expired' && <span className="ml-2 text-red-600 dark:text-red-400">⚠️ মেয়াদোত্তীর্ণ</span>}{expiryStatus === 'near-expiry' && <span className="ml-2 text-yellow-600 dark:text-yellow-400">⚠️ মেয়াদ শেষ হচ্ছে</span>}</td>
                    <td className="border p-2 text-center text-black dark:text-gray-100">{medicine.purchaseDate}</td>
                    <td className="border p-2 text-center text-black dark:text-gray-100">{medicine.invoiceNumber}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};