import Coverage from "@/components/forms/Coverage"
import Vehicle from "@/components/forms/Vehicle"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"


const NewPolicy = () => {
    return (
        <Carousel className="w-full max-w-4xl">
            <CarouselContent>
                <CarouselItem>
                    <Card className="w-full h-full">
                        <CardHeader className=" font-bold text-4xl text-center">
                            Vehicle Details
                        </CardHeader>
                        <CardContent>
                            <Vehicle />
                        </CardContent>
                    </Card>
                </ CarouselItem>
                <CarouselItem>
                    <Card className="w-full h-full">
                        <CardHeader className=" font-bold text-4xl text-center">
                            Coverage Details
                        </CardHeader>
                        <CardContent>
                            <Coverage />
                        </CardContent>
                    </Card>
                </ CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}
export default NewPolicy
