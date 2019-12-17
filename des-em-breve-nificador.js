const LOADING_EL_ID = 'DesEmBreveNificador';

const get_loading_element = () => document.querySelectorAll(`div#${LOADING_EL_ID}`);

const toggle_loading = (add = true) => {
  const loadingEls = get_loading_element();

  if (add && loadingEls.length > 0 || !add && !loadingEls.length) {
    console.log(add);
    console.log('Nothing to do');
    return;
  }

  if (add) {
    console.log("Lets add the loading");
    const newLoadingEl = document.createElement('div');
    newLoadingEl.innerHTML = 'Aguardando carregamento para remover imóveis "em breve"';
    newLoadingEl.setAttribute('id', LOADING_EL_ID);
    document.querySelector("html").appendChild(newLoadingEl);
    return;
  }

  console.log("Removing the loading message");

  // Remove the loading div
  loadingEls.forEach(el => el.remove());
};

const remove_em_breves = () => {
  console.log("Let's remove some useless apartment announcements");
}

/* Begin */

toggle_loading(true);

window.addEventListener('load', function (e) {
  console.log("DOM LOAD")
  toggle_loading(false);
  remove_em_breves();

  window.addEventListener('DOMSubtreeModified', function (e) {
    remove_em_breves();
  });
});
