'use client'

import NavBarNoAUTH from '@/components/NavBarNoAUTH2';
import { useRouter } from 'next/navigation'
import { API_BASE_URL } from '@/config'
import { useInputHandlingLogin } from '@/tools/useValidation';
import Link from 'next/link'

const LoginPage: React.FC = () => {
    const navigate = useRouter();
    const {
        Email,
        Password,
        EmailError,
        PasswordError,
        InvalidCredentialsError,
        setEmail,
        setpassword,
        setInvalidCredentialsError,
        validateInputs
    } = useInputHandlingLogin();
    
    const SendData = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Email,
                    Password
                }),
            });
            
            console.log('API_BASE_URL:', API_BASE_URL);
            const data = await response.json();
            
            if (data.token) {
                console.log("token stored in local storage");
                localStorage.setItem('token', data.token);
            }
            if (data.isAUTH) {
                console.log("token stored in local storage");
                localStorage.setItem('isAUTH', data.isAUTH);
            }
            if (response.ok) {
                console.log("Data sent successfully");
                return true;
            } else { 
                console.log("Invalid credentials");
                setInvalidCredentialsError(data.message || "Invalid credentials");
                return false;
            } 
        } catch (error) {
            console.log(`Failed to send data: ${error}`);
            setInvalidCredentialsError("Network error occurred");
            return false;
        }
    };
    
    const functionHandling = async () => {
        // First validate inputs
        const isValid = await validateInputs();
        
        if (isValid) {
            // If validation passes, send data to API
            const loginSuccess = await SendData();
            if (loginSuccess) {
                navigate.push('/app');
            }
        }
    };

    console.log('Current API_BASE_URL:', API_BASE_URL);
  

    return (
        <>
            <main className="h-screen w-screen text-[#333333] bg-gradient-to-br from-blue-50 via-white to-indigo-50">
                <header>
                    <NavBarNoAUTH />
                </header>
                <div className='flex justify-center text-center'>
                    <label className='text-red-500 h-4 font-medium'>{InvalidCredentialsError}</label>
                </div>
                <div className="flex justify-center items-center py-8">
                <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-gray-200/50 w-full max-w-md mx-4 hover:shadow-3xl transition-all duration-300">
                    
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
                        <p className="text-gray-600">Sign in to your account</p>
                    </div>
                    
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="Email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input 
                                type="email"
                                name="email"
                                id="Email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 bg-white/80 backdrop-blur-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition-all duration-200 shadow-sm" 
                                onChange={(e) => setEmail(e.target.value)} 
                            />
                            <label htmlFor="Email" className='text-red-500 text-sm font-medium'>{EmailError}</label>
                        </div>
                        
                        <div className="space-y-2">
                            <label htmlFor="Password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input 
                                type="password"
                                name="password"
                                id='Password'
                                placeholder="Enter your password"
                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 bg-white/80 backdrop-blur-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition-all duration-200 shadow-sm" 
                                onChange={(e) => setpassword(e.target.value)} 
                            />
                            <label htmlFor="Password" className='text-red-500 text-sm font-medium'>{PasswordError}</label>
                        </div>
                    </div>
              
                
                <div className='flex justify-center mt-8'>
                    <button
                        className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 border border-blue-500/20 w-full'
                        onClick={functionHandling}
                    >
                        Sign In
                    </button>
                </div>
                </div>
                </div>
                <div className="link flex justify-center">
                    <Link href="/signup" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">Dont have an account? Sign up</Link>
                </div>  
            </main>
        </>
    )
}

export default LoginPage;
