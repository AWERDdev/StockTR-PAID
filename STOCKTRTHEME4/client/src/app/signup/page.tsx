'use client'



import NavBarNoAUTH from '@/components/NavBarNoAUTH2';
import { useRouter } from 'next/navigation'
import { API_BASE_URL } from '@/config'
import { useInputHandlingSignup } from '@/tools/useValidation';
import Link from 'next/link'
const SignupPage:React.FC = ()=> {
    const navigate = useRouter(); // Initialize the navigate hook
    const {
        name,
        Username,
        Email,
        Password,
        EmailError,
        PasswordError,
        setEmail,
        setpassword,
        setEmailError,
        validateInputs,
        setUsername,
        setname,
        UsernameError,
        nameError
    } = useInputHandlingSignup();
    
    
    const SendData = async ()=>{
        try{
            const response = await fetch(`${ API_BASE_URL }/api/signup`,{ // IF you are using a local server swap this with your local host
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                username: Username,    
                name: name,
                email: Email,
                password: Password 
                }),
            });
            console.log('API_BASE_URL:', API_BASE_URL);
            
            // Check if response is actually JSON before parsing
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {    
                const textResponse = await response.text();
                console.error('Server returned non-JSON response:', textResponse);
                throw new Error('Server returned invalid response format');
            }
            
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
            } else if (response.status === 409) {
                console.log("Email already exists");
                setEmailError(data.message);
                return false;
            } else {
                console.log("Failed to send data");
                setEmailError(data.message || 'An error occurred');
                return false;
            }
        }catch(error){
            console.log(`Failed to send data: ${error}`);
            setEmailError('Network error or server unavailable');
            return false;
        }
    }
    

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
        <main className="min-h-screen w-screen text-[#f3f3f3] bg-gradient-to-br from-purple-900 via-indigo-900 to-black">
            <header>
                <NavBarNoAUTH />
            </header>
            
            {/* Container with visible styling */}
            <div className="flex justify-center items-center py-8">
                <div className="bg-purple-900/60 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-purple-500/30 w-full max-w-2xl mx-4 hover:shadow-3xl hover:border-purple-400/50 transition-all duration-300">
                    
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-100 mb-2">Create Account</h1>
                        <p className="text-gray-300">Join StockTracker Pro today</p>
                    </div>
                    
                    {/* Form Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        
                        <div className="space-y-2">
                            <label htmlFor="Username" className="block text-sm font-medium text-gray-300">Username</label>
                            <input
                                type="text"
                                name="Username"
                                id='Username'
                                placeholder="Enter your username"
                                className="w-full px-4 py-3 rounded-xl border-2 border-purple-600 bg-purple-800/80 backdrop-blur-sm text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 hover:border-purple-500 transition-all duration-200 shadow-sm"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <label htmlFor="Username" className='text-red-400 text-sm font-medium'>{UsernameError}</label>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="Name" className="block text-sm font-medium text-gray-300">Name</label>
                            <input
                                type="text"
                                name="Name"
                                id='Name'
                                placeholder="Enter your name"
                                className="w-full px-4 py-3 rounded-xl border-2 border-purple-600 bg-purple-800/80 backdrop-blur-sm text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 hover:border-purple-500 transition-all duration-200 shadow-sm"
                                onChange={(e) => setname(e.target.value)}
                            />
                            <label htmlFor="Name" className='text-red-400 text-sm font-medium'>{nameError}</label>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="Email" className="block text-sm font-medium text-gray-300">Email</label>
                            <input
                                type="email"
                                name="email"
                                id="Email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-3 rounded-xl border-2 border-purple-600 bg-purple-800/80 backdrop-blur-sm text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 hover:border-purple-500 transition-all duration-200 shadow-sm"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <label htmlFor="Email" className='text-red-400 text-sm font-medium'>{EmailError}</label>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="Password" className="block text-sm font-medium text-gray-300">Password</label>
                            <input
                                type="password"
                                name="password"
                                id='Password'
                                placeholder="Enter your password"
                                className="w-full px-4 py-3 rounded-xl border-2 border-purple-600 bg-purple-800/80 backdrop-blur-sm text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 hover:border-purple-500 transition-all duration-200 shadow-sm"
                                onChange={(e) => setpassword(e.target.value)}
                            />
                            <label htmlFor="Password" className='text-red-400 text-sm font-medium'>{PasswordError}</label>
                        </div>
                    </div>

                    {/* Button */}
                    <div className='flex justify-center mt-8'>
                        <button
                            className='bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 text-black font-bold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 border border-green-400/30 drop-shadow-lg w-full'
                            onClick={functionHandling}
                        >
                            Create Account
                        </button>
                    </div>
                </div>
            </div>
            <div className="link flex justify-center">
                    <Link href="/Login" className="text-green-400 hover:text-green-300 font-medium transition-colors">Have an account? Login</Link>
                </div>  
        </main>
    </>
)
}

export default SignupPage
