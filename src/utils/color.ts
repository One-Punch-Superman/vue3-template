//根据深浅色背景，返回黑白文字颜色。
export function dynamicColor(bg: string) {
  console.log('传入颜色：', bg);
  if (!bg) {
    //默认中色
    return '#999';
  }
  if (bg.search('gradient') != -1) {
    //渐变色直接返回中色值
    return '#999';
  }
  if (bg.search('#') != -1) {
    //16进制转换成rgb
    bg = set16ToRgb(bg);
  }
  if (bg.search('rgb') != -1) {
    //rgb
  }
  var bgcolor = bg.replace('rgb(', '').replace('rgba(', '').replace(')', '');
  var bgcolorArry = bgcolor.split(',');
  return isLight(bgcolorArry) ? '#999' : 'rgba(255,255,255,0.5)'; //浅色背景就返回深色文字颜色。
}
//是否浅色
function isLight(rgb = [0, 0, 0]) {
  return 0.213 * rgb[0] + 0.715 * rgb[1] + 0.072 * rgb[2] > 255 / 2;
}

//【16进制转换为RGB 】
// set16ToRgb('#ffffff');   // rgb(255,255,0)
function set16ToRgb(str: string) {
  var reg = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;
  if (!reg.test(str)) {
    return;
  }
  let newStr = str.toLowerCase().replace(/\#/g, '');
  let len = newStr.length;
  if (len == 3) {
    let t = '';
    for (var i = 0; i < len; i++) {
      t += newStr.slice(i, i + 1).concat(newStr.slice(i, i + 1));
    }
    newStr = t;
  }
  let arr = []; //将字符串分隔，两个两个的分隔
  for (var i = 0; i < 6; i = i + 2) {
    let s = newStr.slice(i, i + 2);
    arr.push(parseInt('0x' + s));
  }
  return 'rgb(' + arr.join(',') + ')';
}
