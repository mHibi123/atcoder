// Common helpers — jsr:@ayaexptech/arcane@1.0.0-alpha.7
// Copy into your submission file (after InputScanner, before export {}).

const INF = 1e18;
const MOD = 998244353n;

const range = (n: number) => [...Array(n).keys()];
const matrix = <T>(h: number, w: number, init: T): T[][] =>
    Array.from({ length: h }, () => Array(w).fill(init));

const println = (...args: unknown[]) => console.log(...args);
const print = (...args: unknown[]) => process.stdout.write(args.join(" "));
