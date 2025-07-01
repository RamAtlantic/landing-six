export function Loader() {
    return (
      <div id="loader" className="fixed inset-0 bg-black z-50 flex items-center justify-center">
        <div className="flex items-center justify-center h-full">
          <div className="vertical-align-center">
            <div className="sk-cube-grid grid grid-cols-3 gap-1 w-16 h-16">
              <div className="sk-cube sk-cube1 bg-green-500 animate-pulse">
                <img src="/placeholder.svg?height=20&width=20" className="w-full h-full object-cover" alt="1" />
              </div>
              <div className="sk-cube sk-cube2 bg-green-500 animate-pulse delay-100">
                <img src="/placeholder.svg?height=20&width=20" className="w-full h-full object-cover" alt="2" />
              </div>
              <div className="sk-cube sk-cube3 bg-green-500 animate-pulse delay-200">
                <img src="/placeholder.svg?height=20&width=20" className="w-full h-full object-cover" alt="3" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  