import TeamMembersCarousel from "@/src/components/lawyers/teamMembersCarousel";
import RelatedPostsSection from "@/src/components/services/related-posts-section";
import TestimonialsCarousel from "@/src/components/services/testimonials-carousel";
import ArrowUpRight from "@/src/components/ui/arrow-up-right";
import BackToButton from "@/src/components/ui/buttons/back-to-button";
import { FooterBackgroundHandler } from "@/src/components/ui/footer-background-handler";
import LinkedinIcon from "@/src/components/ui/icons/linkedin-icon";
import PortableText from "@/src/components/ui/portable-text";
import Section from "@/src/components/ui/section";
import SectionHeader from "@/src/components/ui/section-header/section-header";
import { cn } from "@/src/lib/utils";
import { Lawyer, LAWYER_QUERYResult } from "@/sanity.types";
import { getLawyerPageData, getLawyers } from "@/src/sanity/lib/cached-queries";
import { urlForUncropped } from "@/src/sanity/lib/image";
import { Testimonial } from "@/src/sanity/schemaTypes/services/testimonialTypes";
import { PortableTextBlock } from "next-sanity";
import { Image } from "next-sanity/image";
import { TransitionLink } from "@/src/components/transition-link";
import Link from "next/link";
import { AnimateOnLoad } from "@/src/components/animations/animate-on-load";

export async function generateStaticParams() {
	const lawyers = await getLawyers();
	return lawyers.lawyers.map((lawyer) => ({ slug: lawyer.slug.current }));
}

