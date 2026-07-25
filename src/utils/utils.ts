
function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomFloat(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}

function getRandomElement<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
}

function getWeightedChoice<T extends string>(weights: Partial<Record<T, number>>): T {
    const entries = Object.entries(weights) as [T, number][];
    const total = entries.reduce((sum, [, w]) => sum + Math.max(w, 0), 0);
    let r = Math.random() * total;
    for (const [key, w] of entries) {
        r -= Math.max(w, 0);
        if (r <= 0) return key;
    }
    return entries[entries.length - 1][0];
}

function resolve(exact: number | undefined | null, min: number, max: number): number {
    return exact ?? getRandomInt(min, max);
}

function resolveFloat(exact: number | undefined | null, min: number, max: number): number {
    return exact ?? getRandomFloat(min, max);
}

function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
}

function lerp(start: number, end: number, t: number): number {
    return start + (end - start) * t;
}

function pingPong(value: number, length: number): number {
    const period = length * 2 - 2;
    const x = value % period;

    return x < length
        ? x
        : period - x;
}

export { getRandomInt, getRandomFloat, getRandomElement, getWeightedChoice, clamp, lerp, resolve, resolveFloat, pingPong };