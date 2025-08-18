



export default function HomeCarousel () {
    return (
      <> 
      <h1 className="text-center text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-500 pb-5">Meet The Syntax Diplomats</h1>
<div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-1 pb-3">
      <div>
  <figure>
    <img
      src="Aaron-Profile.png"
      alt="Aaron"
      className="rounded-xl mx-auto block max-w-full h-auto" />
      
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title">Aaron Franklin</h2>
    <p>OK Coder Graduate</p>
  </div>
      </div>

      <div>
    <figure>
    <img
      src="Lesvan-Profile.png"
      alt="Lesvan" 
      className="rounded-xl mx-auto block max-w-full h-auto" />
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title">Lesvan Chavez</h2>
    <p>OK Coder Graduate</p>
  </div>
      </div>

      <div>
    <figure>
    <img
      src="Brittany-Profile.png"
      alt="Brittany" 
      className="rounded-xl mx-auto block max-w-full h-auto" />
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title">Brittany Pizarro</h2>
    <p>OK Coder Graduate</p>
  </div>
    </div>
</div>
</>
    )
}