import Link from 'next/link'
import NavBar from '@/components/NavBar'
import NavBarNoAUTH2 from '@/components/NavBarNoAUTH2'

const IntroPage:React.FC = () => {
return (
<>  
<main className="min-h-screen w-screen text-[#e0e0e0] bg-gradient-to-br from-gray-900 via-gray-800 to-black flex flex-col">

  {/* Responsive Navigation - NavBar on larger screens, NavBarNoAUTH2 on small screens */}
  <div className="hidden sm:block">
    <NavBar />
  </div>
  <div className="block sm:hidden">
    <NavBarNoAUTH2 />
  </div>
     
     <div className="flex-1 pt-8 px-4">
          <div className="flex justify-center text-center mb-6">
            <h1 className="text-[2rem] font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Welcome to StockTracker Pro</h1>
          </div>
          
          <div className="flex justify-center text-center mb-8">
            <p className="text-[1.5rem] text-gray-300">Your all-in-one solution for real-time stock market tracking and analysis.</p>
          </div>

          <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700/50 p-8 mb-8 mx-4 hover:shadow-3xl transition-all duration-300">
            <div className="flex justify-center text-center mb-6">
              <h1 className="text-[#e0e0e0] text-[2rem] font-bold">Featured Stocks</h1>
            </div>

        
            <div className="grid sm:grid-cols-2 gap-6 text-center">
              <div className="bg-gradient-to-br from-gray-700 to-gray-600 p-6 rounded-xl shadow-lg border border-gray-600 hover:shadow-xl hover:scale-105 transition-all duration-300">
                <div className="font-bold text-2xl text-blue-400 mb-2">AAPL</div>
                <div className="text-green-400 font-semibold text-lg">+2.5%</div>
                <div className="text-gray-400 text-sm mt-1">Apple Inc.</div>
              </div>

              <div className="bg-gradient-to-br from-gray-700 to-gray-600 p-6 rounded-xl shadow-lg border border-gray-600 hover:shadow-xl hover:scale-105 transition-all duration-300">
                <div className="font-bold text-2xl text-cyan-400 mb-2">GOOGL</div>
                <div className="text-green-400 font-semibold text-lg">+1.8%</div>
                <div className="text-gray-400 text-sm mt-1">Alphabet Inc.</div>
              </div>

              <div className="bg-gradient-to-br from-gray-700 to-gray-600 p-6 rounded-xl shadow-lg border border-gray-600 hover:shadow-xl hover:scale-105 transition-all duration-300">
                <div className="font-bold text-2xl text-purple-400 mb-2">MSFT</div>
                <div className="text-green-400 font-semibold text-lg">+3.2%</div>
                <div className="text-gray-400 text-sm mt-1">Microsoft Corp.</div>
              </div>

              <div className="bg-gradient-to-br from-gray-700 to-gray-600 p-6 rounded-xl shadow-lg border border-gray-600 hover:shadow-xl hover:scale-105 transition-all duration-300">
                <div className="font-bold text-2xl text-yellow-400 mb-2">AMZN</div>
                <div className="text-green-400 font-semibold text-lg">+1.5%</div>
                <div className="text-gray-400 text-sm mt-1">Amazon.com Inc.</div>
              </div>
            </div>
          </div>
        </div>

     <div className="flex justify-center text-center pb-8">
      <button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-gray-900 font-bold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 border border-blue-400/20">
        <Link href="/Login">Get Started</Link>
      </button>
     </div>
     </main>
</> 
)
}

export default IntroPage