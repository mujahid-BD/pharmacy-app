const Profile = ({ pharmacyInfo, setPharmacyInfo, setCurrentPage }) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [formData, setFormData] = React.useState(pharmacyInfo);
  const [successMessage, setSuccessMessage] = React.useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPharmacyInfo(formData);
    setIsEditing(false);
    setSuccessMessage('প্রোফাইল তথ্য সফলভাবে আপডেট করা হয়েছে!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleCancel = () => {
    setFormData(pharmacyInfo);
    setIsEditing(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md max-w-2xl mx-auto" data-aos="fade-up">
      <h2 className="text-2xl font-semibold mb-6 text-center text-black dark:text-gray-100">ফার্মেসি প্রোফাইল</h2>
      {successMessage && (
        <p className="text-green-600 dark:text-green-400 text-center mb-4">{successMessage}</p>
      )}
      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-100">ফার্মেসির নাম</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-100">মালিকের নাম</label>
            <input
              type="text"
              name="owner"
              value={formData.owner}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-100">লাইসেন্স নম্বর</label>
            <input
              type="text"
              name="license"
              value={formData.license}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-100">ঠিকানা</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-100">ফোন নম্বর</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-100">ইমেইল</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              required
            />
          </div>
          <div className="flex gap-4 justify-center">
            <button
              type="submit"
              className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 dark:hover:bg-blue-800"
            >
              সংরক্ষণ করুন
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-600 text-white p-2 rounded-md hover:bg-gray-700 dark:hover:bg-gray-800"
            >
              বাতিল
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-100">ফার্মেসির নাম:</p>
            <p className="text-black dark:text-gray-200">{pharmacyInfo.name || 'নির্ধারিত নয়'}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-100">মালিকের নাম:</p>
            <p className="text-black dark:text-gray-200">{pharmacyInfo.owner || 'নির্ধারিত নয়'}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-100">লাইসেন্স নম্বর:</p>
            <p className="text-black dark:text-gray-200">{pharmacyInfo.license || 'নির্ধারিত নয়'}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-100">ঠিকানা:</p>
            <p className="text-black dark:text-gray-200">{pharmacyInfo.address || 'নির্ধারিত নয়'}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-100">ফোন নম্বর:</p>
            <p className="text-black dark:text-gray-200">{pharmacyInfo.phone || 'নির্ধারিত নয়'}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-100">ইমেইল:</p>
            <p className="text-black dark:text-gray-200">{pharmacyInfo.email || 'নির্ধারিত নয়'}</p>
          </div>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 dark:hover:bg-blue-800"
            >
              সম্পাদনা করুন
            </button>
            <button
              onClick={() => setCurrentPage('dashboard')}
              className="bg-gray-600 text-white p-2 rounded-md hover:bg-gray-700 dark:hover:bg-gray-800"
            >
              ফিরে যান
            </button>
          </div>
        </div>
      )}
    </div>
  );
};