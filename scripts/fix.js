const fs = require("fs");
const path = require("path");
const sep = path.posix.sep;

const s1 = `  var _getComputedStyle = getComputedStyle(target, '::-webkit-scrollbar'),
      width = _getComputedStyle.width,
      height = _getComputedStyle.height;

  return {
    width: ensureSize(width),
    height: ensureSize(height)
  };`;

const s2 = `try {
  var _getComputedStyle = getComputedStyle(target, '::-webkit-scrollbar'),
    width = _getComputedStyle.width,
    height = _getComputedStyle.height;

  return {
    width: ensureSize(width),
    height: ensureSize(height)
  };
} catch (error) {
  return {
    width: ensureSize(""),
    height: ensureSize("")
  };
}`;

const hacks = [
  {
    // ES6 to ES5 config fix
    name: "es5-imcompatible-versions",
    path: "../node_modules/es5-imcompatible-versions/package.json",
    hack: (data) => {
      const packageConfig = JSON.parse(data);
      const versions = packageConfig.config["es5-imcompatible-versions"] || {};
      Object.assign(
        versions,
        {
          "@umijs/use-params": {
            "^1.0.3": {
              version: "^1.0.3",
              reason:
                "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Errors/Missing_initializer_in_const",
            },
          },
        },
        {
          "ali-react-table": {
            "^0.13.7": {
              version: "^0.13.7",
              reason:
                "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Errors/Missing_initializer_in_const",
            },
          },
        }
      );
      const newData = JSON.stringify(packageConfig, null, 2);
      console.log("ES5 transform modules:", Object.keys(versions));
      return newData;
    },
  },
  {
    // rc-util地问题
    name: "rc-util/es",
    path: "../node_modules/rc-util/es/getScrollBarSize.js",
    hack: (data) => {
      if (data.indexOf(s1) > 0) console.log("rc-util/es should be hacked");
      if (data.indexOf(s2) > 0) console.log("rc-util/es hacked");
      return data.replace(s1, s2);
    },
  },
  {
    // rc-util地问题
    name: "rc-util/lib",
    path: "../node_modules/rc-util/lib/getScrollBarSize.js",
    hack: (data) => {
      if (data.indexOf(s1) > 0) console.log("rc-util/lib should be hacked");
      if (data.indexOf(s2) > 0) console.log("rc-util/lib hacked");
      return data.replace(s1, s2);
    },
  },
];

const run = () => {
  for (const item of hacks) {
    const finalPath = path.resolve(__dirname, item.path.replace(/\//g, sep));
    fs.readFile(finalPath, "utf8", (err, data) => {
      if (err) {
        console.error(err);
        return;
      }

      const fixed = item.hack(data);
      fixed &&
        fs.writeFile(finalPath, fixed, (err) => {
          if (err) {
            throw err;
          }
          console.log(`Hack [${item.name}] Success`);
        });
    });
  }
};

run();
