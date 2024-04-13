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
		<>
			<Card className="w-full h-full">
				<CardHeader className=" font-bold text-4xl text-center">
					Vehicle Details
				</CardHeader>
				<CardContent>
					<Vehicle />
				</CardContent>
			</Card>
			<Card className="w-full h-full">
				<CardHeader className=" font-bold text-4xl text-center">
					Coverage Details
				</CardHeader>
				<CardContent>
					<Coverage />
				</CardContent>
			</Card>
		</>
	)
}
export default NewPolicy
