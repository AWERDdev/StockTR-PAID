import Link from 'next/link'
import NavBar from '@/components/NavBar'
import NavBarNoAUTH2 from '@/components/NavBarNoAUTH2'

const IntroPage:React.FC = () => {
return (
<>  
<main className="h-screen w-screen text-[#333333] bg-gradient-to-br from-blue-50 via-white to-indigo-50">

  {/* Responsive Navigation - NavBar on larger screens, NavBarNoAUTH2 on small screens */}
  <div className="hidden sm:block">
    <NavBar />
  </div>
  <div className="block sm:hidden">
    <NavBarNoAUTH2 />
  </div>
     
     <div className="pt-8">
          <div className="flex justify-center text-center mb-6">
            <h1 className="text-[2rem] font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Welcome to StockTracker Pro</h1>
          </div>
          
          <div className="flex justify-center text-center mb-8">
            <p className="text-[1.5rem] text-gray-700">Your all-in-one solution for real-time stock market tracking and analysis.</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-200/50 p-8 mb-8 mx-4 hover:shadow-3xl transition-all duration-300">
            <div className="flex justify-center text-center mb-6">
              <h1 className="text-[#333333] text-[2rem] font-bold">Featured Stocks</h1>
            </div>

        
            <div className="grid sm:grid-cols-2 gap-6 text-center">
              <div className="bg-gradient-to-br from-white to-blue-50 p-6 rounded-xl shadow-lg border border-blue-200 hover:shadow-xl hover:scale-105 transition-all duration-300">
                <div className="font-bold text-2xl text-blue-600 mb-2">AAPL</div>
                <div className="text-green-500 font-semibold text-lg">+2.5%</div>
                <div className="text-gray-500 text-sm mt-1">Apple Inc.</div>
              </div>

              <div className="bg-gradient-to-br from-white to-green-50 p-6 rounded-xl shadow-lg border border-green-200 hover:shadow-xl hover:scale-105 transition-all duration-300">
                <div className="font-bold text-2xl text-green-600 mb-2">GOOGL</div>
                <div className="text-green-500 font-semibold text-lg">+1.8%</div>
                <div className="text-gray-500 text-sm mt-1">Alphabet Inc.</div>
              </div>

              <div className="bg-gradient-to-br from-white to-purple-50 p-6 rounded-xl shadow-lg border border-purple-200 hover:shadow-xl hover:scale-105 transition-all duration-300">
                <div className="font-bold text-2xl text-purple-600 mb-2">MSFT</div>
                <div className="text-green-500 font-semibold text-lg">+3.2%</div>
                <div className="text-gray-500 text-sm mt-1">Microsoft Corp.</div>
              </div>

              <div className="bg-gradient-to-br from-white to-orange-50 p-6 rounded-xl shadow-lg border border-orange-200 hover:shadow-xl hover:scale-105 transition-all duration-300">
                <div className="font-bold text-2xl text-orange-600 mb-2">AMZN</div>
                <div className="text-green-500 font-semibold text-lg">+1.5%</div>
                <div className="text-gray-500 text-sm mt-1">Amazon.com Inc.</div>
              </div>
            </div>
          </div>
        </div>

     <div className="flex justify-center text-center">
      <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 border border-blue-500/20">
        <Link href="/Login">Get Started</Link>
      </button>
     </div>
     </main>
</> 
)
}

export default IntroPage