const Subscription = ({ theme }) => {
  const plans = [
    {
      name: 'ফ্রি প্ল্যান',
      price: '০ টাকা/মাস',
      features: [
        'সীমিত ইনভেন্টরি ম্যানেজমেন্ট',
        'দৈনিক বিক্রয় রিপোর্ট',
        '১০০টি পর্যন্ত ওষুধের তথ্য সংরক্ষণ',
        'বেসিক প্রোফাইল ম্যানেজমেন্ট'
      ],
      buttonText: 'বর্তমান প্ল্যান',
      disabled: true
    },
    {
      name: 'প্রিমিয়াম প্ল্যান',
      price: '১৫০০ টাকা/মাস',
      features: [
        'সম্পূর্ণ ইনভেন্টরি ম্যানেজমেন্ট',
        'বিস্তারিত বিক্রয় ও লাভ-ক্ষতি রিপোর্ট',
        'অসীমিত ওষুধের তথ্য সংরক্ষণ',
        'অগ্রাধিকার সাপোর্ট',
        'ক্রয় রিপোর্ট এবং বিশ্লেষণ'
      ],
      buttonText: 'সাবস্ক্রাইব করুন',
      disabled: false
    }
  ];

  const handleSubscribe = (planName) => {
    alert(`আপনি ${planName} নির্বাচন করেছেন! বিস্তারিত জানতে https://x.ai/grok দেখুন।`);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md max-w-5xl mx-auto" data-aos="fade-up">
      <h2 className="text-2xl font-semibold mb-6 text-center text-black dark:text-gray-100">সাবস্ক্রিপশন প্ল্যান</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-600"
            data-aos="zoom-in"
            data-aos-delay={index * 100}
          >
            <h3 className="text-xl font-semibold mb-4 text-center text-black dark:text-gray-100">{plan.name}</h3>
            <p className="text-lg font-medium mb-4 text-center text-blue-600 dark:text-blue-400">{plan.price}</p>
            <ul className="space-y-2 mb-6">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center text-black dark:text-gray-100">
                  <i className="fas fa-check text-green-500 mr-2"></i>
                  {feature}
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleSubscribe(plan.name)}
              disabled={plan.disabled}
              className={`w-full p-2 rounded-md text-white ${
                plan.disabled
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-800'
              }`}
            >
              {plan.buttonText}
            </button>
          </div>
        ))}
      </div>
      <p className="mt-6 text-center text-black dark:text-gray-100">
        আরও তথ্যের জন্য{' '}
        <a
          href="https://x.ai/grok"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          আমাদের ওয়েবসাইট
        </a>{' '}
        দেখুন।
      </p>
    </div>
  );
};