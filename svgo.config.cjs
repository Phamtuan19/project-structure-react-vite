module.exports = {
   plugins: [
      {
         name: 'removeAttrs',
         params: { attrs: '(fill|stroke)' }, // loại bỏ fill và stroke cứng từ SVG gốc
      },
      {
         name: 'removeDimensions', // loại bỏ width/height để có thể dùng với viewBox
      },
      {
         name: 'prefixIds', // đảm bảo ID trong SVG không bị trùng
      },
   ],
};
