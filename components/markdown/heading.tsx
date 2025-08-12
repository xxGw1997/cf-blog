import React from 'react'
import type { JSX } from 'react'

import { slugify } from '@/lib/utils'


interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6
  children: React.ReactNode
}


export default function Heading({ level, children }: HeadingProps) {
  const slug = slugify(children as string)
  const Tag = `h${level}` as keyof JSX.IntrinsicElements

  return (
    <Tag id={slug}>
      <a href={`#${slug}`} className="no-underline">
        {children}
      </a>
    </Tag>
  )
}

Heading.displayName = 'Heading'
