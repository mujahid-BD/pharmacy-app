const getExpiryStatusUtil = (expiryDate) => {
  const today = new Date();
  const expiry = new Date(expiryDate);
  const diffTime = expiry - today;
  const diffDays = diffTime / (1000 * 60 * 60 * 24);
  if (diffDays < 0) return 'expired';
  if (diffDays <= 30) return 'near-expiry';
  return 'valid';
};

const getDailySalesSummaryUtil = (date, sales) => {
  const filteredSales = sales.filter(sale => sale.date === date);
  return {
    totalSales: filteredSales.reduce((sum, sale) => sum + sale.totalPrice, 0).toFixed(2),
    totalProfit: filteredSales.reduce((sum, sale) => sum + sale.profit, 0).toFixed(2)
  };
};

const getPurchaseReportUtil = (medicines, filter) => {
  const filteredMedicines = medicines.filter(medicine => {
    const purchaseDate = new Date(medicine.purchaseDate);
    const month = filter.month ? purchaseDate.getMonth() + 1 : null;
    const year = filter.year ? purchaseDate.getFullYear() : null;
    return (!filter.month || month === parseInt(filter.month)) && (!filter.year || year === parseInt(filter.year));
  });

  const companySummary = filteredMedicines.reduce((acc, medicine) => {
    const cost = medicine.purchasePrice * medicine.purchaseQuantity;
    acc[medicine.company] = acc[medicine.company] || { totalCost: 0, totalQuantity: 0 };
    acc[medicine.company].totalCost += cost;
    acc[medicine.company].totalQuantity += medicine.purchaseQuantity;
    return acc;
  }, {});

  return { companySummary };
};