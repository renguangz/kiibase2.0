import { PUBLIC_API_HOST } from '/config/env';

export function endpointMeGET() {
  return `${PUBLIC_API_HOST}/me`;
}

export function endpointNaviItemGET() {
  return `${PUBLIC_API_HOST}/naviItem`;
}
