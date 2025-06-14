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
  },
  "partners": *[_type == "lawyer" && category->title == "Partner"]{
    name,
    title,
    picture
  },
  "newsroom": *[_type == "post" && count(categories[_ref in *[_type=="category" && name=="Newsroom"]._id]) > 0] | order(date desc)[0...4]{
    title,
    slug,
    date,
  }
}`);

export const LAWYERS_QUERY = defineQuery(`*[_type == "lawyer"]`);

export const PARTNERS_LAWYERS_QUERY =
  defineQuery(`*[_type == "lawyer" && category->title == "Partner"]{
  name,
  title,
  picture
}`);

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
