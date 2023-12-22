import { atom } from 'recoil';

export const atomUserRole = atom({
  key: 'atomUserRole',
  default: {
    isLogin: false,
    username:null,
    userId:null,
    project:[]
  },
});
