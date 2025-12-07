import Link from "next/link";
import LinkedinIcon from "../ui/icons/linkedin-icon";
import { TransitionLink } from "../transition-link";
import { Image } from "next-sanity/image";
import { urlForWithHotspot } from "@/src/sanity/lib/image";
import { LAWYERS_BY_CATEGORY_QUERYResult } from "@/sanity.types";

const LawyerCardGrid = ({
	lawyer,
}: {
	lawyer: NonNullable<
		LAWYERS_BY_CATEGORY_QUERYResult["categories"][0]["orderedLawyers"]
	>[0];
}) => {
	return (
		<article>
			<TransitionLink
				href={`/people/${lawyer.slug.current}`}
				pageName={lawyer.name}
				className="block"
			>
				<div className="w-full rounded-lg md:rounded-2xl overflow-hidden aspect-[314/323]">
					<Image
						src={urlForWithHotspot(lawyer.picture, 471, 485).url() || ""}
						alt={lawyer.name}
						width={471}
						height={485}
						className="w-full object-cover"
					/>
				</div>
			</TransitionLink>
			<div className="py-5 md:py-3 md:px-2.5 xl:py-5 xl:px-4">
				<div className="flex items-start gap-2 justify-between">
					<TransitionLink
						href={`/people/${lawyer.slug?.current}`}
						pageName={lawyer.name}
						className="block"
					>
						<h2 className="text-dark-blue text-lg xl:text-xl 2xl:text-[22px]">
							{lawyer.name}
						</h2>
					</TransitionLink>
					{lawyer.contactInfo?.linkedin && (
						<Link
							href={lawyer.contactInfo.linkedin}
							target="_blank"
							className="hidden md:block cursor-pointer"
							data-cursor-zone="exempt"
						>
							<LinkedinIcon className="min-w-5 min-h-5 w-5 h-5 2xl:w-5.5 2xl:h-5.5 2xl:min-w-5.5 2xl:min-h-5.5" />
						</Link>
					)}
				</div>

				<p className="mt-2 md:mt-3 text-grey-text text-xxs md:text-sm 2xl:text-base">
					{lawyer.title}
				</p>
				{lawyer.contactInfo?.linkedin && (
					<Link
						href={lawyer.contactInfo.linkedin}
						target="_blank"
						className="block mt-4 md:hidden"
						data-cursor-zone="exempt"
					>
						<LinkedinIcon className="w-4 h-4" />
					</Link>
				)}
			</div>
		</article>
	);
};

export default LawyerCardGrid;
