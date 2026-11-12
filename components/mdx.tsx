import defaultMdxComponents from 'fumadocs-ui/mdx';
import { Accordion, Accordions } from 'fumadocs-ui/components/accordion';
import { Step, Steps } from 'fumadocs-ui/components/steps';
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';
import { ImageZoom } from 'fumadocs-ui/components/image-zoom';
import type { MDXComponents } from 'mdx/types';
import { Screenshot } from '@/components/kb/screenshot';
import { Path, WhoCan } from '@/components/kb/path';

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    // Questions a reader arrives with, answered in place. Long answers link out
    // to a page of their own instead of growing inside the fold.
    Accordion,
    Accordions,
    // Numbered walkthroughs where the order is the point.
    Step,
    Steps,
    Tab,
    Tabs,
    ImageZoom,
    // Pictures of the real screens.
    Screenshot,
    // "Courses > New Course", rendered as one chip.
    Path,
    WhoCan,
    ...components,
  };
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
