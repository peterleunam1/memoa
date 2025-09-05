export interface Typography {
  id: number;
  name: TypographyName['name'];
}
export interface TypographyName {
  name: 'Epilogue' | 'Inter' | 'Roboto' | 'Nunito' | 'Work Sans';
}