import {defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      initialValue: 'basement.',
    }),
    defineField({
      name: 'blogHero',
      title: 'Blog hero copy',
      type: 'text',
      rows: 3,
      description: 'e.g. "Research, insights, and the science behind building brands & websites."',
    }),
    defineField({
      name: 'navLinks',
      title: 'Navigation links',
      type: 'array',
      of: [
        defineField({
          type: 'object',
          name: 'navLink',
          fields: [
            defineField({name: 'label', type: 'string', validation: (Rule) => Rule.required()}),
            defineField({name: 'href', type: 'string', validation: (Rule) => Rule.required()}),
          ],
          preview: {select: {title: 'label', subtitle: 'href'}},
        }),
      ],
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact email',
      type: 'string',
      description: 'Shown to the user as the destination of the contact form (mocked submission).',
    }),
    defineField({
      name: 'footerColumns',
      title: 'Footer columns',
      type: 'array',
      of: [
        defineField({
          type: 'object',
          name: 'footerColumn',
          fields: [
            defineField({name: 'title', type: 'string', validation: (Rule) => Rule.required()}),
            defineField({
              name: 'links',
              type: 'array',
              of: [
                defineField({
                  type: 'object',
                  name: 'footerLink',
                  fields: [
                    defineField({name: 'label', type: 'string', validation: (Rule) => Rule.required()}),
                    defineField({name: 'href', type: 'string', validation: (Rule) => Rule.required()}),
                  ],
                  preview: {select: {title: 'label', subtitle: 'href'}},
                }),
              ],
            }),
          ],
          preview: {select: {title: 'title'}},
        }),
      ],
    }),
    defineField({
      name: 'footerCopyrightHolder',
      title: 'Footer copyright holder',
      type: 'string',
      initialValue: 'basement.studio LLC',
      description: 'Rendered as "© {holder} {current year}. All rights reserved." in the footer.',
    }),
    defineField({
      name: 'footerMembershipLabel',
      title: 'Footer membership label',
      type: 'string',
      initialValue: 'Proud member of SoDA',
      description: 'Small line next to the SoDA badge icon at the bottom of the footer.',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social links',
      type: 'array',
      of: [
        defineField({
          type: 'object',
          name: 'socialLink',
          fields: [
            defineField({name: 'label', type: 'string', validation: (Rule) => Rule.required()}),
            defineField({name: 'href', type: 'url', validation: (Rule) => Rule.required()}),
          ],
          preview: {select: {title: 'label', subtitle: 'href'}},
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Site Settings'}
    },
  },
})
