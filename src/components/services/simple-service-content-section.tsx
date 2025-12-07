import PortableText from "@/src/components/ui/portable-text";
import { PortableTextBlock } from "next-sanity";
import { ServiceData } from "@/src/types/service";
import Sidebar from "./sidebar";
import { FOREIGN_DESK_QUERYResult } from "@/sanity.types";

interface SimpleServiceContentSectionProps {
	currentService: ServiceData;
	serviceType: "practice" | "industry" | "foreign-desk";
}

const SimpleServiceContentSection = ({
	currentService,
	serviceType,
}: SimpleServiceContentSectionProps) => {
	if (!currentService) {
		return <div>No service found</div>;
	}

	return (
		<section className="px-side pt-0 pb-28 md:pb-39 xl:pt-38 xl:pb-21 2xl:pt-44 2xl:pb-40 relative xl:flex xl:gap-x-18 2xl:gap-x-34">
			<Sidebar
				currentService={currentService}
				serviceType={serviceType}
				className="hidden xl:block h-fit px-side xl:p-4 2xl:px-5 2xl:py-7 "
			/>
			{serviceType === "foreign-desk" && (
				<div className="max-w-5xl">
					<div className="mt-12 md:mt-25 xl:mt-0">
						<PortableText
							value={
								(currentService as FOREIGN_DESK_QUERYResult["currentForeignDesk"])!
									.description?.nativeDescription as PortableTextBlock[]
							}
							paragraphClassName="md:text-lg 2xl:text-2xl mt-4 md:mt-4.5 2xl:mt-6"
						/>
					</div>
					<div className="my-12 md:my-16 2xl:my-20">
						<hr className="border-t border-gray-200" />
					</div>
					<div className="mt-12 md:mt-25 xl:mt-0">
						<PortableText
							value={
								(currentService as FOREIGN_DESK_QUERYResult["currentForeignDesk"])!
									.description?.englishDescription as PortableTextBlock[]
							}
							paragraphClassName="md:text-lg 2xl:text-2xl mt-4 md:mt-4.5 2xl:mt-6"
						/>
					</div>
				</div>
			)}
			{serviceType !== "foreign-desk" && (
				<div className="mt-12 md:mt-25 xl:mt-0 max-w-5xl">
					<PortableText
						value={currentService.description as PortableTextBlock[]}
						paragraphClassName="md:text-lg 2xl:text-2xl mt-4 md:mt-4.5 2xl:mt-6"
					/>
				</div>
			)}
		</section>
	);
};

export default SimpleServiceContentSection;
