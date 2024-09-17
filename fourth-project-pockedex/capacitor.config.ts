import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'fourth-project-pockedex',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  plugins: {
  CapacitorHttp: {
    enabled: true,
  }
}
};



export default config;
