import { MARK } from "../constants.ts";

export const updateReadme = async (user: string) => {
  const README_FILE_PATH = "./README.md";

  const readme = await Deno.readTextFile(README_FILE_PATH);
  const markerPattern = new RegExp(`(${MARK.START})[\\s\\S]*(${MARK.END})`);
  if (!markerPattern.test(readme)) {
    throw new Error("Error: MARKER is not exists in README.md");
  }

  const markup = `
<p align="left"> 
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="./images/problems_dark.png" height="140px">
    <img alt="LeetCode Problems" src="./images/problems.png" height="150px">
  </picture>
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="./images/rating_dark.png" height="140px">
    <img alt="LeetCode Rating" src="./images/rating.png" height="150px">
  </picture>
</p>
    \nLast Updated on ${new Date().toLocaleString()}
    `;

  const newReadme = readme.replace(markerPattern, `$1\n${markup}\n$2`);

  await Deno.writeTextFile(README_FILE_PATH, newReadme);
};
