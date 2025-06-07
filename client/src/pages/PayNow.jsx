import { useState } from 'react';

export default function PayNow() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', amount: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Razorpay integration will be triggered here.');
  };

  return (
    <section className="p-10">
      <h2 className="text-2xl font-bold mb-4">Make a Payment</h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <input name="name" placeholder="Name" onChange={handleChange} className="w-full p-2 border" />
        <input name="email" placeholder="Email" onChange={handleChange} className="w-full p-2 border" />
        <input name="phone" placeholder="Phone" onChange={handleChange} className="w-full p-2 border" />
        <input name="amount" placeholder="Amount" onChange={handleChange} className="w-full p-2 border" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2">Pay Now</button>
      </form>
    </section>
  );
}