const LawyerPage = async ({
	params,
}: {
	params: Promise<{ slug: string }>;
}) => {
	const { slug } = await params;

	const {
		lawyer,
		categoryInfo,
		newsroomPosts,
		blogPosts,
		insightsPosts,
		publications,
	}: LAWYER_QUERYResult = await getLawyerPageData(slug);

	if (!lawyer) {
		return <div>Lawyer not found</div>;
	}

	const orderedCategoryLawyers = categoryInfo?.orderedLawyers;

	const hasTeamMembers =
		orderedCategoryLawyers && orderedCategoryLawyers.length > 0;

	return (
		<main id="lawyerPage" className="pt-header">
			<FooterBackgroundHandler
				changeColor={!hasTeamMembers}
				color="hsl(var(--dark-blue))"
			/>
			<AnimateOnLoad>
				<div className="px-side grid grid-cols-1 xl:grid-cols-12 gap-24 sm:gap-20 xl:gap-8 pb-24 md:pb-30 2xl:pb-42 pt-8 sm:pt-11 xl:pt-0">
					<section className="col-span-1 xl:col-span-5 2xl:col-span-4 w-full xl:w-[calc(80%+32px)]">
						<div className="xl:sticky xl:top-20 flex flex-col gap-5 sm:gap-6 xl:gap-9 2xl:gap-18 sm:flex-row xl:flex-col ">
							<div className="w-full sm:w-1/2 xl:w-full h-auto rounded-br-[50px] xl:rounded-br-[150px] overflow-hidden aspect-[518/547]">
								<Image
									src={urlForUncropped(lawyer.picture).url() || ""}
									alt={lawyer?.name || ""}
									width={777}
									height={821}
									quality={85}
									priority
									className="w-full h-full object-cover object-top"
								/>
							</div>
							<div className="sm:mt-auto xl:mt-0 sm:pb-12 xl:pb-0">
								<div className="flex flex-col gap-4 2xl:gap-8">
									<h1 className="text-dark-blue text-3xl sm:text-4xl xl:text-5xl 2xl:text-6xl">
										{lawyer.name}
									</h1>
									<p className="text-dark-blue sm:text-lg 2xl:text-2xl">
										{lawyer.title}
									</p>
								</div>
								{lawyer.contactInfo?.phone && (
									<a
										href={`tel:${lawyer.contactInfo.phone}`}
										className="text-light-blue w-fit mt-4 2xl:mt-5 sm:text-lg 2xl:text-2xl block"
									>
										{lawyer.contactInfo.phone}
									</a>
								)}
								{lawyer.contactInfo?.email && (
									<a
										href={`mailto:${lawyer.contactInfo.email}`}
										className="text-light-blue w-fit mt-1 sm:mt-2 2xl:mt-3 sm:text-lg 2xl:text-2xl block"
									>
										{lawyer.contactInfo.email}
									</a>
								)}
								{lawyer.contactInfo?.linkedin && (
									<Link
										href={lawyer.contactInfo.linkedin}
										target="_blank"
										className="block mt-5 md:mt-6 w-fit"
									>
										<LinkedinIcon className="w-6 h-6 xl:w-5.5 xl:h-5.5 2xl:w-6 2xl:h-6" />
									</Link>
								)}
							</div>
						</div>
					</section>
					<section className="col-span-1 xl:col-span-7 xl:col-start-6 2xl:col-span-6 2xl:col-start-6 xl:pt-18 2xl:pt-23">
						<BackToButton
							href="/people"
							text="Back to People"
							className="hidden xl:flex ml-auto 2xl:translate-x-[calc((100vw-2*(var(--padding-side)))/12)]"
						/>
						<div className="xl:mt-18 2xl:mt-43">
							<h2 className="text-dark-blue text-2xl sm:text-3xl 2xl:text-4xl">
								About
							</h2>
							<PortableText
								value={lawyer.bio as PortableTextBlock[]}
								className="mt-8 xl:mt-10 2xl:mt-15"
							/>
						</div>
						{lawyer.areasOfExpertise &&
							lawyer.areasOfExpertise.items &&
							lawyer.areasOfExpertise.items.length > 0 && (
								<div className="mt-12 sm:mt-18 xl:mt-22 2xl:mt-28">
									<h2 className="text-dark-blue text-2xl sm:text-3xl 2xl:text-4xl">
										Areas of Expertise
									</h2>
									<ul className="mt-8 xl:mt-10 2xl:mt-15">
										{lawyer.areasOfExpertise.items.map(
											(expertise: string, index: number) => (
												<li
													key={index}
													className={cn(
														"flex justify-between items-start border-t border-grey-random/50 pt-2.5 pb-9 2xl:pb-12",
													)}
												>
													<p className="text-dark-blue text-lg 2xl:text-2xl">
														{expertise}
													</p>
													<span className="text-light-blue">
														{String(index + 1).padStart(2, "0")}
													</span>
												</li>
											),
										)}
									</ul>
								</div>
							)}
						{lawyer.testimonials && lawyer.testimonials.length > 0 && (
							<div className="flex flex-col mt-20 gap-13 sm:mt-18 xl:mt-22 2xl:mt-28 xl:gap-10 2xl:gap-15">
								<h2 className="text-dark-blue text-3xl">Mentions</h2>
								<TestimonialsCarousel
									testimonials={lawyer.testimonials as Testimonial[]}
									className=""
								/>
							</div>
						)}
					</section>
				</div>
			</AnimateOnLoad>

			<RelatedPostsSection
				title="Featured posts"
				newsroomPosts={newsroomPosts}
				blogPosts={blogPosts}
				insightsPosts={insightsPosts}
				publications={publications}
			/>

			{hasTeamMembers && (
				<Section variant="blue" underColor="bg-dark-blue" className="px-0!">
					<SectionHeader
						heading="Other Team Members"
						colorVariant="dark"
						className="px-side"
						rightSideComponent={
							<ViewAllButton href="/people" text="View All" />
						}
						rightSideComponentClassName="hidden md:block"
					/>
					<TeamMembersCarousel
						lawyers={orderedCategoryLawyers as Lawyer[]}
						className="mt-10 md:mt-13 xl:mt-12 2xl:mt-20"
						itemClassName="basis-50% sm:basis-[33%] xl:basis-[21.5%] 2xl:basis-[18%]"
					/>
					<ViewAllButton
						href="/people"
						text="View All"
						className="mt-10 md:hidden mx-auto"
					/>
				</Section>
			)}
		</main>
	);
};

export default LawyerPage;

const ViewAllButton = ({
	href,
	text,
	className,
}: {
	href: string;
	text: string;
	className?: string;
}) => {
	return (
		<TransitionLink
			href={href}
			className={cn(
				"w-fit h-fit text-light-blue flex items-center gap-4 2xl:gap-6 text-lg 2xl:text-2xl group",
				className,
			)}
		>
			<ArrowUpRight /> {text}
		</TransitionLink>
	);
};
