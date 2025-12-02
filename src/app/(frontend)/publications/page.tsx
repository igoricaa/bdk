import { Post } from "@/sanity.types";
import FeaturedPostsSection from "@/src/components/posts/featured-posts-section";
import PostsGrid from "@/src/components/posts/posts-grid";
import {
	getGlobalFeaturedPosts,
	getYearsByCategory,
	getNestedCategories,
	getPostsByCategory,
} from "@/src/sanity/lib/cached-queries";
import {
	buildCategoryTree,
	CategoryWithChildren,
	getYearsFilterOptions,
} from "@/src/lib/utils";
import { Suspense } from "react";
import { AnimateOnLoad } from "@/src/components/animations/animate-on-load";

const PublicationsPage = async () => {
	const slug = "publications";

	const [featuredPosts, { posts }, postYears, nestedCategoriesData] =
		await Promise.all([
			getGlobalFeaturedPosts(slug),
			getPostsByCategory(slug),
			getYearsByCategory(slug),
			getNestedCategories(slug),
		]);

	if (!featuredPosts || !posts) {
		return <div>No posts found</div>;
	}

	const categoryTree = buildCategoryTree(
		nestedCategoriesData?.rootCategory || null,
		nestedCategoriesData?.allCategories || [],
	);

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
					heading="Publications"
					initialPosts={posts}
					showSidebar={true}
					categoryTree={categoryTree as CategoryWithChildren}
					yearFilterOptions={yearFilterOptions}
					initialCategory={slug}
					initialYear="all"
				/>
			</Suspense>
		</main>
	);
};

export default PublicationsPage;
