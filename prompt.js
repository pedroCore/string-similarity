const readline = require("node:readline/promises");
const { stdin, stdout } = require("node:process");

const { getIcrById } = require("./icrs");
const { print, brPrint } = require("./printer");

const { diceCoefficient } = require("./string_similarity");

const rl = readline.createInterface({
  input: stdin,
  output: stdout,
  prompt: "test",
});

const Rates = {
  BAD_RATE: 0.25,
  LOW_RATE: 0.5,
  GOOD_RATE: 0.7,
  EXCELLENT_RATE: 0.9,
};

(async () => {
  try {
    executeICR(1);
  } catch (e) {
    console.error("ERROR", e);
  }
})();

async function executeICR(icrId, noWelcomeMessage = false) {
  let icr = await getIcrById(icrId);

  if (!noWelcomeMessage) {
    print(icr.message);
  }

  const userText = await rl.question("");

  brPrint();

  let bestResolution = null;

  let matchAndRouteResolutions = [];
  for (let matcher of icr.matchAndRoute) {
    let matcherPercentages = [];
    for (let text of matcher.texts) {
      matcherPercentages.push(
        diceCoefficient(stringOptimizer(userText), stringOptimizer(text))
      );
    }

    matchAndRouteResolutions.push({
      response: matcher.response,
      bestPercentage: Math.max(...matcherPercentages) || 0,
    });
  }

  bestResolution = getMaxFromMatches(matchAndRouteResolutions);

  if (!bestResolution) {
    print(icr.fallbackMessage);
    executeICR(icrId, true);
  } else {
    print(
      `${bestResolution.response.text} (${Math.floor(
        bestResolution.bestPercentage * 100
      )}%)`
    );
    executeICR(icrId, true);
  }
}

function getMaxFromMatches(matchAndRouteResolutions) {
  let max = null;
  for (let resolution of matchAndRouteResolutions) {
    if (!max) {
      max = resolution;
    } else if (resolution.bestPercentage > max.bestPercentage) {
      max = resolution;
    }
  }

  if (max.bestPercentage > Rates.LOW_RATE) {
    return max;
  }
}

function stringOptimizer(str) {
  let optimized = str
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();
  return optimized;
}
