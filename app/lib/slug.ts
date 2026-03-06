/**
 * Slug Generator
 * URL-friendly string conversion with Vietnamese character support
 */

const vietnameseChars: Record<string, string> = {
  'à': 'a', 'á': 'a', 'ả': 'a', 'ã': 'a', 'ạ': 'a',
  'ă': 'a', 'ằ': 'a', 'ắ': 'a', 'ẳ': 'a', 'ẵ': 'a', 'ặ': 'a',
  'â': 'a', 'ầ': 'a', 'ấ': 'a', 'ẩ': 'a', 'ẫ': 'a', 'ậ': 'a',
  'đ': 'd',
  'è': 'e', 'é': 'e', 'ẻ': 'e', 'ẽ': 'e', 'ẹ': 'e',
  'ê': 'e', 'ề': 'e', 'ế': 'e', 'ể': 'e', 'ễ': 'e', 'ệ': 'e',
  'ì': 'i', 'í': 'i', 'ỉ': 'i', 'ĩ': 'i', 'ị': 'i',
  'ò': 'o', 'ó': 'o', 'ỏ': 'o', 'õ': 'o', 'ọ': 'o',
  'ô': 'o', 'ồ': 'o', 'ố': 'o', 'ổ': 'o', 'ỗ': 'o', 'ộ': 'o',
  'ơ': 'o', 'ờ': 'o', 'ớ': 'o', 'ở': 'o', 'ỡ': 'o', 'ợ': 'o',
  'ù': 'u', 'ú': 'u', 'ủ': 'u', 'ũ': 'u', 'ụ': 'u',
  'ư': 'u', 'ừ': 'u', 'ứ': 'u', 'ử': 'u', 'ữ': 'u', 'ự': 'u',
  'ỳ': 'y', 'ý': 'y', 'ỷ': 'y', 'ỹ': 'y', 'ỵ': 'y',
}

/**
 * Remove Vietnamese diacritics from a string
 */
export function removeVietnameseDiacritics(str: string): string {
  return str
    .split('')
    .map(char => vietnameseChars[char] || vietnameseChars[char.toLowerCase()]?.toUpperCase() || char)
    .join('')
}

/**
 * Generate a URL-friendly slug from a string
 */
export function generateSlug(text: string): string {
  return removeVietnameseDiacritics(text)
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')     // Remove non-word characters
    .replace(/[\s_]+/g, '-')      // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, '')      // Remove leading/trailing hyphens
    .replace(/-{2,}/g, '-')       // Replace multiple consecutive hyphens
}

/**
 * Generate a unique slug by appending a random suffix
 */
export function generateUniqueSlug(text: string): string {
  const baseSlug = generateSlug(text)
  const suffix = Math.random().toString(36).substring(2, 8)
  return `${baseSlug}-${suffix}`
}
