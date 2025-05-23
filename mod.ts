import { yamlParse } from "./deps.ts";

export type ParseResult = {
  data: unknown;
  content: string;
};

const reFrontmatter = /^---\n([\s\S]*?)\n---\n([\s\S]*)/;

/**
 * Parses the front matter of the input string and returns the
 * parse result object.
 *
 * When front matter pattern is not found, then it returns the
 * result with empty data and input text as content.
 *
 * The front matter string is parsed as yaml.
 *
 * If the front matter yaml has an syntax error of yaml,
 * then this function throws the error.
 */
export function parse(text: string): ParseResult {
  if (!reFrontmatter.test(text)) {
    return {
      data: undefined,
      content: text,
    };
  }

  const [_, yaml, content] = text.match(reFrontmatter)!;

  return {
    data: yamlParse(yaml.trim()),
    content: content.trim(),
  };
}
