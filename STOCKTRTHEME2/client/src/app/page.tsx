import Link from 'next/link'
import NavBar from '@/components/NavBar'
import NavBarNoAUTH2 from '@/components/NavBarNoAUTH2'

const IntroPage:React.FC = () => {
return (
<>  
<main className="h-screen w-screen text-[#333333] bg-white">

  {/* Responsive Navigation - NavBar on larger screens, NavBarNoAUTH2 on small screens */}
  <div className="hidden sm:block">
    <NavBar />
  </div>
  <div className="block sm:hidden">
    <NavBarNoAUTH2 />
  </div>
     
     <div className="pt-8">
          <div className="flex justify-center text-center mb-6">
            <h1 className="text-[2rem] font-bold">Welcome to StockTracker Pro</h1>
          </div>
          
          <div className="flex justify-center text-center mb-8">
            <p className="text-[1.5rem]">Your all-in-one solution for real-time stock market tracking and analysis.</p>
          </div>

          <div className="bg-gray-100 rounded-lg shadow-lg p-6 mb-8 mx-4">
            <div className="flex justify-center text-center mb-6">
              <h1 className="text-[#333333] text-[2rem]">Featured Stocks</h1>
            </div>

        
            <div className="grid sm:grid-cols-2  gap-4 text-center">
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="font-bold text-xl">AAPL</div>
                <div className="text-green-500">+2.5%</div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow">
                <div className="font-bold text-xl">GOOGL</div>
                <div className="text-green-500">+2.5%</div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow">
                <div className="font-bold text-xl">MSFT</div>
                <div className="text-green-500">+2.5%</div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow">
                <div className="font-bold text-xl">AMZN</div>
                <div className="text-green-500">+2.5%</div>
              </div>
            </div>
          </div>
        </div>

     <div className="flex justify-center text-center">
      <button className="bg-[#009688] hover:bg-[#00796b] text-white font-bold py-2 px-4 rounded">
        <Link href="/Login">Get Started</Link>
      </button>
     </div>
     </main>
</> 
)
}

export default IntroPage