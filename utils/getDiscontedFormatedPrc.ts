export const getDiscontedFormatedPrc = (basePrice: number, discount: number, fixedNr?: number): number =>
  parseFloat((basePrice * (1 - discount)).toFixed(fixedNr || 2));
