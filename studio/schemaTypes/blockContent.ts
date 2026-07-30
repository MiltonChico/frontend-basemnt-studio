import {defineArrayMember, defineField, defineType} from 'sanity'

export const blockContent = defineType({
  name: 'blockContent',
  title: 'Block Content',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'Heading 2', value: 'h2'},
        {title: 'Heading 3', value: 'h3'},
      ],
      lists: [
        {title: 'Bullet', value: 'bullet'},
        {title: 'Numbered', value: 'number'},
      ],
      marks: {
        decorators: [
          {title: 'Bold', value: 'strong'},
          {title: 'Italic', value: 'em'},
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Link',
            fields: [
              defineField({
                name: 'href',
                type: 'url',
                title: 'URL',
                validation: (Rule) => Rule.required(),
              }),
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineArrayMember({
      // Embedded object, not a `> ` markdown blockquote — attributionName/attributionRole
      // need to stay as separate data (not baked into one text string) so the front end
      // can style the name and role independently, per the Figma pull-quote component.
      type: 'object',
      name: 'pullQuote',
      title: 'Pull quote',
      fields: [
        defineField({
          name: 'quote',
          type: 'text',
          title: 'Quote',
          rows: 3,
          validation: (Rule) => Rule.required(),
        }),
        defineField({name: 'attributionName', type: 'string', title: 'Attribution name'}),
        defineField({name: 'attributionRole', type: 'string', title: 'Attribution role'}),
      ],
      preview: {
        select: {title: 'quote', subtitle: 'attributionName'},
      },
    }),
  ],
})
