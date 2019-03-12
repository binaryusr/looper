const Timeline = (() => {
  const element = getElementFromTemplate(`<div class="timeline"></div>`);
  return getElementWithEvent(element, `.timeline`, {
    event: `click`,
    handler: () => {
      console.log(`hello click`)
    }
  });
})();
