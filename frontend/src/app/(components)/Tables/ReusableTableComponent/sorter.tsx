export enum SortDirection {
    Ascending,
    Descending
  }

  const toTitleCase = (str: any) => {
    if (!str) {
      return '';
    }
    const strArr = str.split(' ').map((word) => {
      return word[0].toUpperCase() + word.substring(1).toLowerCase();
    });
    return strArr.join(' ');
  }
  
  const lowerize = obj =>
  Object.keys(obj).reduce((acc, k) => {
    acc[k.toLowerCase()] = obj[k];
    return acc;
  }, {});
  
  export default function sortingObj<T>(
    data: T[],
    sortKey: keyof T,
    direction: SortDirection
  ): T[] {
    const d = [...data].sort((a: T, b: T) => {
      const aK = lowerize(a as any)
      const bK = lowerize(b as any)
    
      if (direction === SortDirection.Ascending) {
        return aK[sortKey as any] < bK[sortKey as any] ? -1 : 1;
      }

      if (direction === SortDirection.Descending) {
        return aK[sortKey as any] > bK[sortKey as any] ? -1 : 1;
      }
      return 0;
    });
    return d;
  }
  