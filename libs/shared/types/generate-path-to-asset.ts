import { FOLDERS } from '@libs/assets';

export interface GeneratePathToAsset {
  folder: FOLDERS;
  asset: number | string;
  extension?: 'mp4' | 'jpg';
}
