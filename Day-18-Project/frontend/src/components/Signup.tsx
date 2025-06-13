import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

const Signup = () => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 
  const [alertMessage, setAlertMessage] = useState('');
const [alertType, setAlertType] = useState<'success' | 'error' | 'warning' | ''>('');


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (!formData.email.trim() || !formData.password.trim()) {
      setAlertMessage('Please fill both Email and Password fields.');
      setAlertType('warning');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
    if (res.ok) {
      setAlertMessage('Signup successful!');
      setAlertType('success');
      setFormData({ email: '', password: '' });
      setTimeout(() => navigate('/login'), 1500);
    } else {
      setAlertMessage(data.message || 'Signup failed');
      setAlertType('error');
    }
  } catch (err) {
    console.error('Signup Error:', err);
    setAlertMessage('Server error. Please try again later.');
    setAlertType('error');
  } finally {
    setLoading(false);
  }
  };

  

  return (
    <>
    {alertMessage && (
  <div
    className={`p-3 my-4 rounded-lg text-center font-semibold ${
      alertType === 'success'
        ? 'bg-green-100 text-green-800'
        : alertType === 'error'
        ? 'bg-red-100 text-red-800'
        : 'bg-yellow-100 text-yellow-800'
    }`}
  >
    {alertMessage}
  </div>
)}
      <section className="bg-gray-100 min-h-screen flex box-border justify-center items-center">
        <div className="bg-[#dfa674] rounded-2xl flex max-w-3xl p-5 items-center">
          <div className="md:w-1/2 px-8">
            <h2 className="font-bold text-3xl text-[#002D74]">Register</h2>
            <p className="text-sm mt-4 text-[#002D74]">If you already a member, easily log in now.</p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                className="p-2 mt-8 rounded-xl border"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
              />
              <div className="relative">
                <input
                  className="p-2 rounded-xl border w-full"
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                />
              </div>
              <button
                className="bg-[#002D74] text-white py-2 rounded-xl hover:scale-105 duration-300 hover:bg-[#206ab1] font-medium"
                type="submit"
                disabled={loading}
              >
                   Signup
              </button>
            </form>
            <div className="mt-6  items-center text-gray-100">
              <hr className="border-gray-300" />
              <p className="text-center text-sm">OR</p>
              <hr className="border-gray-300" />
            </div>
            <button className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 bg-[#60a8bc4f] font-medium">
              Login with Google
            </button>
            <div className="mt-10 text-sm border-b border-gray-500 py-5 playfair tooltip">Forget password?</div>

            <div className="mt-4 text-sm flex justify-between items-center container-mr">
              <p className="mr-3 md:mr-0 ">If you don't have an account..</p>
              <button
                className="hover:border register text-white bg-[#002D74] hover:border-gray-400 rounded-xl py-2 px-5 hover:scale-110 hover:bg-[#002c7424] font-semibold duration-300"
                onClick={() => navigate('/login')}
              >
                Login
              </button>
            </div>
          </div>
          <div className="md:block hidden w-1/2">
            <img
              className="rounded-2xl max-h-[1600px]"
              src="https://images.unsplash.com/photo-1552010099-5dc86fcfaa38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxmcmVzaHxlbnwwfDF8fHwxNzEyMTU4MDk0fDA&ixlib=rb-4.0.3&q=80&w=1080"
              alt="login form image"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
