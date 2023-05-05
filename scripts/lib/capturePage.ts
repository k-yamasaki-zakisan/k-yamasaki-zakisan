import puppeteer from "https://deno.land/x/puppeteer@9.0.2/mod.ts";

export const capturePage = async (user: string) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setViewport({
    width: 1920,
    height: 1080,
    deviceScaleFactor: 2,
  });

  await Deno.mkdir("images", {
    recursive: true,
  });

  await page.goto(`https://leetcode.com/${user}/`, {
    waitUntil: "networkidle0",
  });

  await page.emulateMediaFeatures([
    { name: "prefers-color-scheme", value: "dark" },
  ]);

  const targets = [
    {
      xpath:
        "//span[contains(., 'submissions in the last year')]/parent::div/parent::div/parent::div",
      name: "streak",
    },
    {
      xpath:
        "//div[contains(., 'Contest Rating') and not(*)]/parent::div/parent::div/parent::div/parent::div",
      name: "rating",
    },
    {
      xpath:
        "//div[contains(., 'Top') and not(*)]/parent::div/parent::div/parent::div/parent::div",
      name: "rating_top",
    },
    {
      xpath: "//div[contains(., 'Solved Problems') and not(*)]/parent::div",
      name: "problems",
    },
  ];

  for (const { xpath, name } of targets) {
    console.log(`${name}の処理を開始します`);
    const streakElement = await page.waitForXPath(xpath);

    // capture light mode
    await page.evaluate((html) => {
      html.classList.remove("dark");
    }, await page.$("html"));
    await streakElement?.screenshot({ path: `images/${name}.png` });

    // capture dark mode
    await page.evaluate((html) => {
      html.classList.add("dark");
    }, await page.$("html"));
    await streakElement?.screenshot({ path: `images/${name}_dark.png` });
    console.log(`${name}の処理が完了しました`);
  }

  await browser.close();
};
