const AddMedicine = ({ setMedicines, setCurrentPage, plan }) => {
  const [formData, setFormData] = React.useState({
    name: '',
    company: '',
    formulation: '',
    power: '',
    purchasePrice: '',
    salePrice: '',
    purchaseQuantity: '',
    purchaseDate: '',
    expiryDate: ''
  });

  const formulations = ['Tablet', 'Capsule', 'Syrup', 'Injection', 'Ointment', 'Drops'];
  const powers = ['250mg', '500mg', '1g', '5ml', '10ml', '100mg', '200mg'];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMedicine = {
      id: Date.now(),
      ...formData,
      purchasePrice: parseFloat(formData.purchasePrice),
      salePrice: parseFloat(formData.salePrice),
      purchaseQuantity: parseInt(formData.purchaseQuantity),
      profit: (parseFloat(formData.salePrice) - parseFloat(formData.purchasePrice)) * parseInt(formData.purchaseQuantity)
    };
    setMedicines(prev => [...prev, newMedicine]);
    setFormData({
      name: '',
      company: '',
      formulation: '',
      power: '',
      purchasePrice: '',
      salePrice: '',
      purchaseQuantity: '',
      purchaseDate: '',
      expiryDate: ''
    });
    alert('ওষুধ সফলভাবে যোগ করা হয়েছে!');
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md max-w-2xl mx-auto" data-aos="fade-up">
      <h2 className="text-2xl font-semibold mb-6 text-center text-black dark:text-gray-100">নতুন ওষুধ যোগ করুন</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-100">ওষুধের নাম</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-100">কোম্পানি</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-100">ফর্মুলেশন</label>
          {plan === 'premium' ? (
            <select
              name="formulation"
              value={formData.formulation}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              required
            >
              <option value="">ফর্মুলেশন নির্বাচন করুন</option>
              {formulations.map((form, index) => (
                <option key={index} value={form}>{form}</option>
              ))}
            </select>
          ) : (
            <>
              <input
                type="text"
                name="formulation"
                value={formData.formulation}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                placeholder="যেমন: Tablet, Capsule"
                required
              />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                ড্রপ-ডাউন ফিচার শুধুমাত্র প্রিমিয়াম প্ল্যানে উপলব্ধ।{' '}
                <button
                  onClick={() => setCurrentPage('subscription')}
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  প্রিমিয়াম প্ল্যানে আপগ্রেড করুন
                </button>
              </p>
            </>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-100">পাওয়ার</label>
          {plan === 'premium' ? (
            <select
              name="power"
              value={formData.power}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              required
            >
              <option value="">পাওয়ার নির্বাচন করুন</option>
              {powers.map((power, index) => (
                <option key={index} value={power}>{power}</option>
              ))}
            </select>
          ) : (
            <>
              <input
                type="text"
                name="power"
                value={formData.power}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                placeholder="যেমন: 500mg, 250mg"
                required
              />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                ড্রপ-ডাউন ফিচার শুধুমাত্র প্রিমিয়াম প্ল্যানে উপলব্ধ।{' '}
                <button
                  onClick={() => setCurrentPage('subscription')}
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  প্রিমিয়াম প্ল্যানে আপগ্রেড করুন
                </button>
              </p>
            </>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-100">ক্রয় মূল্য (টাকা)</label>
          <input
            type="number"
            name="purchasePrice"
            value={formData.purchasePrice}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            required
            min="0"
            step="0.01"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-100">বিক্রয় মূল্য (টাকা)</label>
          <input
            type="number"
            name="salePrice"
            value={formData.salePrice}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            required
            min="0"
            step="0.01"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-100">ক্রয় পরিমাণ</label>
          <input
            type="number"
            name="purchaseQuantity"
            value={formData.purchaseQuantity}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            required
            min="1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-100">ক্রয়ের তারিখ</label>
          <input
            type="date"
            name="purchaseDate"
            value={formData.purchaseDate}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-100">মেয়াদোত্তীর্ণ তারিখ</label>
          <input
            type="date"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            required
          />
        </div>
        <div className="flex gap-4 justify-center">
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 dark:hover:bg-blue-800"
          >
            ওষুধ যোগ করুন
          </button>
          <button
            type="button"
            onClick={() => setCurrentPage('inventory')}
            className="bg-gray-600 text-white p-2 rounded-md hover:bg-gray-700 dark:hover:bg-gray-800"
          >
            ফিরে যান
          </button>
        </div>
      </form>
    </div>
  );
};