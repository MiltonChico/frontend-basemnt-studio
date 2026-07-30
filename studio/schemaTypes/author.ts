import {defineField, defineType} from 'sanity'

export const author = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'name', maxLength: 96},
      description: 'For a future author page — not consumed by the blog yet.',
    }),
    defineField({
      name: 'role',
      type: 'string',
      title: 'Role / title',
    }),
    defineField({
      name: 'image',
      type: 'image',
      options: {hotspot: true},
    }),
  ],
  preview: {
    select: {title: 'name', subtitle: 'role', media: 'image'},
  },
})
