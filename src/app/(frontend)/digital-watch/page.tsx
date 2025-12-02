import { Post } from "@/sanity.types";
import FeaturedPostsSection from "@/src/components/posts/featured-posts-section";
import PostsGrid from "@/src/components/posts/posts-grid";
import {
	getGlobalFeaturedPosts,
	getPostsByCategory,
	getYearsByCategory,
} from "@/src/sanity/lib/cached-queries";
import { Suspense } from "react";
import { getYearsFilterOptions } from "@/src/lib/utils";
import { AnimateOnLoad } from "@/src/components/animations/animate-on-load";

const DigitalWatchPage = async () => {
	const slug = "digital-watch";
	const [featuredPosts, { posts }, postYears] = await Promise.all([
		getGlobalFeaturedPosts(slug),
		getPostsByCategory(slug),
		getYearsByCategory(slug),
	]);

	if (!featuredPosts || !posts) {
		return <div>No posts found</div>;
	}

	const yearFilterOptions = getYearsFilterOptions(postYears);

	return (
		<main id="blogPage" className="pt-header">
			<AnimateOnLoad>
				<FeaturedPostsSection
					featuredPosts={featuredPosts as Post[]}
					className="pt-7.5 md:pt-11 xl:pt-0 xl:h-[calc(100vh-5rem)] xl:max-h-[calc(100vh-5rem)]"
				/>
			</AnimateOnLoad>

			<Suspense fallback={<div>Loading posts...</div>}>
				<PostsGrid
					heading="Digital Watch"
					initialPosts={posts}
					showSidebar={false}
					yearFilterOptions={yearFilterOptions}
					initialCategory={slug}
					initialYear="all"
				/>
			</Suspense>
		</main>
	);
};

export default DigitalWatchPage;
