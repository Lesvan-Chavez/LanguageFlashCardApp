



export default function HomeCarousel () {
    return (
      <> 
      <h1 className="text-center">The Syntax Diplomats</h1>
<div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-1 pb-3">
      <div>
  <figure>
    <img
      src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
      alt="Shoes"
      className="rounded-xl" />
      
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title">Aaron Franklin</h2>
    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
  </div>
      </div>

      <div>
    <figure>
    <img
      src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
      alt="Shoes" 
      className="rounded-xl" />
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title">Lesvan Chavez</h2>
    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
  </div>
      </div>

      <div>
    <figure>
    <img
      src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
      alt="Shoes" 
      className="rounded-xl" />
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title">Brittany Pizarro</h2>
    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
  </div>
    </div>
</div>
</>
    )
}