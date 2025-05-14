import type { StructureBuilder, StructureResolver } from 'sanity/structure';

export const structure: StructureResolver = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Lawyers')
        .icon(() => '👨‍⚖️')
        .child(
          S.list()
            .title('Lawyers')
            .items([
              S.listItem()
                .title('Lawyers')
                .icon(() => '👨‍⚖️')
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
        .icon(() => '📝')
        .child(
          S.list()
            .title('Posts')
            .items([
              S.listItem()
                .title('Posts')
                .icon(() => '📝')
                .child(S.documentTypeList('post').title('Posts')),
              S.listItem()
                .title('Categories')
                .icon(() => '📋')
                .child(S.documentTypeList('category').title('Categories')),
              S.listItem()
                .title('Authors')
                .icon(() => '📋')
                .child(S.documentTypeList('author').title('Authors')),
            ])
        ),
      S.listItem()
        .title('Services')
        .icon(() => '📝')
        .child(
          S.list()
            .title('Services')
            .items([
              S.listItem()
                .title('Practices')
                .icon(() => '📝')
                .child(S.documentTypeList('practice').title('Practices')),
              S.listItem()
                .title('Industries')
                .icon(() => '📋')
                .child(S.documentTypeList('industry').title('Industries')),
              S.listItem()
                .title('Foreign Desks')
                .icon(() => '📝')
                .child(
                  S.documentTypeList('foreignDesk').title('Foreign Desks')
                ),
            ])
        ),
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
          ].includes(listItem.getId()!)
      ),
    ]);
