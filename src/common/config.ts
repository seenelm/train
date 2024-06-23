// import fs from "fs";
// import yml from "js-yaml";

// const file = fs.readFileSync("../../config/config.yml", "utf8");

// interface Config {
//   apiUrl: string;
// }

// function getConfig(): Config | undefined {
//   try {
//     const config = yml.load(file) as Config;
//     return config;
//   } catch (error) {
//     console.error(error);
//   }
// }

// export const config = getConfig();

import config from "../../config/config.json";

export const apiUrl = config.apiUrl;
export const socketUrl = config.socketUrl;
