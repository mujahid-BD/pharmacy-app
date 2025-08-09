const ProfitLoss = ({ sales, profitSearch, setProfitSearch, profitDateRange, setProfitDateRange }) => {
  const filteredProfit = sales.filter(sale => {
    const matchesSearch = sale.medicineName.toLowerCase().includes(profitSearch.toLowerCase());
    const saleDate = new Date(sale.date);
    const startDate = profitDateRange.start ? new Date(profitDateRange.start) : null;
    const endDate = profitDateRange.end ? new Date(profitDateRange.end) : null;
    return matchesSearch && (!startDate || saleDate >= startDate) && (!endDate || saleDate <= endDate);
  });

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center text-black dark:text-gray-100">লাভ/ক্ষতি রিপোর্ট</h2>
      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-md shadow-md">
          <input
            type="text"
            placeholder="ওষুধের নাম দিয়ে সার্চ করুন"
            value={profitSearch}
            onChange={(e) => setProfitSearch(e.target.value)}
            className="flex-1 p-2 border rounded-md dark:bg-gray-600 dark:border-gray-500 dark:text-gray-100"
          />
          <input
            type="date"
            value={profitDateRange.start}
            onChange={(e) => setProfitDateRange({ ...profitDateRange, start: e.target.value })}
            className="p-2 border rounded-md dark:bg-gray-600 dark:border-gray-500 dark:text-gray-100"
          />
          <input
            type="date"
            value={profitDateRange.end}
            onChange={(e) => setProfitDateRange({ ...profitDateRange, end: e.target.value })}
            className="p-2 border rounded-md dark:bg-gray-600 dark:border-gray-500 dark:text-gray-100"
          />
          <button
            onClick={() => { setProfitSearch(''); setProfitDateRange({ start: '', end: '' }); }}
            className="bg-gray-600 text-white p-2 rounded-md hover:bg-gray-700 dark:hover:bg-gray-800"
          >
            রিসেট
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse mx-auto text-sm">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700">
                <th className="border p-2 text-black dark:text-gray-100">ওষুধের নাম</th>
                <th className="border p-2 text-black dark:text-gray-100">পরিমাণ</th>
                <th className="border p-2 text-black dark:text-gray-100">তারিখ</th>
                <th className="border p-2 text-black dark:text-gray-100">মোট মূল্য (টাকা)</th>
                <th className="border p-2 text-black dark:text-gray-100">লাভ (টাকা)</th>
              </tr>
            </thead>
            <tbody>
              {filteredProfit.map(sale => (
                <tr key={sale.id} className="border">
                  <td className="border p-2 text-center text-black dark:text-gray-100">{sale.medicineName}</td>
                  <td className="border p-2 text-center text-black dark:text-gray-100">{sale.quantity}</td>
                  <td className="border p-2 text-center text-black dark:text-gray-100">{sale.date}</td>
                  <td className="border p-2 text-center text-black dark:text-gray-100">{sale.totalPrice}</td>
                  <td className="border p-2 text-center text-black dark:text-gray-100">{sale.profit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2 text-center text-black dark:text-gray-100">মোট লাভ</h3>
          <p className="text-center text-black dark:text-gray-100">{filteredProfit.reduce((sum, sale) => sum + sale.profit, 0).toFixed(2)} টাকা</p>
        </div>
      </div>
    </div>
  );
};