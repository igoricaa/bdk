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

export const BLINKDRAFT_PAGE_QUERY = defineQuery(`{
  "blinkdraftPage": *[_type == "blinkdraft" && language == $locale][0] {
    ...,
    demoSection {
      subtitle,
      heading,
      "demoVideoPlaybackId": coalesce(
        demoVideo.demoVideoAsset.asset->playbackId, 
        demoVideo.demoVideoId
      ),
      "demoVideoPoster": demoVideo.demoVideoPoster
    }
  }
}`);

export const UNIVERSAL_AUTHOR_PAGE_QUERY = defineQuery(`
  *[_type == "author" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    type,
    "lawyerDetails": lawyer->{
      title,
      picture,
      bio,
      contactInfo {
        email,
        phone,
        linkedin
      }
    },
    "posts": *[
      _type == "post" &&
      status == "publish" &&
      references(^._id)
    ] | order(date desc)[0...10] {
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
  }
`);

export const PRIVACY_NOTICE_QUERY = defineQuery(`{
  "privacyNotice": *[_type == "privacyNotice"][0] {
    title,
    _updatedAt,
    content,
    specificsOfDataProcessing[] {
      title,
      table
    }
  }
}`);

export const COOKIE_POLICY_QUERY = defineQuery(`{
  "cookiePolicy": *[_type == "cookiePolicy"][0] {
    title,
    _updatedAt,
    content,
    necessaryCookies,
    functionalCookies,
    analyticsCookies
  }
}`);

export const POSTS_PREVIEW_BY_CATEGORY_QUERY = defineQuery(`{
  "posts": *[_type == "post" && references(*[_type=="category" && slug.current == $slug]._id)] | order(date desc)[0...$limit]{
    title,
    slug,
    date,
  }
}`);

export const POSTS_BY_YEAR_DATETIME_QUERY = defineQuery(`
  *[_type == "post" && status == "publish" && references(*[_type=="category" && slug.current == $categorySlug]._id) && date match $year + "-*"] | order(date desc)[$start...$end] {
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
`);

export const POSTS_BY_YEAR_COUNT_QUERY = defineQuery(`
  count(*[_type == "post" && status == "publish" && references(*[_type=="category" && slug.current == $categorySlug]._id) && date match $year + "-*"])
`);

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
      order,
      orderedLawyers[]->{
        _id,
        slug
      }
    },
    contactInfo
  }
}`);

export const LAWYERS_BY_CATEGORY_QUERY = defineQuery(`{
  "categories": *[_type == "lawyerCategory"] | order(order asc) {
    _id,
    title,
    slug,
    order,
    "orderedLawyers": orderedLawyers[]->{
      _id,
      name,
      title,
      picture,
      slug,
      contactInfo {
        linkedin
      }
    }
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
    slug,
    illustration{
      desktop,
      tablet,
      mobile
    }
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

export const AUTHORS_QUERY = defineQuery(`*[_type == "author"] {
    slug,
}`);

export const POSTS_QUERY_WITH_SLUGS =
  defineQuery(`*[_type == "post" && status == "publish"]{
  slug
}`);

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
      "publication": {
        "externalUrl": publications.url,
        "downloadUrl": publications.download.asset->url
      },
      authors[]->{
        _id,
        type,
        name,
        slug,
        lawyer->{
          name,
          title,
          picture,
          slug
        },
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
      title,
      slug
    },
    "nextPost": *[
      _type == "post" 
      && status == "publish" 
      && date > *[_type == "post" && slug.current == $slug][0].date
      && references(*[_type=="category" && _id in *[_type == "post" && slug.current == $slug][0].categories[]._ref]._id)
    ] | order(date asc)[0]{
      title,
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
    servicesCategoryIllustrations{
      servicesIllustration,
      practicesIllustration,
      industriesIllustration,
      foreignDesksIllustration
    },
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
}`);

export const LAWYER_QUERY = defineQuery(`{
  "lawyer": *[_type == "lawyer" && slug.current == $slug][0],
  "sameCategoryLawyers": *[_type == "lawyer" && category._ref == *[_type == "lawyer" && slug.current == $slug][0].category._ref && slug.current != $slug]{
    _id,
    name,
    title,
    picture,
    slug,
    contactInfo {
      linkedin
    }
  },
  "categoryInfo": *[_type == "lawyerCategory" && _id == *[_type == "lawyer" && slug.current == $slug][0].category._ref][0]{
    _id,
    title,
    "orderedLawyers": orderedLawyers[]->{
      _id,
      slug
    }
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

export const POSTS_BY_CATEGORY_QUERY = defineQuery(`{
  "posts": *[_type == "post" && status == "publish" && ($slug == "all" || $slug == null || references(*[_type=="category" && slug.current == $slug]._id))] | order(date desc)[0...9] {
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

export const YEARS_BY_CATEGORY_QUERY = defineQuery(`
  *[_type == "post" && status == "publish" && references(*[_type=="category" && slug.current == $slug]._id)].date | order(@ desc)
`);

export const NESTED_CATEGORIES_QUERY = defineQuery(`{
  "rootCategory": *[_type == "category" && slug.current == $categorySlug][0]{
    _id,
    name,
    slug,
    "postCount": count(*[_type == "post" && status == "publish" && references(^._id)])
  },
  "allCategories": *[
    _type == "category" 
    && count(*[_type == "post" && status == "publish" && references(^._id)]) > 0
  ]{
    _id,
    name,
    slug,
    "parentRefs": parent[]._ref,
    "postCount": count(*[_type == "post" && status == "publish" && references(^._id)]),
    "hasChildren": count(*[_type == "category" && references(^._id) && count(*[_type == "post" && status == "publish" && references(^._id)]) > 0]) > 0
  } | order(name asc)
}`);

// New queries for client-side filtering approach
export const GLOBAL_FEATURED_POSTS_QUERY = defineQuery(`
  *[_type == "post" && status == "publish" && ($slug == "all" || $slug == null || references(*[_type=="category" && slug.current == $slug]._id))] | order(date desc)[0...3] {
    _id,
    title,
    slug,
    excerpt,
    featuredMedia,
  }
`);

export const PAGINATED_FILTERED_POSTS_QUERY = defineQuery(`
  *[ 
    _type == "post"
    && status == "publish"
    // This part filters by category.
    // If $categorySlug is "all" or null, this condition is effectively ignored.
    // Otherwise, it checks if the post references the specified category.
    && ($categorySlug == "all" || $categorySlug == null || references(*[_type=="category" && slug.current == $categorySlug]._id))
    
    // This part filters by year.
    // If $year is null, this condition is ignored.
    // Otherwise, it checks if the post's date starts with the given year string (e.g., "2023-").
    && ($year == null || $year == "all" || string(date) match $year + "*")

    // This part filters by author.
    // If $authorId is null, this condition is ignored.
    // Otherwise, it checks if the post references the specified author.
    && ($authorId == null || $authorId == "all" || references(*[_type=="author" && _id == $authorId]._id))
  ] | order(date desc)[$start...$end] {
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
`);

// This query counts the total number of posts matching the same dynamic filters.
// It's crucial for calculating pagination (i.e., if there is a next page).
export const PAGINATED_FILTERED_POSTS_COUNT_QUERY = defineQuery(`
  count(*[
    _type == "post"
    && status == "publish"
    && ($categorySlug == "all" || $categorySlug == null || references(*[_type=="category" && slug.current == $categorySlug]._id))
    && ($year == null || $year == "all" || string(date) match $year + "*")
    && ($authorId == null || $authorId == "all" || references(*[_type=="author" && _id == $authorId]._id))
  ])
`);
