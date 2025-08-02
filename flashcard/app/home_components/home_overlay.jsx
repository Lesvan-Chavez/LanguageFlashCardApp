import Link from "next/link"



export default function HomeOverlay() {
    return (
        <div
  className="hero min-h-screen"
  style={{
    backgroundImage:
      "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
  }}
>
  <div className="hero-overlay"></div>
  <div className="hero-content text-neutral-content text-center">
    <div className="max-w-md">
      <h1 className="mb-5 text-5xl font-bold">Hello! Hola! привет! 你好! こんにちは!</h1>
      <p className="mb-5">
        Welcome to our language learning flash card app! This is our capstone project for OK Coders. Created by Aaron / Lesvan / Brittany
      </p>
      <button className="btn btn-primary btn-wide mb-7"><Link href="/login">Get Started</Link></button>
      <p>Scroll Down for more!</p>
    </div>
  </div>
</div>
    )
}