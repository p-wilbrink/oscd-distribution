import fs from "fs";
import path from "path";

interface OSCDPlugin {
  name: string;
  translations: {
    [key: string]: string;
  };
  icon: string;
  active: boolean;
  src: string;
}

interface Plugins {
  menu?: OSCDPlugin[];
  editor?: OSCDPlugin[];
}

const isRelativePlugin = (plugin: OSCDPlugin): boolean => {
  return !(plugin.src.indexOf("://") > 0 || plugin.src.indexOf("//") === 0);
};

const getPlugins = (): Promise<Plugins> => {
  return new Promise((resolve, reject) => {
    fs.readFile(
      path.join(__dirname, "../", "plugins.json"),
      {
        encoding: "utf-8",
      },
      (err: NodeJS.ErrnoException | null, data: string) => {
        if (err) {
          return reject(err);
        }
        return resolve(JSON.parse(data));
      }
    );
  });
};

getPlugins()
  .then((plugins) => {
    console.log(plugins);
    [...(plugins.menu || []), ...(plugins.editor || [])].forEach((plugin) => {
      if (!isRelativePlugin(plugin)) {
        console.log("Not a relative plugin");
      }
    });
  })
  .catch((err) => {
    console.error(err);
  });
