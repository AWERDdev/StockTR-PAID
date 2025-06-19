'use client'
function INFOBar() {
    return (
        <div className="border-b border-gray-700 p-4  hover:bg-[hsl(0,0%,9%)] transition-colors">
            <div className="flex items-center justify-between max-w-7xl mx-auto">
                {/* Headers for Stock Info */}
                <div className="flex space-x-8 w-1/3">
                    <h1 className="text-gray-400 font-medium">Symbol</h1>
                    <h1 className="text-gray-400 font-medium">Name</h1>
                </div>
                
                {/* Headers for Price Info */}
                <div className="flex items-center justify-center space-x-8 w-1/3">
                    <h1 className="text-gray-400 font-medium">Price</h1>
                    <h1 className="text-gray-400 font-medium">Change</h1>
                    <h1 className="text-gray-400 font-medium">Volume</h1>
                </div>
                
                {/* Empty space for alignment with button */}
                <div className="w-1/3"></div>
            </div>
        </div>
    )
}


export default INFOBar
