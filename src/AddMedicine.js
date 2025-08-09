const AddMedicine = ({ medicines, setMedicines, setCurrentPage }) => {
  const handleAddMedicine = (e) => {
    e.preventDefault();
    const newMedicine = {
      id: medicines.length + 1,
      name: e.target.name.value,
      generic: e.target.generic.value,
      company: e.target.company.value,
      stock: parseInt(e.target.stock.value),
      expiry: e.target.expiry.value,
      purchasePrice: parseFloat(e.target.purchasePrice.value),
      salePrice: parseFloat(e.target.salePrice.value),
      formulation: e.target.formulation.value,
      power: e.target.power.value,
      purchaseDate: e.target.purchaseDate.value,
      invoiceNumber: e.target.invoiceNumber.value,
      purchaseQuantity: parseInt(e.target.stock.value)
    };
    setMedicines([...medicines, newMedicine]);
    e.target.reset();
    setCurrentPage('inventory');
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center text-black dark:text-gray-100">নতুন ওষুধ যোগ করুন</h2>
      <form onSubmit={handleAddMedicine} className="space-y-4 max-w-lg mx-auto">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-100">ওষুধের নাম</label>
          <input type="text" name="name" className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-100">জেনেরিক নাম</label>
          <input type="text" name="generic" className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-100">কোম্পানির নাম</label>
          <input type="text" name="company" className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-100">ফর্মুলেশন</label>
          <input type="text" name="formulation" className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-100">পাওয়ার</label>
          <input type="text" name="power" className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-100">স্টক</label>
          <input type="number" name="stock" className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-100">মেয়াদোত্তীর্ণ তারিখ</label>
          <input type="date" name="expiry" className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-100">ক্রয় মূল্য (টাকা)</label>
          <input type="number" name="purchasePrice" step="0.01" className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-100">বিক্রয় মূল্য (টাকা)</label>
          <input type="number" name="salePrice" step="0.01" className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-100">ক্রয়ের তারিখ</label>
          <input type="date" name="purchaseDate" className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-100">ইনভয়েস নম্বর</label>
          <input type="text" name="invoiceNumber" className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100" required />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 dark:hover:bg-blue-800">
          ওষুধ যোগ করুন
        </button>
      </form>
    </div>
  );
};