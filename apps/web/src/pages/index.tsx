import { Box } from "@chakra-ui/react"
import Header from "../components/modules/navigation/Header"
import HomePageOffer from "./HomePageOffer";

const HomePage = () => {

    return (
    <Box
    backgroundColor="#000000"
    minHeight="100vh" 
    >
        <Header />
        <HomePageOffer />
    </Box>
    );
}

export default HomePage