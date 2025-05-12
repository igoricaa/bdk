import { defineQuery } from 'next-sanity';

export const LAWYERS_QUERY = defineQuery(`*[_type == "lawyer"]`);
export const SERVICES_QUERY = defineQuery(`*[_type == "service"]{
  ...,
  lawyer->{
    _id,
    name,
    title,
    picture,
    bio,
    contactInfo
  }
}`);

export const AUTHORS_QUERY = defineQuery(`*[_type == "author"]`);

export const POSTS_QUERY = defineQuery(`*[_type == "post"]`);

export const POST_QUERY =
  defineQuery(`*[_type == "post" && slug.current == $slug][0]{
      _id,
      title,
      slug,
      date,
      modified,
      status,
      content,
      excerpt,
      featuredMedia,
      authors[]->{
        _id,
        name,
        type,
        lawyer->{
          name,
          title
        },
        customAuthor{
          name
        }
      },
      categories[]->{
        _id,
        name,
        slug,
        "parentCategories": parent[]->{
          _id,
          name,
          slug,
          "parentCategories": parent[]->{
            _id,
            name,
            slug
          }
        }
      }
    }`);
