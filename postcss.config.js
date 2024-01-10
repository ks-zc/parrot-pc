module.exports = {
    plugins: {
        'postcss-px-to-viewport': [
            {
                unitToConvert: 'wpx', // 需要转换的单位，默认为"px"
                viewportWidth: 750, // 设计稿的视口宽度
                unitPrecision: 5, // 单位转换后保留的精度
                propList: ['*'], // 能转化为vw的属性列表
                viewportUnit: 'vw', // 希望使用的视口单位
                fontViewportUnit: 'vw', // 字体使用的视口单位
                selectorBlackList: [], // 需要忽略的CSS选择器，不会转为视口单位，使用原有的px等单位
                minPixelValue: -1, // 设置最小的转换数值，如果为1的话，只有大于1的值会被转换
                mediaQuery: true, // 媒体查询里的单位是否需要转换单位
                replace: true, // 是否直接更换属性值，而不添加备用属性
                exclude: undefined, // 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
                include: undefined, // 如果设置了include，那将只有匹配到的文件才会被转换，例如只转换 'src/mobile' 下的文件
            },
            {
                unitToConvert: 'mpx', // 需要转换的单位，默认为"px"
                viewportWidth: 625, // 设计稿的视口宽度
                unitPrecision: 5, // 单位转换后保留的精度
                propList: ['*'], // 能转化为vw的属性列表
                viewportUnit: 'vw', // 希望使用的视口单位
                fontViewportUnit: 'vw', // 字体使用的视口单位
                selectorBlackList: [], // 需要忽略的CSS选择器，不会转为视口单位，使用原有的px等单位
                minPixelValue: -1, // 设置最小的转换数值，如果为1的话，只有大于1的值会被转换
                mediaQuery: true, // 媒体查询里的单位是否需要转换单位
                replace: true, // 是否直接更换属性值，而不添加备用属性
                exclude: undefined, // 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
                include: undefined, // 如果设置了include，那将只有匹配到的文件才会被转换，例如只转换 'src/mobile' 下的文件
            },
        ],
    },
};
