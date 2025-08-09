const SalesReport = ({ sales, salesSearch, setSalesSearch, salesDateRange, setSalesDateRange, selectedSalesDate, setSelectedSalesDate, theme }) => {
  const getDailySalesSummary = getDailySalesSummaryUtil;

  const filteredSales = sales.filter(sale => {
    const matchesSearch = sale.medicineName.toLowerCase().includes(salesSearch.toLowerCase());
    const saleDate = new Date(sale.date);
    const startDate = salesDateRange.start ? new Date(salesDateRange.start) : null;
    const endDate = salesDateRange.end ? new Date(salesDateRange.end) : null;
    return matchesSearch && (!startDate || saleDate >= startDate) && (!endDate || saleDate <= endDate);
  });

  React.useEffect(() => {
    if (window.Chart) {
      try {
        const ctxDaily = document.getElementById('salesChart')?.getContext('2d');
        if (ctxDaily) {
          new Chart(ctxDaily, {
            type: 'bar',
            data: {
              labels: filteredSales.map(sale => sale.date),
              datasets: [{
                label: 'মোট মূল্য (টাকা)',
                data: filteredSales.map(sale => sale.totalPrice),
                backgroundColor: '#2563eb',
                borderColor: '#1d4ed8',
                borderWidth: 1
              }]
            },
            options: {
              scales: { y: { beginAtZero: true } }
            }
          });
        }

        const ctxMonthly = document.getElementById('monthlySalesChart')?.getContext('2d');
        if (ctxMonthly) {
          const monthlySales = filteredSales.reduce((acc, sale) => {
            const month = new Date(sale.date).toLocaleString('bn', { month: 'long', year: 'numeric' });
            acc[month] = (acc[month] || 0) + sale.totalPrice;
            return acc;
          }, {});
          new Chart(ctxMonthly, {
            type: 'line',
            data: {
              labels: Object.keys(monthlySales),
              datasets: [{
                label: 'মাসিক বিক্রয় (টাকা)',
                data: Object.values(monthlySales),
                backgroundColor: '#16a34a',
                borderColor: '#15803d',
                borderWidth: 2,
                fill: false
              }]
            },
            options: {
              scales: { y: { beginAtZero: true } }
            }
          });
        }
      } catch (error) {
        console.error('Error initializing Chart.js:', error);
      }
    }
  }, [filteredSales, theme]);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center text-black dark:text-gray-100">বিক্রয় রিপোর্ট</h2>
      <div className="mb-6">
        <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-md shadow-md">
          <h3 className="text-lg font-semibold mb-2 text-black dark:text-gray-100">নির্দিষ্ট তারিখের সারাংশ</h3>
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <input
              type="date"
              value={selectedSalesDate}
              onChange={(e) => setSelectedSalesDate(e.target.value)}
              className="p-2 border rounded-md dark:bg-gray-600 dark:border-gray-500 dark:text-gray-100"
            />
          </div>
          {selectedSalesDate && (
            <div className="mt-4 text-center">
              <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">তারিখ: {selectedSalesDate}</p>
              <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">মোট বিক্রয়: {getDailySalesSummary(selectedSalesDate).totalSales} টাকা</p>
              <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">মোট লাভ: {getDailySalesSummary(selectedSalesDate).totalProfit} টাকা</p>
            </div>
          )}
        </div>
        <div className="flex flex-col md:flex-row gap-4 mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-md shadow-md">
          <input
            type="text"
            placeholder="ওষুধের নাম দিয়ে সার্চ করুন"
            value={salesSearch}
            onChange={(e) => setSalesSearch(e.target.value)}
            className="flex-1 p-2 border rounded-md dark:bg-gray-600 dark:border-gray-500 dark:text-gray-100"
          />
          <input
            type="date"
            value={salesDateRange.start}
            onChange={(e) => setSalesDateRange({ ...salesDateRange, start: e.target.value })}
            className="p-2 border rounded-md dark:bg-gray-600 dark:border-gray-500 dark:text-gray-100"
          />
          <input
            type="date"
            value={salesDateRange.end}
            onChange={(e) => setSalesDateRange({ ...salesDateRange, end: e.target.value })}
            className="p-2 border rounded-md dark:bg-gray-600 dark:border-gray-500 dark:text-gray-100"
          />
          <button
            onClick={() => { setSalesSearch(''); setSalesDateRange({ start: '', end: '' }); }}
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
              {filteredSales.map(sale => (
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
          <h3 className="text-xl font-semibold mb-2 text-center text-black dark:text-gray-100">দৈনিক বিক্রয় চার্ট</h3>
          <canvas id="salesChart"></canvas>
        </div>
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2 text-center text-black dark:text-gray-100">মাসিক বিক্রয় চার্ট</h3>
          <canvas id="monthlySalesChart"></canvas>
        </div>
      </div>
    </div>
  );
};