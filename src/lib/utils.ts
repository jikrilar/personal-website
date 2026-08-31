export type ClassName = string | false | null | undefined;

export function cn(...classNames: ClassName[]): string {
  return classNames.filter((className): className is string => Boolean(className)).join(" ");
}
