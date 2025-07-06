import { defineQuery } from 'next-sanity';

export const HOME_PAGE_QUERY = defineQuery(`{
  "homePage": *[_type == "homePage"][0],
  "blinkdraft": *[_type == "blinkdraft"][0]{
    logo
  },
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
  "newsroom": *[_type == "post" && references(*[_type=="category" && name=="Newsroom"]._id)] | order(date desc)[0...4]{
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

export const PRACTICE_QUERY = defineQuery(`{
  "currentPractice": *[_type == "practice" && slug.current == $slug][0]{
    ...,
    lawyers[]->{
      _id,
      name,
      title,
      picture,
      slug,
      contactInfo
    },
    newsroom[]->{
      _id,
      title,
      slug,
      date,
    },
    "latestBlogPosts": *[_type == "post" && references(^.latestBlogPosts[]._ref)] | order(date desc)[0...4]{
      _id,
      title,
      slug,
      date,
    },
    "bdkInsights": *[_type == "post" && references(^.bdkInsights[]._ref)] | order(date desc)[0...4]{
      _id,
      title,
      slug,
      date,
    },
  },
  "otherPractices": *[_type == "practice" && slug.current != $slug]{
    title,
    slug
  },
  "industries": *[_type == "industry"]{title, slug},
  "foreignDesks": *[_type == "foreignDesk"]{title, slug},
  "autoNewsroom": *[_type == "post" && references(*[_type=="category" && name=="Newsroom"]._id)] | order(date desc)[0...4]{
    _id,
    title,
    slug,
    date,
  },
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

export const POSTS_QUERY = defineQuery(
  `{
    "allPosts": *[_type == "post" && references(*[_type=="category" && slug.current == $slug]._id)] | order(date desc)[3..-1] {
      _id,
      title,
      slug,
      date,
      categories[]->{
        _id,
        name,
        slug
      }
    },
    "featuredPosts": *[_type == "post" && references(*[_type=="category" && slug.current == $slug]._id)] | order(date desc)[0...3] {
      _id,
      title,
      slug,
      excerpt,
      featuredMedia,
    }
  }`
);

export const POST_QUERY = defineQuery(`{
    "currentPost": *[_type == "post" && slug.current == $slug][0]{
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
        type,
        lawyer->{
          name,
          title,
          picture,
          slug
        },
        customAuthor{
          name,
          slug
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
    },
    "previousPost": *[
      _type == "post" 
      && status == "publish" 
      && date < *[_type == "post" && slug.current == $slug][0].date
      && references(*[_type=="category" && _id in *[_type == "post" && slug.current == $slug][0].categories[]._ref]._id)
    ] | order(date desc)[0]{
      slug
    },
    "nextPost": *[
      _type == "post" 
      && status == "publish" 
      && date > *[_type == "post" && slug.current == $slug][0].date
      && references(*[_type=="category" && _id in *[_type == "post" && slug.current == $slug][0].categories[]._ref]._id)
    ] | order(date asc)[0]{
      slug
    },
    "relatedPosts": *[
      _type == "post" 
      && status == "publish" 
      && slug.current != $slug
      && references(*[_type=="category" && _id in *[_type == "post" && slug.current == $slug][0].categories[]._ref]._id)
    ] | order(date desc)[0...12]{
      title,
      slug,
      date,
      categories[]->{
        _id,
        name,
        slug
      }
    }
  }`);

export const GENERAL_INFO_QUERY = defineQuery(`{
  "generalInfo": *[_type == "generalInfo"][0],
  "blinkdraft": *[_type == "blinkdraft"][0]{
    logo
  }
}`);

export const BDKNOWLEDGE_POSTS_QUERY = defineQuery(`{
  "featuredPosts": *[_type == "post" && references(*[_type=="category" && slug.current == $slug]._id)] | order(date desc)[0...3] {
    _id,
    title,
    slug,
    excerpt,
    featuredMedia,
  },
  "categories": *[_type == "category" && count(parent[_ref in *[_type=="category" && slug.current == $slug]._id]) > 0 && count > 0] | order(name asc) {
    _id,
    name,
    slug,
    count
  },
  "allPosts": *[_type == "post" && references(*[_type=="category" && slug.current == $slug]._id)] | order(date desc)[3...12] {
    _id,
    title,
    slug,
    date,
    categories[]->{
      _id,
      name,
      slug
    }
  }
}`);
