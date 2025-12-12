import { Lawyer } from "@/sanity.types";
import { urlForUncropped } from "@/src/sanity/lib/image";
import { Image } from "next-sanity/image";
import ArrowUpRight from "../ui/arrow-up-right";
import { TransitionLink } from "@/src/components/transition-link";

const LawyerInfoCard = ({ lawyer }: { lawyer: Lawyer }) => {
	return (
		<article
			key={lawyer._id}
			className="col-span-full xl:col-span-1 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-9 bg-light-blue-bg/5 rounded-[1.25rem] pt-3.5 pb-5 px-side md:px-4 md:py-5.25 xl:p-4 2xl:p-7.5"
		>
			<TransitionLink
				href={`/people/${lawyer.slug.current}`}
				className="flex-1"
			>
				<Image
					src={urlForUncropped(lawyer.picture).url()}
					alt={lawyer.name}
					width={766}
					height={788}
					className="w-full object-cover object-top rounded-lg xl:rounded-2xl 2xl:rounded-[1.25rem] aspect-[334/345]"
				/>
			</TransitionLink>
			<div className="flex flex-col text-white flex-1 md:pt-5 2xl:pt-7.5">
				<TransitionLink
					href={`/people/${lawyer.slug.current}`}
					className="w-fit"
				>
					<h3 className="text-2xl 2xl:text-3xl">{lawyer.name}</h3>
				</TransitionLink>
				<div className="mt-5 flex flex-col gap-1.5">
					<p className="2xl:text-lg">{lawyer.title}</p>
					<p className="2xl:text-lg">
						Phone:{" "}
						<a
							href={`tel:${lawyer.contactInfo?.phone}`}
							className="text-light-blue underline decoration-light-blue 2xl:text-lg"
						>
							{lawyer.contactInfo?.phone}
						</a>
					</p>
					<p className="2xl:text-lg">
						Email:{" "}
						<a
							href={`mailto:${lawyer.contactInfo?.email}`}
							className="text-light-blue underline decoration-light-blue 2xl:text-lg"
						>
							{lawyer.contactInfo?.email}
						</a>
					</p>
					{lawyer.areasOfExpertise?.items?.length && (
						<>
							<p className="2xl:text-lg mt-4">
								{lawyer.areasOfExpertise?.items?.length > 1
									? "Areas of Expertise:"
									: "Area of Expertise:"}
							</p>
							<ul className="mt-2 flex flex-col gap-1.5 list-disc pl-4">
								{lawyer.areasOfExpertise?.items?.map((item) => (
									<li key={item} className="list-marker-blue">
										<p className="text-light-blue">{item}</p>
									</li>
								))}
							</ul>
						</>
					)}
				</div>

				<TransitionLink
					href={`/people/${lawyer.slug.current}`}
					className="block mt-8 md:mt-auto w-fit group"
				>
					<ArrowUpRight />
				</TransitionLink>
			</div>
		</article>
	);
};

export default LawyerInfoCard;
