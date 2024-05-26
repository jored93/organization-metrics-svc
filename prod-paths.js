import tsConfig from './tsconfig.json';
import tsConfigPaths from 'tsconfig-paths';

const { baseUrl, paths } = tsConfig.compilerOptions;
for (const path in paths) {
  paths[path][0] = paths[path][0]
    .replace('src', 'dist/src')
    .replace('.ts', '.js');
}

tsConfigPaths.register({ baseUrl, paths });
