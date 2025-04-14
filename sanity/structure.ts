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
      ...S.documentTypeListItems().filter(
        (listItem) => !['lawyer', 'lawyerCategory'].includes(listItem.getId()!)
      ),
    ]);
