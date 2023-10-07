import { injectable } from 'inversify';
import path from 'path';
import fs from 'fs-extra';

import StorageConfig from '@config/StorageConfig';
import IStorageProvider from '@common/providers/StorageProvider/repositories/IStorageProvider';

@injectable()
class StorageProvider implements IStorageProvider {
  public async save(file: string): Promise<string> {
    await fs.copy(path.resolve(StorageConfig.local.tempFolder, file), path.resolve(StorageConfig.local.uploadFolder, file));
    return `${file}`;
  }

  public async retrieve(file: string): Promise<string> {
    await fs.stat(path.resolve(StorageConfig.local.uploadFolder, file));
    return `${StorageConfig.local.uploadFolder}/${file}`;
  }

  public async delete(file: string): Promise<void> {
    try { await fs.stat(path.resolve(StorageConfig.local.uploadFolder, file)); } catch { return; }
    await fs.unlink(path.resolve(StorageConfig.local.uploadFolder, file));
  }
}

export default StorageProvider;
