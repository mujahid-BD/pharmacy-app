const AdminDashboard = ({ pharmacyInfo, medicines, sales, setCurrentPage, theme }) => {
  return (
    <div className="p-6 w-full max-w-5xl">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-center text-black dark:text-gray-100">অ্যাডমিন ড্যাশবোর্ড</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-blue-200 dark:bg-blue-800 border border-gray-300 dark:border-gray-600 rounded-md text-center">
            <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400">মোট ফার্মেসি</h4>
            <p className="text-blue-600 dark:text-blue-400 text-xl">1 (ডেমো)</p>
          </div>
          <div className="p-4 bg-green-200 dark:bg-green-800 border border-gray-300 dark:border-gray-600 rounded-md text-center">
            <h4 className="text-lg font-semibold text-green-600 dark:text-green-400">সক্রিয় ব্যবহারকারী</h4>
            <p className="text-green-600 dark:text-green-400 text-xl">1 (ডেমো)</p>
          </div>
          <div className="p-4 bg-yellow-200 dark:bg-yellow-800 border border-gray-300 dark:border-gray-600 rounded-md text-center">
            <h4 className="text-lg font-semibold text-yellow-600 dark:text-yellow-400">মোট ওষুধ</h4>
            <p className="text-yellow-600 dark:text-yellow-400 text-xl">{medicines.length}</p>
          </div>
          <div className="p-4 bg-red-200 dark:bg-red-800 border border-gray-300 dark:border-gray-600 rounded-md text-center">
            <h4 className="text-lg font-semibold text-red-600 dark:text-red-400">মোট বিক্রয়</h4>
            <p className="text-red-600 dark:text-red-400 text-xl">{sales.length}</p>
          </div>
        </div>
        <div className="mt-6">
          <button
            onClick={() => setCurrentPage('admin')}
            className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 dark:hover:bg-blue-800 mr-2"
          >
            প্ল্যান ম্যানেজমেন্ট
          </button>
          <button
            onClick={() => setCurrentPage('admin-logs')}
            className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 dark:hover:bg-blue-800"
          >
            লগ রিপোর্ট
          </button>
        </div>
      </div>
    </div>
  );
};