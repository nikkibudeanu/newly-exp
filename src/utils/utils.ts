/**
 * Convert group name, token name and possible prefix into camelCased string, joining everything together
 */
Pulsar.registerFunction("createVarName", function (token, tokenGroup) {
  // Create array with all path segments and token name at the end

  // tokenGorup.path = "core,aqua"
  const segments = [tokenGroup.path[0]];

  // tokenGroup.path = "alias,fluid, tertiary"
  if (!tokenGroup.isRoot || !tokenGroup.isNonVirtualRoot) {
    // tokenGroup.name =
    segments.push(tokenGroup.name);
  }

  segments.push(token.name);

  // Create "sentence" separated by spaces so we can camelcase it all
  let sentence = segments.join(" ");

  // camelcase string from all segments
  sentence = sentence
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());

  // only allow letters, digits, underscore and hyphen
  sentence = sentence.replace(/[^a-zA-Z0-9_-]/g, "_");

  // prepend underscore if it starts with digit
  if (/^\d/.test(sentence)) {
    sentence = "_" + sentence;
  }

  return sentence;
});

Pulsar.registerFunction("getProperty", function (path, type) {
  const designSystemNestedPath = {
    fontSize: ["Font Size", "Font Size", "font-size"],
    borderRadius: ["Border Radius", "Border Radius"],
    borderWidth: ["Border Width", "Border Width"],
    spacing: ["Space", "Spacing"],
  }[type];

  return designSystemNestedPath[0] == path[0] &&
    designSystemNestedPath[1] == path[1]
    ? type
    : "";
});

Pulsar.registerFunction("findAliases", findAliases);

Pulsar.registerFunction("gradientAngle", function (from, to) {
  const deltaY = to.y - from.y;
  const deltaX = to.x - from.x;
  const radians = Math.atan2(deltaY, deltaX);
  let result = (radians * 180) / Math.PI;
  result = result + 90;
  return (result < 0 ? 360 + result : result) % 360;
});

function findAliases(token, allTokens) {
  let aliases = allTokens.filter(
    (t) => t.value.referencedToken && t.value.referencedToken.id === token.id,
  );
  for (const t of aliases) {
    aliases = aliases.concat(findAliases(t, allTokens));
  }
  return aliases;
}
