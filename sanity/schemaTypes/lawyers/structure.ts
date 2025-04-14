import type { StructureBuilder } from 'sanity/structure';

export const lawyersStructure = (S: StructureBuilder) =>
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
            .child(S.documentTypeList('lawyerCategory').title('Categories')),
        ])
    );
