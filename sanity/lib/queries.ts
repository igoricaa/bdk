import { defineQuery } from 'next-sanity';

export const LAWYERS_QUERY = defineQuery(`*[_type == "lawyer"]`);
export const SERVICES_QUERY = defineQuery(`*[_type == "service"]{
  ...,
  lawyer->{
    _id,
    firstName,
    lastName,
    title,
    picture,
    bio,
    contactInfo
  }
}`);
