/** Format a numeric string or number as USD currency */
export function formatUSD(amount: string | number): string {
  const value = typeof amount === 'string' ? parseFloat(amount) : amount
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
}
