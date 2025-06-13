import { defineQuery } from 'next-sanity';

export const HOME_PAGE_QUERY = defineQuery(`{
  "homePage": *[_type == "homePage"][0],
  "industries": *[_type == "industry"]{
    title,
    slug
  },
  "practices": *[_type == "practice"]{
    title,
    slug
  }
}`);
export const LAWYERS_QUERY = defineQuery(`*[_type == "lawyer"]`);
export const PRACTICES_QUERY = defineQuery(`*[_type == "practice"]{
  ...,
  lawyers[]->{
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
