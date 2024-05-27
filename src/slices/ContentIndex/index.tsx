import { Content, isFilled } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import ContentList from "@/slices/ContentIndex/ContentList";
import { createClient } from "@/prismicio";

/**
 * Props for `ContentIndex`.
 */
export type ContentIndexProps = SliceComponentProps<Content.ContentIndexSlice>;

/**
 * Component for "ContentIndex" Slices.
 */
const ContentIndex = async ({
  slice,
}: ContentIndexProps): Promise<JSX.Element> => {
  const client = createClient();
  const blogPost = await client.getAllByType("blog_post");
  const projects = await client.getAllByType("project");
  const contentType = slice.primary.content_type;

  const items = contentType === "Blog" ? blogPost : projects;
  const links = extractProjectLinkUrls(items);
  console.log(links[0], "links");
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Heading size="xl" className="mb-8">
        {slice.primary.heading}
      </Heading>
      {isFilled.richText(slice.primary.description) && (
        <div className="mb-10 prose prose-xl prose-invert">
          <PrismicRichText field={slice.primary.description} />
        </div>
      )}
      <ContentList
        items={items}
        contentType={contentType}
        viewMoreText={slice.primary.view_more_text}
        fallbackItemImage={slice.primary.fallback_item_image}
        projectLink={links[0]}
      />
    </Bounded>
  );
};

export default ContentIndex;

// Export Link from Items Obj
function extractProjectLinkUrls(items: any) {
  return items
    .map((obj: any) => {
      // Directly check if project_link is a string (URL)
      if (typeof obj.data.project_link === "string") {
        return obj.data.project_link;
      }

      const urlPath = ["url"];
      let current = obj.data.project_link;

      for (let i = 0; i < urlPath.length; i++) {
        if (current && current.hasOwnProperty(urlPath[i])) {
          current = current[urlPath[i]];
        } else {
          return null;
        }
      }

      return current;
    })
    .filter((url: any) => url !== null);
}
