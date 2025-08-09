const PurchaseReport = ({ medicines, purchaseReportFilter, setPurchaseReportFilter, theme }) => {
  const getPurchaseReport = getPurchaseReportUtil;

  React.useEffect(() => {
    let chartInstance = null;
    const ctxPurchase = document.getElementById('purchaseChart')?.getContext('2d');

    if (window.Chart && ctxPurchase) {
      try {
        const purchaseData = getPurchaseReport(medicines, purchaseReportFilter);
        const labels = Object.keys(purchaseData.companySummary);
        const data = Object.values(purchaseData.companySummary).map(c => c.totalCost);

        chartInstance = new Chart(ctxPurchase, {
          type: 'pie',
          data: {
            labels: labels,
            datasets: [{
              label: 'কোম্পানি-ভিত্তিক ক্রয় (টাকা)',
              data: data,
              backgroundColor: ['#2563eb', '#16a34a', '#d97706', '#dc2626', '#9333ea'],
              borderColor: ['#1d4ed8', '#15803d', '#b45309', '#b91c1c', '#7e22ce'],
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
                labels: {
                  font: { family: 'Noto Sans Bengali', size: 14 },
                  color: theme === 'dark' ? '#e5e7eb' : '#1f2937'
                }
              },
              tooltip: {
                bodyFont: { family: 'Noto Sans Bengali' },
                titleFont: { family: 'Noto Sans Bengali' }
              }
            }
          }
        });
      } catch (error) {
        console.error('Error initializing Purchase Chart:', error);
      }
    } else {
      console.warn('Chart.js or canvas element not found');
    }

    // ক্লিনআপ ফাংশন: পূর্ববর্তী চার্ট ধ্বংস করা
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [medicines, purchaseReportFilter, theme]);

  const purchaseData = getPurchaseReport(medicines, purchaseReportFilter);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md" data-aos="fade-up">
      <h2 className="text-2xl font-semibold mb-4 text-center text-black dark:text-gray-100">ক্রয় রিপোর্ট</h2>
      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-md shadow-md">
          <select
            value={purchaseReportFilter.month}
            onChange={(e) => setPurchaseReportFilter({ ...purchaseReportFilter, month: e.target.value })}
            className="p-2 border rounded-md dark:bg-gray-600 dark:border-gray-500 dark:text-gray-100"
          >
            <option value="">মাস নির্বাচন করুন</option>
            <option value="1">জানুয়ারি</option>
            <option value="2">ফেব্রুয়ারি</option>
            <option value="3">মার্চ</option>
            <option value="4">এপ্রিল</option>
            <option value="5">মে</option>
            <option value="6">জুন</option>
            <option value="7">জুলাই</option>
            <option value="8">আগস্ট</option>
            <option value="9">সেপ্টেম্বর</option>
            <option value="10">অক্টোবর</option>
            <option value="11">নভেম্বর</option>
            <option value="12">ডিসেম্বর</option>
          </select>
          <input
            type="number"
            placeholder="বছর নির্বাচন করুন (যেমন, 2025)"
            value={purchaseReportFilter.year}
            onChange={(e) => setPurchaseReportFilter({ ...purchaseReportFilter, year: e.target.value })}
            className="p-2 border rounded-md dark:bg-gray-600 dark:border-gray-500 dark:text-gray-100"
          />
          <button
            onClick={() => setPurchaseReportFilter({ month: '', year: '' })}
            className="bg-gray-600 text-white p-2 rounded-md hover:bg-gray-700 dark:hover:bg-gray-800"
          >
            রিসেট
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse mx-auto text-sm">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700">
                <th className="border p-2 text-black dark:text-gray-100">কোম্পানি</th>
                <th className="border p-2 text-black dark:text-gray-100">মোট পরিমাণ</th>
                <th className="border p-2 text-black dark:text-gray-100">মোট খরচ (টাকা)</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(purchaseData.companySummary).length > 0 ? (
                Object.entries(purchaseData.companySummary).map(([company, data]) => (
                  <tr key={company} className="border">
                    <td className="border p-2 text-center text-black dark:text-gray-100">{company}</td>
                    <td className="border p-2 text-center text-black dark:text-gray-100">{data.totalQuantity}</td>
                    <td className="border p-2 text-center text-black dark:text-gray-100">{data.totalCost.toFixed(2)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="border p-2 text-center text-black dark:text-gray-100">কোনো ডেটা পাওয়া যায়নি</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2 text-center text-black dark:text-gray-100">কোম্পানি-ভিত্তিক ক্রয় চার্ট</h3>
          <canvas id="purchaseChart" className="max-w-full"></canvas>
        </div>
      </div>
    </div>
  );
};