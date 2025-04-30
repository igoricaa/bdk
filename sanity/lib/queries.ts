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