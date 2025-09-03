import HomeCarousel from "./components/home_components/home_carousel"
import HomeFooter from "./components/home_components/home_footer"
import HomeOverlay from "./components/home_components/home_overlay"



export default function HomePage() {
    return (
        <>
            <HomeOverlay />
            <HomeCarousel />
            <HomeFooter />
            <p>Test</p>
        </>
    )
}