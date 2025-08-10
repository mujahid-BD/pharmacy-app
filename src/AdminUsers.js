const AdminUsers = ({ setCurrentPage }) => {
  return (
    <div className="p-6 w-full max-w-5xl">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-center text-black dark:text-gray-100">ব্যবহারকারী পরিচালনা</h2>
        <p className="text-gray-700 dark:text-gray-300">এখানে ব্যবহারকারীদের তালিকা এবং তাদের অ্যাক্সেস পরিচালনা করা যাবে।</p>
        <div className="mt-4">
          <button
            onClick={() => setCurrentPage('admin-dashboard')}
            className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 dark:hover:bg-blue-800"
          >
            ফিরে যান
          </button>
        </div>
      </div>
    </div>
  );
};