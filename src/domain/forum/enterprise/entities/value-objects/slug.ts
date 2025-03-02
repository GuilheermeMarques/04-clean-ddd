export class Slug {
  public value: string

  private constructor(value: string) {
    this.value = value
  }

  static create(slug: string) {
    return new Slug(slug)
  }

  /**
   * Receives a string and normalizes it as a slug
   *
   * Examĺe: "An example title" -> "an-example-title"
   *
   * @param text (string) - The text to be converted to a slug
   */

  static createFromText(text: string) {
    const slugText = text
      .normalize('NFKD') // Removes accents and special characters
      .toLocaleLowerCase() // Converts to lowercase
      .trim() // Removes spaces at the beginning and end
      .replace(/\s+/g, '-') // Replaces spaces with hyphens
      .replace(/[^\w-]+/g, '') // Removes non-alphanumeric characters except hyphens
      .replace(/--+/g, '-') // Replaces multiple consecutive hyphens with a single one
      .replace(/^-+|-+$/g, '') // Removes hyphens at the beginning or end

    return new Slug(slugText)
  }
}
