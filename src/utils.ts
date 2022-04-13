import { Vector2, Vector3 } from "three";

// What is LERP? (Linear Interpolation)
// In a lerp formula you need a (starting point), b (target point), pct (how fast is the travel)


export function lerp(a: number, b: number, pct: number): number {
    return (a * (1-pct)) + (b * pct)
}

export function lerp2D(a: Vector2, b: Vector2, pct: number): Vector2 {
    return new Vector2(lerp(a.x, b.x, pct), lerp(a.y,b.y,pct));
}

export function lerp3D(a: Vector3, b: Vector3, pct: number): Vector3 {
    return new Vector3(lerp(a.x, b.x, pct), lerp(a.y,b.y,pct), lerp(a.z,b.z,pct));
}