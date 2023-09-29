export type SearchItem<T> = {
  searchables: string[];
  associatedObject: T;
};

export default function fuzzySearch<T>(
  query: string,
  input: SearchItem<T>[],
  maxDistance: number = 2
): SearchItem<T>[] {
  query = query.toLowerCase();

  const results: SearchItem<T>[] = [];

  for (const item of input) {
    for (const searchable of item.searchables) {
      const itemLowerCase = searchable.toLowerCase();

      if (itemLowerCase.includes(query)) {
        results.push(item);
      } else {
        const distance = levenshteinDistance(query, itemLowerCase);
        if (distance <= maxDistance) {
          results.push(item);
        }
      }
    }
  }

  return results;
}

function levenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      const cost = a[j - 1] === b[i - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1, // Deletion
        matrix[i][j - 1] + 1, // Insertion
        matrix[i - 1][j - 1] + cost // Substitution
      );
    }
  }

  return matrix[b.length][a.length];
}
