import {defineField, defineType} from 'sanity'

export const post = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'Short text paired with the title, distinct from the excerpt — e.g. "- The Devex".',
    }),
    defineField({
      name: 'excerpt',
      title: 'Description',
      type: 'text',
      rows: 3,
      description:
        'Short teaser used only on post cards (featured + grid). Field is still named "excerpt" internally — renaming it in Sanity would orphan already-published content, so only the Studio label changed; the front end reads it as "description".',
      validation: (Rule) => Rule.max(280),
    }),
    defineField({
      name: 'intro',
      title: 'Intro',
      type: 'text',
      rows: 4,
      description:
        'Longer lead paragraph shown next to the title on the post detail page. Kept separate from the excerpt — one gets clamped on cards, the other needs its full length in the detail header.',
    }),
    defineField({
      name: 'mainImage',
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
    }),
    defineField({
      name: 'authors',
      type: 'array',
      of: [{type: 'reference', to: {type: 'author'}}],
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      type: 'blockContent',
    }),
    defineField({
      name: 'ctaLabel',
      title: 'Card button label',
      type: 'string',
      description: 'Text shown on the "read more" button for this post\'s card. Defaults to "Read more" if left empty.',
    }),
    defineField({
      name: 'displayNumber',
      title: 'Display number',
      type: 'number',
      description:
        'Editorial post number badge (e.g. "60"). Only set this if the number is a deliberate editorial choice, not just this post\'s position in a feed — a computed index wouldn\'t need a field.',
    }),
    defineField({
      name: 'previousPost',
      title: 'Previous post (override)',
      type: 'reference',
      to: {type: 'post'},
      description:
        'Manually pins the "Previous" link in the post footer. Leave empty to fall back to the chronologically adjacent post.',
    }),
    defineField({
      name: 'nextPost',
      title: 'Next post (override)',
      type: 'reference',
      to: {type: 'post'},
      description:
        'Manually pins the "Next" link in the post footer. Leave empty to fall back to the chronologically adjacent post.',
    }),
  ],
  preview: {
    select: {title: 'title', media: 'mainImage', date: 'publishedAt'},
    prepare({title, media, date}) {
      return {
        title,
        subtitle: date ? new Date(date).toLocaleDateString() : 'No date',
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Published date, new to old',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
  ],
})
