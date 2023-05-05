// @see https://zenn.dev/ryo_kawamata/articles/c6580f35160139
import { z } from "https://deno.land/x/zod@v3.20.2/mod.ts";
import { capturePage } from "./lib/capturePage.ts";
import { updateReadme } from "./lib/updateReadme.ts";

const main = async () => {
  const user = z.string().parse(Deno.env.get("LEET_CODE_USER_NAME"));

  console.log("処理を開始します");
  await capturePage(user);
  console.log("capturePage完了");
  await updateReadme(user);
  console.log("updateReadme完了");
  console.log("処理を完了します");
  console.log("browser.close()が壊れているので強制終了します");
  throw new Error("強制終了！！！！");
};

main();
