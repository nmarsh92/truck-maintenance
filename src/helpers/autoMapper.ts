export const mapTo = <TSource, TDestination>(
  source: TSource,
  map?: Partial<Record<keyof TSource, keyof TDestination>>
): TDestination => {
  const mapped = {} as TDestination;
  for (const key in source) {
    if (map && map[key as keyof TSource]) {
      const destinationKey = map[key as keyof TSource] as keyof TDestination;
      const value = source[key as keyof TSource];
      mapped[destinationKey] = value as unknown as TDestination[keyof TDestination & keyof TSource];
    } else {
      mapped[key as unknown as keyof TDestination] = source[key as keyof TSource] as unknown as TDestination[keyof TDestination & keyof TSource];
    }
  }
  return mapped;
};