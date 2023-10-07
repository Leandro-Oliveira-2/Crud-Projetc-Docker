interface ISecurityConfig {
  active: boolean;
  adminToken: string;
  jwt: {
    key: string;
    exp: string;
    keyRefresh: string;
    refreshExp: string;
  };
}

const SecurityConfig: ISecurityConfig = {
  active: process.env.API_ACCESS_CONTROL === 'true',
  adminToken: process.env.AUTH_ADMIN_TOKEN || 'TOKEN',
  jwt: {
    key: process.env.AUTH_JWT_SECRET || 'jshq8MnsA0EckxbEGqXk6Gs70AJeMXCt',
    exp: process.env.AUTH_JWT_EXP || '2h',
    keyRefresh: process.env.AUTH_JWT_SECRET_REFRESH || 'jshq8MnsA0EckxbEGqXk6Gs70AJeMXCt',
    refreshExp: process.env.AUTH_JWT_REFRESH_EXP || '2h',
  },
};

export default SecurityConfig;
