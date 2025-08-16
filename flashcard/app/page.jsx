import HomeCarousel from "./home_components/home_carousel"
import HomeFooter from "./home_components/home_footer"
import HomeOverlay from "./home_components/home_overlay"



export default function HomePage() {
    return (
        <>
            <HomeOverlay />
            <HomeCarousel />
            <HomeFooter />
        </>
    )
}