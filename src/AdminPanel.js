const AdminPanel = ({ setPlan }) => {
  const [userId, setUserId] = React.useState('');
  const [newPlan, setNewPlan] = React.useState('free');
  const [message, setMessage] = React.useState('');

  const handleUpdatePlan = (e) => {
    e.preventDefault();
    // এখানে ডাটাবেস বা স্টেট আপডেট করার লজিক যোগ করুন
    // উদাহরণস্বরূপ, স্টেট আপডেট করা হচ্ছে
    setPlan(newPlan);
    setMessage(`ব্যবহারকারী ${userId} এর প্ল্যান ${newPlan} এ আপডেট করা হয়েছে!`);
    setTimeout(() => setMessage(''), 3000);
    setUserId('');
    setNewPlan('free');
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md max-w-md mx-auto" data-aos="fade-up">
      <h2 className="text-2xl font-semibold mb-6 text-center text-black dark:text-gray-100">অ্যাডমিন প্যানেল</h2>
      {message && <p className="text-green-600 dark:text-green-400 text-center mb-4">{message}</p>}
      <form onSubmit={handleUpdatePlan} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-100">ব্যবহারকারীর আইডি/ইমেইল</label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-100">প্ল্যান নির্বাচন করুন</label>
          <select
            value={newPlan}
            onChange={(e) => setNewPlan(e.target.value)}
            className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            required
          >
            <option value="free">ফ্রি</option>
            <option value="premium">প্রিমিয়াম</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 dark:hover:bg-blue-800"
        >
          প্ল্যান আপডেট করুন
        </button>
      </form>
    </div>
  );
};