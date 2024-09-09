import { visit } from 'unist-util-visit';

export function addCaptionsToImages() {
  return (tree) => {
    visit(tree, "image", (node, index, parent) => {
      console.error("Here")
      const { alt, url } = node;

      // Skip if no alt text is provided
      if (!alt) return;

      // Create the new elements for img, caption, and figure
      const imgElement = { ...node }; // Retains the image node properties

      const captionElement = {
        type: "element",
        tagName: 'figcaption',
        children: [{ type: "text", value: alt }],
      };

      const figureElement = {
        type: "element",
        tagName: 'figure',
        children: [imgElement, captionElement],
      };

      // Replace the original image node with the new figure node in the parent
      parent.children.splice(index, 1, figureElement);


    });
  };
}
