import { Slug } from '@/sanity.types';
import PostsSwitcher from './posts-switcher';
import Section from '../ui/section';

interface RelatedPost {
  title: string;
  slug: Slug;
  date: string;
}

const RelatedPostsSection = ({
  title,
  newsroomPosts,
  blogPosts,
  insightsPosts,
  publications,
  underColor = 'bg-white',
}: {
  title: string;
  newsroomPosts?: RelatedPost[];
  blogPosts?: RelatedPost[];
  insightsPosts?: RelatedPost[];
  publications?: RelatedPost[];
  underColor?: string;
}) => {
  const hasAnyPosts =
    (newsroomPosts && newsroomPosts.length > 0) ||
    (blogPosts && blogPosts.length > 0) ||
    (insightsPosts && insightsPosts.length > 0) ||
    (publications && publications.length > 0);

  if (!hasAnyPosts) {
    return null;
  }

  return (
    <Section variant='dark' underColor={underColor}>
      <PostsSwitcher
        title={title}
        newsroomPosts={newsroomPosts}
        blogPosts={blogPosts}
        insightsPosts={insightsPosts}
        publications={publications}
      />
    </Section>
  );
};

export default RelatedPostsSection;
