const NewSale = ({ medicines, sales, setSales, orderItems, setOrderItems, orderDate, setOrderDate }) => {
  const handleAddOrderItem = () => {
    setOrderItems([...orderItems, { medicineName: '', quantity: '', price: 0 }]);
  };

  const handleOrderItemChange = (index, field, value) => {
    const updatedOrderItems = [...orderItems];
    updatedOrderItems[index] = { ...updatedOrderItems[index], [field]: value };
    if (field === 'medicineName') {
      const selectedMedicine = medicines.find(m => m.name === value);
      updatedOrderItems[index].price = selectedMedicine ? selectedMedicine.salePrice : 0;
    }
    setOrderItems(updatedOrderItems);
  };

  const handleRemoveOrderItem = (index) => {
    setOrderItems(orderItems.filter((_, i) => i !== index));
  };

  const handleAddSale = (e) => {
    e.preventDefault();
    if (!orderDate) {
      alert('দয়া করে বিক্রয়ের তারিখ নির্বাচন করুন।');
      return;
    }
    if (orderItems.length === 0) {
      alert('দয়া করে কমপক্ষে একটি ওষুধ নির্বাচন করুন।');
      return;
    }
    let valid = true;
    const updatedMedicines = [...medicines];
    const newSales = [];
    orderItems.forEach((item, index) => {
      const selectedMedicine = medicines.find(m => m.name === item.medicineName);
      if (!selectedMedicine) {
        alert(`ওষুধ "${item.medicineName}" খুঁজে পাওয়া যায়নি।`);
        valid = false;
        return;
      }
      const quantityValue = parseInt(item.quantity);
      if (isNaN(quantityValue) || quantityValue <= 0) {
        alert(`দয়া করে ${item.medicineName} এর জন্য সঠিক পরিমাণ প্রদান করুন।`);
        valid = false;
        return;
      }
      if (quantityValue > selectedMedicine.stock) {
        alert(`${item.medicineName} এর জন্য পরিমাণ উপলব্ধ স্টক (${selectedMedicine.stock}) এর চেয়ে বেশি।`);
        valid = false;
        return;
      }
      const totalPrice = (quantityValue * selectedMedicine.salePrice).toFixed(2);
      const profit = ((selectedMedicine.salePrice - selectedMedicine.purchasePrice) * quantityValue).toFixed(2);
      newSales.push({
        id: sales.length + 1 + index,
        medicineName: item.medicineName,
        quantity: quantityValue,
        date: orderDate,
        totalPrice: parseFloat(totalPrice),
        profit: parseFloat(profit)
      });
      const medicineIndex = updatedMedicines.findIndex(m => m.name === item.medicineName);
      updatedMedicines[medicineIndex].stock -= quantityValue;
    });
    if (valid) {
      setSales([...sales, ...newSales]);
      setMedicines(updatedMedicines);
      setOrderItems([]);
      setOrderDate('');
      alert('বিক্রয় সফলভাবে যোগ করা হয়েছে!');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center text-black dark:text-gray-100">নতুন বিক্রয়</h2>
      <div className="space-y-4 max-w-4xl mx-auto">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-100">তারিখ</label>
          <input type="date" value={orderDate} onChange={(e) => setOrderDate(e.target.value)} className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100" required />
        </div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-black dark:text-gray-100">অর্ডার আইটেম</h3>
          <button onClick={handleAddOrderItem} className="bg-green-600 text-white p-2 rounded-md hover:bg-green-700 dark:hover:bg-green-800">
            নতুন ওষুধ যোগ করুন
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700">
                <th className="border p-2 text-black dark:text-gray-100">ওষুধের নাম</th>
                <th className="border p-2 text-black dark:text-gray-100">পরিমাণ</th>
                <th className="border p-2 text-black dark:text-gray-100">মূল্য (টাকা)</th>
                <th className="border p-2 text-black dark:text-gray-100">মোট (টাকা)</th>
                <th className="border p-2 text-black dark:text-gray-100">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody>
              {orderItems.map((item, index) => (
                <tr key={index} className="border">
                  <td className="border p-2">
                    <select
                      value={item.medicineName}
                      onChange={(e) => handleOrderItemChange(index, 'medicineName', e.target.value)}
                      className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                    >
                      <option value="">ওষুধ নির্বাচন করুন</option>
                      {medicines.map(medicine => (
                        <option key={medicine.id} value={medicine.name}>{medicine.name}</option>
                      ))}
                    </select>
                  </td>
                  <td className="border p-2">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleOrderItemChange(index, 'quantity', e.target.value)}
                      className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                      min="1"
                    />
                  </td>
                  <td className="border p-2 text-center text-black dark:text-gray-100">{item.price.toFixed(2)}</td>
                  <td className="border p-2 text-center text-black dark:text-gray-100">{(item.quantity && item.price) ? (item.quantity * item.price).toFixed(2) : '0.00'}</td>
                  <td className="border p-2 text-center">
                    <button onClick={() => handleRemoveOrderItem(index)} className="bg-red-600 text-white p-1 rounded-md hover:bg-red-700 dark:hover:bg-red-800">
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4">
          <p className="text-lg font-semibold text-black dark:text-gray-100">
            মোট মূল্য: {orderItems.reduce((sum, item) => sum + (item.quantity * item.price || 0), 0).toFixed(2)} টাকা
          </p>
        </div>
        <button onClick={handleAddSale} className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 dark:hover:bg-blue-800 mt-4">
          বিক্রয় যোগ করুন
        </button>
      </div>
    </div>
  );
};