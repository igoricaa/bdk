import { Slug } from '@/sanity.types';
import PostsSwitcher from './posts-switcher';

interface RelatedPost {
  title: string;
  slug: Slug;
  date: string;
}

const RelatedPostsSection = ({
  newsroomPosts,
  blogPosts,
  insightsPosts,
}: {
  newsroomPosts?: RelatedPost[];
  blogPosts?: RelatedPost[];
  insightsPosts?: RelatedPost[];
}) => {
  const hasAnyPosts =
    (newsroomPosts && newsroomPosts.length > 0) ||
    (blogPosts && blogPosts.length > 0) ||
    (insightsPosts && insightsPosts.length > 0);

  if (!hasAnyPosts) {
    return null;
  }

  return (
    <section className='bg-white'>
      <div className='rounded-t-main bg-dark-blue text-white py-19 md:pt-23 md:pb-28 xl:pt-30 xl:pb-35 2xl:py-43 px-side'>
        <PostsSwitcher
          newsroomPosts={newsroomPosts}
          blogPosts={blogPosts}
          insightsPosts={insightsPosts}
        />
      </div>
    </section>
  );
};

export default RelatedPostsSection;
