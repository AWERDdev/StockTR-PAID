import Link from 'next/link'
import NavBar from '@/components/NavBar'
import NavBarNoAUTH2 from '@/components/NavBarNoAUTH2'

const IntroPage:React.FC = () => {
return (
<>  
<main className="min-h-screen w-screen text-[#f3f3f3] bg-gradient-to-br from-purple-900 via-indigo-900 to-black flex flex-col">

  {/* Responsive Navigation - NavBar on larger screens, NavBarNoAUTH2 on small screens */}
  <div className="hidden sm:block">
    <NavBar />
  </div>
  <div className="block sm:hidden">
    <NavBarNoAUTH2 />
  </div>
     
     <div className="flex-1 pt-8 px-4">
          <div className="flex justify-center text-center mb-6">
            <h1 className="text-[2rem] font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-lg">Welcome to StockTracker Pro</h1>
          </div>
          
          <div className="flex justify-center text-center mb-8">
            <p className="text-[1.5rem] text-gray-200">Your all-in-one solution for real-time stock market tracking and analysis.</p>
          </div>

          <div className="bg-purple-900/60 backdrop-blur-sm rounded-2xl shadow-2xl border border-purple-500/30 p-8 mb-8 mx-4 hover:shadow-3xl hover:border-purple-400/50 transition-all duration-300">
            <div className="flex justify-center text-center mb-6">
              <h1 className="text-[#f3f3f3] text-[2rem] font-bold">Featured Stocks</h1>
            </div>

        
            <div className="grid sm:grid-cols-2 gap-6 text-center">
              <div className="bg-gradient-to-br from-purple-800/80 to-purple-700/80 p-6 rounded-xl shadow-lg border border-purple-500/50 hover:shadow-xl hover:scale-105 hover:border-green-400/70 transition-all duration-300">
                <div className="font-bold text-2xl text-green-400 mb-2 drop-shadow-sm">AAPL</div>
                <div className="text-green-400 font-semibold text-lg">+2.5%</div>
                <div className="text-gray-300 text-sm mt-1">Apple Inc.</div>
              </div>

              <div className="bg-gradient-to-br from-purple-800/80 to-purple-700/80 p-6 rounded-xl shadow-lg border border-purple-500/50 hover:shadow-xl hover:scale-105 hover:border-cyan-400/70 transition-all duration-300">
                <div className="font-bold text-2xl text-cyan-400 mb-2 drop-shadow-sm">GOOGL</div>
                <div className="text-green-400 font-semibold text-lg">+1.8%</div>
                <div className="text-gray-300 text-sm mt-1">Alphabet Inc.</div>
              </div>

              <div className="bg-gradient-to-br from-purple-800/80 to-purple-700/80 p-6 rounded-xl shadow-lg border border-purple-500/50 hover:shadow-xl hover:scale-105 hover:border-pink-400/70 transition-all duration-300">
                <div className="font-bold text-2xl text-pink-400 mb-2 drop-shadow-sm">MSFT</div>
                <div className="text-green-400 font-semibold text-lg">+3.2%</div>
                <div className="text-gray-300 text-sm mt-1">Microsoft Corp.</div>
              </div>

              <div className="bg-gradient-to-br from-purple-800/80 to-purple-700/80 p-6 rounded-xl shadow-lg border border-purple-500/50 hover:shadow-xl hover:scale-105 hover:border-yellow-400/70 transition-all duration-300">
                <div className="font-bold text-2xl text-yellow-400 mb-2 drop-shadow-sm">AMZN</div>
                <div className="text-green-400 font-semibold text-lg">+1.5%</div>
                <div className="text-gray-300 text-sm mt-1">Amazon.com Inc.</div>
              </div>
            </div>
          </div>
        </div>

     <div className="flex justify-center text-center pb-8">
      <button className="bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 text-black font-bold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 border border-green-400/30 drop-shadow-lg">
        <Link href="/Login">Get Started</Link>
      </button>
     </div>
     </main>
</> 
)
}

export default IntroPage