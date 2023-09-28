export type FOLDERS = 'avatars' | 'gifs';

interface Asset {
  folder: FOLDERS;
}

export const AVATARS: Asset = {
  folder: 'avatars',
};
