import * as THREE from "three";
import ENGINE from "../instance";

export const raycast = async (data: {
  camera: THREE.PerspectiveCamera | THREE.OrthographicCamera;
  mouse: THREE.Vector2;
  dom: HTMLCanvasElement;
}) => {
  const results = [];
  for (const [_, model] of ENGINE.fragments.list) {
    const result = await model.raycast(data);
    if (result) {
      results.push(result);
    }
  }
  await Promise.all(results);
  if (results.length === 0) return null;

  let closestResult = results[0];
  let minDistance = closestResult.distance;

  for (let i = 1; i < results.length; i++) {
    if (results[i].distance < minDistance) {
      minDistance = results[i].distance;
      closestResult = results[i];
    }
  }

  return closestResult;
};