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
            <main className="h-screen w-screen text-[#ffffff] dark:bg-gray-900">
                <header>
                    <NavBarNoAUTH />
                </header>
                <div className='flex justify-center text-center'>
                    <label className='text-[#ef4444] h-4'>{InvalidCredentialsError}</label>
                </div>
                <div className="flex justify-center items-center py-8">
                <div className="bg-gray-800 p-8 rounded-lg shadow-xl border border-white w-full max-w-2xl mx-4">
                    
                    <div className="grid gap-1">
                        <label htmlFor="Email" className="form-label">Email</label>
                        <input 
                            type="email"
                            name="email"
                            id="Email"
                            placeholder="Email"
                            className="input bg-[#1f2937] outline-1 outline-black rounded h-9 p-2 focus:valid:outline-[#22c55e] invalid:outline-[#ef4444]" 
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                        <label htmlFor="Email" className='text-[#ef4444] h-4'>{EmailError}</label>
                    </div>
                    
                    <div className="grid gap-1">
                        <label htmlFor="Password" className="form-label">Password</label>
                        <input 
                            type="password"
                            name="password"
                            id='Password'
                            placeholder="Password"
                            className="input bg-[#1f2937] outline-1 outline-black rounded h-9 p-2 focus:valid:outline-[#22c55e] invalid:outline-[#ef4444]" 
                            onChange={(e) => setpassword(e.target.value)} 
                        />
                        <label htmlFor="Password" className='text-[#ef4444] h-4'>{PasswordError}</label>
                    </div>
              
                
                <div className='flex justify-center mt-6'>
                    <button
                        className='signupBTN bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                        onClick={functionHandling}
                    >
                        Login
                    </button>
                </div>
                </div>
                </div>
                <div className="link flex justify-center">
                    <Link href="/signup">Dont have an account? Sign up</Link>
                </div>  
            </main>
        </>
    )
}

export default LoginPage;
