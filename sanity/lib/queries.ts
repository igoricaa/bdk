import { defineQuery } from 'next-sanity';

export const HOME_PAGE_QUERY = defineQuery(`{
  "homePage": *[_type == "homePage"][0],
  "blinkdraft": *[_type == "blinkdraft"][0]{
    logo
  },
}`);

export const PEOPLE_PAGE_QUERY = defineQuery(`{
  "peoplePage": *[_type == "peoplePage"][0],
}`);

export const ABOUT_US_PAGE_QUERY = defineQuery(`{
  "aboutUsPage": *[_type == "aboutUsPage"][0],
}`);

export const CAREER_PAGE_QUERY = defineQuery(`{
  "careerPage": *[_type == "careerPage"][0] {
    title,
    hero {
      heading,
      description,
      backgroundImage,
      openPositionsSection {
        heading,
        openPositions[]->{
          _id,
          title,
          description,
          location,
          pdfFile
        }
      }
    },
    coursesSection {
      subtitle,
      title,
      courses
    }
  }
}`);

export const POSTS_BY_CATEGORY_QUERY = defineQuery(`{
  "posts": *[_type == "post" && references(*[_type=="category" && slug.current == $slug]._id)] | order(date desc)[0...$limit]{
    title,
    slug,
    date,
  }
}`);

export const LAWYERS_QUERY = defineQuery(`{
  "lawyers": *[_type == "lawyer"]{
    name,
    title,
    picture,
    slug,
    category->{
      _id,
      title,
      slug,
      order
    },
    contactInfo
  }
}`);

export const SERVICES_QUERY = defineQuery(`{
  "industries": *[_type == "industry"]{
    title,
    slug,
    illustration{
      desktop,
      tablet,
      mobile
    }
  },
  "practices": *[_type == "practice"]{
    title,
    slug,
    illustration{
      desktop,
      tablet,
      mobile
    }
  },
  "foreignDesks": *[_type == "foreignDesk"]{
    title,
    slug
  }
}`);

export const SERVICE_QUERY = defineQuery(`{
  "currentService": *[_type == $type && slug.current == $slug][0]{
    _id,
    _type,
    title,
    slug,
    description,
    illustration{
      desktop,
      tablet,
      mobile
    },
    testimonials[]{
      text,
      author
    },
    publications,
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
}`);

export const FOREIGN_DESK_QUERY = defineQuery(`{
  "currentForeignDesk": *[_type == "foreignDesk" && slug.current == $slug][0]{
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
}`);

export const AUTHORS_QUERY = defineQuery(`*[_type == "author"]`);

export const POSTS_QUERY_WITH_SLUGS =
  defineQuery(`*[_type == "post" && status == "publish"]{
  slug
}`);

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
    "currentPost": *[_type == "post" && slug.current == $slug && status == "publish"][0]{
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
  "generalInfo": *[_type == "generalInfo"][0]{
    ...,
    countries[]->{
      _id,
      name,
      description,
      countryIllustration,
      address,
      email,
      phone,
      note
    }
  },
  "blinkdraft": *[_type == "blinkdraft"][0]{
    logo
  }
}`);

export const LAWYER_QUERY = defineQuery(`{
  "lawyer": *[_type == "lawyer" && slug.current == $slug][0],
  "sameCategoryLawyers": *[_type == "lawyer" && category->_id == *[_type == "lawyer" && slug.current == $slug][0].category->_id && slug.current != $slug][0...100]{
    _id,
    name,
    title,
    picture,
    slug,
  },
  "newsroomPosts": *[
    _type == "post" 
    && status == "publish"
    && references(*[_type=="category" && name=="Newsroom"]._id)
    && count(authors[]->{type, lawyer}[type == "lawyer" && lawyer._ref == ^.^.^._id]) > 0
  ] | order(date desc)[0...4]{
    title,
    slug,
    date
  },
  "blogPosts": *[
    _type == "post" 
    && status == "publish"
    && references(*[_type=="category" && name=="Blog"]._id)
    && count(authors[]->{type, lawyer}[type == "lawyer" && lawyer._ref == ^.^.^._id]) > 0
  ] | order(date desc)[0...4]{
    title,
    slug,
    date
  },
  "insightsPosts": *[
    _type == "post" 
    && status == "publish"
    && references(*[_type=="category" && name=="Insights"]._id)
    && count(authors[]->{type, lawyer}[type == "lawyer" && lawyer._ref == ^.^.^._id]) > 0
  ] | order(date desc)[0...4]{
    title,
    slug,
    date
  },  
  "publications": *[
    _type == "post" 
    && status == "publish"
    && references(*[_type=="category" && name=="Publications"]._id)
    && count(authors[]->{type, lawyer}[type == "lawyer" && lawyer._ref == ^.^.^._id]) > 0
  ] | order(date desc)[0...4]{
    title,
    slug,
    date
  },
}`);

// -----------------

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
