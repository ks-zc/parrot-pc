const path = require('path');
const fse = require('fs-extra');

// 对node_modules进行小量修改不用发包
if (fse.existsSync(path.resolve(process.cwd(), 'edit_modules'))) {
    fse.copySync(path.resolve(process.cwd(), 'edit_modules'), path.resolve(process.cwd(), 'node_modules'));
}
