const Proposals = () => {
    return (
      <div className="w-full bg-black py-10  relative">
        {/* Top dashed line */}
        <div className="absolute top-0 left-0 w-full h-px border-t-2 border-dashed border-gray-600"></div>
  
        <div className="flex flex-col items-center justify-center space-y-6 px-4">
          <h2 className="text-white text-3xl font-[500] text-center max-w-3xl">
            What Are You Waiting For? Start Finding Contracts and Winning Proposals Today!
          </h2>
          <button className="bg-white text-black font-medium py-3 px-16 rounded-full hover:bg-gray-100 transition-colors">
            Get Start
          </button>
        </div>
  
        {/* Bottom dashed line */}
        <div className="absolute bottom-0 left-0 w-full h-px border-t-2 border-dashed border-gray-600"></div>
      </div>
    )
  }
  
  export default Proposals
  
  