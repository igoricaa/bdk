import {
  Briefcase,
  EarthIcon,
  FileIcon,
  GlobeIcon,
  HomeIcon,
  UsersIcon,
} from 'lucide-react';
import type { StructureBuilder, StructureResolver } from 'sanity/structure';

export const structure: StructureResolver = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Pages')
        .icon(FileIcon)
        .child(
          S.list()
            .title('Pages')
            .items([
              S.listItem()
                .title('Home Page')
                .icon(HomeIcon)
                .child(
                  S.document().schemaType('homePage').documentId('homePage')
                ),
              S.listItem()
                .title('People Page')
                .icon(UsersIcon)
                .child(
                  S.document().schemaType('peoplePage').documentId('peoplePage')
                ),
              S.listItem()
                .title('About Us Page')
                .icon(UsersIcon)
                .child(
                  S.document()
                    .schemaType('aboutUsPage')
                    .documentId('aboutUsPage')
                ),
              S.listItem()
                .title('Career Page')
                .icon(Briefcase)
                .child(
                  S.document().schemaType('careerPage').documentId('careerPage')
                ),
              S.listItem()
                .title('Blinkdraft')
                .icon(GlobeIcon)
                .child(
                  S.list()
                    .title('Blinkdraft')
                    .items([
                      S.listItem()
                        .title('Blinkdraft Page')
                        .icon(GlobeIcon)
                        .child(
                          S.document()
                            .schemaType('blinkdraft')
                            .documentId('blinkdraft')
                        ),
                      S.listItem()
                        .title('Blinkdraft Subscription Form')
                        .icon(GlobeIcon)
                        .child(
                          S.document()
                            .schemaType('subscriptionForm')
                            .documentId('subscriptionForm')
                        ),
                    ])
                ),
              S.listItem()
                .title('Privacy Notice')
                .icon(FileIcon)
                .child(
                  S.document()
                    .schemaType('privacyNotice')
                    .documentId('privacyNotice')
                ),
              S.listItem()
                .title('Cookie Policy')
                .icon(FileIcon)
                .child(
                  S.document()
                    .schemaType('cookiePolicy')
                    .documentId('cookiePolicy')
                ),
            ])
        ),
      S.listItem()
        .title('Lawyers')
        .icon(UsersIcon)
        .child(
          S.list()
            .title('Lawyers')
            .items([
              S.listItem()
                .title('Lawyers')
                .icon(UsersIcon)
                .child(S.documentTypeList('lawyer').title('Lawyers')),
              S.listItem()
                .title('Categories')
                .icon(() => '📋')
                .child(
                  S.documentTypeList('lawyerCategory').title('Categories')
                ),
            ])
        ),
      S.listItem()
        .title('Posts')
        .icon(FileIcon)
        .child(
          S.list()
            .title('Posts')
            .items([
              S.listItem()
                .title('Posts')
                .icon(FileIcon)
                .child(S.documentTypeList('post').title('Posts')),
              S.listItem()
                .title('Categories')
                .icon(FileIcon)
                .child(S.documentTypeList('category').title('Categories')),
              S.listItem()
                .title('Authors')
                .icon(FileIcon)
                .child(S.documentTypeList('author').title('Authors')),
            ])
        ),
      S.listItem()
        .title('Services')
        .icon(FileIcon)
        .child(
          S.list()
            .title('Services')
            .items([
              S.listItem()
                .title('Practices')
                .icon(FileIcon)
                .child(S.documentTypeList('practice').title('Practices')),
              S.listItem()
                .title('Industries')
                .icon(FileIcon)
                .child(S.documentTypeList('industry').title('Industries')),
              S.listItem()
                .title('Foreign Desks')
                .icon(FileIcon)
                .child(
                  S.documentTypeList('foreignDesk').title('Foreign Desks')
                ),
            ])
        ),
      S.listItem()
        .title('Countries')
        .icon(EarthIcon)
        .child(S.documentTypeList('country').title('Countries')),
      S.divider(),
      S.listItem()
        .title('General')
        .icon(GlobeIcon)
        .child(
          S.document().schemaType('generalInfo').documentId('generalInfo')
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) =>
          ![
            'lawyer',
            'lawyerCategory',
            'post',
            'category',
            'practice',
            'industry',
            'author',
            'foreignDesk',
            'homePage',
            'peoplePage',
            'aboutUsPage',
            'generalInfo',
            'blinkdraft',
            'country',
            'careerPage',
            'openPosition',
            'privacyNotice',
            'cookiePolicy',
            'subscriptionForm',
          ].includes(listItem.getId()!)
      ),
    ]);
